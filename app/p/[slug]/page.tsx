import type { Metadata } from 'next';
import { Suspense, cache } from 'react';
import { notFound } from 'next/navigation';
import { CustomMDX } from 'app/components/mdx';
import { getViewsCount } from 'app/db/queries';
import { getBlogPosts } from 'app/db/blog';
import ViewCounter from '../../view-counter';
import { increment } from 'app/db/actions';
import { unstable_noStore as noStore } from 'next/cache';
import { baseUrl } from 'app/sitemap';
import Image from 'next/image';
import readingTime from 'reading-time';
import { AnimatedName } from 'app/components/nav';
import { formatDate } from 'utils/format';

const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

const toBase64 = (str: string) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str);

export async function generateMetadata({
  params,
}): Promise<Metadata | undefined> {
  let post = getBlogPosts().find((post) => post.slug === params.slug);
  if (!post) {
    return;
  }

  let {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = post.metadata;
  const ogUrl = new URL(`${baseUrl}/og`);
  ogUrl.searchParams.set('heading', title);
  ogUrl.searchParams.set('mode', 'light');

  let ogImage = image ? image : ogUrl;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime,
      url: `https://blog.bkhtdev.com/blog/${post.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function Blog({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let post = getBlogPosts().find((post) => post.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <section>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.metadata.title,
            datePublished: post.metadata.publishedAt,
            dateModified: post.metadata.publishedAt,
            description: post.metadata.summary,
            image: post.metadata.image
              ? `https://blog.bkhtdev.com${post.metadata.image}`
              : `https://blog.bkhtdev.com/og?title=${post.metadata.title}`,
            url: `https://blog.bkhtdev.com/blog/${post.slug}`,
            author: {
              '@type': 'Person',
              name: 'bkhtdev',
            },
          }),
        }}
      />
      <h1 className="title font-medium pt-12 mb-0 fade-in max-w-[650px]">
        {post.metadata.title}
      </h1>
      <AnimatedName />
      <div className="flex justify-between items-center mb-8 text-sm max-w-[650px]">
        <div className="flex gap-2 items-center text-sm">
          <Suspense fallback={<p className="h-5" />}>
            <p className="text-sm text-muted-foreground">
              {readingTime(post.content, { wordsPerMinute: 300 }).text}
            </p>
          </Suspense>
          <span className="text-sm text-muted-foreground">·</span>
          <Suspense fallback={<p className="h-5" />}>
            <p className="text-sm text-muted-foreground">
              {formatDate(post.metadata.publishedAt)}
            </p>
          </Suspense>
        </div>
        <Suspense fallback={<p className="h-5" />}>
          <Views slug={post.slug} />
        </Suspense>
      </div>
      {post.metadata.image && (
        <div className="w-full h-auto bg-muted rounded-lg mb-8 !relative !pb-0 overflow-hidden cover-image">
          <Image
            src={post.metadata.image}
            alt={post.metadata.title}
            layout="responsive"
            width={1000}
            height={500}
            className="rounded-md"
            placeholder="blur"
            blurDataURL={shimmer(1000, 500)}
          />
        </div>
      )}
      <article className="prose prose-quoteless prose-gray dark:prose-invert">
        <CustomMDX source={post.content} />
      </article>
    </section>
  );
}

let incrementViews = cache(increment);

async function Views({ slug }: { slug: string }) {
  let views = await getViewsCount();
  incrementViews(slug);
  return <ViewCounter allViews={views} slug={slug} />;
}
