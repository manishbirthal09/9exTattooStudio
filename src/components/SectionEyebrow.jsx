import React from 'react';

export default function SectionEyebrow({ index, children }) {
  return (
    <p className="eyebrow flex items-center gap-3">
      {index && <span className="text-brass">{index}</span>}
      <span className="h-px w-8 bg-brass/50" />
      {children}
    </p>
  );
}
