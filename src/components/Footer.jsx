import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Youtube, Linkedin } from 'lucide-react';
import { studio, navigation, galleryCategories, studioLocations } from '../data/siteData.js';

const socialLinks = [
  { href: studio.instagram, icon: Instagram,  label: 'Instagram' },
  { href: studio.facebook,  icon: Facebook,   label: 'Facebook'  },
  { href: studio.youtube,   icon: Youtube,    label: 'YouTube'   },
  { href: studio.linkedin,  icon: Linkedin,   label: 'LinkedIn'  },
  {
    href: `https://wa.me/${studio.whatsapp}`,
    label: 'WhatsApp',
    icon: () => (
      <svg width="17" height="17" viewBox="0 0 32 32" fill="currentColor">
        <path d="M16 .5C7.439.5.5 7.439.5 16c0 2.777.726 5.445 2.103 7.788L.5 31.5l7.93-2.078A15.432 15.432 0 0 0 16 31.5C24.561 31.5 31.5 24.561 31.5 16S24.561.5 16 .5zm7.23 22.43c-.396-.198-2.344-1.156-2.708-1.288-.363-.132-.628-.198-.892.198-.264.396-1.023 1.288-1.254 1.552-.231.264-.462.297-.858.099-.396-.198-1.672-.616-3.185-1.965-1.177-1.05-1.972-2.347-2.203-2.743-.231-.396-.025-.61.173-.807.178-.177.396-.462.594-.693.198-.231.264-.396.396-.66.132-.264.066-.495-.033-.693-.099-.198-.892-2.15-1.222-2.944-.322-.773-.649-.668-.892-.68l-.759-.013c-.264 0-.693.099-1.057.495-.363.396-1.386 1.354-1.386 3.302s1.419 3.828 1.617 4.092c.198.264 2.793 4.263 6.766 5.979.946.408 1.683.652 2.258.835.949.302 1.813.259 2.496.157.761-.113 2.344-.958 2.675-1.883.33-.924.33-1.717.231-1.883-.099-.165-.363-.264-.759-.462z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-paper-line/10 bg-ink overflow-hidden">

      {/* Subtle top brass line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-brass/25 to-transparent" />

      {/* Main grid */}
      <div className="container-site grid gap-12 py-20 md:grid-cols-[1.8fr_1fr_1fr_1fr]">

        {/* ── Col 1 — Brand ── */}
        <div>
          {/* Logo */}
          <Link to="/" className="group inline-flex items-center gap-2.5 mb-5">
            <svg width="24" height="24" viewBox="0 0 28 28" className="transition-transform duration-700 group-hover:rotate-45 shrink-0">
              <circle cx="14" cy="14" r="12" fill="none" stroke="#C9A84C" strokeWidth="0.8" opacity="0.5" />
              <circle cx="14" cy="14" r="7"  fill="none" stroke="#C9A84C" strokeWidth="0.6" opacity="0.35" />
              {[0,1,2,3,4,5,6,7,8,9,10,11].map(i => {
                const a = (i / 12) * Math.PI * 2;
                return (
                  <line
                    key={i}
                    x1={14 + Math.cos(a) * 7}  y1={14 + Math.sin(a) * 7}
                    x2={14 + Math.cos(a) * 12} y2={14 + Math.sin(a) * 12}
                    stroke="#C9A84C" strokeWidth="0.7" opacity="0.45"
                  />
                );
              })}
              <circle cx="14" cy="14" r="1.5" fill="#DFC070" />
            </svg>
            <div className="flex flex-col leading-none">
              <span className="font-display text-lg">
                9Ex <span className="text-brass-bright">Tattoo</span>
              </span>
              <span className="font-data text-[8px] tracking-[0.18em] uppercase text-brass/45 mt-0.5">
                Mumbai · Est. 2009
              </span>
            </div>
          </Link>

          {/* Tagline */}
          <p className="text-sm text-paper/55 leading-relaxed max-w-[260px]">
            India's first destiny tattoo consultant — custom ink designed through numerology,
            astrology, and your personal story.
          </p>

          {/* Divider */}
          <div className="my-6 h-px w-12 bg-brass/25" />

          {/* Socials */}
          <div className="flex items-center gap-4">
            {socialLinks.map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="text-paper/35 hover:text-brass-bright transition-colors duration-200"
              >
                <Icon size={17} />
              </a>
            ))}
          </div>
        </div>

        {/* ── Col 2 — Quick Links ── */}
        <div>
          <p className="font-data text-[10px] tracking-widest2 uppercase text-brass/60 mb-5">
            Navigate
          </p>
          <ul className="space-y-3">
            {navigation.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className="group flex items-center gap-2 text-sm text-paper/50 hover:text-paper transition-colors duration-200"
                >
                  <span className="h-px w-3 bg-brass/30 group-hover:w-5 group-hover:bg-brass-bright transition-all duration-300" />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Col 3 — Gallery ── */}
        <div>
          <p className="font-data text-[10px] tracking-widest2 uppercase text-brass/60 mb-5">
            Gallery
          </p>
          <ul className="space-y-3">
            {galleryCategories.slice(0, 6).map((c) => (
              <li key={c.id}>
                <Link
                  to={`/gallery?category=${c.id}`}
                  className="group flex items-center gap-2 text-sm text-paper/50 hover:text-paper transition-colors duration-200"
                >
                  <span className="h-px w-3 bg-brass/30 group-hover:w-5 group-hover:bg-brass-bright transition-all duration-300" />
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Col 4 — Studios + Contact ── */}
        <div>
          <p className="font-data text-[10px] tracking-widest2 uppercase text-brass/60 mb-5">
            Studios
          </p>
          <ul className="space-y-3 mb-7">
            {studioLocations.map((loc) => (
              <li
                key={loc.city}
                className="flex items-center gap-2 text-sm text-paper/50"
              >
                <span className="h-1 w-1 rounded-full bg-brass/40 shrink-0" />
                {loc.city}
              </li>
            ))}
          </ul>

          {/* Contact */}
          <div className="space-y-2 pt-5 border-t border-paper-line/10">
            <a
              href={`tel:${studio.phone}`}
              className="flex items-center gap-2 text-sm text-paper/50 hover:text-brass-bright transition-colors duration-200"
            >
              <span className="font-data text-[9px] tracking-widest2 uppercase text-brass/40">Ph</span>
              {studio.phone}
            </a>
            <a
              href={`mailto:${studio.email}`}
              className="flex items-center gap-2 text-sm text-paper/50 hover:text-brass-bright transition-colors duration-200"
            >
              <span className="font-data text-[9px] tracking-widest2 uppercase text-brass/40">Em</span>
              {studio.email}
            </a>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-paper-line/8">
        <div className="container-site flex flex-col sm:flex-row items-center justify-between gap-3 py-5">
          <p className="font-data text-[10px] tracking-widest2 uppercase text-muted/50">
            © {new Date().getFullYear()} {studio.name}. All rights reserved.
          </p>
          <p className="font-data text-[10px] tracking-widest2 uppercase text-muted/30">
            India&apos;s First Destiny Tattoo Consultant
          </p>
        </div>
      </div>

    </footer>
  );
}

// import React from 'react';
// import { Link } from 'react-router-dom';
// import { Instagram, Facebook, Youtube, Linkedin, MessageCircle } from 'lucide-react';
// import { studio, navigation, galleryCategories, studioLocations } from '../data/siteData.js';

// export default function Footer() {
//   return (
//     <footer className="border-t border-paper-line/10 bg-ink-soft">
//       <div className="container-site grid gap-12 py-16 md:grid-cols-4">
//         <div>
//           <p className="font-display text-lg mb-3">
//             9Ex <span className="text-brass-bright">Tattoo</span>
//           </p>
//           <p className="text-sm text-muted leading-relaxed max-w-xs">
//             {studio.tagline}. Custom tattoos designed through personality, life goals, numerology,
//             astrology and personal storytelling.
//           </p>
//           <div className="mt-5 flex gap-4 text-paper/70">
//             <a href={studio.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="hover:text-brass-bright">
//               <Instagram size={18} />
//             </a>
//             <a href={studio.facebook} target="_blank" rel="noreferrer" aria-label="Facebook" className="hover:text-brass-bright">
//               <Facebook size={18} />
//             </a>
//             <a href={studio.youtube} target="_blank" rel="noreferrer" aria-label="YouTube" className="hover:text-brass-bright">
//               <Youtube size={18} />
//             </a>
//             <a href={studio.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="hover:text-brass-bright">
//               <Linkedin size={18} />
//             </a>
//             <a
//               href={`https://wa.me/${studio.whatsapp}`}
//               target="_blank"
//               rel="noreferrer"
//               aria-label="WhatsApp"
//               className="hover:text-brass-bright"
//             >
//               <MessageCircle size={18} />
//             </a>
//           </div>
//         </div>

//         <div>
//           <p className="eyebrow mb-4">Quick Links</p>
//           <ul className="space-y-2 text-sm text-paper/75">
//             {navigation.map((item) => (
//               <li key={item.path}>
//                 <Link to={item.path} className="hover:text-brass-bright">
//                   {item.label}
//                 </Link>
//               </li>
//             ))}
//           </ul>
//         </div>

//         <div>
//           <p className="eyebrow mb-4">Gallery</p>
//           <ul className="space-y-2 text-sm text-paper/75">
//             {galleryCategories.slice(0, 6).map((c) => (
//               <li key={c.id}>
//                 <Link to={`/gallery?category=${c.id}`} className="hover:text-brass-bright">
//                   {c.label}
//                 </Link>
//               </li>
//             ))}
//           </ul>
//         </div>

//         <div>
//           <p className="eyebrow mb-4">Studios</p>
//           <ul className="space-y-2 text-sm text-paper/75">
//             {studioLocations.map((loc) => (
//               <li key={loc.city}>{loc.city}</li>
//             ))}
//           </ul>
//           <p className="mt-5 text-sm text-paper/75">{studio.phone}</p>
//           <p className="text-sm text-paper/75">{studio.email}</p>
//         </div>
//       </div>

//       <div className="border-t border-paper-line/10 py-6">
//         <p className="container-site text-xs text-muted">
//           © {new Date().getFullYear()} {studio.name}. All rights reserved.
//         </p>
//       </div>
//     </footer>
//   );
// }
