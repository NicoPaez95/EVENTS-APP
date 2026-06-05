/**
 * @file SavedEventsListFeature.jsx
 * @description Orchestrates the "My Saved Experiences" view. Handles mixed filtering
 * capabilities through calendar days (URL queries) and reusable proximity buttons.
 * @module features/user/SavedEventsListFeature
 * @author Nico Paez
 */
import { useMemo, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useEvents } from "../../events/hooks/useEvents";
import { useUser } from "../context/UserContext";
import EventCard from "../../events/components/EventCard";
import TimeFilterNav from "../../shared/components/UI/TimeFilterNav";
import { filterByIds, filterByDate } from "events/utils/filterEvents";
import { filterEventsByTime } from "events/utils/eventHelpers";
import { parseISO, format } from "date-fns";
import { es } from "date-fns/locale";
import PageHeader from "shared/components/UI/PageHeader";
import EmptyState from "shared/components/UI/EmptyState";

/**
 * SavedEventsListFeature Component.
 *
 * @component
 * @category Features/User
 * @returns {JSX.Element} Populated event cards matching standard or strict calendar parameters.
 */
const SavedEventsListFeature = () => {
  const { events, loading } = useEvents();
  const { savedIds, isSaved, toggleSavedEvent } = useUser();
  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();

  /**
   * Internal Time Filter State.
   * Defaults to 'all' because the calendar or generic list acts as the core hub here.
   */
  const [timeFilter, setTimeFilter] = useState("all");

  // Captures the query state modified by the calendar feature
  const dateFilter = searchParams.get("date");

  /**
   * Generates localized uppercase headings for strict calendar filtering parameters.
   * Expects a clean literal date sequence string (YYYY-MM-DD).
   * * @param {string} dateString - Clean date sequence from URL query parameter.
   * @returns {string} Fully formatted uppercase localized title.
   */
  const formatDynamicTitle = (dateString) => {
    try {
      const parsedDate = parseISO(dateString);
      return `EVENTOS DEL ${format(parsedDate, "d 'DE' MMMM", { locale: es })}`.toUpperCase();
    } catch {
      return `EVENTOS PARA ${dateString}`;
    }
  };

  /**
   * Changes the time window filter and clears any active calendar date query params
   * to avoid unexpected intersections.
   */
  const handleTimeFilterChange = (filterId) => {
    setTimeFilter(filterId);
    if (searchParams.has("date")) {
      const newParams = new URLSearchParams(searchParams);
      newParams.delete("date");
      setSearchParams(newParams);
    }
  };

  /**
   * Combined Pipeline Data Filtering (Memoized).
   */
  const displayList = useMemo(() => {
    // Stage 1: Filter full catalog against user personal bookmarks
    let list = filterByIds(events, savedIds);

    // Stage 2: Apply calendar strict single-day constraint if present
    if (dateFilter) {
      return filterByDate(list, dateFilter);
    }

    // Stage 3: Apply standard upcoming time-window scopes if calendar is idle
    if (timeFilter !== "all") {
      list = filterEventsByTime(list, timeFilter);
    }

    return list;
  }, [events, savedIds, dateFilter, timeFilter]);

  if (loading) {
    return (
      <div
        className="p-20 text-center animate-pulse text-slate-400 font-medium"
        role="status"
        aria-live="polite"
      >
        Loading your curated experiences...
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Dynamic Header: Adapts based on active URL filters or selected time scope */}
      <header className="border-b border-slate-100 pb-6 space-y-6">
        {/*Integrated Reusable Title*/}
        <PageHeader
          title={
            dateFilter
              ? formatDynamicTitle(dateFilter)
              : "Mis Experiencias Guardadas"
          }
          description={`${displayList.length} ${displayList.length === 1 ? "evento" : "eventos"} encontrados en tu selección.`}
        />

        {/* Integrated Reusable Time Filters Navigation */}
        <div className="pt-2">
          <TimeFilterNav
            activeFilter={dateFilter ? "" : timeFilter}
            onFilterChange={handleTimeFilterChange}
          />
        </div>
      </header>

      {/* Main Results Grid Section */}
      {displayList.length > 0 ? (
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          role="list"
        >
          {displayList.map((event) => (
            <EventCard
              key={event.id}
              {...event}
              isSaved={isSaved(event.id)}
              onToggleSave={toggleSavedEvent}
              showRemoveButton={true}
            />
          ))}
        </div>
      ) : (
        /* Empty State Handler */
        <EmptyState
          title="No tienes eventos programados para esta selección"
          description="Tu lista de favoritos o el filtro seleccionado no registran experiencias activas en este momento."
          actionLabel="EXPLORAR MÁS EVENTOS"
          onAction={() => navigate("/")}
        />
      )}
    </div>
  );
};

export default SavedEventsListFeature;
