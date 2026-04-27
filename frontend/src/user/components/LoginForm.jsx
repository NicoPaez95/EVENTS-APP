/**
 * LoginForm Component (Presentational).
 * * This "Dumb Component" is strictly responsible for rendering the authentication UI.
 * It remains stateless and decoupled from business logic, receiving all necessary
 * data and event handlers via props from its parent orchestrator (LoginFeature).
 * * **Key Features**:
 * - Dynamic validation styling based on error states.
 * - Integrated loading feedback (spinner) within the primary action button.
 * - Semantic HTML structure for improved accessibility (a11y).
 * * @component
 * @category Components/User
 * @param {Object} props - Component properties.
 * @param {Object} props.values - Current values for controlled inputs (email, password).
 * @param {Object} props.errors - Object containing validation error messages per field.
 * @param {Function} props.onChange - Event handler for input field updates.
 * @param {Function} props.onSubmit - Submission handler (prevents default behavior).
 * @param {boolean} props.isLoading - Controls the visual "Busy" state of the form.
 * @returns {JSX.Element} The rendered login interface.
 */
const LoginForm = ({ values, errors, onChange, onSubmit, isLoading }) => (
  <section className="animate-in fade-in zoom-in-95 duration-300">
    {/* Header Section: Contextual greeting */}
    <div className="text-center mb-8">
      <h2 className="text-3xl font-extrabold text-slate-900 font-display">
        Welcome back
      </h2>
      <p className="mt-2 text-sm text-slate-600">
        Access your personal event collection.
      </p>
    </div>

    {/* Form Core: Logic delegation via onSubmit */}
    <form
      onSubmit={onSubmit}
      className="space-y-6 max-w-md mx-auto p-8 bg-white rounded-2xl shadow-xl border border-slate-100"
    >
      {/* Email Field: Implements dynamic error highlighting */}
      <div className="space-y-1">
        <label
          htmlFor="email"
          className="block text-sm font-semibold text-slate-700"
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
          className={`w-full px-4 py-2.5 border rounded-xl transition-all outline-none focus:ring-2 focus:ring-blue-100 ${
            errors.email
              ? "border-red-300 bg-red-50 focus:border-red-500"
              : "border-slate-200 focus:border-blue-500"
          }`}
        />
        {errors.email && (
          <p className="text-red-500 text-xs mt-1 font-medium animate-in slide-in-from-top-1">
            {errors.email}
          </p>
        )}
      </div>

      {/* Password Field */}
      <div className="space-y-1">
        <label
          htmlFor="password"
          className="block text-sm font-semibold text-slate-700"
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
          className="w-full px-4 py-2.5 border border-slate-200 rounded-xl transition-all outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500"
        />
      </div>

      {/* Form Action Section: Dynamic button with loading state */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 disabled:bg-slate-300 disabled:shadow-none transition-all active:scale-[0.98] flex justify-center items-center"
        >
          {isLoading ? (
            <>
              {/* CSS-only Spinner for performance */}
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></span>
              Signing in...
            </>
          ) : (
            "Sign In"
          )}
        </button>
      </div>
    </form>
  </section>
);

export default LoginForm;
