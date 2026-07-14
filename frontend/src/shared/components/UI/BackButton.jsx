/**
 * @file BackButton.jsx
 * @description Reusable atomic navigation button.
 * Standardizes backward routing and history-pop behaviors within the shared UI layer.
 * @module shared/components/UI/BackButton
 * @author Nico Paez
 */

import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

/**
 * BackButton Component.
 *
 * A reusable navigation trigger designed to handle "Go Back" functionality
 * throughout the application. It encapsulates the routing logic required to
 * return to a previous state or a specific fallback path.
 *
 * @component
 * @category Components/Shared/UI
 *
 * @param {Object} props - Component properties.
 * @param {string} [props.label="BACK TO EXPLORATION"] - The text displayed next to the icon.
 * @param {string} [props.to] - Specific path to navigate to. If omitted,
 * defaults to the browser's history back (-1).
 *
 * @returns {React.JSX.Element} A stylized and interactive navigation button.
 */
const BackButton = ({ label = "BACK TO EXPLORATION", to }) => {
  const navigate = useNavigate();

  /**
   * Navigation Orchestrator:
   * Decides whether to pop the history stack or push a specific route.
   */
  const handleBack = () => {
    if (to) {
      navigate(to);
    } else {
      navigate(-1);
    }
  };

  return (
    <button
      onClick={handleBack}
      className="text-secondary hover:text-primary focus:text-primary focus:outline-none flex items-center gap-2 font-bold text-sm transition-colors group"
      aria-label={label}
    >
      {/* Visual Indicator: Animates on parent hover */}
      <span
        className="text-xl group-hover:-translate-x-1 transition-transform"
        aria-hidden="true"
      >
        &larr;
      </span>

      {/* Label: Standardized uppercase typography for UI actions */}
      <span className="uppercase tracking-wide">{label}</span>
    </button>
  );
};
BackButton.propTypes = {
  label: PropTypes.string,
  to: PropTypes.string,
};

export default BackButton;
