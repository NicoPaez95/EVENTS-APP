import { useMemo } from "react";
import { useEvents } from "../hooks/useEvents";
import FeaturedEventsCarousel from "../components/FeaturedEventsCarousel";
import PageHeader from "shared/components/UI/PageHeader";
import LoadingState from "shared/components/UI/LoadingState";
import { useTranslation } from "react-i18next";

/**
 * FeaturedEvents Feature Component (Smart Component).
 *
 * This component orchestrates the data requirements for the highlighted events section.
 * It is decoupled from the active search filters to ensure visual persistence
 * on the Home page.
 *
 * @component
 * @category Features
 *
 * @description
 * **Architectural Strategy**:
 *
 * 1. **Internationalization**: Uses the `t` translation function from i18next
 *    to render localized UI text.
 *
 * 2. **Data Decoupling**: Consumes `allEvents` (master catalog) instead of `events` (filtered state).
 *    This prevents the carousel from disappearing when a user filters by location or category.
 *
 * 3. **Performance Optimization**: Uses `useMemo` to filter the featured list only when
 *    the master catalog changes, preventing redundant calculations during search inputs.
 *
 * 4. **Conditional Rendering**: Implements a "Zero-State" guard that unmounts the section
 *    if no featured events are found in the source data.
 *
 * @returns {JSX.Element|null} The orchestrated featured section or a skeleton loader.
 */
const FeaturedEvents = () => {
  /**
   * Gets the translation function scoped to the "events" namespace.
   * Use `t()` to access translations defined in events.json.
   */
  const { t } = useTranslation("events");

  /**
   * Global State Consumption:
   * Retrieves the static master catalog and global loading indicator.
   */
  const { allEvents, loading } = useEvents();

  /**
   * Memoized Featured Collection:
   * Filters the master dataset for events flagged as high-priority highlights.
   * Logic is isolated from the dynamic search state.
   */
  const featured = useMemo(() => {
    return allEvents?.filter((event) => event.isFeatured === true) || [];
  }, [allEvents]);

  /**
   * Loading State:
   * Delegates the waiting lifecycle step to the Shared UI Layer atom
   * to guarantee systemic visual consistency.
   */
  if (loading) {
    return (
      <LoadingState
        message={
          t("featured.loadingState") || t("eventDetailsFeature.loadingState")
        }
      />
    );
  }

  /**
   * Integrity Guard:
   * If the master catalog contains no featured items, the component
   * renders nothing to maintain a clean landing page interface.
   */
  if (featured.length === 0) {
    return null;
  }

  return (
    <section
      aria-labelledby="featured-experiences-title"
      className="py-8 animate-in fade-in slide-in-from-bottom-4 duration-700"
    >
      <div className="container mx-auto">
        {/* Semantic Header for Accessibility */}
        {/* Reusable Section Header linked correctly with semantic aria-labelledby */}
        <PageHeader
          id="featured-experiences-title"
          title={t("featured.sectionTitle")}
          level={2}
          className="px-4 mb-6"
        />
        {/* Presentational Layer:
            Passes the memoized data to the atomic carousel component.
        */}
        <FeaturedEventsCarousel
          featuredEvents={featured}
          clickToSeeDetails={t("featured.clickToSeeDetails")}
        />
      </div>
    </section>
  );
};

export default FeaturedEvents;
