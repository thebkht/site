import './globals.css';
import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { SandpackCSS } from './p/[slug]/sandpack';
import {
  JetBrains_Mono as FontMono,
  Manrope as FontSans,
} from 'next/font/google';
import { baseUrl } from './sitemap';
import { ViewTransitions } from 'next-view-transitions';
import Footer from './components/footer';
import { ThemeProvider } from 'next-themes';

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
    'A geeky front-end developer and designer from Uzbekistan. Gained hands-on experience at Technocorp as an intern, specializing in React and product development. Passionate about continuous learning and exploring new tech frontiers.',
  openGraph: {
    title: {
      default: 'Bakhtiyor Ganijon - bkhtdev',
      template: '%s - bkhtdev',
    },
    description:
      'A geeky front-end developer and designer from Uzbekistan. Gained hands-on experience at Technocorp as an intern, specializing in React and product development. Passionate about continuous learning and exploring new tech frontiers.',
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
    other: [
      {
        url: '/favicon.svg',
        rel: 'mask-icon',
        color: '#000000',
      },
    ],
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

const cx = (...classes: (string | undefined)[]) =>
  classes.filter(Boolean).join(' ');

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ViewTransitions>
      <html
        lang="en"
        className={cx(fontSans.variable, fontMono.variable)}
        suppressHydrationWarning
      >
        <head>
          <SandpackCSS />
        </head>
        <body className="antialiased tracking-tight font-sans">
          <ThemeProvider attribute="class">
            <div className="min-h-screen flex flex-col justify-between pt-0 md:pt-8 p-8 text-foreground bg-background">
              <main className="max-w-[60ch] mx-auto w-full space-y-6">
                {children}
              </main>
              <Footer />
              <Analytics />
              <SpeedInsights />
            </div>
          </ThemeProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}
