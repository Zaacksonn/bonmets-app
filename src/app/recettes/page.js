import { getAllContent } from '@/lib/mdx';
import RecipeListingClient from '@/components/recipe/RecipeListingClient';
import { Suspense } from 'react';
import StructuredData from '@/components/seo/StructuredData';
import { generateItemListSchema } from '@/lib/seo';

export const metadata = {
  title: 'Toutes les recettes - Recettes pour toutes les occasions',
  description: "Explorez des centaines de recettes testées par Bonmets. Du poulet et des pâtes au végétarien et aux desserts – trouvez votre nouveau favori !",
  keywords: 'recettes, cuisine, poulet, pâtes, végétarien, dessert, recettes françaises, petit déjeuner, déjeuner, dîner, pâtisserie',
  openGraph: {
    title: 'Toutes les recettes | Bonmets',
    description: "Explorez des centaines de recettes testées par Bonmets. Du poulet et des pâtes au végétarien et aux desserts – trouvez votre nouveau favori !",
    type: 'website',
    images: [
      {
        url: '/images/fika-och-bakning-svensk-stil.webp',
        width: 1200,
        height: 630,
        alt: 'Recettes françaises - Bonmets',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Toutes les recettes | Bonmets',
    description: "Explorez des centaines de recettes testées par Bonmets. Du poulet et des pâtes au végétarien et aux desserts – trouvez votre nouveau favori !",
    images: ['/images/fika-och-bakning-svensk-stil.webp'],
  },
};

export default async function RecipesPage() {
  const recipes = await getAllContent('recipes');

  const recipeListSchema = generateItemListSchema(recipes.slice(0, 10), 'Recipe');

  return (
    <>
      <StructuredData data={recipeListSchema} />
      <Suspense fallback={<div className="text-center py-12">Chargement des recettes…</div>}>
        <RecipeListingClient initialRecipes={recipes} />
      </Suspense>
    </>
  );
}


