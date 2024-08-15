import { Navbar } from './nav';

const cx = (...classes) => classes.filter(Boolean).join(' ');

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex-auto min-w-0 flex flex-col">
      <Navbar />
      {children}
    </div>
  );
}
