import { useEffect, useState, type FormEvent, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Building2,
  Check,
  ChevronDown,
  Globe2,
  HeartHandshake,
  Mail,
  MapPin,
  Menu,
  Phone,
  Send,
  X,
} from 'lucide-react';
import { Link, Route, Switch, useLocation } from 'wouter';
import { HomeCommitment, HomeFacts, HomeProcess, HomeSectors } from '@/sections/home-sections';
import { MixedTeams, ServiceExplorer, ServicesFaq, StaffingModels } from '@/sections/services-sections';
import { Expectations, PeopleCommitment, RoleFamilies, WorkforceFaq } from '@/sections/workforce-sections';
import { AboutStory, CoreValues, MissionVision, Responsibility } from '@/sections/about-sections';
import { EuropeGuidance, QatarContext, ReachFaq, ReachSectors } from '@/sections/reach-sections';
import { ContactChannels, ContactFaq, NextSteps, RequirementChecklist } from '@/sections/contact-sections';
import { HomeHero } from '@/sections/home-hero';
import WorkInEurope from '@/pages/work-in-europe';
import { GlobalMotionDock, RouteMotion } from '@/motion/motion';
import { HomeReach } from '@/sections/home-explorer';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';

const queryClient = new QueryClient();

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Workforce', href: '/workforce' },
  { label: 'About', href: '/about' },
  { label: 'Reach', href: '/reach' },
  { label: 'Europe & North America', href: '/work-in-europe' },
];

function usePageMeta(title: string, description: string) {
  useEffect(() => {
    document.title = title;
    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    meta.content = description;
    for (const [attr, key, value] of [['property', 'og:title', title], ['property', 'og:description', description], ['name', 'twitter:title', title], ['name', 'twitter:description', description]] as const) {
      let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
      if (!el) { el = document.createElement('meta'); el.setAttribute(attr, key); document.head.appendChild(el); }
      el.content = value;
    }
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [title, description]);
}

function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  return (
    <header className="relative z-40 bg-[#000000] text-[#F8F8F8]">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-4 sm:px-8 lg:px-12">
        <Link href="/" className="flex items-center rounded-xl bg-[#F8F8F8] px-2 py-1" data-testid="link-logo" aria-label="Blackhood Qatar home">
          <img src="/brand/blackhood-logo.png" alt="Blackhood Qatar" className="h-10 w-auto object-contain sm:h-12" />
        </Link>
        <nav className="hidden items-center gap-5 xl:flex 2xl:gap-7" aria-label="Primary navigation">
          {navItems.map((item) => {
            const active = location === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative whitespace-nowrap py-3 text-[0.78rem] font-semibold transition-colors ${active ? 'text-[#FF4C4F]' : 'text-[#F8F8F8]/70 hover:text-[#F8F8F8]'}`}
                data-testid={`link-nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {item.label}
                {active && <span className="absolute inset-x-0 bottom-1 h-px bg-[#FF4C4F]" />}
              </Link>
            );
          })}
          <Link href="/contact" className="group flex items-center gap-2 whitespace-nowrap rounded-full bg-[#F8F8F8] px-4 py-2.5 text-[0.78rem] font-bold text-[#000000] transition-transform hover:-translate-y-0.5" data-testid="link-header-enquiry">
            Start an enquiry <ArrowUpRight size={15} strokeWidth={2.5} />
          </Link>
        </nav>
        <button type="button" className="rounded-full border border-[#F8F8F8]/30 p-2.5 text-[#F8F8F8] xl:hidden" onClick={() => setMobileOpen((open) => !open)} aria-label={mobileOpen ? 'Close menu' : 'Open menu'} aria-expanded={mobileOpen} data-testid="button-mobile-menu">
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {mobileOpen && (
        <div className="absolute inset-x-4 top-[76px] rounded-2xl border border-[#F8F8F8]/15 bg-[#000000]/98 p-3 shadow-2xl backdrop-blur-md xl:hidden">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className={`block rounded-xl px-4 py-3 text-sm font-semibold ${location === item.href ? 'bg-[#F84848] text-white' : 'text-[#F8F8F8]/80 hover:bg-[#F8F8F8]/10'}`} data-testid={`link-mobile-${item.label.toLowerCase().replace(/\s+/g, '-')}`}>
              {item.label}
            </Link>
          ))}
          <Link href="/contact" className="mt-2 flex items-center justify-between rounded-xl bg-[#F84848] px-4 py-3 text-sm font-bold text-white" data-testid="link-mobile-enquiry">
            Start an enquiry <ArrowUpRight size={17} />
          </Link>
        </div>
      )}
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-[#000000] px-5 py-12 text-[#F8F8F8] sm:px-8 lg:px-12">
      <div className="mx-auto grid max-w-[1240px] gap-10 border-b border-[#F8F8F8]/15 pb-10 md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <Link href="/" className="inline-block rounded-lg bg-[#F8F8F8] px-2 py-1" data-testid="link-footer-logo">
            <img src="/brand/blackhood-logo.png" alt="Blackhood Qatar" className="h-11 w-auto object-contain" />
          </Link>
          <p className="mt-5 max-w-xs text-sm leading-6 text-[#F8F8F8]/55">Dependable workforce solutions for Qatar and Europe, built around people who take pride in the work.</p>
        </div>
        <div>
          <p className="eyebrow text-[#FF4C4F]">Explore</p>
          <div className="mt-5 grid gap-3 text-sm text-[#F8F8F8]/70">
            {navItems.slice(1).map((item) => <Link key={item.href} href={item.href} className="transition-colors hover:text-[#FF4C4F]" data-testid={`link-footer-${item.label.toLowerCase().replace(/\s+/g, '-')}`}>{item.label}</Link>)}
          </div>
        </div>
        <div>
          <p className="eyebrow text-[#FF4C4F]">Talk to us</p>
          <div className="mt-5 grid gap-3 text-sm text-[#F8F8F8]/70">
            <a href="mailto:info@blackhoodqatar.com" className="transition-colors hover:text-[#FF4C4F]" data-testid="link-footer-email">info@blackhoodqatar.com</a>
            <a href="tel:+97450631980" className="transition-colors hover:text-[#FF4C4F]" data-testid="link-footer-phone">+974 5063 1980</a>
            <Link href="/contact" className="transition-colors hover:text-[#FF4C4F]" data-testid="link-footer-contact">Employer enquiries</Link>
            <span>Qatar · Europe · North America enquiries</span>
          </div>
        </div>
      </div>
      <div className="mx-auto flex max-w-[1240px] flex-col justify-between gap-3 pt-6 text-xs text-[#F8F8F8]/40 sm:flex-row">
        <span>© {new Date().getFullYear()} Blackhood Qatar. All rights reserved.</span>
        <span>People-first workforce solutions.</span>
      </div>
    </footer>
  );
}

