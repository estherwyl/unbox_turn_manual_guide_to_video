// illustrations.jsx — v2: dark cinematic full-bleed scenes
// Each illustration fills the entire phone screen edge-to-edge.
// Simple shapes, single warm key light, deep browns/blacks. Cel-shaded feel.

const ILLU_PALETTE = {
  bgDeep:  '#0E0A06',
  bg:      '#1A130C',
  bg2:     '#241914',
  bg3:     '#2E211A',
  warmRim: '#E07856',
  warmHi:  '#F4B989',
  glow:    '#FFC83D',
  glowSoft:'#FFD982',
  ink:     '#0A0805',
  cream:   '#F4ECDD',
  silver:  '#9A8E7A',
  brown:   '#8B6F4E',
  blue:    '#6E96BD',
  gy:      '#B7C275',
};

// Dark cinematic backdrop with warm vignette
function CineFrame({ children, vignette = 'warm', tint }) {
  const tints = {
    warm:  ['#2B1C12', '#0E0A06'],
    deep:  ['#1F1410', '#08060A'],
    amber: ['#3A2616', '#0F0905'],
    night: ['#1A1A22', '#06070C'],
    glow:  ['#3F2515', '#1B0D08'],
  };
  const [a, b] = tints[vignette] || tints.warm;
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', background: tint || `radial-gradient(110% 80% at 50% 40%, ${a} 0%, ${b} 100%)` }}>
      {/* film grain */}
      <div style={{
        position: 'absolute', inset: 0, opacity: .12, mixBlendMode: 'overlay',
        backgroundImage: 'url("data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22120%22 height=%22120%22><filter id=%22n%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%222%22/></filter><rect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22 opacity=%220.55%22/></svg>")',
        pointerEvents: 'none',
      }}/>
      {/* warm key from upper-right */}
      <div style={{
        position: 'absolute', top: '-20%', right: '-15%', width: '90%', height: '90%',
        background: 'radial-gradient(circle, rgba(224,120,86,.35) 0%, rgba(224,120,86,0) 65%)',
        filter: 'blur(6px)', pointerEvents: 'none',
      }}/>
      {/* corner darkening */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(120% 100% at 50% 60%, rgba(0,0,0,0) 30%, rgba(0,0,0,.45) 100%)',
      }}/>
      <div style={{ position: 'absolute', inset: 0 }}>{children}</div>
    </div>
  );
}

function Scene({ children, viewBox = '0 0 400 800', preserve = 'xMidYMid slice' }) {
  return (
    <svg viewBox={viewBox} preserveAspectRatio={preserve}
         style={{ width: '100%', height: '100%', display: 'block' }}>
      {children}
    </svg>
  );
}

