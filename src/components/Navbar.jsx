import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import logo from "../assets/logo.png";
import { OFFICE_DETAILS } from "../config/constants";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Get Hire", path: "/get-hire" },
  { name: "Hire Talent", path: "/hire-talent" },
  { name: "Blog", path: "/blog" },
  { name: "Contact Us", path: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled ? "glass-nav py-3 shadow-md" : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src={logo}
              alt="Ivory Squid Logo"
              className="h-14 w-14 md:h-20 md:w-20 object-contain transition-transform duration-500 group-hover:rotate-12"
            />
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className="relative text-sm font-medium tracking-wide transition-colors duration-300 py-1"
                  style={{
                    color: isActive
                      ? "var(--color-accent)"
                      : "var(--color-primary)",
                  }}
                >
                  <span className="hover:text-accent transition-colors duration-300">
                    {link.name}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="activeNavLine"
                      className="absolute bottom-0 left-0 w-full h-[2px] bg-accent"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>
              );
            })}
            <Link
              to="/contact"
              className="bg-primary text-white hover:bg-accent px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-all duration-300 hover:shadow-lg hover:shadow-accent/20"
            >
              Get in Touch
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          {/* Mobile Menu Button - only shows Menu icon, hidden when drawer is open */}
          {!isOpen && (
            <button
              onClick={() => setIsOpen(true)}
              className="lg:hidden text-primary hover:text-accent focus:outline-none z-50 p-2"
              aria-label="Open navigation menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          )}
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden flex items-start justify-center p-4 pt-20"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: -30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-primary w-full max-w-sm rounded-3xl px-8 py-8 shadow-2xl relative"
            >
              {/* Top Row: Logo + Close */}
              <div className="flex items-center justify-between mb-8">
                <span className="font-serif text-2xl font-bold text-white">
                  Ivory Squid
                </span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:text-accent-light transition-colors"
                  aria-label="Close menu"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Nav Links */}
              <div className="flex flex-col gap-5 text-left mb-8">
                {navLinks.map((link, idx) => {
                  const isActive = location.pathname === link.path;
                  return (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      key={link.name}
                    >
                      <Link
                        to={link.path}
                        onClick={() => setIsOpen(false)}
                        className="font-medium text-lg transition-colors duration-300 inline-block"
                        style={{
                          color: isActive
                            ? "var(--color-accent-light, #fff)"
                            : "#ffffff",
                        }}
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.05 }}
              >
                <Link
                  to="/contact"
                  onClick={() => setIsOpen(false)}
                  className="bg-accent text-white w-full py-3.5 rounded-full font-semibold flex items-center justify-center gap-2 hover:bg-accent/90 transition-all duration-300"
                >
                  Get A Quote
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}