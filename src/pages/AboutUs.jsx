import React from 'react';
import SectionEyebrow from '../components/SectionEyebrow.jsx';
import ImagePlaceholder from '../components/ImagePlaceholder.jsx';
import Button from '../components/Button.jsx';
import { studio, studioLocations, milestones } from '../data/siteData.js';

const team = [
  { name: 'Shashikant Shelar', role: 'Founder & Lead Artist' },
  { name: 'Studio Artist', role: 'Realistic & Portrait Work' },
  { name: 'Studio Artist', role: 'Mandala & Fine Line' },
  { name: 'Consultant', role: 'Destiny Report & Numerology' },
];

export default function AboutUs() {
  return (
    <div>
      <section className="container-site py-20">
        <SectionEyebrow>About Us</SectionEyebrow>
        <h1 className="mt-4 max-w-2xl font-display text-4xl md:text-5xl">
          The story of {studio.name}
        </h1>
        <p className="mt-5 max-w-2xl text-paper/70 leading-relaxed">
          What began as a single chair in Thane grew into four studios across Mumbai and
          Bangalore, built on one idea: a tattoo should mean something specific to the person
          wearing it. That idea became the Destiny Tattoo Consultation — now the studio&apos;s
          signature offering.
        </p>

        <div className="mt-16 grid grid-cols-2 gap-6 sm:grid-cols-4">
          {milestones.map((m) => (
            <div key={m.label}>
              <p className="font-display text-3xl text-brass-bright">{m.n}</p>
              <p className="mt-1 text-xs text-muted leading-snug">{m.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Founder */}
      <section className="border-y border-paper-line/10 bg-paper text-ink">
        <div className="container-site grid gap-12 py-20 md:grid-cols-2 md:items-center">
          <ImagePlaceholder label="Founder Portrait — Shashikant Shelar" tone="paper" ratio="aspect-[3/4]" />
          <div>
            <SectionEyebrow index="01">
              <span className="text-blood">Founder</span>
            </SectionEyebrow>
            <h2 className="mt-4 font-display text-3xl">{studio.founder}</h2>
            <p className="mt-1 text-sm text-ink/60">{studio.founderTitle}</p>
            <p className="mt-6 leading-relaxed text-ink/75 max-w-md">
              Fifteen years into tattooing, Shashikant began pairing client consultations with
              numerology and astrology readings — initially as a way to settle on meaningful
              placements and symbols. Client response turned it into a structured offering, and
              eventually the studio&apos;s identity: India&apos;s first Destiny Tattoo Consultant.
            </p>
            <Button to="/contact" variant="primary" className="mt-8">
              Book Consultation
            </Button>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="container-site py-20">
        <div className="grid gap-10 md:grid-cols-2">
          <div className="border border-paper-line/10 p-8">
            <SectionEyebrow index="02">Mission</SectionEyebrow>
            <p className="mt-5 font-display text-2xl leading-snug">
              Every tattoo should be earned through understanding, not picked off a wall.
            </p>
          </div>
          <div className="border border-paper-line/10 p-8">
            <SectionEyebrow index="03">Vision</SectionEyebrow>
            <p className="mt-5 font-display text-2xl leading-snug">
              To make personalised, story-led tattooing the standard, not the exception, across
              India.
            </p>
          </div>
        </div>
      </section>

      {/* Locations */}
      <section className="border-y border-paper-line/10 bg-ink-soft">
        <div className="container-site py-20">
          <SectionEyebrow index="04">Studio Locations</SectionEyebrow>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {studioLocations.map((loc) => (
              <div key={loc.city} className="border border-paper-line/10 p-6">
                <p className="font-display text-xl">{loc.city}</p>
                <p className="mt-2 text-xs text-paper/60 leading-relaxed">{loc.address}</p>
                <p className="mt-2 text-xs text-paper/60">{loc.hours}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="container-site py-20">
        <SectionEyebrow index="05">Team</SectionEyebrow>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member) => (
            <div key={member.name + member.role}>
              <ImagePlaceholder label={member.role} ratio="aspect-square" />
              <p className="mt-3 font-display text-lg">{member.name}</p>
              <p className="text-xs text-muted">{member.role}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
