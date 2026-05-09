// screens.jsx — v2: dark cinematic Reel hero, light landing, chat-bubble voice
const { useState, useEffect, useRef, useMemo, useCallback } = React;

// ─────────────────────────────────────────────────────────────
// Genie Components — Troubleshooting assistant
// ─────────────────────────────────────────────────────────────

// Sparkle icon for Genie orb
function SparkleIcon({ size = 20, color = '#fff' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z" fill={color}/>
      <path d="M19 15L19.75 17.25L22 18L19.75 18.75L19 21L18.25 18.75L16 18L18.25 17.25L19 15Z" fill={color} opacity=".7"/>
      <path d="M5 2L5.5 3.5L7 4L5.5 4.5L5 6L4.5 4.5L3 4L4.5 3.5L5 2Z" fill={color} opacity=".5"/>
    </svg>
  );
}

// Small floating Genie orb
function GenieOrb({ accent, onClick }) {
  return (
    <button onClick={onClick} className="pressable" style={{
      position: 'relative',
      width: 48, height: 48,
      padding: 0, border: 0, cursor: 'pointer',
      background: 'transparent',
    }}>
      {/* Glow */}
      <span style={{
        position: 'absolute', inset: -6, borderRadius: '50%',
        background: `radial-gradient(circle, ${accent}55 0%, transparent 70%)`,
        filter: 'blur(8px)',
        animation: 'glowPulse 2.5s ease-in-out infinite',
      }}/>
      {/* Orb */}
      <span style={{
        position: 'absolute', inset: 0, borderRadius: '50%',
        background: `radial-gradient(circle at 35% 30%, #FFD7BB 0%, ${accent} 70%)`,
        boxShadow: `0 4px 16px ${accent}77`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <SparkleIcon size={22} color="#fff"/>
      </span>
    </button>
  );
}

// Demo images for prototype
const DEMO_PHOTOS = [
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><rect fill="%231A130C" width="200" height="200"/><circle cx="100" cy="100" r="60" fill="%232A1810" stroke="%239A8E7A" stroke-width="3"/><ellipse cx="100" cy="85" rx="40" ry="15" fill="%233A2616"/><text x="100" y="170" text-anchor="middle" fill="%239A8E7A" font-size="12">Front view</text></svg>',
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><rect fill="%231A130C" width="200" height="200"/><rect x="60" y="50" width="80" height="100" rx="8" fill="%232A1810" stroke="%239A8E7A" stroke-width="3"/><path d="M70 80 L130 80 M70 100 L130 100 M70 120 L110 120" stroke="%235A3920" stroke-width="2"/><text x="100" y="170" text-anchor="middle" fill="%239A8E7A" font-size="12">Side view</text></svg>',
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><rect fill="%231A130C" width="200" height="200"/><circle cx="100" cy="90" r="50" fill="%232A1810" stroke="%239A8E7A" stroke-width="3"/><circle cx="100" cy="90" r="25" fill="%233A2616"/><circle cx="100" cy="90" r="8" fill="%23E07856"/><text x="100" y="170" text-anchor="middle" fill="%239A8E7A" font-size="12">Close-up</text></svg>',
];

// Genie Panel (bottom sheet)
function GeniePanel({ accent, currentStep, onClose, onGoToStep }) {
  const [phase, setPhase] = useState('welcome'); // welcome, upload, analyzing, result
  const [photos, setPhotos] = useState([null, null, null]);

  const handleUploadSlot = (index) => {
    // Simulate photo upload with demo image
    const newPhotos = [...photos];
    newPhotos[index] = DEMO_PHOTOS[index];
    setPhotos(newPhotos);
  };

  const handleAnalyze = () => {
    setPhase('analyzing');
    setTimeout(() => setPhase('result'), 2000);
  };

  const allPhotosUploaded = photos.every(p => p !== null);

  return (
    <div className="fade-in" style={{
      position: 'absolute', inset: 0, zIndex: 50,
      display: 'flex', flexDirection: 'column',
    }}>
      {/* Backdrop */}
      <div onClick={onClose} style={{
        position: 'absolute', inset: 0,
        background: 'rgba(10,8,6,0.7)',
        backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
      }}/>

      {/* Panel */}
      <div className="fade-up" style={{
        position: 'absolute', left: 0, right: 0, bottom: 0,
        maxHeight: '85%',
        background: 'linear-gradient(180deg, #1F1810 0%, #0E0A06 100%)',
        borderRadius: '24px 24px 0 0',
        border: '1px solid rgba(255,255,255,0.08)',
        borderBottom: 'none',
        overflow: 'hidden',
        display: 'flex', flexDirection: 'column',
      }}>
        {/* Handle */}
        <div style={{
          width: 40, height: 4, borderRadius: 2,
          background: 'rgba(255,255,255,0.2)',
          margin: '12px auto 8px',
        }}/>

        {/* Header */}
        <div style={{
          padding: '8px 20px 16px',
          display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 36, height: 36,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <SparkleIcon size={28} color={accent}/>
            </div>
            <div>
              <div style={{ fontSize: 18, fontWeight: 700, color: '#FAF8F5' }}>Unbox Genie</div>
              <div style={{ fontSize: 13, color: 'rgba(250,248,245,0.6)' }}>Your assembly assistant</div>
            </div>
          </div>
          <button onClick={onClose} style={{
            width: 32, height: 32, borderRadius: '50%', border: 0,
            background: 'rgba(255,255,255,0.08)', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="14" height="14" viewBox="0 0 14 14">
              <path d="M2 2l10 10M12 2L2 12" stroke="#FAF8F5" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Content */}
        <div style={{
          flex: 1, overflow: 'auto', padding: '0 20px 24px',
        }}>
          {/* Welcome / Upload Phase */}
          {(phase === 'welcome' || phase === 'upload') && (
            <div>
              <div style={{
                padding: '14px 16px', borderRadius: 16,
                background: 'rgba(255,255,255,0.05)',
                marginBottom: 20,
              }}>
                <p style={{ margin: 0, fontSize: 14, lineHeight: 1.5, color: 'rgba(250,248,245,0.85)' }}>
                  {phase === 'welcome'
                    ? "Hi! I'm here to help. Upload 3 photos of your current progress from different angles."
                    : "Different angles help me see better and give you accurate feedback."}
                </p>
              </div>

              {/* Upload slots */}
              <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
                {['Angle 1 (front)', 'Angle 2 (side)', 'Angle 3 (close-up)'].map((label, i) => (
                  <button key={i} onClick={() => handleUploadSlot(i)} style={{
                    flex: 1, aspectRatio: '1', borderRadius: 16,
                    background: photos[i] ? 'transparent' : 'rgba(255,255,255,0.04)',
                    border: `1.5px dashed ${photos[i] ? accent : 'rgba(255,255,255,0.15)'}`,
                    cursor: 'pointer', padding: 0, overflow: 'hidden',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                    gap: 6, position: 'relative',
                  }}>
                    {photos[i] ? (
                      <>
                        <img src={photos[i]} alt={label} style={{
                          position: 'absolute', inset: 0, width: '100%', height: '100%',
                          objectFit: 'cover', borderRadius: 14,
                        }}/>
                        <div style={{
                          position: 'absolute', top: 6, right: 6,
                          width: 20, height: 20, borderRadius: '50%',
                          background: accent, display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                          <svg width="10" height="10" viewBox="0 0 10 10">
                            <path d="M2 5l2 2 4-4" stroke="#fff" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                      </>
                    ) : (
                      <>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <rect x="3" y="5" width="18" height="14" rx="2" stroke="rgba(250,248,245,0.4)" strokeWidth="1.5"/>
                          <circle cx="8.5" cy="10.5" r="1.5" fill="rgba(250,248,245,0.4)"/>
                          <path d="M21 15l-5-4-3 2.5-4-3-6 5" stroke="rgba(250,248,245,0.4)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span style={{ fontSize: 10, color: 'rgba(250,248,245,0.5)', textAlign: 'center', padding: '0 4px' }}>
                          {label.split(' ')[0]}<br/>{label.match(/\(.*\)/)?.[0]}
                        </span>
                      </>
                    )}
                  </button>
                ))}
              </div>

              {/* Analyze button */}
              {allPhotosUploaded && (
                <button onClick={handleAnalyze} className="pressable fade-up" style={{
                  width: '100%', padding: '16px 24px', borderRadius: 16,
                  background: accent, border: 0, cursor: 'pointer',
                  fontSize: 16, fontWeight: 600, color: '#fff',
                  boxShadow: `0 8px 24px ${accent}55`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                }}>
                  <SparkleIcon size={18} color="#fff"/>
                  Analyze my progress
                </button>
              )}
            </div>
          )}

          {/* Analyzing Phase */}
          {phase === 'analyzing' && (
            <div style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              justifyContent: 'center', padding: '40px 0',
            }}>
              <div style={{
                width: 80, height: 80, borderRadius: '50%',
                background: `radial-gradient(circle at 35% 30%, #FFD7BB, ${accent})`,
                boxShadow: `0 0 40px ${accent}66`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                animation: 'breathe 1.5s ease-in-out infinite',
              }}>
                <SparkleIcon size={36} color="#fff"/>
              </div>
              <p style={{ marginTop: 24, fontSize: 16, color: '#FAF8F5', fontWeight: 500 }}>
                Analyzing your photos...
              </p>
              <div style={{ display: 'flex', gap: 6, marginTop: 12 }}>
                {[0,1,2].map(i => (
                  <div key={i} style={{
                    width: 8, height: 8, borderRadius: '50%', background: accent,
                    animation: `dotPulse 1.2s ${i*0.18}s infinite`,
                  }}/>
                ))}
              </div>
            </div>
          )}

          {/* Result Phase */}
          {phase === 'result' && (
            <div>
              {/* Thanks message */}
              <div style={{
                padding: '14px 16px', borderRadius: 16,
                background: 'rgba(255,255,255,0.05)',
                marginBottom: 16,
              }}>
                <p style={{ margin: 0, fontSize: 14, lineHeight: 1.5, color: 'rgba(250,248,245,0.85)' }}>
                  Thanks for the photos! I've reviewed your progress.
                </p>
              </div>

              {/* Issue detected */}
              <div style={{
                padding: 16, borderRadius: 16,
                background: 'rgba(224,120,86,0.08)',
                border: '1px solid rgba(224,120,86,0.25)',
                marginBottom: 12,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M12 9v4M12 17h.01M12 3l10 18H2L12 3z" stroke={accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span style={{ fontSize: 14, fontWeight: 700, color: accent }}>Issue detected</span>
                </div>
                <p style={{ margin: 0, fontSize: 15, fontWeight: 600, color: '#FAF8F5', marginBottom: 6 }}>
                  The mounting bracket is installed upside down.
                </p>
                <p style={{ margin: 0, fontSize: 13, color: 'rgba(250,248,245,0.7)', lineHeight: 1.45 }}>
                  The curved side should face down toward the floor.
                </p>
              </div>

              {/* What looks good */}
              <div style={{
                padding: 16, borderRadius: 16,
                background: 'rgba(122,199,143,0.08)',
                border: '1px solid rgba(122,199,143,0.25)',
                marginBottom: 20,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="#7AC78F" strokeWidth="2"/>
                    <path d="M8 12l3 3 5-6" stroke="#7AC78F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span style={{ fontSize: 14, fontWeight: 700, color: '#7AC78F' }}>What looks good</span>
                </div>
                <p style={{ margin: 0, fontSize: 14, color: 'rgba(250,248,245,0.85)', lineHeight: 1.45 }}>
                  Wires are connected correctly. Great job there!
                </p>
              </div>

              {/* Your photos */}
              <div style={{
                padding: 16, borderRadius: 16,
                background: 'rgba(255,255,255,0.04)',
                marginBottom: 20,
              }}>
                <p style={{ margin: '0 0 12px', fontSize: 14, fontWeight: 600, color: '#FAF8F5' }}>
                  Your photos
                </p>
                <div style={{ display: 'flex', gap: 10 }}>
                  {photos.map((p, i) => (
                    <div key={i} style={{
                      flex: 1, aspectRatio: '1', borderRadius: 12, overflow: 'hidden',
                      background: '#1A130C',
                    }}>
                      <img src={p} alt={`Photo ${i+1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
                    </div>
                  ))}
                </div>
              </div>

              {/* Fix options */}
              <div style={{
                padding: 16, borderRadius: 16,
                background: 'rgba(255,255,255,0.04)',
              }}>
                <p style={{ margin: '0 0 14px', fontSize: 14, fontWeight: 600, color: '#FAF8F5' }}>
                  How would you like to proceed?
                </p>

                {/* Go back to Step 3 */}
                <button onClick={() => { onGoToStep(2); onClose(); }} className="pressable" style={{
                  width: '100%', padding: '14px 16px', borderRadius: 14,
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  cursor: 'pointer', marginBottom: 10,
                  display: 'flex', alignItems: 'center', gap: 14,
                  textAlign: 'left',
                }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: 12,
                    background: `${accent}22`, border: `1px solid ${accent}44`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M3 12a9 9 0 109-9" stroke={accent} strokeWidth="2" strokeLinecap="round"/>
                      <path d="M3 3v6h6" stroke={accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 15, fontWeight: 600, color: '#FAF8F5' }}>Go back to Step 3</div>
                    <div style={{ fontSize: 12, color: 'rgba(250,248,245,0.6)', marginTop: 2 }}>
                      Review and reinstall the mounting bracket.
                    </div>
                  </div>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M6 4l4 4-4 4" stroke="rgba(250,248,245,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>

                {/* Stay on current step */}
                <button onClick={onClose} className="pressable" style={{
                  width: '100%', padding: '14px 16px', borderRadius: 14,
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: 14,
                  textAlign: 'left',
                }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: 12,
                    background: 'rgba(255,200,61,0.15)', border: '1px solid rgba(255,200,61,0.3)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" stroke="#FFC83D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 15, fontWeight: 600, color: '#FAF8F5' }}>Stay on Step {currentStep + 1}</div>
                    <div style={{ fontSize: 12, color: 'rgba(250,248,245,0.6)', marginTop: 2 }}>
                      I'll show you how to fix it without going back.
                    </div>
                  </div>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M6 4l4 4-4 4" stroke="rgba(250,248,245,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Demo content ───────────────────────────────────────────────
const DEMO_STEPS = [
  { title: "Turn off the power.",
    sub: "Safety first — two seconds at the breaker prevents a shock.",
    why: "Wiring with the power on is the one way this gets dangerous. The breaker takes seconds; an electric shock takes weeks." },
  { title: "Unbox the parts.",
    sub: "You should have a metal ring, a globe shade, three screws, and a base plate.",
    why: "Doing inventory now means you'll catch missing parts before you're 30 minutes deep with a wire in your teeth." },
  { title: "Connect the wires.",
    sub: "Brown to brown, blue to blue, yellow-green to yellow-green. Match the colors.",
    why: "Each wire has a job — live, neutral, ground. Matching colors wires it the way the manufacturer designed it." },
  { title: "Tuck the wires in.",
    sub: "Push them gently into the base so nothing pokes out.",
    why: "A tidy bundle lets the base sit flush against the ceiling. Pinched wires can short over time." },
  { title: "Mount the base plate.",
    sub: "Hold it flat against the ceiling and turn the screws clockwise until snug.",
    why: "Snug, not Hulk-tight. Stop turning when it's firm — over-tightening cracks the housing." },
  { title: "Attach the metal ring.",
    sub: "Twist it onto the base plate until it clicks.",
    why: "There's a quarter-turn lock built in. Line up the notches first, then a smooth clockwise twist." },
  { title: "Add the globe shade.",
    sub: "Slide it up and rotate gently — it'll click when seated.",
    why: "The lock is the same as the metal ring — quarter-turn. If it won't seat, the threads are out of line; back off and try again." },
  { title: "Power on.",
    sub: "Flip the breaker back on, then your wall switch. You're done.",
    why: "Worth taking a moment — you just did electrical work, which is something most people are afraid to try." },
];

const PRODUCT = {
  name: "Lumen Halo Ceiling Lamp",
  blurb: "a flush-mount LED ceiling light with a frosted globe shade.",
  steps: 8, mins: 25,
};

// Pre-recorded voice exchanges, by step idx
const VOICE_EXCHANGES = {
  0: {
    user: "Which breaker do I turn off?",
    reply: [
      "Usually the one labeled 'living room' or 'kitchen.'",
      "If you're not sure, flipping the main switch is always safe.",
    ],
  },
  2: {
    user: "Which wire is neutral?",
    reply: [
      "The blue wire is your neutral.",
      "It's the one without stripes.",
      "Brown is live, and the green-yellow striped one is ground.",
    ],
  },
  5: {
    user: "It won't twist on.",
    reply: [
      "Yeah, that step trips up a lot of people.",
      "Make sure the ring's notches are lined up with the base plate's grooves first.",
      "Then a smooth clockwise twist — about a quarter turn.",
    ],
  },
  // fallback
  default: {
    user: "Hey Unbox, what's next?",
    reply: [
      "You're doing great.",
      "Just take this step slowly — there's no rush.",
    ],
  },
};

// ── Atoms ──────────────────────────────────────────────────────
function Btn({ children, onClick, variant = 'primary', size = 'md', style = {}, accent = '#E07856' }) {
  const sizes = {
    sm: { padding: '10px 16px', fontSize: 14, borderRadius: 999 },
    md: { padding: '14px 20px', fontSize: 15, borderRadius: 999 },
    lg: { padding: '18px 24px', fontSize: 17, borderRadius: 999 },
    xl: { padding: '20px 26px', fontSize: 18, borderRadius: 22 },
  };
  const variants = {
    primary: { background: accent, color: '#fff', boxShadow: `0 6px 14px ${accent}55, inset 0 -2px 0 rgba(0,0,0,.08)` },
    ghost:   { background: 'transparent', color: '#5A554D' },
    soft:    { background: 'rgba(0,0,0,.05)', color: '#1A1A1A' },
    outline: { background: '#FAF8F5', color: '#1A1A1A', boxShadow: 'inset 0 0 0 1.5px #1A1A1A' },
    glassDark:{background: 'rgba(255,255,255,.10)', color: '#FAF8F5', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,.18)', backdropFilter: 'blur(10px)' },
  };
  return (
    <button onClick={onClick} className="pressable"
      style={{
        border: 0, fontWeight: 600, fontFamily: 'Inter, sans-serif',
        cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        ...sizes[size], ...variants[variant], ...style,
      }}>
      {children}
    </button>
  );
}

function MicIcon({ size = 18, color = '#fff' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="9" y="3" width="6" height="12" rx="3" fill={color}/>
      <path d="M5 11a7 7 0 0014 0M12 18v3" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

// ── Global "Hey Unbox · listening" pill ────────────────────────
function HeyUnboxPill({ variant = 'light', state = 'listening', accent = '#E07856' }) {
  const isLight = variant === 'light';
  const isActive = state === 'active';
  const labels = { listening: 'listening', active: 'active' };
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 7,
      padding: '5px 11px 5px 8px', borderRadius: 999,
      background: isLight ? 'rgba(255,255,255,.85)' : 'rgba(255,255,255,.12)',
      backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
      border: isLight ? '.5px solid rgba(0,0,0,.06)' : '.5px solid rgba(255,255,255,.20)',
      fontSize: 11.5, fontWeight: 600, letterSpacing: '.01em',
      color: isLight ? '#1A1A1A' : '#FAF8F5',
      whiteSpace: 'nowrap',
    }}>
      <span style={{ position: 'relative', width: 8, height: 8 }}>
        <span style={{
          position: 'absolute', inset: 0, borderRadius: '50%',
          background: accent,
          boxShadow: `0 0 0 0 ${accent}88`,
          animation: 'heyPulse 1.6s ease-in-out infinite',
        }}/>
        <style>{`@keyframes heyPulse{0%,100%{box-shadow:0 0 0 0 ${accent}66;transform:scale(1)}50%{box-shadow:0 0 0 5px ${accent}00;transform:scale(${isActive?1.3:1.15})}}`}</style>
      </span>
      <span>Hey Unbox</span>
      <span style={{ opacity: .55 }}>·</span>
      <span style={{ color: isActive ? accent : (isLight ? '#5A554D' : 'rgba(250,248,245,.7)'), fontWeight: 600 }}>
        {labels[state]}
      </span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Screen 1 — Landing (Dark mode with glowing orb hero)
// ─────────────────────────────────────────────────────────────
function LandingScreen({ accent, onUpload }) {
  return (
    <div className="fade-in" style={{
      width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
      padding: '60px 28px 36px', boxSizing: 'border-box', overflow: 'hidden',
      background: 'radial-gradient(ellipse 120% 80% at 50% 20%, #2A1810 0%, #0E0A06 100%)',
    }}>
      {/* top row: wordmark + listening pill */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            width: 28, height: 28, borderRadius: 9, background: accent, position: 'relative',
            boxShadow: `0 4px 10px ${accent}55`,
          }}>
            <div style={{
              position: 'absolute', inset: 6, borderRadius: 5, background: '#FAF8F5',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'Fraunces, serif', fontSize: 13, fontWeight: 700, color: accent,
            }}>U</div>
          </div>
          <span style={{ fontFamily: 'Fraunces, serif', fontSize: 19, fontWeight: 600, letterSpacing: '-0.01em', color: '#FAF8F5' }}>Unbox</span>
        </div>
        <HeyUnboxPill variant="dark" accent={accent}/>
      </div>

      {/* Glowing orb hero */}
      <div style={{
        flex: '0 0 auto',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        marginTop: 20, marginBottom: 8,
      }}>
        {/* Halo ring above orb */}
        <div style={{
          width: 140, height: 20, marginBottom: -10,
          background: 'transparent',
          borderRadius: '50%',
          boxShadow: `0 0 30px 2px ${accent}44, inset 0 -2px 8px ${accent}33`,
          opacity: 0.6,
        }}/>
        {/* Main glowing orb */}
        <div style={{ position: 'relative', width: 160, height: 160 }}>
          {/* Outer glow */}
          <div style={{
            position: 'absolute', inset: -40,
            background: `radial-gradient(circle, ${accent}55 0%, ${accent}22 40%, transparent 70%)`,
            filter: 'blur(20px)',
          }}/>
          {/* Orb */}
          <div style={{
            position: 'absolute', inset: 20,
            borderRadius: '50%',
            background: `radial-gradient(circle at 35% 30%, #FFFEEE 0%, #FFE08A 35%, ${accent} 100%)`,
            boxShadow: `0 0 60px ${accent}AA, 0 0 100px ${accent}66`,
          }}/>
          {/* Highlight */}
          <div style={{
            position: 'absolute', top: 30, left: 35, width: 50, height: 20,
            background: 'rgba(255,255,255,0.7)',
            borderRadius: '50%',
            filter: 'blur(8px)',
          }}/>
        </div>
      </div>

      {/* headline */}
      <h1 className="serif" style={{
        fontSize: 46, lineHeight: 1.0, fontWeight: 500,
        letterSpacing: '-0.03em', color: '#FAF8F5',
        textAlign: 'center',
        marginTop: 16, marginBottom: 16,
      }}>
        unbox,<br/>
        watch,<br/>
        <em style={{ fontFamily: 'Fraunces, serif', fontStyle: 'italic', color: accent, fontWeight: 500 }}>done.</em>
      </h1>

      <p style={{
        fontSize: 15, lineHeight: 1.5, color: 'rgba(250,248,245,0.7)',
        margin: '0 0 32px', textAlign: 'center',
        maxWidth: 280, alignSelf: 'center',
      }}>
        Turns boring product manuals into bite-sized video setup guides.
      </p>

      <div style={{ flex: 1 }}/>

      {/* Start Setup button */}
      <Btn variant="primary" size="xl" accent={accent} onClick={() => onUpload('demo-lamp')} style={{ width: '100%' }}>
        Start Setup &nbsp;→
      </Btn>
    </div>
  );
}

function BeforeAfterStrip({ accent }) {
  return (
    <div style={{
      display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 8, alignItems: 'center',
      marginBottom: 4,
    }}>
      {/* crumpled paper manual */}
      <div style={{
        height: 86, borderRadius: 14, background: '#F5EDE0',
        position: 'relative', overflow: 'hidden',
        border: '1px solid #E8E2D6',
      }}>
        <svg viewBox="0 0 140 90" preserveAspectRatio="xMidYMid slice"
             style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
          {/* crumpled paper shape */}
          <path d="M 18 12 L 122 16 L 126 78 L 14 76 Z" fill="#FBF4E8" stroke="#1A1A1A" strokeWidth="1.4" strokeLinejoin="round" transform="rotate(-3 70 45)"/>
          {/* fake text lines */}
          {[24, 32, 40, 48, 56, 64].map((y, i) => (
            <line key={i} x1="26" y1={y} x2={i % 2 ? 100 : 110} y2={y - 1} stroke="#8A8378" strokeWidth="1.5" opacity=".55" transform="rotate(-3 70 45)"/>
          ))}
          {/* tiny diagram */}
          <circle cx="38" cy="62" r="4" fill="none" stroke="#8A8378" strokeWidth="1" transform="rotate(-3 70 45)"/>
          {/* coffee stain */}
          <ellipse cx="92" cy="58" rx="10" ry="4" fill="#B85A3A" opacity=".18" transform="rotate(-3 70 45)"/>
          {/* fold crease */}
          <path d="M 60 12 L 64 76" stroke="#1A1A1A" strokeWidth="1" opacity=".25" strokeDasharray="2 3" transform="rotate(-3 70 45)"/>
        </svg>
      </div>

      {/* arrow */}
      <div style={{
        width: 28, height: 28, borderRadius: '50%', background: accent,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: `0 4px 10px ${accent}55`,
      }}>
        <svg width="14" height="14" viewBox="0 0 14 14"><path d="M2 7h10M8 3l4 4-4 4" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </div>

      {/* mini phone with reel */}
      <div style={{
        height: 86, borderRadius: 14, position: 'relative', overflow: 'hidden',
        border: '1.5px solid #1A1A1A',
        background: '#0E0A06',
      }}>
        {/* tiny step screen preview */}
        <div style={{ position: 'absolute', inset: 0 }}>
          <div style={{
            position: 'absolute', inset: 0,
            background: 'radial-gradient(120% 80% at 50% 30%, #3F2616 0%, #0E0805 100%)',
          }}/>
          {/* lit globe mini */}
          <div style={{
            position: 'absolute', left: '50%', top: '46%', transform: 'translate(-50%,-50%)',
            width: 36, height: 36, borderRadius: '50%',
            background: 'radial-gradient(circle at 35% 30%, #FFFEEE, #FFC83D)',
            boxShadow: `0 0 24px ${accent}AA, 0 0 48px #FFC83D44`,
          }}/>
          {/* overlay text suggestion */}
          <div style={{
            position: 'absolute', left: 8, right: 8, bottom: 8,
            color: '#FAF8F5', fontSize: 9.5, fontWeight: 700,
          }}>
            Power on.
          </div>
          {/* progress bar */}
          <div style={{ position: 'absolute', left: 8, right: 8, bottom: 4, height: 2, borderRadius: 2, background: 'rgba(255,255,255,.18)' }}>
            <div style={{ width: '92%', height: '100%', background: accent, borderRadius: 2 }}/>
          </div>
        </div>
      </div>
    </div>
  );
}

function DemoChip({ onClick, icon, label, highlight, recommended }) {
  return (
    <button onClick={onClick} className="pressable"
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 6, position: 'relative',
        padding: '7px 12px 7px 7px', borderRadius: 999,
        background: '#FFFFFF',
        border: highlight ? `1.5px solid ${highlight}` : '1px solid #E8E2D6',
        fontSize: 12.5, fontWeight: 500, color: '#1A1A1A',
        cursor: 'pointer', fontFamily: 'Inter, sans-serif',
        boxShadow: '0 1px 0 rgba(0,0,0,.02)',
        whiteSpace: 'nowrap',
      }}>
      <span style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        width: 26, height: 26, borderRadius: '50%', background: '#FBEFE2',
      }}>{icon}</span>
      {label}
      {recommended && <span style={{
        position: 'absolute', top: -7, right: -4,
        background: highlight, color: '#fff', fontSize: 9, fontWeight: 700,
        padding: '2px 6px', borderRadius: 999, letterSpacing: '.04em',
      }}>DEMO</span>}
    </button>
  );
}

// ─────────────────────────────────────────────────────────────
// Screen 2 — Confirmation (Dark mode with loading states)
// ─────────────────────────────────────────────────────────────
function ConfirmScreen({ accent, onConfirm, onRetry }) {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 1300);
    const t2 = setTimeout(() => setPhase(2), 2700);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  // Loading/Analyzing state (dark mode)
  if (phase < 2) {
    return (
      <div className="fade-in" style={{
        width: '100%', height: '100%',
        background: 'radial-gradient(ellipse 120% 80% at 50% 30%, #2A1810 0%, #0E0A06 100%)',
        padding: '60px 26px 28px', boxSizing: 'border-box',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        gap: 28, textAlign: 'center', position: 'relative',
      }}>
        <div style={{ position: 'absolute', top: 60, left: 0, right: 0, display: 'flex', justifyContent: 'center' }}>
          <HeyUnboxPill variant="dark" accent={accent}/>
        </div>

        {/* Document scanning icon */}
        <div style={{
          width: 140, height: 140, borderRadius: 24,
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.12)',
          position: 'relative', overflow: 'hidden',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          padding: 24, gap: 10,
        }}>
          {/* Document lines */}
          {[0, 1, 2].map((i) => (
            <div key={i} style={{
              width: i === 2 ? '60%' : '80%',
              height: 8,
              borderRadius: 4,
              background: i === 0 ? accent : `rgba(224,120,86,${0.5 - i * 0.15})`,
            }}/>
          ))}
          {/* Scanning line */}
          <div style={{
            position: 'absolute', left: 12, right: 12, height: 2, borderRadius: 2,
            background: accent, boxShadow: `0 0 12px ${accent}AA`,
            animation: 'scanLine 1.8s ease-in-out infinite',
          }}/>
          <style>{`@keyframes scanLine{0%{top:20%}50%{top:75%}100%{top:20%}}`}</style>
        </div>

        <div>
          <div className="serif" key={phase} style={{
            fontSize: 24, fontWeight: 500, color: '#FAF8F5',
            animation: 'fadeUp .4s cubic-bezier(.22,1,.36,1) both',
          }}>
            {phase === 0 ? 'Reading your manual…' : 'Imagining your product...'}
          </div>
          <div style={{ display: 'inline-flex', gap: 6, marginTop: 16 }}>
            {[0,1,2].map(i => (
              <div key={i} style={{
                width: 8, height: 8, borderRadius: '50%', background: accent,
                animation: `dotPulse 1.2s ${i*0.18}s infinite`,
              }}/>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Confirmation state (dark mode)
  return (
    <div className="fade-in" style={{
      width: '100%', height: '100%',
      background: 'radial-gradient(ellipse 120% 80% at 50% 20%, #2A1810 0%, #0E0A06 100%)',
      padding: '60px 22px 28px', boxSizing: 'border-box',
      display: 'flex', flexDirection: 'column', position: 'relative',
    }}>
      {/* Hey Unbox pill centered at top */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
        <HeyUnboxPill variant="dark" accent={accent}/>
      </div>

      {/* Manual decoded label */}
      <div style={{ fontSize: 11, color: accent, letterSpacing: '.08em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 8 }}>
        Manual decoded
      </div>

      <h2 className="serif" style={{ fontSize: 28, fontWeight: 500, lineHeight: 1.15, color: '#FAF8F5', marginBottom: 20 }}>
        Looks like you're<br/>assembling a...
      </h2>

      {/* Product card (dark themed) */}
      <div className="fade-up" style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 20,
        overflow: 'hidden', flex: '0 0 auto',
      }}>
        {/* Product hero image area */}
        <div style={{ height: 180, position: 'relative', background: '#1A130C' }}>
          {/* Glowing lamp illustration */}
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <div style={{ position: 'relative', width: 120, height: 120 }}>
              {/* Glow */}
              <div style={{
                position: 'absolute', inset: -30,
                background: `radial-gradient(circle, ${accent}44 0%, ${accent}11 50%, transparent 70%)`,
                filter: 'blur(15px)',
              }}/>
              {/* Orb */}
              <div style={{
                position: 'absolute', inset: 10,
                borderRadius: '50%',
                background: `radial-gradient(circle at 35% 30%, #FFFEEE 0%, #FFE08A 40%, ${accent} 100%)`,
                boxShadow: `0 0 40px ${accent}88`,
              }}/>
              {/* Highlight */}
              <div style={{
                position: 'absolute', top: 22, left: 28, width: 40, height: 14,
                background: 'rgba(255,255,255,0.8)',
                borderRadius: '50%',
                filter: 'blur(6px)',
              }}/>
            </div>
          </div>
          {/* AI Rendering badge */}
          <div style={{
            position: 'absolute', top: 12, left: 12,
            padding: '4px 10px', borderRadius: 6, fontSize: 10,
            background: accent,
            color: '#fff', fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase',
            whiteSpace: 'nowrap',
          }}>AI Rendering</div>
        </div>

        {/* Product info */}
        <div style={{ padding: '16px 18px 18px' }}>
          <div className="serif" style={{ fontSize: 20, fontWeight: 600, color: '#FAF8F5', letterSpacing: '-0.01em' }}>
            {PRODUCT.name}
          </div>
          <div style={{ fontSize: 13, color: 'rgba(250,248,245,0.6)', lineHeight: 1.45, marginTop: 4 }}>
            {PRODUCT.blurb}
          </div>
          <div style={{ fontSize: 13, color: '#FAF8F5', marginTop: 10, fontWeight: 600 }}>
            {PRODUCT.steps} steps · about {PRODUCT.mins} minutes
          </div>
        </div>
      </div>

      <div style={{ flex: 1 }}/>

      <div style={{ fontSize: 15, color: '#FAF8F5', marginBottom: 12, fontWeight: 500 }}>
        Is that right?
      </div>
      <Btn variant="primary" size="xl" accent={accent} onClick={onConfirm} style={{ width: '100%' }}>
        Yes, let's go &nbsp;→
      </Btn>
      <button onClick={onRetry} style={{
        width: '100%', marginTop: 10, padding: '12px 0',
        background: 'transparent', border: 0, cursor: 'pointer',
        color: 'rgba(250,248,245,0.5)', fontSize: 14, fontWeight: 500,
        fontFamily: 'Inter, sans-serif',
      }}>
        Nope, try again
      </button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Screen 3 — Reel-style step view (full-bleed dark cinematic)
// ─────────────────────────────────────────────────────────────
function GuideScreen({ accent, stepIdx, setStepIdx, onMic, onExit }) {
  const total = DEMO_STEPS.length;
  const isLast = stepIdx === total - 1;

  const startY = useRef(null);
  const [drag, setDrag] = useState(0);

  const goNext = () => setStepIdx(Math.min(stepIdx + 1, total - 1));
  const goPrev = () => setStepIdx(Math.max(stepIdx - 1, 0));

  const onTouchStart = (e) => { startY.current = e.touches[0].clientY; };
  const onTouchMove = (e) => {
    if (startY.current == null) return;
    const dy = e.touches[0].clientY - startY.current;
    setDrag(Math.max(-80, Math.min(80, dy)));
  };
  const onTouchEnd = () => {
    if (drag < -40) goNext();
    else if (drag > 40) goPrev();
    setDrag(0);
    startY.current = null;
  };

  const wheelGate = useRef(0);
  const onWheel = (e) => {
    const now = Date.now();
    if (now - wheelGate.current < 600) return;
    if (e.deltaY > 30) { wheelGate.current = now; goNext(); }
    else if (e.deltaY < -30) { wheelGate.current = now; goPrev(); }
  };

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') goNext();
      else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [stepIdx]);

  return (
    <div
      onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}
      onWheel={onWheel}
      style={{
        width: '100%', height: '100%', position: 'relative', overflow: 'hidden',
        background: '#0E0A06',
      }}
      className="app-surface">

      {/* layered step "cards" — full-bleed images */}
      <div style={{ position: 'absolute', inset: 0 }}>
        {DEMO_STEPS.map((s, i) => {
          const offset = i - stepIdx;
          if (Math.abs(offset) > 1) return null;
          const ty = offset * 100 + (i === stepIdx ? (drag / 8) : 0);
          return (
            <div key={i} style={{
              position: 'absolute', inset: 0,
              transform: `translateY(${ty}%)`,
              transition: drag === 0 ? 'transform .55s cubic-bezier(.22,1,.36,1)' : 'none',
            }}>
              <ReelStep
                idx={i}
                step={s}
                accent={accent}
                isLast={i === total - 1}
                showHint={i === 0 && stepIdx === 0}
                onExit={onExit}
                onMic={onMic}
                onRestart={onExit}
                stepIdx={stepIdx}
                setStepIdx={setStepIdx}
              />
            </div>
          );
        })}
      </div>

      {/* TikTok-style right-edge dots */}
      {!isLast && (
        <div style={{
          position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)',
          display: 'flex', flexDirection: 'column', gap: 6, zIndex: 6,
        }}>
          {DEMO_STEPS.map((_, i) => (
            <button key={i} onClick={() => setStepIdx(i)} style={{
              width: i === stepIdx ? 8 : 6,
              height: i === stepIdx ? 22 : 6,
              borderRadius: 999, border: 0, padding: 0, cursor: 'pointer',
              background: i === stepIdx ? accent : 'rgba(250,248,245,.32)',
              transition: 'all .35s cubic-bezier(.22,1,.36,1)',
            }}/>
          ))}
        </div>
      )}
    </div>
  );
}

function ReelStep({ idx, step, accent, isLast, showHint, onExit, onMic, onRestart, stepIdx, setStepIdx }) {
  const [tellMore, setTellMore] = useState(false);
  const [genieOpen, setGenieOpen] = useState(false);
  const Illu = STEP_ILLUS[idx];

  if (isLast) return <CelebrationCard accent={accent} onRestart={onRestart}/>;

  const progress = ((idx + 1) / DEMO_STEPS.length) * 100;

  const handleGoToStep = (stepIndex) => {
    if (setStepIdx) {
      setStepIdx(stepIndex);
    }
  };

  return (
    <div style={{
      width: '100%', height: '100%', position: 'relative',
      background: '#0E0A06', overflow: 'hidden',
    }}>
      {/* Full-bleed illustration */}
      <Illu/>

      {/* top gradient for legibility */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 200,
        background: 'linear-gradient(to bottom, rgba(0,0,0,.55), rgba(0,0,0,0))',
        pointerEvents: 'none',
      }}/>
      {/* bottom gradient for legibility */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 360,
        background: 'linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,.85))',
        pointerEvents: 'none',
      }}/>

      {/* TOP overlay */}
      <div style={{
        position: 'absolute', top: 56, left: 18, right: 18, zIndex: 5,
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {/* step pill */}
          <div style={{
            display: 'inline-flex', padding: '5px 11px', borderRadius: 999,
            background: 'rgba(0,0,0,.5)', border: '.5px solid rgba(255,255,255,.16)',
            backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
            color: '#FAF8F5', fontSize: 12, fontWeight: 700, letterSpacing: '.02em',
            whiteSpace: 'nowrap',
          }}>
            {idx + 1} / {DEMO_STEPS.length}
          </div>
          <div style={{
            color: 'rgba(250,248,245,.7)', fontSize: 11, fontWeight: 500,
            paddingLeft: 4, whiteSpace: 'nowrap',
          }}>
            {PRODUCT.name}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <HeyUnboxPill variant="dark" accent={accent}/>
          <button onClick={onExit} className="pressable" style={{
            width: 30, height: 30, borderRadius: '50%', border: 0,
            background: 'rgba(0,0,0,.5)', backdropFilter: 'blur(10px)',
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="11" height="11" viewBox="0 0 14 14"><path d="M2 2l10 10M12 2L2 12" stroke="#FAF8F5" strokeWidth="1.8" strokeLinecap="round"/></svg>
          </button>
        </div>
      </div>

      {/* MIDDLE-BOTTOM overlay — title + subtitle */}
      <div style={{
        position: 'absolute', left: 22, right: 22, bottom: 152, zIndex: 5,
      }}>
        <h2 style={{
          fontFamily: 'Inter, sans-serif', fontSize: 38, lineHeight: .98,
          fontWeight: 800, color: '#FAF8F5', letterSpacing: '-0.025em',
          textShadow: '0 4px 24px rgba(0,0,0,.5)', margin: 0, textWrap: 'balance',
        }}>
          {step.title}
        </h2>
        <p style={{
          marginTop: 8, fontSize: 14.5, lineHeight: 1.4, color: 'rgba(250,248,245,.78)',
          textShadow: '0 2px 14px rgba(0,0,0,.6)', textWrap: 'pretty',
        }}>
          {step.sub}
        </p>
      </div>

      {/* "Tell me more" expanded card */}
      {tellMore && (
        <div className="fade-up" style={{
          position: 'absolute', left: 18, right: 18, bottom: 110, zIndex: 8,
          padding: '14px 16px', borderRadius: 18,
          background: 'rgba(20,16,12,.85)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
          border: '.5px solid rgba(255,255,255,.18)',
          color: 'rgba(250,248,245,.95)', fontSize: 13.5, lineHeight: 1.5,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, marginBottom: 6 }}>
            <div style={{ fontSize: 11, color: accent, fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase' }}>
              Why this matters
            </div>
            <button onClick={() => setTellMore(false)} style={{
              border: 0, background: 'transparent', color: 'rgba(250,248,245,.6)',
              fontSize: 18, lineHeight: 1, cursor: 'pointer', padding: 0,
            }}>×</button>
          </div>
          {step.why}
        </div>
      )}

      {/* BOTTOM action bar */}
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 30, zIndex: 7,
        padding: '0 18px',
      }}>
        {/* progress label + bar */}
        <div style={{ marginBottom: 12, paddingRight: 18 /* space for right dots */ }}>
          <div style={{
            display: 'flex', justifyContent: 'space-between', marginBottom: 5,
            fontSize: 10.5, color: 'rgba(250,248,245,.7)', fontWeight: 600, letterSpacing: '.04em',
          }}>
            <span style={{ whiteSpace: 'nowrap' }}>Step {idx + 1} of {DEMO_STEPS.length}</span>
            <span style={{ whiteSpace: 'nowrap' }}>{Math.round(progress)}%</span>
          </div>
          <div style={{
            height: 3, borderRadius: 3, background: 'rgba(255,255,255,.2)', overflow: 'hidden',
          }}>
            <div style={{
              width: `${progress}%`, height: '100%', background: accent,
              boxShadow: `0 0 8px ${accent}AA`,
              transition: 'width .55s cubic-bezier(.22,1,.36,1)',
            }}/>
          </div>
        </div>

        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10,
          paddingRight: 22,
        }}>
          {/* Tell me more pill */}
          <button onClick={() => setTellMore(v => !v)} className="pressable" style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '9px 14px 9px 11px', borderRadius: 999,
            background: tellMore ? accent : 'rgba(255,255,255,.12)',
            color: '#FAF8F5', fontSize: 12.5, fontWeight: 600, border: 0, cursor: 'pointer',
            backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
            whiteSpace: 'nowrap',
            boxShadow: tellMore ? `0 6px 14px ${accent}55` : '0 0 0 1px rgba(255,255,255,.16) inset',
            transition: 'all .25s ease',
          }}>
            <span style={{
              width: 16, height: 16, borderRadius: '50%',
              background: tellMore ? 'rgba(255,255,255,.25)' : 'rgba(255,255,255,.18)',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 10, fontWeight: 800, fontFamily: 'Fraunces, serif',
            }}>?</span>
            Tell me more
          </button>

          {/* Genie orb */}
          <GenieOrb accent={accent} onClick={() => setGenieOpen(true)}/>
        </div>
      </div>

      {/* Genie Panel */}
      {genieOpen && (
        <GeniePanel
          accent={accent}
          currentStep={idx}
          onClose={() => setGenieOpen(false)}
          onGoToStep={handleGoToStep}
        />
      )}

      {/* swipe-up hint */}
      {showHint && (
        <div style={{
          position: 'absolute', left: 0, right: 0, bottom: 198, zIndex: 6,
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          color: 'rgba(250,248,245,.7)', fontSize: 11, fontWeight: 500,
          animation: 'nudgeUp 1.6s ease-in-out infinite',
          pointerEvents: 'none',
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" style={{ marginBottom: 2 }}>
            <path d="M12 5v14M5 12l7-7 7 7" stroke="rgba(250,248,245,.7)" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span style={{ whiteSpace: 'nowrap' }}>Swipe up for next step</span>
        </div>
      )}
    </div>
  );
}

function CelebrationCard({ accent, onRestart }) {
  const confetti = useMemo(() => {
    const colors = ['#E07856', '#FFC83D', '#F4B989', '#FFD982', '#B85A3A'];
    return [...Array(34)].map((_, i) => ({
      left: `${Math.random() * 100}%`,
      delay: Math.random() * 1.6,
      dur: 2.6 + Math.random() * 1.4,
      color: colors[i % colors.length],
      size: 7 + Math.random() * 9,
      shape: i % 3,
    }));
  }, []);

  return (
    <div style={{
      width: '100%', height: '100%', position: 'relative', overflow: 'hidden',
      background: 'radial-gradient(120% 90% at 50% 55%, #5A3220 0%, #2A1810 45%, #0A0604 100%)',
    }} className="fade-in">

      {/* the lit lamp scene */}
      <div style={{ position: 'absolute', inset: 0 }}>
        {React.createElement(STEP_ILLUS[7])}
      </div>

      {/* darkening for text legibility */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '52%',
        background: 'linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,.85))',
        pointerEvents: 'none',
      }}/>

      {/* confetti */}
      {confetti.map((c, i) => (
        <div key={i} style={{
          position: 'absolute', top: -20,
          left: c.left,
          width: c.shape === 2 ? 3 : c.size,
          height: c.shape === 2 ? c.size + 8 : c.size,
          background: c.color,
          borderRadius: c.shape === 1 ? '50%' : 2,
          animation: `confettiFall ${c.dur}s ${c.delay}s linear infinite`,
          opacity: .9,
        }}/>
      ))}

      {/* content overlay */}
      <div style={{
        position: 'absolute', inset: 0, padding: '70px 26px 30px',
        display: 'flex', flexDirection: 'column', alignItems: 'center', boxSizing: 'border-box',
      }}>
        <HeyUnboxPill variant="dark" accent={accent}/>

        <div style={{ flex: 1 }}/>

        <h2 style={{
          fontFamily: 'Inter, sans-serif', fontSize: 52, fontWeight: 800,
          color: '#FAF8F5', letterSpacing: '-0.04em', lineHeight: 1,
          textAlign: 'center', textShadow: '0 4px 30px rgba(0,0,0,.6)',
        }}>
          YOU DID IT.
        </h2>
        <p style={{
          fontSize: 15, color: 'rgba(250,248,245,.85)', lineHeight: 1.45,
          margin: '14px 0 0', textAlign: 'center', maxWidth: 290,
        }}>
          You just installed a lamp in <span style={{ color: accent, fontWeight: 700 }}>23 minutes</span>.
        </p>

        <div style={{ width: '100%', marginTop: 28, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <Btn variant="primary" size="xl" accent={accent} style={{ width: '100%' }} onClick={() => alert('Generated 1080×1920 share image — open in your social app of choice.')}>
            Share my win
          </Btn>
          <Btn variant="glassDark" size="md" onClick={onRestart} style={{ width: '100%' }}>
            Try another manual
          </Btn>
          <button onClick={() => alert('PDF saved to your downloads.')} style={{
            background: 'transparent', border: 0, color: 'rgba(250,248,245,.7)',
            fontSize: 13, fontWeight: 500, marginTop: 4, cursor: 'pointer', textDecoration: 'underline',
            textUnderlineOffset: 3, fontFamily: 'Inter, sans-serif',
          }}>
            Save this guide as a PDF
          </button>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Screen 4 — Voice assistant overlay
// ─────────────────────────────────────────────────────────────
function VoiceOverlay({ accent, stepIdx, onClose, onCaptionUpdate }) {
  const ex = VOICE_EXCHANGES[stepIdx] || VOICE_EXCHANGES.default;
  const [phase, setPhase] = useState(0);
  // 0: listening, 1: user speaking, 2: assistant speaking, 3: done

  const userWords = ex.user.split(' ');
  const [wordsShown, setWordsShown] = useState(0);
  const [replyLine, setReplyLine] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 1100);
    const t2 = setTimeout(() => setPhase(2), 1100 + userWords.length * 120 + 400);
    const t3 = setTimeout(() => setPhase(3), 1100 + userWords.length * 120 + 400 + ex.reply.length * 1900 + 800);
    return () => { [t1,t2,t3].forEach(clearTimeout); };
  }, []);

  // user transcript word-by-word
  useEffect(() => {
    if (phase !== 1) return;
    let i = 0;
    const id = setInterval(() => {
      i++; setWordsShown(i);
      if (i >= userWords.length) clearInterval(id);
    }, 110);
    return () => clearInterval(id);
  }, [phase]);

  // reply line-by-line
  useEffect(() => {
    if (phase < 2) return;
    setReplyLine(1);
    let l = 1;
    const id = setInterval(() => {
      l++; setReplyLine(l);
      if (l >= ex.reply.length) clearInterval(id);
    }, 1900);
    return () => clearInterval(id);
  }, [phase]);

  // caption stream for sidebar mirror
  useEffect(() => {
    if (!onCaptionUpdate) return;
    const captions = [];
    if (phase >= 1) {
      captions.push({ role: 'user', text: userWords.slice(0, wordsShown).join(' ') + (wordsShown < userWords.length ? '…' : '') });
    }
    if (phase >= 2) {
      captions.push({ role: 'unbox', text: ex.reply.slice(0, replyLine).join(' ') });
    }
    onCaptionUpdate({
      step: stepIdx + 1,
      stepTitle: DEMO_STEPS[stepIdx]?.title,
      phase,
      captions,
    });
  }, [phase, wordsShown, replyLine, stepIdx]);

  const isSpeaking = phase === 2;
  const isListening = phase === 0 || phase === 3;

  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 20,
      display: 'flex', flexDirection: 'column',
    }} className="fade-in">

      {/* dim backdrop */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'rgba(20,16,12,.6)',
        backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
      }}/>

      {/* preserved top pills */}
      <div style={{
        position: 'relative', display: 'flex', justifyContent: 'space-between',
        padding: '60px 18px 0',
      }}>
        <div style={{
          padding: '5px 11px', borderRadius: 999,
          background: 'rgba(0,0,0,.55)', border: '.5px solid rgba(255,255,255,.18)',
          backdropFilter: 'blur(10px)',
          color: '#FAF8F5', fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap',
        }}>Step {stepIdx + 1} of {DEMO_STEPS.length}</div>
        <HeyUnboxPill variant="dark" state="active" accent={accent}/>
      </div>

      {/* chat bubbles area */}
      <div style={{
        position: 'relative', flex: 1, padding: '24px 22px 0',
        display: 'flex', flexDirection: 'column', gap: 8, justifyContent: 'flex-end',
        marginBottom: 8, overflow: 'hidden',
      }}>
        {/* user bubble (right-aligned, white) */}
        {phase >= 1 && (
          <div className="fade-up" style={{
            alignSelf: 'flex-end', maxWidth: '82%',
            padding: '10px 14px', borderRadius: '18px 18px 4px 18px',
            background: '#FAF8F5', color: '#1A1A1A',
            fontSize: 14.5, lineHeight: 1.4,
            boxShadow: '0 8px 22px rgba(0,0,0,.3)',
          }}>
            {userWords.slice(0, wordsShown).join(' ')}
            {phase === 1 && wordsShown < userWords.length && <span style={{ opacity: .5 }}>…</span>}
          </div>
        )}

        {/* unbox reply bubble (left-aligned, cream) */}
        {phase >= 2 && (
          <div className="fade-up" style={{
            alignSelf: 'flex-start', maxWidth: '85%',
            padding: '11px 15px', borderRadius: '18px 18px 18px 4px',
            background: '#F5EDE0', color: '#1A1A1A',
            fontSize: 14.5, lineHeight: 1.45,
            boxShadow: '0 8px 22px rgba(0,0,0,.3)',
            position: 'relative',
            display: 'flex', flexDirection: 'column', gap: 4,
          }}>
            <div style={{ fontSize: 10.5, fontWeight: 700, color: accent, letterSpacing: '.06em', textTransform: 'uppercase' }}>Unbox</div>
            <div>{ex.reply.slice(0, replyLine).join(' ')}</div>
            {phase === 2 && replyLine < ex.reply.length && (
              <div style={{
                position: 'absolute', right: 12, bottom: -10,
                display: 'flex', gap: 3, alignItems: 'flex-end', height: 14,
              }}>
                {[0,1,2,3].map(b => (
                  <span key={b} style={{
                    width: 3, height: 12, borderRadius: 2, background: accent,
                    transformOrigin: 'center',
                    animation: `waveBar 0.7s ${b*0.12}s ease-in-out infinite`,
                  }}/>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Voice orb */}
      <div style={{
        position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center',
        marginBottom: 16,
      }}>
        <div style={{ position: 'relative', width: 150, height: 150 }}>
          {/* listening ripples */}
          {isListening && [0,1,2].map(i => (
            <div key={i} style={{
              position: 'absolute', inset: 0, borderRadius: '50%',
              border: `2px solid ${accent}55`,
              animation: `ripple 2.2s ${i*0.7}s ease-out infinite`,
            }}/>
          ))}
          {/* glow */}
          <div style={{
            position: 'absolute', inset: -8, borderRadius: '50%',
            background: `radial-gradient(circle, ${accent}99 0%, ${accent}00 70%)`,
            animation: 'glowPulse 2.4s ease-in-out infinite',
            filter: 'blur(10px)',
          }}/>
          {/* orb */}
          <div style={{
            position: 'absolute', inset: 14, borderRadius: '50%',
            background: `radial-gradient(circle at 35% 30%, #FFD7BB 0%, ${accent} 55%, ${accent} 100%)`,
            boxShadow: `0 14px 40px ${accent}AA, inset -8px -10px 24px rgba(0,0,0,.22), inset 6px 8px 14px rgba(255,231,200,.5)`,
            animation: `breathe ${isSpeaking ? 1.6 : 3}s ease-in-out infinite`,
          }}/>
          {/* center content */}
          {!isSpeaking ? (
            <div style={{
              position: 'absolute', inset: 0, display: 'flex',
              alignItems: 'center', justifyContent: 'center',
            }}>
              <MicIcon size={28}/>
            </div>
          ) : (
            <div style={{
              position: 'absolute', inset: 0, display: 'flex',
              alignItems: 'center', justifyContent: 'center', gap: 4,
            }}>
              {[0,1,2,3,4].map(b => (
                <span key={b} style={{
                  width: 4, borderRadius: 2, background: '#FAF8F5',
                  height: [16, 30, 22, 34, 18][b],
                  animation: `waveBar .55s ${b*0.08}s ease-in-out infinite`,
                  transformOrigin: 'center',
                }}/>
              ))}
            </div>
          )}
        </div>

        <div style={{
          marginTop: 12, color: 'rgba(250,248,245,.78)', fontSize: 12.5, fontWeight: 500, letterSpacing: '.04em',
        }}>
          {phase === 0 && 'Listening…'}
          {phase === 1 && 'Hearing you…'}
          {phase === 2 && 'Unbox is speaking'}
          {phase === 3 && 'Anything else?'}
        </div>
      </div>

      {/* I'm good now CTA */}
      <div style={{
        position: 'relative', display: 'flex', justifyContent: 'center', paddingBottom: 36,
      }}>
        <button onClick={onClose} className="pressable" style={{
          padding: '13px 24px', borderRadius: 999,
          background: '#FAF8F5', color: '#1A1A1A', border: 0, cursor: 'pointer',
          fontFamily: 'Inter, sans-serif', fontSize: 14.5, fontWeight: 600,
          boxShadow: '0 8px 24px rgba(0,0,0,.32)',
        }}>
          I'm good now
        </button>
      </div>
    </div>
  );
}

Object.assign(window, {
  LandingScreen, ConfirmScreen, GuideScreen, VoiceOverlay, CelebrationCard,
  DEMO_STEPS, PRODUCT, VOICE_EXCHANGES, HeyUnboxPill, MicIcon, Btn,
});
