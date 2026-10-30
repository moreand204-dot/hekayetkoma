import { customAlphabet } from "nanoid";

// أبجدية بلا أحرف متشابهة بصريًا (0/O ،1/l) لتقليل أخطاء النسخ اليدوي
const ALPHABET = "23456789abcdefghjkmnpqrstuvwxyz";

// 12 حرفًا من هذه الأبجدية تعطي مساحة احتمالات كبيرة بما يكفي لمنع التخمين العشوائي،
// وليست رقمًا متسلسلاً ولا مشتقة من اسم المستخدم أو تاريخ العلاقة.
const generate = customAlphabet(ALPHABET, 12);

export function generatePublicToken(): string {
  return generate();
}
