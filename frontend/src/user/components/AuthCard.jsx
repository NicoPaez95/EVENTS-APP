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
 *
 * @param {Object} props - Component properties.
 * @param {React.ReactNode} props.children - The dynamic content (usually a Feature form) to render inside the card.
 * @param {string} props.title - The primary heading for the card (e.g., "Welcome Back").
 * @param {string} props.subtitle - The supporting text to guide the user (e.g., "Enter details to access").
 *
 * @returns {JSX.Element} The rendered authentication card container.
 */
const AuthCard = ({ children, title, subtitle }) => (
  <div className="bg-white py-12 px-8 shadow-[0_20px_50px_rgba(0,0,0,0.05)] rounded-[40px] border border-slate-100">
    {/* Header Section: Standardizes the title and subtitle alignment */}
    <div className="mb-10 text-center">
      <h2 className="text-3xl font-black text-slate-900 mb-2">{title}</h2>
      <p className="text-slate-500 font-medium">{subtitle}</p>
    </div>

    {/* Content Slot: Where LoginFeature or RegisterFeature is injected */}
    {children}
  </div>
);

export default AuthCard;
