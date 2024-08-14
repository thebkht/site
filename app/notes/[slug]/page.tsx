import type { Metadata } from 'next';
import { Suspense, cache } from 'react';
import { notFound } from 'next/navigation';
import { CustomMDX } from 'app/components/mdx';
import { getNote, getViewsCount } from 'app/db/queries';
import ViewCounter from 'app/view-counter';
import { increment } from 'app/db/actions';
import { unstable_noStore as noStore } from 'next/cache';
import { baseUrl } from 'app/sitemap';
import Image from 'next/image';

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

export async function generateMetadata({
  params,
}): Promise<Metadata | undefined> {
  let note = await getNote(params.slug);
  if (!note) {
    return;
  }

  let { title, publishedAt: publishedTime, content: description, image } = note;
  const ogUrl = new URL(`${baseUrl}/og`);
  ogUrl.searchParams.set('heading', title);
  ogUrl.searchParams.set('mode', 'dark');

  let ogImage = image ? image : ogUrl;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime,
      url: `https://blog.bkhtdev.com/notes/${note.slug}`,
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

function formatDate(date: Date | string) {
  noStore();
  let currentDate = new Date().getTime();

  if (!date) {
    return 'Invalid date';
  }
  if (typeof date === 'string' && !date.includes('T')) {
    date = `${date}T00:00:00`;
  }
  let targetDate = new Date(date).getTime();
  let timeDifference = Math.abs(currentDate - targetDate);
  let daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  let fullDate = new Date(date).toLocaleString('en-us', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  if (daysAgo < 1) {
    return 'Today';
  } else if (daysAgo < 7) {
    return `${fullDate} (${daysAgo}d ago)`;
  } else if (daysAgo < 30) {
    const weeksAgo = Math.floor(daysAgo / 7);
    return `${fullDate} (${weeksAgo}w ago)`;
  } else if (daysAgo < 365) {
    const monthsAgo = Math.floor(daysAgo / 30);
    return `${fullDate} (${monthsAgo}mo ago)`;
  } else {
    const yearsAgo = Math.floor(daysAgo / 365);
    return `${fullDate} (${yearsAgo}y ago)`;
  }
}

export default async function Note({ params }) {
  let note = await getNote(params.slug);

  if (!note) {
    notFound();
  }

  return (
    <section>
      {note.image && (
        <div className="w-full h-auto bg-neutral-600 rounded-lg mb-8 !relative !pb-0 overflow-hidden">
          <Image
            src={note.image}
            alt={note.title}
            layout="responsive"
            width={1000}
            height={500}
            className="rounded-md cover-image"
            placeholder="blur"
            blurDataURL={shimmer(1000, 500)}
          />
        </div>
      )}
      <h1 className="title font-medium text-2xl tracking-tighter max-w-[650px]">
        {note.title}
      </h1>
      <div className="flex justify-between items-center mt-2 mb-8 text-sm max-w-[650px]">
        <div className="flex gap-2 items-center text-sm">
          <Suspense fallback={<p className="h-5" />}>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              {formatDate(note.publishedAt)}
            </p>
          </Suspense>
        </div>
        <Suspense fallback={<p className="h-5" />}>
          <Views slug={note.slug} />
        </Suspense>
      </div>
      <article className="prose prose-quoteless prose-neutral dark:prose-invert">
        <CustomMDX source={note.content} />
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
