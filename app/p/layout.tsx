import { baseUrl } from 'app/sitemap';
import { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Writtings',
    template: '%s',
  },
  description:
    'A collection of my thoughts and ideas on various topics. I write about web development, design, and other things that interest me.',
  openGraph: {
    title: {
      default: 'Writtings',
      template: '%s',
    },
    description:
      'A collection of my thoughts and ideas on various topics. I write about web development, design, and other things that interest me.',
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
  return <>{children}</>;
}
