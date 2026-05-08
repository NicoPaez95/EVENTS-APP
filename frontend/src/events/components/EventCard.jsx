/**
 * @file EventCard.jsx
 * @description Presentational component for event summaries.
 * Features interactive states for bookmarking and navigation.
 * @module components/events/EventCard
 * @author Nico Paez
 */

import { Link } from "react-router-dom";
import useNotification from "../../user/hooks/useNotification";
import VenueInfo from "./VenueInfo";

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

  const handleAction = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (onToggleSave) {
      onToggleSave(id);
    }

    if (onAction) {
      onAction(id);
    }
  };

  return (
    <article className="group relative bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300">
      <button
        onClick={handleAction}
        aria-label={showRemoveButton ? "Remove event" : "Save event"}
        className={`absolute top-3 right-3 z-10 p-2 rounded-full backdrop-blur-sm shadow-sm hover:scale-110 transition-all
          ${showRemoveButton ? "bg-red-50 text-red-500 hover:bg-red-500 hover:text-white" : "bg-white/80 text-slate-400 hover:text-red-500"}`}
      >
        {showRemoveButton ? CLOSE_ICON : HEART_ICON(isSaved)}
      </button>

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
