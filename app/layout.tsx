import './global.css';
import type { Metadata } from 'next';
import { Navbar } from './(blog)/components/nav';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { SandpackCSS } from './(blog)/blog/[slug]/sandpack';
import {
  JetBrains_Mono as FontMono,
  Manrope as FontSans,
} from 'next/font/google';
import { baseUrl } from './sitemap';
import Footer from './(blog)/components/footer';
import Script from 'next/script';

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
    default: 'bkhtdev/blog',
    template: '%s - bkhtdev/blog',
  },
  description: 'Read my thoughts on software development, design, and more.',
  openGraph: {
    title: 'bkhtdev/blog',
    description: 'Read my thoughts on software development, design, and more.',
    url: baseUrl,
    siteName: 'bkhtdev/blog',
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
      <body>
        <div className="flex-none left-0 h-screen pointer-events-none fixed top-0 w-full z-[200]">
          <div className="noise" />
        </div>
        {children}
      </body>
    </html>
  );
}
