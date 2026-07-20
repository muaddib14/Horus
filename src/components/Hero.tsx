"use client";

import { useEffect, useRef } from "react";

function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    type P = { x: number; y: number; vx: number; vy: number };
    let particles: P[] = [];

    const resize = () => {
      const parent = canvas!.parentElement;
      width = parent?.clientWidth ?? window.innerWidth;
      height = parent?.clientHeight ?? window.innerHeight;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(70, Math.floor((width * height) / 16000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
      }));
    };

    const draw = () => {
      ctx!.clearRect(0, 0, width, height);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
      }
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        ctx!.beginPath();
        ctx!.arc(a.x, a.y, 1.4, 0, Math.PI * 2);
        ctx!.fillStyle = "rgba(26,71,168,0.18)";
        ctx!.fill();
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 120) {
            ctx!.beginPath();
            ctx!.moveTo(a.x, a.y);
            ctx!.lineTo(b.x, b.y);
            ctx!.strokeStyle = `rgba(26,71,168,${0.08 * (1 - dist / 120)})`;
            ctx!.lineWidth = 1;
            ctx!.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    if (!prefersReduced) {
      raf = requestAnimationFrame(draw);
    } else {
      draw();
      cancelAnimationFrame(raf);
    }
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 size-full pointer-events-none" />;
}

const STATS = [
  { label: "Scan time", value: "0s", sub: "average scan time", icon: "clock" },
  { label: "Skills", value: "0", sub: "curated skill patterns", icon: "layers" },
  { label: "Ideas", value: "0", sub: "build ideas per repo", icon: "send" },
  { label: "Logins", value: "0", sub: "logins required", icon: "shield" },
] as const;

