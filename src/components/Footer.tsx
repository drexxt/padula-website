import { useState } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import Logo from './Logo';
import ImpressumModal from './ImpressumModal';
import DatenschutzModal from './DatenschutzModal';

export default function Footer() {
  const [showImpressum, setShowImpressum] = useState(false);
  const [showDatenschutz, setShowDatenschutz] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
    <footer className="bg-padula-navy-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="mb-4">
              <Logo size="lg" />
            </div>
            <p className="text-sm leading-relaxed mb-4">
              Ihr Partner für professionellen Innenausbau im Hunsrück.
              Qualität, Zuverlässigkeit und Kundenzufriedenheit stehen bei uns an erster Stelle.
            </p>
            <p className="text-xs text-gray-400 mb-4">
              Modern • Freundlich • Professionell • Engagiert
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Schnelllinks</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => scrollToSection('home')}
                  className="hover:text-padula-400 transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('leistungen')}
                  className="hover:text-padula-400 transition-colors"
                >
                  Leistungen
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('projekte')}
                  className="hover:text-padula-400 transition-colors"
                >
                  Projekte
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('kontakt')}
                  className="hover:text-padula-400 transition-colors"
                >
                  Kontakt
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Kontakt</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-padula-400 flex-shrink-0 mt-0.5" />
                <span className="text-sm">
                  Auf dem Mohr 3<br />
                  55481 Reckershausen<br />
                  Hunsrück
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-padula-400 flex-shrink-0" />
                <a href="tel:+4967635569411" className="text-sm hover:text-padula-400 transition-colors">
                  (06763) 5569411
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-padula-400 flex-shrink-0" />
                <a
                  href="mailto:mail@padula-innenausbau.eu"
                  className="text-sm hover:text-padula-400 transition-colors"
                >
                  mail@padula-innenausbau.eu
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Standort</h3>
            <div className="rounded-lg overflow-hidden h-48 w-full border-2 border-padula-navy-700">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2565.659099654282!2d7.395971077495941!3d49.98025132110635!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47be10dce29eaa3f%3A0xea845cd3d14bed7e!2sAuf%20dem%20Mohr%203%2C%2055481%20Reckershausen!5e0!3m2!1snl!2sde!4v1771280356315!5m2!1snl!2sde"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Padula Innenausbau Standort"
              ></iframe>
            </div>
          </div>
        </div>

        <div className="border-t border-padula-navy-800 mt-8 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Padula Innenausbau GmbH. Alle Rechte vorbehalten.</p>
          <div className="mt-3 flex items-center justify-center gap-4 text-xs text-gray-400">
            <button onClick={() => setShowImpressum(true)} className="hover:text-padula-400 transition-colors">
              Impressum
            </button>
            <span>•</span>
            <button onClick={() => setShowDatenschutz(true)} className="hover:text-padula-400 transition-colors">
              Datenschutzerklärung
            </button>
            <span>•</span>
            <span>
              Design by{' '}
              <a
                href="https://lift2market.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-padula-400 transition-colors"
              >
                Lift2Market
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>

    {showImpressum && <ImpressumModal onClose={() => setShowImpressum(false)} />}
    {showDatenschutz && <DatenschutzModal onClose={() => setShowDatenschutz(false)} />}
    </>
  );
}