// ── 1. Light switch / breaker — power off ───────────────────────
function StepIllu1() {
  return (
    <CineFrame vignette="deep">
      <Scene>
        <defs>
          <radialGradient id="key1" cx="60%" cy="30%" r="55%">
            <stop offset="0%" stopColor="#F4B989" stopOpacity=".45"/>
            <stop offset="60%" stopColor="#E07856" stopOpacity=".06"/>
            <stop offset="100%" stopColor="#000" stopOpacity="0"/>
          </radialGradient>
          <linearGradient id="hand1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#3A2A1F"/>
            <stop offset="100%" stopColor="#1A0F09"/>
          </linearGradient>
        </defs>
        <rect width="400" height="800" fill="url(#key1)"/>

        {/* wall texture */}
        <rect x="0" y="0" width="400" height="800" fill="rgba(244,185,137,.025)"/>

        {/* breaker panel mounted on wall */}
        <rect x="80" y="180" width="240" height="380" rx="14" fill="#1A1106" stroke="#3A2616" strokeWidth="2"/>
        <rect x="92" y="194" width="216" height="352" rx="6" fill="#0C0805"/>
        {/* rim light on left edge of panel */}
        <rect x="80" y="180" width="3" height="380" fill="#E07856" opacity=".5"/>
        <rect x="83" y="180" width="2" height="380" fill="#F4B989" opacity=".25"/>

        {/* rows of breaker switches */}
        {[0,1,2,3,4,5].map(r => (
          <g key={r} transform={`translate(110, ${214 + r*54})`}>
            <rect x="0" y="0" width="84" height="38" rx="5" fill="#241914" stroke="#3A2616" strokeWidth="1.4"/>
            <rect x="0" y="0" width="2" height="38" fill="#E07856" opacity=".35"/>
            {/* toggle */}
            <rect x={r === 2 ? "8" : "44"} y="6" width="32" height="26" rx="3" fill={r === 2 ? '#E07856' : '#3A2A1F'} stroke="#1A1106" strokeWidth="1"/>
            {r === 2 && <rect x="8" y="6" width="32" height="3" rx="1.5" fill="#F4B989"/>}
            <rect x="106" y="0" width="84" height="38" rx="5" fill="#241914" stroke="#3A2616" strokeWidth="1.4"/>
            <rect x="150" y="6" width="32" height="26" rx="3" fill="#3A2A1F" stroke="#1A1106" strokeWidth="1"/>
          </g>
        ))}

        {/* hand reaching in from below to flip switch (the active one on left of row 3) */}
        <g transform="translate(0, 0)">
          <path d="M 60 800 L 60 660 Q 70 580 130 540 Q 175 510 210 500 Q 245 490 275 510 Q 290 525 270 550 Q 240 580 200 600 Q 160 620 130 660 Q 100 720 100 800 Z"
                fill="url(#hand1)" stroke="#0A0604" strokeWidth="1.8"/>
          {/* finger pointing toward switch */}
          <path d="M 220 510 Q 240 482 248 472 Q 256 460 264 466 Q 270 472 264 484 Q 256 500 245 514 Z"
                fill="#3A2A1F" stroke="#0A0604" strokeWidth="1.5"/>
          {/* warm rim on top of hand */}
          <path d="M 130 540 Q 175 510 210 500 Q 245 490 275 510" fill="none" stroke="#F4B989" strokeWidth="1.6" opacity=".7"/>
          <path d="M 220 510 Q 240 482 248 472 Q 256 460 264 466" fill="none" stroke="#F4B989" strokeWidth="1.4" opacity=".75"/>
        </g>

        {/* glow on the active switch */}
        <circle cx="138" cy="343" r="34" fill="#E07856" opacity=".18" filter="url(#blur1)"/>
        <defs><filter id="blur1"><feGaussianBlur stdDeviation="6"/></filter></defs>

        {/* spark dots */}
        <circle cx="320" cy="220" r="1.6" fill="#FFD982" opacity=".7"/>
        <circle cx="64"  cy="500" r="1.4" fill="#F4B989" opacity=".55"/>
      </Scene>
    </CineFrame>
  );
}

// ── 2. Open box, parts laid out on floor ────────────────────────
function StepIllu2() {
  return (
    <CineFrame vignette="amber">
      <Scene>
        <defs>
          <radialGradient id="floor2" cx="50%" cy="60%" r="50%">
            <stop offset="0%" stopColor="#3F2616" stopOpacity=".7"/>
            <stop offset="100%" stopColor="#0E0805" stopOpacity="0"/>
          </radialGradient>
        </defs>
        <rect width="400" height="800" fill="url(#floor2)"/>

        {/* wood floor planks suggestion */}
        {[0,1,2,3,4,5,6].map(i => (
          <line key={i} x1="0" y1={500 + i*55} x2="400" y2={500 + i*55} stroke="#1F1410" strokeWidth="1" opacity=".4"/>
        ))}

        {/* cardboard box (open, 3/4 view) */}
        <g>
          {/* back flap */}
          <path d="M 100 380 L 200 320 L 300 380 L 300 410 L 100 410 Z" fill="#3F2616" stroke="#0A0604" strokeWidth="2"/>
          {/* body */}
          <path d="M 100 380 L 300 380 L 280 580 L 120 580 Z" fill="#5A3920" stroke="#0A0604" strokeWidth="2.5"/>
          {/* rim light top edge */}
          <path d="M 100 380 L 300 380" stroke="#F4B989" strokeWidth="1.5" opacity=".7"/>
          {/* tape */}
          <rect x="180" y="370" width="40" height="20" fill="#7A5A3E" stroke="#0A0604" strokeWidth="1.2" opacity=".9"/>
        </g>

        {/* parts laid out in a soft spotlight */}
        <ellipse cx="200" cy="660" rx="180" ry="80" fill="#F4B989" opacity=".06"/>

        {/* metal ring */}
        <ellipse cx="120" cy="660" rx="60" ry="14" fill="none" stroke="#9A8E7A" strokeWidth="3"/>
        <ellipse cx="120" cy="658" rx="60" ry="14" fill="none" stroke="#F4B989" strokeWidth="1.2" opacity=".6"/>

        {/* base plate */}
        <ellipse cx="200" cy="690" rx="50" ry="11" fill="#241914" stroke="#9A8E7A" strokeWidth="2.5"/>
        <path d="M 152 690 Q 165 706 200 708 Q 235 706 248 690" fill="#1A130C" stroke="#9A8E7A" strokeWidth="2"/>
        <path d="M 152 690 Q 165 706 200 708" fill="none" stroke="#F4B989" strokeWidth="1" opacity=".55"/>

        {/* globe shade (translucent) */}
        <circle cx="290" cy="666" r="44" fill="#241914" stroke="#9A8E7A" strokeWidth="2.5" opacity=".95"/>
        <path d="M 254 650 Q 290 638 326 650" stroke="#F4B989" strokeWidth="1.5" fill="none" opacity=".55"/>

        {/* three screws cluster */}
        <g transform="translate(330, 580)">
          {[0,1,2].map(i => (
            <g key={i} transform={`translate(${i*10 - 8}, ${i*4})`}>
              <circle r="5" fill="#9A8E7A" stroke="#0A0604" strokeWidth="1.2"/>
              <line x1="-2.5" y1="0" x2="2.5" y2="0" stroke="#0A0604" strokeWidth="1"/>
              <circle r="2" fill="#F4B989" opacity=".5"/>
            </g>
          ))}
        </g>

        {/* sparkle */}
        <circle cx="60" cy="200" r="1.4" fill="#FFD982" opacity=".7"/>
        <circle cx="345" cy="320" r="1.6" fill="#F4B989" opacity=".55"/>
      </Scene>
    </CineFrame>
  );
}

