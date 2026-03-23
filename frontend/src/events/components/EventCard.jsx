import { useState } from 'react';
import { Link } from 'react-router-dom';

/**
 * Icons defined outside the component to prevent re-declaration 
 * on every render and keep the JSX clean.
 */
const CLOSE_ICON = (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const HEART_ICON = (isSaved) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill={isSaved ? "currentColor" : "none"} 
    stroke="currentColor" 
    className={`w-5 h-5 transition-colors ${isSaved ? "text-red-500" : "text-slate-400"}`}
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
);

/**
 * @typedef {Object} EventCardProps
 * @property {string|number} id - Unique identifier for the event.
 * @property {string} title - The official name of the event.
 * @property {string} date - Event date in YYYY-MM-DD format.
 * @property {string} location - Geographical or venue location.
 * @property {string} category - Event category (e.g., Music, Tech).
 * @property {boolean} isSaved - Current saved status from global state.
 * @property {boolean} [showRemoveButton=false] - If true, renders a delete icon instead of a heart.
 * @property {Function} onToggleSave - Callback function to handle save/unsave logic.
 * @property {Function} [onAction] - Additional callback for local logic (e.g., closing a modal).
 */

/**
 * EventCard Component.
 * * A polymorphic presentational component used to display event summaries.
 * It strictly follows a "Dumb Component" pattern, receiving all data and actions via props.
 * * @component
 * @category Components
 * @param {EventCardProps} props
 * @returns {JSX.Element} A themed card with navigation and action triggers.
 */
const EventCard = ({ 
  id, 
  title, 
  date, 
  location, 
  category, 
  isSaved, 
  showRemoveButton = false, 
  onToggleSave,
  onAction 
}) => {
  const [showToast, setShowToast] = useState(false);

  /**
   * Handles the primary action (Save/Remove) without triggering the Link navigation.
   * @param {MouseEvent} e - The click event object.
   */
  const handleAction = (e) => {
    e.preventDefault();
    e.stopPropagation();

    onToggleSave(id);

    if (showRemoveButton) {
      if (onAction) onAction(id);
    } else {
      if (!isSaved) {
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2000);
      }
    }
  };

  return (
    <article className="group relative bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300">
      
      {/* Dynamic Action Button */}
      <button
        onClick={handleAction}
        aria-label={showRemoveButton ? "Remove event" : "Save event"}
        className={`absolute top-3 right-3 z-10 p-2 rounded-full backdrop-blur-sm shadow-sm hover:scale-110 transition-all
          ${showRemoveButton 
            ? 'bg-red-50 text-red-500 hover:bg-red-500 hover:text-white' 
            : 'bg-white/80 text-slate-400 hover:text-red-500'}`}
      >
        {showRemoveButton ? CLOSE_ICON : HEART_ICON(isSaved)}
      </button>

      {/* Confirmation Feedback */}
      {!showRemoveButton && showToast && (
        <div className="absolute top-12 right-3 z-20 bg-slate-800 text-white text-[10px] font-bold py-1 px-3 rounded shadow-xl animate-in fade-in slide-in-from-top-1">
          Added to calendar! ✨
        </div>
      )}

      {/* Navigable Content */}
      <Link to={`/events/${id}`} className="block p-5">
        <header>
          <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-2 py-1 rounded-md">
            {category}
          </span>
          <h3 className="font-bold text-lg mt-4 text-slate-800 group-hover:text-blue-600 transition-colors leading-tight">
            {title}
          </h3>
        </header>
        
        <div className="mt-5 space-y-2">
          <p className="text-xs text-slate-600 flex items-center gap-2">
            <span className="opacity-70">📅</span> {date}
          </p>
          <p className="text-xs italic text-slate-500 flex items-center gap-2">
            <span className="opacity-70">📍</span> {location}
          </p>
        </div>

        <footer className="mt-6 pt-4 border-t border-slate-50 text-xs font-bold text-blue-500 group-hover:text-blue-700 flex items-center gap-1 transition-colors">
          View Details <span>→</span>
        </footer>
      </Link>
    </article>
  );
};

export default EventCard;