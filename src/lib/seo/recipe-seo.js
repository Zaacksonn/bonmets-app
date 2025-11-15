/**
 * Advanced SEO utilities for recipe pages
 * Implements modern SEO best practices for recipe content
 */

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://bonmets.fr';

/**
 * Generate comprehensive recipe metadata
 */
export function generateRecipeMetadata(recipe) {
  const {
    title = '',
    excerpt = '',
    heroImage,
    author = 'Équipe Bonmets',
    publishedAt,
    updatedAt,
    tags = [],
    category = '',
    difficulty = '',
    totalTimeMinutes = 0,
    servings = 0,
    ratingAverage = 0,
    ratingCount = 0,
    slug = ''
  } = recipe;

  // Generate SEO-optimized title
  const seoTitle = generateRecipeTitle(title, category, difficulty);
  
  // Generate SEO-optimized description
  const seoDescription = generateRecipeDescription(excerpt, category, totalTimeMinutes, servings);
  
  // Generate keywords
  const keywords = generateRecipeKeywords(tags, category, title);
  
  // Generate canonical URL
  const canonicalUrl = `${SITE_URL}/recettes/${slug}`;
  
  // Generate image URL
  const imageUrl = heroImage?.src ? `${SITE_URL}${heroImage.src}` : `${SITE_URL}/og-image.png`;

  return {
    title: seoTitle,
    description: seoDescription,
    keywords: keywords,
    canonical: canonicalUrl,
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      url: canonicalUrl,
      siteName: 'Bonmets',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${title} - Recette Bonmets`,
        },
      ],
      locale: 'fr_FR',
      type: 'article',
      publishedTime: publishedAt,
      modifiedTime: updatedAt || publishedAt,
      authors: author ? [author] : ['Équipe Bonmets'],
      tags: tags,
      section: category,
    },
    twitter: {
      card: 'summary_large_image',
      title: seoTitle,
      description: seoDescription,
      images: [imageUrl],
      creator: '@bonmets',
      site: '@bonmets',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: canonicalUrl,
    },
    other: {
      'article:author': author || 'Équipe Bonmets',
      'article:section': category,
      'article:tag': tags.join(','),
      'article:published_time': publishedAt,
      'article:modified_time': updatedAt || publishedAt,
    },
  };
}

/**
 * Generate SEO-optimized recipe title
 * Uses the exact title from MDX file with NO modifications
 */
function generateRecipeTitle(title = '', category = '', difficulty = '') {
  // Use the exact title from MDX file with NO additions
  return title || 'Recette';
}

/**
 * Generate SEO-optimized recipe description
 * Uses the exact excerpt from MDX file without modifications
 */
function generateRecipeDescription(excerpt = '', category = '', totalTimeMinutes = 0, servings = 0) {
  // Use the exact excerpt from MDX file without any modifications
  return excerpt || 'Apprenez à cuisiner de délicieux plats avec notre guide pas à pas sur Bonmets.';
}

/**
 * Generate comprehensive keywords
 */
function generateRecipeKeywords(tags = [], category = '', title = '') {
  const baseKeywords = [
    'recette',
    'cuisine',
    'recettes françaises',
    'pâtisserie',
    'guides culinaires',
    'cuisine maison',
    'recettes familiales'
  ];
  
  const categoryKeywords = {
    'Dessert': ['dessert', 'pâtisserie', 'recettes sucrées', 'gâteaux', 'tartes', 'douceurs'],
    'Plat principal': ['plat principal', 'dîner', 'viande', 'poisson', 'poulet', 'végétarien'],
    'Petit déjeuner': ['petit déjeuner', 'brunch', 'crêpes', 'gaufres', 'repas du matin'],
    'Entrée': ['entrée', 'hors-d\'œuvre', 'salade', 'soupe', 'amuse-bouches'],
    'Pâtisserie': ['pâtisserie', 'pain', 'gâteaux', 'tartes', 'pâtisseries françaises', 'viennoiseries']
  };
  
  const titleKeywords = title.toLowerCase().split(' ').filter(word => word.length > 3);
  
  const allKeywords = [
    ...baseKeywords,
    ...(categoryKeywords[category] || []),
    ...tags,
    ...titleKeywords
  ];
  
  return [...new Set(allKeywords)].join(', ');
}

/**
 * Generate enhanced recipe schema with all modern features
 */
export function generateEnhancedRecipeSchema(recipe) {
  const {
    title,
    excerpt,
    heroImage,
    author,
    publishedAt,
    updatedAt,
    tags = [],
    category,
    difficulty,
    totalTimeMinutes,
    prepTimeMinutes,
    cookTimeMinutes,
    servings,
    ratingAverage,
    ratingCount,
    ingredients = [],
    steps = [],
    nutrition = [],
    caloriesPerServing,
    allergens = [],
    cuisine,
    mealType,
    cookingMethod
  } = recipe;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Recipe',
    name: title,
    description: excerpt,
    image: heroImage?.src ? `${SITE_URL}${heroImage.src}` : undefined,
    author: {
      '@type': 'Person',
      name: author || 'Équipe Bonmets',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Bonmets',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.png`,
        width: 512,
        height: 512,
      },
    },
    datePublished: publishedAt,
    dateModified: updatedAt || publishedAt,
    prepTime: prepTimeMinutes ? `PT${prepTimeMinutes}M` : undefined,
    cookTime: cookTimeMinutes ? `PT${cookTimeMinutes}M` : undefined,
    totalTime: totalTimeMinutes ? `PT${totalTimeMinutes}M` : undefined,
    recipeYield: servings ? `${servings} portions` : undefined,
    recipeCategory: category || 'Dessert',
    recipeCuisine: cuisine || 'French',
    keywords: tags.join(', '),
    recipeInstructions: steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.title || `Étape ${index + 1}`,
      text: step.description,
      image: step.image ? `${SITE_URL}${step.image}` : undefined,
    })),
    recipeIngredient: ingredients.flatMap(section => section.items || []),
    suitableForDiet: generateDietaryInfo(allergens, tags),
    cookingMethod: cookingMethod,
    recipeDifficulty: difficulty,
    recipeServings: servings,
  };

  // Add rating if available
  if (ratingAverage && ratingCount) {
    schema.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: ratingAverage,
      ratingCount: ratingCount,
      bestRating: 5,
      worstRating: 1,
    };
  }

  // Add nutrition information
  if (nutrition.length > 0 || caloriesPerServing) {
    schema.nutrition = {
      '@type': 'NutritionInformation',
      calories: caloriesPerServing ? `${caloriesPerServing} calories` : undefined,
      ...nutrition.reduce((acc, item) => {
        acc[item.name] = `${item.value}${item.unit || ''}`;
        return acc;
      }, {}),
    };
  }

  // Add video if available
  if (recipe.video) {
    schema.video = {
      '@type': 'VideoObject',
      name: `${title} - Guide vidéo`,
      description: `Apprenez à préparer ${title} avec notre guide vidéo`,
      thumbnailUrl: heroImage?.src ? `${SITE_URL}${heroImage.src}` : undefined,
      contentUrl: recipe.video.url,
      embedUrl: recipe.video.embedUrl,
      duration: recipe.video.duration,
    };
  }

  return schema;
}

