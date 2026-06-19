'use client';

import Link from 'next/link';

const CATEGORIES = [
  {
    id: 'portfolio', label: 'Portfolio', count: 12, href: '/projects?category=Portfolio',
    large: true,
    icon: (
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
        <circle cx="22" cy="22" r="16" stroke="#7C3AED" strokeWidth="1.5" fill="none" opacity="0.6"/>
        <circle cx="42" cy="42" r="16" stroke="#3B82F6" strokeWidth="1.5" fill="none" opacity="0.6"/>
        <circle cx="42" cy="22" r="12" stroke="#06B6D4" strokeWidth="1.5" fill="none" opacity="0.4"/>
      </svg>
    ),
  },
  {
    id: '3d', label: '3D Websites', count: 8, href: '/projects?category=3D+Websites',
    large: true,
    icon: (
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
        <rect x="12" y="12" width="40" height="40" rx="4" stroke="#7C3AED" strokeWidth="1.5" fill="none" transform="rotate(20 32 32)"/>
        <rect x="18" y="18" width="28" height="28" rx="4" stroke="#3B82F6" strokeWidth="1.5" fill="none" transform="rotate(-10 32 32)" opacity="0.6"/>
        <circle cx="32" cy="32" r="4" fill="#06B6D4"/>
      </svg>
    ),
  },
  {
    id: 'saas', label: 'SaaS Dashboard', count: 10, href: '/projects?category=SaaS+Dashboard',
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <rect x="4" y="28" width="8" height="16" rx="2" fill="#7C3AED" opacity="0.7"/>
        <rect x="16" y="18" width="8" height="26" rx="2" fill="#3B82F6" opacity="0.7"/>
        <rect x="28" y="8" width="8" height="36" rx="2" fill="#06B6D4" opacity="0.7"/>
        <rect x="40" y="20" width="4" height="24" rx="2" fill="#8B5CF6" opacity="0.5"/>
      </svg>
    ),
  },
  {
    id: 'landing', label: 'Landing Pages', count: 15, href: '/projects?category=Landing+Pages',
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <rect x="8" y="6" width="32" height="36" rx="4" stroke="#7C3AED" strokeWidth="1.5" fill="none"/>
        <rect x="12" y="12" width="20" height="3" rx="1.5" fill="#3B82F6" opacity="0.6"/>
        <rect x="12" y="20" width="24" height="2" rx="1" fill="rgba(255,255,255,0.3)"/>
        <rect x="12" y="25" width="18" height="2" rx="1" fill="rgba(255,255,255,0.2)"/>
        <circle cx="32" cy="8" r="6" fill="#06B6D4" opacity="0.8"/>
        <path d="M29.5 8L31.5 10L34.5 6" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 'react', label: 'React', count: 18, href: '/projects?category=React',
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <ellipse cx="24" cy="24" rx="8" ry="20" stroke="#06B6D4" strokeWidth="1.5" fill="none" transform="rotate(0 24 24)"/>
        <ellipse cx="24" cy="24" rx="8" ry="20" stroke="#7C3AED" strokeWidth="1.5" fill="none" transform="rotate(60 24 24)"/>
        <ellipse cx="24" cy="24" rx="8" ry="20" stroke="#3B82F6" strokeWidth="1.5" fill="none" transform="rotate(120 24 24)"/>
        <circle cx="24" cy="24" r="3" fill="#06B6D4"/>
      </svg>
    ),
  },
  {
    id: 'nextjs', label: 'Next.js', count: 14, href: '/projects?category=Next.js',
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <text x="6" y="34" fontSize="28" fontWeight="900" fill="url(#ng)" fontFamily="Inter,sans-serif">N</text>
        <line x1="32" y1="10" x2="44" y2="38" stroke="#3B82F6" strokeWidth="3" strokeLinecap="round" opacity="0.6"/>
        <defs>
          <linearGradient id="ng" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#7C3AED"/>
            <stop offset="100%" stopColor="#06B6D4"/>
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  {
    id: 'threejs', label: 'Three.js', count: 9, href: '/projects?category=Three.js',
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <polygon points="24,6 42,38 6,38" stroke="#7C3AED" strokeWidth="1.5" fill="none"/>
        <polygon points="24,14 36,34 12,34" stroke="#3B82F6" strokeWidth="1.5" fill="none" opacity="0.6"/>
        <circle cx="24" cy="28" r="4" fill="#06B6D4" opacity="0.8"/>
      </svg>
    ),
  },
  {
    id: 'admin', label: 'Admin Panel', count: 6, href: '/projects?category=Admin+Panel',
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <rect x="4" y="4" width="18" height="18" rx="4" stroke="#7C3AED" strokeWidth="1.5" fill="none"/>
        <rect x="26" y="4" width="18" height="8" rx="4" stroke="#3B82F6" strokeWidth="1.5" fill="none"/>
        <rect x="26" y="16" width="18" height="6" rx="3" stroke="#06B6D4" strokeWidth="1.5" fill="none" opacity="0.7"/>
        <rect x="4" y="26" width="40" height="18" rx="4" stroke="#8B5CF6" strokeWidth="1.5" fill="none" opacity="0.6"/>
      </svg>
    ),
  },
];

export default function CategoriesSection() {
  return (
    <section className="section" id="categories" aria-labelledby="categories-heading">
      <div className="container">
        <div className="section__header">
          <p className="section__eyebrow">Browse by category</p>
          <h2 className="section__title" id="categories-heading">Find Your Stack</h2>
        </div>

        <div className="categories-grid">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={cat.href}
              className={`category-card ${cat.large ? 'category-card--large' : ''}`}
              id={`category-${cat.id}`}
              aria-label={`Browse ${cat.label} — ${cat.count} projects`}
            >
              <div className="category-card__icon" aria-hidden="true">
                {cat.icon}
              </div>
              <div>
                <h3 className="category-card__title">{cat.label}</h3>
                <p className="category-card__count">{cat.count} Projects</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
