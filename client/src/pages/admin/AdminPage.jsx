import React from 'react';
import Navbar from '../../components/layout/Navbar';
import AdminDashboard from '../../components/admin/AdminDashboard';
import ProductForm from '../../components/admin/ProductForm';
import CategoryManager from '../../components/admin/CategoryManager';
import Footer from '../../components/layout/Footer';

export default function AdminPage() {
  const [activeTab, setActiveTab] = React.useState('dashboard');

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="bg-gray-200 p-4">
          <div className="flex space-x-4 max-w-7xl mx-auto">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-4 py-2 rounded ${
                activeTab === 'dashboard'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab('products')}
              className={`px-4 py-2 rounded ${
                activeTab === 'products'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Products
            </button>
            <button
              onClick={() => setActiveTab('categories')}
              className={`px-4 py-2 rounded ${
                activeTab === 'categories'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Categories
            </button>
          </div>
        </div>
        <div className="max-w-7xl mx-auto p-6">
          {activeTab === 'dashboard' && <AdminDashboard />}
          {activeTab === 'products' && <ProductForm onSubmit={(data) => console.log(data)} />}
          {activeTab === 'categories' && <CategoryManager />}
        </div>
      </main>
      <Footer />
    </div>
  );
}
