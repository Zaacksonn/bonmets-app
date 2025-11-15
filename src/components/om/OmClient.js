'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, Users, Target, Award, Sparkles, ChefHat, BookOpen, Mail } from 'lucide-react';

export default function OmClient() {
  const team = [
    {
      name: 'Emma Andersson',
      role: 'Fondatrice & Experte en recettes',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80',
      bio: 'Passionnée de cuisine spécialisée dans les classiques français comme les quiches, les pâtes et le gâteau au chocolat.',
    },
    {
      name: 'Erik Lindström',
      role: 'Développeur culinaire',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
      bio: 'Chef cuisinier avec une passion pour les variantes modernes et les techniques culinaires créatives.',
    },
    {
      name: 'Sara Bergman',
      role: 'Experte en recettes',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80',
      bio: 'Spécialiste des plats classiques français et des favoris internationaux comme les pâtes et les plats végétariens.',
    },
  ];

  const values = [
    {
      icon: Heart,
      title: 'Passion pour la cuisine',
      description: 'Nous aimons la cuisine et la gastronomie. Chaque recette est soigneusement testée et approuvée par notre équipe avant de la partager avec vous.',
    },
    {
      icon: Users,
      title: 'La communauté d\'abord',
      description: 'Notre communauté est au cœur de tout ce que nous faisons. Vos questions, commentaires et histoires de succès nous inspirent chaque jour.',
    },
    {
      icon: Target,
      title: 'Accessibilité',
      description: 'La cuisine doit être amusante et simple pour tous. Nous simplifions sans compromettre le goût ou la qualité.',
    },
    {
      icon: Award,
      title: 'Qualité & authenticité',
      description: 'Pas de raccourcis ou d\'astuces. Juste de vraies recettes avec des ingrédients que vous trouvez dans les magasins ordinaires.',
    },
  ];

  const stats = [
    { number: '30+', label: 'Recettes testées' },
    { number: '50K+', label: 'Lecteurs mensuels' },
    { number: '4.8', label: 'Note moyenne' },
    { number: '2020', label: 'Année de création' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF8F3] via-white to-[#FFF5EE]">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
              opacity: [0.03, 0.05, 0.03],
            }}
            transition={{ duration: 20, repeat: Infinity }}
            className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] bg-gradient-to-br from-[#FF7A7A] to-[#FFA07A] rounded-full blur-3xl"
          />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full shadow-lg mb-6"
            >
              <Heart className="w-5 h-5 text-[#FF7A7A]" />
              <span className="text-[#FF7A7A] font-semibold">Bienvenue sur Bonmets</span>
            </motion.div>

            <h1 
              className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-[#FF7A7A] via-[#FFA07A] to-[#6FCF97] bg-clip-text text-transparent"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              De bons moments qui rassemblent
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Nous croyons au pouvoir de la cuisine pour rassembler les gens. Depuis 2020, nous partageons des recettes, des conseils et de la joie avec des milliers de passionnés de cuisine.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 px-4 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 text-center shadow-lg"
              >
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#FF7A7A] to-[#FFA07A] bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="relative z-10 px-4 pb-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            {/* Image */}
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=1200&q=80"
                alt="Équipe Bonmets en train de cuisiner"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

            {/* Content */}
            <div>
              <div className="inline-block mb-4">
                <span className="px-4 py-2 bg-[#6FCF97]/10 text-[#6FCF97] rounded-full text-sm font-semibold">
                  Notre histoire
                </span>
              </div>
              <h2 
                className="text-4xl md:text-5xl font-bold mb-6"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                De la cuisine à la communauté
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed text-lg">
                <p>
                  Bonmets a été créé en 2020 par trois amis avec une passion commune : rendre la cuisine amusante, simple et accessible à tous.
                </p>
                <p>
                  Nous étions fatigués des recettes compliquées avec des ingrédients difficiles à trouver et des instructions imprécises. Nous avons donc décidé de créer quelque chose de mieux.
                </p>
                <p>
                  Aujourd&apos;hui, Bonmets est un endroit où plus de 50 000 passionnés de cuisine trouvent chaque mois de l&apos;inspiration, apprennent de nouvelles techniques et partagent leurs succès culinaires.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="relative z-10 px-4 pb-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 
              className="text-4xl md:text-5xl font-bold mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Nos valeurs
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Voici ce que nous défendons et ce qui nous motive chaque jour
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-[#FF7A7A] to-[#FFA07A] rounded-2xl flex items-center justify-center mb-6">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="relative z-10 px-4 pb-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 
              className="text-4xl md:text-5xl font-bold mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Rencontrez l&apos;équipe
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Des passionnés de cuisine qui travaillent pour vous offrir les meilleures recettes
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="relative aspect-square">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2">{member.name}</h3>
                  <p className="text-[#FF7A7A] font-semibold mb-3">{member.role}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Sections */}
      <section className="relative z-10 px-4 pb-20">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Newsletter CTA */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-[#FF7A7A] to-[#FFA07A] rounded-3xl p-10 text-white relative overflow-hidden"
          >
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-48 h-48 bg-white rounded-full blur-3xl"></div>
            </div>
            <div className="relative z-10">
              <Mail className="w-12 h-12 mb-4" />
              <h3 className="text-3xl font-bold mb-3">Recevez notre newsletter</h3>
              <p className="mb-6 text-white/90">
                Recettes hebdomadaires, conseils et inspiration directement dans votre boîte de réception
              </p>
              <Link
                href="/"
                className="inline-block px-8 py-4 bg-white text-[#FF7A7A] font-bold rounded-full hover:shadow-xl transition-all"
              >
                S&apos;abonner maintenant
              </Link>
            </div>
          </motion.div>

          {/* Blog CTA */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-[#6FCF97] to-[#A8E6CF] rounded-3xl p-10 text-white relative overflow-hidden"
          >
            <div className="absolute inset-0 opacity-10">
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full blur-3xl"></div>
            </div>
            <div className="relative z-10">
              <BookOpen className="w-12 h-12 mb-4" />
              <h3 className="text-3xl font-bold mb-3">Lisez notre blog</h3>
              <p className="mb-6 text-white/90">
                Guides, conseils et techniques pour devenir meilleur en cuisine
              </p>
              <Link
                href="/blogg"
                className="inline-block px-8 py-4 bg-white text-[#6FCF97] font-bold rounded-full hover:shadow-xl transition-all"
              >
                Explorer le blog
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative z-10 px-4 pb-20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl p-12 text-center shadow-2xl"
          >
            <Sparkles className="w-12 h-12 text-[#FF7A7A] mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Prêt à commencer à cuisiner ?
            </h2>
            <p className="text-gray-600 text-lg mb-8">
              Explorez nos centaines de recettes et trouvez votre prochain favori aujourd&apos;hui
            </p>
            <Link
              href="/recettes"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#FF7A7A] to-[#FFA07A] text-white font-bold rounded-full hover:shadow-xl transform hover:scale-105 transition-all"
            >
              <ChefHat className="w-5 h-5" />
              Voir toutes les recettes
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}


