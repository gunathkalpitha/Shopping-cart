import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

const API_BASE = 'http://localhost:5000/api'

export default function CheckoutPage() {
  const { user } = useAuth()
  const { cart, getTotal, clearCart } = useCart()
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    address: '',
    city: '',
    zipCode: '',
  })

  if (cart.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-2xl mb-4">Nothing to checkout 🛒</p>
        <Link to="/shop" className="btn-primary">
          Continue Shopping
        </Link>
      </div>
    )
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch(`${API_BASE}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user?._id,
          items: cart,
          totalPrice: getTotal() * 1.1,
          shippingAddress: formData,
          status: 'pending',
        }),
      })

      if (response.ok) {
        toast.success('Order placed successfully!')
        clearCart()
        setTimeout(() => navigate('/'), 2000)
      } else {
        toast.error('Failed to place order')
      }
    } catch (error) {
      toast.error('Error placing order')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {/* Checkout Form */}
      <div>
        <h1 className="text-3xl font-bold mb-6">Checkout</h1>
        <form onSubmit={handleSubmit} className="card p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border rounded-lg p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              readOnly
              className="w-full border rounded-lg p-2 bg-gray-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="w-full border rounded-lg p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
              className="w-full border rounded-lg p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">ZIP Code</label>
            <input
              type="text"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              required
              className="w-full border rounded-lg p-2"
            />
          </div>
          <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-sm">
            💳 Cash on Delivery available
          </div>
          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full disabled:opacity-50"
          >
            {loading ? 'Placing Order...' : 'Place Order'}
          </button>
        </form>
      </div>

      {/* Order Summary */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
        <div className="card p-6 sticky top-24">
          <div className="space-y-4 mb-6">
            {cart.map(item => (
              <div key={item._id} className="flex justify-between text-sm">
                <span>{item.name} × {item.quantity}</span>
                <span className="font-bold">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="space-y-2 border-t pt-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${getTotal().toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between">
              <span>Tax (10%)</span>
              <span>${(getTotal() * 0.1).toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lg font-bold text-green-600 border-t pt-2 mt-2">
              <span>Total</span>
              <span>${(getTotal() * 1.1).toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
