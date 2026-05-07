import { useCallback, useEffect, useRef, useState } from 'react';

const ORIGINAL = 'AETHERIS'.split('');
const GLITCH_POOL = ['#', '%', '/', '$', '&', '!', '?', '@', '*', '~', '^', '|', '<', '>', '=', '_'];

const CHROME_GRADIENT = [
  'linear-gradient(180deg,',
  '  #252e3a 0%,',
  '  #b0c8de 10%,',
  '  #f5fbff 20%,',
  '  #a8c4d8 30%,',
  '  #e8f4ff 50%,',
  '  #88a8be 68%,',
  '  #c8dce8 82%,',
  '  #252e3a 100%)',
].join('');

const WRAPPER_STYLE = {
  display: 'inline-flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  position: 'relative',
};

const BLOOM_STYLE = {
  position: 'absolute',
  inset: '-28px 0',
  background: 'radial-gradient(ellipse 110% 75%, rgba(24,90,220,0.16) 0%, transparent 72%)',
  filter: 'blur(32px)',
  pointerEvents: 'none',
  zIndex: 0,
  animation: 'ab-bloom 7s ease-in-out infinite',
  willChange: 'opacity',
};

const SKEW_STYLE = {
  display: 'inline-block',
  transform: 'skewX(-10deg)',
  transformOrigin: 'center bottom',
  position: 'relative',
  zIndex: 1,
  cursor: 'default',
};

const CLIP_STYLE = {
  position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
  overflow: 'hidden',
  pointerEvents: 'none',
  willChange: 'transform',
};

const CA_BASE_STYLE = {
  position: 'absolute', top: 0, left: 0,
  display: 'block',
  fontSize: 'clamp(28px, 7.8vw, 112px)',
  letterSpacing: '0.12em',
  lineHeight: 1,
  whiteSpace: 'nowrap',
  mixBlendMode: 'screen',
  pointerEvents: 'none',
  userSelect: 'none',
};

const MAIN_TEXT_BASE = {
  display: 'block',
  fontSize: 'clamp(28px, 7.8vw, 112px)',
  letterSpacing: '0.12em',
  lineHeight: 1,
  whiteSpace: 'nowrap',
  background: CHROME_GRADIENT,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  position: 'relative',
  zIndex: 1,
  userSelect: 'none',
};

// Slice overlays — absolutely positioned copies of the wordmark, clipped to horizontal bands
const SLICE_TEXT_BASE = {
  position: 'absolute', top: 0, left: 0,
  display: 'block',
  fontSize: 'clamp(28px, 7.8vw, 112px)',
  letterSpacing: '0.12em',
  lineHeight: 1,
  whiteSpace: 'nowrap',
  background: CHROME_GRADIENT,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  pointerEvents: 'none',
  userSelect: 'none',
  zIndex: 2,
  willChange: 'transform, opacity',
};

const HOVER_ZONES_STYLE = {
  position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
  display: 'flex',
  zIndex: 5,
};

const SCANLINE_BASE = {
  position: 'absolute', inset: 0, zIndex: 2,
  background: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.05) 3px, rgba(0,0,0,0.05) 4px)',
  pointerEvents: 'none',
  transform: 'translateZ(0)',
};

const TECH_ROW_STYLE = {
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: '12px',
  paddingRight: 'clamp(8px, 0.94vw, 13.5px)',
  color: 'rgba(68,146,222,0.82)',
  fontSize: '15.5px',
  fontWeight: 300,
  lineHeight: 1,
  position: 'relative',
  zIndex: 1,
  letterSpacing: '0.01em',
};

