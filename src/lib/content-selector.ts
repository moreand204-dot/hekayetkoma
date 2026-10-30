import { lovePosts } from "@/content/love-posts";
import { loveMessages } from "@/content/love-messages";
import { longingMessages } from "@/content/longing-messages";
import { apologyMessages } from "@/content/apology-messages";
import { occasionMessages } from "@/content/occasion-messages";
import { loveThoughts } from "@/content/love-thoughts";
import { lovePoems } from "@/content/love-poems";
import { shortPhrases } from "@/content/short-phrases";
import { openingClosingTexts } from "@/content/opening-closing-texts";
import { Lang } from "@/content/types";

export interface ExperienceData {
  senderName: string;
  recipientName: string;
  senderGender: "male" | "female" | "unspecified";
  writingVoice: "auto" | "male" | "female" | "neutral";
  experienceType: string;
  language: Lang;
  theme: string;
  relationshipStartDate?: string | null;
  specialMemory?: string | null;
  memorableMoment?: string | null;
  personalMessage?: string | null;
  specialNickname?: string | null;
  occasion?: string | null;
  recipientDescription?: string | null;
  specialPhrase?: string | null;
}

export interface RenderedSection {
  kind: "post" | "message" | "poem" | "thought" | "detail";
  title?: string;
  body?: string;
  lines?: string[];
  paragraphs?: string[];
}

export interface RenderedExperience {
  opening: string;
  sections: RenderedSection[];
  closing: string;
}

// فهرس الجنس داخل {g:ذكر|أنثى|محايد} - مرتبط بجنس المرسل نفسه (صيغة المتكلم)
function genderIndex(gender: ExperienceData["senderGender"]): 0 | 1 | 2 {
  if (gender === "male") return 0;
  if (gender === "female") return 1;
  return 2;
}

function interpolate(text: string, ctx: ExperienceData): string {
  const gIdx = genderIndex(ctx.senderGender);
  let out = text.replace(/\{g:([^|}]*)\|([^|}]*)\|([^}]*)\}/g, (_m, a, b, c) => [a, b, c][gIdx]);
  out = out
    .split("{sender}").join(ctx.senderName)
    .split("{recipient}").join(ctx.recipientName)
    .split("{occasion}").join(ctx.occasion || "")
    .split("{nickname}").join(ctx.specialNickname || "");
  return out;
}

function needsOccasion(text: string) {
  return text.includes("{occasion}");
}

function pick<T>(arr: T[], used: Set<string>, idOf: (t: T) => string): T | null {
  const fresh = arr.filter((x) => !used.has(idOf(x)));
  const pool = fresh.length ? fresh : arr; // لو خلصت العناصر الفريدة، ارجع للمجموعة كاملة بدل ما تفضل فاضي
  if (!pool.length) return null;
  const choice = pool[Math.floor(Math.random() * pool.length)];
  used.add(idOf(choice));
  return choice;
}

/**
 * يبني تجربة كاملة (افتتاحية + أقسام + خاتمة) بناءً على بيانات التجربة.
 * لا يخترع أي تفاصيل غير موجودة في `data` - التفاصيل الاختيارية الفارغة لا تُضاف كأقسام.
 */
export function buildExperience(data: ExperienceData): RenderedExperience {
  const lang = data.language;
  const used = new Set<string>();
  const hasOccasion = !!(data.occasion && data.occasion.trim());

  const openings = openingClosingTexts.filter((t) => t.kind === "opening" && t.lang === lang);
  const closings = openingClosingTexts.filter((t) => t.kind === "closing" && t.lang === lang);
  const opening = interpolate(pick(openings, used, (x) => x.id)?.body || "", data);
  const closing = interpolate(pick(closings, used, (x) => x.id)?.body || "", data);

  const sections: RenderedSection[] = [];

  const pushMessage = (lib: typeof loveMessages) => {
    const pool = lib.filter((m) => m.lang === lang && (hasOccasion || !m.paragraphs.some(needsOccasion)));
    const item = pick(pool, used, (x) => x.id);
    if (item) sections.push({ kind: "message", title: item.title, paragraphs: item.paragraphs.map((p) => interpolate(p, data)) });
  };
  const pushPoem = () => {
    const pool = lovePoems.filter((p) => p.lang === lang);
    const item = pick(pool, used, (x) => x.id);
    if (item) sections.push({ kind: "poem", title: item.title, lines: item.lines.map((l) => interpolate(l, data)) });
  };
  const pushPosts = (count: number) => {
    const pool = lovePosts.filter((p) => p.lang === lang);
    for (let i = 0; i < count; i++) {
      const item = pick(pool, used, (x) => x.id);
      if (item) sections.push({ kind: "post", body: interpolate(item.body, data) });
    }
  };
  const pushThought = () => {
    const pool = loveThoughts.filter((t) => t.lang === lang);
    const item = pick(pool, used, (x) => x.id);
    if (item) sections.push({ kind: "thought", body: interpolate(item.body, data) });
  };

  switch (data.experienceType) {
    case "message":
      pushMessage(loveMessages);
      break;
    case "collection":
      pushPosts(4);
      break;
    case "poem":
      pushPoem();
      pushPoem();
      break;
    case "story":
      pushMessage(loveMessages);
      pushThought();
      break;
    case "apology":
      pushMessage(apologyMessages);
      break;
    case "longing":
      pushMessage(longingMessages);
      break;
    case "occasion":
      pushMessage(occasionMessages);
      break;
    case "mixed":
      pushMessage(loveMessages);
      pushPoem();
      pushPosts(2);
      pushThought();
      break;
    default:
      pushMessage(loveMessages);
  }

  // تفاصيل اختيارية يضيفها المستخدم - تُعرض فقط إذا وُجدت فعليًا، ولا يُخترع بديل عنها
  const extra = (label: string, value?: string | null) => {
    const v = (value || "").trim();
    if (v) sections.push({ kind: "detail", title: label, paragraphs: [v] });
  };
  extra(lang === "masri" ? "ذكرى لا تُنسى" : "ذكرى لا تُنسى", data.specialMemory);
  extra(lang === "masri" ? "يوم مميز" : "يوم مميز", data.memorableMoment);
  if (data.personalMessage && data.personalMessage.trim()) {
    // الرسالة الشخصية تُعرض كما كتبها المستخدم تمامًا، بلا تعديل في معناها
    sections.push({ kind: "detail", title: lang === "masri" ? "كلمات من القلب" : "كلمات من القلب", paragraphs: [data.personalMessage.trim()] });
  }
  if (data.specialPhrase && data.specialPhrase.trim()) {
    sections.push({ kind: "detail", paragraphs: [`"${data.specialPhrase.trim()}"`] });
  }

  return { opening, sections, closing };
}

export function pickShortPhrase(lang: Lang, data: ExperienceData): string {
  const pool = shortPhrases.filter((p) => p.lang === lang);
  const item = pool[Math.floor(Math.random() * pool.length)];
  return item ? interpolate(item.body, data) : "";
}
