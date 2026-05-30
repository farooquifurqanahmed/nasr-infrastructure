import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { servicesData } from '../utils/mockData';
import { 
  Compass, 
  Layers, 
  Home, 
  Building2, 
  Globe, 
  Activity, 
  Paintbrush, 
  RefreshCw, 
  Trees, 
  Cpu, 
  ArrowRight, 
  X,
  PhoneCall,
  CheckCircle2
} from 'lucide-react';

// Icon mapper helper
const IconComponent = ({ name, className }) => {
  switch (name) {
    case 'Compass': return <Compass className={className} />;
    case 'Layers': return <Layers className={className} />;
    case 'Home': return <Home className={className} />;
    case 'Building2': return <Building2 className={className} />;
    case 'Globe': return <Globe className={className} />;
    case 'Activity': return <Activity className={className} />;
    case 'Paintbrush': return <Paintbrush className={className} />;
    case 'RefreshCw': return <RefreshCw className={className} />;
    case 'Trees': return <Trees className={className} />;
    case 'Cpu': return <Cpu className={className} />;
    default: return <Building2 className={className} />;
  }
};

export default function Services({ onOpenConsultation }) {
  const [selectedService, setSelectedService] = useState(null);

  return (
    <div className="w-full bg-[#080808]">
      {/* Header */}
      <section className="relative py-20 bg-charcoal-dark border-b border-gray-900 text-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:32px_32px] opacity-5" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 space-y-4">
          <span className="text-xs font-bold tracking-[0.3em] text-gold-accent uppercase block">
            Core Expertise
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold uppercase tracking-widest text-white font-serif">
            Turnkey Services & Solutions
          </h1>
          <p className="text-sm text-gray-400 max-w-xl mx-auto font-light leading-relaxed">
            Discover our comprehensive engineering capabilities, from organic spatial designs to seismically secure high-rise structures.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group glassmorphism rounded-sm overflow-hidden flex flex-col border border-gray-800 hover:border-gold-accent/20 transition-all duration-300"
            >
              {/* Image Container with Icon overlay */}
              <div className="h-52 overflow-hidden relative">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover filter brightness-[0.8] group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 p-3 bg-charcoal-dark/95 border border-gold-accent/25 text-gold-accent rounded-sm shadow-md">
                  <IconComponent name={service.icon} className="h-5 w-5" />
                </div>
              </div>

              {/* Text info */}
              <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-white uppercase tracking-wider font-serif group-hover:text-gold-accent transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed font-light">
                    {service.description}
                  </p>
                </div>
                
                <div className="pt-2">
                  <button
                    onClick={() => setSelectedService(service)}
                    className="inline-flex items-center space-x-1.5 text-xs font-bold tracking-wider text-gold-accent hover:text-white uppercase transition-colors cursor-pointer"
                  >
                    <span>Learn More</span>
                    <ArrowRight className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Learn More Modal Dialog */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
              className="absolute inset-0 bg-black/85 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-2xl glassmorphism rounded-sm shadow-2xl z-10 overflow-hidden text-white"
            >
              {/* Header Image banner */}
              <div className="h-64 overflow-hidden relative">
                <img 
                  src={selectedService.image} 
                  alt={selectedService.title} 
                  className="w-full h-full object-cover filter brightness-[0.7]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-dark to-transparent" />
                
                {/* Close Button */}
                <button 
                  onClick={() => setSelectedService(null)}
                  className="absolute top-4 right-4 p-2 bg-black/60 rounded-full border border-gray-700 hover:border-white text-gray-400 hover:text-white transition-all cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>

                {/* Title overlay */}
                <div className="absolute bottom-6 left-6 space-y-1">
                  <div className="flex items-center space-x-2 text-gold-accent">
                    <IconComponent name={selectedService.icon} className="h-5 w-5" />
                    <span className="text-[10px] font-bold tracking-widest uppercase font-sans">
                      Core Discipline
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold uppercase tracking-wider text-white font-serif mt-1">
                    {selectedService.title}
                  </h2>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 sm:p-8 space-y-6 text-sm">
                <p className="text-gray-300 leading-relaxed font-light text-base">
                  {selectedService.details}
                </p>

                {/* Feature checklist */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-gray-400 pt-2 border-t border-gray-800">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="h-4.5 w-4.5 text-gold-accent shrink-0" />
                    <span>Seismic code compliant layout</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="h-4.5 w-4.5 text-gold-accent shrink-0" />
                    <span>Detailed CAD/3D blueprint delivery</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="h-4.5 w-4.5 text-gold-accent shrink-0" />
                    <span>High-performance LEED structures</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="h-4.5 w-4.5 text-gold-accent shrink-0" />
                    <span>Rigorous on-site material inspections</span>
                  </div>
                </div>

                {/* Modal footer CTA */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4 justify-between items-center border-t border-gray-800">
                  <span className="text-xs text-gray-500 font-light">
                    Interested in {selectedService.title}? Request consultation.
                  </span>
                  
                  <button
                    onClick={() => {
                      setSelectedService(null);
                      onOpenConsultation();
                    }}
                    className="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-3 rounded-sm bg-gradient-to-r from-gold-hover via-gold-accent to-gold-light text-charcoal-dark font-sans font-bold tracking-wider text-xs uppercase shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
                  >
                    <PhoneCall className="h-3.5 w-3.5" />
                    <span>Book Service Consult</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