// ── 3. Connect three colored wires ──────────────────────────────
function StepIllu3() {
  return (
    <CineFrame vignette="deep">
      <Scene>
        <defs>
          <radialGradient id="cav3" cx="50%" cy="35%" r="40%">
            <stop offset="0%" stopColor="#4A2E1C" stopOpacity=".7"/>
            <stop offset="100%" stopColor="#0A0604" stopOpacity="0"/>
          </radialGradient>
        </defs>
        <rect width="400" height="800" fill="url(#cav3)"/>

        {/* ceiling cavity — dark hole */}
        <ellipse cx="200" cy="280" rx="150" ry="90" fill="#080604"/>
        <ellipse cx="200" cy="280" rx="150" ry="90" fill="none" stroke="#5A3920" strokeWidth="3"/>
        <path d="M 50 280 Q 100 260 200 256 Q 300 260 350 280" stroke="#F4B989" strokeWidth="1.5" fill="none" opacity=".55"/>

        {/* three wires drooping out, illuminated */}
        <path d="M 140 280 C 138 360, 130 440, 150 540" stroke="#7A5A3E" strokeWidth="9" fill="none" strokeLinecap="round"/>
        <path d="M 140 280 C 138 360, 130 440, 150 540" stroke="#F4B989" strokeWidth="1.8" fill="none" strokeLinecap="round" opacity=".7"/>

        <path d="M 200 280 C 200 380, 200 460, 200 540" stroke="#5A7AA8" strokeWidth="9" fill="none" strokeLinecap="round"/>
        <path d="M 200 280 C 200 380, 200 460, 200 540" stroke="#A8C5E2" strokeWidth="1.8" fill="none" strokeLinecap="round" opacity=".75"/>

        <path d="M 260 280 C 262 360, 270 440, 250 540" stroke="#A8B560" strokeWidth="9" fill="none" strokeLinecap="round"/>
        <path d="M 260 280 C 262 360, 270 440, 250 540" stroke="#D5DD9A" strokeWidth="1.8" fill="none" strokeLinecap="round" opacity=".75"/>
        {/* yellow stripes on ground */}
        {[320, 380, 440, 500].map(y => (
          <path key={y} d={`M ${256 + (y-280)*-0.04} ${y-4} l 8 -3`} stroke="#FFD982" strokeWidth="3" strokeLinecap="round" opacity=".9"/>
        ))}

        {/* stripped copper ends, glowing */}
        {[{x:150,c:'#E0A878'},{x:200,c:'#A8C5E2'},{x:250,c:'#D5DD9A'}].map((w,i) => (
          <g key={i} transform={`translate(${w.x},540)`}>
            <ellipse cx="0" cy="0" rx="11" ry="6" fill="#0A0604"/>
            <line x1="0" y1="2" x2="0" y2="22" stroke="#D9A878" strokeWidth="3" strokeLinecap="round"/>
            <circle cx="0" cy="22" r="3" fill="#FFD982"/>
            <circle cx="0" cy="22" r="8" fill="#FFD982" opacity=".25"/>
          </g>
        ))}

        {/* lamp base wires rising to meet */}
        <path d="M 150 600 C 150 660, 140 710, 160 760" stroke="#7A5A3E" strokeWidth="9" fill="none" strokeLinecap="round"/>
        <path d="M 200 600 C 200 660, 200 710, 200 760" stroke="#5A7AA8" strokeWidth="9" fill="none" strokeLinecap="round"/>
        <path d="M 250 600 C 252 660, 260 710, 240 760" stroke="#A8B560" strokeWidth="9" fill="none" strokeLinecap="round"/>

        {/* labels at the matchpoint — small chips */}
        {[{x:150, t:'BR', c:'#7A5A3E'},{x:200, t:'BL', c:'#5A7AA8'},{x:250, t:'GY', c:'#A8B560'}].map((l,i) => (
          <g key={i} transform={`translate(${l.x},580)`}>
            <rect x="-15" y="-10" width="30" height="18" rx="9" fill={l.c} stroke="#F4B989" strokeWidth="1" opacity=".95"/>
            <text x="0" y="3" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="10" fontWeight="700" fill="#FAF8F5">{l.t}</text>
          </g>
        ))}

        {/* connection sparkle */}
        <g transform="translate(200, 570)">
          <circle r="22" fill="#FFD982" opacity=".18"/>
          <circle r="6" fill="#FFD982"/>
        </g>
      </Scene>
    </CineFrame>
  );
}

