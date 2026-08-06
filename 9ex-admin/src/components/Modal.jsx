import React from 'react';
import { X } from 'lucide-react';

export default function Modal({ open, onClose, title, children, wide }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/50">
      <div
        className={`bg-paper w-full ${wide ? 'max-w-2xl' : 'max-w-md'} max-h-[90vh] overflow-y-auto shadow-xl`}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-ink/10 sticky top-0 bg-paper">
          <h3 className="font-semibold text-ink">{title}</h3>
          <button onClick={onClose} className="text-ink/50 hover:text-ink">
            <X size={18} />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
