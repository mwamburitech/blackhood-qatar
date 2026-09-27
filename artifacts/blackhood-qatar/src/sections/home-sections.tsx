import { ClipboardList, Handshake, Search, UserCheck } from 'lucide-react';
import { Label, Photo, TextLink, wrap } from './shared';

export function HomeFacts() {
  const facts = [
    ['Established', '2022'],
    ['Based in', 'Doha, Qatar'],
    ['Registered as', 'Blackhood Trading Contracting and Services'],
    ['Our promise', 'Your Workforce, Our Commitment'],
  ];
  return (
    <section className="bg-[#D8E8F0] px-5 py-14 sm:px-8 lg:px-12">
      <dl className="mx-auto grid max-w-[1240px] gap-px overflow-hidden rounded-2xl bg-[#000000]/15 sm:grid-cols-2 lg:grid-cols-4">
        {facts.map(([k, v]) => (
          <div key={k} className="bg-[#D8E8F0] p-6 sm:p-7">
            <dt className="eyebrow text-[#F84848]">{k}</dt>
            <dd className="mt-4 font-display text-2xl leading-tight tracking-[-0.03em]" data-testid={`text-fact-${k.toLowerCase().replace(/\s/g, '-')}`}>{v}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export { HomeSectors } from './home-explorer';

export function HomeProcess() {
  const steps = [
    { icon: ClipboardList, t: 'Share the requirement', b: 'Roles, headcount, location, start date and whether the need is short or long term.' },
    { icon: Search, t: 'We review the fit', b: 'We look at the skills, experience and working environment the roles demand.' },
    { icon: UserCheck, t: 'Agree the plan', b: 'A clear conversation on the people proposed, timing and practical arrangements.' },
    { icon: Handshake, t: 'Stay in touch', b: 'Communication continues after people arrive, so issues are raised and handled early.' },
  ];
  return (
    <section className={`bg-[#000000] text-[#F8F8F8] ${wrap}`}>
      <div className="mx-auto grid max-w-[1240px] gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div>
          <Label dark>How an enquiry moves</Label>
          <h2 className="mt-5 font-display text-[clamp(2.5rem,4.6vw,4.9rem)] font-medium leading-[0.9] tracking-[-0.065em]">From question<br /><span className="text-[#FF4C4F]">to people on site.</span></h2>
          <Photo src="/images/blackhood-people-manager.jpg" alt="Blackhood manager briefing a team" className="mt-10 aspect-[4/3]" />
        </div>
        <ol className="grid gap-4 self-end sm:grid-cols-2">
          {steps.map(({ icon: Icon, t, b }, i) => (
            <li key={t} className="rounded-2xl border border-[#F8F8F8]/12 p-6">
              <div className="flex items-center justify-between"><Icon size={24} strokeWidth={1.5} className="text-[#FF4C4F]" /><span className="font-mono text-xs text-[#F8F8F8]/40">Step 0{i + 1}</span></div>
              <h3 className="mt-10 font-display text-2xl tracking-[-0.03em]">{t}</h3>
              <p className="mt-3 text-sm leading-6 text-[#F8F8F8]/60">{b}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function HomeCommitment() {
  return (
    <section className={`bg-[#D8E8F0] ${wrap}`}>
      <div className="mx-auto grid max-w-[1240px] items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="grid grid-cols-2 gap-4">
          <Photo src="/images/blackhood-care-team.jpg" alt="Cleaning team in a hotel corridor" className="aspect-[3/4]" />
          <Photo src="/images/hvac.jpg" alt="Technician servicing HVAC equipment" className="mt-12 aspect-[3/4]" />
        </div>
        <div>
          <Label>The SuperTeam idea</Label>
          <h2 className="mt-5 font-display text-[clamp(2.5rem,4.6vw,4.6rem)] font-medium leading-[0.9] tracking-[-0.065em]">A network, not<br />a list of names.</h2>
          <p className="mt-7 max-w-lg text-lg leading-8 text-[#33404A]">We describe our workforce as a SuperTeam: a network of skilled people valued for consistency, reliability and a professional attitude. It is how we think about the people we place and the standard they carry into your operation.</p>
          <ul className="mt-8 grid gap-3 text-sm font-semibold">
            {['Short-term cover for peaks, events and projects', 'Long-term staffing for ongoing operations', 'Mixed teams across more than one sector'].map((x) => <li key={x} className="flex items-center gap-3"><span className="h-2 w-2 rounded-full bg-[#F84848]" />{x}</li>)}
          </ul>
          <TextLink href="/workforce" id="home-workforce">Meet the workforce</TextLink>
        </div>
      </div>
    </section>
  );
}
