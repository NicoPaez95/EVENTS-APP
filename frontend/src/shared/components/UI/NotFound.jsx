import { Link } from "react-router-dom";

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
  return (
    <div
      className="text-center py-20 px-4 animate-in fade-in duration-500"
      role="alert"
    >
      {/* Visual Header */}
      <h2 className="text-2xl font-bold text-slate-800 font-display">
        {title}
      </h2>

      {/* Contextual Description */}
      <p className="text-slate-500 mt-2">{message}</p>

      {/* Recovery Action: Declarative Link */}
      <Link
        to={link}
        className="inline-block mt-8 px-6 py-2 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors shadow-lg active:scale-95"
      >
        &larr; {linkText}
      </Link>
    </div>
  );
};

export default NotFound;
