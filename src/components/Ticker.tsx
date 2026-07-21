const PAIRS: { symbol: string; status: string; metric: string }[] = [
  { symbol: "BTCUSDT", status: "tracking ✓", metric: "delta +1.2K" },
  { symbol: "ETHUSDT", status: "tracking ✓", metric: "cvd +892" },
  { symbol: "SOLUSDT", status: "tracking ✓", metric: "divergence ⚠" },
  { symbol: "BNBUSDT", status: "tracking ✓", metric: "oi 102.5K" },
  { symbol: "XRPUSDT", status: "tracking ✓", metric: "footprint live" },
];

function Sequence() {
  return (
    <>
      {PAIRS.map((pair) => (
        <span key={pair.symbol} className="flex gap-10 whitespace-nowrap items-center">
          <span className="text-[#555]">→ {pair.symbol}</span>
          <span style={{ color: "var(--accent)" }}>live ✓</span>
          <span className="text-[#2a2a28]">·</span>
          <span className="text-[#555]">{pair.metric}</span>
          <span className="text-[#2a2a28]">·</span>
        </span>
      ))}
    </>
  );
}

export default function Ticker() {
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
        <Sequence />
        <Sequence />
      </div>
    </div>
  );
}
