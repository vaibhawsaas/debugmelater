'use client';

import { 
  Atom, Triangle, Box, FileCode2, Zap, Activity, Wind, ArrowDownToLine, 
  Database, Server, Component, ShieldCheck, Layers, Cloud, BarChart3, Braces 
} from 'lucide-react';

const TECH_ROW_1 = [
  { name: 'React', color: '#61DAFB', Icon: Atom },
  { name: 'Next.js', color: 'var(--text-primary)', Icon: Triangle },
  { name: 'Three.js', color: '#049EF4', Icon: Box },
  { name: 'TypeScript', color: '#3178C6', Icon: FileCode2 },
  { name: 'GSAP', color: '#88CE02', Icon: Zap },
  { name: 'Framer Motion', color: '#FF0055', Icon: Activity },
  { name: 'Tailwind CSS', color: '#06B6D4', Icon: Wind },
  { name: 'Lenis', color: '#7C3AED', Icon: ArrowDownToLine },
];

const TECH_ROW_2 = [
  { name: 'MongoDB', color: '#47A248', Icon: Database },
  { name: 'Node.js', color: '#339933', Icon: Server },
  { name: 'Express', color: 'var(--text-primary)', Icon: Component },
  { name: 'Zod', color: '#3B82F6', Icon: ShieldCheck },
  { name: 'React Query', color: '#FF4154', Icon: Layers },
  { name: 'Zustand', color: '#7C3AED', Icon: Braces },
  { name: 'Cloudinary', color: '#3448C5', Icon: Cloud },
  { name: 'Recharts', color: '#22C55E', Icon: BarChart3 },
];

interface TechItemProps {
  name: string;
  color: string;
  Icon: any;
}

function TechItem({ name, color, Icon }: TechItemProps) {
  return (
    <div className="marquee-item" style={{ fontSize: '16px', padding: '12px 24px', borderRadius: '100px', display: 'flex', alignItems: 'center', gap: '12px' }}>
      <Icon size={20} color={color} aria-hidden="true" />
      <span style={{ fontWeight: 600 }}>{name}</span>
    </div>
  );
}

export default function TechMarquee() {
  return (
    <section className="section" id="tech-stack" aria-labelledby="tech-heading" style={{ paddingBlock: '60px' }}>
      <div className="container">
        <div className="section__header" style={{ textAlign: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
          <p className="section__eyebrow">Tech Stack</p>
          <h2 className="section__title" id="tech-heading" style={{ fontSize: 'clamp(24px, 3vw, 36px)' }}>Built With the Best Tools</h2>
        </div>
      </div>

      <div className="marquee-wrapper" aria-hidden="true">
        <div className="marquee-track">
          {[...TECH_ROW_1, ...TECH_ROW_1].map((tech, i) => (
            <TechItem key={`r1-${i}`} {...tech} />
          ))}
        </div>
      </div>

      <div className="marquee-wrapper" style={{ marginTop: 12 }} aria-hidden="true">
        <div className="marquee-track marquee-track--rtl">
          {[...TECH_ROW_2, ...TECH_ROW_2].map((tech, i) => (
            <TechItem key={`r2-${i}`} {...tech} />
          ))}
        </div>
      </div>
    </section>
  );
}
