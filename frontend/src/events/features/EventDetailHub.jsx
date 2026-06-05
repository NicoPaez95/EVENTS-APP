/**
 * @file EventDetailHub.jsx
 * @description Domain-level composite feature that orchestrates the event details experience.
 * Manages UI coordination (scrolling, highlighting) and layout state machines,
 * keeping the parent routing page strictly thin and clean.
 * @module features/events/EventDetailHub
 * @author Nico Paez
 */

import { useState, useRef } from "react";
import EventDetailsFeature from "./EventDetailsFeature";
import EventMapFeature from "./EventMapFeature";
import WeatherFeature from "./WeatherFeature";
import CheckoutModalFeature from "./CheckoutModal/CheckoutModalFeature";
import PageHeader from "shared/components/UI/PageHeader";

/**
 * EventDetailHub Component.
 *
 * High-order smart orchestrator acting as the interaction bridge between
 * localized event details, geospatial maps, and transactional checkout portals.
 *
 * @component
 * @category Features/Events
 * @returns {React.JSX.Element} The completely unified and interactive feature subtree.
 */
const EventDetailHub = () => {
  const [checkoutTarget, setCheckoutTarget] = useState(null);
  const [loadedEvent, setLoadedEvent] = useState(null);
  const [isMapHighlighted, setIsMapHighlighted] = useState(false);
  const mapSectionRef = useRef(null);

  /**
   * Coordinates smooth hardware-accelerated viewport shifting
   * across feature DOM layout boundaries.
   */
  const handleLocationFocus = () => {
    if (mapSectionRef.current) {
      mapSectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });

      setIsMapHighlighted(true);
      setTimeout(() => setIsMapHighlighted(false), 2000);
    }
  };

  /**
   * Closes the checkout modal by clearing the current target asset.
   * @returns {void}
   */
  const handleCloseCheckout = () => {
    setCheckoutTarget(null);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
      {/* Main Domain Area: Core details and similarity recommendations */}
      <div className="lg:col-span-2">
        <EventDetailsFeature
          onTriggerCheckout={(eventPayload) => setCheckoutTarget(eventPayload)}
          onLocationFocusRequested={handleLocationFocus}
          onEventLoaded={(eventEntity) => setLoadedEvent(eventEntity)}
        />
      </div>

      {/* Informational Sidebar: Independent side features assembled at hub level */}
      <aside className="lg:col-span-1 space-y-8">
        <PageHeader title="Venue & Logistics" level={3} />

        {/* Render features defensively based on available async data broadcast */}
        {loadedEvent ? (
          <>
            <div
              ref={mapSectionRef}
              className={`transition-all duration-700 rounded-3xl ${
                isMapHighlighted
                  ? "ring-4 ring-blue-400 ring-offset-4 shadow-2xl scale-[1.02]"
                  : "ring-0 shadow-none scale-100"
              }`}
            >
              <EventMapFeature venue={loadedEvent.venue} />
            </div>

            <div className="space-y-4">
              <WeatherFeature location={loadedEvent.venue?.city} />

              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                <p className="text-slate-500 text-xs leading-relaxed italic">
                  {"Note: Weather forecasts for "}
                  <strong>{loadedEvent.venue?.city}</strong>
                  {" are updated in real-time. "}
                  {"Don't forget to check the map for the best route to "}
                  <strong>{loadedEvent.venue?.name}</strong>.
                </p>
              </div>
            </div>
          </>
        ) : (
          <div className="h-48 bg-slate-100 animate-pulse rounded-3xl" />
        )}
      </aside>

      {/* Standalone independent Portal Layer for fast checkout orchestration.
        Short-circuit evaluation blocks the modal mount pipeline and internal hooks 
        until checkoutTarget holds a valid, active event asset payload.
      */}
      {checkoutTarget && (
        <CheckoutModalFeature
          isOpen={Boolean(checkoutTarget)}
          onClose={handleCloseCheckout}
          event={checkoutTarget}
        />
      )}
    </div>
  );
};

export default EventDetailHub;
