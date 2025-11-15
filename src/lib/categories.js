/**
 * Catégories culinaires pour Bonmets
 * Organisées pour une expérience utilisateur optimale et le SEO
 */

export const PRIMARY_CATEGORIES = {
  'viandes': {
    name: 'Viandes',
    slug: 'viandes-recept',
    description: 'Recettes de viandes savoureuses pour tous les goûts',
    icon: '🍖',
    color: 'from-[#FF7A7A] to-[#FFA07A]',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&h=600&fit=crop&q=80',
    subcategories: ['Bœuf', 'Porc', 'Agneau', 'Veau', 'Volaille']
  },
  'poissons': {
    name: 'Poissons',
    slug: 'poissons-recept',
    description: 'Recettes de poissons frais et fruits de mer',
    icon: '🐟',
    color: 'from-[#6FCF97] to-[#A8E6CF]',
    image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&h=600&fit=crop&q=80',
    subcategories: ['Saumon', 'Thon', 'Cabillaud', 'Crevettes', 'Fruits de mer']
  },
  'legumes': {
    name: 'Légumes',
    slug: 'legumes-recept',
    description: 'Recettes végétariennes et plats à base de légumes',
    icon: '🥬',
    color: 'from-[#6FCF97] to-[#A8E6CF]',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&h=600&fit=crop&q=80',
    subcategories: ['Salades', 'Légumes grillés', 'Ratatouille', 'Curry de légumes', 'Légumes rôtis']
  },
  'pates': {
    name: 'Pâtes',
    slug: 'pates-recept',
    description: 'Recettes de pâtes authentiques et créatives',
    icon: '🍝',
    color: 'from-[#FF7A7A] to-[#FFA07A]',
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800&h=600&fit=crop&q=80',
    subcategories: ['Spaghetti', 'Penne', 'Fettuccine', 'Lasagne', 'Ravioli']
  },
  'desserts': {
    name: 'Desserts',
    slug: 'desserts-recept',
    description: 'Desserts sucrés et gourmands pour finir le repas en beauté',
    icon: '🍰',
    color: 'from-[#FF7A7A] to-[#FFA07A]',
    image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=800&h=600&fit=crop&q=80',
    subcategories: ['Gâteaux', 'Tartes', 'Mousses', 'Crèmes', 'Glaces']
  },
  'sauce': {
    name: 'Sauce',
    slug: 'sauce-recept',
    description: 'Sauces maison pour accompagner vos plats',
    icon: '🥄',
    color: 'from-[#FFA07A] to-[#6FCF97]',
    image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&h=600&fit=crop&q=80',
    subcategories: ['Sauces tomate', 'Sauces blanches', 'Vinaigrettes', 'Sauces épicées', 'Sauces crémeuses']
  },
  'patisserie': {
    name: 'Pâtisserie',
    slug: 'patisserie-recept',
    description: 'Recettes de pâtisserie françaises et internationales',
    icon: '🥐',
    color: 'from-[#FF7A7A] to-[#6FCF97]',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&h=600&fit=crop&q=80',
    subcategories: ['Croissants', 'Éclairs', 'Macarons', 'Tartes', 'Choux']
  }
};


export const MEAL_TYPES = {
  'frukost': { name: 'Frukost', icon: '🌅' },
  'lunch': { name: 'Lunch', icon: '☀️' },
  'middag': { name: 'Middag', icon: '🌙' },
  'snack': { name: 'Snack', icon: '🍪' },
  'dessert': { name: 'Dessert', icon: '🍰' }
};

export const COOKING_METHODS = {
  'grill': { name: 'Grill & BBQ', icon: '🔥' },
  'stekning': { name: 'Stekning & Wok', icon: '🍳' },
  'kokning': { name: 'Kokning & Gryta', icon: '🍲' },
  'ra': { name: 'Rå mat & Sallader', icon: '🥄' },
  'snabb': { name: 'Snabbmat (< 30 min)', icon: '⚡' },
  'langsam': { name: 'Långsam matlagning', icon: '⏰' },
  'enkel': { name: 'Enkelt & Nybörjarvänligt', icon: '🍳' }
};

