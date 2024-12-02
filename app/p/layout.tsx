import { baseUrl } from 'app/sitemap';
import { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Writtings',
    template: '%s',
  },
  openGraph: {
    title: {
      default: 'Writtings',
      template: '%s',
    },
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@bkhtdev',
    creator: '@thebkht',
  },
};

export default function PostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="py-[calc(var(--pad)*1.5+96px)] px-[calc(var(--pad)*1.5)] xl:py-[calc(var(--pad)*1.5+115px)]">
      <div className="w-full max-w-[calc(var(--vw)*100-var(--pad)*3-82px)] text-sm xl:max-w-lg flex flex-col items-end ml-auto whitespace-normal">
        {children}
      </div>
    </section>
  );
}
