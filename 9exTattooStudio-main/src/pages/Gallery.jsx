import React, { useMemo, useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import SectionEyebrow from '../components/SectionEyebrow.jsx';
import ImagePlaceholder from '../components/ImagePlaceholder.jsx';
import Button from '../components/Button.jsx';
import { galleryCategories } from '../data/siteData.js';
import api from '../api/axios.js';

export default function Gallery() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  const [active, setActive] = useState(initialCategory);
const [lightboxIndex, setLightboxIndex] = useState(null);
const [galleryItems, setGalleryItems] = useState([]);

  useEffect(() => {
    setActive(searchParams.get('category') || 'all');
  }, [searchParams]);

  useEffect(() => {
    api.get('/portfolio')
      .then(({ data }) => {
        setGalleryItems(
          data.map((item) => ({
            id: item._id,
            title: item.title,
            category: item.category,
            image: item.image.url,
          }))
        );
      })
      .catch((err) => console.error('Failed to load gallery', err));
  }, []);

  const filtered = useMemo(
    () => (active === 'all' ? galleryItems : galleryItems.filter((g) => g.category === active)),
    [active, galleryItems]
  );
  // const filtered = useMemo(
  //   () => (active === 'all' ? galleryItems : galleryItems.filter((g) => g.category === active)),
  //   [active]
  // );

  function selectCategory(id) {
    setActive(id);
    if (id === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', id);
    }
    setSearchParams(searchParams);
  }
 const openLightbox = (index) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const showPrev = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : (i - 1 + filtered.length) % filtered.length));
  }, [filtered.length]);

  const showNext = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : (i + 1) % filtered.length));
  }, [filtered.length]);

  // keyboard support
  useEffect(() => {
    if (lightboxIndex === null) return;
    function handleKey(e) {
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'ArrowRight') showNext();
      if (e.key === 'Escape') closeLightbox();
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxIndex, showPrev, showNext]);

  return (
    <div className="container-site py-20">
      <SectionEyebrow>Gallery</SectionEyebrow>
      <h1 className="mt-4 font-display text-4xl md:text-5xl">Work, organised by style</h1>
      <p className="mt-4 max-w-xl text-paper/65 leading-relaxed">
        Browse by category, or view everything the studio has produced across portrait, destiny
        and custom-design work.
      </p>

      <div className="mt-10 flex flex-wrap gap-2">
        <button
          onClick={() => selectCategory('all')}
          className={`px-4 py-2 text-xs font-data tracking-widest2 uppercase border transition-colors ${
            active === 'all'
              ? 'border-brass bg-brass text-ink'
              : 'border-paper-line/20 text-paper/70 hover:border-brass-bright'
          }`}
        >
          All
        </button>
        {galleryCategories.map((c) => (
          <button
            key={c.id}
            onClick={() => selectCategory(c.id)}
            className={`px-4 py-2 text-xs font-data tracking-widest2 uppercase border transition-colors ${
              active === c.id
                ? 'border-brass bg-brass text-ink'
                : 'border-paper-line/20 text-paper/70 hover:border-brass-bright'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {filtered.map((item, index) => (
  <div key={item.id} className="group overflow-hidden" onClick={() => openLightbox(index)}>
    <div className="aspect-[5/6] overflow-hidden bg-ink-soft">
      <img
        src={item.image}
        alt={item.title}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
    </div>
    <p className="mt-2 text-xs text-paper/60">{item.title}</p>
  </div>
))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-16 text-center text-sm text-muted">No pieces in this category yet.</p>
      )}

      <div className="mt-16 border border-paper-line/15 p-10 text-center">
        <h2 className="font-display text-2xl">Don&apos;t see what you&apos;re after?</h2>
        <p className="mt-2 text-sm text-paper/65">
          Every destiny tattoo is designed from scratch. Tell us what you have in mind.
        </p>
        <Button to="/contact" variant="primary" className="mt-6">
          Book Appointment
        </Button>
      </div>
       {lightboxIndex !== null && filtered[lightboxIndex] && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 text-paper/80 hover:text-paper text-3xl leading-none"
            aria-label="Close"
          >
            ×
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); showPrev(); }}
            className="absolute left-4 md:left-8 text-paper/80 hover:text-paper text-4xl px-2"
            aria-label="Previous"
          >
            ‹
          </button>

          <div
            className="max-h-[85vh] max-w-[90vw] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={filtered[lightboxIndex].image}
              alt={filtered[lightboxIndex].title}
              className="max-h-[80vh] max-w-full object-contain"
            />
            <p className="mt-4 text-sm text-paper/70">
              {filtered[lightboxIndex].title} ({lightboxIndex + 1} / {filtered.length})
            </p>
          </div>

          <button
            onClick={(e) => { e.stopPropagation(); showNext(); }}
            className="absolute right-4 md:right-8 text-paper/80 hover:text-paper text-4xl px-2"
            aria-label="Next"
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
}
