'use client';

import { useState } from 'react';
import { Clock, Lightbulb, Check } from 'lucide-react';

export default function RecipeSteps({ steps }) {
  const [completedSteps, setCompletedSteps] = useState({});

  const toggleStep = (index) => {
    setCompletedSteps(prev => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Étapes de préparation</h2>

      <div className="space-y-6">
        {steps.map((step, index) => {
          const isCompleted = completedSteps[index];

          return (
            <div
              key={index}
              className={`relative pl-12 pb-6 border-l-2 ${
                isCompleted
                  ? 'border-green-500'
                  : 'border-gray-300 dark:border-gray-700'
              } last:border-l-0 last:pb-0 transition-colors`}
            >
              <button
                onClick={() => toggleStep(index)}
                className={`absolute left-0 -translate-x-1/2 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                  isCompleted
                    ? 'bg-green-500 border-green-500 text-white'
                    : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 hover:border-purple-500'
                }`}
                aria-label={isCompleted ? 'Marquer comme non terminé' : 'Marquer comme terminé'}
              >
                {isCompleted ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <span className="text-sm font-semibold">{step.order || index + 1}</span>
                )}
              </button>

              <div className={`${isCompleted ? 'opacity-60' : ''} transition-opacity`}>
                {step.title && (
                  <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                )}

                <p className="text-gray-700 dark:text-gray-300 mb-3 leading-relaxed">
                  {step.description}
                </p>

                <div className="flex flex-wrap gap-3">
                  {step.timeMinutes && (
                    <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                      <Clock className="w-4 h-4" />
                      <span>{step.timeMinutes} min</span>
                    </div>
                  )}

                  {step.tip && (
                    <div className="flex items-start gap-2 text-sm bg-blue-50 dark:bg-blue-950 text-blue-900 dark:text-blue-200 rounded-lg px-3 py-2 mt-2 w-full">
                      <Lightbulb className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span>{step.tip}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

