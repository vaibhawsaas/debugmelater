'use client';

import { useRef, useState, MouseEvent, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { Heart, Eye, ShoppingCart } from 'lucide-react';
import { IProject } from '@/types';
import { formatPrice } from '@/lib/utils';

interface ProjectCardProps {
  project: IProject;
}

const BADGE_COLORS = ['badge--purple', 'badge--blue', 'badge--cyan'];

export default function ProjectCard({ project }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [wishlisted, setWishlisted] = useState(false);
  const [tiltStyle, setTiltStyle] = useState({});

  // Fix hydration issues by only checking auth after mount
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleBuyClick = (e: React.MouseEvent) => {
    if (isClient && !isAuthenticated) {
      e.preventDefault();
      router.push('/login');
    }
  };

  const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card || window.matchMedia('(hover: none)').matches) return;

    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    setTiltStyle({
      transform: `perspective(1000px) rotateX(${-y * 12}deg) rotateY(${x * 12}deg) translateZ(20px)`,
      boxShadow: `${-x * 20}px ${y * 20}px 40px rgba(124,58,237,0.25), 0 0 0 1px rgba(124,58,237,0.3)`,
    });
  };

  const onMouseLeave = () => {
    setTiltStyle({
      transform: 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)',
      boxShadow: '',
      transition: 'transform 0.5s cubic-bezier(0.4,0,0.2,1), box-shadow 0.5s cubic-bezier(0.4,0,0.2,1)',
    });
    // Remove transition after completion
    setTimeout(() => setTiltStyle({}), 500);
  };

  const mainImage = project.images?.main || '/placeholder-project.png';

  return (
    <div
      ref={cardRef}
      className="project-card"
      style={tiltStyle}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      role="article"
      aria-label={project.title}
    >
      {/* Image */}
      <div className="project-card__img-wrap">
        <img
          src={mainImage}
          alt={`${project.title} preview`}
          className="project-card__img"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              `https://placehold.co/640x360/0F1118/7C3AED?text=${encodeURIComponent(project.title)}`;
          }}
        />
        {/* Wishlist */}
        <button
          className={`project-card__wishlist ${wishlisted ? 'project-card__wishlist--active' : ''}`}
          onClick={() => setWishlisted(!wishlisted)}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          id={`wishlist-${project._id}`}
        >
          <Heart size={14} fill={wishlisted ? '#EF4444' : 'none'} />
        </button>
      </div>

      {/* Body */}
      <div className="project-card__body">
        {/* Badges */}
        <div className="project-card__badges">
          <span className={`badge ${BADGE_COLORS[0]}`}>{project.category}</span>
          {project.technologies?.slice(0, 1).map((tech, i) => (
            <span key={tech} className={`badge ${BADGE_COLORS[(i + 1) % BADGE_COLORS.length]}`}>{tech}</span>
          ))}
        </div>

        {/* Title */}
        <h3 className="project-card__title">{project.title}</h3>
        <p className="project-card__code">#{project.code}</p>

        {/* Description */}
        <p className="project-card__desc">{project.shortDescription}</p>

        {/* Tech tags */}
        <div className="project-card__techs">
          {project.technologies?.slice(0, 4).map((tech) => (
            <span key={tech} className="tech-tag">{tech}</span>
          ))}
        </div>

        {/* Footer */}
        <div className="project-card__footer">
          <span className="project-card__price">{formatPrice(project.price)}</span>
          <div className="project-card__actions">
            {project.youtubeUrl && (
              <a
                href={project.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-sm btn-sm--outline"
                aria-label={`Preview ${project.title}`}
                id={`preview-${project._id}`}
              >
                <Eye size={12} />
                Preview
              </a>
            )}
            <Link
              href={`/checkout/${project._id}`}
              onClick={handleBuyClick}
              className="btn-sm btn-sm--primary cta-btn"
              aria-label={`Buy ${project.title}`}
              id={`buy-${project._id}`}
            >
              <ShoppingCart size={12} />
              Buy
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProjectCardSkeleton() {
  return (
    <div className="project-card" style={{ pointerEvents: 'none' }}>
      {/* Skeleton Image */}
      <div className="project-card__img-wrap" style={{ background: 'var(--surface)', animation: 'pulse 2s infinite' }}>
        <div style={{ width: '100%', height: '100%', backgroundColor: 'rgba(255, 255, 255, 0.05)' }} />
      </div>

      <div className="project-card__body">
        {/* Badges Skeleton */}
        <div className="project-card__badges">
          <div className="badge" style={{ width: '60px', height: '24px', background: 'rgba(255,255,255,0.05)', animation: 'pulse 2s infinite' }} />
          <div className="badge" style={{ width: '80px', height: '24px', background: 'rgba(255,255,255,0.05)', animation: 'pulse 2s infinite' }} />
        </div>

        {/* Title Skeleton */}
        <div style={{ width: '80%', height: '24px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', marginTop: '12px', animation: 'pulse 2s infinite' }} />
        <div style={{ width: '40%', height: '16px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', marginTop: '8px', animation: 'pulse 2s infinite' }} />

        {/* Desc Skeleton */}
        <div style={{ width: '100%', height: '14px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', marginTop: '16px', animation: 'pulse 2s infinite' }} />
        <div style={{ width: '90%', height: '14px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', marginTop: '8px', animation: 'pulse 2s infinite' }} />
        <div style={{ width: '60%', height: '14px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', marginTop: '8px', animation: 'pulse 2s infinite' }} />

        {/* Techs Skeleton */}
        <div className="project-card__techs" style={{ marginTop: '20px' }}>
          <div className="tech-tag" style={{ width: '50px', height: '24px', background: 'rgba(255,255,255,0.05)', animation: 'pulse 2s infinite' }} />
          <div className="tech-tag" style={{ width: '70px', height: '24px', background: 'rgba(255,255,255,0.05)', animation: 'pulse 2s infinite' }} />
          <div className="tech-tag" style={{ width: '40px', height: '24px', background: 'rgba(255,255,255,0.05)', animation: 'pulse 2s infinite' }} />
        </div>

        {/* Footer Skeleton */}
        <div className="project-card__footer" style={{ marginTop: '24px' }}>
          <div style={{ width: '80px', height: '24px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', animation: 'pulse 2s infinite' }} />
          <div className="project-card__actions">
            <div style={{ width: '80px', height: '32px', background: 'rgba(255,255,255,0.05)', borderRadius: '6px', animation: 'pulse 2s infinite' }} />
            <div style={{ width: '80px', height: '32px', background: 'rgba(124, 58, 237, 0.3)', borderRadius: '6px', animation: 'pulse 2s infinite' }} />
          </div>
        </div>
      </div>
    </div>
  );
}
