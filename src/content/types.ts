// أنواع مشتركة لعناصر مكتبة المحتوى الأدبي

export type Lang = "masri" | "fusha";
export type Length = "short" | "medium" | "long";

/**
 * نص قد يحتوي على:
 *  - {recipient} / {sender}  : اسم المستلم / المرسل
 *  - {g:ذكر|أنثى|محايد}      : يُستبدل بالصيغة المناسبة حسب جنس المرسل المختار
 *    (الترتيب داخل القوسين ثابت: صيغة مذكر | صيغة مؤنث | صيغة محايدة)
 */
export type TemplateText = string;

export interface PostItem {
  id: string;
  lang: Lang;
  topic: string; // مثال: "حب هادئ"، "اشتياق"، "امتنان"...
  length: Length;
  body: TemplateText;
}

export interface MessageItem {
  id: string;
  lang: Lang;
  topic: string;
  title: string;
  paragraphs: TemplateText[]; // بداية - متن - خاتمة على الأقل
}

export interface ThoughtItem {
  id: string;
  lang: Lang;
  length: Length;
  body: TemplateText;
}

export interface PoemItem {
  id: string;
  lang: Lang;
  topic: string;
  title: string;
  lines: TemplateText[]; // قد تحتوي على أسطر فارغة "" لفصل المقاطع
}

export interface ShortPhraseItem {
  id: string;
  lang: Lang;
  body: TemplateText;
}

export interface OpeningClosingItem {
  id: string;
  lang: Lang;
  kind: "opening" | "closing";
  body: TemplateText;
}
