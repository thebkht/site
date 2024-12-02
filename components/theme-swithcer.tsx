'use client';
import { useTheme } from 'next-themes';
import { useEffect } from 'react';

declare global {
  interface Window {
    toggleTheme: () => void;
  }
}

export default function ThemeSwitcher() {
  const { setTheme } = useTheme();
  useEffect(() => {
    if (typeof window.toggleTheme !== 'function') {
      console.error('toggleTheme function is not defined on window');
    }
  }, []);

  return (
    <div
      className="fixed z-10 left-[calc(var(--pad)*1.5)] bottom-[calc(var(--pad)*1.5)] mix-blend-difference text-white origin-bottom-left flex gap-4 cursor-pointer whitespace-nowrap"
      id="Theme"
    >
      <div className="flex flex-col gap-2">
        <button
          onClick={() => {
            setTheme('light');
            window.toggleTheme();
          }}
          className="theme_btn flex gap-0.5 font-normal uppercase text-xs items-center leading-loose"
        >
          <div className="_box before:content-['■'] dark:before:content-['□'] before:text-xl before:leading-none"></div>
          <div className="_text">Light</div>
        </button>
        <button
          onClick={() => {
            setTheme('dark');
            window.toggleTheme();
          }}
          className="theme_btn flex gap-0.5 font-normal uppercase text-xs items-center leading-loose"
        >
          <div className="_box before:content-['□'] dark:before:content-['■'] before:text-xl before:leading-none"></div>
          <div className="_text">Dark</div>
        </button>
      </div>
    </div>
  );
}
