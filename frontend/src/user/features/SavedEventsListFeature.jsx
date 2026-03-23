import { useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useEvents } from '../../events/hooks/useEvents';
import { useUser } from '../context/UserContext';
import EventCard from '../../events/components/EventCard';

/**
 * SavedEventsListFeature Component.
 * * This "Smart Component" (Feature) orchestrates the "My Saved Events" view.
 * It synchronizes the global event catalog with the user's bookmarked IDs 
 * and applies chronological filters based on URL search parameters.
 * * Architectural Role:
 * Acts as the primary data orchestrator for the Saved Events Page, 
 * injecting business logic and global state actions into atomic EventCard components.
 * * @component
 * @category Features
 * @returns {JSX.Element} A structured layout with a header and a responsive grid of saved events.
 */
const SavedEventsListFeature = () => {
  const { events, loading } = useEvents();
  const { savedIds, isEventSaved, toggleSaveEvent } = useUser();
  const [searchParams] = useSearchParams();
  
  /** * dateFilter: Captures the 'date' query param from the URL 
   * (usually triggered by a click on the Sidebar Calendar).
   */
  const dateFilter = searchParams.get('date');

  /**
   * displayList: Memoized collection of events.
   * Filters the global catalog by user-saved IDs and an optional date filter.
   * Logic: O(n) filtering where n is the total number of global events.
   */
  const displayList = useMemo(() => {
    // 1. Filter by user bookmarks
    let list = events.filter(event => savedIds.includes(event.id));

    // 2. Apply optional chronological filter from URL
    if (dateFilter) {
      list = list.filter(event => event.date === dateFilter);
    }
    
    return list;
  }, [events, savedIds, dateFilter]);

  if (loading) {
    return (
      <div 
        className="p-20 text-center animate-pulse text-slate-400 font-medium"
        role="status"
        aria-live="polite"
      >
        Loading your curated experiences...
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* Header Section: Context-aware title */}
      <header className="border-b border-slate-100 pb-6">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
          {dateFilter ? `Plans for ${dateFilter}` : 'My Saved Experiences'}
        </h1>
        <p className="text-slate-500 mt-2 font-medium">
          {displayList.length} {displayList.length === 1 ? 'event' : 'events'} found in your selection.
        </p>
      </header>

      {/* Results Grid or Empty State */}
      {displayList.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayList.map((event) => (
            <EventCard 
              key={event.id}
              {...event}
              isSaved={isEventSaved(event.id)}
              onToggleSave={toggleSaveEvent}
              showRemoveButton={true} // UI Variant: Renders the "X" (delete) icon
            />
          ))}
        </div>
      ) : (
        <div 
          className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200"
          role="status"
        >
          <p className="text-slate-400 text-lg">Your collection is empty for this selection.</p>
          <Link 
            to="/" 
            className="inline-block mt-4 text-blue-600 font-bold hover:text-blue-800 transition-colors"
          >
            Explore more events →
          </Link>
        </div>
      )}
    </div>
  );
};

export default SavedEventsListFeature;