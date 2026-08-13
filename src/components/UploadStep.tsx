import React, { useState, useRef } from 'react';
import { processImageFile } from '../utils/imageProcessing';
import { SunMotif, CornerOrnaments, WaveLine } from './GoaDecorations';

/* ─── tiny inline icons ─── */
const UploadArrow = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 19V5M5 12l7-7 7 7" />
  </svg>
);

const CheckMark = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" className="w-[10px] h-[10px]">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8.5l3.5 3.5L13 4" />
  </svg>
);

const CrossMark = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" className="w-[10px] h-[10px]">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4l8 8M12 4l-8 8" />
  </svg>
);

/* ═══════════════════════════════════════════════════
   UPLOAD STEP — Screen 01 card
   ═══════════════════════════════════════════════════ */

interface UploadStepProps {
  onImageSelected: (imageSrc: string) => void;
}

export const UploadStep: React.FC<UploadStepProps> = ({ onImageSelected }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    if (!file.type.startsWith('image/') && !file.name.toLowerCase().endsWith('.heic')) {
      setErrorMsg('Please upload a valid image (JPG, PNG, or HEIC).');
      return;
    }
    setErrorMsg(null);
    setLoading(true);
    try {
      const dataUrl = await processImageFile(file);
      onImageSelected(dataUrl);
    } catch (err) {
      console.error(err);
      setErrorMsg('Failed to process image. Please try another photo.');
    } finally {
      setLoading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files?.[0]) handleFile(e.dataTransfer.files[0]);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) handleFile(e.target.files[0]);
  };

  return (
    <div
      className="relative w-full max-w-[420px] mx-auto flex flex-col border-[1.5px] border-[#1A3C30] rounded-xl overflow-hidden aspect-[0.66] min-h-[640px]"
      style={{ boxShadow: '0 8px 32px rgba(7,61,49,0.15)' }}
    >
        {/*
          LAYER 1: ARTWORK – fills entire card using portrait illustration
        */}
        <img
          src="/screen1-art-portrait.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none z-0"
          style={{ objectPosition: 'center' }}
          draggable={false}
        />

        {/*
          LAYER 2: SUBTLE READABILITY OVERLAY – gradient from cream at top fading to transparent, with a slight dark green hint at bottom.
        */}
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            background: `linear-gradient(to bottom, rgba(251,247,234,0.95) 0%, rgba(251,247,234,0.75) 25%, rgba(251,247,234,0) 60%, rgba(7,61,49,0.6) 100%)`
          }}
        />
        
        <div className="relative z-10 flex flex-col h-full p-6 pb-5">
        
        {/* --- TOP SECTION (Typography) --- */}
        <div className="flex-shrink-0">
          {/* Header */}
          <div className="flex justify-between items-start">
            <div className="leading-none select-none">
              <div className="font-display text-[28px] text-[#073D31] tracking-wide" style={{ lineHeight: 0.9 }}>
                HH GOA
              </div>
              <div className="font-display text-[14px] text-[#E65324] tracking-[0.25em] mt-0.5">
                2026
              </div>
            </div>
            <div className="flex items-center gap-1.5 pt-1 select-none">
              <span className="font-display text-[11px] tracking-[0.18em] text-[#073D31] uppercase">
                BUILDER ID
              </span>
              <SunMotif size={18} className="text-[#E65324]" />
            </div>
          </div>

          {/* Main Headline */}
          <div className="pt-5">
            <h1
              className="font-display text-[#073D31] leading-[0.88] tracking-wide select-none"
              style={{ fontSize: 'clamp(46px, 12vw, 56px)' }}
            >
              MAKE YOUR<br />BUILDER ID.
            </h1>
          </div>

          {/* Orange Subhead */}
          <div className="pt-2">
            <p className="font-display text-[18px] text-[#E65324] tracking-[0.08em] leading-none select-none italic">
              THEN GO BUILD.
            </p>
          </div>

          {/* Body Copy */}
          <div className="pt-2">
            <p className="font-sans text-[12px] leading-[1.35] text-[#102D27]/80 max-w-[220px]">
              Upload a photo and get your official HH Goa 2026 Builder ID.
            </p>
          </div>
        </div>

        {/* Spacer to push upload box to the lower-middle (over the artwork) */}
        <div className="flex-grow flex items-end justify-center pb-2">
          
          {/* --- MIDDLE SECTION (Upload Dropzone) --- */}
          <div
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={[
              'w-full max-w-[280px] py-4 px-4 rounded-xl cursor-pointer',
              'flex flex-col items-center justify-center text-center',
              'transition-all duration-200',
              'border-[1px]',
              'backdrop-blur-[10px]',
              isDragging
                ? 'border-[#E65324] bg-[rgba(251,247,234,0.78)] scale-[1.02] shadow-xl'
                : 'border-[#1A3C30]/20 bg-[rgba(251,247,234,0.74)] hover:border-[#E65324] hover:shadow-lg',
            ].join(' ')}
            style={{ boxShadow: '0 8px 32px rgba(7,61,49,0.12)' }}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleInputChange}
              accept="image/jpeg,image/png,image/heic,image/heif,image/webp"
              className="hidden"
            />

            {loading ? (
              <div className="flex flex-col items-center py-2">
                <div className="w-8 h-8 border-[3px] border-[#E65324] border-t-transparent rounded-full animate-spin mb-3" />
                <span className="font-display text-[13px] text-[#073D31] tracking-wider">PROCESSING…</span>
              </div>
            ) : (
              <>
                {/* Upload circle icon */}
                <div className="w-9 h-9 rounded-full border-[1.5px] border-[#1A3C30] text-[#1A3C30] flex items-center justify-center mb-2.5">
                  <UploadArrow />
                </div>

                <p className="font-display text-[14px] text-[#073D31] tracking-wide leading-none mb-1">
                  DROP YOUR PHOTO HERE
                </p>
                <p className="font-sans text-[10.5px] text-[#073D31]/60 mb-2.5">
                  or choose from device
                </p>

                <span className="font-sans text-[9px] tracking-[0.15em] text-[#073D31]/50 uppercase font-semibold">
                  JPG &bull; PNG &bull; HEIC
                </span>
              </>
            )}
          </div>
        </div>

        {errorMsg && (
          <div className="flex justify-center mt-2">
            <p className="text-[11px] text-red-700 font-medium bg-white/95 px-3 py-1 rounded border border-red-200 text-center max-w-[280px]">
              {errorMsg}
            </p>
          </div>
        )}

        {/* Spacer for bottom */}
        <div className="h-3 flex-shrink-0" />

        {/* --- BOTTOM SECTION (Footer) --- */}
        <div className="flex-shrink-0">
          {/* Bottom Badge Strip */}
          <div className="flex items-center justify-center gap-2.5 text-[#FBF7EA] mb-2">
            <span className="flex items-center gap-1 font-display text-[10px] tracking-[0.12em] uppercase">
              <CheckMark /> NO LOGIN
            </span>
            <span className="opacity-40">|</span>
            <span className="flex items-center gap-1 font-display text-[10px] tracking-[0.12em] uppercase">
              <CrossMark /> NO SIGNUP
            </span>
            <span className="opacity-40">|</span>
            <span className="font-display text-[10px] tracking-[0.12em] uppercase font-bold italic">
              JUST BUILD
            </span>
          </div>

          {/* Hashtag + Wave */}
          <div className="flex justify-between items-end w-full">
            <span className="font-display text-[16px] text-[#E65324] tracking-wider italic select-none">
              #FrameInGoa
            </span>
            <WaveLine className="w-14 h-3 text-[#E65324]" />
          </div>
        </div>

      </div>
    </div>
  );
};
