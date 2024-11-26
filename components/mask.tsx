export default function Mask() {
  return (
    <div
      className="mask fixed z-[3] left-0 top-0 w-full h-full pointer-events-none overflow-hidden"
      id="Mask"
    >
      <div className="absolute left-0 w-full h-[var(--pad)] opacity-90 bg-background transition-all ease-in-out top-0"></div>
      <div className="absolute left-0 w-full h-[var(--pad)] opacity-90 bg-background transition-all ease-in-out bottom-0"></div>
    </div>
  );
}
