/* eslint-disable react/prop-types */
import { Search, X } from "lucide-react";

const Searchbar = ({ value, onChange, handleSearch, onClearSearch }) => {

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch(value); 
    }
  };

  const handleClickSearch = () => {
    handleSearch(value);   
  };

  return (
    <div className="w-full flex items-center px-4 bg-slate-100/80 border border-transparent focus-within:border-blue-200 focus-within:bg-white focus-within:shadow-md transition-all duration-300 rounded-xl group">
      
      <Search
        size={18}
        className="text-slate-400 group-focus-within:text-blue-500 transition-colors cursor-pointer"
        onClick={handleClickSearch}
      />

      <input
        type="text"
        placeholder="Search notes..."
        className="w-full text-sm bg-transparent py-2.5 px-3 outline-none text-slate-700 placeholder:text-slate-400"
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
      />

      <div className="flex items-center gap-2">
        {value && (
          <X
            size={18}
            className="text-slate-400 cursor-pointer hover:text-red-500 transition-colors"
            onClick={onClearSearch}
          />
        )}
      </div>
    </div>
  );
};

export default Searchbar;