/**
 * LocationHeroImage — replaces the homepage's default <Hero /> ONLY on
 * individual location pages. Same height/footprint as the homepage hero
 * so the rest of the page flows identically, but it's a static photo
 * of that specific branch instead of the homepage's animated/video hero.
 */
export default function LocationHeroImage({ location }) {
  return (
    <section className="relative w-full h-screen min-h-[560px] overflow-hidden border-b border-ink/10">
      <img
        src={location.heroImage}
        alt={`${location.city} studio`}
        className="absolute inset-0 h-full w-full object-top"
      />
      <div className="absolute inset-0 bg-ink/50" />

      <div className="relative z-10 h-full container-site flex flex-col justify-end pb-16">
        <span className="font-data text-[11px] tracking-widest2 uppercase text-blood mb-3">
          Studio Location
        </span>
        <h1 className="font-display text-5xl md:text-7xl text-paper leading-[0.95] max-w-2xl">
          {location.city}
        </h1>
        <p className="mt-4 text-sm text-paper/60 font-data tracking-wide max-w-md">
          {location.address}
        </p>
      </div>
    </section>
  );
}