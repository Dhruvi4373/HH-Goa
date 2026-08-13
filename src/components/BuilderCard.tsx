import React from 'react';
import { BuilderDetails, ImageTransform } from '../types/builder';

interface BuilderCardProps {
  imageSrc?: string;
  transform?: ImageTransform;
  details?: BuilderDetails;
  builderId?: string;
  cardDataUrl?: string | null;
  className?: string;
}

export const BuilderCard: React.FC<BuilderCardProps> = ({
  cardDataUrl,
  className = ''
}) => {
  if (!cardDataUrl) {
    return (
      <div className={`w-full aspect-[1.5] bg-[#EFEAD5] animate-pulse rounded-2xl border border-goa-ink/10 flex items-center justify-center ${className}`}>
        <span className="font-display text-goa-muted tracking-widest text-sm">LOADING PASSPORT...</span>
      </div>
    );
  }

  return (
    <img 
      src={cardDataUrl} 
      alt="HH Goa Builder ID Passport"
      className={`w-full h-auto object-contain rounded-2xl shadow-2xl ${className}`}
    />
  );
};
