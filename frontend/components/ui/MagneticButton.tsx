'use client';

import { useRef, useEffect, ReactNode, MouseEvent } from 'react';
import { cn } from '@/lib/utils';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  id?: string;
  'aria-label'?: string;
}

export default function MagneticButton({
  children,
  className,
  onClick,
  type = 'button',
  disabled,
  id,
  'aria-label': ariaLabel,
}: MagneticButtonProps) {
  const btnRef = useRef<HTMLButtonElement>(null);
  const magnetX = useRef(0);
  const magnetY = useRef(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const btn = btnRef.current;
    if (!btn || window.matchMedia('(hover: none)').matches) return;

    const RADIUS = 80;
    const LERP = 0.25;

    const onMouseMove = (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);

      if (dist < RADIUS) {
        magnetX.current += (dx * 0.3 - magnetX.current) * LERP;
        magnetY.current += (dy * 0.3 - magnetY.current) * LERP;
        btn.style.transform = `translate(${magnetX.current}px, ${magnetY.current}px)`;
      }
    };

    const onMouseLeave = () => {
      const reset = () => {
        magnetX.current *= 0.85;
        magnetY.current *= 0.85;
        btn.style.transform = `translate(${magnetX.current}px, ${magnetY.current}px)`;
        if (Math.abs(magnetX.current) > 0.1 || Math.abs(magnetY.current) > 0.1) {
          rafRef.current = requestAnimationFrame(reset);
        } else {
          btn.style.transform = 'translate(0,0)';
        }
      };
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(reset);
    };

    btn.addEventListener('mousemove', onMouseMove as unknown as EventListener);
    btn.addEventListener('mouseleave', onMouseLeave);

    return () => {
      btn.removeEventListener('mousemove', onMouseMove as unknown as EventListener);
      btn.removeEventListener('mouseleave', onMouseLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <button
      ref={btnRef}
      type={type}
      className={cn('magnetic-btn cta-btn', className)}
      onClick={onClick}
      disabled={disabled}
      id={id}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
