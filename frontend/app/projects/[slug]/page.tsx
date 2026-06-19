'use client';

import { useState, useRef, use, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { ShoppingCart, Star, Eye, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import Accordion from '@/components/ui/Accordion';
import { formatPrice } from '@/lib/utils';

const SAMPLE_PROJECT = {
  _id: '1', title: '3D Portfolio Pro', code: 'DML-001', slug: '3d-portfolio-pro',
  category: 'Portfolio', price: 1299, currency: 'INR',
  rating: { average: 4.9, count: 24 },
  shortDescription: 'Premium 3D portfolio template with Three.js particles, GSAP animations, and dark glassmorphism design.',
  description: `A stunning portfolio template built with cutting-edge web technologies. Features immersive Three.js particle effects, smooth GSAP scroll animations, custom cursor interactions, and a premium glassmorphism design system.\n\nPerfect for senior developers, creative agencies, and anyone who wants to stand out from the crowd.`,
  features: [
    'Fully responsive design (mobile → 4K)',
    '60fps Three.js particle animation',
    'Custom dual-ring cursor with lerp',
    'GSAP ScrollTrigger animations',
    'Lenis smooth scroll integration',
    'TypeScript + strict mode',
    'Framer Motion page transitions',
    'Dark glassmorphism design system',
    'SEO optimized with meta tags',
    'Well-commented, clean code',
  ],
  technologies: ['Three.js', 'Next.js', 'GSAP', 'TypeScript', 'Framer Motion', 'Lenis'],
  youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  images: {
    main: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    screenshots: [
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  status: 'published', views: 234, sales: 45,
  createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
  shortDescriptionMeta: '', features_extra: [], technologies_extra: [],
  zipFile: { publicId: '', size: 1024 * 1024 * 12, url: '' },
};

const FAQ = [
  { question: 'What do I get after purchase?', answer: 'After payment verification (within 2-4 hours), you receive a download link via email with the complete source code ZIP file, valid for 24 hours with up to 3 downloads.' },
  { question: 'Is the code production-ready?', answer: 'Yes! All templates are TypeScript strict-mode compliant, well-commented, and follow best practices. They\'re ready to customize and deploy.' },
  { question: 'What license do I get?', answer: 'Personal/commercial license for one project. You may use it to build a website for yourself or a client. Reselling or redistributing the source code is not permitted.' },
  { question: 'Can I get support?', answer: 'Yes! Contact us on our socials or via email. We typically respond within 24 hours.' },
  { question: 'What if I have payment issues?', answer: 'Take a screenshot of your payment and submit the form. If there are any issues, contact us directly with your order ID.' },
];

export default function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const router = useRouter();
  const [activeImage, setActiveImage] = useState(0);
  const project = SAMPLE_PROJECT; // In production, fetch by slug

  // Fix hydration issues by only checking auth after mount
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleBuyClick = (e: React.MouseEvent) => {
    if (isClient && !isAuthenticated) {
      e.preventDefault();
      router.push('/login');
    }
  };

  const placeholderColors = ['#1a0b2e', '#0d1b2a', '#1a0533', '#0a1628'];

  return (
    <div style={{ paddingTop: 64 }}>
      <div className="section">
        <div className="container">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" style={{ marginBottom: 32, color: 'var(--text-muted)', fontSize: 13, display: 'flex', gap: 8, alignItems: 'center' }}>
            <Link href="/" style={{ color: 'var(--text-muted)', transition: 'color .2s' }}>Home</Link>
            <span>/</span>
            <Link href="/projects" style={{ color: 'var(--text-muted)' }}>Projects</Link>
            <span>/</span>
            <span style={{ color: 'var(--text-primary)' }}>{project.title}</span>
          </nav>

          <div className="project-detail-grid">
            {/* Left: Images + Video */}
            <div>
              {/* Main image */}
              <div style={{
                aspectRatio: '16/9', background: placeholderColors[activeImage], borderRadius: 16,
                marginBottom: 12, display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 48, fontWeight: 900, color: 'rgba(124,58,237,0.3)', border: '1px solid var(--border-subtle)',
                overflow: 'hidden',
                position: 'relative',
              }}>
                {project.images.screenshots?.[activeImage] || project.images.main ? (
                  <img
                    src={project.images.screenshots?.[activeImage] || project.images.main}
                    alt={`${project.title} screenshot ${activeImage + 1}`}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  'DML'
                )}
              </div>

              {/* Thumbnails */}
              <div style={{ display: 'flex', gap: 8, marginBottom: 32 }}>
                {placeholderColors.map((color, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    style={{
                      width: 72, height: 48, background: color, borderRadius: 8,
                      border: `2px solid ${activeImage === i ? 'var(--accent-purple)' : 'var(--border-subtle)'}`,
                      cursor: 'pointer', flexShrink: 0, transition: 'border-color .2s',
                      overflow: 'hidden',
                      padding: 0,
                    }}
                    id={`thumb-${i}`}
                    aria-label={`Screenshot ${i + 1}`}
                  >
                    {project.images.screenshots?.[i] ? (
                      <img
                        src={project.images.screenshots[i]}
                        alt={`thumbnail ${i + 1}`}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    ) : null}
                  </button>
                ))}
              </div>

              {/* Description */}
              <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16, color: 'var(--text-primary)' }}>About This Template</h2>
              <div style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 40 }}>
                {project.description.split('\n\n').map((para, i) => <p key={i} style={{ marginBottom: 16 }}>{para}</p>)}
              </div>

              {/* Features */}
              <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 20, color: 'var(--text-primary)' }}>What&apos;s Included</h2>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 40 }}>
                {project.features.map((f, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'var(--text-secondary)', fontSize: 14 }}>
                    <span style={{ width: 20, height: 20, borderRadius: '50%', background: 'rgba(34,197,94,0.15)', border: '1px solid rgba(34,197,94,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Check size={12} color="#22C55E" />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>

              {/* FAQ */}
              <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 20, color: 'var(--text-primary)' }}>FAQ</h2>
              <Accordion items={FAQ} />
            </div>

            {/* Right: Buy sidebar */}
            <aside className="project-detail-sidebar">
              <div className="detail-buy-card glass-card">
                {/* Category badge */}
                <span className="badge badge--purple" style={{ marginBottom: 12 }}>{project.category}</span>

                <h1 style={{ fontSize: 24, fontWeight: 800, lineHeight: 1.2, marginBottom: 6, color: 'var(--text-primary)' }}>
                  {project.title}
                </h1>
                <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: 'var(--text-muted)', marginBottom: 12 }}>
                  #{project.code}
                </p>

                {/* Rating */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 20 }}>
                  <span style={{ color: 'var(--warning)' }}>{'★'.repeat(5)}</span>
                  <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{project.rating.average}</span>
                  <span style={{ color: 'var(--text-muted)', fontSize: 13 }}>({project.rating.count} reviews)</span>
                </div>

                <div className="divider" />

                {/* Price */}
                <div style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 900, marginBottom: 20 }} className="gradient-text">
                  {formatPrice(project.price)}
                </div>

                {/* CTAs */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
                  <Link
                    href={`/checkout/${project._id}`}
                    onClick={handleBuyClick}
                    className="magnetic-btn cta-btn"
                    style={{ width: '100%', justifyContent: 'center' }}
                    id="buy-now-btn"
                    aria-label={`Buy ${project.title} for ${formatPrice(project.price)}`}
                  >
                    <ShoppingCart size={16} />
                    Buy Now
                  </Link>
                  {project.youtubeUrl && (
                    <a
                      href={project.youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-ghost"
                      style={{ width: '100%', justifyContent: 'center', display: 'flex', alignItems: 'center', gap: 8 }}
                      id="preview-demo-btn"
                    >
                      <Eye size={16} />
                      Preview Live Demo
                    </a>
                  )}
                </div>

                <div className="divider" />

                {/* Details */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                    <span style={{ color: 'var(--text-muted)' }}>Category</span>
                    <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{project.category}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                    <span style={{ color: 'var(--text-muted)' }}>Files</span>
                    <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>ZIP Source Code</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                    <span style={{ color: 'var(--text-muted)' }}>File Size</span>
                    <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{Math.round(project.zipFile.size / 1024 / 1024)}MB</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                    <span style={{ color: 'var(--text-muted)' }}>License</span>
                    <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>Personal Use</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                    <span style={{ color: 'var(--text-muted)' }}>Downloads</span>
                    <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>3 downloads included</span>
                  </div>
                </div>

                <div className="divider" />

                {/* Tech stack */}
                <p style={{ fontSize: 12, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>Tech Stack</p>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {project.technologies.map((tech) => (
                    <span key={tech} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}
