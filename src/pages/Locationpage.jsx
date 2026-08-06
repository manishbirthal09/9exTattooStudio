import { useParams, Navigate } from "react-router-dom";
import { studioLocations } from "../data/StudioLocations.js";
import Home from "./Home.jsx";

export default function LocationPage() {
  const { slug } = useParams();
  const loc = studioLocations.find((l) => l.slug === slug);

  // Unknown slug — send them home instead of a dead page.
  if (!loc) return <Navigate to="/" replace />;

  return <Home locationOverride={loc} />;
}

// import { useParams, Link, Navigate } from "react-router-dom";
// import { MapPin, Phone, Clock, Navigation as NavigationIcon } from "lucide-react";
// import { getLocationBySlug } from "../data/StudioLocations";
// // import StampBadge from "../components/StampBadge";
// import SectionEyebrow from "../components/SectionEyebrow"; // reuse existing eyebrow used across the site

// export default function LocationPage() {
//   const { slug } = useParams();
//   const loc = getLocationBySlug(slug);

//   // Bad/old slug — send them back to the locations grid instead of a dead page.
//   if (!loc) return <Navigate to="/#locations" replace />;

//   return (
//     <main className="bg-paper text-ink">
//       {/* ————————————————— HERO ————————————————— */}
//       <section className="relative w-full h-[70vh] min-h-[440px] overflow-hidden border-b border-ink/10">
//         <img
//           src={loc.heroImage}
//           alt={`Interior of the ${loc.city} studio`}
//           className="absolute inset-0 h-full w-full  object-top"
//         />
//         {/* Ink wash to keep text legible — no gradient-brand cliché, flat dark scrim */}
//         <div className="absolute inset-0 bg-ink/55" />

//         <div className="relative z-10 h-full container-site flex flex-col justify-end pb-12">
//           <Link
//             to="/#locations"
//             className="font-data text-[11px] tracking-widest2 uppercase text-paper/60 hover:text-blood transition-colors mb-6 w-fit"
//           >
//             ← All Locations
//           </Link>

//           <SectionEyebrow index="LOC">
//             <span className="text-blood">Studio Location</span>
//           </SectionEyebrow>

//           <h1 className="mt-4 font-display text-5xl md:text-7xl text-paper leading-[0.95] max-w-2xl">
//             {loc.city}
//           </h1>
//         </div>

//         {/* Signature element — verification stamp, hero corner */}
//         {/* <StampBadge
//           topText="EST. LOCATION"
//           bottomText={loc.city.split(",")[0].toUpperCase()}
//           rotate={-8}
//           tone="outline"
//           className="absolute top-8 right-6 md:right-12 z-10 drop-shadow-sm"
//         /> */}
//       </section>

//       {/* ————————————————— QUICK INFO BAR ————————————————— */}
//       <section className="border-b border-ink/10 bg-white">
//         <div className="container-site grid grid-cols-2 lg:grid-cols-4 divide-x divide-y divide-ink/10 lg:divide-y-0">
//           {/* Address */}
//           <div className="p-6 flex flex-col gap-2">
//             <span className="flex items-center gap-1.5 font-data text-[10px] tracking-widest2 uppercase text-ink/40">
//               <MapPin size={13} className="text-blood/60" />
//               Address
//             </span>
//             <p className="text-sm text-ink/70 leading-relaxed">{loc.address}</p>
//           </div>

//           {/* Phone */}
//           <div className="p-6 flex flex-col gap-2">
//             <span className="flex items-center gap-1.5 font-data text-[10px] tracking-widest2 uppercase text-ink/40">
//               <Phone size={13} className="text-blood/60" />
//               Phone
//             </span>
//             <a
//               href={`tel:${loc.phone.replace(/\s/g, "")}`}
//               className="text-sm text-ink/70 hover:text-blood transition-colors w-fit"
//             >
//               {loc.phone}
//             </a>
//           </div>

