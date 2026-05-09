// illustrations.jsx
// Storybook-style step illustrations. Built from very simple SVG shapes —
// no overwrought paths. Soft warm palette, cohesive across all 8 steps.

const ILLU_PALETTE = {
  bg1: '#F8E4D6',     // peachy backdrop
  bg2: '#FBEFE2',     // lighter peach
  bg3: '#EAD8C2',     // tan
  cream: '#FAF8F5',
  ink: '#2A2521',
  ink2: '#5A554D',
  warm: '#E07856',    // terracotta
  warmDeep: '#B85A3A',
  sun: '#FFC83D',
  sage: '#B7C9A0',
  blue: '#7AA8D4',
  brown: '#8B6F4E',
  greenYellow: '#C7D67A',
};

// Soft rounded backdrop — common to every scene
function IlluFrame({ children, tone = 'peach' }) {
  const tones = {
    peach:  ['#FAEAD9', '#F5D8C2'],
    cream:  ['#F7EFE2', '#EFE2CD'],
    sun:    ['#FCEAB7', '#F6D88A'],
    sage:   ['#E2EAD3', '#CFDDB8'],
    dusk:   ['#E8DDC9', '#D9C8AC'],
    sky:    ['#E1E9F0', '#C9D6E2'],
  };
  const [a, b] = tones[tone] || tones.peach;
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: `radial-gradient(120% 80% at 50% 30%, ${a} 0%, ${b} 100%)`,
      }} />
      {/* soft floating blobs */}
      <div style={{
        position: 'absolute', top: '8%', left: '-10%',
        width: '50%', height: '40%', borderRadius: '50%',
        background: 'rgba(255,255,255,.35)', filter: 'blur(20px)',
        animation: 'drift 9s ease-in-out infinite',
      }} />
      <div style={{
        position: 'absolute', bottom: '4%', right: '-8%',
        width: '45%', height: '38%', borderRadius: '50%',
        background: 'rgba(255,255,255,.25)', filter: 'blur(22px)',
        animation: 'drift 11s ease-in-out infinite reverse',
      }} />
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        {children}
      </div>
    </div>
  );
}

// Common SVG wrapper that scales to its container
function Scene({ children, viewBox = '0 0 400 400' }) {
  return (
    <svg viewBox={viewBox} preserveAspectRatio="xMidYMid meet"
         style={{ width: '100%', height: '100%', display: 'block' }}>
      {children}
    </svg>
  );
}

// ── 1. Circuit breaker, switch off ──────────────────────────────
function StepIllu1() {
  return (
    <IlluFrame tone="dusk">
      <Scene>
        {/* wall */}
        <rect x="60" y="60" width="280" height="280" rx="24" fill="#FBF4E8" stroke="#2A2521" strokeWidth="3"/>
        {/* breaker label */}
        <rect x="100" y="100" width="200" height="24" rx="6" fill="#EAD8C2"/>
        <line x1="118" y1="112" x2="200" y2="112" stroke="#2A2521" strokeWidth="2" strokeLinecap="round" opacity=".55"/>
        {/* switches */}
        {[0,1,2,3].map(i => (
          <g key={i} transform={`translate(${110 + i*48}, 150)`}>
            <rect x="0" y="0" width="36" height="120" rx="8" fill="#FAF8F5" stroke="#2A2521" strokeWidth="2.5"/>
            <rect x="6" y="60" width="24" height="34" rx="4" fill={i === 1 ? '#E07856' : '#EAD8C2'}/>
            <rect x="6" y="60" width="24" height="6" rx="2" fill="rgba(0,0,0,.12)"/>
          </g>
        ))}
        {/* OFF tag */}
        <g transform="translate(168, 290)">
          <rect x="-4" y="0" width="72" height="26" rx="13" fill="#2A2521"/>
          <text x="32" y="18" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="13" fontWeight="700" fill="#FAF8F5" letterSpacing=".08em">OFF</text>
        </g>
        {/* sparkles */}
        <circle cx="80" cy="80" r="3" fill="#FFC83D"/>
        <circle cx="330" cy="100" r="2.5" fill="#E07856"/>
        <circle cx="320" cy="320" r="3" fill="#FFC83D"/>
      </Scene>
    </IlluFrame>
  );
}

