import { OpeningClosingItem } from "./types";

// نصوص افتتاحية وختامية - 6 افتتاحية + 6 ختامية لكل لغة

export const openingClosingTexts: OpeningClosingItem[] = [
  // ======= افتتاحيات مصري =======
  { id: "open-m-01", lang: "masri", kind: "opening", body: "في حكاية صغيرة اتعملت مخصوص علشانك يا {recipient}..." },
  { id: "open-m-02", lang: "masri", kind: "opening", body: "فيه حد حب يبعتلك حاجة من قلبه يا {recipient}..." },
  { id: "open-m-03", lang: "masri", kind: "opening", body: "قبل ما تكمل... خد نفس عميق، اللي جاي من القلب." },
  { id: "open-m-04", lang: "masri", kind: "opening", body: "{recipient}، حد مستني اللحظة دي عشان يقولك حاجة مهمة." },
  { id: "open-m-05", lang: "masri", kind: "opening", body: "استعد يا {recipient}، في كلام محضرلك بحب." },
  { id: "open-m-06", lang: "masri", kind: "opening", body: "اللحظة دي اتكتبت بعناية عشانك يا {recipient}." },

  // ======= افتتاحيات فصحى =======
  { id: "open-f-01", lang: "fusha", kind: "opening", body: "في حكاية صغيرة صُنعت خصيصًا من أجلك يا {recipient}..." },
  { id: "open-f-02", lang: "fusha", kind: "opening", body: "هناك من أرسل لك شيئًا من قلبه يا {recipient}..." },
  { id: "open-f-03", lang: "fusha", kind: "opening", body: "قبل أن تكمل... خذ نفسًا عميقًا، فما يأتي قادم من القلب." },
  { id: "open-f-04", lang: "fusha", kind: "opening", body: "{recipient}، هناك من انتظر هذه اللحظة ليقول لك شيئًا مهمًا." },
  { id: "open-f-05", lang: "fusha", kind: "opening", body: "استعد يا {recipient}، ثمة كلمات أُعدّت لك بحب." },
  { id: "open-f-06", lang: "fusha", kind: "opening", body: "هذه اللحظة كُتبت بعناية من أجلك يا {recipient}." },

  // ======= خواتيم مصري =======
  { id: "close-m-01", lang: "masri", kind: "closing", body: "من {sender}، لك وحدك." },
  { id: "close-m-02", lang: "masri", kind: "closing", body: "كل ده كان عشانك يا {recipient}، من {sender}." },
  { id: "close-m-03", lang: "masri", kind: "closing", body: "خليك فاكر إنك محبوب، من {sender}." },
  { id: "close-m-04", lang: "masri", kind: "closing", body: "لحد ما نتقابل في حكاية جديدة... من {sender}." },
  { id: "close-m-05", lang: "masri", kind: "closing", body: "ده جزء بسيط من حبي ليك، من {sender}." },
  { id: "close-m-06", lang: "masri", kind: "closing", body: "دايمًا هفضل {g:شاكر|شاكرة|شاكر ربنا} إنك في حياتي. - {sender}" },

  // ======= خواتيم فصحى =======
  { id: "close-f-01", lang: "fusha", kind: "closing", body: "من {sender}، لك وحدك." },
  { id: "close-f-02", lang: "fusha", kind: "closing", body: "كل هذا كان من أجلك يا {recipient}، من {sender}." },
  { id: "close-f-03", lang: "fusha", kind: "closing", body: "تذكّر أنك محبوب، من {sender}." },
  { id: "close-f-04", lang: "fusha", kind: "closing", body: "إلى أن نلتقي في حكاية جديدة... من {sender}." },
  { id: "close-f-05", lang: "fusha", kind: "closing", body: "هذا جزء بسيط من حبي لك، من {sender}." },
  { id: "close-f-06", lang: "fusha", kind: "closing", body: "سأبقى دائمًا {g:شاكرًا|شاكرة|شاكرًا} لوجودك في حياتي. - {sender}" },
];
