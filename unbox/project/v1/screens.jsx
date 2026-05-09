// screens.jsx
// Four screens of the Unbox prototype + voice overlay.
// Reads from window globals: STEP_ILLUS, ProductHero, ChipChair/Lamp/Desk, ILLU_PALETTE.

const { useState, useEffect, useRef, useMemo } = React;

// Hardcoded demo content
const DEMO_STEPS = [
  { text: "First, turn off the power at your circuit breaker. Safety first.",
    why: "Wiring with the power on is the one way this gets dangerous. Two seconds at the breaker prevents a shock." },
  { text: "Take the lamp shade and the metal mounting ring out of the box. Put the screws aside — you'll need them in step 6.",
    why: "Keeping the screws in their own little pile means you won't be hunting under the couch later." },
  { text: "Hold the metal ring up against the ceiling where you want the lamp. Make sure it's centered.",
    why: "The ring is the anchor for everything else, so getting it centered now saves a wonky lamp later." },
  { text: "Connect the three wires from the ceiling to the lamp base — match the colors: brown to brown, blue to blue, yellow-green to yellow-green.",
    why: "Each wire has a job — live, neutral, and ground. Matching colors makes sure you wire it the way the manufacturer intended." },
  { text: "Tuck the wires neatly into the base so nothing's poking out.",
    why: "A tidy bundle means the base will sit flush against the ceiling without any awkward gaps." },
  { text: "Lift the lamp base up to the ceiling and secure it with the two screws from step 2.",
    why: "Snug, not Hulk-tight. Stop turning when the base is firm against the ceiling — over-tightening can crack the housing." },
  { text: "Slide the round lampshade up and twist it gently until it clicks into place on the metal ring.",
    why: "There's a quarter-turn lock built into the ring. You'll feel a soft click when it's properly seated." },
  { text: "Turn the power back on. Flip the switch. You're done.",
    why: "Worth taking a moment to admire it — you just did electrical work, which is something most people are afraid to try." },
];

const PRODUCT = {
  name: "Lumen Halo Ceiling Lamp",
  blurb: "a flush-mount LED ceiling light with a frosted globe shade.",
};

