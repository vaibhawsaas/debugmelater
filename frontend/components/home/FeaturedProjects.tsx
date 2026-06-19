'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import ProjectCard, { ProjectCardSkeleton } from '@/components/project/ProjectCard';
import { IProject } from '@/types';
import api from '@/lib/api';

const FILTERS = ['All', 'Portfolio', '3D Websites', 'SaaS Dashboard', 'Next.js', 'Three.js'];

// Sample projects for static display when API not available
const SAMPLE_PROJECTS: IProject[] = [
  {
    _id: '1', title: '3D Portfolio Pro', slug: '3d-portfolio-pro', code: 'DML-001',
    description: 'Stunning Three.js portfolio with particle effects.',
    shortDescription: 'Premium 3D portfolio template with Three.js particles, GSAP animations, and dark glassmorphism design.',
    features: ['Three.js particles', 'GSAP scroll animations', 'Dark mode'], technologies: ['Three.js', 'Next.js', 'GSAP', 'TypeScript'],
    category: 'Portfolio', price: 1299, currency: 'INR',
    images: { main: '', screenshots: [] }, zipFile: { publicId: '', size: 0, url: '' },
    status: 'published', views: 234, sales: 45, rating: { average: 4.9, count: 24 },
    createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
  },
  {
    _id: '2', title: 'SaaS Dashboard Ultimate', slug: 'saas-dashboard-ultimate', code: 'DML-002',
    description: 'Complete SaaS admin dashboard.',
    shortDescription: 'Full-featured SaaS dashboard with analytics, user management, and beautiful charts.',
    features: ['Dark theme', 'Real-time charts', 'Auth system'], technologies: ['React', 'TypeScript', 'Recharts', 'Tailwind'],
    category: 'SaaS Dashboard', price: 1999, currency: 'INR',
    images: { main: '', screenshots: [] }, zipFile: { publicId: '', size: 0, url: '' },
    status: 'published', views: 189, sales: 31, rating: { average: 4.8, count: 18 },
    createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
  },
  {
    _id: '3', title: 'Framer Landing Premium', slug: 'framer-landing-premium', code: 'DML-003',
    description: 'Premium landing page with Framer Motion.',
    shortDescription: 'High-converting landing page template with smooth Framer Motion animations and modern design.',
    features: ['Framer Motion', 'Smooth scroll', 'CTA optimized'], technologies: ['Next.js', 'Framer Motion', 'Lenis'],
    category: 'Landing Pages', price: 899, currency: 'INR',
    images: { main: '', screenshots: [] }, zipFile: { publicId: '', size: 0, url: '' },
    status: 'published', views: 421, sales: 78, rating: { average: 5.0, count: 41 },
    createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
  },
  {
    _id: '4', title: 'Nebula 3D Website', slug: 'nebula-3d-website', code: 'DML-004',
    description: 'Immersive 3D web experience.',
    shortDescription: 'Full-screen immersive 3D website with WebGL shaders, particle systems, and cinematic animations.',
    features: ['WebGL shaders', 'Particle systems', '60fps'], technologies: ['Three.js', 'GSAP', 'React Three Fiber'],
    category: '3D Websites', price: 2499, currency: 'INR',
    images: { main: '', screenshots: [] }, zipFile: { publicId: '', size: 0, url: '' },
    status: 'published', views: 312, sales: 22, rating: { average: 4.9, count: 15 },
    createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
  },
  {
    _id: '5', title: 'Admin Panel Dark', slug: 'admin-panel-dark', code: 'DML-005',
    description: 'Complete dark admin panel.',
    shortDescription: 'Production-ready admin panel with role management, analytics dashboard, and data tables.',
    features: ['Role-based auth', 'Data tables', 'Analytics'], technologies: ['Next.js', 'TypeScript', 'MongoDB'],
    category: 'Admin Panel', price: 1699, currency: 'INR',
    images: { main: '', screenshots: [] }, zipFile: { publicId: '', size: 0, url: '' },
    status: 'published', views: 156, sales: 19, rating: { average: 4.7, count: 12 },
    createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
  },
  {
    _id: '6', title: 'Creative Agency Site', slug: 'creative-agency-site', code: 'DML-006',
    description: 'Award-worthy agency website.',
    shortDescription: 'Awwwards-level creative agency website with cursor effects, scroll animations, and smooth transitions.',
    features: ['Custom cursor', 'Horizontal scroll', 'Parallax'], technologies: ['Next.js', 'GSAP', 'Lenis', 'Framer Motion'],
    category: 'Portfolio', price: 1499, currency: 'INR',
    images: { main: '', screenshots: [] }, zipFile: { publicId: '', size: 0, url: '' },
    status: 'published', views: 278, sales: 34, rating: { average: 4.8, count: 28 },
    createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
  },
];

export default function FeaturedProjects() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [projects, setProjects] = useState<IProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    api.get('/projects/featured')
      .then((res) => { if (res.data?.length) setProjects(res.data); else setProjects(SAMPLE_PROJECTS); })
      .catch(() => { setProjects(SAMPLE_PROJECTS); })
      .finally(() => setIsLoading(false));
  }, []);

  const filtered = activeFilter === 'All'
    ? projects
    : projects.filter((p) => p.category === activeFilter || p.technologies?.includes(activeFilter));

  return (
    <section className="section" id="featured-projects" aria-labelledby="featured-heading">
      <div className="container">
        {/* Header */}
        <div className="section__header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 24 }}>
          <div>
            <p className="section__eyebrow">Handcrafted with precision</p>
            <h2 className="section__title" id="featured-heading">Featured Projects</h2>
            <p className="section__subtitle">Elite-grade templates for developers who build differently.</p>
          </div>
          <Link href="/projects" className="btn-ghost" id="view-all-projects" style={{ flexShrink: 0 }}>
            View All <ArrowRight size={14} />
          </Link>
        </div>

        {/* Filter pills */}
        <div className="filter-pills" role="tablist" aria-label="Project filters">
          {FILTERS.map((filter) => (
            <button
              key={filter}
              role="tab"
              aria-selected={activeFilter === filter}
              className={`filter-pill ${activeFilter === filter ? 'filter-pill--active' : ''}`}
              onClick={() => setActiveFilter(filter)}
              id={`filter-${filter.toLowerCase().replace(/\s+/g, '-')}`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="project-grid">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, i) => <ProjectCardSkeleton key={i} />)
          ) : (
            filtered.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
