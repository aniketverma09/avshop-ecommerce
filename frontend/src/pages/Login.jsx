import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const API_URL = "http://127.0.0.1:5000/api/auth";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    try {
      setLoading(true);

      const response = await fetch(
        `${API_URL}/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(
          data.message || "Invalid email or password."
        );
        return;
      }

      // Save login information
      localStorage.setItem(
        "avshopToken",
        data.token
      );

      localStorage.setItem(
        "avshopUser",
        JSON.stringify(data.user)
      );

      localStorage.setItem(
        "avshopLoggedIn",
        "true"
      );

      // Navbar ko immediately update karo
      window.dispatchEvent(
        new Event("avshopAuthChanged")
      );

      navigate("/");
    } catch (error) {
      console.error(error);

      setError(
        "Unable to connect to server."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white pt-28 px-4 flex items-center justify-center pb-12">
      <div className="w-full max-w-md">

        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold">
            Welcome Back
          </h1>

          <p className="text-gray-400 mt-2">
            Login to your AvShop account
          </p>
        </div>

        {/* Login Card */}
        <form
          onSubmit={handleSubmit}
          className="bg-zinc-900 border border-white/10 rounded-2xl p-6 sm:p-8"
        >

          {/* Email */}
          <div>
            <label className="text-sm text-gray-300">
              Email Address
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full mt-2 bg-black border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-white/40"
            />
          </div>

          {/* Password */}
          <div className="mt-5">
            <label className="text-sm text-gray-300">
              Password
            </label>

            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full mt-2 bg-black border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-white/40"
            />
          </div>

          {/* Error */}
          {error && (
            <p className="text-red-400 text-sm mt-4">
              {error}
            </p>
          )}

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-7 bg-white text-black py-3 rounded-lg font-semibold hover:bg-gray-200 transition disabled:opacity-50"
          >
            {loading
              ? "Logging in..."
              : "Login"}
          </button>

          {/* Register */}
          <p className="text-center text-gray-400 text-sm mt-6">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-white hover:underline"
            >
              Register
            </Link>
          </p>

        </form>
      </div>
    </main>
  );
}

export default Login;