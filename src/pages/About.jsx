import { motion } from 'framer-motion';
import { Target, Eye, Shield, Users, Award, TrendingUp } from 'lucide-react';
import founderImg from '../assets/founder.jpg';

export default function About() {
  const values = [
    {
      title: "Discipline",
      desc: "We adhere strictly to operational protocols, SLAs, and screening guidelines to guarantee client satisfaction.",
      icon: Shield,
      color: "bg-blue-50 text-accent"
    },
    {
      title: "Consistency",
      desc: "Our delivery standard does not waver. We maintain a reliable candidate pipeline month-over-month.",
      icon: TrendingUp,
      color: "bg-purple-50 text-purple-600"
    },
    {
      title: "Dedication",
      desc: "We align closely with client corporate cultures, working as strategic extensions of their internal teams.",
      icon: Users,
      color: "bg-amber-50 text-amber-500"
    },
    {
      title: "Results",
      desc: "We evaluate our effectiveness based on concrete performance metrics: low turnover and fast onboarding.",
      icon: Award,
      color: "bg-emerald-50 text-emerald-600"
    }
  ];

  const milestones = [
    {
      year: "2024",
      title: "The Inception",
      desc: "Ivory Squid Pvt Ltd was founded in Indore, India by Sameeksha Shrivas, focused initially on local IT recruitment."
    },
    {
      year: "2025",
      title: "BPO & KPO Scaling",
      desc: "Expanded services to include custom business process outsourcing and research operations nodes in Madhya Pradesh."
    },
    {
      year: "2026",
      title: "Pan-India Expansion",
      desc: "Established a hybrid digital sourcing model with active placement operations running nationwide across 12 states."
    }
  ];

  return (
    <div className="overflow-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative bg-primary text-white py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(20,80,196,0.25),transparent_60%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
              Our Journey & Vision
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
              Empowering organizations with exceptional human capital and delivering high-quality business process solutions nationwide.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. COMPANY STORY SECTION */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-6 text-left" data-aos="fade-right">
            <h4 className="text-xs uppercase tracking-widest text-accent font-bold mb-3">OUR ORIGIN</h4>
            <h2 className="font-serif text-3xl md:text-4xl font-bold tracking-tight text-primary mb-6">
              Redefining Recruitment in Indore and Beyond
            </h2>
            <div className="space-y-4 text-gray-500 font-medium leading-relaxed">
              <p>
                Ivory Squid Private Limited was established in Indore, India, as a response to a critical gap in the corporate recruitment ecosystem: the need for reliable, deeply vetted, and operationally aligned talent acquisition.
              </p>
              <p>
                Traditional staffing methods often prioritize resume quantity over candidate quality, leading to high turnover and prolonged hiring timelines. Ivory Squid introduced a process-driven methodology based on robust technical assessments, behavioral filtering, and corporate matching metrics.
              </p>
              <p>
                Today, the company acts as a strategic operations and staffing partner for enterprise clients across India, maintaining high standards in Executive Recruitment, BPO operations support, Knowledge Process Outsourcing (KPO), and comprehensive RPO management.
              </p>
            </div>
          </div>

          <div className="lg:col-span-6" data-aos="fade-left">
            <div className="bg-bg-neutral p-10 rounded-3xl border border-gray-100 shadow-lg text-left relative overflow-hidden">
              <div className="absolute top-0 right-0 h-32 w-32 bg-accent/5 rounded-full blur-xl pointer-events-none" />
              
              <h3 className="font-serif text-2xl font-bold text-primary mb-6">Mission & Vision</h3>
              
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="h-10 w-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center shrink-0">
                    <Target className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-serif text-lg font-bold text-primary mb-1">Our Mission</h4>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      To empower companies with high-performing talent networks and optimize workflows through disciplined outsourcing, fostering long-term organizational success.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="h-10 w-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center shrink-0">
                    <Eye className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-serif text-lg font-bold text-primary mb-1">Our Vision</h4>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      To grow into a globally trusted corporate recruitment and staffing brand rooted in discipline, operational transparency, and candidate matching integrity.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CORE VALUES SECTION */}
      <section className="py-24 bg-bg-neutral border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <div className="max-w-3xl mx-auto mb-16" data-aos="fade-up">
            <h4 className="text-xs uppercase tracking-widest text-accent font-bold mb-3">OUR CORE VALUES</h4>
            <h2 className="font-serif text-3xl md:text-4xl font-bold tracking-tight text-primary mb-4">
              Built on Discipline and Performance
            </h2>
            <p className="text-gray-500 font-medium">
              We live and work by these foundational pillars to drive growth for our partners.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((val, idx) => {
              const Icon = val.icon;
              return (
                <div 
                  key={idx}
                  data-aos="fade-up"
                  data-aos-delay={idx * 100}
                  className="bg-white p-8 rounded-2xl border border-gray-100 hover:border-accent hover:shadow-xl transition-all duration-300 text-left group"
                >
                  <div className={`h-12 w-12 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 ${val.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-serif text-xl font-bold mb-3 text-primary">{val.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{val.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. TIMELINE SECTION */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center max-w-3xl mx-auto mb-20" data-aos="fade-up">
            <h4 className="text-xs uppercase tracking-widest text-accent font-bold mb-3">MILESTONES</h4>
            <h2 className="font-serif text-3xl md:text-4xl font-bold tracking-tight text-primary mb-4">
              Our Journey of Growth
            </h2>
            <p className="text-gray-500 font-medium">
              A brief overview of how Ivory Squid has expanded its footprint across India.
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            {/* Center Vertical Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-gray-100 timeline-line md:-translate-x-1/2" />

            <div className="space-y-16">
              {milestones.map((milestone, idx) => {
                const isEven = idx % 2 === 0;
                return (
                  <div 
                    key={idx} 
                    className={`flex flex-col md:flex-row relative items-start ${
                      isEven ? 'md:flex-row-reverse' : ''
                    }`}
                    data-aos="fade-up"
                  >
                    {/* Circle Dot Marker */}
                    <div className="absolute left-4 md:left-1/2 top-1.5 h-6.5 w-6.5 rounded-full border-4 border-white bg-accent shadow-md md:-translate-x-1/2 z-10" />

                    {/* Timeline Card */}
                    <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${
                      isEven ? 'md:pr-12 text-left md:text-right' : 'md:pl-12 text-left'
                    }`}>
                      <span className="font-serif text-3xl font-black text-accent block mb-2">{milestone.year}</span>
                      <h3 className="font-serif text-xl font-bold text-primary mb-3">{milestone.title}</h3>
                      <p className="text-gray-500 text-sm leading-relaxed max-w-md md:mx-0 inline-block">{milestone.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
