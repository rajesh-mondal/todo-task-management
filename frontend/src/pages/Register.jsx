import { useState } from "react";
import { Link } from "react-router-dom";
import API from "../api";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = async () => {
    try {
      const res = await API.post("/register", { name, email, password });
      alert(res.data.message);
      window.location.href = "/login";
    } catch {
      alert("Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-green-50 to-green-100 p-6">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
        <h1 className="text-3xl font-extrabold text-center mb-6 text-green-700">
          Create Account
        </h1>
        <p className="text-center text-gray-500 mb-8 text-sm">
          Join us and start your journey
        </p>

        <div className="space-y-4">
          <input
            className="border border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
            placeholder="Full Name"
            onChange={(e) => setName(e.target.value)}
          />

          <input
            className="border border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
            placeholder="Email Address"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="border border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
            placeholder="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={registerUser}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold shadow-md transition active:scale-95"
          >
            Register
          </button>
        </div>

        <p className="text-center text-gray-600 mt-6 text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-green-600 font-semibold hover:underline cursor-pointer"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
