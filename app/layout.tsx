import type { Metadata } from 'next';
import type { Viewport } from 'next';
import { Inter, Montserrat, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-heading-family',
  weight: 'variable',
});

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body-family',
  weight: 'variable',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  preload: false,
  variable: '--font-code-family',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://psd-trebevic.ba'),
  applicationName: 'PSD Trebević Sarajevo',
  formatDetection: {
    telephone: false,
    date: false,
    address: false,
    email: false,
    url: false,
  },
  title: 'PSD Trebević Sarajevo | Planinarske staze, ture i vrijeme',
  description: 'Istražite planinarske staze Trebevića, provjerite vremenske uslove na vrhu Sofe, upoznajte klupske ture i olimpijsku baštinu Sarajeva.',
  keywords: [
    'PSD Trebević',
    'Trebević Sarajevo',
    'planinarske staze Trebević',
    'planinarsko društvo Sarajevo',
    'planinarenje Sarajevo',
    'vrh Sofe',
    'Trebevićka žičara',
    'planinarske ture Trebević',
    'olimpijska bob staza Sarajevo',
  ],
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: [
      {
        url: '/favicon.ico?v=2',
        type: 'image/x-icon',
        sizes: 'any',
      },
    ],
    apple: '/images/psd_trebevic_icon.png',
  },
  authors: [{ name: 'PSD Trebević Sarajevo' }],
  creator: 'PSD Trebević Sarajevo',
  publisher: 'PSD Trebević Sarajevo',
  openGraph: {
    title: 'PSD Trebević Sarajevo | Planinarsko društvo i vodič kroz Trebević',
    description: 'Planinarske staze i ture, vremenski uslovi na Trebeviću, olimpijska baština i prirodne znamenitosti Sarajeva.',
    url: 'https://psd-trebevic.ba',
    siteName: 'PSD Trebević Sarajevo',
    images: [
      {
        url: '/images/trebevic-summit-marker.jpeg',
        width: 1154,
        height: 768,
        alt: 'View from Mount Trebević toward Sarajevo and the surrounding mountains',
      },
    ],
    locale: 'bs_BA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PSD Trebević Sarajevo | Planinarske staze i ture',
    description: 'Istražite staze, vremenske uslove i klupske ture na Trebeviću.',
    images: ['/images/trebevic-summit-marker.jpeg'],
  },
};

export const viewport: Viewport = {
  themeColor: '#0C1410',
  colorScheme: 'dark',
};

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'SportsOrganization',
  name: 'Planinarsko-sportsko društvo Trebević Sarajevo',
  alternateName: 'PSD Trebević Sarajevo',
  url: 'https://psd-trebevic.ba',
  logo: 'https://psd-trebevic.ba/images/psd_trebevic_icon.png',
  foundingDate: '2006',
  description: metadata.description,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Sarajevo',
    addressCountry: 'BA',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bs" className="dark" suppressHydrationWarning>
      <head>
        <meta name="format-detection" content="telephone=no, date=no, email=no, address=no" />
      </head>
      <body
        className={`${montserrat.variable} ${inter.variable} ${jetbrainsMono.variable} font-sans antialiased selection:bg-[#B8282D] selection:text-white`}
        suppressHydrationWarning
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {children}
      </body>
    </html>
  );
}
