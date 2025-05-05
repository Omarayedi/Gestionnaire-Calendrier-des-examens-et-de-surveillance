import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaUser, FaLock, FaEnvelope, FaSun, FaMoon, FaUserTie, FaBuilding } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [department, setDepartment] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [departments, setDepartments] = useState([]); // Store fetched departments
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/departments");
        if (Array.isArray(response.data)) {
          setDepartments(response.data); // Set only if it's an array
        } else {
          console.error("Expected an array but got:", response.data);
          setDepartments([]); // Fallback to empty array
        }
      } catch (error) {
        console.error("Failed to fetch departments", error);
      }
    };
    
    fetchDepartments();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
  
    try {
      await axios.post("http://localhost:8000/api/auth/register", {
        name,
        email,
        password,
        role,
        department,
      });
  
      alert("Account created successfully! Please login.");
      navigate("/");
    } catch (error) {
      alert("Registration failed. Try again.");
      console.error("Error:", error.response?.data || error.message);
    }
  };
  

  return (
    <div className={`relative min-h-screen flex items-center justify-center transition-all duration-300 ${darkMode ? "bg-gray-900" : "bg-gray-100"}`}>
      {/* Dark Mode Toggle */}
      <button className="absolute top-5 right-5 text-2xl p-2 rounded-full bg-gray-300 hover:bg-gray-400 transition shadow-md" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? <FaSun className="text-yellow-500" /> : <FaMoon className="text-gray-700" />}
      </button>

      {/* Register Box */}
      <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }} className="w-full max-w-md rounded-lg bg-white bg-opacity-30 backdrop-blur-md p-8 shadow-2xl border border-gray-300">
        <h2 className="mb-6 text-center text-3xl font-bold text-gray-800">Create an Account</h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <FaUser className="absolute left-3 top-3 text-gray-500" />
            <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-transparent border-b border-gray-300 px-10 py-2 text-gray-700 focus:outline-none focus:border-blue-400 transition" required />
          </div>

          <div className="relative">
            <FaEnvelope className="absolute left-3 top-3 text-gray-500" />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-transparent border-b border-gray-300 px-10 py-2 text-gray-700 focus:outline-none focus:border-blue-400 transition" required />
          </div>

          <div className="relative">
            <FaLock className="absolute left-3 top-3 text-gray-500" />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-transparent border-b border-gray-300 px-10 py-2 text-gray-700 focus:outline-none focus:border-blue-400 transition" required />
          </div>

          <div className="relative">
            <FaLock className="absolute left-3 top-3 text-gray-500" />
            <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full bg-transparent border-b border-gray-300 px-10 py-2 text-gray-700 focus:outline-none focus:border-blue-400 transition" required />
          </div>

          {/* Role Selection */}
          <div className="relative">
            <FaUserTie className="absolute left-3 top-3 text-gray-500" />
            <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full bg-transparent border-b border-gray-300 px-10 py-2 text-gray-700 focus:outline-none focus:border-blue-400 transition" required>
              <option value="">Select Role</option>
              <option value="ADMIN">ADMIN</option>
              <option value="CHEF">CHEF</option>
              <option value="ETUDIANT">ETUDIANT</option>
              <option value="DIRECTEUR">DIRECTEUR</option>
              <option value="ENSEIGNANT">ENSEIGNANT</option>
            </select>
          </div>

          {/* Department Selection (Dynamic) */}
          <div className="relative">
            <FaBuilding className="absolute left-3 top-3 text-gray-500" />
            <select
              value={department || ""}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full bg-transparent border-b border-gray-300 px-10 py-2 text-gray-700 focus:outline-none focus:border-blue-400 transition"
            >
              <option value="">Select a department</option>
              {departments.map((dept) => (
                <option key={dept.departmentId} value={dept.name}>
                  {dept.name}
                </option>
              ))}
            </select>

          </div>

          {/* Submit Button */}
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} type="submit" className="w-full rounded-lg bg-gradient-to-r from-green-500 to-teal-500 px-4 py-2 font-semibold text-white hover:opacity-90 transition shadow-lg">
            Sign Up
          </motion.button>
        </form>

        {/* Login Link */}
        <p className="mt-4 text-center text-gray-600">
          Already have an account?{" "}
          <button onClick={() => navigate("/")} className="ml-2 font-semibold text-blue-500 hover:text-blue-600 transition">
            Login
          </button>
        </p>
      </motion.div>
    </div>
  );
}
