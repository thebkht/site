import Link from 'next/link';
export function Navbar({
  open,
  toggleNav,
}: {
  open: boolean;
  toggleNav: () => void;
}) {
  return (
    <header className="mb-16 tracking-tight">
      <div className="lg:sticky lg:top-20 flex w-full items-center justify-between">
        <Link href="/" className="flex items-center justify-center">
          <svg
            width="70"
            height="70"
            viewBox="0 0 70 70"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M70 0H16V16H0V70H54V54H70V0ZM54 54V16H16V54H54Z"
              fill="currentColor"
            />
          </svg>
          <span className="sr-only">bkhtdev.com</span>
        </Link>
        <div className="header--nav-toggle" role="button" onClick={toggleNav}>
          <span></span>
        </div>
      </div>
    </header>
  );
}
