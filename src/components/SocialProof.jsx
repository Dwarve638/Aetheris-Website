import { useEffect, useRef } from 'react';

const companies = [
  'CAT', 'AECOM', 'Trimble', 'WSP', 'Bechtel', 'Deere',
  'Topcon', 'Hexagon', 'Autodesk', 'Esri', 'Leica Geosystems', 'DJI Enterprise',
];

export default function SocialProof() {
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
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  /* Duplicate list for seamless infinite loop */
  const marqueeItems = [...companies, ...companies];

  return (
    <section ref={ref} className="relative z-10 py-12 overflow-hidden">
      {/* Subtle separator lines */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* Label */}
      <p className="fade-section text-center text-[10px] font-inter font-medium tracking-[0.25em] uppercase text-brand-white/25 mb-7">
        Trusted by Industry Leaders
      </p>

      {/* Marquee track */}
      <div className="relative">
        {/* Fade masks on left + right */}
        <div
          className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, #0A0A0A, transparent)' }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, #0A0A0A, transparent)' }}
        />

        {/* Scrolling strip */}
        <div className="flex overflow-hidden">
          <ul
            className="flex items-center gap-16 flex-shrink-0"
            style={{ animation: 'marqueeScroll 32s linear infinite' }}
            aria-hidden="true"
          >
            {marqueeItems.map((name, i) => (
              <li
                key={i}
                className="flex-shrink-0 flex items-center gap-3"
              >
                {/* Glow dot */}
                <span
                  className="block w-1 h-1 rounded-full flex-shrink-0"
                  style={{ background: 'rgba(30,144,255,0.4)' }}
                />
                <span
                  className="font-grotesk font-bold whitespace-nowrap select-none"
                  style={{
                    fontSize: 'clamp(0.85rem, 1.5vw, 1.05rem)',
                    color: 'rgba(245,245,245,0.35)',
                    letterSpacing: '0.04em',
                    textShadow: '0 0 12px rgba(30,144,255,0.2)',
                    transition: 'color 0.3s, text-shadow 0.3s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'rgba(245,245,245,0.75)';
                    e.currentTarget.style.textShadow = '0 0 20px rgba(30,144,255,0.5)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'rgba(245,245,245,0.35)';
                    e.currentTarget.style.textShadow = '0 0 12px rgba(30,144,255,0.2)';
                  }}
                >
                  {name}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
