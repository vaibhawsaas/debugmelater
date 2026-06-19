'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Upload, Plus, X, Tag, ArrowLeft } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import Link from 'next/link';
import api from '@/lib/api';

const CATEGORIES = ['Portfolio', '3D Websites', 'SaaS Dashboard', 'Landing Pages', 'React', 'Next.js', 'Three.js', 'Admin Panel'];

export default function NewProjectPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [mainPreview, setMainPreview] = useState<string | null>(null);
  const [screenshots, setScreenshots] = useState<File[]>([]);
  const [zipFile, setZipFile] = useState<File | null>(null);
  const [techInput, setTechInput] = useState('');
  const [features, setFeatures] = useState<string[]>(['']);
  const [form, setForm] = useState({
    title: '', code: '', category: '', price: '', shortDescription: '',
    description: '', youtubeUrl: '', status: 'draft', technologies: [] as string[],
  });

  const mainDrop = useDropzone({
    accept: { 'image/*': [] }, maxFiles: 1,
    onDrop: (files) => { setMainImage(files[0]); setMainPreview(URL.createObjectURL(files[0])); },
  });

  const screenshotDrop = useDropzone({
    accept: { 'image/*': [] }, maxFiles: 8, multiple: true,
    onDrop: (files) => setScreenshots(prev => [...prev, ...files].slice(0, 8)),
  });

  const zipDrop = useDropzone({
    accept: { 'application/zip': ['.zip'], 'application/x-zip-compressed': ['.zip'] }, maxFiles: 1,
    onDrop: (files) => setZipFile(files[0]),
  });

  const addTech = (e: React.KeyboardEvent) => {
    if ((e.key === 'Enter' || e.key === ',') && techInput.trim()) {
      e.preventDefault();
      if (!form.technologies.includes(techInput.trim())) {
        setForm(f => ({ ...f, technologies: [...f.technologies, techInput.trim()] }));
      }
      setTechInput('');
    }
  };

  const removeTech = (tech: string) => setForm(f => ({ ...f, technologies: f.technologies.filter(t => t !== tech) }));

  const addFeature = () => setFeatures(f => [...f, '']);
  const updateFeature = (i: number, val: string) => setFeatures(f => f.map((feat, idx) => idx === i ? val : feat));
  const removeFeature = (i: number) => setFeatures(f => f.filter((_, idx) => idx !== i));

  const generateCode = () => {
    const code = `DML-${String(Math.floor(Math.random() * 999)).padStart(3, '0')}`;
    setForm(f => ({ ...f, code }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.category || !form.price) { setError('Please fill all required fields'); return; }
    setLoading(true); setError('');

    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => {
        if (Array.isArray(v)) fd.append(k, JSON.stringify(v));
        else fd.append(k, v);
      });
      fd.append('features', JSON.stringify(features.filter(Boolean)));

      if (mainImage) fd.append('mainImage', mainImage);
      screenshots.forEach(s => fd.append('screenshots', s));
      if (zipFile) fd.append('zipFile', zipFile);

      await api.post('/projects', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
      router.push('/admin/projects');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to create project');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32 }}>
        <Link href="/admin/projects" style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 6 }}>
          <ArrowLeft size={16} /> Back
        </Link>
        <h2 style={{ fontSize: 24, fontWeight: 800, color: 'var(--text-primary)' }}>Add New Project</h2>
      </div>

      {error && <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 10, padding: '12px 16px', color: 'var(--error)', fontSize: 14, marginBottom: 24 }}>{error}</div>}

      <form onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 32, alignItems: 'start' }}>
          {/* Left: Uploads */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* Main image */}
            <div className="admin-table-wrap" style={{ padding: 20 }}>
              <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16, color: 'var(--text-primary)' }}>Main Image</h3>
              <div {...mainDrop.getRootProps()} className={`dropzone ${mainDrop.isDragActive ? 'dropzone--active' : ''}`} id="main-image-drop">
                <input {...mainDrop.getInputProps()} />
                {mainPreview ? (
                  <img src={mainPreview} alt="Preview" style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover', borderRadius: 8 }} />
                ) : (
                  <>
                    <Upload size={24} className="dropzone__icon" />
                    <p className="dropzone__text">Drop main image here (16:9)</p>
                    <p className="dropzone__hint">JPG, PNG — max 5MB</p>
                  </>
                )}
              </div>
            </div>

            {/* Screenshots */}
            <div className="admin-table-wrap" style={{ padding: 20 }}>
              <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16, color: 'var(--text-primary)' }}>Screenshots ({screenshots.length}/8)</h3>
              <div {...screenshotDrop.getRootProps()} className={`dropzone ${screenshotDrop.isDragActive ? 'dropzone--active' : ''}`} style={{ padding: 20 }} id="screenshots-drop">
                <input {...screenshotDrop.getInputProps()} />
                {screenshots.length > 0 ? (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
                    {screenshots.map((f, i) => (
                      <div key={i} style={{ position: 'relative' }}>
                        <img src={URL.createObjectURL(f)} alt={`Screenshot ${i + 1}`} style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover', borderRadius: 6 }} />
                        <button type="button" onClick={(e) => { e.stopPropagation(); setScreenshots(s => s.filter((_, idx) => idx !== i)); }}
                          style={{ position: 'absolute', top: 4, right: 4, background: 'rgba(0,0,0,0.7)', border: 'none', borderRadius: '50%', width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'white' }}>
                          <X size={10} />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <>
                    <Upload size={20} className="dropzone__icon" />
                    <p className="dropzone__text" style={{ fontSize: 13 }}>Drop screenshots (up to 8)</p>
                  </>
                )}
              </div>
            </div>

            {/* ZIP */}
            <div className="admin-table-wrap" style={{ padding: 20 }}>
              <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16, color: 'var(--text-primary)' }}>Source Code ZIP</h3>
              <div {...zipDrop.getRootProps()} className={`dropzone ${zipDrop.isDragActive ? 'dropzone--active' : ''}`} id="zip-drop">
                <input {...zipDrop.getInputProps()} />
                {zipFile ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 36, height: 36, background: 'rgba(124,58,237,0.15)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color: 'var(--accent-violet)' }}>ZIP</div>
                    <div>
                      <p style={{ fontSize: 13, color: 'var(--text-primary)' }}>{zipFile.name}</p>
                      <p style={{ fontSize: 11, color: 'var(--text-muted)' }}>{(zipFile.size / 1024 / 1024).toFixed(1)}MB</p>
                    </div>
                    <button type="button" onClick={(e) => { e.stopPropagation(); setZipFile(null); }} style={{ marginLeft: 'auto', color: 'var(--text-muted)', cursor: 'pointer' }}><X size={14} /></button>
                  </div>
                ) : (
                  <>
                    <Upload size={24} className="dropzone__icon" />
                    <p className="dropzone__text">Drop ZIP source code</p>
                    <p className="dropzone__hint">ZIP only — max 100MB</p>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Right: Details */}
          <div className="admin-table-wrap" style={{ padding: 28, display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div className="form-group">
              <label className="form-label" htmlFor="proj-title">Title <span>*</span></label>
              <input id="proj-title" className="form-input" placeholder="Amazing 3D Portfolio" value={form.title} onChange={(e) => setForm(f => ({ ...f, title: e.target.value }))} required />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 8, alignItems: 'end' }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label" htmlFor="proj-code">Project Code <span>*</span></label>
                <input id="proj-code" className="form-input" placeholder="DML-001" value={form.code} onChange={(e) => setForm(f => ({ ...f, code: e.target.value }))} />
              </div>
              <button type="button" className="btn-ghost btn-sm" onClick={generateCode} id="generate-code-btn" style={{ whiteSpace: 'nowrap' }}>Auto Generate</button>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="proj-category">Category <span>*</span></label>
              <select id="proj-category" className="form-select" value={form.category} onChange={(e) => setForm(f => ({ ...f, category: e.target.value }))} required>
                <option value="">Select category...</option>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="proj-price">Price (₹) <span>*</span></label>
              <input id="proj-price" type="number" className="form-input" placeholder="1299" value={form.price} onChange={(e) => setForm(f => ({ ...f, price: e.target.value }))} required min={0} />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="proj-short-desc">Short Description <span>*</span></label>
              <textarea id="proj-short-desc" className="form-textarea" placeholder="One-line summary for cards (max 160 chars)" maxLength={160} value={form.shortDescription} onChange={(e) => setForm(f => ({ ...f, shortDescription: e.target.value }))} style={{ minHeight: 70 }} />
              <p style={{ fontSize: 11, color: 'var(--text-muted)', textAlign: 'right' }}>{form.shortDescription.length}/160</p>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="proj-desc">Full Description</label>
              <textarea id="proj-desc" className="form-textarea" placeholder="Detailed markdown description..." value={form.description} onChange={(e) => setForm(f => ({ ...f, description: e.target.value }))} style={{ minHeight: 120 }} />
            </div>

            {/* Tech tags */}
            <div className="form-group">
              <label className="form-label" htmlFor="proj-tech">Technologies</label>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 8 }}>
                {form.technologies.map(tech => (
                  <span key={tech} className="badge badge--purple" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    {tech}
                    <button type="button" onClick={() => removeTech(tech)} style={{ cursor: 'pointer', color: 'inherit', display: 'flex' }}><X size={10} /></button>
                  </span>
                ))}
              </div>
              <input id="proj-tech" className="form-input" placeholder="Type tech and press Enter (e.g. Three.js)" value={techInput} onChange={(e) => setTechInput(e.target.value)} onKeyDown={addTech} />
            </div>

            {/* Features */}
            <div className="form-group">
              <label className="form-label">Features</label>
              {features.map((feat, i) => (
                <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                  <input className="form-input" placeholder={`Feature ${i + 1}`} value={feat} onChange={(e) => updateFeature(i, e.target.value)} id={`feature-${i}`} />
                  <button type="button" onClick={() => removeFeature(i)} style={{ color: 'var(--text-muted)', cursor: 'pointer', flexShrink: 0 }}><X size={14} /></button>
                </div>
              ))}
              <button type="button" className="btn-ghost btn-sm" onClick={addFeature} style={{ marginTop: 4 }} id="add-feature-btn"><Plus size={12} /> Add Feature</button>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="proj-youtube">YouTube URL</label>
              <input id="proj-youtube" type="url" className="form-input" placeholder="https://youtube.com/watch?v=..." value={form.youtubeUrl} onChange={(e) => setForm(f => ({ ...f, youtubeUrl: e.target.value }))} />
            </div>

            {/* Status */}
            <div className="form-group">
              <label className="form-label">Status</label>
              <div style={{ display: 'flex', gap: 8 }}>
                {['draft', 'published'].map(s => (
                  <button
                    key={s}
                    type="button"
                    className={`filter-pill ${form.status === s ? 'filter-pill--active' : ''}`}
                    onClick={() => setForm(f => ({ ...f, status: s }))}
                    id={`status-${s}`}
                  >
                    {s.charAt(0).toUpperCase() + s.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit */}
            <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
              <button type="submit" className="magnetic-btn" disabled={loading} id="publish-project-btn" style={{ flex: 1 }}>
                {loading ? <><div className="spinner" />Uploading...</> : form.status === 'published' ? 'Publish Project →' : 'Save Draft →'}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