/**
 * Generate dietary information for schema
 */
function generateDietaryInfo(allergens, tags) {
  const dietaryInfo = [];
  
  if (tags.includes('Végétarien') || tags.includes('Vegetarien')) dietaryInfo.push('VegetarianDiet');
  if (tags.includes('Végan') || tags.includes('Vegan')) dietaryInfo.push('VeganDiet');
  if (tags.includes('Sans gluten') || tags.includes('Gluten-free')) dietaryInfo.push('GlutenFreeDiet');
  if (tags.includes('Sans lactose') || tags.includes('Lactose-free')) dietaryInfo.push('LowLactoseDiet');
  if (tags.includes('Faible en glucides') || tags.includes('Low-carb')) dietaryInfo.push('LowCarbDiet');
  if (tags.includes('Faible en gras') || tags.includes('Low-fat')) dietaryInfo.push('LowFatDiet');
  
  return dietaryInfo.length > 0 ? dietaryInfo : undefined;
}

/**
 * Generate FAQ schema for recipe
 */
export function generateRecipeFAQSchema(recipe) {
  const faqs = [
    {
      question: `Combien de temps faut-il pour préparer ${recipe.title} ?`,
      answer: `Il faut environ ${recipe.totalTimeMinutes} minutes pour préparer ${recipe.title}.${recipe.prepTimeMinutes ? ` Préparation : ${recipe.prepTimeMinutes} minutes.` : ''}${recipe.cookTimeMinutes ? ` Cuisson : ${recipe.cookTimeMinutes} minutes.` : ''}`
    },
    {
      question: `Combien de portions donne ${recipe.title} ?`,
      answer: `Cette recette donne ${recipe.servings} portions.`
    },
    {
      question: `Quel est le niveau de difficulté de ${recipe.title} ?`,
      answer: `Cette recette est de difficulté ${recipe.difficulty || 'moyenne'}. ${getDifficultyDescription(recipe.difficulty)}`
    }
  ];

  if (recipe.allergens && recipe.allergens.length > 0) {
    faqs.push({
      question: `${recipe.title} contient-il des allergènes ?`,
      answer: `Oui, cette recette contient : ${recipe.allergens.join(', ')}.`
    });
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/**
 * Get difficulty description
 */
function getDifficultyDescription(difficulty) {
  const descriptions = {
    'Facile': 'Parfait pour les débutants avec des techniques simples et peu d\'ingrédients.',
    'Moyen': 'Nécessite un peu d\'expérience et quelques compétences culinaires de base.',
    'Difficile': 'Recette avancée qui nécessite de l\'expérience et de la précision.'
  };
  return descriptions[difficulty] || descriptions['Moyen'];
}

/**
 * Generate related content suggestions
 */
export function generateRelatedContentSchema(relatedRecipes, category) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Recettes ${category} similaires`,
    description: `Plus de recettes ${category.toLowerCase()} que vous pourriez aimer`,
    itemListElement: relatedRecipes.map((recipe, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Recipe',
        name: recipe.title,
        url: `${SITE_URL}/recettes/${recipe.slug}`,
        image: recipe.heroImage?.src ? `${SITE_URL}${recipe.heroImage.src}` : undefined,
        description: recipe.excerpt,
      },
    })),
  };
}
