import React from 'react';
import { useCart } from '../hooks/useCart';
import Navbar from '../components/layout/Navbar';
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';
import Footer from '../components/layout/Footer';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity } = useCart();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-2 bg-white rounded-lg shadow-md p-6">
            {cart?.items?.length > 0 ? (
              <div className="space-y-4">
                {cart.items.map((item) => (
                  <CartItem
                    key={item._id}
                    item={item}
                    onRemove={removeFromCart}
                    onUpdateQuantity={updateQuantity}
                  />
                ))}
              </div>
            ) : (
              <p className="text-gray-500">Your cart is empty</p>
            )}
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 h-fit">
            <CartSummary total={cart?.total || 0} />
            <button className="w-full bg-blue-600 text-white py-2 rounded mt-4 hover:bg-blue-700">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
