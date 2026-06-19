import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn about DebugMeLater — a premium source code marketplace for ambitious developers.',
};

const TECH_NODES = [
  { label: 'Next.js 15', x: 50, y: 10, color: '#ffffff' },
  { label: 'Three.js', x: 85, y: 35, color: '#049EF4' },
  { label: 'GSAP', x: 70, y: 75, color: '#88CE02' },
  { label: 'Framer', x: 30, y: 80, color: '#FF0055' },
  { label: 'TypeScript', x: 10, y: 45, color: '#3178C6' },
  { label: 'MongoDB', x: 30, y: 20, color: '#47A248' },
];

export default function AboutPage() {
  return (
    <div style={{ paddingTop: 64 }}>
      <div className="section">
        <div className="container">
          {/* Hero */}
          <div style={{ textAlign: 'center', maxWidth: 700, margin: '0 auto 80px' }}>
            <p className="section__eyebrow">Our Story</p>
            <h1 className="section__title">Built for Developers Who Don&apos;t Settle</h1>
            <p style={{ fontSize: 18, color: 'var(--text-secondary)', lineHeight: 1.8, marginTop: 20 }}>
              DebugMeLater started as a side project born from frustration — tired of bloated, poorly-coded templates that promised premium but delivered mediocre. So we built our own.
            </p>
          </div>

          {/* YouTube Creator Profile */}
          <div className="glass-card" style={{ maxWidth: 800, margin: '0 auto 80px', padding: '48px 32px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24, textAlign: 'center', borderRadius: 24, position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 120, background: 'linear-gradient(135deg, rgba(255,0,0,0.15), rgba(124,58,237,0.15))', zIndex: 0 }}></div>
            
            <div style={{ position: 'relative', zIndex: 1, width: 220, height: 220, borderRadius: '50%', overflow: 'hidden', border: '6px solid #0F1118', boxShadow: '0 0 40px rgba(255,0,0,0.3)', marginTop: 10, background: '#0A0C12' }}>
              <img src="/logo.png" alt="Channel Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>
            
            <div style={{ position: 'relative', zIndex: 1 }}>
              <h2 style={{ fontSize: 32, fontWeight: 900, marginBottom: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                DebugMeLater 
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#AAA"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-2 15l-5-5 1.4-1.4 3.6 3.6 7.6-7.6L19 8l-9 9z"/></svg>
              </h2>
              <div style={{ display: 'flex', gap: 16, justifyContent: 'center', color: 'var(--text-muted)', fontSize: 15, marginBottom: 24, fontWeight: 500 }}>
                <span>@DebugMeLater</span>
                <span>•</span>
                <span>Premium Tutorials & Code</span>
              </div>
              
              <p style={{ fontFamily: '"Caveat", "Dancing Script", "Comic Sans MS", cursive', fontSize: 26, color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: 650, margin: '0 auto 32px', fontStyle: 'italic' }}>
                "Hey guys! Welcome to DebugMeLater. We build insane 3D websites, dissect complex React architectures, and turn caffeine into premium code. Subscribe and join the journey as we push the limits of modern web development!"
              </p>
              
              <a href="https://youtube.com/@DebugMeLater" target="_blank" rel="noopener noreferrer" className="magnetic-btn" style={{ background: '#FF0000', color: '#fff', border: 'none', display: 'inline-flex', alignItems: 'center', gap: 10, padding: '14px 28px', fontSize: 16, fontWeight: 700, borderRadius: 999, textDecoration: 'none' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                Subscribe to Channel
              </a>
            </div>
          </div>

          {/* Why section */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24, marginBottom: 80 }}>
            {[
              { emoji: '⚡', title: 'Performance First', desc: 'Every template targets 60fps animations and sub-2s load times. We profile before we ship.' },
              { emoji: '🎨', title: 'Design Obsessed', desc: 'We study Awwwards winners, Linear, and Vercel daily. Every pixel is intentional.' },
              { emoji: '🔐', title: 'Production Ready', desc: 'TypeScript strict mode, proper error handling, and clean architecture. Not a toy.' },
              { emoji: '📦', title: 'Complete Code', desc: 'No stripped versions, no "pro only" features. You get the full source, ready to deploy.' },
              { emoji: '⚡', title: 'Modern Stack', desc: 'Next.js 15, Three.js, GSAP, Framer Motion, Lenis — the tools elite developers use.' },
              { emoji: '🤝', title: 'Real Support', desc: 'Questions? We respond within 24 hours. We want you to succeed with our code.' },
            ].map(({ emoji, title, desc }) => (
              <div key={title} className="glass-card" style={{ padding: 28 }}>
                <div style={{ fontSize: 32, marginBottom: 12 }} aria-hidden="true">{emoji}</div>
                <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 8, color: 'var(--text-primary)' }}>{title}</h3>
                <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{desc}</p>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div style={{ textAlign: 'center', marginBottom: 80 }}>
            <p className="section__eyebrow">By the numbers</p>
            <h2 className="section__title" style={{ marginBottom: 48 }}>The Numbers Speak</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
              {[
                { value: '50+', label: 'Templates Sold', color: '#7C3AED' },
                { value: '1,200+', label: 'Happy Customers', color: '#3B82F6' },
                { value: '4.9★', label: 'Avg Rating', color: '#F59E0B' },
                { value: '15+', label: 'Countries', color: '#06B6D4' },
              ].map(({ value, label, color }) => (
                <div key={label} style={{ textAlign: 'center', padding: 32, background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)', borderRadius: 16 }}>
                  <div style={{ fontSize: 42, fontWeight: 900, color, marginBottom: 8 }}>{value}</div>
                  <div style={{ fontSize: 14, color: 'var(--text-muted)' }}>{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Tech visualization */}
          <div style={{ textAlign: 'center', marginBottom: 80 }}>
            <p className="section__eyebrow">Tech Stack</p>
            <h2 className="section__title" style={{ marginBottom: 48 }}>Our Arsenal</h2>
            <div style={{ maxWidth: 600, margin: '0 auto', position: 'relative', height: 200 }}>
              {TECH_NODES.map((node) => (
                <div
                  key={node.label}
                  style={{
                    position: 'absolute',
                    left: `${node.x}%`, top: `${node.y}%`,
                    transform: 'translate(-50%, -50%)',
                    padding: '8px 16px',
                    background: `${node.color}15`,
                    border: `1px solid ${node.color}40`,
                    borderRadius: 999,
                    fontSize: 13,
                    fontWeight: 600,
                    color: node.color,
                    whiteSpace: 'nowrap',
                    animation: `card-float ${3 + Math.random() * 2}s ease-in-out infinite`,
                    animationDelay: `${Math.random() * 2}s`,
                  }}
                >
                  {node.label}
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div style={{ textAlign: 'center', padding: '60px 24px', background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)', borderRadius: 24 }}>
            <h2 style={{ fontSize: 36, fontWeight: 800, marginBottom: 16 }} className="gradient-text">Ready to Build Something Insane?</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: 32 }}>Browse our premium collection of React, Next.js, and Three.js templates.</p>
            <a href="/projects" className="magnetic-btn cta-btn" id="about-cta" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              Explore Projects →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
