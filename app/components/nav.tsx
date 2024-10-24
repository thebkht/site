'use client';
import { usePathname, useRouter } from 'next/navigation';
import { Link } from 'next-view-transitions';

export function AnimatedName() {
  return (
    <Link href="/" className="flex mb-8 font-medium text-gray-400 fade-in">
      Bakhtiyor Ganijon
    </Link>
  );
}

export const navItems = {
  '/': {
    name: 'home',
  },
  '/work': {
    name: 'Work',
  },
  '/blog': {
    name: 'Blog',
  },
  '/notes': {
    name: 'Notes',
  },
  '/guestbook': {
    name: 'Guestbook',
  },
};

export function Navbar({
  open,
  toggleNav,
}: {
  open: boolean;
  toggleNav: () => void;
}) {
  const pathname = usePathname();
  return (
    <header className="tracking-tight">
      <div className="lg:sticky lg:top-20 flex w-full items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center justify-center gap-2.5">
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
          </Link>
          {pathname !== '/' ? (
            <div className="font-medium">{navItems[pathname]?.name}</div>
          ) : (
            <AnimatedName />
          )}
        </div>
        <div className="header--nav-toggle" role="button" onClick={toggleNav}>
          <span></span>
        </div>
      </div>
    </header>
  );
}
