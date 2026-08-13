import React from 'react';
import { BuilderDetails, ImageTransform } from '../types/builder';
import { BuilderCard } from './BuilderCard';
import { ArrowRight, Sparkles } from 'lucide-react';
import { GoaDaytimeBeachBg } from './GoaDecorations';

interface SharedCardPreviewStepProps {
  imageSrc: string;
  transform: ImageTransform;
  details: BuilderDetails;
  builderId: string;
  cardDataUrl?: string | null;
  onCreateOwn: () => void;
}

export const SharedCardPreviewStep: React.FC<SharedCardPreviewStepProps> = ({
  imageSrc,
  transform,
  details,
  builderId,
  cardDataUrl,
  onCreateOwn
}) => {
  const stackList = details.stack && details.stack.length > 0 ? details.stack : ['NEXT.JS', 'PYTHON', 'AI'];

  return (
    <div className="relative w-full max-w-5xl mx-auto p-6 sm:p-10 rounded-3xl overflow-hidden shadow-2xl border-2 border-goa-green/30 bg-[#FBF7EA] text-goa-ink">
      {/* Background Daytime Beach Landscape */}
      <GoaDaytimeBeachBg />

      {/* Top Hashtag */}
      <div className="absolute top-4 right-6 font-display text-sm sm:text-base font-extrabold tracking-widest text-goa-orange">
        #FrameInGoa
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center pt-4">
        {/* Left Column: ID Card */}
        <div className="flex flex-col items-center justify-center">
          <div className="relative w-full max-w-xl">
            <BuilderCard
              imageSrc={imageSrc}
              transform={transform}
              details={details}
              builderId={builderId}
              cardDataUrl={cardDataUrl}
              className="shadow-2xl"
            />
          </div>
        </div>

        {/* Right Column: User Details & CTA */}
        <div className="flex flex-col justify-between items-start space-y-6">
          <div>
            <h2 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-goa-green uppercase leading-none">
              {details.name || 'PALAK SHEKHADA'}
            </h2>
            <div className="font-display text-base sm:text-lg font-bold tracking-wider text-goa-orange uppercase mt-1">
              ★ {details.builderClass || 'THE SIGNAL HUNTER'} ★
            </div>

            {/* Stack Pills */}
            <div className="flex flex-wrap gap-2 mt-3">
              {stackList.map((item) => (
                <span
                  key={item}
                  className="font-display text-xs font-bold tracking-wider bg-goa-green/10 text-goa-green border border-goa-green/20 px-3 py-1 rounded-md uppercase"
                >
                  {item}
                </span>
              ))}
            </div>

            {/* Metadata info */}
            <div className="mt-6 space-y-1 text-sm font-sans">
              <div>
                <span className="font-display text-xs text-goa-muted tracking-widest uppercase block">BUILDER ID</span>
                <span className="font-display text-2xl font-bold tracking-wider text-goa-green">{builderId}</span>
              </div>
              <p className="text-goa-ink/80 font-medium pt-1">Built for the build.</p>
              <p className="text-goa-ink/80 font-bold">Goa • 2026</p>
            </div>
          </div>

          {/* Primary CTA Button */}
          <button
            onClick={onCreateOwn}
            className="w-full max-w-xs py-4 bg-goa-orange hover:bg-goa-sun text-white font-display text-xl sm:text-2xl font-extrabold tracking-wider rounded-xl shadow-goa-btn hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2"
          >
            <span>CREATE YOUR OWN ID</span>
            <ArrowRight className="w-6 h-6 stroke-[2.5]" />
          </button>
        </div>
      </div>
    </div>
  );
};
