import { useEffect, useRef } from 'react';

const services = [
  {
    title: 'Surveying & Mapping',
    img: '/card-1.jpg',
    deliverables: [
      'Topographic surveys to sub-centimeter precision',
      'Digital terrain & surface models',
      'Point cloud processing (.LAS/.LAZ)',
      'Contour map & volume calculations',
      'GIS-ready orthomosaic exports',
    ],
  },
  {
    title: 'Aerial Inspections',
    img: '/card-2.jpg',
    deliverables: [
      'Infrastructure & asset inspection',
      'High-resolution visual documentation',
      'Defect identification & annotation',
      'Condition assessment reports',
      'Asset lifecycle tracking',
    ],
  },
  {
    title: 'Photogrammetry & 3D Modeling',
    img: '/card-3.jpg',
    deliverables: [
      'Millimeter-accurate 3D mesh models',
      'Point cloud acquisition & processing',
      'BIM-ready exports (IFC, RCP)',
      'Structural & volumetric analysis',
      'As-built documentation',
    ],
  },
  {
    title: 'Thermal Imaging',
    img: '/card-4.jpg',
    deliverables: [
      'Radiometric thermal orthomosaics',
      'Heat signature mapping & analysis',
      'Moisture & leak detection surveys',
      'Energy audit reporting',
      'Solar panel efficiency inspection',
    ],
  },
  {
    title: 'Construction Progress',
    img: '/card-5.jpg',
    deliverables: [
      'Weekly site progress documentation',
      'Cut & fill volumetric analysis',
      'Timeline & milestone comparison',
      'Earthworks & grading monitoring',
      'Stakeholder reporting dashboards',
    ],
  },
  {
    title: 'Agriculture Analysis',
    img: '/card-6.jpg',
    deliverables: [
      'NDVI crop health maps',
      'Irrigation system analysis',
      'Yield estimation modelling',
      'Pest & disease early detection',
      'Multi-season comparison overlays',
    ],
  },
];

export default function Services() {
  const ref = useRef(null);

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
      { threshold: 0.05 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="services" ref={ref} className="relative z-10 py-24 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-14 fade-section">
          <span className="section-label">What We Do</span>
          <h2 className="section-title text-3xl md:text-4xl lg:text-5xl mt-1">
            Services &{' '}
            <span style={{
              background: 'linear-gradient(135deg, #4facfe, #1E90FF)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Deliverables
            </span>
          </h2>
          <p className="text-brand-white/50 mt-4 max-w-xl font-inter">
            Every engagement produces processed, analysis-ready data — not just raw footage.
          </p>
        </div>

        {/* 3 × 2 card grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map(({ title, img, deliverables }, i) => (
            <ServiceCard
              key={title}
              title={title}
              img={img}
              deliverables={deliverables}
              delay={i * 90}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-14 fade-section" style={{ transitionDelay: '600ms' }}>
          <a href="#contact" className="btn-primary">
            Get a Custom Quote
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ title, img, deliverables, delay }) {
  return (
    <div
      className="fade-section group flex flex-col rounded-2xl overflow-hidden cursor-pointer"
      style={{
        transitionDelay: `${delay}ms`,
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.07)',
        boxShadow: '0 8px 40px rgba(0,0,0,0.45)',
        transition: 'opacity 0.7s ease, transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-6px)';
        e.currentTarget.style.borderColor = 'rgba(30,144,255,0.28)';
        e.currentTarget.style.boxShadow = '0 20px 56px rgba(0,0,0,0.55), 0 0 32px rgba(30,144,255,0.1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
        e.currentTarget.style.boxShadow = '0 8px 40px rgba(0,0,0,0.45)';
      }}
    >
      {/* Image */}
      <div className="relative overflow-hidden" style={{ paddingBottom: '58%' }}>
        <img
          src={img}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {/* Bottom gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, transparent 50%, rgba(10,10,10,0.85) 100%)',
          }}
        />
        {/* Title overlay on image */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="font-grotesk font-bold text-brand-white text-lg leading-tight">
            {title}
          </h3>
        </div>
      </div>

      {/* Deliverables list */}
      <div className="flex flex-col gap-0 px-5 py-4 flex-1">
        {deliverables.map((item) => (
          <div key={item} className="flex items-start gap-2.5 py-1.5 border-b border-white/[0.05] last:border-0">
            <svg
              className="w-3.5 h-3.5 flex-shrink-0 mt-[3px]"
              style={{ color: '#1E90FF' }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
            <span className="font-inter text-xs text-brand-white/55 leading-snug">{item}</span>
          </div>
        ))}

        {/* Learn more link */}
        <div className="mt-3 pt-1">
          <a
            href="#contact"
            className="inline-flex items-center gap-1.5 text-xs font-inter font-medium text-brand-blue/80 hover:text-brand-blue transition-colors duration-200"
          >
            Request This Service
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
