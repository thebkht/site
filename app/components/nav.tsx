'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

function AnimatedName() {
  return (
    <h1 className="font-medium transition-element">
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
    </h1>
  );
}

export function Navbar({
  open,
  toggleNav,
}: {
  open: boolean;
  toggleNav: () => void;
}) {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <header className="mb-16 tracking-tight">
      <div className="lg:sticky lg:top-20 flex w-full items-center justify-between">
        <div className="flex items-center gap-4">
          {pathname !== '/' && (
            <div
              className="flex items-center justify-center -ml-9"
              role="button"
              onClick={router.back}
            >
              <svg
                version="1.1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                viewBox="0 0 150 118"
                className="h-5 w-5 fill-current"
              >
                <g transform="translate(0.000000,118.000000) scale(0.100000,-0.100000)">
                  <path
                    d="M561,1169C525,1155,10,640,3,612c-3-13,1-36,8-52c8-15,134-145,281-289C527,41,562,10,590,10c22,0,41,9,61,29
                        c55,55,49,64-163,278L296,510h575c564,0,576,0,597,20c46,43,37,109-18,137c-19,10-159,13-590,13l-565,1l182,180
                        c101,99,187,188,193,199c16,30,12,57-12,84C631,1174,595,1183,561,1169z"
                  />
                </g>
              </svg>
              <span className="sr-only">back</span>
            </div>
          )}
          <Link href="/" className="flex items-center justify-center">
            <svg
              width="70"
              height="70"
              viewBox="0 0 70 70"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M70 0H16V16H0V70H54V54H70V0ZM54 54V16H16V54H54Z"
                fill="currentColor"
              />
            </svg>
            <span className="sr-only">bkhtdev.com</span>
          </Link>
          <AnimatedName />
        </div>
        <div className="header--nav-toggle" role="button" onClick={toggleNav}>
          <span></span>
        </div>
      </div>
    </header>
  );
}
