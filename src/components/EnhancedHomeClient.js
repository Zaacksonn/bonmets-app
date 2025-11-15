'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Clock, Users, Star, ArrowRight, Utensils, Heart, Globe, Zap } from 'lucide-react';
import RecipeCard from '@/components/recipe/RecipeCard';
import { getAllCategories } from '@/lib/categories';

export default function EnhancedHomeClient({
  popularCategories,
  totalRecipes,
  featuredRecipes,
  allRecipes,
  articles,
  authors
}) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const allCategories = getAllCategories();

  // Auto-sliding hero images
  const heroImages = [
    {
        src: '/images/kyckling-i-kramig-svampsas-recept.webp',
        alt: 'Poulet dans une sauce crémeuse aux champignons',
        title: 'Nos meilleures recettes de poulet',
        subtitle: 'Simples et pleines de saveurs – parfaites en semaine comme le week‑end.',
        positionClass: 'object-right object-center md:object-center'
      },
      {
        src: '/images/amerikanska-pannkakor-med-banan-och-blabar.webp',
        alt: 'Pancakes américains à la banane et aux myrtilles',
        title: 'Pancakes américains moelleux',
        subtitle: 'Gourmands et parfaits pour le brunch.',
        positionClass: 'object-right object-bottom md:object-[center_80%]'
      },
      {
        src: '/images/fika-och-bakning-svensk-stil.webp',
        alt: 'Pâtisserie et goûter',
        title: 'Savourez l’instant avec la pâtisserie',
        subtitle: 'Douceurs du quotidien ou plaisirs du week‑end à partager.',
        positionClass: 'object-right object-center md:object-[center_80%]'
      }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  const quickAccessItems = [
    {
      title: 'Recettes de crêpes',
      description: 'Moelleuses et gourmandes',
      href: '/categories/pannkakor-recept',
      color: 'from-yellow-400 to-orange-500',
      image: '/images/pannkakor-recept.webp'
    },
    {
      title: 'Recettes de viande de poulet hachée',
      description: 'Simples et rassasiantes',
      href: '/categories/kycklingfars-recept',
      color: 'from-orange-400 to-red-500',
      image: '/images/kycklingfarsbiffar-med-potatis-och-lingon.webp'
    },
    {
      title: 'Recettes de poulet',
      description: 'Saines et savoureuses',
      href: '/categories/kyckling-recept',
      color: 'from-amber-400 to-yellow-500',
      image: '/images/kyckling-recept.webp'
    },
    {
      title: 'Recettes de pâtes',
      description: 'Favoris italiens',
      href: '/categories/pasta-recept',
      color: 'from-red-400 to-pink-500',
      image: '/images/pasta-recept-kyckling-svampsas.webp'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[70vh] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={heroImages[currentSlide].src}
            alt={heroImages[currentSlide].alt}
            fill
            sizes="100vw"
            className={`object-cover transition-opacity duration-1000 ${heroImages[currentSlide].positionClass || 'hero-mobile-right-desktop-center'}`}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />
        </div>
        
        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl"
            >
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                {heroImages[currentSlide].title}
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 mb-8">
                {heroImages[currentSlide].subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/recettes"
                  className="bg-[#FF7A7A] hover:bg-[#6FCF97] text-white px-8 py-3 rounded-lg font-semibold transition-colors inline-flex items-center"
                >
                  Découvrir toutes les recettes
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <Link
                  href="/plats-rapides"
                  className="bg-white/20 hover:bg-white/30 text-white px-8 py-3 rounded-lg font-semibold transition-colors backdrop-blur-sm"
                >
                  Plats rapides
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentSlide ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Quick Access */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Recherches les plus populaires
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Recettes populaires que les autres adorent
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickAccessItems.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link
                  href={item.href}
                  className="block group"
                >
                  <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-gray-100 dark:border-gray-700 group">
                    {/* Image with elegant title overlay */}
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="100vw"
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      {/* Elegant gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      
                      {/* Professional title at bottom */}
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <h3 className="text-2xl font-bold text-white leading-tight drop-shadow-2xl">
                          {item.title}
                        </h3>
                      </div>
                    </div>
                    
                    {/* Minimal action section */}
                    <div className="bg-white dark:bg-gray-800 p-4 border-t border-gray-100 dark:border-gray-700">
                      <div className="flex items-center justify-center text-gray-600 dark:text-gray-400 text-sm font-medium group-hover:text-[#FF7A7A] dark:group-hover:text-[#6FCF97] transition-colors">
                        <span>Explorer les recettes</span>
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* Featured Recipes */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Recettes mises en avant
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Nos recettes les plus populaires et appréciées
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredRecipes.slice(0, 8).map((recipe, index) => (
              <motion.div
                key={recipe.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <RecipeCard 
                  recipe={recipe} 
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link
              href="/recettes"
              className="bg-[#FF7A7A] hover:bg-[#6FCF97] text-white px-8 py-3 rounded-lg font-semibold transition-colors inline-flex items-center"
            >
              Voir toutes les recettes
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Catégories populaires
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Découvrez des recettes selon vos préférences
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {popularCategories.map((category, index) => (
              <motion.div
                key={category.slug}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
              >
                <Link
                  href={`/categories/${category.slug}`}
                  className="block group"
                >
                  <div className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                    <div className="relative h-32">
                      <Image
                        src={category.image}
                        alt={category.name}
                        fill
                        sizes="100vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                        {category.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {category.count}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Welcome/About Section - SEO Rich Content */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Bienvenue sur Bonmets – La meilleure collection de recettes pour toutes les occasions
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700 dark:text-gray-300 text-left space-y-4">
              <p>
                Bonmets est votre source ultime pour les <Link href="/recettes" className="text-[#FF7A7A] hover:text-[#6FCF97] font-semibold">recettes</Link>, la <strong>pâtisserie</strong> et les guides de cuisine. 
                Nous proposons plus de {totalRecipes} recettes testées pour tous les goûts – des 
                <Link href="/plats-rapides" className="text-[#FF7A7A] hover:text-[#6FCF97] font-semibold">repas rapides</Link> du quotidien aux menus de fête.
              </p>
              <p>
                Que vous cherchiez des <Link href="/categories/kyckling-recept" className="text-[#FF7A7A] hover:text-[#6FCF97] font-semibold">recettes de poulet</Link>, des <Link href="/categories/vegetariska-recept" className="text-[#FF7A7A] hover:text-[#6FCF97] font-semibold">plats végétariens</Link>,
                des options sans gluten ou des classiques comme les
                <Link href="/categories/pannkakor-recept" className="text-[#FF7A7A] hover:text-[#6FCF97] font-semibold">crêpes</Link> et le <Link href="/categories/kladdkaka-recept" className="text-[#FF7A7A] hover:text-[#6FCF97] font-semibold">gâteau au chocolat</Link>, tout est ici
                sur Bonmets. Nos <Link href="/recettes" className="text-[#FF7A7A] hover:text-[#6FCF97] font-semibold">recettes</Link> sont sélectionnées et testées pour garantir votre réussite.
              </p>
              <p>
                Nous pensons que cuisiner doit être simple et agréable. Chaque <Link href="/recettes" className="text-[#FF7A7A] hover:text-[#6FCF97] font-semibold">recette</Link>
                comprend des étapes claires, une liste d&apos;ingrédients précise, des informations nutritionnelles et des astuces pratiques.
                Du petit déjeuner au dessert – retrouvez <Link href="/categories" className="text-[#FF7A7A] hover:text-[#6FCF97] font-semibold">les catégories</Link> qui facilitent votre cuisine.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Bakstunden Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Pourquoi choisir Bonmets pour vos recettes ?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md"
            >
              <Utensils className="w-12 h-12 text-[#FF7A7A] mb-4" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                Recettes testées
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Toutes nos recettes sont soigneusement testées dans notre cuisine. Nous garantissons des résultats parfaits 
                chaque fois que vous suivez nos instructions étape par étape pour la cuisine et la pâtisserie.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md"
            >
              <Clock className="w-12 h-12 text-[#FF7A7A] mb-4" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                Recettes rapides du quotidien
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Besoin de <strong>repas rapides</strong> en moins de 30 minutes ? Nous avons de nombreuses recettes simples 
                pour le quotidien, parfaites quand le temps est compté mais que vous voulez quand même servir des plats faits maison et savoureux.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md"
            >
              <Heart className="w-12 h-12 text-[#FF7A7A] mb-4" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                Options saines
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Découvrez nos <strong>recettes végétariennes</strong>, options véganes et 
                plats sans gluten. Nous montrons qu&apos;une alimentation saine peut être à la fois savoureuse et facile à préparer.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md"
            >
              <Globe className="w-12 h-12 text-[#FF7A7A] mb-4" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                Favoris incontournables
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Vous aimez les classiques de la cuisine française ? Nous avons les meilleures recettes de crêpes françaises, 
                quiches, gâteaux au chocolat et autres plats traditionnels français.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Cooking Tips Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Astuces cuisine pour de meilleurs résultats
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Apprenez nos meilleurs conseils pour réussir en cuisine et en pâtisserie. 
              Nous partageons ici des connaissances qui feront de vous un meilleur cuisinier.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg"
            >
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                <Zap className="w-6 h-6 text-yellow-500 mr-2" />
                Conseils pour des repas rapides
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                Préparez les ingrédients à l&apos;avance pour gagner du temps. Hachez les légumes, marinez la viande et mesurez les épices 
                avant de commencer à cuisiner. Cela rend la cuisine beaucoup plus rapide et fluide.
              </p>
              <Link href="/plats-rapides" className="text-[#FF7A7A] hover:text-[#6FCF97] font-semibold inline-flex items-center">
                En savoir plus <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg"
            >
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                <Star className="w-6 h-6 text-yellow-500 mr-2" />
                Conseils de pâtisserie pour des résultats parfaits
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                Mesurez toujours les ingrédients avec précision lors de la pâtisserie. Utilisez des ingrédients à température ambiante 
                pour de meilleurs résultats dans les gâteaux, tartes et pains. 
                Préchauffez le four bien à l&apos;avance avant de commencer à cuire.
              </p>
              <Link href="/categories/kladdkaka-recept" className="text-[#FF7A7A] hover:text-[#6FCF97] font-semibold inline-flex items-center">
                Voir les recettes de pâtisserie <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg"
            >
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                <Users className="w-6 h-6 text-yellow-500 mr-2" />
                Ajustement des portions
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                Besoin d&apos;ajuster une recette pour plus ou moins de personnes ? Multipliez ou divisez 
                les ingrédients proportionnellement. Notez que les temps de cuisson peuvent nécessiter un ajustement pour de plus grandes portions.
              </p>
              <Link href="/recettes" className="text-[#FF7A7A] hover:text-[#6FCF97] font-semibold inline-flex items-center">
                Explorer toutes les recettes <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-[#FF7A7A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-white mb-2">{totalRecipes}+</div>
              <div className="text-white/90">Recettes testées pour toutes les occasions</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">15+</div>
              <div className="text-white/90">Catégories du petit déjeuner au dessert</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">100%</div>
              <div className="text-white/90">Recettes françaises avec guide étape par étape</div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section - SEO Rich */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Questions fréquentes sur la cuisine et la pâtisserie
          </h2>
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg"
            >
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                Quels types de recettes trouve-t-on sur Bonmets ?
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Sur Bonmets, vous trouverez plus de {totalRecipes} <Link href="/recettes" className="text-[#FF7A7A] hover:text-[#6FCF97] underline">recettes</Link> dans des catégories comme 
                petit déjeuner, déjeuner, dîner, <Link href="/plats-rapides" className="text-[#FF7A7A] hover:text-[#6FCF97] underline">plats rapides</Link>, 
                pâtisserie et dessert. Nous avons tout, des <Link href="/categories/pannkakor-recept" className="text-[#FF7A7A] hover:text-[#6FCF97] underline">crêpes</Link> aux 
                <Link href="/categories/vafflor-recept" className="text-[#FF7A7A] hover:text-[#6FCF97] underline">gaufres</Link>, en passant par les <Link href="/categories/kyckling-recept" className="text-[#FF7A7A] hover:text-[#6FCF97] underline">recettes de poulet</Link>, les <Link href="/categories/pasta-recept" className="text-[#FF7A7A] hover:text-[#6FCF97] underline">pâtes</Link>, 
                les <Link href="/categories/vegetariska-recept" className="text-[#FF7A7A] hover:text-[#6FCF97] underline">plats végétariens</Link> et les classiques de la pâtisserie française comme 
                le <Link href="/categories/kladdkaka-recept" className="text-[#FF7A7A] hover:text-[#6FCF97] underline">gâteau au chocolat</Link> et les <Link href="/categories/chokladbollar-recept" className="text-[#FF7A7A] hover:text-[#6FCF97] underline">boules de chocolat</Link>.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg"
            >
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                Comment trouver des recettes simples pour le quotidien ?
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Utilisez notre <Link href="/plats-rapides" className="text-[#FF7A7A] hover:text-[#6FCF97] underline">section plats rapides</Link> pour trouver des dîners rapides en moins de 30 minutes. 
                Vous pouvez également filtrer les <Link href="/recettes" className="text-[#FF7A7A] hover:text-[#6FCF97] underline">recettes</Link> par niveau de difficulté &quot;Facile&quot; pour trouver des recettes simples adaptées 
                aux débutants. Toutes nos <Link href="/recettes" className="text-[#FF7A7A] hover:text-[#6FCF97] underline">recettes du quotidien</Link> sont faciles à suivre avec des instructions claires et 
                des ingrédients disponibles dans votre épicerie locale.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg"
            >
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                Y a-t-il des recettes végétariennes et véganes ?
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Oui ! Nous avons une large sélection de <Link href="/categories/vegetariska-recept" className="text-[#FF7A7A] hover:text-[#6FCF97] underline">recettes végétariennes</Link> et d&apos;options véganes. 
                Utilisez nos filtres pour trouver des <Link href="/categories/vegetariska-recept" className="text-[#FF7A7A] hover:text-[#6FCF97] underline">plats végétariens</Link>, des plats véganes ou 
                des recettes sans gluten. Nous montrons comment préparer des plats nutritifs et savoureux sans produits d&apos;origine animale, 
                parfait pour ceux qui souhaitent manger plus sainement et adopter une alimentation à base de plantes.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg"
            >
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                Qu&apos;est-ce qui rend les recettes de Bonmets spéciales ?
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Toutes nos <strong>recettes françaises</strong> sont soigneusement testées et contiennent des 
                instructions détaillées étape par étape, des listes d&apos;ingrédients claires, des informations nutritionnelles et 
                des conseils pratiques. Nous nous concentrons sur la cuisine maison avec des ingrédients que vous trouvez dans les 
                épiceries françaises. Nos recettes conviennent à tous les niveaux – des débutants aux cuisiniers expérimentés à la recherche de nouvelles 
                idées culinaires et de recettes de pâtisserie.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg"
            >
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                Comment puis-je planifier mon menu de la semaine ?
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Utilisez nos différentes <Link href="/categories" className="text-[#FF7A7A] hover:text-[#6FCF97] underline">catégories</Link> pour créer un menu hebdomadaire varié. Mélangez 
                les <Link href="/categories/kyckling-recept" className="text-[#FF7A7A] hover:text-[#6FCF97] underline">recettes de poulet</Link>, les <Link href="/categories/lax-recept" className="text-[#FF7A7A] hover:text-[#6FCF97] underline">plats de poisson</Link>, les <Link href="/categories/pasta-recept" className="text-[#FF7A7A] hover:text-[#6FCF97] underline">pâtes</Link> et 
                les <Link href="/categories/vegetariska-recept" className="text-[#FF7A7A] hover:text-[#6FCF97] underline">dîners végétariens</Link> pour une alimentation équilibrée. Choisissez quelques <Link href="/plats-rapides" className="text-[#FF7A7A] hover:text-[#6FCF97] underline">plats rapides du quotidien</Link> 
                pour les jours stressants et planifiez un dîner de week-end plus élaboré quand vous avez plus de temps. 
                Enregistrez vos <Link href="/recettes" className="text-[#FF7A7A] hover:text-[#6FCF97] underline">recettes favorites</Link> pour les retrouver facilement lors de la planification de vos repas.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[#FF7A7A] to-[#6FCF97]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Commencez votre aventure culinaire dès aujourd&apos;hui
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Découvrez plus de {totalRecipes} recettes testées pour tous les goûts et toutes les occasions. 
            Des plats rapides du quotidien aux menus de fête – nous avons les recettes qui 
            rendent votre cuisine plus simple et plus savoureuse.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/recettes"
              className="bg-white text-[#FF7A7A] px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 hover:text-[#6FCF97] transition-colors inline-flex items-center justify-center"
            >
              Explorer toutes les recettes
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              href="/categories"
              className="bg-[#6FCF97] text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#5FB87E] transition-colors inline-flex items-center justify-center border-2 border-white"
            >
              Parcourir les catégories
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
