import { getAllContent } from '@/lib/mdx';
import RecipeListingClient from '@/components/recipe/RecipeListingClient';
import { Suspense } from 'react';
import StructuredData from '@/components/seo/StructuredData';
import { generateItemListSchema } from '@/lib/seo';

export const metadata = {
  title: 'Alla recept - Matrecept för alla tillfällen',
  description: 'Utforska hundratals provlagade matrecept från Bakstunden. Från kyckling och pasta till vegetariskt och dessert - hitta din nya favorit!',
  keywords: 'recept, mat, matlagning, kyckling, pasta, vegetariskt, kladdkaka, pannkakor, svenska recept, frukost, lunch, middag, dessert, familjerecept',
  openGraph: {
    title: 'Alla recept | Bakstunden',
    description: 'Utforska hundratals provlagade matrecept från Bakstunden. Från kyckling och pasta till vegetariskt och dessert - hitta din nya favorit!',
    type: 'website',
    images: [
      {
        url: '/images/fika-och-bakning-svensk-stil.webp',
        width: 1200,
        height: 630,
        alt: 'Svenska matrecept - Bakstunden',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Alla recept | Bakstunden',
    description: 'Utforska hundratals provlagade matrecept från Bakstunden. Från kyckling och pasta till vegetariskt och dessert - hitta din nya favorit!',
    images: ['/images/fika-och-bakning-svensk-stil.webp'],
  },
};

export default async function RecipesPage() {
  // Load all recipes from MDX files
  const recipes = await getAllContent('recipes');

  // Generate structured data for recipe listing
  const recipeListSchema = generateItemListSchema(recipes.slice(0, 20), 'Recipe');

  return (
    <>
      {/* Structured Data */}
      <StructuredData data={recipeListSchema} />
      
      <Suspense>
        <RecipeListingClient initialRecipes={recipes} />
      </Suspense>
    </>
  );
}

