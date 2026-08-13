import React from 'react';
import { BuilderDetails, ImageTransform } from '../types/builder';
import { BuilderCard } from './BuilderCard';
import { ArrowRight } from 'lucide-react';

interface BuilderIDStepProps {
  imageSrc: string;
  transform: ImageTransform;
  details: BuilderDetails;
  builderId: string;
  cardDataUrl: string | null;
  isGenerating: boolean;
  onNext: () => void;
}

export const BuilderIDStep: React.FC<BuilderIDStepProps> = ({
  imageSrc,
  transform,
  details,
  builderId,
  cardDataUrl,
  isGenerating,
  onNext
}) => {
  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col items-center">
      <div className="w-full bg-[#073D31]/5 rounded-3xl p-4 sm:p-8 flex flex-col items-center justify-center">
        {isGenerating ? (
          <div className="w-full max-w-md aspect-[3/2] bg-[#0B3028] rounded-2xl flex flex-col items-center justify-center text-[#F5EEDC] p-4 shadow-2xl border border-goa-orange/30">
            <div className="w-10 h-10 border-4 border-goa-orange border-t-transparent rounded-full animate-spin mb-3" />
            <span className="font-display text-lg tracking-wider text-goa-orange font-bold">
              GENERATING BUILDER ID...
            </span>
          </div>
        ) : (
          <div className="w-full animate-fade-in-up">
            <BuilderCard
              imageSrc={imageSrc}
              transform={transform}
              details={details}
              builderId={builderId}
              cardDataUrl={cardDataUrl}
              className="w-full"
            />
          </div>
        )}
      </div>

      {!isGenerating && (
        <div className="mt-3">
          <button
            onClick={onNext}
            className="px-6 py-3 bg-goa-green hover:bg-goa-dark text-goa-paper font-display text-xl font-extrabold tracking-wider rounded-xl shadow-goa-card hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2 border border-goa-orange/30"
          >
            <span>PROCEED TO DOWNLOAD</span>
            <ArrowRight className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>
      )}
    </div>
  );
};
