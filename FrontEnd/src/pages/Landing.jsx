/* eslint-disable react/prop-types */
import LandingNavbar from "../components/LandingNavbar.jsx";
import Footer from "../components/Footer.jsx";
import { Link } from "react-router-dom";
import { Zap, Shield, Sparkles, Layout } from "lucide-react";

const Landing = () => {
  return (
    <div className="min-h-screen bg-white overflow-y-auto selection:bg-blue-100">
      <LandingNavbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        {/* Abstract background blur for premium feel */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-50/50 via-transparent to-transparent -z-10" />
        
        <div className="container mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-widest mb-8 animate-pulse border border-blue-100">
            <Sparkles size={14} /> New: AI Tagging Coming Soon
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 mb-6 tracking-tight">
            Capture Thoughts, <br />
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Organize Life.
            </span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-slate-500 text-lg md:text-xl mb-10 leading-relaxed">
            Notify is the simplest way to keep your notes organized. Beautifully designed for clarity and speed. Your digital second brain.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-24">
            <Link to="/signup" className="w-full sm:w-auto px-8 py-4 bg-blue-600 text-white rounded-2xl font-bold text-lg shadow-2xl shadow-blue-200 hover:bg-blue-700 transition-all active:scale-95">
              Start for free
            </Link>
            <a href="https://github.com/Nevin100/Notify" target="_blank" rel="noreferrer" className="w-full sm:w-auto px-8 py-4 bg-slate-100 text-slate-700 rounded-2xl font-bold text-lg hover:bg-slate-200 transition-all">
              View on GitHub
            </a>
          </div>

          {/* Screenshots Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto px-4">
            <ScreenshotCard 
              src="/app-dashboard.jpg" 
              title="Main Dashboard" 
              subtitle="All your notes in one place"
            />
            <ScreenshotCard 
              src="/clean-editor.jpg" 
              title="Add Note Editor" 
              subtitle="Add notes with a clean, distraction-free interface"
            />
            <ScreenshotCard 
              src="/pinned-image.jpg" 
              title="Pinned Notes" 
              subtitle="Keep important notes always visible"
            />
            <ScreenshotCard 
              src="/updation-image.jpg" 
              title="Editing Experience" 
              subtitle="Seamless updates with real-time saving"
            />
          </div>
        </div>
      </section>

      {/* Upgraded Features Section */}
      <section className="py-32 bg-slate-50/30">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center mb-20">
            <h2 className="text-4xl font-bold text-slate-900 tracking-tight">Built for Modern Productivity</h2>
            <p className="text-slate-500 mt-4 text-lg">Powerful features wrapped in a minimalist interface to help you focus on your best work.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <FeatureCard 
              icon={<Zap size={28} />} 
              accentColor="blue"
              title="Instant Sync" 
              desc="Your notes are saved instantly as you type. Access your thoughts from any device without missing a beat."
            />
            <FeatureCard 
              icon={<Shield size={28} />} 
              accentColor="indigo"
              title="Secure Cloud" 
              desc="Decent Password Hashing ensures your private data stays private. Your thoughts, your eyes only."
            />
            <FeatureCard 
              icon={<Layout size={28} />} 
              accentColor="emerald"
              title="Intuitive UI" 
              desc="A clutter-free Minimialistic-modern interface designed to reduce cognitive load and help you focus on creativity."
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

// Screenshot Card Component
const ScreenshotCard = ({ src, title, subtitle }) => (
  <div className="group flex flex-col">
    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 transition-all duration-500 group-hover:shadow-blue-200/50">
      <div className="bg-slate-50 border-b border-slate-200 px-4 py-3 flex items-center justify-between">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-400/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/60" />
        </div>
        <div className="bg-white border border-slate-200 px-3 py-1 rounded-md text-[10px] text-slate-400 font-medium tracking-wide">
          notify.app/{title.toLowerCase().replace(/\s+/g, "-")}
        </div>
        <div className="w-8" />
      </div>
      
      <div className="relative aspect-video bg-slate-100 overflow-hidden">
        <img 
          src={src} 
          alt={title} 
          className="w-full h-full object-contain grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
        />
      </div>
    </div>
    
    <div className="mt-5 text-left px-2">
      <h4 className="font-bold text-slate-800 text-lg group-hover:text-blue-600 transition-colors">{title}</h4>
      <p className="text-slate-500 text-sm mt-1">{subtitle}</p>
    </div>
  </div>
);

// High-End Feature Card Component
const FeatureCard = ({ icon, title, desc, accentColor }) => {
  const colors = {
    blue: "bg-blue-50 text-blue-600 border-blue-100 group-hover:bg-blue-600 group-hover:text-white",
    indigo: "bg-indigo-50 text-indigo-600 border-indigo-100 group-hover:bg-indigo-600 group-hover:text-white",
    emerald: "bg-emerald-50 text-emerald-600 border-emerald-100 group-hover:bg-emerald-600 group-hover:text-white"
  };

  return (
    <div className="relative group p-1 bg-gradient-to-b from-transparent to-transparent hover:from-slate-200 hover:to-slate-100 rounded-[2.5rem] transition-all duration-500 shadow-sm hover:shadow-2xl">
      <div className="bg-white p-10 rounded-[2.4rem] h-full flex flex-col items-start text-left transition-all duration-300">
        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 border transition-all duration-500 ${colors[accentColor]}`}>
          {icon}
        </div>
        
        <h3 className="text-2xl font-bold text-slate-800 mb-4 group-hover:translate-x-1 transition-transform duration-300">{title}</h3>
        <p className="text-slate-500 leading-relaxed mb-8 flex-grow">
          {desc}
        </p>
      </div>
    </div>
  );
};

export default Landing;