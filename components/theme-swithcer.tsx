'use client';
import { useTheme } from 'next-themes';

export default function ThemeSwitcher() {
  const { setTheme } = useTheme();

  return (
    <div
      className="theme fixed z-10 left-[calc(var(--pad)-.15em)] bottom-[var(--pad)] origin-bottom-left -rotate-90 flex gap-4 cursor-pointer whitespace-nowrap"
      id="Theme"
      x-data=""
    >
      <div className="flex gap-4">
        <button
          onClick={() => setTheme('light')}
          className="theme_btn flex gap-0.5 font-normal uppercase text-xs items-center leading-loose"
        >
          <div className="_box before:content-['■'] dark:before:content-['□'] before:text-xl before:leading-none"></div>
          <div className="_text">Light</div>
        </button>
        <button
          onClick={() => setTheme('dark')}
          className="theme_btn flex gap-0.5 font-normal uppercase text-xs items-center leading-loose"
        >
          <div className="_box before:content-['□'] dark:before:content-['■'] before:text-xl before:leading-none"></div>
          <div className="_text ">Dark</div>
        </button>
      </div>
    </div>
  );
}
