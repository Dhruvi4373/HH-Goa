import React from 'react';

/* ──────────────────────────────────────
   PALM TREE SILHOUETTE
   ────────────────────────────────────── */
export const PalmSilhouette: React.FC<{ className?: string; flip?: boolean }> = ({
  className = '',
  flip = false
}) => (
  <svg
    viewBox="0 0 180 300"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={flip ? { transform: 'scaleX(-1)' } : undefined}
  >
    <path
      d="M90 290C88 230 82 180 100 100"
      stroke="currentColor"
      strokeWidth="10"
      strokeLinecap="round"
      opacity="0.4"
    />
    <path d="M100 100C100 50 65 25 20 40C45 58 75 80 100 100Z" fill="currentColor" opacity="0.3" />
    <path d="M100 100C140 55 170 40 175 65C155 80 130 90 100 100Z" fill="currentColor" opacity="0.25" />
    <path d="M100 100C55 65 15 75 5 110C40 108 75 100 100 100Z" fill="currentColor" opacity="0.2" />
    <path d="M100 100C150 90 175 115 170 150C145 135 125 115 100 100Z" fill="currentColor" opacity="0.2" />
    <path d="M100 100C80 130 65 165 55 200C78 170 90 140 100 100Z" fill="currentColor" opacity="0.15" />
  </svg>
);

export const PalmTreeBg = PalmSilhouette;

/* ──────────────────────────────────────
   SUN MOTIF (Goa tropical sun with rays)
   ────────────────────────────────────── */
export const SunMotif: React.FC<{ className?: string; size?: number }> = ({
  className = '',
  size = 100
}) => {
  const rays = 16;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="50" cy="50" r="20" fill="#E65324" opacity="0.15" />
      <circle cx="50" cy="50" r="20" stroke="#E65324" strokeWidth="1.5" opacity="0.5" />
      {[...Array(rays)].map((_, i) => {
        const angle = (i * 2 * Math.PI) / rays;
        const x1 = 50 + Math.cos(angle) * 26;
        const y1 = 50 + Math.sin(angle) * 26;
        const x2 = 50 + Math.cos(angle) * (i % 2 === 0 ? 38 : 32);
        const y2 = 50 + Math.sin(angle) * (i % 2 === 0 ? 38 : 32);
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="#E65324"
            strokeWidth={i % 2 === 0 ? 2 : 1}
            strokeLinecap="round"
            opacity={i % 2 === 0 ? 0.5 : 0.3}
          />
        );
      })}
    </svg>
  );
};

export const TropicalSun = SunMotif;

/* ──────────────────────────────────────
   SMALL BIRDS
   ────────────────────────────────────── */
export const Birds: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 120 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path d="M8 20Q16 8 24 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
    <path d="M38 14Q48 4 58 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
    <path d="M72 22Q80 14 88 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    <path d="M96 18Q102 12 108 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
  </svg>
);

export const BirdsBg = Birds;

/* ──────────────────────────────────────
   WAVE LINE
   ────────────────────────────────────── */
export const WaveLine: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 200 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    preserveAspectRatio="none"
  >
    <path
      d="M0 8 Q 15 2 30 8 T 60 8 T 90 8 T 120 8 T 150 8 T 180 8 T 200 8"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      fill="none"
    />
  </svg>
);

export const OceanWaves = WaveLine;

/* ──────────────────────────────────────
   CORNER ORNAMENTS
   ────────────────────────────────────── */
export const CornerOrnaments: React.FC<{ color?: string }> = ({ color = '#E65324' }) => (
  <>
    <svg className="absolute top-2 left-2 w-5 h-5 pointer-events-none z-20" viewBox="0 0 20 20" fill="none">
      <path d="M0 14V0H14" stroke={color} strokeWidth="1.5" />
      <circle cx="7" cy="7" r="1.5" fill={color} opacity="0.6" />
    </svg>
    <svg className="absolute top-2 right-2 w-5 h-5 pointer-events-none z-20" viewBox="0 0 20 20" fill="none">
      <path d="M20 14V0H6" stroke={color} strokeWidth="1.5" />
      <circle cx="13" cy="7" r="1.5" fill={color} opacity="0.6" />
    </svg>
    <svg className="absolute bottom-2 left-2 w-5 h-5 pointer-events-none z-20" viewBox="0 0 20 20" fill="none">
      <path d="M0 6V20H14" stroke={color} strokeWidth="1.5" />
      <circle cx="7" cy="13" r="1.5" fill={color} opacity="0.6" />
    </svg>
    <svg className="absolute bottom-2 right-2 w-5 h-5 pointer-events-none z-20" viewBox="0 0 20 20" fill="none">
      <path d="M20 6V20H6" stroke={color} strokeWidth="1.5" />
      <circle cx="13" cy="13" r="1.5" fill={color} opacity="0.6" />
    </svg>
  </>
);