// ── 4. Tucking wires neatly into base ───────────────────────────
function StepIllu4() {
  return (
    <CineFrame vignette="amber">
      <Scene>
        <defs>
          <radialGradient id="key4" cx="55%" cy="40%" r="48%">
            <stop offset="0%" stopColor="#F4B989" stopOpacity=".4"/>
            <stop offset="100%" stopColor="#0A0604" stopOpacity="0"/>
          </radialGradient>
        </defs>
        <rect width="400" height="800" fill="url(#key4)"/>

        {/* base bowl seen from above-side */}
        <ellipse cx="200" cy="430" rx="160" ry="42" fill="#241914" stroke="#9A8E7A" strokeWidth="3"/>
        <path d="M 40 430 Q 80 590 200 600 Q 320 590 360 430" fill="#1A130C" stroke="#9A8E7A" strokeWidth="2.5"/>
        <ellipse cx="200" cy="430" rx="160" ry="42" fill="none" stroke="#F4B989" strokeWidth="1.6" opacity=".6"/>

        {/* inner cavity */}
        <ellipse cx="200" cy="430" rx="120" ry="30" fill="#0A0604"/>
        <ellipse cx="200" cy="430" rx="120" ry="30" fill="none" stroke="#3A2616" strokeWidth="2"/>

        {/* curled wires */}
        <path d="M 130 425 q 25 -34 60 -16 q 35 16 60 -12" stroke="#7A5A3E" strokeWidth="6" fill="none" strokeLinecap="round"/>
        <path d="M 145 432 q 22 -22 45 -10 q 22 12 45 -6" stroke="#5A7AA8" strokeWidth="6" fill="none" strokeLinecap="round"/>
        <path d="M 160 440 q 16 -10 35 -4 q 17 6 35 -2" stroke="#A8B560" strokeWidth="6" fill="none" strokeLinecap="round"/>

        {/* fingertip pushing in */}
        <g transform="translate(260, 410)">
          <ellipse cx="0" cy="0" rx="22" ry="14" fill="#3A2A1F" stroke="#0A0604" strokeWidth="2"/>
          <path d="M -22 -2 Q 0 -10 22 -2" fill="none" stroke="#F4B989" strokeWidth="1.6" opacity=".7"/>
          {/* nail */}
          <ellipse cx="-2" cy="-4" rx="6" ry="3" fill="#5A4030" stroke="#0A0604" strokeWidth="1"/>
        </g>

        {/* down arrows showing tucking */}
        <g stroke="#E07856" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeDasharray="4 5">
          <path d="M 110 360 Q 130 400 145 415"/>
          <path d="M 290 360 Q 270 400 255 415"/>
        </g>

        {/* approving glint */}
        <g transform="translate(330, 360)">
          <circle r="4" fill="#FFD982"/>
          <line x1="-12" y1="0" x2="-7" y2="0" stroke="#FFD982" strokeWidth="2.2" strokeLinecap="round" opacity=".9"/>
          <line x1="7"  y1="0" x2="12" y2="0" stroke="#FFD982" strokeWidth="2.2" strokeLinecap="round" opacity=".9"/>
        </g>
      </Scene>
    </CineFrame>
  );
}

