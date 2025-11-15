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
      title: 'Astuce de chef',
      content: `Pour de meilleurs résultats avec ${recipe.title}, assurez-vous que tous les ingrédients soient à température ambiante.`,
      icon: Lightbulb
    },
    {
      title: 'Gain de temps',
      content: 'Préparez tous les ingrédients à l\'avance pour gagner du temps pendant la cuisson.',
      icon: Clock
    },
    {
      title: 'Conservation',
      content: `${recipe.title} peut être conservé au réfrigérateur jusqu'à 3 jours ou congelé pendant 2 mois.`,
      icon: Heart
    }
  ];

  const displayTips = tips.length > 0 ? tips : defaultTips;

  return (
    <section className="bg-gradient-to-r from-[#FF7A7A]/10 to-[#FFA07A]/10 dark:from-[#FF7A7A]/20 dark:to-[#6FCF97]/20 rounded-2xl p-8 mb-12">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
          <Lightbulb className="w-6 h-6 mr-3 text-[#FF7A7A]" />
          Astuces & Conseils pour {recipe.title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {displayTips.map((tip, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="flex items-center mb-4">
                <tip.icon className="w-5 h-5 text-[#FF7A7A] mr-3" />
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
    },
    {
      question: `Puis-je conserver ${recipe.title} ?`,
      answer: `${recipe.title} peut être conservé au réfrigérateur jusqu'à 3 jours ou congelé pendant 2 mois.`
    }
  ];

  const displayFAQs = faqs.length > 0 ? faqs : defaultFAQs;

  return (
    <section className="bg-white dark:bg-gray-800 rounded-2xl p-8 mb-12 border border-gray-200 dark:border-gray-700">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
          <BookOpen className="w-6 h-6 mr-3 text-[#FF7A7A]" />
          Questions fréquentes sur {recipe.title}
        </h2>
        <div className="space-y-4">
          {displayFAQs.map((faq, index) => (
            <details key={index} className="group">
              <summary className="flex items-center justify-between w-full p-4 bg-gray-50 dark:bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                <span className="font-medium text-gray-900 dark:text-white">{faq.question}</span>
                <span className="text-[#FF7A7A] group-open:rotate-180 transition-transform">▼</span>
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
          <ChefHat className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 text-[#FF7A7A]" />
          Plus de recettes {category} que vous pourriez aimer
        </h2>
        
        {/* Mobile: 2 columns, Desktop: 3 columns, Large: 4 columns */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          {relatedRecipes.slice(0, 8).map((recipe) => (
            <Link
              key={recipe.slug}
              href={`/recettes/${recipe.slug}`}
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
                <h3 className="font-medium text-sm sm:text-base text-gray-900 dark:text-white mb-1 sm:mb-2 group-hover:text-[#FF7A7A] dark:group-hover:text-[#6FCF97] transition-colors line-clamp-2 leading-tight">
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
              href={`/categories/${category?.toLowerCase()}-recept`}
              className="inline-flex items-center px-4 py-2 bg-[#FF7A7A]/10 dark:bg-[#6FCF97]/20 text-[#FF7A7A] dark:text-[#6FCF97] rounded-lg hover:bg-[#FF7A7A]/20 dark:hover:bg-[#6FCF97]/30 transition-colors text-sm font-medium"
            >
              Voir toutes les recettes {category}
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
          Explorer plus de catégories
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/categories/${category.slug}`}
              className={`p-4 rounded-lg text-center transition-all duration-300 ${
                currentCategory === category.slug
                  ? 'bg-[#FF7A7A]/10 dark:bg-[#6FCF97]/20 text-[#FF7A7A] dark:text-[#6FCF97]'
                  : 'bg-gray-50 dark:bg-gray-700 hover:bg-[#FF7A7A]/10 dark:hover:bg-[#6FCF97]/20 text-gray-700 dark:text-gray-300 hover:text-[#FF7A7A] dark:hover:text-[#6FCF97]'
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
  const shareUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://bonmets.fr'}/recettes/${recipe.slug}`;
  const shareText = `Découvrez cette délicieuse recette : ${recipe.title}`;

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
    <section className="bg-gradient-to-r from-[#FF7A7A]/10 to-[#FFA07A]/10 dark:from-[#FF7A7A]/20 dark:to-[#6FCF97]/20 rounded-2xl p-8 mb-12">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center justify-center">
          <Share2 className="w-6 h-6 mr-3 text-[#FF7A7A]" />
          Partager cette recette
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Partagez le plaisir et envoyez {recipe.title} à vos amis et à votre famille !
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
    'Facile': 'Parfait pour les débutants avec des techniques simples et peu d\'ingrédients.',
    'Moyen': 'Nécessite un peu d\'expérience et quelques compétences culinaires de base.',
    'Difficile': 'Recette avancée qui nécessite de l\'expérience et de la précision.'
  };
  return descriptions[difficulty] || descriptions['Moyen'];
}
