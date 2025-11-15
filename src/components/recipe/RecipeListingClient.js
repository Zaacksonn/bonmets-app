'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import RecipeCard from '@/components/recipe/RecipeCard';
import EnhancedRecipeFilter from '@/components/recipe/EnhancedRecipeFilter';
import EnhancedSearchBar from '@/components/ui/EnhancedSearchBar';
import Pagination from '@/components/ui/Pagination';
import CategoryHero from '@/components/ui/CategoryHero';
import Tag from '@/components/ui/Tag';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { searchContent, filterRecipes, sortRecipes, getUniqueFilterValues } from '@/lib/utils/search';

export default function RecipeListingClient({ initialRecipes, categoryName = null, showHero = false }) {
  const searchParams = useSearchParams();
  // De-duplicate any incoming recipes by slug to prevent React key collisions
  const [recipes] = useState(() => {
    const seen = new Set();
    return (initialRecipes || []).filter(r => {
      if (!r?.slug) return false;
      if (seen.has(r.slug)) return false;
      seen.add(r.slug);
      return true;
    });
  });
  const [filteredRecipes, setFilteredRecipes] = useState(initialRecipes);
  const [filters, setFilters] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 12;

  // Category descriptions
  const categoryDescriptions = {
    'Vegetariskt': 'Plats verts, colorés et rassasiants que tout le monde adore. Des dîners rapides du quotidien aux salades festives.',
    'Vardagsmat': 'Recettes simples et rapides pour les dîners du quotidien. Parfait quand il faut aller vite mais que c\'est bon !',
    'Bakning': 'Brioches parfumées, gâteaux moelleux et pain croustillant. Tout ce dont vous avez besoin pour le goûter parfait.',
    'Pasta': 'De la carbonara classique aux sauces crémeuses. Découvrez toutes les possibilités du monde des pâtes.',
    'Grillmat': 'Les meilleures recettes d\'été pour le barbecue. Marinades, brochettes et tout ce qui sent l\'été.',
    'Desserter': 'Des fins de repas sucrées qui impressionnent. Des desserts simples aux pâtisseries élaborées.',
    'Grytor & Soppor': 'Soupes et ragoûts réconfortants et rassasiants pour toutes les saisons. Le comfort food à son meilleur.',
    'Soppor': 'Soupes réconfortantes et rassasiantes pour toutes les saisons. Le comfort food à son meilleur.',
    'Sallader': 'Salades fraîches et colorées qui rassasient. Parfaites pour le déjeuner ou en accompagnement.',
    'Kyckling': 'Plats de poulet polyvalents du monde entier. Du grillé au mijoté.',
    'Fisk & Skaldjur': 'Les délices de la mer préparés à la perfection. Des recettes simples qui mettent le poisson en valeur.',
    'Fisk': 'Les délices de la mer préparés à la perfection. Des recettes simples qui mettent le poisson en valeur.',
    'Snabb middag': 'Prêt en moins de 30 minutes ! Quand le temps est compté mais que vous voulez vraiment de la bonne nourriture.',
    'Glutenfritt': 'Délices sans gluten que tout le monde peut apprécier. Aucun compromis sur le goût !',
    'Kött': 'Plats de viande juteux et savoureux pour toutes les occasions. Des dîners rapides aux mijotés.',
    'Höstens favoriter': 'Plats chauds et réconfortants pour l\'automne. Le comfort food à son meilleur.',
    'Frukost': 'Commencez la journée du bon pied avec des plats de petit déjeuner nutritifs et savoureux.',
    'Tillbehör': 'Accompagnements parfaits qui complètent le plat principal.',
  };

  // Handle URL search params
  useEffect(() => {
    const q = searchParams.get('q');
    const category = searchParams.get('category');
    const tag = searchParams.get('tag');

    if (q) setSearchQuery(q);
    if (category) setFilters(prev => ({ ...prev, category }));
    if (tag) setFilters(prev => ({ ...prev, tags: [tag] }));
  }, [searchParams]);

  // Apply filters and search
  useEffect(() => {
    let result = [...recipes];

    // Apply search
    if (searchQuery) {
      result = searchContent(result, searchQuery);
    }

    // Apply filters
    result = filterRecipes(result, filters);

    // Apply sorting
    result = sortRecipes(result, sortBy);

    setFilteredRecipes(result);
    setCurrentPage(1);
  }, [recipes, filters, searchQuery, sortBy]);

  const categories = getUniqueFilterValues(recipes, 'category');
  const tags = getUniqueFilterValues(recipes, 'tags');

  // Pagination
  const totalPages = Math.ceil(filteredRecipes.length / recipesPerPage);
  const startIndex = (currentPage - 1) * recipesPerPage;
  const paginatedRecipes = filteredRecipes.slice(startIndex, startIndex + recipesPerPage);

  // Get current category from URL or filters
  const currentCategory = categoryName || filters.category || searchParams.get('tag') || searchParams.get('category');
  const categoryDescription = currentCategory ? categoryDescriptions[currentCategory] : null;

  // Get popular tags for suggestions
  const allTags = getUniqueFilterValues(recipes, 'tags').slice(0, 8);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF8F3] to-white dark:from-gray-900 dark:to-gray-800">
      {/* Category Hero - Only show if we have a specific category and showHero is true */}
      {currentCategory && showHero && (
        <CategoryHero
          category={currentCategory}
          description={categoryDescription}
          recipeCount={filteredRecipes.length}
        />
      )}

      <div className="max-w-7xl mx-auto px-4 md:px-16 lg:px-20 xl:px-24 py-20 md:py-24">
        {/* Header - Only show if no category hero */}
        {!currentCategory && (
          <div className="mb-12 text-center">
            <h1 
              className="text-5xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white font-playfair"
            >
              Toutes les recettes
            </h1>
            <p 
              className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-inter"
            >
              Explorez {recipes.length} recettes testées pour toutes les occasions
            </p>
          </div>
        )}

        {/* Search and Filter */}
        <div className="bg-white dark:bg-gray-800 p-6 md:p-8 mb-12 border border-gray-100 dark:border-gray-700">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
            <EnhancedSearchBar
  onSearch={setSearchQuery}
  placeholder="Rechercher des recettes, ingrédients ou tags..."
