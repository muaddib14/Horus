"use client";

import { useEffect, useState } from "react";

const SYMBOLS = ["BTCUSDT", "ETHUSDT", "SOLUSDT", "BNBUSDT", "XRPUSDT"];

function useLivePairs() {
  const [deltas, setDeltas] = useState<number[]>([1234, 892, -412, 205, 1830]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => {
      setDeltas((d) => d.map((v) => v + (Math.random() - 0.5) * 300));
    }, 1800);
    return () => clearInterval(id);
  }, []);

  return SYMBOLS.map((symbol, i) => ({ symbol, delta: deltas[i] }));
}

function Sequence({ pairs }: { pairs: { symbol: string; delta: number }[] }) {
  return (
    <>
      {pairs.map((pair) => (
        <span key={pair.symbol} className="flex gap-10 whitespace-nowrap items-center">
          <span className="text-[#555]">→ {pair.symbol}</span>
          <span style={{ color: "var(--accent)" }}>live ✓</span>
          <span className="text-[#2a2a28]">·</span>
          <span className="tabular-nums" style={{ color: pair.delta >= 0 ? "var(--pos)" : "var(--neg)" }}>
            delta {pair.delta >= 0 ? "+" : ""}{pair.delta.toFixed(0)}
          </span>
          <span className="text-[#2a2a28]">·</span>
        </span>
      ))}
    </>
  );
}

export default function Ticker() {
  const pairs = useLivePairs();
  return (
    <div className="relative overflow-hidden py-[10px] bg-term-bg" style={{ borderTop: "1px solid var(--accent)", borderBottom: "1px solid var(--accent)" }}>
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-16 z-[1]"
        style={{ background: "linear-gradient(90deg, var(--term-bg), transparent)" }}
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-16 z-[1]"
        style={{ background: "linear-gradient(270deg, var(--term-bg), transparent)" }}
      />
      <div className="flex gap-10 whitespace-nowrap font-mono text-[11px]" style={{ animation: "ticker 28s linear infinite", width: "max-content" }}>
        <Sequence pairs={pairs} />
        <Sequence pairs={pairs} />
      </div>
    </div>
  );
}
