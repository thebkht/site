import postgres from 'postgres';

export const sql = postgres(process.env.POSTGRES_URL, {
  ssl: 'allow',
});

const nextConfig = {
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

export default nextConfig;
