'use client';

import * as React from 'react';
import { Moon, SunMedium } from 'lucide-react';
import { useTheme } from 'next-themes';
import { AnimatePresence, motion } from 'framer-motion';

export function ThemeToggle() {
  const [mounted, setMounted] = React.useState(false);
  const { setTheme, theme } = useTheme();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Render a placeholder or null to avoid hydration mismatch
    // and to prevent layout shift.
    return <div className="w-10 h-10" />;
  }

  const currentIcon = theme === 'dark' ? 'moon' : 'sun';

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div
      onClick={toggleTheme}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && toggleTheme()}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      className="flex items-center overflow-hidden rounded-full"
    >
      <AnimatePresence mode="wait" initial={false}>
        {currentIcon === 'sun' && (
          <motion.div
            key="sun"
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -30, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="flex items-center justify-center"
          >
            <SunMedium size={20} strokeWidth={1} />
          </motion.div>
        )}
        {currentIcon === 'moon' && (
          <motion.div
            key="moon"
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -30, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="flex items-center justify-center"
          >
            <Moon size={20} strokeWidth={1} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
