import { useNavigate } from "react-router-dom";

/**
 * BackButton Component (Shared UI Atomic).
 *
 * A reusable navigation trigger designed to handle "Go Back" functionality
 * throughout the application. It encapsulates the routing logic required to
 * return to a previous state or a specific fallback path.
 *
 * Architectural Strategy:
 * - Utility-First: Instead of re-writing `useNavigate` logic in every page,
 *   this component provides a standardized interface for backward navigation.
 * - Intent-Based Navigation: Supports both history-pop (going back one step)
 *   and explicit redirection (navigating to a defined route).
 * - High-Contrast Feedback: Includes micro-animations (hover transitions)
 *   to improve user affordance and follow the app's visual language.
 *
 * @component
 * @category Components/Shared/UI
 *
 * @param {Object} props - Component properties.
 * @param {string} [props.label="BACK TO EXPLORATION"] - The text displayed next to the icon.
 * @param {string} [props.to] - Specific path to navigate to. If omitted,
 *                              defaults to the browser's history back (-1).
 *
 * @returns {JSX.Element} A stylized and interactive navigation button.
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
      className="text-slate-500 hover:text-blue-600 flex items-center gap-2 font-bold text-sm transition-colors group"
      aria-label={label}
    >
      {/* Visual Indicator: Animates on parent hover */}
      <span
        className="text-xl group-hover:-translate-x-1 transition-transform"
        aria-hidden="true"
      >
        ←
      </span>

      {/* Label: Standardized uppercase typography for UI actions */}
      <span className="uppercase tracking-wide">{label}</span>
    </button>
  );
};

export default BackButton;
