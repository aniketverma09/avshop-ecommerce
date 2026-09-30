import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useCart } from "../context/CartContext.jsx";
import { useWishlist } from "../context/WishlistContext.jsx";

function Navbar() {
  const {
    totalItems,
    clearCart,
  } = useCart();

  const {
    wishlist,
    clearWishlist,
  } = useWishlist();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  // Check login status
  useEffect(() => {
    const checkLoginStatus = () => {
      const loggedIn =
        localStorage.getItem("avshopLoggedIn") === "true";

      let savedUser = null;

      try {
        savedUser = JSON.parse(
          localStorage.getItem("avshopUser")
        );
      } catch (error) {
        savedUser = null;
      }

      setIsLoggedIn(loggedIn);
      setUser(savedUser);
    };

    checkLoginStatus();

    // Login/logout ke baad navbar update karne ke liye
    window.addEventListener(
      "avshopAuthChanged",
      checkLoginStatus
    );

    return () => {
      window.removeEventListener(
        "avshopAuthChanged",
        checkLoginStatus
      );
    };
  }, []);

  // Logout
  const handleLogout = () => {
    // Cart clear
    clearCart();

    // Wishlist clear
    clearWishlist();

    // Login information remove
    localStorage.removeItem("avshopLoggedIn");
    localStorage.removeItem("avshopUser");

    // Navbar state update
    setIsLoggedIn(false);
    setUser(null);
    setMenuOpen(false);

    // Baaki components ko bhi batana
    window.dispatchEvent(
      new Event("avshopAuthChanged")
    );
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 z-50 w-full border-b border-white/10 bg-black/70 backdrop-blur-xl">
      <nav className="mx-auto max-w-7xl px-5 py-4 md:px-8">

        {/* Main Navbar */}
        <div className="flex items-center justify-between">

          {/* Logo */}
          <Link
            to="/"
            onClick={closeMenu}
            className="text-2xl font-bold tracking-tight"
          >
            Av<span className="text-neutral-400">Shop</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 md:flex">

            {/* Home */}
            <Link
              to="/"
              className="text-sm text-white transition hover:text-neutral-400"
            >
              Home
            </Link>

            {/* Products */}
            <Link
              to="/products"
              className="text-sm text-neutral-400 transition hover:text-white"
            >
              Products
            </Link>

            {/* Categories */}
            <a
              href="/products#categories"
              className="text-sm text-neutral-400 transition hover:text-white"
            >
              Categories
            </a>

          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">

            {/* Login / User */}
            {isLoggedIn && user ? (
              <div className="hidden items-center gap-3 sm:flex">

                <span className="text-sm text-gray-300">
                  Hi, {user.name}
                </span>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="rounded-full border border-white/20 px-5 py-2 text-sm transition hover:bg-white hover:text-black"
                >
                  Logout
                </button>

              </div>
            ) : (
              <Link
                to="/login"
                className="hidden rounded-full border border-white/20 px-5 py-2 text-sm transition hover:bg-white hover:text-black sm:block"
              >
                Login
              </Link>
            )}

            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="group relative flex h-10 w-10 items-center justify-center rounded-full border border-white/15 transition duration-300 hover:bg-white"
              aria-label="Wishlist"
            >
              <span
                className={`text-xl leading-none transition duration-300 ${
                  wishlist.length > 0
                    ? "text-red-500"
                    : "text-white group-hover:text-black"
                }`}
              >
                ♥
              </span>

              {wishlist.length > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white shadow-lg shadow-red-500/40">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link
              to="/cart"
              className="group relative flex h-10 w-10 items-center justify-center rounded-full border border-white/15 transition duration-300 hover:bg-white"
              aria-label="Cart"
            >
              <img
                src="/icons/cart.svg"
                alt="Cart"
                className="h-5 w-5 transition duration-300 group-hover:brightness-0"
              />

              {totalItems > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white shadow-lg shadow-red-500/40">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 md:hidden"
              aria-label="Toggle menu"
            >
              <span className="text-xl">
                {menuOpen ? "✕" : "☰"}
              </span>
            </button>

          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="mt-4 border-t border-white/10 pt-4 md:hidden">

            <div className="flex flex-col gap-2">

              {/* Home */}
              <Link
                to="/"
                onClick={closeMenu}
                className="rounded-lg px-4 py-3 text-sm text-white transition hover:bg-white/10"
              >
                Home
              </Link>

              {/* Products */}
              <Link
                to="/products"
                onClick={closeMenu}
                className="rounded-lg px-4 py-3 text-sm text-gray-300 transition hover:bg-white/10 hover:text-white"
              >
                Products
              </Link>

              {/* Categories */}
              <a
                href="/products#categories"
                onClick={closeMenu}
                className="rounded-lg px-4 py-3 text-sm text-gray-300 transition hover:bg-white/10 hover:text-white"
              >
                Categories
              </a>

              {/* Wishlist */}
              <Link
                to="/wishlist"
                onClick={closeMenu}
                className="flex items-center justify-between rounded-lg px-4 py-3 text-sm text-gray-300 transition hover:bg-white/10 hover:text-white"
              >
                <span>Wishlist</span>

                {wishlist.length > 0 && (
                  <span className="rounded-full bg-red-500 px-2 py-0.5 text-xs font-bold text-white">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              {/* Logged In User */}
              {isLoggedIn && user ? (
                <>
                  <div className="mt-2 border-t border-white/10 px-4 pt-3">
                    <p className="text-sm text-gray-300">
                      Hi, {user.name}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full rounded-lg px-4 py-3 text-left text-sm text-red-400 transition hover:bg-white/10"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  onClick={closeMenu}
                  className="rounded-lg px-4 py-3 text-sm text-gray-300 transition hover:bg-white/10 hover:text-white"
                >
                  Login
                </Link>
              )}

            </div>
          </div>
        )}

      </nav>
    </header>
  );
}

export default Navbar;