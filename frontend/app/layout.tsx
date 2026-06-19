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
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://debugmelater.com',
    siteName: 'DebugMeLater',
    title: 'DebugMeLater — Premium 3D Websites & Source Code Marketplace',
    description: 'Premium React, Next.js and Three.js templates for elite developers.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DebugMeLater — Premium Source Code Marketplace',
    description: 'Premium React, Next.js and Three.js templates for elite developers.',
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
