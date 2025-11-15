import Link from 'next/link';
import Image from 'next/image';
import { Instagram, Youtube, Facebook } from 'lucide-react';

export default function Footer() {
  const mainLinks = [
    { name: 'Accueil', href: '/' },
    { name: 'Recettes', href: '/recettes' },
    { name: 'Catégories', href: '/categories' },
    { name: 'À propos de Bonmets', href: '/a-propos' },
    
  ];

  const socialLinks = [
    { name: 'Instagram', href: 'https://www.instagram.com/alissam407/', icon: Instagram },
    { name: 'YouTube', href: 'https://youtube.com/@malty', icon: Youtube },
    { name: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61581970813224', icon: Facebook },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
          <Link href="/" className="flex items-center space-x-2" aria-label="Page d'accueil Bonmets">
            <div className="text-2xl md:text-3xl font-bold text-white drop-shadow-lg font-playfair">
              Bonmets
            </div>
          </Link>
            <p className="text-sm text-gray-400 mb-4">
              La meilleure collection de recettes et guides culinaires de France.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-white font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2">
              {mainLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-white font-semibold mb-4">Suivez-nous</h3>
            <div className="flex space-x-3">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                    aria-label={link.name}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Bonmets. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}

