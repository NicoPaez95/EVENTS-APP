import PrimaryButton from "shared/components/UI/PrimaryButton";

/**
 * LoginForm Component (Presentational).
 *
 * This "Dumb" component is strictly responsible for rendering the login form
 * fields and handling visual validation states. It does not contain any
 * business logic, API calls, or state management, following the
 * Presentational/Container pattern.
 *
 * Architectural Strategy:
 * - Layout Delegation: Removed internal containers to be hosted inside a parent
 *   AuthCard, allowing for modular UI composition.
 * - Atomic Integration: Utilizes the shared PrimaryButton to standardize
 *   action triggers and loading states across the application.
 * - Reactive Validation: Dynamically applies error styling and ARIA-friendly
 *   error messages based on the props received.
 *
 * @component
 * @category Components/User
 *
 * @param {Object} props - Component properties.
 * @param {Object} props.values - The current state of the form fields (email, password).
 * @param {Object} props.errors - Validation error messages mapped by field name.
 * @param {Function} props.onChange - Input change handler to update the parent state.
 * @param {Function} props.onSubmit - Form submission handler.
 * @param {boolean} props.isLoading - UI state flag to toggle button animations and disable interaction.
 *
 * @returns {JSX.Element} The rendered login form fields and action button.
 */
const LoginForm = ({ values, errors, onChange, onSubmit, isLoading }) => (
  <form
    onSubmit={onSubmit}
    className="space-y-6 animate-in fade-in duration-500"
    noValidate
  >
    {/* Email Field Group: Manages focus and validation visualization */}
    <div className="space-y-2">
      <label
        htmlFor="email"
        className="block text-sm font-bold text-slate-700 ml-1"
      >
        Email Address
      </label>
      <input
        id="email"
        type="email"
        name="email"
        placeholder="your@email.com"
        value={values.email}
        onChange={onChange}
        autoComplete="email"
        disabled={isLoading}
        className={`w-full px-4 py-3 border rounded-2xl transition-all outline-none focus:ring-4 focus:ring-blue-50 ${
          errors.email
            ? "border-red-300 bg-red-50 focus:border-red-500"
            : "border-slate-200 focus:border-blue-500"
        }`}
      />
      {errors.email && (
        <p className="text-red-500 text-xs mt-1 font-medium ml-1 animate-in slide-in-from-top-1">
          {errors.email}
        </p>
      )}
    </div>

    {/* Password Field Group: Security credential input */}
    <div className="space-y-2">
      <label
        htmlFor="password"
        className="block text-sm font-bold text-slate-700 ml-1"
      >
        Password
      </label>
      <input
        id="password"
        type="password"
        name="password"
        placeholder="••••••••"
        value={values.password}
        onChange={onChange}
        autoComplete="current-password"
        disabled={isLoading}
        className="w-full px-4 py-3 border border-slate-200 rounded-2xl transition-all outline-none focus:ring-4 focus:ring-blue-50 focus:border-blue-500"
      />
    </div>

    {/* Form Action Section: Standardized via PrimaryButton */}
    <div className="pt-4">
      <PrimaryButton
        type="submit"
        isLoading={isLoading}
        loadingText="SIGNING IN..."
      >
        SIGN IN TO ACCOUNT
      </PrimaryButton>
    </div>
  </form>
);

export default LoginForm;