// ─── small UI atoms ──────────────────────────────────────────────
function Btn({ children, onClick, variant = 'primary', size = 'md', style = {}, accent = '#E07856' }) {
  const sizes = {
    sm: { padding: '10px 16px', fontSize: 14, borderRadius: 999 },
    md: { padding: '14px 20px', fontSize: 15, borderRadius: 999 },
    lg: { padding: '18px 24px', fontSize: 17, borderRadius: 999 },
    xl: { padding: '20px 26px', fontSize: 18, borderRadius: 22 },
  };
  const variants = {
    primary: {
      background: accent, color: '#fff',
      boxShadow: `0 6px 14px ${accent}44, inset 0 -2px 0 rgba(0,0,0,.08)`,
    },
    ghost: {
      background: 'transparent', color: '#5A554D',
    },
    soft: {
      background: 'rgba(0,0,0,.05)', color: '#1A1A1A',
    },
    outline: {
      background: '#FAF8F5', color: '#1A1A1A',
      boxShadow: 'inset 0 0 0 1.5px #1A1A1A',
    },
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

// ─── Screen 1 — Landing / Upload ─────────────────────────────────
function LandingScreen({ accent, onUpload }) {
  const [drag, setDrag] = useState(false);
  return (
    <div style={{
      width: '100%', height: '100%', background: 'var(--bg)',
      display: 'flex', flexDirection: 'column',
      padding: '70px 22px 28px', boxSizing: 'border-box', overflow: 'hidden',
    }} className="fade-in">
      {/* Wordmark */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24 }}>
        <div style={{
          width: 28, height: 28, borderRadius: 9,
          background: accent, position: 'relative',
          boxShadow: `0 4px 10px ${accent}55`,
        }}>
          <div style={{ position: 'absolute', inset: 6, borderRadius: 5,
            background: '#FAF8F5', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'Fraunces, serif', fontSize: 13, fontWeight: 700, color: accent,
          }}>U</div>
        </div>
        <span style={{ fontFamily: 'Fraunces, serif', fontSize: 19, fontWeight: 600, letterSpacing: '-0.01em' }}>Unbox</span>
      </div>

      {/* Headline */}
      <h1 className="serif" style={{
        fontSize: 38, lineHeight: 1.05, fontWeight: 600,
        letterSpacing: '-0.02em', color: '#1A1A1A',
        marginTop: 4, marginBottom: 10, textWrap: 'balance',
      }}>
        The manual<br/>
        you actually<br/>
        <em style={{ fontFamily: 'Fraunces, serif', fontStyle: 'italic', color: accent, fontWeight: 500 }}>want to read.</em>
      </h1>
      <p style={{
        fontSize: 15.5, lineHeight: 1.45, color: '#5A554D',
        margin: '0 0 22px', textWrap: 'pretty',
      }}>
        Upload any user manual. We'll turn it into a guide your 10-year-old self could follow.
      </p>

      {/* Drop zone */}
      <div
        onClick={() => onUpload('file')}
        onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => { e.preventDefault(); setDrag(false); onUpload('drop'); }}
        className="pressable"
        style={{
          flex: 1, minHeight: 0,
          background: drag ? '#FBEFE2' : '#FFFFFF',
          border: `2px dashed ${drag ? accent : '#D9CFBE'}`,
          borderRadius: 28,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          padding: 18, gap: 14, cursor: 'pointer',
          boxShadow: drag ? `0 12px 28px ${accent}33` : '0 1px 0 rgba(0,0,0,.02)',
          transition: 'all .25s ease',
        }}>
        {/* upload icon — soft circular */}
        <div style={{
          width: 76, height: 76, borderRadius: '50%',
          background: drag ? accent : '#FBEFE2',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: 'inset 0 -3px 0 rgba(0,0,0,.04)',
        }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <path d="M12 16V4M12 4l-5 5M12 4l5 5" stroke={drag ? '#fff' : accent} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M4 14v4a2 2 0 002 2h12a2 2 0 002-2v-4" stroke={drag ? '#fff' : accent} strokeWidth="2.4" strokeLinecap="round"/>
          </svg>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div className="serif" style={{ fontSize: 21, fontWeight: 600, color: '#1A1A1A', marginBottom: 4 }}>
            Drop your manual here
          </div>
          <div style={{ fontSize: 13.5, color: '#8A8378' }}>
            PDF or photo · we handle the rest
          </div>
        </div>
        <div style={{
          marginTop: 4, padding: '7px 13px', borderRadius: 999,
          background: '#FAF8F5', fontSize: 12, color: '#5A554D',
          border: '1px solid #E8E2D6',
        }}>
          or tap to browse
        </div>
      </div>

      {/* Demo chips */}
      <div style={{ marginTop: 18 }}>
        <div style={{ fontSize: 12, color: '#8A8378', marginBottom: 10, letterSpacing: '.04em', textTransform: 'uppercase', fontWeight: 600 }}>
          or try a demo
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <DemoChip onClick={() => onUpload('demo-chair')} icon={<ChipChair/>} label="POÄNG-style chair"/>
          <DemoChip onClick={() => onUpload('demo-lamp')} icon={<ChipLamp/>} label="Ceiling lamp" highlight={accent}/>
          <DemoChip onClick={() => onUpload('demo-desk')} icon={<ChipDesk/>} label="Standing desk"/>
        </div>
      </div>

      {/* Footer */}
      <div style={{ textAlign: 'center', marginTop: 18, fontSize: 12, color: '#8A8378' }}>
        No account needed · Free to try
      </div>
    </div>
  );
}

function DemoChip({ onClick, icon, label, highlight }) {
  return (
    <button onClick={onClick} className="pressable"
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 7,
        padding: '8px 12px 8px 8px', borderRadius: 999,
        background: '#FFFFFF',
        border: highlight ? `1.5px solid ${highlight}` : '1px solid #E8E2D6',
        fontSize: 13, fontWeight: 500, color: '#1A1A1A',
        cursor: 'pointer', fontFamily: 'Inter, sans-serif',
        boxShadow: '0 1px 0 rgba(0,0,0,.02)',
      }}>
      <span style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        width: 28, height: 28, borderRadius: '50%',
        background: '#FBEFE2',
      }}>{icon}</span>
      {label}
    </button>
  );
}

