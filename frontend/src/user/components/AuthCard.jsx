/**
 * @file AuthCard.jsx
 * @description Presentational component for displaying the authentication layout container.
 * @module user/components/AuthCard
 * @author Nico Paez
 */

import React from "react";
import PropTypes from "prop-types";

/**
 * @typedef {Object} AuthCardProps
 * @property {React.ReactNode} children - The dynamic content (usually a feature form) to render inside the card.
 * @property {string} title - The primary heading for the card (e.g., "Welcome Back").
 * @property {string} [subtitle=""] - The supporting text to guide the user (e.g., "Enter details to access").
 */

/**
 * AuthCard Component (Presentational).
 *
 * This component serves as a specialized structural container for the Authentication domain.
 * It encapsulates the high-level visual identity (shadows, borders, typography) of the
 * auth forms, ensuring a consistent "stage" for Login and Registration features.
 *
 * Architectural Strategy:
 * - Specialized Layout: Unlike a generic 'Card', this is a Domain UI component
 *   tailored for the Auth flow, removing styling logic from the Auth Page.
 * - Slot Pattern: Utilizes `children` to inject dynamic features (LoginForm, RegisterForm)
 *   into a standardized visual wrapper.
 * - Clean Page Pattern: Allows the Auth Page to remain declarative by delegating
 *   the visual burden of the "Form Container" to this component.
 *
 * @component
 * @category Components/User
 * @param {AuthCardProps} props - Component property payloads.
 * @returns {React.JSX.Element} The structural authentication card container markup root tree.
 */
const AuthCard = ({ children, title, subtitle = "" }) => {
  return (
    <div className="bg-surface py-12 px-8 shadow-[0_20px_50px_rgba(0,0,0,0.05)] rounded-[40px] border border-secondary-border">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-black text-primary mb-2 font-display tracking-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="text-secondary-subtitle font-medium font-sans">
            {subtitle}
          </p>
        )}
      </div>
      {children}
    </div>
  );
};

AuthCard.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
};

// Declared explicitly to sustain architecture uniformity with the atomic design ecosystem
AuthCard.defaultProps = {
  subtitle: "",
};

export default AuthCard;
