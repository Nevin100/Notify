/* eslint-disable react/prop-types */
import { useState } from "react";
import { Plus, X, Tag as TagIcon } from "lucide-react"; // Sleek icons

const TagInput = ({ tags, setTags }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const AddNewTag = () => {
    // Check if tag is not empty and doesn't already exist
    if (inputValue.trim() !== "" && !tags.includes(inputValue.trim())) {
      setTags([...tags, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Modal submit hone se rokne ke liye
      AddNewTag();
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className="w-full">
      {/* Label for better accessibility */}
      <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">
        Tags
      </label>

      {/* Render Tags List */}
      <div className="flex items-center gap-2 flex-wrap mb-4 transition-all">
        {tags?.map((tag, index) => (
          <span
            key={index}
            className="group flex items-center gap-1.5 text-[13px] text-blue-700 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full hover:bg-blue-100 transition-colors animate-in fade-in zoom-in duration-200"
          >
            <span className="font-medium"># {tag}</span>
            <button
              className="p-0.5 rounded-full hover:bg-blue-200 text-blue-400 hover:text-red-500 transition-all"
              onClick={() => handleRemoveTag(tag)}
            >
              <X size={14} strokeWidth={2.5} />
            </button>
          </span>
        ))}
      </div>

      {/* Input Section */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <TagIcon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            className="w-full text-sm bg-slate-50 border border-slate-200 pl-9 pr-3 py-2.5 rounded-xl outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50/50 transition-all"
            placeholder="Add a tag..."
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
        </div>

        <button
          className="w-10 h-10 flex items-center justify-center rounded-xl bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-100 active:scale-90 transition-all group"
          onClick={AddNewTag}
        >
          <Plus size={22} className="text-white group-hover:rotate-90 transition-transform duration-300" />
        </button>
      </div>
      
      <p className="mt-2 text-[11px] text-slate-400 italic">
        Press Enter or click (+) to add tags
      </p>
    </div>
  );
};

export default TagInput;