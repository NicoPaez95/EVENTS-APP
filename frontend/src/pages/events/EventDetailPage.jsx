import EventDetailsFeature from '../../events/features/EventDetailsFeature';

/**
 * Event Detail Page.
 * * This is the main entry point for the "/events/:id" route.
 * * Following the domain-driven architecture, it simply renders the 
 * EventDetailsFeature, which handles the business logic and orchestration.
 * *@component
 * @returns {JSX.Element} The rendered page with the event detail feature.
 */
const EventDetailPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto py-6 px-4">
        <EventDetailsFeature />
      </main>
    </div>
  );
};

export default EventDetailPage;