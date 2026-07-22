type Feature = {
  title: string;
  body: string;
  spark: number[];
  kind: "bar" | "line";
};

const FEATURES: Feature[] = [
  {
    title: "Delta tracking",
    body: "Real-time buy/sell volume imbalance per minute. See aggressive buyer vs seller immediately.",
    spark: [4, -2, 6, -3, 8, 3, -1, 7],
    kind: "bar",
  },
  {
    title: "CVD line chart",
    body: "Cumulative delta over time. Watch money flow direction and divergence from price.",
    spark: [2, 4, 5, 9, 8, 12, 15, 14],
    kind: "line",
  },
  {
    title: "Footprint table",
    body: "Price-level breakdown of buy/sell volume. See which levels are being absorbed.",
    spark: [3, 8, 5, 10, 4, 7, 9, 6],
    kind: "bar",
  },
  {
    title: "Divergence alerts",
    body: "Price goes one way, CVD goes another. Spots trapped traders before the bounce.",
    spark: [10, 12, 9, 6, 8, 5, 3, 4],
    kind: "line",
  },
  {
    title: "Open interest (OI)",
    body: "Total open futures contracts. Polled every 5 seconds from Binance API.",
    spark: [5, 6, 5, 7, 8, 8, 9, 10],
    kind: "bar",
  },
  {
    title: "Free, no auth",
    body: "Install once. Works offline. No account, no API key, no signup needed.",
    spark: [1, 1, 1, 1, 1, 1, 1, 1],
    kind: "line",
  },
];

function Sparkline({ values, kind }: { values: number[]; kind: "bar" | "line" }) {
  const max = Math.max(...values.map(Math.abs), 1);
  if (kind === "bar") {
    return (
      <div className="flex items-end gap-[3px]" style={{ height: 28 }} aria-hidden="true">
        {values.map((v, i) => (
          <div
            key={i}
            className="w-[4px] rounded-[1px] transition-all duration-300"
            style={{
              height: `${(Math.abs(v) / max) * 100}%`,
              background: v >= 0 ? "var(--accent)" : "var(--accent-ink)",
              opacity: v >= 0 ? 1 : 0.25,
            }}
          />
        ))}
      </div>
    );
  }
  const w = 64;
  const h = 28;
  const min = Math.min(...values);
  const range = max - min || 1;
  const points = values
    .map((v, i) => `${(i / (values.length - 1)) * w},${h - ((v - min) / range) * h}`)
    .join(" ");
  return (
    <svg width={w} height={h} className="overflow-visible" aria-hidden="true">
      <polyline points={points} fill="none" stroke="var(--accent-ink)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" opacity={0.85} />
    </svg>
  );
}

export default function Features() {
  return (
    <section id="features" data-screen-label="Features" className="py-20 px-10 bg-paper">
      <div className="max-w-[1080px] mx-auto">
        <div className="flex flex-col items-center text-center mb-12" data-reveal>
          <span className="font-mono inline-flex items-center gap-[8px] text-[11px] font-medium tracking-[.14em] uppercase text-muted bg-surface border border-border rounded-pill px-[14px] py-[5px] mb-4">
            Core metrics
            <span className="font-mono text-[10px] font-bold px-[7px] py-[1px] rounded-pill" style={{ background: "var(--accent)", color: "var(--accent-ink)" }}>
              6
            </span>
          </span>
          <h2 className="font-mono font-semibold tracking-[-.01em] text-ink m-0 mb-3 leading-[1.1]" style={{ fontSize: "var(--text-h2)" }}>
            Everything traders need
          </h2>
          <p className="text-[15px] text-muted leading-[1.65] max-w-[520px] m-0">
            Real-time order flow metrics synced directly to Binance Futures. See trapped traders before they liquidate.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" data-reveal>
          {FEATURES.map((f) => (
            <div key={f.title} className="card-elevated relative px-6 py-7 rounded-card overflow-hidden transition-all duration-200 group bg-paper">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[13px] font-semibold text-ink">{f.title}</span>
                <Sparkline values={f.spark} kind={f.kind} />
              </div>
              <div className="text-[12px] text-muted leading-[1.6]">{f.body}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
