/**
 * @file CartList.jsx
 * @description Presentational layout tree rendering itemized cart lists and operational cost summaries.
 * @module components/user/Cart/CartList
 * @author Nico Paez
 */

import React from "react";
import PrimaryButton from "shared/components/UI/PrimaryButton"; // 1. IMPORTACIÓN ATÓMICA

const CartList = ({
  items,
  totalAmount,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  onExplore,
}) => {
  if (items.length === 0) {
    return (
      <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
        <p className="text-slate-400 text-lg italic">
          Tu carrito de compras está vacío.
        </p>
        {/* 2. OPTIMIZACIÓN EN EL EMPTY STATE */}
        <PrimaryButton
          onClick={onExplore}
          className="inline-block mt-4 text-sm py-3 px-6 rounded-2xl"
        >
          Explorar Experiencias →
        </PrimaryButton>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
      {/* Items Stream */}
      <div className="lg:col-span-2 space-y-4">
        {items.map(({ event, quantity }) => (
          <div
            key={event.id}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-white border border-slate-100 rounded-2xl shadow-sm gap-4 hover:border-slate-200 transition-all"
          >
            <div className="flex items-center gap-4">
              <img
                src={event.image || "/api/placeholder/100/100"}
                alt={event.title}
                className="w-16 h-16 object-cover rounded-xl bg-slate-50 flex-shrink-0"
              />
              <div>
                <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                  {event.title}
                </h3>
                <p className="text-xs text-slate-400 font-medium">
                  {event.venue?.name} • {event.venue?.city}
                </p>
                <p className="text-xs font-bold text-blue-600 mt-1">
                  ${event.price} por ticket
                </p>
              </div>
            </div>

            {/* Quantity Controls & Deletion Pipeline */}
            <div className="flex items-center justify-between w-full sm:w-auto sm:gap-6 border-t sm:border-t-0 pt-3 sm:pt-0">
              <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50 p-1">
                <button
                  onClick={() => onUpdateQuantity(event.id, quantity - 1)}
                  className="w-8 h-8 flex items-center justify-center font-bold text-slate-600 hover:bg-white rounded-lg transition-colors"
                >
                  -
                </button>
                <span className="w-10 text-center font-bold text-sm text-slate-800">
                  {quantity}
                </span>
                <button
                  onClick={() => onUpdateQuantity(event.id, quantity + 1)}
                  className="w-8 h-8 flex items-center justify-center font-bold text-slate-600 hover:bg-white rounded-lg transition-colors"
                >
                  +
                </button>
              </div>

              <div className="flex items-center gap-4">
                <span className="font-bold text-slate-900 text-sm min-w-[70px] text-right">
                  ${(event.price * quantity).toLocaleString()}
                </span>
                <button
                  onClick={() => onRemoveItem(event.id)}
                  className="text-slate-300 hover:text-red-500 p-2 text-sm transition-colors"
                  aria-label="Remove item"
                >
                  ✕
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Transaction Value Breakdown Card */}
      <div className="lg:col-span-1 bg-slate-50 border border-slate-100 rounded-3xl p-6 space-y-6">
        <h3 className="font-bold text-slate-900 text-lg tracking-tight">
          Resumen de Compra
        </h3>

        <div className="space-y-3 text-sm font-medium border-b border-slate-200 pb-4">
          <div className="flex justify-between text-slate-500">
            <span>Subtotal Items</span>
            <span>${totalAmount.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-slate-500">
            <span>Service Charge (Simulated)</span>
            <span className="text-emerald-600 font-semibold">FREE</span>
          </div>
        </div>

        <div className="flex justify-between items-baseline">
          <span className="font-bold text-slate-900">Total Orden</span>
          <span className="text-2xl font-black text-slate-900">
            ${totalAmount.toLocaleString()}
          </span>
        </div>

        {/* 3. OPTIMIZACIÓN EN EL EMBUDO DE CHECKOUT */}
        <PrimaryButton
          onClick={onCheckout}
          className="w-full py-4 rounded-2xl tracking-wide shadow-md"
        >
          Proceder al Pago
        </PrimaryButton>
      </div>
    </div>
  );
};

export default CartList;
