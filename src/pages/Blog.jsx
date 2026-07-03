import React, { useState, useMemo } from 'react';
import { ArrowRight } from 'lucide-react';
import SectionEyebrow from '../components/SectionEyebrow.jsx';
import ImagePlaceholder from '../components/ImagePlaceholder.jsx';
import { blogPosts } from '../data/siteData.js';

const categories = ['All', ...new Set(blogPosts.map((p) => p.category))];

export default function Blog() {
  const [active, setActive] = useState('All');

  const filtered = useMemo(
    () => (active === 'All' ? blogPosts : blogPosts.filter((p) => p.category === active)),
    [active]
  );

  return (
    <div className="container-site py-20">
      <SectionEyebrow>Blog</SectionEyebrow>
      <h1 className="mt-4 font-display text-4xl md:text-5xl">Notes from the studio</h1>
      <p className="mt-4 max-w-xl text-paper/65 leading-relaxed">
        Care guides, meanings, trends, and an honest look at removal and camouflage work.
      </p>

      <div className="mt-10 flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setActive(c)}
            className={`px-4 py-2 text-xs font-data tracking-widest2 uppercase border transition-colors ${
              active === c
                ? 'border-brass bg-brass text-ink'
                : 'border-paper-line/20 text-paper/70 hover:border-brass-bright'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((post) => (
          <article key={post.slug} className="group cursor-pointer">
            <ImagePlaceholder label={post.category} ratio="aspect-[4/3]" />
            <p className="mt-4 eyebrow !text-muted">{post.category}</p>
            <h2 className="mt-2 font-display text-xl leading-snug group-hover:text-brass-bright">
              {post.title}
            </h2>
            <p className="mt-2 text-sm text-paper/60 leading-relaxed">{post.excerpt}</p>
            <p className="mt-4 flex items-center gap-2 text-xs text-brass-bright">
              {post.readTime} <ArrowRight size={13} />
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
