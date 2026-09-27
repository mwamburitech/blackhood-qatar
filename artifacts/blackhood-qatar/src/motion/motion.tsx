import { useEffect, useRef, useSyncExternalStore, type ReactNode, type RefObject } from 'react';
import { Pause, Play } from 'lucide-react';
import { useLocation } from 'wouter';

/* ---------- Pause store (shared across pages, persisted) ---------- */
const KEY = 'blackhood-motion-paused';
let paused = false;
try {
  paused = typeof window !== 'undefined' && window.localStorage.getItem(KEY) === '1';
} catch {
  // Motion controls still work when browser storage is unavailable.
}
const listeners = new Set<() => void>();
export function setMotionPaused(value: boolean) { setPaused(value); }
function setPaused(value: boolean) {
  paused = value;
  try { window.localStorage.setItem(KEY, value ? '1' : '0'); } catch { /* ignore */ }
  listeners.forEach((l) => l());
}
function subscribe(l: () => void) { listeners.add(l); return () => { listeners.delete(l); }; }
export function useMotionPaused() {
  return useSyncExternalStore(subscribe, () => paused, () => false);
}

/* ---------- Reduced motion ---------- */
const mq = typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
function subscribeRM(l: () => void) { mq?.addEventListener('change', l); return () => mq?.removeEventListener('change', l); }
export function useReducedMotion() {
  return useSyncExternalStore(subscribeRM, () => !!mq?.matches, () => false);
}

/* ---------- Scroll reveal scope ---------- */
/** Adds scroll-triggered entrance to direct <section> children + [data-reveal] items inside the scope.
 *  Classes are removed on unmount, and nothing is hidden when reduced motion is on. */
export function RevealScope({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    const root = ref.current;
    if (!root || reduced || !('IntersectionObserver' in window)) return;
    const targets = Array.from(root.querySelectorAll<HTMLElement>(':scope > section > :not(.moving-photo):not(.absolute), [data-reveal]'));
    const vh = window.innerHeight;
    const pending = targets.filter((el) => el.getBoundingClientRect().top > vh * 0.92);
    pending.forEach((el) => el.classList.add('sr-pending'));
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('sr-in');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    pending.forEach((el) => io.observe(el));
    return () => {
      io.disconnect();
      targets.forEach((el) => el.classList.remove('sr-pending', 'sr-in'));
    };
  }, [reduced]);
  return <div ref={ref} className={className}>{children}</div>;
}

/* ---------- Parallax ---------- */
/** Writes a --parallax px offset on the element based on its position in the viewport. */
export function useParallax(ref: RefObject<HTMLElement | null>, strength = 0.12) {
  const reduced = useReducedMotion();
  const isPaused = useMotionPaused();
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduced || isPaused) { el.style.setProperty('--parallax', '0px'); return; }
    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const center = rect.top + rect.height / 2 - window.innerHeight / 2;
      el.style.setProperty('--parallax', `${(-center * strength).toFixed(1)}px`);
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
      el.style.setProperty('--parallax', '0px');
    };
  }, [ref, strength, reduced, isPaused]);
}

