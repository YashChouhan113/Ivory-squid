import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, CheckCircle2, MessageCircle, AlertCircle, Briefcase, Brain, PhoneCall, GitMerge, FileText } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../config/constants';

export default function HireTalent() {
  // Corporate request form fields
  const [companyName, setCompanyName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState('Executive Recruitment');
  const [details, setDetails] = useState('');

  // Form validation and redirect statuses
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const validate = () => {
    const tempErrors = {};
    if (!companyName.trim()) tempErrors.companyName = "Company Name is required";
    if (!contactPerson.trim()) tempErrors.contactPerson = "Contact Person name is required";
    if (!phone.trim()) {
      tempErrors.phone = "Contact Phone is required";
    } else if (!/^\d{10,12}$/.test(phone.replace(/[\s+-]/g, ''))) {
      tempErrors.phone = "Provide a valid 10-12 digit phone number";
    }
    if (!email.trim()) {
      tempErrors.email = "Corporate Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      tempErrors.email = "Provide a valid email address";
    }
    if (!details.trim()) tempErrors.details = "Requirement details are required";
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleRequestSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setShowToast(true);

    // Build the corporate WhatsApp message
    const waText = 
      `*New Corporate Inquiry - Ivory Squid Pvt Ltd*\n` +
      `*Company:* ${companyName}\n` +
      `*Contact Person:* ${contactPerson}\n` +
      `*Phone:* ${phone}\n` +
      `*Email:* ${email}\n` +
      `*Service Needed:* ${service}\n` +
      `*Requirements:* ${details}`;

    const encodedText = encodeURIComponent(waText);
    const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedText}`;

    // Redirect after 2 seconds
    setTimeout(() => {
      window.open(waUrl, '_blank');
      setIsSubmitting(false);
      setShowToast(false);
      // Clear fields
      setCompanyName('');
      setContactPerson('');
      setPhone('');
      setEmail('');
      setService('Executive Recruitment');
      setDetails('');
    }, 2000);
  };

  const servicesBreakdown = [
    {
      title: "Executive Recruitment",
      desc: "Retained search, headhunting, and placement for director, VP, and C-suite roles. We target passive talent that regular agencies miss.",
      icon: Briefcase
    },
    {
      title: "Flexible Staffing",
      desc: "Scale your workforce dynamically with temp and contract-to-hire staffing solutions. We manage onboarding, payroll, and compliance.",
      icon: ShieldCheck
    },
    {
      title: "BPO & Customer Support",
      desc: "Turnkey call center, chat, and helpdesk operations out of Indore. High quality, disciplined staff, running 24/7 processes.",
      icon: PhoneCall
    },
    {
      title: "Knowledge Process Outsourcing (KPO)",
      desc: "Analytical and research support. Let our specialists handle equity research, data parsing, compliance, or back-office tasks.",
      icon: Brain
    },
    {
      title: "Recruitment Process Outsourcing (RPO)",
      desc: "Fully outsource your recruiting framework. We embed recruiters, technology, and branding to drive efficient talent pipelines.",
      icon: GitMerge
    }
  ];

  return (
    <div className="bg-bg-neutral pb-24">
      {/* 1. HERO SECTION */}
      <section className="bg-primary text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(20,80,196,0.2),transparent_60%)]" />
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 text-center">
          <span className="text-accent-light font-bold text-xs uppercase tracking-widest block mb-4">ENTERPRISE</span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
            Hire Talent
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
            Outsource your hiring friction and secure high-performing human capital for your operations.
          </p>
        </div>
      </section>

      {/* 2. SERVICES BREAKDOWN */}
      <section className="py-24 max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center max-w-3xl mx-auto mb-16" data-aos="fade-up">
          <h2 className="font-serif text-3xl font-bold text-primary mb-4">Enterprise Services</h2>
          <p className="text-gray-500 font-medium">
            Explore our tailored staffing models, operational BPO centers, and dedicated KPO nodes.
          </p>
        </div>

        <div className="space-y-8">
          {servicesBreakdown.map((srv, idx) => {
            const IconComponent = srv.icon;
            return (
              <div 
                key={idx} 
                data-aos="fade-up"
                className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-6 md:gap-10 items-start hover:shadow-md transition-shadow duration-300"
              >
                <div className="h-14 w-14 rounded-2xl bg-accent/5 text-accent flex items-center justify-center shrink-0">
                  <IconComponent className="h-7 w-7" />
                </div>
                <div className="text-left">
                  <h3 className="font-serif text-xl font-bold text-primary mb-2">{srv.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{srv.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. REQUEST TALENT FORM */}
      <section className="max-w-4xl mx-auto px-6 md:px-12 py-24 bg-white rounded-3xl border border-gray-100 shadow-xl" data-aos="fade-up">
        <div className="text-left mb-12">
          <h2 className="font-serif text-3xl font-bold text-primary mb-3">Request Talent</h2>
          <p className="text-gray-500 font-medium">
            Share your hiring requirements. Provide corporate details below and route immediately via WhatsApp Click-to-Chat.
          </p>
        </div>

        <form onSubmit={handleRequestSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Company Name */}
            <div className="relative text-left">
              <label htmlFor="companyName" className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-2">Company Name *</label>
              <input 
                id="companyName"
                type="text" 
                placeholder="e.g. Apex Tech Solutions"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className={`w-full bg-bg-neutral border-0 focus:ring-1 focus:ring-accent focus:bg-white rounded-xl px-4 py-3.5 text-sm text-primary font-medium transition-all ${
                  errors.companyName ? 'ring-1 ring-red-500' : ''
                }`}
              />
              {errors.companyName && (
                <span className="text-red-500 text-xs font-bold mt-1 flex items-center gap-1"><AlertCircle className="h-3 w-3" /> {errors.companyName}</span>
              )}
            </div>

            {/* Contact Person Name */}
            <div className="relative text-left">
              <label htmlFor="contactPerson" className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-2">Contact Person *</label>
              <input 
                id="contactPerson"
                type="text" 
                placeholder="e.g. Priyanshu Sharma"
                value={contactPerson}
                onChange={(e) => setContactPerson(e.target.value)}
                className={`w-full bg-bg-neutral border-0 focus:ring-1 focus:ring-accent focus:bg-white rounded-xl px-4 py-3.5 text-sm text-primary font-medium transition-all ${
                  errors.contactPerson ? 'ring-1 ring-red-500' : ''
                }`}
              />
              {errors.contactPerson && (
                <span className="text-red-500 text-xs font-bold mt-1 flex items-center gap-1"><AlertCircle className="h-3 w-3" /> {errors.contactPerson}</span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Corporate Email */}
            <div className="relative text-left">
              <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-2">Corporate Email *</label>
              <input 
                id="email"
                type="email" 
                placeholder="e.g. hr@apextech.com"
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

            {/* Phone Number */}
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

          {/* Service Needed Dropdown */}
          <div className="relative text-left">
            <label htmlFor="service" className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-2">Service Needed *</label>
            <select
              id="service"
              value={service}
              onChange={(e) => setService(e.target.value)}
              className="w-full bg-bg-neutral border-0 focus:ring-1 focus:ring-accent focus:bg-white rounded-xl px-4 py-3.5 text-sm text-primary font-medium transition-all appearance-none cursor-pointer"
            >
              <option value="Executive Recruitment">Executive Recruitment</option>
              <option value="Flexible Staffing">Flexible Staffing</option>
              <option value="BPO & Helpdesk">BPO & Customer Operations</option>
              <option value="KPO Operations">KPO Operations</option>
              <option value="Recruitment Process Outsourcing (RPO)">Recruitment Process Outsourcing (RPO)</option>
              <option value="Pan-India Outsourcing">Pan-India Outsourcing</option>
            </select>
          </div>

          {/* Requirements Details */}
          <div className="relative text-left">
            <label htmlFor="details" className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-2">Brief Requirements / Job Specs *</label>
            <textarea 
              id="details"
              rows="4"
              placeholder="Outline the roles, headcount, skills, and timelines you need..."
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              className={`w-full bg-bg-neutral border-0 focus:ring-1 focus:ring-accent focus:bg-white rounded-xl px-4 py-3.5 text-sm text-primary font-medium transition-all resize-none ${
                errors.details ? 'ring-1 ring-red-500' : ''
              }`}
            />
            {errors.details && (
              <span className="text-red-500 text-xs font-bold mt-1 flex items-center gap-1"><AlertCircle className="h-3 w-3" /> {errors.details}</span>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-accent hover:bg-primary text-white font-bold py-4 rounded-xl uppercase tracking-wider text-sm flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-lg disabled:opacity-75"
          >
            <MessageCircle className="h-5 w-5 text-accent-light" />
            {isSubmitting ? 'Redirecting to WhatsApp...' : 'Submit Inquiry via WhatsApp'}
          </button>
        </form>
      </section>

      {/* Floating Success Toast */}
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
              <h3 className="font-serif text-2xl font-bold text-primary mb-2">Request Validated!</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">
                We are opening WhatsApp to transmit your corporate requirements to the Ivory Squid Business Desk.
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
