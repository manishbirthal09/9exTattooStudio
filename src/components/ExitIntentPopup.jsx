import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import Button from './Button.jsx';
import DestinyWheel from './DestinyWheel.jsx';

const SESSION_KEY = '9ex_exit_intent_shown';

export default function ExitIntentPopup() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) return;

    function handleMouseLeave(e) {
      if (e.clientY <= 0) {
        setVisible(true);
        sessionStorage.setItem(SESSION_KEY, '1');
      }
    }

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/85 backdrop-blur-sm px-6">
      <div className="relative w-full max-w-lg border border-brass/30 bg-ink-soft p-8 md:p-10 overflow-hidden">
        <div className="pointer-events-none absolute -right-24 -top-24 opacity-20">
          <DestinyWheel size={280} animate={false} />
        </div>

        <button
          onClick={() => setVisible(false)}
          aria-label="Close"
          className="absolute right-5 top-5 text-paper/60 hover:text-brass-bright"
        >
          <X size={20} />
        </button>

        <p className="eyebrow mb-4">Before You Go</p>
        <h3 className="font-display text-3xl mb-3">Get a Free Tattoo Consultation</h3>
        <p className="text-paper/75 text-sm leading-relaxed mb-7 max-w-sm">
          Talk to a 9Ex consultant about what a destiny tattoo could look like for you — no
          obligation, fifteen minutes on a call.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button to="/contact" variant="primary" onClick={() => setVisible(false)}>
            Claim Free Consultation
          </Button>
          <Button variant="ghost" onClick={() => setVisible(false)}>
            No Thanks
          </Button>
        </div>
      </div>
    </div>
  );
}
