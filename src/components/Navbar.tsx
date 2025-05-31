
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-b border-slate-200">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-3">
            <img 
              src="/lovable-uploads/fbaf95e8-9683-46a8-95c7-05355458b3c9.png" 
              alt="WukalaGPT" 
              className="w-10 h-10 object-contain"
            />
            <span className="text-2xl font-bold text-slate-800 font-serif">
              Wukala<span className="text-blue-900">GPT</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-slate-700 hover:text-blue-900 transition-colors font-medium">
              Home
            </Link>
            <Link to="/blog" className="text-slate-700 hover:text-blue-900 transition-colors font-medium">
              Legal Resources
            </Link>
            <Link to="/chatbot" className="text-slate-700 hover:text-blue-900 transition-colors font-medium">
              AI Assistant
            </Link>
            <div className="flex items-center space-x-4">
              <Link to="/login">
                <Button variant="ghost" className="text-slate-700 hover:text-blue-900">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-blue-900 hover:bg-blue-800 text-white">
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <span className={`w-full h-0.5 bg-slate-700 transition-all ${isMenuOpen ? 'rotate-45 translate-y-1' : ''}`}></span>
              <span className={`w-full h-0.5 bg-slate-700 my-1 transition-all ${isMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`w-full h-0.5 bg-slate-700 transition-all ${isMenuOpen ? '-rotate-45 -translate-y-1' : ''}`}></span>
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-200 bg-white">
            <div className="flex flex-col space-y-4">
              <Link to="/" className="text-slate-700 hover:text-blue-900 transition-colors font-medium">
                Home
              </Link>
              <Link to="/blog" className="text-slate-700 hover:text-blue-900 transition-colors font-medium">
                Legal Resources
              </Link>
              <Link to="/chatbot" className="text-slate-700 hover:text-blue-900 transition-colors font-medium">
                AI Assistant
              </Link>
              <div className="flex flex-col space-y-2 pt-4">
                <Link to="/login">
                  <Button variant="ghost" className="w-full text-slate-700 hover:text-blue-900">
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="w-full bg-blue-900 hover:bg-blue-800 text-white">
                    Sign Up
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
