/**
 * @file AuthModalContainer.jsx
 * @description Presentational overlay portal that renders the sign-in prompt modal.
 * Consumes global visibility states and couples localization directly due to its ambient layout nature.
 * @module shared/components/UI/AuthModalContainer
 * @author Nico Paez
 */

import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthModal } from "../../context/AuthModalContext";
import { useTranslation } from "react-i18next";
import PrimaryButton from "./PrimaryButton";
import SecondaryButton from "./SecondaryButton";

/**
 * AuthModalContainer Component.
 *
 * Renders the structural layout and redirection behaviors for the guest interception workflow.
 * Directly initializes useTranslation because it operates as a global ambient shell element.
 *
 * @component
 * @category Components/Shared/UI
 * @returns {React.JSX.Element|null} The interactive modal layout or null if visibility state is closed.
 */
const AuthModalContainer = () => {
  const { isOpen, closeAuthPrompt } = useAuthModal();
  const navigate = useNavigate();

  /**
   * Internationalization Hook binding the container to the shared workspace.
   * @type {{ t: function(string): string }}
   */
  const { t } = useTranslation("shared");

  /**
   * Dismisses the modal popup securely and reroutes the user session to the authentication portal form.
   * Encapsulates callbacks to stabilize layout renderings.
   * @type {function(): void}
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

      {/* Modal Surface Structure (Overflow-hidden is added to contain the blurs)*/}
      <div className="relative bg-surface w-full max-w-md rounded-3xl shadow-2xl border border-secondary-border/20 text-center animate-in zoom-in-95 duration-300 z-10 overflow-hidden flex flex-col animate-float-slow ">
        {/* Absolute invisible layer that projects the dynamic shadow below */}
        <div className="absolute inset-0 rounded-3xl pointer-events-none animate-shadow-slow" />
        {/* --- AMBIENT GLASSMORPHISM BANNER*/}
        <div className="relative w-full h-32 bg-primary flex items-center justify-center select-none overflow-hidden">
          {/* Blurred accent light sphere on the left */}
          <div className="absolute -top-10 -left-10 w-32 h-32 bg-accent rounded-full blur-2xl opacity-50 pointer-events-none" />

          {/* Complementary light sphere on the right */}
          <div className="absolute -bottom-8 -right-6 w-28 h-28 bg-blue-500 rounded-full blur-2xl opacity-40 pointer-events-none" />

          {/* Internal gradient mask to soften the base and add depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-black/15 pointer-events-none" />

          {/* Decorative Status Identity Badge (Inserted floating inside the Banner) */}
          <div className="relative w-16 h-16 rounded-2xl bg-surface/10 backdrop-blur-md text-surface text-3xl flex items-center justify-center shadow-lg border border-surface/20 z-10 translate-y-4">
            ✨
          </div>
        </div>

        {/* --- CONTENT CONTAINER --- */}
        <div className="p-8 pt-10">
          <h2
            id="auth-modal-title"
            className="text-2xl font-black text-primary tracking-tight mb-2"
          >
            {t("authModal.title")}
          </h2>

          <p className="text-secondary text-sm leading-relaxed mb-8">
            {t("authModal.description")}
          </p>

          {/* Action Trigger Interface Layout */}
          <div className="flex flex-col sm:flex-row gap-3">
            <SecondaryButton type="button" onClick={closeAuthPrompt} size="md">
              {t("authModal.buttonCancel")}
            </SecondaryButton>

            <PrimaryButton type="button" onClick={handleRedirect} size="md">
              {t("authModal.buttonSubmit")}
            </PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AuthModalContainer;
