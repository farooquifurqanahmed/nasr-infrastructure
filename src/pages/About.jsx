import { motion } from 'framer-motion';
import { teamMembers, officeGallery } from '../utils/mockData';
import { Target, Compass, Award, ShieldCheck, HeartHandshake } from 'lucide-react';
import founder from '../assets/founder.png';

export default function About() {
  const achievements = [
    { year: '2008', title: 'Founding Year', desc: 'Nasr Design Studio established, focusing on structural calculations and boutique residential elevations.' },
    { year: '2013', title: 'Commercial Expansion', desc: 'Acquired first high-rise commercial core planning contract for Vertex District Hub.' },
    { year: '2019', title: 'Go Green Protocol', desc: 'Integrated circular waste, LEED Platinum standards, and greywater designs into urban expansions.' },
    { year: '2024', title: 'Global Legacy Recognition', desc: 'Awarded International Best Architecture and Seismic Strength standard for Aurum Villas.' }
  ];

  return (
    <div className="w-full bg-[#080808]">
      {/* Page Header */}
      <section className="relative py-20 bg-charcoal-dark border-b border-gray-900 text-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:32px_32px] opacity-5" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 space-y-4">
          <span className="text-xs font-bold tracking-[0.3em] text-gold-accent uppercase block">
            About The Group
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold uppercase tracking-widest text-white font-serif">
            Our Legacy & Integrity
          </h1>
          <p className="text-sm text-gray-400 max-w-xl mx-auto font-light leading-relaxed">
            Pioneering premium structural layouts and custom luxury residential concepts that redefine modern horizons.
          </p>
        </div>
      </section>

      {/* Founder Message Section */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Founder Image */}
          <div className="lg:col-span-5 relative">
            <div className="aspect-[3/4] rounded-sm overflow-hidden border border-gray-800 shadow-2xl relative z-10 bg-[#161616]">
              <img 
                src={founder} 
                alt="Founder of Nasr Infrastructure, Sanaullah Khan" 
                className="w-full h-full object-cover filter grayscale contrast-125 brightness-90 hover:grayscale-0 transition-all duration-700"
              />
            </div>
            {/* Solid framing block */}
            <div className="absolute -top-5 -left-5 w-24 h-24 border-t-2 border-l-2 border-gold-accent/40 z-0" />
            <div className="absolute -bottom-5 -right-5 w-24 h-24 border-b-2 border-r-2 border-gold-accent/40 z-0" />
          </div>

          {/* Founder Text */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-bold tracking-[0.25em] text-gold-accent uppercase block">
              Leadership Briefing
            </span>
            <h2 className="text-3xl font-bold uppercase tracking-wider text-white font-serif">
              A Message from Our Founder
            </h2>
            <div className="h-1 w-16 bg-gold-accent" />
            
            <p className="text-sm text-gray-300 leading-relaxed font-sans font-light italic">
              "We do not merely build walls or frame rooflines. We design physical assets that will outline human interaction for the next hundred years. That requires absolute structural safety and design choices that look premium across generations."
            </p>
            
            <p className="text-sm text-gray-400 leading-relaxed font-sans font-light">
              When I founded Nasr Infrastructure, I noticed a huge division between architects, structural calculation engineers, and site managers. This division caused delays, budget overruns, and compromised visual quality. We created a unified turnkey workflow where high-precision seismic math, glass curtain technology, and interior marble details are planned and executed by a single expert team.
            </p>

            <div className="pt-4 border-t border-gray-900/60">
              <h4 className="text-base font-bold text-white font-serif">Sanaullah Khan</h4>
              <p className="text-xs text-gold-accent uppercase tracking-widest font-semibold mt-0.5">
                Founder & CEO
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission Statements */}
      <section className="py-24 bg-charcoal-dark border-t border-b border-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Mission Card */}
          <div className="glassmorphism p-8 space-y-4 rounded-sm border border-gray-800 hover:border-gold-accent/20 transition-colors">
            <div className="h-12 w-12 flex items-center justify-center bg-charcoal-black rounded-sm border border-gold-accent/20 text-gold-accent">
              <Target className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-white uppercase tracking-wider font-serif">
              Our Vision
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed font-light">
              To be globally recognized as the gold standard for premium structural integration. We aim to construct smart communities and high-end facades that unify sustainability, extreme visual luxury, and structural safety.
            </p>
          </div>

          {/* Vision Card */}
          <div className="glassmorphism p-8 space-y-4 rounded-sm border border-gray-800 hover:border-gold-accent/20 transition-colors">
            <div className="h-12 w-12 flex items-center justify-center bg-charcoal-black rounded-sm border border-gold-accent/20 text-gold-accent">
              <Compass className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-white uppercase tracking-wider font-serif">
              Our Mission
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed font-light">
              To deliver turnkey architecture and construction services that eliminate client stress. We align creative design, advanced engineering, and strict deadline management to construct lasting assets built on trust.
            </p>
          </div>
        </div>
      </section>

      {/* Milestone / Achievements Timeline */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="text-center space-y-3">
          <span className="text-xs font-bold tracking-[0.25em] text-gold-accent uppercase block">
            Timeline of Excellence
          </span>
          <h2 className="text-3xl font-bold uppercase tracking-wider text-white font-serif">
            Corporate Milestones
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {achievements.map((ach, idx) => (
            <div 
              key={ach.year}
              className="p-6 bg-[#0c0c0c] border border-gray-900 rounded-sm relative hover:border-gold-accent/20 transition-all"
            >
              {/* Year highlight */}
              <div className="text-2xl font-bold font-serif text-gold-accent border-b border-gray-900 pb-3 mb-4">
                {ach.year}
              </div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-2">
                {ach.title}
              </h3>
              <p className="text-xs text-gray-400 font-light leading-relaxed">
                {ach.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-charcoal-dark border-t border-b border-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center space-y-3">
            <span className="text-xs font-bold tracking-[0.25em] text-gold-accent uppercase block">
              Expert Council
            </span>
            <h2 className="text-3xl font-bold uppercase tracking-wider text-white font-serif">
              Our Leadership Team
            </h2>
            <p className="text-sm text-gray-400 max-w-2xl mx-auto font-light">
              Meet the structural calculation experts and award-winning architects driving our client projects.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <div 
                key={member.name}
                className="group glassmorphism rounded-sm overflow-hidden border border-gray-800 text-center p-6 space-y-4 hover:border-gold-accent/20 transition-all duration-300"
              >
                <div className="h-44 w-44 mx-auto rounded-full overflow-hidden border border-gray-800 bg-[#161616]">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-white font-serif uppercase tracking-wide">
                    {member.name}
                  </h3>
                  <p className="text-xs text-gold-accent font-semibold tracking-wider uppercase">
                    {member.role}
                  </p>
                </div>
                <p className="text-xs text-gray-400 font-light leading-relaxed">
                  {member.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Office & Worksite Gallery */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="text-center space-y-3">
          <span className="text-xs font-bold tracking-[0.25em] text-gold-accent uppercase block">
            Inside Operations
          </span>
          <h2 className="text-3xl font-bold uppercase tracking-wider text-white font-serif">
            Office & Worksites Gallery
          </h2>
          <p className="text-sm text-gray-400 max-w-xl mx-auto font-light">
            A glimpse into our design studios and active site management operations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {officeGallery.map((item, idx) => (
            <div 
              key={idx}
              className="group bg-[#0c0c0c] border border-gray-900 rounded-sm overflow-hidden shadow-lg"
            >
              <div className="h-52 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90"
                />
              </div>
              <div className="p-4 space-y-1 text-left">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  {item.title}
                </h4>
                <p className="text-[10px] text-gray-500 font-light leading-relaxed">
                  {item.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
