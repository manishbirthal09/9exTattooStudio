import React from 'react';

/**
 * The Destiny Wheel — the site's single signature element.
 * A radial chart built from concentric rings, 12-house ticks (astrology) and a
 * 9-point inner star (numerology root number, nodding to "9Ex"). Rendered as
 * fine brass linework, the way a flash-sheet tattoo would be drawn.
 *
 * Used sparingly: hero backdrop + consultation page anchor. Not repeated as
 * decoration elsewhere.
 */
export default function DestinyWheel({ size = 640, animate = true, className = '' }) {
  const r = size / 2;
  const houses = Array.from({ length: 12 });
  const ninePoints = Array.from({ length: 9 }).map((_, i) => {
    const angle = (i / 9) * Math.PI * 2 - Math.PI / 2;
    return [r + Math.cos(angle) * r * 0.42, r + Math.sin(angle) * r * 0.42];
  });

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      width={size}
      height={size}
      className={`${animate ? 'wheel-drift' : ''} ${className}`}
      aria-hidden="true"
    >
      <circle cx={r} cy={r} r={r * 0.96} fill="none" stroke="#B8924A" strokeWidth="1" opacity="0.5" />
      <circle cx={r} cy={r} r={r * 0.78} fill="none" stroke="#B8924A" strokeWidth="0.75" opacity="0.35" />
      <circle cx={r} cy={r} r={r * 0.42} fill="none" stroke="#B8924A" strokeWidth="0.75" opacity="0.4" />

      {houses.map((_, i) => {
        const angle = (i / 12) * Math.PI * 2;
        const x1 = r + Math.cos(angle) * r * 0.78;
        const y1 = r + Math.sin(angle) * r * 0.78;
        const x2 = r + Math.cos(angle) * r * 0.96;
        const y2 = r + Math.sin(angle) * r * 0.96;
        return (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#B8924A" strokeWidth="1" opacity="0.45" />
        );
      })}

      {ninePoints.map(([x, y], i) => {
        const [nx, ny] = ninePoints[(i + 4) % 9];
        return (
          <line key={i} x1={x} y1={y} x2={nx} y2={ny} stroke="#D4AF6A" strokeWidth="0.6" opacity="0.5" />
        );
      })}

      {ninePoints.map(([x, y], i) => (
        <circle key={`pt-${i}`} cx={x} cy={y} r={2.5} fill="#D4AF6A" opacity="0.8" />
      ))}

      <circle cx={r} cy={r} r={3} fill="#D4AF6A" />
    </svg>
  );
}
