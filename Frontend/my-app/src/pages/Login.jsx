import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaUser, FaLock, FaGoogle, FaMicrosoft, FaSun, FaMoon } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/api/auth/login", { email, password });
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (error) {
      alert("Invalid credentials");
    }
  };

  return (
    <div
      className={`relative min-h-screen flex items-center justify-center transition-all duration-300 ${
        darkMode ? "bg-gray-900" : "bg-gray-100"
      }`}
    >
      {/* Dark Mode Toggle */}
      <button
        className="absolute top-5 right-5 text-2xl p-2 rounded-full bg-gray-300 hover:bg-gray-400 transition shadow-md"
        onClick={() => setDarkMode(!darkMode)}
      >
        {darkMode ? <FaSun className="text-yellow-500" /> : <FaMoon className="text-gray-700" />}
      </button>

      {/* Login Box */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md rounded-lg bg-white bg-opacity-30 backdrop-blur-md p-8 shadow-2xl border border-gray-300"
      >
        <h2 className="mb-6 text-center text-3xl font-bold text-gray-800">Welcome Back</h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <FaUser className="absolute left-3 top-3 text-gray-500" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent border-b border-gray-300 px-10 py-2 text-gray-700 focus:outline-none focus:border-blue-400 transition"
              required
            />
          </div>

          <div className="relative">
            <FaLock className="absolute left-3 top-3 text-gray-500" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent border-b border-gray-300 px-10 py-2 text-gray-700 focus:outline-none focus:border-blue-400 transition"
              required
            />
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full rounded-lg bg-gradient-to-r from-orange-500 to-red-500 px-4 py-2 font-semibold text-white hover:opacity-90 transition shadow-lg"
          >
            Login
          </motion.button>
        </form>

        {/* Sign-Up Link */}
        <p className="mt-4 text-center text-gray-600">
          Don't have an account?{" "}
          <button
            onClick={() => navigate("/register")}
            className="ml-2 font-semibold text-blue-500 hover:text-blue-600 transition"
          >
            Sign Up
          </button>
        </p>
      </motion.div>
    </div>
  );
}
