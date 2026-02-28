/* eslint-disable react/prop-types */
import { useState } from "react";
import ProfileInfo from "./ProfileInfo.jsx";
import { useNavigate } from "react-router-dom";
import Searchbar from "./Searchbar.jsx";
import { StickyNote } from "lucide-react"; 

function Navbar({ userInfo, onSearchNote, handleClearSearch }) {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const onlogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleSearch = () => {
    if (searchQuery) {
      onSearchNote(searchQuery);
    }
  };

  const onClearSearch = () => {
    setSearchQuery("");
    handleClearSearch();
  };

  return (
    <div className="bg-white/80 backdrop-blur-md sticky top-0 z-50 flex items-center justify-between px-4 md:px-10 py-3 border-b border-slate-100 shadow-sm">
      {/* Logo Section */}
      <div 
        className="flex items-center gap-2 cursor-pointer" 
        onClick={() => navigate("/")}
      >
        <div className="bg-blue-600 p-1.5 rounded-lg shadow-blue-200 shadow-lg">
          <StickyNote size={20} className="text-white" />
        </div>
        <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent hidden sm:block">
          Notify
        </h2>
      </div>

      {/* Searchbar Container - Responsive Width */}
      <div className="flex-1 max-w-[400px] mx-4">
        <Searchbar
          value={searchQuery}
          onChange={({ target }) => {
            setSearchQuery(target.value);
          }}
          handleSearch={handleSearch}
          onClearSearch={onClearSearch}
        />
      </div>

      {/* Profile Section */}
      <div className="flex items-center gap-4">
        <ProfileInfo userInfo={userInfo} onlogOut={onlogout} />
      </div>
    </div>
  );
}

export default Navbar;