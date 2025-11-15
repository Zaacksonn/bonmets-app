'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Search,
  Filter,
  Grid,
  List,
  Star,
  Clock,
  Users,
  ChefHat,
  ArrowRight,
  BookOpen,
  Heart,
  TrendingUp,
  Sparkles,
  CheckCircle
} from 'lucide-react';

export default function EnhancedKategorierClient({
  allCategories,
  popularCategories,
  otherCategories,
  totalRecipes
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('popular');

  // Filter and sort categories based on search and sort options
  const filteredCategories = allCategories
    .filter(category => 
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'popular':
          return b.count - a.count;
        case 'alphabetical':
          return a.name.localeCompare(b.name);
        case 'newest':
          return b.count - a.count; // For now, same as popular
        default:
          return b.count - a.count;
      }
    });

  const displayedCategories = searchTerm ? filteredCategories : allCategories;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF8F3] to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-[#FF7A7A] via-[#FFA07A] to-[#6FCF97] text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 font-playfair">
              Toutes les catégories de recettes
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
              Découvrez plus de {totalRecipes} recettes dans {allCategories.length} catégories. 
              Des plats français classiques aux favoris internationaux.
            </p>
            
            {/* Quick Stats */}
            <div className="flex flex-wrap justify-center gap-6 md:gap-8 mb-8">
              <div className="flex items-center gap-2">
                <BookOpen className="w-6 h-6" />
                <span className="text-lg font-semibold">{totalRecipes}+ recettes</span>
              </div>
              <div className="flex items-center gap-2">
                <ChefHat className="w-6 h-6" />
                <span className="text-lg font-semibold">{allCategories.length} catégories</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                <span className="text-lg font-semibold">4.8/5 note</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Rechercher des catégories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#FF7A7A] focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>

            {/* Sort and View Controls */}
            <div className="flex gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#FF7A7A] dark:bg-gray-700 dark:text-white"
              >
                <option value="popular">Les plus populaires</option>
                <option value="alphabetical">Alphabétique</option>
                <option value="newest">Plus récentes</option>
              </select>

              <div className="flex border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-3 ${viewMode === 'grid' ? 'bg-[#FF7A7A] text-white' : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300'}`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-3 ${viewMode === 'list' ? 'bg-[#FF7A7A] text-white' : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300'}`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Categories Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <TrendingUp className="w-8 h-8 text-[#FF7A7A]" />
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                Catégories populaires
              </h2>
            </div>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Nos catégories les plus appréciées avec le plus de recettes et les meilleures notes
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularCategories.map((category, index) => (
              <motion.div
                key={category.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={`/categories/${category.slug}`}
                  className="block group"
                >
                  <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-gray-200 dark:border-gray-700">
                    <div className="relative h-48">
                      <Image
                        src={category.image}
                        alt={category.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                      <div className="absolute top-4 right-4">
                        <span className="text-3xl">{category.icon}</span>
                      </div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-xl font-bold text-white mb-1">
                          {category.name}
                        </h3>
                        <p className="text-sm text-white/90 mb-2">
                          {category.count} recept
                        </p>
                      </div>
                    </div>
                    <div className="p-6">
                      <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                        {category.description}
                      </p>
                      <div className="flex items-center justify-between mt-4">
                        <span className="text-[#FF7A7A] dark:text-[#6FCF97] font-semibold text-sm">
                          Explorer les recettes
                        </span>
                        <ArrowRight className="w-4 h-4 text-[#FF7A7A] dark:text-[#6FCF97] group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* All Categories Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Toutes les catégories
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Explorer toutes nos {allCategories.length} catégories de recettes
            </p>
          </motion.div>

          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {displayedCategories.map((category, index) => (
                <motion.div
                  key={category.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={`/categories/${category.slug}`}
                    className="block group"
                  >
                    <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 border border-gray-200 dark:border-gray-700">
                      <div className="relative h-32">
                        <Image
                          src={category.image}
                          alt={category.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                        <div className="absolute top-3 right-3">
                          <span className="text-2xl">{category.icon}</span>
                        </div>
                        <div className="absolute bottom-3 left-3 right-3">
                          <h3 className="text-lg font-bold text-white">
                            {category.name}
                          </h3>
                          <p className="text-xs text-white/90">
                            {category.count} recept
                          </p>
                        </div>
                      </div>
                      <div className="p-4">
                        <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
                          {category.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {displayedCategories.map((category, index) => (
                <motion.div
                  key={category.slug}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={`/categories/${category.slug}`}
                    className="block group"
                  >
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700">
                      <div className="flex items-center gap-4">
                        <div className="relative w-20 h-20 flex-shrink-0">
                          <Image
                            src={category.image}
                            alt={category.name}
                            fill
                            className="object-cover rounded-lg group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-2xl">{category.icon}</span>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                              {category.name}
                            </h3>
                            <span className="px-3 py-1 bg-[#FF7A7A]/10 dark:bg-[#6FCF97]/20 text-[#FF7A7A] dark:text-[#6FCF97] rounded-full text-sm font-medium">
                              {category.count} recept
                            </span>
                          </div>
                          <p className="text-gray-600 dark:text-gray-400">
                            {category.description}
                          </p>
                        </div>
                        <ArrowRight className="w-6 h-6 text-gray-400 group-hover:text-[#FF7A7A] dark:group-hover:text-[#6FCF97] group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Sparkles className="w-12 h-12 mx-auto mb-4 text-[#FF7A7A]" />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Questions fréquentes sur les catégories
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Réponses aux questions les plus courantes sur nos catégories de recettes
            </p>
          </motion.div>

          <div className="space-y-4">
            {[
              {
                question: 'Combien de catégories de recettes y a-t-il ?',
                answer: `Nous avons ${allCategories.length} catégories de recettes différentes avec plus de ${totalRecipes} recettes au total. Les catégories incluent tout, du poulet et des pâtes aux plats végétariens et aux desserts français classiques.`
              },
              {
                question: 'Quelles sont les catégories de recettes les plus populaires ?',
                answer: `Nos catégories les plus populaires sont ${popularCategories.slice(0, 3).map(cat => cat.name).join(', ')} et ${popularCategories[3].name}. Ces catégories contiennent le plus de recettes et sont favorites parmi nos utilisateurs.`
              },
              {
                question: 'Y a-t-il des catégories de recettes végétariennes ?',
                answer: 'Oui, nous avons une catégorie végétarienne dédiée avec de nombreuses recettes. De plus, vous trouverez des options végétariennes dans d\'autres catégories comme les pâtes, les salades et les accompagnements.'
              },
              {
                question: 'Puis-je filtrer les recettes par niveau de difficulté ?',
                answer: 'Oui, toutes nos recettes sont étiquetées avec un niveau de difficulté (Facile, Moyen, Difficile) pour que vous puissiez facilement trouver des recettes adaptées à votre niveau d\'expérience. Parfait pour les débutants et les cuisiniers expérimentés !'
              },
              {
                question: 'Les catégories sont-elles mises à jour régulièrement ?',
                answer: 'Oui, nous ajoutons continuellement de nouvelles recettes et catégories. Suivez-nous pour recevoir les dernières mises à jour et de nouvelles inspirations culinaires directement dans votre flux.'
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700"
              >
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3 text-lg">
                  {faq.question}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[#FF7A7A] to-[#6FCF97] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Heart className="w-16 h-16 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Prêt à commencer à cuisiner ?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Explorez nos {totalRecipes}+ recettes et trouvez votre prochain plat favori !
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/recettes"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#FF7A7A] font-semibold rounded-lg hover:shadow-lg hover:text-[#6FCF97] transform hover:scale-105 transition-all duration-300"
              >
                Explorer toutes les recettes
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-purple-600 transform hover:scale-105 transition-all duration-300"
              >
                Tillbaka till Hem
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
