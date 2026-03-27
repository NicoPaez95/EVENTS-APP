/**
 * EmptyState Component (Presentational/Atom).
 * * A generic, stateless UI component used to provide visual feedback 
 * when a data collection is empty or a search returns no results.
 * * @component
 * @category Components/Shared
 * * @description
 * This component is designed to be highly reusable across different features 
 * (Events, Favorites, Search, etc.). It uses a dashed border and centered 
 * typography to signify a "void" or "placeholder" state in the UI.
 * * @param {Object} props - Component properties.
 * @param {string} [props.message="No items found."] - The descriptive text to display 
 * to the user. It should clearly explain why the current view is empty.
 * * @returns {JSX.Element} A stylized container with a centered text message and ARIA roles for accessibility.
 */
const EmptyState = ({ message = "No items found." }) => (
  <div 
    className="text-center py-10 bg-slate-50 rounded-2xl border border-dashed border-slate-200 animate-in fade-in" 
    role="alert"
    aria-live="polite"
  >
    <p className="text-slate-500 font-medium">{message}</p>
  </div>
);

export default EmptyState;