// ─── Screen 2 — Confirmation ─────────────────────────────────────
function ConfirmScreen({ accent, onConfirm, onRetry }) {
  // simulate the two-stage processing
  const [phase, setPhase] = useState(0); // 0 reading, 1 imagining, 2 done
  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 1400);
    const t2 = setTimeout(() => setPhase(2), 2900);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  if (phase < 2) {
    return (
      <div className="fade-in" style={{
        width: '100%', height: '100%', background: 'var(--bg)',
        padding: '90px 26px 28px', boxSizing: 'border-box',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        gap: 24, textAlign: 'center',
      }}>
        {/* gentle scanning visual */}
        <div style={{
          width: 130, height: 130, borderRadius: 28,
          background: '#FBEFE2', position: 'relative', overflow: 'hidden',
          boxShadow: 'inset 0 -3px 0 rgba(0,0,0,.03)',
        }}>
          {/* paper */}
          <div style={{
            position: 'absolute', inset: 18, background: '#FFFFFF', borderRadius: 10,
            border: '1.5px solid #E8E2D6',
            display: 'flex', flexDirection: 'column', gap: 6, padding: 12, justifyContent: 'flex-start',
          }}>
            {[...Array(5)].map((_,i) => (
              <div key={i} style={{
                height: 5, borderRadius: 3, background: '#EAD8C2',
                width: `${[80, 60, 90, 50, 70][i]}%`,
              }}/>
            ))}
          </div>
          {/* scan line */}
          <div style={{
            position: 'absolute', left: 8, right: 8, height: 3, borderRadius: 3,
            background: accent,
            boxShadow: `0 0 18px ${accent}AA`,
            top: '50%',
            animation: 'scanLine 1.6s ease-in-out infinite',
          }}/>
          <style>{`@keyframes scanLine{0%{top:18%}50%{top:78%}100%{top:18%}}`}</style>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
          <div className="serif" key={phase} style={{
            fontSize: 24, fontWeight: 600, color: '#1A1A1A', letterSpacing: '-0.01em',
            animation: 'fadeUp .4s cubic-bezier(.22,1,.36,1) both',
          }}>
            {phase === 0 ? 'Reading your manual…' : 'Imagining your product…'}
          </div>
          <div style={{ display: 'inline-flex', gap: 5, marginTop: 4 }}>
            {[0,1,2].map(i => (
              <div key={i} style={{
                width: 7, height: 7, borderRadius: '50%', background: accent,
                animation: `dotPulse 1.2s ${i*0.18}s infinite`,
              }}/>
            ))}
          </div>
          <div style={{ fontSize: 13, color: '#8A8378', marginTop: 8, maxWidth: 250 }}>
            This usually takes a few seconds. We're not making any of this up — we're just translating it.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fade-in" style={{
      width: '100%', height: '100%', background: 'var(--bg)',
      padding: '70px 22px 28px', boxSizing: 'border-box',
      display: 'flex', flexDirection: 'column',
    }}>
      <div style={{ fontSize: 12, color: '#8A8378', letterSpacing: '.06em', textTransform: 'uppercase', fontWeight: 600, marginBottom: 8 }}>
        Manual decoded
      </div>
      <h2 className="serif" style={{ fontSize: 22, fontWeight: 600, lineHeight: 1.15, color: '#1A1A1A', marginBottom: 20, textWrap: 'balance' }}>
        Looks like you're<br/>assembling a…
      </h2>

      {/* Product card */}
      <div className="fade-up" style={{
        background: '#FFFFFF', borderRadius: 28,
        boxShadow: '0 1px 0 rgba(0,0,0,.02), 0 24px 48px rgba(28,20,12,.08)',
        overflow: 'hidden', flex: '0 0 auto',
      }}>
        <div style={{ height: 220, background: '#FFF6DD', position: 'relative' }}>
          <ProductHero/>
          <div style={{
            position: 'absolute', top: 14, left: 14,
            padding: '5px 10px', borderRadius: 999, fontSize: 11,
            background: 'rgba(255,255,255,.85)', backdropFilter: 'blur(8px)',
            color: '#5A554D', fontWeight: 600, letterSpacing: '.04em', textTransform: 'uppercase',
            whiteSpace: 'nowrap',
          }}>AI rendering</div>
        </div>
        <div style={{ padding: '18px 20px 22px' }}>
          <div className="serif" style={{ fontSize: 22, fontWeight: 600, color: '#1A1A1A', letterSpacing: '-0.01em' }}>
            {PRODUCT.name}
          </div>
          <div style={{ fontSize: 14, color: '#5A554D', lineHeight: 1.5, marginTop: 6 }}>
            {PRODUCT.blurb} <span style={{ color: '#8A8378' }}>8 steps · about 25 minutes.</span>
          </div>
        </div>
      </div>

      <div style={{ flex: 1 }}/>

      <div style={{ fontSize: 14.5, color: '#1A1A1A', marginBottom: 12, fontWeight: 500 }}>
        Is that right?
      </div>
      <Btn variant="primary" size="xl" accent={accent} onClick={onConfirm} style={{ width: '100%' }}>
        Yes, let's go &nbsp;→
      </Btn>
      <Btn variant="ghost" size="md" onClick={onRetry} style={{ width: '100%', marginTop: 8 }}>
        Nope, try again
      </Btn>
    </div>
  );
}

