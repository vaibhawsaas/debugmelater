'use client';

import { useState } from 'react';
import { Mail, Send, CheckCircle2, MessageSquare, ExternalLink } from 'lucide-react';
import AuroraBackground from '@/components/ui/AuroraBackground';
import MagneticButton from '@/components/ui/MagneticButton';

// Brand SVG Components to bypass Lucide brand deprecations
const GithubIcon = ({ size = 20, ...props }: { size?: number } & React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width={size} height={size} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const TwitterIcon = ({ size = 20, ...props }: { size?: number } & React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" {...props}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const YoutubeIcon = ({ size = 20, ...props }: { size?: number } & React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width={size} height={size} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" />
  </svg>
);

const InstagramIcon = ({ size = 20, ...props }: { size?: number } & React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width={size} height={size} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const LinkedinIcon = ({ size = 20, ...props }: { size?: number } & React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width={size} height={size} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const SOCIALS = [
  { icon: GithubIcon,    label: 'GitHub',    handle: '@debugmelater',      href: 'https://github.com', color: '#181717', glow: 'rgba(24, 23, 23, 0.15)' },
  { icon: TwitterIcon,   label: 'Twitter/X', handle: '@debugmelater',      href: 'https://twitter.com', color: '#1DA1F2', glow: 'rgba(29, 161, 242, 0.15)' },
  { icon: YoutubeIcon,   label: 'YouTube',   handle: 'DebugMeLater',       href: 'https://youtube.com', color: '#FF0000', glow: 'rgba(255, 0, 0, 0.15)' },
  { icon: InstagramIcon, label: 'Instagram', handle: '@debugmelater',      href: 'https://instagram.com', color: '#E1306C', glow: 'rgba(225, 48, 108, 0.15)' },
  { icon: LinkedinIcon,  label: 'LinkedIn',  handle: 'DebugMeLater',       href: 'https://linkedin.com', color: '#0A66C2', glow: 'rgba(10, 102, 194, 0.15)' },
  { icon: Mail,          label: 'Email Support', handle: 'hello@debugmelater.com', href: 'mailto:hello@debugmelater.com', color: '#7C3AED', glow: 'rgba(124, 90, 237, 0.15)' },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setTimeout(() => {
      setStatus('done');
      setForm({ name: '', email: '', message: '' });
    }, 1500); // Simulate API request duration
  };

  return (
    <div className="contact-section-wrap">
      <AuroraBackground />
      
      <div className="contact-container">
        {/* Responsive Grid */}
        <div className="contact-split-grid">
          
          {/* Left Column: Title & Info */}
          <div>
            <div className="contact-badge">
              // Get In Touch
            </div>
            
            <h1 className="contact-heading-main">
              Let&apos;s build something epic.
            </h1>
            
            <p className="contact-sub">
              Have questions about our premium templates, a custom development request, or just want to chat? Fill out the form or reach us directly.
            </p>

            {/* Direct Contact Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <a 
                href="mailto:hello@debugmelater.com" 
                className="contact-direct-link"
                id="contact-email-card"
                aria-label="Email hello@debugmelater.com"
              >
                <div className="contact-icon-box" style={{ background: 'rgba(124, 90, 237, 0.08)', border: '1px solid rgba(124, 90, 237, 0.2)' }}>
                  <Mail size={20} style={{ color: 'var(--accent-purple)' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 2 }}>General Enquiries</p>
                  <p style={{ fontSize: 16, fontWeight: 800, color: 'var(--text-primary)' }}>hello@debugmelater.com</p>
                </div>
                <ExternalLink size={14} style={{ color: 'var(--text-muted)' }} />
              </a>

              <a 
                href="https://twitter.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="contact-direct-link"
                id="contact-support-card"
                aria-label="Direct support via Twitter"
              >
                <div className="contact-icon-box" style={{ background: 'rgba(29, 161, 242, 0.08)', border: '1px solid rgba(29, 161, 242, 0.2)' }}>
                  <MessageSquare size={20} style={{ color: '#1DA1F2' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 2 }}>Twitter / X DMs</p>
                  <p style={{ fontSize: 16, fontWeight: 800, color: 'var(--text-primary)' }}>@debugmelater</p>
                </div>
                <ExternalLink size={14} style={{ color: 'var(--text-muted)' }} />
              </a>
            </div>

            {/* Social Grid */}
            <div style={{ marginTop: 48 }}>
              <h3 style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', marginBottom: 20 }}>Connect with us</h3>
              <div className="social-grid-premium">
                {SOCIALS.map(({ icon: Icon, label, handle, href, color, glow }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-card-premium"
                    id={`social-${label.toLowerCase().replace(/[^a-z]/g, '')}`}
                    aria-label={`Find us on ${label}: ${handle}`}
                  >
                    <div className="contact-icon-box" style={{ width: 36, height: 36, borderRadius: 8, background: glow, border: `1px solid ${color}30` }}>
                      <Icon size={16} style={{ color }} />
                    </div>
                    <div style={{ overflow: 'hidden' }}>
                      <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 1 }}>{label}</p>
                      <p style={{ fontSize: 11, color: 'var(--text-muted)', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{handle}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form Card */}
          <div>
            <div className="contact-card-premium">
              {status === 'done' ? (
                <div className="contact-success-wrap">
                  <div className="contact-success-circle">
                    <CheckCircle2 size={36} />
                  </div>
                  <h3 className="contact-success-title">Message Received!</h3>
                  <p className="contact-success-text">
                    Thank you for reaching out. We&apos;ve received your request and our team will get back to you within 24 hours.
                  </p>
                  <button 
                    type="button" 
                    className="magnetic-btn" 
                    onClick={() => setStatus('idle')}
                    style={{ width: '100%', justifyContent: 'center' }}
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <>
                  <div className="contact-card-header">
                    <h2 className="contact-card-title">Send a Message</h2>
                    <p className="contact-card-desc">Need a custom feature, template, or order help? Drop a line below.</p>
                  </div>
                  
                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
                    <div className="contact-input-wrap">
                      <label className="contact-input-label" htmlFor="contact-name">Name <span>*</span></label>
                      <input 
                        id="contact-name" 
                        className="contact-field-style" 
                        placeholder="Your name" 
                        required
                        value={form.name} 
                        onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))} 
                      />
                    </div>
                    
                    <div className="contact-input-wrap">
                      <label className="contact-input-label" htmlFor="contact-email">Email Address <span>*</span></label>
                      <input 
                        id="contact-email" 
                        type="email" 
                        className="contact-field-style" 
                        placeholder="you@example.com" 
                        required
                        value={form.email} 
                        onChange={(e) => setForm(f => ({ ...f, email: e.target.value }))} 
                      />
                    </div>
                    
                    <div className="contact-input-wrap" style={{ marginBottom: 32 }}>
                      <label className="contact-input-label" htmlFor="contact-message">Message <span>*</span></label>
                      <textarea 
                        id="contact-message" 
                        className="contact-field-style contact-textarea-style" 
                        placeholder="Tell us what you are working on or what you need..." 
                        required 
                        value={form.message} 
                        onChange={(e) => setForm(f => ({ ...f, message: e.target.value }))} 
                      />
                    </div>
                    
                    <MagneticButton 
                      type="submit" 
                      disabled={status === 'sending'} 
                      id="send-message-btn"
                      className="cta-btn"
                    >
                      {status === 'sending' ? (
                        <>
                          <div className="spinner" style={{ marginRight: 8 }} />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send size={14} />
                          Send Message
                        </>
                      )}
                    </MagneticButton>
                  </form>
                </>
              )}
            </div>
          </div>
          
        </div>
      </div>

      <style>{`
        .contact-section-wrap {
          position: relative;
          overflow: hidden;
          padding: clamp(100px, 12vw, 160px) 0 clamp(60px, 10vw, 120px);
          min-height: 100vh;
          display: flex;
          align-items: center;
        }
        .contact-container {
          max-width: var(--container, 1280px);
          width: 100%;
          margin: 0 auto;
          padding: 0 24px;
          position: relative;
          z-index: 2;
        }
        .contact-split-grid {
          display: grid;
          grid-template-columns: 1.15fr 1fr;
          gap: 64px;
          align-items: center;
        }
        @media (max-width: 1024px) {
          .contact-split-grid {
            grid-template-columns: 1fr;
            gap: 56px;
          }
        }
        .contact-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 14px;
          border-radius: 100px;
          background: rgba(139, 92, 246, 0.08);
          border: 1px solid rgba(139, 92, 246, 0.2);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.15em;
          color: var(--accent-purple);
          margin-bottom: 20px;
          text-transform: uppercase;
        }
        .contact-heading-main {
          font-size: clamp(38px, 5.5vw, 60px);
          font-weight: 900;
          line-height: 1.1;
          letter-spacing: -0.03em;
          margin-bottom: 20px;
          background: linear-gradient(135deg, #0F172A 0%, #334155 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .contact-sub {
          font-size: 16px;
          color: var(--text-secondary);
          line-height: 1.7;
          margin-bottom: 36px;
          max-width: 520px;
        }
        .contact-card-premium {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(15, 23, 42, 0.08);
          box-shadow: 0 30px 60px rgba(15, 23, 42, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.6);
          border-radius: 24px;
          padding: 40px;
          transition: all 0.3s var(--ease-smooth);
        }
        @media (max-width: 640px) {
          .contact-card-premium {
            padding: 24px;
          }
        }
        .contact-card-premium:hover {
          box-shadow: 0 35px 70px rgba(15, 23, 42, 0.06);
          border-color: rgba(139, 92, 246, 0.15);
        }
        .contact-card-header {
          margin-bottom: 28px;
        }
        .contact-card-title {
          font-size: 24px;
          font-weight: 800;
          margin-bottom: 8px;
          color: var(--text-primary);
        }
        .contact-card-desc {
          font-size: 14px;
          color: var(--text-secondary);
          line-height: 1.5;
        }
        .contact-input-wrap {
          position: relative;
          margin-bottom: 20px;
        }
        .contact-input-label {
          display: block;
          font-size: 13px;
          font-weight: 600;
          color: var(--text-secondary);
          margin-bottom: 8px;
        }
        .contact-input-label span {
          color: var(--error);
          margin-left: 2px;
        }
        .contact-field-style {
          background: rgba(255, 255, 255, 0.6);
          border: 1px solid rgba(15, 23, 42, 0.12);
          border-radius: 12px;
          padding: 12px 16px;
          font-size: 14px;
          color: var(--text-primary);
          width: 100%;
          outline: none;
          transition: all 0.3s var(--ease-smooth);
          box-shadow: 0 2px 4px rgba(15, 23, 42, 0.01);
        }
        .contact-field-style:focus {
          background: #ffffff;
          border-color: var(--accent-purple);
          box-shadow: 0 0 0 4px rgba(139, 92, 246, 0.12);
        }
        .contact-textarea-style {
          resize: vertical;
          min-height: 140px;
        }
        .contact-direct-link {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 18px 20px;
          border-radius: 16px;
          background: rgba(255, 255, 255, 0.65);
          border: 1px solid rgba(15, 23, 42, 0.06);
          transition: all 0.3s var(--ease-smooth);
          cursor: none;
        }
        .contact-direct-link:hover {
          transform: translateY(-2px);
          background: rgba(255, 255, 255, 0.95);
          border-color: rgba(139, 92, 246, 0.2);
          box-shadow: 0 12px 24px -10px rgba(139, 92, 246, 0.12);
        }
        .contact-icon-box {
          width: 44px;
          height: 44px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: all 0.3s;
        }
        .contact-direct-link:hover .contact-icon-box {
          transform: scale(1.05);
        }
        .social-grid-premium {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }
        @media (max-width: 640px) {
          .social-grid-premium {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 420px) {
          .social-grid-premium {
            grid-template-columns: 1fr;
          }
        }
        .social-card-premium {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.65);
          border: 1px solid rgba(15, 23, 42, 0.06);
          transition: all 0.3s var(--ease-smooth);
          cursor: none;
        }
        .social-card-premium:hover {
          transform: translateY(-2px);
          background: rgba(255, 255, 255, 0.95);
          box-shadow: 0 10px 20px -8px rgba(0, 0, 0, 0.05);
        }
        .contact-success-wrap {
          text-align: center;
          padding: 30px 0;
        }
        .contact-success-circle {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: rgba(34, 197, 94, 0.1);
          border: 1px solid rgba(34, 197, 94, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
          color: var(--success);
          box-shadow: 0 10px 25px -5px rgba(34, 197, 94, 0.15);
        }
        .contact-success-title {
          font-size: 22px;
          font-weight: 800;
          margin-bottom: 12px;
          background: linear-gradient(135deg, #10B981 0%, #059669 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .contact-success-text {
          font-size: 14px;
          color: var(--text-secondary);
          margin-bottom: 28px;
          line-height: 1.6;
        }
        .contact-card-premium .magnetic-btn {
          width: 100%;
          justify-content: center;
        }
      `}</style>
    </div>
  );
}
