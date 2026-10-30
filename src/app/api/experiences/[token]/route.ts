import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// صفحة الاستقبال العامة تقرأ فقط - لا يوجد مسار لتعديل أو حذف تجربة عبر هذا الرابط العام
export async function GET(_req: NextRequest, { params }: { params: { token: string } }) {
  const token = params.token?.trim();
  if (!token || token.length > 32) {
    return NextResponse.json({ error: "رابط غير صحيح" }, { status: 400 });
  }

  try {
    const exp = await prisma.experience.findUnique({ where: { publicToken: token } });
    if (!exp) {
      return NextResponse.json({ error: "التجربة غير موجودة" }, { status: 404 });
    }
    if (exp.expiresAt && exp.expiresAt.getTime() < Date.now()) {
      return NextResponse.json({ error: "انتهت صلاحية هذه التجربة" }, { status: 410 });
    }

    // لا نُعيد الـ id الداخلي أو أي حقل إداري - فقط ما يلزم لعرض التجربة
    const { id: _id, ...publicData } = exp;
    return NextResponse.json(publicData);
  } catch (err) {
    console.error("experience_fetch_failed", err);
    return NextResponse.json({ error: "تعذر الاتصال بقاعدة البيانات" }, { status: 500 });
  }
}
