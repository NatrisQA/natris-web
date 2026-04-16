export default function Loading() {
  return (
    <div
      className="flex items-center justify-center"
      style={{ height: "100dvh", background: "#050508" }}
    >
      <div className="flex items-center gap-3">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black text-white animate-pulse"
          style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
        >
          L
        </div>
        <span className="text-white/40 text-sm font-medium">Loading...</span>
      </div>
    </div>
  );
}
