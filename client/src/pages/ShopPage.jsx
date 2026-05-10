import React, { useState } from 'react';
import Navbar from '../components/layout/Navbar';
import Sidebar from '../components/layout/Sidebar';
import ProductGrid from '../components/products/ProductGrid';
import CategoryFilter from '../components/products/CategoryFilter';
import Footer from '../components/layout/Footer';

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex">
        <div className="w-64 bg-gray-100">
          <CategoryFilter onFilterChange={setSelectedCategory} />
        </div>
        <main className="flex-1">
          <div className="py-6 px-4">
            <h1 className="text-3xl font-bold mb-4">Shop</h1>
            <ProductGrid />
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
