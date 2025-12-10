
import React, { useState, useEffect } from 'react';
import {
  Camera, Play, Menu, X, Instagram, Facebook, Twitter,
  Mail, Phone, MapPin, Calendar, ArrowRight, Check,
  Star, XCircle
} from 'lucide-react';

// --- MOCK DATA ---

const TESTIMONIALS = [
  { id: 1, name: "Sarah & James", role: "Wedding Clients", text: "The team captured our wedding perfectly. Every emotion, every glance—it feels like reliving the day whenever we look at the photos." },
  { id: 2, name: "TechCorp Inc.", role: "Corporate Event", text: "Professional, discrete, and incredibly talented. The highlight reel they produced for our annual summit was cinematic quality." },
  { id: 3, name: "Elena R.", role: "Portrait Session", text: "I'm usually camera shy, but they made me feel so comfortable. The lighting and direction were spot on." }
];

const SERVICES = [
  { id: 1, title: "Wedding Photography", price: "Starts at $1,500", desc: "Full day coverage, capturing candid moments and artistic portraits.", icon: "wedding" },
  { id: 2, title: "Cinematic Videography", price: "Starts at $2,000", desc: "4K storytelling, drone footage, and professional color grading.", icon: "video" },
  { id: 3, title: "Portrait Sessions", price: "Starts at $300", desc: "Studio or outdoor sessions for individuals, couples, or families.", icon: "user" },
  { id: 4, title: "Event Coverage", price: "Hourly Rates", desc: "Corporate events, parties, and concerts captured with energy.", icon: "calendar" },
];

