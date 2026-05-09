// app.jsx — desktop-first shell with phone in center + ambient sidebars
const { useState: useS, useEffect: useE, useRef: useR } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#E07856",
  "wallpaper": "warm",
  "showFrame": true,
  "showSidebars": true,
  "screen": "landing"
}/*EDITMODE-END*/;

const ACCENTS = {
  terracotta: '#E07856',
  sunshine:   '#E8B53C',
  ember:      '#C8513C',
  sage:       '#7A9A6E',
};
const WALLPAPERS = {
  warm:   { bg: 'radial-gradient(120% 80% at 50% 30%, #F4E5D2 0%, #E8D4B8 60%, #DDC4A0 100%)' },
  cream:  { bg: '#FAF8F5' },
  amber:  { bg: 'radial-gradient(120% 80% at 50% 30%, #FBE2C2 0%, #F0CB9A 100%)' },
  ink:    { bg: 'radial-gradient(120% 80% at 50% 30%, #2A1F18 0%, #0E0A06 100%)' },
};

function PhoneFrame({ children, accent, show }) {
  if (!show) {
    return (
      <div style={{
        width: '100%', height: '100%', maxWidth: 430, maxHeight: 932,
        position: 'relative', borderRadius: 36, overflow: 'hidden',
        background: 'var(--bg)',
        boxShadow: '0 24px 80px rgba(28,20,12,.18), 0 2px 0 rgba(0,0,0,.04)',
      }}>
        {children}
      </div>
    );
  }
  return (
    <div style={{
      width: 396, height: 812, position: 'relative',
      borderRadius: 56, padding: 10, boxSizing: 'border-box',
      background: 'linear-gradient(180deg, #1C1A18 0%, #2A2723 50%, #1C1A18 100%)',
      boxShadow: '0 50px 120px rgba(28,20,12,.45), 0 12px 32px rgba(28,20,12,.25), inset 0 0 0 2px rgba(255,255,255,.04)',
    }}>
      {/* side buttons */}
      <div style={{ position: 'absolute', left: -2, top: 130, width: 4, height: 32, borderRadius: 2, background: '#1A1A1A' }}/>
      <div style={{ position: 'absolute', left: -2, top: 180, width: 4, height: 50, borderRadius: 2, background: '#1A1A1A' }}/>
      <div style={{ position: 'absolute', left: -2, top: 240, width: 4, height: 50, borderRadius: 2, background: '#1A1A1A' }}/>
      <div style={{ position: 'absolute', right: -2, top: 200, width: 4, height: 78, borderRadius: 2, background: '#1A1A1A' }}/>
      {/* screen surface */}
      <div style={{
        width: '100%', height: '100%', borderRadius: 46, overflow: 'hidden',
        background: 'var(--bg)', position: 'relative',
      }}>
        {/* dynamic island */}
        <div style={{
          position: 'absolute', top: 11, left: '50%', transform: 'translateX(-50%)',
          width: 116, height: 34, borderRadius: 20, background: '#0A0A0A',
          zIndex: 100, pointerEvents: 'none',
        }}/>
        {/* status bar */}
        <div style={{
          position: 'absolute', top: 14, left: 0, right: 0, padding: '0 30px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          fontSize: 14, fontWeight: 600, color: 'var(--ink)', zIndex: 101,
          fontFamily: 'SF Pro, -apple-system, Inter, sans-serif',
          mixBlendMode: 'difference',
          filter: 'invert(1)',
        }}>
          <span>9:41</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
            {/* signal */}
            <svg width="17" height="11" viewBox="0 0 17 11"><g fill="currentColor">
              <rect x="0" y="7" width="3" height="4" rx="1"/>
              <rect x="4.6" y="5" width="3" height="6" rx="1"/>
              <rect x="9.2" y="3" width="3" height="8" rx="1"/>
              <rect x="13.8" y="0" width="3" height="11" rx="1"/>
            </g></svg>
            {/* battery */}
            <svg width="25" height="12" viewBox="0 0 25 12">
              <rect x="0" y="0" width="22" height="12" rx="3" fill="none" stroke="currentColor" strokeWidth="1" opacity=".4"/>
              <rect x="2" y="2" width="16" height="8" rx="1.5" fill="currentColor"/>
              <rect x="23" y="4" width="2" height="4" rx="1" fill="currentColor" opacity=".4"/>
            </svg>
          </span>
        </div>
        {children}
      </div>
    </div>
  );
}

