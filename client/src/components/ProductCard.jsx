import { useCart } from '../context/CartContext'
import toast from 'react-hot-toast'

export default function ProductCard({ product }) {
  const { addToCart } = useCart()

  const handleAddToCart = () => {
    addToCart(product)
    toast.success(`${product.name} added to cart!`)
  }

  return (
    <div className="card">
      {/* Product Image */}
      <div className="bg-gray-200 h-48 flex items-center justify-center overflow-hidden">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover hover:scale-105 transition"
          />
        ) : (
          <span className="text-4xl">{product.emoji || '🥕'}</span>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="font-bold text-lg text-gray-800">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-2">{product.category}</p>
        <p className="text-gray-600 text-sm mb-3">{product.description}</p>

        {/* Price and Button */}
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-green-600">
            ${product.price.toFixed(2)}
          </span>
          <button
            onClick={handleAddToCart}
            className="btn-primary text-sm"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}
