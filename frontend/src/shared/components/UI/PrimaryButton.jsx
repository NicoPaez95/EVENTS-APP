/**
 * PrimaryButton Component.
 *
 * A high-level atomic component that standardizes primary actions.
 * Supports different sizes and full-width layouts while maintaining brand consistency.
 *
 * @component
 * @param {Object} props
 * @param {React.ReactNode} props.children - Button label.
 * @param {boolean} [props.isLoading] - Shows spinner and disables interaction.
 * @param {boolean} [props.fullWidth=true] - If the button should take 100% of container.
 * @param {'sm'|'md'|'lg'} [props.size='md'] - Visual scale of the button.
 * @param {string} [props.className] - Extra Tailwind classes for specific positioning.
 */
const PrimaryButton = ({
  children,
  isLoading,
  loadingText,
  fullWidth = true,
  size = "md",
  className = "",
  ...props
}) => {
  // Size variations map
  const sizeStyles = {
    sm: "py-2 px-4 text-xs rounded-xl",
    md: "py-3 px-6 text-sm rounded-xl",
    lg: "py-4 px-8 text-lg rounded-2xl",
  };

  return (
    <button
      {...props}
      disabled={isLoading || props.disabled}
      className={`
        ${fullWidth ? "w-full" : "w-auto"}
        ${sizeStyles[size]}
        bg-slate-900 text-white font-black shadow-lg shadow-blue-100
        hover:bg-blue-700 hover:-translate-y-0.5 active:scale-95 
        transition-all duration-200 disabled:bg-slate-300 disabled:shadow-none
        flex justify-center items-center gap-2 uppercase tracking-wider
        ${className}
      `}
    >
      {isLoading ? (
        <>
          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          <span>{loadingText || "Loading..."}</span>
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default PrimaryButton;
