import React from 'react';
import CartItem from './CartItem';
import CartSummary from './CartSummary';
import { useCart } from '../../hooks/useCart';

export default function CartDrawer({ isOpen, onClose }) {
  const { cart, removeFromCart, updateQuantity } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
      <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-lg flex flex-col">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-2xl font-bold">Shopping Cart</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✕</button>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          {cart?.items?.length > 0 ? (
            cart.items.map((item) => (
              <CartItem
                key={item._id}
                item={item}
                onRemove={removeFromCart}
                onUpdateQuantity={updateQuantity}
              />
            ))
          ) : (
            <p className="text-gray-500">Your cart is empty</p>
          )}
        </div>
        {cart?.items?.length > 0 && (
          <div className="border-t p-4">
            <CartSummary total={cart.total} />
            <button className="w-full bg-blue-600 text-white py-2 rounded mt-4 hover:bg-blue-700">
              Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
