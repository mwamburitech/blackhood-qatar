import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Faq, Heading, Label, Photo, TextLink, wrap } from './shared';

const families = [
  { name: 'Kitchen & food service', roles: [['Chefs', 'Prepare and cook to the menu and standards of the kitchen.'], ['Commis', 'Support chefs with preparation and station work.'], ['Kitchen stewards / helpers', 'Keep equipment, utensils and kitchen areas clean and ready.'], ['Waiters / waitresses', 'Serve guests and look after tables through service.'], ['Banquet staff', 'Set up and serve functions and large events.']] },
  { name: 'Rooms & guest services', roles: [['Housekeepers / room attendants', 'Clean and prepare rooms to the property standard.'], ['Receptionists', 'Welcome guests and handle front-desk tasks.'], ['Laundry attendants', 'Process linen and uniforms.'], ['Porters', 'Move luggage and assist guests.'], ['Linen attendants', 'Manage linen distribution and stock.']] },
  { name: 'Construction trades', roles: [['Masons', 'Blockwork and masonry.'], ['Carpenters', 'Formwork, joinery and timber work.'], ['Steel fixers', 'Cut, bend and fix reinforcement.'], ['Scaffolders', 'Erect and dismantle scaffolding.'], ['Painters & tile setters', 'Finishing trades.'], ['General labourers / site helpers', 'Support trades across the site.'], ['Site supervisors', 'Coordinate work on site.']] },
  { name: 'Technical & maintenance', roles: [['Electricians', 'Installation, maintenance and troubleshooting.'], ['HVAC technicians', 'Installation, maintenance and repair of cooling systems.'], ['Plumbers', 'Water supply, drainage and sanitation.'], ['Maintenance workers', 'General building upkeep.']] },
  { name: 'Events & guest relations', roles: [['Ushers', 'Direct guests and manage flow.'], ['Ticketing assistants', 'Handle entry and ticket checks.'], ['Guest relations', 'Assist and inform guests.'], ['Security assistants', 'Support the security team.']] },
  { name: 'Cleaning & logistics', roles: [['Cleaners', 'Hotel, office, venue, residential, retail and industrial cleaning.'], ['Drivers', 'Transport of people or goods.'], ['Storekeepers / warehouse staff', 'Receive, store and issue stock.']] },
];

