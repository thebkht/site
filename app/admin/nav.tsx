import { Link } from 'next-view-transitions';

const navItems = [
  {
    name: 'guestbook',
    url: '/admin',
  },
  {
    name: 'notes',
    url: '/admin/telegram',
  },
  {
    name: 'create note',
    url: '/admin/create-note',
  },
  {
    name: 'library',
    url: '/admin/library',
  },
];

export function Navbar() {
  return (
    <nav
      className="flex flex-row items-start relative px-0 pb-0 fade md:overflow-auto scroll-pr-6 md:relative mb-4"
      id="nav"
    >
      <div className="flex flex-row space-x-4 pr-10 items-center">
        {navItems.map((link) => {
          return (
            <Link
              key={link.name}
              href={link.url}
              className="text-muted-foreground hover:text-blue-500 transition-colors duration-200 flex align-middle relative"
            >
              {link.name}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
