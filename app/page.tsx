'use client';

import { useState } from 'react';
import { Terminal } from '@/components/terminal';
import { SignIn } from '@/components/sign-in';

export default function Home() {
  const [activeTab, setActiveTab] = useState('home');
  const [isSignedIn, setIsSignedIn] = useState(false);

  const handleFooterClick = (e: React.MouseEvent<HTMLElement>) => {
    const command = (e.target as HTMLElement).getAttribute('data-command');
    if (command) {
      setActiveTab(command);
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 font-mono">
      <div className="max-w-3xl mx-auto">
        <header className="mb-4">
          <nav className="flex text-sm divide-x-2">
            {['home', 'work', 'stack', 'guestbook', 'contact'].map((tab) => (
              <button
                key={tab}
                className={`px-3 py-1 border-y-2 first:border-l-2 last:!border-r-2 border-muted ${
                  activeTab === tab
                    ? 'text-primary-foreground'
                    : 'text-muted-foreground'
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </nav>
        </header>
        <main className="py-4">
          {activeTab === 'guestbook' && !isSignedIn ? (
            <SignIn onSignIn={() => setIsSignedIn(true)} />
          ) : (
            <Terminal
              activeTab={activeTab}
              isSignedIn={isSignedIn}
              onCommand={setActiveTab}
            />
          )}
        </main>
        <footer className="pt-4 border-t-2 text-sm">
          <div className="flex justify-between" onClick={handleFooterClick}>
            <span data-command="home">h: home</span>
            <span data-command="work">w: work</span>
            <span data-command="stack">s: stack</span>
            <span data-command="guestbook">g: guestbook</span>
            <span data-command="contact">c: contact</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
