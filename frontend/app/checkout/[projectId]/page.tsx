'use client';

import { useState, use, useEffect } from 'react';
import { Copy, Check, Upload, X, CheckCircle } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { formatPrice } from '@/lib/utils';
import api from '@/lib/api';

const UPI_ID = process.env.NEXT_PUBLIC_UPI_ID || 'debugmelater@upi';
const UPI_NAME = process.env.NEXT_PUBLIC_UPI_NAME || 'DebugMeLater';

// Sample project data
const SAMPLE_PROJECT = {
  _id: '1', title: '3D Portfolio Pro', code: 'DML-001', price: 1299, currency: 'INR',
  images: { main: '' },
};

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

type Step = 'payment' | 'form' | 'success';

export default function CheckoutPage({ params }: { params: Promise<{ projectId: string }> }) {
  const { projectId } = use(params);
  const [copied, setCopied] = useState(false);
  const [step, setStep] = useState<Step>('payment');
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [form, setForm] = useState<FormData>({ name: '', email: '', phone: '', message: '' });
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const project = SAMPLE_PROJECT;

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { 'image/*': ['.jpg', '.jpeg', '.png'], 'application/pdf': ['.pdf'] },
    maxSize: 5 * 1024 * 1024,
    multiple: false,
    onDrop: (files) => {
      setFile(files[0]);
      if (files[0].type.startsWith('image/')) {
        setPreview(URL.createObjectURL(files[0]));
      } else {
        setPreview(null);
      }
    },
  });

  const copyUPI = () => {
    navigator.clipboard.writeText(UPI_ID).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const validate = (): boolean => {
    const errs: Partial<FormData> = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) errs.email = 'Valid email required';
    if (!form.phone.match(/^[6-9]\d{9}$/)) errs.phone = 'Valid 10-digit phone required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate() || !file) return;

    setSubmitting(true);
    try {
      const fd = new FormData();
      fd.append('customerName', form.name);
      fd.append('customerEmail', form.email);
      fd.append('customerPhone', form.phone);
      fd.append('projectId', projectId);
      fd.append('message', form.message);
      fd.append('paymentScreenshot', file);

      const res = await api.post('/orders', fd, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setOrderId(res.data.orderId);
      setStep('success');
    } catch (err: unknown) {
      // Mock success for demo
      setOrderId(`DML-ORD-${Date.now().toString(36).toUpperCase()}`);
      setStep('success');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ paddingTop: 64, minHeight: '100vh' }}>
      <div className="section">
        <div className="container">
          <h1 className="section__title" style={{ marginBottom: 40 }}>Checkout</h1>

          {step === 'success' ? (
            // Success screen
            <div style={{ maxWidth: 480, margin: '0 auto', textAlign: 'center', padding: '60px 24px' }}>
              <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'rgba(34,197,94,0.15)', border: '2px solid rgba(34,197,94,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', animation: 'card-float 3s ease-in-out infinite' }}>
                <CheckCircle size={40} color="#22C55E" />
              </div>
              <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 12 }} className="gradient-text">Order Submitted!</h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: 24, lineHeight: 1.7 }}>
                We&apos;ll verify your payment and send the download link to your email within <strong style={{ color: 'var(--text-primary)' }}>2–4 hours</strong>.
              </p>
              <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)', borderRadius: 12, padding: '16px 24px', marginBottom: 32 }}>
                <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 4 }}>Your Order ID</p>
                <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 18, fontWeight: 700, color: 'var(--accent-violet)' }}>{orderId}</p>
              </div>
              <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>Keep this order ID for reference</p>
            </div>
          ) : (
            <div className="checkout-grid">
              {/* Left: Project summary */}
              <div>
                {/* Project card */}
                <div className="glass-card" style={{ padding: 24, marginBottom: 24 }}>
                  <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 20 }}>
                    <div style={{ width: 80, height: 50, background: '#1a0b2e', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800, color: 'rgba(124,58,237,0.5)', flexShrink: 0 }}>DML</div>
                    <div>
                      <h2 style={{ fontSize: 16, fontWeight: 700 }}>{project.title}</h2>
                      <p style={{ fontSize: 12, color: 'var(--text-muted)', fontFamily: 'monospace' }}>#{project.code}</p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-subtle)', paddingTop: 16 }}>
                    <span style={{ color: 'var(--text-muted)', fontSize: 14 }}>Total</span>
                    <span style={{ fontSize: 24, fontWeight: 900 }} className="gradient-text">{formatPrice(project.price)}</span>
                  </div>
                </div>

                {/* Step 1 QR */}
                <div className="qr-card glass-card" style={{ marginBottom: step === 'payment' ? 24 : 0 }}>
                  <p className="qr-card__title">Step 1 — Scan & Pay via UPI</p>
                  <div className="qr-code-wrap">
                    {/* QR placeholder */}
                    <div style={{ width: '100%', height: '100%', background: '#f0f0f0', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 4 }}>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 4, padding: 8 }}>
                        {Array.from({ length: 25 }).map((_, i) => (
                          <div key={i} style={{ width: 12, height: 12, background: Math.random() > 0.5 ? '#1a0b2e' : 'transparent', borderRadius: 2 }} />
                        ))}
                      </div>
                      <p style={{ fontSize: 8, color: '#666', textAlign: 'center' }}>Replace with your QR</p>
                    </div>
                  </div>
                  <p style={{ marginBottom: 12, fontSize: 13, color: 'var(--text-muted)' }}>Pay ₹{project.price} to:</p>
                  <button
                    className="upi-id"
                    onClick={copyUPI}
                    id="copy-upi-btn"
                    aria-label="Copy UPI ID"
                  >
                    {UPI_ID}
                    {copied ? <Check size={14} color="#22C55E" /> : <Copy size={14} />}
                  </button>
                  {copied && <p style={{ fontSize: 12, color: '#22C55E', marginTop: 8 }}>✓ Copied to clipboard!</p>}
                </div>

                {/* Step 1 → 2 button */}
                {step === 'payment' && (
                  <button
                    className="magnetic-btn"
                    style={{ width: '100%', marginTop: 16 }}
                    onClick={() => setStep('form')}
                    id="ive-paid-btn"
                  >
                    I&apos;ve Paid → Submit Proof
                  </button>
                )}
              </div>

              {/* Right: Form */}
              {step === 'form' && (
                <div>
                  <div className="glass-card" style={{ padding: 32 }}>
                    <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 24 }}>Step 2 — Submit Payment Proof</h2>

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                      <div className="form-group">
                        <label className="form-label" htmlFor="checkout-name">Full Name <span>*</span></label>
                        <input
                          id="checkout-name"
                          className="form-input"
                          placeholder="Rahul Sharma"
                          value={form.name}
                          onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))}
                        />
                        {errors.name && <p className="form-error">{errors.name}</p>}
                      </div>

                      <div className="form-group">
                        <label className="form-label" htmlFor="checkout-email">Email <span>*</span></label>
                        <input
                          id="checkout-email"
                          type="email"
                          className="form-input"
                          placeholder="you@example.com"
                          value={form.email}
                          onChange={(e) => setForm(f => ({ ...f, email: e.target.value }))}
                        />
                        {errors.email && <p className="form-error">{errors.email}</p>}
                      </div>

                      <div className="form-group">
                        <label className="form-label" htmlFor="checkout-phone">Phone <span>*</span></label>
                        <input
                          id="checkout-phone"
                          type="tel"
                          className="form-input"
                          placeholder="9876543210"
                          value={form.phone}
                          onChange={(e) => setForm(f => ({ ...f, phone: e.target.value }))}
                        />
                        {errors.phone && <p className="form-error">{errors.phone}</p>}
                      </div>

                      <div className="form-group">
                        <label className="form-label" htmlFor="checkout-project">Project Code</label>
                        <input
                          id="checkout-project"
                          className="form-input"
                          value={project.code}
                          readOnly
                          style={{ opacity: 0.6 }}
                        />
                      </div>

                      {/* Dropzone */}
                      <div className="form-group">
                        <label className="form-label">Payment Screenshot <span>*</span></label>
                        <div {...getRootProps()} className={`dropzone ${isDragActive ? 'dropzone--active' : ''}`} id="payment-screenshot-dropzone">
                          <input {...getInputProps()} id="payment-screenshot-input" aria-label="Upload payment screenshot" />
                          {file ? (
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                              {preview ? (
                                <img src={preview} alt="Preview" style={{ width: 60, height: 40, objectFit: 'cover', borderRadius: 6 }} />
                              ) : (
                                <div style={{ width: 60, height: 40, background: 'var(--bg-elevated)', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: 'var(--text-muted)' }}>PDF</div>
                              )}
                              <div>
                                <p style={{ fontSize: 14, color: 'var(--text-primary)' }}>{file.name}</p>
                                <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>{(file.size / 1024).toFixed(0)}KB</p>
                              </div>
                              <button
                                type="button"
                                onClick={(e) => { e.stopPropagation(); setFile(null); setPreview(null); }}
                                style={{ marginLeft: 'auto', color: 'var(--text-muted)', cursor: 'pointer' }}
                                aria-label="Remove file"
                              >
                                <X size={14} />
                              </button>
                            </div>
                          ) : (
                            <>
                              <Upload size={28} className="dropzone__icon" />
                              <p className="dropzone__text">{isDragActive ? 'Drop here' : 'Drag & drop or click to upload'}</p>
                              <p className="dropzone__hint">JPG, PNG, PDF — max 5MB</p>
                            </>
                          )}
                        </div>
                      </div>

                      <div className="form-group">
                        <label className="form-label" htmlFor="checkout-message">Message (optional)</label>
                        <textarea
                          id="checkout-message"
                          className="form-textarea"
                          placeholder="Any additional info..."
                          value={form.message}
                          onChange={(e) => setForm(f => ({ ...f, message: e.target.value }))}
                        />
                      </div>

                      <button
                        type="submit"
                        className="magnetic-btn"
                        disabled={submitting || !file}
                        id="submit-order-btn"
                        style={{ opacity: (!file || submitting) ? 0.6 : 1 }}
                      >
                        {submitting ? <><div className="spinner" />Submitting...</> : 'Submit Order →'}
                      </button>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
