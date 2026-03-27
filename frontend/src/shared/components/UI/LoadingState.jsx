/**
 * LoadingState Component (Presentational/Atom).
 * * A generic, lightweight UI component used to provide immediate visual feedback 
 * while asynchronous data fetching or background processes are active.
 * * @component
 * @category Components/Shared
 * * @description
 * This component handles the "Pending" state of the UI lifecycle. 
 * It uses a subtle pulse animation (`animate-pulse`) to signify ongoing 
 * activity without being visually overwhelming.
 * * @param {Object} props - Component properties.
 * @param {string} [props.message="Loading..."] - The status message displayed 
 * to the user to provide context for the wait time.
 * * @returns {JSX.Element} A centered container with an animated text message and appropriate ARIA roles.
 */
const LoadingState = ({ message = "Loading..." }) => (
  <div 
    className="text-center py-10" 
    role="status" 
    aria-live="polite"
  >
    <p className="text-lg text-slate-600 animate-pulse font-medium">
      {message}
    </p>
    {/* Screen reader only text for better accessibility */}
    <span className="sr-only">Content is loading...</span>
  </div>
);

export default LoadingState;