// ── 5. Mount base plate against ceiling ─────────────────────────
function StepIllu5() {
  return (
    <CineFrame vignette="warm">
      <Scene>
        {/* ceiling at top */}
        <rect x="0" y="0" width="400" height="200" fill="#1F140C"/>
        <line x1="0" y1="200" x2="400" y2="200" stroke="#5A3920" strokeWidth="2.5"/>
        <line x1="0" y1="202" x2="400" y2="202" stroke="#F4B989" strokeWidth="1" opacity=".5"/>

        {/* ceiling box opening */}
        <ellipse cx="200" cy="200" rx="50" ry="10" fill="#080604"/>

        {/* base plate held up against ceiling */}
        <g transform="translate(0, 0)">
          <ellipse cx="200" cy="240" rx="130" ry="20" fill="#241914" stroke="#9A8E7A" strokeWidth="3"/>
          <path d="M 70 240 Q 90 320 200 332 Q 310 320 330 240" fill="#1A130C" stroke="#9A8E7A" strokeWidth="2.5"/>
          <ellipse cx="200" cy="240" rx="130" ry="20" fill="none" stroke="#F4B989" strokeWidth="1.6" opacity=".7"/>
        </g>

        {/* screws being driven in */}
        <g transform="translate(120, 230)">
          <rect x="-3" y="-26" width="6" height="36" rx="2" fill="#9A8E7A" stroke="#0A0604" strokeWidth="1.4"/>
          <circle cx="0" cy="-26" r="6" fill="#9A8E7A" stroke="#0A0604" strokeWidth="1.4"/>
          <circle cx="0" cy="-26" r="2.5" fill="#F4B989" opacity=".7"/>
        </g>
        <g transform="translate(280, 230)">
          <rect x="-3" y="-26" width="6" height="36" rx="2" fill="#9A8E7A" stroke="#0A0604" strokeWidth="1.4"/>
          <circle cx="0" cy="-26" r="6" fill="#9A8E7A" stroke="#0A0604" strokeWidth="1.4"/>
          <circle cx="0" cy="-26" r="2.5" fill="#F4B989" opacity=".7"/>
        </g>

        {/* rotating arrow showing twist */}
        <g transform="translate(120, 230)">
          <path d="M 14 -28 a 18 18 0 0 1 -14 22" stroke="#E07856" strokeWidth="2" fill="none" strokeLinecap="round" strokeDasharray="3 4"/>
        </g>

        {/* hands lifting */}
        <path d="M 30 800 L 30 540 Q 60 460 120 440 Q 165 430 175 470 Q 180 500 150 520 Q 110 545 80 580 Q 50 660 50 800 Z"
              fill="#3A2A1F" stroke="#0A0604" strokeWidth="2"/>
        <path d="M 60 460 Q 100 430 145 425" fill="none" stroke="#F4B989" strokeWidth="1.6" opacity=".7"/>

        <path d="M 370 800 L 370 540 Q 340 460 280 440 Q 235 430 225 470 Q 220 500 250 520 Q 290 545 320 580 Q 350 660 350 800 Z"
              fill="#3A2A1F" stroke="#0A0604" strokeWidth="2"/>
        <path d="M 340 460 Q 300 430 255 425" fill="none" stroke="#F4B989" strokeWidth="1.6" opacity=".7"/>

        {/* glow halo */}
        <ellipse cx="200" cy="280" rx="160" ry="40" fill="#E07856" opacity=".10"/>
      </Scene>
    </CineFrame>
  );
}

