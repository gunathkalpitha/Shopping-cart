import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useCart } from '../../hooks/useCart';
import CartIcon from '../cart/CartIcon';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { cart } = useCart();

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-blue-600">ShoppingCart</h1>
          </div>
          <div className="flex items-center space-x-4">
            <a href="/" className="hover:text-blue-600">Home</a>
            <a href="/shop" className="hover:text-blue-600">Shop</a>
            {user?.isAdmin && <a href="/admin" className="hover:text-blue-600">Admin</a>}
            <CartIcon itemCount={cart?.items?.length || 0} />
            {user ? (
              <>
                <span className="text-gray-700">{user.name}</span>
                <button onClick={logout} className="text-red-600 hover:text-red-800">Logout</button>
              </>
            ) : (
              <a href="/login" className="text-blue-600 hover:text-blue-800">Login</a>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
