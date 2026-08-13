import { useState, useCallback } from 'react';
import { BuilderState, ImageTransform, Step, BuilderDetails } from '../types/builder';
import { generateBuilderIdNumber, generateBuilderClass } from '../utils/generateBuilderId';
import { generateCardCanvas } from '../utils/generateCard';

const initialTransform: ImageTransform = { x: 0, y: 0, scale: 1 };

export function useBuilder() {
  const [state, setState] = useState<BuilderState>({
    step: 1,
    imageSrc: null,
    imageTransform: initialTransform,
    details: {
      name: '',
      role: 'Developer',
      stack: [],
      builderClass: ''
    },
    builderId: generateBuilderIdNumber(),
    cardDataUrl: null
  });

  const [isGenerating, setIsGenerating] = useState(false);

  const setStep = useCallback((step: Step) => {
    setState(prev => ({ ...prev, step }));
  }, []);

  const setImage = useCallback((imageSrc: string) => {
    setState(prev => ({
      ...prev,
      imageSrc,
      imageTransform: initialTransform,
      step: 2
    }));
  }, []);

  const setTransform = useCallback((imageTransform: ImageTransform) => {
    setState(prev => ({ ...prev, imageTransform }));
  }, []);

  const updateDetails = useCallback((name: string, role: string, stack: string[]) => {
    const builderClass = generateBuilderClass(role, stack);
    setState(prev => ({
      ...prev,
      details: { name, role, stack, builderClass }
    }));
  }, []);

  const generateCard = useCallback(async (customDetails?: BuilderDetails) => {
    if (!state.imageSrc) return;
    setIsGenerating(true);
    
    const activeDetails = customDetails || state.details;

    try {
      const dataUrl = await generateCardCanvas(
        state.imageSrc,
        state.imageTransform,
        activeDetails,
        state.builderId
      );
      setState(prev => ({ ...prev, details: activeDetails, cardDataUrl: dataUrl, step: 4 }));
    } catch (err) {
      console.error('Failed to generate builder card canvas:', err);
    } finally {
      setIsGenerating(false);
    }
  }, [state.imageSrc, state.imageTransform, state.details, state.builderId]);

  const reset = useCallback(() => {
    setState({
      step: 1,
      imageSrc: null,
      imageTransform: initialTransform,
      details: {
        name: '',
        role: 'Developer',
        stack: [],
        builderClass: ''
      },
      builderId: generateBuilderIdNumber(),
      cardDataUrl: null
    });
  }, []);

  return {
    state,
    isGenerating,
    setStep,
    setImage,
    setTransform,
    updateDetails,
    generateCard,
    reset
  };
}
