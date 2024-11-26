import './globals.css';
import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { SandpackCSS } from './p/sandpack';
import {
  JetBrains_Mono as FontMono,
  Manrope as FontSans,
} from 'next/font/google';
import { baseUrl } from './sitemap';
import { ViewTransitions } from 'next-view-transitions';
import Footer from '@/components/footer';
import ThemeProvider from '@/components/provider';
import ThemeSwitcher from '@/components/theme-swithcer';
import Background from '@/components/background';

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
    default: 'Bakhtiyor Ganijon',
    template: '%s - Bakhtiyor Ganijon',
  },
  description:
    'A geeky front-end developer and designer from Uzbekistan. Gained hands-on experience at Technocorp as an intern, specializing in React and product development. Passionate about continuous learning and exploring new tech frontiers.',
  openGraph: {
    title: {
      default: 'Bakhtiyor Ganijon',
      template: '%s - Bakhtiyor Ganijon',
    },
    description:
      'A geeky front-end developer and designer from Uzbekistan. Gained hands-on experience at Technocorp as an intern, specializing in React and product development. Passionate about continuous learning and exploring new tech frontiers.',
    url: baseUrl,
    siteName: 'Bakhtiyor Ganijon',
    images: [
      {
        url: `${baseUrl}/og.jpg`,
        width: 1200,
        height: 630,
        alt: 'Bakhtiyor Ganijon',
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
        <body className="antialiased tracking-tight font-sans ">
          <ThemeProvider>
            <div
              id="Page"
              className="fixed left-0 top-0 h-full w-full transition-all whitespace-nowrap overflow-hidden bg-background text-foreground ease-in-out"
              suppressHydrationWarning
            >
              <Background />
              <div
                className="mask fixed z-[3] left-0 top-0 w-full h-full pointer-events-none overflow-hidden"
                id="Mask"
              >
                <div className="absolute left-0 w-full h-[var(--pad)] opacity-90 bg-background transition-all ease-in-out top-0"></div>
                <div className="absolute left-0 w-full h-[var(--pad)] opacity-90 bg-background transition-all ease-in-out bottom-0"></div>
              </div>
              <div
                className="frame fixed z-10 left-[var(--pad)] top-[var(--pad)] right-[var(--pad)] bottom-[var(--pad)] mix-blend-difference pointer-events-none"
                id="Frame"
              >
                <div className="absolute bg-white opacity-50 left-0 top-0 w-px h-full"></div>
                <div className="absolute bg-white opacity-50 right-0 top-0 w-px h-full"></div>
                <div className="absolute bg-white opacity-50 left-0 top-0 h-px w-full"></div>
                <div className="absolute bg-white opacity-50 left-0 bottom-0 h-px w-full"></div>
              </div>
              <ThemeSwitcher />
              <main
                className="fixed z-[2] left-0 top-0 w-full h-full overflow-hidden"
                data-scroll="area"
                id="Content"
              >
                <div
                  className="relative min-h-full"
                  data-scroll="target"
                  suppressHydrationWarning
                >
                  {children}
                </div>
              </main>
              {/* <Footer /> */}
              <Analytics />
              <SpeedInsights />
            </div>
          </ThemeProvider>
          <script src="/assets/js/main.js"></script>
        </body>
      </html>
    </ViewTransitions>
  );
}
