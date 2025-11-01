'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, Users, Target, Award, Sparkles, ChefHat, BookOpen, Mail } from 'lucide-react';

export default function OmClient() {
  const team = [
    {
      name: 'Emma Andersson',
      role: 'Grundare & Matreceptexpert',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80',
      bio: 'Passionerad matälskare med specialitet inom svenska klassiker som köttbullar, pasta och kladdkaka.',
    },
    {
      name: 'Erik Lindström',
      role: 'Matutvecklare',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
      bio: 'Kock med kärlek för moderna matvarianter och kreativa matlagningstekniker.',
    },
    {
      name: 'Sara Bergman',
      role: 'Matreceptexpert',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80',
      bio: 'Specialist inom klassiska svenska maträtter och internationella favoriter som pasta och vegetariska rätter.',
    },
  ];

  const values = [
    {
      icon: Heart,
      title: 'Passion för mat',
      description: 'Vi älskar mat och matlagning. Varje recept är noggrant testat och godkänt av vårt team innan vi delar det med dig.',
    },
    {
      icon: Users,
      title: 'Community först',
      description: 'Vårt community är hjärtat i allt vi gör. Era frågor, feedback och framgångshistorier inspirerar oss varje dag.',
    },
    {
      icon: Target,
      title: 'Tillgänglighet',
      description: 'Matlagning ska vara roligt och enkelt för alla. Vi förenklar utan att kompromissa med smak eller kvalitet.',
    },
    {
      icon: Award,
      title: 'Kvalitet & äkthet',
      description: 'Inga genvägar eller trick. Bara äkta matrecept med ingredienser du hittar i vanliga butiker.',
    },
  ];

  const stats = [
    { number: '30+', label: 'Provlagade matrecept' },
    { number: '50K+', label: 'Månatliga läsare' },
    { number: '4.8', label: 'Genomsnittligt betyg' },
    { number: '2020', label: 'Grundat år' },
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
              <span className="text-[#FF7A7A] font-semibold">Välkommen till Bakstunden</span>
            </motion.div>

            <h1 
              className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-[#FF7A7A] via-[#FFA07A] to-[#6FCF97] bg-clip-text text-transparent"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Goda stunder som förenar
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Vi tror på matens kraft att samla människor. Sedan 2020 har vi delat recept, tips och glädje med tusentals matälskare.
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
                alt="Bakstunden team cooking"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

            {/* Content */}
            <div>
              <div className="inline-block mb-4">
                <span className="px-4 py-2 bg-[#6FCF97]/10 text-[#6FCF97] rounded-full text-sm font-semibold">
                  Vår historia
                </span>
              </div>
              <h2 
                className="text-4xl md:text-5xl font-bold mb-6"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Från kök till community
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed text-lg">
                <p>
                  Bakstunden startades 2020 av tre vänner med en gemensam passion: att göra matlagning roligt, enkelt och tillgängligt för alla.
                </p>
                <p>
                  Vi var trötta på komplicerade recept med svåråtkomliga ingredienser och oprecisa instruktioner. Så vi bestämde oss för att skapa något bättre.
                </p>
                <p>
                  Idag är Bakstunden en plats där över 50 000 matälskare varje månad hittar inspiration, lär sig nya tekniker och delar sina matlagningsfram gångar.
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
              Våra värderingar
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Det här är vad vi står för och vad som driver oss varje dag
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
              Möt teamet
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Passionerade matälskare som arbetar för att ge dig de bästa recepten
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
              <h3 className="text-3xl font-bold mb-3">Få vårt nyhetsbrev</h3>
              <p className="mb-6 text-white/90">
                Veckovisa recept, tips och inspiration direkt i din inkorg
              </p>
              <Link
                href="/"
                className="inline-block px-8 py-4 bg-white text-[#FF7A7A] font-bold rounded-full hover:shadow-xl transition-all"
              >
                Prenumerera nu
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
              <h3 className="text-3xl font-bold mb-3">Läs vår blogg</h3>
              <p className="mb-6 text-white/90">
                Guider, tips och tekniker för att bli bättre i köket
              </p>
              <Link
                href="/blogg"
                className="inline-block px-8 py-4 bg-white text-[#6FCF97] font-bold rounded-full hover:shadow-xl transition-all"
              >
                Utforska bloggen
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
              Redo att börja laga mat?
            </h2>
            <p className="text-gray-600 text-lg mb-8">
              Utforska våra hundratals recept och hitta din nästa favorit idag
            </p>
            <Link
              href="/recept"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#FF7A7A] to-[#FFA07A] text-white font-bold rounded-full hover:shadow-xl transform hover:scale-105 transition-all"
            >
              <ChefHat className="w-5 h-5" />
              Se alla recept
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}


