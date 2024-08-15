import Link from 'next/link';

const navItems = {
  '/admin': {
    name: 'guestbook',
  },
  '/admin/telegram': {
    name: 'notes',
  },
  '/create-note': {
    name: 'create note',
  },
};

export function Navbar() {
  return (
    <aside className="mb-16 tracking-tight">
      <div className="lg:sticky lg:top-20">
        <nav
          className="flex flex-row items-start relative px-0 pb-0 fade md:overflow-auto scroll-pr-6 md:relative"
          id="nav"
        >
          <div className="flex flex-row space-x-0 pr-10 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 70 70"
              className="h-5 w-5"
            >
              <path
                d="M58.97,11.03v37.12l-10.71,10.82H11.03V21.85l10.71-10.82h37.22M70,0H17.15L0,17.31v52.69h52.85l17.15-17.31V0h0Z"
                fill="currentColor"
                strokeWidth="0"
              />
            </svg>
            {Object.entries(navItems).map(([path, { name }]) => {
              return (
                <Link
                  key={path}
                  href={path}
                  className="transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle relative py-1 px-2"
                >
                  {name}
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </aside>
  );
}
