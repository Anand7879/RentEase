// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import p1 from "../../images/p1.jpg";
// import p2 from "../../images/p2.jpg";
// import p3 from "../../images/p3.jpg";
// import p4 from "../../images/p4.jpg";
// import AllPropertiesCards from "../user/AllPropertiesCards";

// const images = [p1, p2, p3, p4];

// const Home = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentIndex((prev) => (prev + 1) % images.length);
//     }, 4000);
//     return () => clearInterval(interval);
//   }, []);

//   const goToSlide = (index) => {
//     setCurrentIndex(index);
//   };

//   return (
//     <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-800 via-gray-900 to-black">
//       {/* Navbar */}
//       <nav className="fixed top-0 left-0 w-full z-50 bg-black/30 backdrop-blur-lg shadow-md py-4 px-8 flex justify-between items-center">
//         <h2 className="text-3xl font-extrabold text-indigo-400 tracking-wide">
//           HouseEase
//         </h2>
//         <div className="space-x-8 text-lg">
//           <Link to="/" className="text-gray-200 hover:text-indigo-400 transition">
//             Home
//           </Link>
//           <Link to="/login" className="text-gray-200 hover:text-indigo-400 transition">
//             Login
//           </Link>
//           <Link
//             to="/register"
//             className="text-black bg-indigo-400 px-4 py-2 rounded-lg shadow hover:bg-indigo-500 transition"
//           >
//             Register
//           </Link>
//         </div>
//       </nav>

//       {/* Hero Section */}
//       <div className="relative w-full h-[70vh] mt-16 overflow-hidden">
//         {images.map((img, idx) => (
//           <div
//             key={idx}
//             className={`absolute w-full h-full transition-opacity duration-1000 ${currentIndex === idx ? "opacity-100" : "opacity-0"
//               }`}
//           >
//             <img src={img} alt={`Slide ${idx}`} className="w-full h-full object-cover" />
//             <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
//           </div>
//         ))}

//         {/* Center Text */}
//         <div className="absolute bottom-20 w-full text-center text-white px-4">
//           <h1 className="text-4xl md:text-5xl font-extrabold drop-shadow-lg mb-4 animate-fadeIn">
//             Find Your Dream Rental Property
//           </h1>
//           <p className="text-lg md:text-xl font-light drop-shadow-md text-gray-200">
//             Comfort, Convenience & Class — All in One Place
//           </p>
//         </div>

//         {/* Dots */}
//         <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
//           {images.map((_, idx) => (
//             <button
//               key={idx}
//               onClick={() => goToSlide(idx)}
//               className={`w-4 h-4 rounded-full transition-all duration-300 ${currentIndex === idx
//                   ? "bg-indigo-400 scale-125 shadow-lg"
//                   : "bg-gray-400 hover:bg-indigo-300"
//                 }`}
//             ></button>
//           ))}
//         </div>
//       </div>

//       {/* Properties Section */}
//       <div className="max-w-7xl mx-auto w-full py-20 px-6">
//         <div className="text-center mb-16">
//           <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
//             Explore Our Premium Properties
//           </h1>
//           <p className="text-gray-300 font-medium text-lg max-w-2xl mx-auto">
//             Looking to post your property?
//             <Link
//               to="/register"
//               className="ml-2 px-4 py-2 border border-indigo-400 text-indigo-400 rounded-lg hover:bg-indigo-500 hover:text-white transition duration-300"
//             >
//               Register as Owner
//             </Link>
//           </p>
//         </div>

//         {/* Property Cards */}
//         <div className="mt-12">
//           <AllPropertiesCards />
//         </div>
//       </div>
//     </div>

//   );
// };

// export default Home;

import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import p1 from "../../images/p1.jpg";
import p2 from "../../images/p2.jpg";
import p3 from "../../images/p3.jpg";
import p4 from "../../images/p4.jpg";
import AllPropertiesCards from "../user/AllPropertiesCards";

const images = [p1, p2, p3, p4];

