import React, { useState } from 'react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    totalProducts: 0,
    totalUsers: 0,
  });

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-blue-500 text-white p-6 rounded-lg">
          <h2 className="text-lg font-semibold">Total Orders</h2>
          <p className="text-4xl font-bold">{stats.totalOrders}</p>
        </div>
        <div className="bg-green-500 text-white p-6 rounded-lg">
          <h2 className="text-lg font-semibold">Total Revenue</h2>
          <p className="text-4xl font-bold">${stats.totalRevenue}</p>
        </div>
        <div className="bg-purple-500 text-white p-6 rounded-lg">
          <h2 className="text-lg font-semibold">Total Products</h2>
          <p className="text-4xl font-bold">{stats.totalProducts}</p>
        </div>
        <div className="bg-orange-500 text-white p-6 rounded-lg">
          <h2 className="text-lg font-semibold">Total Users</h2>
          <p className="text-4xl font-bold">{stats.totalUsers}</p>
        </div>
      </div>
    </div>
  );
}
