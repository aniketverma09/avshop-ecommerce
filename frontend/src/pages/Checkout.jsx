import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

const API_URL = "https://avshop-ecommerce.onrender.com/api/orders";
function Checkout() {
  const navigate = useNavigate();

  const {
    cart,
    totalPrice,
    removeFromCart,
    decreaseQuantity,
    increaseQuantity,
    clearCart,
  } = useCart();

  let savedUser = null;

  try {
    savedUser = JSON.parse(
      localStorage.getItem("avshopUser") || "null"
    );
  } catch (error) {
    savedUser = null;
  }

  const [form, setForm] = useState({
    name: savedUser?.name || "",
    email: savedUser?.email || "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    setError("");
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    setError("");

    if (cart.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    try {
      setLoading(true);

      const token =
        localStorage.getItem("avshopToken");

      const userId =
        savedUser?.id ||
        savedUser?._id ||
        null;

      const orderData = {
        userId,

        customer: {
          name: form.name,
          email: form.email,
          phone: form.phone,
          address: form.address,
          city: form.city,
          state: form.state,
          pincode: form.pincode,
        },

        items: cart.map((item) => ({
          productId: item.id,
          name: item.name,
          price: Number(item.price),
          quantity: Number(item.quantity),
          image: item.image || "",
        })),

        subtotal: totalPrice,
        delivery: 0,
        totalAmount: totalPrice,

        // Abhi payment gateway nahi hai
        paymentMethod: "Cash on Delivery",
      };

      const response = await fetch(
        API_URL,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",

            ...(token && {
              Authorization: `Bearer ${token}`,
            }),
          },

          body: JSON.stringify(orderData),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(
          data.message ||
            "Failed to place order."
        );
        return;
      }

      // Last order success page ke liye save
      localStorage.setItem(
        "avshopLastOrder",
        JSON.stringify(data.order)
      );

      // Cart completely clear
      clearCart();

      // Success page
      navigate("/order-success");
    } catch (error) {
      console.error(
        "Place Order Error:",
        error
      );

      setError(
        "Unable to connect to server."
      );
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <main className="min-h-screen bg-black text-white pt-28 px-4 pb-12">
        <div className="max-w-3xl mx-auto text-center">

          <div className="text-6xl">🛒</div>

          <h1 className="text-3xl font-bold mt-5">
            Your Cart is Empty
          </h1>

          <p className="text-gray-400 mt-2">
            Add some products before going to checkout.
          </p>

          <Link
            to="/products"
            className="inline-block mt-6 bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
          >
            Continue Shopping
          </Link>

        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white pt-28 px-4 sm:px-6 lg:px-10 pb-12">

      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            Checkout
          </h1>

          <p className="text-gray-400 mt-2">
            Complete your order
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Customer Details */}
          <div className="lg:col-span-2">

            <form
              onSubmit={handlePlaceOrder}
              className="bg-zinc-900 border border-white/10 rounded-2xl p-5 sm:p-7"
            >

              <h2 className="text-xl sm:text-2xl font-semibold">
                Delivery Details
              </h2>

              {/* Name */}
              <div className="mt-6">
                <label className="text-sm text-gray-300">
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                  className="w-full mt-2 bg-black border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-white/40"
                />
              </div>

              {/* Email + Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">

                <div>
                  <label className="text-sm text-gray-300">
                    Email Address
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                    className="w-full mt-2 bg-black border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-white/40"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-300">
                    Phone Number
                  </label>

                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Enter phone number"
                    required
                    className="w-full mt-2 bg-black border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-white/40"
                  />
                </div>

              </div>

              {/* Address */}
              <div className="mt-5">
                <label className="text-sm text-gray-300">
                  Address
                </label>

                <textarea
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="House no., street, area"
                  rows="3"
                  required
                  className="w-full mt-2 bg-black border border-white/10 rounded-lg px-4 py-3 outline-none resize-none focus:border-white/40"
                />
              </div>

              {/* City State Pincode */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-5">

                <div>
                  <label className="text-sm text-gray-300">
                    City
                  </label>

                  <input
                    type="text"
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    placeholder="City"
                    required
                    className="w-full mt-2 bg-black border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-white/40"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-300">
                    State
                  </label>

                  <input
                    type="text"
                    name="state"
                    value={form.state}
                    onChange={handleChange}
                    placeholder="State"
                    required
                    className="w-full mt-2 bg-black border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-white/40"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-300">
                    Pincode
                  </label>

                  <input
                    type="text"
                    name="pincode"
                    value={form.pincode}
                    onChange={handleChange}
                    placeholder="Pincode"
                    required
                    className="w-full mt-2 bg-black border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-white/40"
                  />
                </div>

              </div>

              {/* Payment */}
              <div className="mt-5">
                <label className="text-sm text-gray-300">
                  Payment Method
                </label>

                <div className="mt-2 bg-black border border-white/10 rounded-lg px-4 py-3 text-gray-300">
                  Cash on Delivery
                </div>
              </div>

              {/* Error */}
              {error && (
                <p className="text-red-400 text-sm mt-5">
                  {error}
                </p>
              )}

              {/* Place Order */}
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-7 bg-white text-black py-3.5 rounded-lg font-semibold hover:bg-gray-200 transition disabled:opacity-50"
              >
                {loading
                  ? "Placing Order..."
                  : "Place Order"}
              </button>

            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">

            <div className="bg-zinc-900 border border-white/10 rounded-2xl p-5 sm:p-6 lg:sticky lg:top-28">

              <h2 className="text-xl font-semibold">
                Order Summary
              </h2>

              <div className="mt-5 space-y-4">

                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="border-b border-white/10 pb-4"
                  >

                    <div className="flex gap-3">

                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-16 w-16 rounded-lg object-cover"
                      />

                      <div className="flex-1">
                        <h3 className="font-medium">
                          {item.name}
                        </h3>

                        <p className="text-gray-400 text-sm mt-1">
                          ₹
                          {Number(
                            item.price
                          ).toLocaleString("en-IN")}
                        </p>

                        <div className="flex items-center gap-2 mt-2">

                          <button
                            type="button"
                            onClick={() =>
                              decreaseQuantity(
                                item.id
                              )
                            }
                            className="h-7 w-7 rounded bg-white/10 hover:bg-white hover:text-black transition"
                          >
                            −
                          </button>

                          <span className="text-sm">
                            {item.quantity}
                          </span>

                          <button
                            type="button"
                            onClick={() =>
                              increaseQuantity(
                                item.id
                              )
                            }
                            className="h-7 w-7 rounded bg-white/10 hover:bg-white hover:text-black transition"
                          >
                            +
                          </button>

                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          removeFromCart(item.id)
                        }
                        className="text-gray-500 hover:text-red-400 transition"
                        aria-label="Remove product"
                      >
                        ✕
                      </button>

                    </div>
                  </div>
                ))}

              </div>

              {/* Total */}
              <div className="border-t border-white/10 mt-5 pt-5">

                <div className="flex justify-between text-gray-400">
                  <span>Subtotal</span>
                  <span>
                    ₹
                    {totalPrice.toLocaleString(
                      "en-IN"
                    )}
                  </span>
                </div>

                <div className="flex justify-between text-gray-400 mt-3">
                  <span>Delivery</span>
                  <span className="text-green-400">
                    FREE
                  </span>
                </div>

                <div className="flex justify-between text-lg font-bold mt-5">
                  <span>Total</span>
                  <span>
                    ₹
                    {totalPrice.toLocaleString(
                      "en-IN"
                    )}
                  </span>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </main>
  );
}

export default Checkout;