import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { useWishlist } from "../context/WishlistContext.jsx";

function ProductCard({ product }) {
  const { addToCart } = useCart();

  const {
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
  } = useWishlist();

  const inWishlist = isInWishlist(product.id);

  const handleWishlist = () => {
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5">

      {/* Image */}
      <div className="relative">

        <img
          src={product.image}
          alt={product.name}
          className="h-56 w-full object-cover sm:h-60 lg:h-64"
        />

        {/* Category */}
        <span className="absolute left-3 top-3 rounded-full bg-black/70 px-3 py-1 text-xs backdrop-blur-sm">
          {product.category}
        </span>

        {/* Rating */}
        <span className="absolute right-3 top-3 rounded-full bg-black/70 px-3 py-1 text-xs text-yellow-400 backdrop-blur-sm">
          ★ {product.rating}
        </span>

        {/* Wishlist */}
        <button
          type="button"
          onClick={handleWishlist}
          aria-label={
            inWishlist
              ? "Remove from wishlist"
              : "Add to wishlist"
          }
          className={`absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full border backdrop-blur-sm transition-colors duration-300 ${
            inWishlist
              ? "border-red-500 bg-red-500 text-white"
              : "border-white/20 bg-black/70 text-white hover:bg-white hover:text-black"
          }`}
        >
          <span className="text-xl leading-none">
            {inWishlist ? "♥" : "♡"}
          </span>
        </button>

      </div>

      {/* Content */}
      <div className="p-4 sm:p-5">

        <h2 className="text-lg font-semibold sm:text-xl">
          {product.name}
        </h2>

        <p className="mt-1 text-sm text-gray-400">
          Premium quality product
        </p>

        <p className="mt-3 text-xl font-bold sm:text-2xl">
          ₹{Number(product.price).toLocaleString("en-IN")}
        </p>

        {/* Buttons */}
        <div className="mt-4 grid grid-cols-2 gap-2">

          <Link
            to={`/products/${product.id}`}
            className="w-full rounded-lg bg-white px-3 py-2.5 text-center text-sm font-semibold text-black transition-colors duration-300 hover:bg-gray-300 sm:text-base"
          >
            View Product
          </Link>

          <button
            type="button"
            onClick={() => addToCart(product)}
            className="w-full rounded-lg bg-zinc-800 px-3 py-2.5 text-sm font-semibold text-white transition-colors duration-300 hover:bg-zinc-700 sm:text-base"
          >
            <span className="flex items-center justify-center gap-2">
              <img
                src="/icons/cart.svg"
                alt=""
                className="h-4 w-4"
              />
              Add to Cart
            </span>
          </button>

        </div>

      </div>
    </div>
  );
}

export default ProductCard;