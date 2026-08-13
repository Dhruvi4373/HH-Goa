import React from 'react';
import { UploadStep } from './UploadStep';
import { PreviewStep } from './PreviewStep';
import { DetailsStep } from './DetailsStep';
import { BuilderIDStep } from './BuilderIDStep';
import { BuilderDetails, ImageTransform } from '../types/builder';
import { Palmtree } from 'lucide-react';

interface MobileExperienceViewProps {
  imageSrc: string | null;
  transform: ImageTransform;
  details: BuilderDetails;
  builderId: string;
  cardDataUrl: string | null;
  onImageSelected: (src: string) => void;
  onTransformChange: (t: ImageTransform) => void;
  onGenerate: (d: BuilderDetails) => void;
}

export const MobileExperienceView: React.FC<MobileExperienceViewProps> = ({
  imageSrc,
  transform,
  details,
  builderId,
  cardDataUrl,
  onImageSelected,
  onTransformChange,
  onGenerate
}) => {
  const samplePhoto = imageSrc || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop';

  return (
    <div className="w-full max-w-7xl mx-auto py-4">
      {/* Title */}
      <div className="flex items-center justify-center space-x-2 mb-6">
        <Palmtree className="w-6 h-6 text-goa-orange" />
        <h2 className="font-display text-2xl sm:text-3xl font-extrabold tracking-wider text-goa-green">
          MOBILE EXPERIENCE PREVIEW
        </h2>
      </div>

      {/* Grid of 4 Mobile Mockup Containers */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
        {/* 01 UPLOAD */}
        <div className="flex flex-col items-center">
          <div className="w-full max-w-[280px] rounded-[32px] border-[6px] border-goa-green/80 shadow-2xl overflow-hidden bg-goa-paper">
            <UploadStep onImageSelected={onImageSelected} />
          </div>
          <span className="mt-3 font-display text-sm font-bold tracking-widest text-goa-green">
            01 UPLOAD
          </span>
        </div>

        {/* 02 PREVIEW */}
        <div className="flex flex-col items-center">
          <div className="w-full max-w-[280px] rounded-[32px] border-[6px] border-goa-green/80 shadow-2xl overflow-hidden bg-goa-paper">
            <PreviewStep
              imageSrc={samplePhoto}
              transform={transform}
              onTransformChange={onTransformChange}
              onNext={() => {}}
              onChangePhoto={() => {}}
            />
          </div>
          <span className="mt-3 font-display text-sm font-bold tracking-widest text-goa-green">
            02 PREVIEW
          </span>
        </div>

        {/* 03 DETAILS */}
        <div className="flex flex-col items-center">
          <div className="w-full max-w-[280px] rounded-[32px] border-[6px] border-goa-green/80 shadow-2xl overflow-hidden bg-goa-paper">
            <DetailsStep
              initialDetails={details}
              onGenerate={onGenerate}
            />
          </div>
          <span className="mt-3 font-display text-sm font-bold tracking-widest text-goa-green">
            03 DETAILS
          </span>
        </div>

        {/* 04 YOUR ID */}
        <div className="flex flex-col items-center">
          <div className="w-full max-w-[280px] rounded-[32px] border-[6px] border-goa-green/80 shadow-2xl overflow-hidden bg-[#073D31]">
            <BuilderIDStep
              imageSrc={samplePhoto}
              transform={transform}
              details={details}
              builderId={builderId}
              cardDataUrl={cardDataUrl}
              isGenerating={false}
              onNext={() => {}}
            />
          </div>
          <span className="mt-3 font-display text-sm font-bold tracking-widest text-goa-green">
            04 YOUR ID
          </span>
        </div>
      </div>
    </div>
  );
};
