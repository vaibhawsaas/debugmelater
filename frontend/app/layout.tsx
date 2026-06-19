import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import LoadingScreen from '@/components/layout/LoadingScreen';

export const metadata: Metadata = {
  title: {
    default: 'DebugMeLater — Premium 3D Websites & Source Code Marketplace',
    template: '%s | DebugMeLater',
  },
  description:
    'Buy premium React, Next.js, and Three.js source code templates crafted for developers who don\'t settle. Premium 3D websites and UI kits.',
  keywords: ['source code', 'react templates', 'nextjs templates', 'threejs', 'premium templates', 'web development'],
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
      { url: '/favicon.ico',       sizes: 'any' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'manifest', url: '/site.webmanifest' },
    ],
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://debugmelater.com',
    siteName: 'DebugMeLater',
    title: 'DebugMeLater — Premium 3D Websites & Source Code Marketplace',
    description: 'Premium React, Next.js and Three.js templates for elite developers.',
    images: [{ url: '/logo.png', width: 1080, height: 1080, alt: 'DebugMeLater Logo' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DebugMeLater — Premium Source Code Marketplace',
    description: 'Premium React, Next.js and Three.js templates for elite developers.',
    images: ['/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
        {/* Explicit favicon links for maximum browser compatibility */}
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="48x48" href="/favicon-48x48.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#0F172A" />
        <meta name="msapplication-TileColor" content="#0F172A" />
        <meta name="msapplication-TileImage" content="/android-chrome-192x192.png" />
      </head>
      <body>
        <LoadingScreen />
        <Navbar />
        <main id="main-content">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
