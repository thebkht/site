'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <main className="antialiased max-w-2xl flex flex-col md:flex-row mx-4 lg:mx-auto h-screen">
      <section className="flex-auto min-w-0 flex flex-col px-2 md:px-0 h-full justify-center w-full text-center">
        <svg
          className="-mt-[90px] h-52"
          fill="none"
          viewBox="-80 0 369 271"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            d="M268.13 2.47998H125.053V44.8731H82.6599V187.95H225.737V145.557H268.13V2.47998ZM225.737 145.557V44.8731H125.053V145.557H225.737Z"
            fill="hsl(var(--background))"
            fillRule="evenodd"
            strokeDasharray="4 4"
            strokeWidth="1.5"
            className="stroke-neutral-600 dark:stroke-neutral-400 fill-white dark:fill-[#111010]"
          ></path>
          <g filter="url(#filter0_d)">
            <ellipse
              cx="250"
              cy="156.48"
              fill="hsl(var(--background))"
              rx="74.52"
              ry="74.52"
              className="fill-white dark:fill-[#111010]"
            ></ellipse>
            <ellipse
              cx="250"
              cy="156.48"
              stroke="hsl(var(--muted-foreground))"
              rx="74.52"
              ry="74.52"
              className="stroke-neutral-600 dark:stroke-neutral-400"
            ></ellipse>
          </g>
          <mask
            height="250"
            id="a"
            maskUnits="userSpaceOnUse"
            width="250"
            x="100"
            y="81"
          >
            <ellipse
              cx="250"
              cy="156.48"
              fill="#fff"
              rx="74.52"
              ry="74.52"
            ></ellipse>
          </mask>
          <g mask="url(#a)">
            <path
              clipRule="evenodd"
              d="M268.13 2.47998H125.053V44.8731H82.6599V187.95H225.737V145.557H268.13V2.47998ZM225.737 145.557V44.8731H125.053V145.557H225.737Z"
              fill="hsl(var(--foreground))"
              fillRule="evenodd"
              className="fill-current"
            ></path>
          </g>
          <defs>
            <filter
              color-interpolation-filters="sRGB"
              filterUnits="userSpaceOnUse"
              height="253.03"
              id="filter0_d"
              width="252.65"
              x="76.35"
              y="57.97"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
              <feColorMatrix
                in="SourceAlpha"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              ></feColorMatrix>
              <feOffset dy="8"></feOffset>
              <feGaussianBlur stdDeviation="16"></feGaussianBlur>
              <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"></feColorMatrix>
              <feBlend
                in2="BackgroundImageFix"
                result="effect1_dropShadow"
              ></feBlend>
              <feBlend
                in="SourceGraphic"
                in2="effect1_dropShadow"
                result="shape"
              ></feBlend>
            </filter>
          </defs>
        </svg>
        <p>Oh no, something went wrong... maybe refresh?</p>
      </section>
    </main>
  );
}
