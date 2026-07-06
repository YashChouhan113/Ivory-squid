import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Linkedin, 
  Instagram, 
  Facebook, 
  Twitter, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ArrowUpRight 
} from 'lucide-react';
import logo from '../assets/logo.png';
import { OFFICE_DETAILS } from '../config/constants';

export default function Footer() {
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const socialLinks = [
    { icon: Linkedin, url: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: Instagram, url: 'https://instagram.com', label: 'Instagram' },
    { icon: Facebook, url: 'https://facebook.com', label: 'Facebook' },
    { icon: Twitter, url: 'https://twitter.com', label: 'Twitter/X' }
  ];

  return (
    <footer className="bg-primary text-white pt-20 pb-8 border-t border-white/5 relative overflow-hidden">
      {/* Background Graphic Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(20,80,196,0.15),transparent_50%)] pointer-events-none" />
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-7xl mx-auto px-6 md:px-12 relative z-10"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-16 border-b border-white/10">
          {/* Column 1: Brand & Tagline */}
          <motion.div variants={itemVariants} className="lg:col-span-4">
            <Link to="/" className="flex items-center gap-3 mb-6 group inline-block">
              <img 
                src={logo} 
                alt="Ivory Squid Logo" 
                className="h-10 w-10 object-contain brightness-100 group-hover:scale-105 transition-transform duration-300"
              />
              <div>
                <span className="font-serif text-xl md:text-2xl font-bold tracking-tight text-white block">
                  Ivory Squid
                </span>
                <span className="text-[9px] uppercase tracking-widest text-accent-light font-semibold block -mt-1">
                  Pvt Ltd
                </span>
              </div>
            </Link>
            <p className="text-gray-400 text-sm mb-6 max-w-sm leading-relaxed">
              Indore's premium recruitment and outsourcing partner, connecting top-tier talent with industry-leading organizations across India.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, idx) => {
                const Icon = social.icon;
                return (
                  <a
                    key={idx}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    className="h-10 w-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-accent hover:border-accent transition-all duration-300 transform hover:-translate-y-1"
                    aria-label={social.label}
                  >
                    <Icon className="h-4.5 w-4.5" />
                  </a>
                );
              })}
            </div>
          </motion.div>

          {/* Column 2: Quick Links */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <h3 className="font-serif text-lg font-bold mb-6 text-white tracking-wide">
              Quick Links
            </h3>
            <ul className="space-y-3 text-sm">
              {[
                { name: 'Home', path: '/' },
                { name: 'About Us', path: '/about' },
                { name: 'Get Hire', path: '/get-hire' },
                { name: 'Hire Talent', path: '/hire-talent' },
                { name: 'Our Blog', path: '/blog' },
                { name: 'Contact Us', path: '/contact' }
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path} 
                    className="text-gray-400 hover:text-accent-light transition-colors duration-200 flex items-center gap-1 group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-200">{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 3: Services */}
          <motion.div variants={itemVariants} className="lg:col-span-3">
            <h3 className="font-serif text-lg font-bold mb-6 text-white tracking-wide">
              Our Services
            </h3>
            <ul className="space-y-3 text-sm">
              {[
                { name: 'Executive Recruitment', path: '/hire-talent' },
                { name: 'Flexible Staffing', path: '/hire-talent' },
                { name: 'BPO Solutions', path: '/hire-talent' },
                { name: 'KPO Solutions', path: '/hire-talent' },
                { name: 'Recruitment Process Outsourcing', path: '/hire-talent' },
                { name: 'Pan-India Outsourcing', path: '/hire-talent' }
              ].map((service) => (
                <li key={service.name}>
                  <Link 
                    to={service.path} 
                    className="text-gray-400 hover:text-accent-light transition-colors duration-200 flex items-center gap-1 group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-200">{service.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 4: Contact Info */}
          <motion.div variants={itemVariants} className="lg:col-span-3">
            <h3 className="font-serif text-lg font-bold mb-6 text-white tracking-wide">
              Office Details
            </h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex gap-3 items-start">
                <MapPin className="h-5 w-5 text-accent-light shrink-0 mt-0.5" />
                <span>{OFFICE_DETAILS.address}</span>
              </li>
              <li>
                <a 
                  href={`tel:${OFFICE_DETAILS.phone.replace(/\s+/g, '')}`}
                  className="flex gap-3 items-center hover:text-accent-light transition-colors duration-200"
                >
                  <Phone className="h-5 w-5 text-accent-light shrink-0" />
                  <span>{OFFICE_DETAILS.phone}</span>
                </a>
              </li>
              <li>
                <a 
                  href={`mailto:${OFFICE_DETAILS.email}`}
                  className="flex gap-3 items-center hover:text-accent-light transition-colors duration-200"
                >
                  <Mail className="h-5 w-5 text-accent-light shrink-0" />
                  <span>{OFFICE_DETAILS.email}</span>
                </a>
              </li>
              <li className="flex gap-3 items-center">
                <Clock className="h-5 w-5 text-accent-light shrink-0" />
                <span>{OFFICE_DETAILS.hours}</span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Ivory Squid Private Limited. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors duration-200">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors duration-200">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors duration-200">Sitemap</a>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}
