/**
 * @file UserProfileCard.jsx
 * @description Presentational component focused on displaying personal user information within an accessible card structure.
 * @module components/user/UserProfileCard
 * @author Nico Paez
 */

import React from "react";
import PropTypes from "prop-types";
import {
  getInitials,
  getAvatarColorGradient,
} from "shared/utils/avatarHelpers";

/**
 * @typedef {Object} UserProfileCardI18n
 * @property {string} title - Section header naming anchor.
 * @property {string} description - Explanatory localized secondary contextual description.
 * @property {string} fullName - Title uppercase label for the identity entry name.
 * @property {string} email - Title uppercase label for the primary communication address field.
 * @property {string} activeAccount - Inner text badge flag defining dynamic active authentication states.
 */

/**
 * UserProfileCard Component (Presentational).
 *
 * A stateless "Dumb Component" dedicated to rendering user information within
 * a structured and accessible card layout.
 *
 * Design Principles:
 * - Semantic HTML: Uses `<article>` and `<section>` to define content relationships.
 * - Visual Hierarchy: Employs varied typography and tracking to distinguish labels from data.
 * - Motion Design: Includes entry animations for a smoother user experience.
 *
 * @component
 * @category Components/User
 * @param {Object} props - Component properties.
 * @param {Object} props.user - The user data object retrieved from context or API.
 * @param {string} props.user.name - The full name of the user.
 * @param {string} props.user.email - The primary contact email.
 * @param {string} [props.user.avatarUrl] - Optional cloud URL path mapping uploaded user images.
 * @param {UserProfileCardI18n} props.i18n - Explicit translation contract providing interface labeling.
 * @returns {React.JSX.Element|null} The profile information card or null if user data is missing.
 */
const UserProfileCard = ({ user, i18n }) => {
  // Defensive Guard: Ensures the UI doesn't break if data is still being processed
  if (!user) return null;
  const initials = getInitials(user.name);
  const gradientClasses = getAvatarColorGradient(user.name);

  return (
    <section
      className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 animate-in fade-in slide-in-from-bottom-2 duration-500"
      aria-labelledby="profile-title"
    >
      <h1
        id="profile-title"
        className="text-3xl font-bold text-slate-900 mb-6 font-display"
      >
        {i18n.title}
      </h1>

      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-5 mb-8 pb-6 border-b border-slate-50">
          <div className="relative select-none shrink-0">
            {user.avatarUrl ? (
              <img
                src={user.avatarUrl}
                alt={user.name}
                className="w-16 h-16 rounded-2xl object-cover border border-slate-100 shadow-sm"
              />
            ) : (
              <div
                className={`w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-black tracking-wider bg-gradient-to-br shadow-inner ${gradientClasses}`}
              >
                {initials}
              </div>
            )}
          </div>
          <div>
            <h1
              id="profile-title"
              className="text-2xl font-black text-slate-900 tracking-tight font-display"
            >
              {i18n.title}
            </h1>
            <p className="text-sm text-slate-400 font-medium mt-0.5">
              {i18n.description}
            </p>
          </div>
        </div>

        {/* Data Grid: Optimized for responsive scanning */}
        <article className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-8">
          <div>
            <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">
              {i18n.fullName}
            </p>
            <p className="mt-1 text-lg text-slate-900 font-medium">
              {user.name}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">
              {i18n.email}
            </p>
            <p className="mt-1 text-lg text-slate-900">{user.email}</p>
          </div>
        </article>

        {/* Status Indicator Area */}
        <div className="pt-6 border-t border-slate-50">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            {/* Visual indicator of account validity */}
            <span className="w-2 h-2 mr-2 bg-green-500 rounded-full"></span>
            {i18n.activeAccount}
          </span>
        </div>
      </div>
    </section>
  );
};

UserProfileCard.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    avatarUrl: PropTypes.string,
  }),
  i18n: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    fullName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    activeAccount: PropTypes.string.isRequired,
  }).isRequired,
};

export default UserProfileCard;