//           {/* Hours */}
//           <div className="p-6 flex flex-col gap-2">
//             <span className="flex items-center gap-1.5 font-data text-[10px] tracking-widest2 uppercase text-ink/40">
//               <Clock size={13} className="text-blood/60" />
//               Hours
//             </span>
//             <div className="flex items-center gap-1.5">
//               <span
//                 className={`h-1.5 w-1.5 rounded-full shrink-0 ${
//                   loc.isOpenNow ? "bg-green-500/70" : "bg-ink/25"
//                 }`}
//               />
//               <p className="text-sm text-ink/70">{loc.hours}</p>
//             </div>
//           </div>

//           {/* Directions */}
//           <div className="p-6 flex flex-col justify-between gap-2">
//             <span className="flex items-center gap-1.5 font-data text-[10px] tracking-widest2 uppercase text-ink/40">
//               <NavigationIcon size={13} className="text-blood/60" />
//               Directions
//             </span>
//             <a
//               href={loc.directionsUrl}
//               target="_blank"
//               rel="noreferrer"
//               className="text-sm font-data uppercase tracking-wide text-ink hover:text-blood transition-colors w-fit border-b border-ink/20 hover:border-blood/60 pb-0.5"
//             >
//               Get Directions →
//             </a>
//           </div>
//         </div>
//       </section>

//       {/* ————————————————— MAP ————————————————— */}
//       <section className="relative w-full aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9] border-b border-ink/10 bg-ink/[0.03] overflow-hidden">
//         <iframe
//           src={loc.mapEmbedUrl}
//           className="absolute inset-0 h-full w-full grayscale-[15%] contrast-[1.05]"
//           style={{ border: 0 }}
//           allowFullScreen=""
//           loading="lazy"
//           referrerPolicy="strict-origin-when-cross-origin"
//           title={`Map to ${loc.city} studio`}
//         />

//         {/* Corner crop-marks — stencil-transfer registration marks, not decoration */}
//         {["top-4 left-4", "top-4 right-4", "bottom-4 left-4", "bottom-4 right-4"].map(
//           (pos) => (
//             <div
//               key={pos}
//               className={`absolute ${pos} pointer-events-none z-10 h-5 w-5 border-ink/25`}
//               style={{
//                 borderTopWidth: pos.includes("top") ? "1.5px" : 0,
//                 borderBottomWidth: pos.includes("bottom") ? "1.5px" : 0,
//                 borderLeftWidth: pos.includes("left") ? "1.5px" : 0,
//                 borderRightWidth: pos.includes("right") ? "1.5px" : 0,
//               }}
//             />
//           )
//         )}
//       </section>

//       {/* ————————————————— BOOK APPOINTMENT CTA ————————————————— */}
//       <section className="relative bg-ink text-paper overflow-hidden">
//         <div className="container-site py-20 flex flex-col md:flex-row items-center justify-between gap-10">
//           <div className="max-w-lg">
//             <SectionEyebrow index="NEXT">
//               <span className="text-blood">Ready When You Are</span>
//             </SectionEyebrow>
//             <h2 className="mt-4 font-display text-3xl md:text-4xl text-paper leading-tight">
//               Book your session at {loc.city.split(",")[0]}
//             </h2>
//             <p className="mt-3 text-sm text-paper/50">
//               Walk-ins welcome · Appointments preferred for custom pieces
//             </p>
//           </div>

//           <div className="flex flex-col items-center gap-4 shrink-0">
//             <a
//               href={`https://wa.me/${loc.phone.replace(/[^\d]/g, "")}?text=Hi! I'd like to book an appointment at your ${loc.city} studio.`}
//               target="_blank"
//               rel="noreferrer"
//               className="inline-flex items-center gap-2 bg-blood text-paper font-data text-sm tracking-wide uppercase px-8 py-4 hover:bg-blood/85 transition-colors"
//             >
//               Book Appointment
//             </a>
//           </div>
//         </div>

//         {/* Signature element, reprised — the "confirmed" rhyme to the hero's "verified" */}
//         {/* <StampBadge
//           topText="WALK-INS"
//           bottomText="OK"
//           rotate={6}
//           tone="solid"
//           className="absolute -bottom-6 left-4 md:left-12 opacity-80"
//         /> */}
//       </section>
//     </main>
//   );
// }