import './global.css';
import type { Metadata } from 'next';
import { Navbar } from './components/nav';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { SandpackCSS } from './blog/[slug]/sandpack';
import {
  JetBrains_Mono as FontMono,
  Manrope as FontSans,
} from 'next/font/google';
import { baseUrl } from './sitemap';
import Footer from './components/footer';
import Script from 'next/script';
import Mouse from './components/mouse';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

const fontMono = FontMono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Bakhtiyor Ganijon - bkhtdev',
    template: '%s - bkhtdev',
  },
  description:
    'A passionate computer science student at Sejong University, Bakhtiyor is deeply interested in art and technology',
  openGraph: {
    title: 'bkhtdev',
    description:
      'A passionate computer science student at Sejong University, Bakhtiyor is deeply interested in art and technology',
    url: baseUrl,
    siteName: 'bkhtdev',
    images: [
      {
        url: `${baseUrl}/og.jpg`,
        width: 1200,
        height: 630,
        alt: 'bkhtdev',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@bkhtdev',
    creator: '@thebkht',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: `${baseUrl}/site.webmanifest`,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const cx = (...classes) => classes.filter(Boolean).join(' ');

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cx(
        'text-black bg-white dark:text-white dark:bg-[#111010]',
        fontSans.variable,
        fontMono.variable
      )}
    >
      <head>
        <SandpackCSS />
      </head>
      <body className="antialiased max-w-2xl mb-40 flex flex-col md:flex-row mx-4 mt-8 lg:mx-auto">
        <div className="flex-none left-0 h-screen pointer-events-none fixed top-0 w-full z-[200]">
          <div className="noise" />
        </div>
        <main className="flex-auto min-w-0 mt-6 flex flex-col px-2 md:px-0">
          <Navbar />
          {children}
          <Footer />
          <Analytics />
          <SpeedInsights />
        </main>
        <Mouse />
      </body>
    </html>
  );
}
