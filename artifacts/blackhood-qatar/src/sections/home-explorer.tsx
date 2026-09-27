import { useRef, useState, type KeyboardEvent, type PointerEvent, type TouchEvent } from 'react';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowUpRight, Check } from 'lucide-react';
import { Link } from 'wouter';
import { MotionToggle, MovingPhoto, useMotionOff } from '@/motion/motion';
import { Label, wrap } from './shared';

const sectors = [
  { name: 'Hospitality', image: '/images/blackhood-hospitality-team.jpg', alt: 'Hospitality team preparing for guest service', line: 'Kitchens, restaurants, rooms and front desks.', body: 'Guest-facing and back-of-house people for hotels, restaurants and catering operations, where pace and presentation are part of the job.', roles: ['Chefs', 'Commis', 'Waiters', 'Housekeepers', 'Receptionists'], settings: ['Hotels', 'Restaurants', 'Catering'], cta: '/services' },
  { name: 'Construction', image: '/images/blackhood-technical-team.jpg', alt: 'Tradespeople working together on site equipment', line: 'Site trades that build to the drawing.', body: 'Skilled and semi-skilled site trades supporting structural, finishing and electrical works, with safety procedures at the centre.', roles: ['Masons', 'Electricians', 'Steel fixers', 'Scaffolders', 'Site helpers'], settings: ['Building sites', 'Fit-outs', 'Projects'], cta: '/services' },
  { name: 'Facilities', image: '/images/hvac.jpg', alt: 'Technician servicing HVAC equipment', line: 'The systems that keep buildings running.', body: 'Technical people for planned and reactive maintenance across hotels, offices and residential buildings.', roles: ['Electrical', 'HVAC', 'Plumbing', 'Maintenance'], settings: ['Hotels', 'Offices', 'Residences'], cta: '/services' },
  { name: 'Cleaning', image: '/images/blackhood-care-team.jpg', alt: 'Cleaning and care team in a hotel corridor', line: 'Consistent standards, room after room.', body: 'Reliable cleaning teams working to checklists and schedules, from daily routines to post-construction deep cleans.', roles: ['Hotels', 'Offices', 'Post-construction', 'Villas', 'Retail'], settings: ['Daily routines', 'Deep cleans', 'Handovers'], cta: '/services' },
  { name: 'Events', image: '/images/hospitality.jpg', alt: 'Event service staff at a function', line: 'Calm, capable people for busy days.', body: 'Flexible crews for launches, functions and event days, from the first guest arrival to the final clear-down.', roles: ['Ushers', 'Ticketing', 'Guest relations', 'F&B staff'], settings: ['Launches', 'Functions', 'Venues'], cta: '/services' },
  { name: 'Support', image: '/images/housekeeping.jpg', alt: 'Support staff handling linen and stock', line: 'Moving people, stock and linen reliably.', body: 'Operational support roles that keep supplies, stores and transport running quietly in the background.', roles: ['Drivers', 'Storekeepers', 'Warehouse', 'Linen attendants'], settings: ['Stores', 'Transport', 'Laundry'], cta: '/workforce' },
];

const spring = { type: 'spring' as const, stiffness: 260, damping: 30 };
const pad = (n: number) => String(n).padStart(2, '0');

