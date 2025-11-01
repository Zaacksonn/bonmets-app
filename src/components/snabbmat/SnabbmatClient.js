'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Clock,
  Zap,
  Star,
  Users,
  ChefHat,
  ArrowRight,
  Heart,
  Sparkles,
  CheckCircle,
  Filter,
  Search,
  Timer
} from 'lucide-react';

export default function SnabbmatClient({ 
  quickRecipes, 
  veryQuick, 
  quick, 
  easyRecipes, 
  mediumRecipes 
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [timeFilter, setTimeFilter] = useState('all');
  const [difficultyFilter, setDifficultyFilter] = useState('all');

  // Filter recipes based on search and filters
  const filteredRecipes = quickRecipes.filter(recipe => {
    const matchesSearch = recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         recipe.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTime = timeFilter === 'all' || 
                       (timeFilter === 'very-quick' && (recipe.totalTimeMinutes || 0) <= 15) ||
                       (timeFilter === 'quick' && (recipe.totalTimeMinutes || 0) > 15 && (recipe.totalTimeMinutes || 0) <= 30);
    
    const matchesDifficulty = difficultyFilter === 'all' ||
                             (difficultyFilter === 'easy' && recipe.difficulty?.toLowerCase() === 'lätt') ||
                             (difficultyFilter === 'medium' && recipe.difficulty?.toLowerCase() === 'medel');
    
    return matchesSearch && matchesTime && matchesDifficulty;
  });

  const getTimeColor = (minutes) => {
    if (minutes <= 15) return 'text-green-600 bg-green-100';
    if (minutes <= 30) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'lätt': return 'text-green-600 bg-green-100';
      case 'medel': return 'text-yellow-600 bg-yellow-100';
      case 'svår': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF8F3] to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <Zap className="w-12 h-12" />
              <h1 className="text-4xl md:text-6xl font-bold font-playfair">
                Snabbmat Recept
              </h1>
            </div>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
              Goda recept under 30 minuter för när du har bråttom men vill äta gott. 
              Perfekt för vardag, fest och alla tillfällen.
            </p>
            
            {/* Quick Stats */}
            <div className="flex flex-wrap justify-center gap-6 md:gap-8 mb-8">
              <div className="flex items-center gap-2">
                <Clock className="w-6 h-6" />
                <span className="text-lg font-semibold">{quickRecipes.length} snabba recept</span>
              </div>
              <div className="flex items-center gap-2">
                <Timer className="w-6 h-6" />
                <span className="text-lg font-semibold">Under 30 min</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                <span className="text-lg font-semibold">4.8/5 betyg</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Sök snabba recept..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>

            {/* Filters */}
            <div className="flex gap-4">
              <select
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value)}
                className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="all">Alla tider</option>
                <option value="very-quick">Under 15 min</option>
                <option value="quick">15-30 min</option>
              </select>

              <select
                value={difficultyFilter}
                onChange={(e) => setDifficultyFilter(e.target.value)}
                className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="all">Alla svårigheter</option>
                <option value="easy">Lätt</option>
                <option value="medium">Medel</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats Cards */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center p-4 rounded-lg bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20"
            >
              <div className="text-3xl md:text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
                {veryQuick.length}
              </div>
              <div className="text-sm md:text-base text-gray-600 dark:text-gray-400">
                Under 15 min
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-center p-4 rounded-lg bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20"
            >
              <div className="text-3xl md:text-4xl font-bold text-yellow-600 dark:text-yellow-400 mb-2">
                {quick.length}
              </div>
              <div className="text-sm md:text-base text-gray-600 dark:text-gray-400">
                15-30 min
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center p-4 rounded-lg bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20"
            >
              <div className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                {easyRecipes.length}
              </div>
              <div className="text-sm md:text-base text-gray-600 dark:text-gray-400">
                Enkla recept
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-center p-4 rounded-lg bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20"
            >
              <div className="text-3xl md:text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                {quickRecipes.length}
              </div>
              <div className="text-sm md:text-base text-gray-600 dark:text-gray-400">
                Totalt snabba
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Recipes Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Snabba Recept
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              {filteredRecipes.length} recept hittade
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRecipes.map((recipe, index) => (
              <motion.div
                key={recipe.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  href={`/recept/${recipe.slug}`}
                  className="block group"
                >
                  <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 border border-gray-200 dark:border-gray-700">
                    <div className="relative h-48">
                      <Image
                        src={recipe.heroImage?.src || recipe.heroImage || '/images/placeholder-recipe.webp'}
                        alt={recipe.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTimeColor(recipe.totalTimeMinutes || 30)}`}>
                          {recipe.totalTimeMinutes || 30} min
                        </span>
                      </div>
                      <div className="absolute top-4 right-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(recipe.difficulty)}`}>
                          {recipe.difficulty || 'Medel'}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                        {recipe.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                        {recipe.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            <span>{recipe.servings || 4} portioner</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span>{recipe.ratingAverage || 4.5}</span>
                          </div>
                        </div>
                        <ArrowRight className="w-5 h-5 text-purple-600 dark:text-purple-400 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {filteredRecipes.length === 0 && (
            <div className="text-center py-12">
              <Clock className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Inga recept hittades
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Prova att ändra dina sökfilter eller söktermer
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Tips Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Sparkles className="w-12 h-12 mx-auto mb-4 text-purple-600" />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Tips för Snabb Matlagning
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Så lagar du snabbt och effektivt
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Zap,
                title: 'Förbered i förväg',
                tip: 'Hacka grönsaker, mät ingredienser och förbered såser i förväg. Då går matlagningen mycket snabbare när det är dags att laga mat.'
              },
              {
                icon: Clock,
                title: 'Använd enkla tekniker',
                tip: 'Stekning, wok och ugn är snabbare än långsam tillagning. Välj recept med få steg och enkla tekniker för snabbast resultat.'
              },
              {
                icon: ChefHat,
                title: 'Kombinera smart',
                tip: 'Laga enkla rätter med få ingredienser. Pasta med sås, wok med grönsaker eller ugnsgräddade rätter är ofta snabbast.'
              }
            ].map((tip, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <tip.icon className="w-8 h-8 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      {tip.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                      {tip.tip}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Zap className="w-16 h-16 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Redo att Laga Snabbt?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Upptäck våra {quickRecipes.length} snabba recept och laga gott på rekordtid!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/recept"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-purple-600 font-semibold rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                Utforska Alla Recept
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/maltider"
                className="inline-flex items-center gap-2 px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-purple-600 transform hover:scale-105 transition-all duration-300"
              >
                Se Måltider
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
