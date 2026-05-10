import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useCart } from '../context/CartContext'

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, getTotal, clearCart } = useCart()

  if (cart.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-2xl mb-4">Your cart is empty! 🛒</p>
        <Link to="/shop" className="btn-primary">
          Continue Shopping
        </Link>
      </div>
    )
  }

  const handleClearCart = () => {
    if (window.confirm('Clear all items from cart?')) {
      clearCart()
      toast.success('Cart cleared!')
    }
  }

  return (
    <div className="grid md:grid-cols-3 gap-8">
      {/* Cart Items */}
      <div className="md:col-span-2">
        <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
        <div className="space-y-4">
          {cart.map(item => (
            <div key={item._id} className="card p-4 flex items-center justify-between">
              <div className="flex items-center gap-4 flex-1">
                <span className="text-4xl">{item.emoji || '🛍️'}</span>
                <div className="flex-1">
                  <h3 className="font-bold text-lg">{item.name}</h3>
                  <p className="text-gray-600">${item.price.toFixed(2)} each</p>
                </div>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => updateQuantity(item._id, item.quantity - 1)}
                  className="btn-secondary w-10 h-10 flex items-center justify-center"
                >
                  −
                </button>
                <span className="font-bold text-lg w-8 text-center">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item._id, item.quantity + 1)}
                  className="btn-secondary w-10 h-10 flex items-center justify-center"
                >
                  +
                </button>
              </div>

              {/* Price */}
              <div className="text-right ml-4">
                <p className="font-bold text-lg text-green-600">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>

              {/* Remove Button */}
              <button
                onClick={() => removeFromCart(item._id)}
                className="btn-danger ml-4"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Order Summary */}
      <div>
        <div className="card p-6 sticky top-24">
          <h2 className="text-2xl font-bold mb-4">Order Summary</h2>

          <div className="space-y-3 mb-6 border-b pb-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-bold">${getTotal().toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="font-bold">Free</span>
            </div>
            <div className="flex justify-between">
              <span>Tax</span>
              <span className="font-bold">${(getTotal() * 0.1).toFixed(2)}</span>
            </div>
          </div>

          <div className="flex justify-between mb-6 text-xl">
            <span className="font-bold">Total:</span>
            <span className="font-bold text-green-600">
              ${(getTotal() * 1.1).toFixed(2)}
            </span>
          </div>

          <Link to="/checkout" className="btn-primary w-full block text-center mb-3">
            Proceed to Checkout
          </Link>

          <button
            onClick={handleClearCart}
            className="btn-secondary w-full"
          >
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  )
}
