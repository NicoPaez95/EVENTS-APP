/**
 * LoginForm Component (Presentational).
 *
 * This "Dumb" component is strictly responsible for rendering the login form
 * fields and handling visual validation states. It does not contain any
 * business logic, API calls, or state management.
 *
 * Architectural Strategy:
 * - Layout Delegation: Following the Domain-Driven Design refactor, this
 *   component removed its own containers (bg, shadow, borders) to be
 *   perfectly hosted inside a parent `AuthCard`.
 * - Controlled Inputs: Relies entirely on props for value binding and
 *   event handling, making it highly testable and predictable.
 * - Reactive UI: Implements conditional styling based on the presence of
 *   validation errors and loading states.
 *
 * @component
 * @category Components/User/UI
 *
 * @param {Object} props - Component properties.
 * @param {Object} props.values - The current state of the form fields (email, password).
 * @param {Object} props.errors - Validation error messages mapped by field name.
 * @param {Function} props.onChange - Input change handler to update the parent state.
 * @param {Function} props.onSubmit - Form submission handler.
 * @param {boolean} props.isLoading - UI state flag to toggle button animations and disable inputs.
 *
 * @returns {JSX.Element} The rendered login form fields and action button.
 */
const LoginForm = ({ values, errors, onChange, onSubmit, isLoading }) => (
  <form
    onSubmit={onSubmit}
    className="space-y-6 animate-in fade-in duration-500"
  >
    {/* Email Field Group: Manages focus and error visualization */}
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

    {/* Password Field Group */}
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
        className="w-full px-4 py-3 border border-slate-200 rounded-2xl transition-all outline-none focus:ring-4 focus:ring-blue-50 focus:border-blue-500"
      />
    </div>

    {/* Form Action Section: Handles the loading state transition */}
    <div className="pt-4">
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black shadow-xl shadow-blue-100 hover:bg-blue-700 hover:-translate-y-0.5 disabled:bg-slate-300 disabled:shadow-none transition-all active:scale-[0.98] flex justify-center items-center"
      >
        {isLoading ? (
          <>
            <span className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin mr-3"></span>
            SIGNING IN...
          </>
        ) : (
          "SIGN IN TO ACCOUNT"
        )}
      </button>
    </div>
  </form>
);

export default LoginForm;
