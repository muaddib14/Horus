"use client";

import { useState } from "react";
import Image from "next/image";

const LINKS = [
  { href: "#features", label: "Features" },
  { href: "#process", label: "How it works" },
  { href: "#docs", label: "Docs" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-10 h-[58px]"
      style={{
        background: "rgba(247,246,243,.88)",
        backdropFilter: "blur(12px)",
        borderBottom: ".5px solid rgba(229,227,220,.7)",
        transition: "transform .4s cubic-bezier(.16,1,.3,1)",
      }}
    >
      <div className="flex items-center gap-[10px]">
        <Image src="/logo.jpg" alt="HORUS logo" width={28} height={28} className="size-7 rounded-[7px] object-cover" />
        <span className="font-mono text-[14px] font-bold uppercase tracking-[.08em] text-ink">HORUS</span>
      </div>
      <div className="items-center gap-8 hidden md:flex">
        {LINKS.map((l) => (
          <a key={l.href} href={l.href} className="text-[13px] text-muted transition-colors duration-150 hover:text-ink cursor-pointer no-underline">
            {l.label}
          </a>
        ))}
      </div>
      <div className="flex items-center gap-3">
        <a
          href="https://pump.fun/coin/G7fKnj922xVupqZgKwCAk7UmBE5TjbNTrzconXW3pump"
          target="_blank"
          rel="noopener noreferrer"
          title="View $HORUS on pump.fun"
          className="text-[12px] font-semibold px-5 py-[9px] rounded-pill flex items-center gap-[6px] tracking-[.01em] transition-colors duration-150 hidden md:flex no-underline"
          style={{ border: "1px solid var(--accent-border)", color: "var(--accent-text)" }}
        >
          $HORUS on pump.fun
          <svg width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <path d="M7 17L17 7M7 7h10v10"></path>
          </svg>
        </a>
        <a
          href="https://github.com/muaddib14/Horus-Extension/releases/latest"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[12px] font-semibold px-5 py-[9px] rounded-pill border-none flex items-center gap-[7px] tracking-[.01em] transition-opacity duration-150 hover:opacity-[.85] hidden md:flex no-underline"
          style={{ background: "var(--accent)", color: "var(--accent-ink)" }}
        >
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"></path>
            <path d="M10 17l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"></path>
          </svg>
          Install Extension
        </a>
        <button
          className="md:hidden flex flex-col gap-[5px] p-2 cursor-pointer bg-transparent border-none"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="block h-[2px] rounded-sm bg-ink transition-all duration-300" style={{ width: 22, transform: open ? "translateY(7px) rotate(45deg)" : "none" }}></span>
          <span className="block h-[2px] rounded-sm bg-ink transition-all duration-300" style={{ width: 22, opacity: open ? 0 : 1 }}></span>
          <span className="block h-[2px] rounded-sm bg-ink transition-all duration-300" style={{ width: 22, transform: open ? "translateY(-7px) rotate(-45deg)" : "none" }}></span>
        </button>
      </div>

      {open && (
        <div
          className="md:hidden absolute top-[58px] left-0 right-0 flex flex-col px-10 py-4 gap-4"
          style={{ background: "var(--paper)", borderBottom: "1px solid var(--border)", boxShadow: "var(--shadow-md)" }}
        >
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-[14px] text-ink no-underline py-1"
            >
              {l.label}
            </a>
          ))}
          <a
            href="https://pump.fun/coin/G7fKnj922xVupqZgKwCAk7UmBE5TjbNTrzconXW3pump"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[13px] font-semibold px-5 py-[10px] rounded-md text-center no-underline flex items-center justify-center gap-[6px]"
            style={{ border: "1px solid var(--accent-border)", color: "var(--accent-text)" }}
          >
            $HORUS on pump.fun
            <svg width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <path d="M7 17L17 7M7 7h10v10"></path>
            </svg>
          </a>
          <a
            href="https://github.com/muaddib14/Horus-Extension/releases/latest"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[13px] font-semibold px-5 py-[10px] rounded-md text-center no-underline"
            style={{ background: "var(--accent)", color: "var(--accent-ink)" }}
          >
            Install Extension
          </a>
        </div>
      )}
    </nav>
  );
}
