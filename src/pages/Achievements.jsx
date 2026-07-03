import React from 'react';
import { Award } from 'lucide-react';
import SectionEyebrow from '../components/SectionEyebrow.jsx';
import ImagePlaceholder from '../components/ImagePlaceholder.jsx';
import { achievements, newsFeatures, milestones } from '../data/siteData.js';

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
      <section className="container-site py-20">
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
      </section>

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
