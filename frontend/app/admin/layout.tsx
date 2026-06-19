'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard, Package, Tag, Video, ClipboardList,
  Users, Download, BarChart2, Settings, LogOut, Menu, X, Shield,
} from 'lucide-react';
import api from '@/lib/api';

const NAV_ITEMS = [
  { href: '/admin/dashboard', label: 'Dashboard',    icon: LayoutDashboard },
  { href: '/admin/projects',  label: 'Projects',     icon: Package },
  { href: '/admin/orders',    label: 'Orders',       icon: ClipboardList },
  { href: '/admin/downloads', label: 'Downloads',    icon: Download },
  { href: '/admin/analytics', label: 'Analytics',    icon: BarChart2 },
  { href: '/admin/settings',  label: 'Settings',     icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (pathname === '/admin/login') return <>{children}</>;

  const handleLogout = async () => {
    await api.post('/auth/admin/logout').catch(() => {});
    router.push('/admin/login');
  };

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'sidebar--open' : ''}`} role="navigation" aria-label="Admin navigation">
        <div className="sidebar__logo">
          <img src="/logo.png" alt="DebugMeLater Logo" style={{ height: 44, width: 'auto' }} />
          DebugMeLater
        </div>

        <nav className="sidebar__nav">
          {NAV_ITEMS.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={`sidebar__link ${pathname === href || pathname.startsWith(href + '/') ? 'sidebar__link--active' : ''}`}
              onClick={() => setSidebarOpen(false)}
              id={`nav-${label.toLowerCase()}`}
              aria-current={pathname === href ? 'page' : undefined}
            >
              <Icon size={16} />
              {label}
            </Link>
          ))}
        </nav>

        <div className="sidebar__logout">
          <button
            className="sidebar__link"
            style={{ width: '100%', cursor: 'pointer', color: 'var(--error)' }}
            onClick={handleLogout}
            id="admin-logout-btn"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="admin-main">
        {/* Header */}
        <header className="admin-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <button
              className="admin-hamburger navbar__hamburger"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-label="Toggle sidebar"
              id="sidebar-toggle"
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <div>
              <h1 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)' }}>
                {NAV_ITEMS.find(n => pathname.startsWith(n.href))?.label || 'Admin'}
              </h1>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Link href="/" target="_blank" style={{ fontSize: 13, color: 'var(--text-muted)' }}>View Site ↗</Link>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg, #7C3AED, #06B6D4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Shield size={16} color="white" />
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="admin-content">
          {children}
        </div>
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 99, backdropFilter: 'blur(4px)' }}
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}
      <style>{`
        .admin-hamburger {
          display: none !important;
        }
        @media (max-width: 1024px) {
          .admin-hamburger {
            display: flex !important;
          }
        }
      `}</style>
    </div>
  );
}
