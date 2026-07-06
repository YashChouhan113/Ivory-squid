import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import * as Icons from "lucide-react";
import { ArrowRight, Search, MapPin, Briefcase } from "lucide-react";
import CountUp from "react-countup";

// Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import { SERVICES, STATS, TESTIMONIALS, JOBS } from "../config/constants";
import founderImg from "../assets/founder.jpg";

// Dynamic Icon Renderer
function DynamicIcon({ name, className }) {
  const IconComponent = Icons[name] || Icons.HelpCircle;
  return <IconComponent className={className} />;
}

export default function Home() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchLocation, setSearchLocation] = useState("");

  // Custom Intersection Observer for stats counter
  const [startCount, setStartCount] = useState(false);
  const statsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStartCount(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(
      `/get-hire?q=${encodeURIComponent(searchQuery)}&l=${encodeURIComponent(searchLocation)}`,
    );
  };

  return (
    <div className="overflow-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-fit md:min-h-[90vh] flex items-center justify-center bg-bg-neutral pt-8 pb-12 md:pt-16 md:pb-20 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute top-1/4 left-10 w-72 h-72 bg-accent/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse duration-7000" />

        {/* Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero Left Content */}
          <div className="lg:col-span-7 text-left ">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent font-semibold text-xs uppercase tracking-wider mb-3"
            >
              <span className="flex h-2 w-2 rounded-full bg-accent animate-ping" />
              Pan-India Staffing & RPO Partner
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1] text-primary mb-6"
            >
              Connecting <span className="text-accent">Exceptional Talent</span>{" "}
              with Leading Companies.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-gray-600 text-lg md:text-xl font-medium mb-10 max-w-xl leading-relaxed"
            >
              We deliver elite recruitment, staffing, BPO, KPO, and customized
              Recruitment Process Outsourcing (RPO) solutions engineered for
              growth.
            </motion.p>

            {/* Search Bar Form */}
            <motion.form
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              onSubmit={handleSearchSubmit}
              className="glass-card p-2.5 rounded-2xl md:rounded-full shadow-xl flex flex-col md:flex-row gap-3 max-w-2xl"
            >
              <div className="flex-1 flex items-center gap-3 px-4 py-2 border-b md:border-b-0 md:border-r border-gray-100">
                <Search className="h-5 w-5 text-gray-400 shrink-0" />
                <input
                  type="text"
                  placeholder="Job Title, Skills, or Keyword..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent border-0 focus:outline-none focus:ring-0 text-sm text-primary font-medium"
                />
              </div>
              <div className="flex-1 flex items-center gap-3 px-4 py-2">
                <MapPin className="h-5 w-5 text-gray-400 shrink-0" />
                <input
                  type="text"
                  placeholder="Location (e.g., Indore, Remote)..."
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  className="w-full bg-transparent border-0 focus:outline-none focus:ring-0 text-sm text-primary font-medium"
                />
              </div>
              <button
                type="submit"
                className="bg-primary hover:bg-accent text-white px-8 py-3.5 rounded-xl md:rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300 hover:shadow-lg hover:shadow-accent/20 shrink-0"
              >
                Find a Job
              </button>
            </motion.form>
          </div>

          {/* Hero Right Visual */}
          <div className="lg:col-span-5 hidden lg:block relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative w-full h-[500px] flex items-center justify-center"
            >
              {/* Background Accent Rings */}
              <div className="absolute inset-0 border border-primary/5 rounded-full scale-100 animate-[spin_60s_linear_infinite]" />
              <div className="absolute inset-4 border border-dashed border-accent/20 rounded-full scale-95 animate-[spin_40s_linear_infinite]" />

              {/* Central Floating Cards */}
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-1/4 left-0 glass-card p-5 rounded-2xl shadow-xl border border-white/60 flex items-center gap-4 max-w-[220px]"
              >
                <div className="h-10 w-10 rounded-full bg-accent/15 flex items-center justify-center text-accent">
                  <Briefcase className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Active Openings
                  </h4>
                  <p className="text-xl font-bold text-primary font-serif">
                    450+ Positions
                  </p>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 15, 0] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
                className="absolute bottom-1/4 right-0 bg-primary text-white p-5 rounded-2xl shadow-2xl flex items-center gap-4 max-w-[220px]"
              >
                <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center text-accent-light">
                  <Icons.CheckCircle className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white/55 uppercase tracking-wider">
                    Success Rate
                  </h4>
                  <p className="text-xl font-bold font-serif">98.4% Match</p>
                </div>
              </motion.div>

              {/* Ivory Squid Logo */}
              <motion.div
                animate={{ scale: [0.98, 1.02, 0.98] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="h-64 w-64 rounded-full bg-gradient-to-tr from-primary to-accent p-1 shadow-2xl"
              >
                <div className="h-full w-full rounded-full bg-bg-neutral flex flex-col items-center justify-center p-6 text-center">
                  <span className="font-serif text-5xl font-black text-primary">
                    IS
                  </span>
                  <span className="text-[10px] tracking-widest text-accent uppercase font-bold mt-1">
                    Ivory Squid
                  </span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. VALUE PROPOSITIONS (Why Ivory Squid) */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <div className="max-w-3xl mx-auto mb-16" data-aos="fade-up">
            <h2 className="font-serif text-3xl md:text-4xl font-bold tracking-tight text-primary mb-4">
              Why Partner with Ivory Squid?
            </h2>
            <p className="text-gray-500 font-medium">
              We leverage data-driven screening and nationwide networks to
              optimize your operational and strategic recruitment needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Rigorous Screening Process",
                desc: "We screen for technical competency and behavioral fit, reducing your interview-to-hire ratio by 60%.",
                icon: "ShieldCheck",
                color: "text-accent bg-accent/5",
              },
              {
                title: "Pan-India Sourcing Hub",
                desc: "Active scouting infrastructure covering Tier-1 and Tier-2 hubs like Indore, Bangalore, and Delhi.",
                icon: "MapPin",
                color: "text-purple-600 bg-purple-50",
              },
              {
                title: "Accelerated Turnaround",
                desc: "Our pre-vetted candidate pipeline enables qualified matches on your desk within 48-72 hours.",
                icon: "Zap",
                color: "text-amber-500 bg-amber-50",
              },
            ].map((prop, idx) => (
              <div
                key={idx}
                data-aos="fade-up"
                data-aos-delay={idx * 150}
                className="p-8 rounded-2xl bg-bg-neutral border border-gray-100 hover:border-accent hover:bg-white hover:shadow-xl transition-all duration-300 text-left group"
              >
                <div
                  className={`h-12 w-12 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 ${prop.color}`}
                >
                  <DynamicIcon name={prop.icon} className="h-6 w-6" />
                </div>
                <h3 className="font-serif text-xl font-bold mb-3 text-primary">
                  {prop.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {prop.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. ABOUT SUMMARY */}
      <section className="py-24 bg-bg-neutral border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-6 text-left" data-aos="fade-right">
            <h4 className="text-xs uppercase tracking-widest text-accent font-bold mb-3">
              WHO WE ARE
            </h4>
            <h2 className="font-serif text-3xl md:text-4xl font-bold tracking-tight text-primary mb-6">
              A Premium Recruitment & Outsourcing Partner Based in India.
            </h2>
            <div className="space-y-4 text-gray-500 font-medium leading-relaxed">
              <p>
                Ivory Squid Private Limited is a premier corporate staffing and
                process outsourcing firm based in Indore, India. We serve as a
                strategic liaison, connecting top-tier technical and executive
                talent with progressive enterprises across various sectors.
              </p>
              <p>
                We specialize in executing end-to-end recruitment pipelines,
                flexible staffing, and outsourcing operations (BPO, KPO, RPO).
                Our core vision is to build sustainable business partnerships by
                empowering organizations with exceptional human capital.
              </p>
            </div>
            <div className="mt-8">
              <Link
                to="/about"
                className="text-accent hover:text-primary font-bold inline-flex items-center gap-2 group transition-colors duration-200"
              >
                Read Our Mission Story
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1.5 transition-transform duration-200" />
              </Link>
            </div>
          </div>

          {/* Stats Section with In-view CountUp */}
          <div
            ref={statsRef}
            className="lg:col-span-6 grid grid-cols-2 gap-8 text-left bg-white p-10 rounded-3xl border border-gray-100 shadow-xl relative"
            data-aos="fade-left"
          >
            {STATS.map((stat, idx) => (
              <div
                key={idx}
                className="border-b border-gray-100 pb-6 last:border-b-0 md:even:border-b-0"
              >
                <span className="font-serif text-4xl md:text-5xl font-bold text-accent tracking-tight block mb-1">
                  {startCount ? (
                    <CountUp end={stat.value} duration={3.5} separator="," />
                  ) : (
                    "0"
                  )}
                  {stat.suffix}
                </span>
                <span className="text-xs uppercase tracking-widest text-gray-400 font-bold">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. WHAT WE DO (Services Grid) */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div
            className="text-center max-w-3xl mx-auto mb-16"
            data-aos="fade-up"
          >
            <h4 className="text-xs uppercase tracking-widest text-accent font-bold mb-3">
              OUR CAPABILITIES
            </h4>
            <h2 className="font-serif text-3xl md:text-4xl font-bold tracking-tight text-primary mb-4">
              Comprehensive Staffing & Outsourcing Ecosystem
            </h2>
            <p className="text-gray-500 font-medium">
              Maximize workflow efficiency and scale operations seamlessly with
              our core vertical business solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((service, idx) => (
              <div
                key={service.id}
                data-aos="fade-up"
                data-aos-delay={idx * 100}
                className="p-8 rounded-2xl border border-gray-100 hover:border-accent hover:shadow-xl transition-all duration-300 text-left bg-white flex flex-col justify-between group"
              >
                <div>
                  <div className="h-12 w-12 rounded-xl bg-accent/5 text-accent flex items-center justify-center mb-6 group-hover:bg-accent group-hover:text-white transition-all duration-300">
                    <DynamicIcon name={service.icon} className="h-6 w-6" />
                  </div>
                  <h3 className="font-serif text-xl font-bold mb-3 text-primary">
                    {service.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>
                <Link
                  to="/hire-talent"
                  className="text-xs font-bold uppercase tracking-wider text-accent group-hover:text-primary transition-colors duration-200 inline-flex items-center gap-1.5"
                >
                  Learn More
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FEATURED JOBS */}
      <section className="py-24 bg-bg-neutral border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div
            className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16"
            data-aos="fade-up"
          >
            <div className="text-left max-w-xl">
              <h4 className="text-xs uppercase tracking-widest text-accent font-bold mb-3">
                LATEST OPPORTUNITIES
              </h4>
              <h2 className="font-serif text-3xl md:text-4xl font-bold tracking-tight text-primary">
                Featured Careers
              </h2>
            </div>
            <Link
              to="/get-hire"
              className="text-accent hover:text-primary font-bold inline-flex items-center gap-2 group mt-4 md:mt-0 transition-colors duration-200"
            >
              Browse All Jobs
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1.5 transition-transform duration-200" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {JOBS.map((job, idx) => (
              <div
                key={job.id}
                data-aos="fade-up"
                data-aos-delay={idx * 150}
                className="bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 text-left flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start gap-4 mb-4">
                    <span className="px-3 py-1 rounded-full bg-accent/5 text-accent text-xs font-bold">
                      {job.department}
                    </span>
                    <span className="text-xs font-semibold text-gray-400">
                      {job.type}
                    </span>
                  </div>
                  <h3 className="font-serif text-lg md:text-xl font-bold text-primary mb-2">
                    {job.title}
                  </h3>
                  <div className="flex flex-wrap gap-4 text-xs font-semibold text-gray-400 mb-4">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5 text-accent" />{" "}
                      {job.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Briefcase className="h-3.5 w-3.5 text-accent" />{" "}
                      {job.experience}
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-2">
                    {job.description}
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 border-t border-gray-100 pt-6 mt-auto">
                  <span className="text-sm font-serif font-semibold text-primary">
                    {job.salary}
                  </span>
                  <Link
                    to={`/get-hire?jobId=${job.id}`}
                    className="bg-primary hover:bg-accent text-white px-4 py-2 md:px-5 md:py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 text-center"
                  >
                    Apply Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FOUNDER SECTION 
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
             Left Col: Photo 
            <div className="lg:col-span-5 relative" data-aos="fade-right">
               Decorative Background Box 
              <div className="absolute inset-4 -border border-2 border-accent rounded-3xl translate-x-4 translate-y-4 -z-10" />
              <div className="overflow-hidden rounded-3xl shadow-2xl relative border-8 border-white bg-white">
                <img 
                  src={founderImg} 
                  alt="Sameeksha Shrivas - Founder of Ivory Squid" 
                  className="w-full h-auto object-cover max-h-[550px] transform hover:scale-102 transition-transform duration-500"
                />
              </div>
            </div>

            {/* Right Col: Bio / Quote 
            <div className="lg:col-span-7 text-left" data-aos="fade-left">
              <h4 className="text-xs uppercase tracking-widest text-accent font-bold mb-3">LEADERSHIP VISION</h4>
              <h2 className="font-serif text-3xl md:text-4xl font-bold tracking-tight text-primary mb-6">
                Meet the Founder
              </h2>
              
              <blockquote className="relative mb-8 pl-6 border-l-4 border-accent">
                <p className="font-serif text-xl md:text-2xl text-gray-700 italic leading-relaxed">
                  "At Ivory Squid, our operating ethos centers on discipline, dedication, consistency, and results. We believe in building organizational frameworks where talent meets opportunity seamlessly, driving growth for both businesses and individuals."
                </p>
              </blockquote>

              <div className="space-y-4 text-gray-500 font-medium leading-relaxed mb-6">
                <p>
                  Sameeksha Shrivas founded Ivory Squid Pvt Ltd with the distinct objective of eliminating friction in corporate hiring across India. Under her stewardship, the firm has quickly scaled into a trusted recruitment partner known for operational precision, thorough vetting, and reliable SLA delivery.
                </p>
                <p>
                  Her background drives the firm's quality-first screening processes, ensuring that companies—from innovative tech startups to massive multi-city conglomerates—receive recruitment support tailored precisely to their operational scale.
                </p>
              </div>

              <div>
                <h4 className="font-serif text-lg font-bold text-primary">Sameeksha Shrivas</h4>
                <p className="text-xs font-bold text-accent uppercase tracking-widest mt-0.5">Founder & Managing Director, Ivory Squid Pvt Ltd</p>
              </div>
            </div>

          </div>
        </div> 
      </section> 

      {/* 7. TESTIMONIAL CAROUSEL */}
      <section className="py-24 bg-bg-neutral border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div
            className="text-center max-w-3xl mx-auto mb-16"
            data-aos="fade-up"
          >
            <h4 className="text-xs uppercase tracking-widest text-accent font-bold mb-3">
              TESTIMONIALS
            </h4>
            <h2 className="font-serif text-3xl md:text-4xl font-bold tracking-tight text-primary mb-4">
              What Our Partners Say
            </h2>
            <p className="text-gray-500 font-medium">
              Read how our tailored HR solutions have empowered enterprise
              operations nationwide.
            </p>
          </div>

          <div data-aos="fade-up" className="max-w-4xl mx-auto">
            <Swiper
              modules={[Pagination, Autoplay]}
              spaceBetween={30}
              slidesPerView={1}
              pagination={{ clickable: true }}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              className="pb-16"
            >
              {TESTIMONIALS.map((testimonial) => (
                <SwiperSlide key={testimonial.id}>
                  <div className="bg-white p-8 md:p-12 rounded-3xl shadow-lg border border-gray-100 text-center md:text-left flex flex-col md:flex-row gap-8 items-center">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="h-20 w-20 rounded-full object-cover border-4 border-accent/15 shrink-0"
                    />
                    <div>
                      <p className="text-gray-600 text-base md:text-lg italic leading-relaxed mb-6">
                        "{testimonial.text}"
                      </p>
                      <div>
                        <h4 className="font-serif text-base font-bold text-primary">
                          {testimonial.name}
                        </h4>
                        <p className="text-xs font-bold text-accent uppercase tracking-widest mt-0.5">
                          {testimonial.title}, {testimonial.company}
                        </p>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>

      {/* 8. SPLIT CTA BANNER */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Candidate CTA */}
            <div
              data-aos="fade-right"
              className="bg-primary text-white p-12 rounded-3xl relative overflow-hidden flex flex-col justify-between group"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(20,80,196,0.2),transparent_60%)]" />
              <div className="relative z-10">
                <span className="text-accent-light font-bold text-xs uppercase tracking-widest block mb-4">
                  FOR CANDIDATES
                </span>
                <h3 className="font-serif text-3xl md:text-4xl font-bold mb-4">
                  Looking for Your Next Career Milestone?
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-10 max-w-md">
                  Register with Ivory Squid, explore our premier open positions,
                  and get matched with organizations that value your expertise.
                </p>
              </div>
              <div className="relative z-10 mt-auto">
                <Link
                  to="/get-hire"
                  className="bg-white text-primary hover:bg-accent hover:text-white px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 inline-flex items-center gap-2"
                >
                  Submit Resume
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>

            {/* Corporate CTA */}
            <div
              data-aos="fade-left"
              className="bg-bg-neutral border border-gray-100 p-12 rounded-3xl relative overflow-hidden flex flex-col justify-between group"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(20,80,196,0.05),transparent_60%)]" />
              <div className="relative z-10">
                <span className="text-accent font-bold text-xs uppercase tracking-widest block mb-4">
                  FOR EMPLOYERS
                </span>
                <h3 className="font-serif text-3xl md:text-4xl font-bold mb-4 text-primary">
                  Need Exceptional Talent to Scale Operations?
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-10 max-w-md">
                  Outsource your recruitment process, secure flexible staff, or
                  build a dedicated KPO/BPO operations node in Indore.
                </p>
              </div>
              <div className="relative z-10 mt-auto">
                <Link
                  to="/hire-talent"
                  className="bg-accent text-white hover:bg-primary px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 inline-flex items-center gap-2"
                >
                  Request Talent
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
