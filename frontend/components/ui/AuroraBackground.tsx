'use client';

import { useEffect, useRef } from 'react';

export default function AuroraBackground() {
  return (
    <div className="aurora" aria-hidden="true">
      <div className="aurora__orb aurora__orb--purple" />
      <div className="aurora__orb aurora__orb--blue" />
      <div className="aurora__orb aurora__orb--cyan" />
    </div>
  );
}
