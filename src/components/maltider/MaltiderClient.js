'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Sun,
  Coffee,
  Moon,
  Cookie,
  Cake,
  Clock,
  Users,
  Star,
  ArrowRight,
  Heart,
  Sparkles,
  CheckCircle
} from 'lucide-react';

export default function MaltiderClient({ mealTypes, totalRecipes }) {
  const [searchTerm, setSearchTerm] = useState('');

  // Filter meal types based on search
  const filteredMealTypes = mealTypes.filter(mealType => 
    mealType.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mealType.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get meal type icons
  const getMealIcon = (key) => {
    const icons = {
      'frukost': Sun,
      'lunch': Coffee,
      'middag': Moon,
      'snack': Cookie,
      'dessert': Cake
    };
    return icons[key] || Clock;
  };

  // Get meal type colors
  const getMealColor = (key) => {
    const colors = {
      'frukost': 'from-yellow-400 to-orange-500',
      'lunch': 'from-blue-400 to-cyan-500',
      'middag': 'from-purple-400 to-pink-500',
      'snack': 'from-green-400 to-emerald-500',
      'dessert': 'from-pink-400 to-rose-500'
    };
    return colors[key] || 'from-gray-400 to-gray-500';
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
            <h1 className="text-4xl md:text-6xl font-bold mb-6 font-playfair">
              Recept efter Måltid
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
              Hitta perfekta recept för varje måltid. Från snabb frukost till 
              lyxig middag - vi har recept för alla tillfällen.
            </p>
            
            {/* Quick Stats */}
            <div className="flex flex-wrap justify-center gap-6 md:gap-8 mb-8">
              <div className="flex items-center gap-2">
                <Clock className="w-6 h-6" />
                <span className="text-lg font-semibold">{totalRecipes}+ recept</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-6 h-6" />
                <span className="text-lg font-semibold">{mealTypes.length} måltider</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                <span className="text-lg font-semibold">4.8/5 betyg</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-8 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Sök måltider..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-6 py-4 text-lg border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <Clock className="w-6 h-6 text-gray-400" />
            </div>
          </div>
        </div>
      </section>

      {/* Meal Types Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Välj Din Måltid
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Klicka på en måltid för att se alla recept
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredMealTypes.map((mealType, index) => {
              const IconComponent = getMealIcon(mealType.key);
              const colorClass = getMealColor(mealType.key);
              
              return (
                <motion.div
                  key={mealType.key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={`/maltider/${mealType.key}`}
                    className="block group"
                  >
                    <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-gray-200 dark:border-gray-700">
                      {/* Header with gradient */}
                      <div className={`h-32 bg-gradient-to-r ${colorClass} flex items-center justify-center`}>
                        <IconComponent className="w-16 h-16 text-white" />
                      </div>
                      
                      {/* Content */}
                      <div className="p-8">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                          {mealType.name}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                          {mealType.description}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                            {mealType.count} recept
                          </span>
                          <ArrowRight className="w-6 h-6 text-purple-600 dark:text-purple-400 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
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
              Måltidsplanering Tips
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Så får du bästa resultatet av din matplanering
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Sun,
                title: 'Frukost',
                tip: 'Förbered frukost kvällen innan för en stressfri morgon. Smoothies, overnight oats och färdiga frukostmuffins sparar tid.'
              },
              {
                icon: Coffee,
                title: 'Lunch',
                tip: 'Gör dubbel portion vid middag och ta med rester till lunch. Meal prep på söndagar ger dig veckans luncher klara.'
              },
              {
                icon: Moon,
                title: 'Middag',
                tip: 'Planera veckans middagar i förväg och handla en gång. Använd långsamma recept på vardagar och snabba på helger.'
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

      {/* FAQ Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Vanliga Frågor om Måltider
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Svar på de vanligaste frågorna om måltidsplanering
            </p>
          </motion.div>

          <div className="space-y-4">
            {[
              {
                question: 'Hur många måltider per dag rekommenderas?',
                answer: 'De flesta experter rekommenderar 3 huvudmåltider (frukost, lunch, middag) plus eventuella mellanmål. Viktigast är att lyssna på din kropp och äta när du är hungrig.'
              },
              {
                question: 'Vilken måltid är viktigast?',
                answer: 'Frukost anses ofta som den viktigaste måltiden eftersom den startar din dag och ger energi. Men alla måltider är viktiga för en balanserad kost och god hälsa.'
              },
              {
                question: 'Kan jag hoppa över måltider för att gå ner i vikt?',
                answer: 'Det rekommenderas inte att hoppa över måltider regelbundet. Bättre är att äta mindre portioner och välja näringsrika alternativ. Regelbunden mattid hjälper kroppen att reglera hunger och mättnad.'
              },
              {
                question: 'Hur lång tid innan träning ska jag äta?',
                answer: 'Ät en lätt måltid 1-2 timmar innan träning, eller en lättare snack 30-60 minuter innan. Undvik tunga, fettrika måltider som kan orsaka obehag under träning.'
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
      <section className="py-16 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Heart className="w-16 h-16 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Börja Planera Dina Måltider
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Upptäck våra {totalRecipes}+ recept sorterade efter måltidstyp!
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
                href="/kategorier"
                className="inline-flex items-center gap-2 px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-purple-600 transform hover:scale-105 transition-all duration-300"
              >
                Se Kategorier
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
