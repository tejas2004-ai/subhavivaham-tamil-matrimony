import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'சுபவிவாகம் — Subhavivaham Tamil Matrimony | Tuticorin & Tirunelveli',
  description:
    'Subhavivaham Tamil Matrimony Service. Personalized traditional matchmaking and jathagam horoscope matching in Murappanadu, Vallanadu, Tuticorin & Tirunelveli.',
  keywords: [
    'Tamil Matrimony',
    'Subhavivaham',
    'Tuticorin Matrimony',
    'Tirunelveli Matrimony',
    'Murappanadu Matrimony',
    'Vallanadu Matrimony',
    'Tamil Brides',
    'Tamil Grooms',
    'Jathagam Porutham',
    'Horoscope Matching'
  ],
  authors: [{ name: 'R. Viswanathan — Subhavivaham' }],
  openGraph: {
    title: 'Subhavivaham — Tamil Matrimony',
    description: 'Subhavivaham Tamil Matrimony Service. 25,000+ Profiles, 8,500+ Marriages Fixed.',
    url: 'https://www.subhavivaham.com',
    siteName: 'Subhavivaham Tamil Matrimony',
    locale: 'en_IN',
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: '#5A1B2A',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