// ── 6. Attach the metal ring (twist on) ─────────────────────────
function StepIllu6() {
  return (
    <CineFrame vignette="glow">
      <Scene>
        <defs>
          <radialGradient id="key6" cx="50%" cy="40%" r="50%">
            <stop offset="0%" stopColor="#F4B989" stopOpacity=".4"/>
            <stop offset="100%" stopColor="#0A0604" stopOpacity="0"/>
          </radialGradient>
        </defs>
        <rect width="400" height="800" fill="url(#key6)"/>

        {/* ceiling */}
        <rect x="0" y="0" width="400" height="180" fill="#1F140C"/>
        <line x1="0" y1="180" x2="400" y2="180" stroke="#5A3920" strokeWidth="2.5"/>

        {/* mounted base plate */}
        <ellipse cx="200" cy="220" rx="118" ry="18" fill="#1A130C" stroke="#9A8E7A" strokeWidth="2.5"/>
        <path d="M 82 220 Q 100 290 200 300 Q 300 290 318 220" fill="#241914" stroke="#9A8E7A" strokeWidth="2.5"/>
        <ellipse cx="200" cy="220" rx="118" ry="18" fill="none" stroke="#F4B989" strokeWidth="1.4" opacity=".7"/>

        {/* metal ring being twisted on, slightly tilted */}
        <g transform="translate(200, 380) rotate(-12)">
          <ellipse cx="0" cy="0" rx="120" ry="30" fill="none" stroke="#9A8E7A" strokeWidth="4"/>
          <ellipse cx="0" cy="-2" rx="120" ry="30" fill="none" stroke="#F4B989" strokeWidth="1.5" opacity=".75"/>
          <ellipse cx="0" cy="0" rx="120" ry="30" fill="#241914" opacity=".25"/>
          {/* ring notches */}
          {[0, 60, 120, 180, 240, 300].map(deg => {
            const r = 120, t = (deg * Math.PI) / 180;
            return <circle key={deg} cx={Math.cos(t)*r} cy={Math.sin(t)*30} r="3" fill="#0A0604"/>;
          })}
        </g>

        {/* twist arrow */}
        <g transform="translate(200, 380)">
          <path d="M -130 0 A 130 28 0 0 1 -10 -28" stroke="#E07856" strokeWidth="3" fill="none" strokeDasharray="4 6" strokeLinecap="round"/>
          <path d="M -16 -34 L -8 -28 L -18 -22" stroke="#E07856" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        </g>

        {/* hands */}
        <path d="M 0 800 L 0 580 Q 30 500 90 480 Q 130 470 145 510 Q 150 540 120 560 Q 80 595 50 640 Q 20 720 20 800 Z"
              fill="#3A2A1F" stroke="#0A0604" strokeWidth="2"/>
        <path d="M 30 500 Q 70 470 130 472" fill="none" stroke="#F4B989" strokeWidth="1.6" opacity=".7"/>

        <path d="M 400 800 L 400 580 Q 370 500 310 480 Q 270 470 255 510 Q 250 540 280 560 Q 320 595 350 640 Q 380 720 380 800 Z"
              fill="#3A2A1F" stroke="#0A0604" strokeWidth="2"/>
        <path d="M 370 500 Q 330 470 270 472" fill="none" stroke="#F4B989" strokeWidth="1.6" opacity=".7"/>

        {/* click sparkle */}
        <g transform="translate(310, 360)">
          <circle r="20" fill="#FFD982" opacity=".18"/>
          <circle r="5" fill="#FFD982"/>
          <line x1="-14" y1="0" x2="-8" y2="0" stroke="#FFD982" strokeWidth="2.2" strokeLinecap="round"/>
          <line x1="8"   y1="0" x2="14" y2="0" stroke="#FFD982" strokeWidth="2.2" strokeLinecap="round"/>
        </g>
      </Scene>
    </CineFrame>
  );
}

