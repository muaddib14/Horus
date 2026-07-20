import type { ReactNode } from "react";

type Feature = {
  title: string;
  body: string;
  icon: ReactNode;
};

const FEATURES: Feature[] = [
  {
    title: "CLAUDE.md included",
    body: "Every scan outputs a production-ready CLAUDE.md — the file Claude Code reads automatically every session.",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
  },
  {
    title: "59 curated skills",
    body: "MARK scores your stack against 59 patterns — Next.js, TypeScript, Prisma, auth, testing, and more — and picks the top 6-8.",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    title: "30 second turnaround",
    body: "GitHub API manifest scan + Claude generation in one pass. No repo cloning. No file uploads.",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" style={{ transformOrigin: "50% 67%", animation: "cspin .5s linear infinite" }} />
      </svg>
    ),
  },
  {
    title: "pump.fun angles",
    body: "Every idea comes with a ticker, domain suggestion, value prop, and why it's viable as a token launch.",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18M9 21V9" />
      </svg>
    ),
  },
  {
    title: "ZIP download",
    body: "One click downloads CLAUDE.md + selected skill files + setup guide in a ready-to-drop ZIP.",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ animation: "dlb .9s ease-in-out infinite" }}>
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
    ),
  },
  {
    title: "Free, no account",
    body: "5 scans per day, no login, no API key needed. MARK handles everything on the server side.",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ animation: "shp 1.5s ease-in-out infinite" }}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
];

function Decoration({ index }: { index: number }) {
  if (index === 0) {
    return (
      <div className="flex flex-col gap-[3px]">
        <div className="h-[2px] rounded-sm" style={{ background: "#1A47A8", opacity: 0.4, width: 18, animation: "tlA 1.6s ease-in-out infinite 0s" }} />
        <div className="h-[2px] rounded-sm" style={{ background: "#1A47A8", opacity: 0.4, width: 13, animation: "tlA 1.6s ease-in-out infinite .25s" }} />
        <div className="h-[2px] rounded-sm" style={{ background: "#1A47A8", opacity: 0.4, width: 16, animation: "tlA 1.6s ease-in-out infinite .5s" }} />
      </div>
    );
  }
  if (index === 1) {
    return (
      <div className="w-[30px] flex flex-col gap-1">
        {[0, 0.35, 0.7].map((d) => (
          <div key={d} className="h-[2px] rounded-sm bg-border overflow-hidden">
            <div className="h-full rounded-sm" style={{ width: 0, animation: `sfill 2.2s ease-out infinite ${d}s`, background: d === 0 ? "#6DBE8A" : d === 0.35 ? "#90CAF9" : "#E8C56A" }} />
          </div>
        ))}
      </div>
    );
  }
  if (index === 3) {
    return (
      <div className="flex flex-col gap-[3px]">
        {["$DEPLOY", "$SPACES", "$BASE"].map((t, i) => (
          <div
            key={t}
            className="text-[8px] font-mono px-[5px] py-[1px] rounded-sm text-accent bg-accent-bg border border-accent-border"
            style={{ opacity: 0, transform: "translateX(4px)", animation: `tpin .5s ease-out ${i * 0.2}s forwards` }}
          >
            {t}
          </div>
        ))}
      </div>
    );
  }
  return null;
}

export default function Features() {
  return (
    <section id="features" data-screen-label="Features" className="py-20 px-10 bg-paper">
      <div className="max-w-[1080px] mx-auto">
        <div className="flex flex-col items-center text-center mb-12" data-reveal>
          <span className="inline-flex items-center gap-[6px] text-[11px] font-medium tracking-[.08em] uppercase text-muted bg-surface border border-border rounded-pill px-[14px] py-[5px] mb-4">
            What&apos;s inside
          </span>
          <h2 className="font-bold tracking-[-.03em] text-ink m-0 mb-3 leading-[1.1]" style={{ fontSize: "var(--text-h2)" }}>
            Built for crypto builders
          </h2>
          <p className="text-[15px] text-muted leading-[1.65] max-w-[520px] m-0">
            Everything in the output is designed for one thing: getting a utility website live and a token launched as
            fast as possible.
          </p>
        </div>
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px border border-border rounded-card overflow-hidden bg-border"
          data-reveal
        >
          {FEATURES.map((f, i) => (
            <div key={f.title} className="relative px-6 py-7 overflow-hidden transition-colors duration-200 group bg-paper">
              <div className="absolute right-5 top-[38px] opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <Decoration index={i} />
              </div>
              <div className="size-[36px] rounded-md flex items-center justify-center mb-[14px] transition-colors duration-200" style={{ background: "var(--surface)" }}>
                {f.icon}
              </div>
              <div className="text-[13px] font-semibold text-ink mb-[6px]">{f.title}</div>
              <div className="text-[12px] text-muted leading-[1.6]">{f.body}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
