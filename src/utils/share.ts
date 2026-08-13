export function downloadCardPNG(dataUrl: string, builderId: string) {
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = `HH-Goa-2026-Builder-ID-${builderId}.png`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function shareToX(name: string, builderId: string, builderClass: string) {
  const text = encodeURIComponent(
    `I just generated my official HH Goa 2026 Builder ID! 🌴\n\nName: ${name}\nClass: ${builderClass}\nID: ${builderId}\n\nBuild for the build. #FrameInGoa`
  );
  const url = encodeURIComponent(window.location.origin);
  window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
}

export async function copyShareLink(): Promise<boolean> {
  const url = window.location.href;
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(url);
      return true;
    } else {
      const textArea = document.createElement('textarea');
      textArea.value = url;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      document.execCommand('copy');
      textArea.remove();
      return true;
    }
  } catch (err) {
    console.error('Failed to copy share link:', err);
    return false;
  }
}