function PageIntro({ eyebrow, title, text, image, imageAlt, dark = false }: { eyebrow: string; title: ReactNode; text: string; image: string; imageAlt: string; dark?: boolean }) {
  return (
    <section className={`grain relative overflow-hidden ${dark ? 'bg-[#000000] text-[#F8F8F8]' : 'bg-[#D8E8F0] text-[#000000]'}`}>
      <div className="mx-auto grid min-h-[520px] max-w-[1440px] items-stretch lg:grid-cols-[0.9fr_1.1fr]">
        <div className="flex flex-col justify-center px-5 py-20 sm:px-8 lg:px-12 lg:py-24">
          <p className={`eyebrow ${dark ? 'text-[#FF4C4F]' : 'text-[#F84848]'}`}>{eyebrow}</p>
          <h1 className="mt-6 max-w-3xl font-display text-[clamp(3.4rem,7vw,7.4rem)] font-medium leading-[0.86] tracking-[-0.075em]">{title}</h1>
          <p className={`mt-8 max-w-xl text-lg leading-8 ${dark ? 'text-[#F8F8F8]/68' : 'text-[#33404A]'}`}>{text}</p>
        </div>
        <div className="photo-frame min-h-[330px] lg:min-h-0">
          <img src={image} alt={imageAlt} className="h-full w-full object-cover" />
        </div>
      </div>
    </section>
  );
}

function SectionLabel({ children, dark = false }: { children: string; dark?: boolean }) {
  return <p className={`eyebrow ${dark ? 'text-[#FF4C4F]' : 'text-[#F84848]'}`}>{children}</p>;
}

function ArrowLink({ href, children, light = false }: { href: string; children: string; light?: boolean }) {
  return <Link href={href} className={`inline-flex items-center gap-2 border-b pb-1.5 text-sm font-bold transition-colors ${light ? 'border-[#FF4C4F] text-[#FF4C4F] hover:text-white' : 'border-[#F84848] text-[#F84848] hover:text-[#000000]'}`} data-testid={`link-${href.replace('/', '') || 'home'}-cta`}>{children} <ArrowUpRight size={16} /></Link>;
}

