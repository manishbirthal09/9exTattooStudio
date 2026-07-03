import React from 'react';
import { Star, Play } from 'lucide-react';
import SectionEyebrow from '../components/SectionEyebrow.jsx';
import ImagePlaceholder from '../components/ImagePlaceholder.jsx';
import { testimonials } from '../data/siteData.js';

const googleReviews = [
  { name: 'Priya N.', rating: 5, text: 'Booked a destiny consultation on a whim, ended up getting two pieces done over the year.' },
  { name: 'Arjun K.', rating: 5, text: 'Cover-up work is genuinely some of the best I have seen in Mumbai.' },
  { name: 'Meera S.', rating: 4, text: 'Report took a few days longer than expected but the design was worth the wait.' },
];

const beforeAfter = [
  { title: 'Faded Tribal → Realistic Sleeve Cover-Up' },
  { title: 'Blank Forearm → Destiny Symbol Composition' },
  { title: 'Old Name Tattoo → Mandala Rework' },
];

export default function Testimonials() {
  return (
    <div>
      <section className="container-site py-20">
        <SectionEyebrow>Testimonials</SectionEyebrow>
        <h1 className="mt-4 max-w-2xl font-display text-4xl md:text-5xl">What clients say</h1>
      </section>

      {/* Video testimonials */}
      <section className="container-site pb-20">
        <SectionEyebrow index="01">Video Testimonials</SectionEyebrow>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.slice(0, 3).map((t) => (
            <div key={t.name} className="relative">
              <ImagePlaceholder label={`${t.name} — Video Testimonial`} ratio="aspect-video" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brass text-ink">
                  <Play size={18} fill="currentColor" />
                </span>
              </div>
              <p className="mt-3 font-display text-base">{t.name}</p>
              <p className="text-xs text-muted">{t.location}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Live client feedback */}
      <section className="border-y border-paper-line/10 bg-ink-soft">
        <div className="container-site py-20">
          <SectionEyebrow index="02">Live Client Feedback</SectionEyebrow>
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
        </div>
      </section>

      {/* Google reviews widget */}
      <section className="container-site py-20">
        <SectionEyebrow index="03">Google Reviews</SectionEyebrow>
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {googleReviews.map((r) => (
            <div key={r.name} className="border border-paper-line/10 p-6">
              <div className="flex gap-1 text-brass-bright">
                {Array.from({ length: r.rating }).map((_, i) => (
                  <Star key={i} size={13} fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              <p className="mt-3 text-sm text-paper/75 leading-relaxed">{r.text}</p>
              <p className="mt-4 text-xs text-muted">{r.name} · Google Review</p>
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs text-muted">Live Google Reviews widget connects here via Google Places API.</p>
      </section>

      {/* Before & After */}
      <section className="border-y border-paper-line/10 bg-paper text-ink">
        <div className="container-site py-20">
          <SectionEyebrow index="04">
            <span className="text-blood">Before &amp; After Stories</span>
          </SectionEyebrow>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {beforeAfter.map((b) => (
              <div key={b.title}>
                <div className="grid grid-cols-2 gap-1">
                  <ImagePlaceholder label="Before" tone="paper" ratio="aspect-square" />
                  <ImagePlaceholder label="After" tone="paper" ratio="aspect-square" />
                </div>
                <p className="mt-3 text-sm">{b.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
