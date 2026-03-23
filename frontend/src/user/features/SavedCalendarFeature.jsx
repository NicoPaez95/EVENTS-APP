import { useMemo, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEvents } from '../../events/hooks/useEvents';
import { useUser } from '../context/UserContext';
import SavedEventsCalendar from '../components/SavedEventsCalendar';
import { addMonths, subMonths, setMonth } from 'date-fns';

/**
 * SavedCalendarFeature Component.
 * * This "Smart Component" (Feature) orchestrates the logic for the User's Saved Events Calendar.
 * It manages the date navigation state, filters the global event catalog based on 
 * the user's saved IDs, and maps them into a date-indexed dictionary for efficient rendering.
 * * Architectural Role:
 * Acts as the Data Orchestrator for the presentation-only SavedEventsCalendar component.
 * * @component
 * @category Features
 * @returns {JSX.Element} The orchestrated SavedEventsCalendar.
 */
const SavedCalendarFeature = () => {
  const navigate = useNavigate();
  const { events } = useEvents();
  const { savedIds } = useUser();
  
  /**
   * Current focus date of the calendar.
   * Managed at the Feature level to keep the UI component stateless.
   */
  const [currentDate, setCurrentDate] = useState(new Date());

  /**
   * Data Orchestration:
   * Filters events saved by the user and transforms them into a map { "YYYY-MM-DD": [Event, ...] }
   * Memoized to prevent heavy recalculations on every render.
   */
  const eventsByDate = useMemo(() => {
    return events
      .filter((event) => savedIds.includes(event.id))
      .reduce((acc, event) => {
        const dateKey = event.date; // Expects "YYYY-MM-DD"
        if (!acc[dateKey]) acc[dateKey] = [];
        acc[dateKey].push(event);
        return acc;
      }, {});
  }, [events, savedIds]);

  /**
   * Navigation Handlers:
   * Memoized using useCallback to maintain stable references when passed to the UI component.
   */
  const handleDateClick = useCallback((dateKey) => {
    navigate(`/user/saved-events?date=${dateKey}`);
  }, [navigate]);

  const handleNextMonth = useCallback(() => {
    setCurrentDate((prev) => addMonths(prev, 1));
  }, []);

  const handlePrevMonth = useCallback(() => {
    setCurrentDate((prev) => subMonths(prev, 1));
  }, []);

  const handleSelectMonth = useCallback((index) => {
    setCurrentDate((prev) => setMonth(prev, index));
  }, []);

  return (
    <SavedEventsCalendar 
      currentDate={currentDate}
      eventsMap={eventsByDate} 
      onDateClick={handleDateClick}
      onNextMonth={handleNextMonth}
      onPrevMonth={handlePrevMonth}
      onSelectMonth={handleSelectMonth}
    />
  );
};

export default SavedCalendarFeature;