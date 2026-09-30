import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const API_URL = "http://127.0.0.1:5000/api/auth";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (form.password.length < 6) {
      setError(
        "Password must be at least 6 characters."
      );
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${API_URL}/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            password: form.password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(
          data.message || "Registration failed."
        );
        return;
      }

      setSuccess(
        "Account created successfully!"
      );

      setForm({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      setTimeout(() => {
        navigate("/login");
      }, 1000);
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
            Create Account
          </h1>

          <p className="text-gray-400 mt-2">
            Join AvShop today
          </p>
        </div>

        {/* Register Card */}
        <form
          onSubmit={handleSubmit}
          className="bg-zinc-900 border border-white/10 rounded-2xl p-6 sm:p-8"
        >

          {/* Name */}
          <div>
            <label className="text-sm text-gray-300">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full mt-2 bg-black border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-white/40"
            />
          </div>

          {/* Email */}
          <div className="mt-5">
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
              placeholder="Create a password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full mt-2 bg-black border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-white/40"
            />
          </div>

          {/* Confirm Password */}
          <div className="mt-5">
            <label className="text-sm text-gray-300">
              Confirm Password
            </label>

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={form.confirmPassword}
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

          {/* Success */}
          {success && (
            <p className="text-green-400 text-sm mt-4">
              {success}
            </p>
          )}

          {/* Register Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-7 bg-white text-black py-3 rounded-lg font-semibold hover:bg-gray-200 transition disabled:opacity-50"
          >
            {loading
              ? "Creating Account..."
              : "Create Account"}
          </button>

          {/* Login */}
          <p className="text-center text-gray-400 text-sm mt-6">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-white hover:underline"
            >
              Login
            </Link>
          </p>

        </form>
      </div>
    </main>
  );
}

export default Register;