export function HomeSectors() {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const [role, setRole] = useState<string | null>(null);
  const off = useMotionOff();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const stage = useRef<HTMLDivElement>(null);
  const touchX = useRef<number | null>(null);
  const s = sectors[index];
  const t = off ? { duration: 0 } : spring;

  const select = (n: number, focus = false) => {
    const next = (n + sectors.length) % sectors.length;
    setDir(next >= index ? 1 : -1);
    setIndex(next);
    setRole(null);
    if (focus) tabs.current[next]?.focus();
  };
  const onKey = (e: KeyboardEvent) => {
    const map: Record<string, number> = { ArrowDown: index + 1, ArrowRight: index + 1, ArrowUp: index - 1, ArrowLeft: index - 1, Home: 0, End: sectors.length - 1 };
    if (e.key in map) { e.preventDefault(); select(map[e.key], true); }
  };
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (off || e.pointerType !== 'mouse' || !stage.current) return;
    const r = stage.current.getBoundingClientRect();
    stage.current.style.setProperty('--ry', `${(((e.clientX - r.left) / r.width) - 0.5) * 5}deg`);
    stage.current.style.setProperty('--rx', `${(((e.clientY - r.top) / r.height) - 0.5) * -4}deg`);
  };
  const onLeave = () => { stage.current?.style.setProperty('--rx', '0deg'); stage.current?.style.setProperty('--ry', '0deg'); };
  const onTouchStart = (e: TouchEvent) => { touchX.current = e.touches[0]?.clientX ?? null; };
  const onTouchEnd = (e: TouchEvent) => {
    if (touchX.current === null) return;
    const dx = (e.changedTouches[0]?.clientX ?? touchX.current) - touchX.current;
    touchX.current = null;
    if (Math.abs(dx) > 45) select(index + (dx < 0 ? 1 : -1));
  };

  return (
    <section className={`relative overflow-hidden bg-[#F8F8F8] ${wrap}`} data-no-reveal data-testid="section-sector-explorer">
      <div className="pointer-events-none absolute -right-40 top-10 h-[520px] w-[520px] rounded-full bg-[#D8E8F0] blur-3xl" />
      <div className="relative mx-auto max-w-[1240px]">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <Label>Six sectors at a glance</Label>
            <h2 className="mt-5 font-display text-[clamp(2.5rem,4.6vw,4.9rem)] font-medium leading-[0.9] tracking-[-0.065em]">Where our people<br /><span className="text-[#F84848]">go to work.</span></h2>
          </div>
          <p className="max-w-lg text-base leading-7 text-[#33404A] lg:justify-self-end">Pick a sector to see the roles involved, the settings they work in and where to read more. Use arrow keys, tap or swipe the photograph.</p>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-[300px_1fr]">
          <LayoutGroup id="sectors">
            <div role="tablist" aria-label="Sectors" aria-orientation="vertical" onKeyDown={onKey} className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0 lg:pb-0">
              {sectors.map((x, i) => {
                const active = i === index;
                return (
                  <button
                    key={x.name}
                    ref={(el) => { tabs.current[i] = el; }}
                    role="tab"
                    id={`sector-tab-${i}`}
                    aria-selected={active}
                    aria-controls="sector-panel"
                    tabIndex={active ? 0 : -1}
                    onClick={() => select(i)}
                    className={`relative flex shrink-0 items-center gap-4 rounded-2xl px-4 py-3.5 text-left transition-colors lg:py-4 ${active ? 'text-[#000000]' : 'text-[#33404A] hover:bg-[#D8E8F0]/60'}`}
                    data-testid={`tab-sector-${i}`}
                  >
                    {active && <motion.span layoutId="sector-pill" transition={t} className="absolute inset-0 rounded-2xl bg-white shadow-[0_1px_2px_rgba(40,70,100,0.1),0_14px_30px_-14px_rgba(40,70,100,0.35)] ring-1 ring-[#F84848]/40" />}
                    <span className={`relative font-mono text-xs ${active ? 'text-[#F84848]' : 'text-[#33404A]/60'}`}>{pad(i + 1)}</span>
                    <span className="relative font-display text-xl tracking-[-0.03em] lg:text-2xl">{x.name}</span>
                    {active && <motion.span layoutId="sector-dot" transition={t} className="relative ml-auto hidden h-2 w-2 rounded-full bg-[#F84848] lg:block" />}
                  </button>
                );
              })}
            </div>
          </LayoutGroup>

          <div id="sector-panel" role="tabpanel" aria-labelledby={`sector-tab-${index}`} className="grid gap-5 xl:grid-cols-[1.15fr_0.85fr]">
            <div ref={stage} onPointerMove={onMove} onPointerLeave={onLeave} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd} className="m-card relative min-h-[360px] overflow-hidden rounded-[1.75rem] bg-[#C9DCE6] sm:min-h-[460px]">
              <AnimatePresence initial={false} custom={dir}>
                <motion.img
                  key={s.image}
                  src={s.image}
                  alt={s.alt}
                  custom={dir}
                  initial={off ? { opacity: 0 } : { clipPath: dir > 0 ? 'inset(0 0 0 100%)' : 'inset(0 100% 0 0)', scale: 1.15 }}
                  animate={{ clipPath: 'inset(0 0 0 0%)', scale: 1, opacity: 1 }}
                  exit={off ? { opacity: 0 } : { opacity: 0.4, scale: 1.04 }}
                  transition={off ? { duration: 0.2 } : { duration: 0.9, ease: [0.77, 0, 0.18, 1] }}
                  className="absolute inset-0 h-full w-full object-cover"
                  data-testid="img-sector-active"
                />
              </AnimatePresence>
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#F4F8FB]/90 via-[#F4F8FB]/40 to-transparent" />
              <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-white/75 px-3 py-1.5 text-xs font-bold backdrop-blur-md">
                <span className="text-[#F84848]">{pad(index + 1)}</span><span className="text-[#33404A]/60">/ {pad(sectors.length)}</span>
              </div>
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
                <AnimatePresence mode="wait">
                  <motion.div key={s.name + (role ?? '')} initial={{ opacity: 0, y: off ? 0 : 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: off ? 0 : -8 }} transition={off ? { duration: 0 } : { duration: 0.35 }} className="rounded-2xl bg-white/80 px-4 py-3 backdrop-blur-md">
                    <p className="font-display text-2xl leading-none tracking-[-0.04em] sm:text-3xl">{role ?? s.name}</p>
                    <p className="mt-1 text-xs text-[#33404A]">{role ? `Within ${s.name.toLowerCase()}` : s.line}</p>
                  </motion.div>
                </AnimatePresence>
                <div className="flex gap-1.5">
                  <button type="button" onClick={() => select(index - 1)} aria-label="Previous sector" className="grid h-10 w-10 place-items-center rounded-full bg-white/85 backdrop-blur-md transition-transform hover:-translate-y-0.5" data-testid="button-sector-prev"><ArrowLeft size={16} /></button>
                  <button type="button" onClick={() => select(index + 1)} aria-label="Next sector" className="grid h-10 w-10 place-items-center rounded-full bg-white/85 backdrop-blur-md transition-transform hover:-translate-y-0.5" data-testid="button-sector-next"><ArrowRight size={16} /></button>
                </div>
              </div>
            </div>

            <div className="flex flex-col rounded-[1.75rem] bg-[#D8E8F0] p-6 sm:p-7">
              <AnimatePresence mode="wait">
                <motion.div key={s.name} initial="in" animate="show" exit="out" variants={{ in: {}, show: { transition: { staggerChildren: off ? 0 : 0.06 } }, out: {} }} className="flex flex-1 flex-col">
                  {[
                    <p key="l" className="eyebrow text-[#F84848]">Sector {pad(index + 1)}</p>,
                    <h3 key="h" className="mt-4 font-display text-4xl leading-none tracking-[-0.05em]" data-testid="text-sector-name">{s.name}</h3>,
                    <p key="b" className="mt-4 text-sm leading-6 text-[#33404A]">{s.body}</p>,
                    <div key="r" className="mt-6">
                      <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#33404A]">Roles, tap to focus</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {s.roles.map((r) => {
                          const on = role === r;
                          return (
                            <motion.button key={r} type="button" aria-pressed={on} onClick={() => setRole(on ? null : r)} whileTap={off ? undefined : { scale: 0.94 }} className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-semibold transition-colors ${on ? 'bg-[#F84848] text-white' : 'bg-white text-[#000000] hover:bg-[#F8A0A0]'}`} data-testid={`chip-sector-role-${r.toLowerCase().replace(/[^a-z]+/g, '-')}`}>
                              {on && <Check size={13} />}{r}
                            </motion.button>
                          );
                        })}
                      </div>
                    </div>,
                    <div key="s" className="mt-6 flex flex-wrap gap-x-4 gap-y-1 text-xs font-semibold text-[#33404A]">{s.settings.map((x) => <span key={x} className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-[#7898C0]" />{x}</span>)}</div>,
                  ].map((node, i) => (
                    <motion.div key={i} variants={{ in: { opacity: 0, y: off ? 0 : 16 }, show: { opacity: 1, y: 0, transition: t }, out: { opacity: 0, transition: { duration: off ? 0 : 0.15 } } }}>{node}</motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
              <div className="mt-8 flex flex-wrap gap-2">
                {role ? (
                  <a href={`mailto:info@blackhoodqatar.com?subject=${encodeURIComponent(`Staffing enquiry: ${role}`)}&body=${encodeURIComponent(`Hello Blackhood,\n\nI would like to enquire about ${role} for ${s.name}.\n\nLocation:\nNumber of people:\nStart date:\n`)}`} className="inline-flex items-center gap-2 rounded-full bg-[#F84848] px-5 py-3 text-sm font-bold text-white transition-transform hover:-translate-y-0.5" data-testid="link-sector-primary">Enquire about {role.toLowerCase()} <ArrowUpRight size={15} /></a>
                ) : (
                  <Link href={s.cta} className="inline-flex items-center gap-2 rounded-full bg-[#F84848] px-5 py-3 text-sm font-bold text-white transition-transform hover:-translate-y-0.5" data-testid="link-sector-primary">{s.cta === '/workforce' ? 'See the workforce' : 'See services'} <ArrowUpRight size={15} /></Link>
                )}
                <Link href={s.cta === '/workforce' ? '/services' : '/workforce'} className="inline-flex items-center gap-2 rounded-full border border-[#000000]/15 bg-white/60 px-5 py-3 text-sm font-bold transition-colors hover:bg-white" data-testid="link-sector-secondary">{s.cta === '/workforce' ? 'Services' : 'Workforce'} <ArrowUpRight size={15} /></Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function HomeReach() {
  return (
    <section className="relative isolate overflow-hidden bg-[#D8E8F0] px-5 py-24 text-[#000000] sm:px-8 sm:py-32 lg:px-12" data-testid="section-home-reach">
      <MovingPhoto src="/images/europe-rome.jpg" alt="" className="absolute inset-0 -z-10" variant="b" strength={0.14} />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-[#F4F8FB]/80 via-[#F4F8FB]/35 to-transparent max-lg:bg-gradient-to-t max-lg:from-[#F4F8FB]/85 max-lg:via-[#F4F8FB]/40" />
      <div className="mx-auto max-w-[1240px]">
        <div className="max-w-2xl rounded-[1.75rem] border border-white/70 bg-white/65 p-7 shadow-[0_30px_80px_-30px_rgba(40,70,100,0.4)] backdrop-blur-xl sm:p-10">
          <Label>Close to the work</Label>
          <h2 className="mt-5 font-display text-[clamp(2.8rem,5.4vw,5.8rem)] font-medium leading-[0.88] tracking-[-0.07em]">Local understanding.<br /><span className="text-[#F84848]">Cross-border reach.</span></h2>
          <p className="mt-6 max-w-lg text-lg leading-8 text-[#1F2A33]">Rooted in Qatar and open to enquiries about Europe and North America, we bring a practical view of people, skills and movement.</p>
          <div className="mt-7 flex flex-wrap gap-x-8 gap-y-4">
            <Link href="/reach" className="inline-flex items-center gap-2 border-b border-[#F84848] pb-1.5 text-sm font-bold text-[#F84848] hover:text-[#000000]" data-testid="link-reach-cta">Explore our reach <ArrowUpRight size={16} /></Link>
            <Link href="/work-in-europe" className="inline-flex items-center gap-2 border-b border-[#000000] pb-1.5 text-sm font-bold text-[#000000] hover:text-[#F84848]" data-testid="link-work-in-europe-cta">Europe &amp; North America: role categories <ArrowUpRight size={16} /></Link>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-8 flex max-w-[1240px] flex-wrap items-center justify-between gap-3">
        <span className="rounded-full bg-white/70 px-3 py-1.5 text-[0.7rem] font-semibold text-[#33404A] backdrop-blur-md">Colosseum, Rome. Visual inspiration, not an office or placement.</span>
        <MotionToggle tone="light" />
      </div>
    </section>
  );
}
