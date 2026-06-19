'use client';

import { useState, useEffect, useCallback } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import ProjectCard, { ProjectCardSkeleton } from '@/components/project/ProjectCard';
import { IProject } from '@/types';
import { debounce } from '@/lib/utils';
import api from '@/lib/api';

const CATEGORIES = ['All', 'Portfolio', '3D Websites', 'SaaS Dashboard', 'Landing Pages', 'React', 'Next.js', 'Three.js', 'Admin Panel'];
const SORT_OPTIONS = [
  { label: 'Newest', value: 'createdAt:desc' },
  { label: 'Price: Low → High', value: 'price:asc' },
  { label: 'Price: High → Low', value: 'price:desc' },
  { label: 'Most Popular', value: 'sales:desc' },
];

// Reuse sample projects from featured
const SAMPLE_PROJECTS: IProject[] = Array.from({ length: 9 }, (_, i) => ({
  _id: `p${i + 1}`, title: `Premium Template ${i + 1}`, slug: `premium-template-${i + 1}`, code: `DML-00${i + 1}`,
  description: 'A premium template.',
  shortDescription: 'A stunning premium template with modern design and smooth animations.',
  features: ['Responsive', 'Dark mode', 'TypeScript'],
  technologies: ['Next.js', 'Three.js', 'GSAP', 'TypeScript'].slice(0, (i % 3) + 2),
  category: CATEGORIES[(i % (CATEGORIES.length - 1)) + 1],
  price: [899, 1299, 1699, 1999, 2499][i % 5],
  currency: 'INR',
  images: { main: '', screenshots: [] },
  zipFile: { publicId: '', size: 0, url: '' },
  status: 'published', views: 100 + i * 30, sales: 10 + i * 5,
  rating: { average: 4.7 + (i % 3) * 0.1, count: 10 + i * 4 },
  createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
}));

export default function ProjectsPage() {
  const [projects, setProjects] = useState<IProject[]>(SAMPLE_PROJECTS);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('createdAt:desc');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(SAMPLE_PROJECTS.length);
  const [showFilters, setShowFilters] = useState(false);

  const fetchProjects = useCallback(async (q: string, cat: string, s: string, p: number) => {
    setLoading(true);
    try {
      const [sortField, sortOrder] = s.split(':');
      const res = await api.get('/projects', {
        params: { search: q || undefined, category: cat === 'All' ? undefined : cat, sort: sortField, order: sortOrder, page: p, limit: 9 },
      });
      setProjects(res.data.projects);
      setTotal(res.data.total);
    } catch {
      // Keep sample data
    } finally {
      setLoading(false);
    }
  }, []);

  const debouncedFetch = useCallback(debounce((q: unknown) => { fetchProjects(q as string, category, sort, 1); }, 300), [category, sort]);

  useEffect(() => { fetchProjects(search, category, sort, page); }, [category, sort, page]);
  useEffect(() => { debouncedFetch(search); }, [search]);

  const totalPages = Math.ceil(total / 9);

  return (
    <div style={{ paddingTop: 64 }}>
      {/* Hero */}
      <div style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-subtle)', padding: '48px 24px 32px' }}>
        <div className="container">
          <h1 className="section__title" style={{ marginBottom: 8 }}>All Projects</h1>
          <p style={{ color: 'var(--text-muted)', marginBottom: 24 }}>{total} premium templates available</p>

          {/* Search bar */}
          <div style={{ position: 'relative', maxWidth: 480 }}>
            <Search size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }} />
            <input
              type="search"
              placeholder="Search projects..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="form-input"
              style={{ paddingLeft: 42 }}
              id="projects-search"
              aria-label="Search projects"
            />
          </div>
        </div>
      </div>

      <div className="section">
        <div className="container">
          {/* Filter bar */}
          <div style={{ display: 'flex', gap: 12, marginBottom: 32, flexWrap: 'wrap', alignItems: 'center' }}>
            <div className="filter-pills" style={{ flex: 1, marginBottom: 0 }}>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  className={`filter-pill ${category === cat ? 'filter-pill--active' : ''}`}
                  onClick={() => { setCategory(cat); setPage(1); }}
                  id={`cat-filter-${cat.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="form-select"
              style={{ width: 'auto', flexShrink: 0 }}
              id="projects-sort"
              aria-label="Sort projects"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>

          {/* Grid */}
          {loading ? (
            <div className="project-grid">
              {Array.from({ length: 9 }).map((_, i) => <ProjectCardSkeleton key={i} />)}
            </div>
          ) : projects.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 0' }}>
              <p style={{ fontSize: 48, marginBottom: 16 }}>🔍</p>
              <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>No projects found</h2>
              <p style={{ color: 'var(--text-muted)' }}>Try different search terms or filters</p>
              <button className="btn-ghost" style={{ marginTop: 24 }} onClick={() => { setSearch(''); setCategory('All'); }}>Clear filters</button>
            </div>
          ) : (
            <div className="project-grid">
              {projects.map((project) => (
                <ProjectCard key={project._id} project={project} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 48 }}>
              <button className="btn-ghost btn-sm" disabled={page === 1} onClick={() => setPage(p => p - 1)} id="prev-page">← Prev</button>
              {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  className={`btn-sm ${p === page ? 'btn-sm--primary' : 'btn-sm--outline'}`}
                  onClick={() => setPage(p)}
                  id={`page-${p}`}
                  aria-current={p === page ? 'page' : undefined}
                >
                  {p}
                </button>
              ))}
              <button className="btn-ghost btn-sm" disabled={page === totalPages} onClick={() => setPage(p => p + 1)} id="next-page">Next →</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
