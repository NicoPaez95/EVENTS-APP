/**
 * LoginForm Component (Presentational).
 * * This "Dumb Component" is responsible for rendering the authentication UI.
 * It remains decoupled from business logic, receiving its state and 
 * handlers via props from the LoginFeature orchestrator.
 * * @component
 * @category Components/User
 * @param {Object} props - Component properties.
 * @param {Object} props.values - Current form field values (email, password).
 * @param {Object} props.errors - Validation error messages.
 * @param {Function} props.onChange - Input change event handler.
 * @param {Function} props.onSubmit - Form submission handler.
 * @param {boolean} props.isLoading - UI state for the submit button.
 * @returns {JSX.Element} The rendered login form.
 */
const LoginForm = ({ values, errors, onChange, onSubmit, isLoading }) => (
  <form 
    onSubmit={onSubmit} 
    className="space-y-6 max-w-md mx-auto p-8 bg-white rounded-2xl shadow-xl border border-slate-100 animate-in fade-in zoom-in-95 duration-300"
  >
    {/* Email Field Area */}
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
        className={`w-full px-4 py-2.5 border rounded-xl transition-all outline-none focus:ring-2 focus:ring-blue-100 ${
          errors.email 
            ? 'border-red-300 bg-red-50 focus:border-red-500' 
            : 'border-slate-200 focus:border-blue-500'
        }`}
      />
      {errors.email && (
        <p className="text-red-500 text-xs mt-1 font-medium animate-in slide-in-from-top-1">
          {errors.email}
        </p>
      )}
    </div>
    
    {/* Password Field Area */}
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
        className="w-full px-4 py-2.5 border border-slate-200 rounded-xl transition-all outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500"
      />
    </div>

    {/* Form Action Section */}
    <div className="pt-2">
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 disabled:bg-slate-300 disabled:shadow-none transition-all active:scale-[0.98] flex justify-center items-center"
      >
        {isLoading ? (
          <>
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></span>
            Signing in...
          </>
        ) : (
          'Sign In'
        )}
      </button>
    </div>
  </form>
);

export default LoginForm;