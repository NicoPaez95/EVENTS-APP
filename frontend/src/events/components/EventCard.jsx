import { Link } from "react-router-dom";
import useNotification from "../../user/hooks/useNotification";
import VenueInfo from "./VenueInfo";

/**
 * Close icon component for removal actions.
 * @type {JSX.Element}
 */
const CLOSE_ICON = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

/**
 * Heart icon component with dynamic state styling.
 * @param {boolean} isSaved - Determines the fill color and text contrast.
 * @returns {JSX.Element}
 */
const HEART_ICON = (isSaved) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill={isSaved ? "currentColor" : "none"}
    stroke="currentColor"
    className={`w-5 h-5 transition-colors ${isSaved ? "text-red-500" : "text-slate-400"}`}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
    />
  </svg>
);

/**
 * @typedef {Object} EventCardProps
 * @property {string|number} id - Unique identifier for the event.
 * @property {string} title - The display name of the event.
 * @property {string} date - Formatted event date string.
 * @property {Object} venue - Venue details object.
 * @property {string} venue.name - Name of the venue.
 * @property {string} venue.city - City where the venue is located.
 * @property {string} category - Event classification (e.g., 'Music', 'Sports').
 * @property {boolean} isSaved - Indicates if the event is currently bookmarked by the user.
 * @property {boolean} [showRemoveButton=false] - If true, displays a close icon instead of a heart.
 * @property {Function} onToggleSave - Function to handle adding/removing from favorites.
 * @property {Function} [onAction] - Optional callback for additional side effects.
 */

/**
 * EventCard Component
 * * A presentational component that displays a summary of an event.
 * Features a dynamic action button for saving/removing events and
 * integrates with the VenueInfo sub-component.
 * * @component
 * @example
 * return (
 * <EventCard id="1" title="Rock Fest" date="2024-05-12" isSaved={false} />
 * )
 * * @param {EventCardProps} props - Component props.
 * @returns {JSX.Element} The rendered EventCard component.
 */
const EventCard = ({
  id,
  title,
  date,
  venue,
  category,
  isSaved,
  showRemoveButton = false,
  onToggleSave,
  onAction,
}) => {
  const { showToast } = useNotification();

  /**
   * Prevents event bubbling and executes the save/remove logic.
   * Also triggers an optional parent callback if provided.
   * * @param {React.MouseEvent<HTMLButtonElement>} e - The click event.
   */
  const handleAction = (e) => {
    e.preventDefault();
    e.stopPropagation();

    onToggleSave(id);

    if (onAction) {
      onAction(id);
    }
  };

  return (
    <article className="group relative bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300">
      {/* Floating Action Button */}
      <button
        onClick={handleAction}
        aria-label={showRemoveButton ? "Remove event" : "Save event"}
        className={`absolute top-3 right-3 z-10 p-2 rounded-full backdrop-blur-sm shadow-sm hover:scale-110 transition-all
          ${
            showRemoveButton
              ? "bg-red-50 text-red-500 hover:bg-red-500 hover:text-white"
              : "bg-white/80 text-slate-400 hover:text-red-500"
          }`}
      >
        {showRemoveButton ? CLOSE_ICON : HEART_ICON(isSaved)}
      </button>

      {/* Content Link */}
      <Link to={`/events/${id}`} className="block p-5">
        <header>
          <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-2 py-1 rounded-md">
            {category}
          </span>
          <h3 className="font-bold text-lg mt-4 text-slate-800 group-hover:text-blue-600 transition-colors leading-tight">
            {title}
          </h3>
        </header>

        <div className="mt-5 space-y-3">
          <p className="text-xs text-slate-600 flex items-center gap-2">
            <span className="opacity-70" aria-hidden="true">
              📅
            </span>{" "}
            {date}
          </p>

          {/* Location details */}
          <VenueInfo venue={venue} isClickable={false} />
        </div>

        <footer className="mt-6 pt-4 border-t border-slate-50 text-xs font-bold text-blue-500 group-hover:text-blue-700 flex items-center gap-1 transition-colors">
          View Details <span aria-hidden="true">→</span>
        </footer>
      </Link>
    </article>
  );
};

export default EventCard;
