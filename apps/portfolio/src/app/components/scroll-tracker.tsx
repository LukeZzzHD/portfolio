'use client';

import { cn } from '@/lib/utils';
import { scrollToSection } from '@/lib/utils';
import { Cpu, FolderOpen, House, User } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

const sections = [
  { id: 'intro', name: 'Introduction', icon: House },
  { id: 'about', name: 'About', icon: User },
  { id: 'projects', name: 'Projects', icon: FolderOpen },
  { id: 'technologies', name: 'Technologies', icon: Cpu },
];

export function ScrollTracker({ className }: { className?: string }) {
  const [activeSection, setActiveSection] = useState(sections[0]?.id ?? 'intro');

  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY;
    let currentSectionId = sections[0]?.id ?? 'intro';

    if (window.innerHeight + scrollTop >= document.body.offsetHeight - 50) {
      setActiveSection(sections[sections.length - 1]?.id ?? 'intro');
      return;
    }

    for (const section of sections) {
      const element = document.getElementById(section.id);
      if (element) {
        const elementTop = element.offsetTop;
        if (scrollTop >= elementTop - window.innerHeight / 4) {
          currentSectionId = section.id;
        }
      }
    }

    setActiveSection(currentSectionId);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  const activeIndex = sections.findIndex((s) => s.id === activeSection);

  return (
    <aside className={cn('-translate-y-1/2 fixed top-1/2 left-0 z-10 w-40', className)}>
      <nav className="relative flex h-full flex-col items-center space-y-14 py-8">
        {sections.map((section, index) => {
          const isActive = index === activeIndex;
          const Icon = section.icon;

          return (
            <a
              key={section.id}
              href={`#${section.id}`}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(section.id);
              }}
              className="group relative z-20 flex flex-col items-center transition-all duration-300"
              data-hover-target
            >
              <div className={cn('transition-all duration-300', isActive ? 'scale-150' : '')}>
                <Icon strokeWidth={1} className="h-5 w-5 text-primary" />
              </div>
            </a>
          );
        })}
      </nav>
    </aside>
  );
}
