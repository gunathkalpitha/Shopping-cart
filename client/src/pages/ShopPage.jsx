import { useState, useEffect } from 'react'
import ProductCard from '../components/ProductCard'
import CategoryFilter from '../components/CategoryFilter'

const API_BASE = 'http://localhost:5000/api'

const SAMPLE_PRODUCTS = [
  {
    _id: '1',
    name: 'Carrots',
    category: 'Vegetables',
    price: 2.99,
    description: 'Fresh organic carrots',
    emoji: '🥕',
  },
  {
    _id: '2',
    name: 'Tomatoes',
    category: 'Vegetables',
    price: 3.49,
    description: 'Ripe red tomatoes',
    emoji: '🍅',
  },
  {
    _id: '3',
    name: 'Apples',
    category: 'Fruits',
    price: 4.99,
    description: 'Crisp red apples',
    emoji: '🍎',
  },
  {
    _id: '4',
    name: 'Bananas',
    category: 'Fruits',
    price: 1.99,
    description: 'Fresh yellow bananas',
    emoji: '🍌',
  },
  {
    _id: '5',
    name: 'Chocolate Cake',
    category: 'Cakes',
    price: 12.99,
    description: 'Delicious chocolate cake',
    emoji: '🍰',
  },
  {
    _id: '6',
    name: 'Vanilla Cake',
    category: 'Cakes',
    price: 11.99,
    description: 'Classic vanilla cake',
    emoji: '🎂',
  },
  {
    _id: '7',
    name: 'Chocolate Biscuits',
    category: 'Biscuits',
    price: 3.99,
    description: 'Crispy chocolate biscuits',
    emoji: '🍪',
  },
  {
    _id: '8',
    name: 'Oatmeal Cookies',
    category: 'Biscuits',
    price: 4.49,
    description: 'Healthy oatmeal cookies',
    emoji: '🥛',
  },
]

export default function ShopPage() {
  const [products, setProducts] = useState(SAMPLE_PRODUCTS)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [loading, setLoading] = useState(false)

  const categories = ['Vegetables', 'Fruits', 'Cakes', 'Biscuits']

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${API_BASE}/products`)
      if (response.ok) {
        const data = await response.json()
        setProducts(data)
      }
    } catch (error) {
      console.log('Using sample products')
      setProducts(SAMPLE_PRODUCTS)
    } finally {
      setLoading(false)
    }
  }

  const filteredProducts = selectedCategory
    ? products.filter(p => p.category === selectedCategory)
    : products

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">Shop Our Products</h1>

      {/* Category Filter */}
      <CategoryFilter
        categories={categories}
        selected={selectedCategory}
        onSelect={setSelectedCategory}
      />

      {/* Products Grid */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No products found</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}