function Home() {
  usePageMeta('Blackhood Qatar | Workforce solutions that move work forward', 'Blackhood connects dependable skilled and semi-skilled teams with employers across Qatar and Europe.');
  const cards = [
    { title: 'Hospitality & events', body: 'Guest-facing teams who understand pace, presentation and the detail that makes an operation feel effortless.', image: '/images/blackhood-hospitality-team.jpg', href: '/services' },
    { title: 'Technical & facilities', body: 'Practical people for the systems, buildings and spaces that keep your operation moving.', image: '/images/blackhood-technical-team.jpg', href: '/services' },
    { title: 'Cleaning & care', body: 'Reliable teams for consistent standards across residences, workplaces, hotels and public-facing spaces.', image: '/images/blackhood-care-team.jpg', href: '/services' },
  ];
  return (
    <>
      <HomeHero />
      <HomeFacts />
      <section className="bg-[#F8F8F8] px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
        <div className="mx-auto grid max-w-[1240px] gap-12 lg:grid-cols-[0.65fr_1.35fr] lg:gap-24">
          <div><SectionLabel>A workforce partner, not a hand-off</SectionLabel><div className="mt-7 flex items-start gap-3 text-[#F84848]"><span className="mt-1 h-2 w-2 rounded-full bg-[#F84848]" /><span className="font-display text-3xl leading-none tracking-[-0.04em]">Built for the workday</span></div></div>
          <div><h2 className="max-w-4xl font-display text-[clamp(2.7rem,5.3vw,5.5rem)] font-medium leading-[0.94] tracking-[-0.06em] text-[#000000]">Good people, placed with purpose.</h2><p className="mt-8 max-w-2xl text-lg leading-8 text-[#33404A]">Your operation needs more than a headcount. It needs people who show up ready, understand the standard and can become part of the team.</p><ArrowLink href="/about">See how we work</ArrowLink></div>
        </div>
      </section>
      <section className="bg-[#F8A0A0] px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
        <div className="mx-auto max-w-[1240px]"><div className="flex flex-col justify-between gap-5 border-b border-[#000000]/20 pb-7 sm:flex-row sm:items-end"><div><SectionLabel>What we bring to the floor</SectionLabel><h2 className="mt-4 font-display text-[clamp(2.8rem,5vw,5.7rem)] font-medium leading-[0.88] tracking-[-0.065em]">Capability with<br />a human pulse.</h2></div><p className="max-w-xs text-sm leading-6 text-[#33404A]">Flexible support for busy places, specialist teams and the standards your name stands for.</p></div>
          <div className="mt-8 grid gap-5 lg:grid-cols-3">{cards.map((card, index) => <Link href={card.href} className={`group photo-frame relative min-h-[430px] rounded-[1.5rem] ${index === 1 ? 'lg:mt-14' : index === 2 ? 'lg:mt-28' : ''}`} key={card.title} data-testid={`card-home-capability-${index}`}><img src={card.image} alt={card.title} className="absolute inset-0 h-full w-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-[#000000]/40 to-transparent" /><div className="relative flex h-full flex-col justify-between p-6 text-white sm:p-7"><span className="font-mono text-sm text-white/70">0{index + 1}</span><div><h3 className="font-display text-3xl font-medium leading-none tracking-[-0.04em] sm:text-4xl">{card.title}</h3><p className="mt-4 text-sm leading-6 text-white/75">{card.body}</p><span className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.1em] text-[#F8A0A0]">Explore <ArrowUpRight size={14} /></span></div></div></Link>)}</div>
        </div>
      </section>
      <HomeReach />
      <HomeSectors />
      <HomeProcess />
      <HomeCommitment />
      <CTASection />
    </>
  );
}

const services = [
  { number: '01', title: 'Hospitality manpower', roles: 'Chefs · Stewards · Housekeeping', body: 'Guest-facing teams who understand pace, presentation and the small details that make a stay memorable.', image: '/images/blackhood-hospitality-team.jpg' },
  { number: '02', title: 'Event staffing', roles: 'Event crews · Front of house · Support', body: 'Flexible people for launches, functions and busy event days where calm, capable service matters.', image: '/images/hospitality.jpg' },
  { number: '03', title: 'Technical & facilities', roles: 'HVAC · Plumbers · Maintenance', body: 'Hands-on technical support for the systems, buildings and facilities that keep your operation moving.', image: '/images/blackhood-technical-team.jpg' },
  { number: '04', title: 'Cleaning & care', roles: 'Professional cleaning · Housekeeping', body: 'Reliable teams for consistent standards in residences, workplaces, hotels and public-facing spaces.', image: '/images/blackhood-care-team.jpg' },
  { number: '05', title: 'Residential gardening', roles: 'Garden care · Grounds support', body: 'Practical support for the outdoor spaces that shape how a property feels and functions.', image: '/images/cleaning.jpg' },
];

function Services() {
  usePageMeta('Services | Blackhood Qatar', 'Explore Blackhood workforce capabilities across hospitality, events, technical, facilities, cleaning and gardening.');
  return <><PageIntro eyebrow="What we can put in place" title={<>Capabilities for<br /><span className="text-[#F84848]">real operations.</span></>} text="From the first guest arrival to the last maintenance check, Blackhood provides practical teams matched to the pace, standards and setting of your work." image="/images/blackhood-technical-team.jpg" imageAlt="Technical team working together on HVAC equipment" />
    <section className="bg-[#F8F8F8] px-5 py-24 sm:px-8 sm:py-32 lg:px-12"><div className="mx-auto max-w-[1240px]"><div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24"><div><SectionLabel>Service lines</SectionLabel><h2 className="mt-5 font-display text-[clamp(2.8rem,5vw,5.5rem)] leading-[0.9] tracking-[-0.065em]">The work,<br />covered.</h2><p className="mt-7 max-w-sm text-base leading-7 text-[#33404A]">Tell us the shape of your requirement and we will help you find the right combination of roles and support.</p></div><div className="divide-y divide-[#000000]/15 border-y border-[#000000]/15">{services.map((service) => <article className="group grid gap-6 py-8 sm:grid-cols-[0.17fr_1fr_0.78fr] sm:items-center" key={service.number} data-testid={`service-row-${service.number}`}><span className="font-mono text-xs text-[#F84848]">{service.number}</span><div><h3 className="font-display text-3xl tracking-[-0.04em]">{service.title}</h3><p className="mt-2 max-w-md text-sm leading-6 text-[#33404A]">{service.body}</p><p className="mt-4 text-xs font-bold uppercase tracking-[0.1em] text-[#F84848]">{service.roles}</p></div><div className="photo-frame h-32 overflow-hidden rounded-xl sm:h-28"><img src={service.image} alt="" className="h-full w-full object-cover" /></div></article>)}</div></div></div></section>
    <section className="bg-[#F8A0A0] px-5 py-24 sm:px-8 lg:px-12"><div className="mx-auto grid max-w-[1240px] gap-10 lg:grid-cols-3"><div><SectionLabel>One partner, fewer gaps</SectionLabel><h2 className="mt-5 font-display text-4xl leading-[0.92] tracking-[-0.05em]">Built around<br />your setting.</h2></div>{[['Listen closely', 'We start with your schedule, standard and actual working environment.'], ['Match thoughtfully', 'We look across skills, experience and the way your team works.'], ['Stay accountable', 'Clear communication and customer focus carry through after people arrive.']].map(([title, body], index) => <div className="border-t border-[#000000]/20 pt-6" key={title}><span className="font-mono text-xs text-[#F84848]">0{index + 1}</span><h3 className="mt-10 font-display text-2xl">{title}</h3><p className="mt-3 text-sm leading-6 text-[#33404A]">{body}</p></div>)}</div></section><ServiceExplorer /><StaffingModels /><MixedTeams /><ServicesFaq /><CTASection /></>;
}

function Workforce() {
  usePageMeta('Workforce | Blackhood Qatar', 'Meet the roles and people behind Blackhood workforce solutions for employers in Qatar and Europe.');
  const groups = [{ label: 'Hospitality', roles: ['Chefs', 'Stewards', 'Housekeeping', 'Front-of-house teams'] }, { label: 'Technical', roles: ['HVAC technicians', 'Plumbers', 'Maintenance teams', 'Facilities support'] }, { label: 'Operations', roles: ['Cleaning teams', 'Event staff', 'Garden care', 'Site support'] }];
  return <><PageIntro eyebrow="The people behind the service" title={<>A role for<br /><span className="text-[#F84848]">every rhythm.</span></>} text="Dependable work starts with people who are prepared, respected and clear on what good looks like. We help employers build teams that keep the day moving." image="/images/blackhood-people-manager.jpg" imageAlt="People manager speaking with a diverse workforce team" />
    <section className="bg-[#F8F8F8] px-5 py-24 sm:px-8 sm:py-32 lg:px-12"><div className="mx-auto grid max-w-[1240px] gap-14 lg:grid-cols-[0.76fr_1.24fr] lg:gap-24"><div><SectionLabel>Roles we support</SectionLabel><h2 className="mt-5 font-display text-[clamp(2.8rem,5vw,5.6rem)] leading-[0.9] tracking-[-0.065em]">People who<br />make it happen.</h2><p className="mt-7 max-w-sm text-base leading-7 text-[#33404A]">Across hospitality, technical services, facilities and events, we focus on the role and the person behind it.</p><div className="photo-frame mt-10 hidden aspect-[4/3] rounded-2xl lg:block"><img src="/images/blackhood-hospitality-team.jpg" alt="Hospitality colleagues in conversation" className="h-full w-full object-cover" /></div></div><div className="divide-y divide-[#000000]/15 border-y border-[#000000]/15">{groups.map((group, index) => <div className="py-8 sm:py-10" key={group.label}><div className="flex items-start justify-between"><div className="flex gap-5"><span className="mt-1 font-mono text-xs text-[#F84848]">0{index + 1}</span><h3 className="font-display text-3xl tracking-[-0.04em] sm:text-4xl">{group.label}</h3></div></div><div className="mt-5 flex flex-wrap gap-2 pl-9">{group.roles.map((role) => <span key={role} className="rounded-full bg-[#F8A0A0] px-3.5 py-2 text-sm font-semibold text-[#33404A]">{role}</span>)}</div></div>)}</div></div></section>
    <section className="bg-[#000000] px-5 py-24 text-[#F8F8F8] sm:px-8 sm:py-32 lg:px-12"><div className="mx-auto grid max-w-[1240px] gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-24"><div><SectionLabel dark>People-first, operationally clear</SectionLabel><h2 className="mt-5 font-display text-[clamp(2.8rem,5vw,5.8rem)] leading-[0.88] tracking-[-0.065em]">The human side<br /><span className="text-[#FF4C4F]">is the work.</span></h2></div><div className="grid gap-8 sm:grid-cols-2"><div className="photo-frame aspect-[4/3] rounded-2xl sm:mt-12"><img src="/images/blackhood-technical-team.jpg" alt="Technical colleagues reviewing equipment" className="h-full w-full object-cover" /></div><div className="pt-3 sm:pt-20"><p className="text-lg leading-8 text-[#F8F8F8]/70">We keep expectations clear for employers and candidates. A better fit starts with listening, then continues with communication and respect.</p><ArrowLink href="/contact" light>Talk about your requirement</ArrowLink></div></div></div></section><RoleFamilies /><Expectations /><PeopleCommitment /><WorkforceFaq /><CTASection /></>;
}

function About() {
  usePageMeta('About | Blackhood Qatar', 'Learn about Blackhood Qatar, our people-first approach and the practical values behind our workforce solutions.');
  const values = [['Affordable', 'Thoughtful solutions that respect the realities of your budget.'], ['Expert', 'Experience and care in the details that make a team dependable.'], ['Sustainable', 'Longer-term thinking for people, operations and the places they serve.'], ['Customer-first', 'A responsive partner who stays close to the question at hand.']];
  return <><PageIntro eyebrow="A practical partner" title={<>Good people.<br /><span className="text-[#F84848]">Clear purpose.</span></>} text="Blackhood is a people-first workforce partner connecting dependable skilled and semi-skilled teams with the organisations that rely on them." image="/images/blackhood-care-team.jpg" imageAlt="Cleaning and care team smiling together in a hotel corridor" />
    <section className="bg-[#F8F8F8] px-5 py-24 sm:px-8 sm:py-32 lg:px-12"><div className="mx-auto grid max-w-[1240px] gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24"><div><SectionLabel>Our approach</SectionLabel><h2 className="mt-5 font-display text-[clamp(2.8rem,5vw,5.4rem)] leading-[0.9] tracking-[-0.065em]">Not a hand-off.<br />A relationship.</h2></div><div><p className="max-w-2xl text-2xl leading-[1.25] tracking-[-0.02em] text-[#000000]">The best workforce support feels close to the operation. We listen to what the day actually asks for, understand the standard and stay accountable after people arrive.</p><div className="editorial-rule mt-12 h-px max-w-xl" /><div className="mt-8 grid gap-8 sm:grid-cols-2"><div><h3 className="font-display text-2xl">For employers</h3><p className="mt-3 text-sm leading-6 text-[#33404A]">A clear route from requirement to dependable team support, without unnecessary complexity.</p></div><div><h3 className="font-display text-2xl">For people</h3><p className="mt-3 text-sm leading-6 text-[#33404A]">Respectful conversations, clear expectations and a chance to do work that matters.</p></div></div></div></div></section>
    <section className="bg-[#F8A0A0] px-5 py-24 sm:px-8 sm:py-32 lg:px-12"><div className="mx-auto max-w-[1240px]"><div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end"><div><SectionLabel>What we stand for</SectionLabel><h2 className="mt-5 font-display text-[clamp(2.8rem,5vw,5.6rem)] leading-[0.88] tracking-[-0.065em]">Practical values.<br />Real impact.</h2></div><HeartHandshake className="text-[#F84848]" size={48} strokeWidth={1} /></div><div className="mt-14 grid gap-px overflow-hidden rounded-2xl bg-[#000000]/15 md:grid-cols-2 lg:grid-cols-4">{values.map(([title, body], index) => <div className="min-h-[220px] bg-[#F8F8F8] p-7 sm:p-8" key={title}><span className="font-mono text-xs text-[#F84848]">0{index + 1}</span><h3 className="mt-12 font-display text-2xl">{title}</h3><p className="mt-3 text-sm leading-6 text-[#33404A]">{body}</p></div>)}</div></div></section><AboutStory /><MissionVision /><CoreValues /><Responsibility /><CTASection /></>;
}

function Reach() {
  usePageMeta('Reach | Blackhood Qatar', 'Blackhood is rooted in Qatar and connected to workforce opportunity across Europe.');
  return <><PageIntro eyebrow="Regional insight, international outlook" title={<>Close to<br /><span className="text-[#F84848]">the work.</span></>} text="We bring an understanding of local operating realities together with a wider view of people, skills and movement across Qatar and Europe." image="/images/qatar.jpg" imageAlt="Doha skyline and waterfront at sunset" />
    <section className="bg-[#F8F8F8] px-5 py-24 sm:px-8 sm:py-32 lg:px-12"><div className="mx-auto max-w-[1240px]"><div className="grid gap-6 border-b border-[#000000]/15 pb-8 lg:grid-cols-2"><div><SectionLabel>Where we work</SectionLabel><h2 className="mt-5 font-display text-[clamp(3rem,6vw,6.7rem)] leading-[0.86] tracking-[-0.07em]">Two markets.<br /><span className="text-[#F84848]">One standard.</span></h2></div><p className="max-w-xl self-end text-lg leading-8 text-[#33404A]">Our conversations start with the setting in front of us: a hotel in Doha, a facilities team, an event schedule or a wider European requirement.</p></div><div className="mt-12 grid gap-5 md:grid-cols-2"><div className="photo-frame relative min-h-[420px] rounded-2xl"><img src="/images/qatar.jpg" alt="Doha city and waterfront" className="absolute inset-0 h-full w-full object-cover opacity-75" /><div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-[#000000]/30 to-transparent" /><div className="relative flex h-full flex-col justify-end p-7 text-white"><Globe2 className="mb-auto text-[#FF4C4F]" size={26} strokeWidth={1.5} /><h3 className="font-display text-5xl tracking-[-0.06em]">Qatar</h3><p className="mt-2 max-w-xs text-sm leading-6 text-white/70">Rooted in Doha, close to the realities of the workday.</p></div></div><div className="flex min-h-[420px] flex-col justify-between rounded-2xl bg-[#000000] p-7 text-[#F8F8F8]"><div><p className="eyebrow text-[#FF4C4F]">The wider horizon</p><h3 className="mt-5 font-display text-5xl tracking-[-0.06em] text-[#FF4C4F]">Europe</h3></div><div><p className="max-w-sm text-lg leading-8 text-white/70">Connected to opportunity across Europe, with a practical understanding of teams, skills and movement.</p><div className="mt-7 flex flex-wrap gap-x-8 gap-y-4"><ArrowLink href="/contact" light>Discuss your region</ArrowLink><span className="inline-block"><ArrowLink href="/work-in-europe" light>Candidates: Europe & North America</ArrowLink></span></div></div></div></div></div></section>
    <section className="bg-[#F8A0A0] px-5 py-24 sm:px-8 sm:py-32 lg:px-12"><div className="mx-auto grid max-w-[1240px] items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24"><div className="photo-frame rounded-2xl"><img src="/images/blackhood-people-manager.jpg" alt="Workforce manager in conversation with colleagues" className="aspect-[4/3] w-full object-cover" /></div><div><SectionLabel>Coverage that meets your operation</SectionLabel><h2 className="mt-5 font-display text-5xl leading-[0.88] tracking-[-0.06em]">Start with the place.<br />Build from there.</h2><p className="mt-7 max-w-lg text-base leading-7 text-[#33404A]">Share your location, roles and timing. We will bring the conversation back to a practical next step — no generic package, no assumptions.</p><ArrowLink href="/contact">Open an enquiry</ArrowLink></div></div></section><QatarContext /><EuropeGuidance /><ReachSectors /><ReachFaq /><CTASection /></>;
}

function CTASection() {
  return <section className="bg-[#F84848] px-5 py-24 text-[#F8F8F8] sm:px-8 sm:py-32 lg:px-12"><div className="mx-auto flex max-w-[1240px] flex-col justify-between gap-10 lg:flex-row lg:items-end"><div><SectionLabel dark>Start with a conversation</SectionLabel><h2 className="mt-5 font-display text-[clamp(3rem,6vw,7rem)] font-medium leading-[0.84] tracking-[-0.075em]">Let&apos;s put people<br /><span className="text-[#000000]">to work.</span></h2></div><div className="max-w-sm"><p className="text-lg leading-8 text-white/75">Tell us a little about your requirement. We&apos;ll come back with a practical next step.</p><Link href="/contact" className="mt-7 inline-flex items-center gap-3 rounded-full bg-[#000000] px-6 py-3.5 text-sm font-bold text-[#F8F8F8] transition-transform hover:-translate-y-1" data-testid="link-cta-contact">Make an enquiry <ArrowUpRight size={17} /></Link></div></div></section>;
}

function Contact() {
  usePageMeta('Contact | Blackhood Qatar', 'Make an employer enquiry with Blackhood Qatar for workforce support across hospitality, technical, facilities, events and cleaning.');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ name: '', company: '', email: '', need: '', message: '' });
  function update(field: keyof typeof form, value: string) { setForm((current) => ({ ...current, [field]: value })); setError(''); }
  function handleSubmit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); if (!form.name || !form.company || !form.email || !form.need) { setError('Please complete the required fields before continuing.'); return; } setSubmitted(true); }
  return <><section className="bg-[#000000] px-5 py-24 text-[#F8F8F8] sm:px-8 sm:py-32 lg:px-12"><div className="mx-auto grid max-w-[1240px] gap-14 lg:grid-cols-[0.78fr_1.22fr] lg:gap-24"><div><SectionLabel dark>Employer enquiry</SectionLabel><h1 className="mt-5 font-display text-[clamp(3.2rem,6.5vw,7.2rem)] font-medium leading-[0.84] tracking-[-0.08em]">Tell us what<br /><span className="text-[#FF4C4F]">you need.</span></h1><p className="mt-8 max-w-sm text-base leading-7 text-[#F8F8F8]/68">A few details help us understand the shape of your requirement. This form is a frontend enquiry for this iteration; it does not send email.</p><div className="mt-12 space-y-4 text-sm"><a href="mailto:info@blackhoodqatar.com" className="flex items-center gap-3 font-semibold text-white/80 hover:text-[#FF4C4F]" data-testid="link-contact-email"><Mail size={18} /> info@blackhoodqatar.com</a><div className="flex items-center gap-3 font-semibold text-white/80"><MapPin size={18} /> Doha, Qatar · European enquiries welcome</div><a href="tel:+97450631980" className="flex items-center gap-3 font-semibold text-white/80 hover:text-[#FF4C4F]" data-testid="link-contact-phone-hero"><Phone size={18} /> +974 5063 1980</a></div></div><div className="rounded-2xl bg-[#F8F8F8] p-6 text-[#000000] sm:p-9">{submitted ? <div className="flex min-h-[430px] flex-col items-start justify-center"><div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F84848] text-white"><Check size={24} /></div><h2 className="mt-7 font-display text-4xl leading-none tracking-[-0.05em]">Thank you.<br />We have your details.</h2><p className="mt-5 max-w-sm text-base leading-7 text-[#33404A]">Your enquiry has been recorded in this browser session. For this frontend iteration, it has not been sent by email.</p><button type="button" onClick={() => { setSubmitted(false); setForm({ name: '', company: '', email: '', need: '', message: '' }); }} className="mt-8 flex items-center gap-2 text-sm font-bold text-[#F84848] hover:text-[#000000]" data-testid="button-new-enquiry">Start another enquiry <ArrowUpRight size={16} /></button></div> : <form onSubmit={handleSubmit} className="space-y-5" aria-label="Employer enquiry form"><div className="mb-8 flex items-start justify-between gap-6"><div><SectionLabel>Employer enquiry</SectionLabel><h2 className="mt-3 font-display text-3xl tracking-[-0.04em]">What are you building?</h2></div><Building2 size={27} strokeWidth={1.5} className="text-[#F84848]" /></div><div className="grid gap-5 sm:grid-cols-2"><label className="block"><span className="mb-2 block text-xs font-bold uppercase tracking-[0.1em] text-[#33404A]">Your name <b className="text-[#F84848]">*</b></span><input required value={form.name} onChange={(event) => update('name', event.target.value)} placeholder="Name" className="w-full border-b border-[#000000]/20 bg-transparent px-0 py-3 text-base outline-none placeholder:text-[#33404A]/45 focus:border-[#F84848]" data-testid="input-contact-name" /></label><label className="block"><span className="mb-2 block text-xs font-bold uppercase tracking-[0.1em] text-[#33404A]">Company <b className="text-[#F84848]">*</b></span><input required value={form.company} onChange={(event) => update('company', event.target.value)} placeholder="Company name" className="w-full border-b border-[#000000]/20 bg-transparent px-0 py-3 text-base outline-none placeholder:text-[#33404A]/45 focus:border-[#F84848]" data-testid="input-contact-company" /></label></div><label className="block"><span className="mb-2 block text-xs font-bold uppercase tracking-[0.1em] text-[#33404A]">Work email <b className="text-[#F84848]">*</b></span><input required type="email" value={form.email} onChange={(event) => update('email', event.target.value)} placeholder="you@company.com" className="w-full border-b border-[#000000]/20 bg-transparent px-0 py-3 text-base outline-none placeholder:text-[#33404A]/45 focus:border-[#F84848]" data-testid="input-contact-email" /></label><label className="relative block"><span className="mb-2 block text-xs font-bold uppercase tracking-[0.1em] text-[#33404A]">What support do you need? <b className="text-[#F84848]">*</b></span><select required value={form.need} onChange={(event) => update('need', event.target.value)} className="w-full appearance-none border-b border-[#000000]/20 bg-transparent px-0 py-3 text-base outline-none focus:border-[#F84848]" data-testid="select-contact-need"><option value="" disabled>Select a capability</option><option value="hospitality">Hospitality manpower</option><option value="events">Event staffing</option><option value="technical">Technical and facilities</option><option value="cleaning">Cleaning and housekeeping</option><option value="gardening">Residential gardening</option><option value="other">Something else</option></select><ChevronDown size={17} className="pointer-events-none absolute bottom-3 right-0 text-[#F84848]" /></label><label className="block"><span className="mb-2 block text-xs font-bold uppercase tracking-[0.1em] text-[#33404A]">A little more detail <span className="font-normal normal-case tracking-normal">(optional)</span></span><textarea value={form.message} onChange={(event) => update('message', event.target.value)} rows={4} placeholder="Roles, location, timing..." className="w-full resize-none border-b border-[#000000]/20 bg-transparent px-0 py-3 text-base outline-none placeholder:text-[#33404A]/45 focus:border-[#F84848]" data-testid="textarea-contact-message" /></label>{error && <p className="text-sm font-semibold text-[#F84848]" role="alert">{error}</p>}<button type="submit" className="group mt-3 flex w-full items-center justify-center gap-3 rounded-full bg-[#000000] px-5 py-4 text-sm font-bold text-[#F8F8F8] transition-transform hover:-translate-y-0.5" data-testid="button-submit-enquiry">Record enquiry <Send size={17} className="transition-transform group-hover:translate-x-1" /></button><p className="text-center text-xs text-[#33404A]/70">Required fields are marked with an asterisk.</p></form>}</div></div></section><section className="bg-[#F8A0A0] px-5 py-20 sm:px-8 lg:px-12"><div className="mx-auto grid max-w-[1240px] gap-7 sm:grid-cols-3"><div><SectionLabel>Before you write</SectionLabel><h2 className="mt-4 font-display text-3xl">Useful context helps.</h2></div>{[['01', 'The setting', 'Hotel, site, residence, event or facility.'], ['02', 'The roles', 'The people and skills you need in place.'], ['03', 'The timing', 'When support needs to begin and for how long.']].map(([number, title, body]) => <div className="border-t border-[#000000]/20 pt-5" key={number}><span className="font-mono text-xs text-[#F84848]">{number}</span><h3 className="mt-8 font-display text-2xl">{title}</h3><p className="mt-2 text-sm leading-6 text-[#33404A]">{body}</p></div>)}</div></section><ContactChannels /><RequirementChecklist /><NextSteps /><ContactFaq /></>;
}

function NotFound() {
  usePageMeta('Page not found | Blackhood Qatar', 'The Blackhood Qatar page you are looking for could not be found.');
  return <section className="flex min-h-[60vh] items-center justify-center bg-[#D8E8F0] px-5 py-24 text-center"><div><p className="eyebrow text-[#F84848]">404</p><h1 className="mt-5 font-display text-6xl tracking-[-0.07em]">That page moved.</h1><p className="mx-auto mt-5 max-w-md text-[#33404A]">Find your way back to the Blackhood overview.</p><Link href="/" className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#000000] px-6 py-3.5 text-sm font-bold text-white" data-testid="link-notfound-home">Back home <ArrowRight size={16} /></Link></div></section>;
}

function App() {
  return <QueryClientProvider client={queryClient}><TooltipProvider><ErrorBoundary resetKey={window.location.pathname}><Header /><main><RouteMotion><Switch><Route path="/" component={Home} /><Route path="/services" component={Services} /><Route path="/workforce" component={Workforce} /><Route path="/about" component={About} /><Route path="/reach" component={Reach} /><Route path="/contact" component={Contact} /><Route path="/work-in-europe" component={WorkInEurope} /><Route component={NotFound} /></Switch></RouteMotion></main><GlobalMotionDock /><Footer /></ErrorBoundary><Toaster /></TooltipProvider></QueryClientProvider>;
}

export default App;