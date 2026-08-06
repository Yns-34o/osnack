'use client';

import { useEffect, useRef } from 'react';

/**
 * Custom blended cursor that follows the pointer with easing and grows over
 * interactive elements. Disabled on touch / coarse-pointer devices (the CSS
 * also hides it).
 */
export function CustomCursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = ref.current;
    if (!cursor) return;
    if (window.matchMedia('(hover: none), (pointer: coarse)').matches) return;

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const pos = { ...target };
    let isHover = false;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
    };
    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      isHover = !!(t && t.closest('a, button, [data-cursor-hover], input, textarea'));
    };

    const loop = () => {
      pos.x += (target.x - pos.x) * 0.18;
      pos.y += (target.y - pos.y) * 0.18;
      const s = isHover ? 48 : 10;
      cursor.style.transform = `translate(${pos.x - s / 2}px, ${pos.y - s / 2}px)`;
      cursor.style.width = `${s}px`;
      cursor.style.height = `${s}px`;
      cursor.style.opacity = isHover ? '0.6' : '1';
      cursor.classList.toggle('is-hover', isHover);
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);
    loop();

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <div id="cursor" ref={ref} />;
}