// ── Desktop ambient sidebars ───────────────────────────────────
function LeftSidebar({ accent, captions, voiceActive, screen }) {
  return (
    <aside className="sidebar" style={{
      flex: '1 1 0', minWidth: 0, padding: '36px 28px',
      display: 'flex', flexDirection: 'column', gap: 22,
      color: '#FAF8F5',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{
          width: 38, height: 38, borderRadius: 12, background: accent, position: 'relative',
          boxShadow: `0 8px 20px ${accent}66`,
        }}>
          <div style={{
            position: 'absolute', inset: 8, borderRadius: 6, background: '#FAF8F5',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'Fraunces, serif', fontSize: 18, fontWeight: 700, color: accent,
          }}>U</div>
        </div>
        <div>
          <div style={{ fontFamily: 'Fraunces, serif', fontSize: 22, fontWeight: 600, letterSpacing: '-0.01em', color: 'rgba(250,248,245,.92)' }}>Unbox</div>
          <div style={{ fontSize: 11, color: 'rgba(250,248,245,.5)', letterSpacing: '.06em', textTransform: 'uppercase', fontWeight: 600 }}>web · live demo</div>
        </div>
      </div>

      {voiceActive && captions ? (
        <div style={{
          marginTop: 10,
          padding: 22, borderRadius: 22,
          background: 'rgba(255,255,255,.06)',
          border: '.5px solid rgba(255,255,255,.10)',
          backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
          flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', gap: 16,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{
              width: 10, height: 10, borderRadius: '50%', background: accent,
              boxShadow: `0 0 0 0 ${accent}66`,
              animation: 'heyPulse 1.6s ease-in-out infinite',
            }}/>
            <span style={{ fontSize: 14, fontWeight: 700, letterSpacing: '.02em', color: 'rgba(250,248,245,.92)' }}>
              Live conversation
            </span>
            <span style={{ flex: 1 }}/>
            <span style={{
              padding: '3px 9px', borderRadius: 999, fontSize: 10.5,
              background: 'rgba(255,255,255,.08)', color: 'rgba(250,248,245,.7)',
              fontWeight: 600, letterSpacing: '.04em', textTransform: 'uppercase',
              whiteSpace: 'nowrap',
            }}>Step {captions.step} of 8</span>
          </div>
          <div style={{ fontSize: 12, color: 'rgba(250,248,245,.55)', lineHeight: 1.4, marginTop: -8 }}>
            Context passed to voice agent: <em style={{ color: 'rgba(250,248,245,.85)', fontStyle: 'normal', fontWeight: 600 }}>"{captions.stepTitle}"</em>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, flex: 1, justifyContent: 'flex-end', overflow: 'hidden' }}>
            {captions.captions.map((c, i) => (
              <div key={i} className="fade-up" style={{
                alignSelf: c.role === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '88%',
                padding: '12px 16px',
                borderRadius: c.role === 'user' ? '20px 20px 5px 20px' : '20px 20px 20px 5px',
                background: c.role === 'user' ? 'rgba(250,248,245,.96)' : 'rgba(245,237,224,.92)',
                color: '#1A1A1A',
                fontSize: 16, lineHeight: 1.45, fontWeight: 500,
                boxShadow: '0 12px 30px rgba(0,0,0,.32)',
              }}>
                {c.role === 'unbox' && (
                  <div style={{ fontSize: 10.5, fontWeight: 700, color: accent, letterSpacing: '.06em', textTransform: 'uppercase', marginBottom: 3 }}>Unbox</div>
                )}
                {c.text || <span style={{ opacity: .4 }}>…</span>}
              </div>
            ))}
            {captions.phase === 0 && (
              <div style={{ alignSelf: 'flex-start', fontSize: 12.5, color: 'rgba(250,248,245,.55)', fontStyle: 'italic' }}>
                Listening for your voice…
              </div>
            )}
          </div>
        </div>
      ) : (
        <AmbientLeftPanel accent={accent} screen={screen}/>
      )}
    </aside>
  );
}

