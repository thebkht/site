import postgres from 'postgres';
import createMDX from '@next/mdx';
import type { NextConfig } from 'next';

export const sql = postgres(process.env.POSTGRES_URL!, {
  ssl: 'allow',
});

const nextConfig: NextConfig = {
  pageExtensions: ['mdx', 'ts', 'tsx'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.midjourney.com',
      },
      {
        protocol: 'https',
        hostname: 'bkhtdev.com',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
    ],
  },
  transpilePackages: ['next-mdx-remote'],
  async redirects() {
    if (!process.env.POSTGRES_URL) {
      return [];
    }

    let redirects = await sql`
      SELECT source, destination, permanent
      FROM redirects;
    `;

    return redirects.map(({ source, destination, permanent }) => ({
      source,
      destination,
      permanent: !!permanent,
    }));
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
