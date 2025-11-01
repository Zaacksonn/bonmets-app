import { getAllContent } from '@/lib/mdx';
import { getCategoryBySlug, getAllCategories } from '@/lib/categories';
import EnhancedCategoryClient from '@/components/kategorier/EnhancedCategoryClient';
import { notFound } from 'next/navigation';
import { generateMetadata as generateSiteMetadata } from '@/lib/seo';
import StructuredData from '@/components/seo/StructuredData';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) {
    return {
      title: 'Catégorie introuvable',
      description: 'La catégorie demandée est introuvable.'
    };
  }

  const allRecipes = await getAllContent('recipes');
  const filteredRecipes = allRecipes.filter(r => {
    return r.category === category.name || 
           (r.tags && r.tags.some(tag => 
             category.subcategories && category.subcategories.includes(tag)
           ));
  });

  return generateSiteMetadata({
    title: `${category.name} – ${filteredRecipes.length}+ recettes | Bonmets`,
    description: `${category.description} Découvrez les meilleures recettes ${category.name.toLowerCase()} avec des instructions étape par étape. ${filteredRecipes.length}+ recettes testées pour tous les niveaux.`,
    url: `/categories/${slug}`,
    keywords: `${category.name.toLowerCase()}, recettes ${category.name.toLowerCase()}, cuisine ${category.name.toLowerCase()}, facile ${category.name.toLowerCase()}, rapide ${category.name.toLowerCase()}`,
  });
}

export default async function CategoryPage({ params }) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) {
    notFound();
  }

  const allRecipes = await getAllContent('recipes');
  const filteredRecipes = allRecipes.filter(r => {
    return r.category === category.name || 
           (r.tags && r.tags.some(tag => 
             category.subcategories && category.subcategories.includes(tag)
           ));
  });

  const allCategories = getAllCategories();

  const categoryStats = {
    avgTime: filteredRecipes.length > 0 
      ? filteredRecipes.reduce((sum, r) => sum + (r.totalTimeMinutes || 0), 0) / filteredRecipes.length
      : 0,
    avgRating: filteredRecipes.length > 0
      ? filteredRecipes.reduce((sum, r) => sum + (r.ratingAverage || 0), 0) / filteredRecipes.length
      : 0,
    easyRecipes: filteredRecipes.filter(r => r.difficulty?.toLowerCase() === 'lätt').length,
    quickRecipes: filteredRecipes.filter(r => (r.totalTimeMinutes || 0) < 30).length,
    popularRecipes: filteredRecipes.filter(r => (r.ratingAverage || 0) >= 4.5).length
  };

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bonmets.fr';

  const categorySchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${category.name} Recettes`,
    description: category.description,
    url: `${siteUrl}/categories/${slug}`,
    breadcrumb: {
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
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: category.name,
          item: `${siteUrl}/categories/${slug}`
        }
      ]
    },
    numberOfItems: filteredRecipes.length,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: filteredRecipes.length,
      itemListElement: filteredRecipes.slice(0, 10).map((recipe, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Recipe',
          name: recipe.title,
          url: `${siteUrl}/recettes/${recipe.slug}`,
          image: recipe.heroImage?.src || recipe.heroImage,
          description: recipe.excerpt
        }
      }))
    }
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `Combien de recettes ${category.name.toLowerCase()} y a-t-il ?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Nous avons ${filteredRecipes.length} recettes différentes ${category.name.toLowerCase()}.`
        }
      }
    ]
  };

  return (
    <>
      <StructuredData data={categorySchema} />
      <StructuredData data={faqSchema} />
      <EnhancedCategoryClient
        category={category}
        recipes={filteredRecipes}
        allCategories={allCategories}
        categoryStats={categoryStats}
      />
    </>
  );
}

export async function generateStaticParams() {
  const { getAllCategories } = await import('@/lib/categories');
  const categories = getAllCategories();
  return categories.map((category) => ({
    slug: category.slug,
  }));
}


