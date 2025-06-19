import {
  AboutSection,
  IntroSection,
  ProjectsSection,
  TechnologiesSection,
} from '@/components/sections';

import { ScrollTracker } from '@/components/scroll-tracker';
import { CursorEffect } from '@/app/components/cursor-effect';

export default async function Home() {
  return (
    <div className="relative flex">
      <ScrollTracker className="hidden md:block" />
      <CursorEffect />

      <div className="w-full">
        <IntroSection />
        <AboutSection />
        <ProjectsSection />
        <TechnologiesSection />
      </div>
    </div>
  );
}