export const VintageCornerBrackets = CornerOrnaments;

/* ──────────────────────────────────────
   ILLUSTRATED GOA COASTAL LANDSCAPE (Step 01 / Sunset)
   ────────────────────────────────────── */
export const GoaSunsetLandscape: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`relative w-full h-full pointer-events-none overflow-hidden ${className}`}>
    {/* Setting Sun */}
    <div className="absolute left-1/2 bottom-12 -translate-x-1/2 w-32 h-32 rounded-full bg-gradient-to-t from-[#E65324] via-[#F47A27] to-[#F2C94C] opacity-80 blur-xs" />
    {/* Sun Rays */}
    <div className="absolute left-1/2 bottom-12 -translate-x-1/2 w-64 h-64 rounded-full bg-amber-400/20 blur-xl" />
    {/* Ocean horizon line */}
    <div className="absolute left-0 right-0 bottom-10 h-8 bg-gradient-to-b from-[#174F3E]/40 to-[#073D31]/80" />
    {/* Palm leaf fronds bottom left & right */}
    <div className="absolute bottom-0 left-0 w-40 sm:w-56 text-[#073D31]">
      <PalmSilhouette />
    </div>
    <div className="absolute bottom-0 right-0 w-40 sm:w-56 text-[#073D31]" style={{ transform: 'scaleX(-1)' }}>
      <PalmSilhouette />
    </div>
  </div>
);

/* ──────────────────────────────────────
   GOA NIGHT BONFIRE SCENE (Step 05 Share background)
   ────────────────────────────────────── */
export const GoaNightBonfireBg: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`absolute inset-0 pointer-events-none overflow-hidden bg-gradient-to-b from-[#091E19] via-[#0C2B24] to-[#061713] ${className}`}>
    {/* String Lights Top */}
    <svg className="absolute top-0 left-0 right-0 w-full h-12 text-amber-300 opacity-80" viewBox="0 0 1000 40" preserveAspectRatio="none">
      <path d="M0 5 Q 125 35 250 10 T 500 15 T 750 10 T 1000 5" stroke="#769487" strokeWidth="1" fill="none" />
      {[50, 150, 250, 350, 450, 550, 650, 750, 850, 950].map((x, idx) => (
        <g key={idx}>
          <circle cx={x} cy={18 + (idx % 3) * 4} r="4" fill="#F47A27" className="animate-pulse" style={{ animationDelay: `${idx * 0.2}s` }} />
          <circle cx={x} cy={18 + (idx % 3) * 4} r="7" fill="#F47A27" opacity="0.4" />
        </g>
      ))}
    </svg>

    {/* Glowing Bonfire bottom center */}
    <div className="absolute bottom-4 left-1/3 -translate-x-1/2 w-48 h-48 bg-gradient-to-t from-orange-600 via-amber-500 to-transparent rounded-full blur-2xl opacity-40 animate-pulse" />
    
    {/* Stars in night sky */}
    <svg className="absolute top-4 left-0 right-0 w-full h-48 opacity-60" viewBox="0 0 800 200">
      <circle cx="100" cy="30" r="1.5" fill="#FFF" />
      <circle cx="220" cy="60" r="1" fill="#FFF" />
      <circle cx="380" cy="20" r="2" fill="#FFF" />
      <circle cx="550" cy="70" r="1.5" fill="#FFF" />
      <circle cx="700" cy="40" r="1" fill="#FFF" />
    </svg>
  </div>
);

/* ──────────────────────────────────────
   GOA DAYTIME BEACH SCENE (Step 06 Shared Card background)
   ────────────────────────────────────── */
export const GoaDaytimeBeachBg: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`absolute inset-0 pointer-events-none overflow-hidden bg-gradient-to-b from-[#A5D6A7]/20 via-[#FBF7EA] to-[#F5EEDC] ${className}`}>
    {/* Palm tree silhouettes background */}
    <div className="absolute top-0 right-0 w-64 h-full text-[#073D31] opacity-25" style={{ transform: 'scaleX(-1)' }}>
      <PalmSilhouette />
    </div>
    <div className="absolute top-0 left-0 w-64 h-full text-[#073D31] opacity-20">
      <PalmSilhouette />
    </div>
  </div>
);
