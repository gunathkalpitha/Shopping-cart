import React, { useState } from 'react';

export default function CategoryFilter({ onFilterChange }) {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const handleChange = (category) => {
    setSelectedCategory(category);
    onFilterChange(category);
  };

  return (
    <div className="p-4">
      <h2 className="font-bold text-lg mb-4">Filter by Category</h2>
      <div className="space-y-2">
        <label className="flex items-center">
          <input
            type="radio"
            name="category"
            value="all"
            checked={selectedCategory === 'all'}
            onChange={(e) => handleChange(e.target.value)}
            className="mr-2"
          />
          All Categories
        </label>
        <label className="flex items-center">
          <input
            type="radio"
            name="category"
            value="electronics"
            checked={selectedCategory === 'electronics'}
            onChange={(e) => handleChange(e.target.value)}
            className="mr-2"
          />
          Electronics
        </label>
        <label className="flex items-center">
          <input
            type="radio"
            name="category"
            value="clothing"
            checked={selectedCategory === 'clothing'}
            onChange={(e) => handleChange(e.target.value)}
            className="mr-2"
          />
          Clothing
        </label>
        <label className="flex items-center">
          <input
            type="radio"
            name="category"
            value="books"
            checked={selectedCategory === 'books'}
            onChange={(e) => handleChange(e.target.value)}
            className="mr-2"
          />
          Books
        </label>
      </div>
    </div>
  );
}
