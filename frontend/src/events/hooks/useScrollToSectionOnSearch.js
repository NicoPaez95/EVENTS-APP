import { useEffect, useRef } from "react";

/**
 * Custom hook to cleanly isolate DOM-level window event subscriptions 
 * and coordinate programmatic viewport adjustments.
 * 
 * @returns {React.RefObject<HTMLElement>} The container reference to be bound to the target DOM node.
 */
export const useScrollToSectionOnSearch = () => {
    const elementRef = useRef(null);

    useEffect(() => {
        const handleSearchSubmitted = () => {
            if (elementRef.current) {
                elementRef.current.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });
            }
        };

        window.addEventListener("app:event-search-submitted", handleSearchSubmitted);
        return () => {
            window.removeEventListener("app:event-search-submitted", handleSearchSubmitted);
        };
    }, []);

    return elementRef;
};