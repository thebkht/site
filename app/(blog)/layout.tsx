import 'app/global.css';
import type { Metadata } from 'next';
import { Navbar } from 'app/components/nav';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import {
  JetBrains_Mono as FontMono,
  Manrope as FontSans,
} from 'next/font/google';
import { baseUrl } from 'app/sitemap';
import Footer from 'app/components/footer';

const cx = (...classes) => classes.filter(Boolean).join(' ');

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="antialiased max-w-2xl mb-40 flex flex-col md:flex-row mx-4 mt-8 lg:mx-auto">
      <main className="flex-auto min-w-0 mt-6 flex flex-col px-2 md:px-0">
        <Navbar />
        {children}
        <Footer />
        <Analytics />
        <SpeedInsights />
      </main>
    </div>
  );
}