export default function AetherisBrand() {
  const [chars, setChars] = useState([...ORIGINAL]);
  const [anyGlitching, setAnyGlitching] = useState(false);
  const timers = useRef({});
  const activeSet = useRef(new Set());

  useEffect(() => {
    const t = timers.current;
    return () => Object.values(t).forEach(clearTimeout);
  }, []);

  const triggerGlitch = useCallback((idx) => {
    clearTimeout(timers.current[idx]);

    if (!activeSet.current.has(idx)) {
      activeSet.current.add(idx);
      if (activeSet.current.size === 1) setAnyGlitching(true);
    }

    let count = 0;
    const cycles = 4 + Math.floor(Math.random() * 4);

    const tick = () => {
      if (count < cycles) {
        const g = GLITCH_POOL[Math.floor(Math.random() * GLITCH_POOL.length)];
        setChars(prev => { const n = [...prev]; n[idx] = g; return n; });
        count++;
        timers.current[idx] = setTimeout(tick, 40 + Math.random() * 45);
      } else {
        setChars(prev => { const n = [...prev]; n[idx] = ORIGINAL[idx]; return n; });
        activeSet.current.delete(idx);
        if (activeSet.current.size === 0) setAnyGlitching(false);
      }
    };

    tick();
  }, []);

  // Auto-fire random glitches periodically so it feels alive without hovering
  useEffect(() => {
    let handle;
    const schedule = () => {
      handle = setTimeout(() => {
        const idx = Math.floor(Math.random() * ORIGINAL.length);
        triggerGlitch(idx);
        // ~55% chance to burst a second letter shortly after
        if (Math.random() > 0.45) {
          const offset = 1 + Math.floor(Math.random() * (ORIGINAL.length - 1));
          const idx2 = (idx + offset) % ORIGINAL.length;
          setTimeout(() => triggerGlitch(idx2), 60 + Math.random() * 100);
        }
        schedule();
      }, 2000 + Math.random() * 3000);
    };
    schedule();
    return () => clearTimeout(handle);
  }, [triggerGlitch]);

  return (
    <>
      <style>{`
        @keyframes ab-glitch-hover {
          0%   { transform: translateX(0)    scaleY(1); }
          10%  { transform: translateX(-7px) scaleY(1.025); }
          22%  { transform: translateX(9px)  scaleY(0.975); }
          35%  { transform: translateX(-5px) scaleY(1.01); }
          48%  { transform: translateX(6px)  scaleY(1); }
          60%  { transform: translateX(-3px) scaleY(0.99); }
          72%  { transform: translateX(2px)  scaleY(1); }
          84%  { transform: translateX(-1px); }
          100% { transform: translateX(0)    scaleY(1); }
        }
        @keyframes ab-ca-r-hover {
          0%   { transform: translateX(0); }
          12%  { transform: translateX(-16px); }
          25%  { transform: translateX(-2px); }
          38%  { transform: translateX(-11px); }
          52%  { transform: translateX(-1px); }
          65%  { transform: translateX(-5px); }
          78%  { transform: translateX(-2px); }
          100% { transform: translateX(-2px); }
        }
        @keyframes ab-ca-b-hover {
          0%   { transform: translateX(0); }
          12%  { transform: translateX(16px); }
          25%  { transform: translateX(2px); }
          38%  { transform: translateX(11px); }
          52%  { transform: translateX(1px); }
          65%  { transform: translateX(5px); }
          78%  { transform: translateX(2px); }
          100% { transform: translateX(2px); }
        }
        @keyframes ab-bloom {
          0%, 100% { opacity: 0.55; }
          50%       { opacity: 0.82; }
        }
        /* Slice 1 — top 28% of the wordmark, shifts left */
        @keyframes ab-slice-1 {
          0%   { clip-path: inset(0 0 72% 0); transform: translateX(0);     opacity: 0; }
          6%   { clip-path: inset(0 0 72% 0); transform: translateX(0);     opacity: 1; }
          18%  { clip-path: inset(0 0 72% 0); transform: translateX(-14px); }
          32%  { clip-path: inset(0 0 72% 0); transform: translateX(9px);  }
          48%  { clip-path: inset(0 0 72% 0); transform: translateX(-6px);  }
          65%  { clip-path: inset(0 0 72% 0); transform: translateX(3px);   }
          82%  { clip-path: inset(0 0 72% 0); transform: translateX(0);     opacity: 1; }
          100% { clip-path: inset(0 0 72% 0); transform: translateX(0);     opacity: 0; }
        }
        /* Slice 2 — middle band ~38–62%, shifts right */
        @keyframes ab-slice-2 {
          0%   { clip-path: inset(38% 0 38% 0); transform: translateX(0);    opacity: 0; }
          10%  { clip-path: inset(38% 0 38% 0); transform: translateX(0);    opacity: 1; }
          22%  { clip-path: inset(38% 0 38% 0); transform: translateX(18px); }
          38%  { clip-path: inset(38% 0 38% 0); transform: translateX(-10px);}
          54%  { clip-path: inset(38% 0 38% 0); transform: translateX(7px);  }
          70%  { clip-path: inset(38% 0 38% 0); transform: translateX(0);    opacity: 1; }
          100% { clip-path: inset(38% 0 38% 0); transform: translateX(0);    opacity: 0; }
        }
        /* Brief blue flash at glitch burst start */
        @keyframes ab-flash {
          0%   { opacity: 0.55; }
          30%  { opacity: 0.18; }
          100% { opacity: 0; }
        }
      `}</style>

      <div style={WRAPPER_STYLE}>

        {/* Atmospheric bloom */}
        <div aria-hidden="true" style={BLOOM_STYLE} />

        {/* ── AETHERIS ── 10° angular stance */}
        <div style={SKEW_STYLE}>
          <div
            style={{
              position: 'relative',
              display: 'inline-block',
              animation: anyGlitching ? 'ab-glitch-hover 0.5s ease-out 1 both' : 'none',
              willChange: 'transform',
            }}
          >
            {/* Clip-path slice overlays — always in DOM, animated in/out */}
            <span
              className="font-glitch"
              aria-hidden="true"
              style={{
                ...SLICE_TEXT_BASE,
                animation: anyGlitching ? 'ab-slice-1 0.52s ease-out 1 both' : 'none',
                opacity: anyGlitching ? undefined : 0,
                transition: anyGlitching ? 'none' : 'opacity 0.12s ease',
              }}
            >
              {chars.join('')}
            </span>
            <span
              className="font-glitch"
              aria-hidden="true"
              style={{
                ...SLICE_TEXT_BASE,
                animation: anyGlitching ? 'ab-slice-2 0.52s ease-out 1 both' : 'none',
                opacity: anyGlitching ? undefined : 0,
                transition: anyGlitching ? 'none' : 'opacity 0.12s ease',
              }}
            >
              {chars.join('')}
            </span>

            {/* Clip container — keeps CA overlays from bleeding outside text bounds */}
            <div aria-hidden="true" style={CLIP_STYLE}>
              {/* CA red overlay */}
              <span
                className="font-glitch"
                aria-hidden="true"
                style={{
                  ...CA_BASE_STYLE,
                  color: 'rgba(255,45,35,0.35)',
                  animation: anyGlitching ? 'ab-ca-r-hover 0.5s ease-out 1 both' : 'none',
                  opacity: anyGlitching ? 1 : 0,
                  transition: anyGlitching ? 'opacity 0.08s ease' : 'none',
                }}
              >
                AETHERIS
              </span>

              {/* CA blue overlay */}
              <span
                className="font-glitch"
                aria-hidden="true"
                style={{
                  ...CA_BASE_STYLE,
                  color: 'rgba(28,130,255,0.35)',
                  animation: anyGlitching ? 'ab-ca-b-hover 0.5s ease-out 1 both' : 'none',
                  opacity: anyGlitching ? 1 : 0,
                  transition: anyGlitching ? 'opacity 0.08s ease' : 'none',
                }}
              >
                AETHERIS
              </span>
            </div>

            {/* Main chrome wordmark */}
            <span
              className="font-glitch"
              style={{
                ...MAIN_TEXT_BASE,
                filter: anyGlitching
                  ? 'drop-shadow(0 0 36px rgba(28,96,215,0.82)) drop-shadow(0 0 12px rgba(140,190,255,0.56))'
                  : 'drop-shadow(0 0 22px rgba(28,96,215,0.54)) drop-shadow(0 0 7px rgba(140,190,255,0.32))',
                transition: 'filter 0.3s ease',
              }}
            >
              {chars.join('')}
            </span>

            {/* Blue flash burst */}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute', inset: '-2px -6px',
                background: 'rgba(30,144,255,0.14)',
                borderRadius: '2px',
                animation: anyGlitching ? 'ab-flash 0.18s ease-out 1 both' : 'none',
                opacity: anyGlitching ? undefined : 0,
                transition: anyGlitching ? 'none' : 'opacity 0.1s ease',
                pointerEvents: 'none',
                zIndex: 4,
              }}
            />

            {/* Per-letter hover detection — 8 equal zones over the text */}
            <div aria-hidden="true" style={HOVER_ZONES_STYLE}>
              {ORIGINAL.map((_, i) => (
                <div
                  key={i}
                  style={{ flex: '1 1 0', cursor: 'default' }}
                  onMouseEnter={() => triggerGlitch(i)}
                />
              ))}
            </div>

            {/* Scanline interference */}
            <div
              aria-hidden="true"
              style={{
                ...SCANLINE_BASE,
                opacity: anyGlitching ? 0.18 : 0.06,
                transition: 'opacity 0.2s ease',
              }}
            />
          </div>
        </div>

        {/* ── TECHNOLOGIES ── completely stable */}
        <div className="font-inter" style={TECH_ROW_STYLE}>
          {'TECHNOLOGIES'.split('').map((char, i) => (
            <span key={i}>{char}</span>
          ))}
        </div>
      </div>
    </>
  );
}
