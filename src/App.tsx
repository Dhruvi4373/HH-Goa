import React from 'react';
import { useBuilder } from './hooks/useBuilder';
import { Header } from './components/Header';
import { ProgressSteps } from './components/ProgressSteps';
import { UploadStep } from './components/UploadStep';
import { PreviewStep } from './components/PreviewStep';
import { DetailsStep } from './components/DetailsStep';
import { BuilderIDStep } from './components/BuilderIDStep';
import { ShareStep } from './components/ShareStep';

export const App: React.FC = () => {
  const {
    state,
    isGenerating,
    setStep,
    setImage,
    setTransform,
    updateDetails,
    generateCard,
    reset
  } = useBuilder();

  if (state.step === 1) {
    return (
      <div className="min-h-screen bg-[#EFEAD5] flex items-center justify-center p-4 sm:p-8 font-sans text-goa-ink selection:bg-goa-orange selection:text-white">
        <UploadStep onImageSelected={setImage} />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-goa-paper text-goa-ink selection:bg-goa-orange selection:text-white">
      {/* Top Global Header Bar */}
      <Header />

      {/* Progress Navigation Bar */}
      <ProgressSteps
        currentStep={state.step}
        onStepClick={(step) => {
          if (step < state.step) {
            setStep(step);
          }
        }}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-4 sm:py-8 flex flex-col items-center justify-center">
        {state.step === 2 && state.imageSrc && (
          <PreviewStep
            imageSrc={state.imageSrc}
            transform={state.imageTransform}
            onTransformChange={setTransform}
            onNext={() => setStep(3)}
            onChangePhoto={() => setStep(1)}
          />
        )}

        {state.step === 3 && (
          <DetailsStep
            initialDetails={state.details}
            onGenerate={async (newDetails) => {
              updateDetails(newDetails.name, newDetails.role, newDetails.stack);
              await generateCard();
            }}
          />
        )}

        {state.step === 4 && state.imageSrc && (
          <BuilderIDStep
            imageSrc={state.imageSrc}
            transform={state.imageTransform}
            details={state.details}
            builderId={state.builderId}
            cardDataUrl={state.cardDataUrl}
            isGenerating={isGenerating}
            onNext={() => setStep(5)}
          />
        )}

        {state.step === 5 && state.imageSrc && (
          <ShareStep
            imageSrc={state.imageSrc}
            transform={state.imageTransform}
            details={state.details}
            builderId={state.builderId}
            cardDataUrl={state.cardDataUrl}
            onReset={reset}
          />
        )}
      </main>

      {/* Global Footer */}
      <footer className="w-full py-4 text-center border-t border-goa-orange/20 text-xs font-sans text-goa-muted font-medium bg-goa-paper/90">
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-1 sm:space-y-0 sm:space-x-4">
          <span>HH GOA 2026 OFFICIAL BUILDER ID GENERATOR</span>
          <span className="hidden sm:inline">•</span>
          <span className="text-goa-orange font-bold">#FrameInGoa</span>
          <span className="hidden sm:inline">•</span>
          <span>NO LOGIN | NO SIGNUP | 100% BROWSER PRIVACY</span>
        </div>
      </footer>
    </div>
  );
};

export default App;

