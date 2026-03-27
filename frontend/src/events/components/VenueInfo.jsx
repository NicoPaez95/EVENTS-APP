/**
 * VenueInfo Component (Presentational).
 * * A specialized UI atom used to display venue and city information 
 * with a consistent geographic icon and typography.
 * * @component
 * @category Components/UI
 * * @param {Object} props
 * @param {Object} props.venue - The venue object containing at least name and city.
 * @param {string} props.venue.name - The official name of the venue.
 * @param {string} props.venue.city - The city where the venue is located.
 * @param {boolean} [props.isClickable=false] - Optional flag to add hover effects and pointer cursor.
 * * @returns {JSX.Element|null} The formatted venue display or null if data is missing.
 */
const VenueInfo = ({ venue, isClickable = false }) => {
  if (!venue || !venue.name || !venue.city) return null;

  const displayPath = `${venue.name} (${venue.city})`;

  return (
    <div 
      className={`flex items-center gap-2 text-sm transition-colors duration-200 ${
        isClickable 
          ? 'cursor-pointer hover:text-blue-600 text-blue-500 font-semibold' 
          : 'text-slate-600 font-medium'
      }`}
    >
      {/* Location Pin Icon */}
      <svg 
        className="w-4 h-4 flex-shrink-0" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth="2" 
          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" 
        />
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth="2" 
          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" 
        />
      </svg>
      
      <span className="truncate" title={displayPath}>
        {displayPath}
      </span>
    </div>
  );
};

export default VenueInfo;