import { motion } from 'framer-motion';
import { 
  Truck, ArrowRight, MapPin, BarChart3, CheckCircle2, 
  Package, Activity, Users, Zap, Shield, TrendingUp,
  ChevronDown, Menu, X
} from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

// ─── Floating Shipment Status Card ───────────────────────────────────────────
const ShipmentStatusCard = () => (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: [-5, 5, -5] }}
    transition={{ opacity: { delay: 0.8, duration: 0.6 }, y: { repeat: Infinity, duration: 4, ease: "easeInOut" } }}
    className="absolute top-8 left-1/2 -translate-x-1/2 lg:left-[5%] lg:translate-x-0 lg:top-[18%] z-30 pointer-events-auto
      bg-white/95 backdrop-blur-md border border-gray-100 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.08)]
      px-4 py-3 w-64 hover:scale-105 transition-transform"
  >
    <div className="flex items-center gap-3 mb-2">
      <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
        <Truck size={18} className="text-blue-500" />
      </div>
      <div>
        <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide">Shipment Status</p>
        <p className="text-sm font-bold text-gray-900">TRK-8921</p>
      </div>
    </div>
    <div className="flex items-center gap-1.5 mb-1">
      <span className="w-2 h-2 rounded-full bg-[#FF6B00] animate-pulse"></span>
      <span className="text-xs font-semibold text-[#FF6B00]">In Transit</span>
    </div>
    <p className="text-xs text-gray-500 flex items-center gap-1">
      <MapPin size={10} className="text-gray-400" />
      Shanghai → Berlin
    </p>
  </motion.div>
);

// ─── On-Time Delivery Card ────────────────────────────────────────────────────
const DeliveryCard = () => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, y: [5, -5, 5] }}
    transition={{ opacity: { delay: 1, duration: 0.6 }, y: { repeat: Infinity, duration: 5, ease: "easeInOut" } }}
    className="absolute top-8 right-4 lg:-right-4 lg:top-[12%] xl:right-4 z-30 pointer-events-auto
      bg-white/95 backdrop-blur-md border border-gray-100 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.08)]
      px-4 py-4 w-44 hidden lg:block hover:scale-105 transition-transform"
  >
    <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-3">On-Time Delivery</p>
    <div className="flex items-center justify-center mb-2">
      <div className="relative w-20 h-20">
        <svg viewBox="0 0 80 80" className="w-20 h-20 -rotate-90">
          <circle cx="40" cy="40" r="32" fill="none" stroke="#F3F4F6" strokeWidth="6" />
          <circle
            cx="40" cy="40" r="32" fill="none" stroke="#FF6B00" strokeWidth="6"
            strokeDasharray={`${2 * Math.PI * 32 * 0.968} ${2 * Math.PI * 32 * 0.032}`}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-base font-black text-gray-900">96.8%</span>
        </div>
      </div>
    </div>
    <p className="text-[10px] text-center text-green-600 font-semibold">+12.5% this month</p>
  </motion.div>
);

// ─── Active Fleet Card ────────────────────────────────────────────────────────
const FleetCard = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: [-5, 5, -5] }}
    transition={{ opacity: { delay: 1.2, duration: 0.6 }, y: { repeat: Infinity, duration: 4.5, ease: "easeInOut" } }}
    className="absolute bottom-12 right-4 lg:right-0 lg:bottom-[10%] xl:right-[5%] z-30 pointer-events-auto
      bg-white/95 backdrop-blur-md border border-gray-100 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.08)]
      px-4 py-3 w-48 hidden lg:block hover:scale-105 transition-transform"
  >
    <div className="flex items-center gap-2 mb-1">
      <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center">
        <Truck size={14} className="text-[#FF6B00]" />
      </div>
      <p className="text-[11px] font-semibold text-gray-400">Active Fleet</p>
    </div>
    <p className="text-3xl font-black text-gray-900 mb-1">342</p>
    <p className="text-[10px] text-gray-500 mb-2">Vehicles on Move</p>
    <svg viewBox="0 0 120 36" className="w-full">
      <polyline
        points="0,28 20,22 40,26 60,14 80,18 100,8 120,4"
        fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
      />
    </svg>
  </motion.div>
);

// ─── Dot Grid Background ──────────────────────────────────────────────────────
const DotGrid = () => (
  <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="1.5" fill="#94a3b8" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#dots)" />
  </svg>
);

