export default function Loading() {
  return (
    <div className="w-full h-screen flex justify-center items-center bg-background">
      <svg
        width="70"
        height="70"
        viewBox="0 0 70 70"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-16 h-16 text-foreground"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M70 0H16V16H0V70H54V54H70V0ZM54 54V16H16V54H54Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}
