'use client';

import Link from 'next/link';
import { Link as GithubIcon, MessageCircle as TwitterIcon, Video as YoutubeIcon, Camera as InstagramIcon, Briefcase as LinkedinIcon, Mail } from 'lucide-react';

const FOOTER_LINKS = {
  Products: [
    { label: 'All Projects', href: '/projects' },
    { label: 'Categories', href: '/categories' },
    { label: 'Videos', href: '/videos' },
  ],
  Company: [
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Admin Panel', href: '/admin/dashboard' },
  ],
  Categories: [
    { label: 'Portfolio', href: '/projects?category=Portfolio' },
    { label: '3D Websites', href: '/projects?category=3D+Websites' },
    { label: 'SaaS Dashboard', href: '/projects?category=SaaS+Dashboard' },
    { label: 'Next.js', href: '/projects?category=Next.js' },
  ],
};

const SOCIALS = [
  { icon: GithubIcon, href: 'https://github.com', label: 'GitHub' },
  { icon: TwitterIcon, href: 'https://twitter.com', label: 'Twitter' },
  { icon: YoutubeIcon, href: 'https://youtube.com', label: 'YouTube' },
  { icon: InstagramIcon, href: 'https://instagram.com', label: 'Instagram' },
  { icon: LinkedinIcon, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:hello@debugmelater.com', label: 'Email' },
];

export default function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="footer__inner">
        {/* Brand */}
        <div className="footer__brand">
          <Link href="/" className="footer__logo">
            <img src="/logo.png" alt="DebugMeLater Logo" style={{ height: 56, width: 'auto' }} />
            <span>DebugMeLater</span>
          </Link>
          <p className="footer__tagline">
            Premium 3D Websites & Source Code Marketplace.<br />
            Where code becomes craft.
          </p>
          {/* Socials */}
          <div className="footer__socials">
            {SOCIALS.map(({ icon: Icon, href, label }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="footer__social" aria-label={label}>
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* Links */}
        {Object.entries(FOOTER_LINKS).map(([category, links]) => (
          <div key={category} className="footer__col">
            <h3 className="footer__col-title">{category}</h3>
            <ul className="footer__col-links">
              {links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="footer__col-link">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="footer__bottom">
        <p className="footer__copy">
          © {new Date().getFullYear()} DebugMeLater. All rights reserved.
        </p>
        <p className="footer__made">
          Built with obsession. Sold with precision.
        </p>
      </div>
    </footer>
  );
}
