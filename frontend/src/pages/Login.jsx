import { useState } from "react";
import { Link } from "react-router-dom";
import API from "../api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const loginUser = async () => {
    setErrors({});

    try {
      const res = await API.post("/login", { email, password });

      if (res.data.status) {
        localStorage.setItem("token", res.data.token);
        window.location.href = "/";
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      if (error.response && error.response.status === 422) {
        setErrors(error.response.data.errors);
        return;
      }

      alert("Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0b0d11] p-6 font-[Inter] text-white">
      <div className="w-full max-w-md rounded-2xl border border-neutral-700 bg-gradient-to-br from-[#101218]/80 to-[#0d0f14]/60 shadow-2xl shadow-black/50 backdrop-blur p-8">
        <h1 className="text-3xl font-bold text-center mb-4 text-blue-400">
          Welcome Back
        </h1>

        <p className="text-center text-neutral-400 mb-8 text-sm">
          Login to continue managing your tasks
        </p>

        <div className="space-y-5">
          {/* Email */}
          <div>
            <input
              className="w-full rounded-xl border border-neutral-700 bg-[#0f1116]/60 p-3 text-white placeholder:text-neutral-500 focus:border-blue-500 focus:bg-[#0f1116] focus:ring-2 focus:ring-blue-500/20 outline-none transition"
              placeholder="Email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email[0]}</p>
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
              <p className="text-red-500 text-sm mt-1">{errors.password[0]}</p>
            )}
          </div>

          {/* Login Button */}
          <button
            onClick={loginUser}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-xl font-semibold shadow-lg shadow-blue-600/20 transition active:scale-95"
          >
            Login
          </button>
        </div>

        {/* Footer */}
        <p className="text-center text-neutral-400 mt-6 text-sm">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-blue-400 font-semibold hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
