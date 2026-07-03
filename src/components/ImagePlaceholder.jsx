import React from 'react';

/**
 * Stand-in for real tattoo photography. Swap any <ImagePlaceholder> for a real
 * <img src="..." /> once client photo assets are available — props are kept
 * deliberately close to a real <img> so the swap is a one-line change.
 */
export default function ImagePlaceholder({ label, ratio = 'aspect-[4/5]', className = '', tone = 'ink' }) {
  const tones = {
    ink: 'bg-ink-soft text-muted ink-texture',
    paper: 'bg-paper-dim text-muted',
  };

  return (
    <div
      className={`relative overflow-hidden border border-paper-line/15 ${ratio} ${tones[tone]} ${className}`}
    >
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <span className="font-data text-[10px] tracking-widest2 uppercase text-center leading-relaxed opacity-70">
          {label}
        </span>
      </div>
      <svg className="absolute inset-0 h-full w-full opacity-[0.07]" preserveAspectRatio="none">
        <line x1="0" y1="0" x2="100%" y2="100%" stroke="currentColor" strokeWidth="1" />
        <line x1="100%" y1="0" x2="0" y2="100%" stroke="currentColor" strokeWidth="1" />
      </svg>
    </div>
  );
}
