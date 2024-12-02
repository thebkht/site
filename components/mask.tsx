export default function Mask() {
  return (
    <div
      className="mask fixed z-[3] left-0 top-0 w-full h-full pointer-events-none overflow-hidden"
      id="Mask"
    >
      <div className="absolute left-[var(--pad)] w-full h-[var(--pad)] bg-background/65 transition-all ease-in-out top-0 right-0 backdrop-blur-md flex items-center">
        <div className="flex items-center gap-4 font-bold text-foreground">
          <svg
            width="70"
            height="70"
            viewBox="0 0 70 70"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M70 0H16V16H0V70H54V54H70V0ZM54 54V16H16V54H54Z"
              fill="currentColor"
            />
          </svg>
          <h1 className="text-base tracking-tight">Bakhtiyor Ganijon</h1>
        </div>
      </div>
      <div className="absolute left-0 h-[var(--pad)] bg-background/65 transition-all ease-in-out bottom-0 right-[var(--pad)] backdrop-blur-md"></div>
      <div className="absolute left-0 h-full w-[var(--pad)] bg-background/65 transition-all ease-in-out top-[var(--pad)] bottom-0 backdrop-blur-md"></div>
      <div className="absolute right-0 h-full w-[var(--pad)] bg-background/65 transition-all ease-in-out bottom-[var(--pad)] top-0 backdrop-blur-md"></div>
    </div>
  );
}
