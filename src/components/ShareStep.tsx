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
    <div className="relative w-full max-w-5xl lg:max-w-6xl mx-auto p-5 sm:p-8 md:p-10 rounded-3xl overflow-hidden shadow-2xl border-2 border-goa-orange/40 text-goa-paper">
      {/* Background Night Bonfire Atmosphere */}
      <GoaNightBonfireBg />

      {/* Foreground Content */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-10 items-center">
        {/* Left Column: ID Card Graphic */}
        <div className="md:col-span-7 flex flex-col items-center justify-center">
          <div className="relative group w-full max-w-xl transition-transform duration-300 hover:scale-[1.01]">
            <BuilderCard
              imageSrc={imageSrc}
              transform={transform}
              details={details}
              builderId={builderId}
              cardDataUrl={cardDataUrl}
              className="shadow-2xl w-full"
            />
          </div>
        </div>

        {/* Right Column: Title & Action Buttons */}
        <div className="md:col-span-5 flex flex-col items-center md:items-start text-center md:text-left space-y-5">
          <div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#F5EEDC] leading-none">
              YOUR ID IS READY.
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-goa-muted font-sans font-medium mt-2">
              You're all set to build in Goa.
            </p>
          </div>

          {/* Action Buttons Stack */}
          <div className="w-full max-w-sm lg:max-w-md space-y-3 sm:space-y-3.5">
            {/* DOWNLOAD ID */}
            <button
              onClick={handleDownload}
              className="w-full py-3.5 sm:py-4 bg-[#07502f] hover:bg-[#09643b] active:scale-[0.98] text-[#f8efd8] border border-[#d7aa32] font-display text-xl sm:text-2xl font-extrabold tracking-wider rounded-xl shadow-lg transition-all duration-200 flex items-center justify-center space-x-2.5 cursor-pointer"
            >
              <Download className="w-5 sm:w-6 h-5 sm:h-6 stroke-[2.5]" />
              <span>DOWNLOAD ID</span>
            </button>

            {/* SHARE TO X */}
            <button
              onClick={handleShareX}
              className="w-full py-3 sm:py-3.5 bg-[#FAF6E9] hover:bg-white text-goa-ink font-display text-lg sm:text-xl font-bold tracking-wider rounded-xl border border-goa-green/20 shadow-md transition-all duration-200 flex items-center justify-center space-x-2.5 cursor-pointer"
            >
              <span className="font-serif text-lg sm:text-xl font-black">𝕏</span>
              <span>SHARE TO X</span>
            </button>

            {/* COPY LINK */}
            <button
              onClick={handleCopyLink}
              className="w-full py-3 sm:py-3.5 bg-[#FAF6E9] hover:bg-white text-goa-ink font-display text-lg sm:text-xl font-bold tracking-wider rounded-xl border border-goa-green/20 shadow-md transition-all duration-200 flex items-center justify-center space-x-2.5 cursor-pointer"
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
          <div className="pt-2 border-t border-goa-paper/10 w-full max-w-sm lg:max-w-md">
            <p className="text-xs sm:text-sm text-goa-muted font-sans font-medium mb-3">
              Post it with <span className="text-goa-orange font-bold">#FrameInGoa</span> <br />
              Be loud. Be proud. Build.
            </p>

            <button
              onClick={onReset}
              className="inline-flex items-center space-x-2 text-xs font-display tracking-widest text-[#d7aa32] hover:text-white transition-colors font-bold uppercase cursor-pointer"
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
