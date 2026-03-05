import { useState, useEffect } from 'react';
import { Menu, X, Phone, Smartphone, Mail, MapPin } from 'lucide-react';
import Logo from './Logo';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['home', 'leistungen', 'projekte', 'kontakt'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 150 && rect.bottom >= 150;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 140;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsOpen(false);
  };

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'leistungen', label: 'Leistungen' },
    { id: 'projekte', label: 'Projekte' },
    { id: 'kontakt', label: 'Kontakt' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'shadow-lg' : ''}`}>
      <div className="hidden lg:block bg-padula-navy-900 text-white">
        <div className="relative">
          <div className="max-w-7xl mx-auto relative">
            <div className="flex items-stretch h-[125px] overflow-visible">
              <div className="absolute left-0 top-0 bottom-0 right-0 bg-padula-600 -translate-x-full" style={{ width: '100vw' }} />
              <div className="relative bg-padula-600 pl-8 pr-16 py-4 flex items-center z-10" style={{ clipPath: 'polygon(0 0, calc(100% - 50px) 0, 100% 50%, calc(100% - 50px) 100%, 0% 100%)' }}>
                <button
                  onClick={() => scrollToSection('home')}
                  className="flex items-center group"
                >
                  <Logo size="sm" showText={true} className="[&_span]:text-white [&_.text-padula-navy-600]:text-gray-100" />
                </button>
              </div>

              <div className="flex-1 flex items-center justify-between px-12 -ml-12">
                <div className="flex items-center space-x-8 ml-8">
                <a href="tel:+4967635569411" className="flex items-center space-x-3 hover:text-padula-300 transition-colors">
                  <Phone className="w-5 h-5 text-padula-400" />
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-400">Büro</span>
                    <span className="text-sm font-semibold">(06763) 5569411</span>
                  </div>
                </a>

                <a href="tel:+491706146733" className="flex items-center space-x-3 hover:text-padula-300 transition-colors">
                  <Smartphone className="w-5 h-5 text-padula-400" />
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-400">Mobil</span>
                    <span className="text-sm font-semibold">(0170) 6146733</span>
                  </div>
                </a>

                <a href="mailto:mail@padula-innenausbau.eu" className="flex items-center space-x-3 hover:text-padula-300 transition-colors">
                  <Mail className="w-5 h-5 text-padula-400" />
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-400">E-Mail senden</span>
                    <span className="text-sm font-semibold">mail@padula-innenausbau.eu</span>
                  </div>
                </a>

                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-padula-400" />
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-400">Besuchen Sie uns</span>
                    <span className="text-sm font-semibold">Auf dem Mohr 3, 55481 Reckershausen</span>
                  </div>
                </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`bg-padula-navy-900 lg:bg-white transition-all duration-300 ${isScrolled ? 'shadow-md' : ''}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 lg:h-20">
            <button
              onClick={() => scrollToSection('home')}
              className="flex items-center group lg:hidden"
            >
              <Logo size="md" showText={true} />
            </button>

            <div className="hidden lg:flex items-center space-x-1 flex-1">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`px-6 py-2 font-semibold text-base transition-colors relative group uppercase tracking-wide ${
                    activeSection === link.id
                      ? 'text-padula-700'
                      : 'text-gray-700 hover:text-padula-700'
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute bottom-0 left-0 w-full h-0.5 bg-padula-700 transform origin-left transition-transform ${
                      activeSection === link.id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                  />
                </button>
              ))}
            </div>

            <div className="lg:hidden flex items-center gap-3">
              <div className="flex items-center gap-3">
                <a href="tel:+4967635569411" className="flex items-center gap-1.5 text-white hover:text-padula-300 transition-colors">
                  <Phone className="w-4 h-4 text-padula-400 flex-shrink-0" />
                  <span className="text-xs font-medium sm:text-sm">(06763) 5569411</span>
                </a>
                <a href="tel:+491706146733" className="flex items-center gap-1.5 text-white hover:text-padula-300 transition-colors hidden sm:flex">
                  <Smartphone className="w-4 h-4 text-padula-400 flex-shrink-0" />
                  <span className="text-xs font-medium sm:text-sm">(0170) 6146733</span>
                </a>
              </div>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg hover:bg-padula-navy-800 transition-colors text-white"
                aria-label="Toggle menu"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 shadow-lg">
          <div className="px-4 py-3 space-y-3">
            <div className="pb-4 border-b border-gray-200 space-y-3">
              <a href="tel:+4967635569411" className="flex items-center space-x-3 text-gray-700">
                <Phone className="w-5 h-5 text-padula-600" />
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500">Büro</span>
                  <span className="text-sm">(06763) 5569411</span>
                </div>
              </a>
              <a href="tel:+491706146733" className="flex items-center space-x-3 text-gray-700">
                <Smartphone className="w-5 h-5 text-padula-600" />
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500">Mobil</span>
                  <span className="text-sm">(0170) 6146733</span>
                </div>
              </a>
              <a href="mailto:mail@padula-innenausbau.eu" className="flex items-center space-x-3 text-gray-700">
                <Mail className="w-5 h-5 text-padula-600" />
                <span className="text-sm">mail@padula-innenausbau.eu</span>
              </a>
              <div className="flex items-center space-x-3 text-gray-700">
                <MapPin className="w-5 h-5 text-padula-600" />
                <span className="text-sm">Auf dem Mohr 3, 55481 Reckershausen</span>
              </div>
            </div>

            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`block w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${
                  activeSection === link.id
                    ? 'bg-padula-700 text-white'
                    : 'text-gray-700 hover:bg-padula-50 hover:text-padula-700'
                }`}
              >
                {link.label}
              </button>
            ))}

          </div>
        </div>
      )}
    </nav>
  );
}
