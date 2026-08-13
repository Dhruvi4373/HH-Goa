import React, { useState } from 'react';
import { BuilderDetails, ImageTransform } from '../types/builder';
import { BuilderCard } from './BuilderCard';
import { downloadCardPNG, shareToX, copyShareLink } from '../utils/share';
import { Download, Copy, Check, RefreshCw } from 'lucide-react';
import { GoaNightBonfireBg } from './GoaDecorations';

interface ShareStepProps {
  imageSrc: string;
  transform: ImageTransform;
  details: BuilderDetails;
  builderId: string;
  cardDataUrl: string | null;
  onReset: () => void;
}

export const ShareStep: React.FC<ShareStepProps> = ({
  imageSrc,
  transform,
  details,
  builderId,
  cardDataUrl,
  onReset
}) => {
  const [copied, setCopied] = useState(false);

  const handleDownload = () => {
    if (cardDataUrl) {
      downloadCardPNG(cardDataUrl, builderId);
    }
  };

  const handleShareX = () => {
    shareToX(details.name, builderId, details.builderClass);
  };

  const handleCopyLink = async () => {
    const success = await copyShareLink();
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto p-6 sm:p-10 rounded-3xl overflow-hidden shadow-2xl border-2 border-goa-orange/40 text-goa-paper">
      {/* Background Night Bonfire Atmosphere */}
      <GoaNightBonfireBg />

      {/* Foreground Content */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left Column: ID Card Graphic */}
        <div className="flex flex-col items-center justify-center">
          <div className="relative group w-full max-w-xl transition-transform duration-300 hover:scale-[1.02]">
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

        {/* Right Column: Title & Action Buttons */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-6">
          <div>
            <h2 className="font-display text-5xl sm:text-6xl font-extrabold tracking-tight text-[#F5EEDC] leading-none">
              YOUR ID IS READY.
            </h2>
            <p className="text-base sm:text-lg text-goa-muted font-sans font-medium mt-2">
              You're all set to build in Goa.
            </p>
          </div>

          {/* Action Buttons Stack */}
          <div className="w-full max-w-sm space-y-3.5">
            {/* DOWNLOAD ID */}
            <button
              onClick={handleDownload}
              className="w-full py-4 bg-goa-orange hover:bg-goa-sun text-white font-display text-2xl font-extrabold tracking-wider rounded-xl shadow-goa-btn hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2.5"
            >
              <Download className="w-6 h-6 stroke-[2.5]" />
              <span>DOWNLOAD ID</span>
            </button>

            {/* SHARE TO X */}
            <button
              onClick={handleShareX}
              className="w-full py-3.5 bg-[#FAF6E9] hover:bg-white text-goa-ink font-display text-xl font-bold tracking-wider rounded-xl border border-goa-green/20 shadow-md transition-all duration-200 flex items-center justify-center space-x-2.5"
            >
              <span className="font-serif text-xl font-black">𝕏</span>
              <span>SHARE TO X</span>
            </button>

            {/* COPY LINK */}
            <button
              onClick={handleCopyLink}
              className="w-full py-3.5 bg-[#FAF6E9] hover:bg-white text-goa-ink font-display text-xl font-bold tracking-wider rounded-xl border border-goa-green/20 shadow-md transition-all duration-200 flex items-center justify-center space-x-2.5"
            >
              {copied ? (
                <>
                  <Check className="w-5 h-5 text-goa-orange" />
                  <span className="text-goa-orange font-bold">LINK COPIED!</span>
                </>
              ) : (
                <>
                  <Copy className="w-5 h-5 text-goa-green" />
                  <span>COPY LINK</span>
                </>
              )}
            </button>
          </div>

          {/* Sub-footer text */}
          <div className="pt-2 border-t border-goa-paper/10 w-full max-w-sm">
            <p className="text-xs sm:text-sm text-goa-muted font-sans font-medium mb-4">
              Post it with <span className="text-goa-orange font-bold">#FrameInGoa</span> <br />
              Be loud. Be proud. Build.
            </p>

            <button
              onClick={onReset}
              className="inline-flex items-center space-x-2 text-xs font-display tracking-widest text-goa-orange hover:text-goa-sun transition-colors font-bold uppercase"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>CREATE ANOTHER BUILDER ID</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
