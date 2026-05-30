import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Compass, Shield, Award, Users, ChevronDown, ChevronUp, Star, Activity, Sparkles, Building2 } from 'lucide-react';
import { processTimeline, testimonials, faqs, statistics } from '../utils/mockData';

// Custom CountUp Component for animated statistics
function Counter({ value, duration = 2 }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    if (start === end) return;

    const totalMiliseconds = duration * 1000;
    const incrementTime = Math.max(Math.floor(totalMiliseconds / end), 20);
    
    const timer = setInterval(() => {
      start += Math.ceil(end / (totalMiliseconds / incrementTime));
      if (start >= end) {
        clearInterval(timer);
        setCount(end);
      } else {
        setCount(start);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [value, duration]);

  return <span>{count}</span>;
}

export default function Home({ setCurrentPage, onOpenConsultation }) {
  const [faqOpen, setFaqOpen] = useState(null);
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  // Auto-scroll testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const toggleFaq = (index) => {
    setFaqOpen(faqOpen === index ? null : index);
  };

  // Selection of featured projects for homepage preview
  const homeFeaturedProjects = [
    {
      title: 'Aurum Premium Villas',
      category: 'Luxury Residential',
      image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80',
      desc: '12 ultra-luxury smart villas with private pools and custom travertine stone facades.',
      id: 'aurum-villas'
    },
    {
      title: 'Vertex Commercial Hub',
      category: 'Smart Commercial Towers',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
      desc: '42-story office headquarters with dynamic aerodynamic glass panels and automated HVAC control.',
      id: 'vertex-tower'
    },
    {
      title: 'Oasis Smart City Planning',
      category: 'Urban Infrastructure',
      image: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=800&q=80',
      desc: 'Master planning for an 80-hectare town integrating transit, water recycling, and smart grids.',
      id: 'oasis-district'
    }
  ];

  return (
    <div className="w-full">
      {/* 1. HERO SECTION (Cinematic Parallax Backdrop) */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden border-b border-gray-900 bg-black">
        {/* Parallax Background Image */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center brightness-[0.4] scale-105 transition-transform duration-1000 ease-out"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80')" 
          }}
        />

        {/* Ambient Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-dark via-transparent to-charcoal-black/60 z-10" />

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:40px_40px] z-10" />

        {/* Hero Content */}
        <div className="relative z-20 max-w-5xl mx-auto px-4 text-center sm:px-6 lg:px-8 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center space-x-2 px-3 py-1.5 border border-gold-accent/40 rounded-full bg-gold-accent/5 backdrop-blur-sm"
          >
            <Sparkles className="h-3.5 w-3.5 text-gold-accent animate-pulse" />
            <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-gold-accent font-sans">
              Built on Trust, Designed for Legacy
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-bold uppercase tracking-tight text-white font-serif leading-[1.1]"
          >
            Building Tomorrow's <br />
            <span className="gold-text-gradient font-sans font-extrabold">Infrastructure</span> Today
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-base sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-sans font-light"
          >
            Premium construction, smart city planning, and luxury architecture design engineered to stand the test of time.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4"
          >
            <button
              onClick={() => {
                setCurrentPage('projects');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full sm:w-auto flex items-center justify-center space-x-2 px-8 py-3.5 rounded-sm bg-gradient-to-r from-gold-hover to-gold-accent text-charcoal-dark font-sans font-bold tracking-wider text-xs uppercase shadow-lg hover:shadow-gold-accent/10 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              <span>View Projects</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
            
            <button
              onClick={onOpenConsultation}
              className="w-full sm:w-auto px-8 py-3.5 rounded-sm border border-white/20 hover:border-gold-accent text-white font-sans font-bold tracking-wider text-xs uppercase hover:bg-white/5 transition-all cursor-pointer"
            >
              Get Consultation
            </button>
          </motion.div>
        </div>
      </section>

      {/* 2. STATS SECTION (Animated Counter) */}
      <section className="bg-charcoal-dark py-12 border-b border-gray-900 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 divide-y lg:divide-y-0 lg:divide-x divide-gray-800/60">
            {statistics.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center pt-6 lg:pt-0 lg:px-4"
              >
                <div className="text-3xl sm:text-5xl font-extrabold uppercase font-sans text-white">
                  <Counter value={stat.value} />
                  <span className="text-gold-accent ml-0.5">{stat.suffix}</span>
                </div>
                <p className="mt-2 text-xs sm:text-sm font-semibold uppercase tracking-widest text-gray-400">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. INTRODUCTION SECTION (Editorial Layout) */}
      <section className="py-24 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            {/* Left text */}
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold tracking-[0.25em] text-gold-accent uppercase block">
                Who We Are
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold uppercase tracking-wide text-white font-serif leading-tight">
                Crafting Structural Legacies and Luxury Facades
              </h2>
              <div className="h-1 w-16 bg-gold-accent" />
              <p className="text-sm text-gray-300 leading-relaxed font-sans font-light">
                Nasr Infrastructure was established on a single core principle: to merge structural strength with pure design intelligence. We represent the fusion of high-precision structural calculations with quiet architectural luxury. 
              </p>
              <p className="text-sm text-gray-400 leading-relaxed font-sans font-light">
                Whether creating bespoke travertine residential estates, engineering complex wind-deflecting skyscraper cores, or zoning carbon-neutral town districts, our integrated group of structural engineers, smart planners, and interior architects manage projects end-to-end.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => {
                    setCurrentPage('about');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-gold-accent hover:text-white transition-colors cursor-pointer"
                >
                  <span>Read Founder's Story</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Right Image Display (Editorial layering) */}
            <div className="lg:col-span-6 relative">
              <div className="aspect-[4/3] rounded-sm overflow-hidden border border-gray-800 shadow-2xl relative z-10">
                <img 
                  src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1200&q=80" 
                  alt="On-site concrete casting structural works" 
                  className="w-full h-full object-cover filter brightness-95 hover:scale-105 transition-transform duration-700"
                />
              </div>
              {/* Layered smaller image */}
              <div className="absolute -bottom-10 -left-10 w-2/3 aspect-[4/3] rounded-sm overflow-hidden border border-gray-800 shadow-2xl hidden sm:block z-20 bg-charcoal-dark">
                <img 
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80" 
                  alt="Finished Luxury Villa Facade Render" 
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Background solid gold accent block */}
              <div className="absolute -top-6 -right-6 w-32 h-32 border-t-2 border-r-2 border-gold-accent/40 z-0" />
            </div>
          </div>
        </div>
      </section>

      {/* 4. SERVICES PREVIEW (Luxury Cards Grid) */}
      <section className="py-24 bg-charcoal-dark border-t border-b border-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs font-bold tracking-[0.25em] text-gold-accent uppercase block">
              Our Capabilities
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold uppercase tracking-wider text-white font-serif">
              Engineering-Focused Services
            </h2>
            <p className="text-sm text-gray-400 max-w-2xl mx-auto font-light">
              We operate an integrated design and construction workflow, offering comprehensive spatial design and execution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
            {/* Card 1 */}
            <div className="group glassmorphism rounded-sm overflow-hidden transition-all duration-300 hover:scale-[1.02] border border-gray-800">
              <div className="h-56 overflow-hidden relative">
                <img 
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80" 
                  alt="Architecture Design" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90"
                />
                <div className="absolute top-4 left-4 p-3 bg-charcoal-dark/90 text-gold-accent rounded-sm border border-gold-accent/20">
                  <Compass className="h-5 w-5" />
                </div>
              </div>
              <div className="p-6 space-y-4">
                <h3 className="text-lg font-bold text-white uppercase tracking-wider font-serif">
                  Architecture & Facade Design
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed font-light">
                  Bespoke blueprints integrating structural glass, composite natural cladding, and architectural lighting to define identity.
                </p>
                <button
                  onClick={() => {
                    setCurrentPage('services');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="inline-flex items-center space-x-1.5 text-xs text-gold-accent font-semibold uppercase group-hover:text-white transition-colors cursor-pointer"
                >
                  <span>Explore Details</span>
                  <ArrowRight className="h-3 w-3" />
                </button>
              </div>
            </div>

            {/* Card 2 */}
            <div className="group glassmorphism rounded-sm overflow-hidden transition-all duration-300 hover:scale-[1.02] border border-gray-800">
              <div className="h-56 overflow-hidden relative">
                <img 
                  src="https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?auto=format&fit=crop&w=800&q=80" 
                  alt="Structural Engineering" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90"
                />
                <div className="absolute top-4 left-4 p-3 bg-charcoal-dark/90 text-gold-accent rounded-sm border border-gold-accent/20">
                  <Activity className="h-5 w-5" />
                </div>
              </div>
              <div className="p-6 space-y-4">
                <h3 className="text-lg font-bold text-white uppercase tracking-wider font-serif">
                  Structural Engineering
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed font-light">
                  Finite element analysis, wind loading, and post-tensioned steel concrete core design protecting against high stress levels.
                </p>
                <button
                  onClick={() => {
                    setCurrentPage('services');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="inline-flex items-center space-x-1.5 text-xs text-gold-accent font-semibold uppercase group-hover:text-white transition-colors cursor-pointer"
                >
                  <span>Explore Details</span>
                  <ArrowRight className="h-3 w-3" />
                </button>
              </div>
            </div>

            {/* Card 3 */}
            <div className="group glassmorphism rounded-sm overflow-hidden transition-all duration-300 hover:scale-[1.02] border border-gray-800">
              <div className="h-56 overflow-hidden relative">
                <img 
                  src="https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=800&q=80" 
                  alt="Smart Urban Development" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90"
                />
                <div className="absolute top-4 left-4 p-3 bg-charcoal-dark/90 text-gold-accent rounded-sm border border-gold-accent/20">
                  <Building2 className="h-5 w-5" />
                </div>
              </div>
              <div className="p-6 space-y-4">
                <h3 className="text-lg font-bold text-white uppercase tracking-wider font-serif">
                  Smart City Planning
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed font-light">
                  Comprehensive zoning, transit-oriented development patterns, automated utilities, and green corridors for smart towns.
                </p>
                <button
                  onClick={() => {
                    setCurrentPage('services');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="inline-flex items-center space-x-1.5 text-xs text-gold-accent font-semibold uppercase group-hover:text-white transition-colors cursor-pointer"
                >
                  <span>Explore Details</span>
                  <ArrowRight className="h-3 w-3" />
                </button>
              </div>
            </div>
          </div>

          <div className="text-center pt-6">
            <button
              onClick={() => {
                setCurrentPage('services');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-6 py-3 border border-gray-800 text-gray-300 hover:text-white hover:border-gold-accent rounded-sm text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
            >
              View All 11 Services
            </button>
          </div>
        </div>
      </section>

      {/* 5. FEATURED PROJECTS PREVIEW */}
      <section className="py-24 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <div className="space-y-3">
              <span className="text-xs font-bold tracking-[0.25em] text-gold-accent uppercase block">
                Portfolio Showcase
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold uppercase tracking-wider text-white font-serif">
                Featured Legacy Designs
              </h2>
            </div>
            <button
              onClick={() => {
                setCurrentPage('projects');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-gold-accent hover:text-white transition-colors cursor-pointer"
            >
              <span>Explore Full Portfolio</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {homeFeaturedProjects.map((proj, i) => (
              <motion.div
                key={proj.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="group relative h-96 overflow-hidden rounded-sm border border-gray-800 cursor-pointer"
                onClick={() => {
                  setCurrentPage('projects');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                <img 
                  src={proj.image} 
                  alt={proj.title} 
                  className="w-full h-full object-cover filter brightness-90 group-hover:scale-105 transition-transform duration-700"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10 transition-opacity duration-300" />
                
                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 z-20 space-y-2">
                  <span className="text-[10px] font-bold text-gold-accent uppercase tracking-widest block">
                    {proj.category}
                  </span>
                  <h3 className="text-lg font-bold text-white uppercase tracking-wider font-serif">
                    {proj.title}
                  </h3>
                  <p className="text-xs text-gray-300 font-light opacity-0 group-hover:opacity-100 transition-opacity duration-300 leading-relaxed">
                    {proj.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CONSTRUCTION PROCESS TIMELINE */}
      <section className="py-24 bg-charcoal-dark border-t border-b border-gray-900 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center space-y-3">
            <span className="text-xs font-bold tracking-[0.25em] text-gold-accent uppercase block">
              Workflow Standard
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold uppercase tracking-wider text-white font-serif">
              Our Construction Timeline
            </h2>
            <p className="text-sm text-gray-400 max-w-2xl mx-auto font-light">
              From the initial schematic sketch to strict engineering audits and key handover.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative">
            {/* Joining lines for desktop */}
            <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-gradient-to-r from-gold-accent/0 via-gold-accent/25 to-gold-accent/0 -translate-y-12 hidden md:block z-0" />

            {processTimeline.map((step, idx) => (
              <motion.div
                key={step.phase}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="space-y-4 relative z-10 group"
              >
                {/* Hexagon/Circle index */}
                <div className="flex items-center justify-center h-16 w-16 mx-auto rounded-full bg-[#181818] border border-gray-800 group-hover:border-gold-accent text-gold-accent font-serif text-xl font-bold shadow-md shadow-black transition-all">
                  {step.phase}
                </div>
                
                {/* Details */}
                <div className="text-center space-y-2">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                    {step.title}
                  </h3>
                  <p className="text-xs text-gray-400 font-light leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. WHY CHOOSE US (Highlight values) */}
      <section className="py-24 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            {/* Visual element on left */}
            <div className="lg:col-span-5 relative order-last lg:order-first">
              <div className="aspect-[3/4] rounded-sm overflow-hidden border border-gray-800 relative z-10 bg-charcoal-dark">
                <img 
                  src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80" 
                  alt="Architectural steel mesh alignment" 
                  className="w-full h-full object-cover filter brightness-75 hover:scale-105 transition-transform duration-700"
                />
              </div>
              {/* Back border lines */}
              <div className="absolute -bottom-6 -right-6 w-44 h-44 border-b-2 border-r-2 border-gold-accent/20 z-0" />
            </div>

            {/* List on right */}
            <div className="lg:col-span-7 space-y-10">
              <div className="space-y-3">
                <span className="text-xs font-bold tracking-[0.25em] text-gold-accent uppercase block">
                  Core Foundations
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold uppercase tracking-wider text-white font-serif">
                  Why Clients Trust Nasr
                </h2>
              </div>

              <div className="space-y-8">
                {/* Point 1 */}
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-charcoal-dark border border-gray-800 text-gold-accent rounded-sm mt-1 shrink-0">
                    <Shield className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white uppercase tracking-wider">
                      Turnkey Engineering Rigor
                    </h3>
                    <p className="mt-1 text-sm text-gray-400 font-light leading-relaxed">
                      We carry out our own structural foundation analysis, seismic loads compute, MEP modeling, and glass facade calculations in-house. That means perfect structural unity and zero delay.
                    </p>
                  </div>
                </div>

                {/* Point 2 */}
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-charcoal-dark border border-gray-800 text-gold-accent rounded-sm mt-1 shrink-0">
                    <Award className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white uppercase tracking-wider">
                      Luxurious Architectural Detailing
                    </h3>
                    <p className="mt-1 text-sm text-gray-400 font-light leading-relaxed">
                      We handpick travertine slabs, custom-engineered double glazing, kinetic aluminum louvers, and warm wooden accents. Everything is configured with precision, leaving no room for average builds.
                    </p>
                  </div>
                </div>

                {/* Point 3 */}
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-charcoal-dark border border-gray-800 text-gold-accent rounded-sm mt-1 shrink-0">
                    <Users className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white uppercase tracking-wider">
                      Advanced 3D & VR Visuals
                    </h3>
                    <p className="mt-1 text-sm text-gray-400 font-light leading-relaxed">
                      See your villa or commercial high-rise through raytraced 3D models and VR simulation. Walk through, adjust the lighting shadows, choose your marbles, and sign off with complete confidence.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. TESTIMONIALS SLIDER */}
      <section className="py-24 bg-charcoal-dark border-t border-b border-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:24px_24px] opacity-5 z-0" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center space-y-8">
          <span className="text-xs font-bold tracking-[0.25em] text-gold-accent uppercase block">
            Endorsements
          </span>

          <div className="min-h-56 flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={testimonialIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                {/* 5 Stars */}
                <div className="flex justify-center space-x-1">
                  {[...Array(testimonials[testimonialIndex].rating)].map((_, i) => (
                    <Star key={i} className="h-4.5 w-4.5 fill-gold-accent text-gold-accent" />
                  ))}
                </div>

                <p className="text-lg sm:text-2xl text-white font-serif font-light leading-relaxed italic px-4">
                  "{testimonials[testimonialIndex].quote}"
                </p>

                <div className="flex items-center justify-center space-x-4">
                  <img 
                    src={testimonials[testimonialIndex].image} 
                    alt={testimonials[testimonialIndex].name} 
                    className="h-12 w-12 rounded-full object-cover border border-gold-accent/40"
                  />
                  <div className="text-left">
                    <h4 className="text-sm font-bold text-white tracking-wide">
                      {testimonials[testimonialIndex].name}
                    </h4>
                    <p className="text-xs text-gray-400 font-light">
                      {testimonials[testimonialIndex].role}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center space-x-2.5">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setTestimonialIndex(idx)}
                className={`h-2 w-2 rounded-full transition-all cursor-pointer ${
                  testimonialIndex === idx ? 'bg-gold-accent w-6' : 'bg-gray-700'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 9. FAQ ACCORDION SECTION */}
      <section className="py-24 bg-[#080808]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs font-bold tracking-[0.25em] text-gold-accent uppercase block">
              Information Center
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold uppercase tracking-wider text-white font-serif">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4 pt-4">
            {faqs.map((faq, index) => {
              const isOpen = faqOpen === index;
              return (
                <div 
                  key={index}
                  className="border border-gray-900 bg-[#0e0e0e] rounded-sm transition-all overflow-hidden"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full flex justify-between items-center px-6 py-5 text-left text-white hover:text-gold-accent transition-colors font-medium font-serif cursor-pointer"
                  >
                    <span className="text-sm sm:text-base tracking-wide">{faq.question}</span>
                    {isOpen ? <ChevronUp className="h-4 w-4 shrink-0 text-gold-accent" /> : <ChevronDown className="h-4 w-4 shrink-0" />}
                  </button>
                  
                  {isOpen && (
                    <div className="px-6 pb-6 text-xs sm:text-sm text-gray-400 font-light leading-relaxed border-t border-gray-900/40 pt-4 animate-slideDown">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 10. FINAL CONTACT CTA */}
      <section className="py-24 relative overflow-hidden bg-black text-center border-t border-gray-900">
        <div 
          className="absolute inset-0 bg-cover bg-center brightness-[0.3]"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/80 to-[#0a0a0a] z-0" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 space-y-6">
          <span className="text-xs font-bold tracking-[0.3em] text-gold-accent uppercase block">
            Begin Your Project
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold uppercase tracking-wider text-white font-serif leading-tight">
            Ready to Build Your Legacy Asset?
          </h2>
          <p className="text-sm sm:text-base text-gray-300 max-w-xl mx-auto font-light leading-relaxed">
            Connect with our lead architects and structural consultants today. Let us transform your vision into an enduring engineering reality.
          </p>
          <div className="pt-4">
            <button
              onClick={onOpenConsultation}
              className="px-8 py-4 rounded-sm bg-gradient-to-r from-gold-hover via-gold-accent to-gold-light text-charcoal-dark font-sans font-bold tracking-widest text-xs uppercase shadow-xl hover:scale-105 active:scale-98 transition-all duration-300 cursor-pointer"
            >
              Request Private Consultation
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
