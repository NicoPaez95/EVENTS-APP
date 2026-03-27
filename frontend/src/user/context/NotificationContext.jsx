import { createContext, useState, useMemo, useCallback } from 'react';

/**
 * @typedef {('error'|'success'|'info')} ToastType
 */

/**
 * @typedef {Object} ToastState
 * @property {string} message - The textual content of the alert.
 * @property {ToastType} type - The visual theme/severity of the notification.
 */

/**
 * @typedef {Object} NotificationContextValue
 * @property {function(string, ToastType=): void} showToast - Function to trigger a global UI notification.
 */

/**
 * Internal Notification Context.
 * * This context manages the display state of global UI toasts. 
 * It is kept internal to encourage usage via the 'useNotification' hook.
 * * @type {React.Context<NotificationContextValue|null>}
 */
export const NotificationContext = createContext(null);

/**
 * NotificationProvider Component.
 * * Acts as a centralized portal for global UI feedback. 
 * It manages a single-toast queue with automatic dismissal logic and 
 * provides a consistent visual style using Tailwind CSS.
 * * @component
 * @category Context
 * @param {Object} props - Component properties.
 * @param {import("react").ReactNode} props.children - The application tree to be wrapped.
 * @returns {JSX.Element} The NotificationProvider with the injected UI portal.
 */
export const NotificationProvider = ({ children }) => {
  /** @type {[ToastState|null, function]} */
  const [toast, setToast] = useState(null);

  /**
   * Triggers a new toast notification.
   * * It updates the state to show the UI and sets a timer to 
   * automatically clear the message after 4 seconds.
   * * @param {string} message - The message to display.
   * @param {ToastType} [type='error'] - The notification style (defaults to 'error').
   */
  const showToast = useCallback((message, type = 'error') => {
    setToast({ message, type });
    
    // Auto-dismissal timer
    setTimeout(() => {
      setToast(null);
    }, 4000);
  }, []);

  /**
   * Memoized Context Value:
   * Prevents unnecessary re-renders of the provider's children 
   * by maintaining a stable function reference for showToast.
   */
  const value = useMemo(() => ({ showToast }), [showToast]);

  return (
    <NotificationContext.Provider value={value}>
      {children}
      
      {/* Toast UI Portal - Strategically placed at the end of the provider */}
      {toast && (
        <div 
          role="alert"
          aria-live="polite"
          className={`fixed bottom-6 right-6 z-[100] flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl border animate-in fade-in slide-in-from-bottom-10 duration-500 ${
            toast.type === 'error' 
              ? 'bg-red-50 border-red-100 text-red-800' 
              : 'bg-emerald-50 border-emerald-100 text-emerald-800'
          }`}
        >
          {/* Status Indicator Dot */}
          <div className={`w-2.5 h-2.5 rounded-full animate-pulse ${
            toast.type === 'error' ? 'bg-red-500' : 'bg-emerald-500'
          }`} />
          
          <p className="text-sm font-bold tracking-tight">
            {toast.message}
          </p>

          <button 
            onClick={() => setToast(null)} 
            className="ml-4 p-1 rounded-md opacity-30 hover:opacity-100 hover:bg-black/5 transition-all"
            aria-label="Close notification"
          >
            ✕
          </button>
        </div>
      )}
    </NotificationContext.Provider>
  );
};