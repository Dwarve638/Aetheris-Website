import { useEffect, useRef } from 'react';

const plans = [
  {
    name: 'Site Survey',
    price: '$499',
    unit: '/site',
    desc: 'Perfect for one-off site assessments and single-location projects.',
    features: [
      'Single site up to 50 acres',
      '2D orthomosaic map',
      'Digital elevation model',
      'Point cloud export (.LAS)',
      '48-hour turnaround',
      'PDF report included',
      'Email support',
    ],
    cta: 'Get Started',
    highlight: false,
  },
  {
    name: 'Project Bundle',
    price: '$1,499',
    unit: '/month',
    desc: 'For active projects with ongoing monitoring and multi-deliverable needs.',
    badge: 'Most Popular',
    features: [
      'Up to 5 sites per month',
      'Full 3D mesh model',
      'LiDAR point cloud',
      'Progress comparison reports',
      'Priority 24-hour turnaround',
      'Client dashboard access',
      'Dedicated project manager',
      'Priority phone support',
    ],
    cta: 'Get Started',
    highlight: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    unit: '',
    desc: 'Tailored solutions for large-scale operations and multi-location campaigns.',
    features: [
      'Unlimited sites & flights',
      'Dedicated pilot team',
      'API data integration',
      'White-label deliverables',
      'Custom reporting formats',
      'SLA with guaranteed uptime',
      'On-site team embedding',
      'Executive account manager',
    ],
    cta: 'Contact Sales',
    highlight: false,
  },
];

export default function Pricing() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.querySelectorAll('.fade-section').forEach((el, i) => {
            setTimeout(() => el.classList.add('visible'), i * 120);
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
    <section id="pricing" ref={ref} className="relative z-10 py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 fade-section">
          <span className="section-label">Pricing</span>
          <h2 className="section-title text-3xl md:text-4xl lg:text-5xl mt-1">
            Transparent pricing,{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #4facfe, #1E90FF)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              no surprises
            </span>
          </h2>
          <p className="text-brand-white/50 mt-4 max-w-lg mx-auto font-inter">
            Every plan includes processed deliverables, not just raw footage. What you receive is ready to use.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {plans.map(({ name, price, unit, desc, features, cta, highlight, badge }, i) => (
            <div
              key={name}
              className={`fade-section flex flex-col rounded-2xl p-7 relative ${
                highlight ? '' : 'glass-card'
              }`}
              style={{
                transitionDelay: `${i * 120}ms`,
                ...(highlight
                  ? {
                      background: 'linear-gradient(145deg, rgba(30,144,255,0.12) 0%, rgba(21,101,192,0.08) 100%)',
                      border: '1px solid rgba(30,144,255,0.35)',
                      boxShadow: '0 0 48px rgba(30,144,255,0.15), 0 16px 48px rgba(0,0,0,0.5)',
                    }
                  : {}),
              }}
            >
              {badge && (
                <div
                  className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-grotesk font-semibold tracking-wide"
                  style={{
                    background: 'linear-gradient(135deg, #1E90FF, #1565C0)',
                    color: '#fff',
                    boxShadow: '0 0 16px rgba(30,144,255,0.5)',
                  }}
                >
                  {badge}
                </div>
              )}

              <div className="mb-5">
                <h3 className="font-grotesk font-bold text-brand-white text-xl mb-1">{name}</h3>
                <p className="text-xs font-inter text-brand-white/45 leading-snug">{desc}</p>
              </div>

              <div className="flex items-end gap-1 mb-6">
                <span
                  className="font-grotesk font-bold text-brand-white"
                  style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', lineHeight: 1 }}
                >
                  {price}
                </span>
                {unit && (
                  <span className="text-brand-white/40 font-inter text-sm mb-1">{unit}</span>
                )}
              </div>

              <ul className="flex flex-col gap-2.5 mb-8 flex-1">
                {features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <svg
                      className="w-4 h-4 flex-shrink-0 mt-0.5"
                      style={{ color: '#1E90FF' }}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm font-inter text-brand-white/60">{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className={highlight ? 'btn-primary justify-center' : 'btn-secondary justify-center'}
              >
                {cta}
              </a>
            </div>
          ))}
        </div>

        <p className="fade-section text-center text-xs text-brand-white/30 font-inter mt-8">
          All prices exclude applicable taxes. Multi-site discounts available. Contact us for volume pricing.
        </p>
      </div>
    </section>
  );
}
