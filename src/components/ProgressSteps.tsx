import React from 'react';
import { Step } from '../types/builder';

interface ProgressStepsProps {
  currentStep: Step;
  onStepClick?: (step: Step) => void;
}

const STEPS: { id: Step; label: string }[] = [
  { id: 1, label: '01 UPLOAD' },
  { id: 2, label: '02 PREVIEW' },
  { id: 3, label: '03 YOUR DETAILS' },
  { id: 4, label: '04 YOUR BUILDER ID' },
  { id: 5, label: '05 SHARE & DOWNLOAD' },
];

export const ProgressSteps: React.FC<ProgressStepsProps> = ({ currentStep, onStepClick }) => {
  return (
    <nav className="w-full max-w-4xl mx-auto px-4 py-4" aria-label="Progress steps">
      {/* Mobile step label indicator */}
      <div className="flex sm:hidden justify-between items-center bg-goa-ivory/60 border border-goa-orange/30 rounded-full px-4 py-2 mb-2">
        <span className="font-display text-xs tracking-wider text-goa-orange font-bold">
          STEP {currentStep} OF 5
        </span>
        <span className="font-display text-xs tracking-wider text-goa-green font-bold uppercase">
          {STEPS.find(s => s.id === currentStep)?.label.slice(3)}
        </span>
      </div>

      {/* Desktop Stepper */}
      <div className="hidden sm:flex items-center justify-between relative">
        {/* Connecting line */}
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-goa-muted/30 -translate-y-1/2 z-0" />
        <div 
          className="absolute top-1/2 left-0 h-0.5 bg-goa-orange -translate-y-1/2 z-0 transition-all duration-300" 
          style={{ width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%` }}
        />

        {STEPS.map((step) => {
          const isActive = step.id === currentStep;
          const isCompleted = step.id < currentStep;
          const isClickable = onStepClick && step.id <= currentStep;

          return (
            <button
              key={step.id}
              onClick={() => isClickable && onStepClick(step.id)}
              disabled={!isClickable}
              className={`relative z-10 flex flex-col items-center group focus:outline-none ${
                isClickable ? 'cursor-pointer' : 'cursor-default'
              }`}
            >
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center border-2 transition-all duration-200 ${
                  isActive
                    ? 'bg-goa-orange border-goa-orange text-white scale-110 shadow-sm'
                    : isCompleted
                    ? 'bg-goa-green border-goa-green text-goa-ivory'
                    : 'bg-goa-paper border-goa-muted text-goa-muted'
                }`}
              >
                <div
                  className={`w-2 h-2 rounded-full ${
                    isActive ? 'bg-white' : isCompleted ? 'bg-goa-ivory' : 'bg-transparent'
                  }`}
                />
              </div>
              <span
                className={`mt-1.5 font-display text-xs tracking-wider uppercase transition-colors ${
                  isActive
                    ? 'text-goa-orange font-bold'
                    : isCompleted
                    ? 'text-goa-green font-semibold'
                    : 'text-goa-muted'
                }`}
              >
                {step.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
