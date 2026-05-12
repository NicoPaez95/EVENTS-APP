import UserProfileFeature from "../../user/features/UserProfileFeature";

/**
 * User Profile Page Component.
 *
 * This component acts as the high-level route entry point for the user's personal
 * management area. Its sole responsibility is to define the structural context
 * of the view within the application's routing hierarchy.
 *
 * Architectural Strategy:
 * - Thin Page Pattern: The component avoids managing local state, side effects,
 *   or business logic.
 * - Feature Delegation: It serves as a container for the `UserProfileFeature`,
 *   which acts as the "Smart Orchestrator" responsible for authentication
 *   verification, data fetching from the User Domain, and profile management.
 * - Decoupling: By keeping the Page "thin," the logic remains portable and
 *   highly maintainable within the Feature layer.
 *
 * @component
 * @category Pages
 * @returns {JSX.Element} The Profile page shell orchestrating the UserProfileFeature.
 */
const Profile = () => {
  return (
    /**
     * UserProfileFeature:
     * This orchestrator will handle the internal layout (tabs, settings, info)
     * and communicate with the UserContext or API.
     */
    <UserProfileFeature />
  );
};

export default Profile;
