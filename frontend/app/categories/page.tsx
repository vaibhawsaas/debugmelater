'use client';

import Link from 'next/link';
import { ArrowRight, Star, Code, Layout, Layers, Terminal } from 'lucide-react';

const CATEGORY_DIRECTORIES = [
  {
    id: 'portfolio',
    title: 'Portfolios & Personal Sites',
    description: 'Beautiful, high-converting portfolio templates for developers, designers, and creatives. Stand out with 3D interactions and smooth GSAP animations.',
    icon: <Layout size={32} color="#7C3AED" />,
    color: '#7C3AED',
    bg: 'rgba(124,58,237,0.1)',
    projectCount: 12,
    topProjects: [
      { name: 'Minimal Developer Portfolio', price: '$49' },
      { name: 'Creative Director 3D Site', price: '$79' },
      { name: 'Terminal Hackers Resume', price: 'Free' }
    ]
  },
  {
    id: 'saas',
    title: 'SaaS Dashboards & Admin Panels',
    description: 'Production-ready dashboard layouts with built-in charts, data tables, authentication flows, and settings pages. Built to scale your next startup.',
    icon: <Layers size={32} color="#3B82F6" />,
    color: '#3B82F6',
    bg: 'rgba(59,130,246,0.1)',
    projectCount: 16,
    topProjects: [
      { name: 'Fintech Dashboard Dark', price: '$89' },
      { name: 'Analytics Platform Pro', price: '$129' },
      { name: 'CRM Starter Kit', price: '$99' }
    ]
  },
  {
    id: 'landing',
    title: 'Landing Pages & Marketing',
    description: 'High-converting landing pages built with Tailwind CSS. Perfect for product launches, waiting lists, and mobile app showcases.',
    icon: <Star size={32} color="#06B6D4" />,
    color: '#06B6D4',
    bg: 'rgba(6,182,212,0.1)',
    projectCount: 24,
    topProjects: [
      { name: 'Waitlist Page v2.0', price: 'Free' },
      { name: 'Mobile App Showcase', price: '$39' },
      { name: 'Startup Pitch Landing', price: '$59' }
    ]
  },
  {
    id: 'components',
    title: 'React & UI Component Libraries',
    description: 'Drop-in React components. From complex multi-step forms and animated modals to interactive pricing toggles and custom cursors.',
    icon: <Code size={32} color="#EC4899" />,
    color: '#EC4899',
    bg: 'rgba(236,72,153,0.1)',
    projectCount: 150,
    topProjects: [
      { name: 'Bento Grid System', price: '$19' },
      { name: 'Animated Pricing Cards', price: '$15' },
      { name: 'Navbar Mega Menu', price: '$29' }
    ]
  },
];

const TRENDING_STACKS = ["React", "Next.js 14", "Tailwind CSS", "Framer Motion", "Three.js", "TypeScript", "Prisma", "Supabase"];

export default function CategoriesPage() {
  return (
    <main style={{ paddingTop: '120px', paddingBottom: '100px', minHeight: '100vh', background: 'var(--bg-primary)' }}>
      <div className="container" style={{ padding: '0 24px', maxWidth: '1000px' }}>
        
        {/* Deep Dive Page Header */}
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <h1 style={{ fontSize: 'clamp(40px, 5vw, 64px)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em', marginBottom: '20px' }}>
            Explore Directory
          </h1>
          <p style={{ fontSize: '18px', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
            Browse our entire collection of premium templates, full-stack boilerplate projects, and UI components by category.
          </p>
        </div>

        {/* Detailed Category List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', marginBottom: '80px' }}>
          {CATEGORY_DIRECTORIES.map((cat) => (
            <div key={cat.id} style={{ 
              background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)', borderRadius: '24px', 
              padding: '40px', display: 'flex', gap: '40px', alignItems: 'flex-start', transition: 'all 0.3s',
            }}
            className="category-row-card"
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = cat.color; e.currentTarget.style.transform = 'translateY(-4px)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-subtle)'; e.currentTarget.style.transform = 'none'; }}
            >
              
              {/* Left: Icon & Info */}
              <div style={{ flex: 1 }}>
                <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: cat.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                  {cat.icon}
                </div>
                <h2 style={{ fontSize: '28px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px' }}>
                  {cat.title}
                </h2>
                <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '24px' }}>
                  {cat.description}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <Link href={`/projects?category=${encodeURIComponent(cat.title)}`} style={{ 
                    display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'var(--text-primary)', color: 'var(--bg-primary)',
                    padding: '10px 20px', borderRadius: '8px', fontSize: '14px', fontWeight: 600, textDecoration: 'none'
                  }}>
                    View {cat.projectCount} Projects <ArrowRight size={16} />
                  </Link>
                </div>
              </div>

              {/* Right: Top Projects Preview */}
              <div style={{ flex: 1, background: 'var(--bg-elevated)', borderRadius: '16px', padding: '24px', border: '1px solid var(--border-subtle)', minWidth: '300px' }}>
                <h3 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '16px' }}>
                  Top in this category
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {cat.topProjects.map((project, idx) => (
                    <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: 'var(--bg-secondary)', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
                      <span style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text-primary)' }}>{project.name}</span>
                      <span style={{ fontSize: '13px', fontWeight: 700, color: cat.color }}>{project.price}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Trending Stacks Section */}
        <div style={{ textAlign: 'center', padding: '40px', background: 'rgba(15,23,42,0.02)', borderRadius: '24px', border: '1px dashed var(--border-subtle)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '24px', color: 'var(--text-secondary)' }}>
            <Terminal size={20} />
            <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-primary)' }}>Or browse by Technology Stack</h3>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
            {TRENDING_STACKS.map(stack => (
              <Link key={stack} href={`/projects?tech=${encodeURIComponent(stack)}`} style={{
                padding: '8px 16px', borderRadius: '100px', background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)',
                fontSize: '14px', fontWeight: 500, color: 'var(--text-primary)', textDecoration: 'none', transition: 'border-color 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--accent-blue)'}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border-subtle)'}
              >
                {stack}
              </Link>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}
