export type Step = 1 | 2 | 3 | 4 | 5;

export interface ImageTransform {
  x: number;
  y: number;
  scale: number;
}

export interface BuilderDetails {
  name: string;
  role: string;
  stack: string[];
  builderClass: string;
  team?: string;
  status?: string;
}

export interface BuilderState {
  step: Step;
  imageSrc: string | null;
  imageTransform: ImageTransform;
  details: BuilderDetails;
  builderId: string;
  cardDataUrl: string | null;
}
