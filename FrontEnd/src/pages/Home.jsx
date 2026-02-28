/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar.jsx";
import NoteCard from "../components/NoteCard.jsx";
import AddEditNotes from "./AddEditNotes.jsx";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utilis/AxiosInstance.js";
import moment from "moment";
import { Plus, StickyNote, SearchX } from "lucide-react";

const Home = () => {
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const [userInfo, setUserInfo] = useState(null);
  const [allNotes, setAllNotes] = useState([]);
  const navigate = useNavigate();
  const [isSearch, setIsSearch] = useState(false);

  const handleEdit = (noteDetails) => {
    setOpenAddEditModal({ isShown: true, data: noteDetails, type: "edit" });
  };

  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.clear();
        navigate("/login");
      }
    }
  };

  const getAllNotes = async () => {
    try {
      const response = await axiosInstance.get("/get-all-notes");
      if (response.data && response.data.notes) {
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log("Error fetching notes:", error);
    }
  };

  const deleteNote = async (data) => {
    const noteId = data._id;
    try {
      const response = await axiosInstance.delete(`/delete-note/${noteId}`);
      if (response.data && !response.data.error) {
        setAllNotes((prev) => prev.filter((note) => note._id !== noteId));
      }
    } catch (error) {
      console.log("Delete error:", error);
    }
  };

  const onSearchNote = async (query) => {
    try {
      const response = await axiosInstance.get("/search-notes", {
        params: { query },
      });
      if (response.data && response.data.notes) {
        setIsSearch(true);
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClearSearch = () => {
    setIsSearch(false);
    getAllNotes();
  };

  const updateisPinned = async (noteData) => {
    const noteId = noteData._id;
    try {
      const response = await axiosInstance.put(`/update-note-pinned/${noteId}`, {
        isPinned: !noteData.isPinned,
      });
      if (response.data && response.data.note) {
        getAllNotes();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllNotes();
    getUserInfo();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50/50">
      <Navbar
        userInfo={userInfo}
        onSearchNote={onSearchNote}
        handleClearSearch={handleClearSearch}
      />

      <main className="container mx-auto px-6 py-10">
        {allNotes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-300">
            {allNotes.map((item) => (
              <NoteCard
                key={item._id}
                title={item.title}
                date={moment(item.createdOn).format("MMM Do, YYYY")}
                content={item.content}
                tags={item.tags}
                isPinned={item.isPinned}
                onEdit={() => handleEdit(item)}
                onDelete={() => deleteNote(item)}
                onPinNote={() => updateisPinned(item)}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center mt-32 text-center animate-in fade-in zoom-in duration-500">
            {isSearch ? (
              <>
                <SearchX size={80} className="text-slate-300 mb-4" />
                <p className="text-slate-500">Oops! No notes found matching your search.</p>
              </>
            ) : (
              <>
                <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-6">
                  <StickyNote size={40} className="text-blue-500" />
                </div>
                <h2 className="text-2xl font-semibold text-slate-800">
                  Ready to capture your thoughts?
                </h2>
                <p className="mt-2 text-slate-500 max-w-sm leading-relaxed">
                  Start by adding your first note! Click the button below to organize your ideas, tasks, and goals.
                </p>
              </>
            )}
          </div>
        )}
      </main>

      {/* Floating Action Button - Modernized */}
      <button
        className="fixed right-6 bottom-6 md:right-10 md:bottom-10 w-14 h-14 md:w-16 md:h-16 flex items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-200 hover:bg-blue-700 hover:shadow-xl transition-all duration-300 group"
        onClick={() => {
          setOpenAddEditModal({ isShown: true, type: "add", data: null });
        }}
      >
        <Plus size={32} className="group-hover:scale-110 transition-transform" />
      </button>

      {/* Modal - Modern Styling */}
      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() => setOpenAddEditModal({ isShown: false, type: "add", data: null })}
        style={{
          overlay: { backgroundColor: "rgba(15, 23, 42, 0.4)", backdropFilter: "blur(4px)", zIndex: 1000 },
        }}
        contentLabel="Add or Edit Note"
        className="w-[90%] md:w-[60%] lg:w-[40%] max-h-[80vh] bg-white rounded-2xl mx-auto mt-20 p-6 shadow-2xl overflow-y-auto outline-none"
      >
        <AddEditNotes
          type={openAddEditModal.type}
          noteData={openAddEditModal.data}
          onClose={() => setOpenAddEditModal({ isShown: false, type: "add", data: null })}
          getAllNotes={getAllNotes}
        />
      </Modal>
    </div>
  );
};

export default Home;