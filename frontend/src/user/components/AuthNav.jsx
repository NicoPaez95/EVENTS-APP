/**
 * @file AuthNav.jsx
 * @description Presentational authentication navigation manager for the application top header bar.
 * Handles display toggling between anonymous entry links and interactive authenticated user identity sessions.
 * @module components/user/AuthNav
 * @author Nico Paez
 */
import React from "react";
import { Link } from "react-router-dom";
import PrimaryButton from "shared/components/UI/PrimaryButton";
import SecondaryButton from "shared/components/UI/SecondaryButton";
import {
  getInitials,
  getAvatarColorGradient,
} from "shared/utils/avatarHelpers";

/**
 * @typedef {Object} AuthNavI18n
 * @property {string} logged - "Logged In" prefix label.
 * @property {string} logout - "Logout" action text.
 * @property {string} login - "Login" trigger text.
 * @property {string} getstarted - "Get Started" trigger text.
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
 * @param {AuthNavI18n} props.i18n - Explicit translation contract providing interface labeling.
 * @returns {JSX.Element} Structural navigation indicators.
 */
const AuthNav = ({ isAuthenticated, userName, onLogout, userAvatar, i18n }) => {
  if (isAuthenticated) {
    const initials = getInitials(userName);
    const gradientClasses = getAvatarColorGradient(userName);

    return (
      <div className="flex items-center gap-4 bg-secondary-light/40 p-1.5 pr-4 rounded-full border border-secondary-border animate-in fade-in slide-in-from-right-4 duration-300">
        {/* Interactive User Identity Anchor Link wrapper */}
        <Link
          to="/profile"
          className="flex items-center gap-3 p-0.5 rounded-full hover:bg-secondary-light/60 transition-all group active:scale-98"
          title="View profile settings"
        >
          {/* Dynamic Identity Avatar Wrapper */}
          <div className="relative shrink-0 select-none">
            {userAvatar ? (
              <img
                src={userAvatar}
                alt={`${userName || "User"} profile avatar`}
                className="w-9 h-9 rounded-full object-cover border border-secondary-border shadow-sm group-hover:border-accent-light transition-colors"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
            ) : (
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-sans font-bold tracking-wider shadow-inner bg-gradient-to-br ${gradientClasses} group-hover:scale-105 transition-transform`}
                aria-hidden="true"
              >
                {initials}
              </div>
            )}
            {/* Active Online Pulse Dot Indicator */}
            <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-success ring-2 ring-white" />
          </div>

          {/* User Identity Text Labels */}
          <div className="flex flex-col text-left">
            <span className="text-[10px] text-secondary-muted font-sans font-bold uppercase tracking-wider leading-none mb-0.5 group-hover:text-accent transition-colors">
              {i18n.logged}
            </span>
            <span className="text-xs font-sans font-bold text-primary leading-none group-hover:text-primary-hover transition-colors">
              {userName || "Demo User"}
            </span>
          </div>
        </Link>

        {/* Separator line for explicit layout visual hierarchy */}
        <div className="h-6 w-[1px] bg-secondary-border" aria-hidden="true" />

        {/* Action Logout Button */}
        <button
          onClick={onLogout}
          type="button"
          aria-label="Logout from account"
          className="bg-surface font-sans text-secondary px-3 py-1.5 rounded-full text-xs font-semibold border border-secondary-border hover:bg-danger-light hover:text-danger hover:border-danger/30 transition-all shadow-sm active:scale-95"
        >
          {i18n.logout}
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-6">
      <Link to="/login" tabIndex={-1}>
        <SecondaryButton size="sm" fullWidth={false}>
          {i18n.login}
        </SecondaryButton>
      </Link>

      <Link to="/register" tabIndex={-1}>
        <PrimaryButton size="sm" fullWidth={false}>
          {i18n.getstarted}
        </PrimaryButton>
      </Link>
    </div>
  );
};

export default AuthNav;
