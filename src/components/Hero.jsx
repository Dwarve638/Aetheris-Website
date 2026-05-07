import { useEffect, useRef, useState } from 'react';
import TerrainCanvas from './TerrainCanvas';
import AetherisBrand from './AetherisBrand';

function useCountUp(target, duration = 2000, active = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    const start = performance.now();
    const easeOutExpo = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));
    const step = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      setValue(Math.round(easeOutExpo(progress) * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [active, target, duration]);
  return value;
}

function StatCard({ value, suffix, label, active, delay, staticText }) {
  const count = useCountUp(value ?? 0, 2000, active && !staticText);
  return (
    <div className="fade-section flex flex-col items-center gap-1" style={{ transitionDelay: `${delay}ms` }}>
      <span className="font-grotesk font-bold text-3xl md:text-4xl text-brand-blue">
        {staticText ?? `${count}${suffix}`}
      </span>
      <span className="text-xs text-brand-white/50 font-inter tracking-wide">{label}</span>
    </div>
  );
}

export default function Hero() {
  const sectionRef = useRef(null);
  const [statsActive, setStatsActive] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.querySelectorAll('.fade-section').forEach((el, i) => {
            setTimeout(() => el.classList.add('visible'), i * 120);
          });
          setStatsActive(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative min-h-screen flex items-center pt-32 pb-16 px-4 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 80% 60% at 65% 50%, rgba(30,144,255,0.09) 0%, transparent 70%)',
      }} />
      <div className="absolute inset-0 pointer-events-none bg-grid-pattern bg-grid-size" />
      <div className="absolute top-1/4 right-1/3 w-72 h-72 rounded-full pointer-events-none hidden sm:block" style={{
        background: 'radial-gradient(circle, rgba(30,144,255,0.10) 0%, transparent 70%)',
        filter: 'blur(40px)',
        animation: 'float 7s ease-in-out infinite',
      }} />
      <div className="absolute bottom-1/3 left-1/4 w-48 h-48 rounded-full pointer-events-none hidden sm:block" style={{
        background: 'radial-gradient(circle, rgba(21,101,192,0.08) 0%, transparent 70%)',
        filter: 'blur(32px)',
        animation: 'float 9s ease-in-out infinite reverse',
      }} />

<div className="relative z-10 max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-10 lg:gap-16 items-center">
        {/* Left — text */}
        <div className="flex flex-col gap-5">

          {/* ── Brand Identity Block ── */}
          <div
            className="fade-section flex flex-col gap-4"
            style={{ transitionDelay: '0ms' }}
          >
            <AetherisBrand />

            {/* Glowing accent rule */}
            <div style={{
              height: '1px',
              background: 'linear-gradient(90deg, rgba(30,144,255,0.55) 0%, rgba(30,144,255,0.18) 55%, transparent 100%)',
              width: '100%',
              maxWidth: '460px',
            }} />
          </div>

          <div className="fade-section" style={{ transitionDelay: '80ms' }}>
            <span className="section-label">Drone Surveying Experts</span>
          </div>

          <h1
            className="fade-section font-grotesk font-bold text-brand-white leading-[1.05]"
            style={{
              fontSize: 'clamp(1.8rem, calc(1.5rem + 2.5vw), 3.8rem)',
              letterSpacing: '-0.03em',
              transitionDelay: '160ms',
            }}
          >
            Precision Mapping{' '}
            <span style={{
              background: 'linear-gradient(135deg, #4facfe 0%, #1E90FF 50%, #1565C0 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Reliable Data
            </span>
          </h1>

          <p
            className="fade-section font-inter text-brand-white/60 leading-relaxed max-w-lg"
            style={{ fontSize: '1.05rem', transitionDelay: '240ms' }}
          >
            Certified drone surveying for construction, mining, and infrastructure. Delivering
            orthomosaics, point clouds, and 3D models you can actually use.
          </p>

          <div className="fade-section flex flex-wrap gap-3" style={{ transitionDelay: '320ms' }}>
            <a href="#contact" className="btn-primary">
              Get a Quote
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a href="#services" className="btn-secondary">See Our Services</a>
          </div>

          {/* Stats */}
          <div
            className="fade-section grid grid-cols-3 gap-3 pt-5 border-t border-white/[0.07]"
            style={{ transitionDelay: '400ms' }}
          >
            <StatCard value={13} suffix="" label="Projects Completed" active={statsActive} delay={460} />
            <StatCard value={100} suffix="%" label="Data Integrity" active={statsActive} delay={580} />
            <StatCard staticText="Mission" label="Ready" active={statsActive} delay={700} />
          </div>
        </div>

        {/* Right — 3D wireframe terrain */}
        <div
          className="fade-section relative"
          style={{ transitionDelay: '200ms', minHeight: 'clamp(260px, 45vw, 420px)' }}
        >
          <TerrainCanvas />
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-35">
        <span className="text-xs font-inter tracking-widest text-brand-white/50 uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-brand-blue/60 to-transparent" />
      </div>
    </section>
  );
}
