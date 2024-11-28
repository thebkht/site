import type { Metadata } from 'next';
import { Link } from 'next-view-transitions';
import React from 'react';

export const metadata: Metadata = {
  title: 'Stack',
  description: 'A summary of my stack and skills.',
};

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
    <section className="py-[calc(var(--pad)*2+96px)] px-[calc(var(--pad)*2)] xl:py-[calc(var(--pad)*2+115px)]">
      <div className="w-full max-w-[calc(var(--vw)*100-var(--pad)*4-82px)] text-sm xl:max-w-lg flex flex-col items-end ml-auto whitespace-normal">
        <p className="text-white font-light leading-snug">
          As a frontend developer, I have experience working with a variety of
          technologies and tools. Here are some of the skills and technologies
          I've worked with:
        </p>

        {skillCategories.map((category) => (
          <React.Fragment key={category.title}>
            <h2 className="text-white !font-bold !mt-8 !mb-3 w-full">
              {category.title}
            </h2>
            <p className="text-white font-light leading-snug mt-6 w-full">
              {category.skills}
            </p>
          </React.Fragment>
        ))}

        <h2 className="text-white !font-bold !mt-8 !mb-3 w-full">
          Current Focus
        </h2>
        <p className="text-white font-light leading-snug mt-6 w-full">
          I'm currently deepening my expertise in React and exploring advanced
          state management techniques. I'm also expanding my knowledge of cloud
          platforms and serverless architectures, with a focus on AWS and Azure.
        </p>
      </div>
    </section>
  );
}
