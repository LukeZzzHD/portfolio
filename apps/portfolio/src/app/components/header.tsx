import { ThemeToggle } from '@/app/components/theme-toggle';
import { Github, Linkedin, Mail } from 'lucide-react';

export function Header() {
  return (
    <header className="fixed top-0 left-0 z-50 flex h-16 w-full items-center justify-end bg-transparent py-4 px-8">
      <nav className="flex items-center gap-4 font-extralight">
        <ThemeToggle />
        <a
          href="https://github.com/LukeZzzHD"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center hover:underline"
        >
          <Github strokeWidth={1} size={20} />
        </a>
        <a
          href="https://www.linkedin.com/in/lukas-schwab-a81bbb259/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center hover:underline"
        >
          <Linkedin strokeWidth={1} size={20} />
        </a>
        <a href="mailto:lukezzzhd@gmail.com" className="flex items-center hover:underline">
          <Mail strokeWidth={1} size={20} />
        </a>
      </nav>
    </header>
  );
}
