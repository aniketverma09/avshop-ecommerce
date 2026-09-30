import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

function Cart() {
  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    totalPrice,
    totalItems,
  } = useCart();

  return (
    <div className="min-h-screen bg-black text-white pt-28 px-4 sm:px-6 pb-12">

      <h1 className="text-3xl sm:text-4xl font-bold text-center">
        Shopping Cart
      </h1>

      <p className="text-center text-gray-400 mt-3">
        Your ShopVerse Cart
      </p>

      {cart.length === 0 ? (
        <div className="text-center mt-20">

          <div className="text-6xl mb-5">
            🛒
          </div>

          <h2 className="text-2xl font-semibold">
            Your cart is empty
          </h2>

          <p className="text-gray-400 mt-2">
            Add some products to your cart.
          </p>

          <Link
            to="/products"
            className="inline-block mt-6 bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
          >
            Continue Shopping
          </Link>

        </div>
      ) : (

        <div className="max-w-6xl mx-auto mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-5">

            {cart.map((item) => (

              <div
                key={item.id}
                className="bg-zinc-900 rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row gap-5"
              >

                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full sm:w-32 h-52 sm:h-32 object-cover rounded-lg"
                />

                <div className="flex-1">

                  <h2 className="text-xl font-semibold">
                    {item.name}
                  </h2>

                  <p className="text-gray-400 mt-2">
                    ₹{item.price.toLocaleString("en-IN")}
                  </p>

                  <div className="flex items-center gap-3 mt-5">

                    <button
                      type="button"
                      onClick={() => decreaseQuantity(item.id)}
                      className="w-9 h-9 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition"
                    >
                      -
                    </button>

                    <span className="w-8 text-center font-semibold">
                      {item.quantity}
                    </span>

                    <button
                      type="button"
                      onClick={() => increaseQuantity(item.id)}
                      className="w-9 h-9 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition"
                    >
                      +
                    </button>

                  </div>

                </div>

                <div className="flex sm:flex-col justify-between items-start sm:items-end">

                  <p className="text-xl font-bold">
                    ₹{(
                      item.price * item.quantity
                    ).toLocaleString("en-IN")}
                  </p>

                  <button
                    type="button"
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-400 transition mt-3"
                  >
                    Remove
                  </button>

                </div>

              </div>

            ))}

          </div>

          {/* Order Summary */}
          <div className="bg-zinc-900 rounded-xl p-6 h-fit">

            <h2 className="text-2xl font-bold mb-6">
              Order Summary
            </h2>

            <div className="flex justify-between text-gray-400 mb-4">
              <span>Total Items</span>
              <span>{totalItems}</span>
            </div>

            <div className="flex justify-between text-gray-400 mb-5">
              <span>Subtotal</span>

              <span>
                ₹{totalPrice.toLocaleString("en-IN")}
              </span>
            </div>

            <div className="border-t border-zinc-700 pt-5 flex justify-between text-xl font-bold">

              <span>
                Total
              </span>

              <span>
                ₹{totalPrice.toLocaleString("en-IN")}
              </span>

            </div>

            {/* Checkout */}
            <Link
              to="/checkout"
              className="block w-full mt-7 bg-white text-black py-3 rounded-lg font-semibold text-center hover:bg-gray-200 transition"
            >
              Checkout
            </Link>

          </div>

        </div>
      )}

    </div>
  );
}

export default Cart;