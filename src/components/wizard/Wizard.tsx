"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BackIcon, HeartIcon, NextIcon } from "@/components/icons";

type Gender = "male" | "female" | "unspecified" | "";
type Lang = "masri" | "fusha";

interface WizardData {
  senderGender: Gender;
  senderName: string;
  recipientName: string;
  experienceType: string;
  language: Lang;
  relationshipStartDate: string;
  specialMemory: string;
  memorableMoment: string;
  personalMessage: string;
  specialNickname: string;
  occasion: string;
  recipientDescription: string;
  specialPhrase: string;
  theme: string;
}

const EMPTY: WizardData = {
  senderGender: "", senderName: "", recipientName: "", experienceType: "", language: "masri",
  relationshipStartDate: "", specialMemory: "", memorableMoment: "", personalMessage: "",
  specialNickname: "", occasion: "", recipientDescription: "", specialPhrase: "", theme: "cinematic",
};

const TYPES: [string, string, string][] = [
  ["message", "رسالة حب شخصية", "كلمات مباشرة من القلب"],
  ["collection", "مجموعة رسائل قصيرة", "بطاقات متعددة قصيرة"],
  ["poem", "قصيدة عاطفية", "نص شعري أصلي"],
  ["story", "حكاية عن العلاقة", "سرد على هيئة مشاهد"],
  ["apology", "اعتذار ومصالحة", "كلمات صادقة ومسؤولة"],
  ["longing", "شوق واشتياق", "أسلوب أدبي حالم"],
  ["occasion", "رسالة مناسبة", "عيد ميلاد أو ذكرى خاصة"],
  ["mixed", "تجربة متعددة", "تجمع أكثر من نوع"],
];
const THEMES: [string, string][] = [
  ["cinematic", "سينمائي داكن"],
  ["soft", "ناعم فاتح"],
  ["starry", "سماء ليلية"],
];
const STEP_TITLES = ["مين صاحب الرسالة؟", "اسمك واسم من تحب", "لغة الكتابة", "نوع التجربة", "تفاصيل اختيارية", "شكل صفحة الاستقبال"];

