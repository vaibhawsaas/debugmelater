'use client';

import { useEffect, useState } from 'react';

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    // Check if it's the initial load
    const hasLoaded = sessionStorage.getItem('hasLoaded');
    if (hasLoaded) {
      setVisible(false);
      return;
    }

    // Animate progress bar 0→100 over 2.5s with easeInOutCubic
    const duration = 2500;
    const start = performance.now();

    const easeInOutCubic = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const frame = (now: number) => {
      const elapsed = now - start;
      const t = Math.min(elapsed / duration, 1);
      setProgress(Math.round(easeInOutCubic(t) * 100));
      if (t < 1) {
        requestAnimationFrame(frame);
      } else {
        // Exit animation
        sessionStorage.setItem('hasLoaded', 'true');
        setTimeout(() => {
          setExiting(true);
          setTimeout(() => setVisible(false), 600);
        }, 300);
      }
    };

    requestAnimationFrame(frame);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="loading-screen"
      style={{ opacity: exiting ? 0 : 1, transform: exiting ? 'scale(1.05)' : 'scale(1)' }}
      aria-hidden="true"
    >
      {/* Logo SVG with stroke-dashoffset animation */}
      <div className="loading-logo">
        <div style={{ width: 140, height: 140, margin: '0 auto', animation: 'fadeInUp 0.6s var(--ease-smooth) both' }}>
          <img src="/logo.png" alt="DebugMeLater Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
        </div>

        <p className="loading-brand">DebugMeLater</p>
        <p className="loading-text">Loading premium assets...</p>

        {/* Progress bar */}
        <div className="loading-bar-track">
          <div className="loading-bar-fill" style={{ width: `${progress}%` }} />
        </div>
        <p className="loading-percent">{progress}%</p>
      </div>
    </div>
  );
}
