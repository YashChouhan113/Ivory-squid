import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Briefcase, ChevronRight, CheckCircle2, MessageCircle, AlertCircle } from 'lucide-react';
import { JOBS, WHATSAPP_NUMBER } from '../config/constants';

export default function GetHire() {
  const [searchParams] = useSearchParams();
  
  // Job listing search filters
  const [keyword, setKeyword] = useState(searchParams.get('q') || '');
  const [location, setLocation] = useState(searchParams.get('l') || '');
  const [selectedDept, setSelectedDept] = useState('All');
  
  // Job Application Form State
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [message, setMessage] = useState('');
  
  // Validation and Statuses
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);

  // Pre-fill role if jobId is in URL
  useEffect(() => {
    const jobId = searchParams.get('jobId');
    if (jobId) {
      const selectedJob = JOBS.find(j => j.id === jobId);
      if (selectedJob) {
        setRole(selectedJob.title);
        // Scroll to form smoothly
        const formElement = document.getElementById('apply-form-section');
        if (formElement) {
          formElement.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  }, [searchParams]);

  // Extract unique departments for filtering
  const departments = ['All', ...new Set(JOBS.map(j => j.department))];

  // Filtered jobs array
  const filteredJobs = JOBS.filter(job => {
    const matchesKeyword = 
      job.title.toLowerCase().includes(keyword.toLowerCase()) ||
      job.description.toLowerCase().includes(keyword.toLowerCase());
    const matchesLocation = 
      job.location.toLowerCase().includes(location.toLowerCase());
    const matchesDept = 
      selectedDept === 'All' || job.department === selectedDept;
    
    return matchesKeyword && matchesLocation && matchesDept;
  });

  const validate = () => {
    const tempErrors = {};
    if (!fullName.trim()) tempErrors.fullName = "Full Name is required";
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
    if (!role.trim()) tempErrors.role = "Role/Position is required";
    if (linkedin.trim() && !/^(https?:\/\/)?(www\.)?linkedin\.com\/in\//.test(linkedin)) {
      tempErrors.linkedin = "Provide a valid LinkedIn URL";
    }
    if (!message.trim()) tempErrors.message = "Brief introduction is required";
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleApplySubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setShowToast(true);

    // Build the prefilled WhatsApp text message
    const waText = 
      `*New Candidate Application - Ivory Squid Pvt Ltd*\n` +
      `*Name:* ${fullName}\n` +
      `*Phone:* ${phone}\n` +
      `*Email:* ${email}\n` +
      `*Role Applied:* ${role}\n` +
      `*LinkedIn:* ${linkedin || 'Not Provided'}\n` +
      `*Cover Note:* ${message}`;

    const encodedText = encodeURIComponent(waText);
    const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedText}`;

    // Redirect to WhatsApp after 2 seconds (to let the toast anim display)
    setTimeout(() => {
      window.open(waUrl, '_blank');
      setIsSubmitting(false);
      setShowToast(false);
      // Clear fields
      setFullName('');
      setPhone('');
      setEmail('');
      setRole('');
      setLinkedin('');
      setMessage('');
    }, 2000);
  };

  return (
    <div className="bg-bg-neutral pb-24">
      {/* 1. HERO SECTION */}
      <section className="bg-primary text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(20,80,196,0.2),transparent_60%)]" />
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 text-center">
          <span className="text-accent-light font-bold text-xs uppercase tracking-widest block mb-4">CAREERS</span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
            Get Hired
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
            Submit your profile and connect with prime hiring managers at top corporations in India.
          </p>
        </div>
      </section>

      {/* 2. HOW IT WORKS */}
      <section className="py-24 max-w-7xl mx-auto px-6 md:px-12 bg-white rounded-3xl mt-12 border border-gray-100 shadow-md">
        <div className="text-center max-w-3xl mx-auto mb-16" data-aos="fade-up">
          <h2 className="font-serif text-3xl font-bold text-primary mb-4">How it Works</h2>
          <p className="text-gray-500 font-medium">Simple steps to kickstart your professional career advancement.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { step: "01", title: "Apply", desc: "Select an open career listed below or send us your details via our WhatsApp-integrated form." },
            { step: "02", title: "Evaluate", desc: "Our recruitment experts conduct technical screenings and interview matches matching key parameters." },
            { step: "03", title: "Land the Offer", desc: "Once matches align, we fast-track your profile directly to decision-makers for final offer onboarding." }
          ].map((item, idx) => (
            <div key={idx} data-aos="fade-up" data-aos-delay={idx * 150} className="relative text-left">
              <span className="font-serif text-5xl font-black text-accent/15 block mb-4">{item.step}</span>
              <h3 className="font-serif text-xl font-bold text-primary mb-3">{item.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. MOCK JOBS EXPLORER */}
      <section className="py-24 max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-left mb-12" data-aos="fade-up">
          <h2 className="font-serif text-3xl font-bold text-primary mb-3">Explore Careers</h2>
          <p className="text-gray-500 font-medium">Refine listings to match your sector or geographic preferences.</p>
        </div>

        {/* Filter bar */}
        <div data-aos="fade-up" className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col lg:flex-row gap-4 mb-8 items-center justify-between">
          <div className="w-full lg:w-auto flex flex-col sm:flex-row gap-4 flex-1">
            <div className="flex-1 flex items-center gap-2 border border-gray-100 bg-bg-neutral px-4 py-3 rounded-2xl">
              <Search className="h-5 w-5 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search keywords..." 
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="w-full bg-transparent focus:outline-none text-sm text-primary font-medium"
              />
            </div>
            <div className="flex-1 flex items-center gap-2 border border-gray-100 bg-bg-neutral px-4 py-3 rounded-2xl">
              <MapPin className="h-5 w-5 text-gray-400" />
              <input 
                type="text" 
                placeholder="Location..." 
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-transparent focus:outline-none text-sm text-primary font-medium"
              />
            </div>
          </div>
          <div className="w-full lg:w-auto flex gap-2 flex-wrap justify-start">
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDept(dept)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-300 ${
                  selectedDept === dept 
                    ? 'bg-accent text-white' 
                    : 'bg-bg-neutral text-primary border border-gray-100 hover:border-accent'
                }`}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>

        {/* Jobs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <div 
                key={job.id} 
                className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 text-left flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start gap-4 mb-4">
                    <span className="px-3 py-1 rounded-full bg-accent/5 text-accent text-xs font-bold">
                      {job.department}
                    </span>
                    <span className="text-xs font-semibold text-gray-400">{job.type}</span>
                  </div>
                  <h3 className="font-serif text-xl font-bold text-primary mb-2">{job.title}</h3>
                  <div className="flex flex-wrap gap-4 text-xs font-semibold text-gray-400 mb-6">
                    <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5 text-accent" /> {job.location}</span>
                    <span className="flex items-center gap-1"><Briefcase className="h-3.5 w-3.5 text-accent" /> {job.experience}</span>
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed mb-6">{job.description}</p>
                </div>
                <div className="flex justify-between items-center border-t border-gray-100 pt-6">
                  <span className="text-sm font-serif font-semibold text-primary">{job.salary}</span>
                  <button 
                    onClick={() => {
                      setRole(job.title);
                      document.getElementById('apply-form-section').scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="bg-primary hover:bg-accent text-white px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300"
                  >
                    Quick Apply
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-1 md:col-span-2 bg-white p-12 text-center rounded-3xl border border-gray-100 shadow-sm">
              <p className="text-gray-500 font-semibold mb-4">No jobs match your search parameters.</p>
              <button 
                onClick={() => { setKeyword(''); setLocation(''); setSelectedDept('All'); }}
                className="bg-accent text-white px-6 py-2 rounded-full text-xs uppercase tracking-wider font-bold"
              >
                Reset Search
              </button>
            </div>
          )}
        </div>
      </section>

      {/* 4. APPLY FORM SECTION */}
      <section id="apply-form-section" className="max-w-4xl mx-auto px-6 md:px-12 mt-12 py-24 bg-white rounded-3xl border border-gray-100 shadow-xl" data-aos="fade-up">
        <div className="text-left mb-12">
          <h2 className="font-serif text-3xl font-bold text-primary mb-3">Apply Directly via WhatsApp</h2>
          <p className="text-gray-500 font-medium">No resume uploads required. Provide details below and route immediately via secure WhatsApp Click-to-Chat.</p>
        </div>

        <form onSubmit={handleApplySubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Full Name */}
            <div className="relative text-left">
              <label htmlFor="fullName" className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-2">Full Name *</label>
              <input 
                id="fullName"
                type="text" 
                placeholder="e.g. John Doe"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className={`w-full bg-bg-neutral border-0 focus:ring-1 focus:ring-accent focus:bg-white rounded-xl px-4 py-3.5 text-sm text-primary font-medium transition-all ${
                  errors.fullName ? 'ring-1 ring-red-500' : ''
                }`}
              />
              {errors.fullName && (
                <span className="text-red-500 text-xs font-bold mt-1 flex items-center gap-1"><AlertCircle className="h-3 w-3" /> {errors.fullName}</span>
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Email Address */}
            <div className="relative text-left">
              <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-2">Email Address *</label>
              <input 
                id="email"
                type="email" 
                placeholder="e.g. john@example.com"
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

            {/* Role Applying For */}
            <div className="relative text-left">
              <label htmlFor="role" className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-2">Role Applying For *</label>
              <input 
                id="role"
                type="text" 
                placeholder="e.g. Senior Software Engineer"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className={`w-full bg-bg-neutral border-0 focus:ring-1 focus:ring-accent focus:bg-white rounded-xl px-4 py-3.5 text-sm text-primary font-medium transition-all ${
                  errors.role ? 'ring-1 ring-red-500' : ''
                }`}
              />
              {errors.role && (
                <span className="text-red-500 text-xs font-bold mt-1 flex items-center gap-1"><AlertCircle className="h-3 w-3" /> {errors.role}</span>
              )}
            </div>
          </div>

          {/* LinkedIn Profile */}
          <div className="relative text-left">
            <label htmlFor="linkedin" className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-2">LinkedIn Profile Link (Optional)</label>
            <input 
              id="linkedin"
              type="text" 
              placeholder="e.g. https://linkedin.com/in/username"
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
              className={`w-full bg-bg-neutral border-0 focus:ring-1 focus:ring-accent focus:bg-white rounded-xl px-4 py-3.5 text-sm text-primary font-medium transition-all ${
                errors.linkedin ? 'ring-1 ring-red-500' : ''
              }`}
            />
            {errors.linkedin && (
              <span className="text-red-500 text-xs font-bold mt-1 flex items-center gap-1"><AlertCircle className="h-3 w-3" /> {errors.linkedin}</span>
            )}
          </div>

          {/* Cover Message */}
          <div className="relative text-left">
            <label htmlFor="message" className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-2">Introduction / Cover Note *</label>
            <textarea 
              id="message"
              rows="4"
              placeholder="Briefly tell us about your experience and why you are applying..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className={`w-full bg-bg-neutral border-0 focus:ring-1 focus:ring-accent focus:bg-white rounded-xl px-4 py-3.5 text-sm text-primary font-medium transition-all resize-none ${
                errors.message ? 'ring-1 ring-red-500' : ''
              }`}
            />
            {errors.message && (
              <span className="text-red-500 text-xs font-bold mt-1 flex items-center gap-1"><AlertCircle className="h-3 w-3" /> {errors.message}</span>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary hover:bg-accent text-white font-bold py-4 rounded-xl uppercase tracking-wider text-sm flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-lg disabled:opacity-75"
          >
            <MessageCircle className="h-5 w-5 text-accent-light" />
            {isSubmitting ? 'Redirecting to WhatsApp...' : 'Submit Application via WhatsApp'}
          </button>
        </form>
      </section>

      {/* Floating Success Toast / Redirect Dialog */}
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
                We are opening WhatsApp to transmit your job application directly to the Ivory Squid operations channel.
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
