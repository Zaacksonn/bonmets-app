import { Inter, Playfair_Display, Lora, Crimson_Text } from "next/font/google";
import "./globals.css";
import HeaderWrapper from '@/components/layout/HeaderWrapper';
import Footer from '@/components/layout/Footer';
import { generateMetadata as generateSiteMetadata } from '@/lib/seo';
import { Analytics } from "@vercel/analytics/next"
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
        url: '/bak-stunden.png',
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
    images: ['/bak-stunden.png'],
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
      <head>
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-5B3M9L45');`,
          }}
        />
        {/* End Google Tag Manager */}
        <meta name="google-site-verification" content="73a51c1ce7036450" />
        <meta name="ahrefs-site-verification" content="22d922fdf84d019c19ae72220da6b8c4acf4889a83938c151cdbc09ee00d5aa2" />
      </head>
      <body
        className={`${inter.variable} ${playfair.variable} ${lora.variable} ${crimson.variable} antialiased min-h-screen flex flex-col`}
        style={{ fontFamily: 'var(--font-inter)' }}
      >
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe 
            src="https://www.googletagmanager.com/ns.html?id=GTM-5B3M9L45"
            height="0" 
            width="0" 
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        
        <HeaderWrapper />
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-purple-600 focus:text-white focus:rounded-lg"
        >
          Aller au contenu principal
        </a>
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