function AmbientLeftPanel({ accent, screen }) {
  const cards = [
    { k: 'Voice agent', v: 'OpenAI Realtime', dot: true },
    { k: 'Manual ingest', v: 'Gemini 2.5 Pro' },
    { k: 'Step text', v: 'GPT-5.5' },
    { k: 'Illustrations', v: 'GPT Image 2' },
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14, opacity: .92 }}>
      <div style={{
        padding: 18, borderRadius: 18,
        background: 'rgba(255,255,255,.04)',
        border: '.5px solid rgba(255,255,255,.08)',
      }}>
        <div style={{ fontSize: 11, color: 'rgba(250,248,245,.5)', letterSpacing: '.08em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 10 }}>
          About this demo
        </div>
        <div style={{ fontFamily: 'Fraunces, serif', fontSize: 22, lineHeight: 1.15, fontWeight: 500, color: 'rgba(250,248,245,.95)', letterSpacing: '-0.01em' }}>
          Manuals are intimidating. <em style={{ color: accent }}>Reels aren't.</em>
        </div>
        <div style={{ fontSize: 13, lineHeight: 1.5, color: 'rgba(250,248,245,.65)', marginTop: 10 }}>
          Drop any user manual. Gemini reads it, GPT writes it human, and you get a swipeable guide with a voice friend who knows where you are.
        </div>
      </div>

      <div style={{
        padding: 16, borderRadius: 18,
        background: 'rgba(255,255,255,.04)', border: '.5px solid rgba(255,255,255,.08)',
        display: 'flex', flexDirection: 'column', gap: 10,
      }}>
        <div style={{ fontSize: 11, color: 'rgba(250,248,245,.5)', letterSpacing: '.08em', textTransform: 'uppercase', fontWeight: 700 }}>
          Stack
        </div>
        {cards.map((c, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 13 }}>
            <span style={{ color: 'rgba(250,248,245,.55)' }}>{c.k}</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, color: 'rgba(250,248,245,.92)', fontWeight: 600 }}>
              {c.dot && <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#7AC78F', boxShadow: '0 0 6px #7AC78F88' }}/>}
              {c.v}
            </span>
          </div>
        ))}
      </div>

      <div style={{
        padding: 16, borderRadius: 18,
        background: `linear-gradient(135deg, ${accent}22, ${accent}10)`,
        border: `.5px solid ${accent}55`,
      }}>
        <div style={{ fontSize: 11, color: accent, letterSpacing: '.08em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 8 }}>
          Try saying it
        </div>
        <div style={{ fontFamily: 'Fraunces, serif', fontSize: 17, lineHeight: 1.3, color: 'rgba(250,248,245,.95)', fontStyle: 'italic' }}>
          "Hey Unbox, which wire is neutral?"
        </div>
      </div>
    </div>
  );
}

