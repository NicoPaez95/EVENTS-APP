/**
 * @file EventsFeature.jsx
 * @description Smart orchestrator component for the events domain catalogue layer.
 * Coordinates global context state tracking, side-effect pipeline workflows,
 * asynchronous hydration boundaries, and structural localization dictionary injections.
 * @module features/events/EventsFeature
 * @author Nico Paez
 */

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
import { useTranslation } from "react-i18next";

/**
 * @typedef {Object} EventPayload
 * @property {string|number} id - Unique domain identifier of the event entity.
 * @property {string} title - Explicit display name of the event asset.
 * @property {string} date - Temporal ISO operational schedule string.
 * @property {string} [image] - Remote asset raw image path string.
 */

/**
 * @typedef {Object} EventsFeatureProps
 * @property {function(EventPayload): void} [onDirectPurchase] - Optional external fast checkout context handler.
 */

/**
 * EventsFeature component acts as the smart orchestrator for the events domain.
 * It manages context bindings, hooks resolution, and handles business workflow
 * routing such as direct checkout execution and cart addition side-effects.
 * It encapsulates namespace-isolated translations and injects structured dictionary payloads into presentation layers.
 *
 * @component
 * @category Features/Events
 * @param {EventsFeatureProps} props - Component property payloads.
 * @returns {React.JSX.Element} The fully operational, cross-domain localized events feature container.
 */
const EventsFeature = ({ onDirectPurchase }) => {
  /**
   * Global i18next Translation Instance.
   * Pulls the reactive localization hook scoped exclusively to the "events" namespace.
   * @type {Function} t - Contextual namespace translator function.
   */
  const { t } = useTranslation("events");

  const navigate = useNavigate();
  const { events, loading, error, clearFilters } = useEvents();
  const { onToggleSave, isEventSaved } = useToggleEventSave();
  const gridContainerRef = useScrollToSectionOnSearch();

  // Centralized cart domain context execution
  const { addToCart, isInCart, removeFromCart } = useCart();

  /**
   * Toggles the presence of an item inside the user application cart.
   *
   * @param {EventPayload} eventPayload - The structural data transfer object representing an event.
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
   * @param {EventPayload} eventPayload - The structural data transfer object representing an event.
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
          title={t("emptyState.error.title")}
          description={t("emptyState.error.description")}
          actionText={t("emptyState.error.actionText")}
          onAction={clearFilters}
        />
      </div>
    );
  }

  if (!loading && (!events || events.length === 0)) {
    return (
      <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <EmptyState
          title={t("events.emptyState.notFound.title")}
          description={t("events.emptyState.notFound.description")}
          actionText={t("events.emptyState.notFound.actionText")}
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
        exploreEvents={t("events.eventsHeader.exploreEvents")}
        searchExperiencies={t("events.eventsHeader.searchExperiences")}
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
        i18n={{
          directPurchase: t("events.eventCard.buy"),
          viewDetails: t("events.eventCard.viewDetails"),
          addtocart: t("events.eventCard.addtocart"),
          addedtocart: t("events.eventCard.addedtocart"),
        }}
      />
    </section>
  );
};

EventsFeature.propTypes = {
  onDirectPurchase: PropTypes.func,
};

export default EventsFeature;
