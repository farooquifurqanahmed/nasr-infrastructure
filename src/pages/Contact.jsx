import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, CheckCircle2, Shield, Calendar, Send } from 'lucide-react';
import { useFirestore } from '../hooks/useFirestore';

export default function Contact() {
  const { addInquiry, loading, error } = useFirestore();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    serviceRequired: 'Architecture Design',
    message: ''
  });

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addInquiry(formData);
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        serviceRequired: 'Architecture Design',
        message: ''
      });
      setTimeout(() => setSubmitted(false), 8000);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="w-full bg-[#080808]">
      {/* Header */}
      <section className="relative py-20 bg-charcoal-dark border-b border-gray-900 text-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:32px_32px] opacity-5" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 space-y-4">
          <span className="text-xs font-bold tracking-[0.3em] text-gold-accent uppercase block">
            Partner With Us
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold uppercase tracking-widest text-white font-serif">
            Contact & Consultations
          </h1>
          <p className="text-sm text-gray-400 max-w-xl mx-auto font-light leading-relaxed">
            Begin the blueprint of your residential or commercial legacy today. Reach out to our lead designers.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Info Details */}
          <div className="lg:col-span-5 space-y-12">
            <div className="space-y-4">
              <span className="text-xs font-bold tracking-[0.2em] text-gold-accent uppercase block">
                Office Information
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold uppercase tracking-wider text-white font-serif">
                Headquarters
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 font-light leading-relaxed">
                Connect with our senior consultants or schedule an in-person structural blueprint review at our skyline design studio.
              </p>
            </div>

            <div className="space-y-6 text-sm">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-charcoal-dark border border-gray-800 text-gold-accent rounded-sm shrink-0">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-white font-bold uppercase tracking-wider text-xs">HQ Address</h4>
                  <p className="mt-1 text-gray-400 font-light leading-relaxed">
                    Galli No 10, Peerburhan Nagar,<br />
                    Nanded - 431605, Maharashtra, India
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="p-3 bg-charcoal-dark border border-gray-800 text-gold-accent rounded-sm shrink-0">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-white font-bold uppercase tracking-wider text-xs">Telephone</h4>
                  <p className="mt-1 text-gray-400 font-light">+91 94031 03966</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="p-3 bg-charcoal-dark border border-gray-800 text-gold-accent rounded-sm shrink-0">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-white font-bold uppercase tracking-wider text-xs">Email Correspondence</h4>
                  <p className="mt-1 text-gray-400 font-light hover:text-gold-accent transition-colors cursor-pointer">
                    nasr.infra@gmail.com
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-3 bg-charcoal-dark border border-gray-800 text-gold-accent rounded-sm shrink-0">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-white font-bold uppercase tracking-wider text-xs">HQ Operating Hours</h4>
                  <p className="mt-1 text-xs text-gray-400 font-light leading-relaxed">
                    Monday - Saturday: 08:00 AM - 06:00 PM<br />
                    Sunday: Closed (Site emergency team active)
                  </p>
                </div>
              </div>
            </div>

            {/* Google Map Mock Visual */}
            <div className="aspect-video rounded-sm overflow-hidden border border-gray-800 bg-[#121212] relative group">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.7562858189874!2d77.30058789999999!3d19.118335!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bce2a2bf8542cd5%3A0xe543b5930b80ba8e!2sPeer%20Burhan%20Nagar%2C%20Nanded%2C%20Maharashtra%20431605!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
                className="w-full h-full border-0 filter invert-[0.9] hue-rotate-[180deg] brightness-[0.9] contrast-[1.2]"
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Nasr Infrastructure Headquarters Map Location"
              />
              <div className="absolute bottom-2 left-2 px-3 py-1 bg-charcoal-dark/90 text-gold-accent font-bold text-[9px] uppercase tracking-widest border border-gray-800 rounded-sm pointer-events-none">
                NASR Nanded Office HQ
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7 bg-[#0c0c0c] border border-gray-900 p-8 sm:p-10 rounded-sm shadow-xl">
            <span className="text-xs font-bold tracking-[0.2em] text-gold-accent uppercase block mb-3">
              Request Quotation
            </span>
            <h3 className="text-2xl font-bold uppercase tracking-wider text-white font-serif mb-6">
              Consultation Form
            </h3>

            {submitted ? (
              <div className="flex flex-col items-center justify-center text-center py-16 space-y-4">
                <CheckCircle2 className="h-16 w-16 text-gold-accent animate-bounce" />
                <h4 className="text-xl font-bold uppercase tracking-widest font-serif text-gold-accent">
                  Message Transmitted
                </h4>
                <p className="text-sm text-gray-300 max-w-sm">
                  Thank you for submitting your project parameters. A Senior Structural Engineer and lead architect will connect with you via phone/email shortly.
                </p>
                <div className="pt-2 text-xs text-gray-500 flex items-center space-x-1">
                  <Shield className="h-3.5 w-3.5 text-gold-accent" />
                  <span>Secure SSL submission recorded in Firestore</span>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 text-sm text-gray-300">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                      Full Name / Entity Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Samuel Sterling"
                      className="w-full px-4 py-3 bg-[#161616] border border-gray-800 rounded-sm text-white focus:outline-none focus:border-gold-accent placeholder-gray-600 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="email@example.com"
                      className="w-full px-4 py-3 bg-[#161616] border border-gray-800 rounded-sm text-white focus:outline-none focus:border-gold-accent placeholder-gray-600 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 94031 03966"
                      className="w-full px-4 py-3 bg-[#161616] border border-gray-800 rounded-sm text-white focus:outline-none focus:border-gold-accent placeholder-gray-600 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                      Service Required *
                    </label>
                    <select
                      name="serviceRequired"
                      value={formData.serviceRequired}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[#161616] border border-gray-800 rounded-sm text-white focus:outline-none focus:border-gold-accent transition-colors"
                    >
                      {services.map((serv) => (
                        <option key={serv} value={serv} className="bg-charcoal-black text-white">
                          {serv}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                    Project Parameters & Descriptions *
                  </label>
                  <textarea
                    name="message"
                    required
                    rows="6"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Provide details about the plot location, zoning classification, desired square footage, budget guidelines, and aesthetic preferences..."
                    className="w-full px-4 py-3 bg-[#161616] border border-gray-800 rounded-sm text-white focus:outline-none focus:border-gold-accent placeholder-gray-600 transition-colors resize-none"
                  />
                </div>

                {error && (
                  <p className="text-xs text-red-500 font-semibold">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center space-x-2 py-4 bg-gradient-to-r from-gold-hover via-gold-accent to-gold-light text-charcoal-dark font-sans font-bold tracking-widest text-xs uppercase shadow-lg hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer disabled:opacity-50"
                >
                  <span>{loading ? 'Submitting...' : 'Transmit Inquire Request'}</span>
                  {!loading && <Send className="h-4 w-4" />}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
