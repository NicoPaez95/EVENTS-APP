/**
 * @file CartContext.jsx
 * @description Global state provider for managing multi-ticket commercial selections,
 * operational quantity boundaries, session inventory constraints, and aggregate pricing computations.
 * @module cart/context/CartContext
 * @author Nico Paez
 */

import {
  createContext,
  useContext,
  useState,
  useMemo,
  useEffect,
  useCallback,
} from "react";

const CartContext = createContext(null);

const MAX_TICKETS_PER_EVENT = 5;

/**
 * CartProvider Component.
 * @component
 * @param {Object} props - Subtree children nodes.
 * @param props.children
 * @returns {React.JSX.Element} The context wrapper layer.
 */
export const CartProvider = ({ children }) => {
  // Structure: { [eventId]: { event: EventObject, quantity: number } }
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("app_cart_session");
    return savedCart ? JSON.parse(savedCart) : {};
  });

  useEffect(() => {
    localStorage.setItem("app_cart_session", JSON.stringify(cartItems));
  }, [cartItems]);

  /**
   * Adds an event experience or increments its operational quantity inside the cart.
   * @function
   * @param {Object} event - The target event resource metadata.
   * @returns {boolean} True if operation succeeded, false if capped by limits.
   */
  const addToCart = useCallback((event) => {
    let success = true;
    setCartItems((prev) => {
      const existing = prev[event.id];
      const currentQty = existing ? existing.quantity : 0;

      if (currentQty >= MAX_TICKETS_PER_EVENT) {
        success = false;
        return prev;
      }

      return {
        ...prev,
        [event.id]: {
          event,
          quantity: currentQty + 1,
        },
      };
    });
    return success;
  }, []);

  /**
   * Updates the exact ticket volume for a specific catalog key.
   * @function
   * @param {string|number} eventId - Target signature.
   * @param {number} quantity - New target value.
   */
  const updateQuantity = useCallback((eventId, quantity) => {
    setCartItems((prev) => {
      if (!prev[eventId]) return prev;
      if (quantity <= 0) {
        const { [eventId]: _, ...rest } = prev;
        return rest;
      }

      const cappedQty = Math.min(quantity, MAX_TICKETS_PER_EVENT);
      return {
        ...prev,
        [eventId]: { ...prev[eventId], quantity: cappedQty },
      };
    });
  }, []);

  /**
   * Drops an element entirely from the active commercial allocation map.
   * @function
   * @param {string|number} eventId - Unique structural key.
   */
  const removeFromCart = useCallback((eventId) => {
    setCartItems((prev) => {
      const { [eventId]: _, ...rest } = prev;
      return rest;
    });
  }, []);

  /** Flushes all parameters to clean up session memory states. */
  const clearCart = useCallback(() => {
    setCartItems({});
  }, []);

  /** Checks if an item is currently present in the cart array keys. */
  const isInCart = useCallback(
    (eventId) => {
      return !!cartItems[eventId];
    },
    [cartItems]
  );

  /** Compute operational sums and count metrics */
  const cartSummary = useMemo(() => {
    const itemsArray = Object.values(cartItems);
    const totalItems = itemsArray.reduce((sum, item) => sum + item.quantity, 0);
    const totalAmount = itemsArray.reduce(
      (sum, item) => sum + (item.event.price || 0) * item.quantity,
      0
    );

    return {
      items: itemsArray,
      totalItems,
      totalAmount,
    };
  }, [cartItems]);

  /**
   * Compound Value Memoization Layer.
   * Guarantees reference equality to prevent down-tree visual rendering cascading.
   */
  const value = useMemo(
    () => ({
      cartItems,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      isInCart,
      ...cartSummary,
    }),
    [
      cartItems,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      isInCart,
      cartSummary,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

/**
 * Hook to access commercial e-commerce state modifiers.
 * @function
 * @returns {Object} Context actions and state mappings.
 */
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error(
      "useCart must be executed within a valid CartProvider subtree."
    );
  }
  return context;
};
