/**
 * @file FloatingCartWidget.jsx
 * @description Ambient notification layer tracking global transaction entities in real-time.
 * @module shared/components/UI/FloatingCartWidget
 * @author Nico Paez
 */

import { useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../../../cart/context/CartContext";

const FloatingCartWidget = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { totalItems, totalAmount } = useCart();

  // Hide widget if user is already browsing the Cart page or completing checkout
  if (totalItems === 0 || location.pathname === "/cart") return null;

  return (
    <button
      onClick={() => navigate("/cart")}
      className="fixed bottom-6 right-6 z-50 bg-slate-900 hover:bg-blue-600 text-white flex items-center gap-3 px-5 py-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 group animate-in fade-in slide-in-from-bottom-4"
    >
      <div className="relative">
        <span className="text-xl">🛒</span>
        <span className="absolute -top-2 -right-2 bg-blue-500 text-white font-extrabold text-[10px] w-5 h-5 flex items-center justify-center rounded-full border-2 border-slate-900 group-hover:bg-slate-900 transition-colors">
          {totalItems}
        </span>
      </div>
      <div className="text-left hidden sm:block border-l border-slate-700 pl-3">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
          Mi Carrito
        </p>
        <p className="text-xs font-bold text-emerald-400">
          ${totalAmount.toLocaleString()}
        </p>
      </div>
    </button>
  );
};

export default FloatingCartWidget;
