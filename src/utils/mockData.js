import founderImg from '../assets/founder.png';

export const servicesData = [
  {
    id: 'architecture-design',
    title: 'Architecture Design',
    icon: 'Compass',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    description: 'Bespoke architectural designs tailoring space and structure to maximize elegance, natural light, and modern functionality.',
    details: 'Our architectural design services cover everything from conceptual planning to detailed construction drawings. We focus on sustainable, energy-efficient solutions that merge form and function, ensuring a timeless aesthetic for luxury residences and corporate headquarters alike.'
  },
  {
    id: 'front-elevation-design',
    title: 'Front Elevation Design',
    icon: 'Layers',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
    description: 'Striking facade and elevation design utilizing premium cladding, glass systems, and architectural lighting to define character.',
    details: 'A building’s facade is its first impression. We combine materials like timber, louvers, high-performance glass, and stone veneer to design front elevations that stand out, featuring custom lighting and dynamic depth layers.'
  },
  {
    id: 'residential-construction',
    title: 'Residential Construction',
    icon: 'Home',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80',
    description: 'Turnkey construction of premium villas, duplex homes, and luxury condominiums with rigorous quality control.',
    details: 'From excavation to the final coat of paint, we manage residential construction with a focus on structural strength, exquisite finish quality, and adherence to project timelines. We deliver homes built for generational legacy.'
  },
  {
    id: 'commercial-buildings',
    title: 'Commercial Buildings',
    icon: 'Building2',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
    description: 'State-of-the-art office towers, retail complexes, and mixed-use commercial developments built to international standards.',
    details: 'We build commercial hubs optimized for business efficiency. Our designs incorporate flexible open floor plans, integrated smart building systems, energy-saving curtain walls, and high-traffic spatial flow structures.'
  },
  {
    id: 'smart-urban-development',
    title: 'Smart Urban Development',
    icon: 'Globe',
    image: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=800&q=80',
    description: 'Next-generation city planning and smart urban systems integrating technology, transit, and green infrastructure.',
    details: 'Our smart city planners design self-sustaining developments. We implement circular energy microgrids, localized greywater recycling, IoT-managed public utility networks, and multi-modal transit-oriented designs.'
  },
  {
    id: 'structural-engineering',
    title: 'Structural Engineering',
    icon: 'Activity',
    image: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?auto=format&fit=crop&w=800&q=80',
    description: 'Advanced structural calculations, seismic analysis, and load-bearing designs ensuring lifetime safety.',
    details: 'Our engineers leverage finite element analysis and structural modeling tools to plan stable, earthquake-resistant skeletons. We specialize in post-tensioned slabs, composite structures, and complex wind-load designs.'
  },
  {
    id: 'interior-design',
    title: 'Interior Design',
    icon: 'Paintbrush',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
    description: 'Luxurious bespoke interiors merging premium textures, custom lighting fixtures, and custom furniture.',
    details: 'We craft interior atmospheres that convey quiet luxury. By balancing marble surfaces, warm wood accents, concealed linear lighting, and ergonomic spacing, we design living and working environments that evoke prestige.'
  },
  {
    id: 'renovation',
    title: 'Renovation & Remodeling',
    icon: 'RefreshCw',
    image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80',
    description: 'Complete remodeling and structural retrofitting of heritage assets and existing residential structures.',
    details: 'We modernize outdated structures while maintaining their historic character or structural core. Our retrofitting enhances energy ratings, upgrades electrical/plumbing systems, and rearranges spatial divisions for modern use.'
  },
  {
    id: 'landscape-planning',
    title: 'Landscape Planning',
    icon: 'Trees',
    image: 'https://images.unsplash.com/photo-1558661091-5cc7b64e482d?auto=format&fit=crop&w=800&q=80',
    description: 'Harmonious outdoor environments incorporating native plants, water elements, and stone walkways.',
    details: 'We believe exterior spaces should merge seamlessly with interior views. Our landscape architects design premium gardens, infinity pool surroundings, outdoor lounges, and smart irrigation layouts that mature beautifully.'
  },
  {
    id: '3d-visualization',
    title: '3D Visualization & Renders',
    icon: 'Cpu',
    image: 'https://images.unsplash.com/photo-1508962914676-134849a727f0?auto=format&fit=crop&w=800&q=80',
    description: 'Photorealistic architectural walkthroughs, aerial rendering, and virtual reality spatial mockups.',
    details: 'Experience your project before a single brick is laid. Using state-of-the-art raytracing and illumination software, we produce hyper-detailed 3D renders, cinematic video flyovers, and interactive 360-degree VR scenes.'
  }
];

