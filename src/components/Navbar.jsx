import { useEffect, useRef, useState } from 'react';

const navLinks = [
  { label: 'Services', href: '#features' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null);
  const hamburgerRef = useRef(null);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    const handleClickOutside = (e) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(e.target) &&
        hamburgerRef.current &&
        !hamburgerRef.current.contains(e.target)
      ) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('keydown', handleKey);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 flex justify-center px-4 pt-4">
      <nav
        style={{
          transition: 'all 0.5s cubic-bezier(0.4,0,0.2,1)',
          maxWidth: scrolled ? '740px' : '1100px',
          borderRadius: scrolled ? '9999px' : '0px',
          background: scrolled
            ? 'rgba(8,8,12,0.72)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(28px) saturate(1.4)' : 'blur(0px)',
          WebkitBackdropFilter: scrolled ? 'blur(28px) saturate(1.4)' : 'blur(0px)',
          border: 'none',
          boxShadow: scrolled
            ? [
                'inset 0 0 0 1px rgba(30,144,255,0.10)',
                '0 0 60px rgba(30,144,255,0.06)',
                '0 8px 48px rgba(0,0,0,0.45)',
              ].join(', ')
            : 'none',
        }}
        className="w-full px-6 py-4 flex items-center"
      >
        {/* Desktop: centered links + CTA group */}
        <div className="hidden md:flex flex-1 items-center justify-center gap-10">
          <ul className="flex items-center gap-8">
            {navLinks.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  className="text-base font-inter text-brand-white/70 hover:text-brand-white transition-colors duration-200"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <a href="#contact" className="btn-primary text-sm py-3 px-6">
            Get a Quote
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          ref={hamburgerRef}
          className="md:hidden ml-auto flex flex-col gap-1.5 p-2 rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-blue"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          <span
            className="block w-5 h-0.5 bg-brand-white/80 transition-all duration-300"
            style={menuOpen ? { transform: 'rotate(45deg) translate(3px,3px)' } : {}}
          />
          <span
            className="block w-5 h-0.5 bg-brand-white/80 transition-all duration-300"
            style={menuOpen ? { opacity: 0 } : {}}
          />
          <span
            className="block w-5 h-0.5 bg-brand-white/80 transition-all duration-300"
            style={menuOpen ? { transform: 'rotate(-45deg) translate(3px,-3px)' } : {}}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          ref={mobileMenuRef}
          id="mobile-menu"
          className="absolute top-full mt-2 left-4 right-4 rounded-2xl p-5 flex flex-col gap-4 md:hidden"
          style={{
            background: 'rgba(8,8,12,0.82)',
            backdropFilter: 'blur(28px) saturate(1.4)',
            WebkitBackdropFilter: 'blur(28px) saturate(1.4)',
            border: '1px solid rgba(30,144,255,0.08)',
            boxShadow: '0 8px 48px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(255,255,255,0.02)',
          }}
        >
          {navLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-base font-inter text-brand-white/80 hover:text-brand-blue transition-colors py-1"
              onClick={() => setMenuOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <a href="#contact" className="btn-primary justify-center mt-1" onClick={() => setMenuOpen(false)}>
            Get a Quote
          </a>
        </div>
      )}
    </header>
  );
}
