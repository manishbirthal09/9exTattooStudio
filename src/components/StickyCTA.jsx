import React from 'react';
import { Link } from 'react-router-dom';
import { Phone } from 'lucide-react';
import { studio } from '../data/siteData.js';

export default function StickyCTA() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 flex lg:hidden border-t border-paper-line/15 bg-ink">
      <Link
        to="/contact"
        className="flex-1 py-4 text-center font-data text-[11px] tracking-widest2 uppercase bg-brass text-ink"
      >
        Book Appointment
      </Link>
      <a
        href={`tel:${studio.phone.replace(/\s/g, '')}`}
        className="flex-1 flex items-center justify-center gap-2 py-4 text-center font-data text-[11px] tracking-widest2 uppercase border-l border-paper-line/15 text-paper"
      >
        <Phone size={14} /> Talk To Expert
      </a>
    </div>
  );
}
