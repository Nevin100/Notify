const Footer = () => {
  return (
    <footer className="bg-white border-t border-slate-100 py-12">
      <div className="container mx-auto px-6 text-center">
        
        <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Notify
        </h3>

        <p className="text-slate-500 mt-4 max-w-md mx-auto text-sm leading-relaxed">
          Built for creators, thinkers, and developers who want clarity in their digital life.
        </p>

        <p className="text-slate-500 mt-4 max-w-md mx-auto text-sm leading-relaxed">
          Developed with ❤️ by <a href="https://www.nevinbali.me" className="text-blue-600 hover:underline">Nevin Bali</a>
        </p>

        <div className="flex items-center justify-center gap-6 mt-8 text-sm text-slate-400">
          <span>© {new Date().getFullYear()} Notify</span>
          <span>•</span>
          <a 
            href="https://github.com/Nevin100/Notify"
            target="_blank"
            rel="noreferrer"
            className="hover:text-blue-600 transition-colors"
          >
            GitHub
          </a>
        </div>

      </div>
    </footer>
  );
};

export default Footer;