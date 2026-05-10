import React from 'react';
import { useCart } from '../../hooks/useCart';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition">
      <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded mb-4" />
      <h3 className="font-bold text-lg mb-2">{product.name}</h3>
      <p className="text-gray-600 text-sm mb-4">{product.description}</p>
      <div className="flex justify-between items-center">
        <span className="text-2xl font-bold text-blue-600">${product.price}</span>
        <button
          onClick={() => addToCart(product)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
