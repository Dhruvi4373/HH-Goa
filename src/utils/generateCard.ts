import { BuilderDetails, ImageTransform } from '../types/builder';
import { loadImage } from './imageProcessing';

const DEBUG_TEMPLATE = true;

const TEMPLATE_LAYOUT = {
  photo: {
    centerX: 1300,
    centerY: 275,
    width: 275,
    height: 320,
    rotation: -11.5, // degrees
    debugColor: 'rgba(0, 255, 255, 0.4)',
    name: 'PHOTO REGION'
  },
  riderValue: { x: 760, y: 252, width: 330, height: 45, color: '#182b25', debugColor: 'rgba(255, 0, 0, 0.4)', name: 'RIDER VALUE REGION' },
  stackValue: { x: 760, y: 352, width: 330, height: 45, color: '#182b25', debugColor: 'rgba(0, 0, 255, 0.4)', name: 'STACK VALUE REGION' },
  classValue: { x: 760, y: 452, width: 330, height: 45, color: '#D82C6A', debugColor: 'rgba(255, 0, 255, 0.4)', name: 'CLASS VALUE REGION' },
  teamValue:  { x: 760, y: 552, width: 330, height: 45, color: '#182b25', debugColor: 'rgba(0, 255, 0, 0.4)', name: 'TEAM VALUE REGION' },
  statusValue:{ x: 880, y: 630, width: 200, height: 45, color: '#2c6b32', debugColor: 'rgba(255, 255, 0, 0.4)', name: 'STATUS VALUE REGION' },
  builderId:  { x: 55, y: 948, width: 180, height: 25, color: '#102d27', debugColor: 'rgba(255, 165, 0, 0.4)', name: 'BUILDER ID REGION' }
};

interface Region {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  debugColor?: string;
  name?: string;
}

function drawFittedText(
  ctx: CanvasRenderingContext2D,
  text: string,
  region: Region,
  fontFamily: string,
  maxFontSize: number,
  minFontSize: number,
  align: 'left' | 'center' = 'left'
) {
  ctx.save();
  ctx.fillStyle = region.color;
  ctx.textBaseline = 'middle';
  ctx.textAlign = align;

  let fontSize = maxFontSize;
  ctx.font = `bold ${fontSize}px ${fontFamily}`;
  let textWidth = ctx.measureText(text).width;

  while (textWidth > region.width && fontSize > minFontSize) {
    fontSize -= 1;
    ctx.font = `bold ${fontSize}px ${fontFamily}`;
    textWidth = ctx.measureText(text).width;
  }

  const startY = region.y + region.height / 2;
  const startX = align === 'center' ? region.x + region.width / 2 : region.x;

  ctx.fillText(text, startX, startY);

  if (DEBUG_TEMPLATE && region.debugColor) {
    ctx.fillStyle = region.debugColor;
    ctx.fillRect(region.x, region.y, region.width, region.height);
    ctx.strokeStyle = region.debugColor.replace('0.4', '1.0');
    ctx.lineWidth = 1;
    ctx.strokeRect(region.x, region.y, region.width, region.height);
    
    ctx.fillStyle = '#000';
    ctx.font = '10px sans-serif';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText(region.name || '', region.x, region.y - 12);
  }

  ctx.restore();
}

