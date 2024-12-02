export default function Frame() {
  return (
    <div
      className="frame fixed z-10 left-[var(--pad)] top-[var(--pad)] right-[var(--pad)] bottom-[var(--pad)] mix-blend-difference pointer-events-none"
      id="Frame"
    >
      <div className="absolute border-white border-dashed border-l opacity-50 left-0 top-0 h-full"></div>
      <div className="absolute border-white border-dashed border-r opacity-50 right-0 top-0 h-full"></div>
      <div className="absolute border-white border-dashed border-t opacity-50 left-0 top-0 w-full"></div>
      <div className="absolute border-white border-dashed border-b opacity-50 left-0 bottom-0 w-full"></div>
    </div>
  );
}
