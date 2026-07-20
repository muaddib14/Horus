export default function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-10 h-[58px]"
      style={{
        background: "rgba(247,246,243,.88)",
        backdropFilter: "blur(12px)",
        borderBottom: ".5px solid rgba(229,227,220,.7)",
        transition: "transform .4s cubic-bezier(.16,1,.3,1)",
      }}
    >
      <div className="flex items-center gap-[10px]">
        <div
          className="size-7 bg-ink rounded-[7px] flex items-center justify-center text-[13px] font-bold text-paper"
          style={{ color: "transparent" }}
        >
          M
        </div>
        <span className="text-[14px] font-bold tracking-[-.02em] text-ink">MARK</span>
      </div>
      <div className="items-center gap-8 hidden md:flex">
        <button className="text-[13px] text-muted transition-colors duration-150 hover:text-ink cursor-pointer">
          How it works
        </button>
        <button className="text-[13px] text-muted transition-colors duration-150 hover:text-ink cursor-pointer">
          Features
        </button>
        <button className="text-[13px] text-muted transition-colors duration-150 hover:text-ink cursor-pointer">
          Skills
        </button>
      </div>
      <div className="flex items-center gap-3">
        <button className="text-[12px] font-semibold px-5 py-[9px] rounded-pill bg-ink text-paper border-none flex items-center gap-[7px] tracking-[.01em] transition-opacity duration-150 hover:opacity-[.85] hidden md:flex">
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M12 8v4l3 3"></path>
          </svg>
          Add to Chrome — free
        </button>
        <button className="md:hidden flex flex-col gap-[5px] p-2 cursor-pointer bg-transparent border-none" aria-label="Toggle menu">
          <span className="block h-[2px] rounded-sm bg-ink transition-all duration-300" style={{ width: 22 }}></span>
          <span className="block h-[2px] rounded-sm bg-ink transition-all duration-300" style={{ width: 22, opacity: 1 }}></span>
          <span className="block h-[2px] rounded-sm bg-ink transition-all duration-300" style={{ width: 22 }}></span>
        </button>
      </div>
    </nav>
  );
}
