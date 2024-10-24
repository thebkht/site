import { AnimatedName } from 'app/components/nav';
import type { Metadata } from 'next';
import { Link } from 'next-view-transitions';
import React from 'react';

export const metadata: Metadata = {
  title: 'Stack',
  description: 'A summary of my stack and skills.',
};

async function Stars() {
  let res = await fetch('https://api.github.com/repos/vercel/next.js');
  let json = await res.json();
  let count = Math.round(json.stargazers_count / 1000);
  return `${count}k stars`;
}

const skillCategories = [
  {
    title: 'Programming',
    skills:
      'JavaScript (ES6+), TypeScript, React.js, Next.js, HTML5, CSS3 (including frameworks like Bootstrap, Tailwind CSS), Node.js, C++, C, C#, Java, Python',
  },
  {
    title: 'Databases',
    skills: 'MySQL, PostgreSQL, Prisma ORM, MongoDB, Drizzle',
  },
  {
    title: 'Applications',
    skills: 'Visual Studio Code, Figma, Postman for API testing',
  },
  {
    title: 'Platforms',
    skills:
      'Web Development (responsive design for various devices), Cloud platforms like AWS, Google Cloud, or Azure',
  },
  {
    title: 'Soft Skills',
    skills:
      'Problem Solving, Team Collaboration, User Experience (UX) Design, Agile Development Methodologies',
  },
];

export default function StackPage() {
  return (
    <section>
      <h1 className="font-medium pt-12 mb-0 fade-in">Skills & Tech Stack</h1>
      <AnimatedName />
      <div className="prose prose-gray dark:prose-invert">
        <p>
          As a frontend developer, I have experience working with a variety of
          technologies and tools. Here are some of the skills and technologies
          I've worked with:
        </p>

        {skillCategories.map((category) => (
          <React.Fragment key={category.title}>
            <h2 className="font-medium text-base tracking-tighter mb-1">
              {category.title}
            </h2>
            <p>{category.skills}</p>
          </React.Fragment>
        ))}

        <h2 className="font-medium text-base tracking-tighter mb-1">
          Current Focus
        </h2>
        <p>
          I'm currently deepening my expertise in React and exploring advanced
          state management techniques. I'm also expanding my knowledge of cloud
          platforms and serverless architectures, with a focus on AWS and Azure.
        </p>
      </div>
    </section>
  );
}
