import HomeLayout from '../../shared/components/Layout/HomeLayout';
import { useAuth } from '../../user/hooks/useAuth';

/**
 * User Profile Page Component.
 * * This component renders the private profile view for authenticated users.
 * It leverages the 'HomeLayout' to maintain UI consistency across the platform 
 * and consumes the 'AuthContext' to display personalized user data.
 * * Architectural Note:
 * This page acts as a "Consumer Layer." It relies on the useAuth hook to 
 * retrieve the current session state. In a production environment, this 
 * page should be wrapped by a ProtectedRoute to prevent unauthorized access.
 * * @component
 * @category Pages
 * @returns {JSX.Element} The rendered Profile page with user-specific information.
 */
const Profile = () => {
  /**
   * Data Consumption:
   * Extracts the current user object from the global AuthContext.
   */
  const { user } = useAuth();

  /**
   * Conditional Rendering:
   * Fallback UI in case the user data is still being resolved or 
   * the component is rendered without a valid session.
   */
  if (!user) {
    return (
      <HomeLayout>
        <div className="animate-pulse bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
          <div className="h-8 bg-slate-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-slate-100 rounded w-1/2"></div>
            <div className="h-4 bg-slate-100 rounded w-1/3"></div>
          </div>
        </div>
      </HomeLayout>
    );
  }

  return (
    <HomeLayout>
      <section 
        className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 animate-in fade-in slide-in-from-bottom-2 duration-500"
        aria-labelledby="profile-title"
      >
        <h1 
          id="profile-title" 
          className="text-3xl font-bold text-slate-900 mb-6 font-display"
        >
          User Profile
        </h1>
        
        <div className="space-y-6">
          {/* User Information Grid */}
          <article className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-8">
            <div>
              <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">
                Full Name
              </p>
              <p className="mt-1 text-lg text-slate-900 font-medium">
                {user.name}
              </p>
            </div>
            
            <div>
              <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">
                Email Address
              </p>
              <p className="mt-1 text-lg text-slate-900">
                {user.email}
              </p>
            </div>
          </article>

          {/* Account Status Badge (Optional/Static for now) */}
          <div className="pt-6 border-t border-slate-50">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
              Active Account
            </span>
          </div>
        </div>
      </section>
    </HomeLayout>
  );
};

export default Profile;