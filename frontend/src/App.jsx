import { EventsProvider } from './shared/context/EventsContext';
import AppRouter from './router/AppRouter';

/**
 * Root Application Component.
 * * The entry point of the React application. It establishes the 
 * high-level architectural hierarchy by wrapping the entire routing 
 * system with the necessary global state providers.
 * * This ensures that every route managed by AppRouter (Home, EventDetails, etc.) 
 * has immediate access to the EventsContext via the useEvents hook.
 * * @component
 * @category Core
 * @returns {JSX.Element} The foundational component tree of the Events App.
 */
function App() {
  return (
    <EventsProvider>
      {/* Domain Providers:
          Centralizes the state for the &quot;Events&quot; domain. 
          Any future providers (e.g., AuthProvider, UserProvider) 
          should be stacked here to maintain a clean root structure.
      */}

      <AppRouter />
      
      {/* Navigation Layer:
          Handles the client-side routing and page transitions.
      */}
    </EventsProvider>
  );
}

export default App;