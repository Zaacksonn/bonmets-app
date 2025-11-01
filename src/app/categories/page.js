import { getAllContent } from '@/lib/mdx';
import { getAllCategories } from '@/lib/categories';
import { generateMetadata as generateSiteMetadata } from '@/lib/seo';
import StructuredData from '@/components/seo/StructuredData';
import EnhancedKategorierClient from '@/components/kategorier/EnhancedKategorierClient';

export async function generateMetadata() {
  return generateSiteMetadata({
    title: 'Toutes les catégories – Trouvez votre prochaine recette | Bonmets',
    description: 'Explorez toutes nos catégories de recettes : Poulet, Pâtes, Végétarien, Gâteau au chocolat, Crêpes et plus. 100+ recettes dans 16 catégories pour tous les goûts.',
    url: '/categories',
    keywords: 'catégories de recettes, catégories cuisine, recette poulet, recette pâtes, recettes végétariennes, recettes françaises, inspiration cuisine',
    openGraph: {
      images: [
        {
          url: '/images/fika-och-bakning-svensk-stil.webp',
          width: 1200,
          height: 630,
          alt: 'Toutes les catégories de recettes sur Bonmets',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      images: ['/images/fika-och-bakning-svensk-stil.webp'],
    },
  });
}

export default async function CategoriesPage() {
  const allRecipes = await getAllContent('recipes');
  const allCategories = getAllCategories();

  const categoriesWithCounts = allCategories.map(category => {
    const recipeCount = allRecipes.filter(recipe => 
      recipe.category === category.name ||
      (recipe.tags && recipe.tags.some(tag => 
        category.subcategories && category.subcategories.includes(tag)
      ))
    ).length;

    return {
      ...category,
      count: recipeCount,
      recipeCount: recipeCount
    };
  });

  const sortedCategories = categoriesWithCounts.sort((a, b) => b.count - a.count);
  const popularCategories = sortedCategories.slice(0, 8);
  const otherCategories = sortedCategories.slice(8);
  const totalRecipes = allRecipes.length;

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
        name: 'Catégories',
        item: `${siteUrl}/categories`
      }
    ]
  };

  const collectionPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Toutes les catégories de recettes',
    description: 'Explorez toutes nos catégories de recettes',
    url: `${siteUrl}/categories`,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: allCategories.length,
      itemListElement: allCategories.map((category, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Thing',
          name: category.name,
          description: category.description,
          url: `${siteUrl}/categories/${category.slug}`
        }
      }))
    }
  };

  return (
    <>
      <StructuredData data={breadcrumbSchema} />
      <StructuredData data={collectionPageSchema} />
      <EnhancedKategorierClient 
        allCategories={sortedCategories}
        popularCategories={popularCategories}
        otherCategories={otherCategories}
        totalRecipes={totalRecipes}
      />
    </>
  );
}


