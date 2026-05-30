import { useState } from 'react';
import { X, CheckCircle, Shield, Calendar, Send } from 'lucide-react';
import { useFirestore } from '../hooks/useFirestore';

export default function QuoteRequestPopup({ isOpen, onClose }) {
  const { addInquiry, loading, error } = useFirestore();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    serviceRequired: 'Architecture Design',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const services = [
    'Architecture Design',
    'Front Elevation Design',
    'Residential Construction',
    'Commercial Buildings',
    'City Planning',
    'Smart Urban Development',
    'Structural Engineering',
    'Interior Design',
    'Renovation & Remodeling',
    'Landscape Planning',
    '3D Visualization & Elevation Rendering'
  ];

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addInquiry(formData);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          name: '',
          email: '',
          phone: '',
          serviceRequired: 'Architecture Design',
          message: ''
        });
        onClose();
      }, 4000);
    } catch (err) {
      alert("Submission error: " + err.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop blur */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-lg glassmorphism text-white rounded-sm overflow-hidden shadow-2xl z-10 animate-scaleUp">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-800 bg-[#161616]">
          <div className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-gold-accent" />
            <h3 className="text-base font-bold uppercase tracking-widest font-serif text-white">
              Request Consultation
            </h3>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {submitted ? (
            <div className="flex flex-col items-center justify-center text-center py-10 space-y-4">
              <CheckCircle className="h-16 w-16 text-gold-accent animate-bounce" />
              <h4 className="text-xl font-bold uppercase tracking-widest font-serif text-gold-accent">
                Request Submitted
              </h4>
              <p className="text-sm text-gray-300 max-w-sm">
                Thank you, <span className="font-semibold text-white">{formData.name}</span>. 
                Our structural engineering and architectural design team will contact you within 24 hours.
              </p>
              <div className="pt-2 text-xs text-gray-500 flex items-center space-x-1.5">
                <Shield className="h-3.5 w-3.5" />
                <span>End-to-end secure transmission</span>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-sm">
              <p className="text-xs text-gray-400 leading-relaxed">
                Connect with our premium planning experts. Fill in your project briefing details below to request a private consultation.
              </p>

              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                  Full Name / Entity *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. John Doe / Al-Ameed Corp"
                  className="w-full px-3 py-2 bg-[#181818] border border-gray-800 rounded-sm text-white focus:outline-none focus:border-gold-accent placeholder-gray-600 transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="email@example.com"
                    className="w-full px-3 py-2 bg-[#181818] border border-gray-800 rounded-sm text-white focus:outline-none focus:border-gold-accent placeholder-gray-600 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+971 50 000 0000"
                    className="w-full px-3 py-2 bg-[#181818] border border-gray-800 rounded-sm text-white focus:outline-none focus:border-gold-accent placeholder-gray-600 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                  Service Required *
                </label>
                <select
                  name="serviceRequired"
                  value={formData.serviceRequired}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-[#181818] border border-gray-800 rounded-sm text-white focus:outline-none focus:border-gold-accent transition-colors"
                >
                  {services.map((serv) => (
                    <option key={serv} value={serv} className="bg-charcoal-black text-white">
                      {serv}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                  Project Description & Specifications *
                </label>
                <textarea
                  name="message"
                  required
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Outline the area, timeline, site coordinates, or styling preferences (e.g. Modernist, Brutalist, Classic Gold, Minimal Travertine...)"
                  className="w-full px-3 py-2 bg-[#181818] border border-gray-800 rounded-sm text-white focus:outline-none focus:border-gold-accent placeholder-gray-600 transition-colors resize-none"
                />
              </div>

              {error && (
                <p className="text-xs text-red-500 font-semibold">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center space-x-2 py-3 rounded-sm bg-gradient-to-r from-gold-hover via-gold-accent to-gold-light text-charcoal-dark font-bold text-xs uppercase tracking-widest hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 cursor-pointer disabled:opacity-50"
              >
                <span>{loading ? 'Submitting...' : 'Submit Consultation Request'}</span>
                {!loading && <Send className="h-3.5 w-3.5" />}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
