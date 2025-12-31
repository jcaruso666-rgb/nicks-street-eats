import { useState, useEffect } from "react";

const MENU_ITEMS = {
  hotdogs: [
    { id: "chicago", name: "Chicago Dog", price: 6.50, description: "Yellow mustard, neon green relish, onions, tomato, pickle spear, sport peppers, celery salt on a poppy seed bun" },
    { id: "coney", name: "Coney Dog", price: 6.00, description: "Meaty chili, diced onions, and yellow mustard" },
    { id: "newyork", name: "New York Dog", price: 5.50, description: "Sauerkraut, spicy brown mustard, and onion sauce" },
    { id: "classic", name: "Classic Dog", price: 4.50, description: "Your choice of ketchup, mustard, relish, and onions" },
  ],
  potatoes: [
    { id: "loaded", name: "Fully Loaded", price: 8.50, description: "Butter, sour cream, cheddar cheese, bacon bits, chives, and a sprinkle of our secret seasoning" },
    { id: "chili", name: "Chili Cheese Spud", price: 9.00, description: "Our famous chili, melted cheddar, sour cream, and diced onions" },
    { id: "bbq", name: "BBQ Pulled Pork", price: 9.50, description: "Slow-smoked pulled pork, tangy BBQ sauce, coleslaw, and crispy onion strings" },
    { id: "veggie", name: "Garden Fresh", price: 7.50, description: "Steamed broccoli, mushrooms, peppers, cheese sauce, and fresh herbs" },
  ]
};

