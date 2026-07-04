import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { navigation, studio, galleryCategories } from '../data/siteData.js';
import Button from './Button.jsx';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled
          ? 'bg-ink/90 backdrop-blur-xl border-b border-paper-line/8 shadow-[0_1px_0_rgba(201,168,76,0.08)]'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="container-site flex h-16 items-center justify-between">

        {/* ── Logo ── */}
        <Link
          to="/"
          onClick={() => setOpen(false)}
          className="group flex items-center gap-3"
        >
          {/* Destiny wheel icon */}
          <img
  src="/gallery/logo.webp"
  alt="9Ex Tattoo Studio"
  className="h-10 w-10 object-contain shrink-0 transition-transform duration-500 group-hover:rotate-6"/>

          {/* Logo text + tagline */}
          <div className="flex flex-col leading-none">
            {/* <span className="font-display text-xl tracking-wide">
              9Ex <span className="text-brass-bright">Tattoo</span>
            </span> */}
            {/* <span className="font-data text-[8px] tracking-[0.2em] uppercase text-brass/50 mt-0.5">
              Mumbai · Est. 2009
            </span> */}
          </div>
        </Link>

        {/* ── Desktop Nav ── */}
        <nav className="hidden lg:flex items-center gap-1">
          {navigation.map((item) =>
            item.label === 'Gallery' ? (

              /* Gallery — dropdown */
              <div key={item.path} className="group relative">
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-1.5 px-4 py-2 text-[13px] font-data tracking-[0.08em] uppercase transition-colors ${
                      isActive ? 'text-brass-bright' : 'text-paper/50 hover:text-paper'
                    }`
                  }
                >
                  {item.label}
                  <ChevronDown
                    size={11}
                    className="opacity-40 transition-transform duration-200 group-hover:rotate-180"
                  />
                </NavLink>

                {/* Dropdown panel */}
                <div className="invisible absolute left-1/2 -translate-x-1/2 top-full pt-3 w-60 opacity-0 translate-y-1 transition-all duration-200 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0">
                  <div className="border border-brass/15 bg-ink/98 backdrop-blur-xl">

                    {/* Brass top accent */}
                    <div className="h-px w-full bg-gradient-to-r from-transparent via-brass/40 to-transparent" />

                    <div className="p-3 grid grid-cols-2 gap-1">
                      {galleryCategories.map((c) => (
                        <Link
                          key={c.id}
                          to={`/gallery?category=${c.id}`}
                          className="px-3 py-2.5 text-[11px] font-data tracking-[0.06em] uppercase text-paper/50 hover:text-brass-bright hover:bg-paper/5 transition-all duration-150"
                        >
                          {c.label}
                        </Link>
                      ))}
                    </div>

                    {/* View all link */}
                    <div className="border-t border-paper-line/10 px-4 py-2.5">
                      <Link
                        to="/gallery"
                        className="text-[10px] font-data tracking-widest2 uppercase text-brass/60 hover:text-brass-bright transition-colors"
                      >
                        View Full Gallery →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

            ) : (

              /* Regular nav link */
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `relative px-4 py-2 text-[13px] font-data tracking-[0.08em] uppercase transition-colors group ${
                    isActive ? 'text-brass-bright' : 'text-paper/50 hover:text-paper'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {item.label}
                    {/* Dot indicator */}
                    <span
                      className={`absolute -bottom-0.5 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-brass-bright transition-all duration-300 ${
                        isActive
                          ? 'opacity-100 scale-100'
                          : 'opacity-0 scale-0 group-hover:opacity-60 group-hover:scale-100'
                      }`}
                    />
                  </>
                )}
              </NavLink>

            )
          )}
        </nav>

        {/* ── Desktop Right — Phone + CTA ── */}
        <div className="hidden lg:flex items-center gap-5">

          {/* Subtle phone / whatsapp */}
          {/* <a
            href={`https://wa.me/${studio.whatsapp}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-[11px] font-data tracking-[0.08em] uppercase text-paper/35 hover:text-brass-bright transition-colors duration-200"
          >
            <span className="h-px w-5 bg-brass/30" />
            WhatsApp
          </a> */}

          <Button to="/contact" variant='primary' className='!rounded-full h-10 w-fit '>
            Book Appointment
          </Button>
        </div>

        {/* ── Mobile Hamburger ── */}
        <button
          className="lg:hidden relative w-10 h-10 flex flex-col items-center justify-center gap-1.5"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          <span
            className={`block h-px w-6 bg-paper transition-all duration-300 ${
              open ? 'rotate-45 translate-y-[3.5px]' : ''
            }`}
          />
          <span
            className={`block h-px bg-paper transition-all duration-300 ${
              open ? 'w-0 opacity-0' : 'w-4'
            }`}
          />
          <span
            className={`block h-px w-6 bg-paper transition-all duration-300 ${
              open ? '-rotate-45 -translate-y-[3.5px]' : ''
            }`}
          />
        </button>
      </div>

      {/* ── Mobile Menu ── */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-500 ${
          open ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="border-t border-paper-line/10 bg-ink/98 backdrop-blur-md px-6 pb-10 pt-6">

          {/* Nav links */}
          <nav className="flex flex-col">
            {navigation.map((item, i) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setOpen(false)}
                style={{ transitionDelay: open ? `${i * 40}ms` : '0ms' }}
                className={({ isActive }) =>
                  `flex items-center justify-between py-4 border-b border-paper-line/10 text-base transition-all duration-300 ${
                    open ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
                  } ${isActive ? 'text-brass-bright' : 'text-paper/80'}`
                }
              >
                {item.label}
                {item.label === 'Gallery' && (
                  <ChevronDown size={14} className="opacity-40" />
                )}
              </NavLink>
            ))}
          </nav>

          {/* Mobile CTAs */}
          <div className="mt-8 flex flex-col gap-3">
            <Button to="/contact" variant="primary" onClick={() => setOpen(false)}>
              Book Appointment
            </Button>
            <a
              href={`https://wa.me/${studio.whatsapp}`}
              target="_blank"
              rel="noreferrer"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-2 py-3.5 border border-[#25D366]/30 text-[#25D366] font-data text-[11px] tracking-widest2 uppercase hover:bg-[#25D366]/5 transition-colors duration-200"
            >
              {/* WhatsApp icon */}
              <svg width="13" height="13" viewBox="0 0 32 32" fill="currentColor">
                <path d="M16 .5C7.439.5.5 7.439.5 16c0 2.777.726 5.445 2.103 7.788L.5 31.5l7.93-2.078A15.432 15.432 0 0 0 16 31.5C24.561 31.5 31.5 24.561 31.5 16S24.561.5 16 .5zm7.23 22.43c-.396-.198-2.344-1.156-2.708-1.288-.363-.132-.628-.198-.892.198-.264.396-1.023 1.288-1.254 1.552-.231.264-.462.297-.858.099-.396-.198-1.672-.616-3.185-1.965-1.177-1.05-1.972-2.347-2.203-2.743-.231-.396-.025-.61.173-.807.178-.177.396-.462.594-.693.198-.231.264-.396.396-.66.132-.264.066-.495-.033-.693-.099-.198-.892-2.15-1.222-2.944-.322-.773-.649-.668-.892-.68l-.759-.013c-.264 0-.693.099-1.057.495-.363.396-1.386 1.354-1.386 3.302s1.419 3.828 1.617 4.092c.198.264 2.793 4.263 6.766 5.979.946.408 1.683.652 2.258.835.949.302 1.813.259 2.496.157.761-.113 2.344-.958 2.675-1.883.33-.924.33-1.717.231-1.883-.099-.165-.363-.264-.759-.462z" />
              </svg>
              WhatsApp Us
            </a>
          </div>

          {/* Bottom tagline */}
          <p className="mt-8 text-center font-data text-[10px] tracking-widest2 uppercase text-muted">
            India&apos;s First Destiny Tattoo Consultant
          </p>
        </div>
      </div>
    </header>
  );
}



