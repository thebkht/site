'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import Hammer from 'hammerjs';
import 'app/main.css';
import 'app/responsive.css';
import Mouse from './mouse';

const Audio = () => {
  const [isMuted, setIsMuted] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  const toggleMute = () => {
    //if isMuted is true, set it to false and play the audio
    //if isMuted is false, set it to true and pause the audio
    setIsMuted((prev) => {
      if (audioRef.current) {
        if (prev) {
          audioRef.current.play();
        } else {
          audioRef.current.pause();
        }
      }
      return !prev;
    });
  };

  return (
    <>
      {/* Audio Player */}
      <audio loop hidden autoPlay muted={isMuted} preload="auto" ref={audioRef}>
        <source src="https://bkhtdev.com/audio/leveltwo_ambient_4_lufs_18.mp3" />
        <source src="https://bkhtdev.com/audio/leveltwo_ambient_4_lufs_18.ogg" />
        <source src="https://bkhtdev.com/audio/leveltwo_ambient_4_lufs_18.wav" />
      </audio>

      {/* Mute Button */}
      <div className="mute-border">
        <div
          className={`mute ${isMuted ? 'paused' : ''}`}
          onClick={toggleMute}
        ></div>
      </div>
    </>
  );
};

const Intro = () => (
  <div className="intro">
    <div className="intro--banner">
      <h1>
        Bakhtiyor
        <br />
        Ganijon
      </h1>
      <button className="cta">
        <span>Hire Me</span>
        <svg
          viewBox="0 0 150 118"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M87 1.3C83.6 3 81.5 7 82.4 10.3C82.7 11.8 90.5 20.3 101.8 31.4L120.5 49.9L64 50C20.9 50 6.90002 50.3 5.00002 51.3C-0.499982 54.1 -1.39998 60.7 3.20002 65C5.30002 67 6.50002 67 62.9 67H120.4L101.2 86.3C80 107.7 79.4 108.6 84.9 114.1C86.9 116.1 88.8 117 91 117C93.8 117 97.3 114 120.8 90.8C135.5 76.4 148 63.7 148.7 62.6C151.7 57.5 151 56.6 126.8 32.2C94.7 -1.74344e-06 92.6 -1.6 87 1.3Z"
            fill="black"
          />
        </svg>

        <span className="btn-background"></span>
      </button>
      <img src="assets/img/introduction-visual.png" alt="Welcome" />
    </div>
    <div className="intro--options">
      <a href="#0">
        <h3>bio</h3>
        <p>
          a front-end engineer and designer, Born and raised in Uzbekistan, a
          dedicated computer science student at Sejong University
        </p>
      </a>
      <a href="#0">
        <h3>prog langs &amp; frameworks</h3>
        <p>
          c/c++, python, javascript, typescript, php, sql, java, c# <br />
          react, nextjs, tailwindcss, bootstrap, nodejs, dotnet, jquery
        </p>
      </a>
      <a href="#0">
        <h3>languages</h3>
        <p>
          uzbek (native), english (fluent), german (beginner), korean
          (beginner), russian (fluent),
        </p>
      </a>
    </div>
  </div>
);

