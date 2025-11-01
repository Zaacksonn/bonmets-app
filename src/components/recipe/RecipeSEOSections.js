import Link from 'next/link';
import Image from 'next/image';
import { Clock, Users, Star, ChefHat, Lightbulb, Heart, Share2, BookOpen, ArrowRight } from 'lucide-react';

/**
 * Dynamic SEO sections for recipe pages
 * These sections provide additional SEO value and user engagement
 */

/**
 * Recipe Tips and Tricks Section
 */
export function RecipeTipsSection({ recipe, tips = [] }) {
  const defaultTips = [
    {
      title: 'Proffstips',
      content: `För bästa resultat med ${recipe.title}, se till att alla ingredienser är i rumstemperatur.`,
      icon: Lightbulb
    },
    {
      title: 'Tidssparande',
      content: 'Förbered alla ingredienser innan du börjar för att spara tid under tillagningen.',
      icon: Clock
    },
    {
      title: 'Lagring',
      content: `${recipe.title} kan förvaras i kylskåp i upp till 3 dagar eller frysas i 2 månader.`,
      icon: Heart
    }
  ];

  const displayTips = tips.length > 0 ? tips : defaultTips;

  return (
    <section className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-8 mb-12">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
          <Lightbulb className="w-6 h-6 mr-3 text-purple-600" />
          Tips & Tricks för {recipe.title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {displayTips.map((tip, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="flex items-center mb-4">
                <tip.icon className="w-5 h-5 text-purple-600 mr-3" />
                <h3 className="font-semibold text-gray-900 dark:text-white">{tip.title}</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                {tip.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Recipe FAQ Section
 */
export function RecipeFAQSection({ recipe, faqs = [] }) {
  const defaultFAQs = [
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
    },
    {
      question: `Kan jag förvara ${recipe.title}?`,
      answer: `${recipe.title} kan förvaras i kylskåp i upp till 3 dagar eller frysas i 2 månader.`
    }
  ];

  const displayFAQs = faqs.length > 0 ? faqs : defaultFAQs;

  return (
    <section className="bg-white dark:bg-gray-800 rounded-2xl p-8 mb-12 border border-gray-200 dark:border-gray-700">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
          <BookOpen className="w-6 h-6 mr-3 text-purple-600" />
          Vanliga frågor om {recipe.title}
        </h2>
        <div className="space-y-4">
          {displayFAQs.map((faq, index) => (
            <details key={index} className="group">
              <summary className="flex items-center justify-between w-full p-4 bg-gray-50 dark:bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                <span className="font-medium text-gray-900 dark:text-white">{faq.question}</span>
                <span className="text-purple-600 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="p-4 bg-white dark:bg-gray-800 rounded-b-lg">
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{faq.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Related Recipes Section with SEO optimization - Optimized for mobile & desktop
 */
export function RelatedRecipesSection({ relatedRecipes, category, currentRecipe }) {
  if (!relatedRecipes || relatedRecipes.length === 0) return null;

  return (
    <section className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-2xl p-4 sm:p-6 lg:p-8 mb-12">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 flex items-center">
          <ChefHat className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 text-purple-600" />
          Fler {category} recept du kanske gillar
        </h2>
        
        {/* Mobile: 2 columns, Desktop: 3 columns, Large: 4 columns */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          {relatedRecipes.slice(0, 8).map((recipe) => (
            <Link
              key={recipe.slug}
              href={`/recept/${recipe.slug}`}
              className="group bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02] border border-gray-100 dark:border-gray-700"
            >
              {recipe.heroImage?.src && (
                <div className="relative h-24 sm:h-32 md:h-36 overflow-hidden">
                  <Image
                    src={recipe.heroImage.src}
                    alt={recipe.heroImage.alt || recipe.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                </div>
              )}
              <div className="p-2 sm:p-3">
                <h3 className="font-medium text-sm sm:text-base text-gray-900 dark:text-white mb-1 sm:mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors line-clamp-2 leading-tight">
                  {recipe.title}
                </h3>
                
                {/* Meta info - responsive layout */}
                <div className="space-y-1 sm:space-y-0">
                  <div className="flex items-center justify-between text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center">
                      <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                      <span className="truncate">{recipe.totalTimeMinutes} min</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                      <span className="truncate">{recipe.servings}</span>
                    </div>
                  </div>
                  
                  {recipe.ratingAverage && (
                    <div className="flex items-center justify-center sm:justify-start">
                      <div className="flex items-center text-xs sm:text-sm text-yellow-600 dark:text-yellow-400">
                        <Star className="w-3 h-3 sm:w-4 sm:h-4 mr-1 fill-current" />
                        <span>{recipe.ratingAverage}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        {/* Show more button for mobile if there are more recipes */}
        {relatedRecipes.length > 8 && (
          <div className="mt-4 sm:mt-6 text-center">
            <Link
              href={`/kategorier/${category?.toLowerCase()}-recept`}
              className="inline-flex items-center px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors text-sm font-medium"
            >
              Se alla {category} recept
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

/**
 * Recipe Categories Navigation
 */
export function RecipeCategoriesSection({ categories, currentCategory }) {
  return (
    <section className="bg-white dark:bg-gray-800 rounded-2xl p-8 mb-12 border border-gray-200 dark:border-gray-700">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Utforska fler kategorier
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/kategorier/${category.slug}`}
              className={`p-4 rounded-lg text-center transition-all duration-300 ${
                currentCategory === category.slug
                  ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
                  : 'bg-gray-50 dark:bg-gray-700 hover:bg-purple-50 dark:hover:bg-purple-900/20 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400'
              }`}
            >
              <div className="text-2xl mb-2">{category.icon}</div>
              <div className="font-medium text-sm">{category.name}</div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Recipe Social Sharing Section
 */
export function RecipeSocialSection({ recipe }) {
  const shareUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://bakstunden.se'}/recept/${recipe.slug}`;
  const shareText = `Kolla in detta fantastiska recept: ${recipe.title}`;

  const shareLinks = [
    {
      name: 'Facebook',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      icon: '📘',
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      name: 'Twitter',
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
      icon: '🐦',
      color: 'bg-blue-400 hover:bg-blue-500'
    },
    {
      name: 'Pinterest',
      url: `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(shareUrl)}&description=${encodeURIComponent(shareText)}`,
      icon: '📌',
      color: 'bg-red-500 hover:bg-red-600'
    },
    {
      name: 'WhatsApp',
      url: `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`,
      icon: '💬',
      color: 'bg-green-500 hover:bg-green-600'
    }
  ];

  return (
    <section className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-8 mb-12">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center justify-center">
          <Share2 className="w-6 h-6 mr-3 text-purple-600" />
          Dela detta recept
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Sprid glädjen och dela {recipe.title} med dina vänner och familj!
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          {shareLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`${link.color} text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 flex items-center`}
            >
              <span className="mr-2">{link.icon}</span>
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Helper function for difficulty description
 */
function getDifficultyDescription(difficulty) {
  const descriptions = {
    'Lätt': 'Perfekt för nybörjare med enkla tekniker och få ingredienser.',
    'Medel': 'Kräver lite erfarenhet och några grundläggande matlagningsfärdigheter.',
    'Svår': 'Avancerat recept som kräver erfarenhet och precision.'
  };
  return descriptions[difficulty] || descriptions['Medel'];
}
