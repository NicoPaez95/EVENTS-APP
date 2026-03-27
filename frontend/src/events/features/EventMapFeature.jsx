import InteractiveMap from '../../shared/components/UI/InteractiveMap';
import VenueInfo from '../components/VenueInfo';
import { getExternalMapUrl } from '../utils/mapHelpers';

/**
 * EventMapFeature Component.
 * Orchestrates the map view and external navigation links.
 */
const EventMapFeature = ({ venue }) => {
  // Verificación de seguridad
  if (!venue || !venue.lat || !venue.lng) return null;

  const googleMapsUrl = getExternalMapUrl(venue.lat, venue.lng, venue.name);

  return (
    <section className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
      <header className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-bold text-slate-900">Location</h3>
          <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">
            Powered by OpenStreetMap
          </p>
        </div>

        {/* El "Puente" a Google Maps */}
        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-50 text-blue-600 px-4 py-2 rounded-xl text-xs font-bold hover:bg-blue-600 hover:text-white transition-all shadow-sm"
        >
          GET DIRECTIONS
        </a>
      </header>

      {/* Contenedor del Mapa Real */}
      <div className="w-full h-64 rounded-2xl overflow-hidden border border-slate-100 relative group">
        <InteractiveMap
          lat={venue.lat}
          lng={venue.lng}
          title={venue.name}
        />

        {/* Overlay sutil para invitar a usar el link externo */}
        <div className="absolute top-2 right-2 z-[400] opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="bg-white/90 backdrop-blur px-2 py-1 rounded text-[10px] font-bold text-slate-500 shadow-sm border">
            {"Use 'Get Directions' for GPS"}
          </div>
        </div>
      </div>

      <div className="mt-4">
        <VenueInfo venue={venue} />
      </div>
    </section>
  );
};

export default EventMapFeature;