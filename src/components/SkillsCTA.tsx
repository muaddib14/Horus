const FEATURES = [
  "Trap Detector",
  "Squeeze Confirm",
  "Footprint Chart",
  "CVD Overlay",
  "Delta",
  "Open Interest",
  "Divergence",
  "Binance",
  "TradingView",
  "Historical Annotations",
];

export default function SkillsCTA() {
  return (
    <section id="docs" data-screen-label="Documentation CTA" className="py-20 px-10 bg-surface border-t border-border border-b border-border">
      <div className="max-w-[1080px] mx-auto">
        <div className="grid grid-cols-[1fr_auto] gap-12 items-center" data-reveal>
          <div>
            <div className="text-[11px] font-mono font-medium tracking-[.14em] uppercase text-ink mb-[14px]">
              // Open Source
            </div>
            <h2 className="font-mono font-semibold tracking-[-.01em] text-ink m-0 leading-[1.05]" style={{ fontSize: "clamp(32px, 4.5vw, 48px)" }}>
              Free. <em className="italic text-ink">No tracking.</em>
            </h2>
          </div>
          <div className="flex flex-col items-end gap-5 text-right">
            <p className="text-[15px] text-muted leading-[1.65] max-w-[340px] m-0">
              Full source on GitHub. No account, no API key, no telemetry. Works offline.
            </p>
            <a
              href="https://github.com/muaddib14/Horus-Extension/releases/latest"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[14px] font-semibold px-7 py-[15px] rounded-md transition-opacity hover:opacity-[.88]"
              style={{ background: "var(--accent)", color: "var(--accent-ink)" }}
            >
              View on GitHub →
            </a>
          </div>
        </div>
        <div className="flex gap-2 flex-wrap mt-11" data-reveal>
          {FEATURES.map((feature) => (
            <span
              key={feature}
              className="font-mono text-[11px] font-medium px-[18px] py-2 rounded-pill bg-white border border-border text-[#555552]"
            >
              {feature}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
