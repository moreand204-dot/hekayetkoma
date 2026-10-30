import Link from "next/link";

export default function LoveNotFound() {
  return (
    <div className="wrap center fade-in">
      <h2>الرابط غير موجود</h2>
      <p className="sub">قد تكون التجربة محذوفة، أو منتهية الصلاحية، أو أن الرابط غير صحيح.</p>
      <Link className="btn btn-primary" href="/">العودة للرئيسية</Link>
    </div>
  );
}
