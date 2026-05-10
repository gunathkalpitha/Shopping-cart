import React from 'react';

export default function CartItem({ item, onRemove, onUpdateQuantity }) {
  return (
    <div className="flex justify-between items-center p-4 border-b">
      <div>
        <h3 className="font-semibold">{item.name}</h3>
        <p className="text-gray-600">${item.price}</p>
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={() => onUpdateQuantity(item._id, item.quantity - 1)}
          className="px-2 py-1 bg-gray-200 rounded"
        >
          −
        </button>
        <span>{item.quantity}</span>
        <button
          onClick={() => onUpdateQuantity(item._id, item.quantity + 1)}
          className="px-2 py-1 bg-gray-200 rounded"
        >
          +
        </button>
        <button
          onClick={() => onRemove(item._id)}
          className="ml-2 text-red-600 hover:text-red-800"
        >
          Remove
        </button>
      </div>
    </div>
  );
}
