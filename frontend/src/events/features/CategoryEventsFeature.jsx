import CategoryGrid from "events/components/CategoryGrid";
import { useEvents } from "../hooks/useEvents";
import PageHeader from "shared/components/UI/PageHeader";
import { useTranslation } from "react-i18next";
/**
 * CategoryEvents Feature Component.
 *
 * This "Smart Component" (Orchestrator) manages the category selection logic.
 * It encapsulates the filtering business logic by consuming the global
 * `EventsContext`, allowing it to be dropped into any layout without
 * requiring prop drilling from page-level components.
 *
 * @component
 * @category Features/Events
 * @returns {JSX.Element} A section containing the category selection interface.
 */
const CategoryEventsFeature = () => {
  /**
   * Hook: Global Event State Management.
   * * Extracts `handleCategorySelect` to ensure that interactions within the grid
   * trigger global state updates (e.g., filtering the main event list).
   */
  const { handleCategorySelect } = useEvents();

  /**
   * Gets the translation function scoped to the "events" namespace.
   * Use `t()` to access translations defined in events.json.
   */
  const { t } = useTranslation("events");

  return (
    <section aria-labelledby="categories-title" className="py-8">
      {/* Feature Header: 
          Uses id for accessibility matching with aria-labelledby 
      */}
      {/* Uniform centered category section anchor */}
      <PageHeader
        id="categories-title"
        title={t("category.sectionTitle")}
        level={2}
        align="center"
        className="py-4 my-2"
      />
      {/* Presentational Layer:
          Delegates the rendering of the grid to the UI component.
          Injects static mock data and the state handler.
      */}
      <CategoryGrid
        categories={t("category.name", { returnObjects: true })}
        onCategoryClick={handleCategorySelect}
      />
    </section>
  );
};

export default CategoryEventsFeature;
