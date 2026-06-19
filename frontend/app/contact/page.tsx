'use client';

import { useState } from 'react';
import { Link as GithubIcon, MessageCircle as TwitterIcon, Video as YoutubeIcon, Camera as InstagramIcon, Briefcase as LinkedinIcon, Mail, Send } from 'lucide-react';
import api from '@/lib/api';

const SOCIALS = [
  { icon: GithubIcon,    label: 'GitHub',    handle: '@debugmelater',      href: 'https://github.com', color: '#ffffff' },
  { icon: TwitterIcon,   label: 'Twitter/X', handle: '@debugmelater',      href: 'https://twitter.com', color: '#1DA1F2' },
  { icon: YoutubeIcon,   label: 'YouTube',   handle: 'DebugMeLater',       href: 'https://youtube.com', color: '#FF0000' },
  { icon: InstagramIcon, label: 'Instagram', handle: '@debugmelater',      href: 'https://instagram.com', color: '#E1306C' },
  { icon: LinkedinIcon,  label: 'LinkedIn',  handle: 'DebugMeLater',       href: 'https://linkedin.com', color: '#0A66C2' },
  { icon: Mail,      label: 'Email',     handle: 'hello@debugmelater.com', href: 'mailto:hello@debugmelater.com', color: '#7C3AED' },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setTimeout(() => setStatus('done'), 1500); // Mock
  };

  return (
    <div style={{ paddingTop: 64 }}>
      <div className="section">
        <div className="container">
          {/* Hero */}
          <div style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto 64px' }}>
            <p className="section__eyebrow">Reach Out</p>
            <h1 className="section__title">Get In Touch</h1>
            <p className="section__subtitle" style={{ margin: '16px auto 0' }}>
              Have questions about a project, a custom request, or just want to say hi? We&apos;d love to hear from you.
            </p>
          </div>

          {/* Social cards */}
          <div className="contact-socials-grid" style={{ marginBottom: 64 }}>
            {SOCIALS.map(({ icon: Icon, label, handle, href, color }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-social-card glass-card"
                id={`social-${label.toLowerCase().replace(/[^a-z]/g, '')}`}
                aria-label={`Find us on ${label}: ${handle}`}
              >
                <div style={{ width: 48, height: 48, borderRadius: 12, background: `${color}20`, border: `1px solid ${color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon size={22} style={{ color }} />
                </div>
                <div>
                  <p style={{ fontWeight: 700, fontSize: 15, color: 'var(--text-primary)', marginBottom: 2 }}>{label}</p>
                  <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>{handle}</p>
                </div>
              </a>
            ))}
          </div>

          {/* Contact form */}
          <div style={{ maxWidth: 560, margin: '0 auto' }}>
            <div className="glass-card" style={{ padding: 40 }}>
              <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>Custom Request?</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: 14, marginBottom: 32 }}>Need a custom template, consulting, or have a question about an order?</p>

              {status === 'done' ? (
                <div style={{ textAlign: 'center', padding: '32px 0' }}>
                  <div style={{ fontSize: 48, marginBottom: 16 }}>✉️</div>
                  <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }} className="gradient-text">Message Sent!</h3>
                  <p style={{ color: 'var(--text-muted)' }}>We&apos;ll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  <div className="form-group">
                    <label className="form-label" htmlFor="contact-name">Name <span>*</span></label>
                    <input id="contact-name" className="form-input" placeholder="Your name" required
                      value={form.name} onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))} />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="contact-email">Email <span>*</span></label>
                    <input id="contact-email" type="email" className="form-input" placeholder="you@example.com" required
                      value={form.email} onChange={(e) => setForm(f => ({ ...f, email: e.target.value }))} />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="contact-message">Message <span>*</span></label>
                    <textarea id="contact-message" className="form-textarea" placeholder="Tell us what you need..." required style={{ minHeight: 140 }}
                      value={form.message} onChange={(e) => setForm(f => ({ ...f, message: e.target.value }))} />
                  </div>
                  <button type="submit" className="magnetic-btn" disabled={status === 'sending'} id="send-message-btn">
                    {status === 'sending' ? <><div className="spinner" />Sending...</> : <><Send size={14} /> Send Message</>}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
