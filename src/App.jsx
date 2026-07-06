import React, { useEffect, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Lenis from 'lenis';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Layout components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

// Lazy-loaded pages for optimized bundle size and fast initial load
const Home = React.lazy(() => import('./pages/Home'));
const About = React.lazy(() => import('./pages/About'));
const GetHire = React.lazy(() => import('./pages/GetHire'));
const HireTalent = React.lazy(() => import('./pages/HireTalent'));
const Blog = React.lazy(() => import('./pages/Blog'));
const Contact = React.lazy(() => import('./pages/Contact'));

// Simple elegant loading spinner fallback
function PageLoader() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-bg-neutral">
      <div className="relative flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-accent/20 border-t-accent" />
        <div className="absolute font-serif text-[10px] tracking-widest text-primary uppercase font-bold">IS</div>
      </div>
      <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-primary/60">
        Loading Excellence...
      </p>
    </div>
  );
}

export default function App() {
  // Initialize Lenis smooth scroll and AOS animation triggers
  useEffect(() => {
    // 1. Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.1,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Update AOS scroll positioning on Lenis scroll
    lenis.on('scroll', () => {
      AOS.refresh();
    });

    // 2. AOS Scroll Animations
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      mirror: false,
      offset: 100,
    });

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-bg-neutral selection:bg-accent selection:text-white">
        <Navbar />
        {/* Main Content Area */}
        <main className="flex-grow pt-20">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/get-hire" element={<GetHire />} />
              <Route path="/hire-talent" element={<HireTalent />} />
              <Route path="/blog/*" element={<Blog />} />
              <Route path="/contact" element={<Contact />} />
              {/* Fallback redirect or 404 */}
              <Route path="*" element={<Home />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
