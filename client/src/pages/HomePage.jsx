import React from 'react';
import Navbar from '../components/layout/Navbar';
import Sidebar from '../components/layout/Sidebar';
import ProductGrid from '../components/products/ProductGrid';
import Footer from '../components/layout/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex">
        <Sidebar />
        <main className="flex-1">
          <div className="bg-blue-600 text-white py-12 px-4">
            <h1 className="text-4xl font-bold">Welcome to ShoppingCart</h1>
            <p className="text-xl mt-2">Your one-stop shop for everything</p>
          </div>
          <ProductGrid />
        </main>
      </div>
      <Footer />
    </div>
  );
}
