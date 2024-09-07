import type { Metadata } from 'next';
import Link from 'next/link';

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
      <h1 className="font-medium text-2xl mb-8 tracking-tighter">my work</h1>
      <div className="prose prose-neutral dark:prose-invert">
        <p>
          I'm a frontend developer with experience working on a variety of
          projects, from small websites to large-scale web applications. I'm
          passionate about building user-friendly interfaces and creating
          engaging digital experiences. Here are some of the places I've worked
          and the projects I've contributed to:
        </p>
        <hr className="my-6 border-neutral-100 dark:border-neutral-800" />
        <h2 className="font-medium text-xl mb-1 tracking-tighter">
          Technocorp
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400 text-sm">
          Frontend Developer Intern, July 2024 — September 2024
        </p>
        <p>
          I joined Technocorp as a frontend developer intern. I collaborated on
          several front-end projects, contributing to UI/UX improvements, code
          optimization, and feature implementation, and worked on a small team
          building a new product from scratch. I learned a lot about the product
          development process, from ideation to shipping. I also had the
          opportunity to work with a diverse team and learn from experienced and
          talented developers. I'm grateful for the experience and the
          opportunity to grow as a developer.
        </p>
      </div>
    </section>
  );
}