// ── 7. Slide globe shade up + twist ─────────────────────────────
function StepIllu7() {
  return (
    <CineFrame vignette="glow">
      <Scene>
        <defs>
          <radialGradient id="halo7" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFD982" stopOpacity=".5"/>
            <stop offset="100%" stopColor="#FFC83D" stopOpacity="0"/>
          </radialGradient>
        </defs>

        {/* ceiling */}
        <rect x="0" y="0" width="400" height="120" fill="#1F140C"/>
        <line x1="0" y1="120" x2="400" y2="120" stroke="#5A3920" strokeWidth="2"/>

        {/* base + ring already in place */}
        <ellipse cx="200" cy="170" rx="100" ry="14" fill="#1A130C" stroke="#9A8E7A" strokeWidth="2.5"/>
        <path d="M 100 170 Q 120 230 200 240 Q 280 230 300 170" fill="#241914" stroke="#9A8E7A" strokeWidth="2"/>
        <ellipse cx="200" cy="220" rx="92" ry="13" fill="none" stroke="#9A8E7A" strokeWidth="3"/>
        <ellipse cx="200" cy="220" rx="92" ry="13" fill="none" stroke="#F4B989" strokeWidth="1.2" opacity=".6"/>

        {/* halo behind globe */}
        <circle cx="200" cy="430" r="180" fill="url(#halo7)"/>

        {/* globe being lifted up */}
        <g>
          <circle cx="200" cy="430" r="100" fill="#1A130C" stroke="#9A8E7A" strokeWidth="3" opacity=".95"/>
          <circle cx="200" cy="430" r="100" fill="rgba(244,185,137,.08)"/>
          <path d="M 130 408 Q 200 388 270 408" stroke="#F4B989" strokeWidth="3" fill="none" strokeLinecap="round" opacity=".7"/>
          <ellipse cx="200" cy="345" rx="58" ry="10" fill="#241914" stroke="#9A8E7A" strokeWidth="2.5"/>
        </g>

        {/* up arrows */}
        <g stroke="#E07856" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity=".9">
          <path d="M 70 480 L 70 380"/>
          <path d="M 62 392 L 70 378 L 78 392"/>
          <path d="M 330 480 L 330 380"/>
          <path d="M 322 392 L 330 378 L 338 392"/>
        </g>

        {/* twist arrow */}
        <g transform="translate(200, 430)">
          <path d="M -110 0 A 110 28 0 0 1 -10 -28" stroke="#E07856" strokeWidth="2.6" fill="none" strokeLinecap="round" strokeDasharray="4 6"/>
        </g>

        {/* hands lifting from below */}
        <path d="M 0 800 L 0 600 Q 40 520 110 510 Q 150 506 165 540 Q 170 570 140 590 Q 100 615 80 660 Q 50 740 50 800 Z"
              fill="#3A2A1F" stroke="#0A0604" strokeWidth="2"/>
        <path d="M 40 520 Q 80 500 150 502" fill="none" stroke="#F4B989" strokeWidth="1.6" opacity=".7"/>

        <path d="M 400 800 L 400 600 Q 360 520 290 510 Q 250 506 235 540 Q 230 570 260 590 Q 300 615 320 660 Q 350 740 350 800 Z"
              fill="#3A2A1F" stroke="#0A0604" strokeWidth="2"/>
        <path d="M 360 520 Q 320 500 250 502" fill="none" stroke="#F4B989" strokeWidth="1.6" opacity=".7"/>
      </Scene>
    </CineFrame>
  );
}

// ── 8. Power on, lit lamp, cozy glow ────────────────────────────
function StepIllu8() {
  return (
    <CineFrame vignette="glow" tint="radial-gradient(110% 90% at 50% 55%, #5A3220 0%, #2A1810 45%, #0A0604 100%)">
      <Scene>
        <defs>
          <radialGradient id="bigGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFE08A" stopOpacity=".95"/>
            <stop offset="35%" stopColor="#FFC83D" stopOpacity=".55"/>
            <stop offset="100%" stopColor="#FFC83D" stopOpacity="0"/>
          </radialGradient>
          <radialGradient id="globeLit" cx="40%" cy="35%" r="55%">
            <stop offset="0%" stopColor="#FFFEEE" stopOpacity="1"/>
            <stop offset="65%" stopColor="#FFE08A" stopOpacity=".85"/>
            <stop offset="100%" stopColor="#FFC83D" stopOpacity=".4"/>
          </radialGradient>
        </defs>

        {/* ceiling */}
        <rect x="0" y="0" width="400" height="100" fill="#1F140C"/>
        <line x1="0" y1="100" x2="400" y2="100" stroke="#3F2616" strokeWidth="2"/>

        {/* base + ring */}
        <ellipse cx="200" cy="140" rx="90" ry="11" fill="#1A130C" stroke="#9A8E7A" strokeWidth="2"/>
        <ellipse cx="200" cy="180" rx="80" ry="10" fill="none" stroke="#9A8E7A" strokeWidth="2.5"/>

        {/* big halo */}
        <circle cx="200" cy="430" r="280" fill="url(#bigGlow)"/>

        {/* light rays */}
        {[...Array(12)].map((_,i) => {
          const a = (i / 12) * Math.PI * 2;
          const x1 = 200 + Math.cos(a) * 130;
          const y1 = 430 + Math.sin(a) * 130;
          const x2 = 200 + Math.cos(a) * 200;
          const y2 = 430 + Math.sin(a) * 200;
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#FFD982" strokeWidth="2.4" strokeLinecap="round" opacity=".55"/>;
        })}

        {/* lit globe */}
        <circle cx="200" cy="430" r="110" fill="#FFF6DD" stroke="#E07856" strokeWidth="2.5" opacity=".95"/>
        <circle cx="200" cy="430" r="110" fill="url(#globeLit)"/>
        <path d="M 140 400 Q 200 380 260 400" stroke="rgba(255,255,255,.85)" strokeWidth="6" fill="none" strokeLinecap="round"/>

        {/* warm lit room hint — subtle furniture silhouettes */}
        <path d="M 0 800 L 0 720 Q 40 700 120 710 L 130 800 Z" fill="#1A130C" opacity=".7"/>
        <path d="M 400 800 L 400 730 Q 350 712 280 720 L 270 800 Z" fill="#1A130C" opacity=".7"/>
        {/* couch hint */}
        <rect x="60" y="710" width="100" height="90" rx="10" fill="#3A2616" opacity=".5"/>
        <rect x="60" y="710" width="100" height="14" fill="#5A3920" opacity=".55"/>

        {/* sparkle */}
        <circle cx="60"  cy="200" r="2" fill="#FFD982" opacity=".8"/>
        <circle cx="350" cy="250" r="1.6" fill="#F4B989" opacity=".75"/>
        <circle cx="320" cy="600" r="2" fill="#FFD982" opacity=".7"/>
      </Scene>
    </CineFrame>
  );
}

