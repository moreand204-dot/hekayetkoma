import Link from "next/link";
import { HeartIcon } from "@/components/icons";

export default function HomePage() {
  return (
    <div className="wrap center fade-in">
      <HeartIcon />
      <h1>حكايتكما</h1>
      <p className="sub">اصنع تجربة حب خاصة وأرسلها لمن تحب، برابط فريد يحمل اسمه.</p>
      <Link href="/create" className="btn btn-primary">
        <HeartIcon /> اصنع حكايتكما
      </Link>
      <p className="sub" style={{ marginTop: 18 }}>
        اختر أسلوب الكتابة، أضف أسماءكما وذكرياتكما، واحصل على رابط خاص بكما يفتحه من تحب من أي جهاز.
      </p>
    </div>
  );
}
