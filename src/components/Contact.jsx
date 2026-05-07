import { useEffect, useRef, useState } from 'react';

const projectTypes = [
  'Construction Progress Monitoring',
  'Topographic Survey',
  'Volumetric Analysis',
  'Infrastructure Inspection',
  'Mining Site Survey',
  'Agricultural Mapping',
  'Other',
];

export default function Contact() {
  const ref = useRef(null);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    projectType: '',
    message: '',
  });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.querySelectorAll('.fade-section').forEach((el, i) => {
            setTimeout(() => el.classList.add('visible'), i * 100);
          });
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputBase =
    'w-full rounded-xl px-4 py-3.5 font-inter text-sm text-brand-white placeholder-brand-white/25 outline-none transition-all duration-200';
  const inputStyle = {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)',
  };
  const inputFocusStyle = {
    borderColor: 'rgba(30,144,255,0.45)',
    boxShadow: '0 0 0 3px rgba(30,144,255,0.08)',
  };

  return (
    <section id="contact" ref={ref} className="relative z-10 py-24 px-4">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 50% 40% at 50% 60%, rgba(30,144,255,0.06) 0%, transparent 70%)',
        }}
      />
      <div className="max-w-3xl mx-auto relative">
        <div className="text-center mb-12 fade-section">
          <span className="section-label">Get a Quote</span>
          <h2 className="section-title text-3xl md:text-4xl lg:text-5xl mt-1">
            Ready to{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #4facfe, #1E90FF)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              fly?
            </span>
          </h2>
          <p className="text-brand-white/50 mt-4 font-inter">
            Tell us about your project and we'll send a custom proposal within 24 hours.
          </p>
        </div>

        <div className="glass-card p-8 md:p-10 fade-section" style={{ transitionDelay: '100ms' }}>
          {submitted ? (
            <div className="text-center py-8 flex flex-col items-center gap-4">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(30,144,255,0.15)', border: '1px solid rgba(30,144,255,0.3)' }}
              >
                <svg className="w-8 h-8 text-brand-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="font-grotesk font-bold text-brand-white text-2xl">Message Received</h3>
              <p className="text-brand-white/50 font-inter max-w-sm">
                Thanks, {form.name.split(' ')[0]}! We'll review your project details and get back to you within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact-name" className="text-xs font-inter text-brand-white/40 tracking-wide">
                    Full Name <span className="text-brand-blue">*</span>
                  </label>
                  <input
                    id="contact-name"
                    required
                    type="text"
                    placeholder="Alex Johnson"
                    className={inputBase}
                    style={inputStyle}
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                    onBlur={(e) => Object.assign(e.target.style, inputStyle)}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact-email" className="text-xs font-inter text-brand-white/40 tracking-wide">
                    Email Address <span className="text-brand-blue">*</span>
                  </label>
                  <input
                    id="contact-email"
                    required
                    type="email"
                    placeholder="alex@company.com"
                    className={inputBase}
                    style={inputStyle}
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                    onBlur={(e) => Object.assign(e.target.style, inputStyle)}
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact-company" className="text-xs font-inter text-brand-white/40 tracking-wide">
                    Company
                  </label>
                  <input
                    id="contact-company"
                    type="text"
                    placeholder="Acme Construction Ltd."
                    className={inputBase}
                    style={inputStyle}
                    value={form.company}
                    onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
                    onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                    onBlur={(e) => Object.assign(e.target.style, inputStyle)}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact-project-type" className="text-xs font-inter text-brand-white/40 tracking-wide">
                    Project Type
                  </label>
                  <select
                    id="contact-project-type"
                    className={inputBase + ' cursor-pointer'}
                    style={{ ...inputStyle, appearance: 'none', backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%231E90FF'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center', backgroundSize: '16px' }}
                    value={form.projectType}
                    onChange={(e) => setForm((f) => ({ ...f, projectType: e.target.value }))}
                  >
                    <option value="" disabled>Select type...</option>
                    {projectTypes.map((t) => (
                      <option key={t} value={t} style={{ background: '#0A0A0A' }}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="contact-message" className="text-xs font-inter text-brand-white/40 tracking-wide">
                  Project Details <span className="text-brand-blue">*</span>
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={4}
                  placeholder="Tell us about your site — location, approximate acreage, terrain type, timeline, and any specific deliverables you need."
                  className={inputBase + ' resize-none'}
                  style={inputStyle}
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                  onBlur={(e) => Object.assign(e.target.style, inputStyle)}
                />
              </div>

              <button type="submit" className="btn-primary justify-center mt-1">
                Send Project Brief
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
              <p className="text-center text-xs text-brand-white/20 font-inter mt-1">
                Connect a form provider (Formspree, Netlify Forms, or your own API) to capture submissions.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