// import React, { useState, useEffect } from 'react';
// import { Link, NavLink } from 'react-router-dom';
// import { Menu, X, ChevronDown } from 'lucide-react';
// import { navigation, studio, galleryCategories } from '../data/siteData.js';
// import Button from './Button.jsx';

// export default function Navbar() {
//   const [open, setOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);

//   useEffect(() => {
//     const onScroll = () => setScrolled(window.scrollY > 20);
//     window.addEventListener('scroll', onScroll);
//     return () => window.removeEventListener('scroll', onScroll);
//   }, []);

//   return (
//     <header
//       className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
//         scrolled
//           ? 'bg-ink/95 backdrop-blur-md border-b border-paper-line/10 shadow-[0_4px_30px_rgba(0,0,0,0.4)]'
//           : 'bg-transparent border-b border-transparent'
//       }`}
//     >
//       <div className="container-site flex h-20 items-center justify-between">

//         {/* ── Logo ── */}
//         <Link
//           to="/"
//           onClick={() => setOpen(false)}
//           className="group flex items-center gap-3"
//         >
//           {/* Small destiny wheel icon */}
//           <svg width="28" height="28" viewBox="0 0 28 28" className="transition-transform duration-700 group-hover:rotate-45">
//             <circle cx="14" cy="14" r="12" fill="none" stroke="#C9A84C" strokeWidth="0.8" opacity="0.6"/>
//             <circle cx="14" cy="14" r="7"  fill="none" stroke="#C9A84C" strokeWidth="0.6" opacity="0.4"/>
//             {[0,1,2,3,4,5,6,7,8,9,10,11].map(i => {
//               const a = (i / 12) * Math.PI * 2;
//               return (
//                 <line
//                   key={i}
//                   x1={14 + Math.cos(a) * 7}
//                   y1={14 + Math.sin(a) * 7}
//                   x2={14 + Math.cos(a) * 12}
//                   y2={14 + Math.sin(a) * 12}
//                   stroke="#C9A84C"
//                   strokeWidth="0.7"
//                   opacity="0.5"
//                 />
//               );
//             })}
//             <circle cx="14" cy="14" r="1.5" fill="#DFC070"/>
//           </svg>
//           <span className="font-display text-xl tracking-wide">
//             9Ex <span className="text-brass-bright">Tattoo</span>
//           </span>
//         </Link>

