import HomeLayout from "../../shared/components/Layout/HomeLayout";
import UserProfileFeature from "../../user/features/UserProfileFeature";

/**
 * User Profile Page Component (Page Shell).
 *
 * This component acts as a high-level route entry point. Its sole responsibility
 * is to define the structural context of the view by providing the necessary
 * Layout wrapper.
 *
 * **Architectural Strategy**:
 * Following a "Thin Page" architecture, this component avoids managing state or
 * business logic. Instead, it delegates all domain-specific operations (auth
 * checks, data fetching, and profile management) to the `UserProfileFeature`.
 *
 * @component
 * @category Pages
 * @returns {JSX.Element} The Profile page structure within the HomeLayout context.
 */
const Profile = () => {
  return (
    <HomeLayout>
      {/* Feature Orchestration Layer:
          This component is the "Smart" core that manages UserContext consumption, 
          UI skeletons for loading states, and the integration of sub-features 
          like Saved Events or Account Settings.
      */}
      <UserProfileFeature />
    </HomeLayout>
  );
};

export default Profile;
