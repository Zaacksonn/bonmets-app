import { getAllContent } from '@/lib/mdx';
import { getAllMealTypes } from '@/lib/categories';
import { generateMetadata as generateSiteMetadata } from '@/lib/seo';
import StructuredData from '@/components/seo/StructuredData';
import MaltiderClient from '@/components/maltider/MaltiderClient';

export async function generateMetadata() {
  return generateSiteMetadata({
    title: 'Recettes par repas - Petit déjeuner, Déjeuner, Dîner & Plus | Bonmets',
    description: 'Trouvez la recette parfaite pour chaque repas : Petit déjeuner, Déjeuner, Dîner, Snacks et Dessert. 100+ recettes par type de repas pour un planning facile.',
    url: '/repas',
    keywords: 'recettes petit déjeuner, recettes déjeuner, recettes dîner, snacks, dessert, recettes par repas',
    openGraph: {
      images: [
        {
          url: '/images/fika-och-bakning-svensk-stil.webp',
          width: 1200,
          height: 630,
          alt: 'Recettes par repas - Bonmets',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      images: ['/images/fika-och-bakning-svensk-stil.webp'],
    },
  });
}

export default async function RepasPage() {
  const allRecipes = await getAllContent('recipes');
  const mealTypes = getAllMealTypes();

  const mealTypesWithCounts = mealTypes.map(mealType => {
    const recipeCount = allRecipes.filter(recipe => 
      recipe.mealType === mealType.key ||
      (recipe.tags && recipe.tags.some(tag => 
        tag.toLowerCase().includes(mealType.name.toLowerCase())
      ))
    ).length;

    return {
      ...mealType,
      count: recipeCount,
      recipeCount: recipeCount
    };
  });

  const sortedMealTypes = mealTypesWithCounts.sort((a, b) => b.count - a.count);

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
        name: 'Repas',
        item: `${siteUrl}/repas`
      }
    ]
  };

  const collectionPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Recettes par repas',
    description: 'Trouvez la recette parfaite pour chaque repas',
    url: `${siteUrl}/repas`,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: mealTypes.length,
      itemListElement: mealTypes.map((mealType, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Thing',
          name: mealType.name,
          description: mealType.description,
          url: `${siteUrl}/repas/${mealType.key}`
        }
      }))
    }
  };

  return (
    <>
      <StructuredData data={breadcrumbSchema} />
      <StructuredData data={collectionPageSchema} />
      <MaltiderClient 
        mealTypes={sortedMealTypes}
        totalRecipes={allRecipes.length}
      />
    </>
  );
}


