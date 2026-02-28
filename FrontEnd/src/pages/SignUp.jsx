import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "../components/PasswordInput.jsx";
import { validateEmail } from "../utilis/helper.js";
import axiosInstance from "../utilis/AxiosInstance.js";
import { UserPlus, Mail, User, StickyNote } from "lucide-react"; // Modern Icons

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [error, seterror] = useState(null);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!name) {
      seterror("Please enter your name.");
      return;
    }
    if (!validateEmail(email)) {
      seterror("Please enter a valid email address.");
      return;
    }
    if (!password) {
      seterror("Please enter a password.");
      return;
    }
    seterror("");

    // SignUp API Call
    try {
      const response = await axiosInstance.post("/create-account", {
        fullName: name,
        email: email,
        password: password,
      });

      if (response.data && response.data.error) {
        seterror(response.data.message);
        return;
      }

      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        navigate("/home");
      }
    } catch (error) {
      if (error.response?.data?.message) {
        seterror(error.response.data.message);
      } else {
        seterror("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="w-full max-w-[420px] bg-white border border-slate-100 rounded-3xl shadow-xl shadow-slate-200/60 p-10 transition-all ">
        
        {/* Logo & Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-200 mb-4 transform -rotate-3 hover:rotate-0 transition-transform duration-300 cursor-pointer text-white">
           <a href="/">
              <StickyNote size={28} /> 
            </a>
          </div>
          <h4 className="text-2xl font-bold text-slate-800">Create Account</h4>
          <p className="text-slate-400 text-sm mt-1">Join us and start organizing</p>
        </div>

        <form onSubmit={handleSignUp}>
          <div className="space-y-5">
            
            {/* Name Input */}
            <div className="group">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block ml-1">
                Full Name
              </label>
              <div className="relative">
                <User size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full text-sm bg-slate-50 border border-slate-200 pl-11 pr-4 py-3.5 rounded-2xl outline-none focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-50/50 transition-all"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>

            {/* Email Input */}
            <div className="group">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block ml-1">
                Email Address
              </label>
              <div className="relative">
                <Mail size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                <input
                  type="text"
                  placeholder="john@example.com"
                  className="w-full text-sm bg-slate-50 border border-slate-200 pl-11 pr-4 py-3.5 rounded-2xl outline-none focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-50/50 transition-all"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block ml-1">
                Set Password
              </label>
              <PasswordInput
                value={password}
                onChange={(e) => setpassword(e.target.value)}
              />
            </div>

            {/* Error Message Box */}
            {error && (
              <div className="bg-red-50 border border-red-100 rounded-xl p-3.5 flex items-center gap-2 animate-in fade-in slide-in-from-top-1">
                <div className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                <p className="text-red-600 text-xs font-semibold">{error}</p>
              </div>
            )}

            {/* SignUp Button */}
            <button 
              type="submit" 
              className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-indigo-100 hover:shadow-indigo-200 active:scale-[0.98] transition-all tracking-wide mt-2"
            >
              <UserPlus size={20} />
              Create Account
            </button>
          </div>

          <p className="text-sm text-center text-slate-500 mt-8">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-bold text-indigo-600 hover:text-indigo-800 transition-colors"
            >
              Login here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;