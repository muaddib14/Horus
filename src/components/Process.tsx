const STEPS = [
  {
    n: "01",
    title: "Install extension",
    body: "One click from Chrome Web Store. No account, no login, works offline.",
  },
  {
    n: "02",
    title: "Open Binance or TradingView",
    body: "Navigate to any futures pair. HORUS auto-injects bottom-right, backfilled with real bars, not empty.",
  },
  {
    n: "03",
    title: "Read the flow",
    body: "Watch a trap form, then confirm — or divergence flags the moment before price moves.",
  },
] as const;

export default function Process() {
  return (
    <section id="process" data-screen-label="Process" className="py-20 px-10 bg-surface border-t border-border border-b border-border">
      <div className="max-w-[1080px] mx-auto">
        <div className="flex flex-col items-center text-center mb-12" data-reveal>
          <span className="font-mono inline-flex items-center gap-[6px] text-[11px] font-medium tracking-[.14em] uppercase text-muted bg-paper border border-border rounded-pill px-[14px] py-[5px] mb-4">
            Getting started
          </span>
          <h2 className="font-mono font-semibold tracking-[-.01em] text-ink m-0 leading-[1.1]" style={{ fontSize: "var(--text-h2)" }}>
            Three steps, one minute
          </h2>
        </div>
        <div className="relative grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div
            className="hidden sm:block absolute top-[26px] left-[calc(16.5%+10px)] right-[calc(16.5%+10px)] h-[1px]"
            style={{ background: "var(--accent-border)" }}
          />
          {STEPS.map((step) => (
            <div key={step.n} className="card-elevated relative bg-paper rounded-card px-7 py-8" data-reveal>
              <div className="font-mono text-[22px] font-bold tracking-[-.02em] mb-4 relative z-[1] tabular-nums">
                <span style={{ color: "var(--accent-text)" }}>{step.n}</span>
              </div>
              <div className="text-[16px] font-semibold text-ink mb-[6px]">{step.title}</div>
              <div className="text-[13px] text-muted leading-[1.6]">{step.body}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
