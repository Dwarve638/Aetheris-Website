const links = {
  Services: [
    { label: 'Topographic Survey', href: '#features' },
    { label: 'Volumetric Analysis', href: '#features' },
    { label: 'Progress Monitoring', href: '#features' },
    { label: 'Thermal Inspection', href: '#features' },
  ],
  Industries: [
    { label: 'Construction', href: '#' },
    { label: 'Mining & Quarry', href: '#' },
    { label: 'Agriculture', href: '#' },
    { label: 'Infrastructure', href: '#' },
  ],
  Company: [
    { label: 'About Us', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Blog', href: '#' },
    { label: 'Press', href: '#' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Safety Standards', href: '#' },
  ],
};

function TwitterIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/[0.06] pt-16 pb-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 mb-12">
          {/* Brand column */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            <a href="#top" className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="Aetheris Logo"
                className="h-10 w-auto"
                style={{ filter: 'drop-shadow(0 0 8px rgba(30,144,255,0.4))' }}
              />
              <img
                src="/brand-name.png"
                alt="Aetheris Technologies"
                className="h-6 w-auto"
                style={{ filter: 'brightness(0.9)' }}
              />
            </a>
            <p className="font-inter text-sm text-brand-white/40 leading-relaxed max-w-xs">
              Professional drone surveying for construction, mining, agriculture, and infrastructure. Survey-grade data. Every time.
            </p>
            <div className="flex gap-3">
              {[
                { icon: <TwitterIcon />, label: 'Twitter' },
                { icon: <LinkedInIcon />, label: 'LinkedIn' },
                { icon: <InstagramIcon />, label: 'Instagram' },
              ].map(({ icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-brand-white/40 hover:text-brand-blue hover:border-brand-blue/30 transition-all duration-200"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([group, items]) => (
            <div key={group} className="flex flex-col gap-3">
              <h4 className="font-grotesk font-semibold text-brand-white/80 text-sm">{group}</h4>
              <ul className="flex flex-col gap-2">
                {items.map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="font-inter text-sm text-brand-white/35 hover:text-brand-blue transition-colors duration-200"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 border-t border-white/[0.05]">
          <p className="font-inter text-xs text-brand-white/25">
            © {new Date().getFullYear()} Aetheris Technologies. All rights reserved.
          </p>
          <p className="font-inter text-xs text-brand-white/20">
            FAA Part 107 Certified · Licensed & Insured · Professional Drone Services Made Simple
          </p>
        </div>
      </div>
    </footer>
  );
}
