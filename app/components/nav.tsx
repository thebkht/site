'use client';
import { Link } from 'next-view-transitions';
import { usePathname, useRouter } from 'next/navigation';

function AnimatedName() {
  return (
    <div className="font-medium transition-element">
      <span className="sr-only">Bakhtiyor Ganijon</span>
      <span aria-hidden="true" className="block overflow-hidden group relative">
        <span className="inline-block transition-all duration-300 ease-in-out group-hover:-translate-y-full">
          {'Bakhtiyor Ganijon'.split('').map((letter, index) => (
            <span
              key={index}
              className="inline-block"
              style={{ transitionDelay: `${index * 25}ms` }}
            >
              {letter === ' ' ? '\u00A0' : letter}
            </span>
          ))}
        </span>
        <span className="inline-block absolute left-0 top-0 transition-all duration-300 ease-in-out translate-y-full group-hover:translate-y-0">
          {'bkhtdev'.split('').map((letter, index) => (
            <span
              key={index}
              className="inline-block"
              style={{ transitionDelay: `${index * 25}ms` }}
            >
              {letter}
            </span>
          ))}
        </span>
      </span>
    </div>
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
