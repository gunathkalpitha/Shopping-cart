import React from 'react';

export default function OrderSummary({ order }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
      <div className="space-y-4">
        <div className="flex justify-between">
          <span>Order ID:</span>
          <span className="font-semibold">{order?._id}</span>
        </div>
        <div className="flex justify-between">
          <span>Date:</span>
          <span className="font-semibold">{order?.createdAt}</span>
        </div>
        <div className="border-t pt-4">
          <h3 className="font-bold mb-2">Items:</h3>
          {order?.items?.map((item) => (
            <div key={item._id} className="flex justify-between">
              <span>{item.name} x {item.quantity}</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>
        <div className="border-t pt-4 flex justify-between text-lg font-bold">
          <span>Total:</span>
          <span>${order?.total}</span>
        </div>
      </div>
    </div>
  );
}
