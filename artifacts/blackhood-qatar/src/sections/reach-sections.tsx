import { AlertCircle } from 'lucide-react';
import { Chips, Faq, Heading, Label, Photo, TextLink, wrap } from './shared';

export function QatarContext() {
  return (
    <section className={`bg-[#D8E8F0] ${wrap}`}>
      <div className="mx-auto max-w-[1240px]">
        <Heading label="Qatar, our home market" title={<>Based in Doha.<br /><span className="text-[#F84848]">Working in Qatar.</span></>} text="Qatar is where Blackhood was established and where our operations are grounded. The sectors we supply reflect the country's everyday working life." />
        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {[
            ['Hospitality', 'Hotels, resorts, restaurants and catering venues that need kitchen, service and housekeeping teams.', '/images/blackhood-hospitality-team.jpg'],
            ['Built environment', 'Construction sites and completed buildings needing trades, maintenance and post-construction cleaning.', '/images/blackhood-technical-team.jpg'],
            ['Events & venues', 'Functions, launches and public events that need crews for guests, service and cleaning.', '/images/hospitality.jpg'],
          ].map(([t, b, img]) => (
            <article key={t} className="overflow-hidden rounded-2xl bg-[#F8F8F8]">
              <Photo src={img} alt={t} className="aspect-[16/10] rounded-none" />
              <div className="p-6"><h3 className="font-display text-2xl">{t}</h3><p className="mt-2 text-sm leading-6 text-[#33404A]">{b}</p></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function EuropeGuidance() {
  return (
    <section className={`bg-[#000000] text-[#F8F8F8] ${wrap}`}>
      <div className="mx-auto grid max-w-[1240px] gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
        <div>
          <Label dark>Enquiries from Europe</Label>
          <h2 className="mt-5 font-display text-[clamp(2.5rem,4.6vw,4.6rem)] font-medium leading-[0.9] tracking-[-0.065em]">Open to the<br /><span className="text-[#FF4C4F]">conversation.</span></h2>
          <p className="mt-7 max-w-lg text-lg leading-8 text-[#F8F8F8]/65">We welcome enquiries from European employers. Every international requirement is discussed individually, starting with the roles, location and timing involved.</p>
          <div className="mt-8 flex gap-4 rounded-2xl border border-[#FF4C4F]/40 p-5">
            <AlertCircle size={22} className="mt-0.5 shrink-0 text-[#FF4C4F]" />
            <p className="text-sm leading-6 text-[#F8F8F8]/70">To be clear: Blackhood is established in Qatar. We do not claim offices or guaranteed coverage in Europe. International enquiries are a starting point for discussion, and we will tell you plainly whether we can help.</p>
          </div>
        </div>
        <div className="rounded-2xl bg-[#F8F8F8]/5 p-7 sm:p-9">
          <p className="eyebrow text-[#FF4C4F]">Helpful to include in a European enquiry</p>
          <ol className="mt-6 grid gap-5">
            {[['Country and city', 'Where the work would take place.'], ['Roles and numbers', 'The trades or positions and how many people.'], ['Timing and duration', 'Start date and short or long-term need.'], ['Your arrangements', 'Anything already in place, such as accommodation or existing partners.']].map(([t, b], i) => <li key={t} className="flex gap-5 border-t border-[#F8F8F8]/10 pt-5"><span className="font-mono text-xs text-[#FF4C4F]">0{i + 1}</span><div><h3 className="font-display text-xl">{t}</h3><p className="text-sm leading-6 text-[#F8F8F8]/60">{b}</p></div></li>)}
          </ol>
          <TextLink href="/contact" light id="reach-europe">Start a European enquiry</TextLink>
        </div>
      </div>
    </section>
  );
}

export function ReachSectors() {
  return (
    <section className={`bg-[#F8F8F8] ${wrap}`}>
      <div className="mx-auto grid max-w-[1240px] items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <Photo src="/images/hvac.jpg" alt="Technician working on building systems" className="aspect-[4/3]" />
        <div>
          <Label>Same sectors, wherever you ask from</Label>
          <h2 className="mt-5 font-display text-[clamp(2.3rem,4.2vw,4.2rem)] font-medium leading-[0.9] tracking-[-0.065em]">What you can<br />ask us about.</h2>
          <p className="mt-6 max-w-lg leading-7 text-[#33404A]">Whether your requirement is in Qatar or you are writing from Europe, the conversation covers the same role families.</p>
          <div className="mt-7"><Chips items={['Hospitality', 'Construction', 'Electrical', 'HVAC', 'Plumbing', 'Cleaning', 'Events', 'Drivers', 'Warehouse']} /></div>
          <TextLink href="/workforce" id="reach-workforce">See role detail</TextLink>
        </div>
      </div>
    </section>
  );
}

export function ReachFaq() {
  return (
    <section className={`bg-[#D8E8F0] ${wrap}`}>
      <div className="mx-auto grid max-w-[1240px] gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
        <div><Label>Reach questions</Label><h2 className="mt-5 font-display text-5xl leading-[0.9] tracking-[-0.06em]">Location,<br />answered plainly.</h2></div>
        <Faq id="reach" items={[
          ['Where is Blackhood based?', 'Doha, Qatar. The company was established there in 2022.'],
          ['Can I enquire about a project in Europe?', 'Yes. Share the country, roles and timing with our Doha team. We discuss international requirements individually and confirm what support is available before any commitment.'],
          ['Do you operate elsewhere in the GCC?', 'Our vision looks toward the wider GCC region. Today, our established base is Qatar.'],
          ['How should I contact you from abroad?', 'Email info@blackhoodqatar.com or call +974 5063 1980, or use the enquiry form to organise your details first.'],
        ]} />
      </div>
    </section>
  );
}
