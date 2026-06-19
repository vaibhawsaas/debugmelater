'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { Menu, X, Search, Shield, User, LogOut, LogIn } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/categories', label: 'Categories' },
  { href: '/videos', label: 'Videos' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  // Auth store
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  // Hydration fix for Zustand
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`} role="banner">
        <div className="navbar__inner">
          {/* Logo */}
          <Link href="/" className="navbar__logo" aria-label="DebugMeLater Home">
            <img src="/logo.png" alt="DebugMeLater Logo" style={{ height: 48, width: 'auto' }} />
            <span className="navbar__wordmark">DebugMeLater</span>
          </Link>

          {/* Desktop nav */}
          <nav className="navbar__nav" aria-label="Main navigation">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="navbar__link">
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="navbar__actions">
            <button
              className="navbar__icon-btn"
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label="Search"
              id="search-toggle"
            >
              <Search size={18} />
            </button>

            {/* Auth Buttons */}
            {isClient && isAuthenticated ? (
              <>
                {user?.role === 'ADMIN' ? (
                  <Link href="/admin/dashboard" className="navbar__admin-btn cta-btn" id="admin-panel-btn">
                    <Shield size={14} />
                    <span>Admin</span>
                  </Link>
                ) : (
                  <div className="navbar__admin-btn cta-btn" style={{ background: 'var(--bg-hover)', color: 'var(--text-primary)', border: '1px solid var(--border-subtle)' }}>
                    <User size={14} />
                    <span>{user?.email.split('@')[0]}</span>
                  </div>
                )}
                <button onClick={() => logout()} className="navbar__icon-btn" aria-label="Logout" title="Logout" style={{ marginLeft: '8px' }}>
                  <LogOut size={18} />
                </button>
              </>
            ) : (
              isClient && (
                <div style={{ display: 'flex', gap: '8px' }}>
                  <Link href="/login" className="navbar__icon-btn" style={{ fontSize: '14px', fontWeight: 500, padding: '0 12px', width: 'auto', borderRadius: '8px' }}>
                    Login
                  </Link>
                  <Link href="/register" className="navbar__admin-btn cta-btn" style={{ background: 'var(--text-primary)', color: '#FFF' }}>
                    <span>Register</span>
                  </Link>
                </div>
              )
            )}

            {/* Hamburger */}
            <button
              className="navbar__hamburger"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              id="mobile-menu-toggle"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Search bar */}
        {searchOpen && (
          <div className="navbar__search">
            <div className="navbar__search-inner">
              <Search size={16} className="navbar__search-icon" />
              <input
                ref={searchRef}
                type="search"
                placeholder="Search projects..."
                className="navbar__search-input"
                id="global-search"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    window.location.href = `/projects?search=${encodeURIComponent((e.target as HTMLInputElement).value)}`;
                  }
                  if (e.key === 'Escape') setSearchOpen(false);
                }}
              />
            </div>
          </div>
        )}
      </header>

      {/* Mobile overlay menu */}
      <div className={`mobile-menu ${mobileOpen ? 'mobile-menu--open' : ''}`} role="dialog" aria-modal="true" aria-label="Mobile navigation">
        <nav className="mobile-menu__nav">
          {NAV_LINKS.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              className="mobile-menu__link"
              style={{ animationDelay: `${i * 0.07}s` }}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/admin/dashboard" className="mobile-menu__admin" onClick={() => setMobileOpen(false)}>
            <Shield size={16} /> Admin Panel
          </Link>
        </nav>
      </div>
    </>
  );
}
