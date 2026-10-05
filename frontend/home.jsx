import React, { useState } from 'react';

// ==========================================
// 1. NAVBAR COMPONENT
// ==========================================
function Navbar({ activeTab, setActiveTab }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'acasa', label: 'Acasa' },
    { id: 'program', label: 'Program' },
    { id: 'clase', label: 'Clase' },
    { id: 'instructori', label: 'Instructori' },
    { id: 'tarife', label: 'Tarife' },
    { id: 'locatii', label: 'Locații' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#FDFBF7]/95 backdrop-blur-md border-b border-[#EFECE6] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('acasa')}>
          <div className="w-10 h-10 rounded-full bg-[#8C5E48] flex items-center justify-center text-white font-serif text-xl font-bold">
            YP
          </div>
          <div>
            <span className="font-serif text-2xl font-bold tracking-tight text-[#3A322C]">Zenith</span>
            <span className="text-xs uppercase tracking-widest block text-[#8C5E48] font-medium">Yoga & Pilates</span>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`text-sm font-medium transition-colors hover:text-[#8C5E48] ${
                activeTab === item.id ? 'text-[#8C5E48] font-semibold border-b-2 border-[#8C5E48] pb-1' : 'text-[#6B5E55]'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden md:flex items-center">
          <button
            onClick={() => setActiveTab('devino-membru')}
            className="bg-[#8C5E48] hover:bg-[#734B38] text-white px-5 py-2.5 rounded-full text-sm font-medium transition-all shadow-md hover:shadow-lg"
          >
            Devino Membru
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-[#3A322C] p-2 focus:outline-none"
            aria-label="Meniu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FDFBF7] border-b border-[#EFECE6] px-4 pt-2 pb-6 space-y-3">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setMobileMenuOpen(false);
              }}
              className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                activeTab === item.id ? 'bg-[#8C5E48]/10 text-[#8C5E48]' : 'text-[#6B5E55] hover:bg-gray-50'
              }`}
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => {
              setActiveTab('devino-membru');
              setMobileMenuOpen(false);
            }}
            className="w-full text-center bg-[#8C5E48] text-white px-4 py-2.5 rounded-full text-sm font-medium mt-2 shadow"
          >
            Devino Membru
          </button>
        </div>
      )}
    </header>
  );
}

