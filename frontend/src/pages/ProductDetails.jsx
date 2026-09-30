import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { useCart } from "../context/CartContext.jsx";

const API_URL = "https://avshop-ecommerce.onrender.com/api/products";

function ProductDetails() {
  const { id } = useParams();

  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [added, setAdded] = useState(false);

  /* =========================
     FETCH PRODUCT FROM MONGODB
  ========================= */

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${API_URL}/${id}`
        );

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(
            data.message || "Product not found"
          );
        }

        /*
          MongoDB _id ko id ke naam se bhi save
          kar rahe hain taaki CartContext ke saath
          existing code compatible rahe.
        */

        setProduct({
          ...data.product,
          id: data.product._id,
        });
      } catch (err) {
        console.error(
          "Product Details Error:",
          err
        );

        setError(
          "Unable to load this product."
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  /* =========================
     ADD TO CART
  ========================= */

  const handleAddToCart = () => {
    if (!product) return;

    addToCart(product);

    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 1200);
  };

  /* =========================
     LOADING
  ========================= */

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center px-4">

        <div className="text-center">

          <div className="text-4xl mb-4">
            ⏳
          </div>

          <p className="text-gray-400">
            Loading product...
          </p>

        </div>

      </main>
    );
  }

  /* =========================
     PRODUCT NOT FOUND
  ========================= */

  if (error || !product) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">

        <div className="text-center">

          <h1 className="text-3xl font-bold">
            Product Not Found
          </h1>

          <p className="text-gray-400 mt-3">
            {error ||
              "This product does not exist."}
          </p>

          <Link
            to="/products"
            className="inline-block mt-5 bg-white text-black px-5 py-2 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Back to Products
          </Link>

        </div>

      </div>
    );
  }

  /* =========================
     PRODUCT PAGE
  ========================= */

  return (
    <main className="min-h-screen bg-black text-white pt-24 px-4 pb-10">

      <div className="max-w-5xl mx-auto">

        {/* Back Button */}

        <Link
          to="/products"
          className="text-gray-400 hover:text-white"
        >
          ← Back to Products
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">

          {/* =========================
              IMAGE
          ========================= */}

          <div className="rounded-2xl overflow-hidden">

            <img
              src={product.image}
              alt={product.name}
              className="w-full h-80 sm:h-96 object-cover"
            />

          </div>

          {/* =========================
              DETAILS
          ========================= */}

          <div className="flex flex-col justify-center">

            {/* Category */}

            <p className="text-gray-400">
              {product.category}
            </p>

            {/* Name */}

            <h1 className="text-3xl sm:text-4xl font-bold mt-2">
              {product.name}
            </h1>

            {/* Rating */}

            <p className="text-yellow-400 mt-4">
              ★ {product.rating}
            </p>

            {/* Price */}

            <p className="text-3xl font-bold mt-5">
              ₹
              {Number(product.price).toLocaleString(
                "en-IN"
              )}
            </p>

            {/* Description */}

            <p className="text-gray-400 mt-5">
              {product.description}
            </p>

            {/* Stock */}

            <p
              className={`mt-4 ${
                product.stock > 0
                  ? "text-green-400"
                  : "text-red-400"
              }`}
            >
              {product.stock > 0
                ? `✓ In Stock (${product.stock} available)`
                : "✕ Out of Stock"}
            </p>

            {/* Add To Cart */}

            <button
              type="button"
              onClick={handleAddToCart}
              disabled={product.stock <= 0}
              className={`
                mt-8
                w-full
                py-3
                rounded-lg
                font-semibold
                transition-all
                duration-300
                ${
                  product.stock <= 0
                    ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                    : added
                    ? "bg-green-600 text-white scale-[1.02]"
                    : "bg-white text-black hover:bg-gray-200"
                }
              `}
            >
              {product.stock <= 0
                ? "Out of Stock"
                : added
                ? "Added to Cart ✓"
                : "Add to Cart"}
            </button>

          </div>

        </div>

      </div>

    </main>
  );
}

export default ProductDetails;