// ── Hero: assembled product card image (for confirmation) ───────
function ProductHero() {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(120% 90% at 50% 55%, #4A2E1C 0%, #1F140C 55%, #0E0805 100%)',
      }}/>
      <svg viewBox="0 0 400 280" preserveAspectRatio="xMidYMid slice"
           style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <defs>
          <radialGradient id="ph_glow" cx="50%" cy="60%" r="50%">
            <stop offset="0%" stopColor="#FFE08A" stopOpacity=".75"/>
            <stop offset="100%" stopColor="#FFC83D" stopOpacity="0"/>
          </radialGradient>
          <radialGradient id="ph_globe" cx="40%" cy="35%" r="55%">
            <stop offset="0%" stopColor="#FFFEEE" stopOpacity="1"/>
            <stop offset="100%" stopColor="#FFE08A" stopOpacity=".55"/>
          </radialGradient>
        </defs>
        <rect x="0" y="0" width="400" height="40" fill="#1F140C"/>
        <line x1="0" y1="40" x2="400" y2="40" stroke="#3F2616" strokeWidth="2"/>
        <ellipse cx="200" cy="60" rx="74" ry="9" fill="#1A130C" stroke="#9A8E7A" strokeWidth="2"/>
        <circle cx="200" cy="180" r="160" fill="url(#ph_glow)"/>
        <circle cx="200" cy="180" r="86" fill="#FFF6DD" stroke="#E07856" strokeWidth="2" opacity=".95"/>
        <circle cx="200" cy="180" r="86" fill="url(#ph_globe)"/>
        <path d="M 140 158 Q 200 142 260 158" stroke="rgba(255,255,255,.85)" strokeWidth="5" fill="none" strokeLinecap="round"/>
      </svg>
    </div>
  );
}

// ── Tiny chip thumbnails ────────────────────────────────────────
function ChipChair() {
  return (
    <svg viewBox="0 0 32 32" width="22" height="22">
      <path d="M8 8 L24 8 L23 22 L9 22 Z" fill="#E07856" stroke="#1A1106" strokeWidth="1.4" strokeLinejoin="round"/>
      <rect x="9" y="22" width="3" height="6" rx="1" fill="#1A1106"/>
      <rect x="20" y="22" width="3" height="6" rx="1" fill="#1A1106"/>
    </svg>
  );
}
function ChipLamp() {
  return (
    <svg viewBox="0 0 32 32" width="22" height="22">
      <rect x="7" y="6" width="18" height="2.5" rx="1" fill="#9A8E7A"/>
      <ellipse cx="16" cy="10" rx="5" ry="1.4" fill="#9A8E7A"/>
      <circle cx="16" cy="20" r="7" fill="#FFE08A" stroke="#E07856" strokeWidth="1.4"/>
    </svg>
  );
}
function ChipDesk() {
  return (
    <svg viewBox="0 0 32 32" width="22" height="22">
      <rect x="4" y="12" width="24" height="3" rx="1" fill="#E07856"/>
      <rect x="6" y="15" width="3" height="13" rx="1" fill="#1A1106"/>
      <rect x="23" y="15" width="3" height="13" rx="1" fill="#1A1106"/>
    </svg>
  );
}

const STEP_ILLUS = [StepIllu1, StepIllu2, StepIllu3, StepIllu4, StepIllu5, StepIllu6, StepIllu7, StepIllu8];

Object.assign(window, {
  ILLU_PALETTE, CineFrame,
  StepIllu1, StepIllu2, StepIllu3, StepIllu4,
  StepIllu5, StepIllu6, StepIllu7, StepIllu8,
  STEP_ILLUS, ProductHero,
  ChipChair, ChipLamp, ChipDesk,
});
