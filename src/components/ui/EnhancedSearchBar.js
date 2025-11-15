'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Search, X, Clock, Star, Utensils } from 'lucide-react';
import { searchContent } from '@/lib/utils/search';

/**
 * EnhancedSearchBar - A search bar component with autocomplete results
 * 
 * This component handles local search results display and delegates
 * actual search filtering to the parent via the onSearch callback.
 * 
 * @param {Array} recipes - List of recipes for local autocomplete (optional)
 * @param {Function} onSearch - Callback function called when user submits search
 * @param {String} placeholder - Placeholder text for input
 */
export default function EnhancedSearchBar({ 
  recipes = [], 
  onSearch, 
  placeholder = "Rechercher des recettes, des ingrédients ou des tags..." 
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const router = useRouter();
  const searchRef = useRef(null);
  const inputRef = useRef(null);
  
  // Store onSearch in a ref to avoid dependency issues
  // This allows us to call onSearch without triggering re-renders
  const onSearchRef = useRef(onSearch);
  
  // Update ref when onSearch prop changes, but don't trigger effects
  // We initialize the ref and sync it, but never depend on it in useEffect
  onSearchRef.current = onSearch;

  // Handle click outside to close search
  // Only active when search is open
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
        setShowResults(false);
        setQuery('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Handle local search results for autocomplete
  // This only updates local state for display, never calls onSearch
  useEffect(() => {
    // Reset results if query is too short
    if (query.length < 2) {
      setResults([]);
      setShowResults(false);
      return;
    }

    setIsLoading(true);
    const timeoutId = setTimeout(() => {
      try {
        const searchResults = searchContent(recipes, query);
        setResults(searchResults.slice(0, 8)); // Limit to 8 results
        setShowResults(true);
      } catch (error) {
        console.error('Error in local search:', error);
        setResults([]);
        setShowResults(false);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query, recipes]);

  // Handle form submission - only time we call onSearch
  const handleSearch = useCallback((e) => {
    e.preventDefault();
    
    if (query.trim()) {
      // Call parent's onSearch callback only when user explicitly submits
      if (onSearchRef.current && typeof onSearchRef.current === 'function') {
        onSearchRef.current(query.trim());
      }
      // Navigate to search results page
      router.push(`/recettes?q=${encodeURIComponent(query.trim())}`);
    }
    
    // Close search UI
    setIsOpen(false);
    setQuery('');
    setShowResults(false);
  }, [query, router]);

  // Handle result click - navigate directly, don't call onSearch
  const handleResultClick = useCallback((recipe) => {
    router.push(`/recettes/${recipe.slug}`);
    setIsOpen(false);
    setQuery('');
    setShowResults(false);
  }, [router]);

  // Handle close button
  const handleClose = useCallback(() => {
    setIsOpen(false);
    setQuery('');
    setShowResults(false);
  }, []);

  // Handle open search
  const handleOpen = useCallback(() => {
    setIsOpen(true);
    // Focus input after state update
    setTimeout(() => inputRef.current?.focus(), 100);
  }, []);

  // Handle suggestion click
  const handleSuggestionClick = useCallback((suggestion) => {
    setQuery(suggestion);
    // Focus input after setting query
    setTimeout(() => inputRef.current?.focus(), 0);
  }, []);

  // Helper: Get difficulty color class
  const getDifficultyColor = useCallback((difficulty) => {
    switch (difficulty) {
      case 'Lätt': return 'text-green-600';
      case 'Medel': return 'text-yellow-600';
      case 'Svår': return 'text-red-600';
      default: return 'text-gray-600';
    }
  }, []);

  // Helper: Format time display
  const formatTime = useCallback((minutes) => {
    if (!minutes) return '';
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}min` : `${hours}h`;
  }, []);

  const popularSuggestions = [
    'Pâtes', 
    'Végétarien', 
    'Rapide', 
    'Dessert', 
    'Petit déjeuner', 
    'Viande', 
    'Poisson', 
    'Salade'
  ];

  return (
    <div className="relative" ref={searchRef}>
      {/* Search Button */}
      <button
        type="button"
        onClick={handleOpen}
        className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
        aria-label="Ouvrir la recherche"
      >
        <Search className="w-5 h-5" />
      </button>

      {/* Search Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-20">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl mx-4">
            {/* Search Input */}
            <form onSubmit={handleSearch} className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-3">
                <Search className="w-5 h-5 text-gray-400 flex-shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={placeholder}
                  className="flex-1 text-lg bg-transparent border-none outline-none text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  autoFocus
                  aria-label="Rechercher des recettes"
                />
                <button
                  type="button"
                  onClick={handleClose}
                  className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 flex-shrink-0"
                  aria-label="Fermer la recherche"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </form>

            {/* Search Results */}
            {showResults && (
              <div className="max-h-96 overflow-y-auto">
                {isLoading ? (
                  <div className="p-8 text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">Recherche...</p>
                  </div>
                ) : results.length > 0 ? (
                  <div className="p-2">
                    {results.map((recipe) => (
                      <button
                        key={recipe.slug}
                        type="button"
                        onClick={() => handleResultClick(recipe)}
                        className="w-full text-left p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
                            {recipe.heroImage?.src ? (
                              <Image
                                src={recipe.heroImage.src}
                                alt={recipe.title}
                                width={48}
                                height={48}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <Utensils className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium text-gray-900 dark:text-white truncate">
                              {recipe.title}
                            </h3>
                            {recipe.excerpt && (
                              <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                                {recipe.excerpt}
                              </p>
                            )}
                            <div className="flex items-center space-x-4 mt-1">
                              {recipe.difficulty && (
                                <span className={`text-xs font-medium ${getDifficultyColor(recipe.difficulty)}`}>
                                  {recipe.difficulty}
                                </span>
                              )}
                              {recipe.totalTimeMinutes && (
                                <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                                  <Clock className="w-3 h-3 mr-1" />
                                  {formatTime(recipe.totalTimeMinutes)}
                                </span>
                              )}
                              {recipe.ratingAverage && (
                                <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                                  <Star className="w-3 h-3 mr-1 fill-current text-yellow-400" />
                                  {recipe.ratingAverage}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                ) : query.length >= 2 ? (
                  <div className="p-8 text-center">
                    <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 dark:text-gray-400">
                      Aucune recette trouvée pour « {query} »
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                      Essayez de rechercher des ingrédients ou des tags
                    </p>
                  </div>
                ) : null}
              </div>
            )}

            {/* Search Suggestions */}
            {!showResults && query.length < 2 && (
              <div className="p-4">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                  Recherches populaires
                </h3>
                <div className="flex flex-wrap gap-2">
                  {popularSuggestions.map((suggestion) => (
                    <button
                      key={suggestion}
                      type="button"
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
