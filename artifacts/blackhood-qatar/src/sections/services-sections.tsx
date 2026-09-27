import { useState } from 'react';
import { Chips, Faq, Heading, Label, Photo, TextLink, wrap } from './shared';

const sectors = [
  { id: 'hospitality', name: 'Hospitality', image: '/images/blackhood-hospitality-team.jpg', settings: ['Hotels', 'Resorts', 'Restaurants', 'Catering venues'], body: 'Kitchen, service and housekeeping people for operations where presentation and pace are constant. We supply teams that understand guest-facing standards as well as the back-of-house routines that keep them possible.', roles: ['Chefs', 'Commis', 'Kitchen stewards / helpers', 'Waiters / waitresses', 'Housekeepers / room attendants', 'Receptionists', 'Banquet staff', 'Laundry attendants', 'Porters'] },
  { id: 'construction', name: 'Construction', image: '/images/blackhood-technical-team.jpg', settings: ['Building sites', 'Fit-out projects', 'Contractor teams'], body: 'Skilled trades and general labour for site work, from structure through to finishing. Suitable for contractors who need to strengthen a crew for a phase or maintain a steady workforce across a project.', roles: ['General labourers', 'Masons', 'Electricians', 'Plumbers', 'Carpenters', 'Steel fixers', 'Scaffolders', 'Painters', 'Tile setters', 'Site supervisors / helpers'] },
  { id: 'facilities', name: 'Facilities & technical', image: '/images/hvac.jpg', settings: ['Commercial buildings', 'Residential properties', 'Hospitality assets'], body: 'Hands-on people for the systems inside a building. Work covers installation, routine maintenance, repair and troubleshooting across electrical, HVAC and water systems.', roles: ['Electrical installation, maintenance & troubleshooting', 'HVAC installation, maintenance & repair', 'Water supply, drainage & sanitation plumbing', 'General maintenance workers'] },
  { id: 'cleaning', name: 'Cleaning', image: '/images/cleaning.jpg', settings: ['Hotels', 'Offices', 'Apartments & villas', 'Retail & showrooms'], body: 'Cleaning teams for daily upkeep and one-off deep work. From finished-site clean-downs to showroom presentation, the aim is a consistent standard that reflects on your business.', roles: ['Hotel cleaning', 'Office cleaning', 'Post-construction cleaning', 'Event venue cleaning', 'Apartments / villas', 'Retail / showrooms', 'Industrial support'] },
  { id: 'events', name: 'Events', image: '/images/hospitality.jpg', settings: ['Venues', 'Functions', 'Launches', 'Public events'], body: 'Front-of-house and support crews for event days, where guests arrive at once and every station needs to be staffed. Roles can be combined into one team for a single event or a season.', roles: ['Ushers', 'Ticketing assistants', 'Guest relations', 'F&B staff', 'Cleaners', 'Security assistants'] },
  { id: 'support', name: 'Other support', image: '/images/housekeeping.jpg', settings: ['Logistics', 'Stores', 'Hotels & laundries'], body: 'The roles that sit between departments and keep goods, linen and people moving. Often requested alongside a larger team.', roles: ['Drivers', 'Storekeepers', 'Warehouse staff', 'Linen attendants'] },
];

