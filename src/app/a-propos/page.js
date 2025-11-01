import OmClient from '@/components/om/OmClient';
import { generateMetadata as generateSiteMetadata } from '@/lib/seo';

export const metadata = {
  title: 'À propos de Bonmets - Notre histoire et vision',
  description: "Faites connaissance avec l'équipe Bonmets. Passionnés de cuisine, nous partageons nos meilleures recettes et astuces pour vous inspirer en cuisine.",
  keywords: 'à propos bonmets, notre histoire, recettes, cuisine, équipe bonmets',
  openGraph: {
    title: 'À propos de Bonmets | Bonmets',
    description: "Faites connaissance avec l'équipe Bonmets. Passionnés de cuisine, nous partageons nos meilleures recettes et astuces pour vous inspirer en cuisine.",
    type: 'website',
    images: [
      {
        url: '/images/fika-och-bakning-svensk-stil.webp',
        width: 1200,
        height: 630,
        alt: 'À propos de Bonmets',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'À propos de Bonmets | Bonmets',
    description: "Faites connaissance avec l'équipe Bonmets. Passionnés de cuisine, nous partageons nos meilleures recettes et astuces pour vous inspirer en cuisine.",
    images: ['/images/fika-och-bakning-svensk-stil.webp'],
  },
};

export default function AProposPage() {
  return <OmClient />;
}


