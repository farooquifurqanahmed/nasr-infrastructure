import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, ArrowRight, Download, Send } from 'lucide-react';
import logo from '../assets/logo.png';

export default function Footer({ setCurrentPage, onOpenConsultation }) {
  const [email, setEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState('');

  const handleNavClick = (pageId) => {
    setCurrentPage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setNewsletterStatus('Subscribing...');
    setTimeout(() => {
      setNewsletterStatus('Subscribed Successfully!');
      setEmail('');
      setTimeout(() => setNewsletterStatus(''), 4000);
    }, 1500);
  };

  const handleDownloadBrochure = () => {
    // Generate a mock PDF brochure download
    alert("Downloading Nasr Infrastructure Legacy Brochure (PDF)... \nThank you for your interest in our premium architectural and engineering solutions.");
  };

  return (
    <footer className="bg-charcoal-dark border-t border-gray-900 text-gray-400 font-sans">
      {/* Newsletter / CTA banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-b border-gray-950">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5">
            <h3 className="text-xl font-bold text-white uppercase tracking-wider font-serif">
              Subscribe to our Design Legacy
            </h3>
            <p className="mt-2 text-sm text-gray-400">
              Get notified of project handovers, luxury facades, and sustainable urban infrastructure insights.
            </p>
          </div>
          <div className="lg:col-span-7">
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Enter your luxury/business email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-[#161616] border border-gray-800 rounded-sm text-white placeholder-gray-500 focus:outline-none focus:border-gold-accent transition-colors"
              />
              <button
                type="submit"
                className="sm:w-auto w-full flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-gold-hover to-gold-accent text-charcoal-dark font-bold text-xs uppercase tracking-wider hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              >
                <span>Subscribe</span>
                <Send className="h-3 w-3" />
              </button>
            </form>
            {newsletterStatus && (
              <p className="mt-2 text-xs text-gold-accent font-semibold">{newsletterStatus}</p>
            )}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">
          {/* Brand Col */}
          <div className="lg:col-span-4">
            <div className="flex items-center space-x-3 mb-6 cursor-pointer" onClick={() => handleNavClick('home')}>
              <img src={logo} alt="Nasr Infrastructure Logo" className="h-16 w-auto" />
              <div>
                <span className="text-xl font-bold tracking-widest block text-white font-serif uppercase">
                  Nasr
                </span>
                <span className="text-[10px] tracking-[0.25em] block text-gold-accent font-semibold uppercase">
                  Infrastructure
                </span>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-6">
              Nasr Infrastructure specializes in structural engineering, luxury architecture design, and smart city developments. Creating state-of-the-art residential and commercial legacy assets globally.
            </p>
            <button
              onClick={handleDownloadBrochure}
              className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-gold-accent border border-gold-accent/40 hover:border-gold-accent px-4 py-2.5 rounded-sm hover:bg-gold-accent/5 transition-all cursor-pointer"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Download Corporate Brochure</span>
            </button>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-2 lg:pl-4">
            <h4 className="text-white text-xs font-bold tracking-widest uppercase mb-6 border-l-2 border-gold-accent pl-3">
              Explore
            </h4>
            <ul className="space-y-3.5 text-sm">
              {[
                { id: 'home', label: 'Home' },
                { id: 'about', label: 'About Us' },
                { id: 'services', label: 'Our Services' },
                { id: 'projects', label: 'Featured Projects' },
                { id: 'elevation', label: '3D Elevations' },
                { id: 'contact', label: 'Get in Touch' }
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => handleNavClick(link.id)}
                    className="hover:text-gold-accent transition-colors flex items-center group cursor-pointer"
                  >
                    <ArrowRight className="h-3 w-3 mr-2 text-gray-600 group-hover:text-gold-accent transition-colors" />
                    <span>{link.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Services */}
          <div className="lg:col-span-3">
            <h4 className="text-white text-xs font-bold tracking-widest uppercase mb-6 border-l-2 border-gold-accent pl-3">
              Core Expertise
            </h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li>• Architecture Design & Modeling</li>
              <li>• Luxury Front Elevation Render</li>
              <li>• Smart Urban Town Development</li>
              <li>• Commercial High-Rise Systems</li>
              <li>• Residential Villa Construction</li>
              <li>• Seismic Structural Engineering</li>
              <li>• Custom Landscape & Pools</li>
            </ul>
            <button 
              onClick={onOpenConsultation}
              className="mt-5 text-xs text-gold-accent font-semibold hover:underline block cursor-pointer"
            >
              Book private consultation &rarr;
            </button>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-3">
            <h4 className="text-white text-xs font-bold tracking-widest uppercase mb-6 border-l-2 border-gold-accent pl-3">
              HQ Address
            </h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-gold-accent mr-3 mt-0.5 shrink-0" />
                <span className="text-gray-300">
                  Galli No 10, Peerburhan Nagar,<br />
                  Nanded - 431605, Maharashtra, India
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-4.5 w-4.5 text-gold-accent mr-3.5 shrink-0" />
                <span className="text-gray-300">+91 90752 05258</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-4.5 w-4.5 text-gold-accent mr-3.5 shrink-0" />
                <span className="text-gray-300 hover:text-gold-accent transition-colors cursor-pointer">
                  Nasr.infra@gmail.com
                </span>
              </li>
              <li className="flex items-start">
                <Clock className="h-4.5 w-4.5 text-gold-accent mr-3.5 mt-0.5 shrink-0" />
                <span className="text-xs text-gray-400">
                  Mon - Sat: 08:00 AM - 06:00 PM<br />
                  Sunday: Closed
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Sub-Footer */}
      <div className="bg-[#050505] py-6 border-t border-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center text-xs">
          <p>&copy; {new Date().getFullYear()} Nasr Infrastructure. All Rights Reserved. Built on Trust, Designed for Legacy.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-gold-accent transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gold-accent transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-gold-accent transition-colors">Seismic Codes</a>
            <a href="#" className="hover:text-gold-accent transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
