"use client";

import { useEffect, useRef, useState } from "react";

function useLiveTicker() {
  const [delta, setDelta] = useState(1234.5);
  const [cvd, setCvd] = useState(5234.0);
  const [oi, setOi] = useState(105.1);
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => {
      const drift = (Math.random() - 0.47) * 60;
      setDelta((d) => d + drift);
      setCvd((c) => c + drift * 0.6);
      setOi((o) => Math.max(90, o + (Math.random() - 0.5) * 0.4));
      setFlash(true);
      setTimeout(() => setFlash(false), 200);
    }, 1600);
    return () => clearInterval(id);
  }, []);

  return { delta, cvd, oi, flash };
}

type Candle = { open: number; close: number; high: number; low: number };

function genWalk(n: number, seed: number): Candle[] {
  let price = 100;
  const out: Candle[] = [];
  let s = seed;
  const rand = () => {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    return s / 0x7fffffff;
  };
  for (let i = 0; i < n; i++) {
    const open = price;
    const drift = (rand() - 0.48) * 6;
    const close = Math.max(20, open + drift);
    const high = Math.max(open, close) + rand() * 2.5;
    const low = Math.min(open, close) - rand() * 2.5;
    out.push({ open, close, high, low });
    price = close;
  }
  return out;
}

function ChartField() {
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
    let candles: Candle[] = [];
    let offset = 0;

    const resize = () => {
      const parent = canvas!.parentElement;
      width = parent?.clientWidth ?? window.innerWidth;
      height = parent?.clientHeight ?? window.innerHeight;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.ceil(width / 14) + 4;
      candles = genWalk(count, 42);
    };

    const draw = () => {
      ctx!.clearRect(0, 0, width, height);
      const cw = 14;
      const values = candles.flatMap((c) => [c.high, c.low]);
      const max = Math.max(...values);
      const min = Math.min(...values);
      const range = max - min || 1;
      const padTop = height * 0.18;
      const padBottom = height * 0.1;
      const plotH = height - padTop - padBottom;
      const y = (v: number) => padTop + plotH - ((v - min) / range) * plotH;

      candles.forEach((c, i) => {
        const x = i * cw - offset;
        if (x < -cw || x > width + cw) return;
        const up = c.close >= c.open;
        const color = up ? "rgba(213, 241, 6, 0.4)" : "rgba(27, 27, 25, 0.14)";
        ctx!.strokeStyle = color;
        ctx!.fillStyle = color;
        ctx!.lineWidth = 1;
        ctx!.beginPath();
        ctx!.moveTo(x + cw / 2, y(c.high));
        ctx!.lineTo(x + cw / 2, y(c.low));
        ctx!.stroke();
        const bodyTop = y(Math.max(c.open, c.close));
        const bodyH = Math.max(2, Math.abs(y(c.open) - y(c.close)));
        ctx!.fillRect(x + 2, bodyTop, cw - 4, bodyH);
      });

      offset += 0.18;
      if (offset > cw) {
        offset -= cw;
        candles.shift();
        const last = candles[candles.length - 1];
        const rand = Math.random();
        const open = last.close;
        const close = Math.max(20, open + (rand - 0.48) * 6);
        candles.push({
          open,
          close,
          high: Math.max(open, close) + Math.random() * 2.5,
          low: Math.min(open, close) - Math.random() * 2.5,
        });
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

export default function Hero() {
  const { delta, cvd, oi, flash } = useLiveTicker();
  return (
    <section
      id="hero"
      className="relative min-h-screen px-10 pt-[140px] pb-20 flex flex-col items-center text-center overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden">
        <ChartField />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, rgba(247,246,243,.75) 0%, rgba(247,246,243,.4) 35%, var(--paper) 88%)" }}
        />
      </div>

      <div className="relative z-[2] flex flex-col items-center max-w-[840px] mx-auto">
        <div
          className="font-mono inline-flex items-center gap-2 text-[11px] font-medium tracking-[.14em] uppercase text-muted rounded-pill px-4 py-[6px] mb-7"
          style={{
            background: "rgba(247,246,243,.82)",
            border: ".5px solid var(--border)",
            backdropFilter: "blur(6px)",
            animation: "blurIn .7s cubic-bezier(.16,1,.3,1) .05s forwards",
            opacity: 0,
            filter: "blur(8px)",
            transform: "translateY(12px)",
          }}
        >
          <span className="size-[7px] rounded-full" style={{ background: "var(--accent)" }} />
          Chrome Extension · Binance + TradingView · No Login
        </div>

        <h1 className="font-mono font-bold tracking-[-.02em] leading-[1.04] text-ink m-0 mb-5 text-[clamp(36px,5.5vw,64px)]">
          <span className="block" style={{ animation: "blurIn .7s cubic-bezier(.16,1,.3,1) 0.12s forwards", opacity: 0, filter: "blur(10px)", transform: "translateY(14px)" }}>
            Live order flow.
          </span>
          <span className="block" style={{ animation: "blurIn .7s cubic-bezier(.16,1,.3,1) 0.36s forwards", opacity: 0, filter: "blur(10px)", transform: "translateY(14px)" }}>
            Trade smarter on <span style={{ color: "var(--accent-text)" }}>Binance & TradingView.</span>
          </span>
        </h1>

        <p
          className="text-[16px] text-muted leading-[1.7] max-w-[520px] m-0 mb-8"
          style={{ animation: "blurIn .7s cubic-bezier(.16,1,.3,1) .55s forwards", opacity: 0, filter: "blur(6px)", transform: "translateY(12px)" }}
        >
          A footprint-fused chart with CVD overlaid on price, plus a trap detector that watches for OI rising into a swing extreme and confirms the squeeze when positions actually start closing. Synced companion panel on Binance and TradingView.
        </p>

        <div
          className="flex gap-[10px] items-center flex-wrap justify-center"
          style={{ animation: "blurIn .7s cubic-bezier(.16,1,.3,1) .68s forwards", opacity: 0, filter: "blur(6px)", transform: "translateY(12px)" }}
        >
          <a
            href="https://github.com/muaddib14/Horus-Extension/releases/latest"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[13px] font-semibold px-6 py-[13px] rounded-md border-none flex items-center gap-[7px] tracking-[.01em] transition-opacity duration-150 hover:opacity-[.88] no-underline"
            style={{ background: "var(--accent)", color: "var(--accent-ink)" }}
          >
            <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"></path>
              <path d="M10 17l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"></path>
            </svg>
            Install Extension
          </a>
          <a
            href="#features"
            className="text-[13px] text-muted border bg-paper/60 px-[18px] py-[13px] rounded-md transition-all duration-150 backdrop-blur-[6px] no-underline"
            style={{ borderWidth: 0.5, borderStyle: "solid", borderColor: "var(--border)" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--accent)";
              e.currentTarget.style.color = "var(--ink)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--border)";
              e.currentTarget.style.color = "var(--muted)";
            }}
          >
            See features ↓
          </a>
        </div>

        <a
          href="https://github.com/muaddib14/Horus-Extension/releases/latest"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center gap-2 text-[11px] font-mono px-4 py-[7px] rounded-pill no-underline transition-all duration-150"
          style={{
            background: "var(--accent-bg)",
            color: "var(--accent-text)",
            border: "1px solid var(--accent-border)",
            animation: "blurIn .7s cubic-bezier(.16,1,.3,1) .78s forwards",
            opacity: 0,
            filter: "blur(6px)",
            transform: "translateY(12px)",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--accent)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--accent-border)"; }}
        >
          <span className="size-[6px] rounded-full" style={{ background: "var(--accent-text)", animation: "epblink 2s infinite" }} />
          Tracks latest GitHub release · muaddib14/Horus-Extension
        </a>

        <div
          className="mt-5 flex items-center gap-3 text-[12px] text-muted flex-wrap justify-center"
          style={{ animation: "blurIn .7s ease .85s forwards", opacity: 0, filter: "blur(4px)" }}
        >
          <span>Free forever</span>
          <span className="size-1 rounded-full bg-muted"></span>
          <span>No account needed</span>
          <span className="size-1 rounded-full bg-muted"></span>
          <span>Binance + TradingView</span>
        </div>
      </div>

      <div
        className="relative z-[2] w-full max-w-[960px] mt-14 mx-auto bg-paper rounded-lg overflow-hidden text-left"
        style={{
          boxShadow: "var(--shadow-lg)",
          border: "1px solid var(--accent-border)",
          animation: "blurIn .8s cubic-bezier(.16,1,.3,1) .95s forwards",
          opacity: 0,
          filter: "blur(6px)",
          transform: "translateY(20px)",
        }}
      >
        <div className="px-6 py-4 flex items-center justify-between" style={{ borderBottom: ".5px solid #F3F2EE" }}>
          <div>
            <div className="font-mono text-[10px] font-medium tracking-[.14em] uppercase text-muted">Real-time dashboard</div>
            <div className="text-[14px] font-medium text-ink mt-[3px]">HORUS order-flow panel</div>
          </div>
          <span className="text-[10px] px-[10px] py-[3px] rounded-pill" style={{ background: "var(--accent-bg)", color: "var(--accent-text)", border: "1px solid var(--accent-border)" }}>
            live
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr]">
          <div className="p-5 md:border-r" style={{ borderColor: "#F3F2EE", borderRightWidth: 0.5 }}>
            <div
              className="rounded-[10px] relative overflow-hidden font-mono text-[11px] leading-[1.8] transition-shadow duration-200"
              style={{
                background: "var(--term-bg)",
                padding: "14px 16px",
                minHeight: 200,
                boxShadow: flash ? "inset 0 0 0 1px var(--accent)" : "inset 0 0 0 1px transparent",
              }}
            >
              <div className="flex gap-[6px] mb-[8px]">
                <span className="size-[8px] rounded-full" style={{ background: "#2a2a28" }}></span>
                <span className="size-[8px] rounded-full" style={{ background: "#2a2a28" }}></span>
                <span className="size-[8px] rounded-full" style={{ background: "#2a2a28", animation: "epblink 1.8s infinite" }}></span>
              </div>
              <div style={{ color: "#a0a0a0", marginBottom: "8px" }}>HORUS · BTCUSDT</div>
              <div className="tabular-nums" style={{ color: delta >= 0 ? "var(--pos)" : "var(--neg)", marginBottom: "6px" }}>
                Δ {delta >= 0 ? "+" : ""}{delta.toLocaleString("en-US", { maximumFractionDigits: 2 })} BTC ({delta >= 0 ? "buy" : "sell"})
              </div>
              <div className="tabular-nums" style={{ color: cvd >= 0 ? "var(--pos)" : "var(--neg)", marginBottom: "6px" }}>
                CVD {cvd >= 0 ? "+" : ""}{cvd.toLocaleString("en-US", { maximumFractionDigits: 2 })}
              </div>
              <div className="tabular-nums" style={{ color: "#a0a0a0", marginBottom: "6px" }}>OI {oi.toFixed(1)}K</div>
              <div style={{ color: "#f87171", marginBottom: "6px" }}>🪤 longs trapped @ 66,212.90 — forming</div>
              <div style={{ color: "var(--term-dim)" }}># confirms when OI falls + delta flips</div>
            </div>
          </div>
          <div className="p-5 flex flex-col gap-4">
            <div>
              <div className="font-mono text-[10px] font-medium tracking-[.14em] uppercase text-muted mb-[10px]">Data</div>
              <div className="flex flex-col gap-[8px]">
                <div className="flex justify-between">
                  <span className="text-[11px] font-mono text-muted">Platform</span>
                  <span className="text-[10px] font-mono text-ink font-semibold">Binance + TradingView</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[11px] font-mono text-muted">Updates</span>
                  <span className="text-[10px] font-mono text-ink font-semibold">5s interval</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[11px] font-mono text-muted">Backfill</span>
                  <span className="text-[10px] font-mono text-ink font-semibold">On open</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[11px] font-mono text-muted">Auth</span>
                  <span className="text-[10px] font-mono text-ink font-semibold">None</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[11px] font-mono text-muted">Setup</span>
                  <span className="text-[10px] font-mono text-ink font-semibold">1 min</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