//         {/* ── Desktop Nav ── */}
//         <nav className="hidden lg:flex items-center gap-1">
//           {navigation.map((item) =>
//             item.label === 'Gallery' ? (
//               <div key={item.path} className="group relative">
//                 <NavLink
//                   to={item.path}
//                   className={({ isActive }) =>
//                     `flex items-center gap-1 px-4 py-2 text-sm tracking-wide transition-colors rounded-sm ${
//                       isActive
//                         ? 'text-brass-bright'
//                         : 'text-paper/70 hover:text-paper'
//                     }`
//                   }
//                 >
//                   {item.label}
//                   <ChevronDown size={13} className="opacity-50 transition-transform duration-200 group-hover:rotate-180" />
//                 </NavLink>

//                 {/* Mega dropdown */}
//                 <div className="invisible absolute left-1/2 -translate-x-1/2 top-full mt-2 w-72 opacity-0 translate-y-2 transition-all duration-200 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0">
//                   {/* Arrow */}
//                   <div className="mx-auto mb-1 w-2 h-2 rotate-45 bg-ink-soft border-l border-t border-paper-line/15 ml-[132px]" />
//                   <div className="border border-paper-line/15 bg-ink-soft/95 backdrop-blur-sm p-2 shadow-2xl">
//                     <div className="grid grid-cols-2 gap-px bg-paper-line/10">
//                       {galleryCategories.map((c) => (
//                         <Link
//                           key={c.id}
//                           to={`/gallery?category=${c.id}`}
//                           className="bg-ink-soft px-3 py-2.5 text-xs text-paper/70 hover:bg-ink hover:text-brass-bright transition-colors"
//                         >
//                           {c.label}
//                         </Link>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ) : (
//               <NavLink
//                 key={item.path}
//                 to={item.path}
//                 className={({ isActive }) =>
//                   `relative px-4 py-2 text-sm tracking-wide transition-colors group ${
//                     isActive ? 'text-brass-bright' : 'text-paper/70 hover:text-paper'
//                   }`
//                 }
//               >
//                 {({ isActive }) => (
//                   <>
//                     {item.label}
//                     <span
//                       className={`absolute bottom-0 left-4 right-4 h-px bg-brass-bright transition-all duration-300 ${
//                         isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-40'
//                       }`}
//                     />
//                   </>
//                 )}
//               </NavLink>
//             )
//           )}
//         </nav>

