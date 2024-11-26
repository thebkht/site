export default function Page() {
  return (
    <section
      data-page="home"
      className="page w-full min-h-[calc(var(--vh,1vh)*100)]"
    >
      <div className="absolute right-[calc(var(--pad)*2)] bottom-[calc(var(--pad)*2)] whitespace-nowrap">
        <p>
          <span className="block">I'm a geeky front-end developer</span>
          <span className="block">and designer from Uzbekistan.</span>
          <span className="block">Gained hands-on experience at</span>
          <span className="block">Technocorp as an intern, specializing</span>
          <span className="block">in React and product development.</span>
          <span className="block">Passionate about continuous learning</span>
          <span className="block">and exploring new tech frontiers.</span>
        </p>
      </div>
    </section>
  );
}
