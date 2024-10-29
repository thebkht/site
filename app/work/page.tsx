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
      <div className="prose prose-p:text-muted-foreground dark:prose-invert">
        <p>
          Frontend developer skilled in projects ranging from simple sites to
          complex web apps, dedicated to crafting intuitive and engaging digital
          experiences. Here's where I've worked and what I've done:
        </p>

        <h2 className="font-medium text-base mb-1 tracking-tighter py-5">
          Experience
        </h2>
        <h3 className="font-medium text-base mb-1 tracking-tighter">
          Technocorp
        </h3>
        <p className="text-muted-foreground text-sm">
          Frontend Developer Intern, July 2024 — September 2024
        </p>
        <p>
          I interned as a frontend developer, working on UI/UX enhancements,
          code optimization, and new product development using Next.js and
          Tailwind CSS, gaining insights from design to deployment.
        </p>

        <h2 className="font-medium text-base mb-1 tracking-tighter py-5">
          Projects
        </h2>
        <a
          target="_blank"
          href="https://go.bkhtdev.com"
          className="font-medium text-base tracking-tighter hover:text-blue-500 transition-colors duration-200 mb-1"
        >
          bkhtdev/link
        </a>
        <p className="mt-1">
          I built and maintain an open-source link shortener called
          bkhtdev/link. It's a simple and easy-to-use tool for creating and
          sharing short links. The project is built with Next.js, Tailwind CSS,
          and Prisma, and is hosted on Vercel.
        </p>

        <a
          target="_blank"
          href="https://falsenotes.dev"
          className="font-medium text-base tracking-tighter hover:text-blue-500 transition-colors duration-200 mb-1"
        >
          FalseNotes
        </a>
        <p className="mt-1">
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
