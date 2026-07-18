/**
 * @file EventDetailsFeature.jsx
 * @description State container and data orchestrator for the event details experience.
 * Coordinates route parsing, authentication state checking, and domain-level recommendation computations.
 * Fires layout action callbacks upward to page orchestrators to handle side features.
 * Injects structured i18n localization payloads to isolate presentational layer dependencies.
 * @module features/events/containers/EventDetailsFeature
 * @author Nico Paez
 */

import React, { useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Domain Hooks
import { useAuth } from "../../user/hooks/useAuth";
import useToggleEventSave from "../../user/hooks/useToggleEventSave";
import { useEvents } from "../hooks/useEvents";

// Utils & Domain Logic
import { findEventById } from "events/utils/eventHelpers";
import { getRelatedEvents } from "../utils/recommendationEngine";

// Presentational Components
import EventDetail from "../components/EventDetail";
import EventGrid from "../components/EventGrid";

// Shared UI
import LoadingState from "../../shared/components/UI/LoadingState";
import NotFound from "../../shared/components/UI/NotFound";
import PageHeader from "shared/components/UI/PageHeader";

/**
 * @typedef {Object} Venue
 * @property {string} name - The legal or commercial name of the physical building/location.
 * @property {string} city - The city name used for geospatial targeting and weather resolution.
 */

/**
 * @typedef {Object} Event
 * @property {string|number} id - The unique atomic resource identification signature.
 * @property {string} [title] - The human-readable name of the experience.
 * @property {string} [category] - The operational classification tag for recommendation filters.
 * @property {string} [date] - ISO string stamp or standard representation of the event calendar day.
 * @property {string} [description] - Full length narrative detailing the event features.
 * @property {string} [image] - Asset filename signature or fully-qualified URL for banner resolution.
 * @property {Venue} venue - Embedded structural data regarding location logistics.
 */

/**
 * EventDetailsFeature Component.
 *
 * High-order smart container acting as the single source of truth for the details view.
 * Handles side-effects, coordinates state machines, enforces route safety metrics,
 * and maps multi-level namespace localization strings down into presentational subtrees.
 *
 * @component
 * @category Features/Events
 * @param {Object} props - Component properties.
 * @param {Function} props.onTriggerCheckout - Pipeline interceptor callback targeting transactional layout managers.
 * @param {Function} props.onLocationFocusRequested - Bubble-up notification when the user interacts with venue locations.
 * @param {Function} [props.onEventLoaded] - Communication channel providing the loaded entity payload up to the page.
 * @returns {React.JSX.Element} The completed feature presentation layout tree or structural fallback components.
 */
const EventDetailsFeature = ({
  onTriggerCheckout,
  onLocationFocusRequested,
  onEventLoaded,
}) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const { onToggleSave, isEventSaved } = useToggleEventSave();
  const { allEvents, loading } = useEvents();

  /**
   * Global i18next Translation Instance.
   * Pulls the reactive localization hook scoped exclusively to the "events" namespace.
   * @type {Function} t - Contextual namespace translator function.
   */
  const { t } = useTranslation("events");

  /**
   * Memoized resolution of the focused single event entity from core state.
   * @type {Event|null}
   */
  const event = useMemo(() => {
    return findEventById(allEvents, id);
  }, [allEvents, id]);

  /**
   * Dispatches the valid event entity upward to parent layouts for synchronization.
   */
  useEffect(() => {
    if (event && onEventLoaded) {
      onEventLoaded(event);
    }
  }, [event, onEventLoaded]);

  /**
   * Guards the ticket booking flow enforcing authentication checks.
   * Redirects anonymous traffic to authentication flows while saving active locations.
   * @param {Event} targetEvent - The active targeted experience element payload.
   */
  const handleSecureTickets = (targetEvent) => {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: location.pathname } });
    } else if (onTriggerCheckout) {
      onTriggerCheckout(targetEvent);
    }
  };

  /**
   * Memoized execution layer sorting contextual recommendations using semantic attributes.
   * @type {Event[]}
   */
  const relatedEvents = useMemo(() => {
    return getRelatedEvents(event, allEvents);
  }, [event, allEvents]);

  if (loading) {
    return <LoadingState message={t("eventDetailsFeature.loadingState")} />;
  }

  if (!event) {
    return (
      <NotFound
        title={t("eventDetailsFeature.notFound.title")}
        message={t("eventDetailsFeature.notFound.message")}
        link="/events"
        linkText={t("eventDetailsFeature.notFound.linkText")}
      />
    );
  }

  return (
    <div className="space-y-12">
      {/* Structural Experience Layout Frame */}
      <section aria-label="Event Details">
        <EventDetail
          event={event}
          isAuthenticated={isAuthenticated}
          onSecureTickets={() => handleSecureTickets(event)}
          onBack={() => navigate(-1)}
          onLocationClick={onLocationFocusRequested}
          onToggleSave={onToggleSave}
          isSaved={isEventSaved ? isEventSaved(event.id) : false}
          i18n={{
            fallback: {
              title: t("eventDetailsFeature.eventDetail.fallback.title"),
              category: t("eventDetailsFeature.eventDetail.fallback.category"),
              description: t(
                "eventDetailsFeature.eventDetail.fallback.description"
              ),
            },
            backButton: t("eventDetailsFeature.eventDetail.backButton"),
            bookmarkButton: {
              removeButton: t(
                "eventDetailsFeature.eventDetail.bookmarkButton.removeButton"
              ),
              saveButton: t(
                "eventDetailsFeature.eventDetail.bookmarkButton.saveButton"
              ),
            },
            venueName: t("eventDetailsFeature.eventDetail.venueName"),
            venueCity: t("eventDetailsFeature.eventDetail.venueCity"),
            venue: t("eventDetailsFeature.eventDetail.venue"),
            viewMap: t("eventDetailsFeature.eventDetail.viewMap"),
            schedule: t("eventDetailsFeature.eventDetail.schedule"),
            localTime: t("eventDetailsFeature.eventDetail.localTime"),
            experienceDetails: t(
              "eventDetailsFeature.eventDetail.experienceDetails"
            ),
            primaryButton: {
              secure: t("eventDetailsFeature.eventDetail.primaryButton.secure"),
              signIn: t("eventDetailsFeature.eventDetail.primaryButton.signIn"),
            },
          }}
        />
      </section>

      {/* Core Domain Recommendations Subtree */}
      <div className="space-y-8">
        <PageHeader title={t("eventDetailsFeature.pageHeader")} level={3} />

        <div className="w-full mx-auto">
          <EventGrid
            events={relatedEvents}
            cols="lg:grid-cols-3"
            variant="compact"
            onToggleSave={onToggleSave}
            isEventSaved={isEventSaved}
            onDirectPurchase={handleSecureTickets}
            i18n={{
              directPurchase: t("events.eventCard.buy"),
              viewDetails: t("events.eventCard.viewDetails"),
            }}
          />
        </div>
      </div>
    </div>
  );
};

EventDetailsFeature.propTypes = {
  onTriggerCheckout: PropTypes.func.isRequired,
  onLocationFocusRequested: PropTypes.func.isRequired,
  onEventLoaded: PropTypes.func,
};

EventDetailsFeature.defaultProps = {
  onEventLoaded: null,
};

export default EventDetailsFeature;
