export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-800 text-white mt-12">
      <div className="container-custom py-8">
        <div className="grid md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-bold mb-2">🛒 FreshCart</h3>
            <p className="text-gray-400">
              Your one-stop shop for fresh vegetables, fruits, and baked goods.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-3">Quick Links</h4>
            <ul className="text-gray-400 space-y-2">
              <li><a href="/" className="hover:text-white">Home</a></li>
              <li><a href="/shop" className="hover:text-white">Shop</a></li>
              <li><a href="/about" className="hover:text-white">About Us</a></li>
              <li><a href="/contact" className="hover:text-white">Contact</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-3">Contact Info</h4>
            <p className="text-gray-400">Email: info@freshcart.com</p>
            <p className="text-gray-400">Phone: +1 (555) 123-4567</p>
            <p className="text-gray-400">Address: 123 Fresh St, Green City</p>
          </div>
        </div>

        <hr className="my-6 border-gray-700" />
        <div className="text-center text-gray-400">
          <p>&copy; {currentYear} FreshCart. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
