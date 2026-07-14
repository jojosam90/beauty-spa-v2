import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import logoUrl from "../assets/logo.png";
import promoBannerUrl from "../assets/promo-banner.jpg";
import {
  Mail,
  Calendar,
  Clock,
  Sparkles,
  ChevronRight,
  Languages,
  Menu,
  X,
  Star,
  ExternalLink,
  MapPin,
  Phone,
  ArrowUp
} from "lucide-react";

import { Language } from "./types";
import { translations, reasonsData, treatmentsData, testimonialsData } from "./data";
import { getApprovedReviews, getDeletedStaticNames, getReviewText, migrateLegacyReviews } from "./reviewStore";
import { verifyAdminPin, getLockoutRemainingMs } from "./adminAuth";
import BookingModal from "./components/BookingModal";
import TreatmentDetailModal from "./components/TreatmentDetailModal";
import ReviewModal from "./components/ReviewModal";
import AdminReviewsModal from "./components/AdminReviewsModal";
import LocationMap from "./components/LocationMap";

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z" />
      <path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z" />
      <path fill="#FBBC05" d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24s.85 6.91 2.34 9.88l7.35-5.7z" />
      <path fill="#EA4335" d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z" />
    </svg>
  );
}

function WhatsAppIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.39 1.26 4.81L2 22l5.41-1.42a9.87 9.87 0 0 0 4.63 1.18h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm5.8 14.14c-.24.68-1.4 1.3-1.93 1.37-.5.07-1.11.1-1.79-.11a16.3 16.3 0 0 1-1.62-.6c-2.85-1.23-4.7-4.11-4.85-4.3-.14-.2-1.16-1.55-1.16-2.95s.72-2.09.98-2.38c.26-.28.56-.35.75-.35h.54c.17 0 .4-.06.63.48.24.56.8 1.95.87 2.09.07.14.12.31.02.5-.1.19-.15.31-.3.48-.14.17-.3.38-.43.51-.14.14-.29.29-.13.57.17.28.75 1.23 1.6 1.99 1.1.98 2.03 1.29 2.32 1.43.29.14.46.12.63-.07.17-.19.72-.83.92-1.12.19-.28.38-.24.63-.14.26.1 1.64.77 1.92.91.29.14.48.21.55.33.07.12.07.68-.17 1.36z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M13.5 21v-7.5h2.5l.5-3h-3V8.5c0-.87.24-1.46 1.5-1.46h1.6V4.36C15.8 4.25 14.9 4.16 13.86 4.16c-2.24 0-3.77 1.37-3.77 3.87V10.5H7.6v3h2.5V21h3.4z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16.5 2h-3v13.2a2.8 2.8 0 1 1-2-2.68V9.4a6 6 0 1 0 5 5.92V8.3a7.5 7.5 0 0 0 4.5 1.5V6.6a4.5 4.5 0 0 1-4.5-4.5V2z" />
    </svg>
  );
}

