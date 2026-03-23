import SavedEventsListFeature from '../../user/features/SavedEventsListFeature';

/**
 * SavedEventsPage Component.
 * * This "Page" component acts as a high-level view container.
 * Its primary responsibility is to provide the structural layout (grid/container)
 * and mount the SavedEventsListFeature which handles the business logic.
 * * @component
 * @category Pages
 * @returns {JSX.Element} The main layout for the User's Saved Events view.
 */
const SavedEventsPage = () => {
  return (
    <main 
      className="container mx-auto px-4 py-8 min-h-screen" 
      aria-label="Saved Events Page"
    >
      <section className="max-w-7xl mx-auto">
        <SavedEventsListFeature />
      </section>
    </main>
  );
};

export default SavedEventsPage;