export const DIETARY_TAGS = {
  'vegetariskt': { name: 'Vegetariskt', icon: '🌱', color: 'green' },
  'veganskt': { name: 'Veganskt', icon: '🌿', color: 'emerald' },
  'glutenfritt': { name: 'Glutenfritt', icon: '🌾', color: 'amber' },
  'nötfritt': { name: 'Nötfritt', icon: '🥜', color: 'orange' },
  'laktosfritt': { name: 'Laktosfritt', icon: '🥛', color: 'blue' },
  'sockerfritt': { name: 'Sockerfritt', icon: '🍯', color: 'yellow' },
  'keto': { name: 'Keto', icon: '🥑', color: 'purple' },
  'lågkolhydrat': { name: 'Lågkolhydrat', icon: '🏃‍♀️', color: 'red' },
  'proteinfokuserat': { name: 'Proteinfokuserat', icon: '💪', color: 'indigo' }
};

export const LIFESTYLE_TAGS = {
  'barnvänligt': { name: 'Barnvänligt', icon: '👶', color: 'pink' },
  'seniorvänligt': { name: 'Seniorvänligt', icon: '👴', color: 'gray' },
  'budgetvänligt': { name: 'Budgetvänligt', icon: '💰', color: 'green' },
  'snabbmat': { name: 'Snabbmat', icon: '⚡', color: 'yellow' },
  'vardagsmat': { name: 'Vardagsmat', icon: '🏠', color: 'blue' },
  'festmat': { name: 'Festmat', icon: '🎉', color: 'purple' },
  'hälsosam': { name: 'Hälsosam', icon: '💚', color: 'green' },
  'komfort': { name: 'Komfortmat', icon: '🤗', color: 'orange' }
};

export const DIFFICULTY_LEVELS = {
  'lätt': { name: 'Lätt', color: 'green', description: 'Perfekt för nybörjare' },
  'medel': { name: 'Medel', color: 'yellow', description: 'Kräver lite erfarenhet' },
  'svår': { name: 'Svår', color: 'red', description: 'För erfarna kockar' }
};

export const TIME_CATEGORIES = {
  'snabb': { name: 'Snabbmat', maxMinutes: 30, description: 'Under 30 minuter' },
  'medel': { name: 'Medellång', maxMinutes: 60, description: '30-60 minuter' },
  'lång': { name: 'Lång', maxMinutes: 120, description: '1-2 timmar' },
  'mycket-lång': { name: 'Mycket lång', maxMinutes: 999, description: 'Över 2 timmar' }
};

/**
 * Get all categories for navigation
 */
export function getAllCategories() {
  return Object.values(PRIMARY_CATEGORIES);
}

/**
 * Get category by slug
 */
export function getCategoryBySlug(slug) {
  // Handle both 'viandes' and 'viandes-recept' formats
  const key = slug.replace('-recept', '');
  return PRIMARY_CATEGORIES[key];
}


/**
 * Get all meal types
 */
export function getAllMealTypes() {
  return Object.entries(MEAL_TYPES).map(([key, value]) => ({
    key,
    ...value
  }));
}

/**
 * Get all cooking methods
 */
export function getAllCookingMethods() {
  return Object.entries(COOKING_METHODS).map(([key, value]) => ({
    key,
    ...value
  }));
}

/**
 * Get all dietary tags
 */
export function getAllDietaryTags() {
  return Object.entries(DIETARY_TAGS).map(([key, value]) => ({
    key,
    ...value
  }));
}

/**
 * Get all lifestyle tags
 */
export function getAllLifestyleTags() {
  return Object.entries(LIFESTYLE_TAGS).map(([key, value]) => ({
    key,
    ...value
  }));
}

/**
 * Get difficulty levels
 */
export function getDifficultyLevels() {
  return Object.entries(DIFFICULTY_LEVELS).map(([key, value]) => ({
    key,
    ...value
  }));
}

/**
 * Get time categories
 */
export function getTimeCategories() {
  return Object.entries(TIME_CATEGORIES).map(([key, value]) => ({
    key,
    ...value
  }));
}
