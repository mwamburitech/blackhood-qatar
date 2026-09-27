import { useId, useState, type ReactNode } from 'react';
import { ArrowUpRight, Plus } from 'lucide-react';
import { Link } from 'wouter';

export const wrap = 'px-5 py-24 sm:px-8 sm:py-28 lg:px-12';

export function Label({ children, dark = false }: { children: string; dark?: boolean }) {
  return <p className={`eyebrow ${dark ? 'text-[#FF4C4F]' : 'text-[#F84848]'}`}>{children}</p>;
}

export function Heading({ label, title, text, dark = false, className = '' }: { label: string; title: ReactNode; text?: string; dark?: boolean; className?: string }) {
  return (
    <div className={`grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end ${className}`}>
      <div>
        <Label dark={dark}>{label}</Label>
        <h2 className="mt-5 font-display text-[clamp(2.5rem,4.6vw,4.9rem)] font-medium leading-[0.9] tracking-[-0.065em]">{title}</h2>
      </div>
      {text && <p className={`max-w-lg text-base leading-7 lg:justify-self-end ${dark ? 'text-[#F8F8F8]/65' : 'text-[#33404A]'}`}>{text}</p>}
    </div>
  );
}

export function TextLink({ href, children, light = false, id }: { href: string; children: string; light?: boolean; id: string }) {
  return (
    <Link href={href} className={`mt-7 inline-flex items-center gap-2 border-b pb-1.5 text-sm font-bold transition-colors ${light ? 'border-[#FF4C4F] text-[#FF4C4F] hover:text-white' : 'border-[#F84848] text-[#F84848] hover:text-[#000000]'}`} data-testid={`link-${id}`}>
      {children} <ArrowUpRight size={16} />
    </Link>
  );
}

export function Photo({ src, alt, className = '' }: { src: string; alt: string; className?: string }) {
  return <div className={`photo-frame rounded-2xl ${className}`}><img src={src} alt={alt} className="h-full w-full object-cover" loading="lazy" /></div>;
}

export function Faq({ items, dark = false, id }: { items: [string, string][]; dark?: boolean; id: string }) {
  const [open, setOpen] = useState<number | null>(0);
  const base = useId();
  return (
    <div className={`divide-y border-y ${dark ? 'divide-[#F8F8F8]/15 border-[#F8F8F8]/15' : 'divide-[#000000]/15 border-[#000000]/15'}`}>
      {items.map(([q, a], i) => {
        const isOpen = open === i;
        return (
          <div key={q}>
            <h3>
              <button type="button" aria-expanded={isOpen} aria-controls={`${base}-${i}`} id={`${base}-b-${i}`} onClick={() => setOpen(isOpen ? null : i)} className="flex w-full items-center justify-between gap-6 py-6 text-left font-display text-xl tracking-[-0.03em] sm:text-2xl" data-testid={`button-faq-${id}-${i}`}>
                <span>{q}</span>
                <Plus size={20} className={`shrink-0 text-[#F84848] transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`} />
              </button>
            </h3>
            <div id={`${base}-${i}`} role="region" aria-labelledby={`${base}-b-${i}`} hidden={!isOpen} className="pb-7">
              <p className={`max-w-2xl text-base leading-7 ${dark ? 'text-[#F8F8F8]/65' : 'text-[#33404A]'}`}>{a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function Chips({ items, tone = 'pink' }: { items: string[]; tone?: 'pink' | 'icy' | 'dark' }) {
  const cls = tone === 'pink' ? 'bg-[#F8A0A0] text-[#000000]' : tone === 'icy' ? 'bg-[#D8E8F0] text-[#000000]' : 'bg-[#F8F8F8]/10 text-[#F8F8F8]';
  return <div className="flex flex-wrap gap-2">{items.map((r) => <span key={r} className={`rounded-full px-3.5 py-1.5 text-sm font-semibold ${cls}`}>{r}</span>)}</div>;
}