export default function App() {
  const [language, setLanguage] = useState<Language>("en");
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [selectedTreatmentId, setSelectedTreatmentId] = useState<string>("signature");
  const [visibleTestimonials, setVisibleTestimonials] = useState<
    { name: string; quote: string; rating: number; date: string }[]
  >([]);

  const refreshTestimonials = (lang: Language) => {
    const deleted = getDeletedStaticNames();
    const approved = getApprovedReviews().map((r) => ({
      name: r.name,
      quote: getReviewText(r, lang),
      rating: r.rating,
      date: r.date,
    }));
    const staticOnes = testimonialsData[lang].filter((t) => !deleted.includes(t.name));
    setVisibleTestimonials([...approved, ...staticOnes]);
  };

  useEffect(() => {
    refreshTestimonials(language);
  }, [language]);

  // One-time backfill for reviews saved before auto-translation existed
  useEffect(() => {
    migrateLegacyReviews().then((changed) => {
      if (changed) refreshTestimonials(language);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // About Treatment video cards (Streamable embeds)
  const treatmentVideoIds = ["w8e162", "qbcn1e", "nwces1"];

  // Hidden admin PIN trigger: 5 clicks anywhere in the footer within 2s
  const footerClickCount = useRef(0);
  const footerClickTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleFooterClick = async () => {
    footerClickCount.current += 1;
    if (footerClickTimer.current) clearTimeout(footerClickTimer.current);

    if (footerClickCount.current >= 5) {
      footerClickCount.current = 0;

      const lockoutMs = getLockoutRemainingMs();
      if (lockoutMs > 0) {
        window.alert(`Too many attempts. Try again in ${Math.ceil(lockoutMs / 60000)} minute(s).`);
        return;
      }

      const pin = window.prompt("Admin PIN:");
      if (pin === null) return;

      const ok = await verifyAdminPin(pin);
      if (ok) {
        setIsAdminOpen(true);
      } else {
        const remaining = getLockoutRemainingMs();
        window.alert(remaining > 0 ? "Too many incorrect attempts. Locked out temporarily." : "Incorrect PIN");
      }
    } else {
      footerClickTimer.current = setTimeout(() => {
        footerClickCount.current = 0;
      }, 2000);
    }
  };

  // Navigation states
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const t = translations[language];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "zh" : "en"));
  };

  const handleOpenDetail = (id: string) => {
    setSelectedTreatmentId(id);
    setIsDetailOpen(true);
  };

  const handleOpenBooking = (id?: string) => {
    if (id) {
      setSelectedTreatmentId(id);
    }
    setIsBookingOpen(true);
  };

  const handleBookFromDetail = (id: string) => {
    setIsDetailOpen(false);
    setSelectedTreatmentId(id);
    setIsBookingOpen(true);
  };


  return (
    <div className="min-h-screen bg-[#f8f9fa] text-gray-900 font-sans selection:bg-heritage-gold selection:text-white">
      {/* Sticky Header / Navbar */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 py-5 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-md"
            : "bg-[#f8f9fa]"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <img src={logoUrl} alt="EB Centre logo" className="w-10 h-10 object-contain" />
            <span className="font-sans text-3xl tracking-tight font-semibold transition-colors">
              <span className="text-red-600">EB</span>
              <span className="text-black group-hover:text-clinical-teal"> CENTRE</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#wellness" className="text-base uppercase tracking-widest font-medium text-gray-600 hover:text-black transition-colors">
              {t.navWellness}
            </a>
            <a href="#services" className="text-base uppercase tracking-widest font-medium text-gray-600 hover:text-black transition-colors">
              {t.navServices}
            </a>
            <a href="#about" className="text-base uppercase tracking-widest font-medium text-gray-600 hover:text-black transition-colors">
              {t.navAbout}
            </a>
            <a href="#reviews" className="text-base uppercase tracking-widest font-medium text-gray-600 hover:text-black transition-colors">
              {language === "zh" ? "客户口碑" : "Reviews"}
            </a>
          </nav>

          {/* Actions & Language Selector */}
          <div className="hidden md:flex items-center gap-4">
            {/* Language Toggle Button */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded text-base font-semibold text-gray-700 hover:border-black transition-all cursor-pointer"
            >
              <Languages size={13} className="text-clinical-teal" />
              <span>{language === "en" ? "中文" : "EN"}</span>
            </button>

            {/* CTA Book Button */}
            <button
              onClick={() => handleOpenBooking()}
              className="btn-shine animate-heartbeat bg-[#1F1110] text-white px-5 py-2.5 text-base font-semibold uppercase tracking-widest hover:bg-[#C5A059] rounded transition-colors"
            >
              {t.navBookNow}
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={toggleLanguage}
              className="px-2.5 py-1 border border-gray-200 rounded text-base text-gray-700 hover:border-black transition-all mr-2"
            >
              {language === "en" ? "中文" : "EN"}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-black hover:bg-gray-100 rounded-md"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-gray-100 overflow-hidden absolute w-full left-0 z-30 shadow-lg"
          >
            <div className="p-6 space-y-4 flex flex-col">
              <a
                href="#wellness"
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-semibold tracking-wide text-gray-700 hover:text-[#C5A059]"
              >
                {t.navWellness}
              </a>
              <a
                href="#services"
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-semibold tracking-wide text-gray-700 hover:text-[#C5A059]"
              >
                {t.navServices}
              </a>
              <a
                href="#about"
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-semibold tracking-wide text-gray-700 hover:text-[#C5A059]"
              >
                {t.navAbout}
              </a>
              <a
                href="#reviews"
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-semibold tracking-wide text-gray-700 hover:text-[#C5A059]"
              >
                {language === "zh" ? "客户口碑" : "Reviews"}
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleOpenBooking();
                }}
                className="w-full bg-[#1F1110] text-white py-3 text-base uppercase tracking-widest font-semibold rounded"
              >
                {t.navBookNow}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-[#1F1110] to-[#2b1918] text-white pt-20 lg:pt-32 pb-48 lg:pb-56 overflow-hidden border-b border-[#C5A059]/10">
        {/* Subtle Luxury Pattern / Glow Grid */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C5A059_1px,transparent_1px)] [background-size:16px_16px]" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero Left: Text Column */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-3">
              <span className="text-base sm:text-[32px] tracking-[0.15em] sm:tracking-[0.4em] font-semibold text-[#C5A059] uppercase block animate-pulse">
                {t.heroPreTitle}
              </span>
              <h1 className={`font-serif tracking-wide leading-tight text-white ${
                language === "en" ? "text-4xl sm:text-5xl lg:text-6xl" : "text-6xl sm:text-7xl lg:text-8xl"
              }`}>
                {t.heroTitle_1}
                <span className={`italic text-heritage-gold font-light block mt-1 ${
                  language === "en" ? "text-2xl sm:text-3xl lg:text-4xl" : "text-4xl sm:text-5xl lg:text-6xl"
                }`}>
                  {t.heroTitle_italic}
                </span>
              </h1>
            </div>

            <p className="text-lg sm:text-xl text-gray-300 font-light leading-relaxed max-w-xl">
              {t.heroSubtitle}
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
              <button
                onClick={() => handleOpenBooking()}
                className="btn-shine animate-heartbeat bg-[#C5A059] hover:bg-[#b08c48] text-white px-8 py-4 text-base font-bold uppercase tracking-widest rounded-md transition-all shadow-lg shadow-black/30 hover:-translate-y-0.5 active:translate-y-0 text-center"
              >
                {t.heroBtnBook}
              </button>
              <a
                href="#services"
                className="border border-white/20 hover:border-heritage-gold hover:text-heritage-gold px-8 py-4 text-base font-bold uppercase tracking-widest rounded-md transition-all text-center flex items-center justify-center gap-2"
              >
                <span>{t.heroBtnRituals}</span>
                <ChevronRight size={14} />
              </a>
            </div>

          </div>

          {/* Hero Right: New Guest Exclusive Offer Promo */}
          <div className="lg:col-span-6 relative">
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={promoBannerUrl}
                alt="New guest exclusive offer — 60-minute experience, $28"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Back Glow Effect */}
            <div className="absolute inset-4 -z-10 bg-heritage-gold/20 blur-3xl rounded-full" />
          </div>
        </div>
      </section>

      {/* Bento Grid: The 5 Reasons for Scalp Wellness */}
      <section id="wellness" className="py-20 bg-heritage-gold/10 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className={`text-center max-w-3xl mx-auto space-y-4 pt-6 ${language === "en" ? "mb-8" : "mb-16"}`}>
            <h2 className="font-serif text-5xl sm:text-6xl text-black tracking-wide">
              {t.reasonsTitle}
            </h2>
            <p className="text-base sm:text-lg text-gray-500 leading-relaxed font-light">
              {t.reasonsSubtitle}
            </p>
          </div>

          {/* Interactive Bento Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-6 gap-x-6 gap-y-10">
            {reasonsData[language].map((reason) => {
              // Row 2 has only 2 cards; offset card 4 so the pair sits centered under the 3-up row above.
              const cardSpan = reason.id === 4 ? "md:col-span-2 md:col-start-2" : "md:col-span-2";

              return (
                <motion.div
                  key={reason.id}
                  className={`p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group relative overflow-hidden bg-white border border-gray-100 hover:bg-[#C5A059] hover:border-[#C5A059] ${cardSpan}`}
                  whileHover={{ y: -4 }}
                >
                  <div className="space-y-4">
                    <span className="text-[20px] tracking-widest font-mono uppercase font-bold block text-clinical-teal group-hover:text-white">
                      {language === "zh" ? "理由" : "Reason 0"}{reason.id}
                    </span>

                    <h3 className="font-serif text-3xl tracking-wide font-medium group-hover:text-white">
                      {reason.title}
                    </h3>
                    <p className="text-base leading-relaxed font-light text-gray-600 group-hover:text-white/90">
                      {reason.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Section (Curated Wellness Rituals) */}
      <section id="services" className="py-20 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-4 gap-4">
            <div className={`space-y-4 ${language === "zh" ? "pt-6" : ""}`}>
              <h2 className="font-serif text-5xl sm:text-6xl text-black tracking-wide">
                {t.ritualsTitle}
              </h2>
              <p className="text-base sm:text-lg text-gray-500 leading-relaxed font-light lg:whitespace-nowrap">
                {t.ritualsSubtitle}
              </p>
            </div>
          </div>

          {/* Treatment Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {treatmentsData[language].map((ritual) => (
              <div
                key={ritual.id}
                className="bg-[#f8f9fa] border border-gray-200/60 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-500 flex flex-col justify-between group"
              >
                {/* Visual Header Cover */}
                <div className="relative h-64 overflow-hidden bg-black shrink-0">
                  <img
                    src={ritual.image}
                    alt={ritual.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                  />
                  {ritual.tag && (
                    <span className="absolute top-4 left-4 bg-[#1F1110] text-heritage-gold text-[20px] font-bold tracking-[0.25em] px-3 py-1 uppercase rounded">
                      {ritual.tag}
                    </span>
                  )}
                  <span className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md text-black text-base font-semibold px-3 py-1.5 rounded shadow-sm">
                    {ritual.duration}
                  </span>
                </div>

                {/* Body Details */}
                <div className="p-6 md:p-8 flex-1 flex flex-col justify-between space-y-6">
                  <div className="space-y-3">
                    <div className="flex justify-between items-baseline gap-2">
                      <h3 className="font-serif text-xl tracking-wide font-semibold text-black">
                        {ritual.title}
                      </h3>
                      <span className="text-lg font-semibold text-heritage-gold font-serif whitespace-nowrap">
                        {ritual.price}
                      </span>
                    </div>
                    <p className="text-[14px] uppercase tracking-widest text-clinical-teal font-medium">
                      {ritual.subtitle}
                    </p>
                    <p className="text-base text-gray-500 leading-relaxed font-light">
                      {ritual.description}
                    </p>
                  </div>

                  {/* Actions row */}
                  <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-100">
                    <button
                      onClick={() => handleOpenDetail(ritual.id)}
                      className="border border-gray-300 text-gray-700 hover:text-white hover:bg-heritage-gold hover:border-heritage-gold text-base font-semibold py-3 px-4 uppercase tracking-widest text-center rounded transition-all cursor-pointer"
                    >
                      {language === "zh" ? "查看详情" : "Discover"}
                    </button>
                    <button
                      onClick={() => handleOpenBooking(ritual.id)}
                      className="bg-[#1F1110] text-white hover:bg-clinical-teal text-base font-semibold py-3 px-4 uppercase tracking-widest text-center rounded transition-all cursor-pointer"
                    >
                      {t.navBookNow}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Sanctuary Section */}
      <section id="about" className="pt-28 pb-20 bg-heritage-gold/10 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 space-y-10">
          <div className="space-y-4">
            <h2 className="font-serif text-4xl sm:text-5xl text-black tracking-wide">
              {t.aboutTreatmentTitle}
            </h2>
            <p className="text-base sm:text-lg text-gray-500 leading-relaxed font-light">
              {t.aboutTreatmentSubtitle}
            </p>
          </div>

          {/* Treatment Video Showcase */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {treatmentVideoIds.map((videoId, idx) => (
              <div key={videoId} className="relative rounded-2xl overflow-hidden shadow-lg bg-black aspect-[9/16]">
                <iframe
                  src={`https://streamable.com/e/${videoId}`}
                  className="w-full h-full"
                  frameBorder="0"
                  allow="fullscreen"
                  allowFullScreen
                  title={`Treatment video ${idx + 1}`}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Wall */}
      <section id="reviews" className="py-20 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-16 pt-12">
            <h2 className="font-serif text-5xl sm:text-6xl text-black tracking-wide">
              {language === "zh" ? "客户真实口碑" : "Verifiable Client Stories"}
            </h2>
            <p className="text-base sm:text-lg text-gray-500 leading-relaxed font-light">
              {language === "zh"
                ? "来自新加坡高净值客群的真实反馈。体验极致宁静与头皮改善。"
                : "Discover how our clinical hair-remedies and sensory rituals empower daily focus."}
            </p>
          </div>

          {/* Testimonial Carousel: auto-scrolls right-to-left, looping seamlessly on a doubled list */}
          <div className="overflow-hidden -mx-6 px-6 [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
            <div className="flex gap-6 w-max animate-marquee hover:[animation-play-state:paused]">
              {[...visibleTestimonials, ...visibleTestimonials].map((testimonial, idx) => (
                <div
                  key={`${testimonial.name}-${idx}`}
                  className="shrink-0 w-[320px] sm:w-[380px] h-[380px] bg-white border border-gray-800 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow flex flex-col"
                >
                  <div className="flex items-center justify-between shrink-0">
                    {/* Star Rating */}
                    <div className="flex items-center gap-1 text-[#C5A059]">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} size={14} fill="#C5A059" />
                      ))}
                    </div>
                    <span className="flex items-center gap-1.5 bg-gray-50 border border-gray-100 rounded-full px-3 py-1">
                      <GoogleIcon />
                      <span className="text-sm font-medium text-gray-700">Google</span>
                    </span>
                  </div>

                  {/* Quote: scrolls internally if it's too long for the card */}
                  <p className="text-base text-gray-600 italic leading-relaxed font-light flex-1 min-h-0 overflow-y-auto my-4 pr-1">
                    "{testimonial.quote}"
                  </p>

                  <div className="flex items-center justify-between gap-3 pt-6 border-t border-gray-800 shrink-0">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-clinical-teal/5 flex items-center justify-center font-bold text-base text-clinical-teal uppercase shrink-0">
                        {testimonial.name.charAt(0)}
                      </div>
                      <h4 className="text-base font-bold text-black">{testimonial.name}</h4>
                    </div>
                    <p className="text-[10px] text-gray-400 shrink-0">{testimonial.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-10">
            <button
              onClick={() => setIsReviewOpen(true)}
              className="btn-shine animate-heartbeat inline-flex items-center gap-2 bg-heritage-gold text-white px-6 py-3 rounded-full text-base font-semibold uppercase tracking-widest hover:bg-[#b08c48] transition-colors"
            >
              <Star size={14} fill="white" />
              {t.testimonialsWriteReview}
            </button>
          </div>
        </div>
      </section>

      {/* Visit & Consultation / Location */}
      <section id="contact" className="py-20 bg-gradient-to-b from-[#1F1110] to-[#271514] text-white overflow-hidden relative">
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#C5A059_1px,transparent_1px)] [background-size:24px_24px]" />

        <div className="max-w-7xl mx-auto px-6 relative z-10 space-y-12">
          <div className="text-center space-y-4 pt-6">
            <h2 className="font-serif text-5xl sm:text-6xl text-white tracking-wide">
              {t.contactTitle}
            </h2>
            <p className="text-xl sm:text-2xl text-gray-300 italic font-serif">
              {t.contactSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            {/* Contact Details */}
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-heritage-gold shrink-0">
                  <MapPin size={18} />
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-base font-bold text-white">{t.contactAddressLabel}</h4>
                  <p className="text-base text-gray-300">{t.contactAddressLine1}</p>
                  <p className="text-base text-gray-300">{t.contactAddressLine2}</p>
                  <p className="text-base text-gray-400">{t.contactAddressLine3}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-heritage-gold shrink-0">
                  <Phone size={18} />
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-base font-bold text-white">{t.contactCallLabel}</h4>
                  <p className="text-base text-gray-300">+65 8941 0482</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-500 shrink-0">
                  <WhatsAppIcon />
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-base font-bold text-white">WhatsApp</h4>
                  <p className="text-base text-gray-300">+65 8941 0482</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-heritage-gold shrink-0">
                  <Clock size={18} />
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-base font-bold text-white">{t.contactHoursLabel}</h4>
                  <p className="text-base text-gray-300">{t.contactHoursValue}</p>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-3 pt-2">
                <a href="#" aria-label="Google" className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:scale-110 transition-transform">
                  <GoogleIcon />
                </a>
                <a href="#" aria-label="Facebook" className="w-10 h-10 rounded-full bg-[#1877F2] text-white flex items-center justify-center hover:scale-110 transition-transform">
                  <FacebookIcon />
                </a>
                <a href="#" aria-label="Instagram" className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white flex items-center justify-center hover:scale-110 transition-transform">
                  <InstagramIcon />
                </a>
                <a href="#" aria-label="TikTok" className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center hover:scale-110 transition-transform">
                  <TikTokIcon />
                </a>
              </div>
            </div>

            {/* Map */}
            <div className="relative h-[420px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <LocationMap
                lat={1.3030749}
                lng={103.8505429}
                label="EB Centre"
                address={`${t.contactAddressLine1}, ${t.contactAddressLine2}`}
              />
              <a
                href="https://www.google.com/maps/place/EB+Centre+-+Beauty+%26+Facial/@1.3030749,103.8505429,17z/data=!4m15!1m8!3m7!1s0x31da19bc00195555:0x2d4671eeb7021d17!2sBlk+8+Selegie+Rd,+%2301-06,+Singapore+180008!3b1!8m2!3d1.3030749!4d103.8505429!16s%2Fg%2F11zcsjwx00!3m5!1s0x31da19821de2d803:0x3bb570a6f2113752!8m2!3d1.3030749!4d103.8505429!16s%2Fg%2F11zg3_6tdk?entry=ttu&g_ep=EgoyMDI2MDcwOC4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-4 right-4 z-[1000] bg-white text-black text-base font-semibold px-4 py-2 rounded-full shadow-lg flex items-center gap-1.5 hover:bg-gray-100 transition-colors"
              >
                {t.contactOpenInMaps}
                <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer onClick={handleFooterClick} className="bg-[#150a0a] text-gray-400 py-16 border-t border-[#C5A059]/10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-base">

          {/* Col 1: Introduction */}
          <div className="space-y-4">
            <a href="#" className="inline-flex items-center gap-2">
              <img src={logoUrl} alt="EB Centre logo" className="w-8 h-8 object-contain" />
              <span className="font-sans text-2xl tracking-tight font-semibold">
                <span className="text-red-600">EB</span>
                <span className="text-white"> CENTRE</span>
              </span>
            </a>
            <p className="text-gray-400 leading-relaxed font-light text-lg">
              {t.footerIntro}
            </p>
          </div>

          {/* Col 2: Treatments */}
          <div className="space-y-4">
            <h4 className="text-white uppercase tracking-widest font-semibold font-serif text-lg">
              {t.footerCategoryTitle}
            </h4>
            <ul className="space-y-2.5 font-light text-lg">
              {treatmentsData[language].map((treatment) => (
                <li key={treatment.id}>
                  <a href="#services" className="hover:text-[#C5A059] transition-colors">
                    {treatment.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Contact */}
          <div className="space-y-4">
            <h4 className="text-white uppercase tracking-widest font-semibold font-serif text-lg">
              {t.footerContactTitle}
            </h4>
            <div className="space-y-2.5 font-light text-lg">
              <p className="text-gray-300">
                {t.contactAddressLine1}, {t.contactAddressLine2} {t.contactAddressLine3}
              </p>
              <p className="text-gray-300">+65 8941 0482</p>
              <p className="text-gray-300">{t.contactHoursValue}</p>
            </div>
          </div>

        </div>

        {/* Lower footer */}
        <div className="max-w-7xl mx-auto px-6 pt-12 mt-12 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-gray-500 text-sm tracking-wider font-roboto">
          <p>{t.footerCopyright}</p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full px-4 py-2 transition-colors"
          >
            <ArrowUp size={12} />
            {t.footerBackToTop}
          </button>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <div className="fixed bottom-6 right-6 z-40 w-14 h-14">
        <span className="absolute inset-0 rounded-full bg-green-500 animate-whatsapp-aura" />
        <a
          href={`https://wa.me/6589410482?text=${encodeURIComponent("Hi Linda, I'd like to make an appointment. What times are available today? 你好Linda，我想预约, 请问今天几点可以？")}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp"
          className="relative w-14 h-14 rounded-full bg-green-500 text-white flex items-center justify-center shadow-xl hover:scale-110 transition-transform animate-whatsapp-beat"
        >
          <WhatsAppIcon size={28} />
        </a>
      </div>

      {/* Booking Wizard Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        language={language}
        initialTreatmentId={selectedTreatmentId}
      />

      {/* Treatment Protocol Detail Modal */}
      <TreatmentDetailModal
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        language={language}
        treatmentId={selectedTreatmentId}
        onBookTreatment={handleBookFromDetail}
      />

      {/* Write a Review Modal */}
      <ReviewModal
        isOpen={isReviewOpen}
        onClose={() => setIsReviewOpen(false)}
        language={language}
      />

      {/* Admin: Manage Reviews Modal */}
      <AdminReviewsModal
        isOpen={isAdminOpen}
        onClose={() => {
          setIsAdminOpen(false);
          refreshTestimonials(language);
        }}
        language={language}
      />
    </div>
  );
}