const slideContent = [
  { label: "Luxury Living", title: "Find Your Dream", highlight: "Rental Property", sub: "Premium homes curated just for you" },
  { label: "Urban Escape", title: "Modern Spaces,", highlight: "Timeless Comfort", sub: "Discover properties that define lifestyle" },
  { label: "Premium Stays", title: "Comfort Meets", highlight: "Convenience", sub: "Your next home is just a click away" },
  { label: "Handpicked Homes", title: "Class & Style,", highlight: "All In One Place", sub: "Explore exclusive rental listings today" },
];

const features = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    ),
    title: "Premium Properties",
    desc: "Every listing is verified and curated for quality, comfort, and authenticity.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    title: "Safe & Secure",
    desc: "End-to-end encrypted communication and verified owner profiles you can trust.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
      </svg>
    ),
    title: "Instant Listings",
    desc: "Browse and connect with property owners instantly — no waiting, no delays.",
  },
];

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const heroRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
        setIsTransitioning(false);
      }, 600);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const goToSlide = (index) => {
    if (index === currentIndex) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(index);
      setIsTransitioning(false);
    }, 400);
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        background: "#080c14",
        fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Syne:wght@600;700;800&display=swap');

        * { box-sizing: border-box; }

        .font-display { font-family: 'Syne', sans-serif; }

        .nav-blur {
          background: rgba(8, 12, 20, 0.72);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255,255,255,0.04);
          transition: all 0.4s ease;
        }
        .nav-scrolled {
          background: rgba(8, 12, 20, 0.95);
          box-shadow: 0 2px 40px rgba(0,0,0,0.5);
        }

        .hero-img {
          transition: opacity 0.7s cubic-bezier(0.4,0,0.2,1), transform 0.7s cubic-bezier(0.4,0,0.2,1);
        }
        .hero-img-active { opacity: 1; transform: scale(1.04); }
        .hero-img-inactive { opacity: 0; transform: scale(1); }
        .hero-transition .hero-img-active { opacity: 0; transform: scale(1.08); }

        .slide-text {
          transition: all 0.6s cubic-bezier(0.4,0,0.2,1);
        }
        .slide-text-visible { opacity: 1; transform: translateY(0); }
        .slide-text-hidden { opacity: 0; transform: translateY(28px); }

        .dot-btn {
          transition: all 0.3s ease;
          border: none;
          cursor: pointer;
        }
        .dot-active { background: #6366f1; width: 28px; border-radius: 8px; }
        .dot-inactive { background: rgba(255,255,255,0.25); width: 10px; border-radius: 50%; }
        .dot-inactive:hover { background: rgba(255,255,255,0.5); }

        .accent-line {
          display: inline-block;
          position: relative;
        }
        .accent-line::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, #6366f1, #a78bfa);
          border-radius: 2px;
        }

        .stat-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        .stat-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, #6366f1, transparent);
          opacity: 0;
          transition: opacity 0.3s;
        }
        .stat-card:hover { background: rgba(99,102,241,0.08); border-color: rgba(99,102,241,0.3); transform: translateY(-3px); }
        .stat-card:hover::before { opacity: 1; }

        .feature-card {
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 20px;
          transition: all 0.35s ease;
          position: relative;
          overflow: hidden;
        }
        .feature-card::after {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at 50% 0%, rgba(99,102,241,0.12), transparent 70%);
          opacity: 0;
          transition: opacity 0.35s;
        }
        .feature-card:hover { border-color: rgba(99,102,241,0.4); transform: translateY(-6px); box-shadow: 0 20px 60px rgba(99,102,241,0.12); }
        .feature-card:hover::after { opacity: 1; }

        .icon-wrap {
          width: 56px; height: 56px;
          background: rgba(99,102,241,0.12);
          border: 1px solid rgba(99,102,241,0.25);
          border-radius: 16px;
          display: flex; align-items: center; justify-content: center;
          color: #818cf8;
          transition: all 0.3s;
        }
        .feature-card:hover .icon-wrap {
          background: rgba(99,102,241,0.22);
          border-color: rgba(99,102,241,0.5);
          transform: scale(1.08);
        }

        .btn-primary {
          background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
          color: white;
          border: none;
          border-radius: 12px;
          padding: 14px 32px;
          font-weight: 600;
          font-size: 17px;
          cursor: pointer;
          transition: all 0.3s;
          box-shadow: 0 4px 24px rgba(99,102,241,0.35);
          letter-spacing: 0.01em;
        }
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(99,102,241,0.5);
          background: linear-gradient(135deg, #818cf8 0%, #6366f1 100%);
        }

        .btn-ghost {
          background: rgba(255,255,255,0.05);
          color: rgba(255,255,255,0.85);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 12px;
          padding: 14px 32px;
          font-weight: 500;
          font-size: 17px;
          cursor: pointer;
          transition: all 0.3s;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
        }
        .btn-ghost:hover { background: rgba(255,255,255,0.1); border-color: rgba(255,255,255,0.25); transform: translateY(-2px); }

        .label-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(99,102,241,0.12);
          border: 1px solid rgba(99,102,241,0.3);
          color: #a5b4fc;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 6px 14px;
          border-radius: 100px;
          margin-bottom: 20px;
        }
        .label-dot {
          width: 6px; height: 6px;
          background: #6366f1;
          border-radius: 50%;
          animation: pulse-dot 2s infinite;
        }
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.7); }
        }

        .section-divider {
          width: 40px; height: 3px;
          background: linear-gradient(90deg, #6366f1, #a78bfa);
          border-radius: 2px;
          margin: 0 auto 12px;
        }

        .mesh-bg {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 80% 50% at 20% 50%, rgba(99,102,241,0.07) 0%, transparent 60%),
            radial-gradient(ellipse 60% 40% at 80% 60%, rgba(139,92,246,0.05) 0%, transparent 60%);
          pointer-events: none;
        }

        .nav-link {
          color: rgba(255,255,255,0.65);
          font-size: 17px;
          font-weight: 500;
          letter-spacing: 0.01em;
          text-decoration: none;
          transition: color 0.2s;
          position: relative;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -3px; left: 0; right: 0;
          height: 2px;
          background: #6366f1;
          border-radius: 2px;
          transform: scaleX(0);
          transition: transform 0.25s;
        }
        .nav-link:hover { color: white; }
        .nav-link:hover::after { transform: scaleX(1); }

        .register-btn {
          background: linear-gradient(135deg, #6366f1, #4f46e5);
          color: white;
          font-size: 17px;
          font-weight: 600;
          padding: 11px 26px;
          border-radius: 10px;
          text-decoration: none;
          transition: all 0.3s;
          box-shadow: 0 2px 16px rgba(99,102,241,0.35);
          letter-spacing: 0.01em;
        }
        .register-btn:hover { box-shadow: 0 4px 24px rgba(99,102,241,0.55); transform: translateY(-1px); filter: brightness(1.1); }

        .hero-overlay {
          background: linear-gradient(
            to top,
            rgba(8,12,20,0.95) 0%,
            rgba(8,12,20,0.5) 40%,
            rgba(8,12,20,0.2) 70%,
            rgba(8,12,20,0.1) 100%
          );
        }
        .hero-side-overlay {
          background: linear-gradient(
            to right,
            rgba(8,12,20,0.7) 0%,
            transparent 50%
          );
        }

        .properties-section {
          background: rgba(255,255,255,0.015);
          border-top: 1px solid rgba(255,255,255,0.05);
        }

        .owner-cta {
          background: rgba(99,102,241,0.08);
          border: 1px solid rgba(99,102,241,0.2);
          border-radius: 16px;
          padding: 20px 32px;
          display: inline-flex;
          align-items: center;
          gap: 20px;
          margin-top: 20px;
        }

        .scroll-hint {
          animation: bounce-y 2s infinite;
        }
        @keyframes bounce-y {
          0%, 100% { transform: translateY(0); opacity: 0.5; }
          50% { transform: translateY(6px); opacity: 1; }
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(32px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .anim-fadeup { animation: fadeUp 0.8s cubic-bezier(0.4,0,0.2,1) forwards; }
        .anim-delay-1 { animation-delay: 0.1s; opacity: 0; }
        .anim-delay-2 { animation-delay: 0.25s; opacity: 0; }
        .anim-delay-3 { animation-delay: 0.4s; opacity: 0; }
        .anim-delay-4 { animation-delay: 0.55s; opacity: 0; }
      `}</style>

      {/* ── NAVBAR ── */}
      <nav className={`fixed top-0 left-0 w-full z-50 nav-blur ${scrolled ? "nav-scrolled" : ""}`}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px", height: 68, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {/* Logo */}
          <Link to="/" style={{ textDecoration: "none" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{
                width: 34, height: 34,
                background: "linear-gradient(135deg, #6366f1, #4f46e5)",
                borderRadius: 10,
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 4px 16px rgba(99,102,241,0.4)"
              }}>
                <svg viewBox="0 0 24 24" fill="white" style={{ width: 18, height: 18 }}>
                  <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.689z" />
                  <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
                </svg>
              </div>
              <span className="font-display" style={{ fontSize: 22, fontWeight: 800, color: "white", letterSpacing: "-0.02em" }}>
                Rent<span style={{ color: "#818cf8" }}>Ease</span>
              </span>
            </div>
          </Link>

          {/* Nav Links */}
          <div style={{ display: "flex", alignItems: "center", gap: 36 }}>
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/register" className="register-btn">Register →</Link>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <div ref={heroRef} style={{ position: "relative", width: "100%", height: "100vh", overflow: "hidden", marginTop: 0 }}>
        {/* Slides */}
        {images.map((img, idx) => (
          <div
            key={idx}
            className={`hero-img ${isTransitioning
              ? (currentIndex === idx ? "hero-img-active hero-transition" : "hero-img-inactive")
              : (currentIndex === idx ? "hero-img-active" : "hero-img-inactive")
            }`}
            style={{ position: "absolute", inset: 0 }}
          >
            <img src={img} alt={`Property ${idx + 1}`} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
          </div>
        ))}

        {/* Overlays */}
        <div className="hero-overlay" style={{ position: "absolute", inset: 0, zIndex: 1 }} />
        <div className="hero-side-overlay" style={{ position: "absolute", inset: 0, zIndex: 2 }} />

        {/* Noise texture */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 3,
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E\")",
          opacity: 0.4, pointerEvents: "none"
        }} />

        {/* Hero Content */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          zIndex: 10, padding: "0 80px 80px",
          display: "flex", flexDirection: "column", gap: 0,
        }}>
          {/* Label badge */}
          <div
            className={`label-badge slide-text ${isTransitioning ? "slide-text-hidden" : "slide-text-visible"}`}
            style={{ alignSelf: "flex-start", marginBottom: 20 }}
          >
            <span className="label-dot" />
            {slideContent[currentIndex].label}
          </div>

          {/* Main heading */}
          <div className={`slide-text ${isTransitioning ? "slide-text-hidden" : "slide-text-visible"}`}>
            <h1 className="font-display" style={{
              fontSize: "clamp(42px, 6vw, 80px)",
              fontWeight: 800,
              color: "white",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              margin: 0, marginBottom: 4,
              textShadow: "0 4px 40px rgba(0,0,0,0.4)"
            }}>
              {slideContent[currentIndex].title}
            </h1>
            <h1 className="font-display" style={{
              fontSize: "clamp(42px, 6vw, 80px)",
              fontWeight: 800,
              background: "linear-gradient(135deg, #818cf8 0%, #c4b5fd 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              margin: 0, marginBottom: 20,
            }}>
              {slideContent[currentIndex].highlight}
            </h1>
          </div>

          <p
            className={`slide-text ${isTransitioning ? "slide-text-hidden" : "slide-text-visible"}`}
            style={{
              color: "rgba(255,255,255,0.6)",
              fontSize: 18,
              fontWeight: 400,
              marginBottom: 36,
              maxWidth: 420,
              letterSpacing: "0.01em",
              transition: "all 0.6s 0.1s"
            }}
          >
            {slideContent[currentIndex].sub}
          </p>

          {/* CTA Buttons */}
          <div style={{ display: "flex", gap: 14, marginBottom: 48 }}>
            <Link to="/register">
              <button className="btn-primary">Explore Properties →</button>
            </Link>
            <Link to="/login" className="btn-ghost">Sign In</Link>
          </div>

          {/* Dots */}
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToSlide(idx)}
                className={`dot-btn ${currentIndex === idx ? "dot-active" : "dot-inactive"}`}
                style={{ height: 10, padding: 0, outline: "none" }}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
            <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 13, marginLeft: 10 }}>
              {String(currentIndex + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* Scroll hint */}
        <div style={{ position: "absolute", bottom: 32, right: 80, zIndex: 10 }}>
          <div className="scroll-hint" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", writingMode: "vertical-rl" }}>Scroll</span>
            <div style={{ width: 1, height: 48, background: "linear-gradient(to bottom, rgba(99,102,241,0.6), transparent)" }} />
          </div>
        </div>
      </div>

      {/* ── FEATURES ── */}
      <div style={{ position: "relative", padding: "100px 80px", overflow: "hidden" }}>
        <div className="mesh-bg" />
        <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div className="section-divider" />
            <div style={{ color: "#818cf8", fontSize: 15, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16 }}>Why Choose Us</div>
            <h2 className="font-display" style={{ fontSize: "clamp(32px, 4vw, 50px)", fontWeight: 800, color: "white", letterSpacing: "-0.02em", margin: 0 }}>
              Built for the Modern Renter
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            {features.map((f, i) => (
              <div key={i} className="feature-card" style={{ padding: "36px 32px", position: "relative" }}>
                <div className="icon-wrap" style={{ marginBottom: 24 }}>{f.icon}</div>
                <h3 style={{ color: "white", fontSize: 22, fontWeight: 700, marginBottom: 12, letterSpacing: "-0.01em" }}>{f.title}</h3>
                <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 17, lineHeight: 1.7, margin: 0 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── PROPERTIES SECTION ── */}
      <div className="properties-section" style={{ padding: "80px 80px 120px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          {/* Header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 56 }}>
            <div>
              <div style={{ color: "#818cf8", fontSize: 15, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>Listings</div>
              <h2 className="font-display" style={{ fontSize: "clamp(28px, 3.5vw, 46px)", fontWeight: 800, color: "white", letterSpacing: "-0.02em", margin: 0, lineHeight: 1.1 }}>
                Explore Our<br />
                <span style={{ background: "linear-gradient(135deg, #818cf8, #c4b5fd)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  Premium Properties
                </span>
              </h2>
            </div>
            <div className="owner-cta">
              <div>
                <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 15, marginBottom: 4 }}>Are you a property owner?</div>
                <div style={{ color: "white", fontWeight: 600, fontSize: 17 }}>Post your listing today</div>
              </div>
              <Link to="/register">
                <button className="btn-primary" style={{ padding: "12px 24px", whiteSpace: "nowrap" }}>Register as Owner</button>
              </Link>
            </div>
          </div>

          {/* Cards */}
          <AllPropertiesCards />
        </div>
      </div>

      {/* ── FOOTER CTA ── */}
      <div style={{
        background: "linear-gradient(135deg, rgba(99,102,241,0.15), rgba(139,92,246,0.1))",
        borderTop: "1px solid rgba(99,102,241,0.2)",
        padding: "80px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden"
      }}>
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse 60% 80% at 50% 50%, rgba(99,102,241,0.12), transparent)",
          pointerEvents: "none"
        }} />
        <div style={{ position: "relative" }}>
          <h2 className="font-display" style={{ fontSize: "clamp(28px, 4vw, 52px)", fontWeight: 800, color: "white", letterSpacing: "-0.025em", marginBottom: 16 }}>
            Ready to Find Your Next Home?
          </h2>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 19, marginBottom: 40, maxWidth: 480, margin: "0 auto 40px" }}>
            Join thousands of happy renters who found their perfect place through HouseEase.
          </p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center" }}>
            <Link to="/register"><button className="btn-primary" style={{ padding: "16px 40px", fontSize: 18 }}>Get Started Free →</button></Link>
            <Link to="/login" className="btn-ghost" style={{ padding: "16px 32px", fontSize: 18 }}>Login to Browse</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;