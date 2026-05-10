import React from 'react';

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-100 p-4">
      <h2 className="font-bold text-lg mb-4">Categories</h2>
      <ul className="space-y-2">
        <li><a href="#" className="text-gray-700 hover:text-blue-600">Electronics</a></li>
        <li><a href="#" className="text-gray-700 hover:text-blue-600">Clothing</a></li>
        <li><a href="#" className="text-gray-700 hover:text-blue-600">Books</a></li>
        <li><a href="#" className="text-gray-700 hover:text-blue-600">Home & Garden</a></li>
        <li><a href="#" className="text-gray-700 hover:text-blue-600">Sports</a></li>
      </ul>
    </aside>
  );
}
