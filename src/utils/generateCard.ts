import { BuilderDetails, ImageTransform } from '../types/builder';
import { loadImage } from './imageProcessing';
import { CARD_LAYOUT, PHOTO_FILTER, PHOTO_WARM_OVERLAY, DEBUG_REGIONS } from './cardLayout';

/**
 * Fit text into a fixed region. Reduce font size until it fits.
 * Never overflows. Never crosses dividers. Never overlaps neighbors.
 */
function drawFittedText(
  ctx: CanvasRenderingContext2D,
  text: string,
  region: {
    x: number; y: number; width: number; height: number;
    maxFontSize: number; minFontSize: number;
    fontFamily: string; fontWeight: number; color: string;
  },
  align: 'left' | 'center' = 'left'
) {
  ctx.save();
  ctx.fillStyle = region.color;
  ctx.textBaseline = 'middle';
  ctx.textAlign = align;

  let fontSize = region.maxFontSize;
  ctx.font = `${region.fontWeight} ${fontSize}px ${region.fontFamily}`;
  let measured = ctx.measureText(text).width;

  while (measured > region.width && fontSize > region.minFontSize) {
    fontSize -= 1;
    ctx.font = `${region.fontWeight} ${fontSize}px ${region.fontFamily}`;
    measured = ctx.measureText(text).width;
  }

  const drawY = region.y + region.height / 2;
  const drawX = align === 'center'
    ? region.x + region.width / 2
    : region.x;

  ctx.fillText(text, drawX, drawY);
  ctx.restore();
}

/**
 * Draw debug region rectangle (developer-only, hidden in production).
 */
function drawDebugRect(
  ctx: CanvasRenderingContext2D,
  label: string,
  x: number, y: number, w: number, h: number,
  color: string
) {
  if (!DEBUG_REGIONS) return;
  ctx.save();
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
  ctx.strokeStyle = color.replace('0.35', '1.0');
  ctx.lineWidth = 1;
  ctx.strokeRect(x, y, w, h);
  ctx.fillStyle = '#000';
  ctx.font = '10px sans-serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.fillText(label, x + 2, y + 2);
  ctx.restore();
}

/**
 * Main compositor. Single source of truth for preview and export.
 *
 * Architecture:
 *   1. Draw immutable master template (1535×1024)
 *   2. Clip + draw user photo inside Polaroid window
 *   3. Draw dynamic text values (rider, stack, class, team, status, builderId)
 *
 * No debug output in production.
 * No label duplication.
 * No colored rectangles.
 * No responsive recalculation.
 */
export async function generateCardCanvas(
  imageSrc: string,
  imageTransform: ImageTransform,
  details: BuilderDetails,
  builderId: string
): Promise<string> {
  const { width, height } = CARD_LAYOUT.canvas;

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas context unavailable');

  // Wait for fonts
  await document.fonts.ready;

  // ── LAYER 1: Immutable master template ──
  const templateImg = await loadImage('/assets/CHATGPT_TEMPLATE.webp');
  ctx.drawImage(templateImg, 0, 0, width, height);

  // ── LAYER 2: User photo inside Polaroid ──
  try {
    const userImg = await loadImage(imageSrc);
    const photo = CARD_LAYOUT.photo;

    ctx.save();

    // Position at photo center, apply rotation
    ctx.translate(photo.centerX, photo.centerY);
    ctx.rotate((photo.rotation * Math.PI) / 180);

    // Debug rect (hidden in production)
    drawDebugRect(ctx, 'PHOTO',
      -photo.width / 2, -photo.height / 2,
      photo.width, photo.height,
      'rgba(0, 255, 255, 0.35)'
    );

    // Clip to photo window
    ctx.beginPath();
    ctx.rect(-photo.width / 2, -photo.height / 2, photo.width, photo.height);
    ctx.clip();

    // Cover strategy — any aspect ratio, no distortion, no gaps
    const scale = imageTransform.scale || 1;
    const offsetX = imageTransform.x || 0;
    const offsetY = imageTransform.y || 0;

    const imgAspect = userImg.width / userImg.height;
    const frameAspect = photo.width / photo.height;

    let baseW: number, baseH: number;
    if (imgAspect > frameAspect) {
      baseH = photo.height;
      baseW = baseH * imgAspect;
    } else {
      baseW = photo.width;
      baseH = baseW / imgAspect;
    }

    const drawW = baseW * scale;
    const drawH = baseH * scale;
    const dx = -drawW / 2 + offsetX;
    const dy = -drawH / 2 + offsetY;

    // Vintage filter
    ctx.filter = PHOTO_FILTER;
    ctx.drawImage(userImg, dx, dy, drawW, drawH);

    // Warm overlay
    ctx.filter = 'none';
    ctx.fillStyle = PHOTO_WARM_OVERLAY;
    ctx.fillRect(-photo.width / 2, -photo.height / 2, photo.width, photo.height);

    ctx.restore();
  } catch (e) {
    console.error('Photo draw failed:', e);
  }

  // ── LAYER 3: Dynamic text values ──

  // Debug rects (hidden in production)
  if (DEBUG_REGIONS) {
    const regions = [
      { label: 'RIDER', r: CARD_LAYOUT.rider, color: 'rgba(255,0,0,0.35)' },
      { label: 'STACK', r: CARD_LAYOUT.stack, color: 'rgba(0,100,255,0.35)' },
      { label: 'CLASS', r: CARD_LAYOUT.builderClass, color: 'rgba(255,0,255,0.35)' },
      { label: 'TEAM', r: CARD_LAYOUT.team, color: 'rgba(0,200,0,0.35)' },
      { label: 'STATUS', r: CARD_LAYOUT.status, color: 'rgba(255,255,0,0.35)' },
      { label: 'BUILDER_ID', r: CARD_LAYOUT.builderId, color: 'rgba(255,165,0,0.35)' },
    ];
    for (const { label, r, color } of regions) {
      drawDebugRect(ctx, label, r.x, r.y, r.width, r.height, color);
    }
  }

  // Rider
  drawFittedText(
    ctx,
    (details.name || '').toUpperCase(),
    CARD_LAYOUT.rider
  );

  // Stack
  const stackText = details.stack && details.stack.length > 0
    ? details.stack.join(' / ').toUpperCase()
    : 'FULL STACK DEVELOPER';
  drawFittedText(ctx, stackText, CARD_LAYOUT.stack);

  // Class
  drawFittedText(
    ctx,
    (details.builderClass || 'THE SIGNAL HUNTER').toUpperCase(),
    CARD_LAYOUT.builderClass
  );

  // Team
  const teamText = details.team && details.team.trim()
    ? details.team.trim().toUpperCase()
    : 'THE GOA BUILDERS';
  drawFittedText(ctx, teamText, CARD_LAYOUT.team);

  // Status
  const statusText = details.status && details.status.trim()
    ? details.status.trim().toUpperCase()
    : 'ACTIVE';
  drawFittedText(ctx, statusText, CARD_LAYOUT.status);

  // Builder ID
  drawFittedText(
    ctx,
    builderId.toUpperCase(),
    CARD_LAYOUT.builderId,
    'center'
  );

  return canvas.toDataURL('image/png', 1.0);
}
