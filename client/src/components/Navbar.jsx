import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'

export default function Navbar() {
  const { user, logout } = useAuth()
  const { cart } = useCart()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className="bg-green-600 text-white shadow-lg">
      <div className="container-custom">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold">
            🛒 FreshCart
          </Link>

          {/* Navigation Links */}
          <div className="flex gap-6 items-center">
            <Link to="/" className="hover:text-green-100 transition">Home</Link>
            <Link to="/shop" className="hover:text-green-100 transition">Shop</Link>
            
            {user?.role === 'admin' && (
              <Link to="/admin" className="hover:text-green-100 transition">Admin</Link>
            )}

            {/* Cart Icon */}
            <Link to="/cart" className="relative hover:text-green-100 transition">
              🛒 Cart
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </Link>

            {/* User Menu */}
            {user ? (
              <div className="flex gap-4 items-center">
                <span className="text-sm">{user.name}</span>
                <button
                  onClick={handleLogout}
                  className="btn-secondary text-sm px-3 py-1"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/login" className="btn-primary text-sm px-3 py-1">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
