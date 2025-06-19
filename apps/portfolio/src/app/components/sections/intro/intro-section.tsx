'use client';

import { Section } from '@/app/components/sections/section';
import { scrollToSection } from '@/lib/utils';
import { ArrowDown } from 'lucide-react';
import { useCallback } from 'react';

export function IntroSection() {
  const handleArrowClick = useCallback(() => {
    scrollToSection('about');
  }, []);

  return (
    <Section className="relative flex flex-col items-center justify-center" id="intro">
      <div className="flex flex-1 w-full items-center justify-center min-h-[60vh]">
        <h1 className="w-full mb-4 font-grand-slang text-[80px] leading-40 md:text-[150px] lg:text-[200px] text-center">
          Lukas Schwab
        </h1>
      </div>
      {/* Animated arrow at the bottom */}
      <div
        onClick={handleArrowClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleArrowClick();
          }
        }}
        className="absolute bottom-36 left-1/2 -translate-x-1/2 flex flex-col items-center group"
      >
        <ArrowDown strokeWidth={1} size={50} className="animate-bounce" />
        <span className="sr-only">Scroll down</span>
      </div>
    </Section>
  );
}
