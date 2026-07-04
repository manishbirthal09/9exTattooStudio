import React from 'react';
import { Award } from 'lucide-react';
import SectionEyebrow from '../components/SectionEyebrow.jsx';
import ImagePlaceholder from '../components/ImagePlaceholder.jsx';
import { achievements, newsFeatures, milestones } from '../data/siteData.js';
import Button from '../components/Button.jsx';
const certifications = [
  'Certified Tattoo Hygiene & Sterilisation Practices',
  'Bloodborne Pathogens Safety Certification',
  'Member, Tattoo Artists Guild of India',
];

export default function Achievements() {
  return (
    <div>
      <section className="container-site py-20">
        <SectionEyebrow>Achievements</SectionEyebrow>
        <h1 className="mt-4 max-w-2xl font-display text-4xl md:text-5xl">
          Milestones along the way
        </h1>

        <div className="mt-16 grid grid-cols-2 gap-6 sm:grid-cols-4">
          {milestones.map((m) => (
            <div key={m.label}>
              <p className="font-display text-3xl text-brass-bright">{m.n}</p>
              <p className="mt-1 text-xs text-muted leading-snug">{m.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Awards / timeline — chronological, so a numbered/year timeline is meaningful here */}
      <section className="border-y border-paper-line/10 bg-ink-soft">
        <div className="container-site py-20">
          <SectionEyebrow index="01">Awards &amp; Milestones</SectionEyebrow>
          <div className="mt-12 space-y-px bg-paper-line/10 border border-paper-line/10">
            {achievements.map((a) => (
              <div key={a.title} className="flex flex-col gap-2 bg-ink-soft p-6 sm:flex-row sm:items-start sm:gap-8">
                <p className="font-data text-sm text-brass w-16 shrink-0">{a.year}</p>
                <div>
                  <div className="flex items-center gap-2">
                    <Award size={16} className="text-brass-bright" />
                    <p className="font-display text-lg">{a.title}</p>
                  </div>
                  <p className="mt-1 text-sm text-paper/65 leading-relaxed">{a.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Media coverage */}
      <section className="container-site py-24">
        <SectionEyebrow index="03">As Featured In</SectionEyebrow>
      
        <div className="mt-10 flex flex-wrap justify-center gap-6  ">
          {newsFeatures.map((n) => (
            <a
              key={n.outlet}
              href={n.link}
              target="_blank"
              rel="noreferrer"
              className="group block w-[300px] gap-3 p-6 bg-ink hover:bg-ink-soft transition-colors duration-150 no-underline"
            >
              {/* Outlet badge + arrow */}
              <div className="flex items-center justify-between">
                <span className="text-[10px] mb-3 font-medium tracking-widest uppercase text-paper/50 bg-ink-soft px-3 py-1 rounded-full border border-paper-line/10">
                  {n.outlet}
                </span>
                <div className="w-7 h-7 mb-3 rounded-full border border-paper-line/20 group-hover:border-brass/60 flex items-center justify-center transition-colors duration-150">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4M9.5 2.5V8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="text-paper/40 group-hover:text-brass transition-colors"/>
                  </svg>
                </div>
              </div>
      
              {/* Image */}
              <div className="w-full mb-3 aspect-video rounded-md overflow-hidden bg-ink-soft">
                {n.image ? (
                  <img
                    src={n.image}
                    alt={n.outlet}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center text-paper/20">
                    {/* placeholder icon */}
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                      <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>
                    </svg>
                  </div>
                )}
              </div>
      
              {/* Headline */}
              <p className="text-sm font-medium text-paper/80 leading-relaxed group-hover:text-paper transition-colors flex-1">
                {n.headline}
              </p>
      
              {/* Meta */}
              {/* <div className="flex items-center gap-2 text-[11px] text-paper/40">
                <span>{n.date}</span>
                {/* <span className="w-1 h-1 rounded-full bg-paper/30 inline-block"/> 
                {/* <span>Press Feature</span> 
              </div> */}
      
              {/* CTA */}
              <div className="flex items-center gap-1.5 text-[11px] font-medium text-paper/40 group-hover:text-brass/80 transition-colors pt-3 border-t border-paper-line/10">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/>
                </svg>
                Read full article
              </div>
            </a>
          ))}
        </div>
      
        
      </section>
      {/* <section className="container-site py-20">
        <SectionEyebrow index="02">News Features &amp; Media Coverage</SectionEyebrow>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {newsFeatures.map((n) => (
            <div key={n.outlet}>
              <ImagePlaceholder label={`${n.outlet} Feature`} ratio="aspect-video" />
              <p className="mt-3 font-display text-lg text-brass-bright">{n.outlet}</p>
              <p className="mt-1 text-sm text-paper/65 leading-relaxed">{n.headline}</p>
            </div>
          ))}
        </div>
      </section> */}

      {/* Certifications */}
      <section className="border-y border-paper-line/10 bg-paper text-ink">
        <div className="container-site py-20">
          <SectionEyebrow index="03">
            <span className="text-blood">Certifications</span>
          </SectionEyebrow>
          <ul className="mt-8 space-y-4">
            {certifications.map((c) => (
              <li key={c} className="flex items-center gap-3 text-sm">
                <span className="h-1.5 w-1.5 bg-blood" />
                {c}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
