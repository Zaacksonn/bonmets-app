'use client';

import { useEffect } from 'react';

/**
 * Comprehensive SEO component for recipe pages
 * Handles all SEO-related structured data and meta tags
 */
export default function RecipeSEO({ 
  recipe, 
  relatedRecipes = [], 
  faqs = [],
  breadcrumbs = []
}) {
  useEffect(() => {
    // Add recipe-specific meta tags
    addRecipeMetaTags(recipe);
    
    // Add structured data
    addStructuredData(recipe, relatedRecipes, faqs, breadcrumbs);
    
    // Add performance hints
    addPerformanceHints(recipe);
  }, [recipe, relatedRecipes, faqs, breadcrumbs]);

  return null;
}

/**
 * Add recipe-specific meta tags
 */
function addRecipeMetaTags(recipe) {
  const { title, excerpt, heroImage, author, publishedAt, updatedAt, tags, category, totalTimeMinutes, servings } = recipe;
  
  // Add meta tags to document head
  const metaTags = [
    { name: 'recipe:title', content: title },
    { name: 'recipe:description', content: excerpt },
    { name: 'recipe:author', content: author || 'Équipe Bonmets' },
    { name: 'recipe:category', content: category },
    { name: 'recipe:tags', content: tags?.join(', ') },
    { name: 'recipe:prep-time', content: recipe.prepTimeMinutes },
    { name: 'recipe:cook-time', content: recipe.cookTimeMinutes },
    { name: 'recipe:total-time', content: totalTimeMinutes },
    { name: 'recipe:servings', content: servings },
    { name: 'recipe:difficulty', content: recipe.difficulty },
    { name: 'recipe:cuisine', content: recipe.cuisine },
    { name: 'recipe:published', content: publishedAt },
    { name: 'recipe:modified', content: updatedAt || publishedAt },
  ];

  metaTags.forEach(tag => {
    if (tag.content) {
      const meta = document.querySelector(`meta[name="${tag.name}"]`);
      if (meta) {
        meta.setAttribute('content', tag.content);
      } else {
        const newMeta = document.createElement('meta');
        newMeta.setAttribute('name', tag.name);
        newMeta.setAttribute('content', tag.content);
        document.head.appendChild(newMeta);
      }
    }
  });
}

/**
 * Add structured data to page
 */
function addStructuredData(recipe, relatedRecipes, faqs, breadcrumbs) {
  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://bonmets.fr';
  
  // Recipe schema
  const recipeSchema = {
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
      name: 'Bonmets',
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
    recipeCategory: recipe.category,
    recipeCuisine: recipe.cuisine || 'French',
    keywords: recipe.tags?.join(', '),
    recipeInstructions: recipe.steps?.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.title || `Étape ${index + 1}`,
      text: step.description,
    })) || [],
    recipeIngredient: recipe.ingredients?.flatMap(section => section.items || []) || [],
    recipeDifficulty: recipe.difficulty,
    recipeServings: recipe.servings,
  };

  // Add rating if available
  if (recipe.ratingAverage && recipe.ratingCount) {
    recipeSchema.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: recipe.ratingAverage,
      ratingCount: recipe.ratingCount,
      bestRating: 5,
      worstRating: 1,
    };
  }

  // Add nutrition if available
  if (recipe.nutrition && recipe.nutrition.length > 0) {
    recipeSchema.nutrition = {
      '@type': 'NutritionInformation',
      calories: recipe.caloriesPerServing ? `${recipe.caloriesPerServing} kalorier` : undefined,
      ...recipe.nutrition.reduce((acc, item) => {
        acc[item.name] = `${item.value}${item.unit || ''}`;
        return acc;
      }, {}),
    };
  }

  // Add structured data scripts
  addStructuredDataScript('recipe', recipeSchema);
  
  // Add breadcrumb schema
  if (breadcrumbs.length > 0) {
    const breadcrumbSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: item.url ? `${SITE_URL}${item.url}` : undefined,
      })),
    };
    addStructuredDataScript('breadcrumb', breadcrumbSchema);
  }

  // Add FAQ schema
  if (faqs.length > 0) {
    const faqSchema = {
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
    addStructuredDataScript('faq', faqSchema);
  }

  // Add related recipes schema
  if (relatedRecipes.length > 0) {
    const relatedSchema = {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: `Recettes ${recipe.category} connexes`,
      itemListElement: relatedRecipes.map((relatedRecipe, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Recipe',
          name: relatedRecipe.title,
          url: `${SITE_URL}/recettes/${relatedRecipe.slug}`,
          image: relatedRecipe.heroImage?.src ? `${SITE_URL}${relatedRecipe.heroImage.src}` : undefined,
        },
      })),
    };
    addStructuredDataScript('related', relatedSchema);
  }
}

/**
 * Add structured data script to head
 */
function addStructuredDataScript(id, data) {
  // Remove existing script
  const existing = document.querySelector(`script[data-schema-id="${id}"]`);
  if (existing) {
    existing.remove();
  }

  // Add new script
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.setAttribute('data-schema-id', id);
  script.textContent = JSON.stringify(data, null, 0);
  document.head.appendChild(script);
}

/**
 * Add performance hints
 */
function addPerformanceHints(recipe) {
  // Add preload hints for critical images
  if (recipe.heroImage?.src) {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = recipe.heroImage.src;
    document.head.appendChild(link);
  }

  // Add resource hints for related content
  if (recipe.relatedRecipes && recipe.relatedRecipes.length > 0) {
    recipe.relatedRecipes.slice(0, 3).forEach(relatedRecipe => {
      if (relatedRecipe.heroImage?.src) {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.as = 'image';
        link.href = relatedRecipe.heroImage.src;
        document.head.appendChild(link);
      }
    });
  }
}
