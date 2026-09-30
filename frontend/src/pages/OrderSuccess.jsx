import { Link } from "react-router-dom";

function OrderSuccess() {
  const order = JSON.parse(
    localStorage.getItem("avshopLastOrder") || "null"
  );

  if (!order) {
    return (
      <main className="min-h-screen bg-black text-white pt-28 px-4 pb-12">
        <div className="max-w-2xl mx-auto text-center">

          <div className="text-6xl">📦</div>

          <h1 className="text-3xl font-bold mt-5">
            No Order Found
          </h1>

          <p className="text-gray-400 mt-2">
            You haven't placed an order yet.
          </p>

          <Link
            to="/products"
            className="inline-block mt-6 bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
          >
            Start Shopping
          </Link>

        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white pt-28 px-4 sm:px-6 lg:px-10 pb-12">

      <div className="max-w-3xl mx-auto">

        {/* Success */}
        <div className="text-center">

          <div className="mx-auto h-20 w-20 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center">
            <span className="text-4xl text-green-400">
              ✓
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold mt-6">
            Order Placed Successfully!
          </h1>

          <p className="text-gray-400 mt-2">
            Thank you for shopping with AvShop.
          </p>

        </div>

        {/* Order Card */}
        <div className="bg-zinc-900 border border-white/10 rounded-2xl p-5 sm:p-7 mt-10">

          {/* Order Info */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/10 pb-5">

            <div>
              <p className="text-gray-500 text-sm">
                Order ID
              </p>

              <p className="font-semibold mt-1">
                #{order.orderId}
              </p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">
                Order Date
              </p>

              <p className="font-semibold mt-1">
                {order.date}
              </p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">
                Status
              </p>

              <span className="inline-block mt-1 text-green-400 bg-green-500/10 border border-green-500/20 px-3 py-1 rounded-full text-sm">
                {order.status}
              </span>
            </div>

          </div>

          {/* Customer */}
          <div className="mt-6">

            <h2 className="text-lg font-semibold">
              Delivery Details
            </h2>

            <div className="mt-3 text-sm text-gray-400 leading-6">

              <p className="text-white font-medium">
                {order.customer.name}
              </p>

              <p>
                {order.customer.email}
              </p>

              <p>
                {order.customer.phone}
              </p>

              <p className="mt-2">
                {order.customer.address}
              </p>

              <p>
                {order.customer.city},{" "}
                {order.customer.state} -{" "}
                {order.customer.pincode}
              </p>

            </div>
          </div>

          {/* Products */}
          <div className="mt-8">

            <h2 className="text-lg font-semibold">
              Ordered Products
            </h2>

            <div className="mt-4 space-y-4">

              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 border-b border-white/10 pb-4"
                >

                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-20 w-20 rounded-lg object-cover"
                  />

                  <div className="flex-1">

                    <h3 className="font-medium">
                      {item.name}
                    </h3>

                    <p className="text-gray-400 text-sm mt-1">
                      Quantity: {item.quantity}
                    </p>

                    <p className="text-gray-400 text-sm">
                      ₹{Number(item.price).toLocaleString("en-IN")} each
                    </p>

                  </div>

                  <div className="font-semibold">
                    ₹
                    {(
                      Number(item.price) *
                      item.quantity
                    ).toLocaleString("en-IN")}
                  </div>

                </div>
              ))}

            </div>
          </div>

          {/* Total */}
          <div className="border-t border-white/10 mt-6 pt-5">

            <div className="flex justify-between text-gray-400">
              <span>Delivery</span>
              <span className="text-green-400">
                FREE
              </span>
            </div>

            <div className="flex justify-between text-xl font-bold mt-4">
              <span>Total Paid</span>

              <span>
                ₹{Number(order.total).toLocaleString("en-IN")}
              </span>
            </div>

          </div>

        </div>

        {/* Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">

          <Link
            to="/products"
            className="text-center bg-white text-black py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
          >
            Continue Shopping
          </Link>

          <Link
            to="/"
            className="text-center border border-white/20 py-3 rounded-lg font-semibold hover:bg-white hover:text-black transition"
          >
            Back to Home
          </Link>

        </div>

      </div>
    </main>
  );
}

export default OrderSuccess;