// ── 2. Open box with parts ──────────────────────────────────────
function StepIllu2() {
  return (
    <IlluFrame tone="cream">
      <Scene>
        {/* box back flap */}
        <path d="M 80 180 L 200 130 L 320 180 L 320 200 L 80 200 Z" fill="#D9B68A" stroke="#2A2521" strokeWidth="3" strokeLinejoin="round"/>
        {/* box body */}
        <path d="M 80 180 L 320 180 L 300 320 L 100 320 Z" fill="#E6C49A" stroke="#2A2521" strokeWidth="3" strokeLinejoin="round"/>
        <path d="M 80 180 L 320 180" stroke="#2A2521" strokeWidth="3"/>
        {/* tape */}
        <rect x="180" y="170" width="40" height="20" fill="#FBEFE2" stroke="#2A2521" strokeWidth="2"/>

        {/* lampshade (round) */}
        <ellipse cx="155" cy="155" rx="58" ry="20" fill="#FAF8F5" stroke="#2A2521" strokeWidth="3"/>
        <path d="M 97 155 Q 155 175 213 155" fill="#F5E9D6" stroke="#2A2521" strokeWidth="3"/>
        {/* metal ring */}
        <ellipse cx="270" cy="135" rx="40" ry="12" fill="none" stroke="#2A2521" strokeWidth="3"/>
        <ellipse cx="270" cy="135" rx="40" ry="12" fill="#EAD8C2" opacity=".5"/>
        {/* screws set aside */}
        <g transform="translate(230, 270)">
          <circle cx="0" cy="0" r="9" fill="#C7B89C" stroke="#2A2521" strokeWidth="2"/>
          <line x1="-4" y1="0" x2="4" y2="0" stroke="#2A2521" strokeWidth="1.5"/>
          <circle cx="20" cy="6" r="9" fill="#C7B89C" stroke="#2A2521" strokeWidth="2"/>
          <line x1="16" y1="6" x2="24" y2="6" stroke="#2A2521" strokeWidth="1.5"/>
        </g>
        {/* "step 6" arrow note */}
        <g transform="translate(252, 248)">
          <path d="M 0 0 Q 18 -22 40 -8" fill="none" stroke="#E07856" strokeWidth="2.2" strokeDasharray="3 4" strokeLinecap="round"/>
          <path d="M 38 -10 L 44 -8 L 40 -2" fill="none" stroke="#E07856" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
        </g>
      </Scene>
    </IlluFrame>
  );
}

// ── 3. Hold ring against ceiling, centered ──────────────────────
function StepIllu3() {
  return (
    <IlluFrame tone="peach">
      <Scene>
        {/* ceiling */}
        <rect x="0" y="60" width="400" height="80" fill="#FBF4E8" stroke="#2A2521" strokeWidth="3"/>
        {/* electrical box */}
        <rect x="170" y="80" width="60" height="36" rx="4" fill="#3B342C" stroke="#2A2521" strokeWidth="2.5"/>
        {/* wire snippets */}
        <path d="M 188 96 q -3 6 0 12" stroke="#8B6F4E" strokeWidth="3" fill="none" strokeLinecap="round"/>
        <path d="M 200 96 q 3 6 0 12" stroke="#7AA8D4" strokeWidth="3" fill="none" strokeLinecap="round"/>
        <path d="M 212 96 q -3 6 0 12" stroke="#C7D67A" strokeWidth="3" fill="none" strokeLinecap="round"/>

        {/* metal ring being held */}
        <ellipse cx="200" cy="200" rx="92" ry="22" fill="none" stroke="#2A2521" strokeWidth="3.5"/>
        <ellipse cx="200" cy="200" rx="92" ry="22" fill="#EAD8C2" opacity=".55"/>
        {/* screw holes */}
        <circle cx="125" cy="200" r="4" fill="#2A2521"/>
        <circle cx="275" cy="200" r="4" fill="#2A2521"/>

        {/* centering crosshairs */}
        <line x1="200" y1="140" x2="200" y2="240" stroke="#E07856" strokeWidth="1.6" strokeDasharray="4 4"/>
        <line x1="120" y1="200" x2="280" y2="200" stroke="#E07856" strokeWidth="1.6" strokeDasharray="4 4"/>
        <circle cx="200" cy="200" r="6" fill="#E07856"/>

        {/* hand from below — simple soft shape */}
        <path d="M 130 360 Q 160 240 220 230 Q 280 222 290 260 Q 295 290 270 310 Q 240 345 200 355 Z"
              fill="#F5C9A8" stroke="#2A2521" strokeWidth="3" strokeLinejoin="round"/>
        <path d="M 175 250 q 12 -10 28 -10 m -22 18 q 12 -8 28 -8 m -22 18 q 12 -6 28 -6"
              stroke="#2A2521" strokeWidth="1.6" fill="none" strokeLinecap="round" opacity=".5"/>
      </Scene>
    </IlluFrame>
  );
}

