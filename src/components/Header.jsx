import { useState } from 'react';
import { Menu, X, Sun, Moon, PhoneCall } from 'lucide-react';
import logo from '../assets/logo.png';

export default function Header({ currentPage, setCurrentPage, isDark, toggleTheme, onOpenConsultation }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'projects', label: 'Projects' },
    { id: 'elevation', label: '3D Elevations' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleNavClick = (pageId) => {
    setCurrentPage(pageId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300 glassmorphism shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo Brand */}
          <div 
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => handleNavClick('home')}
          >
            <img 
              src={logo} 
              alt="Nasr Infrastructure Logo" 
              className="h-14 w-auto object-contain brightness-110 filter hover:scale-105 transition-transform"
            />
            <div className="hidden sm:block">
              <span className="text-lg font-bold tracking-widest block uppercase text-white font-serif">
                Nasr
              </span>
              <span className="text-[10px] tracking-[0.25em] block text-gold-accent font-sans font-semibold uppercase">
                Infrastructure
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 items-center">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`relative py-2 text-sm font-medium tracking-wider uppercase transition-colors duration-200 cursor-pointer ${
                  currentPage === item.id 
                    ? 'text-gold-accent' 
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {item.label}
                {currentPage === item.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold-accent rounded-full" />
                )}
              </button>
            ))}
          </nav>

          {/* Actions: Theme Toggle & Quote Button */}
          <div className="hidden md:flex items-center space-x-6">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full border border-gray-700 text-gray-300 hover:text-white hover:border-gold-accent transition-all duration-300 cursor-pointer"
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDark ? <Sun className="h-5 w-5 text-gold-accent animate-pulse" /> : <Moon className="h-5 w-5" />}
            </button>

            <button
              onClick={onOpenConsultation}
              className="flex items-center space-x-2 px-5 py-2.5 rounded-sm bg-gradient-to-r from-gold-hover via-gold-accent to-gold-light text-charcoal-dark font-sans font-bold tracking-wider text-xs uppercase shadow-md hover:shadow-gold-accent/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer"
            >
              <PhoneCall className="h-3.5 w-3.5" />
              <span>Get Consultation</span>
            </button>
            
            {/* Quick Link to Admin */}
            <button 
              onClick={() => handleNavClick('admin')}
              className={`text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded border transition-colors ${
                currentPage === 'admin' 
                  ? 'border-gold-accent text-gold-accent' 
                  : 'border-gray-700 text-gray-400 hover:text-white hover:border-gray-500'
              }`}
            >
              Admin
            </button>
          </div>

          {/* Mobile controls (hamburger + theme toggle) */}
          <div className="flex md:hidden items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full border border-gray-700 text-gray-300 hover:text-white transition-all cursor-pointer"
            >
              {isDark ? <Sun className="h-5 w-5 text-gold-accent" /> : <Moon className="h-5 w-5" />}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-gray-300 hover:text-white transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden glassmorphism border-t border-gray-800 animate-fadeIn">
          <div className="px-2 pt-2 pb-6 space-y-1 sm:px-3 flex flex-col items-center">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full py-3 text-center text-base font-semibold tracking-widest uppercase transition-colors ${
                  currentPage === item.id
                    ? 'text-gold-accent bg-white/5'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
              </button>
            ))}
            
            <button
              onClick={() => handleNavClick('admin')}
              className={`w-full py-3 text-center text-base font-semibold tracking-widest uppercase transition-colors ${
                currentPage === 'admin'
                  ? 'text-gold-accent bg-white/5'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Admin Dashboard
            </button>

            <div className="pt-4 w-full px-4">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenConsultation();
                }}
                className="w-full flex items-center justify-center space-x-2 py-3 rounded-sm bg-gradient-to-r from-gold-hover to-gold-accent text-charcoal-dark font-sans font-bold tracking-wider text-sm uppercase shadow-md transition-all duration-300 cursor-pointer"
              >
                <PhoneCall className="h-4 w-4" />
                <span>Get Consultation</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
