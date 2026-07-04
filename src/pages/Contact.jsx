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
          <div className="mt-8 relative w-full aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9] border border-ink/10 bg-ink/[0.03] overflow-hidden group">
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3768.1161330019927!2d72.96864227466794!3d19.19012934838076!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b87ae16907e9%3A0xff9da0d9943ea712!2s9Ex%20Tattoo%20Shop%20%7C%20Premium%20%7C%20Story%20Based%20Art%20%7C%20Thane%20%7C%20Mumbai!5e0!3m2!1sen!2sin!4v1782308720058!5m2!1sen!2sin" className="absolute inset-0 h-full w-full" style={{border:0}} allowFullScreen="" loading="lazy" referrerPolicy="strict-origin-when-cross-origin"></iframe>
   
          {/* <div className="mt-8 aspect-[21/9] w-full border border-paper-line/15 flex items-center justify-center">
            <span className="font-data text-xs tracking-widest2 uppercase text-muted">
              Google Maps Integration — All Locations
            </span> */}
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
