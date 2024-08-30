'use client';
import type { Metadata } from 'next';
import { Navbar } from 'app/components/nav';
import Footer from 'app/components/footer';
import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const navItems = {
  '/': {
    name: 'home',
  },
  '/projects': {
    name: 'projects',
  },
  '/blog': {
    name: 'blog',
  },
  '/notes': {
    name: 'notes',
  },
  '/uses': {
    name: 'setup',
  },
  '/guestbook': {
    name: 'guestbook',
  },
};

const cx = (...classes) => classes.filter(Boolean).join(' ');

export default function Layout({ children }: { children: React.ReactNode }) {
  const [navOpen, setNavOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const toggleNav = () => {
    const newNavOpen = !navOpen;
    setNavOpen(newNavOpen);

    setTimeout(() => {
      setIsLoading(newNavOpen);
    }, 25);
  };

  return (
    <div
      className={`perspective effect-rotate-left transition-all ease-in-out ${
        navOpen ? 'perspective--modalview' : ''
      } ${isLoading ? 'effect-rotate-left--animate' : ''}`}
    >
      <div className="main-container">
        <div
          className={`outer-nav--return ${navOpen ? 'is-vis' : ''}`}
          onClick={toggleNav}
        ></div>
        <div className="l-viewport">
          <div className="h-full w-full overflow-y-auto">
            <div className="antialiased max-w-2xl mb-40 flex flex-col md:flex-row mx-4 mt-8 lg:mx-auto">
              <main className="flex-auto min-w-0 mt-6 flex flex-col px-2 md:px-0">
                <Navbar open={navOpen} toggleNav={toggleNav} />
                {children}
                <Footer />
              </main>
            </div>
          </div>
        </div>
      </div>
      <ul className={`outer-nav ${navOpen ? 'is-vis' : ''}`}>
        {Object.entries(navItems).map(([path, { name }]) => {
          return (
            <li
              key={path}
              className={cx(
                'text-3xl font-semibold cursor-pointer',
                pathname === path ? 'is-active' : '',
                navOpen ? 'is-vis' : ''
              )}
              onClick={() => {
                router.push(path);
                toggleNav();
              }}
            >
              {name}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
