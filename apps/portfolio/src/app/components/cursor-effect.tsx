'use client';

import { useEffect, useState } from 'react';

export function CursorEffect() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      setMousePosition({ x, y });

      const targets = document.querySelectorAll<HTMLElement>('[data-hover-target]');
      const radius = 32; // half of your w-16/h-16

      for (const el of targets) {
        const rect = el.getBoundingClientRect();

        const isIntersecting =
          x + radius > rect.left &&
          x - radius < rect.right &&
          y + radius > rect.top &&
          y - radius < rect.bottom;

        el.classList.toggle('hovered-by-cursor', isIntersecting);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      className="fixed w-12 h-12 rounded-full pointer-events-none z-50 mix-blend-difference bg-white transition-transform duration-100 ease-out"
      style={{
        left: mousePosition.x - 24,
        top: mousePosition.y - 24,
      }}
    />
  );
}
