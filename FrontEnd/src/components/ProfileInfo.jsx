/* eslint-disable react/prop-types */
import { getInitals } from "../utilis/helper";
import { LogOut } from "lucide-react"; // Modern logout icon

const ProfileInfo = ({ userInfo, onlogOut }) => {
  // Agar userInfo load nahi hua toh loader ya null return karein
  if (!userInfo) return null;

  return (
    <div className="flex items-center gap-3 group transition-all duration-200">
      {/* Avatar Section - Better contrast and hover effect */}
      <div className="w-10 h-10 md:w-11 md:h-11 flex items-center justify-center rounded-full text-blue-700 font-semibold bg-blue-50 border border-blue-100 shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
        {getInitals(userInfo?.fullName)}
      </div>

      <div className="flex flex-col">
        {/* Name - Cleaner font weight */}
        <p className="text-sm font-semibold text-slate-800 leading-tight">
          {userInfo?.fullName}
        </p>
        
        {/* Logout Button - Added Icon and subtle styling */}
        <button
          className="flex items-center gap-1 text-[13px] font-medium text-slate-500 hover:text-red-600 hover:underline transition-all duration-200 cursor-pointer outline-none"
          onClick={onlogOut}
        >
          <LogOut size={14} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default ProfileInfo;