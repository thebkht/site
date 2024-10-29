import { Link } from 'next-view-transitions';

function ArrowIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.07102 11.3494L0.963068 10.2415L9.2017 1.98864H2.83807L2.85227 0.454545H11.8438V9.46023H10.2955L10.3097 3.09659L2.07102 11.3494Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function Footer() {
  const links = [
    { name: '@thebkht', url: 'https://x.com/thebkht' },
    { name: 'youtube', url: 'https://www.youtube.com/@bkhtdev' },
    { name: 'linkedin', url: 'https://www.linkedin.com/in/thebkht' },
    { name: 'github', url: 'https://github.com/thebkht' },
  ];
  return (
    <footer className="mt-12 text-center">
      <div className="flex justify-between items-center space-x-4 tracking-tight flex-wrap md:max-w-[60ch] mx-auto">
        <svg
          width="70"
          height="70"
          viewBox="0 0 70 70"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-muted-foreground"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M70 0H16V16H0V70H54V54H70V0ZM54 54V16H16V54H54Z"
            fill="currentColor"
          />
        </svg>
        {links.map((link) =>
          link.url.startsWith('http') ? (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              className="text-muted-foreground hover:text-blue-500 transition-colors duration-200"
            >
              {link.name}
            </a>
          ) : (
            <Link
              key={link.name}
              href={link.url}
              className="text-muted-foreground hover:text-blue-500 transition-colors duration-200"
            >
              {link.name}
            </Link>
          )
        )}
      </div>
    </footer>
  );
}
