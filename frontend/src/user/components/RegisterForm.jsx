/**
 * RegisterForm Component (Presentational).
 *
 * This "Dumb" component handles the user interface for the registration flow.
 * It is strictly presentational, delegating all state transitions, validation
 * logic, and API interactions to its parent feature orchestrator.
 *
 * Architectural Strategy:
 * - Decoupled UI: Stripped of external margins and card containers to ensure
 *   perfect integration within the `AuthCard` layout component.
 * - Controlled Inputs: Implements a strict data-binding pattern where all
 *   values and change events are managed via props.
 * - Feedback States: Provides visual cues for validation errors and handles
 *   the submission button's interactive state during the loading lifecycle.
 *
 * @component
 * @category Components/User
 *
 * @param {Object} props - Component properties.
 * @param {Object} props.values - Current state values for the registration fields (name, email, password).
 * @param {Object} props.errors - Object containing validation messages for specific fields.
 * @param {Function} props.onChange - Event handler for updating form state on input change.
 * @param {Function} props.onSubmit - Submission handler for the registration process.
 * @param {boolean} props.isLoading - Flag to indicate an active request; disables interaction and updates button text.
 *
 * @returns {JSX.Element} The rendered registration form.
 */
const RegisterForm = ({ values, errors, onChange, onSubmit, isLoading }) => {
  return (
    <form
      className="space-y-5 animate-in fade-in duration-500"
      onSubmit={onSubmit}
    >
      {/* Name Identification Group */}
      <div className="space-y-2">
        <label
          htmlFor="name"
          className="block text-sm font-bold text-slate-700 ml-1"
        >
          Full Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={values.name}
          onChange={onChange}
          placeholder="Nico Paez"
          className="w-full px-4 py-3 border border-slate-200 rounded-2xl transition-all outline-none focus:ring-4 focus:ring-blue-50 focus:border-blue-500"
        />
      </div>

      {/* Identity Group: Email validation display */}
      <div className="space-y-2">
        <label
          htmlFor="email"
          className="block text-sm font-bold text-slate-700 ml-1"
        >
          Email address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={values.email}
          onChange={onChange}
          className={`w-full px-4 py-3 border rounded-2xl transition-all outline-none focus:ring-4 focus:ring-blue-50 ${
            errors.email
              ? "border-red-300 focus:border-red-500"
              : "border-slate-200 focus:border-blue-500"
          }`}
        />
        {errors.email && (
          <p className="mt-1 text-xs text-red-600 font-medium ml-1">
            {errors.email}
          </p>
        )}
      </div>

      {/* Security Group: Password credentials */}
      <div className="space-y-2">
        <label
          htmlFor="password"
          className="block text-sm font-bold text-slate-700 ml-1"
        >
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          value={values.password}
          onChange={onChange}
          className="w-full px-4 py-3 border border-slate-200 rounded-2xl transition-all outline-none focus:ring-4 focus:ring-blue-50 focus:border-blue-500"
        />
      </div>

      {/* Submission Layer: Responsive to loading state */}
      <div className="pt-4">
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black shadow-xl shadow-blue-100 hover:bg-blue-700 hover:-translate-y-0.5 transition-all active:scale-95 disabled:bg-slate-300"
        >
          {isLoading ? "CREATING ACCOUNT..." : "CREATE FREE ACCOUNT"}
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;
