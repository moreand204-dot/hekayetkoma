import { z } from "zod";

export const EXPERIENCE_TYPES = [
  "message",
  "collection",
  "poem",
  "story",
  "apology",
  "longing",
  "occasion",
  "mixed",
] as const;

export const LANGUAGES = ["masri", "fusha"] as const;
export const THEMES = ["cinematic", "soft", "starry"] as const;
export const GENDERS = ["male", "female", "unspecified"] as const;
export const VOICES = ["auto", "male", "female", "neutral"] as const;

// حدود طول معقولة لكل حقل - تمنع إساءة الاستخدام وتبقي النصوص قابلة للعرض بشكل جيد
export const createExperienceSchema = z.object({
  senderName: z.string().trim().min(1, "اسم المرسل مطلوب").max(60),
  recipientName: z.string().trim().min(1, "اسم المستلم مطلوب").max(60),
  senderGender: z.enum(GENDERS),
  writingVoice: z.enum(VOICES).default("auto"),
  experienceType: z.enum(EXPERIENCE_TYPES),
  language: z.enum(LANGUAGES).default("masri"),
  theme: z.enum(THEMES).default("cinematic"),

  relationshipStartDate: z.string().trim().max(60).optional().or(z.literal("")),
  specialMemory: z.string().trim().max(600).optional().or(z.literal("")),
  memorableMoment: z.string().trim().max(600).optional().or(z.literal("")),
  personalMessage: z.string().trim().max(1200).optional().or(z.literal("")),
  specialNickname: z.string().trim().max(40).optional().or(z.literal("")),
  occasion: z.string().trim().max(80).optional().or(z.literal("")),
  recipientDescription: z.string().trim().max(200).optional().or(z.literal("")),
  specialPhrase: z.string().trim().max(200).optional().or(z.literal("")),
});

export type CreateExperienceInput = z.infer<typeof createExperienceSchema>;
