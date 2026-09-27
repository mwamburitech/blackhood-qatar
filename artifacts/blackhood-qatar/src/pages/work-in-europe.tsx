import { useEffect, useMemo, useRef, useState, type PointerEvent as RPointerEvent } from 'react';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import { Link } from 'wouter';
import { AlertCircle, ArrowDown, ArrowUpRight, ChevronDown, Mail, RotateCcw, Search, X } from 'lucide-react';
import { Faq, Label, wrap } from '@/sections/shared';
import { MotionToggle, MovingPhoto, useMotionOff } from '@/motion/motion';

const EMAIL = 'info@blackhoodqatar.com';

type Category = 'Hospitality' | 'Construction' | 'Technical & facilities' | 'Cleaning' | 'Logistics';
const categories: Category[] = ['Hospitality', 'Construction', 'Technical & facilities', 'Cleaning', 'Logistics'];

type Role = { id: string; title: string; category: Category; summary: string; tasks: string[]; helpful: string[] };

const roles: Role[] = [
  { id: 'chef', title: 'Chef / Commis chef', category: 'Hospitality', summary: 'Kitchen roles from preparation to line cooking in hotel, restaurant and catering settings.', tasks: ['Food preparation and cooking to set standards', 'Kitchen hygiene and safe food handling', 'Working to service timings with a brigade'], helpful: ['Kitchens and cuisines you have worked in', 'Years of experience and level', 'Any food safety training'] },
  { id: 'waiter', title: 'Waiter / F&B service', category: 'Hospitality', summary: 'Guest-facing service for restaurants, banqueting and events.', tasks: ['Table and banquet service', 'Order taking and guest care', 'Setting up and clearing service areas'], helpful: ['Venues you have served in', 'Languages spoken', 'Event or banqueting experience'] },
  { id: 'housekeeper', title: 'Housekeeper / Room attendant', category: 'Hospitality', summary: 'Rooms and public-area care for hotels, residences and serviced apartments.', tasks: ['Room turnover to property standards', 'Linen handling and amenity restocking', 'Reporting maintenance issues'], helpful: ['Property types and room counts', 'Years of experience', 'Supervisory experience, if any'] },
  { id: 'reception', title: 'Receptionist / Guest relations', category: 'Hospitality', summary: 'Front-of-house roles where calm, clear communication shapes the first impression.', tasks: ['Welcoming and checking in guests', 'Handling requests and enquiries', 'Coordinating with other departments'], helpful: ['Front-desk systems used', 'Languages spoken', 'Customer service background'] },
  { id: 'mason', title: 'Mason', category: 'Construction', summary: 'Blockwork, brickwork and plastering on building sites.', tasks: ['Laying block and brick to drawings', 'Mixing and applying mortar and plaster', 'Following site safety procedures'], helpful: ['Project types worked on', 'Years in the trade', 'Trade certificates held'] },
  { id: 'electrician', title: 'Electrician', category: 'Construction', summary: 'Installation and maintenance of electrical systems on site and in buildings.', tasks: ['Wiring, containment and fixtures', 'Testing and fault finding', 'Working to drawings and safety rules'], helpful: ['Residential, commercial or industrial focus', 'Qualifications and licences held', 'Years of experience'] },
  { id: 'steel-fixer', title: 'Steel fixer / Scaffolder', category: 'Construction', summary: 'Structural site trades supporting concrete works and safe access at height.', tasks: ['Cutting, bending and fixing reinforcement', 'Erecting and dismantling scaffolding', 'Working at height safely'], helpful: ['Which trade you practise', 'Safety training completed', 'Site types worked on'] },
  { id: 'hvac', title: 'HVAC technician', category: 'Technical & facilities', summary: 'Servicing and repair of heating, ventilation and air-conditioning systems.', tasks: ['Preventive maintenance routines', 'Diagnosing and repairing faults', 'Keeping service records'], helpful: ['Systems and brands you know', 'Certifications held', 'Years of experience'] },
  { id: 'plumber', title: 'Plumber', category: 'Technical & facilities', summary: 'Water supply and drainage work in new builds and operating buildings.', tasks: ['Pipework installation and repair', 'Fitting sanitary ware', 'Responding to maintenance calls'], helpful: ['New build or maintenance focus', 'Qualifications held', 'Years of experience'] },
  { id: 'maintenance', title: 'Maintenance technician', category: 'Technical & facilities', summary: 'Multi-skilled upkeep for hotels, offices and residential buildings.', tasks: ['General repairs across trades', 'Planned and reactive maintenance', 'Reporting and escalation'], helpful: ['Trades you cover', 'Building types maintained', 'Years of experience'] },
  { id: 'cleaner', title: 'Cleaner / Cleaning operative', category: 'Cleaning', summary: 'Consistent cleaning standards for hotels, offices, retail and post-construction sites.', tasks: ['Daily and deep cleaning routines', 'Safe use of equipment and chemicals', 'Working to checklists and schedules'], helpful: ['Settings you have cleaned in', 'Machine or equipment experience', 'Availability and shift preferences'] },
  { id: 'logistics', title: 'Driver / Storekeeper', category: 'Logistics', summary: 'Moving people and stock reliably: driving, warehouse and store roles.', tasks: ['Driving routes safely and on time', 'Receiving, storing and issuing stock', 'Keeping accurate records'], helpful: ['Licence categories held', 'Warehouse or store systems used', 'Years of experience'] },
];

