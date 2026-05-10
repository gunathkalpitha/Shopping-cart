import React from 'react';

export default function CartSummary({ total }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-gray-600">
        <span>Subtotal:</span>
        <span>${total}</span>
      </div>
      <div className="flex justify-between text-gray-600">
        <span>Shipping:</span>
        <span>$5.00</span>
      </div>
      <div className="border-t pt-2 flex justify-between font-bold text-lg">
        <span>Total:</span>
        <span>${(total + 5).toFixed(2)}</span>
      </div>
    </div>
  );
}
