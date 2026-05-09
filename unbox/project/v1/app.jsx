// app.jsx — Unbox prototype mount, state machine, Tweaks panel.

const { useState: useS, useEffect: useE } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#E07856",
  "screen": "landing",
  "showFrame": true,
  "wallpaper": "warm",
  "voiceOpen": false
}/*EDITMODE-END*/;

// We map "screen" tweak → app state, but also let the user navigate via the UI.
// The Tweaks "Jump to" radio is for quick demoing; in normal flow the user taps through.

function UnboxApp() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // Internal state (kept in sync with tweaks for jump-to)
  const [screen, setScreen] = useS(t.screen);
  const [stepIdx, setStepIdx] = useS(0);
  const [voiceOpen, setVoiceOpen] = useS(!!t.voiceOpen);

  // When tweak changes (user picked a screen from panel), jump there
  useE(() => {
    if (screen !== t.screen) setScreen(t.screen);
    if (!!voiceOpen !== !!t.voiceOpen) setVoiceOpen(!!t.voiceOpen);
  }, [t.screen, t.voiceOpen]);

  // When internal state changes (user tapped a button), persist to tweaks
  useE(() => {
    if (screen !== t.screen) setTweak('screen', screen);
  }, [screen]);
  useE(() => {
    if (voiceOpen !== !!t.voiceOpen) setTweak('voiceOpen', voiceOpen);
  }, [voiceOpen]);

  const accent = t.accent;

  // Wallpaper behind the phone
  const wallpapers = {
    warm:  'radial-gradient(140% 100% at 50% 0%, #2a221a 0%, #1c1611 60%, #120e0a 100%)',
    cream: 'radial-gradient(140% 100% at 50% 0%, #efe6d4 0%, #e3d6bf 100%)',
    accent:`radial-gradient(140% 100% at 50% 0%, ${accent}55 0%, #1c1611 70%)`,
    plain: '#FAF8F5',
  };

  // Render the current screen content (full-bleed inside phone)
  const renderScreen = () => {
    if (screen === 'landing') {
      return <LandingScreen accent={accent} onUpload={() => setScreen('confirm')}/>;
    }
    if (screen === 'confirm') {
      return <ConfirmScreen accent={accent}
                onConfirm={() => { setStepIdx(0); setScreen('guide'); }}
                onRetry={() => setScreen('landing')}/>;
    }
    if (screen === 'guide' || screen === 'voice') {
      // Voice is an overlay rendered on top of guide
      return (
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
          <GuideScreen
            accent={accent}
            stepIdx={stepIdx}
            setStepIdx={setStepIdx}
            onMic={() => setVoiceOpen(true)}
            onRestart={() => { setStepIdx(0); setScreen('landing'); }}/>
          {(voiceOpen || screen === 'voice') && (
            <VoiceOverlay
              accent={accent}
              stepIdx={stepIdx}
              onClose={() => { setVoiceOpen(false); if (screen === 'voice') setScreen('guide'); }}/>
          )}
        </div>
      );
    }
    return null;
  };

  // Frame on/off
  const phoneW = 402, phoneH = 874;
  return (
    <div style={{
      minHeight: '100vh', width: '100%',
      background: t.showFrame ? wallpapers[t.wallpaper] : '#FAF8F5',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: t.showFrame ? '40px 20px' : 0, boxSizing: 'border-box',
      transition: 'background .4s ease',
    }}>
      {t.showFrame ? (
        <div style={{
          width: phoneW, height: phoneH, borderRadius: 48, overflow: 'hidden',
          position: 'relative', background: '#FAF8F5',
          boxShadow: '0 50px 100px rgba(0,0,0,.45), 0 0 0 10px #1a1a1a, 0 0 0 11px rgba(255,255,255,.08)',
          fontFamily: 'Inter, system-ui, sans-serif',
          WebkitFontSmoothing: 'antialiased',
        }}>
          {/* dynamic island */}
          <div style={{
            position: 'absolute', top: 11, left: '50%', transform: 'translateX(-50%)',
            width: 126, height: 37, borderRadius: 24, background: '#000', zIndex: 50,
          }}/>
          {/* status bar — we use the iOS frame's status bar component */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 12 }}>
            <IOSStatusBar dark={false}/>
          </div>
          {/* home indicator */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 60,
            height: 34, display: 'flex', justifyContent: 'center', alignItems: 'flex-end',
            paddingBottom: 8, pointerEvents: 'none',
          }}>
            <div style={{
              width: 139, height: 5, borderRadius: 100,
              background: 'rgba(0,0,0,.28)',
            }}/>
          </div>
          {/* screen content fills the whole device */}
          <div style={{ position: 'absolute', inset: 0 }}>
            {renderScreen()}
          </div>
        </div>
      ) : (
        // No frame: full-bleed mobile-sized container, centered
        <div style={{
          width: '100%', maxWidth: 430, height: 'min(100vh, 932px)',
          background: '#FAF8F5', position: 'relative', overflow: 'hidden',
          fontFamily: 'Inter, system-ui, sans-serif',
        }}>
          {renderScreen()}
        </div>
      )}

      <TweaksPanel title="Tweaks">
        <TweakSection label="Look"/>
        <TweakColor label="Accent" value={t.accent}
          options={['#E07856', '#FFC83D', '#7AA37C', '#7AA8D4', '#1A1A1A']}
          onChange={(v) => setTweak('accent', v)}/>
        <TweakSelect label="Wallpaper" value={t.wallpaper}
          options={['warm', 'cream', 'accent', 'plain']}
          onChange={(v) => setTweak('wallpaper', v)}/>
        <TweakToggle label="Phone frame" value={t.showFrame}
          onChange={(v) => setTweak('showFrame', v)}/>

        <TweakSection label="Demo"/>
        <TweakSelect label="Jump to screen" value={t.screen}
          options={['landing', 'confirm', 'guide', 'voice']}
          onChange={(v) => {
            setTweak('screen', v);
            if (v === 'voice') setTweak('voiceOpen', true);
            else setTweak('voiceOpen', false);
          }}/>
        {(t.screen === 'guide' || t.screen === 'voice') && (
          <TweakSlider label="Step" value={stepIdx + 1} min={1} max={DEMO_STEPS.length} step={1}
            onChange={(v) => setStepIdx(v - 1)}/>
        )}
        <TweakButton label="Reset demo" onClick={() => {
          setStepIdx(0);
          setTweak('screen', 'landing');
          setTweak('voiceOpen', false);
        }}/>
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<UnboxApp/>);
