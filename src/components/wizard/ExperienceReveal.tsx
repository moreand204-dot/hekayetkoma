"use client";

import { useState } from "react";
import { HeartIcon, StarIcon, MoonIcon } from "@/components/icons";
import { RenderedExperience } from "@/lib/content-selector";

export default function ExperienceReveal({
  recipientName,
  senderName,
  theme,
  content,
}: {
  recipientName: string;
  senderName: string;
  theme: string;
  content: RenderedExperience;
}) {
  const [opened, setOpened] = useState(false);

  if (!opened) {
    return (
      <div data-theme={theme} className="wrap center fade-in">
        <HeartIcon />
        <p className="sub">{content.opening}</p>
        <h1>{recipientName}</h1>
        <button className="btn btn-primary" onClick={() => setOpened(true)}>
          <StarIcon /> افتح رسالتك
        </button>
      </div>
    );
  }

  return (
    <div data-theme={theme} className="wrap fade-in">
      {content.sections.map((s, i) => {
        if (s.kind === "poem") {
          return (
            <div className="card" key={i}>
              {s.title && <div className="section-title"><StarIcon /> {s.title}</div>}
              {s.lines!.map((l, j) => <div className="poem-line" key={j}>{l || <>&nbsp;</>}</div>)}
            </div>
          );
        }
        if (s.kind === "message") {
          return (
            <div className="card" key={i}>
              {s.title && <div className="section-title"><MoonIcon /> {s.title}</div>}
              <div className="msg-text">{s.paragraphs!.join("\n\n")}</div>
            </div>
          );
        }
        if (s.kind === "detail") {
          return (
            <div key={i}>
              {s.title && <div className="section-title"><StarIcon /> {s.title}</div>}
              <div className="card msg-text">{s.paragraphs!.join("\n\n")}</div>
            </div>
          );
        }
        // post / thought
        return <div className="card msg-text" key={i}>{s.body}</div>;
      })}

      <p className="sub" style={{ marginTop: 20 }}>{content.closing}</p>
      <button className="btn btn-ghost btn-block" onClick={() => setOpened(false)}>
        اقرأ الرسالة مرة أخرى من البداية
      </button>
    </div>
  );
}
