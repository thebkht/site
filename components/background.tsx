'use client';

export default function Background() {
  return (
    <div
      id="Background"
      className="fixed z-[1] left-[var(--pad)] top-[var(--pad)] right-[var(--pad)] bottom-[var(--pad)] overflow-hidden pointer-events-none"
    >
      <canvas
        data-engine="three.js r169"
        width="1304"
        height="330"
        style={{ width: '1304px', height: '330px' }}
        suppressHydrationWarning
      ></canvas>
    </div>
  );
}
