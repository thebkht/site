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
  return <>{children}</>;
}
