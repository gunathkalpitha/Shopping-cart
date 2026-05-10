import React, { useState } from 'react';

export default function CategoryManager() {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      setCategories((prev) => [...prev, newCategory]);
      setNewCategory('');
    }
  };

  const handleDeleteCategory = (index) => {
    setCategories((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl">
      <h2 className="text-2xl font-bold mb-4">Manage Categories</h2>
      <div className="space-y-4">
        <div className="flex space-x-2">
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="Enter new category"
            className="flex-1 p-2 border rounded"
          />
          <button
            onClick={handleAddCategory}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add
          </button>
        </div>
        <div className="space-y-2">
          {categories.map((category, index) => (
            <div key={index} className="flex justify-between items-center p-2 border rounded">
              <span>{category}</span>
              <button
                onClick={() => handleDeleteCategory(index)}
                className="text-red-600 hover:text-red-800"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
