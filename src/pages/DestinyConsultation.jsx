import React from 'react';
import { FileText, Video, Sparkles, ShieldCheck } from 'lucide-react';
import SectionEyebrow from '../components/SectionEyebrow.jsx';
import ImagePlaceholder from '../components/ImagePlaceholder.jsx';
import Button from '../components/Button.jsx';
import DestinyWheel from '../components/DestinyWheel.jsx';
import AppointmentForm from '../components/AppointmentForm.jsx';
import { consultationSteps, consultationDeliverables, testimonials, newsFeatures } from '../data/siteData.js';

const benefits = [
  {
    icon: Sparkles,
    title: 'Personal, not generic',
    body: 'Symbols are chosen for your chart and story, not pulled from a flash-sheet of popular designs.',
  },
  {
    icon: FileText,
    title: 'A written record',
    body: 'The Destiny Report documents why each element was recommended — something to keep beyond the tattoo itself.',
  },
  {
    icon: Video,
    title: 'A real conversation',
    body: 'A video consultation before design work, so nothing is locked in without your input.',
  },
  {
    icon: ShieldCheck,
    title: 'Confidential by default',
    body: 'Birth and personal details are used only to prepare your report and never shared further.',
  },
];

export default function DestinyConsultation() {
  return (
    <div>
      <section className="relative overflow-hidden border-b border-paper-line/10 ink-texture">
        <div className="pointer-events-none absolute -right-40 -top-20 opacity-15 lg:opacity-25">
          <DestinyWheel size={460} />
        </div>
        <div className="container-site relative py-20 md:py-28">
          <SectionEyebrow>Destiny Tattoo Consultation</SectionEyebrow>
          <h1 className="mt-4 max-w-2xl font-display text-4xl md:text-5xl">
            What is a Destiny Tattoo?
          </h1>
          <p className="mt-5 max-w-xl text-paper/70 leading-relaxed">
            A Destiny Tattoo is designed from a reading of your numerology, astrology and personal
            story — not chosen from a catalogue. The result is documented in a written report
            before any ink is involved, so the symbol means something specific to you.
          </p>
          <Button to="/contact" variant="primary" className="mt-8">
            Book Consultation
          </Button>
        </div>
      </section>

      {/* Benefits */}
      <section className="container-site py-20">
        <SectionEyebrow index="01">Benefits</SectionEyebrow>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((b) => (
            <div key={b.title} className="border border-paper-line/10 p-6">
              <b.icon className="text-brass-bright" size={22} />
              <p className="mt-4 font-display text-lg">{b.title}</p>
              <p className="mt-2 text-sm text-paper/65 leading-relaxed">{b.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="border-y border-paper-line/10 bg-ink-soft">
        <div className="container-site py-20">
          <SectionEyebrow index="02">Consultation Process — How It Works</SectionEyebrow>
          <div className="mt-12 grid gap-px overflow-hidden border border-paper-line/10 bg-paper-line/10 md:grid-cols-5">
            {consultationSteps.map((s) => (
              <div key={s.n} className="bg-ink-soft p-6">
                <p className="font-data text-sm text-brass">{s.n}</p>
                <p className="mt-3 font-display text-base leading-snug">{s.title}</p>
                <p className="mt-2 text-xs text-paper/60 leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sample report / PDF analysis */}
      <section className="container-site py-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionEyebrow index="03">Sample Reports &amp; PDF Analysis</SectionEyebrow>
            <h2 className="mt-4 font-display text-3xl">Every recommendation, written down.</h2>
            <p className="mt-4 text-paper/65 leading-relaxed max-w-md">
              Your Destiny Report arrives as a PDF: the numerology breakdown, the symbols
              considered, and the final recommendation with reasoning — something you can revisit
              before your studio appointment.
            </p>
            <ul className="mt-6 space-y-3">
              {consultationDeliverables.map((d) => (
                <li key={d} className="flex items-center gap-3 text-sm text-paper/80">
                  <span className="h-1.5 w-1.5 bg-brass-bright" />
                  {d}
                </li>
              ))}
            </ul>
          </div>
          <ImagePlaceholder label="Sample Destiny Report — PDF Preview" ratio="aspect-[3/4]" />
        </div>
      </section>

      {/* Video consultation */}
      <section className="border-y border-paper-line/10 bg-paper text-ink">
        <div className="container-site grid gap-12 py-20 md:grid-cols-2 md:items-center">
          <ImagePlaceholder label="Video Consultation Preview" tone="paper" ratio="aspect-video" />
          <div>
            <SectionEyebrow index="04">
              <span className="text-blood">Video Consultation</span>
            </SectionEyebrow>
            <h2 className="mt-4 font-display text-3xl">A face-to-face walkthrough of your report</h2>
            <p className="mt-4 text-ink/70 leading-relaxed max-w-md">
              Once your report is ready, a consultant walks you through it on a video call —
              explaining the reasoning, answering questions, and adjusting direction before any
              design begins.
            </p>
          </div>
        </div>
      </section>

      {/* Success stories */}
      <section className="container-site py-20">
        <SectionEyebrow index="05">Client Success Stories</SectionEyebrow>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {testimonials.map((t) => (
            <div key={t.name} className="border border-paper-line/10 p-7">
              <p className="text-sm leading-relaxed text-paper/80">&ldquo;{t.quote}&rdquo;</p>
              <p className="mt-5 font-display text-base">{t.name}</p>
              <p className="text-xs text-muted">
                {t.location} · {t.type}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* News features */}
      <section className="border-y border-paper-line/10 bg-ink-soft">
        <div className="container-site py-20">
          <SectionEyebrow index="06">News Features</SectionEyebrow>
          <div className="mt-10 grid gap-px overflow-hidden border border-paper-line/10 bg-paper-line/10 sm:grid-cols-2 lg:grid-cols-4">
            {newsFeatures.map((n) => (
              <div key={n.outlet} className="bg-ink-soft p-6">
                <p className="font-display text-lg text-brass-bright">{n.outlet}</p>
                <p className="mt-2 text-sm text-paper/70 leading-relaxed">{n.headline}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Book */}
      <section className="container-site py-20" id="book">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionEyebrow index="07">Book Consultation</SectionEyebrow>
            <h2 className="mt-4 font-display text-3xl">Start with a short intake form</h2>
            <p className="mt-4 text-paper/65 leading-relaxed max-w-sm">
              Submit your details and a consultant will reach out to schedule your video
              consultation and begin your Destiny Report.
            </p>
          </div>
          <AppointmentForm title="" />
        </div>
      </section>
    </div>
  );
}
