/**
 * @file RegisterForm.jsx
 * @description Presentational form component for user account registration.
 * A decoupled layout container that relies on atomic UI components to encapsulate
 * internal utility classes, responsive constraints, and error boundaries.
 * @module components/user/RegisterForm
 * @author Nico Paez
 */

import PrimaryButton from "shared/components/UI/PrimaryButton";
import PrimaryInput from "shared/components/UI/PrimaryInput";

/**
 * RegisterForm Presentational Component.
 *
 * Implements a streamlined profile registration interface. Offloads schema validation,
 * state mutations, and API network actions up to the supervising controller layer.
 * It relies entirely on an injected localization dictionary to decouple presentation text from framework bindings.
 *
 * @component
 * @category Components/User
 * @param {Object} props - Component properties.
 * @param {Object} props.values - Hash map collection storing data parameters actively managed by form state hooks.
 * @param {string} props.values.name - The target string sequence capturing the user's full name.
 * @param {string} props.values.email - The target string sequence capturing the profile identity email address.
 * @param {string} props.values.password - The private string sequence capturing the registration credentials.
 * @param {Object} props.errors - Hash map capturing localized input warning details mapped by element name keys.
 * @param {string} [props.errors.name] - Failure feedback log reporting issues with the name field constraints.
 * @param {string} [props.errors.email] - Failure feedback log reporting issues with the email formatting schema.
 * @param {string} [props.errors.password] - Failure feedback log reporting issues with password security policies.
 * @param {function} props.onChange - Unified character mutation event listener responsible for updating field entities.
 * @param {function} props.onSubmit - Submission interception handler executing root pipeline dispatch functions.
 * @param {boolean} props.isLoading - UI layout block toggle that disables inputs and mounts active spinner indicators.
 * @param {Object} props.i18n - Injected internationalization dictionary for pre-translated labels.
 * @param {Object} props.i18n.primaryInput - Grouped translation keys matching the inputs and actions of this view.
 * @param {string} props.i18n.primaryInput.name - Localized text label for the name input.
 * @param {string} props.i18n.primaryInput.placeholdername - Localized placeholder text for the name input.
 * @param {string} props.i18n.primaryInput.email - Localized text label for the email input.
 * @param {string} props.i18n.primaryInput.placeholder - Localized placeholder text for the email input.
 * @param {string} props.i18n.primaryInput.password - Localized text label for the password input.
 * @param {string} props.i18n.primaryInput.loadingText - Localized loading feedback text shown on asynchronous submissions.
 * @param {string} props.i18n.primaryInput.createAccount - Localized submission text trigger for creating the account.
 * @returns {JSX.Element} An accessible input form layout block optimized for user account provisioning.
 */
const RegisterForm = ({
  values,
  errors,
  onChange,
  onSubmit,
  isLoading,
  i18n,
}) => {
  return (
    <form
      className="space-y-5 animate-in fade-in duration-500"
      onSubmit={onSubmit}
      noValidate
    >
      {/* Name Identification */}
      <PrimaryInput
        label={i18n.primaryInput.name}
        id="name"
        name="name"
        type="text"
        placeholder={i18n.primaryInput.placeholdername}
        value={values.name}
        onChange={onChange}
        error={errors.name}
        disabled={isLoading}
      />

      {/* Identity Group: Email */}
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

      {/* Security Group: Password */}
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
        autoComplete="new-password"
      />

      {/* Submission Layer */}
      <div className="pt-4">
        <PrimaryButton
          type="submit"
          isLoading={isLoading}
          loadingText={i18n.primaryInput.loadingText}
        >
          {i18n.primaryInput.createAccount}
        </PrimaryButton>
      </div>
    </form>
  );
};

export default RegisterForm;
