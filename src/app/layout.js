import { Inter, Playfair_Display, Lora, Crimson_Text } from "next/font/google";
import "./globals.css";
import HeaderWrapper from '@/components/layout/HeaderWrapper';
import Footer from '@/components/layout/Footer';
import { generateMetadata as generateSiteMetadata } from '@/lib/seo';
// Modern sans-serif for body text (excellent readability)
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
});

// Elegant serif for headings (classic, editorial feel)
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: 'swap',
  preload: false,
  fallback: ['Georgia', 'serif'],
});

// Sophisticated serif for blog content (warm, inviting)
const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  display: 'swap',
  preload: false,
  fallback: ['Georgia', 'serif'],
});

// Alternative elegant serif for recipe titles
const crimson = Crimson_Text({
  variable: "--font-crimson",
  weight: ['400', '600', '700'],
  subsets: ["latin"],
  display: 'swap',
  preload: false,
  fallback: ['Georgia', 'serif'],
});

export const metadata = {
  ...generateSiteMetadata({
    title: 'Bonmets – Les meilleures recettes | Cuisine & Pâtisserie pour toutes les occasions',
    description: 'Découvrez des centaines de recettes faciles et délicieuses – des classiques aux plats du quotidien. Cuisine rapide, douceurs et favoris pour toute la famille !',
    url: '/',
    keywords: 'recettes, cuisine, pâtisserie, recettes françaises, végétarien, végan, sans gluten, petit déjeuner, déjeuner, dîner, dessert, plats rapides, cuisine familiale, livre de cuisine, poulet, pâtes, saumon, gaufres, crêpes, gâteau au chocolat, lasagnes, scones, tarte aux pommes, cuisine saine',
  }),
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://bonmets.fr'),
  title: {
    default: 'Bonmets – Les meilleures recettes pour toutes les occasions',
  },
  applicationName: 'Bonmets',
  generator: 'Next.js',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://bonmets.fr',
    siteName: 'Bonmets',
    title: 'Bonmets – Les meilleures recettes pour toutes les occasions',
    description: 'Découvrez des centaines de recettes faciles et délicieuses – des classiques aux plats du quotidien. Cuisine rapide, douceurs et favoris pour toute la famille !',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Bonmets - Les meilleures recettes pour toutes les occasions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bonmets – Les meilleures recettes pour toutes les occasions',
    description: 'Découvrez des centaines de recettes faciles et délicieuses – des classiques aux plats du quotidien. Cuisine rapide, douceurs et favoris pour toute la famille !',
    images: ['/og-image.png'],
  },
  manifest: '/manifest.json',
  other: {
    'msapplication-TileColor': '#FF7A7A',
    'theme-color': '#FF7A7A',
  },
};

// Separate viewport export for Next.js 15 best practices
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" dir="ltr">
      <body
        className={`${inter.variable} ${playfair.variable} ${lora.variable} ${crimson.variable} antialiased min-h-screen flex flex-col`}
        style={{ fontFamily: 'var(--font-inter)' }}
      >
        <HeaderWrapper />
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#FF7A7A] focus:text-white focus:rounded-lg"
        >
          Aller au contenu principal
        </a>
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