const Work = () => {
  const [activeIndex, setActiveIndex] = useState(1);
  const sliderRef = useRef<HTMLUListElement>(null);
  const itemsRef = useRef<HTMLLIElement[]>([]);

  // Function to move to the next or previous item
  const moveSlider = (direction: 'next' | 'prev') => {
    if (!sliderRef.current || itemsRef.current.length === 0) return;

    const currentItems = itemsRef.current;
    const itemCount = currentItems.length;

    // Determine the next active index
    let newIndex = activeIndex;
    if (direction === 'next') {
      newIndex = (activeIndex + 1) % itemCount;
    } else {
      newIndex = (activeIndex - 1 + itemCount) % itemCount;
    }

    setActiveIndex(newIndex);
  };

  // Effect to handle the transition
  useEffect(() => {
    if (!sliderRef.current) return;

    const slider = sliderRef.current;
    slider.style.opacity = '0';

    setTimeout(() => {
      const itemCount = itemsRef.current.length;
      const currentIndex = activeIndex;

      itemsRef.current.forEach((item, index) => {
        item.classList.remove(
          'slider--item-left',
          'slider--item-center',
          'slider--item-right'
        );

        if (index === (currentIndex - 1 + itemCount) % itemCount) {
          item.classList.add('slider--item-left');
        } else if (index === currentIndex) {
          item.classList.add('slider--item-center');
        } else if (index === (currentIndex + 1) % itemCount) {
          item.classList.add('slider--item-right');
        }
      });

      slider.style.opacity = '1';
    }, 400);
  }, [activeIndex]);

  return (
    <div className="work">
      <h2>Selected work</h2>
      <div className="work--lockup">
        <ul className="slider" ref={sliderRef}>
          {[
            {
              href: 'https://falsenotes.dev',
              image: 'assets/img/falsenotes.png',
              title: 'FalseNotes',
              description:
                'A dynamic platform for sharing insights, experiences, and knowledge with a vibrant community of creators.',
            },
            {
              href: '#0',
              image: 'assets/img/watchin.png',
              title: 'Watchin',
              description:
                'Building. A platform dedicated to streaming educational content and instructional videos.',
            },
            {
              href: '#0',
              image: 'assets/img/thefalse.png',
              title: 'thefalse',
              description:
                'building. a social network for book lovers. share your reading experience with friends and family. keep track of your reading progress. discover new books and authors.',
            },
            {
              href: 'https://ln.bkhtdev.com',
              image: 'assets/img/link.png',
              title: 'bkhtdev/link',
              description:
                'a link shortener service that allows you to shorten links and share them with others.',
            },
            {
              href: 'https://hangman.bkhtdev.com',
              image: 'assets/img/hangman.png',
              title: 'hangman',
              description:
                "game built with NextJS, TypeScript, and Tailwind CSS. It's a simple game where you have to guess the word by suggesting letters within a certain number of attempts.",
            },
            {
              href: 'https://life.bkhtdev.com',
              image: 'assets/img/game-of-life.png',
              title: 'game of life',
              description:
                'A zero-player game, meaning that its evolution is determined by its initial state, requiring no further input.',
            },
            {
              href: '#0',
              image: 'assets/img/essen.png',
              title: 'Essen',
              description:
                'Building. Manages employee and task information. It allows users to add, remove, and edit employees and tasks.',
            },
          ].map((item, index) => (
            <li
              key={index}
              className={`slider--item ${
                index ===
                (activeIndex - 1 + itemsRef.current.length) %
                  itemsRef.current.length
                  ? 'slider--item-left'
                  : ''
              } ${index === activeIndex ? 'slider--item-center' : ''} ${
                index === (activeIndex + 1) % itemsRef.current.length
                  ? 'slider--item-right'
                  : ''
              }`}
              ref={(el) => el && (itemsRef.current[index] = el)}
            >
              <a href={item.href} target="_blank" rel="noopener noreferrer">
                <div className="slider--item-image">
                  <img src={item.image} alt={item.title} />
                </div>
                <p className="slider--item-title">{item.title}</p>
                <p className="slider--item-description">{item.description}</p>
              </a>
            </li>
          ))}
        </ul>
        <div className="slider--prev" onClick={() => moveSlider('prev')}>
          <svg
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            viewBox="0 0 150 118"
          >
            <g transform="translate(0.000000,118.000000) scale(0.100000,-0.100000)">
              <path
                d="M561,1169C525,1155,10,640,3,612c-3-13,1-36,8-52c8-15,134-145,281-289C527,41,562,10,590,10c22,0,41,9,61,29
                        c55,55,49,64-163,278L296,510h575c564,0,576,0,597,20c46,43,37,109-18,137c-19,10-159,13-590,13l-565,1l182,180
                        c101,99,187,188,193,199c16,30,12,57-12,84C631,1174,595,1183,561,1169z"
              />
            </g>
          </svg>
        </div>
        <div className="slider--next" onClick={() => moveSlider('next')}>
          <svg
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            y="0px"
            viewBox="0 0 150 118"
          >
            <g transform="translate(0.000000,118.000000) scale(0.100000,-0.100000)">
              <path d="M870,1167c-34-17-55-57-46-90c3-15,81-100,194-211l187-185l-565-1c-431,0-571-3-590-13c-55-28-64-94-18-137c21-20,33-20,597-20h575l-192-193C800,103,794,94,849,39c20-20,39-29,61-29c28,0,63,30,298,262c147,144,272,271,279,282c30,51,23,60-219,304C947,1180,926,1196,870,1167z" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
};

const About = () => (
  <div className="about">
    <div className="about--banner">
      <h2>
        Deeply
        <br />
        Interested
        <br />
        In Art And
        <br />
        Technology
      </h2>
      <a href="/blog">
        Read blog
        <span>
          <svg
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            viewBox="0 0 150 118"
          >
            <g transform="translate(0.000000,118.000000) scale(0.100000,-0.100000)">
              <path d="M870,1167c-34-17-55-57-46-90c3-15,81-100,194-211l187-185l-565-1c-431,0-571-3-590-13c-55-28-64-94-18-137c21-20,33-20,597-20h575l-192-193C800,103,794,94,849,39c20-20,39-29,61-29c28,0,63,30,298,262c147,144,272,271,279,282c30,51,23,60-219,304C947,1180,926,1196,870,1167z" />
            </g>
          </svg>
        </span>
      </a>
      <img src="assets/img/about-visual.png" alt="About" />
    </div>
  </div>
);

const Contact = () => (
  <div className="contact">
    <div className="contact--lockup">
      <div className="modal">
        <div className="modal--information">
          <p>Seoul, South Korea</p>
          <a href="mailto:me@bkhtdev.com">me@bkhtdev.com</a>
        </div>
        <ul className="modal--options">
          <li>
            <a href="https://github.com/thebkht">GitHub</a>
          </li>
          <li>
            <a href="https://twitter.com/thebkht">X (Twitter)</a>
          </li>
          <li>
            <a href="https://linkedin.com/in/thebkht">LinkedIn</a>
          </li>
          <li>
            <a href="https://t.me/bkhtdev">Telegram</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
);

const Footer = () => (
  <div className="footer">
    <footer>
      <div className="copyright_bar">
        &copy;
        <script>document.write(new Date().getFullYear());</script>
        bkhtdev
      </div>
      <ul className="footer--list">
        <li>
          <a
            rel="noopener noreferrer"
            target="_blank"
            href="hhttps://github.com/sponsors/thebkht"
          >
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
              ></path>
            </svg>
            <span>github sponsors</span>
          </a>
        </li>
        <li>
          <a
            rel="noopener noreferrer"
            target="_blank"
            href="https://www.buymeacoffee.com/bkhtdev"
          >
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
              ></path>
            </svg>
            <span>buy me a coffee</span>
          </a>
        </li>
      </ul>
    </footer>
  </div>
);

const navItems = ['Home', 'Works', 'About', 'Contact'];

const sections = [
  { component: <Intro /> },
  { component: <Work /> },
  { component: <About /> },
  { component: <Contact /> },
];

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [canScroll, setCanScroll] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionsRef = useRef<HTMLLIElement[]>([]);
  const navItemsRef = useRef<HTMLLIElement[]>([]);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const perspectiveRef = useRef<HTMLDivElement>(null);
  const outerNavRef = useRef<HTMLUListElement>(null);
  const returnNavRef = useRef<HTMLDivElement>(null);

  if (!window) {
    return null;
  }

  useEffect(() => {
    if (window) {
      setIsLoading(false);
    }
  }, []);

  const updateNavs = (index: number) => {
    navItemsRef.current.forEach((navItem, i) => {
      if (navItem) {
        navItem.classList.toggle('is-active', i === index);
      }
    });
  };

  const updateContent = () => {
    sectionsRef.current.forEach((section, index) => {
      section.classList.toggle('section--is-active', index === activeIndex);
      section.classList.toggle('section--next', index === activeIndex - 1);
      section.classList.toggle('section--prev', index === activeIndex + 1);
    });
  };

  const handleScroll = useCallback(
    (direction: 'up' | 'down') => {
      if (canScroll) {
        setCanScroll(false);
        clearTimeout(scrollTimeoutRef.current);
        scrollTimeoutRef.current = setTimeout(() => setCanScroll(true), 800);

        const lastItem = sectionsRef.current.length - 1;
        const nextIndex =
          direction === 'up'
            ? activeIndex < lastItem
              ? activeIndex + 1
              : 0
            : activeIndex > 0
            ? activeIndex - 1
            : lastItem;

        setActiveIndex(nextIndex);
      }
    },
    [canScroll, activeIndex]
  );

  // Only run this effect on the client-side
  useEffect(() => {
    if (typeof window !== undefined) {
      const element = document.getElementById('viewport');
      if (element) {
        const mc = new Hammer(element);
        mc.get('swipe').set({ direction: Hammer.DIRECTION_VERTICAL });
        mc.on('swipeup swipedown', (e) =>
          handleScroll(e.type === 'swipeup' ? 'up' : 'down')
        );

        const handleWheel = (e: WheelEvent) => {
          e.preventDefault();
          handleScroll(e.deltaY > 0 ? 'up' : 'down');
        };

        const handleKeyUp = (e: KeyboardEvent) => {
          if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            handleScroll(e.key === 'ArrowDown' ? 'up' : 'down');
          }
        };

        document.addEventListener('wheel', handleWheel);
        document.addEventListener('keyup', handleKeyUp);

        return () => {
          document.removeEventListener('wheel', handleWheel);
          document.removeEventListener('keyup', handleKeyUp);
          mc.off('swipeup swipedown');
        };
      }
    }
  }, [handleScroll]);

  useEffect(() => {
    updateNavs(activeIndex);
    updateContent();
  }, [activeIndex]);

  const handleNavToggleClick = () => {
    if (perspectiveRef.current) {
      perspectiveRef.current.classList.add('perspective--modalview');
      setTimeout(() => {
        perspectiveRef.current?.classList.add('effect-rotate-left--animate');
      }, 25);
      if (outerNavRef.current) {
        outerNavRef.current.classList.add('is-vis');
        outerNavRef.current
          .querySelectorAll('li')
          .forEach((li) => li.classList.add('is-vis'));
      }
      if (returnNavRef.current) {
        returnNavRef.current.classList.add('is-vis');
      }
    }
  };

  const handleNavReturnClick = () => {
    if (perspectiveRef.current) {
      perspectiveRef.current.classList.remove('effect-rotate-left--animate');
      setTimeout(() => {
        perspectiveRef.current?.classList.remove('perspective--modalview');
      }, 400);
      if (outerNavRef.current) {
        outerNavRef.current.classList.remove('is-vis');
        outerNavRef.current
          .querySelectorAll('li')
          .forEach((li) => li.classList.remove('is-vis'));
      }
      if (returnNavRef.current) {
        returnNavRef.current.classList.remove('is-vis');
      }
    }
  };

  const handleNavClick = (index: number) => () => {
    setActiveIndex(index);
    handleNavReturnClick();
  };

  // Use a delay to simulate loading and hide the loading screen
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <Mouse />
      {!isLoading ? (
        <>
          <div className="device-notification">
            <a className="device-notification--logo" href="#0">
              <svg
                id="Layer_1"
                data-name="Layer 1"
                className="logo"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
              >
                <path
                  className="cls-1"
                  d="M26.96,5.04V22.01l-4.9,4.95H5.04V9.99l4.9-4.95H26.96M32,0H7.84L0,7.91v24.09H24.16l7.84-7.91V0h0Z"
                />
              </svg>
              <p>
                bkhtdev<span>.com</span>
              </p>
            </a>
            <p className="device-notification--message">
              This website has so much to offer that we must request you orient
              your device to portrait or find a larger screen. You won't be
              disappointed.
            </p>
          </div>
          <div className="perspective effect-rotate-left" ref={perspectiveRef}>
            <div className="main-container">
              <div
                className="outer-nav--return"
                onClick={handleNavReturnClick}
                ref={returnNavRef}
              ></div>
              <div id="viewport" className="l-viewport">
                <div className="l-wrapper">
                  <header className="header">
                    <a className="header--logo" href="#0">
                      <svg
                        id="Layer_1"
                        data-name="Layer 1"
                        className="logo"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 32 32"
                      >
                        <path
                          fill="#fff"
                          className="cls1"
                          d="M26.96,5.04V22.01l-4.9,4.95H5.04V9.99l4.9-4.95H26.96M32,0H7.84L0,7.91v24.09H24.16l7.84-7.91V0h0Z"
                        />
                      </svg>
                      <p>
                        bkhtdev<span>.com</span>
                      </p>
                    </a>
                    <div
                      className="header--nav-toggle"
                      onClick={handleNavToggleClick}
                    >
                      <span></span>
                    </div>
                  </header>
                  <nav className="l-side-nav">
                    <ul className="side-nav">
                      {navItems.map((item, index) => (
                        <li
                          key={index}
                          className={activeIndex === index ? 'is-active' : ''}
                          onClick={handleNavClick(index)}
                          ref={(el) => (navItemsRef.current[index] = el!)}
                        >
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </nav>
                  <ul className="l-main-content main-content">
                    {sections.map((section, index) => (
                      <li
                        key={index}
                        className={`l-section section ${
                          index === 0 ? 'section--is-active' : ''
                        }`}
                        ref={(el) => (sectionsRef.current[index] = el!)}
                      >
                        {section.component}
                      </li>
                    ))}
                  </ul>

                  <Footer />
                </div>
              </div>
            </div>

            <ul className="outer-nav" ref={outerNavRef}>
              {navItems.map((item, index) => (
                <li
                  key={index}
                  className={activeIndex === index ? 'is-active' : ''}
                  onClick={handleNavClick(index)}
                  ref={(el) => (navItemsRef.current[index] = el!)}
                >
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <div id="load" className="load">
          <div className="loading">
            <a className="device-notification--logo" href="#0">
              <svg
                id="Layer_1"
                data-name="Layer 1"
                className="logo"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
              >
                <path
                  fill="#fff"
                  d="M26.96,5.04V22.01l-4.9,4.95H5.04V9.99l4.9-4.95H26.96M32,0H7.84L0,7.91v24.09H24.16l7.84-7.91V0h0Z"
                />
              </svg>
              <p>
                bkhtdev<span>.com</span>
              </p>
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