export function ServiceExplorer() {
  const [active, setActive] = useState(0);
  const s = sectors[active];
  return (
    <section className={`bg-[#D8E8F0] ${wrap}`}>
      <div className="mx-auto max-w-[1240px]">
        <Heading label="Sector detail" title={<>Explore each<br /><span className="text-[#F84848]">sector in depth.</span></>} text="Select a sector to see the kind of work involved, typical settings and the roles we supply." />
        <div className="mt-12 flex flex-wrap gap-2" role="tablist" aria-label="Service sectors">
          {sectors.map((x, i) => (
            <button key={x.id} type="button" role="tab" id={`tab-${x.id}`} aria-selected={active === i} aria-controls="panel-sector" onClick={() => setActive(i)} className={`rounded-full px-4 py-2.5 text-sm font-bold transition-colors ${active === i ? 'bg-[#000000] text-[#F8F8F8]' : 'bg-[#F8F8F8]/70 text-[#000000] hover:bg-[#F8F8F8]'}`} data-testid={`tab-sector-${x.id}`}>{x.name}</button>
          ))}
        </div>
        <div id="panel-sector" role="tabpanel" aria-labelledby={`tab-${s.id}`} className="mt-8 grid overflow-hidden rounded-[1.5rem] bg-[#F8F8F8] lg:grid-cols-[0.9fr_1.1fr]" key={s.id}>
          <Photo src={s.image} alt={`${s.name} workforce`} className="reveal min-h-[300px] rounded-none" />
          <div className="reveal p-7 sm:p-10">
            <span className="font-mono text-xs text-[#F84848]">0{active + 1} / 0{sectors.length}</span>
            <h3 className="mt-4 font-display text-4xl tracking-[-0.05em] sm:text-5xl" data-testid="text-sector-name">{s.name}</h3>
            <p className="mt-5 max-w-xl text-base leading-7 text-[#33404A]">{s.body}</p>
            <p className="eyebrow mt-8 text-[#33404A]">Typical settings</p>
            <p className="mt-3 text-sm font-semibold">{s.settings.join(' · ')}</p>
            <p className="eyebrow mt-8 text-[#33404A]">Roles supplied</p>
            <div className="mt-4"><Chips items={s.roles} /></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function StaffingModels() {
  return (
    <section className={`bg-[#000000] text-[#F8F8F8] ${wrap}`}>
      <div className="mx-auto max-w-[1240px]">
        <Heading dark label="Engagement length" title={<>Short term or<br /><span className="text-[#FF4C4F]">long term.</span></>} text="We support both. The right model depends on how steady your demand is and how much continuity the role needs." />
        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {[
            ['Short-term staffing', 'For peaks, events, seasonal demand, project phases or covering absence.', ['Event days and banquets', 'Post-construction cleans', 'A project phase that needs extra hands']],
            ['Long-term staffing', 'For ongoing operations where people become part of the everyday team.', ['Hotel housekeeping and kitchens', 'Building maintenance', 'Daily office and residential cleaning']],
          ].map(([t, b, ex]) => (
            <div key={t as string} className="rounded-2xl border border-[#F8F8F8]/15 p-7 sm:p-9">
              <h3 className="font-display text-3xl tracking-[-0.04em] text-[#FF4C4F]">{t as string}</h3>
              <p className="mt-4 max-w-md leading-7 text-[#F8F8F8]/65">{b as string}</p>
              <p className="eyebrow mt-8 text-[#F8F8F8]/45">Often used for</p>
              <ul className="mt-4 grid gap-2 text-sm">{(ex as string[]).map((e) => <li key={e} className="border-t border-[#F8F8F8]/10 pt-2">{e}</li>)}</ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function MixedTeams() {
  return (
    <section className={`bg-[#F8F8F8] ${wrap}`}>
      <div className="mx-auto grid max-w-[1240px] items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div>
          <Label>Combined requirements</Label>
          <h2 className="mt-5 font-display text-[clamp(2.5rem,4.6vw,4.6rem)] font-medium leading-[0.9] tracking-[-0.065em]">One enquiry can<br />cover several teams.</h2>
          <p className="mt-7 max-w-lg text-lg leading-8 text-[#33404A]">Many operations cross sectors. A hotel may need housekeeping, kitchen stewards and a maintenance technician. A venue may need event staff before the show and cleaners after it. Tell us the full picture and we will discuss it as one requirement.</p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {[['Hotel', 'Housekeeping + kitchen + maintenance'], ['Venue', 'Ushers + F&B + cleaning'], ['New build', 'Trades + post-construction clean'], ['Warehouse', 'Storekeepers + drivers']].map(([a, b]) => <div key={a} className="rounded-xl bg-[#D8E8F0] p-4"><p className="font-display text-lg">{a}</p><p className="mt-1 text-sm text-[#33404A]">{b}</p></div>)}
          </div>
          <TextLink href="/contact" id="services-mixed">Describe your requirement</TextLink>
        </div>
        <Photo src="/images/housekeeping.jpg" alt="Housekeeping team preparing a room" className="aspect-[4/5]" />
      </div>
    </section>
  );
}

export function ServicesFaq() {
  return (
    <section className={`bg-[#F8A0A0] ${wrap}`}>
      <div className="mx-auto grid max-w-[1240px] gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
        <div><Label>Service questions</Label><h2 className="mt-5 font-display text-5xl leading-[0.9] tracking-[-0.06em]">Before you<br />request a team.</h2></div>
        <Faq id="services" items={[
          ['Can you supply roles not listed here?', 'Possibly. The lists reflect the roles we regularly supply. If you need something related, include it in your enquiry and we will tell you honestly whether it is a fit.'],
          ['Do you supply for one sector only?', 'No. We supply across hospitality, construction, facilities, cleaning, events and general support, and can discuss combined teams.'],
          ['How do I get a price?', 'Pricing depends on roles, numbers, duration and location. Share those details through the contact page and we will respond with a practical next step.'],
          ['Is residential gardening available?', 'Garden and grounds support can be discussed as part of residential or property requirements. Mention it in your enquiry.'],
        ]} />
      </div>
    </section>
  );
}
