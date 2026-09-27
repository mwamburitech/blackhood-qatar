import { Leaf, Recycle, Users, Zap } from 'lucide-react';
import { Heading, Label, Photo, TextLink, wrap } from './shared';

export function AboutStory() {
  return (
    <section className={`bg-[#D8E8F0] ${wrap}`}>
      <div className="mx-auto grid max-w-[1240px] gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <Photo src="/images/qatar.jpg" alt="Doha skyline" className="aspect-[4/5]" />
        <div className="self-center">
          <Label>Our story</Label>
          <h2 className="mt-5 font-display text-[clamp(2.5rem,4.6vw,4.6rem)] font-medium leading-[0.9] tracking-[-0.065em]">Founded in Doha<br /><span className="text-[#F84848]">in 2022.</span></h2>
          <p className="mt-7 max-w-lg text-lg leading-8 text-[#33404A]">Blackhood Trading Contracting and Services was established in Doha to supply dependable manpower to businesses across Qatar. We started with a simple observation: operations run on people, and the right people make everything else easier.</p>
          <ol className="mt-10 grid gap-0 border-l border-[#F84848] pl-6">
            {[['2022', 'Established in Doha, Qatar.'], ['Sectors', 'Hospitality, construction, facilities, cleaning, events and support.'], ['Today', 'Short and long-term staffing, with enquiries also welcomed from Europe.']].map(([a, b]) => <li key={a} className="relative pb-6"><span className="absolute -left-[29px] top-1.5 h-2.5 w-2.5 rounded-full bg-[#F84848]" /><p className="font-display text-xl">{a}</p><p className="text-sm leading-6 text-[#33404A]">{b}</p></li>)}
          </ol>
        </div>
      </div>
    </section>
  );
}

export function MissionVision() {
  return (
    <section className={`bg-[#000000] text-[#F8F8F8] ${wrap}`}>
      <div className="mx-auto grid max-w-[1240px] gap-5 lg:grid-cols-2">
        <div className="rounded-[1.5rem] bg-[#F84848] p-8 sm:p-12">
          <p className="eyebrow text-[#000000]">Mission</p>
          <p className="mt-10 font-display text-[clamp(1.7rem,2.8vw,2.6rem)] leading-[1.08] tracking-[-0.04em]">To empower businesses with dependable, competent and well-trained manpower, so our clients can focus on their core operations.</p>
        </div>
        <div className="rounded-[1.5rem] border border-[#F8F8F8]/15 p-8 sm:p-12">
          <p className="eyebrow text-[#FF4C4F]">Vision</p>
          <p className="mt-10 font-display text-[clamp(1.7rem,2.8vw,2.6rem)] leading-[1.08] tracking-[-0.04em]">To become the most respected and preferred manpower service provider in Qatar and the wider GCC region, recognised for integrity, innovation and customer satisfaction.</p>
          <p className="mt-6 text-sm text-[#F8F8F8]/45">Our vision describes where we are working towards.</p>
        </div>
      </div>
    </section>
  );
}

export function CoreValues() {
  const values = [
    ['Reliability', 'People who arrive when agreed and do the work as described.'],
    ['Professionalism', 'Conduct and presentation that reflect well on your business.'],
    ['Responsiveness', 'Prompt replies and quick attention when something changes.'],
    ['Client satisfaction', 'We measure success by whether the placement works for you.'],
  ];
  return (
    <section className={`bg-[#F8F8F8] ${wrap}`}>
      <div className="mx-auto max-w-[1240px]">
        <Heading label="Core values" title={<>Four values from<br />our company profile.</>} text="These are the values we set out when describing Blackhood, and the ones we expect to be held to." />
        <div className="mt-14 grid gap-4 md:grid-cols-2">
          {values.map(([t, b], i) => (
            <div key={t} className="flex gap-6 rounded-2xl border border-[#000000]/12 p-7">
              <span className="font-display text-5xl leading-none text-[#F84848]">{i + 1}</span>
              <div><h3 className="font-display text-2xl">{t}</h3><p className="mt-2 leading-7 text-[#33404A]">{b}</p></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Responsibility() {
  const items = [
    { icon: Recycle, t: 'Waste reduction', b: 'Encouraging practices that reduce waste in the work our teams do.' },
    { icon: Zap, t: 'Energy conservation', b: 'Awareness of energy use across the sites and properties we support.' },
    { icon: Users, t: 'Respectful opportunities', b: 'Treating workers with respect and offering fair, clear opportunities.' },
  ];
  return (
    <section className={`bg-[#D8E8F0] ${wrap}`}>
      <div className="mx-auto grid max-w-[1240px] items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div>
          <Leaf size={32} strokeWidth={1.3} className="text-[#F84848]" />
          <Label>Responsible approach</Label>
          <h2 className="mt-5 font-display text-[clamp(2.4rem,4.4vw,4.4rem)] font-medium leading-[0.9] tracking-[-0.065em]">Thinking beyond<br />the next shift.</h2>
          <div className="mt-10 grid gap-5">
            {items.map(({ icon: Icon, t, b }) => <div key={t} className="flex gap-4"><Icon size={22} className="mt-1 shrink-0 text-[#F84848]" /><div><h3 className="font-display text-xl">{t}</h3><p className="text-sm leading-6 text-[#33404A]">{b}</p></div></div>)}
          </div>
          <TextLink href="/services" id="about-services">See what we supply</TextLink>
        </div>
        <Photo src="/images/cleaning.jpg" alt="Cleaning professional at work" className="aspect-[4/5]" />
      </div>
    </section>
  );
}
