import { Link } from "react-router-dom";

function Home() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white">

      {/* =========================
          HERO
      ========================= */}

      <section className="relative flex min-h-[calc(100vh-72px)] items-center overflow-hidden px-6 py-20 sm:px-10 sm:py-24 md:px-16 lg:px-24">

        {/* Background Glow */}
        <div className="absolute -right-40 top-20 h-96 w-96 rounded-full bg-white/10 blur-[120px]" />

        <div className="relative z-10 max-w-5xl">

          <p className="mb-5 text-xs font-medium tracking-[0.4em] text-neutral-400 sm:text-sm">
            WELCOME TO MY SHOP
          </p>

          <h1 className="text-5xl font-bold leading-[0.95] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
            Shopping
            <br />
            <span className="text-neutral-500">
              Reimagined.
            </span>
          </h1>

          <p className="mt-7 max-w-xl text-base leading-7 text-neutral-400 sm:text-lg">
            Discover products you'll love, explore trending
            collections and enjoy a modern shopping experience.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-wrap gap-4">

            {/* Shop Now */}
            <Link
              to="/products"
              className="rounded-full bg-white px-7 py-3.5 font-semibold text-black transition duration-300 hover:scale-105 hover:bg-neutral-200"
            >
              Shop Now →
            </Link>

            {/* Explore Collection */}
            <Link
              to="/products"
              className="rounded-full border border-white/20 px-7 py-3.5 font-semibold transition duration-300 hover:bg-white hover:text-black"
            >
              Explore Collection
            </Link>

          </div>

          {/* Stats */}
          <div className="mt-12 flex flex-wrap gap-8 border-t border-white/10 pt-7 sm:mt-14 sm:gap-10">

            <div>
              <h3 className="text-2xl font-bold">
                500+
              </h3>

              <p className="mt-1 text-sm text-neutral-500">
                Products
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold">
                50+
              </h3>

              <p className="mt-1 text-sm text-neutral-500">
                Brands
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold">
                24/7
              </h3>

              <p className="mt-1 text-sm text-neutral-500">
                Support
              </p>
            </div>

          </div>

        </div>
      </section>


      {/* =========================
          CATEGORIES
      ========================= */}

      <section
        id="categories"
        className="px-6 py-16 sm:px-10 sm:py-20 md:px-16 lg:px-24"
      >

        <div className="mx-auto max-w-7xl">

          <div className="mb-9 sm:mb-10">

            <p className="text-xs tracking-[0.3em] text-neutral-500">
              EXPLORE
            </p>

            <h2 className="mt-3 text-3xl font-bold sm:text-4xl md:text-5xl">
              Shop by Category
            </h2>

          </div>


          {/* Category Cards */}

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">

            {[
              {
                name: "Electronics",
                icon: "💻",
              },
              {
                name: "Fashion",
                icon: "👕",
              },
              {
                name: "Shoes",
                icon: "👟",
              },
              {
                name: "Accessories",
                icon: "⌚",
              },
            ].map((category) => (

              <Link
                key={category.name}
                to={`/products?category=${category.name}`}
                className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition duration-300 hover:-translate-y-1 hover:bg-white/[0.08] sm:p-6"
              >

                <div className="mb-9 text-3xl transition-transform duration-300 group-hover:scale-110">
                  {category.icon}
                </div>

                <h3 className="font-semibold">
                  {category.name}
                </h3>

                <p className="mt-2 text-sm text-neutral-500">
                  Explore collection →
                </p>

              </Link>

            ))}

          </div>

        </div>

      </section>

    </main>
  );
}

export default Home;