/>
            </div>
        <EnhancedRecipeFilter
          filters={filters}
          onFilterChange={setFilters}
          categories={categories}
          tags={tags}
        />
          </div>

          {/* Sort */}
          <div className="flex items-center gap-4">
            <label 
              className="text-sm font-semibold text-gray-700 dark:text-gray-300 font-inter"
            >
              Trier :
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 focus:ring-2 focus:ring-[#FF7A7A] focus:border-transparent font-medium text-sm transition-all font-inter"
            >
              <option value="newest">Plus récentes d&apos;abord</option>
              <option value="rating">Meilleure note</option>
              <option value="quickest">Plus rapides d&apos;abord</option>
              <option value="title">Alphabétique</option>
            </select>
          </div>

          {/* Active filters */}
          {(searchQuery || Object.keys(filters).length > 0) && (
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-medium">Filtres actifs :</span>
                {searchQuery && (
                  <span className="px-3 py-1 bg-[#FF7A7A]/10 dark:bg-[#6FCF97]/20 text-[#FF7A7A] dark:text-[#6FCF97] rounded-full text-sm">
                    Recherche : &ldquo;{searchQuery}&rdquo;
                  </span>
                )}
                {filters.category && (
                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">
                    {filters.category}
                  </span>
                )}
                <button
                  onClick={() => {
                    setFilters({});
                    setSearchQuery('');
                  }}
                  className="text-sm text-[#FF7A7A] hover:text-[#6FCF97] font-medium"
                >
                  Tout effacer
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Results count */}
        <div className="mb-8">
          <p 
            className="text-gray-600 dark:text-gray-400 font-medium"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Affichage de <span className="font-bold text-[#FF7A7A]">{filteredRecipes.length}</span> recettes
          </p>
        </div>

        {/* Recipe Grid */}
        {paginatedRecipes.length > 0 ? (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8 md:gap-x-4 md:gap-y-8 mb-16">
              {paginatedRecipes.map((recipe, index) => (
                <RecipeCard 
                  key={`${recipe.slug}-${index}`} 
                  recipe={recipe} 
                  index={index} 
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}
          </>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-6">🔍</div>
            <h3 
              className="text-2xl font-bold mb-4 text-gray-900 dark:text-white"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Aucune recette trouvée
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Essayez d&apos;ajuster vos filtres ou de rechercher autre chose
            </p>
            <button
              onClick={() => {
                setFilters({});
                setSearchQuery('');
              }}
              className="px-6 py-3 bg-[#FF7A7A] text-white rounded-full hover:bg-[#6FCF97] font-semibold transition-colors"
            >
              Réinitialiser tous les filtres
            </button>
          </div>
        )}


        {/* CTA Section - After everything */}
        <div className="mt-20 pt-16 border-t border-gray-200 dark:border-gray-800">
          <div className="max-w-3xl mx-auto text-center">
            <h2 
              className="text-3xl md:text-4xl font-bold mb-6"
              style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}
            >
              Vous n&apos;avez pas trouvé ce que vous cherchiez ?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
              Nous ajoutons de nouvelles recettes chaque semaine. Abonnez-vous à notre newsletter pour ne rien manquer !
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="inline-flex items-center justify-center px-8 py-3 bg-[#FF7A7A] text-white rounded-full font-semibold hover:bg-[#6FCF97] transition-colors shadow-lg"
              >
                Retour à l&apos;accueil
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                href="/blogg"
                className="inline-flex items-center px-8 py-3 border-2 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white rounded-full font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                Lire nos guides culinaires
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

