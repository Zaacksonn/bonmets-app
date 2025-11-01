import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

export default function Breadcrumbs({ items, className }) {
  return (
    <nav aria-label="Fil d'Ariane" className={cn('flex items-center gap-2 text-sm', className)}>
      <Link
        href="/"
        className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
        aria-label="Accueil"
      >
        <Home className="w-4 h-4" />
      </Link>

      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <div key={item.url || index} className="flex items-center gap-2">
            <ChevronRight className="w-4 h-4 text-gray-400" />
            {isLast ? (
              <span className="text-gray-900 dark:text-gray-100 font-medium" aria-current="page">
                {item.name}
              </span>
            ) : (
              <Link
                href={item.url}
                className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
              >
                {item.name}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}

