export default function Footer() {
  return (
    <footer className="px-10 py-6 border-t border-border flex flex-col gap-4">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="text-[12px] text-muted font-mono">HORUS · free</div>
        <div className="flex gap-6 text-[12px] text-muted">
          <a href="https://x.com/horusflow" target="_blank" rel="noopener noreferrer" className="text-muted no-underline transition-colors duration-150 hover:text-ink">X / Twitter</a>
          <a href="https://github.com/muaddib14/Horus-Extension/releases/latest" target="_blank" rel="noopener noreferrer" className="text-muted no-underline transition-colors duration-150 hover:text-ink">GitHub</a>
          <a href="#" className="text-muted no-underline transition-colors duration-150 hover:text-ink">Chrome Store</a>
        </div>
      </div>
      <p className="text-[11px] text-muted leading-[1.6] m-0 max-w-[720px]">
        HORUS is an order-flow visualization tool, not financial advice. Delta, CVD, OI, and trap signals are derived from public trade data and are not guaranteed to predict price movement. Trading futures carries substantial risk of loss — verify signals against your own analysis before acting on them.
      </p>
    </footer>
  );
}
