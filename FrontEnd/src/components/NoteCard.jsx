/* eslint-disable react/prop-types */
import { Pin, Pencil, Trash2, Calendar } from "lucide-react";

const NoteCard = ({
  title,
  date,
  content,
  tag,
  isPinned,
  onEdit,
  onDelete,
  onPinNote,
}) => {
  return (
    <div className="group bg-white border border-slate-100 rounded-2xl p-5 hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-300 ease-in-out transform hover:-translate-y-1 relative overflow-hidden">
      
      {/* Subtle background decoration for a premium feel */}
      <div className="absolute top-0 left-0 w-1 bg-blue-500 h-0 group-hover:h-full transition-all duration-300" />

      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h6 className="text-[15px] font-semibold text-slate-800 line-clamp-1">
            {title}
          </h6>
          <div className="flex items-center gap-1 mt-1 text-slate-400">
            <Calendar size={12} />
            <span className="text-[11px] font-medium uppercase tracking-wider">
              {date}
            </span>
          </div>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onPinNote();
          }}
          className={`p-2 rounded-lg transition-colors duration-200 ${
            isPinned 
              ? "bg-blue-50 text-blue-600" 
              : "text-slate-300 hover:bg-slate-50 hover:text-slate-500"
          }`}
        >
          <Pin 
            size={18} 
            className={`${isPinned ? "fill-blue-600" : ""} transition-transform group-hover:rotate-12`} 
          />
        </button>
      </div>

      <p className="text-sm text-slate-600 leading-relaxed mt-4 mb-5 line-clamp-3">
        {content}
      </p>

      <div className="flex justify-between items-end border-t border-slate-50 pt-4">
        {/* Tags Section */}
        <div className="flex flex-wrap gap-1.5 max-w-[70%]">
          {tag?.map((item, index) => (
            <span 
              key={index} 
              className="text-[10px] font-bold text-blue-500 bg-blue-50/50 px-2 py-0.5 rounded-md uppercase tracking-tight"
            >
              #{item}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-1 items-center bg-slate-50 p-1 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            className="p-2 text-slate-400 hover:text-blue-600 hover:bg-white rounded-lg transition-all shadow-none hover:shadow-sm"
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
          >
            <Pencil size={16} />
          </button>
          
          <button
            className="p-2 text-slate-400 hover:text-red-500 hover:bg-white rounded-lg transition-all shadow-none hover:shadow-sm"
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;