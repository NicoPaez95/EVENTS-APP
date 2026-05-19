/**
 * UserProfileCard Component (Presentational).
 * * A stateless "Dumb Component" dedicated to rendering user information within
 * a structured and accessible card layout.
 * * **Design Principles**:
 * - **Semantic HTML**: Uses `<article>` and `<section>` to define content relationships.
 * - **Visual Hierarchy**: Employs varied typography and tracking to distinguish labels from data.
 * - **Motion Design**: Includes entry animations for a smoother user experience.
 * * @component
 * @category Components/User
 * @param {Object} props - Component properties.
 * @param {Object} props.user - The user data object retrieved from context or API.
 * @param {string} props.user.name - The full name of the user.
 * @param {string} props.user.email - The primary contact email.
 * @returns {JSX.Element|null} The profile information card or null if user data is missing.
 */
import {
  getInitials,
  getAvatarColorGradient,
} from "shared/utils/avatarHelpers";
const UserProfileCard = ({ user }) => {
  // Defensive Guard: Ensures the UI doesn't break if data is still being processed
  if (!user) return null;
  const initials = getInitials(user.name);
  const gradientClasses = getAvatarColorGradient(user.name);

  return (
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
        <div className="flex flex-col sm:flex-row sm:items-center gap-5 mb-8 pb-6 border-b border-slate-50">
          <div className="relative select-none shrink-0">
            {user.avatarUrl ? (
              <img
                src={user.avatarUrl}
                alt={user.name}
                className="w-16 h-16 rounded-2xl object-cover border border-slate-100 shadow-sm"
              />
            ) : (
              <div
                className={`w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-black tracking-wider bg-gradient-to-br shadow-inner ${gradientClasses}`}
              >
                {initials}
              </div>
            )}
          </div>
          <div>
            <h1
              id="profile-title"
              className="text-2xl font-black text-slate-900 tracking-tight font-display"
            >
              User Profile
            </h1>
            <p className="text-sm text-slate-400 font-medium mt-0.5">
              Manage your account details and personal credentials
            </p>
          </div>
        </div>
        {/* Data Grid: Optimized for responsive scanning */}
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
            <p className="mt-1 text-lg text-slate-900">{user.email}</p>
          </div>
        </article>

        {/* Status Indicator Area */}
        <div className="pt-6 border-t border-slate-50">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            {/* Visual indicator of account validity */}
            <span className="w-2 h-2 mr-2 bg-green-500 rounded-full"></span>
            Active Account
          </span>
        </div>
      </div>
    </section>
  );
};

export default UserProfileCard;
