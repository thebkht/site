import { Suspense } from 'react';
import ViewCounter from './view-counter';
import { getPattern, getViewsCount } from './db/queries';
import { Link } from 'next-view-transitions';
import { CustomMDX as MDX } from './components/mdx';

function AnimatedName() {
  return (
    <div className="font-medium pt-12 transition-element">
      <span className="sr-only">Bakhtiyor Ganijon</span>
      <span aria-hidden="true" className="block overflow-hidden group relative">
        <span className="inline-block transition-all duration-300 ease-in-out group-hover:-translate-y-full">
          {'Bakhtiyor Ganijon'.split('').map((letter, index) => (
            <span
              key={index}
              className="inline-block"
              style={{ transitionDelay: `${index * 25}ms` }}
            >
              {letter === ' ' ? '\u00A0' : letter}
            </span>
          ))}
        </span>
        <span className="inline-block absolute left-0 top-0 transition-all duration-300 ease-in-out translate-y-full group-hover:translate-y-0">
          {'bkhtdev'.split('').map((letter, index) => (
            <span
              key={index}
              className="inline-block"
              style={{ transitionDelay: `${index * 25}ms` }}
            >
              {letter}
            </span>
          ))}
        </span>
      </span>
    </div>
  );
}

function ArrowIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.07102 11.3494L0.963068 10.2415L9.2017 1.98864H2.83807L2.85227 0.454545H11.8438V9.46023H10.2955L10.3097 3.09659L2.07102 11.3494Z"
        fill="currentColor"
      />
    </svg>
  );
}

async function Views({ slug }: { slug: string }) {
  let views = await getViewsCount();
  return <ViewCounter allViews={views} slug={slug} className="m-0" />;
}

function ProjectLink({ slug, name }) {
  return (
    <div className="group">
      <a
        href={`/projects/${slug}`}
        className="flex w-full items-center justify-between border-dashed border border-neutral-200 bg-neutral-50 px-3 py-4 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100 no-underline"
      >
        <div className="flex flex-col">
          <p className="font-medium text-neutral-900 dark:text-neutral-100 m-0">
            {name}
          </p>
          <Suspense fallback={<p className="h-4" />}>
            <Views slug={slug} />
          </Suspense>
        </div>
        <div className="transform text-neutral-700 transition-transform duration-300 group-hover:-rotate-12 dark:text-neutral-300">
          <ArrowIcon />
        </div>
      </a>
    </div>
  );
}

export default async function Page() {
  const pattern = await getPattern();
  console.log(pattern?.pattern);
  return (
    <>
      <AnimatedName />
      <div className="space-y-4 leading-snug text-gray-800 dark:text-gray-300">
        <div className="my-4 crt scanlines rounded-md">
          <MDX source={pattern?.pattern} />
        </div>
        <p>
          {`I'm a geeky front-end developer and designer from Uzbekistan, now studying Computer Science at `}
          <Link
            target="_blank"
            href="https://en.sejong.ac.kr/"
            className="text-blue-500 hover:text-blue-700 no-underline"
          >
            Sejong University
          </Link>
          {` in South Korea. Gained hands-on experience at `}
          <Link
            href="/work"
            className="text-blue-500 hover:text-blue-700 no-underline"
          >
            Technocorp
          </Link>
          {` as an intern, specializing in `}
          <Link
            href="/stack"
            className="text-blue-500 hover:text-blue-700 no-underline"
          >
            React
          </Link>
          {`  and product development. Passionate about continuous learning and exploring new tech frontiers.`}
        </p>

        <p>
          I blog and write newsletters on tech trends and geek culture, covering
          topics like
          {` `}
          <Link
            href="/p/animated-counter"
            className="text-blue-500 hover:text-blue-700 no-underline"
          >
            'Animated Counter in React'
          </Link>
          {` and `}
          <Link
            href="/p/the-history-and-success-of-winrar"
            className="text-blue-500 hover:text-blue-700 no-underline"
          >
            'The Success Story of WinRAR'
          </Link>
          . Check out my
          {` `}
          <Link
            href="/blog"
            className="text-blue-500 hover:text-blue-700 no-underline"
          >
            blog
          </Link>
          {` for more.`}
        </p>
        {/*guestbook*/}
        <p>
          Feel free to drop a note or question in my {` `}
          <Link
            href="/guestbook"
            className="text-blue-500 hover:text-blue-700 no-underline"
          >
            guestbook
          </Link>
          ; I make it a point to reply to each message I receive.
        </p>
      </div>
    </>
  );
}
