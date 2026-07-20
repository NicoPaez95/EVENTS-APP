import UpcomingListFeature from "../../events/features/UpcomingListFeature";

/**
 * UpcomingEventsPage Component.
 * * * This is the main entry point for the "Upcoming Experiences" route (/events/upcoming).
 * * Following the domain-driven architecture, it acts as a page-level container
 * that renders the 'UpcomingListFeature'.
 * * It provides the structural layout (min-height, background, and container)
 * needed to display the chronological event filtering interface.
 * * @component
 * @category Pages
 * @returns {JSX.Element} The rendered page containing the upcoming events list feature.
 */
const UpcomingEventsPage = () => {
  return (
    <main className=" min-h-screen bg-surface-page mx-auto py-6 px-4 ">
      {/* Orchestrates the time-based filtering (24h/7d/30d) 
            and the main event grid display.
        */}
      <UpcomingListFeature />
    </main>
  );
};

export default UpcomingEventsPage;
