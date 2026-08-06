/**
 * StampBadge — the page's signature element.
 * A rough, hand-inked "verification" stamp, styled after tattoo
 * flash-sheet stamps and old case-file seals. Two lines of text,
 * a rotation, and a deliberately imperfect double-ring border.
 *
 * Usage:
 *   <StampBadge topText="EST. LOCATION" bottomText="THANE" rotate={-8} />
 *   <StampBadge topText="WALK-INS" bottomText="CONFIRMED" rotate={6} tone="solid" />
 */
export default function StampBadge({
  topText = "VERIFIED",
  bottomText = "LOCATION",
  rotate = -8,
  tone = "outline", // "outline" (hero, on photo) | "solid" (CTA, on dark ink bg)
  className = "",
}) {
  const isSolid = tone === "solid";

  return (
    <div
      className={`relative select-none ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 160 160"
        width="128"
        height="128"
        className={isSolid ? "text-paper" : "text-blood"}
      >
        {/* Outer ring — intentionally irregular, not a perfect circle */}
        <path
          d="M80 6
             C 118 4, 152 34, 154 78
             C 156 118, 124 152, 80 154
             C 40 156, 6 124, 4 80
             C 2 38, 40 8, 80 6 Z"
          fill={isSolid ? "currentColor" : "none"}
          fillOpacity={isSolid ? 0.06 : 1}
          stroke="currentColor"
          strokeWidth="2.5"
          strokeDasharray="3 2 5 1 4 2"
          opacity="0.85"
        />
        {/* Inner ring */}
        <circle
          cx="80"
          cy="80"
          r="58"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="2 3"
          opacity="0.6"
        />

        {/* Text */}
        <text
          x="80"
          y="70"
          textAnchor="middle"
          className="font-data"
          fontSize="11"
          letterSpacing="2.5"
          fill="currentColor"
          opacity="0.9"
        >
          {topText}
        </text>
        <text
          x="80"
          y="95"
          textAnchor="middle"
          className="font-display"
          fontSize="18"
          fill="currentColor"
        >
          {bottomText}
        </text>

        {/* Small center mark, like a stamp's registration dot */}
        <circle cx="80" cy="80" r="1.6" fill="currentColor" opacity="0.5" />
      </svg>
    </div>
  );
}/**
 * StampBadge — the page's signature element.
 * A rough, hand-inked "verification" stamp, styled after tattoo
 * flash-sheet stamps and old case-file seals. Two lines of text,
 * a rotation, and a deliberately imperfect double-ring border.
 *
 * Usage:
 *   <StampBadge topText="EST. LOCATION" bottomText="THANE" rotate={-8} />
 *   <StampBadge topText="WALK-INS" bottomText="CONFIRMED" rotate={6} tone="solid" />
 */
export default function StampBadge({
  topText = "VERIFIED",
  bottomText = "LOCATION",
  rotate = -8,
  tone = "outline", // "outline" (hero, on photo) | "solid" (CTA, on dark ink bg)
  className = "",
}) {
  const isSolid = tone === "solid";

  return (
    <div
      className={`relative select-none ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 160 160"
        width="128"
        height="128"
        className={isSolid ? "text-paper" : "text-blood"}
      >
        {/* Outer ring — intentionally irregular, not a perfect circle */}
        <path
          d="M80 6
             C 118 4, 152 34, 154 78
             C 156 118, 124 152, 80 154
             C 40 156, 6 124, 4 80
             C 2 38, 40 8, 80 6 Z"
          fill={isSolid ? "currentColor" : "none"}
          fillOpacity={isSolid ? 0.06 : 1}
          stroke="currentColor"
          strokeWidth="2.5"
          strokeDasharray="3 2 5 1 4 2"
          opacity="0.85"
        />
        {/* Inner ring */}
        <circle
          cx="80"
          cy="80"
          r="58"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="2 3"
          opacity="0.6"
        />

        {/* Text */}
        <text
          x="80"
          y="70"
          textAnchor="middle"
          className="font-data"
          fontSize="11"
          letterSpacing="2.5"
          fill="currentColor"
          opacity="0.9"
        >
          {topText}
        </text>
        <text
          x="80"
          y="95"
          textAnchor="middle"
          className="font-display"
          fontSize="18"
          fill="currentColor"
        >
          {bottomText}
        </text>

        {/* Small center mark, like a stamp's registration dot */}
        <circle cx="80" cy="80" r="1.6" fill="currentColor" opacity="0.5" />
      </svg>
    </div>
  );
}