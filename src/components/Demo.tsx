"use client";

import { useState } from "react";

const TABS = ["Scan", "Mark File", "Build Ideas"] as const;

function ScanPanel() {
  return (
    <div className="bg-paper border border-border rounded-card overflow-hidden">
      <div className="bg-surface border-b border-border py-2 px-3 flex items-center gap-2">
        <div className="flex gap-1">
          <span className="size-[9px] rounded-full bg-[#FF6057]"></span>
          <span className="size-[9px] rounded-full bg-[#FFBD2E]"></span>
          <span className="size-[9px] rounded-full bg-[#28CA40]"></span>
        </div>
        <div className="flex-1 bg-paper border border-border rounded-sm py-[3px] px-[10px] text-[11px] font-mono text-muted">
          github.com/ggerganov/whisper.cpp
        </div>
        <div className="size-[22px] rounded-sm bg-ink flex items-center justify-center text-[10px] font-bold text-paper">
          M
        </div>
      </div>
      <div className="h-[240px] bg-paper p-3 flex gap-3 relative">
        <div className="w-[140px] bg-paper border border-border rounded-md p-[10px] flex-shrink-0 self-start">
          <div className="text-[12px] font-semibold text-accent font-mono mb-1">whisper.cpp</div>
          <div className="text-[10px] text-muted font-mono leading-[1.8]">⭐ 38.2k<br />C++ · MIT</div>
        </div>
        <div className="flex-1 flex flex-col gap-[5px]">
          <div className="text-[10px] font-mono text-accent bg-accent-bg px-2 py-1 rounded-sm flex items-center gap-[5px]">📄 CMakeLists.txt</div>
          <div className="text-[10px] font-mono text-muted px-2 py-1 flex items-center gap-[5px]">📄 whisper.h</div>
          <div className="text-[10px] font-mono text-muted px-2 py-1 flex items-center gap-[5px]">📦 bindings/</div>
          <div className="text-[10px] font-mono text-muted px-2 py-1 flex items-center gap-[5px]">📄 requirements.txt</div>
        </div>
        <div
          className="absolute top-[10px] right-[10px] w-[230px] bg-paper border border-border rounded-md overflow-hidden"
          style={{ boxShadow: "var(--shadow-popup)", transformOrigin: "top right", animation: "fpIn .45s cubic-bezier(.16,1,.3,1) both" }}
        >
          <div className="px-[10px] py-[6px] border-b border-border flex justify-between items-center">
            <div className="text-[11px] font-bold flex items-center gap-[5px]">
              <span className="size-[6px] rounded-full bg-accent" style={{ animation: "epblink 2s infinite" }} />MARK
            </div>
            <div className="text-[9px] font-mono text-muted">whisper.cpp</div>
          </div>
          <div className="h-[64px] bg-surface relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center gap-[5px] flex-wrap p-[5px]">
              <span className="size-[6px] rounded-full bg-accent/40"></span>
              <span className="size-[6px] rounded-full bg-accent/40"></span>
              <span className="size-[6px] rounded-full bg-accent/40"></span>
            </div>
          </div>
          <div className="bg-term-bg px-[10px] py-[6px] font-mono text-[9.5px] leading-[1.8]" style={{ minHeight: 66 }}>
            <div>
              <span className="text-[#3a3a38]">▸</span> <span className="text-term-text">scanning...</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MarkFilePanel() {
  return (
    <div className="bg-paper border border-border rounded-card overflow-hidden">
      <div className="bg-ink py-[10px] px-[14px] flex justify-between items-center">
        <div className="text-[12px] font-semibold text-paper font-mono flex items-center gap-[6px]">
          <span className="size-[6px] rounded-full bg-term-green"></span>CLAUDE.md
        </div>
        <div className="flex gap-[5px]">
          <span className="text-[9px] font-mono px-[7px] py-[2px] rounded-sm" style={{ background: "rgba(125,174,234,.15)", color: "#7DAEEA", border: ".5px solid rgba(125,174,234,.3)" }}>whisper.cpp</span>
          <span className="text-[9px] font-mono px-[7px] py-[2px] rounded-sm" style={{ background: "rgba(109,190,138,.15)", color: "#6DBE8A", border: ".5px solid rgba(109,190,138,.3)" }}>generated ✓</span>
        </div>
      </div>
      <div className="bg-term-bg px-4 py-3 font-mono text-[11px] leading-[1.9]" style={{ minHeight: 250, color: "var(--term-text)" }}>
        <div className="text-[#7DAEEA]"># whisper.cpp — MARK File</div>
        <div className="text-term-dim"># Auto-generated intelligence report</div>
        <br />
        <div><span className="text-term-green">›</span> stack: C++ · CMake · Python bindings</div>
        <div><span className="text-term-green">›</span> architecture-depth: 92%</div>
        <div><span className="text-term-green">›</span> skill-match: 8 patterns detected</div>
        <div><span className="text-term-green">›</span> recommended: audio pipeline utility</div>
        <br />
        <div className="text-term-dim"># Drop this file into your repo.</div>
        <div className="text-term-dim"># Claude Code reads it automatically.</div>
      </div>
    </div>
  );
}

function BuildIdeasPanel() {
  const ideas = [
    { token: "$WHISPERX", name: "Transcript to Token", desc: "Pay-per-minute live transcription API with on-chain usage." },
    { token: "$VOICEAI", name: "Voice Memo Vault", desc: "Encrypted voice notes that mint as searchable NFT transcripts." },
    { token: "$STTV", name: "Stream Subtitle TV", desc: "Real-time captioning overlay for livestreams, tipped in token." },
  ];
  return (
    <div className="flex flex-col gap-[10px]">
      {ideas.map((idea) => (
        <div key={idea.token} className="bg-paper border border-border rounded-card p-4 text-left">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono px-[7px] py-[2px] rounded-sm text-accent bg-accent-bg border border-accent-border">{idea.token}</span>
            <span className="text-[13px] font-semibold text-ink">{idea.name}</span>
          </div>
          <div className="text-[12px] text-muted leading-[1.6]">{idea.desc}</div>
        </div>
      ))}
    </div>
  );
}

const PANELS = [<ScanPanel key="scan" />, <MarkFilePanel key="mark" />, <BuildIdeasPanel key="build" />];

export default function Demo() {
  const [active, setActive] = useState(0);

  return (
    <section id="demo" className="py-20 px-10 bg-paper">
      <div className="max-w-[1080px] mx-auto grid md:grid-cols-[minmax(0,640px)_1fr] grid-cols-1 gap-12 items-center">
        <div className="min-w-0">
          <div className="flex flex-col items-start text-left mb-10" data-reveal>
            <span className="inline-flex items-center gap-[6px] text-[11px] font-medium tracking-[.08em] uppercase text-muted bg-surface border border-border rounded-pill px-[14px] py-[5px] mb-4">
              Live demo
            </span>
            <h2 className="font-bold tracking-[-.03em] text-ink m-0 mb-3 leading-[1.1]" style={{ fontSize: "var(--text-h2)" }}>
              Two layers of intelligence
            </h2>
            <p className="text-[15px] text-muted leading-[1.65] max-w-[520px] m-0">
              Every scan returns a MARK File — a deep codebase read — plus three pump.fun-ready utility ideas derived
              from what the repo can actually do.
            </p>
          </div>

          <div className="max-w-[640px]" data-reveal>
            <div className="flex border border-border rounded-md bg-paper overflow-hidden mb-3">
              {TABS.map((tab, i) => {
                const isActive = i === active;
                return (
                  <button
                    key={tab}
                    onClick={() => setActive(i)}
                    className="flex-1 py-[10px] px-2 text-center text-[12px] font-medium cursor-pointer transition-colors duration-200"
                    style={{
                      background: isActive ? "var(--ink)" : "var(--paper)",
                      color: isActive ? "var(--paper)" : "var(--muted)",
                      borderRightWidth: 0.5,
                      borderRightStyle: "solid",
                      borderRightColor: "var(--border)",
                    }}
                  >
                    <span className="block font-mono mb-[1px]" style={{ fontSize: 9, opacity: 0.55 }}>0{i + 1}</span>
                    {tab}
                  </button>
                );
              })}
            </div>
            <div className="h-[2px] bg-border rounded-pill mb-5 overflow-hidden">
              <div className="h-full bg-ink rounded-pill transition-all duration-500" style={{ width: `${((active + 1) / TABS.length) * 100}%` }}></div>
            </div>
            <div className="grid">
              {PANELS.map((panel, i) => (
                <div
                  key={i}
                  className="col-start-1 row-start-1"
                  style={{
                    opacity: i === active ? 1 : 0,
                    pointerEvents: i === active ? "auto" : "none",
                    animation: i === active ? "fpIn .45s cubic-bezier(.16,1,.3,1) both" : "none",
                  }}
                >
                  {panel}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative flex flex-col items-center justify-center min-w-0">
          <div className="relative w-full max-w-[360px]">
            <span
              className="absolute text-[10px] font-mono px-[10px] py-[3px] rounded-pill"
              style={{ top: "6%", left: "-4%", background: "#EBF2FF", color: "#1A47A8", border: ".5px solid #C3D7F7", boxShadow: "0 8px 32px rgba(0,0,0,.08)", animation: "rktF 3.2s ease-in-out infinite 0s" }}
            >
              scanning repo…
            </span>
            <span
              className="absolute text-[10px] font-mono px-[10px] py-[3px] rounded-pill"
              style={{ top: "30%", right: "-8%", background: "#E9F5E9", color: "#1B6B28", border: ".5px solid #B6DEB9", boxShadow: "0 8px 32px rgba(0,0,0,.08)", animation: "rktF 3.2s ease-in-out infinite .8s" }}
            >
              8 skills matched ✓
            </span>
            <span
              className="absolute text-[10px] font-mono px-[10px] py-[3px] rounded-pill"
              style={{ bottom: "12%", left: "-2%", background: "#F7F6F3", color: "#888785", border: ".5px solid #E5E3DC", boxShadow: "0 8px 32px rgba(0,0,0,.08)", animation: "rktF 3.2s ease-in-out infinite 1.6s" }}
            ></span>
            <div className="w-full" style={{ transform: "scale(1.04)" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/mark-image.png"
                alt="MARK mascot"
                className="w-full h-auto block"
                style={{ filter: "drop-shadow(0 24px 48px rgba(0,0,0,.12))", animation: "rktF 4s ease-in-out infinite" }}
              />
            </div>
          </div>
          <div className="text-[11px] font-mono text-muted mt-2 text-center">MARK — your repo intelligence cat</div>
        </div>
      </div>
    </section>
  );
}
