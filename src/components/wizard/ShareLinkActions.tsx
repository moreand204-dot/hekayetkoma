"use client";

import { useState } from "react";
import { CopyIcon, ShareIcon } from "@/components/icons";

export default function ShareLinkActions({ url }: { url: string }) {
  const [copyMsg, setCopyMsg] = useState("");

  async function copyLink() {
    try {
      if (!navigator.clipboard) throw new Error("no-clipboard");
      await navigator.clipboard.writeText(url);
      setCopyMsg("تم نسخ الرابط ✓");
    } catch {
      // بديل عند عدم توفر Clipboard API
      window.prompt("انسخ الرابط يدويًا:", url);
    }
    setTimeout(() => setCopyMsg(""), 2500);
  }

  async function shareLink() {
    if (navigator.share) {
      try {
        await navigator.share({ title: "حكايتكما", url });
      } catch {
        /* المستخدم ألغى المشاركة - لا حاجة لرسالة خطأ */
      }
    } else {
      copyLink();
    }
  }

  return (
    <>
      <button className="btn btn-primary btn-block" onClick={copyLink}>
        <CopyIcon /> {copyMsg || "نسخ الرابط"}
      </button>
      <button className="btn btn-ghost btn-block" onClick={shareLink}>
        <ShareIcon /> مشاركة
      </button>
    </>
  );
}
