import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type PointerEvent, type TouchEvent } from 'react';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Pause, Play } from 'lucide-react';
import { Link } from 'wouter';
import { setMotionPaused, useMotionPaused, useReducedMotion } from '@/motion/motion';

const slides = [
  { src: '/images/blackhood-hospitality-team.jpg', alt: 'Hospitality team preparing for guest service', tag: 'Hospitality & events', caption: 'Guest-facing teams tuned to pace and presentation.' },
  { src: '/images/blackhood-technical-team.jpg', alt: 'Technical team working together on HVAC equipment', tag: 'Technical & facilities', caption: 'Hands-on people for the systems that keep buildings running.' },
  { src: '/images/blackhood-care-team.jpg', alt: 'Cleaning and care team in a hotel corridor', tag: 'Cleaning & care', caption: 'Consistent standards across hotels, homes and workplaces.' },
  { src: '/images/blackhood-people-manager.jpg', alt: 'People manager speaking with a diverse workforce team', tag: 'People-first', caption: 'Clear expectations, respectful conversations, better fit.' },
];

const INTERVAL = 6500;

export function HomeHero() {
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const globalPaused = useMotionPaused();
  const reduced = useReducedMotion();
  const rootRef = useRef<HTMLElement>(null);
  const touchX = useRef<number | null>(null);
  const frame = useRef(0);

  const total = slides.length;
  const go = useCallback((n: number) => setIndex(((n % total) + total) % total), [total]);
  const next = useCallback(() => setIndex((i) => (i + 1) % total), [total]);
  const prev = useCallback(() => setIndex((i) => (i - 1 + total) % total), [total]);

  const stopped = reduced || globalPaused;
  const running = !stopped && !hovered && !focused;

  useEffect(() => {
    if (!running) return;
    const t = window.setTimeout(next, INTERVAL);
    return () => window.clearTimeout(t);
  }, [running, index, next]);

  useEffect(() => () => { if (frame.current) cancelAnimationFrame(frame.current); }, []);

  const onPointerMove = (e: PointerEvent<HTMLElement>) => {
    if (reduced || globalPaused || e.pointerType !== 'mouse') return;
    const el = rootRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    if (frame.current) cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      el.style.setProperty('--px', x.toFixed(3));
      el.style.setProperty('--py', y.toFixed(3));
    });
  };
  const onPointerLeave = () => {
    setHovered(false);
    rootRef.current?.style.setProperty('--px', '0');
    rootRef.current?.style.setProperty('--py', '0');
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); next(); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); prev(); }
    else if (e.key === 'Home') { e.preventDefault(); go(0); }
    else if (e.key === 'End') { e.preventDefault(); go(total - 1); }
  };
  const onTouchStart = (e: TouchEvent) => { touchX.current = e.touches[0]?.clientX ?? null; };
  const onTouchEnd = (e: TouchEvent) => {
    if (touchX.current === null) return;
    const dx = (e.changedTouches[0]?.clientX ?? touchX.current) - touchX.current;
    touchX.current = null;
    if (Math.abs(dx) > 45) { if (dx < 0) next(); else prev(); }
  };

  const current = slides[index];
  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <section
      ref={rootRef}
      className={`hh-root relative isolate min-h-[720px] overflow-hidden bg-[#D8E8F0] text-[#000000] lg:min-h-[calc(100dvh-80px)] ${reduced ? 'hh-reduced' : ''} ${stopped ? 'hh-stopped' : ''}`}
      aria-roledescription="carousel"
      aria-label="Blackhood workforce highlights"
      onPointerMove={onPointerMove}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={onPointerLeave}
      onFocus={() => setFocused(true)}
      onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node)) setFocused(false); }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      data-testid="section-home-hero"
    >
      {/* Photographic slideshow, full-bleed */}
      <div className="hh-depth absolute inset-0 -z-20" aria-live={running ? 'off' : 'polite'}>
        {slides.map((s, i) => (
          <div key={s.src} className={`hh-slide absolute inset-0 ${i === index ? 'is-active' : ''}`} aria-hidden={i !== index} role="group" aria-roledescription="slide" aria-label={`${i + 1} of ${total}: ${s.tag}`}>
            <img src={s.src} alt={s.alt} className="h-full w-full object-cover object-[60%_center]" data-testid={`img-hero-slide-${i}`} />
          </div>
        ))}
      </div>

      {/* Readability veils: icy glass wash, stronger only where the text sits */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-[#EEF5F9]/85 via-[#E4EFF5]/45 to-transparent max-lg:bg-gradient-to-t max-lg:from-[#EEF5F9]/92 max-lg:via-[#EEF5F9]/55 max-lg:to-[#EEF5F9]/10" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-[#D8E8F0]/70 to-transparent" />
      <div className="hh-grid pointer-events-none absolute inset-0 -z-10" />
      <span className="hh-scan pointer-events-none absolute inset-y-0 left-0 -z-10 w-px" />
      <span className="hh-edge pointer-events-none absolute inset-x-0 top-0 h-[2px]" />

      <div className="relative mx-auto flex min-h-[720px] max-w-[1440px] flex-col justify-end px-5 pb-40 pt-20 sm:px-8 lg:min-h-[calc(100dvh-80px)] lg:justify-center lg:px-12 lg:pb-36">
        <div className="hh-panel relative max-w-[46rem] rounded-[1.75rem] border border-white/60 bg-white/40 p-6 shadow-[0_30px_80px_-30px_rgba(40,70,100,0.35)] backdrop-blur-xl sm:p-10">
          <span className="hh-corner hh-corner-tl" /><span className="hh-corner hh-corner-br" />
          <div className="hh-in hh-d0 mb-6 flex items-center gap-3">
            <span className="h-px w-8 bg-[#F84848]" />
            <p className="eyebrow text-[#F84848]">Workforce solutions · Qatar / International</p>
          </div>
          <h1 className="font-display text-[clamp(3.1rem,7.4vw,7.4rem)] font-semibold leading-[0.88] tracking-[-0.075em]">
            <span className="hh-in hh-d1 block">The right people</span>
            <span className="hh-in hh-d2 block text-[#F84848]">make work move.</span>
          </h1>
          <p className="hh-in hh-d3 mt-7 max-w-xl text-lg leading-8 text-[#1F2A33] sm:text-xl">Blackhood connects dependable skilled and semi-skilled teams with the workplaces that rely on them — from Doha to Europe.</p>
          <div className="hh-in hh-d4 mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/contact" className="group flex w-fit items-center justify-center gap-3 rounded-full bg-[#F84848] px-6 py-3.5 text-sm font-bold text-white shadow-[0_12px_30px_-12px_rgba(248,72,72,0.7)] transition-transform hover:-translate-y-1" data-testid="link-hero-enquiry">Tell us what you need <ArrowUpRight size={17} /></Link>
            <Link href="/services" className="flex w-fit items-center justify-center gap-3 rounded-full border border-[#000000]/20 bg-white/50 px-6 py-3.5 text-sm font-bold text-[#000000] transition-colors hover:border-[#000000]/50 hover:bg-white/80" data-testid="link-hero-services">Explore capabilities <ArrowDown size={17} /></Link>
          </div>
          <Link href="/work-in-europe" className="hh-in hh-d5 mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#33404A] hover:text-[#F84848]" data-testid="link-hero-europe">Looking for work in Europe or North America? See role categories <ArrowUpRight size={15} /></Link>
        </div>
      </div>

      {/* Carousel controls */}
      <div
        className="absolute inset-x-5 bottom-5 z-10 flex flex-wrap items-center gap-3 rounded-2xl border border-white/60 bg-white/55 p-3 backdrop-blur-xl sm:inset-x-8 sm:bottom-7 sm:flex-nowrap sm:p-3.5 lg:inset-x-auto lg:right-12 lg:w-[34rem]"
        tabIndex={0}
        onKeyDown={onKeyDown}
        aria-label="Slideshow controls. Use left and right arrow keys to change slide."
        data-testid="carousel-hero-controls"
      >
        <div className="flex items-center gap-1.5">
          <button type="button" onClick={prev} className="grid h-10 w-10 place-items-center rounded-full border border-[#000000]/15 bg-white/70 transition-colors hover:bg-[#000000] hover:text-white" aria-label="Previous slide" data-testid="button-hero-prev"><ArrowLeft size={16} /></button>
          <button type="button" onClick={next} className="grid h-10 w-10 place-items-center rounded-full border border-[#000000]/15 bg-white/70 transition-colors hover:bg-[#000000] hover:text-white" aria-label="Next slide" data-testid="button-hero-next"><ArrowRight size={16} /></button>
        </div>
        <div className="min-w-0 flex-1" aria-live="polite">
          <div className="flex items-baseline gap-2">
            <span className="font-display text-sm font-semibold tabular-nums text-[#F84848]" data-testid="text-hero-count">{pad(index + 1)} <span className="text-[#33404A]/60">/ {pad(total)}</span></span>
            <span className="truncate text-xs font-bold uppercase tracking-[0.12em]" data-testid="text-hero-tag">{current.tag}</span>
          </div>
          <p key={index} className="hh-caption mt-0.5 truncate text-xs text-[#33404A]" data-testid="text-hero-caption">{current.caption}</p>
          <div className="mt-2 flex gap-1.5">
            {slides.map((s, i) => (
              <button key={s.src} type="button" onClick={() => go(i)} className="group relative h-4 flex-1" aria-label={`Show slide ${i + 1}: ${s.tag}`} aria-current={i === index} data-testid={`button-hero-dot-${i}`}>
                <span className="absolute inset-x-0 top-1/2 h-[3px] -translate-y-1/2 overflow-hidden rounded-full bg-[#000000]/12 group-hover:bg-[#000000]/25">
                  {i === index && (
                    <span key={`${index}-${running}`} className={`hh-progress absolute inset-0 origin-left rounded-full bg-gradient-to-r from-[#F84848] to-[#7898C0] ${running ? 'is-running' : ''}`} style={{ animationDuration: `${INTERVAL}ms` }} />
                  )}
                  {i < index && <span className="absolute inset-0 rounded-full bg-[#000000]/35" />}
                </span>
              </button>
            ))}
          </div>
        </div>
        {!reduced && (
          <button type="button" onClick={() => setMotionPaused(!globalPaused)} aria-pressed={globalPaused} className="grid h-10 w-10 place-items-center rounded-full bg-[#000000] text-white transition-transform hover:scale-105" aria-label={globalPaused ? 'Resume slideshow' : 'Pause slideshow'} data-testid="button-hero-pause">
            {globalPaused ? <Play size={15} /> : <Pause size={15} />}
          </button>
        )}
      </div>
    </section>
  );
}