// ─── Screen 3 — Reel-style step guide ───────────────────────────
function GuideScreen({ accent, stepIdx, setStepIdx, onMic, onRestart }) {
  const total = DEMO_STEPS.length;
  const isLast = stepIdx === total - 1;

  // touch swipe state
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

  // mouse-wheel for desktop
  const wheelGate = useRef(0);
  const onWheel = (e) => {
    const now = Date.now();
    if (now - wheelGate.current < 600) return;
    if (e.deltaY > 30) { wheelGate.current = now; goNext(); }
    else if (e.deltaY < -30) { wheelGate.current = now; goPrev(); }
  };

  // keyboard arrow nav (anywhere on the page)
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
        background: 'var(--bg)',
      }}
      className="app-surface">

      {/* Stack of step "cards" — each at full height, translated in/out */}
      <div style={{ position: 'absolute', inset: 0 }}>
        {DEMO_STEPS.map((s, i) => {
          const offset = i - stepIdx;
          // Only render adjacent for performance
          if (Math.abs(offset) > 1) return null;
          const ty = offset * 100 + (i === stepIdx ? (drag / 8) : 0);
          return (
            <div key={i} style={{
              position: 'absolute', inset: 0,
              transform: `translateY(${ty}%)`,
              transition: drag === 0 ? 'transform .55s cubic-bezier(.22,1,.36,1)' : 'none',
            }}>
              <StepCard
                idx={i}
                step={s}
                accent={accent}
                isLast={i === total - 1}
                showHint={i === 0 && stepIdx === 0}
                onRestart={onRestart}
                onNext={goNext}
              />
            </div>
          );
        })}
      </div>

      {/* Right-edge dot indicator */}
      <div style={{
        position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)',
        display: 'flex', flexDirection: 'column', gap: 6, zIndex: 6,
      }}>
        {DEMO_STEPS.map((_, i) => (
          <div key={i}
            onClick={() => setStepIdx(i)}
            style={{
              width: i === stepIdx ? 7 : 5,
              height: i === stepIdx ? 22 : 5,
              borderRadius: 999,
              background: i === stepIdx ? accent : 'rgba(26,26,26,.18)',
              transition: 'all .35s cubic-bezier(.22,1,.36,1)',
              cursor: 'pointer',
            }}/>
        ))}
      </div>

      {/* Top header — small product label + step counter */}
      <div style={{
        position: 'absolute', top: 56, left: 18, right: 38, zIndex: 5,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{
          padding: '6px 12px', borderRadius: 999,
          background: 'rgba(255,255,255,.7)',
          backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
          fontSize: 12, color: '#5A554D', fontWeight: 600,
          border: '.5px solid rgba(0,0,0,.06)',
          display: 'inline-flex', alignItems: 'center', gap: 6,
          whiteSpace: 'nowrap',
        }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: accent }}/>
          {PRODUCT.name}
        </div>
        <button onClick={onRestart} className="pressable" style={{
          width: 34, height: 34, borderRadius: '50%', border: 0,
          background: 'rgba(255,255,255,.7)', backdropFilter: 'blur(10px)',
          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="14" height="14" viewBox="0 0 14 14"><path d="M2 2l10 10M12 2L2 12" stroke="#1A1A1A" strokeWidth="1.8" strokeLinecap="round"/></svg>
        </button>
      </div>

      {/* Sticky mic CTA — present on all steps */}
      {!isLast && (
        <div style={{
          position: 'absolute', left: 0, right: 0, bottom: 30,
          display: 'flex', justifyContent: 'center', zIndex: 7, pointerEvents: 'none',
        }}>
          <button onClick={onMic} className="pressable" style={{
            pointerEvents: 'auto',
            display: 'inline-flex', alignItems: 'center', gap: 10,
            padding: '13px 18px 13px 14px', borderRadius: 999,
            background: '#1A1A1A', color: '#fff', border: 0, cursor: 'pointer',
            fontFamily: 'Inter, sans-serif', fontSize: 14.5, fontWeight: 600,
            boxShadow: '0 14px 30px rgba(0,0,0,.28), 0 0 0 4px rgba(255,255,255,.6)',
          }}>
            <span style={{
              width: 30, height: 30, borderRadius: '50%',
              background: accent,
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <MicIcon size={15}/>
            </span>
            Stuck? Tap to talk.
          </button>
        </div>
      )}
    </div>
  );
}

function StepCard({ idx, step, accent, isLast, showHint, onRestart, onNext }) {
  const [whyOpen, setWhyOpen] = useState(false);
  const Illu = STEP_ILLUS[idx];

  if (isLast) return <CelebrationCard accent={accent} onRestart={onRestart}/>;

  return (
    <div style={{
      width: '100%', height: '100%',
      display: 'flex', flexDirection: 'column',
      background: 'var(--bg)',
    }}>
      {/* Top illustration — ~58% of height */}
      <div style={{ height: '58%', position: 'relative' }}>
        <Illu/>
        {/* big step number badge */}
        <div style={{
          position: 'absolute', left: 18, bottom: 18,
          padding: '6px 12px', borderRadius: 999,
          background: 'rgba(255,255,255,.7)',
          backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
          fontSize: 12, color: '#1A1A1A', fontWeight: 600, letterSpacing: '.04em',
          border: '.5px solid rgba(0,0,0,.06)',
          whiteSpace: 'nowrap',
        }}>
          STEP {idx + 1} OF {DEMO_STEPS.length}
        </div>
      </div>

      {/* Bottom content */}
      <div style={{
        flex: 1, padding: '20px 22px 110px',
        display: 'flex', flexDirection: 'column',
        boxSizing: 'border-box', minHeight: 0,
      }}>
        <div className="serif" style={{
          fontSize: 30, fontWeight: 600, color: '#1A1A1A',
          letterSpacing: '-0.02em', lineHeight: 1.0,
          marginBottom: 14,
        }}>
          Step <span style={{ color: accent }}>{idx + 1}</span> of {DEMO_STEPS.length}
        </div>

        <div style={{
          fontSize: 17, lineHeight: 1.4, color: '#1A1A1A',
          textWrap: 'pretty', fontWeight: 400,
        }}>
          {step.text}
        </div>

        {/* Why pill */}
        <div style={{ marginTop: 14 }}>
          <button onClick={() => setWhyOpen(v => !v)} className="pressable" style={{
            display: 'inline-flex', alignItems: 'center', gap: 7,
            padding: '7px 12px 7px 10px', borderRadius: 999,
            background: whyOpen ? accent : '#FFFFFF',
            color: whyOpen ? '#fff' : '#1A1A1A',
            border: whyOpen ? '1px solid transparent' : '1px solid #E8E2D6',
            fontSize: 13, fontWeight: 600, cursor: 'pointer',
            transition: 'all .25s ease',
          }}>
            <span style={{
              width: 18, height: 18, borderRadius: '50%',
              background: whyOpen ? 'rgba(255,255,255,.25)' : '#FBEFE2',
              color: whyOpen ? '#fff' : accent,
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 11, fontWeight: 700, fontFamily: 'Fraunces, serif',
            }}>?</span>
            Why
          </button>
          {whyOpen && (
            <div className="fade-up" style={{
              marginTop: 10, padding: '12px 14px',
              borderRadius: 16,
              background: '#FBEFE2',
              fontSize: 13.5, lineHeight: 1.45, color: '#5A554D',
              border: `1px solid ${accent}33`,
            }}>
              {step.why}
            </div>
          )}
        </div>

        <div style={{ flex: 1 }}/>

        {/* Swipe hint on first step */}
        {showHint && (
          <div style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            color: '#8A8378', fontSize: 12, fontWeight: 500,
            marginBottom: -2,
            animation: 'nudgeUp 1.6s ease-in-out infinite',
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" style={{ marginBottom: 2 }}>
              <path d="M12 5v14M5 12l7-7 7 7" stroke="#8A8378" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span style={{ whiteSpace: 'nowrap' }}>Swipe up for next step</span>
          </div>
        )}
      </div>
    </div>
  );
}

function CelebrationCard({ accent, onRestart }) {
  const confetti = useMemo(() => {
    const colors = ['#E07856', '#FFC83D', '#B7C9A0', '#7AA8D4', '#F5C9A8'];
    return [...Array(28)].map((_, i) => ({
      left: `${Math.random() * 100}%`,
      delay: Math.random() * 1.6,
      dur: 2.6 + Math.random() * 1.4,
      color: colors[i % colors.length],
      size: 7 + Math.random() * 8,
      shape: i % 3, // 0 rect, 1 circle, 2 thin rect
    }));
  }, []);

  return (
    <div style={{
      width: '100%', height: '100%', position: 'relative',
      background: `radial-gradient(120% 80% at 50% 25%, #FFE7B3 0%, #FBEFE2 60%, var(--bg) 100%)`,
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      padding: '90px 26px 32px', boxSizing: 'border-box', overflow: 'hidden',
    }} className="fade-in">

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

      {/* trophy / lit lamp */}
      <div style={{ width: 200, height: 200, marginTop: 6 }}>
        {React.createElement(STEP_ILLUS[7])}
      </div>

      <h2 className="serif" style={{
        fontSize: 44, fontWeight: 600, color: '#1A1A1A',
        letterSpacing: '-0.025em', lineHeight: 1, marginTop: 20, textAlign: 'center',
      }}>
        You did it.
      </h2>
      <p style={{
        fontSize: 15, color: '#5A554D', lineHeight: 1.5,
        margin: '12px 0 0', textAlign: 'center', maxWidth: 280,
      }}>
        That's the lamp installed. <span style={{ color: '#1A1A1A', fontWeight: 600 }}>You did electrical work.</span> Take the win.
      </p>

      <div style={{ flex: 1 }}/>

      <Btn variant="primary" size="xl" accent={accent} style={{ width: '100%' }} onClick={() => alert('Saved!')}>
        Save this guide
      </Btn>
      <Btn variant="outline" size="md" onClick={onRestart} style={{ width: '100%', marginTop: 8 }}>
        Try another manual
      </Btn>
    </div>
  );
}

// ─── Screen 4 — Voice assistant overlay ─────────────────────────
function VoiceOverlay({ accent, stepIdx, onClose }) {
  // Scripted micro-conversation
  const [phase, setPhase] = useState(0);
  // 0: listening (no transcript), 1: showing transcript, 2: assistant speaking, 3: done speaking
  const userLine = "I can't tell which wire is which — they all kinda look the same in here.";
  const reply = [
    "Yeah, that step trips up a lot of people.",
    "Look at the colored sleeve right where each wire ends — brown is live, blue is neutral, and the stripey green-yellow is ground.",
    "Match those three to the same colors on the lamp base. You've got this.",
  ];

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 1100); // start showing transcript
    const t2 = setTimeout(() => setPhase(2), 3300); // assistant takes over
    const t3 = setTimeout(() => setPhase(3), 9500); // done speaking
    return () => { [t1,t2,t3].forEach(clearTimeout); };
  }, []);

  // Reveal user transcript word-by-word
  const userWords = userLine.split(' ');
  const [wordsShown, setWordsShown] = useState(0);
  useEffect(() => {
    if (phase !== 1) return;
    let i = 0;
    const id = setInterval(() => {
      i++; setWordsShown(i);
      if (i >= userWords.length) clearInterval(id);
    }, 110);
    return () => clearInterval(id);
  }, [phase]);

  // Reveal reply line-by-line
  const [replyLine, setReplyLine] = useState(0);
  useEffect(() => {
    if (phase < 2) return;
    let l = 0;
    setReplyLine(1);
    const id = setInterval(() => {
      l++;
      setReplyLine(l + 1);
      if (l + 1 >= reply.length) clearInterval(id);
    }, 2100);
    return () => clearInterval(id);
  }, [phase]);

  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 20,
      display: 'flex', flexDirection: 'column',
      pointerEvents: 'auto',
    }} className="fade-in">

      {/* dim backdrop */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'rgba(20,16,12,.55)',
        backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)',
      }}/>

      {/* tiny "current step" context chip — top */}
      <div style={{
        position: 'relative', marginTop: 60, alignSelf: 'center',
        padding: '6px 12px', borderRadius: 999,
        background: 'rgba(255,255,255,.14)',
        border: '.5px solid rgba(255,255,255,.25)',
        color: '#FAF8F5', fontSize: 12, fontWeight: 600,
        backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
      }}>
        Helping with step {stepIdx + 1}
      </div>

      {/* assistant reply bubbles */}
      <div style={{
        position: 'relative', flex: 1, padding: '24px 26px 0',
        display: 'flex', flexDirection: 'column', gap: 10, justifyContent: 'flex-end',
        marginBottom: 12,
      }}>
        {phase >= 2 && reply.slice(0, replyLine).map((line, i) => (
          <div key={i} className="fade-up" style={{
            alignSelf: 'flex-start',
            maxWidth: '88%',
            padding: '12px 15px',
            borderRadius: '20px 20px 20px 6px',
            background: '#FAF8F5',
            color: '#1A1A1A',
            fontSize: 15, lineHeight: 1.45,
            boxShadow: '0 8px 22px rgba(0,0,0,.25)',
            position: 'relative',
          }}>
            {line}
            {/* speaking wave on the latest bubble while phase === 2 */}
            {phase === 2 && i === replyLine - 1 && i < reply.length - 1 && (
              <div style={{
                position: 'absolute', right: 12, bottom: -10,
                display: 'flex', gap: 3, alignItems: 'flex-end', height: 16,
              }}>
                {[0,1,2,3].map(b => (
                  <span key={b} style={{
                    width: 3, height: 14, borderRadius: 2,
                    background: accent,
                    transformOrigin: 'center',
                    animation: `waveBar 0.7s ${b*0.12}s ease-in-out infinite`,
                  }}/>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* user transcript above orb */}
        {phase >= 1 && phase < 2 && (
          <div style={{
            alignSelf: 'flex-end', maxWidth: '85%',
            padding: '10px 14px', borderRadius: '20px 20px 6px 20px',
            background: 'rgba(255,255,255,.18)',
            border: '.5px solid rgba(255,255,255,.25)',
            color: '#FAF8F5', fontSize: 15, lineHeight: 1.4,
            backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
            fontStyle: 'italic',
          }}>
            "{userWords.slice(0, wordsShown).join(' ')}{wordsShown < userWords.length ? '…' : ''}"
          </div>
        )}
      </div>

      {/* Voice orb */}
      <div style={{
        position: 'relative', display: 'flex', justifyContent: 'center', marginBottom: 18,
      }}>
        <div style={{ position: 'relative', width: 140, height: 140 }}>
          {/* ripples while listening */}
          {phase === 0 && [0,1,2].map(i => (
            <div key={i} style={{
              position: 'absolute', inset: 0, borderRadius: '50%',
              border: `2px solid ${accent}66`,
              animation: `ripple 2s ${i*0.6}s ease-out infinite`,
            }}/>
          ))}
          {/* outer glow */}
          <div style={{
            position: 'absolute', inset: -10, borderRadius: '50%',
            background: `radial-gradient(circle, ${accent}88 0%, ${accent}00 70%)`,
            animation: 'glowPulse 2.4s ease-in-out infinite',
            filter: 'blur(8px)',
          }}/>
          {/* orb */}
          <div style={{
            position: 'absolute', inset: 14, borderRadius: '50%',
            background: `radial-gradient(circle at 35% 30%, #FFFFFF 0%, ${accent} 55%, ${accent} 100%)`,
            boxShadow: `0 14px 40px ${accent}AA, inset -8px -10px 24px rgba(0,0,0,.18), inset 6px 8px 14px rgba(255,255,255,.6)`,
            animation: 'breathe 3s ease-in-out infinite',
          }}/>
          {/* mic glyph in center when listening */}
          {phase < 2 && (
            <div style={{
              position: 'absolute', inset: 0, display: 'flex',
              alignItems: 'center', justifyContent: 'center',
            }}>
              <MicIcon size={28} color="#fff"/>
            </div>
          )}
          {/* equalizer when speaking */}
          {phase === 2 && (
            <div style={{
              position: 'absolute', inset: 0, display: 'flex',
              alignItems: 'center', justifyContent: 'center', gap: 4,
            }}>
              {[0,1,2,3,4].map(b => (
                <span key={b} style={{
                  width: 4, borderRadius: 2,
                  background: '#FAF8F5',
                  height: [16, 28, 22, 32, 18][b],
                  animation: `waveBar .6s ${b*0.09}s ease-in-out infinite`,
                  transformOrigin: 'center',
                }}/>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* bottom hint label */}
      <div style={{
        position: 'relative', textAlign: 'center', color: 'rgba(250,248,245,.65)',
        fontSize: 12, fontWeight: 500, marginBottom: 20,
        letterSpacing: '.04em',
      }}>
        {phase === 0 && 'Listening…'}
        {phase === 1 && 'Hearing you…'}
        {phase === 2 && 'Unbox is speaking'}
        {phase === 3 && 'Anything else?'}
      </div>

      <div style={{
        position: 'relative', display: 'flex', justifyContent: 'center', paddingBottom: 36,
      }}>
        <button onClick={onClose} className="pressable" style={{
          padding: '13px 22px', borderRadius: 999,
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
  LandingScreen, ConfirmScreen, GuideScreen, VoiceOverlay,
  DEMO_STEPS, PRODUCT, MicIcon,
});
