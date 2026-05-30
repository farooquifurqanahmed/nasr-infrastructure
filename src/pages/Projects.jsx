import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFirestore } from '../hooks/useFirestore';
import { MapPin, Calendar, Layers, X, Eye, PhoneCall } from 'lucide-react';

// Custom Before/After Comparison Component
function BeforeAfterSlider({ before, after }) {
  const [sliderPos, setSliderPos] = useState(50);

  const handleSliderChange = (e) => {
    setSliderPos(Number(e.target.value));
  };

  return (
    <div className="relative w-full aspect-[16/10] overflow-hidden rounded-sm select-none border border-gray-800">
      {/* After Image (Base) */}
      <img 
        src={after} 
        alt="After finished construction" 
        className="absolute inset-0 w-full h-full object-cover" 
      />
      
      {/* Label After */}
      <div className="absolute right-4 bottom-4 px-2.5 py-1 bg-gold-accent/90 text-charcoal-dark font-bold text-[10px] tracking-wider uppercase rounded-sm z-10">
        Completed Legacy
      </div>

      {/* Before Image (Clipped overlay) */}
      <div 
        className="absolute inset-0 overflow-hidden" 
        style={{ width: `${sliderPos}%` }}
      >
        <img 
          src={before} 
          alt="Before construction raw site" 
          className="absolute inset-0 w-full h-full object-cover max-w-none" 
          style={{ width: '100%', height: '100%', minWidth: '400px' }} // crude approximation of container width
        />
        
        {/* Label Before */}
        <div className="absolute left-4 bottom-4 px-2.5 py-1 bg-charcoal-dark/90 text-gray-300 font-bold text-[10px] tracking-wider uppercase rounded-sm z-10">
          Raw Structural Site
        </div>
      </div>

      {/* Slider Line Divider */}
      <div 
        className="absolute top-0 bottom-0 w-[2px] bg-gold-accent pointer-events-none z-20"
        style={{ left: `${sliderPos}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-gold-accent border-2 border-charcoal-dark flex items-center justify-center shadow-lg pointer-events-none">
          <span className="text-[10px] text-charcoal-dark font-bold">↔</span>
        </div>
      </div>

      {/* Actual Range input overlay */}
      <input 
        type="range"
        min="0"
        max="100"
        value={sliderPos}
        onChange={handleSliderChange}
        className="absolute inset-0 opacity-0 cursor-ew-resize w-full h-full z-30" 
      />
    </div>
  );
}

export default function Projects({ onOpenConsultation }) {
  const { getProjects } = useFirestore();
  const [projects, setProjects] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeTab, setActiveTab] = useState('specs'); // specs or gallery or beforeafter

  useEffect(() => {
    const unsubscribe = getProjects((data) => {
      setProjects(data);
    });
    return unsubscribe;
  }, []);

  const categories = ['All', 'Residential', 'Commercial', 'Urban Development', 'Elevation Designs', 'Interiors'];

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter(p => p.category === selectedCategory);

  return (
    <div className="w-full bg-[#080808]">
      {/* Page Header */}
      <section className="relative py-20 bg-charcoal-dark border-b border-gray-900 text-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:32px_32px] opacity-5" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 space-y-4">
          <span className="text-xs font-bold tracking-[0.3em] text-gold-accent uppercase block">
            Completed Portfolios
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold uppercase tracking-widest text-white font-serif">
            Our Architectural Masterpieces
          </h1>
          <p className="text-sm text-gray-400 max-w-xl mx-auto font-light leading-relaxed">
            A curated showcase of luxury apartments, bespoke villas, commercial hubs, and structural engineering landmarks.
          </p>
        </div>
      </section>

      {/* Category Selection Filter */}
      <section className="py-8 border-b border-gray-950 bg-charcoal-dark/20 text-center">
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

      {/* Projects Grid */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="group glassmorphism border border-gray-800 rounded-sm overflow-hidden flex flex-col justify-between cursor-pointer"
                onClick={() => {
                  setSelectedProject(project);
                  setActiveTab('specs');
                }}
              >
                {/* Image Showcase */}
                <div className="h-64 overflow-hidden relative">
                  <img 
                    src={project.mainImage} 
                    alt={project.name} 
                    className="w-full h-full object-cover filter brightness-[0.85] group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Absolute visual indicator */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300 z-10">
                    <div className="p-3 bg-gold-accent text-charcoal-dark rounded-full shadow-lg">
                      <Eye className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="absolute top-4 left-4 px-2.5 py-1 bg-charcoal-dark border border-gray-800 text-gold-accent font-bold text-[9px] uppercase tracking-widest rounded-sm">
                    {project.category}
                  </div>
                </div>

                {/* Text summary info */}
                <div className="p-6 space-y-3 flex-grow">
                  <div className="flex justify-between items-center text-[10px] text-gray-500 font-semibold uppercase tracking-wider">
                    <span className="flex items-center">
                      <MapPin className="h-3 w-3 mr-1 text-gold-accent" />
                      {project.location}
                    </span>
                    <span className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1 text-gold-accent" />
                      {project.year}
                    </span>
                  </div>
                  
                  <h3 className="text-base font-bold text-white uppercase tracking-wider font-serif group-hover:text-gold-accent transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-xs text-gray-400 font-light leading-relaxed line-clamp-2">
                    {project.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* Fullscreen Project Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            />

            {/* Modal Body Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-4xl glassmorphism rounded-sm shadow-2xl z-10 overflow-hidden text-white flex flex-col max-h-[90vh]"
            >
              {/* Header */}
              <div className="flex justify-between items-center px-6 py-4 bg-[#161616] border-b border-gray-800">
                <div>
                  <span className="text-[10px] font-bold text-gold-accent uppercase tracking-widest">
                    {selectedProject.category} Project
                  </span>
                  <h3 className="text-lg font-bold text-white uppercase tracking-wider font-serif mt-0.5">
                    {selectedProject.name}
                  </h3>
                </div>
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="p-1 rounded-full text-gray-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Scrollable Content Area */}
              <div className="overflow-y-auto p-6 sm:p-8 space-y-8 flex-grow">
                {/* 3 Option view switcher */}
                <div className="flex border-b border-gray-900 pb-px">
                  <button
                    onClick={() => setActiveTab('specs')}
                    className={`pb-3 text-xs font-bold uppercase tracking-wider mr-6 relative cursor-pointer ${
                      activeTab === 'specs' ? 'text-gold-accent' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    Specifications
                    {activeTab === 'specs' && <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold-accent" />}
                  </button>

                  <button
                    onClick={() => setActiveTab('beforeafter')}
                    className={`pb-3 text-xs font-bold uppercase tracking-wider mr-6 relative cursor-pointer ${
                      activeTab === 'beforeafter' ? 'text-gold-accent' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    Before/After Slider
                    {activeTab === 'beforeafter' && <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold-accent" />}
                  </button>

                  <button
                    onClick={() => setActiveTab('gallery')}
                    className={`pb-3 text-xs font-bold uppercase tracking-wider relative cursor-pointer ${
                      activeTab === 'gallery' ? 'text-gold-accent' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    Design Gallery
                    {activeTab === 'gallery' && <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold-accent" />}
                  </button>
                </div>

                {/* Tab Contents */}
                <div>
                  {activeTab === 'specs' && (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                      <div className="lg:col-span-7 aspect-[16/10] rounded-sm overflow-hidden border border-gray-800">
                        <img 
                          src={selectedProject.mainImage} 
                          alt={selectedProject.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="lg:col-span-5 space-y-4">
                        <h4 className="text-sm font-bold uppercase tracking-widest text-gold-accent border-b border-gray-900 pb-2">
                          Engineering Blueprint
                        </h4>
                        
                        <p className="text-xs text-gray-400 leading-relaxed font-light">
                          {selectedProject.description}
                        </p>

                        <div className="space-y-2.5 pt-2 text-xs">
                          <div className="flex justify-between border-b border-gray-900 pb-2">
                            <span className="text-gray-400 font-semibold">Location:</span>
                            <span className="text-white">{selectedProject.location}</span>
                          </div>
                          <div className="flex justify-between border-b border-gray-900 pb-2">
                            <span className="text-gray-400 font-semibold">Year Completed:</span>
                            <span className="text-white">{selectedProject.year}</span>
                          </div>
                          
                          {/* Specs dictionary rendering */}
                          {selectedProject.specifications && Object.entries(selectedProject.specifications).map(([key, val]) => (
                            <div key={key} className="flex justify-between border-b border-gray-900 pb-2">
                              <span className="text-gray-400 font-semibold">{key}:</span>
                              <span className="text-white">{val}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'beforeafter' && (
                    <div className="max-w-2xl mx-auto space-y-4">
                      <p className="text-xs text-gray-400 leading-relaxed text-center max-w-md mx-auto">
                        Slide the gold bar to witness the physical transformation from a raw excavation/reinforced skeleton structural site to the finished luxury layout.
                      </p>
                      
                      <BeforeAfterSlider 
                        before={selectedProject.beforeImage || 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80'} 
                        after={selectedProject.afterImage || selectedProject.mainImage} 
                      />
                    </div>
                  )}

                  {activeTab === 'gallery' && (
                    <div className="space-y-6">
                      <p className="text-xs text-gray-400 leading-relaxed">
                        High resolution architectural renders and detail captures of {selectedProject.name}.
                      </p>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        {(selectedProject.gallery || [selectedProject.mainImage]).map((imgUrl, i) => (
                          <div 
                            key={i} 
                            className="aspect-square rounded-sm overflow-hidden border border-gray-800 shadow-md group relative cursor-zoom-in"
                            onClick={() => window.open(imgUrl, '_blank')}
                          >
                            <img 
                              src={imgUrl} 
                              alt={`Gallery detail ${i+1}`} 
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                              <span className="text-[10px] text-white uppercase font-bold tracking-widest border border-white/40 px-2.5 py-1 rounded-sm bg-black/25">
                                Fullscreen
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Footer CTA */}
              <div className="px-6 py-4 bg-[#161616] border-t border-gray-800 flex justify-between items-center">
                <span className="text-xs text-gray-500 hidden sm:inline">
                  Building tomorrow's infrastructure.
                </span>
                
                <button
                  onClick={() => {
                    setSelectedProject(null);
                    onOpenConsultation();
                  }}
                  className="w-full sm:w-auto flex items-center justify-center space-x-2 px-5 py-2.5 rounded-sm bg-gradient-to-r from-gold-hover to-gold-accent text-charcoal-dark font-sans font-bold tracking-wider text-xs uppercase cursor-pointer"
                >
                  <PhoneCall className="h-3.5 w-3.5" />
                  <span>Request Similar Build</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
