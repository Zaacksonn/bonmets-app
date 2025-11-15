import { getAllContent } from '@/lib/mdx';
import EnhancedHomeClient from '@/components/EnhancedHomeClient';
import StructuredData from '@/components/seo/StructuredData';
import { generateWebsiteSchema, generateOrganizationSchema, generateItemListSchema } from '@/lib/seo';

export default async function Home() {
  // Load all recipes to calculate dynamic counts
  const allRecipes = await getAllContent('recipes');
  
  // Try to load articles (may not exist yet)
  let allArticles = [];
  try {
    allArticles = await getAllContent('articles');
  } catch (error) {
    // Articles don't exist yet, use empty array
    allArticles = [];
  }

  // Try to load authors (may not exist yet)
  let allAuthors = [];
  try {
    allAuthors = await getAllContent('authors');
  } catch (error) {
    // Authors don't exist yet, use empty array
    allAuthors = [];
  }

  // Get manually selected homepage featured recipes
  const featuredRecipes = allRecipes.filter(r => r.homepageFeatured === true);

  // Calculate tag counts dynamically
  const tagCounts = {};
  allRecipes.forEach(recipe => {
    if (recipe.tags) {
      recipe.tags.forEach(tag => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
      });
    }
  });

  // Get all categories and select the most relevant ones for homepage
  const { getAllCategories } = await import('@/lib/categories');
  const allCategories = getAllCategories();
  
  // Select the most relevant categories for homepage display (all 7 categories)
  const selectedCategoryKeys = [
    'viandes', 'poissons', 'legumes', 'pates', 'desserts', 'sauce', 'patisserie'
  ];
  
  const popularCategories = selectedCategoryKeys
    .map(key => {
      const category = allCategories.find(cat => cat.slug === `${key}-recept`);
      if (!category) return null; // Skip if category not found
      return {
        name: category.name,
        slug: category.slug,
        image: category.image,
        icon: category.icon,
        description: category.description,
        count: `${tagCounts[category.name] || 0}+ recettes`
      };
    })
    .filter(Boolean); // Remove null values

  // Generate structured data
  const websiteSchema = generateWebsiteSchema();
  const organizationSchema = generateOrganizationSchema();
  const recipeListSchema = generateItemListSchema(featuredRecipes.slice(0, 10), 'Recipe');
  
  // Generate FAQ Schema for homepage
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Quels types de recettes trouve-t-on sur Bonmets ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Sur Bonmets, vous trouverez plus de ${allRecipes.length} recettes dans des catégories comme petit déjeuner, déjeuner, dîner, plats rapides, pâtisserie et dessert. Nous avons tout, des crêpes et gaufres aux recettes de poulet, pâtes, plats végétariens et classiques de la pâtisserie française comme le gâteau au chocolat et les boules de chocolat.`
        }
      },
      {
        '@type': 'Question',
        name: 'Comment trouver des recettes simples pour le quotidien ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Utilisez notre section plats rapides pour trouver des dîners rapides en moins de 30 minutes. Vous pouvez également filtrer les recettes par niveau de difficulté "Facile" pour trouver des recettes simples adaptées aux débutants. Toutes nos recettes du quotidien sont faciles à suivre avec des instructions claires et des ingrédients disponibles.'
        }
      },
      {
        '@type': 'Question',
        name: 'Y a-t-il des recettes végétariennes et véganes ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Oui ! Nous avons une large sélection de recettes végétariennes et d\'options véganes. Utilisez nos filtres pour trouver des plats végétariens, des plats véganes ou des recettes sans gluten. Nous montrons comment préparer des plats nutritifs et savoureux sans produits d\'origine animale.'
        }
      },
      {
        '@type': 'Question',
        name: 'Qu\'est-ce qui rend les recettes de Bonmets spéciales ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Toutes nos recettes françaises sont soigneusement testées et contiennent des instructions détaillées étape par étape, des listes d\'ingrédients claires, des informations nutritionnelles et des conseils pratiques. Nous nous concentrons sur la cuisine maison avec des ingrédients que vous trouvez dans les épiceries françaises.'
        }
      },
      {
        '@type': 'Question',
        name: 'Comment puis-je planifier mon menu de la semaine ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Utilisez nos différentes catégories pour créer un menu hebdomadaire varié. Mélangez les recettes de poulet, les plats de poisson, les pâtes et les dîners végétariens pour une alimentation équilibrée. Choisissez quelques plats rapides du quotidien pour les jours stressants et planifiez un dîner de week-end plus élaboré quand vous avez plus de temps.'
        }
      }
    ]
  };

  return (
    <>
      {/* Structured Data - Schema.org JSON-LD */}
      <StructuredData data={websiteSchema} />
      <StructuredData data={organizationSchema} />
      <StructuredData data={recipeListSchema} />
      <StructuredData data={faqSchema} />
      
      <EnhancedHomeClient
        popularCategories={popularCategories}
        totalRecipes={allRecipes.length}
        featuredRecipes={featuredRecipes}
        allRecipes={allRecipes}
        articles={allArticles}
        authors={allAuthors}
      />
    </>
  );
}
