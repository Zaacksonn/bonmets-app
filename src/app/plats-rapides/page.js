import { getAllContent } from '@/lib/mdx';
import { generateMetadata as generateSiteMetadata } from '@/lib/seo';
import StructuredData from '@/components/seo/StructuredData';
import SnabbmatClient from '@/components/snabbmat/SnabbmatClient';

export async function generateMetadata() {
  return generateSiteMetadata({
    title: 'Plats rapides - Moins de 30 minutes | Bonmets',
    description: 'Recettes rapides en moins de 30 minutes pour le quotidien et les fêtes. Des plats simples et délicieux à préparer en un rien de temps.',
    url: '/plats-rapides',
    keywords: 'recettes rapides, moins de 30 minutes, dîner rapide, déjeuner rapide, cuisine rapide, express',
    openGraph: {
      images: [
        {
          url: '/images/fika-och-bakning-svensk-stil.webp',
          width: 1200,
          height: 630,
          alt: 'Recettes rapides en moins de 30 minutes - Bonmets',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      images: ['/images/fika-och-bakning-svensk-stil.webp'],
    },
  });
}

export default async function PlatsRapidesPage() {
  const allRecipes = await getAllContent('recipes');
  const quickRecipes = allRecipes.filter(recipe => 
    (recipe.totalTimeMinutes && recipe.totalTimeMinutes <= 30) ||
    (recipe.cookTimeMinutes && recipe.cookTimeMinutes <= 30) ||
    (recipe.tags && recipe.tags.some(tag => 
      tag.toLowerCase().includes('snabb') || 
      tag.toLowerCase().includes('express') ||
      tag.toLowerCase().includes('30 min')
    ))
  );

  const veryQuick = quickRecipes.filter(r => (r.totalTimeMinutes || 0) <= 15);
  const quick = quickRecipes.filter(r => (r.totalTimeMinutes || 0) > 15 && (r.totalTimeMinutes || 0) <= 30);

  const easyRecipes = quickRecipes.filter(r => r.difficulty?.toLowerCase() === 'lätt');
  const mediumRecipes = quickRecipes.filter(r => r.difficulty?.toLowerCase() === 'medel');

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bonmets.fr';
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Accueil',
        item: siteUrl
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Plats rapides',
        item: `${siteUrl}/plats-rapides`
      }
    ]
  };

  const collectionPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Plats rapides - Moins de 30 minutes',
    description: 'Recettes rapides en moins de 30 minutes',
    url: `${siteUrl}/plats-rapides`,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: quickRecipes.length,
      itemListElement: quickRecipes.slice(0, 10).map((recipe, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Recipe',
          name: recipe.title,
          url: `${siteUrl}/recettes/${recipe.slug}`,
          image: recipe.heroImage?.src || recipe.heroImage,
          description: recipe.excerpt,
          totalTime: `PT${recipe.totalTimeMinutes || 30}M`
        }
      }))
    }
  };

  return (
    <>
      <StructuredData data={breadcrumbSchema} />
      <StructuredData data={collectionPageSchema} />
      <SnabbmatClient 
        quickRecipes={quickRecipes}
        veryQuick={veryQuick}
        quick={quick}
        easyRecipes={easyRecipes}
        mediumRecipes={mediumRecipes}
      />
    </>
  );
}