type Region = 'Europe' | 'North America' | 'Either';
const regions: Region[] = ['Either', 'Europe', 'North America'];
const regionText = (r: Region) => (r === 'Either' ? 'Europe or North America' : r);

function mailto(role: Role, region: Region) {
  const subject = `Candidate enquiry: ${role.title} (${regionText(region)})`;
  const body = `Hello Blackhood team,\n\nI would like to enquire about ${role.title} roles in ${regionText(region)}.\n\nName:\nNationality and current country:\nYears of experience:\nRecent roles:\nLanguages spoken:\nRegion of interest: ${regionText(region)}\nPreferred countries (if any):\nAvailability:\n\nI understand this is an enquiry, not an application for a confirmed vacancy, and that no job, placement or visa is promised.\n\nThank you.`;
  return `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
function generalMailto(region: Region) {
  const body = `Hello Blackhood team,\n\nI would like to make a general candidate enquiry about work in ${regionText(region)}.\n\nName:\nTrade or role:\nYears of experience:\nLanguages spoken:\nAvailability:\n\nI understand this is an enquiry only.\n\nThank you.`;
  return `mailto:${EMAIL}?subject=${encodeURIComponent(`Candidate enquiry: ${regionText(region)} (general)`)}&body=${encodeURIComponent(body)}`;
}

function setMeta(attr: 'name' | 'property', key: string, value: string) {
  let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
  if (!el) { el = document.createElement('meta'); el.setAttribute(attr, key); document.head.appendChild(el); }
  el.content = value;
}

const landmarks = [
  { src: '/images/europe-paris.jpg', place: 'Paris', mark: 'Eiffel Tower', alt: 'The Eiffel Tower in Paris' },
  { src: '/images/europe-rome.jpg', place: 'Rome', mark: 'Colosseum', alt: 'The Colosseum in Rome' },
  { src: '/images/europe-berlin.jpg', place: 'Berlin', mark: 'Brandenburg Gate', alt: 'The Brandenburg Gate in Berlin' },
  { src: '/images/north-america-new-york.jpg', place: 'New York', mark: 'Statue of Liberty', alt: 'The Statue of Liberty in New York Harbor' },
  { src: '/images/north-america-toronto.jpg', place: 'Toronto', mark: 'CN Tower skyline', alt: 'The Toronto skyline with the CN Tower' },
].map((l) => ({ ...l, region: l.src.includes('north-america') ? 'North America' : 'Europe' }));
const galleryOrder = ['Paris', 'New York', 'Rome', 'Toronto', 'Berlin'];

function useRipple() {
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number; size: number }[]>([]);
  const off = useMotionOff();
  const add = (e: RPointerEvent<HTMLElement>) => {
    if (off) return;
    const r = e.currentTarget.getBoundingClientRect();
    const size = Math.max(r.width, r.height) * 2;
    setRipples((list) => [...list, { id: Date.now() + Math.random(), x: e.clientX - r.left - size / 2, y: e.clientY - r.top - size / 2, size }]);
  };
  const layer = ripples.map((rp) => <span key={rp.id} className="ripple" style={{ left: rp.x, top: rp.y, width: rp.size, height: rp.size }} onAnimationEnd={() => setRipples((list) => list.filter((x) => x.id !== rp.id))} />);
  return { add, layer };
}

function RoleCard({ role, index, order, region }: { role: Role; index: number; order: number; region: Region }) {
  const [open, setOpen] = useState(false);
  const off = useMotionOff();
  const ref = useRef<HTMLElement>(null);
  const detailRipple = useRipple();
  const mailRipple = useRipple();
  const panel = `role-panel-${role.id}`;
  const onMove = (e: RPointerEvent<HTMLElement>) => {
    if (off || e.pointerType !== 'mouse' || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    ref.current.style.setProperty('--ry', `${(((e.clientX - r.left) / r.width) - 0.5) * 6}deg`);
    ref.current.style.setProperty('--rx', `${(((e.clientY - r.top) / r.height) - 0.5) * -6}deg`);
  };
  const onLeave = () => { ref.current?.style.setProperty('--rx', '0deg'); ref.current?.style.setProperty('--ry', '0deg'); };
  return (
    <motion.div
      layout={!off}
      initial={{ opacity: 0, y: off ? 0 : 28, scale: off ? 1 : 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: off ? 1 : 0.94, transition: { duration: off ? 0 : 0.2 } }}
      transition={off ? { duration: 0 } : { type: 'spring', stiffness: 240, damping: 26, delay: Math.min(order, 8) * 0.045 }}
    >
      <div className="float-soft h-full" style={{ animationDelay: `${-(index % 5) * 1.3}s` }}>
        <article ref={ref} onPointerMove={onMove} onPointerLeave={onLeave} className="m-card group relative flex h-full flex-col rounded-[1.5rem] bg-[#FCFDFE] p-6 ring-1 ring-[#7898C0]/15" data-testid={`card-role-${role.id}`}>
          <span className="pointer-events-none absolute inset-x-6 top-0 h-[3px] origin-left scale-x-0 rounded-b-full bg-gradient-to-r from-[#F84848] to-[#7898C0] transition-transform duration-500 group-hover:scale-x-100 group-focus-within:scale-x-100" />
          <div className="flex items-start justify-between gap-4">
            <span className="rounded-full bg-[#D8E8F0] px-3 py-1.5 text-[0.68rem] font-bold uppercase tracking-[0.1em] text-[#33404A]">{role.category}</span>
            <span className="font-mono text-xs text-[#F84848]">{String(index + 1).padStart(2, '0')}</span>
          </div>
          <h3 className="mt-8 font-display text-[1.7rem] leading-[1.02] tracking-[-0.04em]">{role.title}</h3>
          <p className="mt-3 text-sm leading-6 text-[#33404A]">{role.summary}</p>
          <button type="button" aria-expanded={open} aria-controls={panel} onPointerDown={detailRipple.add} onClick={() => setOpen((o) => !o)} className="relative mt-5 flex items-center gap-2 self-start overflow-hidden rounded-full bg-[#D8E8F0]/70 px-4 py-2 text-xs font-bold uppercase tracking-[0.1em] text-[#000000] transition-colors hover:bg-[#F8A0A0]/70" data-testid={`button-role-details-${role.id}`}>
            {detailRipple.layer}
            <span className="relative">{open ? 'Hide details' : 'Role details'}</span>
            <motion.span className="relative" animate={{ rotate: open ? 180 : 0 }} transition={off ? { duration: 0 } : { type: 'spring', stiffness: 300, damping: 20 }}><ChevronDown size={14} /></motion.span>
          </button>
          <AnimatePresence initial={false}>
            {open && (
              <motion.div id={panel} key="panel" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={off ? { duration: 0 } : { type: 'spring', stiffness: 220, damping: 28 }} className="overflow-hidden">
                <div className="mt-4 grid gap-4 border-t border-[#000000]/10 pt-4 text-sm leading-6 text-[#33404A]">
                  <div><p className="eyebrow text-[#F84848]">Typical work</p><ul className="mt-2 grid gap-1">{role.tasks.map((t) => <li key={t} className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#F84848]" />{t}</li>)}</ul></div>
                  <div><p className="eyebrow text-[#F84848]">Useful to mention</p><ul className="mt-2 grid gap-1">{role.helpful.map((t) => <li key={t} className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#7898C0]" />{t}</li>)}</ul></div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <a href={mailto(role, region)} onPointerDown={mailRipple.add} className="relative mt-6 flex items-center justify-between gap-3 overflow-hidden rounded-full bg-[#F84848] px-5 py-3 text-sm font-bold text-white shadow-[0_8px_20px_-10px_rgba(248,72,72,0.8)] transition-transform hover:-translate-y-0.5" data-testid={`link-role-enquire-${role.id}`}>
            {mailRipple.layer}
            <span className="relative flex items-center gap-2"><Mail size={15} /> Email an enquiry</span><ArrowUpRight size={16} className="relative" />
          </a>
        </article>
      </div>
    </motion.div>
  );
}

export default function WorkInEurope() {
  useEffect(() => {
    const title = 'Work in Europe & North America | Role categories to enquire about | Blackhood Qatar';
    const description = 'Explore the role categories candidates can enquire about with Blackhood for Europe and North America: hospitality, construction, technical, cleaning and logistics. Enquiries only, not live vacancies or visa promises.';
    document.title = title;
    setMeta('name', 'description', description);
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:image', '/images/europe-paris.jpg');
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description);
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  const [query, setQuery] = useState('');
  const [active, setActive] = useState<Category | 'All'>('All');
  const [region, setRegion] = useState<Region>('Either');
  const gMail = generalMailto(region);
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return roles.filter((r) => (active === 'All' || r.category === active) && (!q || `${r.title} ${r.summary} ${r.category} ${r.tasks.join(' ')}`.toLowerCase().includes(q)));
  }, [query, active]);
  const hasFilters = query !== '' || active !== 'All';
  const reset = () => { setQuery(''); setActive('All'); };

  return (
    <>
      {/* Hero */}
      <section className="grain relative isolate min-h-[640px] overflow-hidden bg-[#D8E8F0] text-[#000000]">
        <MovingPhoto src="/images/europe-paris.jpg" alt="The Eiffel Tower rising over Paris" className="absolute inset-0 -z-10" strength={0.08} />
        <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-[#F4F8FB]/88 via-[#F4F8FB]/45 to-transparent max-lg:bg-gradient-to-t max-lg:from-[#F4F8FB]/92 max-lg:via-[#F4F8FB]/55 max-lg:to-[#F4F8FB]/10" />
        <div className="relative mx-auto grid min-h-[640px] max-w-[1440px] items-end gap-10 px-5 pb-12 pt-20 sm:px-8 lg:grid-cols-[1fr_320px] lg:px-12">
          <div className="max-w-3xl rounded-[1.75rem] border border-white/70 bg-white/45 p-6 shadow-[0_30px_80px_-30px_rgba(40,70,100,0.35)] backdrop-blur-xl sm:p-10">
            <div className="reveal mb-7 flex items-center gap-3"><span className="h-px w-8 bg-[#F84848]" /><Label>For candidates · Europe &amp; North America</Label></div>
            <h1 className="reveal reveal-delay-1 font-display text-[clamp(3.2rem,7.4vw,7.4rem)] font-semibold leading-[0.86] tracking-[-0.075em]">Your trade.<br /><span className="text-[#F84848]">A wider horizon.</span></h1>
            <p className="reveal reveal-delay-2 mt-7 max-w-xl text-lg leading-8 text-[#1F2A33]">Skilled and semi-skilled people ask us about work in Europe and North America. Here are the role categories you can enquire about, and an honest picture of how that conversation starts.</p>
            <div className="reveal reveal-delay-3 mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#roles" className="flex w-fit items-center gap-3 rounded-full bg-[#F84848] px-6 py-3.5 text-sm font-bold text-white shadow-[0_12px_30px_-12px_rgba(248,72,72,0.7)] transition-transform hover:-translate-y-1" data-testid="link-europe-roles">Browse role categories <ArrowDown size={17} /></a>
              <a href={gMail} className="flex w-fit items-center gap-3 rounded-full border border-[#000000]/20 bg-white/60 px-6 py-3.5 text-sm font-bold transition-colors hover:bg-white" data-testid="link-europe-general-email">Email a general enquiry <Mail size={16} /></a>
            </div>
          </div>
          <div className="hidden gap-3 lg:grid">
            {[['/images/north-america-new-york.jpg', 'New York', 'The Statue of Liberty'], ['/images/north-america-toronto.jpg', 'Toronto', 'Toronto skyline with the CN Tower']].map(([src, place, alt], i) => (
              <figure key={place} className={`float-soft overflow-hidden rounded-2xl border border-white/70 bg-white/60 p-2 shadow-[0_24px_50px_-24px_rgba(40,70,100,0.5)] backdrop-blur-md ${i ? 'ml-10' : ''}`} style={{ animationDelay: `${-i * 2.5}s` }}>
                <img src={src} alt={alt} className="aspect-[16/10] w-full rounded-xl object-cover" />
                <figcaption className="px-2 pb-1 pt-2 text-xs font-bold">{place} <span className="font-normal text-[#33404A]">· inspiration only</span></figcaption>
              </figure>
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-full bg-white/60 px-4 py-2 text-xs text-[#33404A] backdrop-blur-md lg:col-span-2">
            <span>Photos: Eiffel Tower, Statue of Liberty, CN Tower. Shown as inspiration, not job locations.</span>
            <MotionToggle tone="light" />
          </div>
        </div>
      </section>

      {/* Honesty notice */}
      <section className="bg-[#F8A0A0] px-5 py-10 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-[1240px] flex-col gap-5 rounded-2xl bg-[#F8F8F8] p-6 sm:flex-row sm:items-start sm:p-8" role="note" data-testid="text-europe-disclaimer">
          <AlertCircle size={26} className="shrink-0 text-[#F84848]" />
          <div>
            <h2 className="font-display text-2xl tracking-[-0.03em]">Please read first: these are role categories, not live vacancies.</h2>
            <p className="mt-3 max-w-3xl text-base leading-7 text-[#33404A]">Blackhood is established in Doha, Qatar. The positions below are the kinds of work you can enquire about for Europe and North America. They are not verified job openings, and we do not list employers, salaries, countries, deadlines or visa outcomes. We do not claim coverage in any particular country. Emailing us starts a conversation; we will tell you plainly whether we can help.</p>
          </div>
        </div>
      </section>

      {/* Roles */}
      <section id="roles" className={`scroll-mt-6 bg-[#D8E8F0] ${wrap}`}>
        <div className="mx-auto max-w-[1240px]">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div><Label>Role categories to enquire about</Label><h2 className="mt-5 font-display text-[clamp(2.5rem,4.6vw,4.9rem)] font-medium leading-[0.9] tracking-[-0.065em]">Find the work<br /><span className="text-[#F84848]">you know.</span></h2></div>
            <p className="max-w-lg text-base leading-7 text-[#33404A] lg:justify-self-end">Based on the sectors in our company brochure. Choose Europe, North America or either, open a card for typical duties, then email us with the role and region already in the subject line.</p>
          </div>

          <div className="m-card mt-12 flex flex-col gap-4 rounded-[1.5rem] bg-[#FCFDFE] p-4 sm:p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <span className="text-xs font-bold uppercase tracking-[0.1em] text-[#33404A]">Region of interest</span>
              <LayoutGroup id="region">
                <div className="flex w-fit rounded-full bg-[#D8E8F0] p-1" role="radiogroup" aria-label="Region of interest">
                  {regions.map((r) => (
                    <button key={r} type="button" role="radio" aria-checked={region === r} onClick={() => setRegion(r)} className="relative rounded-full px-4 py-2 text-xs font-bold" data-testid={`button-region-${r.toLowerCase().replace(/\s+/g, '-')}`}>
                      {region === r && <motion.span layoutId="region-pill" className="absolute inset-0 rounded-full bg-white shadow-[0_4px_12px_-4px_rgba(40,70,100,0.35)]" transition={{ type: 'spring', stiffness: 300, damping: 28 }} />}
                      <span className={`relative ${region === r ? 'text-[#F84848]' : 'text-[#33404A]'}`}>{r === 'Either' ? 'Either region' : r}</span>
                    </button>
                  ))}
                </div>
              </LayoutGroup>
              <span className="text-xs text-[#33404A]" data-testid="text-region-note">Emails will mention {regionText(region)}.</span>
            </div>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
            <label className="relative flex-1">
              <span className="sr-only">Search roles</span>
              <Search size={17} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#33404A]/60" />
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search roles, e.g. chef, HVAC, driver" className="w-full rounded-full border border-[#000000]/15 bg-transparent py-3 pl-11 pr-10 text-sm outline-none focus:border-[#F84848]" data-testid="input-role-search" />
              {query && <button type="button" onClick={() => setQuery('')} aria-label="Clear search" className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-[#33404A] hover:text-[#F84848]" data-testid="button-clear-search"><X size={15} /></button>}
            </label>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
              {(['All', ...categories] as const).map((c) => (
                <button key={c} type="button" aria-pressed={active === c} onClick={() => setActive(c)} className={`rounded-full px-4 py-2 text-xs font-bold transition-colors ${active === c ? 'bg-[#F84848] text-white' : 'bg-[#D8E8F0] text-[#33404A] hover:bg-[#F8A0A0]'}`} data-testid={`button-filter-${c.toLowerCase().replace(/[^a-z]+/g, '-')}`}>{c}</button>
              ))}
            </div>
          </div>
          </div>
          <div className="mt-5 flex items-center justify-between text-sm text-[#33404A]">
            <span aria-live="polite" data-testid="text-role-count">Showing {filtered.length} of {roles.length} role categories</span>
            {hasFilters && <button type="button" onClick={reset} className="flex items-center gap-2 font-bold text-[#F84848] hover:text-[#000000]" data-testid="button-reset-filters"><RotateCcw size={14} /> Reset filters</button>}
          </div>

          {filtered.length > 0 ? (
            <LayoutGroup id="roles">
              <div className="mt-8 grid items-start gap-5 md:grid-cols-2 lg:grid-cols-3" data-no-reveal>
                <AnimatePresence mode="popLayout">
                  {filtered.map((r, i) => <RoleCard key={r.id} role={r} index={roles.indexOf(r)} order={i} region={region} />)}
                </AnimatePresence>
              </div>
            </LayoutGroup>
          ) : (
            <div className="mt-6 grid items-center gap-8 overflow-hidden rounded-[1.5rem] bg-[#F8A0A0] text-[#000000] md:grid-cols-[1fr_0.8fr]" data-testid="status-roles-empty">
              <div className="p-8 sm:p-10">
                <Label>No matching category</Label>
                <h3 className="mt-4 font-display text-4xl leading-[0.95] tracking-[-0.05em]">Nothing here yet for that search.</h3>
                <p className="mt-4 max-w-md text-sm leading-6 text-[#1F2A33]">Your trade may still be worth asking about. Reset the filters, or email us a general enquiry describing your experience.</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <button type="button" onClick={reset} className="flex items-center gap-2 rounded-full bg-[#F84848] px-5 py-3 text-sm font-bold text-white" data-testid="button-empty-reset"><RotateCcw size={15} /> Reset filters</button>
                  <a href={gMail} className="flex items-center gap-2 rounded-full border border-[#000000]/20 bg-white/60 px-5 py-3 text-sm font-bold" data-testid="link-empty-email"><Mail size={15} /> General enquiry</a>
                </div>
              </div>
              <img src="/images/europe-berlin.jpg" alt="The Brandenburg Gate in Berlin" className="h-full min-h-[220px] w-full object-cover" />
            </div>
          )}
        </div>
      </section>

      {/* Landmark gallery */}
      <section className={`relative overflow-hidden bg-[#EEF5F9] ${wrap}`}>
        <div className="pointer-events-none absolute -left-40 top-20 h-[480px] w-[480px] rounded-full bg-[#F8A0A0]/40 blur-3xl" />
        <div className="relative mx-auto max-w-[1240px]">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div><Label>Work in Europe and North America</Label><h2 className="mt-5 font-display text-[clamp(2.5rem,4.6vw,4.9rem)] font-medium leading-[0.9] tracking-[-0.065em]">Places people<br /><span className="text-[#F84848]">dream of working.</span></h2></div>
            <p className="max-w-lg text-base leading-7 text-[#33404A] lg:justify-self-end">Cities across Europe and North America run on hotels, sites, kitchens and buildings, and on the people who keep them going. These images are inspiration only: they do not indicate offices, employers, coverage or confirmed placements in these cities.</p>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-6">
            {galleryOrder.map((name, i) => {
              const l = landmarks.find((x) => x.place === name)!;
              const big = i < 2;
              return (
                <figure key={l.place} className={`photo-frame relative rounded-2xl ${big ? 'min-h-[380px] md:col-span-3 md:min-h-[500px]' : 'min-h-[300px] md:col-span-2'}`} data-testid={`img-landmark-${l.place.toLowerCase().replace(/\s+/g, '-')}`}>
                  <img src={l.src} alt={l.alt} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-[#F4F8FB]/70 to-transparent" />
                  <figcaption className="absolute inset-x-3 bottom-3 flex items-end justify-between gap-3 rounded-2xl border border-white/70 bg-white/70 px-4 py-3 text-[#000000] backdrop-blur-md">
                    <div><p className="font-display text-3xl leading-none tracking-[-0.05em] sm:text-4xl">{l.place}</p><p className="mt-1 text-xs text-[#33404A]">{l.mark} · {l.region}</p></div>
                    <span className="shrink-0 rounded-full bg-[#D8E8F0] px-2.5 py-1 text-[0.6rem] font-bold uppercase tracking-[0.12em] text-[#33404A]">Inspiration only</span>
                  </figcaption>
                </figure>
              );
            })}
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className={`bg-[#F8F8F8] ${wrap}`}>
        <div className="mx-auto grid max-w-[1240px] gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <Label>How to enquire</Label>
            <h2 className="mt-5 font-display text-[clamp(2.5rem,4.6vw,4.6rem)] font-medium leading-[0.9] tracking-[-0.065em]">Four honest<br /><span className="text-[#F84848]">steps.</span></h2>
            <div className="photo-frame mt-10 aspect-[4/3] rounded-2xl"><img src="/images/blackhood-people-manager.jpg" alt="A Blackhood manager in conversation with workers" loading="lazy" className="h-full w-full object-cover" /></div>
          </div>
          <ol className="grid gap-4 self-end sm:grid-cols-2">
            {[
              ['Choose a category', 'Pick the role that best matches the work you have actually done.'],
              ['Email us directly', `Use the role button to open an email to ${EMAIL} with the subject filled in.`],
              ['Share the basics', 'Experience, recent roles, languages and availability. Do not send passport copies or sensitive documents at this stage.'],
              ['Hear back plainly', 'If there is a suitable conversation to have, we will explain the next step. If not, we will say so.'],
            ].map(([t, b], i) => (
              <li key={t} className="rounded-2xl border border-[#000000]/12 p-6">
                <span className="font-mono text-xs text-[#F84848]">Step 0{i + 1}</span>
                <h3 className="mt-10 font-display text-2xl tracking-[-0.03em]">{t}</h3>
                <p className="mt-3 text-sm leading-6 text-[#33404A]">{b}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQ */}
      <section className={`bg-[#D8E8F0] ${wrap}`}>
        <div className="mx-auto grid max-w-[1240px] gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          <div>
            <Label>Candidate questions</Label>
            <h2 className="mt-5 font-display text-5xl leading-[0.9] tracking-[-0.06em]">Straight<br />answers.</h2>
            <div className="photo-frame mt-10 hidden aspect-[4/5] rounded-2xl lg:block"><img src="/images/europe-rome.jpg" alt="The Colosseum in Rome" loading="lazy" className="h-full w-full object-cover" /></div>
          </div>
          <Faq id="europe" items={[
            ['Are these real job vacancies?', 'No. They are role categories you can enquire about. We do not publish live vacancies, employers or vacancy numbers on this page.'],
            ['Can you guarantee a visa or a job in Europe or North America?', 'No. Nobody honest can promise that up front. Any opportunity depends on specific employers, countries and legal requirements, and we discuss those individually.'],
            ['Do you have offices in Paris, Rome, Berlin, New York or Toronto?', 'No. Blackhood is established in Doha, Qatar. The city photographs are inspiration only.'],
            ['Should I pay anything to enquire?', 'No. Sending an enquiry email costs nothing. Be careful of anyone asking for fees in exchange for a promised job.'],
            ['Can I upload my CV here?', 'Not on this site. Email is the way to start. Share a short summary first; we will say if and when anything more is needed.'],
            ['I am an employer in Europe or North America. Where do I go?', 'Use the employer enquiry form on our Contact page instead. This page is for candidates.'],
          ]} />
        </div>
      </section>

      {/* CTA */}
      <section className="relative isolate overflow-hidden bg-[#F84848] px-5 py-24 text-[#F8F8F8] sm:px-8 sm:py-32 lg:px-12">
        <div className="mx-auto flex max-w-[1240px] flex-col justify-between gap-10 lg:flex-row lg:items-end">
          <div><Label dark>Start with an email</Label><h2 className="mt-5 font-display text-[clamp(3rem,6vw,7rem)] font-medium leading-[0.84] tracking-[-0.075em]">Tell us about<br /><span className="text-[#000000]">your work.</span></h2></div>
          <div className="max-w-sm">
            <p className="text-lg leading-8 text-white/80">A short, clear email is enough to begin. Hiring for a team instead? Use the employer route.</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href={gMail} className="inline-flex items-center gap-3 rounded-full bg-[#000000] px-6 py-3.5 text-sm font-bold text-[#F8F8F8] transition-transform hover:-translate-y-1" data-testid="link-europe-cta-email">Email {EMAIL} <Mail size={16} /></a>
              <Link href="/contact" className="inline-flex items-center gap-2 border-b border-white pb-1 text-sm font-bold" data-testid="link-europe-cta-employer">Employer enquiry <ArrowUpRight size={15} /></Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