//         {/* ── Desktop CTA ── */}
//         <div className="hidden lg:flex items-center gap-3">
//           {/* <a
//             href={`https://wa.me/${studio.whatsapp}`}
//             target="_blank"
//             rel="noreferrer"
//             className="flex items-center gap-2 px-4 py-2 text-xs font-data tracking-widest2 uppercase text-paper/60 hover:text-[#25D366] border border-transparent hover:border-[#25D366]/30 transition-all duration-200"
//           >
//             <svg width="14" height="14" viewBox="0 0 32 32" fill="currentColor">
//               <path d="M16 .5C7.439.5.5 7.439.5 16c0 2.777.726 5.445 2.103 7.788L.5 31.5l7.93-2.078A15.432 15.432 0 0 0 16 31.5C24.561 31.5 31.5 24.561 31.5 16S24.561.5 16 .5zm7.23 22.43c-.396-.198-2.344-1.156-2.708-1.288-.363-.132-.628-.198-.892.198-.264.396-1.023 1.288-1.254 1.552-.231.264-.462.297-.858.099-.396-.198-1.672-.616-3.185-1.965-1.177-1.05-1.972-2.347-2.203-2.743-.231-.396-.025-.61.173-.807.178-.177.396-.462.594-.693.198-.231.264-.396.396-.66.132-.264.066-.495-.033-.693-.099-.198-.892-2.15-1.222-2.944-.322-.773-.649-.668-.892-.68l-.759-.013c-.264 0-.693.099-1.057.495-.363.396-1.386 1.354-1.386 3.302s1.419 3.828 1.617 4.092c.198.264 2.793 4.263 6.766 5.979.946.408 1.683.652 2.258.835.949.302 1.813.259 2.496.157.761-.113 2.344-.958 2.675-1.883.33-.924.33-1.717.231-1.883-.099-.165-.363-.264-.759-.462z"/>
//             </svg>
//             WhatsApp
//           </a> */}
//           <Button to="/contact" variant="primary">
//             Book Appointment
//           </Button>
//         </div>

//         {/* ── Mobile Hamburger ── */}
//         <button
//           className="lg:hidden relative w-10 h-10 flex flex-col items-center justify-center gap-1.5"
//           onClick={() => setOpen((v) => !v)}
//           aria-label={open ? 'Close menu' : 'Open menu'}
//         >
//           <span className={`block h-px w-6 bg-paper transition-all duration-300 ${open ? 'rotate-45 translate-y-[3.5px]' : ''}`} />
//           <span className={`block h-px bg-paper transition-all duration-300 ${open ? 'w-0 opacity-0' : 'w-4'}`} />
//           <span className={`block h-px w-6 bg-paper transition-all duration-300 ${open ? '-rotate-45 -translate-y-[3.5px]' : ''}`} />
//         </button>
//       </div>

//       {/* ── Mobile Menu ── */}
//       <div
//         className={`lg:hidden overflow-hidden transition-all duration-500 ${
//           open ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
//         }`}
//       >
//         <div className="border-t border-paper-line/10 bg-ink/98 backdrop-blur-md px-6 pb-10 pt-6">

//           {/* Nav links */}
//           <nav className="flex flex-col">
//             {navigation.map((item, i) => (
//               <NavLink
//                 key={item.path}
//                 to={item.path}
//                 onClick={() => setOpen(false)}
//                 style={{ transitionDelay: open ? `${i * 40}ms` : '0ms' }}
//                 className={({ isActive }) =>
//                   `flex items-center justify-between py-4 border-b border-paper-line/10 text-base transition-all duration-300 ${
//                     open ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
//                   } ${isActive ? 'text-brass-bright' : 'text-paper/80'}`
//                 }
//               >
//                 {item.label}
//                 {item.label === 'Gallery' && (
//                   <ChevronDown size={14} className="opacity-40" />
//                 )}
//               </NavLink>
//             ))}
//           </nav>

//           {/* Mobile CTAs */}
//           <div className="mt-8 flex flex-col gap-3">
//             <Button to="/contact" variant="primary" onClick={() => setOpen(false)}>
//               Book Appointment
//             </Button>
//             {/* <a
//               href={`https://wa.me/${studio.whatsapp}`}
//               target="_blank"
//               rel="noreferrer"
//               className="flex items-center justify-center gap-2 py-4 border border-[#25D366]/40 text-[#25D366] font-data text-[11px] tracking-widest2 uppercase"
//             >
//               <svg width="14" height="14" viewBox="0 0 32 32" fill="currentColor">
//                 <path d="M16 .5C7.439.5.5 7.439.5 16c0 2.777.726 5.445 2.103 7.788L.5 31.5l7.93-2.078A15.432 15.432 0 0 0 16 31.5C24.561 31.5 31.5 24.561 31.5 16S24.561.5 16 .5zm7.23 22.43c-.396-.198-2.344-1.156-2.708-1.288-.363-.132-.628-.198-.892.198-.264.396-1.023 1.288-1.254 1.552-.231.264-.462.297-.858.099-.396-.198-1.672-.616-3.185-1.965-1.177-1.05-1.972-2.347-2.203-2.743-.231-.396-.025-.61.173-.807.178-.177.396-.462.594-.693.198-.231.264-.396.396-.66.132-.264.066-.495-.033-.693-.099-.198-.892-2.15-1.222-2.944-.322-.773-.649-.668-.892-.68l-.759-.013c-.264 0-.693.099-1.057.495-.363.396-1.386 1.354-1.386 3.302s1.419 3.828 1.617 4.092c.198.264 2.793 4.263 6.766 5.979.946.408 1.683.652 2.258.835.949.302 1.813.259 2.496.157.761-.113 2.344-.958 2.675-1.883.33-.924.33-1.717.231-1.883-.099-.165-.363-.264-.759-.462z"/>
//               </svg>
//               WhatsApp Us
//             </a> */}
//           </div>

