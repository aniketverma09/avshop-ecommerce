
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import { useCart } from "../context/CartContext.jsx";
import { useWishlist } from "../context/WishlistContext.jsx";

const API_URL = "https://avshop-ecommerce.onrender.com/api/products";

const categories = [
  "All",
  "Electronics",
  "Fashion",
  "Shoes",
  "Accessories",
];

function Products() {
  const [products, setProducts] = useState([]);

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("default");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [addedId, setAddedId] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();

  const urlCategory = searchParams.get("category");

  const category = categories.includes(urlCategory)
    ? urlCategory
    : "All";

  const { addToCart } = useCart();

  const {
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
  } = useWishlist();

    //  FETCH PRODUCTS FROM API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");

        let url = API_URL;

        if (category !== "All") {
          url = `${API_URL}/category/${encodeURIComponent(
            category
          )}`;
        }

        const response = await fetch(url);

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(
            data.message || "Failed to fetch products"
          );
        }

        /*
          MongoDB uses _id.
          Our Cart/Wishlist currently use id.
          So we map _id -> id.
        */
        const formattedProducts = (data.products || []).map(
          (product) => ({
            ...product,
            id: product._id,
          })
        );

        setProducts(formattedProducts);
      } catch (err) {
        console.error("Product API Error:", err);

        setError(
          "Unable to load products. Please check your backend server."
        );

        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

    //  SEARCH + SORT
  let filteredProducts = products.filter((product) => {
    const searchMatch = product.name
      ?.toLowerCase()
      .includes(search.toLowerCase());

    return searchMatch;
  });

  if (sort === "low") {
    filteredProducts = [...filteredProducts].sort(
      (a, b) => a.price - b.price
    );
  }

  if (sort === "high") {
    filteredProducts = [...filteredProducts].sort(
      (a, b) => b.price - a.price
    );
  }

    //  CATEGORY CHANGE
  const handleCategoryChange = (value) => {
    if (value === "All") {
      setSearchParams({});
    } else {
      setSearchParams({
        category: value,
      });
    }
  };

    //  ADD TO CART

  const handleAddToCart = (product) => {
    addToCart(product);

    setAddedId(product.id);

    setTimeout(() => {
      setAddedId(null);
    }, 1200);
  };

    //  WISHLIST

  const handleWishlist = (product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white pt-24 sm:pt-28 px-4 sm:px-6 lg:px-10 pb-12">

          {/* HEADING */}

      <div className="max-w-6xl mx-auto text-center">

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
          Our Products
        </h1>

        <p className="text-gray-400 mt-2 text-sm sm:text-base">
          Discover premium products for your lifestyle
        </p>

      </div>

          {/* FILTERS */}

      <div
        id="categories"
        className="max-w-6xl mx-auto mt-8"
      >

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">

          {/* SEARCH */}

          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-sm sm:text-base text-white placeholder-gray-500 outline-none focus:border-white/50"
          />

          {/* CATEGORY */}

          <select
            value={category}
            onChange={(e) =>
              handleCategoryChange(e.target.value)
            }
            className="w-full bg-black border border-white/20 rounded-lg px-4 py-3 text-sm sm:text-base text-white outline-none focus:border-white/50"
          >

            {categories.map((item) => (
              <option
                key={item}
                value={item}
              >
                {item === "All"
                  ? "All Categories"
                  : item}
              </option>
            ))}

          </select>

          {/* SORT */}

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="w-full bg-black border border-white/20 rounded-lg px-4 py-3 text-sm sm:text-base text-white outline-none focus:border-white/50"
          >

            <option value="default">
              Sort By
            </option>

            <option value="low">
              Price: Low to High
            </option>

            <option value="high">
              Price: High to Low
            </option>

          </select>

        </div>

      </div>

          {/* LOADING */}

      {loading && (

        <div className="max-w-6xl mx-auto text-center mt-16">

          <div className="text-4xl mb-4">
            ⏳
          </div>

          <p className="text-gray-400">
            Loading products...
          </p>

        </div>

      )}

          {/* ERROR */}

      {!loading && error && (

        <div className="max-w-6xl mx-auto text-center mt-16">

          <div className="text-4xl mb-4">
            ⚠️
          </div>

          <h2 className="text-xl font-semibold">
            Something went wrong
          </h2>

          <p className="text-gray-400 mt-2">
            {error}
          </p>

        </div>

      )}

          {/* PRODUCT GRID */}

      {!loading &&
        !error &&
        filteredProducts.length > 0 && (

          <div className="max-w-6xl mx-auto mt-8 sm:mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">

            {filteredProducts.map((product) => (

              <div
                key={product.id}
                className="bg-white/5 border border-white/10 rounded-xl overflow-hidden"
              >

                {/* PRODUCT IMAGE */}

                <div className="relative">

                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-56 sm:h-60 lg:h-64 object-cover"
                  />

                  {/* CATEGORY */}

                  <span className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs">
                    {product.category}
                  </span>

                  {/* RATING */}

                  <span className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm text-yellow-400 px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs">
                    ★ {product.rating}
                  </span>

                  {/* WISHLIST */}

                  <button
                    type="button"
                    onClick={() =>
                      handleWishlist(product)
                    }
                    aria-label={
                      isInWishlist(product.id)
                        ? "Remove from wishlist"
                        : "Add to wishlist"
                    }
                    className={`absolute bottom-3 right-3 h-10 w-10 rounded-full flex items-center justify-center backdrop-blur-sm border transition-colors duration-300 ${
                      isInWishlist(product.id)
                        ? "bg-red-500 border-red-500 text-white"
                        : "bg-black/70 border-white/20 text-white hover:bg-white hover:text-black"
                    }`}
                  >

                    <span className="text-xl leading-none">

                      {isInWishlist(product.id)
                        ? "♥"
                        : "♡"}

                    </span>

                  </button>

                </div>

                {/* PRODUCT INFO */}

                <div className="p-4 sm:p-5">

                  <h2 className="text-lg sm:text-xl font-semibold">
                    {product.name}
                  </h2>

                  <p className="text-gray-400 text-sm mt-1 line-clamp-2">
                    {product.description ||
                      "Premium quality product"}
                  </p>

                  <p className="text-xl sm:text-2xl font-bold mt-3">
                    ₹
                    {Number(product.price).toLocaleString(
                      "en-IN"
                    )}
                  </p>

                  {/* BUTTONS */}

                  <div className="grid grid-cols-2 gap-2 mt-4">

                    {/* VIEW PRODUCT */}

                    <Link
                      to={`/products/${product.id}`}
                      className="w-full text-center bg-white text-black px-3 py-2.5 rounded-lg text-sm sm:text-base font-semibold transition-colors duration-300 hover:bg-gray-300"
                    >
                      View Product
                    </Link>

                    {/* ADD TO CART */}

                    <button
                      type="button"
                      onClick={() =>
                        handleAddToCart(product)
                      }
                      className={`w-full px-3 py-2.5 rounded-lg text-sm sm:text-base font-semibold transition-colors duration-300 flex items-center justify-center gap-2 ${
                        addedId === product.id
                          ? "bg-green-600 text-white"
                          : "bg-zinc-800 text-white hover:bg-zinc-700"
                      }`}
                    >

                      {addedId === product.id ? (
                        "Added ✓"
                      ) : (
                        <>
                          <img
                            src="/icons/cart.svg"
                            alt=""
                            className="h-4 w-4"
                          />

                          Add to Cart
                        </>
                      )}

                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>
        )}

          {/* NO PRODUCTS */}

      {!loading &&
        !error &&
        filteredProducts.length === 0 && (

          <div className="text-center mt-12">

            <div className="text-5xl mb-4">
              🔍
            </div>

            <h2 className="text-xl font-semibold">
              No Products Found
            </h2>

            <p className="text-gray-400 mt-2">
              Try another search or category.
            </p>

          </div>
        )}

    </main>
  );
}

export default Products;