function StatIcon({ name }: { name: string }) {
  const common = {
    width: 15,
    height: 15,
    fill: "none",
    stroke: "#1A47A8",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    viewBox: "0 0 24 24",
  };
  switch (name) {
    case "clock":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M12 8v4l3 3"></path>
        </svg>
      );
    case "layers":
      return (
        <svg {...common}>
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
        </svg>
      );
    case "send":
      return (
        <svg {...common}>
          <path d="M22 2 11 13M22 2 15 22l-4-9-9-4 20-7z"></path>
        </svg>
      );
    case "shield":
      return (
        <svg {...common}>
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
        </svg>
      );
    default:
      return null;
  }
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen px-10 pt-[140px] pb-20 flex flex-col items-center text-center overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden">
        <ParticleField />
      </div>

      <div className="relative z-[2] flex flex-col items-center max-w-[840px] mx-auto">
        <div
          className="inline-flex items-center gap-2 text-[11px] font-medium tracking-[.1em] uppercase text-muted rounded-pill px-4 py-[6px] mb-7 opacity-0"
          style={{
            background: "rgba(247,246,243,.82)",
            border: ".5px solid var(--border)",
            backdropFilter: "blur(6px)",
            animation: "blurIn .7s cubic-bezier(.16,1,.3,1) .05s forwards",
            filter: "blur(8px)",
            transform: "translateY(12px)",
          }}
        >
          <span className="size-[7px] rounded-full" style={{ background: "var(--accent)", animation: "eyepulse 2.4s ease-in-out infinite" }} />
          Chrome Extension · Free · No login
        </div>

        <h1 className="font-bold tracking-[-.04em] leading-[1.04] text-ink m-0 mb-5 text-[clamp(40px,6vw,64px)]">
          <span className="block">
            <span className="inline-block opacity-0" style={{ animation: "blurIn .7s cubic-bezier(.16,1,.3,1) 0.12s forwards", filter: "blur(10px)", transform: "translateY(14px)" }}>Read&nbsp;</span>
            <span className="inline-block opacity-0" style={{ animation: "blurIn .7s cubic-bezier(.16,1,.3,1) 0.2s forwards", filter: "blur(10px)", transform: "translateY(14px)" }}>any&nbsp;</span>
            <span className="inline-block opacity-0" style={{ animation: "blurIn .7s cubic-bezier(.16,1,.3,1) 0.28s forwards", filter: "blur(10px)", transform: "translateY(14px)" }}>repo.</span>
          </span>
          <span className="block">
            <span className="inline-block opacity-0 text-muted" style={{ animation: "blurIn .7s cubic-bezier(.16,1,.3,1) 0.36s forwards", filter: "blur(10px)", transform: "translateY(14px)" }}>Find&nbsp;</span>
            <span className="inline-block opacity-0 text-muted" style={{ animation: "blurIn .7s cubic-bezier(.16,1,.3,1) 0.44s forwards", filter: "blur(10px)", transform: "translateY(14px)" }}>your&nbsp;</span>
            <span className="inline-block opacity-0 text-ink" style={{ animation: "blurIn .7s cubic-bezier(.16,1,.3,1) 0.52s forwards", filter: "blur(10px)", transform: "translateY(14px)" }}>next&nbsp;</span>
            <span className="inline-block opacity-0 text-ink" style={{ animation: "blurIn .7s cubic-bezier(.16,1,.3,1) 0.6s forwards", filter: "blur(10px)", transform: "translateY(14px)" }}>build.</span>
          </span>
        </h1>

        <p
          className="text-[16px] text-muted leading-[1.7] max-w-[480px] m-0 mb-8 opacity-0"
          style={{ animation: "blurIn .7s cubic-bezier(.16,1,.3,1) .55s forwards", filter: "blur(6px)", transform: "translateY(12px)" }}
        >
          Point MARK at any GitHub repository. Get a full intelligence report, a production-ready CLAUDE.md, and
          three viable utility concepts with a pump.fun launch angle.
        </p>

        <div
          className="flex gap-[10px] items-center flex-wrap justify-center opacity-0"
          style={{ animation: "blurIn .7s cubic-bezier(.16,1,.3,1) .68s forwards", filter: "blur(6px)", transform: "translateY(12px)" }}
        >
          <button className="text-[13px] font-semibold px-6 py-[13px] rounded-md bg-ink text-paper border-none flex items-center gap-[7px] tracking-[.01em] transition-opacity duration-150 hover:opacity-[.88]">
            <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="m10 8 6 4-6 4V8z"></path>
            </svg>
            Add to Chrome
          </button>
          <button
            className="text-[13px] text-muted border bg-paper/60 px-[18px] py-[13px] rounded-md transition-all duration-150 backdrop-blur-[6px] hover:border-ink hover:text-ink"
            style={{ borderWidth: 0.5, borderStyle: "solid", borderColor: "var(--border)" }}
          >
            See demo ↓
          </button>
        </div>

        <div
          className="mt-5 flex items-center gap-2 text-[12px] font-mono opacity-0"
          style={{ animation: "blurIn .7s cubic-bezier(.16,1,.3,1) .76s forwards", filter: "blur(6px)", transform: "translateY(12px)" }}
        >
          <span className="text-muted text-[10px] tracking-[.1em] uppercase font-medium">CA</span>
          <button
            className="text-ink bg-transparent border-none px-2 py-1 rounded-sm cursor-pointer inline-flex items-center gap-1.5 transition-colors duration-150 hover:bg-surface"
            title="Click to copy"
          >
            <span>H4EdmmVMD7sofVwknBotimqLmV3ALXxdvw3A3bZk</span>
            <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" className="text-muted shrink-0">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
          </button>
        </div>

        <div
          className="mt-7 flex items-center gap-3 text-[12px] text-muted opacity-0"
          style={{ animation: "blurIn .7s ease .85s forwards", filter: "blur(4px)" }}
        >
          <span>Free forever</span>
          <span className="size-1 rounded-full bg-muted"></span>
          <span>No account needed</span>
          <span className="size-1 rounded-full bg-muted"></span>
          <span>5 scans / day</span>
        </div>
      </div>

      <div className="relative z-[2] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-[960px] mt-14 mx-auto">
        {STATS.map((s, i) => (
          <div
            key={s.label}
            className="bg-white/85 backdrop-blur-[8px] rounded-card border border-[var(--border)] p-5 text-left opacity-0"
            style={{
              filter: "blur(6px)",
              transform: "translateY(16px)",
              animation: `blurIn .7s cubic-bezier(.16,1,.3,1) ${1 + i * 0.1}s forwards`,
            }}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-medium tracking-[.08em] uppercase text-muted">{s.label}</span>
              <span className="size-8 rounded-md flex items-center justify-center border bg-accent-bg border-accent-border">
                <StatIcon name={s.icon} />
              </span>
            </div>
            <div className="text-[30px] font-bold tracking-[-.04em] text-ink leading-[1.1]">{s.value}</div>
            <div className="text-[12px] text-muted mt-0.5">{s.sub}</div>
          </div>
        ))}
      </div>

      <div
        className="relative z-[2] w-full max-w-[960px] mt-4 mx-auto bg-paper border rounded-lg overflow-hidden text-left opacity-0"
        style={{
          borderWidth: 0.5,
          borderStyle: "solid",
          borderColor: "var(--border)",
          boxShadow: "0 8px 32px rgba(0,0,0,.08)",
          animation: "blurIn .8s cubic-bezier(.16,1,.3,1) 1.1s forwards",
          filter: "blur(6px)",
          transform: "translateY(20px)",
        }}
      >
        <div className="px-6 py-4 flex items-center justify-between" style={{ borderBottom: ".5px solid #F3F2EE" }}>
          <div>
            <div className="text-[10px] font-medium tracking-[.1em] uppercase text-muted">Layer 01 — Mark File</div>
            <div className="text-[14px] font-medium text-ink mt-[3px]">Full repo intelligence scan</div>
          </div>
          <span
            className="text-[10px] px-[10px] py-[3px] rounded-pill"
            style={{ background: "var(--accent-bg)", color: "var(--accent)", border: ".5px solid var(--accent-border)" }}
          >
            scanning...
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr]">
          <div className="p-5 md:border-r" style={{ borderColor: "#F3F2EE", borderRightWidth: 0.5 }}>
            <div className="rounded-[10px] relative overflow-hidden font-mono text-[11.5px] leading-[1.9]" style={{ background: "var(--term-bg)", padding: "14px 16px", minHeight: 190 }}>
              <div className="flex gap-[6px] mb-[6px]">
                <span className="size-[9px] rounded-full" style={{ background: "#2a2a28" }}></span>
                <span className="size-[9px] rounded-full" style={{ background: "#2a2a28" }}></span>
                <span className="size-[9px] rounded-full" style={{ background: "#2a2a28" }}></span>
              </div>
              <div className="flex gap-[6px]">
                <span style={{ color: "var(--term-dim)" }}>▸</span>
                <span style={{ color: "var(--term-text)" }}>scanning vercel/next.js...</span>
              </div>
              <span
                className="inline-block"
                style={{ width: 7, height: 13, background: "var(--term-text)", animation: "blinkcur .9s step-end infinite", verticalAlign: "-2px", marginLeft: 2 }}
              ></span>
            </div>
          </div>
          <div className="p-5 flex flex-col gap-4">
            <div>
              <div className="text-[10px] font-medium tracking-[.1em] uppercase text-muted mb-[10px]">Detected skills</div>
              <div className="flex gap-[6px] flex-wrap">
                <span className="text-[10px] font-mono" style={{ color: "var(--muted)" }}>awaiting scan…</span>
              </div>
            </div>
            <div>
              <div className="text-[10px] font-medium tracking-[.1em] uppercase text-muted mb-[10px]">Scores</div>
              <div className="flex flex-col gap-[10px]">
                {[
                  { name: "architecture-depth", value: 92 },
                  { name: "skill-match", value: 72 },
                  { name: "type-coverage", value: 88 },
                ].map((row) => (
                  <div key={row.name} className="flex items-center gap-[10px]">
                    <span className="text-[11px] font-mono text-muted min-w-[130px]">{row.name}</span>
                    <div className="flex-1 h-[3px] rounded-pill overflow-hidden" style={{ background: "var(--surface)" }}>
                      <div className="h-full rounded-pill transition-all" style={{ background: "var(--accent)", width: `${row.value}%`, transition: "width 1.4s cubic-bezier(.4,0,.2,1) 1.4s" }}></div>
                    </div>
                    <span className="text-[10px] font-mono text-muted min-w-[30px] text-right">{row.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