// ── 4. Three colored wires meeting ──────────────────────────────
function StepIllu4() {
  return (
    <IlluFrame tone="sky">
      <Scene>
        {/* ceiling stub */}
        <rect x="0" y="50" width="400" height="50" fill="#FBF4E8" stroke="#2A2521" strokeWidth="3"/>
        {/* wires from ceiling */}
        <path d="M 140 100 C 140 160, 130 200, 150 240" stroke="#8B6F4E" strokeWidth="6" fill="none" strokeLinecap="round"/>
        <path d="M 200 100 C 200 170, 200 200, 200 240" stroke="#7AA8D4" strokeWidth="6" fill="none" strokeLinecap="round"/>
        <path d="M 260 100 C 260 160, 270 200, 250 240" stroke="#C7D67A" strokeWidth="6" fill="none" strokeLinecap="round"/>

        {/* wire caps */}
        {[
          {x:150, y:240, c:'#8B6F4E'},
          {x:200, y:240, c:'#7AA8D4'},
          {x:250, y:240, c:'#C7D67A'},
        ].map((w,i) => (
          <g key={i} transform={`translate(${w.x},${w.y})`}>
            <ellipse cx="0" cy="0" rx="14" ry="9" fill={w.c} stroke="#2A2521" strokeWidth="2.5"/>
            <ellipse cx="0" cy="-1" rx="14" ry="9" fill="rgba(255,255,255,.25)"/>
          </g>
        ))}

        {/* matching wires from lamp base */}
        <path d="M 150 280 C 150 320, 140 340, 160 360" stroke="#8B6F4E" strokeWidth="6" fill="none" strokeLinecap="round"/>
        <path d="M 200 280 C 200 320, 200 340, 200 360" stroke="#7AA8D4" strokeWidth="6" fill="none" strokeLinecap="round"/>
        <path d="M 250 280 C 250 320, 260 340, 240 360" stroke="#C7D67A" strokeWidth="6" fill="none" strokeLinecap="round"/>

        {/* lamp base hint */}
        <rect x="100" y="358" width="200" height="20" rx="10" fill="#FAF8F5" stroke="#2A2521" strokeWidth="3"/>

        {/* connection sparkle */}
        <g transform="translate(200, 260)">
          <circle r="14" fill="#FFC83D" opacity=".25"/>
          <circle r="6" fill="#FFC83D"/>
          <line x1="-18" y1="0" x2="-12" y2="0" stroke="#FFC83D" strokeWidth="2.5" strokeLinecap="round"/>
          <line x1="12"  y1="0" x2="18"  y2="0" stroke="#FFC83D" strokeWidth="2.5" strokeLinecap="round"/>
          <line x1="0" y1="-18" x2="0" y2="-12" stroke="#FFC83D" strokeWidth="2.5" strokeLinecap="round"/>
          <line x1="0" y1="12"  x2="0" y2="18"  stroke="#FFC83D" strokeWidth="2.5" strokeLinecap="round"/>
        </g>
      </Scene>
    </IlluFrame>
  );
}

