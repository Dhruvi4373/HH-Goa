import React, { useState, useRef } from 'react';
import { Move, ZoomIn, ZoomOut, ArrowRight } from 'lucide-react';
import { ImageTransform } from '../types/builder';
import { Header } from './Header';
import { CornerOrnaments, PalmTreeBg } from './GoaDecorations';

interface PreviewStepProps {
  imageSrc: string;
  transform: ImageTransform;
  onTransformChange: (transform: ImageTransform) => void;
  onNext: () => void;
  onChangePhoto: () => void;
}

export const PreviewStep: React.FC<PreviewStepProps> = ({
  imageSrc,
  transform,
  onTransformChange,
  onNext,
  onChangePhoto
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const startPos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    startPos.current = { x: e.clientX - transform.x, y: e.clientY - transform.y };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const newX = e.clientX - startPos.current.x;
    const newY = e.clientY - startPos.current.y;
    onTransformChange({ ...transform, x: newX, y: newY });
  };

  const handleMouseUp = () => setIsDragging(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      startPos.current = { x: e.touches[0].clientX - transform.x, y: e.touches[0].clientY - transform.y };
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return;
    const newX = e.touches[0].clientX - startPos.current.x;
    const newY = e.touches[0].clientY - startPos.current.y;
    onTransformChange({ ...transform, x: newX, y: newY });
  };

  const handleReset = () => {
    onTransformChange({ x: 0, y: 0, scale: 1 });
  };

  return (
    <div className="relative w-full max-w-md mx-auto aspect-[4/5.8] sm:aspect-[4/5.5] bg-goa-paper border-2 border-goa-green/30 rounded-3xl shadow-2xl overflow-hidden flex flex-col justify-between">
      <CornerOrnaments color="#E65324" />

      {/* Header Bar with Progress Dots */}
      <Header step={1} showProgress={true} />

      {/* Tropical Palm leaves background at bottom corners */}
      <div className="absolute -left-12 -bottom-8 w-40 h-52 text-goa-green opacity-30 pointer-events-none">
        <PalmTreeBg />
      </div>
      <div className="absolute -right-12 -bottom-8 w-40 h-52 text-goa-green opacity-30 pointer-events-none" style={{ transform: 'scaleX(-1)' }}>
        <PalmTreeBg />
      </div>

      {/* Main Body */}
      <div className="relative z-10 flex-1 px-6 py-4 flex flex-col items-center justify-between text-center">
        {/* Title */}
        <div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-goa-green mb-0.5">
            PHOTO PREVIEW
          </h2>
          <p className="text-xs text-goa-ink/80 font-sans">
            We've centered your photo. You can reposition if needed.
          </p>
        </div>

        {/* Image Frame Viewport */}
        <div
          className="relative w-full max-w-[280px] aspect-[31/35] rounded-xl overflow-hidden border-4 border-[#FAF6E9] shadow-xl bg-goa-dark select-none touch-none cursor-grab active:cursor-grabbing my-2 group"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleMouseUp}
        >
          <div className="w-full h-full flex items-center justify-center overflow-hidden">
            <img
              src={imageSrc}
              alt="Uploaded photo preview"
              className="max-w-none transition-transform duration-75"
              style={{
                transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})`,
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
              draggable={false}
            />
          </div>

          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
            <div className="bg-goa-green/90 text-goa-ivory font-display text-xs tracking-wider px-3 py-1 rounded-full flex items-center space-x-1 shadow-md">
              <Move className="w-3.5 h-3.5" />
              <span>DRAG TO REPOSITION</span>
            </div>
          </div>
        </div>

        {/* Transform Controls */}
        <div className="flex items-center justify-center space-x-3 w-full max-w-[280px] my-1">
          <button
            onClick={() => onTransformChange({ ...transform, scale: Math.max(0.2, transform.scale - 0.1) })}
            className="p-2 bg-[#FAF6E9] border border-goa-green/30 text-goa-green hover:text-goa-orange hover:border-goa-orange rounded-full transition-colors"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          
          <button
            onClick={handleReset}
            className="flex-1 py-2 bg-[#FAF6E9] border border-goa-green/30 text-goa-green hover:text-goa-orange hover:border-goa-orange rounded-full font-display text-xs font-bold tracking-wider transition-colors"
          >
            RESET
          </button>

          <button
            onClick={() => onTransformChange({ ...transform, scale: Math.min(5, transform.scale + 0.1) })}
            className="p-2 bg-[#FAF6E9] border border-goa-green/30 text-goa-green hover:text-goa-orange hover:border-goa-orange rounded-full transition-colors"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
        </div>

        {/* Primary CTA Button */}
        <button
          onClick={onNext}
          className="w-full max-w-xs py-3.5 bg-goa-orange hover:bg-goa-sun text-white font-display text-xl font-bold tracking-wider rounded-xl shadow-goa-btn hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2 mt-2"
        >
          <span>LOOKS GOOD, NEXT</span>
          <ArrowRight className="w-5 h-5 stroke-[2.5]" />
        </button>
      </div>
    </div>
  );
};