// ─── Map Pin Component ────────────────────────────────────────────────────────
const MapPinIcon = ({ x, y, delay }) => (
  <motion.svg width="24" height="24" viewBox="0 0 24 24" 
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay, type: "spring" }}
    style={{ position: 'absolute', left: x, top: y, marginLeft: '-12px', marginTop: '-24px' }} overflow="visible" className="z-30 drop-shadow-md"
  >
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="#FF6B00"/>
    <circle cx="12" cy="9" r="6" fill="#FF6B00" opacity="0.3" className="animate-ping" />
  </motion.svg>
);

// ─── Route Lines ──────────────────────────────────────────────────────────────
const RouteLines = () => (
  <div className="absolute inset-0 w-full h-full pointer-events-none z-30">
    <svg className="w-full h-full drop-shadow-sm" viewBox="0 0 1000 1000" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#93c5fd" stopOpacity="0.2" />
        </linearGradient>
      </defs>
      
      {/* Curved connecting lines to map pins (1000x1000 viewBox matches percentage scale) */}
      <motion.path 
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, delay: 0.5 }}
        d="M 600 250 Q 450 100 300 200" fill="none" stroke="url(#lineGrad)" strokeWidth="1.5" vectorEffect="non-scaling-stroke"
      />
      <motion.path 
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, delay: 0.7 }}
        d="M 600 250 Q 750 50 900 120" fill="none" stroke="url(#lineGrad)" strokeWidth="1.5" vectorEffect="non-scaling-stroke"
      />
      <motion.path 
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, delay: 0.9 }}
        d="M 600 250 Q 650 400 780 320" fill="none" stroke="url(#lineGrad)" strokeWidth="1.5" vectorEffect="non-scaling-stroke"
      />
    </svg>

    {/* Map Pins overlayed using CSS absolute positioning */}
    <MapPinIcon x="60%" y="25%" delay={0.5} />
    <MapPinIcon x="30%" y="20%" delay={0.7} />
    <MapPinIcon x="78%" y="32%" delay={0.9} />
  </div>
);

