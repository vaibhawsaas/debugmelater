'use client';

import { useState } from 'react';
import { Play, X } from 'lucide-react';
import { getYoutubeThumbnail, getYoutubeEmbedUrl } from '@/lib/utils';

const SAMPLE_VIDEOS = [
  { id: 'v1', title: '3D Portfolio Template — Full Preview', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', duration: '3:24' },
  { id: 'v2', title: 'SaaS Dashboard Dark Theme Walkthrough', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', duration: '4:12' },
  { id: 'v3', title: 'Next.js Landing Page with GSAP', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', duration: '2:55' },
  { id: 'v4', title: 'Three.js Particle Hero — Build Process', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', duration: '5:30' },
  { id: 'v5', title: 'Glassmorphism Admin Panel Tour', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', duration: '3:48' },
  { id: 'v6', title: 'Creative Agency Website — Behind the Code', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', duration: '6:15' },
];

// Unique gradient thumbnails for each video
const THUMB_GRADIENTS = [
  'from-purple-900 to-blue-900',
  'from-blue-900 to-cyan-900',
  'from-violet-900 to-purple-900',
  'from-cyan-900 to-blue-800',
  'from-purple-800 to-violet-900',
  'from-blue-800 to-purple-900',
];

export default function VideoSection() {
  const [modalUrl, setModalUrl] = useState<string | null>(null);

  return (
    <section className="section" id="videos" aria-labelledby="videos-heading">
      <div className="container">
        <div className="section__header">
          <p className="section__eyebrow">Live Previews</p>
          <h2 className="section__title" id="videos-heading">See It Before You Buy</h2>
          <p className="section__subtitle">Every template has a full demo video so you know exactly what you're getting.</p>
        </div>

        <div className="marquee-wrapper">
          <div className="marquee-track" style={{ gap: '16px', animationDuration: '40s' }} role="list">
            {[...SAMPLE_VIDEOS, ...SAMPLE_VIDEOS, ...SAMPLE_VIDEOS].map((video, i) => (
              <div
                key={`${video.id}-${i}`}
                className="video-card"
                role="listitem"
                aria-label={video.title}
              >
                <div className="video-card__thumb">
                  {/* Gradient placeholder thumb */}
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      background: i % 2 === 0
                        ? 'linear-gradient(135deg, #1e1b4b, #1e3a5f)'
                        : 'linear-gradient(135deg, #1a0533, #1e3a5f)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '28px',
                      fontWeight: 900,
                      color: 'rgba(124,58,237,0.4)',
                      fontFamily: 'Inter, sans-serif',
                      letterSpacing: '-0.02em',
                    }}
                    aria-hidden="true"
                  >
                    DML
                  </div>

                  <div className="video-card__play">
                    <button
                      className="video-card__play-btn"
                      onClick={() => setModalUrl(video.url)}
                      aria-label={`Play: ${video.title}`}
                      id={`play-video-${video.id}-${i}`}
                    >
                      <Play size={18} fill="currentColor" />
                    </button>
                  </div>
                  <span className="video-card__duration">{video.duration}</span>
                </div>

                <div className="video-card__body">
                  <h3 className="video-card__title">{video.title}</h3>
                  <button
                    className="video-card__link"
                    onClick={() => setModalUrl(video.url)}
                  >
                    Watch Demo →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {modalUrl && (
        <div
          className="modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Video player"
          onClick={(e) => { if (e.target === e.currentTarget) setModalUrl(null); }}
        >
          <div className="modal-content" style={{ position: 'relative' }}>
            <button
              className="modal-close"
              onClick={() => setModalUrl(null)}
              aria-label="Close video"
              id="modal-close-btn"
            >
              <X size={18} />
            </button>
            <iframe
              className="modal-iframe"
              src={getYoutubeEmbedUrl(modalUrl)}
              title="Video preview"
              allow="autoplay; fullscreen"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </section>
  );
}
