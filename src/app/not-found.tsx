import Link from "next/link";

export default function NotFound() {
  return (
    <div className="wrap center fade-in">
      <h2>الصفحة غير موجودة</h2>
      <p className="sub">الرابط اللي فتحته مش موجود.</p>
      <Link className="btn btn-primary" href="/">العودة للرئيسية</Link>
    </div>
  );
}
