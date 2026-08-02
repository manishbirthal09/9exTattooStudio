import React from 'react';
import { Star,} from 'lucide-react';
import SectionEyebrow from '../components/SectionEyebrow.jsx';
import ImagePlaceholder from '../components/ImagePlaceholder.jsx';
import { testimonials, testimonialsvideo, beforeAfter } from '../data/siteData.js';

const googleReviews = [
  
  {
    name: 'The Rolling Plate Cloud Kitchen',
    rating:5,
    text:
      'Got a tattoo of Jesus Christ and a Dove, and I’m extremely happy with how it turned out. The tattoo looks very realistic, with amazing detailing and shading. Tattoo Artist Vishal did a fantastic job and was very patient throughout the entire process. It took around 6 hours to complete the design, and the final result looks absolutely amazing. The professionalism, effort, and precision really show in the work. Will surely be coming back here for more tattoos. Highly recommended!',
    
  },
  {
    name: 'Aanchal Gowda',
    rating: 5,
    text:
      'Took a reference for 9ex via a friend of mine, and the recommendation was up to the mark. Got my first tattoo done here, their ink is amazing and hats off to the artist for delivering such an intricate design so beautifully, that too without pain! I highly recommend everyone who wants tattoos to explore this place 🖤',
    
  },
  {
    name: 'Pawan Sawant',
    rating: 5,
    text:
      'Yesterday I got a Sai Baba tattoo from 9EX Tattoo Shop and I am very happy with the experience. The team is very professional and friendly. The tattoo was done without any pain and at a very reasonable price. I was a little scared about the pain before, but the artist made the whole process very comfortable. I highly recommend this place to anyone who wants to get a tattoo. Great experience!',
    
  },
  {
    name: 'Ovee Khare',
    rating: 5,
    text:
      'I came from Badlapur from my friend reference. I recently visited this tattoo shop, and the entire experience was absolutely amazing from start to finish. The moment I walked in, I noticed how clean, organized, and welcoming the place felt.The artist was incredibly talented and patient. They took the time to understand my idea, suggested improvements, and made sure the design was exactly how I imagined it. Their attention to detail was impressive — every line was sharp, every shade perfectly blended. Now you can see a result.',
    
  },
   {
    name: 'Nandini More',
    rating: 5,
    text:
      'Got my first tattoo done here and it was an amazing experience. I was nervous at first but Shashikant did was very nice and made the experience really amazing.',
    
  },
];

// const beforeAfter = [
//   { title: 'Faded Tribal → Realistic Sleeve Cover-Up' },
//   { title: 'Blank Forearm → Destiny Symbol Composition' },
//   { title: 'Old Name Tattoo → Mandala Rework' },
// ];
import { useRef, useState } from 'react';
import { Play, Volume2, VolumeX } from 'lucide-react';
import Button from '../components/Button.jsx';

function TestimonialVideo({ t }) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);

  function togglePlay() {
    const v = videoRef.current;
    if (!v) return;
    if (playing) {
      v.pause();
    } else {
      v.play();
    }
    setPlaying(!playing);
  }

  function toggleMute(e) {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  }

  return (
    <div>
      <div className="relative aspect-9/16 overflow-hidden bg-ink-soft cursor-pointer" onClick={togglePlay}>
        <video
          ref={videoRef}
          src={t.video}
          poster={t.poster}
          muted={muted}
          playsInline
          loop
          className="h-full w-full object-cover"
        />

        {/* Play button — hides once playing */}
        {!playing && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brass text-ink">
              <Play size={18} fill="currentColor" />
            </span>
          </div>
        )}

        {/* Mute toggle — always visible bottom-right */}
        <button
          onClick={toggleMute}
          aria-label={muted ? 'Unmute' : 'Mute'}
          className="absolute bottom-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-ink/70 text-paper backdrop-blur-sm hover:bg-ink transition-colors"
        >
          {muted ? <VolumeX size={14} /> : <Volume2 size={14} />}
        </button>
      </div>
      <p className="mt-3 font-display text-base">{t.name}</p>
      <p className="text-xs text-muted">{t.location}</p>
    </div>
  );
}

export default function Testimonials() {
  return (
    <div>
      <section className="container-site py-20">
        <SectionEyebrow>Testimonials</SectionEyebrow>
        <h1 className="mt-4 max-w-2xl font-display text-4xl md:text-5xl">What clients say</h1>
      </section>

      {/* Video testimonials */}
      {/* <section className="container-site pb-20">
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
      </section> */}

      {/* Live client feedback */}
      {/* Video testimonials */}
<section className="container-site pb-20">
  <SectionEyebrow index="01">Video Testimonials</SectionEyebrow>
  <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
    {testimonialsvideo.slice(0, 3).map((t) => (
      <TestimonialVideo key={t.name} t={t} />
    ))}
  </div>
</section>
      {/* <section className="border-y border-paper-line/10 bg-ink-soft">
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
      </section> */}

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
        <div className="flex justify-center">
           <Button to="https://www.google.com/maps/place/9Ex+Tattoo+Shop+%7C+Premium+%7C+Story+Based+Art+%7C+Thane+%7C+Mumbai/@19.1901243,72.9712172,17z/data=!4m8!3m7!1s0x3be7b87ae16907e9:0xff9da0d9943ea712!8m2!3d19.1901243!4d72.9712172!9m1!1b1!16s%2Fg%2F11b7hfr8yv?hl=en&entry=ttu&g_ep=EgoyMDI2MDYyOS4wIKXMDSoASAFQAw%3D%3D"  className=' mt-4'>View all reviews</Button>
     
        </div>
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
                  <img src={b.image} alt="Before" className="aspect-square object-cover" />
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
