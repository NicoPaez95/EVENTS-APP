import { Link } from "react-router-dom";

/**
 * RegisterForm Component (Presentational).
 * * This "Dumb Component" is strictly responsible for rendering the registration UI.
 * It remains stateless and decoupled from business logic, receiving all necessary
 * data and event handlers via props from its parent orchestrator (RegisterFeature).
 * * **Key Features**:
 * - Multi-field validation display (Name, Email, Password).
 * - Semantic form structure for improved accessibility.
 * - Declarative navigation link to the login flow.
 * * @component
 * @category Components/User
 * @param {Object} props - Component properties.
 * @param {Object} props.values - Current values for controlled inputs (name, email, password).
 * @param {Object} props.errors - Object containing validation error messages per field.
 * @param {Function} props.onChange - Event handler for real-time input updates.
 * @param {Function} props.onSubmit - Submission handler that triggers domain logic.
 * @param {boolean} props.isLoading - UI state to disable interaction during processing.
 * @returns {JSX.Element} The rendered registration interface.
 */
const RegisterForm = ({ values, errors, onChange, onSubmit, isLoading }) => {
  return (
    <section className="animate-in fade-in zoom-in-95 duration-300">
      {/* Header Section: Encourages user conversion */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-extrabold text-slate-900 font-display">
          Create your account
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          Join the platform to start saving experiences.
        </p>
      </div>

      <div className="bg-white py-8 px-4 shadow-xl border border-slate-100 sm:rounded-2xl sm:px-10">
        <form className="space-y-6" onSubmit={onSubmit}>
          {/* Full Name Input: Primary user identification */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-slate-700"
            >
              Full Name
            </label>
            <div className="mt-1">
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                value={values.name}
                onChange={onChange}
                placeholder="Nico Paez"
                className="appearance-none block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>

          {/* Email Input: Credential setup with dynamic error styling */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-slate-700"
            >
              Email address
            </label>
            <div className="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={values.email}
                onChange={onChange}
                className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-slate-400 focus:outline-none sm:text-sm ${
                  errors.email
                    ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                    : "border-slate-300 focus:ring-blue-500 focus:border-blue-500"
                }`}
              />
            </div>
            {errors.email && (
              <p className="mt-2 text-xs text-red-600 animate-in slide-in-from-top-1">
                {errors.email}
              </p>
            )}
          </div>

          {/* Password Input: Security credential setup */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-slate-700"
            >
              Password
            </label>
            <div className="mt-1">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                value={values.password}
                onChange={onChange}
                className="appearance-none block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            {errors.password && (
              <p className="mt-2 text-xs text-red-600 animate-in slide-in-from-top-1">
                {errors.password}
              </p>
            )}
          </div>

          {/* Form Submission: Dynamic feedback button */}
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-slate-300 transition-all active:scale-95"
            >
              {isLoading ? "Creating account..." : "Create Account"}
            </button>
          </div>
        </form>

        {/* Navigation Footer: Cross-link to Login domain */}
        <div className="mt-6 text-center border-t border-slate-100 pt-6">
          <p className="text-sm text-slate-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default RegisterForm;
