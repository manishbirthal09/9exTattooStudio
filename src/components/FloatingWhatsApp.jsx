import React from 'react';
import { MessageCircle } from 'lucide-react';
import { studio } from '../data/siteData.js';

export default function FloatingWhatsApp() {
  return (
    <a
    href={`https://wa.me/${studio.whatsapp}?text=${encodeURIComponent('Hi, I want to know more about Destiny Tattoo Consultation.')}`}
  target="_blank"
  rel="noreferrer"
  aria-label="Chat on WhatsApp"
  className="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-[#25D366] shadow-2xl transition-all duration-300 hover:scale-110 hover:shadow-[0_0_24px_rgba(37,211,102,0.5)]"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    width="32"
    height="32"
    fill="white"
  >
    <path d="M16 .5C7.439.5.5 7.439.5 16c0 2.777.726 5.445 2.103 7.788L.5 31.5l7.93-2.078A15.432 15.432 0 0 0 16 31.5C24.561 31.5 31.5 24.561 31.5 16S24.561.5 16 .5zm0 28.24a13.19 13.19 0 0 1-6.72-1.837l-.482-.286-4.704 1.232 1.257-4.588-.315-.497A13.174 13.174 0 0 1 2.76 16C2.76 9.243 8.243 3.76 16 3.76S29.24 9.243 29.24 16 23.757 28.74 16 28.74zm7.23-9.81c-.396-.198-2.344-1.156-2.708-1.288-.363-.132-.628-.198-.892.198-.264.396-1.023 1.288-1.254 1.552-.231.264-.462.297-.858.099-.396-.198-1.672-.616-3.185-1.965-1.177-1.05-1.972-2.347-2.203-2.743-.231-.396-.025-.61.173-.807.178-.177.396-.462.594-.693.198-.231.264-.396.396-.66.132-.264.066-.495-.033-.693-.099-.198-.892-2.15-1.222-2.944-.322-.773-.649-.668-.892-.68l-.759-.013c-.264 0-.693.099-1.057.495-.363.396-1.386 1.354-1.386 3.302s1.419 3.828 1.617 4.092c.198.264 2.793 4.263 6.766 5.979.946.408 1.683.652 2.258.835.949.302 1.813.259 2.496.157.761-.113 2.344-.958 2.675-1.883.33-.924.33-1.717.231-1.883-.099-.165-.363-.264-.759-.462z"/>
  </svg>
</a>
    
  );
}