export async function generateCardCanvas(
  imageSrc: string,
  imageTransform: ImageTransform,
  details: BuilderDetails,
  builderId: string
): Promise<string> {
  const width = 1535;
  const height = 1024;

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas context unavailable');

  await document.fonts.ready;

  const templateImg = await loadImage('/assets/final-builder-id-template.png');
  ctx.drawImage(templateImg, 0, 0, width, height);

  // USER PHOTO
  try {
    const userImg = await loadImage(imageSrc);
    ctx.save();
    
    const photoReg = TEMPLATE_LAYOUT.photo;
    ctx.translate(photoReg.centerX, photoReg.centerY);
    ctx.rotate((photoReg.rotation * Math.PI) / 180);
    
    // Draw Debug Box for Photo Before Clipping (if enabled)
    if (DEBUG_TEMPLATE) {
      ctx.fillStyle = photoReg.debugColor;
      ctx.fillRect(-photoReg.width / 2, -photoReg.height / 2, photoReg.width, photoReg.height);
      ctx.strokeStyle = photoReg.debugColor.replace('0.4', '1.0');
      ctx.lineWidth = 2;
      ctx.strokeRect(-photoReg.width / 2, -photoReg.height / 2, photoReg.width, photoReg.height);
      ctx.fillStyle = '#000';
      ctx.font = '12px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(photoReg.name, 0, -photoReg.height / 2 - 10);
    }
    
    // Create Clip Path
    ctx.beginPath();
    ctx.rect(-photoReg.width / 2, -photoReg.height / 2, photoReg.width, photoReg.height);
    ctx.clip();
    
    const scale = imageTransform.scale || 1;
    const offsetX = imageTransform.x || 0;
    const offsetY = imageTransform.y || 0;

    const imgAspect = userImg.width / userImg.height;
    const frameAspect = photoReg.width / photoReg.height;

    let baseDrawW, baseDrawH;
    if (imgAspect > frameAspect) {
      baseDrawH = photoReg.height;
      baseDrawW = baseDrawH * imgAspect;
    } else {
      baseDrawW = photoReg.width;
      baseDrawH = baseDrawW / imgAspect;
    }

    const drawW = baseDrawW * scale;
    const drawH = baseDrawH * scale;

    const dx = -drawW / 2 + offsetX;
    const dy = -drawH / 2 + offsetY;

    ctx.filter = 'saturate(0.85) contrast(1.05) sepia(0.15) brightness(0.95)';
    ctx.drawImage(userImg, dx, dy, drawW, drawH);
    
    ctx.fillStyle = 'rgba(150, 100, 50, 0.05)';
    ctx.fillRect(-photoReg.width / 2, -photoReg.height / 2, photoReg.width, photoReg.height);
    
    ctx.restore();
  } catch (e) {
    console.error('Failed to draw user image:', e);
  }

  // DYNAMIC TEXT FIELDS
  drawFittedText(
    ctx, 
    (details.name || 'PALAK SHEKHADA').toUpperCase(), 
    TEMPLATE_LAYOUT.riderValue, 
    '"Kalam", cursive', 36, 16
  );

  const stackText = details.stack && details.stack.length > 0 
    ? details.stack.join(' / ').toUpperCase() 
    : 'FULL STACK DEVELOPER';
  drawFittedText(
    ctx, 
    stackText, 
    TEMPLATE_LAYOUT.stackValue, 
    '"Kalam", cursive', 28, 14
  );

  drawFittedText(
    ctx, 
    (details.builderClass || 'THE SIGNAL HUNTER').toUpperCase(), 
    TEMPLATE_LAYOUT.classValue, 
    '"Caveat", cursive', 42, 18
  );

  drawFittedText(
    ctx, 
    'GOA BUILDERS', 
    TEMPLATE_LAYOUT.teamValue, 
    '"Kalam", cursive', 32, 16
  );

  drawFittedText(
    ctx, 
    'BUILDING', 
    TEMPLATE_LAYOUT.statusValue, 
    '"Kalam", cursive', 32, 16
  );

  // MASK BUILDER ID AREA FIRST
  if (!DEBUG_TEMPLATE) {
    ctx.drawImage(templateImg, 700, 850, 260, 60, 90, 890, 260, 40);
  }

  drawFittedText(
    ctx, 
    builderId.toUpperCase(), 
    TEMPLATE_LAYOUT.builderId, 
    '"Outfit", sans-serif', 28, 14, 'center'
  );

  return canvas.toDataURL('image/png', 1.0);
}
