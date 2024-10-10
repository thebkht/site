import { AnimatedName } from 'app/components/nav';
import type { Metadata } from 'next';
import { Link } from 'next-view-transitions';

export const metadata: Metadata = {
  title: 'Work',
  description: 'A summary of my work and contributions.',
};

async function Stars() {
  let res = await fetch('https://api.github.com/repos/vercel/next.js');
  let json = await res.json();
  let count = Math.round(json.stargazers_count / 1000);
  return `${count}k stars`;
}

export default function WorkPage() {
  return (
    <section>
      <h1 className="font-medium pt-12 mb-0 fade-in">Work</h1>
      <AnimatedName />
      <div className="prose prose-gray dark:prose-invert">
        <p>
          I'm a frontend developer with experience working on a variety of
          projects, from small websites to large-scale web applications. I'm
          passionate about building user-friendly interfaces and creating
          engaging digital experiences. Here are some of the places I've worked
          and the projects I've contributed to:
        </p>

        <h2 className="font-medium text-base mb-1 tracking-tighter py-5">
          Experience
        </h2>
        <h3 className="font-medium text-base mb-1 tracking-tighter">
          Technocorp
        </h3>
        <p className="text-gray-800 dark:text-gray-300 text-sm">
          Frontend Developer Intern, July 2024 — September 2024
        </p>
        <p>
          I joined Technocorp as a frontend developer intern. I collaborated on
          several front-end projects, contributing to UI/UX improvements, code
          optimization, and feature implementation, and worked on a small team
          building a new product from scratch. I've worked with technologies
          Nextjs (pages route), Tailwind CSS. And I've learned a lot about the
          software development process, from design to deployment. I've also
          gained experience working with a team and collaborating on projects.
        </p>

        <h2 className="font-medium text-base mb-1 tracking-tighter py-5">
          Projects
        </h2>
        <a
          target="_blank"
          href="https://go.bkhtdev.com"
          className="font-medium text-base tracking-tighter hover:text-blue-500 transition-colors duration-200"
        >
          bkhtdev/link
        </a>
        <p>
          I built and maintain an open-source link shortener called
          bkhtdev/link. It's a simple and easy-to-use tool for creating and
          sharing short links. The project is built with Next.js, Tailwind CSS,
          and Prisma, and is hosted on Vercel.
        </p>

        <a
          target="_blank"
          href="https://falsenotes.dev"
          className="font-medium text-base tracking-tighter hover:text-blue-500 transition-colors duration-200"
        >
          FalseNotes
        </a>
        <p>
          I've created an open-source blogging platform called FalseNotes. It's
          a simple and easy-to-use platform for writing and publishing blog
          posts. The project is built with Next.js, Tailwind CSS, MongoDB. It
          features a clean and minimalistic design, a powerful editor, and a
          responsive layout. The platform is designed to be fast, secure, and
          user-friendly, with a focus on the writing experience.
        </p>
      </div>
    </section>
  );
}
