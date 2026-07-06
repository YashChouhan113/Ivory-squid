import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  CheckCircle2, 
  MessageCircle, 
  AlertCircle 
} from 'lucide-react';
import { OFFICE_DETAILS, WHATSAPP_NUMBER } from '../config/constants';

export default function Contact() {
  // Form fields state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('General Consultation');
  const [msgText, setMsgText] = useState('');

  // Validation/Submit state
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const validate = () => {
    const tempErrors = {};
    if (!name.trim()) tempErrors.name = "Your Name is required";
    if (!phone.trim()) {
      tempErrors.phone = "Phone number is required";
    } else if (!/^\d{10,12}$/.test(phone.replace(/[\s+-]/g, ''))) {
      tempErrors.phone = "Provide a valid 10-12 digit phone number";
    }
    if (!email.trim()) {
      tempErrors.email = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      tempErrors.email = "Provide a valid email address";
    }
    if (!msgText.trim()) tempErrors.msgText = "Message content is required";
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setShowToast(true);

    // Build WhatsApp message
    const waText = 
      `*New Contact Inquiry - Ivory Squid Pvt Ltd*\n` +
      `*Name:* ${name}\n` +
      `*Phone:* ${phone}\n` +
      `*Email:* ${email}\n` +
      `*Subject:* ${subject}\n` +
      `*Message:* ${msgText}`;

    const encodedText = encodeURIComponent(waText);
    const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedText}`;

    // Redirect after 2 seconds
    setTimeout(() => {
      window.open(waUrl, '_blank');
      setIsSubmitting(false);
      setShowToast(false);
      // Clear fields
      setName('');
      setEmail('');
      setPhone('');
      setSubject('General Consultation');
      setMsgText('');
    }, 2000);
  };

  return (
    <div className="bg-bg-neutral pb-24">
      {/* 1. HERO SECTION */}
      <section className="bg-primary text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(20,80,196,0.2),transparent_60%)]" />
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 text-center">
          <span className="text-accent-light font-bold text-xs uppercase tracking-widest block mb-4">CONNECT</span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
            Contact Us
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
            Get in touch with our corporate experts to optimize your recruitment pipelines.
          </p>
        </div>
      </section>

      {/* 2. LAYOUT GRID */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-24 grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        {/* Info Column */}
        <div className="lg:col-span-5 text-left flex flex-col justify-between" data-aos="fade-right">
          <div>
            <h4 className="text-xs uppercase tracking-widest text-accent font-bold mb-3">OFFICE HEADQUARTERS</h4>
            <h2 className="font-serif text-3xl font-bold text-primary mb-6">Let's Connect</h2>
            <p className="text-gray-500 font-medium leading-relaxed mb-8">
              Whether you are a job seeker seeking career advancement or a corporate leader looking to outsource resource friction, Ivory Squid is here to deliver results.
            </p>
            
            <ul className="space-y-6 text-sm text-gray-600 font-medium">
              <li className="flex gap-4 items-start">
                <div className="h-10 w-10 rounded-xl bg-accent/5 text-accent flex items-center justify-center shrink-0">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-serif text-base font-bold text-primary mb-1">Corporate Address</h4>
                  <span>{OFFICE_DETAILS.address}</span>
                </div>
              </li>

              <li className="flex gap-4 items-start">
                <div className="h-10 w-10 rounded-xl bg-accent/5 text-accent flex items-center justify-center shrink-0">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-serif text-base font-bold text-primary mb-1">Call Us Directly</h4>
                  <a href={`tel:${OFFICE_DETAILS.phone.replace(/\s+/g, '')}`} className="hover:text-accent transition-colors">
                    {OFFICE_DETAILS.phone}
                  </a>
                </div>
              </li>

              <li className="flex gap-4 items-start">
                <div className="h-10 w-10 rounded-xl bg-accent/5 text-accent flex items-center justify-center shrink-0">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-serif text-base font-bold text-primary mb-1">Email Inquiries</h4>
                  <a href={`mailto:${OFFICE_DETAILS.email}`} className="hover:text-accent transition-colors">
                    {OFFICE_DETAILS.email}
                  </a>
                </div>
              </li>

              <li className="flex gap-4 items-start">
                <div className="h-10 w-10 rounded-xl bg-accent/5 text-accent flex items-center justify-center shrink-0">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-serif text-base font-bold text-primary mb-1">Business Hours</h4>
                  <span>{OFFICE_DETAILS.hours}</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Styled Map Box Placeholder */}
          <div className="mt-12 bg-white p-4 rounded-3xl border border-gray-100 shadow-md">
            <h4 className="text-xs uppercase tracking-widest text-gray-400 font-bold mb-3 flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5 text-accent" /> Location Node Map
            </h4>
            <div className="h-48 w-full bg-gray-100 rounded-2xl overflow-hidden relative border border-gray-100">
              {/* Map embed iframe mock or actual google maps embed with placeholder coordinates for Scheme 78, Indore */}
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3681.33230491953!2d75.8166946!3d22.6413289!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962fc62db3663a7%3A0x89ec276cf05d54a2!2sSilicon%20City%20Indore!5e0!3m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy"
                title="Google Map location Indore Silicon City"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>

        {/* Form Column */}
        <div className="lg:col-span-7" data-aos="fade-left">
          <div className="bg-white p-10 md:p-12 rounded-3xl border border-gray-100 shadow-xl">
            <h3 className="font-serif text-2xl font-bold text-primary mb-2">Send us a Message</h3>
            <p className="text-gray-500 text-sm leading-relaxed mb-8">
              Complete the form below to initiate contact immediately. Submissions route secure client-side validation to WhatsApp.
            </p>

            <form onSubmit={handleContactSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Full Name */}
                <div className="relative text-left">
                  <label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-2">Your Name *</label>
                  <input 
                    id="name"
                    type="text" 
                    placeholder="e.g. Priyanshu"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={`w-full bg-bg-neutral border-0 focus:ring-1 focus:ring-accent focus:bg-white rounded-xl px-4 py-3.5 text-sm text-primary font-medium transition-all ${
                      errors.name ? 'ring-1 ring-red-500' : ''
                    }`}
                  />
                  {errors.name && (
                    <span className="text-red-500 text-xs font-bold mt-1 flex items-center gap-1"><AlertCircle className="h-3 w-3" /> {errors.name}</span>
                  )}
                </div>

                {/* Phone */}
                <div className="relative text-left">
                  <label htmlFor="phone" className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-2">Phone Number *</label>
                  <input 
                    id="phone"
                    type="tel" 
                    placeholder="e.g. 9876543210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={`w-full bg-bg-neutral border-0 focus:ring-1 focus:ring-accent focus:bg-white rounded-xl px-4 py-3.5 text-sm text-primary font-medium transition-all ${
                      errors.phone ? 'ring-1 ring-red-500' : ''
                    }`}
                  />
                  {errors.phone && (
                    <span className="text-red-500 text-xs font-bold mt-1 flex items-center gap-1"><AlertCircle className="h-3 w-3" /> {errors.phone}</span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Email */}
                <div className="relative text-left">
                  <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-2">Email Address *</label>
                  <input 
                    id="email"
                    type="email" 
                    placeholder="e.g. info@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full bg-bg-neutral border-0 focus:ring-1 focus:ring-accent focus:bg-white rounded-xl px-4 py-3.5 text-sm text-primary font-medium transition-all ${
                      errors.email ? 'ring-1 ring-red-500' : ''
                    }`}
                  />
                  {errors.email && (
                    <span className="text-red-500 text-xs font-bold mt-1 flex items-center gap-1"><AlertCircle className="h-3 w-3" /> {errors.email}</span>
                  )}
                </div>

                {/* Subject Dropdown */}
                <div className="relative text-left">
                  <label htmlFor="subject" className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-2">Topic of Consultation *</label>
                  <select
                    id="subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full bg-bg-neutral border-0 focus:ring-1 focus:ring-accent focus:bg-white rounded-xl px-4 py-3.5 text-sm text-primary font-medium transition-all appearance-none cursor-pointer"
                  >
                    <option value="General Consultation">General Consultation</option>
                    <option value="Executive Recruitment Options">Executive Recruiting Options</option>
                    <option value="Outsourcing (BPO/KPO/RPO)">Outsourcing (BPO/KPO/RPO)</option>
                    <option value="Career & Job Openings">Careers & Openings</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div className="relative text-left">
                <label htmlFor="msgText" className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-2">Your Message *</label>
                <textarea 
                  id="msgText"
                  rows="5"
                  placeholder="Tell us what you would like to discuss..."
                  value={msgText}
                  onChange={(e) => setMsgText(e.target.value)}
                  className={`w-full bg-bg-neutral border-0 focus:ring-1 focus:ring-accent focus:bg-white rounded-xl px-4 py-3.5 text-sm text-primary font-medium transition-all resize-none ${
                    errors.msgText ? 'ring-1 ring-red-500' : ''
                  }`}
                />
                {errors.msgText && (
                  <span className="text-red-500 text-xs font-bold mt-1 flex items-center gap-1"><AlertCircle className="h-3 w-3" /> {errors.msgText}</span>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary hover:bg-accent text-white font-bold py-4 rounded-xl uppercase tracking-wider text-sm flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-lg disabled:opacity-75"
              >
                <MessageCircle className="h-5 w-5 text-accent-light" />
                {isSubmitting ? 'Redirecting to WhatsApp...' : 'Open Chat on WhatsApp'}
              </button>
            </form>
          </div>
        </div>

      </section>

      {/* Success Modal */}
      <AnimatePresence>
        {showToast && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-6"
          >
            <div className="bg-white p-8 rounded-3xl max-w-sm w-full border border-gray-100 shadow-2xl text-center flex flex-col items-center">
              <div className="h-16 w-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mb-6 animate-bounce">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-primary mb-2">Form Validated!</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">
                We are opening WhatsApp to transmit your message inquiry to the Ivory Squid support desk.
              </p>
              <div className="flex items-center gap-2 text-xs font-bold text-accent animate-pulse uppercase tracking-wider">
                <span className="flex h-2.5 w-2.5 rounded-full bg-accent" />
                Launching Chat Client...
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
