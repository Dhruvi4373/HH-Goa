import { useState, useCallback } from 'react';
import { BuilderState, ImageTransform, Step } from '../types/builder';
import { generateBuilderIdNumber, generateBuilderClass } from '../utils/generateBuilderId';
import { generateCardCanvas } from '../utils/generateCard';

const initialTransform: ImageTransform = { x: 0, y: 0, scale: 1 };

export function useBuilder() {
  const [state, setState] = useState<BuilderState>({
    step: 1,
    imageSrc: null,
    imageTransform: initialTransform,
    details: {
      name: 'Palak Shekhada',
      role: 'Developer',
      stack: ['Next.js', 'Python', 'AI'],
      builderClass: 'THE SIGNAL HUNTER'
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

  const generateCard = useCallback(async () => {
    if (!state.imageSrc) return;
    setIsGenerating(true);
    try {
      const dataUrl = await generateCardCanvas(
        state.imageSrc,
        state.imageTransform,
        state.details,
        state.builderId
      );
      setState(prev => ({ ...prev, cardDataUrl: dataUrl, step: 4 }));
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
