/**
 * @file InteractiveMap.jsx
 * @description Reusable atomic map.Standardizes a greographic location map within shared UI Layer.
 * @Mmodule shared/components/UI/InteractiveMap
 * @author Nico Paez
 */
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

// Leaflet CSS is required for proper map rendering
import "leaflet/dist/leaflet.css";

// Fix for Leaflet default marker icon issues in React environments
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

/**
 * Default Marker Configuration.
 * Manually sets the marker icons to ensure they load correctly
 * within the bundled React application.
 */
let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

L.Marker.prototype.options.icon = DefaultIcon;

/**
 * InteractiveMap Component (Shared UI).
 * * A lightweight, dependency-free (no API key required) map component
 * powered by OpenStreetMap and React-Leaflet.
 * * @component
 * @category Shared/UI
 * * @param {Object} props
 * @param {number} props.lat - Geographical latitude.
 * @param {number} props.lng - Geographical longitude.
 * @param {string} props.title - The venue name or label to display in the popup.
 * * @returns {JSX.Element} A fully interactive map container.
 */
const InteractiveMap = ({ lat, lng, title }) => {
  // Safety check to prevent MapContainer from crashing with undefined coordinates
  if (!lat || !lng) return null;

  return (
    <div
      className="h-full w-full z-0 overflow-hidden"
      aria-label={`Map showing location of ${title}`}
    >
      <MapContainer
        center={[lat, lng]}
        zoom={15}
        scrollWheelZoom={false}
        className="h-full w-full"
        // Ensures the map re-renders if coordinates change
        key={`${lat}-${lng}`}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[lat, lng]}>
          <Popup>
            <div className="text-center p-1">
              <span className="font-bold text-secondary">{title}</span>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default InteractiveMap;
