import { useState, useEffect } from 'react';
import { useGuestbook } from '@/hooks/useGuestbook';
import { useSession, signOut } from 'next-auth/react';

const content = {
  home: `A geeky front-end developer and designer from Uzbekistan.
Gained hands-on experience at Technocorp as an intern, specializing in React and product development.
Passionate about continuous learning and exploring new tech frontiers.

Type 'help' for a list of commands.
  `,
  work: `~ work experience ~
1. Technocorp - Frontend Developer Intern (July 2024 — September 2024)
   • Worked on UI/UX enhancements, focusing on improving user interactions and aesthetics.
   • Engaged in code optimization and new product development using Next.js and Tailwind CSS, gaining comprehensive insights from design to deployment.

2. Personal Projects
   • MY Bakery Bot - t.me/my_bakerybot
     • Developed a Telegram Mini App for easy ordering of bakery items, featuring an admin panel with OTP security.
     • Utilized Node.js, PostgreSQL, and the Telegram Bot API; hosted on Vercel.
   • bkhtdev/link - go.bkhtdev.com
     • Created and maintain an open-source link shortener for quick and efficient link sharing.
     • Built with Next.js, Tailwind CSS, and Prisma; hosted on Vercel.
   • FalseNotes - falsenotes.dev
     • Developed an open-source blogging platform with emphasis on simplicity and user experience.
     • Employed Next.js, Tailwind CSS, and MongoDB for a clean, minimalistic, and responsive design focused on writing efficiency.
  `,
  stack: `~ tech stack ~
• Programming: JavaScript (ES6+), TypeScript, React.js, Next.js, HTML5, CSS3 (including frameworks like Bootstrap, Tailwind CSS), Node.js, C++, C, C#, Java, Python
• Databases: MySQL, PostgreSQL, Prisma ORM, MongoDB, Drizzle
• DevOps: AWS, Google Cloud, Azure
• Tools: Git, VS Code, Postman, Figma
  `,
  guestbook: `~ guestbook ~
Leave a message or view messages from other visitors.
Type 'sign' to leave a message, or 'view' to see the guestbook.
  `,
  contact: `
~ contact ~
x (twitter): https://x.com/thebkht
youtube: https://www.youtube.com/@bkhtdev
linkedin: https://www.linkedin.com/in/thebkht
github: https://github.com/thebkht
  `,
};

export function Terminal({
  activeTab,
  onCommand,
}: {
  activeTab: string;
  onCommand: (command: string) => void;
}) {
  const [input, setInput] = useState('');
  const { messages, addMessage } = useGuestbook();
  const { data: session } = useSession();
  const isSignedIn = !!session;

  const [output, setOutput] = useState(
    content[activeTab as keyof typeof content]
  );

  useEffect(() => {
    setOutput(content[activeTab as keyof typeof content]);
  }, [activeTab]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleInputSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const command = input.trim().toLowerCase();
    let newOutput = '';

    if (output.endsWith('Enter your message:')) {
      // Handle guestbook message input
      await addMessage(input);
      newOutput = 'Message added to the guestbook.';
    } else {
      switch (command) {
        case 'h':
        case 'home':
        case 'w':
        case 'work':
        case 's':
        case 'stack':
        case 'g':
        case 'guestbook':
        case 'c':
        case 'contact':
          onCommand(
            command.length === 1
              ? {
                  h: 'home',
                  w: 'work',
                  s: 'stack',
                  g: 'guestbook',
                  c: 'contact',
                }[command]
              : command
          );
          setInput('');
          return;
        case 'help':
          newOutput = `
Available commands:
- home (h): View the home page
- work (w): See my work experience
- stack (s): View my tech stack
- guestbook (g): Access the guestbook
- contact (c): Get my contact information
- sign: Sign the guestbook
- view: View guestbook messages
- clear: Clear the terminal
- logout: Log out of your account
          `;
          break;
        case 'sign':
          if (isSignedIn) {
            setOutput((prev) => `${prev}\n\n$ ${input}\nEnter your message:`);
            setInput('');
            return;
          } else {
            newOutput = 'Please sign in to leave a message.';
          }
          break;
        case 'view':
          if (isSignedIn) {
            newOutput = 'Loading guestbook messages...';
            setOutput((prev) => `${prev}\n\n$ ${input}\n${newOutput}`);
            const messageList = messages
              .map((message) => `\n${message.created_by}: ${message.body}`)
              .join('');
            setTimeout(() => {
              setOutput(
                (prev) =>
                  `${prev.replace(
                    newOutput,
                    ''
                  )}\n\nGuestbook Messages:${messageList}`
              );
            }, 1000);
            setInput('');
            return;
          } else {
            newOutput = 'Please sign in to view the guestbook.';
          }
          break;
        case 'logout':
        case 'signout':
          if (isSignedIn) {
            await signOut();
            newOutput = 'You have been logged out.';
          } else {
            newOutput = 'You are not signed in.';
          }
          break;
        case 'clear':
          setInput('');
          setOutput(content[activeTab as keyof typeof content]);
          return;
        default:
          newOutput = `Command not recognized: ${input}`;
      }
    }

    setOutput((prev) => `${prev}\n\n$ ${input}\n${newOutput}`);
    setInput('');
  };

  const highlightWords = ['Technocorp', 'React'];
  const highlightGlobalWords = ['$'];

  function highlightText(text: string): React.ReactNode {
    const escapedWords = highlightWords.map(
      (word) => `\\b${escapeRegExp(word)}\\b`
    );
    const regexWords = new RegExp(`(${escapedWords.join('|')})`, 'gi');

    const escapedGlobalWords = highlightGlobalWords.map((word) =>
      escapeRegExp(word)
    );
    const regexGlobalWords = new RegExp(
      `(${escapedGlobalWords.join('|')})`,
      'g'
    );

    // Split text by global words first
    let parts: (string | React.ReactNode)[] = text.split(regexGlobalWords);

    parts = parts.map((part, index) => {
      if (typeof part === 'string' && highlightGlobalWords.includes(part)) {
        // Highlight global words in all tabs
        return (
          <span key={`global-${index}`} className="text-primary">
            {part}
          </span>
        );
      } else {
        return part;
      }
    });

    // If activeTab is 'home', highlight specific words
    if (activeTab === 'home') {
      parts = parts
        .map((part) => {
          if (typeof part === 'string') {
            const subParts = part.split(regexWords);
            return subParts.map((subPart, index) => {
              if (
                highlightWords.some(
                  (word) => word.toLowerCase() === subPart.toLowerCase()
                )
              ) {
                return (
                  <span key={`highlight-${index}`} className="text-primary">
                    {subPart}
                  </span>
                );
              } else {
                return subPart;
              }
            });
          } else {
            return part;
          }
        })
        .flat();
    }

    return <>{parts}</>;
  }

  // Utility function to escape special regex characters
  function escapeRegExp(str: string) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  return (
    <div className="h-[60vh] overflow-auto">
      <pre className="whitespace-pre-wrap bg-transparent text-muted-foreground border-none">
        {highlightText(output)}
      </pre>
      <form onSubmit={handleInputSubmit} className="mt-4 p-2">
        <div className="flex items-center">
          <span className="mr-2 text-primary">$</span>
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            className="flex-grow bg-transparent border-none outline-none"
            autoFocus
          />
        </div>
      </form>
    </div>
  );
}