export function RoleFamilies() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className={`bg-[#D8E8F0] ${wrap}`}>
      <div className="mx-auto grid max-w-[1240px] gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
        <div className="lg:sticky lg:top-8 lg:self-start">
          <Label>Role families</Label>
          <h2 className="mt-5 font-display text-[clamp(2.5rem,4.6vw,4.6rem)] font-medium leading-[0.9] tracking-[-0.065em]">What each<br /><span className="text-[#F84848]">role does.</span></h2>
          <p className="mt-6 max-w-sm leading-7 text-[#33404A]">Open a family to see the roles within it and a plain description of each. Exact duties are always agreed with the employer.</p>
          <Photo src="/images/hospitality.jpg" alt="Hospitality staff at work" className="mt-10 hidden aspect-[4/3] lg:block" />
        </div>
        <div className="divide-y divide-[#000000]/15 border-y border-[#000000]/15">
          {families.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.name}>
                <button type="button" aria-expanded={isOpen} aria-controls={`family-${i}`} onClick={() => setOpen(isOpen ? null : i)} className="flex w-full items-center justify-between gap-4 py-6 text-left" data-testid={`button-family-${i}`}>
                  <span className="flex items-baseline gap-5"><span className="font-mono text-xs text-[#F84848]">0{i + 1}</span><span className="font-display text-2xl tracking-[-0.04em] sm:text-3xl">{f.name}</span></span>
                  <span className="flex items-center gap-3 text-xs font-bold text-[#33404A]">{f.roles.length} roles <ChevronDown size={18} className={`text-[#F84848] transition-transform ${isOpen ? 'rotate-180' : ''}`} /></span>
                </button>
                <div id={`family-${i}`} hidden={!isOpen} className="pb-7">
                  <dl className="grid gap-3 sm:grid-cols-2">
                    {f.roles.map(([r, d]) => <div key={r} className="rounded-xl bg-[#F8F8F8] p-4"><dt className="font-display text-lg">{r}</dt><dd className="mt-1 text-sm leading-6 text-[#33404A]">{d}</dd></div>)}
                  </dl>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function Expectations() {
  return (
    <section className={`bg-[#F8F8F8] ${wrap}`}>
      <div className="mx-auto max-w-[1240px]">
        <Heading label="Practical expectations" title={<>Clear on both<br />sides of the work.</>} text="A good placement depends on both sides knowing what to expect. These are the things we ask about and talk through." />
        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          <div className="rounded-2xl bg-[#000000] p-7 text-[#F8F8F8] sm:p-9">
            <p className="eyebrow text-[#FF4C4F]">What employers can expect from us</p>
            <ul className="mt-6 grid gap-4">{['People matched to the role and working environment described', 'Clear communication on who is proposed and when', 'A point of contact once people are in place', 'Honest answers when a request is not a good fit'].map((x) => <li key={x} className="border-t border-[#F8F8F8]/12 pt-4 leading-7 text-[#F8F8F8]/75">{x}</li>)}</ul>
          </div>
          <div className="rounded-2xl bg-[#F8A0A0] p-7 sm:p-9">
            <p className="eyebrow text-[#F84848]">What helps us from employers</p>
            <ul className="mt-6 grid gap-4">{['A clear description of duties and working hours', 'The setting: hotel, site, villa, venue or facility', 'Required skills, experience level or trade', 'Start date and expected duration'].map((x) => <li key={x} className="border-t border-[#000000]/15 pt-4 leading-7 text-[#33404A]">{x}</li>)}</ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export function PeopleCommitment() {
  return (
    <section className={`bg-[#D8E8F0] ${wrap}`}>
      <div className="mx-auto grid max-w-[1240px] items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
        <div className="grid grid-cols-2 gap-4">
          <Photo src="/images/blackhood-care-team.jpg" alt="Care team smiling together" className="aspect-square" />
          <Photo src="/images/housekeeping.jpg" alt="Housekeeper preparing a room" className="aspect-square translate-y-10" />
        </div>
        <div>
          <Label>For the people we place</Label>
          <h2 className="mt-5 font-display text-[clamp(2.4rem,4.4vw,4.4rem)] font-medium leading-[0.9] tracking-[-0.065em]">Respect is part<br />of the standard.</h2>
          <p className="mt-7 max-w-lg text-lg leading-8 text-[#33404A]">We believe in providing respectful opportunities for workers. That means clear conversations about the role, straightforward expectations and treating people as professionals, not headcount.</p>
          <TextLink href="/about" id="workforce-about">Read our values</TextLink>
        </div>
      </div>
    </section>
  );
}

export function WorkforceFaq() {
  return (
    <section className={`bg-[#000000] text-[#F8F8F8] ${wrap}`}>
      <div className="mx-auto grid max-w-[1240px] gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
        <div><Label dark>Workforce questions</Label><h2 className="mt-5 font-display text-5xl leading-[0.9] tracking-[-0.06em]">About the<br /><span className="text-[#FF4C4F]">people.</span></h2></div>
        <Faq dark id="workforce" items={[
          ['Can I request a specific skill level?', 'Yes. Tell us the trade, experience level or specific tasks the role involves, and we will discuss who fits.'],
          ['Can one team include several role families?', 'Yes. For example, a hotel requirement might combine room attendants, kitchen stewards and a maintenance worker.'],
          ['What if a placement is not working?', 'Raise it with us early. Staying in contact after people arrive is part of how we work.'],
          ['I am looking for work. Can I apply here?', 'This site is set up for employer enquiries. You can email info@blackhoodqatar.com to ask about opportunities.'],
        ]} />
      </div>
    </section>
  );
}
