import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with me.',
};

const links = [
  { name: 'x(twitter)', url: 'https://x.com/thebkht' },
  { name: 'youtube', url: 'https://www.youtube.com/@bkhtdev' },
  { name: 'linkedin', url: 'https://www.linkedin.com/in/thebkht' },
  { name: 'github', url: 'https://github.com/thebkht' },
];

export default function Page() {
  return (
    <section
      data-page="home"
      className="page min-h-[calc(var(--vh,1vh)*100)] text-sm font-bold w-full max-w-[calc(var(--vw)*100-var(--pad)*4-82px)] xl:max-w-lg ml-auto"
    >
      <div className="absolute right-[calc(var(--pad)*2)] bottom-[calc(var(--pad)*2)] whitespace-nowrap">
        {links.map((link) =>
          link.url.startsWith('http') ? (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              className="text-white hover:opacity-25"
            >
              {link.name} ↗
            </a>
          ) : (
            <Link
              key={link.name}
              href={link.url}
              className="text-white underline-offset-4 underline hover:opacity-25"
            >
              {link.name}
            </Link>
          )
        )}
      </div>
    </section>
  );
}
