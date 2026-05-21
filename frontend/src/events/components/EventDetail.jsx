import React from "react";
import PropTypes from "prop-types";
import BackButton from "../../shared/components/UI/BackButton";
import PrimaryButton from "../../shared/components/UI/PrimaryButton";
import { formatEventDate } from "../../shared/utils/dateHelpers";
import { resolveEventImage } from "../utils/eventFallbackMapper";

/**
 * EventDetail Component (Presentational).
 *
 * This presentational "Dumb" component is strictly responsible for rendering the detailed view
 * of a single event experience. Following domain-driven architectural constraints, it contains
 * zero operational business logic or mutation side effects, relying exclusively on props and
 * shared presentation utilities to resolve visual tokens.
 *
 * Architectural Strategy:
 * - Atomic UI Integration: Incorporates `BackButton` and `PrimaryButton` to guarantee uniform
 *   interaction design patterns across feature boundaries.
 * - Presentation Tokenization: Outsources complex ISO timestamp slicing to the shared date
 *   utility layer, keeping the markup clean and isolated from localization side effects.
 * - Defensive Rendering Fallbacks: Implements strict structural fallbacks and optional chaining
 *   to absorb missing or malformed domain payloads without breaking the UI shell.
 * - Intelligent Asset Mapping: Integrates `resolveEventImage` to dynamically mount contextual
 *   category placeholders if the remote database layout is compromised.
 *
 * @component
 * @category Components/Events
 * @param {Object} props - The component properties.
 * @param {Object} props.event - The comprehensive domain event data object from the repository.
 * @param {boolean} props.isAuthenticated - Context flag used to toggle the main CTA workflow layout and label.
 * @param {function} props.onSecureTickets - Upward callback to prompt transactional orchestration flows.
 * @param {function} props.onLocationClick - Viewport manipulation callback to focus logistical map interfaces.
 * @param {function} props.onBack - Router navigation utility callback to transition back through session history.
 * @returns {React.JSX.Element|null} The completed, responsive event detail presentation tree, or null if unassigned.
 */
const EventDetail = ({
  event,
  isAuthenticated,
  onSecureTickets,
  onLocationClick,
  onBack,
}) => {
  if (!event) return null;

  // Defensive parsing against missing or malformed date signatures
  const dateTokens = event?.date ? formatEventDate(event.date) : null;
  const day = dateTokens?.day || "--";
  const month = dateTokens?.month || "TBD";

  // Destructuring with granular fallbacks for direct template consumption
  const {
    title = "Untitled Experience",
    category = "Special Event",
    description = "Experience something unique. This event showcases the best in its category within a premium environment.",
    venue = {},
  } = event;

  // Strategic Asset Resolution: Securely evaluate event images using the domain utility
  const resolvedImage = resolveEventImage(event?.category, event?.image);

  const venueName = venue?.name || "Venue TBD";
  const venueCity = venue?.city || "Unknown City";

  return (
    <article className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
      {/* 1. Navigation Header */}
      <header className="p-5 bg-slate-50/50 border-b border-slate-100 flex justify-between items-center">
        <BackButton onClick={onBack} label="BACK TO EXPLORATION" />

        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 bg-blue-50 px-4 py-1.5 rounded-full">
          {category}
        </span>
      </header>

      <div className="flex flex-col md:flex-row">
        {/* 2. Visual Hero */}
        <div className="md:w-1/2 relative h-72 md:h-auto">
          <img
            src={resolvedImage}
            alt={`Cover for ${title}`}
            className="w-full h-full object-cover"
          />
          {/* Specific custom presentation layout for the Hero badge */}
          <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-md p-4 rounded-2xl text-center shadow-2xl border border-white/20 min-w-[80px]">
            <span className="block text-3xl font-black text-blue-600 leading-none">
              {day}
            </span>
            <span className="text-[10px] uppercase font-black text-slate-400 tracking-widest mt-1 block">
              {month}
            </span>
          </div>
        </div>

        {/* 3. Information Section */}
        <div className="md:w-1/2 p-10 flex flex-col justify-between bg-white">
          <div className="space-y-8">
            <h1 className="text-4xl font-black text-slate-900 leading-[1.1] tracking-tight">
              {title}
            </h1>

            <div className="space-y-4">
              {/* Interactive Venue */}
              <div
                onClick={onLocationClick}
                className="group flex items-center gap-4 p-4 -ml-4 rounded-2xl cursor-pointer hover:bg-blue-50/80 transition-all duration-300 active:scale-[0.98]"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onLocationClick();
                  }
                }}
              >
                <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center text-2xl shadow-lg shadow-blue-200 group-hover:rotate-12 transition-transform">
                  📍
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">
                    Venue • <span className="text-blue-500">View Map</span>
                  </p>
                  <p className="text-xl font-bold text-slate-800 leading-tight">
                    {venueName}
                  </p>
                  <p className="text-sm font-medium text-slate-500">
                    {venueCity}, Argentina
                  </p>
                </div>
              </div>

              {/* Time Indicator */}
              <div className="flex items-center gap-4 p-4 -ml-4">
                <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-500 flex items-center justify-center text-2xl">
                  ⏰
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">
                    Schedule
                  </p>
                  <p className="text-xl font-bold text-slate-800">21:00 HS</p>
                  <p className="text-sm font-medium text-slate-500">
                    Local Time
                  </p>
                </div>
              </div>
            </div>

            {/* Event Narrative */}
            <div className="pt-8 border-t border-slate-100">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">
                Experience Details
              </h3>
              <p className="text-slate-600 leading-relaxed text-base">
                {description}
              </p>
            </div>
          </div>

          {/* Core Action: Standardized via PrimaryButton */}
          <div className="mt-12">
            <PrimaryButton onClick={onSecureTickets} size="lg">
              {isAuthenticated ? "Secure Your Tickets" : "Sign In to Purchase"}
            </PrimaryButton>
          </div>
        </div>
      </div>
    </article>
  );
};

EventDetail.propTypes = {
  event: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    category: PropTypes.string,
    date: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
    venue: PropTypes.shape({
      name: PropTypes.string,
      city: PropTypes.string,
    }),
  }),
  isAuthenticated: PropTypes.bool.isRequired,
  onSecureTickets: PropTypes.func.isRequired,
  onLocationClick: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
};

export default EventDetail;