export default function Wizard() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [data, setData] = useState<WizardData>(EMPTY);
  const [err, setErr] = useState("");
  const [saving, setSaving] = useState(false);

  const set = <K extends keyof WizardData>(k: K, v: WizardData[K]) => setData((d) => ({ ...d, [k]: v }));

  function next() {
    setErr("");
    if (step === 1 && !data.senderGender) return setErr("من فضلك اختر إجابة.");
    if (step === 2 && (!data.senderName.trim() || !data.recipientName.trim())) return setErr("الاسمان مطلوبان.");
    if (step === 4 && !data.experienceType) return setErr("اختر نوع التجربة.");
    if (step < 7) setStep(step + 1);
  }
  function back() { setErr(""); setStep(step - 1); }

  async function createExperience() {
    if (saving) return;
    setSaving(true); setErr("");
    try {
      const res = await fetch("/api/experiences", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          senderName: data.senderName.trim(),
          recipientName: data.recipientName.trim(),
          senderGender: data.senderGender,
          writingVoice: "auto",
          experienceType: data.experienceType,
          language: data.language,
          theme: data.theme,
          relationshipStartDate: data.relationshipStartDate,
          specialMemory: data.specialMemory,
          memorableMoment: data.memorableMoment,
          personalMessage: data.personalMessage,
          specialNickname: data.specialNickname,
          occasion: data.occasion,
          recipientDescription: data.recipientDescription,
          specialPhrase: data.specialPhrase,
        }),
      });
      if (!res.ok) throw new Error("save_failed");
      const json = await res.json();
      router.push(`/success/${json.token}`);
    } catch {
      setErr("تعذر حفظ التجربة الآن، تحقق من اتصالك وحاول مرة أخرى.");
      setSaving(false);
    }
  }

  if (step === 7 && data.experienceType) {
    // معاينة نهائية
    const typeLabel = TYPES.find((t) => t[0] === data.experienceType)?.[1] || "";
    const themeLabel = THEMES.find((t) => t[0] === data.theme)?.[1] || "";
    const rows: [string, string][] = [
      ["المرسل", data.senderName], ["إلى", data.recipientName],
      ["اللغة", data.language === "masri" ? "مصري" : "فصحى"],
      ["نوع التجربة", typeLabel], ["التصميم", themeLabel],
    ];
    const optional: [string, string][] = [
      ["ذكرى مميزة", data.specialMemory], ["موقف لا يُنسى", data.memorableMoment],
      ["لقب خاص", data.specialNickname], ["المناسبة", data.occasion],
    ].filter(([, v]) => v.trim()) as [string, string][];

    return (
      <div className="wrap fade-in">
        <h2>معاينة نهائية</h2>
        <div className="card">
          {rows.map(([l, v]) => <div className="summary-row" key={l}><span>{l}</span><b>{v}</b></div>)}
          {optional.map(([l, v]) => <div className="summary-row" key={l}><span>{l}</span><b>{v}</b></div>)}
        </div>
        <button className="btn btn-primary btn-block" disabled={saving} onClick={createExperience}>
          <HeartIcon /> {saving ? "جارِ الحفظ..." : "إنشاء التجربة"}
        </button>
        <button className="btn btn-ghost btn-block" onClick={() => setStep(1)}>
          <BackIcon /> تعديل البيانات
        </button>
        <div className="err">{err}</div>
      </div>
    );
  }

  const progress = [1, 2, 3, 4, 5, 6].map((i) => <span key={i} className={i <= step ? "on" : ""} />);

  return (
    <div className="wrap fade-in">
      <div className="progress">{progress}</div>
      <h2>{STEP_TITLES[step - 1]}</h2>
      <div className="card">
        {step === 1 && (
          <div className="opt-grid">
            <div className={`opt ${data.senderGender === "male" ? "sel" : ""}`} onClick={() => set("senderGender", "male")}><b>ذكر</b></div>
            <div className={`opt ${data.senderGender === "female" ? "sel" : ""}`} onClick={() => set("senderGender", "female")}><b>أنثى</b></div>
            <div style={{ gridColumn: "1/3" }} className={`opt ${data.senderGender === "unspecified" ? "sel" : ""}`} onClick={() => set("senderGender", "unspecified")}><b>أفضل عدم التحديد</b></div>
          </div>
        )}
        {step === 2 && (
          <>
            <label>اسمك إيه؟</label>
            <input value={data.senderName} maxLength={60} placeholder="مثال: أحمد" onChange={(e) => set("senderName", e.target.value)} />
            <label>واسم الشخص اللي بتحبه؟</label>
            <input value={data.recipientName} maxLength={60} placeholder="مثال: سارة" onChange={(e) => set("recipientName", e.target.value)} />
          </>
        )}
        {step === 3 && (
          <div className="opt-grid">
            <div className={`opt ${data.language === "masri" ? "sel" : ""}`} onClick={() => set("language", "masri")}><b>مصري</b>لهجة دافئة وعفوية</div>
            <div className={`opt ${data.language === "fusha" ? "sel" : ""}`} onClick={() => set("language", "fusha")}><b>فصحى</b>لغة أدبية شاعرية</div>
          </div>
        )}
        {step === 4 && (
          <div className="opt-grid col1">
            {TYPES.map(([id, label, desc]) => (
              <div key={id} className={`opt ${data.experienceType === id ? "sel" : ""}`} onClick={() => set("experienceType", id)}>
                <b>{label}</b>{desc}
              </div>
            ))}
          </div>
        )}
        {step === 5 && (
          <>
            <label>تاريخ بداية العلاقة (اختياري)</label>
            <input value={data.relationshipStartDate} placeholder="مثال: صيف 2023" onChange={(e) => set("relationshipStartDate", e.target.value)} />
            <label>ذكرى مميزة (اختياري)</label>
            <textarea rows={2} value={data.specialMemory} onChange={(e) => set("specialMemory", e.target.value)} />
            <label>موقف لا يُنسى (اختياري)</label>
            <textarea rows={2} value={data.memorableMoment} onChange={(e) => set("memorableMoment", e.target.value)} />
            <label>رسالة شخصية (اختياري)</label>
            <textarea rows={3} maxLength={1200} value={data.personalMessage} onChange={(e) => set("personalMessage", e.target.value)} />
            <label>لقب خاص (اختياري)</label>
            <input value={data.specialNickname} onChange={(e) => set("specialNickname", e.target.value)} />
            <label>المناسبة (اختياري)</label>
            <input value={data.occasion} onChange={(e) => set("occasion", e.target.value)} />
            <label>وصف مختصر له/لها (اختياري)</label>
            <input value={data.recipientDescription} onChange={(e) => set("recipientDescription", e.target.value)} />
            <label>عبارة خاصة (اختياري)</label>
            <input value={data.specialPhrase} onChange={(e) => set("specialPhrase", e.target.value)} />
          </>
        )}
        {step === 6 && (
          <div className="opt-grid col1">
            {THEMES.map(([id, label]) => (
              <div key={id} className={`opt ${data.theme === id ? "sel" : ""}`} onClick={() => set("theme", id)}><b>{label}</b></div>
            ))}
          </div>
        )}
        <div className="err">{err}</div>
      </div>
      <div className="row-nav">
        {step > 1 ? <button className="btn btn-ghost" onClick={back}><BackIcon /> رجوع</button> : <span />}
        <button className="btn btn-primary" onClick={next}>{step < 6 ? "التالي" : "المعاينة"} <NextIcon /></button>
      </div>
    </div>
  );
}
