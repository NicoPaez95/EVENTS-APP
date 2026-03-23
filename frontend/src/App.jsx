import { EventsProvider } from './shared/context/EventsContext';
import { UserProvider } from './user/context/UserContext';
import AppRouter from './router/AppRouter';

/**
 * Root Application Component.
 * * This component serves as the entry point of the React application. 
 * It establishes the Global State Layer by nesting Domain Context Providers.
 * * Architectural Note: 
 * Providers are stacked based on data dependency. Since User actions (like saving events) 
 * might eventually depend on the global Events list, UserProvider is nested within EventsProvider.
 * * @component
 * @category Core
 * @returns {JSX.Element} The high-level provider tree and application router.
 */
function App() {
  return (
    <EventsProvider>
      <UserProvider>
        
        {/* Main Application Routing Logic */}
        <AppRouter />
        
      </UserProvider>
    </EventsProvider>
  );
}

export default App;