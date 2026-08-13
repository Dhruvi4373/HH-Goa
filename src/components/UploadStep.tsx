import React, { useState, useRef } from 'react';
import { processImageFile } from '../utils/imageProcessing';
import { File } from 'lucide-react';

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
    if (e.dataTransfer.files?.[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      handleFile(e.target.files[0]);
    }
  };

  return (
    <div className="relative min-h-[100dvh] w-full overflow-y-auto flex flex-col items-center justify-center bg-[#f7efd9] p-3 sm:p-6 font-sans text-[#102D27]">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleInputChange}
        accept="image/jpeg,image/png,image/heic,image/heif,image/webp"
        className="hidden"
      />

      {/* ── MOBILE SCREEN 1 LAYOUT (< 768px) ── */}
      <div
        className="block md:hidden w-full max-w-md bg-cover bg-center rounded-3xl p-5 sm:p-6 shadow-2xl my-auto text-center border-2 border-[#1b3a2a]/30 relative overflow-hidden font-sans"
        style={{
          backgroundImage: "url('/assets/screen1-bg.png')",
        }}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
      >
        {/* Semi-transparent blur overlay */}
        <div className="absolute inset-0 bg-[#f7efd9]/60 backdrop-blur-[3px] pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center gap-4 py-2">
          {/* Header */}
          <div className="flex flex-col items-center gap-1">
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#07502f] tracking-wide">
              BUILDER ID CARD GENERATOR
            </h1>
            <p className="text-xs sm:text-sm text-[#172d23] font-medium leading-relaxed">
              Upload your photo and create your personalised
              <br />
              HH Goa 2026 Builder ID.
            </p>
          </div>

          {/* Central Upload Card */}
          <div className="w-full bg-[#f7efd9]/90 border-2 border-dashed border-[#07502f]/60 rounded-2xl p-4 sm:p-5 shadow-md flex flex-col items-center gap-3">
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={loading}
              className="w-full py-3.5 bg-[#07502f] hover:bg-[#09643b] active:scale-[0.98] text-[#f8efd8] border border-[#d7aa32] font-bold text-sm uppercase tracking-wider rounded-xl shadow-lg transition cursor-pointer"
            >
              {loading ? 'PROCESSING...' : 'UPLOAD PHOTO'}
            </button>

            <p className="text-xs text-[#172d23] font-normal">
              or drag and drop here
            </p>

            {errorMsg && (
              <p className="text-xs text-red-700 font-medium bg-red-50 px-3 py-1 rounded border border-red-300 text-center w-full">
                {errorMsg}
              </p>
            )}

            <div className="flex items-center justify-center gap-4 mt-1 text-xs text-[#172d23] font-semibold">
              <div className="flex items-center gap-1">
                <File size={13} />
                <span>JPG</span>
              </div>
              <div className="flex items-center gap-1">
                <File size={13} />
                <span>PNG</span>
              </div>
              <div className="flex items-center gap-1">
                <File size={13} />
                <span>HEIC</span>
              </div>
            </div>
            <span className="text-[11px] text-[#172d23]/70 font-normal">
              Supported formats
            </span>
          </div>
        </div>
      </div>

      {/* ── DESKTOP SCREEN 1 LAYOUT (>= 768px) ── */}
      <div
        className="hidden md:block relative w-full max-w-[1150px] aspect-[1536/1024] mx-auto rounded-2xl shadow-2xl overflow-hidden my-auto flex-shrink-0"
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
      >
        <div
          className="absolute inset-0 bg-no-repeat"
          style={{
            backgroundImage: "url('/assets/screen1-bg.png')",
            backgroundSize: '100% 100%',
            backgroundPosition: 'center'
          }}
        />

        {/* Form Box overlaid precisely in central spot */}
        <div
          className="absolute flex flex-col justify-between items-center text-center p-6 shadow-xl rounded-2xl"
          style={{
            top: '36%',
            left: '32.5%',
            width: '35%',
            height: '34%',
            background: 'rgba(247, 239, 217, 0.55)',
            border: '1.5px dashed rgba(27, 58, 42, 0.75)',
            backdropFilter: 'blur(12px)',
            zIndex: 10,
          }}
        >
          <div className="flex flex-col items-center justify-between h-full py-1 px-1 w-full gap-2">
            <div className="flex flex-col items-center gap-1">
              <h1
                className="font-sans font-bold text-center text-[#073f2b] tracking-wide"
                style={{ fontSize: 'clamp(18px, 1.5vw, 24px)', lineHeight: 1.1 }}
              >
                BUILDER ID CARD GENERATOR
              </h1>
              <p
                className="font-sans text-[#172d23] text-center font-medium"
                style={{ fontSize: 'clamp(12px, 0.95vw, 15px)', lineHeight: 1.35 }}
              >
                Upload your photo and create
                <br />
                your personalised HH Goa 2026 Builder ID.
              </p>
            </div>

            <div className="flex flex-col items-center w-full gap-1">
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={loading}
                className="bg-[#07502f] hover:bg-[#09643b] active:scale-[0.98] text-[#f8efd8] border border-[#d7aa32] font-bold transition-transform select-none flex items-center justify-center cursor-pointer shadow-md"
                style={{
                  width: 'min(200px, 75%)',
                  height: 'clamp(38px, 4vh, 46px)',
                  borderRadius: '10px',
                  fontSize: 'clamp(13px, 1.1vw, 17px)',
                  zIndex: 20,
                }}
              >
                {loading ? 'PROCESSING...' : 'UPLOAD PHOTO'}
              </button>
              <p
                className="text-[#172d23] font-normal"
                style={{ fontSize: 'clamp(11px, 0.9vw, 14px)' }}
              >
                or drag and drop here
              </p>
              {errorMsg && (
                <p className="text-xs text-red-700 font-medium bg-[#f8efd8]/90 px-3 py-1 rounded border border-red-300 text-center max-w-[280px]">
                  {errorMsg}
                </p>
              )}
            </div>

            <div className="flex flex-col items-center gap-0.5 w-full">
              <div className="flex items-center justify-center gap-4">
                <div className="flex items-center gap-1 text-[#172d23] font-semibold" style={{ fontSize: 'clamp(12px, 1vw, 15px)' }}>
                  <File size={13} className="stroke-[2.5]" />
                  <span>JPG</span>
                </div>
                <div className="flex items-center gap-1 text-[#172d23] font-semibold" style={{ fontSize: 'clamp(12px, 1vw, 15px)' }}>
                  <File size={13} className="stroke-[2.5]" />
                  <span>PNG</span>
                </div>
                <div className="flex items-center gap-1 text-[#172d23] font-semibold" style={{ fontSize: 'clamp(12px, 1vw, 15px)' }}>
                  <File size={13} className="stroke-[2.5]" />
                  <span>HEIC</span>
                </div>
              </div>
              <p className="text-[#172d23]/80 font-normal" style={{ fontSize: 'clamp(10px, 0.85vw, 13px)' }}>
                Supported formats
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
