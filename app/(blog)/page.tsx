import { Suspense } from 'react';
import ViewCounter from '../view-counter';
import { getViewsCount } from '../db/queries';

function Badge(props) {
  return (
    <a
      {...props}
      target="_blank"
      className="inline-flex items-center border-dashed border border-neutral-200 bg-neutral-50 p-1 text-sm leading-4 text-neutral-900 no-underline dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100"
    />
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

function BlogLink({ slug, name }) {
  return (
    <div className="group">
      <a
        href={`/blog/${slug}`}
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

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-medium tracking-tighter">
        hey, I'm bkht 👋
      </h1>
      <p className="prose prose-neutral dark:prose-invert">
        {`I'm a geeky front-end developer and designer. Born and raised in Uzbekistan, I have since moved to South Korea, where I am studying computer science at `}
        <span className="not-prose">
          <Badge href="https://en.sejong.ac.kr/">Sejong University</Badge>
        </span>
        {`. I'm passionate about building accessible, performant, and delightful web experiences.`}
      </p>

      <p className="prose prose-neutral dark:prose-invert">
        {`I'm currently working on `}
        <span className="not-prose">
          <Badge href="https://thefalse.net/">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              role="img"
              aria-label="thefalse logo"
              xmlns="http://www.w3.org/2000/svg"
              className="mr-1 inline-flex"
            >
              <path
                d="M7.8367 17.0565L10.2857 12.8076C10.4451 12.5311 10.2451 12.185 9.92558 12.185H5.02992C4.88149 12.185 4.744 12.1061 4.66979 11.9772L2.05596 7.44092C1.8966 7.16438 2.09658 6.81832 2.41609 6.81832H7.54297C7.6914 6.81832 7.82889 6.73942 7.9031 6.61053L10.4412 2.20779C10.5154 2.0789 10.6529 2 10.8013 2H21.5839C21.9034 2 22.1034 2.34606 21.944 2.6226L19.545 6.78473C19.4708 6.91363 19.3333 6.99252 19.1849 6.99252H8.696C8.37728 6.99252 8.17729 7.33703 8.33509 7.61356L10.7255 11.8007C10.7997 11.9304 10.9372 12.01 11.0864 12.01H15.8118C16.1313 12.01 16.3313 12.3561 16.1719 12.6326L10.97 21.6584C10.8099 21.9357 10.4099 21.9357 10.2505 21.6584L7.8367 17.4705C7.76249 17.3432 7.76249 17.1846 7.8367 17.0565Z"
                fill="currentColor"
              />
            </svg>
            thefalse
          </Badge>
        </span>
        {`, a social network for book lovers and writers.`}
      </p>

      {/* Projects */}

      <div className="prose prose-neutral dark:prose-invert">
        {`I've worked on a few projects over the years. Here are some of them:`}

        <div className="my-8 flex w-full flex-col space-y-4">
          <ProjectLink name="thefalse" slug="thefalse" />
          <ProjectLink name="bkhtdev/link" slug="link" />
          <ProjectLink name="hangman" slug="hangman" />
        </div>
      </div>

      <div className="prose prose-neutral dark:prose-invert">
        <p>
          Over the years, I've written content on my blog and newsletter. I try
          to keep things simple and minimal, focusing on the content itself.
          You'll find writings about technologies I'm interested in at the time,
          or just general thoughts. I also have a collection of notes on various
          topics.
        </p>

        <div className="my-8 flex w-full flex-col space-y-4">
          <BlogLink name="Animated Counter in React" slug="animated-counter" />
          <BlogLink
            name="From Archives to Algorithms: The Success Story of WinRAR"
            slug="the-history-and-success-of-winrar"
          />
          <BlogLink
            name="The Rise of Geek Culture: A Personal Journey Through Fandoms"
            slug="geek-culture"
          />
        </div>
      </div>
    </section>
  );
}
