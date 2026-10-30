import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { generatePublicToken } from "@/lib/token";
import { createExperienceSchema } from "@/lib/validation";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "طلب غير صالح" }, { status: 400 });
  }

  const parsed = createExperienceSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "بيانات غير صحيحة", details: parsed.error.flatten() },
      { status: 400 }
    );
  }
  const d = parsed.data;

  // محاولة توليد رمز فريد - إعادة المحاولة في الحالة النادرة لتعارض الرموز
  for (let attempt = 0; attempt < 5; attempt++) {
    const publicToken = generatePublicToken();
    try {
      const experience = await prisma.experience.create({
        data: {
          publicToken,
          senderName: d.senderName,
          recipientName: d.recipientName,
          senderGender: d.senderGender,
          writingVoice: d.writingVoice,
          experienceType: d.experienceType,
          language: d.language,
          theme: d.theme,
          relationshipStartDate: d.relationshipStartDate || null,
          specialMemory: d.specialMemory || null,
          memorableMoment: d.memorableMoment || null,
          personalMessage: d.personalMessage || null,
          specialNickname: d.specialNickname || null,
          occasion: d.occasion || null,
          recipientDescription: d.recipientDescription || null,
          specialPhrase: d.specialPhrase || null,
        },
      });
      return NextResponse.json({ token: experience.publicToken }, { status: 201 });
    } catch (err: any) {
      // P2002 = تعارض على حقل فريد (publicToken) - أعد المحاولة برمز جديد
      if (err?.code === "P2002" && attempt < 4) continue;
      console.error("experience_create_failed", err);
      return NextResponse.json({ error: "تعذر حفظ التجربة، حاول مرة أخرى" }, { status: 500 });
    }
  }
  return NextResponse.json({ error: "تعذر إنشاء رابط فريد، حاول مرة أخرى" }, { status: 500 });
}
