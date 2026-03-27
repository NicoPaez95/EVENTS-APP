/**
 * Advanced event filtering utility with adaptive logic.
 * * This function performs a multi-layered search:
 * 1. **Strict Match**: Filters by all provided criteria using AND logic.
 * 2. **Adaptive Fallback**: If no strict matches are found, it expands the scope:
 * - Date: Searches for events within a +/- 3-day window.
 * - Location/Category/SearchTerm: Relaxes constraints to find partial matches.
 * * @function
 * @category Utils/Events
 * @param {Array<Object>} events - The complete array of event objects from the master catalog.
 * @param {Object} filters - The search criteria provided by the user.
 * @param {string} [filters.searchTerm=""] - Global text to match across title, category, or city.
 * @param {string} [filters.category=""] - Specific category filter. 'All' is treated as no filter.
 * @param {string} [filters.date=""] - Target date string in YYYY-MM-DD format.
 * @param {string} [filters.location=""] - Specific city or venue name filter.
 * @returns {Array<Object>} A filtered and prioritized subset of events.
 */
export const filterEvents = (events, filters) => {
  let { searchTerm, category, date, location } = filters;
  
  // Normalize category value: 'all' is treated as no filter
  if (category?.toLowerCase() === 'all') category = undefined;

  // --- STAGE 1: Strict Filtering ---
  let results = events.filter((event) => {
    const term = searchTerm?.toLowerCase();
    
    // Check global search term across Title, Category, and City (Venue)
    const matchesSearch = term
      ? event.title?.toLowerCase().includes(term) || 
        event.category?.toLowerCase().includes(term) ||
        event.venue?.city?.toLowerCase().includes(term)
      : true;

    // Check specific category
    const matchesCategory = category
      ? event.category?.toLowerCase().includes(category.toLowerCase())
      : true;

    // Check specific location (City)
    const matchesLocation = location
      ? event.venue?.city?.toLowerCase().includes(location.toLowerCase())
      : true;

    // Check strict date match
    const matchesDate = date ? event.date === date : true;

    return matchesSearch && matchesCategory && matchesLocation && matchesDate;
  });

  // --- STAGE 2: Adaptive Fallback (Triggered if strict results are empty) ---
  if (results.length === 0) {
    
    // Fallback A: Date Proximity Search (+/- 3 days)
    // Only triggers if the user provided a date without other text constraints
    if (date && !searchTerm && !category && !location) {
      const targetDate = new Date(date);
      results = events.filter((event) => {
        const eventDate = new Date(event.date);
        const diffTime = Math.abs(eventDate.getTime() - targetDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays <= 3;
      }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    }

    // Fallback B: Partial/Relaxed Term Matching
    if (results.length === 0 && (category || location || searchTerm)) {
      results = events.filter((event) => {
        return (
          (category && event.category?.toLowerCase().includes(category.toLowerCase())) ||
          (location && event.venue?.city?.toLowerCase().includes(location.toLowerCase())) ||
          (searchTerm && event.title?.toLowerCase().includes(searchTerm.toLowerCase()))
        );
      });
    }
  }

  return results;
};