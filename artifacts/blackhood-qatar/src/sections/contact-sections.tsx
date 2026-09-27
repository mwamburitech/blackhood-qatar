import { useState } from 'react';
import { Check, Mail, Phone } from 'lucide-react';
import { Faq, Heading, Label, Photo, wrap } from './shared';

const checklist = ['Company name and contact person', 'Sector and setting (hotel, site, villa, venue, facility)', 'Roles and number of people for each', 'Skills, trade or experience level required', 'Work location', 'Start date', 'Short-term or long-term requirement', 'Working hours or shift pattern'];

export function ContactChannels() {
  return (
    <section className={`bg-[#D8E8F0] px-5 py-16 sm:px-8 lg:px-12`}>
      <div className="mx-auto grid max-w-[1240px] gap-4 md:grid-cols-2">
        <a href="tel:+97450631980" className="group flex items-center justify-between gap-6 rounded-2xl bg-[#000000] p-7 text-[#F8F8F8] transition-transform hover:-translate-y-0.5" data-testid="link-contact-phone">
          <div><p className="eyebrow text-[#FF4C4F]">Call</p><p className="mt-4 font-display text-3xl tracking-[-0.04em]">+974 5063 1980</p></div>
          <Phone size={28} strokeWidth={1.5} className="text-[#FF4C4F]" />
        </a>
        <a href="mailto:info@blackhoodqatar.com" className="group flex items-center justify-between gap-6 rounded-2xl bg-[#F84848] p-7 text-[#F8F8F8] transition-transform hover:-translate-y-0.5" data-testid="link-contact-email-card">
          <div className="min-w-0"><p className="eyebrow text-[#000000]">Email</p><p className="mt-4 break-words font-display text-lg tracking-[-0.04em] sm:text-3xl">info@blackhoodqatar.com</p></div>
          <Mail size={24} strokeWidth={1.5} className="shrink-0" />
        </a>
      </div>
    </section>
  );
}

export function RequirementChecklist() {
  const [done, setDone] = useState<string[]>([]);
  const toggle = (x: string) => setDone((d) => (d.includes(x) ? d.filter((y) => y !== x) : [...d, x]));
  return (
    <section className={`bg-[#F8F8F8] ${wrap}`}>
      <div className="mx-auto grid max-w-[1240px] gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div>
          <Label>Requirement checklist</Label>
          <h2 className="mt-5 font-display text-[clamp(2.4rem,4.4vw,4.4rem)] font-medium leading-[0.9] tracking-[-0.065em]">Have these<br /><span className="text-[#F84848]">ready.</span></h2>
          <p className="mt-6 max-w-sm leading-7 text-[#33404A]">Tick items off as you gather them. This checklist is only for your reference and is not saved or sent.</p>
          <p className="mt-6 font-display text-2xl" aria-live="polite" data-testid="text-checklist-progress">{done.length} of {checklist.length} ready</p>
          <Photo src="/images/blackhood-people-manager.jpg" alt="Manager reviewing a staffing plan" className="mt-8 hidden aspect-[4/3] lg:block" />
        </div>
        <ul className="grid gap-3 self-start">
          {checklist.map((x, i) => {
            const on = done.includes(x);
            return (
              <li key={x}>
                <button type="button" role="checkbox" aria-checked={on} onClick={() => toggle(x)} className={`flex w-full items-center gap-4 rounded-xl border p-4 text-left transition-colors ${on ? 'border-[#F84848] bg-[#F8A0A0]/40' : 'border-[#000000]/12 hover:border-[#000000]/30'}`} data-testid={`checkbox-requirement-${i}`}>
                  <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md border ${on ? 'border-[#F84848] bg-[#F84848] text-white' : 'border-[#000000]/30'}`}>{on && <Check size={15} />}</span>
                  <span className="font-semibold">{x}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export function NextSteps() {
  return (
    <section className={`bg-[#000000] text-[#F8F8F8] ${wrap}`}>
      <div className="mx-auto max-w-[1240px]">
        <Heading dark label="What happens next" title={<>After you<br /><span className="text-[#FF4C4F]">get in touch.</span></>} text="The form on this page does not send email. To reach us, call or email using the details above." />
        <ol className="mt-14 grid gap-4 md:grid-cols-3">
          {[['Contact us', 'Call +974 5063 1980 or email info@blackhoodqatar.com with your requirement details.'], ['We discuss the detail', 'We may ask follow-up questions about roles, setting, timing and duration.'], ['A practical next step', 'We come back with how we can help, or tell you plainly if the request is not a fit.']].map(([t, b], i) => (
            <li key={t} className="rounded-2xl border border-[#F8F8F8]/12 p-7"><span className="font-display text-5xl text-[#FF4C4F]">0{i + 1}</span><h3 className="mt-8 font-display text-2xl">{t}</h3><p className="mt-3 text-sm leading-6 text-[#F8F8F8]/60">{b}</p></li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function ContactFaq() {
  return (
    <section className={`bg-[#D8E8F0] ${wrap}`}>
      <div className="mx-auto grid max-w-[1240px] gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
        <div><Label>Contact questions</Label><h2 className="mt-5 font-display text-5xl leading-[0.9] tracking-[-0.06em]">Good to<br />know.</h2></div>
        <Faq id="contact" items={[
          ['Does the form on this page send my enquiry?', 'No. The form records details in your browser only and does not send email. Please call or email us directly.'],
          ['Which is the best way to reach you?', 'Email info@blackhoodqatar.com with your requirement details, or call +974 5063 1980.'],
          ['Can I enquire from outside Qatar?', 'Yes. European enquiries are welcome and discussed individually. We are based in Qatar and do not have offices in Europe.'],
          ['Do I need every detail before contacting you?', 'No. Share what you know; the checklist above simply helps the first conversation go faster.'],
        ]} />
      </div>
    </section>
  );
}
