/**
 * @file NotFound.jsx
 * @description Reusable atomic fallback component. Standardizes displaying status messages.
 * @module shared/components/UI/NotFound
 * @author Nico Paez
 */
import { useNavigate } from "react-router-dom";
import PrimaryButton from "./PrimaryButton";

/**
 * NotFound Component (Atomic UI).
 *
 * A versatile presentational component used to display "Empty" or "Error" states
 * when a resource (event, page, or user data) is missing. It provides a
 * clear call-to-action (CTA) to redirect the user back to a safe route.
 *
 * **Design Features**:
 * - Fully customizable titles and messages for contextual error handling.
 * - Smooth entrance animations via Tailwind CSS.
 * - Interactive CTA with hover and active state feedback.
 *
 * @component
 * @category Shared/UI
 * @param {Object} props - Component properties.
 * @param {string} [props.title="Not Found"] - The prominent error heading.
 * @param {string} [props.message="The resource you are looking for does not exist."] - Detailed explanation.
 * @param {string} [props.link="/"] - The destination path for the recovery button.
 * @param {string} [props.linkText="Back to Home"] - The label for the recovery button.
 * @returns {JSX.Element} A centered layout for error/fallback states.
 */
const NotFound = ({
  title = "Not Found",
  message = "The resource you are looking for does not exist.",
  link = "/",
  linkText = "Back to Home",
}) => {
  const navigate = useNavigate();
  return (
    <div
      className="flex flex-col items-center justify-center min-h-[65vh] text-center px-4 animate-in fade-in duration-500"
      role="alert"
    >
      {/*Visual Indicator*/}
      <div className="mb-6 text-secondary-muted/30 transform hover:scale-105 transition-transform duration-300 select-none">
        <svg
          className="w-32 h-32 lg:w-36 lg:h-36 text-secondary-muted"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"
          />
        </svg>
      </div>
      {/**Text Group Container */}
      <div className="max-w-lg space-y-4">
        <h2 className="text-3xl lg:text-4xl font-bold text-primary font-display tracking-tight">
          {title}
        </h2>
        <p className="text-lg  text-secondary leading-relaxed">{message}</p>
      </div>
      {/* Recovery Action Container */}
      <div className="mt-5 w-full max-w-sm">
        <PrimaryButton
          type="button"
          size="lg"
          fullWidth={true}
          onClick={() => navigate(link)}
        >
          &larr; {linkText}
        </PrimaryButton>
      </div>
    </div>
  );
};

export default NotFound;
