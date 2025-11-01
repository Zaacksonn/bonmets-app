/**
 * SEO utility functions and JSON-LD schema generators
 */

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://bonmets.fr';
const SITE_NAME = 'Bonmets';
const SITE_DESCRIPTION = "La meilleure collection de recettes et de guides de cuisine. Trouvez l'inspiration pour les repas du quotidien, la pâtisserie et les plats de fête.";

export function generateMetadata({
  title,
  description,
  image,
  url,
  type = 'website',
  publishedTime,
  modifiedTime,
  author,
  tags,
  keywords,
  noindex = false,
  nofollow = false,
}) {
  const fullTitle = title || SITE_NAME;
  const fullUrl = url ? `${SITE_URL}${url}` : SITE_URL;
  const imageUrl = image ? `${SITE_URL}${image}` : `${SITE_URL}/bak-stunden.png`;

  const metadata = {
    title: fullTitle,
    description: description || SITE_DESCRIPTION,
    keywords: keywords || 'recettes, cuisine, pâtisserie, recettes françaises, dessert, dîner, petit déjeuner',
    authors: author ? [{ name: author }] : undefined,
    creator: author || SITE_NAME,
    publisher: SITE_NAME,
    applicationName: SITE_NAME,
    generator: 'Next.js',
    robots: {
      index: !noindex,
      follow: !nofollow,
      googleBot: {
        index: !noindex,
        follow: !nofollow,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      title: fullTitle,
      description: description || SITE_DESCRIPTION,
      url: fullUrl,
      siteName: SITE_NAME,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title || SITE_NAME,
        },
      ],
      locale: 'fr_FR',
      type,
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: description || SITE_DESCRIPTION,
      images: [imageUrl],
      creator: '@bonmets',
      site: '@bonmets',
    },
    alternates: {
      canonical: fullUrl,
    },
    metadataBase: new URL(SITE_URL),
    verification: {
      google: process.env.GOOGLE_SITE_VERIFICATION,
      yandex: process.env.YANDEX_VERIFICATION,
      yahoo: process.env.YAHOO_VERIFICATION,
    },
    other: {
      'msapplication-TileColor': '#FF7A7A',
      'theme-color': '#FF7A7A',
      'google-site-verification': process.env.GOOGLE_SITE_VERIFICATION,
    },
    category: type === 'article' ? 'Alimentation & Cuisine' : 'Alimentation & Cuisine',
  };

  if (type === 'article' && publishedTime) {
    metadata.openGraph.publishedTime = publishedTime;
    if (modifiedTime) {
      metadata.openGraph.modifiedTime = modifiedTime;
    }
    if (author) {
      metadata.openGraph.authors = [author];
    }
    if (tags) {
      metadata.openGraph.tags = tags;
    }
  }

  return metadata;
}

/**
 * Generate Recipe JSON-LD schema
 */
export function generateRecipeSchema(recipe) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Recipe',
    name: recipe.title,
    description: recipe.excerpt,
    image: recipe.heroImage?.src ? `${SITE_URL}${recipe.heroImage.src}` : undefined,
    author: {
      '@type': 'Person',
      name: recipe.author || 'Équipe Bonmets',
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/bak-stunden.png`,
      },
    },
    datePublished: recipe.publishedAt,
    dateModified: recipe.updatedAt || recipe.publishedAt,
    prepTime: recipe.prepTimeMinutes ? `PT${recipe.prepTimeMinutes}M` : undefined,
    cookTime: recipe.cookTimeMinutes ? `PT${recipe.cookTimeMinutes}M` : undefined,
    totalTime: recipe.totalTimeMinutes ? `PT${recipe.totalTimeMinutes}M` : undefined,
    recipeYield: recipe.servings ? `${recipe.servings} portions` : undefined,
    recipeCategory: recipe.category || 'Dessert',
    recipeCuisine: 'French',
    keywords: recipe.tags?.join(', '),
    aggregateRating: recipe.ratingAverage ? {
      '@type': 'AggregateRating',
      ratingValue: recipe.ratingAverage,
      ratingCount: recipe.ratingCount || 0,
      bestRating: 5,
      worstRating: 1,
    } : undefined,
    recipeInstructions: recipe.steps?.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.title || `Étape ${index + 1}`,
      text: step.description,
    })) || [],
  };

  // Add ingredients
  if (recipe.ingredients && recipe.ingredients.length > 0) {
    schema.recipeIngredient = recipe.ingredients.flatMap(section => 
      section.items || []
    );
  }

  // Add nutrition
  if (recipe.nutrition && recipe.nutrition.length > 0) {
    const nutritionMap = {};
    recipe.nutrition.forEach(item => {
      nutritionMap[item.name] = item.value + (item.unit || '');
    });

    schema.nutrition = {
      '@type': 'NutritionInformation',
      calories: recipe.caloriesPerServing ? `${recipe.caloriesPerServing} calories` : undefined,
      ...nutritionMap,
    };
  }

  return schema;
}

/**
 * Generate Article JSON-LD schema
 */
export function generateArticleSchema(article) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    image: article.heroImage?.src ? `${SITE_URL}${article.heroImage.src}` : undefined,
    author: {
      '@type': 'Person',
      name: article.author,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/bak-stunden.png`,
    },
    },
    datePublished: article.publishedAt,
    dateModified: article.updatedAt || article.publishedAt,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/${article.slug}`,
    },
  };
}

/**
 * Generate Breadcrumb JSON-LD schema
 */
export function generateBreadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url ? `${SITE_URL}${item.url}` : undefined,
    })),
  };
}

/**
 * Generate Website JSON-LD schema with SearchAction
 */
export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/recettes?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

/**
 * Generate Organization JSON-LD schema
 */
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/bak-stunden.png`,
      width: 512,
      height: 512,
    },
    description: SITE_DESCRIPTION,
    foundingDate: '2024',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: 'info@bonmets.fr',
    },
    sameAs: [
      'https://instagram.com/bonmets',
      'https://pinterest.com/bonmets',
    ],
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/recettes?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

/**
 * Generate FAQ JSON-LD schema
 */
export function generateFAQSchema(faqs) {
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
 * Generate ItemList JSON-LD schema for listing pages
 */
export function generateItemListSchema(items, type = 'Recipe') {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': type,
        name: item.title,
        url: `${SITE_URL}/${item.slug}`,
        image: item.heroImage?.src ? `${SITE_URL}${item.heroImage.src}` : undefined,
      },
    })),
  };
}

