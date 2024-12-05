import { useState, useEffect } from 'react';
import { useGuestbook } from '@/hooks/useGuestbook';

const content = {
  home: `A geeky front-end developer and designer from Uzbekistan.
Gained hands-on experience at Technocorp as an intern, specializing in React and product development.
Passionate about continuous learning and exploring new tech frontiers.

Type 'help' for a list of commands.
  `,
  work: `
~ work experience ~
1. [Company A] - [Position] (YYYY-YYYY)
   • [Key achievement or responsibility]
   • [Another key achievement or responsibility]

2. [Company B] - [Position] (YYYY-YYYY)
   • [Key achievement or responsibility]
   • [Another key achievement or responsibility]

3. [Personal Project/Freelance Work]
   • [Description of project or work]
   • [Technologies used or skills demonstrated]
  `,
  stack: `
~ tech stack ~
• Frontend: React, Next.js, TypeScript, Tailwind CSS
• Backend: Node.js, Express, Python, Django
• Databases: PostgreSQL, MongoDB, Redis
• DevOps: Docker, Kubernetes, AWS, GitHub Actions
• Tools: Git, VS Code, Postman, Figma
  `,
  guestbook: `
~ guestbook ~
Leave a message or view messages from other visitors.
Type 'sign' to leave a message, or 'view' to see the guestbook.
  `,
  contact: `
~ contact ~
Email: youremail@example.com
GitHub: github.com/yourusername
LinkedIn: linkedin.com/in/yourusername
Twitter: @yourtwitterhandle
  `,
};

export function Terminal({
  activeTab,
  isSignedIn,
  onCommand,
}: {
  activeTab: string;
  isSignedIn: boolean;
  onCommand: (command: string) => void;
}) {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState(
    content[activeTab as keyof typeof content]
  );
  const { messages, addMessage } = useGuestbook();
  const [showingGuestbook, setShowingGuestbook] = useState(false);

  useEffect(() => {
    setOutput(content[activeTab as keyof typeof content]);
    setShowingGuestbook(false);
  }, [activeTab]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let newOutput = '';

    switch (input.toLowerCase()) {
      case 'h':
      case 'home':
        onCommand('home');
        return;
      case 'w':
      case 'work':
        onCommand('work');
        return;
      case 's':
      case 'stack':
        onCommand('stack');
        return;
      case 'g':
      case 'guestbook':
        onCommand('guestbook');
        return;
      case 'c':
      case 'contact':
        onCommand('contact');
        return;
      case 'help':
        newOutput = `
Available commands:
- home: View the home page
- work: See my work experience
- stack: View my tech stack
- guestbook: Access the guestbook
- contact: Get my contact information
- clear: Clear the terminal
        `;
        break;
      case 'home':
      case 'work':
      case 'stack':
      case 'contact':
        newOutput = content[input as keyof typeof content];
        break;
      case 'guestbook':
        newOutput = isSignedIn
          ? content.guestbook
          : 'Please sign in to access the guestbook.';
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
          setShowingGuestbook(true);
          newOutput = 'Loading guestbook messages...';
          setTimeout(() => {
            setOutput(
              (prev) =>
                `${prev.replace(
                  'Loading guestbook messages...',
                  ''
                )}\n\nGuestbook Messages:\n${messages.join('\n')}`
            );
          }, 1000);
        } else {
          newOutput = 'Please sign in to view the guestbook.';
        }
        break;
      case 'clear':
        newOutput = '';
        break;
      default:
        if (output.endsWith('Enter your message:')) {
          addMessage(input);
          newOutput = 'Message added to the guestbook.';
        } else {
          newOutput = `Command not recognized: ${input}`;
        }
    }

    setOutput((prev) => `${prev}\n\n$ ${input}\n${newOutput}`);
    setInput('');
  };

  return (
    <div className="h-[60vh] overflow-auto">
      <pre className="whitespace-pre-wrap bg-transparent border-none">
        {output}
      </pre>
      <form onSubmit={handleInputSubmit} className="mt-4">
        <div className="flex items-center">
          <span className="mr-2">$</span>
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
