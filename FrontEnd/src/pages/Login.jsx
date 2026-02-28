import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "../components/PasswordInput.jsx";
import { validateEmail } from "../utilis/helper.js";
import axiosInstance from "../utilis/AxiosInstance.js";
import { LogIn, Mail, StickyNote } from "lucide-react"; // Sleek icons

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [error, seterror] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateEmail(email.trim())) {
      seterror("Please enter a valid email address.");
      return;
    }
    if (!password) {
      seterror("Please enter your password.");
      return;
    }
    seterror("");

    try {
      const response = await axiosInstance.post("/login", {
        email: email,
        password: password,
      });

      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        navigate("/home");
      }
    } catch (error) {
      if (error.response?.data?.message) {
        seterror(error.response.data.message);
      } else {
        seterror("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="w-full max-w-[400px] bg-white border border-slate-100 rounded-2xl shadow-xl shadow-slate-200/60 p-10">
        
        {/* App Logo & Welcome Text */}
        <div className="flex flex-col items-center mb-10">
          <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200 mb-4 hover:shadow-blue-300 transition-shadow cursor-pointer">
            <a href="/">
              <StickyNote size={28} className="text-white" /> 
            </a>
          </div>
          <h4 className="text-2xl font-bold text-slate-800">Welcome Back</h4>
          <p className="text-slate-400 text-sm mt-1">Please enter your details</p>
        </div>

        <form onSubmit={handleLogin}>
          <div className="space-y-5">
            {/* Email Input */}
            <div className="relative group">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block ml-1">
                Email Address
              </label>
              <div className="relative">
                <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                <input
                  type="text"
                  placeholder="name@example.com"
                  className="w-full text-sm bg-slate-50 border border-slate-200 pl-10 pr-4 py-3 rounded-xl outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50/50 transition-all"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* Password Input Area */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block ml-1">
                Password
              </label>
              <PasswordInput
                value={password}
                onChange={(e) => setpassword(e.target.value)}
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-100 rounded-lg p-3 flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                <p className="text-red-600 text-xs font-medium">{error}</p>
              </div>
            )}

            {/* Login Button */}
            <button 
              type="submit" 
              className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-blue-100 hover:shadow-blue-200 active:scale-[0.98] transition-all tracking-wide"
            >
              <LogIn size={18} />
              Sign In
            </button>
          </div>

          <p className="text-sm text-center text-slate-500 mt-8">
            New here?{" "}
            <Link
              to="/signup"
              className="font-bold text-blue-600 hover:text-blue-700 hover:underline transition-all"
            >
              Create an account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;