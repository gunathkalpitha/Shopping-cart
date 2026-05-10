import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg p-12 text-center">
        <h1 className="text-5xl font-bold mb-4">Welcome to FreshCart 🛒</h1>
        <p className="text-xl mb-6">
          Get fresh vegetables, fruits, and baked goods delivered to your door!
        </p>
        <Link to="/shop" className="btn-primary text-lg">
          Start Shopping
        </Link>
      </section>

      {/* Features Section */}
      <section>
        <h2 className="text-3xl font-bold mb-8">Why Choose FreshCart?</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="card p-6 text-center">
            <div className="text-4xl mb-4">🥗</div>
            <h3 className="font-bold text-lg mb-2">Fresh Products</h3>
            <p className="text-gray-600">
              All our products are sourced fresh daily from local farms.
            </p>
          </div>
          <div className="card p-6 text-center">
            <div className="text-4xl mb-4">🚚</div>
            <h3 className="font-bold text-lg mb-2">Fast Delivery</h3>
            <p className="text-gray-600">
              Quick and reliable delivery to your doorstep.
            </p>
          </div>
          <div className="card p-6 text-center">
            <div className="text-4xl mb-4">🔒</div>
            <h3 className="font-bold text-lg mb-2">Secure Checkout</h3>
            <p className="text-gray-600">
              Safe and secure payment options for your peace of mind.
            </p>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section>
        <h2 className="text-3xl font-bold mb-8">Our Categories</h2>
        <div className="grid md:grid-cols-4 gap-6">
          {[
            { name: 'Vegetables', emoji: '🥕', color: 'from-green-400 to-green-600' },
            { name: 'Fruits', emoji: '🍎', color: 'from-red-400 to-red-600' },
            { name: 'Cakes', emoji: '🎂', color: 'from-pink-400 to-pink-600' },
            { name: 'Biscuits', emoji: '🍪', color: 'from-yellow-400 to-yellow-600' },
          ].map(category => (
            <Link
              key={category.name}
              to="/shop"
              className={`card p-8 text-center bg-gradient-to-br ${category.color} text-white hover:scale-105 transition`}
            >
              <div className="text-5xl mb-4">{category.emoji}</div>
              <h3 className="font-bold text-xl">{category.name}</h3>
            </Link>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gray-100 rounded-lg p-12 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Shop?</h2>
        <p className="text-gray-600 mb-6 text-lg">
          Browse our wide selection of fresh products and save big today!
        </p>
        <Link to="/shop" className="btn-primary text-lg">
          Shop Now
        </Link>
      </section>
    </div>
  )
}