function RightSidebar({ accent, screen, stepIdx, voiceActive }) {
  return (
    <aside className="sidebar" style={{
      flex: '1 1 0', minWidth: 0, padding: '36px 28px',
      display: 'flex', flexDirection: 'column', gap: 14,
      color: '#FAF8F5',
    }}>
      {/* now showing */}
      <div style={{ marginBottom: 4, fontSize: 11, color: 'rgba(250,248,245,.5)', letterSpacing: '.08em', textTransform: 'uppercase', fontWeight: 700, textAlign: 'right' }}>
        Now showing
      </div>
      <div style={{
        padding: 16, borderRadius: 18,
        background: 'rgba(255,255,255,.04)', border: '.5px solid rgba(255,255,255,.08)',
      }}>
        <div style={{ fontFamily: 'Fraunces, serif', fontSize: 22, fontWeight: 500, color: 'rgba(250,248,245,.95)', letterSpacing: '-0.01em' }}>
          {screen === 'landing' && 'Landing'}
          {screen === 'confirm' && 'Confirmation'}
          {screen === 'guide'   && (stepIdx === DEMO_STEPS.length - 1 ? 'You did it.' : `Step ${stepIdx + 1}`)}
        </div>
        <div style={{ fontSize: 13, color: 'rgba(250,248,245,.6)', marginTop: 6, lineHeight: 1.45 }}>
          {screen === 'landing' && 'Tap the highlighted demo or drop any PDF.'}
          {screen === 'confirm' && 'Gemini parsed the manual and inferred the product.'}
          {screen === 'guide' && (stepIdx === 7 ? 'Lit, mounted, done in under 25 minutes.' : DEMO_STEPS[stepIdx]?.sub)}
        </div>
      </div>

      {/* voice readiness */}
      <div style={{
        padding: 16, borderRadius: 18,
        background: voiceActive ? `linear-gradient(135deg, ${accent}33, ${accent}15)` : 'rgba(255,255,255,.04)',
        border: voiceActive ? `.5px solid ${accent}77` : '.5px solid rgba(255,255,255,.08)',
        transition: 'all .3s ease',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
          <div style={{ position: 'relative', width: 34, height: 34 }}>
            <div style={{
              position: 'absolute', inset: 0, borderRadius: '50%',
              background: `radial-gradient(circle at 35% 30%, #FFD7BB, ${accent})`,
              boxShadow: `0 4px 14px ${accent}88`,
              animation: `breathe ${voiceActive ? 1.6 : 3}s ease-in-out infinite`,
            }}/>
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'rgba(250,248,245,.95)' }}>
              {voiceActive ? 'Voice active' : 'Voice ready'}
            </div>
            <div style={{ fontSize: 11, color: 'rgba(250,248,245,.6)' }}>
              wake-word: "Hey Unbox"
            </div>
          </div>
        </div>
        <div style={{ fontSize: 12, color: 'rgba(250,248,245,.65)', lineHeight: 1.45 }}>
          The agent always knows the current step — passed to the model on every turn.
        </div>
      </div>

      {/* step list */}
      {screen === 'guide' && (
        <div style={{
          padding: '14px 4px 14px 16px', borderRadius: 18,
          background: 'rgba(255,255,255,.04)', border: '.5px solid rgba(255,255,255,.08)',
          flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column',
        }}>
          <div style={{ fontSize: 11, color: 'rgba(250,248,245,.5)', letterSpacing: '.08em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 8, paddingRight: 12 }}>
            All steps
          </div>
          <div style={{
            flex: 1, minHeight: 0, overflow: 'auto', paddingRight: 12,
            display: 'flex', flexDirection: 'column', gap: 6,
          }}>
            {DEMO_STEPS.map((s, i) => {
              const past = i < stepIdx, current = i === stepIdx;
              return (
                <div key={i} style={{
                  display: 'flex', alignItems: 'flex-start', gap: 10, padding: '6px 8px',
                  borderRadius: 10,
                  background: current ? `${accent}22` : 'transparent',
                  border: current ? `.5px solid ${accent}55` : '.5px solid transparent',
                  transition: 'all .3s ease',
                }}>
                  <div style={{
                    width: 22, height: 22, borderRadius: '50%', flexShrink: 0,
                    background: past ? accent : (current ? accent : 'rgba(255,255,255,.08)'),
                    color: past || current ? '#FAF8F5' : 'rgba(250,248,245,.5)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 11, fontWeight: 700, fontFamily: 'Inter, sans-serif',
                  }}>
                    {past ? '✓' : i + 1}
                  </div>
                  <div style={{ flex: 1, fontSize: 12.5, lineHeight: 1.35, paddingTop: 3 }}>
                    <div style={{ fontWeight: current ? 700 : 600, color: current ? '#FAF8F5' : (past ? 'rgba(250,248,245,.65)' : 'rgba(250,248,245,.85)') }}>
                      {s.title}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {screen !== 'guide' && (
        <div style={{
          padding: 16, borderRadius: 18,
          background: 'rgba(255,255,255,.04)', border: '.5px solid rgba(255,255,255,.08)',
        }}>
          <div style={{ fontSize: 11, color: 'rgba(250,248,245,.5)', letterSpacing: '.08em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 8 }}>
            Demo flow
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 13, color: 'rgba(250,248,245,.85)' }}>
            <FlowStep n="1" label="Drop a manual" active={screen === 'landing'} accent={accent}/>
            <FlowStep n="2" label="Confirm the product" active={screen === 'confirm'} accent={accent}/>
            <FlowStep n="3" label="Swipe through Reels" accent={accent}/>
            <FlowStep n="4" label="Ask while you build" accent={accent}/>
          </div>
        </div>
      )}

      <div style={{ flex: screen === 'guide' ? 0 : 1 }}/>

      <div style={{ fontSize: 10.5, color: 'rgba(250,248,245,.4)', textAlign: 'right', letterSpacing: '.06em' }}>
        unbox · v0.4 · cinematic build
      </div>
    </aside>
  );
}

function FlowStep({ n, label, active, accent }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <div style={{
        width: 22, height: 22, borderRadius: '50%',
        background: active ? accent : 'rgba(255,255,255,.08)',
        color: active ? '#FAF8F5' : 'rgba(250,248,245,.55)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 11, fontWeight: 700,
      }}>{n}</div>
      <span style={{ color: active ? '#FAF8F5' : 'rgba(250,248,245,.7)', fontWeight: active ? 700 : 500 }}>{label}</span>
    </div>
  );
}

// ── Tweaks panel (custom, lightweight) ─────────────────────────
function TweakPanel({ tweaks, setT, onScreen, onStep, currentStep }) {
  const [open, setOpen] = useS(false);
  useE(() => {
    const onMsg = (e) => {
      const d = e.data || {};
      if (d.type === '__activate_edit_mode') setOpen(true);
      else if (d.type === '__deactivate_edit_mode') setOpen(false);
    };
    window.addEventListener('message', onMsg);
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
    return () => window.removeEventListener('message', onMsg);
  }, []);

  if (!open) return null;

  const close = () => {
    setOpen(false);
    window.parent.postMessage({ type: '__edit_mode_dismissed' }, '*');
  };

  return (
    <div style={{
      position: 'fixed', right: 18, bottom: 18, zIndex: 1000,
      width: 280, borderRadius: 18, padding: 16, fontFamily: 'Inter, sans-serif',
      background: 'rgba(20,18,16,.92)', color: '#FAF8F5',
      backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
      border: '.5px solid rgba(255,255,255,.12)',
      boxShadow: '0 24px 60px rgba(0,0,0,.5)',
      maxHeight: 'calc(100vh - 36px)', overflow: 'auto',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
        <div style={{ fontWeight: 700, fontSize: 14 }}>Tweaks</div>
        <button onClick={close} style={{ background: 'transparent', border: 0, color: 'rgba(250,248,245,.7)', cursor: 'pointer', fontSize: 18, lineHeight: 1, padding: 0 }}>×</button>
      </div>

      <Section label="Accent color">
        <div style={{ display: 'flex', gap: 8 }}>
          {Object.entries(ACCENTS).map(([k, v]) => (
            <button key={k} onClick={() => setT('accent', v)} style={{
              width: 32, height: 32, borderRadius: '50%', cursor: 'pointer', padding: 0,
              background: v, border: tweaks.accent === v ? '2px solid #FAF8F5' : '2px solid rgba(255,255,255,.18)',
              boxShadow: tweaks.accent === v ? `0 0 0 2px ${v}88` : 'none',
              transition: 'all .15s ease',
            }} title={k}/>
          ))}
        </div>
      </Section>

      <Section label="Wallpaper">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6 }}>
          {Object.entries(WALLPAPERS).map(([k, v]) => (
            <button key={k} onClick={() => setT('wallpaper', k)} style={{
              height: 38, borderRadius: 10, cursor: 'pointer', border: 0,
              background: v.bg,
              outline: tweaks.wallpaper === k ? '2px solid #FAF8F5' : '1px solid rgba(255,255,255,.15)',
              outlineOffset: -1,
              fontSize: 9.5, color: k === 'ink' ? '#FAF8F5' : '#1A1A1A', fontWeight: 700, textTransform: 'capitalize',
            }}>{k}</button>
          ))}
        </div>
      </Section>

      <Section label="Phone frame">
        <Toggle on={tweaks.showFrame} onChange={v => setT('showFrame', v)}/>
      </Section>

      <Section label="Sidebars (desktop)">
        <Toggle on={tweaks.showSidebars} onChange={v => setT('showSidebars', v)}/>
      </Section>

      <Section label="Jump to screen">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 5 }}>
          {[
            ['landing', 'Land'], ['confirm', 'Confirm'], ['guide', 'Guide'],
          ].map(([k, l]) => (
            <button key={k} onClick={() => onScreen(k)} style={{
              padding: '8px 0', borderRadius: 8, cursor: 'pointer', border: 0,
              background: 'rgba(255,255,255,.08)', color: '#FAF8F5',
              fontSize: 11, fontWeight: 600, fontFamily: 'inherit',
            }}>{l}</button>
          ))}
        </div>
      </Section>

      <Section label={`Step (${currentStep + 1} / 8)`}>
        <input type="range" min="0" max="7" value={currentStep}
          onChange={e => onStep(parseInt(e.target.value))}
          style={{ width: '100%', accentColor: tweaks.accent }}/>
      </Section>
    </div>
  );
}
function Section({ label, children }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ fontSize: 10.5, color: 'rgba(250,248,245,.55)', letterSpacing: '.06em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 7 }}>{label}</div>
      {children}
    </div>
  );
}
function Toggle({ on, onChange }) {
  return (
    <button onClick={() => onChange(!on)} style={{
      width: 42, height: 24, borderRadius: 999, cursor: 'pointer', border: 0,
      background: on ? '#7AC78F' : 'rgba(255,255,255,.18)',
      position: 'relative', padding: 0, transition: 'all .15s ease',
    }}>
      <span style={{
        position: 'absolute', top: 2, left: on ? 20 : 2,
        width: 20, height: 20, borderRadius: '50%', background: '#FAF8F5',
        boxShadow: '0 1px 3px rgba(0,0,0,.3)', transition: 'left .2s ease',
      }}/>
    </button>
  );
}

// ── Root App ───────────────────────────────────────────────────
function App() {
  const [tweaks, setTweaks] = useS(TWEAK_DEFAULTS);
  const [screen, setScreen] = useS(TWEAK_DEFAULTS.screen || 'landing');
  const [stepIdx, setStepIdx] = useS(0);
  const [voiceOpen, setVoiceOpen] = useS(false);
  const [captions, setCaptions] = useS(null);

  const setT = (k, v) => {
    const next = typeof k === 'object' ? { ...tweaks, ...k } : { ...tweaks, [k]: v };
    setTweaks(next);
    window.parent.postMessage({ type: '__edit_mode_set_keys', edits: typeof k === 'object' ? k : { [k]: v } }, '*');
  };

  // Apply theme to root for use in children
  useE(() => {
    document.documentElement.style.setProperty('--accent', tweaks.accent);
  }, [tweaks.accent]);

  const handleUpload = () => setScreen('confirm');
  const handleConfirm = () => { setStepIdx(0); setScreen('guide'); };
  const handleRestart = () => { setVoiceOpen(false); setStepIdx(0); setScreen('landing'); };

  const wallpaperBg = WALLPAPERS[tweaks.wallpaper]?.bg || WALLPAPERS.warm.bg;

  return (
    <div style={{
      width: '100vw', minHeight: '100vh',
      background: tweaks.wallpaper === 'ink' ? wallpaperBg : '#0E0A06',
      position: 'relative', overflow: 'hidden',
      fontFamily: 'Inter, sans-serif',
    }}>
      {/* desktop ambient atmosphere */}
      <div style={{
        position: 'absolute', inset: 0,
        background: tweaks.wallpaper === 'ink'
          ? wallpaperBg
          : `radial-gradient(60% 50% at 50% 30%, ${tweaks.accent}28 0%, transparent 70%), radial-gradient(80% 60% at 100% 100%, #2A1810AA 0%, transparent 60%), #0E0A06`,
        pointerEvents: 'none',
      }}/>
      {/* film grain */}
      <div style={{
        position: 'absolute', inset: 0, opacity: .06, mixBlendMode: 'overlay', pointerEvents: 'none',
        backgroundImage: 'url("data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22240%22 height=%22240%22><filter id=%22n%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%222%22/></filter><rect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22 opacity=%220.55%22/></svg>")',
      }}/>

      <div className="layout" style={{
        position: 'relative', zIndex: 1,
        minHeight: '100vh',
        display: 'flex', alignItems: 'stretch', justifyContent: 'center',
      }}>
        {/* LEFT */}
        {tweaks.showSidebars && (
          <LeftSidebar
            accent={tweaks.accent}
            captions={captions}
            voiceActive={voiceOpen}
            screen={screen}
          />
        )}

        {/* PHONE COLUMN */}
        <div className="phone-col" style={{
          flex: '0 0 auto', display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          padding: '36px 12px',
          minHeight: '100vh',
        }}>
          {/* product label above the phone (for desktop demo audience) */}
          <div style={{
            marginBottom: 18, color: 'rgba(250,248,245,.5)',
            fontSize: 11, letterSpacing: '.16em', textTransform: 'uppercase', fontWeight: 600,
            textAlign: 'center',
          }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '5px 12px', borderRadius: 999,
              background: 'rgba(255,255,255,.04)', border: '.5px solid rgba(255,255,255,.08)',
            }}>
              <span style={{
                width: 6, height: 6, borderRadius: '50%', background: '#7AC78F',
                boxShadow: '0 0 6px #7AC78F88',
              }}/>
              Live prototype · Drop a manual to start
            </span>
          </div>

          <div style={{ position: 'relative', '--bg': wallpaperBg }}>
            <PhoneFrame accent={tweaks.accent} show={tweaks.showFrame}>
              {screen === 'landing' && (
                <LandingScreen accent={tweaks.accent} onUpload={handleUpload}/>
              )}
              {screen === 'confirm' && (
                <ConfirmScreen accent={tweaks.accent} onConfirm={handleConfirm} onRetry={() => setScreen('landing')}/>
              )}
              {screen === 'guide' && (
                <GuideScreen
                  accent={tweaks.accent}
                  stepIdx={stepIdx} setStepIdx={setStepIdx}
                  onMic={() => setVoiceOpen(true)}
                  onExit={handleRestart}
                />
              )}
              {voiceOpen && (
                <VoiceOverlay
                  accent={tweaks.accent}
                  stepIdx={stepIdx}
                  onClose={() => { setVoiceOpen(false); setCaptions(null); }}
                  onCaptionUpdate={setCaptions}
                />
              )}
            </PhoneFrame>
          </div>

          {/* tiny hint under phone */}
          <div style={{
            marginTop: 18, fontSize: 11.5, color: 'rgba(250,248,245,.4)',
            display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center',
          }}>
            <kbd style={kbd}>↑</kbd>
            <kbd style={kbd}>↓</kbd>
            <span>swipe steps</span>
            <span style={{ opacity: .4 }}>·</span>
            <span>tap mic to talk</span>
          </div>
        </div>

        {/* RIGHT */}
        {tweaks.showSidebars && (
          <RightSidebar
            accent={tweaks.accent}
            screen={screen}
            stepIdx={stepIdx}
            voiceActive={voiceOpen}
          />
        )}
      </div>

      <TweakPanel
        tweaks={tweaks} setT={setT}
        onScreen={setScreen}
        onStep={setStepIdx}
        currentStep={stepIdx}
      />
    </div>
  );
}

const kbd = {
  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
  minWidth: 22, height: 22, padding: '0 6px',
  borderRadius: 6, background: 'rgba(255,255,255,.06)',
  border: '.5px solid rgba(255,255,255,.12)',
  fontFamily: 'ui-monospace, SF Mono, monospace', fontSize: 11, fontWeight: 600,
  color: 'rgba(250,248,245,.7)',
};

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
