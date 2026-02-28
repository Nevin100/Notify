import { Link, useNavigate } from "react-router-dom";
import { StickyNote, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

const LandingNavbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/70 backdrop-blur-lg border-b border-slate-100">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <div 
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <div className="bg-blue-600 p-1.5 rounded-lg">
            <StickyNote size={20} className="text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Notify
          </span>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-6">

          {isLoggedIn ? (
            <button
              onClick={() => navigate("/home")}
              className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-full text-sm font-semibold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all hover:scale-105"
            >
              Go to Dashboard <ArrowRight size={16} />
            </button>
          ) : (
            <>
              <Link 
                to="/login" 
                className="hidden sm:block text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors"
              >
                Login
              </Link>

              <Link 
                to="/signup" 
                className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-full text-sm font-semibold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all hover:scale-105"
              >
                Get Started <ArrowRight size={16} />
              </Link>
            </>
          )}

        </div>
      </div>
    </nav>
  );
};

export default LandingNavbar;