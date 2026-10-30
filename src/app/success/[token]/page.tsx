import Link from "next/link";
import { prisma } from "@/lib/db";
import { StarIcon, LinkIcon } from "@/components/icons";
import ShareLinkActions from "@/components/wizard/ShareLinkActions";

export default async function SuccessPage({ params }: { params: { token: string } }) {
  const exp = await prisma.experience.findUnique({ where: { publicToken: params.token } });

  if (!exp) {
    return (
      <div className="wrap center fade-in">
        <h2>لم نجد هذه التجربة</h2>
        <p className="sub">قد تكون التجربة لم تُحفظ بنجاح.</p>
        <Link className="btn btn-primary" href="/create">إنشاء تجربة جديدة</Link>
      </div>
    );
  }

  const base = process.env.NEXT_PUBLIC_SITE_URL || "";
  const url = `${base}/love/${exp.publicToken}`;

  return (
    <div className="wrap center fade-in">
      <StarIcon />
      <h2>تم إنشاء حكايتكما 🎉</h2>
      <p className="sub">شارك هذا الرابط مع {exp.recipientName}</p>
      <div className="link-box"><LinkIcon /><span>{url}</span></div>
      <ShareLinkActions url={url} />
      <Link className="btn btn-ghost btn-block" href={`/love/${exp.publicToken}`}>معاينة التجربة</Link>
      <Link className="btn btn-ghost btn-block" href="/create">تجربة جديدة</Link>
    </div>
  );
}
