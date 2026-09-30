import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { useWishlist } from "../context/WishlistContext.jsx";

function Wishlist() {
  const {
    wishlist,
    removeFromWishlist,
  } = useWishlist();

  const { addToCart } = useCart();

  return (
    <main className="min-h-screen bg-black text-white pt-28 px-4 sm:px-6 lg:px-10 pb-12">

      <div className="max-w-6xl mx-auto">

        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            My Wishlist
          </h1>

          <p className="text-gray-400 mt-2">
            {wishlist.length} saved product
            {wishlist.length !== 1 ? "s" : ""}
          </p>
        </div>

        {wishlist.length === 0 ? (
          <div className="text-center mt-20">

            <div className="text-6xl">
              ♡
            </div>

            <h2 className="text-2xl font-semibold mt-5">
              Your Wishlist is Empty
            </h2>

            <p className="text-gray-400 mt-2">
              Add products from the Products page.
            </p>

            <Link
              to="/products"
              className="inline-block mt-6 bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
            >
              Explore Products
            </Link>

          </div>
        ) : (

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

            {wishlist.map((product) => (
              <div
                key={product.id}
                className="bg-white/5 border border-white/10 rounded-xl overflow-hidden"
              >

                <div className="relative">

                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-60 object-cover"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      removeFromWishlist(product.id)
                    }
                    className="absolute top-3 right-3 h-10 w-10 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition"
                  >
                    ♥
                  </button>

                </div>

                <div className="p-5">

                  <p className="text-gray-400 text-sm">
                    {product.category}
                  </p>

                  <h2 className="text-xl font-semibold mt-1">
                    {product.name}
                  </h2>

                  <p className="text-2xl font-bold mt-3">
                    ₹{Number(product.price).toLocaleString("en-IN")}
                  </p>

                  <div className="grid grid-cols-2 gap-2 mt-5">

                    <Link
                      to={`/products/${product.id}`}
                      className="text-center bg-white text-black py-2.5 rounded-lg font-semibold hover:bg-gray-200 transition"
                    >
                      View
                    </Link>

                    <button
                      type="button"
                      onClick={() => addToCart(product)}
                      className="bg-zinc-800 text-white py-2.5 rounded-lg font-semibold hover:bg-zinc-700 transition"
                    >
                      Add to Cart
                    </button>

                  </div>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>

    </main>
  );
}

export default Wishlist;