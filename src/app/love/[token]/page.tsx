import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { prisma } from "@/lib/db";
import { buildExperience } from "@/lib/content-selector";
import ExperienceReveal from "@/components/wizard/ExperienceReveal";

export const metadata: Metadata = { robots: { index: false, follow: false } };

export default async function LovePage({ params }: { params: { token: string } }) {
  const token = params.token?.trim();
  if (!token || token.length > 32) notFound();

  const exp = await prisma.experience.findUnique({ where: { publicToken: token } });
  if (!exp) notFound();
  if (exp.expiresAt && exp.expiresAt.getTime() < Date.now()) notFound();

  const content = buildExperience({
    senderName: exp.senderName,
    recipientName: exp.recipientName,
    senderGender: exp.senderGender as "male" | "female" | "unspecified",
    writingVoice: exp.writingVoice as "auto" | "male" | "female" | "neutral",
    experienceType: exp.experienceType,
    language: exp.language as "masri" | "fusha",
    theme: exp.theme,
    relationshipStartDate: exp.relationshipStartDate,
    specialMemory: exp.specialMemory,
    memorableMoment: exp.memorableMoment,
    personalMessage: exp.personalMessage,
    specialNickname: exp.specialNickname,
    occasion: exp.occasion,
    recipientDescription: exp.recipientDescription,
    specialPhrase: exp.specialPhrase,
  });

  return (
    <ExperienceReveal
      recipientName={exp.recipientName}
      senderName={exp.senderName}
      theme={exp.theme}
      content={content}
    />
  );
}
