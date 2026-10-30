"use client";

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="wrap center fade-in">
      <h2>حصل خطأ غير متوقع</h2>
      <p className="sub">ممكن يكون في مشكلة مؤقتة في الاتصال بالخادم أو قاعدة البيانات. جرّب تاني بعد شوية.</p>
      <button className="btn btn-primary" onClick={reset}>حاول تاني</button>
    </div>
  );
}
