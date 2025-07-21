import { useState, type JSX } from "react";
import { Menu, X } from "lucide-react";

export default function Header(): JSX.Element {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <section>
        <header className="bg-white shadow-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Logo */}
              <div className="flex-shrink-0 text-xl font-bold text-blue-600">
                Admin Panel
              </div>

              {/* Right: Avatar */}
              <div className="flex items-center space-x-4">
                <img
                  src="https://i.pravatar.cc/32"
                  alt="User Avatar"
                  className="w-8 h-8 rounded-full border"
                />
              </div>

              {/* Mobile Menu Button */}
              <div className="md:hidden">
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="text-gray-700 hover:text-blue-600 focus:outline-none"
                >
                  {menuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          {menuOpen && (
            <nav className="md:hidden px-4 pb-4 space-y-2">
              <a href="#" className="block text-gray-700 hover:text-blue-600">
                Dashboard
              </a>
              <a href="#" className="block text-gray-700 hover:text-blue-600">
                Users
              </a>
              <a href="#" className="block text-gray-700 hover:text-blue-600">
                Settings
              </a>
            </nav>
          )}
        </header>
      </section>
    </>
  );
}
