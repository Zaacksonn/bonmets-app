'use client';

import { Printer, Share2, Heart, BookmarkPlus } from 'lucide-react';
import { useState } from 'react';

export default function RecipeActions({ title }) {
  const [isSaved, setIsSaved] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: `Découvrez cette recette : ${title}`,
          url: window.location.href,
        });
      } catch (err) {
        // User cancelled or share failed
        console.log('Share cancelled');
      }
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Lien copié dans le presse-papiers !');
    }
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
    // In production, this would save to user's account
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    // In production, this would update rating
  };

  return (
    <div className="flex flex-wrap gap-3">
      <button
        onClick={handlePrint}
        className="flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-purple-300 dark:hover:border-purple-600 transition-all font-medium"
        aria-label="Imprimer la recette"
      >
        <Printer className="w-5 h-5" />
        <span className="hidden sm:inline">Imprimer</span>
      </button>
      
      <button
        onClick={handleShare}
        className="flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-purple-300 dark:hover:border-purple-600 transition-all font-medium"
        aria-label="Partager la recette"
      >
        <Share2 className="w-5 h-5" />
        <span className="hidden sm:inline">Partager</span>
      </button>

      <button
        onClick={handleSave}
        className={`flex items-center gap-2 px-5 py-2.5 border-2 rounded-xl transition-all font-medium ${
          isSaved
            ? 'bg-purple-50 dark:bg-purple-900/20 border-purple-600 text-purple-600'
            : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-purple-300'
        }`}
        aria-label={isSaved ? 'Enregistrée' : 'Enregistrer la recette'}
      >
        <BookmarkPlus className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
        <span className="hidden sm:inline">{isSaved ? 'Enregistrée' : 'Enregistrer'}</span>
      </button>

      <button
        onClick={handleLike}
        className={`flex items-center gap-2 px-5 py-2.5 border-2 rounded-xl transition-all font-medium ${
          isLiked
            ? 'bg-red-50 dark:bg-red-900/20 border-red-500 text-red-500'
            : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-red-300'
        }`}
        aria-label={isLiked ? 'Aimée' : 'Aimer la recette'}
      >
        <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
        <span className="hidden sm:inline">{isLiked ? 'Aimée' : 'Aimer'}</span>
      </button>
    </div>
  );
}