function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#1a1a1a]">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 35px,
            #d4a10a 35px,
            #d4a10a 40px
          )`
        }} />
      </div>
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-20">
        {/* Badge */}
        <div className="animate-fade-in-down mb-8">
          <span className="inline-block px-4 py-2 bg-[#d4a10a] text-[#1a1a1a] font-bold text-sm tracking-widest uppercase rounded-full">
            Fremont, Nebraska
          </span>
        </div>
        
        {/* Title */}
        <h1 className="text-center mb-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <span className="block font-['Permanent_Marker',_cursive] text-6xl md:text-8xl lg:text-9xl text-white leading-none">
            Nick's
          </span>
          <span className="block font-['Permanent_Marker',_cursive] text-5xl md:text-7xl lg:text-8xl text-[#d4a10a] leading-none mt-2">
            Street Eats
          </span>
        </h1>
        
        {/* Tagline */}
        <p className="text-white/80 text-xl md:text-2xl font-['Oswald',_sans-serif] tracking-wide text-center max-w-2xl mb-10 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          The BEST hot dogs & baked potatoes in town
        </p>
        
        {/* Food images */}
        <div className="flex flex-wrap justify-center gap-8 mb-12 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <div className="relative group">
            <div className="absolute -inset-2 bg-[#d4a10a] rounded-full blur-xl opacity-40 group-hover:opacity-60 transition-opacity" />
            <img 
              src="./hot-dog-hero-uL8Wb.png" 
              alt="Delicious hot dog"
              className="relative w-48 h-48 md:w-64 md:h-64 object-cover rounded-full border-4 border-[#d4a10a] shadow-2xl"
            />
          </div>
          <div className="relative group">
            <div className="absolute -inset-2 bg-[#e8a830] rounded-full blur-xl opacity-40 group-hover:opacity-60 transition-opacity" />
            <img 
              src="./baked-potato-hero-kLViH.png" 
              alt="Loaded baked potato"
              className="relative w-48 h-48 md:w-64 md:h-64 object-cover rounded-full border-4 border-[#e8a830] shadow-2xl"
            />
          </div>
        </div>
        
        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
          <a href="/order" className="px-8 py-4 bg-[#c8442d] text-white font-['Oswald',_sans-serif] text-lg font-bold uppercase tracking-wider rounded-none hover:bg-white hover:text-[#1a1a1a] transition-colors">
            Order Online
          </a>
          <a href="#menu" className="px-8 py-4 bg-[#d4a10a] text-[#1a1a1a] font-['Oswald',_sans-serif] text-lg font-bold uppercase tracking-wider rounded-none hover:bg-white transition-colors">
            View Menu
          </a>
        </div>
        
        {/* Hours quick info */}
        <div className="mt-16 text-center animate-fade-in" style={{ animationDelay: '1s' }}>
          <p className="text-white/60 font-['Oswald',_sans-serif] text-sm tracking-widest uppercase">
            Open Wed–Sat • 11am–4pm
          </p>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-[#d4a10a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
      
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fade-in-down {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.8s ease-out forwards; opacity: 0; }
        .animate-fade-in-down { animation: fade-in-down 0.8s ease-out forwards; opacity: 0; }
        .animate-fade-in-up { animation: fade-in-up 0.8s ease-out forwards; opacity: 0; }
      `}</style>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="py-24 bg-[#f5e6c8]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Story */}
          <div>
            <span className="inline-block px-3 py-1 bg-[#c8442d] text-white font-bold text-xs tracking-widest uppercase mb-4">
              Our Story
            </span>
            <h2 className="font-['Permanent_Marker',_cursive] text-4xl md:text-5xl text-[#1a1a1a] mb-6">
              From Cart to Kitchen
            </h2>
            <p className="font-['Merriweather',_serif] text-[#3d3d3d] text-lg leading-relaxed mb-6">
              What started as a humble food cart on the streets of Fremont has grown into something special. After years of serving up the best dogs and loaded potatoes from our cart, we've finally put down roots at our new brick and mortar location.
            </p>
            <p className="font-['Merriweather',_serif] text-[#3d3d3d] text-lg leading-relaxed mb-6">
              But don't worry – the recipes haven't changed. We still use the same quality ingredients, the same family recipes, and serve everything with the same love we always have. We're just doing it with a roof over our heads now!
            </p>
            <div className="flex items-center gap-4">
              <div className="w-16 h-1 bg-[#d4a10a]" />
              <span className="font-['Oswald',_sans-serif] text-[#d4a10a] font-bold tracking-wider">EST. 2018</span>
            </div>
          </div>
          
          {/* Visual element */}
          <div className="relative">
            <div className="absolute inset-0 bg-[#d4a10a] transform rotate-3" />
            <div className="relative bg-[#c8442d] p-8 transform -rotate-1">
              <div className="text-center">
                <span className="font-['Permanent_Marker',_cursive] text-white text-6xl md:text-7xl block">100%</span>
                <span className="font-['Oswald',_sans-serif] text-white/90 text-xl tracking-widest uppercase">Authentic Street Food</span>
              </div>
              <div className="mt-8 grid grid-cols-3 gap-4 text-center">
                <div>
                  <span className="font-['Permanent_Marker',_cursive] text-[#d4a10a] text-3xl">6+</span>
                  <p className="font-['Oswald',_sans-serif] text-white/80 text-sm uppercase">Years</p>
                </div>
                <div>
                  <span className="font-['Permanent_Marker',_cursive] text-[#d4a10a] text-3xl">1000s</span>
                  <p className="font-['Oswald',_sans-serif] text-white/80 text-sm uppercase">Happy Customers</p>
                </div>
                <div>
                  <span className="font-['Permanent_Marker',_cursive] text-[#d4a10a] text-3xl">∞</span>
                  <p className="font-['Oswald',_sans-serif] text-white/80 text-sm uppercase">Love</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Menu() {
  const [activeTab, setActiveTab] = useState<'hotdogs' | 'potatoes'>('hotdogs');

  return (
    <section id="menu" className="py-24 bg-[#1a1a1a]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 bg-[#d4a10a] text-[#1a1a1a] font-bold text-xs tracking-widest uppercase mb-4">
            What We Serve
          </span>
          <h2 className="font-['Permanent_Marker',_cursive] text-5xl md:text-6xl text-white mb-4">
            The Menu
          </h2>
          <p className="font-['Merriweather',_serif] text-white/70 text-lg max-w-2xl mx-auto">
            Every item made fresh to order with premium ingredients
          </p>
        </div>
        
        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-12">
          <button
            onClick={() => setActiveTab('hotdogs')}
            className={`px-8 py-3 font-['Oswald',_sans-serif] text-lg font-bold uppercase tracking-wider transition-all ${
              activeTab === 'hotdogs' 
                ? 'bg-[#c8442d] text-white' 
                : 'bg-transparent border-2 border-white/30 text-white/70 hover:border-[#c8442d] hover:text-white'
            }`}
          >
            🌭 Hot Dogs
          </button>
          <button
            onClick={() => setActiveTab('potatoes')}
            className={`px-8 py-3 font-['Oswald',_sans-serif] text-lg font-bold uppercase tracking-wider transition-all ${
              activeTab === 'potatoes' 
                ? 'bg-[#c8442d] text-white' 
                : 'bg-transparent border-2 border-white/30 text-white/70 hover:border-[#c8442d] hover:text-white'
            }`}
          >
            🥔 Baked Potatoes
          </button>
        </div>
        
        {/* Menu Items */}
        <div className="grid md:grid-cols-2 gap-6">
          {MENU_ITEMS[activeTab].map((item, index) => (
            <div 
              key={item.id}
              className="group bg-[#2a2a2a] p-6 border-l-4 border-[#d4a10a] hover:bg-[#333] transition-colors"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-['Oswald',_sans-serif] text-xl font-bold text-white group-hover:text-[#d4a10a] transition-colors">
                  {item.name}
                </h3>
                <span className="font-['Permanent_Marker',_cursive] text-[#d4a10a] text-2xl">
                  ${item.price.toFixed(2)}
                </span>
              </div>
              <p className="font-['Merriweather',_serif] text-white/60 text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
        
        {/* Additional info */}
        <div className="mt-12 text-center">
          <p className="font-['Oswald',_sans-serif] text-white/50 text-sm tracking-wider">
            * Add extra toppings for $0.75 each • Gluten-free buns available
          </p>
        </div>
      </div>
    </section>
  );
}

function Location() {
  return (
    <section id="location" className="py-24 bg-[#f5e6c8]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Hours */}
          <div>
            <span className="inline-block px-3 py-1 bg-[#1a1a1a] text-white font-bold text-xs tracking-widest uppercase mb-4">
              Hours
            </span>
            <h2 className="font-['Permanent_Marker',_cursive] text-4xl md:text-5xl text-[#1a1a1a] mb-8">
              When We're Open
            </h2>
            
            <div className="space-y-4">
              {['Monday', 'Tuesday'].map(day => (
                <div key={day} className="flex justify-between items-center py-3 border-b border-[#1a1a1a]/10">
                  <span className="font-['Oswald',_sans-serif] text-[#1a1a1a]/50 text-lg">{day}</span>
                  <span className="font-['Oswald',_sans-serif] text-[#1a1a1a]/50 text-lg">Closed</span>
                </div>
              ))}
              {['Wednesday', 'Thursday', 'Friday', 'Saturday'].map(day => (
                <div key={day} className="flex justify-between items-center py-3 border-b border-[#1a1a1a]/20">
                  <span className="font-['Oswald',_sans-serif] text-[#1a1a1a] text-lg font-bold">{day}</span>
                  <span className="font-['Oswald',_sans-serif] text-[#c8442d] text-lg font-bold">11am – 4pm</span>
                </div>
              ))}
              <div className="flex justify-between items-center py-3 border-b border-[#1a1a1a]/10">
                <span className="font-['Oswald',_sans-serif] text-[#1a1a1a]/50 text-lg">Sunday</span>
                <span className="font-['Oswald',_sans-serif] text-[#1a1a1a]/50 text-lg">Closed</span>
              </div>
            </div>
          </div>
          
          {/* Location */}
          <div>
            <span className="inline-block px-3 py-1 bg-[#c8442d] text-white font-bold text-xs tracking-widest uppercase mb-4">
              Location
            </span>
            <h2 className="font-['Permanent_Marker',_cursive] text-4xl md:text-5xl text-[#1a1a1a] mb-8">
              Find Us Here
            </h2>
            
            <div className="bg-[#1a1a1a] p-8">
              <address className="not-italic">
                <p className="font-['Oswald',_sans-serif] text-[#d4a10a] text-2xl font-bold mb-2">
                  Nick's Street Eats
                </p>
                <p className="font-['Merriweather',_serif] text-white text-lg mb-6">
                  1616 N Bell Street<br />
                  Fremont, NE
                </p>
              </address>
              
              <a 
                href="https://maps.google.com/?q=1616+N+Bell+Street,+Fremont,+NE"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#d4a10a] text-[#1a1a1a] font-['Oswald',_sans-serif] font-bold uppercase tracking-wider hover:bg-white transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Get Directions
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Catering() {
  const [showForm, setShowForm] = useState(false);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    eventDate: '',
    eventType: '',
    guestCount: '',
    menuPreferences: [] as string[],
    additionalInfo: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const menuOptions = ['Chicago Dogs', 'Coney Dogs', 'New York Dogs', 'Classic Dogs', 'Loaded Potatoes', 'Chili Cheese Potatoes', 'BBQ Pulled Pork Potatoes'];

  const toggleMenuOption = (option: string) => {
    setFormState(prev => ({
      ...prev,
      menuPreferences: prev.menuPreferences.includes(option)
        ? prev.menuPreferences.filter(o => o !== option)
        : [...prev.menuPreferences, option]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="catering" className="py-24 bg-[#c8442d]">
      <div className="max-w-4xl mx-auto px-6">
        {!showForm ? (
          <div className="text-center">
            <span className="inline-block px-3 py-1 bg-[#1a1a1a] text-white font-bold text-xs tracking-widest uppercase mb-4">
              Catering
            </span>
            <h2 className="font-['Permanent_Marker',_cursive] text-5xl md:text-6xl text-white mb-6">
              Feed Your Crowd
            </h2>
            <p className="font-['Merriweather',_serif] text-white/90 text-xl leading-relaxed mb-8 max-w-2xl mx-auto">
              Planning a party, corporate event, or family gathering? Let Nick's Street Eats bring the flavor! We offer full-service catering with all our signature dogs and loaded potatoes.
            </p>
            
            <div className="grid sm:grid-cols-3 gap-6 mb-12">
              {[
                { icon: '🎉', title: 'Private Parties', desc: 'Birthdays, graduations, celebrations' },
                { icon: '🏢', title: 'Corporate Events', desc: 'Lunches, meetings, company picnics' },
                { icon: '🏟️', title: 'Special Events', desc: 'Festivals, fairs, community events' },
              ].map(item => (
                <div key={item.title} className="bg-[#1a1a1a] p-6">
                  <span className="text-4xl mb-4 block">{item.icon}</span>
                  <h3 className="font-['Oswald',_sans-serif] text-[#d4a10a] text-lg font-bold uppercase mb-2">{item.title}</h3>
                  <p className="font-['Merriweather',_serif] text-white/70 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
            
            <button 
              onClick={() => setShowForm(true)}
              className="inline-block px-10 py-4 bg-[#d4a10a] text-[#1a1a1a] font-['Oswald',_sans-serif] text-lg font-bold uppercase tracking-wider hover:bg-white transition-colors"
            >
              Request Catering Quote
            </button>
          </div>
        ) : submitted ? (
          <div className="bg-[#1a1a1a] p-12 text-center max-w-xl mx-auto">
            <span className="text-6xl mb-4 block">🌭🥔</span>
            <h3 className="font-['Permanent_Marker',_cursive] text-[#d4a10a] text-3xl mb-4">Request Received!</h3>
            <p className="font-['Merriweather',_serif] text-white/80 mb-6">
              Thanks for your interest in Nick's Street Eats catering! We'll review your request and get back to you within 24-48 hours with a custom quote.
            </p>
            <button 
              onClick={() => { setShowForm(false); setSubmitted(false); setFormState({ name: '', email: '', phone: '', eventDate: '', eventType: '', guestCount: '', menuPreferences: [], additionalInfo: '' }); }}
              className="px-8 py-3 bg-[#d4a10a] text-[#1a1a1a] font-['Oswald',_sans-serif] font-bold uppercase tracking-wider hover:bg-white transition-colors"
            >
              Done
            </button>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h2 className="font-['Permanent_Marker',_cursive] text-3xl md:text-4xl text-white">
                Catering Request
              </h2>
              <button 
                onClick={() => setShowForm(false)}
                className="text-white/70 hover:text-white font-['Oswald',_sans-serif] uppercase tracking-wider text-sm"
              >
                ← Back
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="bg-[#1a1a1a] p-6 md:p-8">
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block font-['Oswald',_sans-serif] text-white/80 text-sm uppercase tracking-wider mb-2">Name *</label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={e => setFormState({...formState, name: e.target.value})}
                    className="w-full px-4 py-3 bg-[#2a2a2a] border-2 border-[#3a3a3a] text-white font-['Merriweather',_serif] focus:border-[#d4a10a] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-['Oswald',_sans-serif] text-white/80 text-sm uppercase tracking-wider mb-2">Phone *</label>
                  <input
                    type="tel"
                    required
                    value={formState.phone}
                    onChange={e => setFormState({...formState, phone: e.target.value})}
                    className="w-full px-4 py-3 bg-[#2a2a2a] border-2 border-[#3a3a3a] text-white font-['Merriweather',_serif] focus:border-[#d4a10a] focus:outline-none"
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block font-['Oswald',_sans-serif] text-white/80 text-sm uppercase tracking-wider mb-2">Email *</label>
                <input
                  type="email"
                  required
                  value={formState.email}
                  onChange={e => setFormState({...formState, email: e.target.value})}
                  className="w-full px-4 py-3 bg-[#2a2a2a] border-2 border-[#3a3a3a] text-white font-['Merriweather',_serif] focus:border-[#d4a10a] focus:outline-none"
                />
              </div>
              
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div>
                  <label className="block font-['Oswald',_sans-serif] text-white/80 text-sm uppercase tracking-wider mb-2">Event Date *</label>
                  <input
                    type="date"
                    required
                    value={formState.eventDate}
                    onChange={e => setFormState({...formState, eventDate: e.target.value})}
                    className="w-full px-4 py-3 bg-[#2a2a2a] border-2 border-[#3a3a3a] text-white font-['Merriweather',_serif] focus:border-[#d4a10a] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-['Oswald',_sans-serif] text-white/80 text-sm uppercase tracking-wider mb-2">Event Type *</label>
                  <select
                    required
                    value={formState.eventType}
                    onChange={e => setFormState({...formState, eventType: e.target.value})}
                    className="w-full px-4 py-3 bg-[#2a2a2a] border-2 border-[#3a3a3a] text-white font-['Merriweather',_serif] focus:border-[#d4a10a] focus:outline-none"
                  >
                    <option value="">Select...</option>
                    <option value="birthday">Birthday Party</option>
                    <option value="graduation">Graduation</option>
                    <option value="corporate">Corporate Event</option>
                    <option value="wedding">Wedding/Reception</option>
                    <option value="festival">Festival/Fair</option>
                    <option value="sports">Sports Event</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block font-['Oswald',_sans-serif] text-white/80 text-sm uppercase tracking-wider mb-2"># of Guests *</label>
                  <select
                    required
                    value={formState.guestCount}
                    onChange={e => setFormState({...formState, guestCount: e.target.value})}
                    className="w-full px-4 py-3 bg-[#2a2a2a] border-2 border-[#3a3a3a] text-white font-['Merriweather',_serif] focus:border-[#d4a10a] focus:outline-none"
                  >
                    <option value="">Select...</option>
                    <option value="10-25">10-25</option>
                    <option value="26-50">26-50</option>
                    <option value="51-100">51-100</option>
                    <option value="101-200">101-200</option>
                    <option value="200+">200+</option>
                  </select>
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block font-['Oswald',_sans-serif] text-white/80 text-sm uppercase tracking-wider mb-3">Menu Preferences (select all that apply)</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {menuOptions.map(option => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => toggleMenuOption(option)}
                      className={`px-3 py-2 text-sm font-['Oswald',_sans-serif] uppercase tracking-wide transition-colors text-left ${
                        formState.menuPreferences.includes(option)
                          ? 'bg-[#d4a10a] text-[#1a1a1a]'
                          : 'bg-[#2a2a2a] text-white/70 hover:bg-[#3a3a3a]'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="mb-8">
                <label className="block font-['Oswald',_sans-serif] text-white/80 text-sm uppercase tracking-wider mb-2">Additional Information</label>
                <textarea
                  value={formState.additionalInfo}
                  onChange={e => setFormState({...formState, additionalInfo: e.target.value})}
                  placeholder="Event location, special dietary requirements, timing preferences, or any other details..."
                  rows={4}
                  className="w-full px-4 py-3 bg-[#2a2a2a] border-2 border-[#3a3a3a] text-white font-['Merriweather',_serif] focus:border-[#d4a10a] focus:outline-none resize-none"
                />
              </div>
              
              <button
                type="submit"
                className="w-full py-4 bg-[#d4a10a] text-[#1a1a1a] font-['Oswald',_sans-serif] text-lg font-bold uppercase tracking-wider hover:bg-white transition-colors"
              >
                Submit Catering Request
              </button>
            </form>
          </div>
        )}
      </div>
    </section>
  );
}

function Contact() {
  const [formState, setFormState] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 bg-[#1a1a1a]">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 bg-[#d4a10a] text-[#1a1a1a] font-bold text-xs tracking-widest uppercase mb-4">
            Contact
          </span>
          <h2 className="font-['Permanent_Marker',_cursive] text-5xl md:text-6xl text-white mb-4">
            Get In Touch
          </h2>
          <p className="font-['Merriweather',_serif] text-white/70 text-lg">
            Questions about our menu, catering, or just want to say hi?
          </p>
        </div>
        
        {submitted ? (
          <div className="bg-[#2a2a2a] p-12 text-center">
            <span className="text-6xl mb-4 block">🌭</span>
            <h3 className="font-['Permanent_Marker',_cursive] text-[#d4a10a] text-3xl mb-4">Thanks!</h3>
            <p className="font-['Merriweather',_serif] text-white/80">We'll get back to you soon.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-[#2a2a2a] p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block font-['Oswald',_sans-serif] text-white/80 text-sm uppercase tracking-wider mb-2">Name</label>
                <input
                  type="text"
                  required
                  value={formState.name}
                  onChange={e => setFormState({...formState, name: e.target.value})}
                  className="w-full px-4 py-3 bg-[#1a1a1a] border-2 border-[#3a3a3a] text-white font-['Merriweather',_serif] focus:border-[#d4a10a] focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block font-['Oswald',_sans-serif] text-white/80 text-sm uppercase tracking-wider mb-2">Email</label>
                <input
                  type="email"
                  required
                  value={formState.email}
                  onChange={e => setFormState({...formState, email: e.target.value})}
                  className="w-full px-4 py-3 bg-[#1a1a1a] border-2 border-[#3a3a3a] text-white font-['Merriweather',_serif] focus:border-[#d4a10a] focus:outline-none transition-colors"
                />
              </div>
            </div>
            <div className="mb-6">
              <label className="block font-['Oswald',_sans-serif] text-white/80 text-sm uppercase tracking-wider mb-2">Phone</label>
              <input
                type="tel"
                value={formState.phone}
                onChange={e => setFormState({...formState, phone: e.target.value})}
                className="w-full px-4 py-3 bg-[#1a1a1a] border-2 border-[#3a3a3a] text-white font-['Merriweather',_serif] focus:border-[#d4a10a] focus:outline-none transition-colors"
              />
            </div>
            <div className="mb-8">
              <label className="block font-['Oswald',_sans-serif] text-white/80 text-sm uppercase tracking-wider mb-2">Message</label>
              <textarea
                required
                rows={5}
                value={formState.message}
                onChange={e => setFormState({...formState, message: e.target.value})}
                className="w-full px-4 py-3 bg-[#1a1a1a] border-2 border-[#3a3a3a] text-white font-['Merriweather',_serif] focus:border-[#d4a10a] focus:outline-none transition-colors resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full py-4 bg-[#c8442d] text-white font-['Oswald',_sans-serif] text-lg font-bold uppercase tracking-wider hover:bg-[#d4a10a] hover:text-[#1a1a1a] transition-colors"
            >
              Send Message
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-12 bg-[#0f0f0f]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <span className="font-['Permanent_Marker',_cursive] text-[#d4a10a] text-2xl">Nick's Street Eats</span>
            <p className="font-['Oswald',_sans-serif] text-white/50 text-sm mt-1">1616 N Bell Street, Fremont, NE</p>
          </div>
          
          <nav className="flex gap-6">
            {['Menu', 'About', 'Location', 'Catering', 'Contact'].map(item => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="font-['Oswald',_sans-serif] text-white/70 text-sm uppercase tracking-wider hover:text-[#d4a10a] transition-colors"
              >
                {item}
              </a>
            ))}
          </nav>
          
          <p className="font-['Oswald',_sans-serif] text-white/30 text-xs">
            © {new Date().getFullYear()} Nick's Street Eats
          </p>
        </div>
      </div>
    </footer>
  );
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#1a1a1a]/95 backdrop-blur-sm py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
        <a href="#" className="font-['Permanent_Marker',_cursive] text-[#d4a10a] text-xl md:text-2xl">
          Nick's Street Eats
        </a>
        
        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {['Menu', 'About', 'Location', 'Catering', 'Contact'].map(item => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="font-['Oswald',_sans-serif] text-white/80 text-sm uppercase tracking-wider hover:text-[#d4a10a] transition-colors"
            >
              {item}
            </a>
          ))}
        </div>
        
        {/* Mobile toggle */}
        <button 
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-white p-2"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>
      
      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#1a1a1a] border-t border-white/10 mt-4">
          <div className="flex flex-col p-6 gap-4">
            {['Menu', 'About', 'Location', 'Catering', 'Contact'].map(item => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setMobileOpen(false)}
                className="font-['Oswald',_sans-serif] text-white text-lg uppercase tracking-wider hover:text-[#d4a10a] transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

function Index() {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,400;0,700;1,400&family=Oswald:wght@400;600;700&family=Permanent+Marker&display=swap" rel="stylesheet" />
      
      <div className="overflow-x-hidden">
        <Navbar />
        <Hero />
        <About />
        <Menu />
        <Location />
        <Catering />
        <Contact />
        <Footer />
      </div>
    </>
  );
}

export default Index;
