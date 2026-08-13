import React from 'react';
import { SunMotif } from './GoaDecorations';

interface HeaderProps {
  step?: number;
  showProgress?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ step = 1, showProgress = false }) => {
  return (
    <header className="w-full flex items-center justify-between px-4 sm:px-6 py-3 border-b border-goa-green/15 bg-goa-paper/90 rounded-t-2xl relative z-20 select-none">
      {/* Left: HH GOA 2026 */}
      <div className="flex flex-col leading-none">
        <span className="font-display text-xl sm:text-2xl font-extrabold tracking-wider text-goa-green">
          HH GOA
        </span>
        <span className="font-display text-xs sm:text-sm font-extrabold tracking-widest text-goa-orange -mt-0.5">
          2026
        </span>
      </div>

      {/* Center: Dot Progress Line (for preview & details steps) */}
      {showProgress && (
        <div className="flex items-center space-x-2 sm:space-x-3 bg-goa-ivory/80 px-3 py-1 rounded-full border border-goa-green/10">
          <div className={`w-2.5 h-2.5 rounded-full transition-all ${step >= 1 ? 'bg-goa-orange scale-110' : 'bg-goa-muted/30'}`} />
          <div className={`w-6 sm:w-10 h-0.5 ${step >= 2 ? 'bg-goa-orange' : 'bg-goa-muted/30'}`} />
          <div className={`w-2.5 h-2.5 rounded-full transition-all ${step >= 2 ? 'bg-goa-orange scale-110' : 'bg-goa-muted/30'}`} />
          <div className={`w-6 sm:w-10 h-0.5 ${step >= 3 ? 'bg-goa-orange' : 'bg-goa-muted/30'}`} />
          <div className={`w-2.5 h-2.5 rounded-full transition-all ${step >= 3 ? 'bg-goa-orange scale-110' : 'bg-goa-muted/30'}`} />
        </div>
      )}

      {/* Right: BUILDER ID + Sun motif */}
      <div className="flex items-center space-x-1.5">
        <span className="font-display text-[10px] sm:text-xs font-bold tracking-widest text-goa-green uppercase">
          BUILDER ID
        </span>
        <SunMotif size={20} className="animate-spin-slow text-goa-orange" />
      </div>
    </header>
  );
};