// ── 5. Tucking wires into base ──────────────────────────────────
function StepIllu5() {
  return (
    <IlluFrame tone="cream">
      <Scene>
        {/* lamp base — bowl-ish, viewed from below */}
        <ellipse cx="200" cy="220" rx="140" ry="40" fill="#FAF8F5" stroke="#2A2521" strokeWidth="3"/>
        <path d="M 60 220 Q 80 320 200 332 Q 320 320 340 220" fill="#F5E9D6" stroke="#2A2521" strokeWidth="3" strokeLinejoin="round"/>
        {/* inner cavity */}
        <ellipse cx="200" cy="220" rx="100" ry="26" fill="#EAD8C2" stroke="#2A2521" strokeWidth="2.5"/>
        {/* wires curled inside */}
        <path d="M 150 218 q 20 -28 50 -14 q 30 14 50 -10" stroke="#8B6F4E" strokeWidth="5" fill="none" strokeLinecap="round"/>
        <path d="M 165 222 q 18 -16 35 -8 q 18 8 36 -4" stroke="#7AA8D4" strokeWidth="5" fill="none" strokeLinecap="round"/>
        <path d="M 175 226 q 12 -8 25 -4 q 13 4 25 -2" stroke="#C7D67A" strokeWidth="5" fill="none" strokeLinecap="round"/>
        {/* a happy little "neat" check */}
        <g transform="translate(312, 170)">
          <circle r="20" fill="#B7C9A0" stroke="#2A2521" strokeWidth="2.5"/>
          <path d="M -8 0 L -2 7 L 9 -6" stroke="#2A2521" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        </g>
        {/* arrows showing tucking */}
        <path d="M 140 170 Q 160 195 180 200" stroke="#E07856" strokeWidth="2" fill="none" strokeDasharray="3 4" strokeLinecap="round"/>
        <path d="M 178 198 L 184 200 L 180 206" stroke="#E07856" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M 260 170 Q 240 195 220 200" stroke="#E07856" strokeWidth="2" fill="none" strokeDasharray="3 4" strokeLinecap="round"/>
        <path d="M 222 198 L 216 200 L 220 206" stroke="#E07856" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      </Scene>
    </IlluFrame>
  );
}

// ── 6. Lifting base & screwing in ───────────────────────────────
function StepIllu6() {
  return (
    <IlluFrame tone="peach">
      <Scene>
        {/* ceiling */}
        <rect x="0" y="40" width="400" height="48" fill="#FBF4E8" stroke="#2A2521" strokeWidth="3"/>
        {/* ring on ceiling */}
        <ellipse cx="200" cy="100" rx="92" ry="14" fill="#EAD8C2" stroke="#2A2521" strokeWidth="3"/>
        {/* lamp base being lifted up */}
        <g transform="translate(0, 0)">
          <ellipse cx="200" cy="170" rx="120" ry="20" fill="#FAF8F5" stroke="#2A2521" strokeWidth="3"/>
          <path d="M 80 170 Q 100 250 200 258 Q 300 250 320 170" fill="#F5E9D6" stroke="#2A2521" strokeWidth="3" strokeLinejoin="round"/>
        </g>
        {/* up arrows */}
        <g stroke="#E07856" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M 130 220 L 130 145"/>
          <path d="M 122 154 L 130 142 L 138 154"/>
          <path d="M 270 220 L 270 145"/>
          <path d="M 262 154 L 270 142 L 278 154"/>
        </g>
        {/* screws */}
        <g transform="translate(115, 100)">
          <rect x="-4" y="-4" width="8" height="40" rx="3" fill="#C7B89C" stroke="#2A2521" strokeWidth="2"/>
          <circle cx="0" cy="-4" r="7" fill="#C7B89C" stroke="#2A2521" strokeWidth="2"/>
          <line x1="-4" y1="-4" x2="4" y2="-4" stroke="#2A2521" strokeWidth="1.5"/>
        </g>
        <g transform="translate(285, 100)">
          <rect x="-4" y="-4" width="8" height="40" rx="3" fill="#C7B89C" stroke="#2A2521" strokeWidth="2"/>
          <circle cx="0" cy="-4" r="7" fill="#C7B89C" stroke="#2A2521" strokeWidth="2"/>
          <line x1="-4" y1="-4" x2="4" y2="-4" stroke="#2A2521" strokeWidth="1.5"/>
        </g>
        {/* hands */}
        <path d="M 60 360 Q 80 290 130 280 Q 170 274 175 305 Q 178 330 145 345 Q 110 360 80 365 Z"
              fill="#F5C9A8" stroke="#2A2521" strokeWidth="3" strokeLinejoin="round"/>
        <path d="M 340 360 Q 320 290 270 280 Q 230 274 225 305 Q 222 330 255 345 Q 290 360 320 365 Z"
              fill="#F5C9A8" stroke="#2A2521" strokeWidth="3" strokeLinejoin="round"/>
      </Scene>
    </IlluFrame>
  );
}

