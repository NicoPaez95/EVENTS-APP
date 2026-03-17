/**
 * Advanced event filtering utility with adaptive logic.
 * * This function performs a multi-layered search:
 * 1. **Strict Match**: Filters by all provided criteria (AND logic).
 * 2. **Adaptive Fallback**: If no strict matches are found, it expands the search:
 * - Date: Searches for events within a +/- 3-day window.
 * - Location/Category: Relaxes constraints to find partial matches.
 * * @function
 * @param {Array<Object>} events - The complete array of event objects.
 * @param {Object} filters - Search criteria.
 * @param {string} [filters.searchTerm=""] - Global text to match across title, category, or location.
 * @param {string} [filters.category=""] - Specific category filter. Use 'all' to bypass category filtering.
 * @param {string} [filters.date=""] - Target date string in YYYY-MM-DD format.
 * @param {string} [filters.location=""] - Specific city or venue filter.
 * @returns {Array<Object>} A filtered and prioritized subset of events.
 */
export const filterEvents = (events, filters) => {
  let { searchTerm, category, date, location } = filters;
  
  // Normalize category value: 'all' is treated as no filter
  if (category?.toLowerCase() === 'all') category = undefined;

  // --- STAGE 1: Strict Filtering ---
  let results = events.filter((event) => {
    const term = searchTerm?.toLowerCase();
    
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
    if (date && !searchTerm && !category && !location) {
      const targetDate = new Date(date);
      results = events.filter((event) => {
        const eventDate = new Date(event.date);
        const diffTime = Math.abs(eventDate.getTime() - targetDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays <= 3;
      }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    }

    // Fallback B: Partial Term Matching
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