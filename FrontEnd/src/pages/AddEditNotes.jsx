/* eslint-disable react/prop-types */
import { useState } from "react";
import TagInput from "../components/TagInput.jsx";
import { X, Type, AlignLeft, Tag, Plus, Save } from "lucide-react";
import axiosInstance from "../utilis/AxiosInstance.js";

const AddEditNotes = ({ noteData, getAllNotes, type, onClose }) => {
  const [title, setTitle] = useState(noteData?.title || "");
  const [content, setcontent] = useState(noteData?.content || "");
  const [tags, setTags] = useState(noteData?.tags || []);
  const [error, seterror] = useState(null);

  const addNewNote = async () => {
    try {
      const response = await axiosInstance.post("/add-note", {
        title,
        content,
        tags,
      });

      if (response.data && !response.data.error) {
        getAllNotes();
        onClose();
      }
    } catch (error) {
      if (error.response?.data?.message) {
        seterror(error.response.data.message);
      }
    }
  };

  const editNote = async () => {
    const noteId = noteData._id;
    try {
      const response = await axiosInstance.put(`/edit-note/${noteId}`, {
        title,
        content,
        tags,
      });

      if (response.data && response.data.note) {
        getAllNotes();
        onClose();
      }
    } catch (error) {
      if (error.response?.data?.message) {
        seterror(error.response.data.message);
      }
    }
  };

  const handleAddNote = () => {
    if (!title || !content) {
      seterror("Title and Content are required!");
      return;
    }
    seterror("");

    if (type === "edit") {
      editNote();
    } else {
      addNewNote();
    }
  };

  return (
    <div className="relative pt-4">
      {/* Close Button - Clean & Round */}
      <button
        className="w-8 h-8 rounded-full flex items-center justify-center absolute -top-2 -right-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all"
        onClick={onClose}
      >
        <X size={20} />
      </button>

      {/* Title Input Section */}
      <div className="flex flex-col gap-2">
        <label className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
          <Type size={14} /> Title
        </label>
        <input
          type="text"
          className="text-2xl text-slate-900 font-semibold outline-none bg-transparent placeholder:text-slate-300"
          placeholder="Meeting at 4 PM"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
        />
      </div>

      {/* Content TextArea Section */}
      <div className="flex flex-col gap-2 mt-6">
        <label className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
          <AlignLeft size={14} /> Content
        </label>
        <textarea
          className="text-sm text-slate-700 outline-none bg-slate-50/50 p-4 rounded-xl border border-slate-100 focus:border-blue-200 focus:bg-white transition-all leading-relaxed"
          placeholder="Write down your thoughts..."
          rows={10}
          value={content}
          onChange={(ev) => setcontent(ev.target.value)}
        />
      </div>

      {/* Tags Section */}
      <div className="mt-6">
        <label className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
          <Tag size={14} /> Categories
        </label>
        <TagInput tags={tags} setTags={setTags} />
      </div>

      {/* Error Message */}
      {error && (
        <div className="mt-4 p-3 bg-red-50 rounded-lg flex items-center gap-2 text-red-600 text-xs font-medium border border-red-100">
          <span className="w-1 h-1 bg-red-600 rounded-full" /> {error}
        </div>
      )}

      {/* Submit Button - Dynamic & Professional */}
      <button
        className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold mt-8 py-3.5 rounded-xl shadow-lg shadow-blue-100 hover:shadow-blue-200 active:scale-[0.98] transition-all tracking-wide"
        onClick={handleAddNote}
      >
        {type === "edit" ? (
          <>
            <Save size={18} /> UPDATE NOTE
          </>
        ) : (
          <>
            <Plus size={18} /> CREATE NOTE
          </>
        )}
      </button>
    </div>
  );
};

export default AddEditNotes;