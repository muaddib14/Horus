"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const TABS = ["Panel Preview", "Delta Chart", "CVD Tracker"] as const;

const FEED = [
  "0.42 BTC buy @ 66,171.20",
  "1.10 BTC sell @ 66,169.80",
  "0.08 BTC buy @ 66,172.00",
  "2.35 BTC buy @ 66,173.50",
  "0.61 BTC sell @ 66,170.10",
];

function usePanelTicker() {
  const [price, setPrice] = useState(66170.0);
  const [delta, setDelta] = useState(1234.5);
  const [cvd, setCvd] = useState(5234.0);
  const [bars, setBars] = useState<number[]>([6, 9, 4, 11, 7, 5, 8, 10, 6, 9]);
  const [feedIdx, setFeedIdx] = useState(0);
  const tick = useRef(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => {
      tick.current += 1;
      const drift = (Math.random() - 0.48) * 4.5;
      setPrice((p) => Math.max(60000, p + drift));
      setDelta((d) => d + drift * 8);
      setCvd((c) => c + drift * 5);
      setBars((b) => [...b.slice(1), Math.max(2, Math.min(14, 4 + Math.random() * 10))]);
      setFeedIdx((i) => (i + 1) % FEED.length);
    }, 1400);
    return () => clearInterval(id);
  }, []);

  return { price, delta, cvd, bars, feedLine: FEED[feedIdx] };
}