// ─── Navbar ───────────────────────────────────────────────────────────────────
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed w-full top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-5 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-[#FF6B00] flex items-center justify-center shadow-md shadow-orange-200">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M2 9C2 5.13 5.13 2 9 2s7 3.13 7 7-3.13 7-7 7-7-3.13-7-7z" fill="white" opacity="0.3"/>
              <path d="M9 5.5C7.07 5.5 5.5 7.07 5.5 9S7.07 12.5 9 12.5 12.5 10.93 12.5 9 10.93 5.5 9 5.5z" fill="white"/>
              <path d="M9 2v3M9 13v3M2 9h3M13 9h3" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
          <span className="text-lg font-black text-gray-900 tracking-tight">OpsPulse</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          <Link
            to="/"
            className="px-3.5 py-2 text-sm font-medium rounded-lg transition-colors text-[#FF6B00] bg-orange-50"
          >
            Home
          </Link>
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link to="/login" className="text-sm font-semibold text-gray-700 hover:text-gray-900 transition-colors px-3 py-2 rounded-lg hover:bg-gray-50">
            Login
          </Link>
          <Link to="/register" className="text-sm font-bold bg-[#FF6B00] hover:bg-orange-600 text-white px-5 py-2.5 rounded-xl shadow-md shadow-orange-200 transition-all hover:shadow-orange-300 hover:-translate-y-px flex items-center gap-1.5">
            Get Started <ArrowRight size={14} />
          </Link>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden p-2 rounded-lg text-gray-600" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-5 py-4 space-y-1">
          <Link to="/" className="block px-3 py-2 text-sm font-medium text-[#FF6B00] rounded-lg bg-orange-50 transition-colors">
            Home
          </Link>
          <div className="pt-3 flex gap-3">
            <Link to="/login" className="flex-1 text-center text-sm font-semibold border border-gray-200 rounded-xl py-2.5 text-gray-700">Login</Link>
            <Link to="/register" className="flex-1 text-center text-sm font-bold bg-[#FF6B00] text-white rounded-xl py-2.5">Get Started</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

// ─── Hero Section ─────────────────────────────────────────────────────────────
const HeroSection = () => {
  return (
    <section className="relative pt-16 min-h-screen bg-white overflow-hidden">
      {/* Background visuals for right panel */}
      <div className="absolute right-0 top-16 bottom-0 w-full lg:w-3/5 bg-gray-50/80 overflow-hidden z-0">
        <DotGrid />
        {/* Glow behind truck */}
        <div className="absolute bottom-0 right-0 w-full h-3/4 bg-gradient-to-t from-white/60 via-transparent to-transparent pointer-events-none z-10" />
        <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-white to-transparent pointer-events-none z-10" />
      </div>

      <div className="relative max-w-7xl mx-auto px-5 lg:px-8 pt-14 lg:pt-20 pb-8 lg:pb-0
        grid grid-cols-1 lg:grid-cols-2 gap-0 items-center min-h-[calc(100vh-64px)]">

        {/* ── LEFT SIDE ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative z-20 py-12 lg:py-20"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-orange-200 bg-orange-50 text-xs font-semibold text-[#FF6B00] mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-[#FF6B00] animate-pulse"></span>
            Smart Logistics Operations
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-5xl lg:text-6xl xl:text-7xl font-black text-gray-900 leading-[1.05] tracking-tight mb-5"
          >
            Intelligent<br />Operations.<br />
            <span className="text-[#FF6B00]">Smarter<br />Logistics.</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="text-base lg:text-lg text-gray-500 leading-relaxed mb-8 max-w-md"
          >
            Monitor dispatch workflows, manage incidents, track fleets and deliver real-time operational 
            visibility across your manufacturing logistics network.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="flex flex-wrap gap-3 mb-10"
          >
            <motion.div whileHover={{ scale: 1.02, boxShadow: '0 8px 24px rgba(255,107,0,0.35)' }} whileTap={{ scale: 0.98 }}>
              <Link to="/login" className="flex items-center gap-2 px-7 py-3.5 bg-[#FF6B00] hover:bg-orange-600 text-white font-bold text-sm rounded-xl shadow-lg shadow-orange-200 transition-colors">
                Explore Dashboard <ArrowRight size={16} />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link to="/login" className="flex items-center gap-2 px-7 py-3.5 bg-white hover:bg-gray-50 text-gray-800 font-bold text-sm rounded-xl border border-gray-200 shadow-sm transition-colors">
                View Solutions
              </Link>
            </motion.div>
          </motion.div>

          {/* Metrics strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex items-stretch gap-0 rounded-2xl border border-gray-100 shadow-sm bg-white overflow-hidden max-w-sm"
          >
            {[
              { icon: Package, value: '148K+', label: 'Shipments Tracked' },
              { icon: Activity, value: '99.9%', label: 'System Uptime' },
              { icon: Users, value: '24/7', label: 'Operations Support' },
            ].map(({ icon: Icon, value, label }, i) => (
              <div key={i} className={`flex-1 flex items-center gap-2.5 px-4 py-3.5 ${i < 2 ? 'border-r border-gray-100' : ''}`}>
                <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center shrink-0">
                  <Icon size={15} className="text-gray-500" />
                </div>
                <div>
                  <p className="text-sm font-black text-gray-900 leading-none">{value}</p>
                  <p className="text-[10px] text-gray-400 font-medium mt-0.5 leading-tight">{label}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* ── RIGHT SIDE — Truck Visual ── */}
        <div className="relative z-20 h-[480px] lg:h-[calc(100vh-64px)] w-full flex items-center justify-center lg:justify-end lg:pr-8">

          {/* Route Lines overlayed correctly over the truck */}
          <RouteLines />

          {/* Floating Cards */}
          <div className="absolute inset-0 z-40 pointer-events-none">
            <ShipmentStatusCard />
            <DeliveryCard />
            <FleetCard />
          </div>

          {/* Truck image — large, immersive, extends out */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.97 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-[135%] lg:w-[170%] xl:w-[185%] z-20 pointer-events-none lg:-ml-12 xl:-ml-24 lg:-mt-10"
          >
            <div className="relative w-full mix-blend-darken">
              {/* Edge feathering overlays to remove harsh square corners (white disappears in darken blend mode) */}
              <div className="absolute bottom-0 left-0 right-0 h-[25%] z-30 bg-gradient-to-t from-[#f9fafb] to-transparent pointer-events-none" />
              <div className="absolute top-0 left-0 right-0 h-[25%] z-30 bg-gradient-to-b from-[#f9fafb] to-transparent pointer-events-none" />
              <div className="absolute top-0 bottom-0 left-0 w-[20%] z-30 bg-gradient-to-r from-[#f9fafb] to-transparent pointer-events-none" />
              <div className="absolute top-0 bottom-0 right-0 w-[20%] z-30 bg-gradient-to-l from-[#f9fafb] to-transparent pointer-events-none" />
              
              <img 
                src="/hero-truck.png" 
                alt="Logistics Truck" 
                className="w-full h-auto object-contain relative z-20"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// ─── Partner Logos Strip ──────────────────────────────────────────────────────
const PartnersStrip = () => {
  const partners = ['MAERSK', 'DHL', 'FedEx', 'CMA CGM', 'KUEHNE+NAGEL', 'DB SCHENKER'];
  const colors = ['#42A5F5', '#FFCC00', '#4D148C', '#003591', '#009B77', '#CC0000'];

  return (
    <div className="border-t border-gray-100 bg-white py-5">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="flex flex-wrap items-center gap-6 lg:gap-10">
          <p className="text-xs font-semibold text-gray-400 whitespace-nowrap">
            Trusted by leading<br className="hidden lg:block" /> logistics teams
          </p>
          <div className="flex flex-wrap items-center gap-6 lg:gap-10">
            {partners.map((p, i) => (
              <span
                key={i}
                className="text-sm font-black tracking-tight opacity-60 hover:opacity-90 transition-opacity cursor-default"
                style={{ color: colors[i] }}
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Why OpsPulse Section ─────────────────────────────────────────────────────
const WhyOpsPulse = () => {
  const features = [
    { icon: MapPin, title: 'Fleet Monitoring', desc: 'Real-time visibility into vehicle locations, status, fuel levels, and predictive wear-and-tear analytics.' },
    { icon: Zap, title: 'Dispatch Workflows', desc: 'Create, assign, and track complex delivery routes with automated status updates and operator syncing.' },
    { icon: Shield, title: 'Incident Intelligence', desc: 'Auto-categorize reported incidents using semantic analysis to prioritize critical logistical bottlenecks instantly.' },
    { icon: BarChart3, title: 'Analytics Dashboard', desc: 'Comprehensive reporting and KPI tracking across your entire manufacturing logistics network in real time.' },
    { icon: TrendingUp, title: 'Performance Metrics', desc: 'Monitor on-time delivery rates, driver performance, and route efficiency with actionable insights.' },
    { icon: CheckCircle2, title: 'Compliance Tracking', desc: 'Stay audit-ready with automated compliance checks, documentation, and regulatory reporting tools.' },
  ];

  return (
    <section id="features" className="py-20 bg-gray-50/60 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-orange-200 bg-orange-50 text-xs font-semibold text-[#FF6B00] mb-4">
            Why OpsPulse?
          </div>
          <h2 className="text-3xl lg:text-4xl font-black text-gray-900 mb-4">The Operating System for Logistics</h2>
          <p className="text-gray-500 text-base leading-relaxed">
            Legacy systems are clunky and fragmented. OpsPulse delivers an enterprise-grade, lightning-fast platform designed to give you complete operational superiority.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -3, boxShadow: '0 12px 32px rgba(0,0,0,0.07)' }}
              className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm transition-all"
            >
              <div className="w-11 h-11 rounded-xl bg-orange-50 flex items-center justify-center mb-5">
                <Icon size={21} className="text-[#FF6B00]" />
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-2">{title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── CTA Section ──────────────────────────────────────────────────────────────
const CTASection = () => (
  <section className="py-20 bg-white border-t border-gray-100">
    <div className="max-w-4xl mx-auto px-5 lg:px-8 text-center">
      <h2 className="text-3xl lg:text-5xl font-black text-gray-900 mb-5">
        Transform Manufacturing<br />
        <span className="text-[#FF6B00]">Operations</span>
      </h2>
      <p className="text-lg text-gray-500 mb-10 leading-relaxed">
        Stop managing logistics through scattered emails and chat apps. Step into the future of operational control.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <motion.div whileHover={{ scale: 1.02, boxShadow: '0 10px 30px rgba(255,107,0,0.3)' }} whileTap={{ scale: 0.98 }}>
          <Link to="/login" className="px-9 py-4 bg-[#FF6B00] text-white font-bold text-base rounded-xl shadow-lg shadow-orange-200 flex items-center gap-2">
            Launch Dashboard <ArrowRight size={16} />
          </Link>
        </motion.div>
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Link to="/register" className="block px-9 py-4 bg-white text-gray-800 font-bold text-base rounded-xl border border-gray-200 shadow-sm">
            Request Demo
          </Link>
        </motion.div>
      </div>
    </div>
  </section>
);

// ─── Footer ───────────────────────────────────────────────────────────────────
const Footer = () => (
  <footer className="bg-gray-50 border-t border-gray-100 pt-14 pb-8">
    <div className="max-w-7xl mx-auto px-5 lg:px-8">
      <div className="flex flex-col md:flex-row justify-between items-start gap-10 mb-12">
        <div>
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-8 h-8 rounded-lg bg-[#FF6B00] flex items-center justify-center">
              <Truck size={15} className="text-white" />
            </div>
            <span className="text-base font-black text-gray-900">OpsPulse</span>
          </div>
          <p className="text-sm text-gray-500 max-w-xs leading-relaxed">
            Intelligent manufacturing operations platform for modern logistics teams.
          </p>
        </div>
        {[
          { title: 'Platform', links: ['Dashboard', 'Fleet Monitoring', 'Dispatch', 'Analytics'] },
          { title: 'Solutions', links: ['Manufacturing', 'Supply Chain', 'Last Mile', 'Enterprise'] },
          { title: 'Company', links: ['About', 'Blog', 'Careers', 'Contact'] },
        ].map(({ title, links }) => (
          <div key={title}>
            <p className="text-xs font-bold text-gray-900 uppercase tracking-wide mb-4">{title}</p>
            <ul className="space-y-2.5">
              {links.map(link => (
                <li key={link}><a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">{link}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-gray-200 pt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-gray-400">
        <p>© 2026 OpsPulse Operations System. All rights reserved.</p>
        <div className="flex gap-5">
          <a href="#" className="hover:text-gray-700 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-gray-700 transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-gray-700 transition-colors">Security</a>
        </div>
      </div>
    </div>
  </footer>
);

// ─── Dashboard Preview Section ────────────────────────────────────────────────
const DashboardPreviewSection = () => {
  const features = [
    { icon: Activity, title: 'Real-time Analytics', desc: 'Monitor KPIs, delivery success rates, and fleet performance with live interactive charts.' },
    { icon: Truck, title: 'Active Fleet Tracking', desc: 'Track every vehicle on a live map with instant status updates and driver communications.' },
    { icon: Zap, title: 'Smart Dispatching', desc: 'Automate route planning and assign tasks instantly based on driver proximity and load capacity.' }
  ];

  return (
    <section className="py-24 bg-white overflow-hidden border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-orange-200 bg-orange-50 text-xs font-semibold text-[#FF6B00] mb-6">
              Command Center
            </div>
            <h2 className="text-3xl lg:text-5xl font-black text-gray-900 mb-6 leading-tight">
              Everything you need in <span className="text-[#FF6B00]">one dashboard.</span>
            </h2>
            <p className="text-lg text-gray-500 mb-10 leading-relaxed">
              We analyzed the core workflows of modern logistics teams—from dispatching to analytics—and built a unified interface that eliminates tool fatigue.
            </p>
            
            <div className="space-y-8">
              {features.map((feature, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center shrink-0">
                    <feature.icon size={22} className="text-[#FF6B00]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-base text-gray-500 leading-relaxed">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-10">
              <Link to="/login" className="inline-flex items-center gap-2 font-bold text-[#FF6B00] hover:text-orange-600 transition-colors">
                Explore the Dashboard <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, x: 30, rotateY: 10 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{ perspective: '1000px' }}
            className="relative"
          >
            {/* Decorative background blur */}
            <div className="absolute inset-0 bg-gradient-to-tr from-orange-100 to-blue-50 rounded-3xl blur-3xl opacity-50 transform scale-105" />
            
            <motion.div 
              animate={{ y: [-10, 10, -10] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="relative rounded-2xl overflow-hidden border border-gray-200 shadow-[0_20px_50px_rgba(0,0,0,0.1)] bg-white"
            >
              {/* Fake browser bar */}
              <div className="h-8 bg-gray-50 border-b border-gray-200 flex items-center px-4 gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
              </div>
              <img 
                src="/dashboard-mockup.png" 
                alt="OpsPulse Dashboard Preview" 
                className="w-full h-auto object-cover"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// ─── Real World Use Cases ─────────────────────────────────────────────────────
const UseCasesSection = () => {
  const cases = [
    { title: 'Manufacturing Plants', desc: 'Synchronize inbound raw materials with assembly line schedules to minimize warehouse holding times.' },
    { title: '3PL Providers', desc: 'Provide clients with white-labeled, real-time tracking portals while managing a diverse multi-client fleet.' },
    { title: 'Last-Mile Delivery', desc: 'Optimize urban routing dynamically based on live traffic, reducing fuel consumption and missing delivery windows.' }
  ];

  return (
    <section className="py-24 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl lg:text-4xl font-black text-gray-900 mb-5">Built for Real-World Scenarios</h2>
          <p className="text-lg text-gray-500">OpsPulse adapts to the unique logistical challenges of your industry.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cases.map((c, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="p-8 rounded-3xl bg-gray-50 border border-gray-100 hover:border-orange-200 transition-colors group"
            >
              <div className="w-12 h-12 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="text-[#FF6B00] font-bold">0{i + 1}</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{c.title}</h3>
              <p className="text-gray-500 leading-relaxed">{c.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── Main Landing Page ────────────────────────────────────────────────────────
const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <PartnersStrip />
      <DashboardPreviewSection />
      <WhyOpsPulse />
      <UseCasesSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default LandingPage;