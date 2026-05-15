import { Link } from "react-router-dom";
import PrimaryButton from "shared/components/UI/PrimaryButton";

/**
 * AuthNav Component (Presentational).
 */
const AuthNav = ({ isAuthenticated, userName, onLogout }) => {
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

  return (
    <div className="flex items-center gap-6">
      <Link
        to="/login"
        className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors"
      >
        Login
      </Link>

      {/* 
          Mantenemos la responsabilidad: Link maneja la navegación, 
          PrimaryButton maneja la estética y el estado visual.
      */}
      <Link to="/register">
        <PrimaryButton size="sm" fullWidth={false}>
          Get Started
        </PrimaryButton>
      </Link>
    </div>
  );
};

export default AuthNav;
