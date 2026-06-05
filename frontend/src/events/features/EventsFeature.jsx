import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useEvents } from "../hooks/useEvents";
import { useCart } from "../../cart/context/CartContext";
import useToggleEventSave from "../../user/hooks/useToggleEventSave";
import { useScrollToSectionOnSearch } from "../hooks/useScrollToSectionOnSearch";
import EventsHeader from "../components/EventsHeader";
import EventGrid from "../components/EventGrid";
import EmptyState from "shared/components/UI/EmptyState";

/**
 * EventsFeature component acts as the smart orchestrator for the events domain.
 * It manages context bindings, hooks resolution, and handles business workflow
 * routing such as direct checkout execution and cart addition side-effects.
 *
 * @component
 * @param {Object} props - Component properties.
 * @param {Function} [props.onDirectPurchase] - Optional external fast checkout context handler.
 * @returns {React.ReactElement} The fully operational events feature container.
 */
const EventsFeature = ({ onDirectPurchase }) => {
  const navigate = useNavigate();
  const { events, loading, error, clearFilters } = useEvents();
  const { onToggleSave, isEventSaved } = useToggleEventSave();
  const gridContainerRef = useScrollToSectionOnSearch();

  // Centralized cart domain context execution
  const { addToCart, isInCart, removeFromCart } = useCart();

  /**
   * Toggles the presence of an item inside the user application cart.
   *
   * @param {Object} eventPayload - The structural data transfer object representing an event.
   */
  const handleCartToggle = (eventPayload) => {
    if (isInCart(eventPayload.id)) {
      removeFromCart(eventPayload.id);
    } else {
      addToCart(eventPayload);
    }
  };

  /**
   * Orchestrates the direct purchase procedural workflow pipeline.
   * If an external callback override exists, it delegates control up;
   * otherwise, it triggers fallback redirection via the standard cart view.
   *
   * @param {Object} eventPayload - The structural data transfer object representing an event.
   */
  const handleDirectPurchaseWorkflow = (eventPayload) => {
    try {
      if (onDirectPurchase && typeof onDirectPurchase === "function") {
        onDirectPurchase(eventPayload);
        return;
      }

      if (!isInCart(eventPayload.id)) {
        addToCart(eventPayload);
      }
      navigate("/cart");
    } catch (err) {
      console.error(
        "❌ Critical error intercepted during direct purchase workflow execution:",
        err
      );
    }
  };

  /**
   * Routes the browser navigation stack cleanly towards the specific details page.
   *
   * @param {string|number} id - The unique target primary domain identifier of the event.
   */
  const handleDetailNavigate = (id) => {
    navigate(`/events/${id}`);
  };

  if (!loading && error) {
    return (
      <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <EmptyState
          title="Connection Failure Detected"
          description="A critical infrastructure error occurred while trying to resolve the available catalog from the server."
          actionText="Reset Search Parameters"
          onAction={clearFilters}
        />
      </div>
    );
  }

  if (!loading && (!events || events.length === 0)) {
    return (
      <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <EmptyState
          title="No Results Found"
          description="None of our current live experiences match the specific parameters defined in your search filters."
          actionText="Clear All Filters"
          onAction={clearFilters}
        />
      </div>
    );
  }

  return (
    <section
      ref={gridContainerRef}
      aria-label="Event Results"
      className="animate-in fade-in duration-500 scroll-mt-10"
    >
      <EventsHeader
        isLoading={loading}
        onSearchFocusRequested={() =>
          window.dispatchEvent(new CustomEvent("app:search-focus-requested"))
        }
      />

      <EventGrid
        events={events}
        isLoading={loading}
        onToggleSave={onToggleSave}
        isEventSaved={isEventSaved}
        isInCart={isInCart}
        onCartToggle={handleCartToggle}
        onDirectPurchase={handleDirectPurchaseWorkflow}
        onDetailNavigate={handleDetailNavigate}
      />
    </section>
  );
};

EventsFeature.propTypes = {
  onDirectPurchase: PropTypes.func,
};

export default EventsFeature;
