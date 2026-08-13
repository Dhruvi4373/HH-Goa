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
    <div
      className="w-full h-[100dvh] min-h-[100dvh] overflow-hidden relative bg-cover md:bg-[length:100%_100%] font-sans text-[#102D27] selection:bg-[#E65324] selection:text-white"
      style={{
        backgroundImage: "url('/assets/screen1-bg.png')",
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        zIndex: 0,
      }}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleInputChange}
        accept="image/jpeg,image/png,image/heic,image/heif,image/webp"
        className="hidden"
      />

      {/* Central upload panel */}
      <div
        className="absolute left-1/2 top-[55%] -translate-x-1/2 -translate-y-1/2 w-[calc(100vw-32px)] md:w-[38vw] lg:w-[22vw] max-w-[420px] h-auto flex flex-col justify-between items-center text-center p-5 md:p-6"
        style={{
          minHeight: 'clamp(280px, 34vh, 360px)',
          background: 'rgba(247, 239, 217, 0.15)',
          border: '1.5px dashed rgba(27, 58, 42, 0.75)',
          borderRadius: '12px',
          backdropFilter: 'blur(16px)',
          zIndex: 10,
        }}
      >
        <div className="flex flex-col items-center justify-between h-full py-1 px-1 w-full gap-3">
          {/* HEADING & SUBTEXT */}
          <div className="flex flex-col items-center gap-1">
            <h1
              className="font-sans font-bold text-center text-[#073f2b] tracking-wide"
              style={{
                fontSize: 'clamp(18px, 1.6vw, 26px)',
                lineHeight: 1.1,
              }}
            >
              BUILDER ID CARD GENERATOR
            </h1>
            <p
              className="font-sans text-[#172d23] text-center"
              style={{
                fontSize: 'clamp(12px, 1vw, 16px)',
                lineHeight: 1.4,
              }}
            >
              Upload your photo and create
              <br />
              your personalised HH Goa 2026 Builder ID.
            </p>
          </div>

          {/* PRIMARY UPLOAD BUTTON & SECONDARY TEXT */}
          <div className="flex flex-col items-center w-full gap-1.5">
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={loading}
              className="bg-[#07502f] hover:bg-[#09643b] text-[#f8efd8] border border-[#d7aa32] font-bold transition-colors select-none flex items-center justify-center cursor-pointer"
              style={{
                width: 'min(220px, 75%)',
                height: 'clamp(40px, 4.5vh, 50px)',
                borderRadius: '10px',
                fontSize: 'clamp(14px, 1.2vw, 19px)',
                zIndex: 20,
              }}
            >
              {loading ? 'PROCESSING...' : 'UPLOAD PHOTO'}
            </button>
            <p
              className="text-[#172d23] font-normal"
              style={{
                fontSize: 'clamp(12px, 1vw, 16px)',
              }}
            >
              or drag and drop here
            </p>
            {errorMsg && (
              <p className="text-xs text-red-700 font-medium bg-[#f8efd8]/90 px-3 py-1 rounded border border-red-300 text-center max-w-[280px] mt-1">
                {errorMsg}
              </p>
            )}
          </div>

          {/* FILE FORMAT DISPLAY & SUPPORTED FORMATS */}
          <div className="flex flex-col items-center gap-1 w-full">
            <div className="flex items-center justify-center gap-5">
              <div
                className="flex items-center gap-1 text-[#172d23] font-semibold"
                style={{
                  fontSize: 'clamp(13px, 1.1vw, 17px)',
                }}
              >
                <File size={14} className="stroke-[2.5]" />
                <span>JPG</span>
              </div>
              <div
                className="flex items-center gap-1 text-[#172d23] font-semibold"
                style={{
                  fontSize: 'clamp(13px, 1.1vw, 17px)',
                }}
              >
                <File size={14} className="stroke-[2.5]" />
                <span>PNG</span>
              </div>
              <div
                className="flex items-center gap-1 text-[#172d23] font-semibold"
                style={{
                  fontSize: 'clamp(13px, 1.1vw, 17px)',
                }}
              >
                <File size={14} className="stroke-[2.5]" />
                <span>HEIC</span>
              </div>
            </div>
            <p
              className="text-[#172d23] font-normal"
              style={{
                fontSize: 'clamp(11px, 0.9vw, 14px)',
              }}
            >
              Supported formats
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
