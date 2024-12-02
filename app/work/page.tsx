export const metadata = {
  title: 'Work',
  description: 'A summary of my work and contributions.',
};

export default function WorkPage() {
  return (
    <section className="py-[calc(var(--pad)*1.5+96px)] px-[calc(var(--pad)*1.5)] xl:py-[calc(var(--pad)*1.5+115px)]">
      <div className="w-full max-w-[calc(var(--vw)*100-var(--pad)*3-82px)] text-sm xl:max-w-lg flex flex-col items-end ml-auto whitespace-normal">
        <p className="text-white font-normal leading-snug">
          Frontend developer skilled in projects ranging from simple sites to
          complex web apps, dedicated to crafting intuitive and engaging digital
          experiences. Here's where I've worked and what I've done:
        </p>
        <h2
          id="experience"
          className="text-white !font-bold !mt-8 !mb-3 w-full"
        >
          <a href="#experience" className="anchor"></a>Experience
        </h2>
        <h3
          id="technocorp"
          className="text-white font-medium !mt-8 !mb-3 w-full"
        >
          <a href="#technocorp" className="anchor"></a>Technocorp
        </h3>
        <small className="flex text-sm font-light !mt-0 mb-3 w-full">
          Frontend Developer Intern, July 2024 — September 2024
        </small>
        <p className="text-white font-normal leading-snug mt-6">
          I interned as a frontend developer, working on UI/UX enhancements,
          code optimization, and new product development using Next.js and
          Tailwind CSS, gaining insights from design to deployment.
        </p>
        <h2 id="projects" className="text-white font-bold !mt-8 !mb-3 w-full">
          <a href="#projects" className="anchor"></a>Projects
        </h2>
        <p className="text-white font-normal leading-snug w-full mt-6">
          <a
            href="https://t.me/my_bakerybot"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-25"
          >
            MY Bakery Bot - t.me/my_bakerybot
          </a>
        </p>
        <p className="text-white font-normal leading-snug mt-6">
          I created a Telegram Mini App named MY Bakery Bot, which is designed
          for straightforward ordering of bakery items. It includes an admin
          panel secured by OTP verification through a Telegram bot. The
          application is developed using Node.js, PostgreSQL, and the Telegram
          Bot API, and it's hosted on Vercel.
        </p>
        <p className="text-white font-normal leading-snug w-full mt-6">
          <a
            href="https://go.bkhtdev.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-25"
          >
            bkhtdev/link - go.bkhtdev.com
          </a>
        </p>
        <p className="text-white font-normal leading-snug mt-6">
          I built and maintain an open-source link shortener called
          bkhtdev/link. It's a simple and easy-to-use tool for creating and
          sharing short links. The project is built with Next.js, Tailwind CSS,
          and Prisma, and is hosted on Vercel.
        </p>
        <p className="text-white font-normal leading-snug w-full mt-6">
          <a
            href="https://falsenotes.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-25"
          >
            FalseNotes - falsenotes.dev
          </a>
        </p>
        <p className="text-white font-normal leading-snug mt-6">
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
