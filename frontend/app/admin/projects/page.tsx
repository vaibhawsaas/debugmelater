'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import { IProject } from '@/types';
import { formatPrice, timeAgo } from '@/lib/utils';
import api from '@/lib/api';

const SAMPLE: IProject[] = [
  { _id: '1', title: '3D Portfolio Pro', slug: '3d-portfolio-pro', code: 'DML-001', description: '', shortDescription: '', features: [], technologies: ['Three.js', 'Next.js'], category: 'Portfolio', price: 1299, currency: 'INR', images: { main: '', screenshots: [] }, zipFile: { publicId: 'zip1', size: 12000000, url: '' }, status: 'published', views: 234, sales: 45, rating: { average: 4.9, count: 24 }, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { _id: '2', title: 'SaaS Dashboard Dark', slug: 'saas-dashboard-dark', code: 'DML-002', description: '', shortDescription: '', features: [], technologies: ['React', 'Recharts'], category: 'SaaS Dashboard', price: 1999, currency: 'INR', images: { main: '', screenshots: [] }, zipFile: { publicId: 'zip2', size: 8000000, url: '' }, status: 'published', views: 189, sales: 31, rating: { average: 4.8, count: 18 }, createdAt: new Date(Date.now() - 86400000).toISOString(), updatedAt: new Date().toISOString() },
  { _id: '3', title: 'Landing Page Kit', slug: 'landing-page-kit', code: 'DML-003', description: '', shortDescription: '', features: [], technologies: ['Next.js'], category: 'Landing Pages', price: 899, currency: 'INR', images: { main: '', screenshots: [] }, zipFile: { publicId: '', size: 0, url: '' }, status: 'draft', views: 0, sales: 0, rating: { average: 0, count: 0 }, createdAt: new Date(Date.now() - 172800000).toISOString(), updatedAt: new Date().toISOString() },
];

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<IProject[]>(SAMPLE);
  const [loading, setLoading] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    api.get('/projects/admin/all').then(res => { if (res.data.projects?.length) setProjects(res.data.projects); }).catch(() => {});
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this project? This cannot be undone.')) return;
    try {
      await api.delete(`/projects/${id}`);
      setProjects(ps => ps.filter(p => p._id !== id));
    } catch {}
  };

  const toggleStatus = async (project: IProject) => {
    const newStatus = project.status === 'published' ? 'draft' : 'published';
    try {
      await api.put(`/projects/${project._id}`, { status: newStatus });
      setProjects(ps => ps.map(p => p._id === project._id ? { ...p, status: newStatus } : p));
    } catch {
      setProjects(ps => ps.map(p => p._id === project._id ? { ...p, status: newStatus } : p));
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
        <div>
          <h2 style={{ fontSize: 24, fontWeight: 800, color: 'var(--text-primary)' }}>Projects</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: 14, marginTop: 4 }}>{projects.length} total</p>
        </div>
        <Link href="/admin/projects/new" className="magnetic-btn" style={{ fontSize: 14, padding: '10px 20px' }} id="add-project-btn">
          <Plus size={16} /> Add Project
        </Link>
      </div>

      <div className="admin-table-wrap">
        <div style={{ overflowX: 'auto' }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Project</th>
                <th>Code</th>
                <th>Category</th>
                <th>Price</th>
                <th>Views</th>
                <th>Sales</th>
                <th>Status</th>
                <th>Added</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project._id}>
                  <td>
                    <p style={{ fontWeight: 600, color: 'var(--text-primary)', maxWidth: 200 }}>{project.title}</p>
                    <p style={{ fontSize: 11, color: 'var(--text-muted)' }}>{project.technologies?.slice(0, 3).join(' · ')}</p>
                  </td>
                  <td style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12 }}>{project.code}</td>
                  <td>{project.category}</td>
                  <td style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{formatPrice(project.price)}</td>
                  <td>{project.views.toLocaleString()}</td>
                  <td style={{ color: 'var(--success)', fontWeight: 600 }}>{project.sales}</td>
                  <td>
                    <button
                      className={`status-pill status-pill--${project.status}`}
                      onClick={() => toggleStatus(project)}
                      style={{ cursor: 'pointer' }}
                      id={`toggle-status-${project._id}`}
                      title="Click to toggle"
                    >
                      {project.status}
                    </button>
                  </td>
                  <td style={{ fontSize: 12, color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>{timeAgo(project.createdAt)}</td>
                  <td>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <Link
                        href={`/projects/${project.slug}`}
                        target="_blank"
                        className="btn-sm btn-sm--outline"
                        style={{ padding: '4px 8px' }}
                        aria-label="Preview project"
                      >
                        <Eye size={12} />
                      </Link>
                      <Link
                        href={`/admin/projects/${project._id}`}
                        className="btn-sm btn-sm--outline"
                        style={{ padding: '4px 8px' }}
                        id={`edit-${project._id}`}
                        aria-label="Edit project"
                      >
                        <Edit size={12} />
                      </Link>
                      <button
                        className="btn-sm btn-sm--outline"
                        style={{ padding: '4px 8px', color: 'var(--error)', borderColor: 'rgba(239,68,68,0.3)' }}
                        onClick={() => handleDelete(project._id)}
                        id={`delete-${project._id}`}
                        aria-label="Delete project"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
