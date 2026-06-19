'use client';

import { useState } from 'react';
import { Play, X, CheckCircle2 } from 'lucide-react';
import { getYoutubeEmbedUrl } from '@/lib/utils';
import Image from 'next/image';

const FILTERS = ["All", "React Templates", "Next.js Build", "Dashboards", "Landing Pages", "Full Stack", "Tutorials", "Speed Builds", "UI/UX"];

const VIDEOS = [
  { id: 'v1', title: 'Building a SaaS Dashboard from Scratch in Next.js', author: 'DebugMeLater', views: '14K', time: '2 days ago', duration: '45:20', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', verified: true, thumbColor: '#3B82F6' },
  { id: 'v2', title: 'The Ultimate 3D Portfolio Tutorial (Three.js)', author: 'DebugMeLater', views: '8.2K', time: '1 week ago', duration: '1:12:05', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', verified: true, thumbColor: '#7C3AED' },
  { id: 'v3', title: 'Why I stopped using Tailwind for this project...', author: 'DML React Team', views: '22K', time: '3 weeks ago', duration: '12:34', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', verified: false, thumbColor: '#06B6D4' },
  { id: 'v4', title: 'Framer Motion: Bouncy UI Animations Masterclass', author: 'DebugMeLater', views: '5.1K', time: '1 month ago', duration: '28:15', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', verified: true, thumbColor: '#F43F5E' },
  { id: 'v5', title: 'Setup our E-Commerce Template in 5 Minutes', author: 'DebugMeLater Docs', views: '1.2K', time: '2 days ago', duration: '05:45', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', verified: false, thumbColor: '#10B981' },
  { id: 'v6', title: 'Creative Agency Website Template Walkthrough', author: 'DebugMeLater', views: '3.4K', time: '2 months ago', duration: '18:50', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', verified: true, thumbColor: '#F59E0B' },
  { id: 'v7', title: 'Authentication in Next.js 14 App Router', author: 'DML Backend', views: '19K', time: '3 months ago', duration: '32:10', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', verified: false, thumbColor: '#6366F1' },
  { id: 'v8', title: '10 Beautiful React Components you can copy/paste', author: 'DebugMeLater', views: '45K', time: '4 months ago', duration: '15:20', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', verified: true, thumbColor: '#EC4899' },
  { id: 'v9', title: 'Deploying your SaaS template to Vercel', author: 'DebugMeLater Docs', views: '6.7K', time: '5 months ago', duration: '08:12', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', verified: false, thumbColor: '#8B5CF6' },
  { id: 'v10', title: 'Web3 / Crypto Dashboard Template Demo', author: 'DebugMeLater', views: '11K', time: '6 months ago', duration: '22:40', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', verified: true, thumbColor: '#EAB308' },
  { id: 'v11', title: 'Speed Build: Landing Page in 10 minutes', author: 'DebugMeLater', views: '88K', time: '7 months ago', duration: '10:05', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', verified: true, thumbColor: '#14B8A6' },
  { id: 'v12', title: 'Integrating Stripe Subscriptions into the StarterKit', author: 'DML Backend', views: '14K', time: '8 months ago', duration: '41:30', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', verified: false, thumbColor: '#3B82F6' },
];

export default function VideosPage() {
  const [modalUrl, setModalUrl] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState("All");

  return (
    <main style={{ paddingTop: '100px', minHeight: '100vh', background: 'var(--bg-primary)' }}>
      <div className="container" style={{ padding: '0 24px', maxWidth: '1400px' }}>
        
        {/* Filters Bar */}
        <div style={{ 
          display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '16px', 
          scrollbarWidth: 'none', marginBottom: '24px', borderBottom: '1px solid var(--border-subtle)'
        }}>
          {FILTERS.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: 500,
                whiteSpace: 'nowrap',
                background: activeFilter === filter ? 'var(--text-primary)' : 'var(--bg-secondary)',
                color: activeFilter === filter ? 'var(--bg-primary)' : 'var(--text-secondary)',
                border: '1px solid',
                borderColor: activeFilter === filter ? 'transparent' : 'var(--border-subtle)',
                transition: 'all 0.2s',
                cursor: 'pointer'
              }}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Video Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '32px 20px',
          paddingBottom: '80px'
        }}>
          {VIDEOS.map((video) => (
            <div key={video.id} style={{ cursor: 'pointer' }} onClick={() => setModalUrl(video.url)}>
              {/* Thumbnail */}
              <div style={{ 
                width: '100%', aspectRatio: '16/9', borderRadius: '12px', overflow: 'hidden', 
                position: 'relative', marginBottom: '12px', background: `linear-gradient(135deg, ${video.thumbColor}40, var(--bg-secondary))`
              }}>
                <div style={{ 
                  position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', 
                  fontSize: '32px', fontWeight: 800, color: video.thumbColor, opacity: 0.5, fontFamily: 'Inter, sans-serif', letterSpacing: '-0.02em'
                }}>
                  DML
                </div>
                
                {/* Duration Badge */}
                <div style={{
                  position: 'absolute', bottom: '8px', right: '8px', background: 'rgba(0,0,0,0.8)',
                  color: 'white', padding: '3px 6px', borderRadius: '4px', fontSize: '12px', fontWeight: 600, fontFamily: 'JetBrains Mono, monospace'
                }}>
                  {video.duration}
                </div>

                {/* Hover Play Button Overlay */}
                <div style={{
                  position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  opacity: 0, transition: 'opacity 0.2s'
                }} 
                onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                onMouseLeave={(e) => e.currentTarget.style.opacity = '0'}
                >
                  <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--accent-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', boxShadow: '0 4px 12px rgba(59,130,246,0.4)' }}>
                    <Play size={20} fill="currentColor" />
                  </div>
                </div>
              </div>

              {/* Video Info */}
              <div style={{ display: 'flex', gap: '12px' }}>
                {/* Channel Avatar */}
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: video.thumbColor, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: '14px' }}>
                  {video.author.charAt(0)}
                </div>
                
                {/* Text Content */}
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-primary)', lineHeight: '1.4', marginBottom: '4px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {video.title}
                  </h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '2px' }}>
                    {video.author}
                    {video.verified && <CheckCircle2 size={14} color="var(--text-secondary)" />}
                  </div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '13px' }}>
                    {video.views} views • {video.time}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Modal Popup */}
      {modalUrl && (
        <div
          style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}
          onClick={(e) => { if (e.target === e.currentTarget) setModalUrl(null); }}
        >
          <div style={{ width: '100%', maxWidth: '1000px', aspectRatio: '16/9', background: '#000', borderRadius: '16px', overflow: 'hidden', position: 'relative', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}>
            <button
              onClick={() => setModalUrl(null)}
              style={{ position: 'absolute', top: '16px', right: '16px', width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', cursor: 'pointer', zIndex: 10, backdropFilter: 'blur(4px)' }}
            >
              <X size={20} />
            </button>
            <iframe
              style={{ width: '100%', height: '100%', border: 'none' }}
              src={getYoutubeEmbedUrl(modalUrl)}
              allow="autoplay; fullscreen"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </main>
  );
}
