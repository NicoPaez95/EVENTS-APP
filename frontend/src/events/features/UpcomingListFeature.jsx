import { useState } from 'react';
import { useEvents } from '../hooks/useEvents';
import EventGrid from '../components/EventGrid';

/**
 * @typedef {Object} FilterButton
 * @property {string} id - Unique identifier for the filter (e.g., '24h', '7d').
 * @property {string} label - The text displayed on the button.
 */

/**
 * UpcomingListFeature Component.
 * * * This feature-level orchestrator manages the "Upcoming Experiences" view.
 * * It provides a time-based filtering interface allowing users to toggle between 
 * different proximity windows (24 hours, 7 days, 30 days, or all).
 * * The component handles chronological filtering logic by comparing current 
 * system time against event dates.
 * * @component
 * @category Features
 * @returns {JSX.Element} A structured layout containing time filters and a 
 * responsive grid of filtered events.
 */
const UpcomingListFeature = () => {
  const { events, loading } = useEvents();
  
  /**
   * timeFilter State:
   * Controls the current active time window for the event collection.
   * @type {string} '24h' | '7d' | '30d' | 'all'
   */
  const [timeFilter, setTimeFilter] = useState('7d');

  /**
   * Date Filtering Engine:
   * Memoizes (via IIFE) the filtered collection based on the selected time window.
   * It excludes past events and calculates the day difference for each item.
   * @returns {Array<Object>} The subset of events that fall within the time range.
   */
  const filteredEvents = (() => {
    const now = new Date();
    
    return events.filter(event => {
      const eventDate = new Date(event.date);
      const timeDiff = eventDate - now;
      const daysDiff = timeDiff / (1000 * 60 * 60 * 24);

      // Only include future events
      if (timeDiff < 0) return false;

      if (timeFilter === '24h') return daysDiff <= 1;
      if (timeFilter === '7d') return daysDiff <= 7;
      if (timeFilter === '30d') return daysDiff <= 30;
      
      return true; // For 'all' filter or default
    });
  })();

  /** @type {FilterButton[]} */
  const filterButtons = [
    { id: '24h', label: 'Next 24 Hours' },
    { id: '7d', label: 'This Week' },
    { id: '30d', label: 'This Month' },
    { id: 'all', label: 'All Upcoming' },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <p className="text-lg text-slate-600 animate-pulse">
          Scanning the horizon for upcoming experiences...
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 space-y-8 animate-fade-in">
      
      {/* Header & Filter Controls */}
      <header className="space-y-6">
        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
          Upcoming Experiences
        </h2>
        
        <nav className="flex flex-wrap gap-4" aria-label="Time filters">
          {filterButtons.map((btn) => (
            <button
              key={btn.id}
              onClick={() => setTimeFilter(btn.id)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 border ${
                timeFilter === btn.id
                  ? 'bg-blue-600 text-white border-blue-600 shadow-lg scale-105'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-blue-400 hover:text-blue-600'
              }`}
            >
              {btn.label}
            </button>
          ))}
        </nav>
      </header>

      {/* Results Section: Reusing the Atomic EventGrid */}
      <section aria-label="Filtered Events Grid">
        {filteredEvents.length > 0 ? (
          <EventGrid events={filteredEvents} />
        ) : (
          <div className="text-center py-20 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
            <p className="text-slate-500 text-lg">No events found for this specific period.</p>
            <button 
              onClick={() => setTimeFilter('all')}
              className="mt-4 text-blue-600 font-semibold hover:underline"
            >
              Show all upcoming events
            </button>
          </div>
        )}
      </section>

    </div>
  );
};

export default UpcomingListFeature;