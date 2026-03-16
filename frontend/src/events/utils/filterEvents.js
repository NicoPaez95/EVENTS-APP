/**
 * Advanced event filtering utility with adaptive logic.
 * * This function performs a multi-layered search:
 * 1. Strict Match: Filters by all provided criteria (AND logic).
 * 2. Adaptive Fallback: If no strict matches are found, it expands the search:
 * - Date: Searches for events within a +/- 3-day window.
 * - Location/Category: Relaxes constraints to find partial matches.
 * * @function
 * @param {Object[]} events - The complete array of event objects.
 * @param {Object} filters - Search criteria.
 * @param {string} [filters.searchTerm] - Global text to match across title, category, or location.
 * @param {string} [filters.category] - Specific category filter.
 * @param {string} [filters.date] - Target date string (YYYY-MM-DD).
 * @param {string} [filters.location] - Specific location or venue filter.
 * @returns {Object[]} A filtered and prioritized subset of events.
 */
export const filterEvents = (events, filters) => {
  const { searchTerm, category, date, location } = filters;

  // --- STAGE 1: Strict Filtering ---
  let results = events.filter((event) => {
    const term = searchTerm?.toLowerCase();
    
    // Global search term matches Title OR Category OR Location
    const matchesSearch = term
      ? event.title.toLowerCase().includes(term) || 
        event.category.toLowerCase().includes(term) ||
        event.location.toLowerCase().includes(term)
      : true;

    const matchesCategory = category
      ? event.category.toLowerCase().includes(category.toLowerCase())
      : true;

    const matchesLocation = location
      ? event.location.toLowerCase().includes(location.toLowerCase())
      : true;

    const matchesDate = date ? event.date === date : true;

    return matchesSearch && matchesCategory && matchesLocation && matchesDate;
  });

  // --- STAGE 2: Adaptive Fallback (If no results found) ---
  if (results.length === 0) {
    
    // Fallback A: Date Proximity Search (+/- 3 days)
    // Applied when searching by date without other specific constraints
    if (date && !searchTerm && !category && !location) {
      const targetDate = new Date(date);
      results = events.filter((event) => {
        const eventDate = new Date(event.date);
        const diffTime = Math.abs(eventDate - targetDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays <= 3;
      }).sort((a, b) => new Date(a.date) - new Date(b.date));
    }

    // Fallback B: Partial Term Matching
    // Relaxes the search to find events that match at least one specific intent
    if (results.length === 0 && (category || location || searchTerm)) {
      results = events.filter((event) => {
        return (
          (category && event.category.toLowerCase().includes(category.toLowerCase())) ||
          (location && event.location.toLowerCase().includes(location.toLowerCase())) ||
          (searchTerm && event.title.toLowerCase().includes(searchTerm.toLowerCase()))
        );
      });
    }
  }

  return results;
};