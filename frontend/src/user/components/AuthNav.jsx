import React from "react";
import { Link } from "react-router-dom";
import PrimaryButton from "shared/components/UI/PrimaryButton";
import {
  getInitials,
  getAvatarColorGradient,
} from "shared/utils/avatarHelpers";

/**
 * @file AuthNav.jsx
 * @description Presentational authentication navigation manager for the application top header bar.
 * Handles display toggling between anonymous entry links and interactive authenticated user identity sessions.
 * @module components/user/AuthNav
 * @author Nico Paez
 */

/**
 * AuthNav Component (Presentational).
 * Renders high-fidelity interactive user sessions or authentication entry points.
 *
 * @component
 * @category Components/User
 * @param {Object} props - Functional presentation properties.
 * @param {boolean} props.isAuthenticated - Core flag indicating active authorization state.
 * @param {string} [props.userName] - Display name identifier string.
 * @param {string} [props.userAvatar] - Optional resource locator string for the user profile image.
 * @param {Function} props.onLogout - Callback trigger to finalize termination of the session lifecycle.
 * @returns {JSX.Element} Structural navigation indicators.
 */
const AuthNav = ({ isAuthenticated, userName, onLogout, userAvatar }) => {
  if (isAuthenticated) {
    const initials = getInitials(userName);
    const gradientClasses = getAvatarColorGradient(userName);

    return (
      <div className="flex items-center gap-4 bg-slate-50 p-1.5 pr-4 rounded-full border border-slate-100 animate-in fade-in slide-in-from-right-4 duration-300">
        {/* Interactive User Identity Anchor Link wrapper */}
        <Link
          to="/profile"
          className="flex items-center gap-3 p-0.5 rounded-full hover:bg-slate-200/50 transition-all group active:scale-98"
          title="View profile settings"
        >
          {/* Dynamic Identity Avatar Wrapper */}
          <div className="relative shrink-0 select-none">
            {userAvatar ? (
              <img
                src={userAvatar}
                alt={`${userName || "User"} profile avatar`}
                className="w-9 h-9 rounded-full object-cover border border-slate-200/60 shadow-sm group-hover:border-blue-400 transition-colors"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
            ) : (
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold tracking-wider shadow-inner bg-gradient-to-br ${gradientClasses} group-hover:scale-105 transition-transform`}
                aria-hidden="true"
              >
                {initials}
              </div>
            )}
            {/* Active Online Pulse Dot Indicator */}
            <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
          </div>

          {/* User Identity Text Labels */}
          <div className="flex flex-col text-left">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider leading-none mb-0.5 group-hover:text-blue-500 transition-colors">
              Logged In
            </span>
            <span className="text-xs font-black text-slate-700 leading-none group-hover:text-slate-900 transition-colors">
              {userName || "Demo User"}
            </span>
          </div>
        </Link>

        {/* Separator line for explicit layout visual hierarchy */}
        <div className="h-6 w-[1px] bg-slate-200" aria-hidden="true" />

        {/* Action Logout Button */}
        <button
          onClick={onLogout}
          type="button"
          aria-label="Logout from account"
          className="bg-white text-slate-500 px-3 py-1.5 rounded-full text-xs font-bold border border-slate-200 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-100 transition-all shadow-sm active:scale-95"
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

      <Link to="/register" tabIndex={-1}>
        <PrimaryButton size="sm" fullWidth={false}>
          Get Started
        </PrimaryButton>
      </Link>
    </div>
  );
};

export default AuthNav;