// ── 7. Twisting on the lampshade ────────────────────────────────
function StepIllu7() {
  return (
    <IlluFrame tone="sun">
      <Scene>
        {/* mounted base */}
        <rect x="0" y="40" width="400" height="40" fill="#FBF4E8" stroke="#2A2521" strokeWidth="3"/>
        <ellipse cx="200" cy="92" rx="88" ry="14" fill="#F5E9D6" stroke="#2A2521" strokeWidth="3"/>
        <path d="M 112 92 Q 130 130 200 134 Q 270 130 288 92" fill="#FAF8F5" stroke="#2A2521" strokeWidth="3"/>
        {/* metal ring */}
        <ellipse cx="200" cy="138" rx="80" ry="11" fill="none" stroke="#2A2521" strokeWidth="3"/>

        {/* lampshade — translucent globe */}
        <g>
          <circle cx="200" cy="240" r="92" fill="#FFF6DD" stroke="#2A2521" strokeWidth="3"/>
          <path d="M 130 218 Q 200 200 270 218" stroke="rgba(255,255,255,.7)" strokeWidth="6" fill="none" strokeLinecap="round"/>
          <ellipse cx="200" cy="155" rx="60" ry="9" fill="#FAF8F5" stroke="#2A2521" strokeWidth="3"/>
        </g>

        {/* twist arrow */}
        <g transform="translate(200, 240)">
          <path d="M -110 0 A 110 110 0 0 1 -10 -109" stroke="#E07856" strokeWidth="3" fill="none" strokeLinecap="round" strokeDasharray="4 5"/>
          <path d="M -16 -118 L -8 -108 L -20 -102" stroke="#E07856" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        </g>
        {/* click sparkle */}
        <g transform="translate(305, 210)">
          <circle r="4" fill="#E07856"/>
          <line x1="-12" y1="0" x2="-7" y2="0" stroke="#E07856" strokeWidth="2.2" strokeLinecap="round"/>
          <line x1="7"  y1="0" x2="12" y2="0" stroke="#E07856" strokeWidth="2.2" strokeLinecap="round"/>
          <line x1="0" y1="-12" x2="0" y2="-7" stroke="#E07856" strokeWidth="2.2" strokeLinecap="round"/>
          <line x1="0" y1="7"   x2="0" y2="12" stroke="#E07856" strokeWidth="2.2" strokeLinecap="round"/>
        </g>
      </Scene>
    </IlluFrame>
  );
}

// ── 8. The lamp, glowing ────────────────────────────────────────
function StepIllu8() {
  return (
    <IlluFrame tone="sun">
      <Scene>
        {/* ceiling */}
        <rect x="0" y="20" width="400" height="36" fill="#FBF4E8" stroke="#2A2521" strokeWidth="3"/>
        {/* base */}
        <ellipse cx="200" cy="68" rx="80" ry="10" fill="#F5E9D6" stroke="#2A2521" strokeWidth="3"/>
        {/* glow halo */}
        <circle cx="200" cy="220" r="170" fill="url(#g1)" opacity=".95"/>
        <defs>
          <radialGradient id="g1" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFE08A" stopOpacity=".95"/>
            <stop offset="60%" stopColor="#FFC83D" stopOpacity=".25"/>
            <stop offset="100%" stopColor="#FFC83D" stopOpacity="0"/>
          </radialGradient>
        </defs>
        {/* light rays */}
        {[...Array(10)].map((_,i) => {
          const a = (i / 10) * Math.PI * 2;
          const x1 = 200 + Math.cos(a) * 110;
          const y1 = 220 + Math.sin(a) * 110;
          const x2 = 200 + Math.cos(a) * 150;
          const y2 = 220 + Math.sin(a) * 150;
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#E07856" strokeWidth="3" strokeLinecap="round" opacity=".7"/>;
        })}
        {/* lamp globe lit */}
        <circle cx="200" cy="220" r="92" fill="#FFF1B8" stroke="#2A2521" strokeWidth="3"/>
        <circle cx="200" cy="220" r="92" fill="url(#g2)"/>
        <defs>
          <radialGradient id="g2" cx="40%" cy="35%" r="60%">
            <stop offset="0%" stopColor="#FFFEEE" stopOpacity=".95"/>
            <stop offset="100%" stopColor="#FFF1B8" stopOpacity="0"/>
          </radialGradient>
        </defs>
        <path d="M 130 200 Q 200 180 270 200" stroke="rgba(255,255,255,.8)" strokeWidth="6" fill="none" strokeLinecap="round"/>
        <ellipse cx="200" cy="135" rx="60" ry="9" fill="#FAF8F5" stroke="#2A2521" strokeWidth="3"/>
      </Scene>
    </IlluFrame>
  );
}

