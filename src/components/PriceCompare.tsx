const TOOLS = [
  { name: "Bookmap", price: "$40+/mo", note: "desktop app, own data feed" },
  { name: "Exocharts", price: "$30+/mo", note: "subscription, per-exchange add-ons" },
  { name: "Sierra Chart + DOM plugin", price: "$36+/mo", note: "steep setup, futures-broker specific" },
];

export default function PriceCompare() {
  return (
    <section data-screen-label="Price comparison" className="py-20 px-10 bg-surface border-t border-border border-b border-border">
      <div className="max-w-[1080px] mx-auto">
        <div className="flex flex-col items-center text-center mb-12" data-reveal>
          <span className="font-mono inline-flex items-center gap-[6px] text-[11px] font-medium tracking-[.14em] uppercase text-muted bg-paper border border-border rounded-pill px-[14px] py-[5px] mb-4">
            Cost
          </span>
          <h2 className="font-mono font-semibold tracking-[-.01em] text-ink m-0 leading-[1.1]" style={{ fontSize: "var(--text-h2)" }}>
            Same idea. No subscription.
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4" data-reveal>
          {TOOLS.map((tool) => (
            <div key={tool.name} className="card-elevated bg-paper rounded-card px-6 py-7">
              <div className="text-[13px] font-semibold text-ink mb-1">{tool.name}</div>
              <div className="font-mono text-[22px] font-bold tabular-nums mb-2" style={{ color: "var(--neg)" }}>{tool.price}</div>
              <div className="text-[12px] text-muted leading-[1.5]">{tool.note}</div>
            </div>
          ))}
          <div
            className="rounded-card px-6 py-7 relative overflow-hidden"
            style={{ border: "1px solid var(--accent)", background: "linear-gradient(135deg, var(--accent-bg) 0%, transparent 70%)" }}
          >
            <div className="text-[13px] font-semibold text-ink mb-1">HORUS</div>
            <div className="font-mono text-[22px] font-bold tabular-nums mb-2" style={{ color: "var(--accent-text)" }}>$0 forever</div>
            <div className="text-[12px] text-muted leading-[1.5]">open source, no account, install in a minute</div>
          </div>
        </div>
      </div>
    </section>
  );
}
