import { X } from 'lucide-react';

interface DatenschutzModalProps {
  onClose: () => void;
}

export default function DatenschutzModal({ onClose }: DatenschutzModalProps) {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between px-8 py-6 border-b border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900">Datenschutzerklärung</h2>
          <button
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors text-gray-500 hover:text-gray-700"
            aria-label="Schließen"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto px-8 py-6 space-y-6 text-sm text-gray-700 leading-relaxed">
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg text-amber-800 text-xs">
            Diese Datenschutzerklärung wird derzeit ausgearbeitet. Der finale Text wird in Kürze bereitgestellt.
          </div>

          <section>
            <h3 className="text-base font-semibold text-gray-900 mb-2">1. Datenschutz auf einen Blick</h3>
            <p>
              Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten
              passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie
              persönlich identifiziert werden können.
            </p>
          </section>

          <section>
            <h3 className="text-base font-semibold text-gray-900 mb-2">2. Verantwortliche Stelle</h3>
            <p>
              Verantwortlich für die Datenverarbeitung auf dieser Website ist:<br /><br />
              Padula Innenausbau GmbH<br />
              Auf dem Mohr 3<br />
              55481 Reckershausen<br /><br />
              Telefon: (06763) 5569411<br />
              E-Mail:{' '}
              <a href="mailto:mail@padula-innenausbau.eu" className="text-padula-600 hover:underline">
                mail@padula-innenausbau.eu
              </a>
            </p>
          </section>

          <section>
            <h3 className="text-base font-semibold text-gray-900 mb-2">3. Datenerfassung auf dieser Website</h3>
            <p className="font-medium text-gray-800">Kontaktformular</p>
            <p className="mt-1">
              Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem
              Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der
              Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht
              ohne Ihre Einwilligung weiter.
            </p>
          </section>

          <section>
            <h3 className="text-base font-semibold text-gray-900 mb-2">4. Ihre Rechte</h3>
            <p>
              Sie haben jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten
              personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck der Datenverarbeitung sowie
              ein Recht auf Berichtigung oder Löschung dieser Daten. Hierzu sowie zu weiteren Fragen zum Thema
              personenbezogene Daten können Sie sich jederzeit an uns wenden.
            </p>
          </section>

          <section>
            <h3 className="text-base font-semibold text-gray-900 mb-2">5. Hosting</h3>
            <p>
              Diese Website wird extern gehostet. Die personenbezogenen Daten, die auf dieser Website erfasst
              werden, werden auf den Servern des Hosters gespeichert. Hierbei kann es sich v. a. um
              IP-Adressen, Kontaktanfragen, Meta- und Kommunikationsdaten, Vertragsdaten, Kontaktdaten,
              Namen, Websitezugriffe und sonstige Daten, die über eine Website generiert werden, handeln.
            </p>
          </section>

          <p className="text-xs text-gray-400 pt-4 border-t border-gray-100">
            Stand: {new Date().toLocaleDateString('de-DE', { year: 'numeric', month: 'long' })} — Diese Datenschutzerklärung wird noch vervollständigt.
          </p>
        </div>
      </div>
    </div>
  );
}