// ── Hero: assembled product card image ──────────────────────────
function ProductHero() {
  return (
    <IlluFrame tone="sun">
      <Scene viewBox="0 0 400 320">
        {/* ceiling */}
        <rect x="0" y="0" width="400" height="40" fill="#FBF4E8" stroke="#2A2521" strokeWidth="3"/>
        {/* base */}
        <ellipse cx="200" cy="50" rx="76" ry="10" fill="#F5E9D6" stroke="#2A2521" strokeWidth="3"/>
        <path d="M 124 50 Q 140 78 200 80 Q 260 78 276 50" fill="#FAF8F5" stroke="#2A2521" strokeWidth="3"/>
        {/* halo */}
        <circle cx="200" cy="190" r="150" fill="url(#hg1)" opacity=".95"/>
        <defs>
          <radialGradient id="hg1" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFE08A" stopOpacity=".75"/>
            <stop offset="100%" stopColor="#FFC83D" stopOpacity="0"/>
          </radialGradient>
        </defs>
        {/* globe */}
        <circle cx="200" cy="190" r="86" fill="#FFF6DD" stroke="#2A2521" strokeWidth="3"/>
        <path d="M 138 174 Q 200 156 262 174" stroke="rgba(255,255,255,.85)" strokeWidth="6" fill="none" strokeLinecap="round"/>
        <ellipse cx="200" cy="113" rx="58" ry="9" fill="#FAF8F5" stroke="#2A2521" strokeWidth="3"/>
      </Scene>
    </IlluFrame>
  );
}

// ── Tiny demo-chip thumbnails ───────────────────────────────────
function ChipChair() {
  return (
    <svg viewBox="0 0 32 32" width="22" height="22">
      <path d="M8 8 L24 8 L23 22 L9 22 Z" fill="#E07856" stroke="#2A2521" strokeWidth="1.6" strokeLinejoin="round"/>
      <rect x="9" y="22" width="3" height="6" rx="1" fill="#2A2521"/>
      <rect x="20" y="22" width="3" height="6" rx="1" fill="#2A2521"/>
      <path d="M8 8 Q16 4 24 8" fill="none" stroke="#2A2521" strokeWidth="1.6"/>
    </svg>
  );
}
function ChipLamp() {
  return (
    <svg viewBox="0 0 32 32" width="22" height="22">
      <rect x="6" y="6" width="20" height="3" rx="1" fill="#FBEFE2" stroke="#2A2521" strokeWidth="1.4"/>
      <ellipse cx="16" cy="9.5" rx="6" ry="1.6" fill="#F5E9D6" stroke="#2A2521" strokeWidth="1.2"/>
      <circle cx="16" cy="20" r="7" fill="#FFE08A" stroke="#2A2521" strokeWidth="1.6"/>
      <ellipse cx="16" cy="13" rx="5" ry=".8" fill="#FAF8F5" stroke="#2A2521" strokeWidth="1.2"/>
    </svg>
  );
}
function ChipDesk() {
  return (
    <svg viewBox="0 0 32 32" width="22" height="22">
      <rect x="4" y="12" width="24" height="3" rx="1" fill="#E07856" stroke="#2A2521" strokeWidth="1.4"/>
      <rect x="6" y="15" width="3" height="13" rx="1" fill="#2A2521"/>
      <rect x="23" y="15" width="3" height="13" rx="1" fill="#2A2521"/>
      <path d="M 6 28 Q 16 24 26 28" fill="none" stroke="#2A2521" strokeWidth="1.4"/>
      <rect x="13" y="6" width="6" height="6" rx="1" fill="#FFC83D" stroke="#2A2521" strokeWidth="1.4"/>
    </svg>
  );
}

const STEP_ILLUS = [StepIllu1, StepIllu2, StepIllu3, StepIllu4, StepIllu5, StepIllu6, StepIllu7, StepIllu8];

Object.assign(window, {
  ILLU_PALETTE,
  IlluFrame,
  StepIllu1, StepIllu2, StepIllu3, StepIllu4,
  StepIllu5, StepIllu6, StepIllu7, StepIllu8,
  STEP_ILLUS,
  ProductHero,
  ChipChair, ChipLamp, ChipDesk,
});