//           {/* Bottom tagline */}
//           <p className="mt-8 text-center font-data text-[10px] tracking-widest2 uppercase text-muted">
//             India&apos;s First Destiny Tattoo Consultant
//           </p>
//         </div>
//       </div>
//     </header>
//   );
// }


// import React, { useState } from 'react';
// import { Link, NavLink } from 'react-router-dom';
// import { Menu, X, ChevronDown } from 'lucide-react';
// import { navigation, studio, galleryCategories } from '../data/siteData.js';
// import Button from './Button.jsx';

// export default function Navbar() {
//   const [open, setOpen] = useState(false);

//   return (
//     <header className="sticky top-0 z-40 bg-ink/90 backdrop-blur border-b border-paper-line/10">
//       <div className="container-site flex h-20 items-center justify-between">
//         <Link to="/" className="font-display text-xl tracking-wide" onClick={() => setOpen(false)}>
//           9Ex <span className="text-brass-bright">Tattoo</span>
//         </Link>

//         <nav className="hidden lg:flex items-center gap-8">
//           {navigation.map((item) =>
//             item.label === 'Gallery' ? (
//               <div key={item.path} className="group relative">
//                 <NavLink
//                   to={item.path}
//                   className={({ isActive }) =>
//                     `flex items-center gap-1 text-sm tracking-wide transition-colors ${
//                       isActive ? 'text-brass-bright' : 'text-paper/85 hover:text-brass-bright'
//                     }`
//                   }
//                 >
//                   {item.label}
//                   <ChevronDown size={14} className="opacity-60" />
//                 </NavLink>
//                 <div className="invisible absolute left-0 top-full w-64 translate-y-2 border border-paper-line/15 bg-ink-soft p-3 opacity-0 shadow-xl transition-all duration-150 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
//                   {galleryCategories.map((c) => (
//                     <Link
//                       key={c.id}
//                       to={`/gallery?category=${c.id}`}
//                       className="block px-3 py-2 text-sm text-paper/80 hover:bg-ink hover:text-brass-bright"
//                     >
//                       {c.label}
//                     </Link>
//                   ))}
//                 </div>
//               </div>
//             ) : (
//               <NavLink
//                 key={item.path}
//                 to={item.path}
//                 className={({ isActive }) =>
//                   `text-sm tracking-wide transition-colors ${
//                     isActive ? 'text-brass-bright' : 'text-paper/85 hover:text-brass-bright'
//                   }`
//                 }
//               >
//                 {item.label}
//               </NavLink>
//             )
//           )}
//         </nav>

//         <div className="hidden lg:block">
//           <Button to="/contact" variant="primary">
//             Book Appointment
//           </Button>
//         </div>

//         <button
//           className="lg:hidden text-paper"
//           onClick={() => setOpen((v) => !v)}
//           aria-label={open ? 'Close menu' : 'Open menu'}
//           aria-expanded={open}
//         >
//           {open ? <X size={26} /> : <Menu size={26} />}
//         </button>
//       </div>

//       {open && (
//         <div className="lg:hidden border-t border-paper-line/10 bg-ink px-6 pb-8 pt-4">
//           <nav className="flex flex-col gap-1">
//             {navigation.map((item) => (
//               <NavLink
//                 key={item.path}
//                 to={item.path}
//                 onClick={() => setOpen(false)}
//                 className={({ isActive }) =>
//                   `py-3 border-b border-paper-line/10 text-base ${
//                     isActive ? 'text-brass-bright' : 'text-paper/85'
//                   }`
//                 }
//               >
//                 {item.label}
//               </NavLink>
//             ))}
//           </nav>
//           <div className="mt-6 flex flex-col gap-3">
//             <Button to="/contact" variant="primary" onClick={() => setOpen(false)}>
//               Book Appointment
//             </Button>
//             <Button href={`https://wa.me/${studio.whatsapp}`} variant="outline">
//               WhatsApp Us
//             </Button>
//           </div>
//         </div>
//       )}
//     </header>
//   );
// }