function PanelPreview() {
  const { price, delta, cvd, bars, feedLine } = usePanelTicker();
  const deltaUp = delta >= 0;

  return (
    <div className="card-elevated bg-paper rounded-card overflow-hidden">
      <div className="bg-surface border-b border-border py-2 px-3 flex items-center gap-2">
        <div className="flex gap-1">
          <span className="size-[9px] rounded-full bg-[#FF6057]"></span>
          <span className="size-[9px] rounded-full bg-[#FFBD2E]"></span>
          <span className="size-[9px] rounded-full bg-[#28CA40]"></span>
        </div>
        <div className="flex-1 bg-paper border border-border rounded-sm py-[3px] px-[10px] text-[11px] font-mono text-muted">
          HORUS — BTCUSDT
        </div>
        <Image src="/logo.jpg" alt="HORUS logo" width={22} height={22} className="size-[22px] rounded-sm object-cover" />
      </div>
      <div className="h-[240px] bg-paper p-3 flex gap-3 relative">
        <div className="w-[140px] bg-paper border border-border rounded-md p-[10px] flex-shrink-0 self-start">
          <div className="text-[12px] font-semibold font-mono mb-2 text-ink">BTCUSDT</div>
          <div className="text-[10px] text-muted font-mono leading-[1.8]">
            <div>📊 1m bars</div>
            <div className="tabular-nums">💰 {price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
            <div className="flex items-center gap-1">
              <span className="size-[5px] rounded-full" style={{ background: "var(--accent)", animation: "epblink 1.6s infinite" }} />
              live
            </div>
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-[8px]">
          <div
            className="text-[10px] font-mono px-2 py-1 rounded-sm flex items-center gap-[5px] transition-colors duration-500 tabular-nums"
            style={{ color: deltaUp ? "var(--pos)" : "var(--neg)", background: deltaUp ? "rgba(22,163,74,0.08)" : "rgba(220,38,38,0.08)" }}
          >
            Δ Delta: {deltaUp ? "+" : ""}{delta.toLocaleString("en-US", { maximumFractionDigits: 2 })} BTC
          </div>
          <div className="text-[10px] font-mono px-2 py-1 flex items-center gap-[5px] tabular-nums" style={{ color: cvd >= 0 ? "var(--pos)" : "var(--neg)" }}>
            📈 CVD: {cvd >= 0 ? "+" : ""}{cvd.toLocaleString("en-US", { maximumFractionDigits: 2 })}
          </div>
          <div className="text-[10px] font-mono text-muted px-2 py-1 flex items-center gap-[5px]">
            📋 Footprint: 28 levels
          </div>
          <div className="text-[10px] font-mono text-muted px-2 py-1 flex items-center gap-[5px]">
            🎯 OI: 105.1K contracts
          </div>
        </div>
        <div
          className="absolute top-[10px] right-[10px] w-[230px] bg-paper border border-border rounded-md overflow-hidden"
          style={{ boxShadow: "var(--shadow-popup)", transformOrigin: "top right", animation: "fpIn .45s cubic-bezier(.16,1,.3,1) both" }}
        >
          <div className="px-[10px] py-[6px] border-b border-border flex justify-between items-center">
            <div className="text-[11px] font-bold flex items-center gap-[5px]">
              <span className="size-[6px] rounded-full" style={{ background: "var(--accent)", animation: "epblink 2s infinite" }} />
              Live
            </div>
            <div className="text-[9px] font-mono text-muted">BTCUSDT</div>
          </div>
          <div className="h-[64px] bg-surface relative overflow-hidden flex items-end gap-[3px] px-[8px] pb-[6px]" aria-hidden="true">
            {bars.map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-[1px] transition-all duration-700 ease-out"
                style={{
                  height: `${(h / 14) * 100}%`,
                  background: i === bars.length - 1 ? "var(--accent)" : "var(--accent-border)",
                }}
              />
            ))}
          </div>
          <div className="bg-term-bg px-[10px] py-[6px] font-mono text-[9.5px] leading-[1.8]" style={{ minHeight: 40 }}>
            <div>
              <span className="text-[#3a3a38]">▸</span> <span className="text-term-text">{feedLine}</span>
              <span
                className="inline-block ml-[2px]"
                style={{ width: 5, height: 10, background: "var(--term-text)", animation: "blinkcur .9s step-end infinite", verticalAlign: "-2px" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function fmtTime(d: Date) {
  return d.toISOString().slice(11, 19) + " UTC";
}

const INITIAL_DELTA_BARS = [3, -5, 8, -2, 6, 9, -4, 7, 5, -3, 8, 2, -6, 9, 4, -2, 7, 5, -3, 8, 6, -1];

function useDeltaFeed() {
  const [bars, setBars] = useState<number[]>(INITIAL_DELTA_BARS);
  const [log, setLog] = useState<{ t: string; v: number }[]>([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => {
      const v = (Math.random() - 0.42) * 20;
      setBars((b) => [...b.slice(1), v]);
      setLog((l) => [{ t: fmtTime(new Date()), v }, ...l].slice(0, 4));
    }, 1100);
    return () => clearInterval(id);
  }, []);

  return { bars, log };
}

function DeltaChart() {
  const { bars, log } = useDeltaFeed();
  const max = Math.max(...bars.map(Math.abs), 1);

  return (
    <div className="card-elevated bg-paper rounded-card overflow-hidden">
      <div className="py-[10px] px-[14px] flex justify-between items-center" style={{ background: "var(--accent)", color: "var(--accent-ink)" }}>
        <div className="text-[12px] font-semibold font-mono flex items-center gap-[6px]">
          <span className="size-[6px] rounded-full" style={{ background: "var(--accent-ink)", animation: "epblink 1.6s infinite" }}></span>
          Delta Histogram
        </div>
        <div className="flex gap-[5px]">
          <span className="text-[9px] font-mono px-[7px] py-[2px] rounded-sm" style={{ background: "rgba(27,27,25,0.15)", color: "var(--accent-ink)" }}>BTCUSDT</span>
          <span className="text-[9px] font-mono px-[7px] py-[2px] rounded-sm" style={{ background: "rgba(109,190,138,.25)", color: "#6DBE8A", border: ".5px solid rgba(109,190,138,.3)" }}>live ✓</span>
        </div>
      </div>
      <div className="bg-term-bg px-4 py-3" style={{ minHeight: 250 }}>
        <div className="font-mono text-[10px] mb-3" style={{ color: "var(--term-dim)" }}># Delta per bar — green buy pressure, red sell</div>
        <div className="flex items-end gap-[3px] mb-4" style={{ height: 90 }} aria-hidden="true">
          {bars.map((v, i) => (
            <div key={i} className="flex-1 flex flex-col items-center justify-end" style={{ height: "100%" }}>
              <div
                className="w-full rounded-[1px] transition-all duration-500 ease-out"
                style={{
                  height: `${(Math.abs(v) / max) * 100}%`,
                  background: v >= 0 ? "var(--pos)" : "var(--neg)",
                  opacity: i === bars.length - 1 ? 1 : 0.75,
                }}
              />
            </div>
          ))}
        </div>
        <div className="font-mono text-[10.5px] leading-[1.9] tabular-nums" style={{ color: "var(--term-text)" }}>
          {log.map((entry, i) => (
            <div key={entry.t + i} style={{ opacity: 1 - i * 0.2 }}>
              <span style={{ color: entry.v >= 0 ? "var(--pos)" : "var(--neg)" }}>›</span> {entry.t}:{" "}
              <span style={{ color: entry.v >= 0 ? "var(--pos)" : "var(--neg)" }}>
                {entry.v >= 0 ? "+" : ""}{entry.v.toFixed(2)} BTC {entry.v >= 0 ? "(buy)" : "(sell pressure)"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const INITIAL_CVD_SERIES = (() => {
  let v = 0;
  let s = 7;
  const rand = () => {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    return s / 0x7fffffff;
  };
  return Array.from({ length: 30 }, () => (v += (rand() - 0.45) * 3));
})();

function useCvdSeries() {
  const [series, setSeries] = useState<number[]>(INITIAL_CVD_SERIES);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => {
      setSeries((s) => [...s.slice(1), s[s.length - 1] + (Math.random() - 0.45) * 3]);
    }, 900);
    return () => clearInterval(id);
  }, []);
  return series;
}

function CVDLine() {
  const series = useCvdSeries();
  const w = 600;
  const h = 90;
  const max = Math.max(...series);
  const min = Math.min(...series);
  const range = max - min || 1;
  const points = series.map((v, i) => `${(i / (series.length - 1)) * w},${h - ((v - min) / range) * h}`).join(" ");
  const last = series[series.length - 1];
  const lastUp = last >= series[series.length - 2];

  return (
    <div className="card-elevated bg-paper rounded-card p-4 mb-3">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[12px] font-semibold text-ink font-mono">CVD — cumulative delta</span>
        <span className="text-[11px] font-mono tabular-nums" style={{ color: lastUp ? "var(--pos)" : "var(--neg)" }}>
          {last >= 0 ? "+" : ""}{last.toFixed(2)}
        </span>
      </div>
      <svg viewBox={`0 0 ${w} ${h}`} width="100%" height={90} preserveAspectRatio="none" aria-hidden="true">
        <polyline points={points} fill="none" stroke={lastUp ? "var(--pos)" : "var(--neg)"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

function CVDTracker() {
  const divergences = [
    { time: "13:42 UTC", type: "bearish", signal: "Price ↑ but CVD ↓ — trapped longs?" },
    { time: "13:35 UTC", type: "bullish", signal: "Price ↓ but CVD ↑ — buying dip?" },
  ];
  return (
    <div>
      <CVDLine />
      <div className="flex flex-col gap-[10px]">
        {divergences.map((div, i) => (
          <div
            key={div.time}
            className="card-elevated bg-paper rounded-card p-4 text-left"
            style={{ animation: `fpIn .5s cubic-bezier(.16,1,.3,1) ${i * 0.15}s both` }}
          >
            <div className="flex items-center gap-2 mb-2">
              <span
                className="text-[11px] font-mono px-[10px] py-[3px] rounded-sm flex items-center gap-[5px]"
                style={{ background: div.type === "bearish" ? "rgba(220,38,38,0.1)" : "rgba(22,163,74,0.1)", color: div.type === "bearish" ? "var(--neg)" : "var(--pos)" }}
              >
                <span className="size-[5px] rounded-full" style={{ background: "currentColor", animation: "epblink 1.8s infinite" }} />
                {div.type.toUpperCase()}
              </span>
              <span className="text-[11px] font-mono text-muted">{div.time}</span>
            </div>
            <div className="text-[13px] text-ink font-semibold mb-1">{div.signal}</div>
            <div className="text-[12px] text-muted leading-[1.6]">
              CVD cumulative value diverging from price direction. Watch for potential reversal or trapped traders getting liquidated.
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Demo() {
  const [activeTab, setActiveTab] = useState<typeof TABS[number]>("Panel Preview");

  return (
    <section id="demo" data-screen-label="Demo" className="py-20 px-10 bg-paper">
      <div className="max-w-[1080px] mx-auto">
        <div className="flex flex-col items-center text-center mb-12" data-reveal>
          <span className="font-mono inline-flex items-center gap-[6px] text-[11px] font-medium tracking-[.14em] uppercase text-muted bg-surface border border-border rounded-pill px-[14px] py-[5px] mb-4">
            Live demo
          </span>
          <h2 className="font-mono font-semibold tracking-[-.01em] text-ink m-0 mb-3 leading-[1.1]" style={{ fontSize: "var(--text-h2)" }}>
            What you&apos;ll see
          </h2>
          <p className="text-[15px] text-muted leading-[1.65] max-w-[520px] m-0">
            Real-time order flow data in the HORUS panel. Three core views: live metrics, delta histogram, and divergence alerts.
          </p>
        </div>

        <div className="flex gap-2 mb-6 overflow-x-auto" data-reveal>
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`font-mono text-[13px] font-medium px-5 py-2.5 rounded-md transition-colors whitespace-nowrap ${
                activeTab === tab
                  ? ""
                  : "bg-surface text-muted hover:bg-border hover:text-ink"
              }`}
              style={activeTab === tab ? { background: "var(--accent)", color: "var(--accent-ink)" } : {}}
            >
              {tab}
            </button>
          ))}
        </div>

        <div
          className="rounded-card p-6"
          data-reveal
          style={{
            border: "1px solid var(--accent-border)",
            background: "linear-gradient(135deg, var(--accent-bg) 0%, transparent 55%)",
          }}
        >
          {activeTab === "Panel Preview" && <PanelPreview />}
          {activeTab === "Delta Chart" && <DeltaChart />}
          {activeTab === "CVD Tracker" && <CVDTracker />}
        </div>
      </div>
    </section>
  );
}
