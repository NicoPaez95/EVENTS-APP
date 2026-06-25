/**
 * @file LoginForm.jsx
 * @description Presentational form component for user authentication.
 * A lean, decoupled layout container that delegates semantic validation text,
 * interactive states, and typography to atomic UI structures.
 * @module components/user/LoginForm
 * @author Nico Paez
 */

import PrimaryButton from "shared/components/UI/PrimaryButton";
import PrimaryInput from "shared/components/UI/PrimaryInput";

/**
 * LoginForm Presentational Component.
 *
 * Implements a standard semantic accessibility tree form. Isolates view presentation layers,
 * offloading internal attribute mutations and network async payloads up to parent controller structures.
 * It relies entirely on an injected localization dictionary to decouple presentation text from framework bindings.
 *
 * @component
 * @category Components/User
 * @param {Object} props - Component properties.
 * @param {Object} props.values - Hash map storing data state parameters actively managed by the form hooks.
 * @param {string} props.values.email - The current string sequence typed inside the email context node.
 * @param {string} props.values.password - The current private string sequence typed inside the password context node.
 * @param {Object} props.errors - Hash map capturing localized error alert feedback messages mapped by element name keys.
 * @param {string} [props.errors.email] - Feedback log message identifying email structural syntax schema violations.
 * @param {string} [props.errors.password] - Feedback log message identifying password validation restriction issues.
 * @param {function} props.onChange - Unified mutation event callback listener targeted to process character entry shifts.
 * @param {function} props.onSubmit - Execution interceptor pipeline method triggered upon form submission.
 * @param {boolean} props.isLoading - UI status block toggle that freezes interactions and signals active asynchronous request batches.
 * @param {Object} props.i18n - Injected internationalization dictionary for pre-translated labels.
 * @param {Object} props.i18n.primaryInput - Grouped translation keys matching the inputs and actions of this view.
 * @param {string} props.i18n.primaryInput.email - Localized text label for the email field.
 * @param {string} props.i18n.primaryInput.placeholder - Localized placeholder text for the email field.
 * @param {string} props.i18n.primaryInput.password - Localized text label for the password field.
 * @param {string} props.i18n.primaryInput.loadingText - Localized loading feedback text shown on asynchronous submissions.
 * @param {string} props.i18n.primaryInput.signin - Localized submission text trigger for the sign-in execution.
 * @returns {JSX.Element} A structured authentication wrapper enclosing input fields and action buttons.
 */
const LoginForm = ({ values, errors, onChange, onSubmit, isLoading, i18n }) => (
  <form
    onSubmit={onSubmit}
    className="space-y-6 animate-in fade-in duration-500"
    noValidate
  >
    {/* Atomic Integration: 
        PrimaryInput handles label, input, and error messages internally.
    */}
    <PrimaryInput
      label={i18n.primaryInput.email}
      id="email"
      name="email"
      type="email"
      placeholder={i18n.primaryInput.placeholder}
      value={values.email}
      onChange={onChange}
      error={errors.email}
      disabled={isLoading}
      autoComplete="email"
    />

    <PrimaryInput
      label={i18n.primaryInput.password}
      id="password"
      name="password"
      type="password"
      placeholder="••••••••"
      value={values.password}
      onChange={onChange}
      error={errors.password}
      disabled={isLoading}
      autoComplete="current-password"
    />

    {/* Form Action Section: Standardized via PrimaryButton */}
    <div className="pt-4">
      <PrimaryButton
        type="submit"
        isLoading={isLoading}
        loadingText={i18n.primaryInput.loadingText}
      >
        {i18n.primaryInput.signin}
      </PrimaryButton>
    </div>
  </form>
);

export default LoginForm;
