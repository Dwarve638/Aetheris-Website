import { useEffect, useRef } from 'react';

const steps = [
  {
    num: '01',
    title: 'Request a Quote',
    desc: 'Describe your project — site location, area, deliverables needed. We respond with a custom scoped proposal within 24 hours.',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
      </svg>
    ),
  },
  {
    num: '02',
    title: 'We Deploy & Fly',
    desc: 'Our certified pilots mobilize to your site, execute the flight plan with enterprise-grade drones, and upload data directly to the cloud.',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
      </svg>
    ),
  },
  {
    num: '03',
    title: 'Receive Your Deliverables',
    desc: 'Download high-resolution orthomosaics, point clouds, 3D models, and inspection reports from your secure project dashboard.',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
      </svg>
    ),
  },
];

export default function HowItWorks() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.querySelectorAll('.fade-section').forEach((el, i) => {
            setTimeout(() => el.classList.add('visible'), i * 150);
          });
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="how-it-works" ref={ref} className="relative z-10 py-24 px-4">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(30,144,255,0.05) 0%, transparent 70%)',
        }}
      />
      <div className="max-w-5xl mx-auto relative">
        <div className="text-center mb-16 fade-section">
          <span className="section-label">The Process</span>
          <h2 className="section-title text-3xl md:text-4xl lg:text-5xl mt-1">
            From briefing to data —{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #4facfe, #1E90FF)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              in 3 steps
            </span>
          </h2>
        </div>

        <div className="relative grid md:grid-cols-3 gap-6">
          {/* Connector line — desktop only */}
          <div
            className="hidden md:block absolute top-14 left-1/6 right-1/6 h-px pointer-events-none"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(30,144,255,0.3) 20%, rgba(30,144,255,0.3) 80%, transparent)',
            }}
          />

          {steps.map(({ num, title, desc, icon }, i) => (
            <div
              key={num}
              className="glass-card p-7 flex flex-col gap-5 fade-section relative"
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              {/* Step number */}
              <div className="flex items-center justify-between">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{
                    background: 'rgba(30,144,255,0.12)',
                    border: '1px solid rgba(30,144,255,0.25)',
                    color: '#1E90FF',
                  }}
                >
                  {icon}
                </div>
                <span
                  className="font-grotesk font-bold text-4xl"
                  style={{
                    color: 'transparent',
                    WebkitTextStroke: '1px rgba(30,144,255,0.2)',
                  }}
                >
                  {num}
                </span>
              </div>
              <div>
                <h3 className="font-grotesk font-semibold text-brand-white text-xl mb-2">{title}</h3>
                <p className="font-inter text-sm text-brand-white/50 leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 fade-section" style={{ transitionDelay: '450ms' }}>
          <a href="#contact" className="btn-primary">
            Start Your Project
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
