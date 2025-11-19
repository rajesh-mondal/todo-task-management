import { useState } from "react";
import { Link } from "react-router-dom";
import API from "../api";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");

  const registerUser = async () => {
    setErrors({});
    setServerError("");

    try {
      const res = await API.post("/register", { name, email, password });

      alert(res.data.message);
      window.location.href = "/login";
    } catch (error) {
      if (error.response && error.response.status === 422) {
        setErrors(error.response.data.errors);
        return;
      }

      setServerError("Registration failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0b0d11] p-6 font-[Inter] text-white">
      <div className="w-full max-w-md rounded-2xl border border-neutral-700 bg-linear-to-br from-[#101218]/80 to-[#0d0f14]/60 shadow-2xl shadow-black/50 backdrop-blur p-8">
        <h1 className="text-3xl font-bold text-center mb-4 text-blue-400">
          Create Account
        </h1>

        <p className="text-center text-neutral-400 mb-6 text-sm">
          Join us and start your journey
        </p>

        {serverError && (
          <p className="bg-red-500/10 text-red-400 p-3 rounded-xl mb-4 text-sm border border-red-500/20">
            {serverError}
          </p>
        )}

        <div className="space-y-5">
          {/* Name */}
          <div>
            <input
              className="w-full rounded-xl border border-neutral-700 bg-[#0f1116]/60 p-3 text-white placeholder:text-neutral-500 focus:border-blue-500 focus:bg-[#0f1116] focus:ring-2 focus:ring-blue-500/20 outline-none transition"
              placeholder="Full Name"
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && (
              <p className="text-red-400 text-sm mt-1">{errors.name[0]}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <input
              className="w-full rounded-xl border border-neutral-700 bg-[#0f1116]/60 p-3 text-white placeholder:text-neutral-500 focus:border-blue-500 focus:bg-[#0f1116] focus:ring-2 focus:ring-blue-500/20 outline-none transition"
              placeholder="Email Address"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
              <p className="text-red-400 text-sm mt-1">{errors.email[0]}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <input
              className="w-full rounded-xl border border-neutral-700 bg-[#0f1116]/60 p-3 text-white placeholder:text-neutral-500 focus:border-blue-500 focus:bg-[#0f1116] focus:ring-2 focus:ring-blue-500/20 outline-none transition"
              placeholder="Password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && (
              <p className="text-red-400 text-sm mt-1">{errors.password[0]}</p>
            )}
          </div>

          {/* Register Button */}
          <button
            onClick={registerUser}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-xl font-semibold shadow-lg shadow-blue-600/20 transition active:scale-95"
          >
            Register
          </button>
        </div>

        {/* Footer */}
        <p className="text-center text-neutral-400 mt-6 text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-400 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
