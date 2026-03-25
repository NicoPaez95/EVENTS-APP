import { Link } from 'react-router-dom';

/**
 * RegisterForm Component (Presentational).
 * * This "Dumb Component" is responsible for rendering the registration UI.
 * It remains decoupled from business logic, receiving its state and 
 * handlers via props from the RegisterFeature orchestrator.
 * * @component
 * @category Components/User
 * @param {Object} props - Component properties.
 * @param {Object} props.values - Current form field values (name, email, password).
 * @param {Object} props.errors - Validation error messages.
 * @param {Function} props.onChange - Input change event handler.
 * @param {Function} props.onSubmit - Form submission handler.
 * @param {boolean} props.isLoading - UI state for the submit button.
 * @returns {JSX.Element} The rendered registration form.
 */
const RegisterForm = ({ values, errors, onChange, onSubmit, isLoading }) => {
  return (
    <div className="bg-white py-8 px-4 shadow-xl border border-slate-100 sm:rounded-2xl sm:px-10">
      <form className="space-y-6" onSubmit={onSubmit}>
        
        {/* Full Name Input */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-700">
            Full Name
          </label>
          <div className="mt-1">
            <input
              id="name"
              name="name"
              type="text"
              required
              value={values.name}
              onChange={onChange}
              placeholder="Nico Paez"
              className="appearance-none block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </div>

        {/* Email Input */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-700">
            Email address
          </label>
          <div className="mt-1">
            <input
              id="email"
              name="email"
              type="email"
              required
              value={values.email}
              onChange={onChange}
              className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-slate-400 focus:outline-none sm:text-sm ${
                errors.email ? 'border-red-300 focus:ring-red-500' : 'border-slate-300 focus:ring-blue-500'
              }`}
            />
          </div>
          {errors.email && <p className="mt-2 text-xs text-red-600">{errors.email}</p>}
        </div>

        {/* Password Input */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-slate-700">
            Password
          </label>
          <div className="mt-1">
            <input
              id="password"
              name="password"
              type="password"
              required
              value={values.password}
              onChange={onChange}
              className="appearance-none block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          {errors.password && <p className="mt-2 text-xs text-red-600">{errors.password}</p>}
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-slate-300 transition-all active:scale-95"
          >
            {isLoading ? 'Creating account...' : 'Create Account'}
          </button>
        </div>
      </form>

      {/* Footer Link */}
      <div className="mt-6 text-center">
        <p className="text-sm text-slate-600">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;