import { getAllContent } from '@/lib/mdx';
import { generateMetadata as generateSiteMetadata } from '@/lib/seo';
import StructuredData from '@/components/seo/StructuredData';
import SnabbmatClient from '@/components/snabbmat/SnabbmatClient';

export async function generateMetadata() {
  return generateSiteMetadata({
    title: 'Snabbmat Recept - Under 30 Minuter | Bakstunden',
    description: 'Snabba recept under 30 minuter för vardag och fest. Enkla, goda rätter som går att laga på rekordtid. Perfekt för när du har bråttom men vill äta gott.',
    url: '/snabbmat',
    keywords: 'snabbmat recept, snabba recept, under 30 minuter, snabb middag, snabb frukost, snabb lunch, enkla recept, snabb matlagning, vardagsmat, snabbmat idéer, express recept, snabblagning',
    openGraph: {
      images: [
        {
          url: '/images/fika-och-bakning-svensk-stil.webp',
          width: 1200,
          height: 630,
          alt: 'Snabbmat recept under 30 minuter - Bakstunden',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      images: ['/images/fika-och-bakning-svensk-stil.webp'],
    },
  });
}

export default async function SnabbmatPage() {
  // Load all recipes
  const allRecipes = await getAllContent('recipes');

  // Filter recipes under 30 minutes
  const quickRecipes = allRecipes.filter(recipe => 
    (recipe.totalTimeMinutes && recipe.totalTimeMinutes <= 30) ||
    (recipe.cookTimeMinutes && recipe.cookTimeMinutes <= 30) ||
    (recipe.tags && recipe.tags.some(tag => 
      tag.toLowerCase().includes('snabb') || 
      tag.toLowerCase().includes('express') ||
      tag.toLowerCase().includes('30 min')
    ))
  );

  // Categorize by time
  const veryQuick = quickRecipes.filter(r => (r.totalTimeMinutes || 0) <= 15);
  const quick = quickRecipes.filter(r => (r.totalTimeMinutes || 0) > 15 && (r.totalTimeMinutes || 0) <= 30);

  // Get difficulty distribution
  const easyRecipes = quickRecipes.filter(r => r.difficulty?.toLowerCase() === 'lätt');
  const mediumRecipes = quickRecipes.filter(r => r.difficulty?.toLowerCase() === 'medel');

  // Generate structured data
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Hem',
        item: process.env.NEXT_PUBLIC_SITE_URL || 'https://bakstunden.se'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Snabbmat',
        item: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://bakstunden.se'}/snabbmat`
      }
    ]
  };

  const collectionPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Snabbmat Recept - Under 30 Minuter',
    description: 'Snabba recept under 30 minuter för vardag och fest',
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://bakstunden.se'}/snabbmat`,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: quickRecipes.length,
      itemListElement: quickRecipes.slice(0, 10).map((recipe, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Recipe',
          name: recipe.title,
          url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://bakstunden.se'}/recept/${recipe.slug}`,
          image: recipe.heroImage?.src || recipe.heroImage,
          description: recipe.excerpt,
          totalTime: `PT${recipe.totalTimeMinutes || 30}M`
        }
      }))
    }
  };

  return (
    <>
      {/* Structured Data */}
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
