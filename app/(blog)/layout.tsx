'use client';
import type { Metadata } from 'next';
import { Navbar, navItems } from 'app/components/nav';
import Footer from 'app/components/footer';
import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

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
          <div className="h-full w-full overflow-y-auto antialiased tracking-tight">
            <div className="min-h-screen flex flex-col justify-between pt-0 md:pt-8 p-8">
              <main className="max-w-[60ch] mx-auto w-full space-y-6">
                <Navbar open={navOpen} toggleNav={toggleNav} />
                {children}
              </main>
              <Footer />
            </div>
          </div>
        </div>
      </div>
      <ul className={`outer-nav lowercase ${navOpen ? 'is-vis' : ''}`}>
        {Object.entries(navItems).map(([path, { name }]) => {
          const isActive =
            pathname === path ||
            (path === '/blog' && pathname.startsWith('/blog/')) ||
            (path === '/notes' && pathname.startsWith('/notes/')) ||
            (path === '/projects' && pathname.startsWith('/projects/'));

          return (
            <li
              key={path}
              className={cx(
                'text-4xl font-semibold cursor-pointer leading-snug',
                isActive ? 'is-active' : '',
                navOpen ? 'is-vis' : ''
              )}
            >
              <Link href={path} onClick={toggleNav}>
                {name}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
