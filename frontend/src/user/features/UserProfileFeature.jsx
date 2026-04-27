import { useAuth } from "../hooks/useAuth";
import UserProfileCard from "../components/UserProfileCard";

/**
 * UserProfileFeature Component (Smart/Feature Orchestrator).
 * * This component serves as the data bridge for the user's profile view.
 * It coordinates with the `AuthContext` to retrieve the current session data
 * and manages the visual transition from a loading state to the final UI.
 *
 * **Architectural Pattern**:
 * - **Smart/Dumb Separation**: This "Smart" component handles the logic (data fetching/auth state),
 * while delegating the layout and styling to the "Dumb" `UserProfileCard`.
 * - **Skeleton Loading**: Implements a native loading placeholder to prevent layout shifts
 * (CLS) and improve perceived performance.
 *
 * @component
 * @category Features/User
 * @returns {JSX.Element} Either a skeleton loader or the populated profile card.
 */
const UserProfileFeature = () => {
  /** * Domain State:
   * Consumes the global 'user' object. If null, indicates the session is still
   * being validated or hydrated from storage.
   */
  const { user } = useAuth();

  /**
   * Loading State (Skeleton):
   * This block provides a visual bridge while 'AuthContext' initializes.
   * Uses Tailwind's `animate-pulse` for a modern, non-blocking feedback.
   */
  if (!user) {
    return (
      <div
        className="animate-pulse bg-white p-8 rounded-2xl shadow-sm border border-slate-100"
        aria-hidden="true"
      >
        {/* Placeholder: Title */}
        <div className="h-8 bg-slate-200 rounded w-1/4 mb-4"></div>

        {/* Placeholder: Content rows */}
        <div className="space-y-3">
          <div className="h-4 bg-slate-100 rounded w-1/2"></div>
          <div className="h-4 bg-slate-100 rounded w-1/3"></div>
        </div>
      </div>
    );
  }

  // Final View: Injecting validated user data into the presentational card
  return <UserProfileCard user={user} />;
};

export default UserProfileFeature;
