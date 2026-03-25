import EventDiscovery from "../../../events/features/EventDiscovery";
import UserAuthFeature from "../../../user/features/UserAuthFeature";

/**
 * HeaderBar Component.
 * * This "Structural Orchestrator" manages the top-level navigation and 
 * identity entry points. It provides a responsive container that balances 
 * the search discovery tools and the user authentication state.
 * * Architectural Note:
 * Following the "Self-Sufficient Feature" pattern, this header does not 
 * manage state. It simply delegates responsibilities to the EventDiscovery 
 * and UserAuthFeature components, ensuring they consume their respective 
 * contexts independently.
 * * @component
 * @category Shared Components/Layout
 * @returns {JSX.Element} A flexible header container with coordinated feature injection.
 */
const HeaderBar = () => (
  <header 
    className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10"
    role="banner"
  >
    {/* Discovery Section: Occupies available space to prioritize search UX */}
    <div className="flex-grow">
      <EventDiscovery />
    </div>

    {/* Identity Section: Fixed width to maintain consistent auth button sizes */}
    <div className="flex-shrink-0">
      <UserAuthFeature />
    </div>
  </header>
);

export default HeaderBar;