/** Photographic moving background: slow Ken Burns pan/zoom plus scroll parallax. */
export function MovingPhoto({ src, alt, className = '', imgClassName = '', variant = 'a', strength = 0.1 }: { src: string; alt: string; className?: string; imgClassName?: string; variant?: 'a' | 'b'; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useParallax(ref, strength);
  const isPaused = useMotionPaused();
  return (
    <div ref={ref} className={`moving-photo overflow-hidden ${isPaused ? 'motion-paused' : ''} ${className}`}>
      <div className="parallax-layer h-full w-full">
        <img src={src} alt={alt} className={`kenburns kenburns-${variant} h-full w-full object-cover ${imgClassName}`} />
      </div>
    </div>
  );
}

/** Visible pause/resume control for continuous background motion. Hidden when reduced motion is on (nothing moves). */
export function MotionToggle({ className = '', tone = 'dark', testId = 'button-motion-toggle' }: { className?: string; tone?: 'dark' | 'light'; testId?: string }) {
  const isPaused = useMotionPaused();
  const reduced = useReducedMotion();
  if (reduced) return null;
  const styles = tone === 'dark' ? 'border-[#F8F8F8]/30 bg-[#000000]/55 text-[#F8F8F8] hover:bg-[#000000]/80' : 'border-[#000000]/20 bg-[#F8F8F8]/80 text-[#000000] hover:bg-[#F8F8F8]';
  return (
    <button type="button" onClick={() => setPaused(!isPaused)} aria-pressed={isPaused} className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-xs font-bold backdrop-blur-md transition-colors ${styles} ${className}`} data-testid={testId}>
      {isPaused ? <Play size={13} /> : <Pause size={13} />}
      {isPaused ? 'Resume animations' : 'Pause animations'}
    </button>
  );
}

/** True when any movement should be suppressed (reduced motion preference or global pause). */
export function useMotionOff() {
  const reduced = useReducedMotion();
  const isPaused = useMotionPaused();
  return reduced || isPaused;
}

const REVEAL_SELECTOR = [
  'main section > div:not(.absolute):not(.moving-photo)',
  'main section > div > .grid > *',
  'main section > div > div > .grid > *',
  'main section ol > li',
  'main section dl > div',
  'main [data-reveal]',
  'main [data-stagger] > *',
].join(',');

/** Route-aware motion shell: page entrance, staggered scroll reveals, image parallax and a global still-mode class. */
export function RouteMotion({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const ref = useRef<HTMLDivElement>(null);
  const off = useMotionOff();

  useEffect(() => {
    document.documentElement.classList.toggle('bh-still', off);
  }, [off]);

  // Staggered scroll reveal. Only elements below the fold are hidden; nothing is hidden when motion is off.
  useEffect(() => {
    const root = ref.current;
    if (!root || off || !('IntersectionObserver' in window)) return;
    const vh = window.innerHeight;
    const all = Array.from(root.querySelectorAll<HTMLElement>(REVEAL_SELECTOR)).filter((el) => !el.closest('[data-no-reveal]') && !el.closest('form'));
    const pending = all.filter((el) => el.getBoundingClientRect().top > vh * 0.9);
    pending.forEach((el) => {
      const parent = el.parentElement;
      const i = parent ? Array.prototype.indexOf.call(parent.children, el) : 0;
      el.style.transitionDelay = `${Math.min(i, 5) * 80}ms`;
      el.classList.add('sr-pending');
    });
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { entry.target.classList.add('sr-in'); io.unobserve(entry.target); }
      });
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0 });
    pending.forEach((el) => io.observe(el));
    return () => {
      io.disconnect();
      pending.forEach((el) => { el.classList.remove('sr-pending', 'sr-in'); el.style.transitionDelay = ''; });
    };
  }, [location, off]);

  // Scroll parallax on framed photography, only for images currently in view.
  useEffect(() => {
    const root = ref.current;
    if (!root || off || !('IntersectionObserver' in window)) return;
    const imgs = Array.from(root.querySelectorAll<HTMLImageElement>('.photo-frame img:not(.kenburns)'));
    const visible = new Set<HTMLImageElement>();
    let frame = 0;
    const update = () => {
      frame = 0;
      const h = window.innerHeight;
      visible.forEach((img) => {
        const r = img.parentElement?.getBoundingClientRect();
        if (!r) return;
        const c = (r.top + r.height / 2 - h / 2) / h;
        img.style.setProperty('--py', `${(Math.max(-1, Math.min(1, c)) * -14).toFixed(1)}px`);
      });
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { const img = e.target as HTMLImageElement; if (e.isIntersecting) visible.add(img); else visible.delete(img); });
      onScroll();
    });
    imgs.forEach((img) => io.observe(img));
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      io.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
      imgs.forEach((img) => img.style.removeProperty('--py'));
    };
  }, [location, off]);

  return (
    <>
      <span key={`sweep-${location}`} className="route-sweep" aria-hidden="true" />
      <div key={location} ref={ref} className="route-enter">{children}</div>
    </>
  );
}

/** Always-reachable global pause control, fixed to the viewport. */
export function GlobalMotionDock() {
  return <MotionToggle tone="light" testId="button-global-motion-toggle" className="fixed bottom-4 left-4 z-50 shadow-[0_10px_30px_-12px_rgba(40,70,100,0.45)]" />;
}
