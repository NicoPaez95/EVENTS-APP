import { NotificationProvider } from './user/context/NotificationContext';
import { AuthProvider } from './user/context/AuthContext';
import { EventsProvider } from './shared/context/EventsContext';
import { UserProvider } from './user/context/UserContext';
import AppRouter from './router/AppRouter';

/**
 * Root Application Component.
 * * This component serves as the definitive entry point for the React application. 
 * It establishes the "Global State Layer" by nesting specialized Domain Context Providers.
 * * Architectural Note (The Provider Stack):
 * Providers are nested based on data dependency and lifecycle priority:
 * 1. NotificationProvider: Outermost, as UI feedback must be available even if 
 * Auth or Data layers fail.
 * 2. AuthProvider: Identity layer, as user credentials dictate access to 
 * protected data.
 * 3. EventsProvider: Domain catalog available to all users (Guest or Auth).
 * 4. UserProvider: Nested here because user actions (e.g., saving an event) 
 * directly depend on the existence of the Events catalog.
 * * @component
 * @category Core
 * @returns {JSX.Element} The high-level provider tree wrapping the application router.
 */
function App() {
  return (
    /**
     * UI Feedback Layer:
     * High-level service for global toasts and alerts.
     */
    <NotificationProvider>

      {/**
       * Identity Layer:
       * Manages session status and user credentials globally.
       */}
      <AuthProvider>
      
        {/**
         * Domain Data Layer:
         * Orchestrates the global collection of events and filtering logic.
         */}
        <EventsProvider>
          
          {/**
           * User-specific Data Layer:
           * Manages bookmarks, preferences, and personal collections.
           */}
          <UserProvider>
            
            {/**
             * Routing & Navigation Layer:
             * The actual UI entry point that maps URLs to Page components.
             */}
            <AppRouter />
            
          </UserProvider>
          
        </EventsProvider>
        
      </AuthProvider>

    </NotificationProvider>
  );
}

export default App;