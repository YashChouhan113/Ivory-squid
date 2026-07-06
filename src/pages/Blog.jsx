import { Link, Routes, Route, useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, User, Calendar, ArrowLeft, ArrowRight } from 'lucide-react';
import { BLOGS } from '../config/constants';

// Custom Markdown Renderer to render blog content beautifully without extra libraries
function renderMarkdown(content) {
  if (!content) return null;
  const lines = content.split('\n');
  return lines.map((line, idx) => {
    const trimmed = line.trim();
    if (trimmed.startsWith('# ')) {
      return (
        <h1 key={idx} className="font-serif text-3xl md:text-4xl font-bold mt-10 mb-4 text-primary text-left">
          {trimmed.slice(2)}
        </h1>
      );
    }
    if (trimmed.startsWith('## ')) {
      return (
        <h2 key={idx} className="font-serif text-2xl font-bold mt-8 mb-4 text-primary text-left">
          {trimmed.slice(3)}
        </h2>
      );
    }
    if (trimmed.startsWith('### ')) {
      return (
        <h3 key={idx} className="font-serif text-xl font-bold mt-6 mb-3 text-primary text-left">
          {trimmed.slice(4)}
        </h3>
      );
    }
    if (trimmed.startsWith('- ')) {
      return (
        <li key={idx} className="list-disc ml-6 mb-2 text-gray-600 text-sm text-left leading-relaxed">
          {trimmed.slice(2)}
        </li>
      );
    }
    if (trimmed === '') {
      return <div key={idx} className="h-4" />;
    }
    
    // Bold parsing: **text** -> <strong>text</strong>
    const boldRegex = /\*\*(.*?)\*\*/g;
    let parts = [];
    let lastIndex = 0;
    let match;
    
    while ((match = boldRegex.exec(trimmed)) !== null) {
      if (match.index > lastIndex) {
        parts.push(trimmed.substring(lastIndex, match.index));
      }
      parts.push(<strong key={match.index} className="font-extrabold text-primary">{match[1]}</strong>);
      lastIndex = boldRegex.lastIndex;
    }
    
    if (lastIndex < trimmed.length) {
      parts.push(trimmed.substring(lastIndex));
    }
    
    return (
      <p key={idx} className="text-gray-600 text-base leading-relaxed mb-4 text-left">
        {parts.length > 0 ? parts : trimmed}
      </p>
    );
  });
}

// Sub-component: Blog Grid Listing
function BlogList() {
  return (
    <div className="bg-bg-neutral pb-24">
      {/* Hero */}
      <section className="bg-primary text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(20,80,196,0.2),transparent_60%)]" />
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 text-center">
          <span className="text-accent-light font-bold text-xs uppercase tracking-widest block mb-4">INSIGHTS</span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
            Our Corporate Blog
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
            Stay updated with recruitment strategies, hiring trends, outsourcing insights, and professional growth in India.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="py-24 max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BLOGS.map((post, idx) => (
            <article 
              key={post.id}
              data-aos="fade-up"
              data-aos-delay={idx * 100}
              className="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden text-left group"
            >
              <div className="p-8">
                <span className="px-3 py-1 rounded-full bg-accent/5 text-accent text-xs font-bold block w-fit mb-4">
                  {post.category}
                </span>
                <h3 className="font-serif text-xl font-bold text-primary mb-3 line-clamp-2 group-hover:text-accent transition-colors duration-200">
                  <Link to={`/blog/${post.id}`}>{post.title}</Link>
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3">
                  {post.excerpt}
                </p>
              </div>
              <div className="p-8 pt-0 mt-auto border-t border-gray-50 flex items-center justify-between">
                <div className="flex gap-4 text-xs font-semibold text-gray-400">
                  <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> {post.date}</span>
                  <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {post.readTime}</span>
                </div>
                <Link 
                  to={`/blog/${post.id}`} 
                  className="text-xs font-bold uppercase tracking-wider text-accent flex items-center gap-1 group-hover:text-primary transition-colors duration-200"
                >
                  Read
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

// Sub-component: Blog Detail View
function BlogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = BLOGS.find(b => b.id === parseInt(id));

  if (!post) {
    return (
      <div className="py-32 text-center">
        <h2 className="font-serif text-2xl font-bold text-primary mb-4">Article Not Found</h2>
        <button 
          onClick={() => navigate('/blog')}
          className="bg-accent text-white px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider"
        >
          Back to Blog
        </button>
      </div>
    );
  }

  return (
    <article className="bg-bg-neutral pb-24 text-left">
      {/* Header Container */}
      <section className="bg-primary text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(20,80,196,0.2),transparent_60%)]" />
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <Link 
            to="/blog"
            className="text-gray-400 hover:text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 mb-8 w-fit transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Articles
          </Link>
          <span className="px-3 py-1 rounded-full bg-accent-light/10 border border-accent-light/20 text-accent-light text-xs font-bold w-fit block mb-4">
            {post.category}
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold leading-tight tracking-tight mb-6">
            {post.title}
          </h1>
          <div className="flex flex-wrap gap-6 text-sm text-gray-400 font-medium">
            <span className="flex items-center gap-1.5"><User className="h-4 w-4 text-accent-light" /> By {post.author}</span>
            <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4 text-accent-light" /> {post.date}</span>
            <span className="flex items-center gap-1.5"><Clock className="h-4 w-4 text-accent-light" /> {post.readTime}</span>
          </div>
        </div>
      </section>

      {/* Body Content Container */}
      <section className="max-w-4xl mx-auto px-6 py-16 mt-12 bg-white rounded-3xl border border-gray-100 shadow-sm">
        <div className="prose max-w-none">
          {renderMarkdown(post.content)}
        </div>
        
        {/* Author Bio Box */}
        <div className="mt-16 pt-8 border-t border-gray-100 flex flex-col sm:flex-row gap-6 items-center">
          <div className="h-14 w-14 rounded-full bg-accent/10 text-accent flex items-center justify-center font-serif text-xl font-bold shrink-0">
            {post.author.split(' ').map(n=>n[0]).join('')}
          </div>
          <div>
            <h4 className="font-serif text-base font-bold text-primary">Written by {post.author}</h4>
            <p className="text-gray-400 text-xs mt-0.5">Corporate Operations & Strategy Lead, Ivory Squid Pvt Ltd</p>
          </div>
        </div>
      </section>
    </article>
  );
}

// Master Router Component
export default function Blog() {
  return (
    <Routes>
      <Route path="/" element={<BlogList />} />
      <Route path="/:id" element={<BlogDetail />} />
    </Routes>
  );
}
