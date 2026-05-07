import { useEffect, useRef } from 'react';

const features = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: 'Centimeter Accuracy',
    desc: 'RTK-GPS and ground control points deliver survey-grade precision you can stake, certify, and build on with confidence.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: '24-Hour Deployment',
    desc: 'From project briefing to wheels-up in under 24 hours. Our mobilization process is built to move at your project\'s pace.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 9m0 8V9m0 0L9 7" />
      </svg>
    ),
    title: 'Full Data Processing',
    desc: 'Raw flight data is transformed in-house into orthomosaics, LiDAR point clouds, 3D mesh models, and elevation maps.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: 'Live Flight Tracking',
    desc: 'Monitor every mission in real time through your secure project dashboard — coverage maps, progress, and status updates.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: 'Fully Certified & Insured',
    desc: 'FAA Part 107 certified pilots, $5M liability coverage, and every flight plan filed and approved before we launch.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Multi-Site Campaigns',
    desc: 'Coordinate surveys across dozens of locations under one project umbrella — unified reporting, consistent methodology.',
  },
];

export default function Features() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.querySelectorAll('.fade-section').forEach((card, i) => {
            setTimeout(() => card.classList.add('visible'), i * 100);
          });
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="features" ref={ref} className="relative z-10 py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 fade-section">
          <span className="section-label">What You Get</span>
          <h2 className="section-title text-3xl md:text-4xl lg:text-5xl mt-1">
            Built for projects that{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #4facfe, #1E90FF)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              can't afford errors
            </span>
          </h2>
          <p className="text-brand-white/50 mt-4 max-w-xl mx-auto font-inter">
            Every deliverable is built to the standard your engineers, surveyors, and stakeholders actually need.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map(({ icon, title, desc }, i) => (
            <div
              key={title}
              className="glass-card p-6 fade-section flex flex-col gap-4"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{
                  background: 'rgba(30,144,255,0.12)',
                  border: '1px solid rgba(30,144,255,0.2)',
                  color: '#1E90FF',
                }}
              >
                {icon}
              </div>
              <div>
                <h3 className="font-grotesk font-semibold text-brand-white text-lg mb-1.5">{title}</h3>
                <p className="font-inter text-sm text-brand-white/50 leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