const PORTFOLIO_IMAGES = [
  { id: 1, category: "Wedding", url: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop", title: "The Vows" },
  { id: 2, category: "Portrait", url: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=1964&auto=format&fit=crop", title: "Golden Hour" },
  { id: 3, category: "Fashion", url: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop", title: "Urban Style" },
  { id: 4, category: "Wedding", url: "https://images.unsplash.com/photo-1511285560982-1356c11d4606?q=80&w=2076&auto=format&fit=crop", title: "First Dance" },
  { id: 5, category: "Event", url: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=2070&auto=format&fit=crop", title: "Concert Lights" },
  { id: 6, category: "Nature", url: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=2070&auto=format&fit=crop", title: "Misty Mountains" },
  { id: 7, category: "Portrait", url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop", title: "Studio Gaze" },
  { id: 8, category: "Fashion", url: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1976&auto=format&fit=crop", title: "Editorial" },
];

const VIDEOS = [
  { id: 1, title: "Cinematic Wedding Highlight", category: "Wedding", thumbnail: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=2070&auto=format&fit=crop" },
  { id: 2, title: "Urban Fashion Film", category: "Fashion", thumbnail: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=2073&auto=format&fit=crop" },
  { id: 3, title: "Corporate Summit Recap", category: "Event", thumbnail: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?q=80&w=2070&auto=format&fit=crop" },
  { id: 4, title: "Travel Diary: Iceland", category: "Travel", thumbnail: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop" },
];

const PRICING = [
  {
    name: "Essential",
    price: "$500",
    features: ["2 Hour Session", "20 Edited Photos", "Online Gallery", "Print Release"],
    highlight: false
  },
  {
    name: "Standard",
    price: "$1,200",
    features: ["Half Day Coverage", "50 Edited Photos", "1 Minute Highlight Reel", "Online Gallery", "10 Prints"],
    highlight: true
  },
  {
    name: "Premium",
    price: "$2,800",
    features: ["Full Day Coverage", "All Edited Photos", "5 Minute Cinematic Film", "Drone Footage", "Photo Album"],
    highlight: false
  },
  {
    name: "Custom",
    price: "Variable",
    features: ["Multi-day Coverage", "Destination Shoots", "Commercial Licensing", "Same-Day Edits"],
    highlight: false
  }
];

// --- COMPONENTS ---

const Navigation = ({ activePage, setPage, isScrolled }) => {
  const [isOpen, setIsOpen] = useState(false);

  const links = ['Home', 'Images', 'Videos', 'Services', 'Pricing', 'About'];

  const handleNav = (page) => {
    setPage(page);
    setIsOpen(false);
    window.scrollTo(0, 0);
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-neutral-900/95 backdrop-blur-md py-4 shadow-lg' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div
          className="flex items-center space-x-2 text-2xl font-bold tracking-tighter cursor-pointer text-white"
          onClick={() => handleNav('Home')}
        >
          <Camera className="w-8 h-8 text-amber-500" />
          <span>LUMINA<span className="text-neutral-400 font-light">LENS</span></span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-8">
          {links.map((link) => (
            <button
              key={link}
              onClick={() => handleNav(link)}
              className={`text-sm uppercase tracking-widest transition-colors duration-300 hover:text-amber-500 ${activePage === link ? 'text-amber-500 font-semibold' : 'text-neutral-300'} `}
            >
              {link}
            </button>
          ))}
          <button
            onClick={() => handleNav('Book')}
            className="bg-amber-600 text-white px-5 py-2 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-amber-700 transition-all transform hover:scale-105 shadow-md hover:shadow-amber-900/20"
          >
            Book Now
          </button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-neutral-900 border-t border-neutral-800 flex flex-col items-center py-8 space-y-6 animate-fade-in-down">
          {links.map((link) => (
            <button
              key={link}
              onClick={() => handleNav(link)}
              className={`text-lg uppercase tracking-widest ${activePage === link ? 'text-amber-500' : 'text-neutral-300'} `}
            >
              {link}
            </button>
          ))}
          <button
            onClick={() => handleNav('Book')}
            className="bg-amber-600 text-white px-8 py-3 rounded-full font-bold uppercase tracking-widest text-lg hover:bg-amber-700 transition-colors mt-4"
          >
            Book Session
          </button>
        </div>
      )}
    </nav>
  );
};

const Footer = ({ setPage }) => (
  <footer className="bg-neutral-950 text-neutral-400 py-16 border-t border-neutral-900">
    <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
      <div>
        <div className="flex items-center space-x-2 text-2xl font-bold tracking-tighter text-white mb-6">
          <Camera className="w-6 h-6 text-amber-500" />
          <span>LUMINA<span className="text-neutral-500 font-light">LENS</span></span>
        </div>
        <p className="mb-6 max-w-xs leading-relaxed">
          Capturing life's fleeting moments with cinematic precision and artistic vision.
        </p>
        <div className="flex space-x-4">
          {[Instagram, Facebook, Twitter].map((Icon, i) => (
            <a key={i} href="#" className="w-10 h-10 rounded-full bg-neutral-900 flex items-center justify-center hover:bg-amber-600 hover:text-white transition-colors">
              <Icon size={18} />
            </a>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-white text-lg font-bold mb-6 uppercase tracking-wider">Quick Links</h4>
        <ul className="space-y-3">
          {['Images', 'Videos', 'Pricing', 'Book'].map(link => (
            <li key={link}>
              <button onClick={() => { setPage(link); window.scrollTo(0, 0); }} className="hover:text-amber-500 transition-colors">
                {link} Session
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="text-white text-lg font-bold mb-6 uppercase tracking-wider">Contact</h4>
        <ul className="space-y-4">
          <li className="flex items-start space-x-3">
            <MapPin className="w-5 h-5 text-amber-600 mt-1" />
            <span>123 Aperture Ave, Arts District<br />New York, NY 10012</span>
          </li>
          <li className="flex items-center space-x-3">
            <Phone className="w-5 h-5 text-amber-600" />
            <span>+1 (555) 123-4567</span>
          </li>
          <li className="flex items-center space-x-3">
            <Mail className="w-5 h-5 text-amber-600" />
            <span>hello@luminalens.com</span>
          </li>
        </ul>
      </div>
    </div>
    <div className="container mx-auto px-6 mt-16 pt-8 border-t border-neutral-900 text-center text-sm text-neutral-600">
      &copy; {new Date().getFullYear()} Lumina Lens Studio. All rights reserved.
    </div>
  </footer>
);

// --- PAGES ---

const HomePage = ({ setPage }) => (
  <div className="animate-fade-in">
    {/* Hero */}
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2071&auto=format&fit=crop"
          alt="Hero Background"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/60 via-transparent to-neutral-950"></div>
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto mt-20">
        <h2 className="text-amber-500 font-medium tracking-[0.2em] mb-4 uppercase animate-slide-up">Visual Storytelling</h2>
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight leading-tight animate-slide-up-delay-1">
          Moments Captured.<br />Memories Preserved.
        </h1>
        <p className="text-lg text-neutral-300 mb-10 max-w-2xl mx-auto leading-relaxed animate-slide-up-delay-2">
          We specialize in crafting timeless imagery and cinematic films for weddings, brands, and individuals.
        </p>
        <button
          onClick={() => setPage('Book')}
          className="bg-amber-600 text-white px-8 py-4 rounded-full font-bold tracking-wider hover:bg-amber-700 transition-all transform hover:scale-105 shadow-lg shadow-amber-900/20 animate-slide-up-delay-3"
        >
          BOOK A SESSION
        </button>
      </div>
    </section>

    {/* Featured Grid */}
    <section className="py-20 bg-neutral-950">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h3 className="text-amber-600 font-bold tracking-widest uppercase mb-2">Portfolio</h3>
            <h2 className="text-3xl md:text-4xl text-white font-bold">Featured Works</h2>
          </div>
          <button onClick={() => setPage('Images')} className="hidden md:flex items-center space-x-2 text-neutral-400 hover:text-white transition-colors">
            <span>View All</span>
            <ArrowRight size={18} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {PORTFOLIO_IMAGES.slice(0, 3).map((img, i) => (
            <div key={img.id} className="group relative aspect-[3/4] overflow-hidden rounded-lg cursor-pointer" onClick={() => setPage('Images')}>
              <img src={img.url} alt={img.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <span className="text-amber-500 text-xs font-bold uppercase tracking-wider">{img.category}</span>
                <h3 className="text-white text-xl font-bold">{img.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Services Preview */}
    <section className="py-20 bg-neutral-900">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl text-white font-bold mb-4">Our Expertise</h2>
          <p className="text-neutral-400">Whether it's your big day or a commercial project, we bring the same level of passion and professionalism.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {SERVICES.map((service) => (
            <div key={service.id} className="bg-neutral-800/50 p-8 rounded-2xl hover:bg-neutral-800 transition-colors border border-neutral-700 hover:border-amber-600/30">
              <div className="w-12 h-12 bg-amber-900/30 text-amber-500 rounded-full flex items-center justify-center mb-6">
                <Star size={24} />
              </div>
              <h3 className="text-xl text-white font-bold mb-3">{service.title}</h3>
              <p className="text-neutral-400 text-sm leading-relaxed mb-4">{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Testimonials */}
    <section className="py-24 bg-neutral-950 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <h2 className="text-center text-3xl font-bold text-white mb-16">Client Stories</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t) => (
            <div key={t.id} className="bg-neutral-900 p-8 rounded-xl border border-neutral-800">
              <div className="flex space-x-1 text-amber-500 mb-4">
                {[1, 2, 3, 4, 5].map(s => <Star key={s} size={14} fill="currentColor" />)}
              </div>
              <p className="text-neutral-300 italic mb-6">"{t.text}"</p>
              <div>
                <h4 className="text-white font-bold">{t.name}</h4>
                <span className="text-neutral-500 text-sm uppercase tracking-wider">{t.role}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="py-20 bg-amber-600 text-white text-center">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to create something beautiful?</h2>
        <p className="text-amber-100 max-w-xl mx-auto mb-10 text-lg">
          Our calendar fills up fast. Book your consultation today to secure your date.
        </p>
        <button
          onClick={() => setPage('Book')}
          className="bg-white text-amber-900 px-10 py-4 rounded-full font-bold tracking-wider hover:bg-neutral-100 transition-colors shadow-xl"
        >
          LET'S TALK
        </button>
      </div>
    </section>
  </div>
);

const ImagesPage = () => {
  const [filter, setFilter] = useState('All');
  const [lightboxImg, setLightboxImg] = useState(null);

  const filteredImages = filter === 'All'
    ? PORTFOLIO_IMAGES
    : PORTFOLIO_IMAGES.filter(img => img.category === filter);

  const categories = ['All', ...new Set(PORTFOLIO_IMAGES.map(img => img.category))];

  return (
    <div className="pt-32 pb-20 bg-neutral-950 min-h-screen animate-fade-in">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Visual Portfolio</h1>
          <p className="text-neutral-400">A curation of our finest moments.</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 rounded-full text-sm font-bold tracking-wider transition-all ${filter === cat
                ? 'bg-amber-600 text-white'
                : 'bg-neutral-900 text-neutral-400 hover:text-white'
                } `}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {filteredImages.map((img) => (
            <div
              key={img.id}
              className="break-inside-avoid relative group overflow-hidden rounded-lg cursor-zoom-in"
              onClick={() => setLightboxImg(img)}
            >
              <img src={img.url} alt={img.title} className="w-full h-auto object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-white text-xl font-bold">{img.title}</h3>
                  <span className="text-amber-500 text-sm uppercase">{img.category}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxImg && (
        <div className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center p-4" onClick={() => setLightboxImg(null)}>
          <button className="absolute top-6 right-6 text-white hover:text-amber-500 transition-colors">
            <XCircle size={40} />
          </button>
          <img
            src={lightboxImg.url}
            alt={lightboxImg.title}
            className="max-h-[90vh] max-w-full rounded shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};

const VideosPage = () => (
  <div className="pt-32 pb-20 bg-neutral-950 min-h-screen animate-fade-in">
    <div className="container mx-auto px-6">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Motion Gallery</h1>
        <p className="text-neutral-400">Cinematic storytelling that moves you.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {VIDEOS.map((vid) => (
          <div key={vid.id} className="group">
            <div className="relative aspect-video bg-neutral-900 rounded-xl overflow-hidden mb-6 shadow-2xl">
              {/* This is a placeholder for the actual iframe. Using an image for UI demo purposes */}
              <img src={vid.thumbnail} alt={vid.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-opacity" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center pl-1 text-white shadow-lg transform group-hover:scale-110 transition-transform duration-300 cursor-pointer">
                  <Play fill="currentColor" size={24} />
                </div>
              </div>
              <div className="absolute bottom-4 left-4 bg-black/80 text-white text-xs px-2 py-1 rounded uppercase tracking-widest font-bold">
                {vid.category}
              </div>
            </div>
            <h3 className="text-2xl text-white font-bold mb-2">{vid.title}</h3>
            <p className="text-neutral-500">Shot in 4K RAW • Color Graded • Sound Design</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const ServicesPage = ({ setPage }) => (
  <div className="pt-32 pb-20 bg-neutral-900 min-h-screen animate-fade-in">
    <div className="container mx-auto px-6">
      <div className="max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Our Services</h1>
        <p className="text-lg text-neutral-400 leading-relaxed">
          We offer a comprehensive suite of visual services. From intimate portraits to large-scale commercial productions, our team is equipped with top-tier gear and creative vision.
        </p>
      </div>

      <div className="space-y-6">
        {SERVICES.map((service) => (
          <div key={service.id} className="bg-neutral-950 p-8 md:p-10 rounded-2xl flex flex-col md:flex-row md:items-center justify-between group hover:border-amber-600/50 border border-neutral-800 transition-colors">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center space-x-4 mb-2">
                <h3 className="text-2xl text-white font-bold">{service.title}</h3>
                <span className="bg-neutral-800 text-amber-500 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">{service.price}</span>
              </div>
              <p className="text-neutral-400 max-w-xl">{service.desc}</p>

              {/* Optional Add-ons displayed for demo */}
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="text-xs text-neutral-500 border border-neutral-800 px-2 py-1 rounded">+ Drone Coverage</span>
                <span className="text-xs text-neutral-500 border border-neutral-800 px-2 py-1 rounded">+ 2nd Shooter</span>
                <span className="text-xs text-neutral-500 border border-neutral-800 px-2 py-1 rounded">+ Fast Delivery</span>
              </div>
            </div>
            <button onClick={() => setPage('Book')} className="md:opacity-0 group-hover:opacity-100 transition-opacity bg-white text-black px-6 py-3 rounded-full font-bold text-sm uppercase tracking-wider hover:bg-amber-500 hover:text-white">
              Request Quote
            </button>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const PricingPage = ({ setPage }) => (
  <div className="pt-32 pb-20 bg-neutral-950 min-h-screen animate-fade-in">
    <div className="container mx-auto px-6">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Investment</h1>
        <p className="text-neutral-400">Transparent pricing for priceless memories.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {PRICING.map((tier, i) => (
          <div key={i} className={`relative flex flex-col p-8 rounded-2xl border ${tier.highlight ? 'bg-neutral-900 border-amber-600' : 'bg-neutral-900/50 border-neutral-800'} transition-transform hover:-translate-y-2`}>
            {tier.highlight && (
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-amber-600 text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider">
                Most Popular
              </div>
            )}
            <h3 className="text-xl font-bold text-white mb-2">{tier.name}</h3>
            <div className="text-3xl font-bold text-amber-500 mb-6">{tier.price}</div>
            <ul className="flex-1 space-y-4 mb-8">
              {tier.features.map((feat, idx) => (
                <li key={idx} className="flex items-start space-x-3 text-sm text-neutral-300">
                  <Check size={16} className="text-amber-600 mt-1 shrink-0" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={() => setPage('Book')}
              className={`w-full py-4 rounded-xl font-bold uppercase tracking-widest text-sm transition-colors ${tier.highlight
                ? 'bg-amber-600 text-white hover:bg-amber-700'
                : 'bg-neutral-800 text-neutral-400 hover:bg-white hover:text-black'
                } `}
            >
              Choose Plan
            </button>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const AboutPage = () => (
  <div className="pt-32 pb-20 bg-neutral-900 min-h-screen animate-fade-in">
    <div className="container mx-auto px-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="relative">
          <div className="absolute -top-4 -left-4 w-24 h-24 border-t-4 border-l-4 border-amber-600"></div>
          <img
            src="https://images.unsplash.com/photo-1554048612-387768052bf7?q=80&w=2072&auto=format&fit=crop"
            alt="Photographer at work"
            className="w-full rounded-lg shadow-2xl relative z-10"
          />
          <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-4 border-r-4 border-amber-600 z-20"></div>
        </div>

        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Behind the Lens</h1>
          <h3 className="text-xl text-amber-500 font-medium mb-6">Capturing the soul of the moment since 2015.</h3>
          <p className="text-neutral-300 leading-relaxed mb-6">
            Lumina Lens was founded on a simple principle: every image should tell a story. What started as a solo passion project has grown into a collective of creative visual artists dedicated to excellence.
          </p>
          <p className="text-neutral-300 leading-relaxed mb-8">
            We don't just click a button. We analyze light, composition, and emotion to create art that resonates. Whether it's the tear in a groom's eye or the chaotic energy of a rock concert, we are there to freeze time.
          </p>

          <div className="grid grid-cols-3 gap-6 mb-10 border-t border-b border-neutral-800 py-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">500+</div>
              <div className="text-xs text-neutral-500 uppercase tracking-widest mt-1">Projects</div>
            </div>
            <div className="text-center border-l border-neutral-800">
              <div className="text-3xl font-bold text-white">12</div>
              <div className="text-xs text-neutral-500 uppercase tracking-widest mt-1">Awards</div>
            </div>
            <div className="text-center border-l border-neutral-800">
              <div className="text-3xl font-bold text-white">100%</div>
              <div className="text-xs text-neutral-500 uppercase tracking-widest mt-1">Satisfaction</div>
            </div>
          </div>

          <div className="flex space-x-4">
            <button className="flex items-center space-x-2 text-neutral-400 hover:text-amber-500 transition-colors">
              <Instagram size={20} /> <span>@luminalens</span>
            </button>
            <button className="flex items-center space-x-2 text-neutral-400 hover:text-amber-500 transition-colors">
              <Twitter size={20} /> <span>@lumina_studio</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const BookPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', type: 'Wedding', date: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => setSubmitted(true), 1500);
  };

  if (submitted) {
    return (
      <div className="pt-32 pb-20 bg-neutral-950 min-h-screen flex items-center justify-center px-6 animate-fade-in">
        <div className="bg-neutral-900 p-10 rounded-2xl text-center max-w-lg border border-neutral-800 shadow-2xl">
          <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check size={40} />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Request Received!</h2>
          <p className="text-neutral-400 mb-8">Thank you, {formData.name}. We have received your booking details for the {formData.type} session. We will be in touch within 24 hours.</p>
          <button onClick={() => setSubmitted(false)} className="text-amber-500 hover:text-white underline underline-offset-4">Submit another request</button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 bg-neutral-950 min-h-screen animate-fade-in">
      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Book Your Session</h1>
          <p className="text-neutral-400 mb-10 text-lg">
            Tell us about your vision. Fill out the form below to check availability and get a custom quote.
          </p>

          <div className="space-y-8">
            <div className="bg-neutral-900 p-6 rounded-xl border border-neutral-800 flex items-start space-x-4">
              <Calendar className="text-amber-600 w-8 h-8 mt-1" />
              <div>
                <h4 className="text-white font-bold mb-1">Check Availability</h4>
                <p className="text-neutral-400 text-sm">We recommend booking weddings 6-12 months in advance.</p>
                <a href="#" className="text-amber-500 text-sm font-bold mt-2 inline-block hover:underline">View Calendar &rarr;</a>
              </div>
            </div>

            <div className="bg-neutral-900 p-6 rounded-xl border border-neutral-800 flex items-start space-x-4">
              <Phone className="text-amber-600 w-8 h-8 mt-1" />
              <div>
                <h4 className="text-white font-bold mb-1">Quick Chat?</h4>
                <p className="text-neutral-400 text-sm">Prefer to discuss over the phone or WhatsApp?</p>
                <button className="bg-green-600 text-white text-xs px-3 py-1 rounded mt-2 hover:bg-green-700 transition-colors">WhatsApp Us</button>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-neutral-900 p-8 md:p-10 rounded-3xl shadow-2xl border border-neutral-800 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-2">Name</label>
              <input
                required
                type="text"
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-3 text-white focus:border-amber-600 focus:outline-none transition-colors"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-2">Phone</label>
              <input
                required
                type="tel"
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-3 text-white focus:border-amber-600 focus:outline-none transition-colors"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-2">Email</label>
            <input
              required
              type="email"
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-3 text-white focus:border-amber-600 focus:outline-none transition-colors"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-2">Shoot Type</label>
              <select
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-3 text-white focus:border-amber-600 focus:outline-none transition-colors"
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              >
                <option>Wedding</option>
                <option>Portrait</option>
                <option>Event</option>
                <option>Commercial</option>
                <option>Fashion</option>
              </select>
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-2">Preferred Date</label>
              <input
                type="date"
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-3 text-white focus:border-amber-600 focus:outline-none transition-colors appearance-none"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-2">Message / Details</label>
            <textarea
              rows="4"
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-3 text-white focus:border-amber-600 focus:outline-none transition-colors resize-none"
              placeholder="Tell us about the location, venue, or specific ideas you have..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            ></textarea>
          </div>

          <button type="submit" className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-4 rounded-lg tracking-wider transition-all transform hover:-translate-y-1 shadow-lg">
            SEND REQUEST
          </button>
        </form>
      </div>
    </div>
  );
};

// --- MAIN APP COMPONENT ---

const App = () => {
  const [currentPage, setCurrentPage] = useState('Home');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'Home': return <HomePage setPage={setCurrentPage} />;
      case 'Images': return <ImagesPage />;
      case 'Videos': return <VideosPage />;
      case 'Services': return <ServicesPage setPage={setCurrentPage} />;
      case 'Pricing': return <PricingPage setPage={setCurrentPage} />;
      case 'About': return <AboutPage />;
      case 'Book': return <BookPage />;
      default: return <HomePage setPage={setCurrentPage} />;
    }
  };

  return (
    <div className="bg-neutral-950 min-h-screen text-neutral-200 font-sans selection:bg-amber-500 selection:text-white">
      <Navigation activePage={currentPage} setPage={setCurrentPage} isScrolled={isScrolled} />

      <main className="min-h-screen">
        {renderPage()}
      </main>

      <Footer setPage={setCurrentPage} />

      {/* Styles for animations */}
      <style>{`
@keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
}
@keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
}
@keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
}
        .animate-fade-in { animation: fadeIn 0.8s ease-out forwards; }
        .animate-slide-up { animation: slideUp 0.8s ease-out forwards; }
        .animate-slide-up-delay-1 { animation: slideUp 0.8s ease-out 0.2s forwards; opacity: 0; }
        .animate-slide-up-delay-2 { animation: slideUp 0.8s ease-out 0.4s forwards; opacity: 0; }
        .animate-slide-up-delay-3 { animation: slideUp 0.8s ease-out 0.6s forwards; opacity: 0; }
        .animate-fade-in-down { animation: fadeInDown 0.3s ease-out forwards; }
`}</style>
    </div>
  );
};

export default App;