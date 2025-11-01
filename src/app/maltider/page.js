import { getAllContent } from '@/lib/mdx';
import { getAllMealTypes } from '@/lib/categories';
import { generateMetadata as generateSiteMetadata } from '@/lib/seo';
import StructuredData from '@/components/seo/StructuredData';
import MaltiderClient from '@/components/maltider/MaltiderClient';

export async function generateMetadata() {
  return generateSiteMetadata({
    title: 'Recept efter Måltid - Frukost, Lunch, Middag & Mer | Bakstunden',
    description: 'Hitta perfekta recept för varje måltid: Frukost, Lunch, Middag, Snacks och Dessert. Över 100+ recept sorterade efter måltidstyp för enklare matplanering.',
    url: '/maltider',
    keywords: 'frukost recept, lunch recept, middag recept, snack recept, dessert recept, måltidsrecept, matplanering, frukost idéer, lunch idéer, middag idéer, snabb frukost, enkel lunch, vardagsmiddag, helgmiddag',
    openGraph: {
      images: [
        {
          url: '/images/fika-och-bakning-svensk-stil.webp',
          width: 1200,
          height: 630,
          alt: 'Recept efter måltid - Bakstunden',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      images: ['/images/fika-och-bakning-svensk-stil.webp'],
    },
  });
}

export default async function MaltiderPage() {
  // Load all recipes and meal types
  const allRecipes = await getAllContent('recipes');
  const mealTypes = getAllMealTypes();

  // Calculate recipe counts for each meal type
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

  // Sort by recipe count
  const sortedMealTypes = mealTypesWithCounts.sort((a, b) => b.count - a.count);

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
        name: 'Måltider',
        item: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://bakstunden.se'}/maltider`
      }
    ]
  };

  const collectionPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Recept efter Måltid',
    description: 'Hitta perfekta recept för varje måltid: Frukost, Lunch, Middag, Snacks och Dessert',
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://bakstunden.se'}/maltider`,
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
          url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://bakstunden.se'}/maltider/${mealType.key}`
        }
      }))
    }
  };

  return (
    <>
      {/* Structured Data */}
      <StructuredData data={breadcrumbSchema} />
      <StructuredData data={collectionPageSchema} />
      
      <MaltiderClient 
        mealTypes={sortedMealTypes}
        totalRecipes={allRecipes.length}
      />
    </>
  );
}