// ==========================================
// 2. HERO COMPONENT (Cu loc rezervat pentru poză fundal)
// ==========================================
function HeroSection({ setActiveTab }) {
  return (
    <section className="relative bg-[#F4EFEA] py-20 lg:py-32 overflow-hidden border-b border-[#EBE3DC]">
      {/* 
        ====================================================
        LOC REZERVAT PENTRU POZA DE FUNDAL DIN SALA DE PILATES:
        Înlocuiește clasa CSS `pilates-bg-placeholder` sau adaugă 
        stilul inline `backgroundImage: 'url("link-catre-poza.jpg")'`
        ====================================================
      */}
      <div 
        className="absolute inset-0 z-0 opacity-20 bg-cover bg-center pilates-bg-placeholder"
        style={{ 
          // Exemplu de inserare imagine: backgroundImage: 'url("https://placehold.co/1920x1080/dcd1c5/3a322c?text=Insereaza+Poza+Sala+Pilates+Aici")' 
          backgroundImage: 'radial-gradient(#8c5e48 1px, transparent 1px)',
          backgroundSize: '24px 24px' 
        }}
      ></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <span className="inline-block bg-[#8C5E48]/10 text-[#8C5E48] text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-4">
          Studio de Yoga & Pilates 
        </span>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#3A322C] max-w-4xl mx-auto leading-tight">
          Bine ai venit la <span className="text-[#8C5E48]">Diana Studio</span>
        </h1>
        <p className="mt-6 text-lg sm:text-xl text-[#6B5E55] max-w-2xl mx-auto leading-relaxed">
          Peste 8 ani de experiență în ghidarea ta spre armonie interioară, forță și flexibilitate. Echipamente de top Reformer, instructor dedicat și un spațiu creat pentru starea ta de bine.
        </p>

        {/* Butoane acțiune rapide */}
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <button
            onClick={() => setActiveTab('program')}
            className="bg-[#8C5E48] hover:bg-[#734B38] text-white px-8 py-3.5 rounded-full font-medium transition shadow-md hover:shadow-lg"
          >
            Vezi Programul
          </button>
          <button
            onClick={() => setActiveTab('clase')}
            className="bg-white hover:bg-gray-50 text-[#3A322C] border border-[#D9CEC3] px-8 py-3.5 rounded-full font-medium transition shadow-sm"
          >
            Explorează Clasele
          </button>
        </div>

        {/* Grid scurt de facilități / badge-uri stil Gym One */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {[
            "Suprafață generoasă de peste 600 mp",
            "Echipamente Reformer & Tower Premium",
            "Abonament valabil în toate cele 3 locații",
            "Clase de Yoga & Pilates cu instructori certificați",
            "Zone dedicate pentru relaxare și meditație",
            "Vestiare moderne, dușuri și dulapuri inteligente"
          ].map((text, idx) => (
            <div key={idx} className="bg-white/80 backdrop-blur border border-[#E8E0D5] p-4 rounded-xl flex items-center gap-3 text-left shadow-xs">
              <div className="w-6 h-6 rounded-full bg-[#8C5E48]/20 flex items-center justify-center text-[#8C5E48] shrink-0 text-xs font-bold">✓</div>
              <span className="text-sm font-medium text-[#3A322C]">{text}</span>
            </div>
          ))}
        </div>

        {/* Banner partener / echipamente */}
        <div className="mt-12 bg-[#26211D] text-white rounded-2xl p-6 md:p-8 max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="text-left">
            <span className="text-xs uppercase tracking-widest text-[#D9CEC3] font-semibold">Partener Oficial Echipamente</span>
            <h3 className="text-2xl font-serif font-bold mt-1 text-[#FDFBF7]">Echipamente Profesionale Reformer & Pilates</h3>
            <p className="text-sm text-gray-300 mt-2">
              Studioul este dotat exclusiv cu aparatură ergonomică de înaltă precizie pentru un antrenament sigur și eficient.
            </p>
          </div>
          <div className="bg-white/10 border border-white/20 px-6 py-4 rounded-xl text-center shrink-0">
            <span className="font-serif font-bold tracking-wider text-xl text-white">ZENITH MAKERS</span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ==========================================
// 3. FEATURES COMPONENT
// ==========================================
function FeaturesSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-serif font-bold text-[#3A322C]">De ce să alegi acest Studio?</h2>
        <p className="text-[#6B5E55] mt-2 max-w-xl mx-auto">
          Un concept unic dedicat echilibrului tău fizic și mental într-o atmosferă caldă și primitoare.
        </p>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "Fără Costuri Suplimentare", desc: "Acces inclus automat în abonament la toate sesiunile open și facilitățile de bază.", icon: "💎" },
            { title: "La Toate Locațiile", desc: "Poți folosi abonamentul tău în oricare dintre cele 3 studiouri Zenith din oraș.", icon: "📍" },
            { title: "Oricând Ai Nevoie", desc: "Întreabă oricând instructorii noștri pentru sfaturi personalizate și corectură posturală.", icon: "✨" }
          ].map((f, i) => (
            <div key={i} className="p-8 rounded-2xl bg-[#F9F7F4] border border-[#EFECE6] text-center hover:shadow-md transition">
              <div className="w-14 h-14 mx-auto rounded-full bg-[#8C5E48]/10 flex items-center justify-center text-2xl mb-4">
                {f.icon}
              </div>
              <h3 className="font-serif font-bold text-lg text-[#3A322C]">{f.title}</h3>
              <p className="text-sm text-[#6B5E55] mt-2 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ==========================================
// 4. CLASSES COMPONENT
// ==========================================
function ClassesSection({ setActiveTab }) {
  const classesList = [
    { title: "Functional Flow", desc: "Mișcare funcțională continuă pentru forță, mobilitate și control.", time: "55 min", locations: ["Zenith Centru", "Zenith Vest"] },
    { title: "Body Upgrade", desc: "Antrenament complet pentru îmbunătățirea formei fizice și a tonusului.", time: "50 min", locations: ["Zenith Centru"] },
    { title: "Mat Pilates", desc: "Exerciții clasice la saltea pentru întărirea zonei core și stabilirea posturii.", time: "60 min", locations: ["Zenith Centru", "Zenith Nord"] },
    { title: "Reformer Advanced", desc: "Sesiuni dinamice pe aparate cu rezistență de arc pentru alungire musculară.", time: "50 min", locations: ["Zenith Vest", "Zenith Nord"] }
  ];

  return (
    <section className="py-20 bg-[#F4EFEA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-serif font-bold text-[#3A322C]">Clase de Grup</h2>
        <p className="text-[#6B5E55] mt-2">Peste 20 de programe diferite disponibile în studiourile noastre</p>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          {classesList.map((cls, index) => (
            <div key={index} className="bg-white rounded-2xl border border-[#E2DAD0] shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition">
              <div className="p-6">
                <div className="w-12 h-12 rounded-full bg-[#8C5E48]/10 flex items-center justify-center text-[#8C5E48] font-bold mb-4">
                  YP
                </div>
                <h3 className="font-serif font-bold text-lg text-[#3A322C]">{cls.title}</h3>
                <p className="text-xs text-[#6B5E55] mt-2 leading-relaxed min-h-[36px]">{cls.desc}</p>
                <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                  <span>⏱ {cls.time}</span>
                </div>
                <div className="mt-2 flex flex-wrap gap-1">
                  {cls.locations.map((loc, lIdx) => (
                    <span key={lIdx} className="bg-[#F4EFEA] text-[#8C5E48] text-[10px] px-2 py-0.5 rounded-full font-medium">
                      {loc}
                    </span>
                  ))}
                </div>
              </div>
              <div className="px-6 pb-6 pt-0">
                <button 
                  onClick={() => setActiveTab('clase')}
                  className="w-full bg-[#F4EFEA] hover:bg-[#8C5E48] hover:text-white text-[#3A322C] py-2 rounded-xl text-xs font-semibold transition flex items-center justify-center gap-1"
                >
                  Vezi Detalii →
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <button
            onClick={() => setActiveTab('clase')}
            className="bg-[#8C5E48] hover:bg-[#734B38] text-white px-8 py-3 rounded-full text-sm font-medium transition shadow"
          >
            Vezi Toate Clasele
          </button>
        </div>
      </div>
    </section>
  );
}

// ==========================================
// 5. INSTRUCTORS COMPONENT
// ==========================================
function InstructorsSection({ setActiveTab }) {
  const instructors = [
    { name: "Elena Dumitrescu", role: "Instructor Principal Yoga", exp: "8 ani experiență" },
    { name: "Andrei Ionescu", role: "Specialist Pilates & Reformer", exp: "6 ani experiență" }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-serif font-bold text-[#3A322C]">Instructorii Noștri</h2>
        <p className="text-[#6B5E55] mt-2">Instructori certificați internațional care conduc clasele cu pasiune și atenție</p>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {instructors.map((inst, idx) => (
            <div key={idx} className="bg-[#F9F7F4] rounded-2xl border border-[#EFECE6] overflow-hidden group shadow-xs">
              <div className="h-48 bg-gradient-to-br from-[#E2DAD0] to-[#CFC4B6] flex items-center justify-center relative">
                <span className="text-4xl">🧘‍♀️</span>
                <div className="absolute inset-0 bg-[#8C5E48]/20 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                  <span className="bg-white text-[#3A322C] text-xs px-3 py-1.5 rounded-full font-semibold shadow">Profil Instructor</span>
                </div>
              </div>
              <div className="p-5 text-left">
                <h3 className="font-serif font-bold text-base text-[#3A322C]">{inst.name}</h3>
                <p className="text-xs text-[#8C5E48] font-medium mt-1">{inst.role}</p>
                <p className="text-xs text-gray-500 mt-2">{inst.exp}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <button
            onClick={() => setActiveTab('instructori')}
            className="border border-[#8C5E48] text-[#8C5E48] hover:bg-[#8C5E48] hover:text-white px-8 py-3 rounded-full text-sm font-medium transition"
          >
            Vezi Toți Instructorii
          </button>
        </div>

        {/* Secțiune poză de grup echipă (loc rezervat) */}
        <div className="mt-20">
          <div className="inline-block bg-[#8C5E48]/10 text-[#8C5E48] text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full mb-3">
            Suport Inclus
          </div>
          <h3 className="text-2xl font-serif font-bold text-[#3A322C]">Antrenori Mereu la Dispoziția Ta</h3>
          <p className="text-[#6B5E55] text-sm mt-1 max-w-xl mx-auto">
            Toate abonamentele includ îndrumare permanentă în timpul ședințelor pentru corectarea posturii și progres constant.
          </p>

          <div className="mt-8 max-w-4xl mx-auto bg-[#F4EFEA] rounded-2xl overflow-hidden border border-[#E5DDD3] shadow-md p-4">
            <div className="w-full h-72 sm:h-96 bg-[#D8CEBF] rounded-xl flex flex-col items-center justify-center text-[#6B5E55] p-6 border-2 border-dashed border-[#B8A99A]">
              <span className="text-4xl mb-2">📸</span>
              <p className="font-serif font-semibold text-lg text-[#3A322C]">Loc rezervat pentru poza de grup a echipei</p>
              <p className="text-xs text-gray-600 mt-1 max-w-md text-center">
                Aici poți insera fotografia colectivă a instructorilor de yoga și pilates din studio.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ==========================================
// 6. PRICING COMPONENT
// ==========================================
function PricingSection({ setActiveTab }) {
  return (
    <section className="py-20 bg-[#F4EFEA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-serif font-bold text-[#3A322C]">Tarife & Abonamente</h2>
        <p className="text-[#6B5E55] mt-2">Descoperă pachetele flexibile pentru toate cele 3 locații Zenith</p>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            { title: "Yoga Nelimitat", desc: "Acces la toate clasele de yoga din oricare studio", price: "219 Lei / lună" },
            { title: "Pilates & Reformer", desc: "Sesiuni incluse pe aparate specializate", price: "289 Lei / lună" },
            { title: "Full Access Zen", desc: "Acces complet Yoga + Pilates + SPA & Relaxare", price: "349 Lei / lună" }
          ].map((p, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-6 border border-[#E2DAD0] shadow-sm flex flex-col justify-between text-left">
              <div>
                <h3 className="font-serif font-bold text-lg text-[#3A322C]">{p.title}</h3>
                <p className="text-xs text-gray-500 mt-1">{p.desc}</p>
                <div className="mt-6 text-2xl font-serif font-bold text-[#8C5E48]">{p.price}</div>
              </div>
              <button 
                onClick={() => setActiveTab('tarife')}
                className="mt-6 w-full bg-[#8C5E48]/10 hover:bg-[#8C5E48] hover:text-white text-[#8C5E48] py-2.5 rounded-xl text-xs font-semibold transition"
              >
                Alege Pachetul
              </button>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-white rounded-2xl p-8 max-w-4xl mx-auto border border-[#E2DAD0] shadow-sm flex flex-col sm:flex-row items-center justify-around gap-6">
          <div>
            <span className="text-xs text-gray-500 uppercase tracking-wider block">Abonamente de la</span>
            <span className="text-3xl font-serif font-bold text-[#3A322C]">189 Lei <span className="text-sm font-normal text-gray-500">/lună</span></span>
          </div>
          <div className="h-10 w-px bg-gray-200 hidden sm:block"></div>
          <div>
            <span className="text-xs text-gray-500 uppercase tracking-wider block">Economisești până la</span>
            <span className="text-3xl font-serif font-bold text-[#8C5E48]">30% <span className="text-sm font-normal text-gray-500">la abonamentul anual</span></span>
          </div>
        </div>

        <div className="mt-10">
          <button
            onClick={() => setActiveTab('tarife')}
            className="bg-[#8C5E48] hover:bg-[#734B38] text-white px-8 py-3 rounded-full text-sm font-medium transition shadow"
          >
            Vezi Toate Abonamentele
          </button>
        </div>
      </div>
    </section>
  );
}

// ==========================================
// 7. LOCATIONS COMPONENT
// ==========================================
function LocationsSection({ setActiveTab }) {
  const locations = [
    { name: "Zenith Centru", address: "Bd. Victoriei nr. 12", tel: "0721 000 111" },
    { name: "Zenith Vest", address: "Str. Soarelui nr. 45", tel: "0721 000 222" },
    { name: "Zenith Nord", address: "Complex Comercial Nord, Etaj 2", tel: "0721 000 333" }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-serif font-bold text-[#3A322C]">Locațiile Noastre</h2>
        <p className="text-[#6B5E55] mt-2">Te așteptăm în cele 3 studiouri moderne dotate pentru confortul tău</p>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto text-left">
          {locations.map((loc, idx) => (
            <div key={idx} className="bg-[#F9F7F4] p-6 rounded-2xl border border-[#EFECE6] shadow-xs">
              <h3 className="font-serif font-bold text-lg text-[#3A322C]">{loc.name}</h3>
              <p className="text-xs text-[#6B5E55] mt-2">📍 {loc.address}</p>
              <p className="text-xs text-[#6B5E55] mt-1">📞 {loc.tel}</p>
              <button 
                onClick={() => setActiveTab('locatii')}
                className="mt-6 w-full bg-white border border-[#D9CEC3] hover:bg-[#8C5E48] hover:text-white hover:border-[#8C5E48] text-[#3A322C] py-2 rounded-xl text-xs font-semibold transition"
              >
                Vezi Detalii & Hartă
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ==========================================
// 8. FOOTER COMPONENT
// ==========================================
function Footer({ setActiveTab }) {
  return (
    <footer className="bg-[#26211D] text-[#E5DDD3] py-16 border-t border-[#3A322C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-[#8C5E48] flex items-center justify-center text-white font-serif font-bold">
              YP
            </div>
            <span className="font-serif text-xl font-bold text-white">Zenith Studio</span>
          </div>
          <p className="text-xs text-gray-400 leading-relaxed">
            Studioul tău de Yoga și Pilates pentru armonie trup și minte. Echipamente profesionale și instructori dedicați.
          </p>
        </div>

        <div>
          <h4 className="font-serif font-bold text-white mb-3 text-sm">Navigare rapidă</h4>
          <ul className="space-y-2 text-xs text-gray-400">
            <li><button onClick={() => setActiveTab('acasa')} className="hover:text-white">Acasă</button></li>
            <li><button onClick={() => setActiveTab('program')} className="hover:text-white">Program</button></li>
            <li><button onClick={() => setActiveTab('clase')} className="hover:text-white">Clase</button></li>
            <li><button onClick={() => setActiveTab('instructori')} className="hover:text-white">Instructori</button></li>
          </ul>
        </div>

        <div>
          <h4 className="font-serif font-bold text-white mb-3 text-sm">Informații</h4>
          <ul className="space-y-2 text-xs text-gray-400">
            <li><button onClick={() => setActiveTab('tarife')} className="hover:text-white">Tarife și Abonamente</button></li>
            <li><button onClick={() => setActiveTab('locatii')} className="hover:text-white">Locațiile Noastre</button></li>
            <li><button onClick={() => setActiveTab('devino-membru')} className="hover:text-white">Devino Membru</button></li>
          </ul>
        </div>

        <div>
          <h4 className="font-serif font-bold text-white mb-3 text-sm">Contact</h4>
          <p className="text-xs text-gray-400">contact@zenithstudio.ro</p>
          <p className="text-xs text-gray-400 mt-1">Luni - Duminică: 07:00 - 22:00</p>
          <div className="mt-4 flex gap-3">
            <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs cursor-pointer hover:bg-[#8C5E48]">f</span>
            <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs cursor-pointer hover:bg-[#8C5E48]">ig</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-6 border-t border-white/10 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Zenith Yoga & Pilates Studio. Toate drepturile rezervate.
      </div>
    </footer>
  );
}

// ==========================================
// 9. MAIN APP / HOME COMPONENT
// ==========================================
export default function App() {
  const [activeTab, setActiveTab] = useState('acasa');

  return (
    <div className="min-h-screen bg-[#FDFBF7] font-sans text-[#3A322C] flex flex-col selection:bg-[#8C5E48] selection:text-white">
      {/* Navbar Comun */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Zonă de conținut dinamic în funcție de tab-ul selectat */}
      <main className="flex-grow">
        {activeTab === 'acasa' && (
          <>
            <HeroSection setActiveTab={setActiveTab} />
            <FeaturesSection />
            <ClassesSection setActiveTab={setActiveTab} />
            <InstructorsSection setActiveTab={setActiveTab} />
            <PricingSection setActiveTab={setActiveTab} />
            <LocationsSection setActiveTab={setActiveTab} />
          </>
        )}

        {activeTab !== 'acasa' && (
          <div className="py-24 px-4 max-w-4xl mx-auto text-center">
            <span className="text-xs uppercase tracking-widest text-[#8C5E48] font-semibold">Secțiune în dezvoltare</span>
            <h1 className="text-4xl font-serif font-bold text-[#3A322C] mt-2 capitalize">
              Pagina: {activeTab.replace('-', ' ')}
            </h1>
            <p className="text-[#6B5E55] mt-4">
              Această pagină dedicată va fi configurată în curând conform cerintelor tale pentru studio-ul de Yoga și Pilates.
            </p>
            <button
              onClick={() => setActiveTab('acasa')}
              className="mt-8 bg-[#8C5E48] hover:bg-[#734B38] text-white px-6 py-3 rounded-full text-sm font-medium transition shadow"
            >
              ← Înapoi la Acasă
            </button>
          </div>
        )}
      </main>

      {/* Footer Comun */}
      <Footer setActiveTab={setActiveTab} />
    </div>
  );
}