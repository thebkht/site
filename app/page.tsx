'use client';

import { useState, useCallback } from 'react';
import { Terminal } from '@/components/terminal';
import { SignIn } from '@/components/sign-in';
import { useSession } from 'next-auth/react';

const TABS = ['home', 'work', 'stack', 'guestbook', 'contact'] as const;
type Tab = (typeof TABS)[number];

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const { data: session } = useSession();

  const handleTabClick = useCallback((tab: Tab) => {
    setActiveTab(tab);
  }, []);

  return (
    <div className="min-h-screen bg-background p-4 font-mono">
      <div className="max-w-3xl mx-auto">
        <header className="mb-4">
          <nav className="flex items-center text-xs md:text-sm divide-x-2">
            <svg
              width="70"
              height="70"
              viewBox="0 0 70 70"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-foreground mr-2"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M70 0H16V16H0V70H54V54H70V0ZM54 54V16H16V54H54Z"
                fill="currentColor"
              />
            </svg>
            <button
              className={`px-3 py-1 border-y-2 first:border-l-2 border-r-2 md:border-r-0 last:!border-r-2 border-muted`}
            >
              <span className="hidden xl:inline">bakhtiyor ganijon</span>
              <span className="xl:hidden">bkhtdev</span>
            </button>
            {TABS.map((tab) => (
              <button
                key={tab}
                className={`px-3 py-1 border-y-2 first:border-l-2 last:!border-r-2 border-muted hidden md:inline-block ${
                  activeTab === tab
                    ? 'text-primary-foreground'
                    : 'text-muted-foreground'
                }`}
                onClick={() => handleTabClick(tab)}
              >
                {tab}
              </button>
            ))}
          </nav>
        </header>
        <main className="py-4">
          {activeTab === 'guestbook' && !session ? (
            <SignIn />
          ) : (
            <Terminal activeTab={activeTab} onCommand={handleTabClick} />
          )}
        </main>
        <footer className="pt-4 border-t-2 text-sm">
          <div className="flex justify-between">
            {TABS.map((tab) => (
              <button
                key={tab}
                data-command={tab}
                className="text-muted-foreground"
                onClick={() => handleTabClick(tab)}
              >
                <span className="text-foreground">{tab.charAt(0)}:</span> {tab}
              </button>
            ))}
          </div>
        </footer>
      </div>
    </div>
  );
}
