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
  const imageUrl = heroImage?.src ? `${SITE_URL}${heroImage.src}` : `${SITE_URL}/bak-stunden.png`;

  return {
    title: seoTitle,
    description: seoDescription,
    keywords: keywords,
    canonical: canonicalUrl,
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      url: canonicalUrl,
      siteName: 'Bakstunden',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${title} - Bakstunden recept`,
        },
      ],
      locale: 'sv_SE',
      type: 'article',
      publishedTime: publishedAt,
      modifiedTime: updatedAt || publishedAt,
      authors: author ? [author] : ['Bakstunden Team'],
      tags: tags,
      section: category,
    },
    twitter: {
      card: 'summary_large_image',
      title: seoTitle,
      description: seoDescription,
      images: [imageUrl],
      creator: '@bakstunden',
      site: '@bakstunden',
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
      'article:author': author || 'Bakstunden Team',
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
  return title || 'Recept';
}

/**
 * Generate SEO-optimized recipe description
 * Uses the exact excerpt from MDX file without modifications
 */
function generateRecipeDescription(excerpt = '', category = '', totalTimeMinutes = 0, servings = 0) {
  // Use the exact excerpt from MDX file without any modifications
  return excerpt || 'Lär dig att laga god mat med vår steg-för-steg guide på Bakstunden.';
}

/**
 * Generate comprehensive keywords
 */
function generateRecipeKeywords(tags = [], category = '', title = '') {
  const baseKeywords = [
    'recept',
    'matlagning',
    'svenska recept',
    'bakning',
    'matlagningsguider',
    'hemlagad mat',
    'familjerecept'
  ];
  
  const categoryKeywords = {
    'Dessert': ['dessert', 'efterrätt', 'söta recept', 'bakning', 'kakor', 'tårtor'],
    'Huvudrätt': ['huvudrätt', 'middag', 'kött', 'fisk', 'kyckling', 'vegetariskt'],
    'Frukost': ['frukost', 'brunch', 'pannkakor', 'vafflor', 'morgonmat'],
    'Förrätt': ['förrätt', 'förrätt', 'sallad', 'soppa', 'snacks'],
    'Bakning': ['bakning', 'bröd', 'kakor', 'tårtor', 'fika', 'söta bakverk']
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
      name: author || 'Bakstunden Team',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Bakstunden',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/bak-stunden.png`,
        width: 512,
        height: 512,
      },
    },
    datePublished: publishedAt,
    dateModified: updatedAt || publishedAt,
    prepTime: prepTimeMinutes ? `PT${prepTimeMinutes}M` : undefined,
    cookTime: cookTimeMinutes ? `PT${cookTimeMinutes}M` : undefined,
    totalTime: totalTimeMinutes ? `PT${totalTimeMinutes}M` : undefined,
    recipeYield: servings ? `${servings} portioner` : undefined,
    recipeCategory: category || 'Dessert',
    recipeCuisine: cuisine || 'Swedish',
    keywords: tags.join(', '),
    recipeInstructions: steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.title || `Steg ${index + 1}`,
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
      calories: caloriesPerServing ? `${caloriesPerServing} kalorier` : undefined,
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
      name: `${title} - Videoguide`,
      description: `Lär dig att laga ${title} med vår videoguide`,
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
  
  if (tags.includes('Vegetariskt')) dietaryInfo.push('VegetarianDiet');
  if (tags.includes('Veganskt')) dietaryInfo.push('VeganDiet');
  if (tags.includes('Glutenfritt')) dietaryInfo.push('GlutenFreeDiet');
  if (tags.includes('Laktosfritt')) dietaryInfo.push('LowLactoseDiet');
  if (tags.includes('Lågkolhydrat')) dietaryInfo.push('LowCarbDiet');
  if (tags.includes('Lågfett')) dietaryInfo.push('LowFatDiet');
  
  return dietaryInfo.length > 0 ? dietaryInfo : undefined;
}

/**
 * Generate FAQ schema for recipe
 */
export function generateRecipeFAQSchema(recipe) {
  const faqs = [
    {
      question: `Hur lång tid tar det att laga ${recipe.title}?`,
      answer: `Det tar cirka ${recipe.totalTimeMinutes} minuter att laga ${recipe.title}.${recipe.prepTimeMinutes ? ` Förberedelse: ${recipe.prepTimeMinutes} minuter.` : ''}${recipe.cookTimeMinutes ? ` Tillagning: ${recipe.cookTimeMinutes} minuter.` : ''}`
    },
    {
      question: `Hur många portioner ger ${recipe.title}?`,
      answer: `Detta recept ger ${recipe.servings} portioner.`
    },
    {
      question: `Vilken svårighetsgrad har ${recipe.title}?`,
      answer: `Detta recept har svårighetsgrad ${recipe.difficulty || 'medel'}. ${getDifficultyDescription(recipe.difficulty)}`
    }
  ];

  if (recipe.allergens && recipe.allergens.length > 0) {
    faqs.push({
      question: `Innehåller ${recipe.title} allergener?`,
      answer: `Ja, detta recept innehåller: ${recipe.allergens.join(', ')}.`
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
    'Lätt': 'Perfekt för nybörjare med enkla tekniker och få ingredienser.',
    'Medel': 'Kräver lite erfarenhet och några grundläggande matlagningsfärdigheter.',
    'Svår': 'Avancerat recept som kräver erfarenhet och precision.'
  };
  return descriptions[difficulty] || descriptions['Medel'];
}

/**
 * Generate related content suggestions
 */
export function generateRelatedContentSchema(relatedRecipes, category) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Relaterade ${category} recept`,
    description: `Fler ${category.toLowerCase()} recept du kanske gillar`,
    itemListElement: relatedRecipes.map((recipe, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Recipe',
        name: recipe.title,
        url: `${SITE_URL}/recept/${recipe.slug}`,
        image: recipe.heroImage?.src ? `${SITE_URL}${recipe.heroImage.src}` : undefined,
        description: recipe.excerpt,
      },
    })),
  };
}
