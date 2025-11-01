'use client';

import { useState } from 'react';
import { Users, Minus, Plus } from 'lucide-react';
import { scaleIngredients } from '@/lib/utils/portions';

export default function IngredientsList({ ingredients, defaultServings }) {
  const [servings, setServings] = useState(defaultServings);
  const [checkedItems, setCheckedItems] = useState({});

  const scaledIngredients = scaleIngredients(ingredients, defaultServings, servings);

  const toggleCheck = (sectionIndex, itemIndex) => {
    const key = `${sectionIndex}-${itemIndex}`;
    setCheckedItems(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const increaseServings = () => setServings(prev => prev + 1);
  const decreaseServings = () => setServings(prev => Math.max(1, prev - 1));

  return (
    <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Ingrédients</h2>
        
        <div className="flex items-center gap-3 bg-white dark:bg-gray-800 rounded-lg p-2">
          <button
            onClick={decreaseServings}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors disabled:opacity-50"
            disabled={servings <= 1}
            aria-label="Diminuer les portions"
          >
            <Minus className="w-4 h-4" />
          </button>
          
          <div className="flex items-center gap-2 px-2">
            <Users className="w-4 h-4 text-gray-600" />
            <span className="font-semibold min-w-[2ch] text-center">{servings}</span>
          </div>
          
          <button
            onClick={increaseServings}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
            aria-label="Augmenter les portions"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {scaledIngredients.map((section, sectionIndex) => (
          <div key={sectionIndex}>
            {section.title && (
              <h3 className="font-semibold text-lg mb-3">{section.title}</h3>
            )}
            <ul className="space-y-2">
              {section.items.map((item, itemIndex) => {
                const key = `${sectionIndex}-${itemIndex}`;
                const isChecked = checkedItems[key];

                return (
                  <li key={itemIndex}>
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={isChecked || false}
                        onChange={() => toggleCheck(sectionIndex, itemIndex)}
                        className="mt-1 w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                      />
                      <span
                        className={`flex-1 transition-all ${
                          isChecked
                            ? 'line-through text-gray-500 dark:text-gray-600'
                            : 'text-gray-900 dark:text-gray-100'
                        }`}
                      >
                        {item}
                      </span>
                    </label>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

