import { Link } from 'react-router-dom';

/**
 * AuthNav Component (Presentational).
 * * This "Dumb Component" is strictly responsible for rendering the 
 * authentication interface in the header. It toggles between user session 
 * information and guest navigation links based on the provided props.
 * * Architectural Note:
 * It remains decoupled from AuthContext. All state (isAuthenticated, userName) 
 * and actions (onLogout) are injected by the UserAuthFeature orchestrator.
 * * @component
 * @category Components/User
 * @param {Object} props - Component properties.
 * @param {boolean} props.isAuthenticated - Current session status.
 * @param {string} [props.userName] - The name of the logged-in user.
 * @param {Function} props.onLogout - Callback to trigger the logout sequence.
 * @returns {JSX.Element} A responsive navigation fragment for identity management.
 */
const AuthNav = ({ isAuthenticated, userName, onLogout }) => {
  
  /**
   * Authenticated View:
   * Renders the user's name and a logout action button.
   */
  if (isAuthenticated) {
    return (
      <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-full border border-slate-100 animate-in fade-in slide-in-from-right-4 duration-300">
        <span className="text-sm font-medium text-slate-700 ml-2">
          Hello, {userName}
        </span>
        <button 
          onClick={onLogout}
          className="bg-white text-slate-600 px-3 py-1 rounded-full text-xs font-bold border border-slate-200 hover:bg-red-50 hover:text-red-600 hover:border-red-100 transition-all shadow-sm active:scale-95"
        >
          Logout
        </button>
      </div>
    );
  }

  /**
   * Guest View:
   * Renders entry points for Login and Registration flows.
   */
  return (
    <div className="flex items-center gap-6">
      <Link 
        to="/login" 
        className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors"
      >
        Login
      </Link>
      <Link 
        to="/register" 
        className="px-5 py-2.5 text-sm font-bold text-white bg-blue-600 rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all active:scale-95"
      >
        Get Started
      </Link>
    </div>
  );
};

export default AuthNav;