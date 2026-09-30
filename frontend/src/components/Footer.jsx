function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black text-white">
      <div className="mx-auto max-w-7xl px-5 py-10 md:px-8">

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold">
              Av<span className="text-neutral-400">Shop</span>
            </h2>

            <p className="mt-3 max-w-xs text-sm leading-6 text-gray-400">
              Discover quality products with a simple and modern shopping
              experience.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold">Quick Links</h3>

            <div className="mt-4 flex flex-col gap-3 text-sm text-gray-400">
              <a href="/" className="transition hover:text-white">
                Home
              </a>

              <a href="/products" className="transition hover:text-white">
                Products
              </a>

              <a href="/wishlist" className="transition hover:text-white">
                Wishlist
              </a>

              <a href="/cart" className="transition hover:text-white">
                Cart
              </a>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold">Categories</h3>

            <div className="mt-4 flex flex-col gap-3 text-sm text-gray-400">
              <span>Electronics</span>
              <span>Fashion</span>
              <span>Accessories</span>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold">Contact</h3>

            <div className="mt-4 flex flex-col gap-3 text-sm text-gray-400">
              <span>Email: support@avshop.com</span>
              <span>Available Online</span>
              <span>India</span>
            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-gray-500 sm:flex-row sm:items-center sm:justify-between">

          <p>
            © {new Date().getFullYear()} AvShop. All rights reserved.
          </p>

          <p>
            Built with React
          </p>

        </div>
      </div>
    </footer>
  );
}

export default Footer;