export const projectsData = [
  {
    id: 'aurum-villas',
    name: 'Aurum Premium Villas',
    category: 'Residential',
    description: 'A cluster of 12 ultra-luxury smart villas featuring cantilevered terraces, private pools, and custom travertine stone facades.',
    year: '2025',
    location: 'Beverly Hills Skyline, CA',
    mainImage: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
    beforeImage: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80', // showing raw structural site
    afterImage: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
    specifications: {
      'Total Area': '14,500 sq. ft. per villa',
      'Structural Type': 'Reinforced Concrete with Steel Cantilevers',
      'Completion Time': '24 Months',
      'Primary Materials': 'Travertine, Teakwood, Structural Glazing',
      'Energy Rating': 'LEED Platinum Certified'
    },
    gallery: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'vertex-tower',
    name: 'Vertex Commercial Hub',
    category: 'Commercial',
    description: 'A 42-story office headquarters featuring a double-skin aerodynamic glass facade, active solar tracking panels, and automated climate control.',
    year: '2024',
    location: 'Metropolitan Financial District',
    mainImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    beforeImage: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1200&q=80', // excavation
    afterImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    specifications: {
      'Total Area': '650,000 sq. ft.',
      'Floors': '42 Stories + 3 Basements',
      'Structural Type': 'Composite Steel-Concrete Shear Core',
      'Seismic Zone': 'Zone IV Compliant',
      'HVAC Systems': 'Chilled-water VAV system with enthalpy recovery wheels'
    },
    gallery: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'oasis-district',
    name: 'Oasis Smart City Planning',
    category: 'Urban Development',
    description: 'Comprehensive zoning, digital twins, and ecological infrastructure master plan for an 80-hectare smart town expansion.',
    year: '2026',
    location: 'East Coast Green Corridor',
    mainImage: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1200&q=80',
    beforeImage: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80', // raw land
    afterImage: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1200&q=80',
    specifications: {
      'Project Area': '80 Hectares',
      'Planned Capacity': '35,000 Residents',
      'Green Cover': '42% Allocation',
      'Transit Networks': 'Autonomous shuttle paths and smart grid bike lanes',
      'Waste Management': 'Pneumatic underground waste disposal system'
    },
    gallery: [
      'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1449034446853-66c86144b0ad?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'zenith-facade',
    name: 'Zenith Facade Overhaul',
    category: 'Elevation Designs',
    description: 'Renovation of a mid-century building facade with kinetic metal louvers that adjust to optimize solar angles and minimize glare.',
    year: '2025',
    location: 'Design Quarter, Milan',
    mainImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    beforeImage: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80', // old building
    afterImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    specifications: {
      'Facade Area': '45,000 sq. ft.',
      'Material Tech': 'Anodized Aluminum Kinetic Panels, Low-E Glass',
      'Thermal Savings': '28% Reduction in cooling load',
      'Acoustic Dampening': 'Rw 42dB Sound Reduction Index'
    },
    gallery: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'travertine-penthouse',
    name: 'Travertine Luxury Penthouse',
    category: 'Interiors',
    description: 'Minimalist luxury interior design utilizing raw travertine stone slabs, open wood grain cladding, and indirect light fixtures.',
    year: '2025',
    location: 'Ocean Drive, Miami',
    mainImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
    beforeImage: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80', // bathroom remodel
    afterImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
    specifications: {
      'Floor Area': '6,200 sq. ft.',
      'Style Concept': 'Organic Luxury / Warm Minimalism',
      'Lighting Control': 'Lutron Athena smart dimming system',
      'Custom Millwork': 'White oiled oak and brushed gold trims'
    },
    gallery: [
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1618221200898-72b6e94f30fe?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80'
    ]
  }
];

export const elevations3D = [
  {
    id: 'elev-1',
    name: 'The Lumina Villa Facade',
    category: 'Villas',
    description: 'Modern minimalist villa facade showing double height glazing, textured plaster, and carbon-fiber louver dividers.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    details: 'This render highlights the dramatic play of shadows created by the custom floating concrete slab and cantilevered timber ceiling.'
  },
  {
    id: 'elev-2',
    name: 'Apex Residential Towers',
    category: 'Apartments',
    description: 'High-rise apartment concept utilizing cascading vertical gardens, solar-absorbing tinted glass, and composite structure.',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    details: 'Features a staggered balcony pattern that maximizes privacy while providing panoramic green lungs for each resident.'
  },
  {
    id: 'elev-3',
    name: 'Titan Corporate Facade',
    category: 'Commercial',
    description: '3D conceptual model showing structural grid steel columns, structural silicone glazing, and dynamic copper accent paneling.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    details: 'Designed to express structural integrity, the copper fins rotate during peak solar radiation to deflect thermal heat.'
  },
  {
    id: 'elev-4',
    name: 'Nouveau Brutalist Estate',
    category: 'Villas',
    description: 'Board-formed raw concrete structure contrasted with delicate architectural steel frames and warm spotlights.',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
    details: 'Emphasizes honest material usage. The landscaping is designed with raw limestone basins and native structural plants.'
  }
];

export const processTimeline = [
  {
    phase: '01',
    title: 'Consultation & Conceptualization',
    description: 'We align on your legacy goals, evaluate site feasibility, conduct architectural briefing, and formulate initial conceptual sketches.'
  },
  {
    phase: '02',
    title: 'Design Development & 3D Renders',
    description: 'Our team drafts comprehensive blueprints, defines exact materials, and prepares ultra-realistic 3D elevation walkthroughs for review.'
  },
  {
    phase: '03',
    title: 'Engineering & Permissioning',
    description: 'We perform advanced structural calculations, integrate HVAC/MEP specifications, and secure all local government building permissions.'
  },
  {
    phase: '04',
    title: 'Precision Construction & Execution',
    description: 'Our expert site engineers execute the structural works under strict quality, safety, and deadline management protocols.'
  },
  {
    phase: '05',
    title: 'Premium Handover & Legacy',
    description: 'After completing deep structural audits, interior detailing, and custom landscaping, we officially hand over your completed legacy asset.'
  }
];

export const testimonials = [
  {
    id: 't-1',
    name: 'Al-Farooq Properties',
    role: 'Managing Director, Commercial Dev',
    quote: 'Nasr Infrastructure delivered our high-rise corporate office tower ahead of schedule and with an attention to detail that is absolutely unmatched in the region. The double-skin facade design has reduced our energy costs by 30%.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=120&q=80'
  },
  {
    id: 't-2',
    name: 'Lady Yasmin Sterling',
    role: 'Owner, Aurum Premium Villa #4',
    quote: 'The 3D visualizations they created were stunning, but seeing the final cantilevered villa completed in travertine stone was truly breathtaking. It is a masterpiece of modern luxury residential engineering.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80'
  },
  {
    id: 't-3',
    name: 'Dr. Tariq Al-Mansoor',
    role: 'Urban Planning Commissioner',
    quote: 'Nasr’s vision for smart urban expansions combines sustainable green spaces with robust technical frameworks. Their digital twin planning approach was key to approving our green corridor expansion.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80'
  }
];

export const officeGallery = [
  {
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    title: 'Nasr Design Studio',
    caption: 'Where our architects and planners draft the future skyline.'
  },
  {
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
    title: 'On-Site Engineering Audits',
    caption: 'Our engineers supervising deep foundations and structural safety.'
  },
  {
    image: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?auto=format&fit=crop&w=800&q=80',
    title: 'Precision Structural Testing',
    caption: 'Non-destructive strength testing on site concrete.'
  },
  {
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
    title: 'Completed Facade Detail',
    caption: 'Close up of the structural glazing on Vertex Commercial Hub.'
  }
];

export const statistics = [
  { value: 120, suffix: '+', label: 'Completed Projects' },
  { value: 15, suffix: 'M+', label: 'Square Feet Built' },
  { value: 45, suffix: '+', label: 'Awards & Honors' },
  { value: 98, suffix: '%', label: 'Client Satisfaction' }
];

export const faqs = [
  {
    question: 'What separates Nasr Infrastructure from other architecture firms?',
    answer: 'We provide an integrated, turnkey ecosystem. Unlike pure design firms or standard contracting builders, we host world-class architectural designers, seismic structural engineers, smart city planners, and dedicated site operations directors under one brand, ensuring zero friction between creative plans and physical structures.'
  },
  {
    question: 'How do you structure the payment terms for commercial and residential construction?',
    answer: 'Our payment cycles are milestones-based and fully transparent. We divide projects into stages (e.g., foundation, framing, roofing, rough-ins, interior finishing, handover). Each stage starts after verification of the previous stage by independent certified inspectors, supported by live video updates from the site.'
  },
  {
    question: 'Can you build earthquake-resistant structures in high-risk seismic zones?',
    answer: 'Absolutely. Our in-house structural engineering division has computed shear core skeletons and seismically isolated pile caps for buildings up to 45 stories. We design structures following international guidelines like ASCE 7, Eurocode 8, and relevant national building codes.'
  },
  {
    question: 'Do you provide VR walkthroughs before building construction begins?',
    answer: 'Yes. Our 3D Visualization division constructs immersive virtual reality scenes. Clients can wear VR headsets to walk around the planned luxury villa, evaluate kitchen configurations, inspect material finishes under morning and evening lighting simulations, and modify details before construction starts.'
  }
];

export const teamMembers = [
  {
    name: 'Sanaullah Khan',
    role: 'Founder & CEO',
    description: 'An entrepreneur and structural planner with 22 years of high-rise commercial and luxury villa experience across India and international markets.',
    image: founderImg
  },
  {
    name: 'Samanth Sterling',
    role: 'Chief Architect & Head of Design',
    description: 'Award-winning architect specialized in organic modernism, light structures, and high-performance glass facades.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=240&q=80'
  },
  {
    name: 'Vikram Chawla',
    role: 'Director of Structural Operations',
    description: 'Specialist in high-rise structural foundations, post-tensioned concrete, and seismic retrofitting design systems.',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=240&q=80'
  }
];
