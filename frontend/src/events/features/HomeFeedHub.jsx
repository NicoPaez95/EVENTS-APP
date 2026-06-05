/**
 * @file HomeFeedHub.jsx
 * @description Domain-level composite feature that orchestrates the home feed experience.
 * Coordinates independent event discovery lanes and binds the transactional checkout portal flow,
 * keeping the parent routing page strictly thin and clean.
 * @module components/events/features/HomeFeedHub
 * @author Nico Paez
 */

import React, { useState } from "react";
import FeaturedEvents from "./FeaturedEvents";
import CategoryEvents from "./CategoryEventsFeature";
import EventsFeature from "./EventsFeature";
import CheckoutModalFeature from "./CheckoutModal/CheckoutModalFeature";

/**
 * HomeFeedHub Component.
 *
 * High-order smart orchestrator acting as the behavioral composition bridge between
 * trending highlights, categorical taxonomies, main feeds, and global checkout overlays.
 *
 * @component
 * @category Features/Events
 * @returns {React.JSX.Element} The completely unified and interactive home feed subtree.
 */
const HomeFeedHub = () => {
  /** * Local context target to handle immediate direct purchase flows
   * across downstream feature card boundaries.
   * Holds the event payload when open, or null when closed.
   */
  const [checkoutTarget, setCheckoutTarget] = useState(null);

  /**
   * Closes the checkout modal by clearing the current target asset.
   * @returns {void}
   */
  const handleCloseCheckout = () => {
    setCheckoutTarget(null);
  };

  return (
    <>
      {/* Hero Feature: Showcases high-priority or trending events */}
      <FeaturedEvents />

      {/* Discovery Feature: Allows users to filter the global state by category */}
      <CategoryEvents />

      {/* Main Feed Feature: Renders the core list of available events and captures checkout payloads */}
      <EventsFeature
        onDirectPurchase={(eventPayload) => setCheckoutTarget(eventPayload)}
      />

      {/* Standalone independent Portal Layer for fast checkout orchestration.
          Short-circuit evaluation double-checks that checkoutTarget is active (truthy)
          before mounting the component tree into memory.
      */}
      {checkoutTarget && (
        <CheckoutModalFeature
          isOpen={Boolean(checkoutTarget)}
          onClose={handleCloseCheckout}
          event={checkoutTarget}
        />
      )}
    </>
  );
};

export default HomeFeedHub;
