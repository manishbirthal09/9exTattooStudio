import React from 'react';
import { Phone, MessageCircle, MapPin, Clock } from 'lucide-react';
import SectionEyebrow from '../components/SectionEyebrow.jsx';
import AppointmentForm from '../components/AppointmentForm.jsx';
import { studio, studioLocations } from '../data/siteData.js';

export default function Contact() {
  return (
    <div>
      <section className="container-site py-20">
        <SectionEyebrow>Contact Us</SectionEyebrow>
        <h1 className="mt-4 max-w-2xl font-display text-4xl md:text-5xl">
          Let&apos;s start with a conversation
        </h1>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <a
            href={`tel:${studio.phone.replace(/\s/g, '')}`}
            className="flex items-center gap-4 border border-paper-line/15 p-6 hover:border-brass-bright transition-colors"
          >
            <Phone className="text-brass-bright" size={22} />
            <div>
              <p className="font-display text-lg">Call the Studio</p>
              <p className="text-sm text-paper/60">{studio.phone}</p>
            </div>
          </a>
          <a
            href={`https://wa.me/${studio.whatsapp}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-4 border border-paper-line/15 p-6 hover:border-brass-bright transition-colors"
          >
            <MessageCircle className="text-brass-bright" size={22} />
            <div>
              <p className="font-display text-lg">Message on WhatsApp</p>
              <p className="text-sm text-paper/60">Usually replies within an hour</p>
            </div>
          </a>
        </div>
      </section>

      {/* Locations */}
      <section className="border-y border-paper-line/10 bg-ink-soft">
        <div className="container-site py-20">
          <SectionEyebrow index="01">Studio Locations</SectionEyebrow>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {studioLocations.map((loc) => (
              <div key={loc.city} className="border border-paper-line/10 p-6">
                <MapPin className="text-brass-bright" size={18} />
                <p className="mt-3 font-display text-lg">{loc.city}</p>
                <p className="mt-2 text-xs text-paper/60 leading-relaxed">{loc.address}</p>
                <p className="mt-2 text-xs text-paper/60">{loc.phone}</p>
                <p className="mt-2 flex items-center gap-1.5 text-xs text-paper/60">
                  <Clock size={12} /> {loc.hours}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-8 aspect-[21/9] w-full border border-paper-line/15 flex items-center justify-center">
            <span className="font-data text-xs tracking-widest2 uppercase text-muted">
              Google Maps Integration — All Locations
            </span>
          </div>
        </div>
      </section>

      {/* Appointment form */}
      <section className="container-site py-20" id="appointment">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionEyebrow index="02">Appointment Form</SectionEyebrow>
            <h2 className="mt-4 font-display text-3xl">Book an appointment</h2>
            <p className="mt-4 text-paper/65 leading-relaxed max-w-sm">
              Share a few details and a consultant will reach out to confirm timing, studio
              location and next steps.
            </p>
          </div>
          <AppointmentForm title="" />
        </div>
      </section>
    </div>
  );
}
