export default function Frame() {
  return (
    <div
      className="frame fixed z-10 left-[var(--pad)] top-[var(--pad)] right-[var(--pad)] bottom-[var(--pad)] mix-blend-difference pointer-events-none"
      id="Frame"
    >
      <div className="absolute bg-white opacity-50 left-0 top-0 w-px h-full"></div>
      <div className="absolute bg-white opacity-50 right-0 top-0 w-px h-full"></div>
      <div className="absolute bg-white opacity-50 left-0 top-0 h-px w-full"></div>
      <div className="absolute bg-white opacity-50 left-0 bottom-0 h-px w-full"></div>
    </div>
  );
}
