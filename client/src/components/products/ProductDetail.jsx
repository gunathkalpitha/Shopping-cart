import React, { useEffect, useState } from 'react';
import { useCart } from '../../hooks/useCart';

export default function ProductDetail({ productId }) {
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    // Fetch product details
    console.log('Fetching product:', productId);
  }, [productId]);

  if (!product) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <div className="grid grid-cols-2 gap-8">
        <div>
          <img src={product.image} alt={product.name} className="w-full rounded-lg" />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <p className="text-4xl font-bold text-blue-600 mb-4">${product.price}</p>
          <button
            onClick={() => addToCart(product)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
