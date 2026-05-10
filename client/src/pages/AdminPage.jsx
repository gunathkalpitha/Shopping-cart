import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'

const API_BASE = 'http://localhost:5000/api'

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('products')
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [stats, setStats] = useState({ totalProducts: 0, totalCategories: 0, totalOrders: 0 })
  
  // Product form state
  const [productForm, setProductForm] = useState({
    name: '',
    category: 'Vegetables',
    price: '',
    description: '',
    image: '',
    emoji: '',
  })
  const [editingProductId, setEditingProductId] = useState(null)
  const [loadingProduct, setLoadingProduct] = useState(false)

  // Category form state
  const [categoryForm, setCategoryForm] = useState({
    name: '',
    emoji: '',
    description: '',
  })
  const [editingCategoryId, setEditingCategoryId] = useState(null)
  const [loadingCategory, setLoadingCategory] = useState(false)

  const defaultCategories = ['Vegetables', 'Fruits', 'Cakes', 'Biscuits']

  // Fetch data on mount
  useEffect(() => {
    fetchProducts()
    fetchCategories()
    updateStats()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${API_BASE}/products`)
      if (response.ok) {
        const data = await response.json()
        setProducts(data)
      }
    } catch (error) {
      console.error('Error fetching products:', error)
      toast.error('Failed to load products')
    }
  }

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${API_BASE}/categories`)
      if (response.ok) {
        const data = await response.json()
        setCategories(data)
      }
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  const updateStats = async () => {
    try {
      const productsRes = await fetch(`${API_BASE}/products`)
      const categoriesRes = await fetch(`${API_BASE}/categories`)
      
      if (productsRes.ok && categoriesRes.ok) {
        const productsData = await productsRes.json()
        const categoriesData = await categoriesRes.json()
        
        setStats({
          totalProducts: productsData.length,
          totalCategories: categoriesData.length || defaultCategories.length,
          totalOrders: 0, // TODO: fetch from orders API
        })
      }
    } catch (error) {
      console.error('Error updating stats:', error)
    }
  }

  // ========== PRODUCT HANDLERS ==========
  const handleProductSubmit = async (e) => {
    e.preventDefault()
    if (!productForm.name || !productForm.price) {
      toast.error('Please fill all required fields')
      return
    }

    setLoadingProduct(true)

    try {
      const url = editingProductId
        ? `${API_BASE}/products/${editingProductId}`
        : `${API_BASE}/products`

      const method = editingProductId ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(productForm),
      })

      if (response.ok) {
        toast.success(editingProductId ? 'Product updated!' : 'Product added!')
        setProductForm({ name: '', category: 'Vegetables', price: '', description: '', image: '', emoji: '' })
        setEditingProductId(null)
        fetchProducts()
        updateStats()
      } else {
        toast.error('Failed to save product')
      }
    } catch (error) {
      console.error('Error:', error)
      toast.error('Error saving product')
    } finally {
      setLoadingProduct(false)
    }
  }

  const handleEditProduct = (product) => {
    setProductForm(product)
    setEditingProductId(product._id)
  }

  const handleDeleteProduct = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return

    try {
      const response = await fetch(`${API_BASE}/products/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      })

      if (response.ok) {
        toast.success('Product deleted!')
        fetchProducts()
        updateStats()
      } else {
        toast.error('Failed to delete product')
      }
    } catch (error) {
      console.error('Error:', error)
      toast.error('Error deleting product')
    }
  }

  // ========== CATEGORY HANDLERS ==========
  const handleCategorySubmit = async (e) => {
    e.preventDefault()
    if (!categoryForm.name) {
      toast.error('Category name is required')
      return
    }

    setLoadingCategory(true)

    try {
      const url = editingCategoryId
        ? `${API_BASE}/categories/${editingCategoryId}`
        : `${API_BASE}/categories`

      const method = editingCategoryId ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(categoryForm),
      })

      if (response.ok) {
        toast.success(editingCategoryId ? 'Category updated!' : 'Category added!')
        setCategoryForm({ name: '', emoji: '', description: '' })
        setEditingCategoryId(null)
        fetchCategories()
        updateStats()
      } else {
        toast.error('Failed to save category')
      }
    } catch (error) {
      console.error('Error:', error)
      toast.error('Error saving category')
    } finally {
      setLoadingCategory(false)
    }
  }

  const handleEditCategory = (category) => {
    setCategoryForm(category)
    setEditingCategoryId(category._id)
  }

  const handleDeleteCategory = async (id) => {
    if (!window.confirm('Are you sure you want to delete this category?')) return

    try {
      const response = await fetch(`${API_BASE}/categories/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      })

      if (response.ok) {
        toast.success('Category deleted!')
        fetchCategories()
        updateStats()
      } else {
        toast.error('Failed to delete category')
      }
    } catch (error) {
      console.error('Error:', error)
      toast.error('Error deleting category')
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Manage products, categories, and more</p>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="card p-6 border-l-4 border-green-600">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Products</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalProducts}</p>
            </div>
            <span className="text-4xl">📦</span>
          </div>
        </div>

        <div className="card p-6 border-l-4 border-blue-600">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Categories</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalCategories}</p>
            </div>
            <span className="text-4xl">🏷️</span>
          </div>
        </div>

        <div className="card p-6 border-l-4 border-yellow-600">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Orders</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalOrders}</p>
            </div>
            <span className="text-4xl">📋</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('products')}
          className={`px-6 py-3 font-semibold border-b-2 transition-colors ${
            activeTab === 'products'
              ? 'border-green-600 text-green-600'
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          📦 Products
        </button>
        <button
          onClick={() => setActiveTab('categories')}
          className={`px-6 py-3 font-semibold border-b-2 transition-colors ${
            activeTab === 'categories'
              ? 'border-green-600 text-green-600'
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          🏷️ Categories
        </button>
      </div>

      {/* ========== PRODUCTS TAB ========== */}
      {activeTab === 'products' && (
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Product Form */}
          <div>
            <div className="card p-6">
              <h2 className="text-2xl font-bold mb-6">
                {editingProductId ? '✏️ Edit Product' : '➕ Add Product'}
              </h2>

              <form onSubmit={handleProductSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Product Name *</label>
                  <input
                    type="text"
                    value={productForm.name}
                    onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="e.g., Fresh Carrots"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Category *</label>
                  <select
                    value={productForm.category}
                    onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    {defaultCategories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Price ($) *</label>
                  <input
                    type="number"
                    step="0.01"
                    value={productForm.price}
                    onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="0.00"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                  <textarea
                    value={productForm.description}
                    onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2 h-24 focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                    placeholder="Product description..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Image URL</label>
                  <input
                    type="url"
                    value={productForm.image}
                    onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="https://..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Emoji</label>
                  <input
                    type="text"
                    maxLength="2"
                    value={productForm.emoji}
                    onChange={(e) => setProductForm({ ...productForm, emoji: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent text-center text-2xl"
                    placeholder="🥕"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loadingProduct}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition-colors disabled:opacity-50"
                >
                  {loadingProduct ? 'Saving...' : editingProductId ? 'Update Product' : 'Add Product'}
                </button>

                {editingProductId && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingProductId(null)
                      setProductForm({ name: '', category: 'Vegetables', price: '', description: '', image: '', emoji: '' })
                    }}
                    className="w-full bg-gray-300 hover:bg-gray-400 text-gray-900 font-semibold py-2 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                )}
              </form>
            </div>
          </div>

          {/* Products List */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-6">All Products ({products.length})</h2>
            <div className="space-y-4 max-h-[600px] overflow-y-auto">
              {products.length === 0 ? (
                <div className="card p-8 text-center text-gray-500">
                  <p className="text-lg">No products yet</p>
                  <p className="text-sm">Add your first product using the form</p>
                </div>
              ) : (
                products.map(product => (
                  <div key={product._id} className="card p-4 hover:shadow-lg transition-shadow">
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {product.emoji && <span className="text-2xl">{product.emoji}</span>}
                          <h3 className="font-bold text-lg">{product.name}</h3>
                        </div>
                        <div className="flex gap-4 text-sm text-gray-600 mb-2">
                          <span className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded">
                            {product.category}
                          </span>
                          <span className="font-semibold text-green-600">${parseFloat(product.price).toFixed(2)}</span>
                        </div>
                        {product.description && (
                          <p className="text-gray-700 text-sm">{product.description}</p>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditProduct(product)}
                          className="btn-primary text-sm px-3 py-2 whitespace-nowrap"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product._id)}
                          className="btn-danger text-sm px-3 py-2 whitespace-nowrap"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* ========== CATEGORIES TAB ========== */}
      {activeTab === 'categories' && (
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Category Form */}
          <div>
            <div className="card p-6">
              <h2 className="text-2xl font-bold mb-6">
                {editingCategoryId ? '✏️ Edit Category' : '➕ Add Category'}
              </h2>

              <form onSubmit={handleCategorySubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Category Name *</label>
                  <input
                    type="text"
                    value={categoryForm.name}
                    onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="e.g., Organic Vegetables"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Emoji</label>
                  <input
                    type="text"
                    maxLength="2"
                    value={categoryForm.emoji}
                    onChange={(e) => setCategoryForm({ ...categoryForm, emoji: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent text-center text-2xl"
                    placeholder="🥬"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                  <textarea
                    value={categoryForm.description}
                    onChange={(e) => setCategoryForm({ ...categoryForm, description: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2 h-24 focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                    placeholder="Category description..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={loadingCategory}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition-colors disabled:opacity-50"
                >
                  {loadingCategory ? 'Saving...' : editingCategoryId ? 'Update Category' : 'Add Category'}
                </button>

                {editingCategoryId && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingCategoryId(null)
                      setCategoryForm({ name: '', emoji: '', description: '' })
                    }}
                    className="w-full bg-gray-300 hover:bg-gray-400 text-gray-900 font-semibold py-2 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                )}
              </form>

              {/* Default Categories Info */}
              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm font-semibold text-blue-900 mb-2">📌 Default Categories:</p>
                <ul className="text-sm text-blue-800 space-y-1">
                  {defaultCategories.map(cat => (
                    <li key={cat}>• {cat}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Categories List */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-6">All Categories ({categories.length || defaultCategories.length})</h2>
            <div className="grid gap-4">
              {categories.length === 0 && (
                <div className="col-span-full">
                  <div className="card p-8 text-center text-gray-500">
                    <p className="text-lg">Using default categories</p>
                    <p className="text-sm">Create custom categories to organize products</p>
                  </div>
                </div>
              )}
              {categories.map(category => (
                <div key={category._id} className="card p-4 hover:shadow-lg transition-shadow">
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {category.emoji && <span className="text-2xl">{category.emoji}</span>}
                        <h3 className="font-bold text-lg">{category.name}</h3>
                      </div>
                      {category.description && (
                        <p className="text-gray-700 text-sm">{category.description}</p>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditCategory(category)}
                        className="btn-primary text-sm px-3 py-2 whitespace-nowrap"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteCategory(category._id)}
                        className="btn-danger text-sm px-3 py-2 whitespace-nowrap"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
