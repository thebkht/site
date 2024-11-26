'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { title } from 'process';

const items = [
  {
    title: 'Home',
    href: '/',
  },
  {
    title: 'Work',
    href: '/work',
  },
  {
    title: 'Stack',
    href: '/stack',
  },
  {
    title: 'Guestbook',
    href: '/guestbook',
  },
  {
    title: 'Contact',
    href: '/contact',
  },
];

export default function Header() {
  const pathname = usePathname();
  return (
    <header className="fixed z-10 left-[calc(var(--pad)*2)] top-[calc(var(--pad)*2)] mix-blend-difference text-white">
      <div className="flex items-center gap-4 font-bold">
        <svg
          width="70"
          height="70"
          viewBox="0 0 70 70"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="xl:h-12 xl:w-12 h-7 w-7"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M70 0H16V16H0V70H54V54H70V0ZM54 54V16H16V54H54Z"
            fill="currentColor"
          />
        </svg>
        <h1 className="text-2xl xl:text-5xl tracking-tight">
          Bakhtiyor Ganijon
        </h1>
      </div>
      <p className="mt-1 text-sm font-normal">Frontend Developer & Designer</p>
      <nav className="mt-12">
        <ol className="flex flex-col gap-4">
          {items.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li
                key={item.title}
                className={cn('relative', isActive && 'pointer-events-none')}
              >
                <div
                  className={cn(
                    'absolute left-0 top-0.5 text-xs pointer-events-none transition-opacity ease-in-out opacity-0',
                    isActive && 'opacity-100'
                  )}
                >
                  ●
                </div>
                <Link
                  className={cn(
                    'relative transition-opacity text-sm ease-in-out before:block before:absolute before:left-[-5px] before:top-[-5px] before:w-[calc(100%+10px)] before:h-[calc(100%+10px)] hover:opacity-25',
                    isActive && 'opacity-0'
                  )}
                  href={item.href}
                >
                  {item.title}
                </Link>
              </li>
            );
          })}
        </ol>
      </nav>
    </header>
  );
}
