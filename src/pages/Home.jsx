import React from 'react';
import { useState } from 'react';
// ... existing imports
import { Star, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useRef } from 'react';

import Button from '../components/Button.jsx';
import SectionEyebrow from '../components/SectionEyebrow.jsx';
import ImagePlaceholder from '../components/ImagePlaceholder.jsx';
import DestinyWheel from '../components/DestinyWheel.jsx';
import {
  studio,
  featuredWork,
  newsFeatures,
  consultationSteps,
  consultationDeliverables,
  testimonials,
  studioLocations,
  milestones,
} from '../data/siteData.js';


function ConstellationCanvas() {
  const ref = useRef();
  const raf = useRef();

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const setSize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    setSize();

    let W = canvas.width;
    let H = canvas.height;

    const dots = Array.from({ length: 72 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.28,
      vy: (Math.random() - 0.5) * 0.28,
      r: Math.random() * 1.2 + 0.4,
    }));

    const draw = () => {
      W = canvas.width;
      H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const d = Math.hypot(dots[i].x - dots[j].x, dots[i].y - dots[j].y);
          if (d < 125) {
            ctx.beginPath();
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.strokeStyle = `rgba(201,168,76,${0.14 * (1 - d / 125)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      dots.forEach((d) => {
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(201,168,76,0.42)';
        ctx.fill();
        d.x += d.vx;
        d.y += d.vy;
        if (d.x < 0 || d.x > W) d.vx *= -1;
        if (d.y < 0 || d.y > H) d.vy *= -1;
      });

      raf.current = requestAnimationFrame(draw);
    };

    draw();

    const resize = () => {
      setSize();
    };

    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={ref} className="absolute inset-0 w-full h-full" />;
}
// function ConstellationCanvas() {
//   const ref = useRef();
//   const raf = useRef();
//   useEffect(() => {
//     const canvas = ref.current;
//     if (!canvas) return;
//     const ctx = canvas.getContext("2d");
//     let W = canvas.offsetWidth, H = canvas.offsetHeight;
//     canvas.width = W; canvas.height = H;
//     const dots = Array.from({ length: 72 }, () => ({
//       x: Math.random() * W, y: Math.random() * H,
//       vx: (Math.random() - .5) * .28, vy: (Math.random() - .5) * .28,
//       r: Math.random() * 1.2 + .4
//     }));
//     const draw = () => {
//       ctx.clearRect(0, 0, W, H);
//       for (let i = 0; i < dots.length; i++) {
//         for (let j = i + 1; j < dots.length; j++) {
//           const d = Math.hypot(dots[i].x - dots[j].x, dots[i].y - dots[j].y);
//           if (d < 125) {
//             ctx.beginPath(); ctx.moveTo(dots[i].x, dots[i].y); ctx.lineTo(dots[j].x, dots[j].y);
//             ctx.strokeStyle = `rgba(201,168,76,${.14 * (1 - d / 125)})`;
//             ctx.lineWidth = .5; ctx.stroke();
//           }
//         }
//       }
//       dots.forEach(d => {
//         ctx.beginPath(); ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
//         ctx.fillStyle = "rgba(201,168,76,0.42)"; ctx.fill();
//         d.x += d.vx; d.y += d.vy;
//         if (d.x < 0 || d.x > W) d.vx *= -1;
//         if (d.y < 0 || d.y > H) d.vy *= -1;
//       });
//       raf.current = requestAnimationFrame(draw);
//     };
//     draw();
//     const resize = () => { W = canvas.offsetWidth; H = canvas.offsetHeight; canvas.width = W; canvas.height = H; };
//     window.addEventListener("resize", resize);
//     return () => { cancelAnimationFrame(raf.current); window.removeEventListener("resize", resize); };
//   }, []);
//   return <canvas ref={ref} className="hero-canvas" />;
// }
export default function Home() {
  return (
    <div>

      {/* ── Hero ───────────────────────────────────────────── */}
<section className="relative overflow-hidden border-b border-paper-line/10 ink-texture min-h-[90vh] flex items-center">
  
  {/* Background Destiny Wheel */}
  <div className="pointer-events-none absolute inset-0 w-full h-full ">
    {/* <DestinyWheel size={700} /> */}
     <ConstellationCanvas />
  </div>

  {/* Radial glow center */}
  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(74,107,85,0.15),transparent)]" />
{/* Left side decorative */}
<div className="pointer-events-none absolute left-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-6 items-center">
  <div className="h-32 w-px bg-gradient-to-b from-transparent via-brass/40 to-transparent" />
  <p className="font-data text-[10px] tracking-widest2 uppercase text-brass/50 [writing-mode:vertical-rl]">
    Est. 2009 · Mumbai
  </p>
  <div className="h-32 w-px bg-gradient-to-b from-transparent via-brass/40 to-transparent" />
</div>
  <div className="container-site relative w-full py-24 md:py-32">
    <div className="flex flex-col items-center text-center">

      {/* Eyebrow */}
      <div className="flex items-center gap-3 mb-6">
        <span className="h-px w-12 bg-brass/50" />
        <span className="font-data text-[11px] tracking-widest2 uppercase text-brass-bright">
          9Ex Tattoo Studio
        </span>
        <span className="h-px w-12 bg-brass/50" />
      </div>

      {/* Headline */}
      <h1 className="font-display text-6xl leading-[1.02] sm:text-7xl md:text-8xl lg:text-[7.5rem] max-w-5xl tracking-tight">
        India&apos;s First
        <br />
        <span className="italic text-brass-bright">Destiny</span>
        {' '}Tattoo
        <br />
        Consultant.
      </h1>

      {/* Subheadline */}
      <p className="mt-8 max-w-xl text-paper/75 leading-relaxed text-base md:text-lg">
        Custom tattoos designed through personality, life goals,
        numerology, astrology and personal storytelling —
        read before they&apos;re drawn.
      </p>

      {/* CTAs */}
      <div className="mt-10 flex flex-col gap-4 sm:flex-row">
        <Button to="/contact" variant="primary">
          Book Appointment
        </Button>
        <Button to="/destiny-consultation" variant="outline">
          Talk To An Expert
        </Button>
      </div>

      {/* Divider */}
      <div className="mt-16 w-px h-12 bg-gradient-to-b from-brass/40 to-transparent" />

      {/* Milestones */}
      <div className="mt-16 grid grid-cols-2 gap-x-16 gap-y-8 sm:grid-cols-4">
        {milestones.map((m) => (
          <div key={m.label} className="text-center">
            <p className="font-display text-4xl md:text-5xl text-brass-bright">{m.n}</p>
            <p className="mt-2 text-xs text-muted leading-snug max-w-[100px] mx-auto">{m.label}</p>
          </div>
        ))}
      </div>

    </div>
  </div>
 
</section>
      {/* ── Hero ─────────────────────────────────────────────
      <section className="    relative overflow-hidden border-b border-paper-line/10 ink-texture">
        {/* <div className="pointer-events-none absolute right-[-180px] top-1/2 hidden -translate-y-1/2 opacity-25 lg:block">
          <DestinyWheel size={680} />
        </div> 

        <div className="container-site relative grid gap-10 py-24 md:py-32 lg:grid-cols-[1.1fr_0.9fr] lg:py-40">
          <div>
            <SectionEyebrow>9EX TATTOO</SectionEyebrow>
            <h1 className="mt-6 font-display text-4xl leading-[1.08] sm:text-5xl md:text-6xl">
              India&apos;s First
              <br />
               <span className="italic text-brass-bright">Destiny</span>Tattoo Consultant.
            </h1>
            <p className="mt-6 max-w-md text-paper/70 leading-relaxed">
              Custom tattoos designed through personality, life goals, numerology, astrology and
              personal storytelling — read before they&apos;re drawn.
            </p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Button to="/contact" variant="primary">
                Book Appointment
              </Button>
              <Button to="/destiny-consultation" variant="outline">
                Talk To An Expert
              </Button>
            </div>

            <div className="mt-16 grid grid-cols-2 gap-6 sm:grid-cols-4">
              {milestones.map((m) => (
                <div key={m.label}>
                  <p className="font-display text-2xl text-brass-bright">{m.n}</p>
                  <p className="mt-1 text-xs text-muted leading-snug">{m.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section> */}

      {/* ── Featured Work ──────────────────────────────────── */}
      <section className="container-site py-20">
        <div className="flex items-end justify-between gap-6">
          <div>
            <SectionEyebrow index="01">Featured Work</SectionEyebrow>
            <h2 className="mt-4 font-display text-3xl md:text-4xl">A small sample of recent pieces</h2>
          </div>
          <Button to="/gallery" variant="ghost" className="hidden sm:inline-flex">
            View Full Gallery →
          </Button>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
          {featuredWork.map((item) => (
            <ImagePlaceholder key={item.id} label={item.categoryLabel} />
          ))}
        </div>

        <Button to="/gallery" variant="outline" className="mt-8 sm:hidden">
          View Full Gallery
        </Button>
      </section>

      {/* ── Founder ────────────────────────────────────────── */}
      <section className="border-y border-ink/15 bg-paper text-ink">
        <div className="container-site grid gap-12 py-24 md:grid-cols-2 md:items-center">
          <ImagePlaceholder label="Founder Portrait — Shashikant Shelar" tone="paper" ratio="aspect-[2/3]" />
          <div>
            <SectionEyebrow index="02">
              <span className="text-blood">Founder</span>
            </SectionEyebrow>
            <h2 className="mt-4 font-display text-3xl md:text-4xl">{studio.founder}</h2>
            <p className="mt-1 font-data text-xs tracking-widest2 uppercase text-blood">{studio.founderTitle}</p>
            <p className="mt-6 max-w-md leading-relaxed text-ink/75">
              Fifteen years on the floor, thousands of tattoos created, and the format that gave
              the studio its name: reading a client&apos;s numerology and story before a single
              line is drawn.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button to="/about" variant="outline" className="!border-ink/30 !text-ink hover:!border-blood hover:!text-blood">
                Know More
              </Button>
              <Button to="/contact" variant="primary">
                Book Consultation
              </Button>
            </div>
          </div>
        </div>
      </section>

{/* ── News & Media ───────────────────────────────────── */}
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

  <Button to="/achievements" variant="ghost" className="mt-6">
    View All Media Coverage →
  </Button>
</section>

      {/* ── News & Media ─────────────────────────────────────
      <section className="container-site py-24">
  <SectionEyebrow index="03">As Featured In</SectionEyebrow>
  <div className="mt-10 flex flex-wrap justify-center gap-6">
    {newsFeatures.map((n) => (
      <a
        key={n.outlet}
        href={n.link}
        target="_blank"
        rel="noreferrer"
        className="group block w-[300px] border border-paper-line/10 overflow-hidden hover:border-brass/40 transition-colors duration-200"
      >
        <div className="aspect-video w-full overflow-hidden bg-ink-soft">
          <img
            src={n.image}
            alt={n.outlet}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="p-5">
          <p className="font-data text-[10px] tracking-widest2 uppercase text-brass-bright mb-2">
            {n.outlet}
          </p>
          <p className="text-sm text-paper/80 leading-relaxed group-hover:text-paper transition-colors">
            {n.headline}
          </p>
        </div>
      </a>
    ))}
  </div>
  <Button to="/achievements" variant="ghost" className="mt-6">
    View All Media Coverage →
  </Button>
</section> */}
{/* <section className="container-site py-24">
  <SectionEyebrow index="03">As Featured In</SectionEyebrow>
  <div className=" flex flex-wrapjustify-center align-middle mt-10  gap-6">
    {newsFeatures.map((n) => (
      <a
        key={n.outlet}
        
        href={n.link}
        target="_blank"
        rel="noreferrer"
        className="group w-[300px] block border border-paper-line/10 overflow-hidden hover:border-brass/40 transition-colors duration-200"
      >
        <div className="aspect-video w-full overflow-hidden bg-ink-soft">
          <img
            src={n.image}
            alt={n.outlet}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="p-5">
          <p className="font-data text-[10px] tracking-widest2 uppercase text-brass-bright mb-2">
            {n.outlet}
          </p>
          <p className="text-sm text-paper/80 leading-relaxed group-hover:text-paper transition-colors">
            {n.headline}
          </p>
        </div>
      </a>
    ))}
  </div>
  <Button to="/achievements" variant="ghost" className="mt-6">
    View All Media Coverage →
  </Button>
</section> */}

      {/* ── News & Media ─────────────────────────────────────
      <section className="container-site py-24">
        <SectionEyebrow index="03">As Featured In</SectionEyebrow>
        <div className="mt-10 grid gap-px overflow-hidden border border-paper-line/10 bg-paper-line/10 sm:grid-cols-2 lg:grid-cols-4">
          {newsFeatures.map((n) => (
            <div key={n.outlet} className="bg-ink p-6">
              <p className="font-display text-lg text-brass-bright">{n.outlet}</p>
              <p className="mt-2 text-sm text-paper/70 leading-relaxed">{n.headline}</p>
            </div>
          ))}
        </div>
        <Button to="/achievements" variant="ghost" className="mt-6">
          View All Media Coverage →
        </Button>
      </section> */}

      {/* ── Destiny Consultation explainer ───────────────────*/}
      {/* ── Destiny Consultation explainer ─────────────────── */}
<section className="relative border-y border-paper-line/10 bg-ink-soft overflow-hidden">

  {/* Background wheel */}
  <div className="pointer-events-none absolute -right-40 -bottom-40 opacity-[0.06]">
    <DestinyWheel size={500} animate={false} />
  </div>

  <div className="container-site py-28">

    {/* Header */}
    <div className="flex flex-col items-center text-center mb-20">
      <SectionEyebrow index="04">How A Destiny Tattoo Comes Together</SectionEyebrow>
      <h2 className="mt-5 font-display text-4xl md:text-5xl max-w-2xl leading-[1.08]">
        Five steps from your story to a{' '}
        <span className="italic text-brass-bright">blueprint</span> on skin.
      </h2>
    </div>

    {/* Steps — horizontal timeline */}
    <div className="relative">

      {/* Connecting line */}
      <div className="hidden lg:block absolute top-[2rem] left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-brass/30 to-transparent" />

      <ol className="grid gap-8 lg:grid-cols-5">
        {consultationSteps.map((s, i) => (
          <li key={s.n} className="relative flex flex-col items-center text-center group">

            {/* Step number circle */}
            <div className="relative mb-6 flex h-16 w-16 items-center justify-center border border-brass/30 bg-ink group-hover:border-brass group-hover:bg-ink-soft transition-all duration-300">
              <span className="font-data text-xs tracking-widest2 text-brass-bright">{s.n}</span>
              {/* Corner accents */}
              <span className="absolute -top-px -left-px w-2 h-2 border-t border-l border-brass-bright opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="absolute -bottom-px -right-px w-2 h-2 border-b border-r border-brass-bright opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            <p className="font-display text-base leading-snug mb-2">{s.title}</p>
            <p className="text-xs text-paper/50 leading-relaxed">{s.body}</p>

          </li>
        ))}
      </ol>
    </div>

    {/* Bottom panel */}
    <div className="mt-20 grid gap-0 lg:grid-cols-2 border border-paper-line/15 overflow-hidden">

      {/* Left — deliverables */}
      <div className="p-10 border-b lg:border-b-0 lg:border-r border-paper-line/15">
        <p className="eyebrow mb-8">What You Receive</p>
        <div className="grid grid-cols-2 gap-4">
          {consultationDeliverables.map((d, i) => (
            <div key={d} className="flex items-start gap-3 group">
              <div className="mt-1 h-4 w-4 shrink-0 border border-brass/30 flex items-center justify-center">
                <span className="h-1.5 w-1.5 bg-brass-bright" />
              </div>
              <span className="text-sm text-paper/70 leading-snug group-hover:text-paper transition-colors">
                {d}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Right — CTA panel */}
      <div className="relative p-10 bg-ink overflow-hidden flex flex-col justify-between">
        {/* Faint number watermark */}
        <span className="pointer-events-none absolute -right-4 -bottom-6 font-display text-[120px] leading-none text-brass/5 select-none">
          9
        </span>

        <div>
          <p className="font-display text-2xl md:text-3xl leading-snug mb-3">
            Ready to read your{' '}
            <span className="italic text-brass-bright">destiny</span>?
          </p>
          <p className="text-sm text-paper/55 leading-relaxed max-w-xs">
            A consultation starts with your birth details and ends with a tattoo that means something only to you.
          </p>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <Button to="/destiny-consultation" variant="primary">
            Book Destiny Consultation
          </Button>
          <Button to="/destiny-consultation" variant="outline">
            Learn More →
          </Button>
        </div>
      </div>

    </div>
  </div>
</section>

      {/*
      <section className="border-y border-paper-line/10 bg-ink-soft">
        <div className="container-site py-24">
          <SectionEyebrow index="04">How A Destiny Tattoo Comes Together</SectionEyebrow>
          <h2 className="mt-4 max-w-xl font-display text-3xl md:text-4xl">
            Five steps from your story to a blueprint on skin.
          </h2>

          <div className="mt-14 grid gap-10 lg:grid-cols-2">
            <ol className="space-y-8">
              {consultationSteps.map((s) => (
                <li key={s.n} className="flex gap-5">
                  <span className="font-data text-sm text-brass shrink-0 pt-1">{s.n}</span>
                  <div>
                    <p className="font-display text-lg">{s.title}</p>
                    <p className="mt-1 text-sm text-paper/65 leading-relaxed">{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="border border-paper-line/15 p-8">
              <p className="eyebrow mb-5">What You Receive</p>
              <ul className="space-y-3">
                {consultationDeliverables.map((d) => (
                  <li key={d} className="flex items-center gap-3 text-sm text-paper/80">
                    <span className="h-1.5 w-1.5 bg-brass-bright" />
                    {d}
                  </li>
                ))}
              </ul>
              <Button to="/destiny-consultation" variant="primary" className="mt-8 w-full">
                Book Destiny Consultation
              </Button>
            </div>
          </div>
        </div>
      </section> */}

      {/* ── Testimonials ───────────────────────────────────── */}
      {/* ── Testimonials ───────────────────────────────────── */}
<section className="py-24 overflow-hidden">
  <div className="container-site">
    <div className="flex items-end justify-between mb-12">
      <div>
        <SectionEyebrow index="05">Client Testimonials</SectionEyebrow>
        <h2 className="mt-4 font-display text-3xl md:text-4xl">What clients say</h2>
      </div>
      <div className="hidden sm:flex items-center gap-2">
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} size={16} fill="#C9A84C" strokeWidth={0} />
          ))}
        </div>
        <span className="font-data text-xs text-muted tracking-widest2">4.9 · Google Reviews</span>
      </div>
    </div>
  </div>

  {/* Carousel */}
  {(() => {
    const [current, setCurrent] = React.useState(0);
    const total = testimonials.length;
    const prev = () => setCurrent((c) => (c - 1 + total) % total);
    const next = () => setCurrent((c) => (c + 1) % total);

    return (
      <div className="container-site">
        <div className="relative overflow-hidden">

          {/* Cards track */}
          <div
            className="flex transition-transform duration-500 ease-in-out gap-6"
            style={{ transform: `translateX(calc(-${current} * (100% + 24px)))` }}
          >
            {testimonials.map((t, i) => (
              <div
                key={t.name}
                className="w-full shrink-0 border border-paper-line/10 bg-ink-soft p-8 hover:border-brass/30 transition-colors duration-300"
              >
                {/* Top row */}
                <div className="flex items-start justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-brass/40 to-mercury flex items-center justify-center shrink-0">
                      <span className="font-display text-lg text-ink font-semibold">
                        {t.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-display text-base leading-tight">{t.name}</p>
                      <p className="text-xs text-muted mt-0.5">{t.location}</p>
                    </div>
                  </div>
                  {/* Google G */}
                  <svg width="20" height="20" viewBox="0 0 24 24" className="shrink-0 opacity-40">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                </div>

                {/* Stars */}
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={14} fill="#C9A84C" strokeWidth={0} />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-base text-paper/75 leading-relaxed">
                  &ldquo;{t.quote}&rdquo;
                </p>

                {/* Tag */}
                <div className="mt-6 inline-flex items-center gap-1.5 px-3 py-1.5 border border-paper-line/10 bg-ink">
                  <span className="h-1 w-1 bg-brass-bright rounded-full" />
                  <span className="font-data text-[9px] tracking-widest2 uppercase text-muted">
                    {t.type}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="mt-8 flex items-center justify-between">

          {/* Dots */}
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`transition-all duration-300 ${
                  i === current
                    ? 'w-6 h-1.5 bg-brass-bright'
                    : 'w-1.5 h-1.5 bg-paper-line/40 hover:bg-brass/40'
                }`}
              />
            ))}
          </div>

          {/* Arrow buttons */}
          <div className="flex gap-3">
            <button
              onClick={prev}
              className="flex h-12 w-12 items-center justify-center border border-paper-line/15 text-paper/60 hover:border-brass hover:text-brass-bright transition-all duration-200"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={next}
              className="flex h-12 w-12 items-center justify-center border border-paper-line/15 text-paper/60 hover:border-brass hover:text-brass-bright transition-all duration-200"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <Button to="/testimonials" variant="ghost" className="mt-8">
          See All Reviews →
        </Button>
      </div>
    );
  })()}
</section>
      {/* <section className="py-24 overflow-hidden">
  <div className="container-site mb-12">
    <SectionEyebrow index="05">Client Testimonials</SectionEyebrow>
    <div className="mt-4 flex items-end justify-between">
      <h2 className="font-display text-3xl md:text-4xl">What clients say</h2>
      <div className="hidden sm:flex items-center gap-2">
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} size={16} fill="#C9A84C" strokeWidth={0} />
          ))}
        </div>
        <span className="font-data text-xs text-muted tracking-widest2">4.9 · Google Reviews</span>
      </div>
    </div>
  </div>

  {/* Infinite scroll track 
  <div className="relative">
    {/* Left fade 
    <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-r from-ink to-transparent" />
    {/* Right fade 
    <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-l from-ink to-transparent" />

    {/* Scrolling wrapper 
    <div className="flex gap-5 w-max animate-[marquee_35s_linear_infinite] hover:[animation-play-state:paused]">
      {/* Render twice for seamless loop 
      {[...testimonials, ...testimonials].map((t, i) => (
        <div
          key={i}
          className="w-[320px] shrink-0 border border-paper-line/10 bg-ink-soft p-6 hover:border-brass/30 transition-colors duration-300"
        >
          {/* Google-style top row 
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              {/* Avatar circle 
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-brass/40 to-mercury flex items-center justify-center shrink-0">
                <span className="font-display text-sm text-ink font-semibold">
                  {t.name.charAt(0)}
                </span>
              </div>
              <div>
                <p className="font-display text-sm leading-tight">{t.name}</p>
                <p className="text-[10px] text-muted mt-0.5">{t.location}</p>
              </div>
            </div>
            {/* Google G icon 
            <svg width="18" height="18" viewBox="0 0 24 24" className="shrink-0 mt-0.5 opacity-40">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
          </div>

          {/* Stars 
          <div className="flex gap-0.5 mb-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={13} fill="#C9A84C" strokeWidth={0} />
            ))}
          </div>

          {/* Quote 
          <p className="text-sm text-paper/75 leading-relaxed line-clamp-4">
            &ldquo;{t.quote}&rdquo;
          </p>

          {/* Type tag 
          <div className="mt-4 inline-flex items-center gap-1.5 px-2.5 py-1 border border-paper-line/10 bg-ink">
            <span className="h-1 w-1 bg-brass-bright rounded-full" />
            <span className="font-data text-[9px] tracking-widest2 uppercase text-muted">
              {t.type}
            </span>
          </div>
        </div>
      ))}
    </div>
  </div>

  <div className="container-site mt-10">
    <Button to="/testimonials" variant="ghost">
      See All Reviews →
    </Button>
  </div>
</section> */}
      {/* <section className="container-site py-24">
        <SectionEyebrow index="05">Client Testimonials</SectionEyebrow>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {testimonials.slice(0, 4).map((t) => (
            <div key={t.name} className="border border-paper-line/10 p-7">
              <div className="flex gap-1 text-brass-bright">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-paper/80">&ldquo;{t.quote}&rdquo;</p>
              <p className="mt-5 font-display text-base">{t.name}</p>
              <p className="text-xs text-muted">
                {t.location} · {t.type}
              </p>
            </div>
          ))}
        </div>
        <Button to="/testimonials" variant="ghost" className="mt-8">
          See More Reviews →
        </Button>
      </section> */}

      {/* ── Studio Locations ─────────────────────────────────*/}

      {/* ── Studio Locations ───────────────────────────────── */}
<section className="border-y border-paper-line/10 bg-paper text-ink overflow-hidden">
  <div className="container-site py-24">

    {/* Header */}
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
      <div>
        <SectionEyebrow index="06">
          <span className="text-blood">Studio Locations</span>
        </SectionEyebrow>
        <h2 className="mt-4 font-display text-3xl md:text-4xl text-ink">
          Find us near you
        </h2>
      </div>
      <p className="text-sm text-ink/40 font-data tracking-wide max-w-[200px] text-right hidden sm:block">
        Walk-ins welcome · Appointments preferred
      </p>
    </div>

    {/* Location cards */}
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {studioLocations.map((loc, idx) => (
        <div
          key={loc.city}
          className="group relative border border-ink/10 hover:border-blood/40 bg-white transition-all duration-300 overflow-hidden"
        >
          {/* Top accent line on hover */}
          <div className="absolute top-0 left-0 right-0 h-px bg-blood scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

          <div className="p-6">
            {/* Number + Pin row */}
            <div className="flex items-start justify-between mb-4">
              <span className="font-data text-[10px] tracking-widest2 uppercase text-ink/25">
                0{idx + 1}
              </span>
              <MapPin
                size={16}
                className="text-blood/60 group-hover:text-blood transition-colors duration-200 shrink-0"
              />
            </div>

            {/* City */}
            <p className="font-display text-2xl text-ink leading-tight mb-3">
              {loc.city}
            </p>

            {/* Divider */}
            <div className="h-px w-8 bg-blood/30 mb-4 group-hover:w-full transition-all duration-500" />

            {/* Address */}
            <p className="text-xs text-ink/55 leading-relaxed mb-2">
              {loc.address}
            </p>

            {/* Hours */}
            <div className="flex items-center gap-1.5 mt-3">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500/70 shrink-0" />
              <p className="text-[11px] text-ink/45 font-data tracking-wide">
                {loc.hours}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>

    {/* Map placeholder — styled */}
    <div className="mt-8 relative w-full aspect-[21/9] border border-ink/10 bg-ink/[0.03] overflow-hidden group">
<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3768.1161330019927!2d72.96864227466794!3d19.19012934838076!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b87ae16907e9%3A0xff9da0d9943ea712!2s9Ex%20Tattoo%20Shop%20%7C%20Premium%20%7C%20Story%20Based%20Art%20%7C%20Thane%20%7C%20Mumbai!5e0!3m2!1sen!2sin!4v1782308720058!5m2!1sen!2sin" width="100%" height="420" style={{border:0}} allowFullScreen="" loading="lazy" referrerPolicy="strict-origin-when-cross-origin"></iframe>
     
      {/* Grid pattern background */}
      {/* <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #1a1a1a 1px, transparent 1px),
            linear-gradient(to bottom, #1a1a1a 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      /> */}

      {/* Pulsing dot — center */}
      {/* <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative flex items-center justify-center">
          <span className="absolute h-8 w-8 rounded-full bg-blood/20 animate-ping" />
          <span className="relative h-3 w-3 rounded-full bg-blood/60" />
        </div>
      </div> */}

      {/* Label */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2">

         {/* <span className="font-data text-[10px] tracking-widest2 uppercase text-ink/30 bg-white/80 px-3 py-1.5">
          Google Maps · Coming Soon
        </span> */}
      </div>
    </div>

  </div>
</section>
{/*
      <section className="border-y border-paper-line/10 bg-paper text-ink">
        <div className="container-site py-24">
          <SectionEyebrow index="06">
            <span className="text-blood">Studio Locations</span>
          </SectionEyebrow>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {studioLocations.map((loc) => (
              <div key={loc.city} className="border border-ink/10 p-6">
                <MapPin className="text-blood" size={20} />
                <p className="mt-3 font-display text-xl">{loc.city}</p>
                <p className="mt-2 text-xs text-ink/60 leading-relaxed">{loc.address}</p>
                <p className="mt-2 text-xs text-ink/60">{loc.hours}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 aspect-[21/9] w-full border border-ink/10 bg-ink/5 flex items-center justify-center">
            <span className="font-data text-xs tracking-widest2 uppercase text-ink/40">
              Google Maps Integration
            </span>
          </div>
        </div>
      </section> */}




{/* ── CTA ────────────────────────────────────────────── */}
<section className="relative overflow-hidden bg-ink border-t border-paper-line/10">

  {/* Brass top line */}
  <div className="h-px w-full bg-gradient-to-r from-transparent via-brass/40 to-transparent" />

  {/* Radial glow */}
  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(201,168,76,0.06),transparent)]" />

  <div className="container-site relative py-36 flex flex-col items-center text-center">

    {/* Eyebrow */}
    <div className="flex items-center gap-3 mb-8">
      <span className="h-px w-12 bg-brass/35" />
      <span className="font-data text-[10px] tracking-widest2 uppercase text-brass/60">
        Book a Session
      </span>
      <span className="h-px w-12 bg-brass/35" />
    </div>

    {/* Headline */}
    <h2 className="font-display text-5xl sm:text-6xl md:text-7xl leading-[1.02] max-w-2xl">
      Ready to wear
      <br />
      your{' '}
      <span className="italic text-brass-bright">story?</span>
    </h2>

    {/* Subtext */}
    {/* <p className="mt-7 text-paper/50 text-base leading-relaxed max-w-sm">
      Walk in with a date of birth and a story.
      Walk out with a tattoo that means something only to you.
    </p> */}

    {/* CTAs */}
    <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
      <Button to="/contact" variant="primary">
        Book Appointment
      </Button>
      <Button to="/destiny-consultation" variant="outline">
        Talk To An Expert
      </Button>
    </div>

  </div>

  {/* Brass bottom line */}
  <div className="h-px w-full bg-gradient-to-r from-transparent via-brass/40 to-transparent" />

</section>


{/* ── CTA ──────────────────────────────────────────────
<section className="relative overflow-hidden bg-paper text-ink">

  {/* Brass top line 
  <div className="h-px w-full bg-gradient-to-r from-transparent via-brass/40 to-transparent" />

  {/* Large watermark number 
  <span className="pointer-events-none select-none absolute -right-6 top-1/2 -translate-y-1/2 font-display text-[240px] leading-none text-ink/[0.04]">
    9
  </span>

  <div className="container-site py-32 relative">
    <div className=" max-w-2xl">

      {/* Eyebrow 
      <div className="flex items-center gap-3 mb-8">
        <span className="h-px w-10 bg-blood/50" />
        <span className="font-data text-[10px] tracking-widest2 uppercase text-blood/70">
          Book a Session
        </span>
      </div>

      {/* Headline — left aligned, big 
      <h2 className="font-display text-5xl sm:text-6xl md:text-7xl leading-[1.02] text-ink">
        Ready to wear
        <br />
        your{' '}
        <span className="italic text-blood">story?</span>
      </h2>

      {/* Subtext 
      <p className="mt-7 text-ink/55 text-base leading-relaxed max-w-sm">
        Walk in with a date of birth and a story.
        Walk out with a tattoo that means something only to you.
      </p>

      {/* CTAs 
      <div className="mt-10 flex flex-col gap-4 sm:flex-row">
        <Button to="/contact" variant="primary">
          Book Appointment
        </Button>
        <Button
          to="/destiny-consultation"
          variant="outline"
          className="!border-ink/25 !text-ink hover:!border-blood hover:!text-blood"
        >
          Talk To An Expert
        </Button>
      </div>

    </div>

    {/* Right side — vertical stat strip 
    {/* <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-6">
      <div className="h-20 w-px bg-gradient-to-b from-transparent via-ink/15 to-transparent" />
      <div className="text-center">
        <p className="font-display text-2xl text-ink">15+</p>
        <p className="font-data text-[8px] tracking-widest2 uppercase text-ink/35 mt-1 [writing-mode:vertical-rl] rotate-180">Years</p>
      </div>
      <div className="h-px w-4 bg-ink/15" />
      <div className="text-center">
        <p className="font-display text-2xl text-ink">5K+</p>
        <p className="font-data text-[8px] tracking-widest2 uppercase text-ink/35 mt-1 [writing-mode:vertical-rl] rotate-180">Tattoos</p>
      </div>
      <div className="h-px w-4 bg-ink/15" />
      <div className="text-center">
        <p className="font-display text-2xl text-ink">4.9</p>
        <p className="font-data text-[8px] tracking-widest2 uppercase text-ink/35 mt-1 [writing-mode:vertical-rl] rotate-180">Rating</p>
      </div>
      <div className="h-20 w-px bg-gradient-to-b from-transparent via-ink/15 to-transparent" />
    </div> 

  </div>

  {/* Brass bottom line 
  <div className="h-px w-full bg-gradient-to-r from-transparent via-brass/40 to-transparent" />

</section> */}
{/* ── CTA ──────────────────────────────────────────────
<section className="relative overflow-hidden border-t border-paper-line/10 bg-ink min-h-[60vh] flex items-center">

  {/* Constellation canvas — bookends with hero 
  <div className="pointer-events-none absolute inset-0 w-full h-full">
    <ConstellationCanvas />
  </div>

  {/* Destiny wheel watermark 
  <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.04]">
    <DestinyWheel size={580} animate={false} />
  </div>

  {/* Radial glow
  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(201,168,76,0.07),transparent)]" />

  <div className="container-site relative py-36 text-center">

    {/* Eyebrow 
    <div className="flex items-center justify-center gap-3 mb-8">
      <span className="h-px w-16 bg-brass/35" />
      <span className="font-data text-[10px] tracking-widest2 uppercase text-brass/60">
        Begin Your Journey
      </span>
      <span className="h-px w-16 bg-brass/35" />
    </div>

    {/* Headline 
    <h2 className="font-display text-4xl sm:text-5xl md:text-6xl leading-[1.04] max-w-2xl mx-auto">
      Your ink.{' '}
      <span className="italic text-brass-bright">Your destiny.</span>
      <br />
      Your story.
    </h2>

    {/* Subtext 
    <p className="mt-6 text-paper/50 max-w-sm mx-auto text-sm leading-relaxed">
      Every tattoo begins with your birth, your journey,
      and the story only you can tell.
    </p>

    {/* CTAs 
    <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
      <Button to="/contact" variant="primary">
        Book Appointment
      </Button>
      <Button to="/destiny-consultation" variant="outline">
        Talk To An Expert
      </Button>
    </div>

    {/* Bottom stat strip 
    <div className="mt-16 flex items-center justify-center gap-8 sm:gap-16">
      <div className="text-center">
        <p className="font-display text-2xl text-brass-bright">15+</p>
        <p className="font-data text-[9px] tracking-widest2 uppercase text-paper/35 mt-1">Years Experience</p>
      </div>
      <div className="h-8 w-px bg-brass/15" />
      <div className="text-center">
        <p className="font-display text-2xl text-brass-bright">5000+</p>
        <p className="font-data text-[9px] tracking-widest2 uppercase text-paper/35 mt-1">Tattoos Created</p>
      </div>
      <div className="h-8 w-px bg-brass/15" />
      <div className="text-center">
        <p className="font-display text-2xl text-brass-bright">4.9★</p>
        <p className="font-data text-[9px] tracking-widest2 uppercase text-paper/35 mt-1">Google Rating</p>
      </div>
    </div>

  </div>
</section> */}
      {/* ── CTA ──────────────────────────────────────────────
      <section className="relative overflow-hidden ink-texture">
        <div className="container-site py-24 text-center">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl">Ready to create your story?</h2>
          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button to="/contact" variant="primary">
              Book Appointment
            </Button>
            <Button to="/destiny-consultation" variant="outline">
              Talk To An Expert
            </Button>
          </div>
        </div>
      </section> */}
    </div>
  );
}
