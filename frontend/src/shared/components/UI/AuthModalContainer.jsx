/**
 * @file AuthModalContainer.jsx
 * @description Presentational overlay portal that renders the sign-in prompt modal.
 * Consumes the global visibility state and utilizes routing hooks safely within the Router context.
 * @module shared/components/UI/AuthModalContainer
 * @author Nico Paez
 */

import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthModal } from "../../context/AuthModalContext";

/**
 * AuthModalContainer Component.
 *
 * Renders the structural layout and redirection behaviors for the guest interception workflow.
 * Leverages defensive interaction paradigms to prevent background link click collisions.
 *
 * @component
 * @category Shared/UI
 * @returns {React.JSX.Element|null} The interactive modal layout or null if visibility state is closed.
 */
const AuthModalContainer = () => {
  const { isOpen, closeAuthPrompt } = useAuthModal();
  const navigate = useNavigate();

  /**
   * Dismisses the modal popup securely and reroutes the user session to the authentication portal form.
   * Encapsulates callbacks to stabilize layout renderings.
   * * @type {function(): void}
   */
  const handleRedirect = useCallback(() => {
    closeAuthPrompt();
    navigate("/login");
  }, [closeAuthPrompt, navigate]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300"
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
    >
      {/* Backdrop Click Dismissal Safeguard */}
      <div className="absolute inset-0" onClick={closeAuthPrompt} />

      <div className="relative bg-white w-full max-w-md p-8 rounded-3xl shadow-2xl border border-slate-100 text-center animate-in zoom-in-95 duration-300 z-10">
        {/* Decorative Status Identity Badge */}
        <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-blue-50 text-blue-600 text-3xl flex items-center justify-center shadow-inner">
          ✨
        </div>

        <h2
          id="auth-modal-title"
          className="text-2xl font-black text-slate-900 tracking-tight mb-2"
        >
          Save Your Experiences
        </h2>

        <p className="text-slate-500 text-sm leading-relaxed mb-8">
          Oops! You need to be signed in to curate your personal event calendar.
          Create an account or log in to keep track of premium experiences.
        </p>

        {/* Action Trigger Interface Layout */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={closeAuthPrompt}
            className="flex-1 px-5 py-3.5 rounded-xl text-sm font-bold text-slate-500 bg-slate-50 hover:bg-slate-100 active:scale-[0.98] transition-all duration-200"
          >
            Keep Exploring
          </button>
          <button
            type="button"
            onClick={handleRedirect}
            className="flex-1 px-5 py-3.5 rounded-xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200 active:scale-[0.98] transition-all duration-200"
          >
            Sign In Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthModalContainer;
