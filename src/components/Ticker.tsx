const ITEMS: { repo: string; token: string }[] = [
  { repo: "vercel/next.js", token: "$DEPLOY" },
  { repo: "ggerganov/whisper.cpp", token: "$SPACES" },
  { repo: "supabase/supabase", token: "$BASE" },
  { repo: "microsoft/vscode", token: "$EXT" },
  { repo: "langchain-ai/langchain", token: "$CHAIN" },
];

function Sequence() {
  return (
    <>
      {ITEMS.map((item) => (
        <span key={item.repo} className="flex gap-10 whitespace-nowrap items-center">
          <span className="text-[#555]">→ {item.repo}</span>
          <span className="text-term-green">scanned ✓</span>
          <span className="text-[#2a2a28]">·</span>
          <span className="text-[#555]">{item.token} generated</span>
          <span className="text-[#2a2a28]">·</span>
        </span>
      ))}
    </>
  );
}

export default function Ticker() {
  return (
    <div className="overflow-hidden py-[10px] bg-term-bg border-b border-white/[.06]">
      <div className="flex gap-10 whitespace-nowrap font-mono text-[11px]" style={{ animation: "ticker 28s linear infinite", width: "max-content" }}>
        <Sequence />
        <Sequence />
      </div>
    </div>
  );
}
