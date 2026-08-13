/**
 * CARD_LAYOUT — Single source of truth for all dynamic element placement.
 *
 * Coordinate system: 1535 × 1024 px (master template).
 * All values in template pixels.
 *
 * To adjust any field position, change ONLY this file.
 */

import { Radius } from "lucide-react";

export const CARD_LAYOUT = {
  canvas: {
    width: 1535,
    height: 1024,
  },

  /*
   * Dynamic value regions — below each static label in template.
   * Labels (RIDER:, STACK:, CLASS:, TEAM:, STATUS:) already in template.
   * We inject ONLY the user's value text.
   *
   * y = baseline of VALUE text (below the label).
   * Measured from reference: values sit ~40-45px below their label baselines.
   */
  rider: {
    x: 759,
    y: 263,
    width: 280,
    height: 45,
    maxFontSize: 36,
    minFontSize: 14,
    fontFamily: '"Kalam", cursive',
    fontWeight: 700,
    color: '#1a2f28',
  },

  stack: {
    x: 759,
    y: 373,
    width: 280,
    height: 42,
    maxFontSize: 28,
    minFontSize: 11,
    fontFamily: '"Kalam", cursive',
    fontWeight: 700,
    color: '#1a2f28',
  },

  builderClass: {
    x: 759,
    y: 472,
    width: 280,
    height: 45,
    maxFontSize: 32,
    minFontSize: 13,
    fontFamily: '"Caveat", cursive',
    fontWeight: 700,
    color: '#c4245e',
  },

  team: {
    x: 759,
    y: 572,
    width: 280,
    height: 42,
    maxFontSize: 30,
    minFontSize: 13,
    fontFamily: '"Kalam", cursive',
    fontWeight: 700,
    color: '#1a2f28',
  },


  status: {
    x: 759,
    y: 668,
    width: 250,
    height: 40,
    maxFontSize: 30,
    minFontSize: 13,
    fontFamily: '"Kalam", cursive',
    fontWeight: 700,
    color: '#1a2f28',
  },

  /*
   * Photo — inner area of the Polaroid frame.
   * Frame artwork is in template. We place user image inside.
   * Measured from reference: photo fills frame, slight CCW tilt.
   */
  photo: {
    centerX: 1315,
    centerY: 248,
    width: 325,
    height: 365,
    rotation: 6.4,
    borderRadius: "100px",
  },

  /*
   * Builder ID — bottom-left code text.
   */
  builderId: {
    x: 48,
    y: 980,
    width: 190,
    height: 24,
    maxFontSize: 17,
    minFontSize: 10,
    fontFamily: '"Outfit", sans-serif',
    fontWeight: 600,
    color: '#0e0e0eff',
  },
} as const;

/* Subtle vintage photo filter */
export const PHOTO_FILTER = 'saturate(0.82) contrast(1.04) sepia(0.12) brightness(0.93)';
export const PHOTO_WARM_OVERLAY = 'rgba(150, 115, 65, 0.06)';

/* Debug — MUST be false in production */
export const DEBUG_REGIONS = false;
