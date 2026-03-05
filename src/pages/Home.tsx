import { useState, useEffect, FormEvent } from 'react';
import { supabase, type Project, type ContactSubmission } from '../lib/supabase';
import DatenschutzModal from '../components/DatenschutzModal';
import {
  ArrowRight,
  CheckCircle,
  Award,
  Users,
  Wrench,
  Layers,
  Paintbrush,
  LayoutGrid,
  Sparkles,
  Hammer,
  Home as HomeIcon,
  Mail,
  Phone,
  MapPin,
  Send,
  Loader2,
  X,
  ChevronUp,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const services = [
  {
    icon: Layers,
    title: 'Trockenbau',
    description:
      'Professionelle Trockenbauarbeiten für Wände, Decken und Raumteilungen. Schnell, sauber und präzise ausgeführt.',
    features: [
      'Wandbau und Raumteilung',
      'Deckenabhängungen',
      'Schallschutz',
      'Brandschutz',
    ],
  },
  {
    icon: Paintbrush,
    title: 'Malerarbeiten',
    description:
      'Hochwertige Malerarbeiten für Innen- und Außenbereiche. Von klassisch bis modern – wir setzen Ihre Farbwünsche um.',
    features: [
      'Innen- und Außenanstriche',
      'Tapezierarbeiten',
      'Spezielle Wandgestaltung',
      'Fassadenarbeiten',
    ],
  },
  {
    icon: LayoutGrid,
    title: 'Bodenbeläge',
    description:
      'Verlegung verschiedenster Bodenbeläge für Wohn- und Geschäftsräume. Fachgerechte Ausführung für langlebige Ergebnisse.',
    features: [
      'Laminat und Parkett',
      'Fliesen und Naturstein',
      'Vinyl und PVC',
      'Teppichböden',
    ],
  },
  {
    icon: Sparkles,
    title: 'Renovierung',
    description:
      'Komplette Renovierung Ihrer Räume. Wir koordinieren alle Gewerke und sorgen für einen reibungslosen Ablauf.',
    features: [
      'Vollrenovierung',
      'Bad- und Küchensanierung',
      'Altbausanierung',
      'Modernisierung',
    ],
  },
  {
    icon: Hammer,
    title: 'Umbauarbeiten',
    description:
      'Umbau und Anpassung Ihrer Räumlichkeiten. Von kleinen Änderungen bis zu großen Umgestaltungen.',
    features: [
      'Raumaufteilung',
      'Türen und Fenster',
      'Elektro- und Sanitärarbeiten',
      'Individuelle Lösungen',
    ],
  },
  {
    icon: HomeIcon,
    title: 'Komplettservice',
    description:
      'Alle Leistungen aus einer Hand. Wir übernehmen die komplette Planung und Ausführung Ihres Projekts.',
    features: [
      'Beratung und Planung',
      'Koordination aller Gewerke',
      'Termingerechte Ausführung',
      'Abschlusskontrolle',
    ],
  },
];

const categories = [
  'Alle',
  'Trockenbau',
  'Malerarbeiten',
  'Bodenbeläge',
  'Renovierung',
  'Umbau',
];

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('Alle');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const [formData, setFormData] = useState<ContactSubmission & { company?: string }>({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  });
  const [formLoading, setFormLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [showDatenschutz, setShowDatenschutz] = useState(false);

  useEffect(() => {
    fetchProjects();

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (selectedCategory === 'Alle') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter((p) => p.category === selectedCategory));
    }
  }, [selectedCategory, projects]);

  async function fetchProjects() {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('date_completed', { ascending: false });

      if (error) throw error;

      const processedData = (data || []).map(project => {
        const images = Array.isArray(project.images) ? project.images : [];
        console.log(`Project: ${project.title}, Images:`, images);
        return {
          ...project,
          images
        };
      });

      setProjects(processedData);
      setFilteredProjects(processedData);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    setError('');
    setSuccess(false);

    try {
      const { error: submitError } = await supabase
        .from('contact_submissions')
        .insert([formData]);

      if (submitError) throw submitError;

      const formspreeRes = await fetch('https://formspree.io/f/mkovlnvv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          message: formData.message,
        }),
      });

      if (!formspreeRes.ok) {
        console.error('Formspree submission failed:', await formspreeRes.text());
      }

      setSuccess(true);
      setFormData({ name: '', email: '', phone: '', company: '', message: '' });

      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      console.error('Error submitting form:', err);
      setError('Es ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.');
    } finally {
      setFormLoading(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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

  useEffect(() => {
    setCurrentImageIndex(0);
    if (selectedProject) {
      console.log('Selected project:', selectedProject.title);
      console.log('Images array from project:', selectedProject.images);
      console.log('Image URL:', selectedProject.image_url);
    }
  }, [selectedProject]);

  const getProjectImages = (project: Project | null): string[] => {
    if (!project) return [];
    if (project.images && Array.isArray(project.images) && project.images.length > 0) {
      return project.images.filter(img => img && typeof img === 'string');
    }
    return project.image_url ? [project.image_url] : [];
  };

  const nextImage = () => {
    if (!selectedProject) return;
    const images = getProjectImages(selectedProject);
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    if (!selectedProject) return;
    const images = getProjectImages(selectedProject);
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="min-h-screen">
      <section id="home" className="relative bg-gradient-to-br from-padula-navy-900 via-padula-navy-800 to-padula-900 text-white pt-32 pb-20 lg:pt-48 md:pb-28">
        <div className="absolute inset-0 bg-[url('/Padula_Fuhrpark.png')] bg-cover bg-center opacity-50" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight mt-12">
              Trockenbau trifft Stil – mit Padula wird Raum neu gedacht
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200 leading-relaxed">
              15 Jahre Erfahrung im Innenausbau. Von Trockenbau bis Malerarbeiten – Wir verwandeln Ihre Vision in Realität mit Präzision, Qualität und Engagement.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => scrollToSection('kontakt')}
                className="inline-flex items-center justify-center px-8 py-4 bg-padula-700 hover:bg-padula-800 text-white font-semibold rounded-lg transition-colors group"
              >
                Jetzt anfragen
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => scrollToSection('projekte')}
                className="inline-flex items-center justify-center px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold rounded-lg border-2 border-white/30 transition-colors"
              >
                Projekte ansehen
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="p-6">
              <div className="text-4xl font-bold text-padula-700 mb-2">15+</div>
              <div className="text-gray-600">Jahre Erfahrung</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-padula-700 mb-2">500+</div>
              <div className="text-gray-600">Projekte</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-padula-700 mb-2">100%</div>
              <div className="text-gray-600">Sauber & schnell</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-padula-700 mb-2">1</div>
              <div className="text-gray-600">Direkter Ansprechpartner</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Über Padula Innenausbau
              </h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Was vor 15 Jahren in einer Garage begann, ist heute ein etabliertes Unternehmen mit eigenem Bürogebäude, modernem Lager und drei Hallenbereichen. Unter der Leitung von Bogdan Padula hat sich das Team von 5-7 Vollzeitmitarbeitern einen Namen für modernen, freundlichen und professionellen Innenausbau gemacht.
              </p>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                Unser Erfolgsrezept: Gute Planung, dauerhafter Kontakt zur Absprache, Achtung auf Finessen und Details – und ein Preis-Leistungs-Verhältnis, das stimmt.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-padula-700 flex-shrink-0" />
                  <span className="text-gray-700">Freundliches und kompetentes Team</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-padula-700 flex-shrink-0" />
                  <span className="text-gray-700">Gute Planung und dauerhafter Kontakt zur Absprache</span>
                </div>
                                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-padula-700 flex-shrink-0" />
                  <span className="text-gray-700">Sonderwünsche</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-padula-700 flex-shrink-0" />
                  <span className="text-gray-700">Achtung auf Finessen und Details</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-padula-700 flex-shrink-0" />
                  <span className="text-gray-700">Transparente Angebote & klare Kosten</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <Award className="w-12 h-12 text-padula-700 mb-4" />
                <h3 className="font-semibold text-lg mb-2">Qualität</h3>
                <p className="text-gray-600 text-sm">
                  Höchste Standards in jedem Projekt
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <Users className="w-12 h-12 text-padula-700 mb-4" />
                <h3 className="font-semibold text-lg mb-2">Erfahrung</h3>
                <p className="text-gray-600 text-sm">
                  15+ Jahre Branchenerfahrung
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <Wrench className="w-12 h-12 text-padula-700 mb-4" />
                <h3 className="font-semibold text-lg mb-2">Service</h3>
                <p className="text-gray-600 text-sm">
                  Rundum-Betreuung für Ihr Projekt
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <CheckCircle className="w-12 h-12 text-padula-700 mb-4" />
                <h3 className="font-semibold text-lg mb-2">Zuverlässig</h3>
                <p className="text-gray-600 text-sm">
                  Termine werden eingehalten
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="leistungen" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Unsere Leistungen</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Von Trockenbau bis Komplettservice – Wir bieten Ihnen professionelle Lösungen für
              alle Bereiche des Innenausbaus.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={index}
                  className="bg-gray-50 rounded-xl shadow-lg hover:shadow-xl transition-shadow p-8 group"
                >
                  <div className="bg-padula-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6 group-hover:bg-padula-700 transition-colors">
                    <Icon className="w-8 h-8 text-padula-700 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                  <p className="text-gray-700 mb-6 leading-relaxed">{service.description}</p>
                  <ul className="space-y-3">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 bg-padula-700 rounded-full mt-2 flex-shrink-0" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="projekte" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Unsere Projekte</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ein Einblick in unsere abgeschlossenen Projekte. Qualität und Handwerkskunst, die für
              sich sprechen.
            </p>
          </div>

          <div className="hidden">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-padula-700 text-white shadow-lg scale-105'
                    : 'bg-white text-gray-700 hover:bg-padula-50 hover:text-padula-700 shadow'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 text-padula-700 animate-spin" />
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-gray-600">
                Noch keine Projekte in dieser Kategorie vorhanden.
              </p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.slice(0, 3).map((project) => (
                <div
                  key={project.id}
                  onClick={() => setSelectedProject(project)}
                  className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all cursor-pointer group"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={project.image_url}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                        console.error('Failed to load project image:', project.image_url);
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&auto=format&fit=crop';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="p-6">
                    <div className="text-sm text-padula-700 font-medium mb-2">
                      {project.category}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-padula-700 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 line-clamp-2">{project.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section id="kontakt" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Kontakt</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Haben Sie Fragen oder möchten Sie ein Projekt besprechen? Kontaktieren Sie uns – wir
              freuen uns auf Ihre Nachricht!
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-12">
            <div className="lg:col-span-2">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Kontaktinformationen</h3>
              <p className="text-gray-700 mb-8 leading-relaxed">
                Erreichen Sie uns telefonisch, per E-Mail oder besuchen Sie uns persönlich. Wir
                beraten Sie gerne!
              </p>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-padula-100 p-3 rounded-lg">
                    <MapPin className="w-6 h-6 text-padula-700" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Adresse</h4>
                    <p className="text-gray-600">
                      Auf dem Mohr 3
                      <br />
                      55481 Reckershausen
                      <br />
                      Hunsrück
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-padula-100 p-3 rounded-lg">
                    <Phone className="w-6 h-6 text-padula-700" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Telefon</h4>
                    <a
                      href="tel:+4967635569411"
                      className="text-gray-600 hover:text-padula-700 transition-colors"
                    >
                      (06763) 5569411
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-padula-100 p-3 rounded-lg">
                    <Mail className="w-6 h-6 text-padula-700" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">E-Mail</h4>
                    <a
                      href="mailto:mail@padula-innenausbau.eu"
                      className="text-gray-600 hover:text-padula-700 transition-colors"
                    >
                      mail@padula-innenausbau.eu
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-10 p-6 bg-gray-50 rounded-xl shadow-lg">
                <h4 className="font-semibold text-gray-900 mb-3">Öffnungszeiten</h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Montag - Freitag:</span>
                    <span className="font-medium">07:00 - 16:00 Uhr</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-3">
              <div className="bg-gray-50 rounded-xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Senden Sie uns eine Nachricht
                </h3>

                {success && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <p className="text-green-800">
                      Vielen Dank! Ihre Nachricht wurde erfolgreich gesendet. Wir melden uns
                      schnellstmöglich bei Ihnen.
                    </p>
                  </div>
                )}

                {error && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-800">{error}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-padula-600 focus:border-transparent transition-shadow"
                      placeholder="Ihr Name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      E-Mail *
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-padula-600 focus:border-transparent transition-shadow"
                      placeholder="ihre.email@beispiel.de"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Telefon *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-padula-600 focus:border-transparent transition-shadow"
                      placeholder="(06763) 5569411"
                    />
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                      Firma (optional)
                    </label>
                    <input
                      type="text"
                      id="company"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-padula-600 focus:border-transparent transition-shadow"
                      placeholder="Ihre Firma"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Nachricht *
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-padula-600 focus:border-transparent transition-shadow resize-none"
                      placeholder="Beschreiben Sie Ihr Projekt oder Ihre Anfrage..."
                    />
                  </div>

                  <div className="flex items-start space-x-2">
                    <input
                      type="checkbox"
                      id="privacy"
                      required
                      className="mt-1 w-4 h-4 text-padula-700 border-gray-300 rounded focus:ring-padula-600"
                    />
                    <label htmlFor="privacy" className="text-sm text-gray-600">
                      Ich habe die{' '}
                      <button
                        type="button"
                        onClick={() => setShowDatenschutz(true)}
                        className="text-padula-600 hover:underline font-medium"
                      >
                        Datenschutzerklärung
                      </button>
                      {' '}zur Kenntnis genommen. Ich stimme zu, dass meine Angaben zur Kontaktaufnahme und für Rückfragen dauerhaft gespeichert werden. *
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={formLoading}
                    className="w-full bg-padula-700 hover:bg-padula-800 disabled:bg-gray-400 text-white font-semibold py-4 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
                  >
                    {formLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Wird gesendet...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Nachricht senden</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {selectedProject && (() => {
        const images = getProjectImages(selectedProject);
        const hasMultipleImages = images.length > 1;

        return (
          <div
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
            <div
              className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <img
                  src={images[currentImageIndex]}
                  alt={`${selectedProject.title} - Bild ${currentImageIndex + 1}`}
                  className="w-full max-h-[75vh] object-contain bg-gray-100"
                  onError={(e) => {
                    console.error('Failed to load image:', images[currentImageIndex]);
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&auto=format&fit=crop';
                  }}
                />

                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 bg-white/90 hover:bg-white p-2 rounded-full transition-colors z-10"
                >
                  <X className="w-6 h-6" />
                </button>

                {hasMultipleImages && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        prevImage();
                      }}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full transition-all hover:scale-110"
                      aria-label="Vorheriges Bild"
                    >
                      <ChevronLeft className="w-6 h-6 text-gray-800" />
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        nextImage();
                      }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full transition-all hover:scale-110"
                      aria-label="Nächstes Bild"
                    >
                      <ChevronRight className="w-6 h-6 text-gray-800" />
                    </button>

                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                      {images.map((_, index) => (
                        <button
                          key={index}
                          onClick={(e) => {
                            e.stopPropagation();
                            setCurrentImageIndex(index);
                          }}
                          className={`w-2.5 h-2.5 rounded-full transition-all ${
                            index === currentImageIndex
                              ? 'bg-white w-8'
                              : 'bg-white/50 hover:bg-white/75'
                          }`}
                          aria-label={`Gehe zu Bild ${index + 1}`}
                        />
                      ))}
                    </div>

                    <div className="absolute top-4 left-4 bg-black/60 text-white px-3 py-1.5 rounded-full text-sm font-medium">
                      {currentImageIndex + 1} / {images.length}
                    </div>
                  </>
                )}
              </div>
              <div className="p-8">
                <div className="text-sm text-padula-700 font-medium mb-2">
                  {selectedProject.category}
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  {selectedProject.title}
                </h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  {selectedProject.description}
                </p>
                <div className="text-sm text-gray-500">
                  Abgeschlossen:{' '}
                  {new Date(selectedProject.date_completed).toLocaleDateString('de-DE', {
                    year: 'numeric',
                    month: 'long',
                  })}
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-padula-700 hover:bg-padula-800 text-white p-4 rounded-full shadow-lg transition-all hover:scale-110 z-40"
          aria-label="Nach oben scrollen"
        >
          <ChevronUp className="w-6 h-6" />
        </button>
      )}

      {showDatenschutz && <DatenschutzModal onClose={() => setShowDatenschutz(false)} />}
    </div>
  );
}
