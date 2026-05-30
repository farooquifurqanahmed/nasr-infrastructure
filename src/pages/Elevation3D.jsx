import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFirestore } from '../hooks/useFirestore';
import { ChevronLeft, ChevronRight, Maximize2, X, Sparkles } from 'lucide-react';

export default function Elevation3D() {
  const { getElevations } = useFirestore();
  const [elevations, setElevations] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [viewerIndex, setViewerIndex] = useState(null); // index of image in filtered list for fullscreen viewer

  useEffect(() => {
    const unsubscribe = getElevations((data) => {
      setElevations(data);
    });
    return unsubscribe;
  }, []);

  const categories = ['All', 'Villas', 'Apartments', 'Commercial'];

  const filteredElevations = selectedCategory === 'All'
    ? elevations
    : elevations.filter(item => item.category === selectedCategory);

  const openViewer = (idx) => {
    setViewerIndex(idx);
  };

  const closeViewer = () => {
    setViewerIndex(null);
  };

  const prevImage = () => {
    setViewerIndex((prev) => (prev === 0 ? filteredElevations.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setViewerIndex((prev) => (prev === filteredElevations.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="w-full bg-[#080808]">
      {/* Header */}
      <section className="relative py-20 bg-charcoal-dark border-b border-gray-900 text-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:32px_32px] opacity-5" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 space-y-4">
          <span className="text-xs font-bold tracking-[0.3em] text-gold-accent uppercase block">
            Visual Studio
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold uppercase tracking-widest text-white font-serif">
            3D Elevation & Facade Renders
          </h1>
          <p className="text-sm text-gray-400 max-w-xl mx-auto font-light leading-relaxed">
            Hyper-realistic raytraced visuals showing exterior textures, cantilevered divisions, and luxury landscaping options.
          </p>
        </div>
      </section>

      {/* Category selection */}
      <section className="py-6 border-b border-gray-950 bg-charcoal-dark/20 text-center">
        <div className="max-w-7xl mx-auto px-4 overflow-x-auto no-scrollbar flex justify-center space-x-2.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-sm text-xs font-bold tracking-wider uppercase transition-all duration-300 whitespace-nowrap cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-gold-accent text-charcoal-dark shadow-md'
                  : 'bg-[#121212] border border-gray-800 text-gray-400 hover:text-white hover:border-gold-accent/40'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Interactive Grid */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredElevations.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="group glassmorphism rounded-sm border border-gray-800 overflow-hidden flex flex-col justify-between cursor-pointer"
              onClick={() => openViewer(idx)}
            >
              <div className="aspect-[16/10] overflow-hidden relative bg-charcoal-black">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover filter brightness-[0.8] group-hover:scale-[1.03] transition-transform duration-700"
                />
                
                {/* Maximize overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-350">
                  <div className="p-3.5 bg-gold-accent text-charcoal-dark rounded-full shadow-lg hover:scale-105 transition-transform">
                    <Maximize2 className="h-5 w-5" />
                  </div>
                </div>

                <div className="absolute top-4 left-4 px-2.5 py-1 bg-charcoal-dark border border-gray-800 text-gold-accent font-bold text-[9px] uppercase tracking-widest rounded-sm">
                  {item.category} RENDER
                </div>
              </div>

              <div className="p-5 space-y-2">
                <div className="flex items-center space-x-1.5 text-gold-accent text-[9px] font-bold tracking-widest uppercase">
                  <Sparkles className="h-3 w-3 animate-pulse" />
                  <span>Raytraced 3D Model</span>
                </div>
                <h3 className="text-lg font-bold text-white font-serif uppercase tracking-wide">
                  {item.name}
                </h3>
                <p className="text-xs text-gray-400 font-light leading-relaxed">
                  {item.details || item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Fullscreen Slider Viewer Modal */}
      <AnimatePresence>
        {viewerIndex !== null && (
          <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/95">
            {/* Header Controls */}
            <div className="absolute top-0 left-0 right-0 h-20 px-6 sm:px-12 flex justify-between items-center z-10">
              <div className="text-left">
                <span className="text-[9px] font-bold text-gold-accent uppercase tracking-widest block">
                  {filteredElevations[viewerIndex].category} Elevation
                </span>
                <h3 className="text-base sm:text-lg font-bold text-white font-serif uppercase tracking-wider">
                  {filteredElevations[viewerIndex].name}
                </h3>
              </div>
              <button 
                onClick={closeViewer}
                className="p-2 border border-gray-800 hover:border-white text-gray-400 hover:text-white rounded-full bg-black/50 transition-all cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Slider Images */}
            <div className="w-full max-w-5xl px-4 flex items-center justify-between relative">
              {/* Left btn */}
              <button
                onClick={prevImage}
                className="absolute left-6 p-3 border border-gray-800 hover:border-gold-accent text-white hover:text-gold-accent rounded-full bg-black/60 shadow-lg cursor-pointer z-10 hover:scale-105 active:scale-95 transition-all"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>

              {/* Slider image wrapper */}
              <div className="w-full aspect-[16/10] overflow-hidden rounded-sm border border-gray-900 bg-charcoal-dark shadow-2xl relative">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={viewerIndex}
                    src={filteredElevations[viewerIndex].image}
                    alt={filteredElevations[viewerIndex].name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4 }}
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>
              </div>

              {/* Right btn */}
              <button
                onClick={nextImage}
                className="absolute right-6 p-3 border border-gray-800 hover:border-gold-accent text-white hover:text-gold-accent rounded-full bg-black/60 shadow-lg cursor-pointer z-10 hover:scale-105 active:scale-95 transition-all"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>

            {/* Caption */}
            <div className="max-w-2xl text-center px-6 mt-6 space-y-1">
              <p className="text-sm text-gray-300 leading-relaxed font-light font-sans">
                {filteredElevations[viewerIndex].details || filteredElevations[viewerIndex].description}
              </p>
              <div className="text-xs text-gray-500 font-semibold tracking-widest pt-2">
                IMAGE {viewerIndex + 1} OF {filteredElevations.length}
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
