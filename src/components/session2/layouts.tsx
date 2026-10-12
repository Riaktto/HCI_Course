import React, { useState } from 'react';
import { ArrowRight, Eye, EyeOff, Info, Pause, Play, RotateCcw, Clock } from 'lucide-react';
import type { Content } from '../../data/session2Types';
import {
  CARD, Icon, MAIN_CLASS, SlideHeading, TakeawayBanner, TONES, rich, useCountdown,
} from './primitives';
import { CUSTOM } from './registry';
import { UM6PLogo } from '../brand/UM6PLogo';
import { CompareVisual } from './visuals';
import { PROJECTS } from '../../data/projects';
import type { Lens } from '../../data/projects';
import { PROJECT_COMPONENTS } from '../projects/registry';
import { PROJECT_11_FINDINGS } from '../projects/Project11Library';

/**
 * Data-driven layouts for Session 2. Every size comes from the validated typography scale
 * (see primitives.tsx). Layouts have fixed budgets inside the 1824 x 816 content area; content that
 * does not fit must be simplified or split across slides, never shrunk.
 */

type Of<K extends Content['kind']> = Extract<Content, { kind: K }>;

/* ------------------------------------------------------------------ hero */
/** Title slide: identical layout to Session 1's title slide (same structure and classes). */
export const HeroLayout: React.FC<{ c: Of<'hero'>; onNext: () => void }> = ({ c, onNext }) => (
  <div className="w-full h-full flex flex-col justify-between p-6 sm:p-10 lg:p-14 xl:p-16 bg-[#FAF9F6] relative overflow-hidden">
    <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#E5391C]/5 pointer-events-none blur-3xl" />
    <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-[#1F2421]/5 pointer-events-none blur-3xl" />

    <div className="flex items-center justify-between pb-6 border-b border-[#E8E2D9] flex-shrink-0">
      <UM6PLogo variant="full" theme="color" className="h-10 lg:h-12" />
      <div className="text-right font-mono text-xs sm:text-sm text-[#6E6D70]">
        <span className="font-bold text-[#E5391C]">{c.sessionLabel}</span>
      </div>
    </div>

    <div className="flex-1 flex flex-col justify-center w-full max-w-6xl xl:max-w-7xl space-y-6 lg:space-y-10 py-6">
      <div className="inline-flex items-center gap-2 text-xs sm:text-sm lg:text-base font-mono uppercase tracking-widest text-[#E5391C] bg-[#FDF5F3] px-4 py-1.5 rounded-full border border-[#FAD6CF] font-bold self-start">
        <span className="w-2.5 h-2.5 rounded-full bg-[#E5391C]" />
        <span>{c.pill}</span>
      </div>

      <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-serif-display font-medium text-[#2D2D2E] tracking-tight leading-[1.05] text-balance">
        {c.title}
      </h1>

      <p className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-[#525254] font-light max-w-5xl leading-relaxed text-balance">
        {c.subtitle}
      </p>

      <div className="pt-4 flex items-center gap-6">
        <button
          onClick={onNext}
          className="px-8 lg:px-12 py-4 lg:py-5 bg-[#E5391C] hover:bg-[#C92B10] text-white font-semibold text-lg lg:text-xl rounded-xl transition-all shadow-md flex items-center gap-3 group cursor-pointer active:scale-98"
        >
          <span>{c.cta}</span>
          <ArrowRight className="w-6 h-6 group-hover:translate-x-1.5 transition-transform" />
        </button>
      </div>
    </div>

    <div className="pt-6 border-t border-[#E8E2D9] flex items-center justify-between text-xs sm:text-sm lg:text-base text-[#6E6D70] font-mono flex-shrink-0">
      <div>Mohammed VI Polytechnic University</div>
      <div className="font-semibold text-[#2D2D2E]">Prof. Yassine Ben-Aboud</div>
    </div>
  </div>
);

/* ------------------------------------------------------------------ quiz */
export const QuizLayout: React.FC<{ c: Of<'quiz'> }> = ({ c }) => {
  const [open, setOpen] = useState<boolean[]>(c.items.map(() => false));
  const toggle = (i: number) => setOpen((o) => o.map((v, k) => (k === i ? !v : v)));
  const allOpen = open.every(Boolean);
  return (
    <main className={MAIN_CLASS}>
      <SlideHeading heading={c.heading} />
      <div className="flex-1 min-h-0 flex flex-col gap-5">
        {c.items.map((it, i) => (
          <div key={i} className={`${CARD} flex-1 min-h-0 px-8 py-5 grid grid-cols-2 gap-8 items-center`}>
            <div className="flex items-start gap-5">
              <span className="w-12 h-12 rounded-xl bg-[#222222] text-white flex items-center justify-center font-mono font-bold text-[26px] shrink-0">
                {i + 1}
              </span>
              <p className="text-[30px] leading-[1.3] font-bold text-[#222222]">{it.q}</p>
            </div>
            <button
              onClick={() => toggle(i)}
              className={`text-left rounded-2xl border-2 px-6 py-4 h-full cursor-pointer transition-colors flex items-center ${
                open[i] ? 'bg-[#FDF5F3] border-[#FAD6CF]' : 'bg-[#FAF9F6] border-dashed border-[#E8E2D9] hover:bg-stone-100'
              }`}
            >
              {open[i] ? (
                <span className="text-[28px] leading-[1.35] text-[#2D2D2E]">{rich(it.a)}</span>
              ) : (
                <span className="text-[24px] font-mono font-bold text-[#6E6D70] flex items-center gap-3">
                  <Eye className="w-7 h-7 text-[#E5391C]" /> Click to reveal the answer
                </span>
              )}
            </button>
          </div>
        ))}
      </div>
      <div className="flex-shrink-0 flex justify-end">
        <button
          onClick={() => setOpen(c.items.map(() => !allOpen))}
          className="py-3 px-6 rounded-xl text-[24px] font-bold bg-white hover:bg-stone-100 text-[#525254] border border-[#E8E2D9] flex items-center gap-3 cursor-pointer"
        >
          {allOpen ? <EyeOff className="w-7 h-7" /> : <Eye className="w-7 h-7" />}
          <span>{allOpen ? 'Hide answers' : 'Reveal all'}</span>
        </button>
      </div>
    </main>
  );
};

/* ---------------------------------------------------------------- agenda */
export const AgendaLayout: React.FC<{ c: Of<'agenda'> }> = ({ c }) => {
  if (!c.timeline) {
    // Outcomes only: three tall cards, no time plan on screen.
    return (
      <main className={MAIN_CLASS}>
        <SlideHeading heading={c.heading} />
        <div className="flex-1 min-h-0 grid grid-cols-3 gap-8">
          {c.outcomes.map((o, i) => (
            <div key={o.title} className={`${CARD} p-8 flex flex-col justify-center gap-6 min-h-0`}>
              <div className="space-y-5">
                <div className="w-16 h-16 rounded-xl bg-[#FDF5F3] border border-[#FAD6CF] flex items-center justify-center text-[#E5391C]">
                  <Icon name={o.icon} className="w-9 h-9" />
                </div>
                <div className="text-[32px] font-bold text-[#222222] leading-tight">{i + 1}. {o.title}</div>
              </div>
              <p className="text-[30px] leading-[1.4] text-[#525254]">{rich(o.text)}</p>
            </div>
          ))}
        </div>
        {c.note && <TakeawayBanner>{c.note}</TakeawayBanner>}
      </main>
    );
  }
  const timeline = c.timeline;
  const max = Math.max(...timeline.map((t) => t.min));
  const total = timeline.reduce((a, t) => a + t.min, 0);
  return (
    <main className={MAIN_CLASS}>
      <SlideHeading heading={c.heading} />
      <div className="flex-1 min-h-0 grid grid-cols-12 gap-8">
        <div className="col-span-7 flex flex-col gap-5 min-h-0">
          {c.outcomes.map((o) => (
            <div key={o.title} className={`${CARD} flex-1 min-h-0 px-7 py-5 flex items-center gap-6`}>
              <div className="w-16 h-16 rounded-xl bg-[#FDF5F3] border border-[#FAD6CF] flex items-center justify-center text-[#E5391C] shrink-0">
                <Icon name={o.icon} className="w-9 h-9" />
              </div>
              <div>
                <div className="text-[30px] font-bold text-[#222222] leading-tight">{o.title}</div>
                <div className="text-[26px] leading-[1.35] text-[#525254] pt-1">{o.text}</div>
              </div>
            </div>
          ))}
        </div>
        <div className={`col-span-5 ${CARD} p-7 flex flex-col justify-between min-h-0`}>
          <div className="flex items-center justify-between pb-3 border-b border-[#E8E2D9]">
            <span className="text-[20px] font-mono uppercase tracking-wider text-[#E5391C] font-bold">Today, 4 hours</span>
            <span className="text-[22px] font-mono text-[#6E6D70]">{total} min</span>
          </div>
          <div className="flex-1 flex flex-col justify-around pt-3">
            {timeline.map((t) => (
              <div key={t.label} className="space-y-1">
                <div className="flex items-baseline justify-between gap-4">
                  <span className="text-[26px] font-semibold text-[#222222]">{t.label}</span>
                  <span className="text-[26px] font-mono font-bold text-[#E5391C]">{t.min}′</span>
                </div>
                <div className="h-3 bg-stone-100 rounded-full overflow-hidden border border-stone-200">
                  <div className="h-full bg-[#E5391C] rounded-full" style={{ width: `${(t.min / max) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

/* ------------------------------------------------------------- narrative */
export const NarrativeLayout: React.FC<{ c: Of<'narrative'> }> = ({ c }) => (
  <main className={MAIN_CLASS}>
    <SlideHeading heading={c.heading} />
    <div className={`flex-1 min-h-0 ${CARD} p-10 flex flex-col justify-center gap-8`}>
      <p className="text-[34px] leading-[1.42] text-[#2D2D2E]">{rich(c.body)}</p>
      <div className={`grid gap-10 pt-6 border-t border-[#E8E2D9] ${c.points.length === 3 ? 'grid-cols-3' : 'grid-cols-2'}`}>
        {c.points.map((p) => (
          <div key={p.lead} className="flex items-start gap-4">
            <span className="w-3.5 h-3.5 rounded-full bg-[#E5391C] shrink-0 mt-3" />
            <p className="text-[30px] leading-[1.38] text-[#525254]">
              <strong className="text-[#222222] font-bold">{p.lead}</strong> {p.text}
            </p>
          </div>
        ))}
      </div>
    </div>
    {c.takeaway && <TakeawayBanner>{c.takeaway}</TakeawayBanner>}
  </main>
);

/* --------------------------------------------------------------- compare */
const CompareCol: React.FC<{ col: Of<'compare'>['left'] }> = ({ col }) => {
  const t = TONES[col.tone];
  return (
    <div className={`${t.card} border-2 ${t.border} rounded-3xl p-7 flex flex-col justify-between shadow-xs min-h-0`}>
      <div>
        <div className={`flex items-center justify-between gap-4 pb-3 border-b ${t.border}`}>
          <div className="flex items-center gap-3">
            <span className={`w-4 h-4 rounded-full ${t.dot}`} />
            <span className={`text-[32px] font-bold ${t.title}`}>{col.title}</span>
          </div>
          {col.tag && (
            <span className={`px-3 py-1 rounded-lg text-[15px] font-mono font-bold whitespace-nowrap ${t.tag}`}>{col.tag}</span>
          )}
        </div>
        <p className="text-[30px] leading-[1.38] text-[#525254] pt-4">{rich(col.body)}</p>
        <div className="pt-3 text-[28px] leading-[1.38] text-[#2D2D2E]">{rich(col.example)}</div>
      </div>
      {col.visual && (
        <div className="flex-1 flex items-center justify-center min-h-0 py-2">
          <CompareVisual kind={col.visual} />
        </div>
      )}
      <div className={`text-[24px] leading-[1.3] font-mono px-4 py-3 rounded-xl border flex items-center gap-3 font-semibold mt-4 ${t.chip}`}>
        <span className={`w-3 h-3 rounded-full shrink-0 ${t.dot}`} />
        <span>{col.footer}</span>
      </div>
    </div>
  );
};

export const CompareLayout: React.FC<{ c: Of<'compare'> }> = ({ c }) => (
  <main className={MAIN_CLASS}>
    <SlideHeading heading={c.heading} />
    <div className="flex-1 grid grid-cols-2 gap-8 min-h-0 items-stretch">
      <CompareCol col={c.left} />
      <CompareCol col={c.right} />
    </div>
    {c.takeaway && <TakeawayBanner>{c.takeaway}</TakeawayBanner>}
  </main>
);

/* ------------------------------------------------------------------ flow */
export const FlowLayout: React.FC<{ c: Of<'flow'> }> = ({ c }) => {
  const [sel, setSel] = useState(1);
  const node = c.nodes[sel];
  return (
    <main className={MAIN_CLASS}>
      <SlideHeading heading={c.heading} />
      <div className={`${CARD} p-7 space-y-4 flex-shrink-0`}>
        <div className="flex items-center justify-between pb-3 border-b border-[#E8E2D9]">
          <div className="flex items-center gap-3">
            <span className="w-3.5 h-3.5 rounded-full bg-[#E5391C]" />
            <span className="text-[20px] font-mono uppercase tracking-wider text-[#222222] font-bold">{c.flowTitle}</span>
          </div>
          <span className="text-[16px] font-mono text-[#6E6D70]">{c.flowHint}</span>
        </div>
        <div className="grid grid-cols-11 gap-2 items-stretch py-2">
          {c.nodes.map((n, i) => (
            <React.Fragment key={n.tag}>
              <div
                onClick={() => setSel(i)}
                className={`col-span-3 p-5 rounded-2xl border-2 transition-all cursor-pointer ${
                  sel === i
                    ? 'bg-[#FDF5F3] border-[#E5391C] shadow-md ring-2 ring-[#E5391C]/20'
                    : 'bg-white border-[#E8E2D9] hover:border-stone-400'
                }`}
              >
                <div className="flex justify-between items-center pb-2">
                  <span className="text-[16px] font-mono text-[#E5391C] font-bold">{n.tag}</span>
                  <span className="text-[18px] font-mono font-bold bg-white px-2.5 py-1 rounded border border-[#E8E2D9] whitespace-nowrap">
                    {n.chip}
                  </span>
                </div>
                <div className="text-[28px] font-bold text-[#222222] leading-tight">{n.name}</div>
                <div className="text-[24px] leading-[1.35] text-[#525254] pt-2">{n.blurb}</div>
              </div>
              {n.arrow && (
                <div className="col-span-1 flex flex-col items-center justify-center">
                  <ArrowRight className="w-10 h-10 text-[#E5391C]" />
                  <span className="text-[14px] font-mono text-[#6E6D70]">{n.arrow}</span>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
        <div className="text-[22px] font-mono text-[#525254] pt-3 flex items-center justify-between border-t border-[#E8E2D9]">
          <span>{c.source}</span>
          <span className="text-[#6E6D70] italic">{c.sourceNote}</span>
        </div>
      </div>
      <div className="flex-1 min-h-0 bg-[#FDF5F3] border-2 border-[#FAD6CF] rounded-3xl p-8 shadow-xs flex flex-col justify-center gap-3">
        <div className="flex items-center justify-between">
          <span className="text-[30px] font-bold text-[#E5391C]">
            {node.tag} · {node.detailTitle}
          </span>
          <span className="text-[24px] font-mono font-bold text-[#222222] whitespace-nowrap">{node.detailRange}</span>
        </div>
        <p className="text-[34px] leading-[1.42] text-[#2D2D2E]">{node.detail}</p>
      </div>
    </main>
  );
};

/* ----------------------------------------------------------------- stats */
export const StatsLayout: React.FC<{ c: Of<'stats'> }> = ({ c }) => (
  <main className={MAIN_CLASS}>
    <SlideHeading heading={c.heading} />
    <div className="flex-1 min-h-0 grid grid-cols-3 gap-8">
      {c.stats.map((s) => {
        const t = TONES[s.tone ?? 'neutral'];
        return (
          <div key={s.label} className={`${CARD} p-8 flex flex-col justify-center gap-6 min-h-0`}>
            <div>
              <div className="flex items-baseline gap-3">
                <span className={`text-[84px] leading-none font-serif-display font-medium ${t.text}`}>{s.value}</span>
                <span className="text-[28px] font-bold text-[#222222]">{s.unit}</span>
              </div>
              <div className="text-[32px] font-bold text-[#222222] pt-5 leading-tight">{s.label}</div>
            </div>
            <p className="text-[28px] leading-[1.4] text-[#525254]">{rich(s.text)}</p>
          </div>
        );
      })}
    </div>
    <TakeawayBanner>{c.note}</TakeawayBanner>
  </main>
);

/* ------------------------------------------------------------------ bars */
export const BarsLayout: React.FC<{ c: Of<'bars'> }> = ({ c }) => (
  <main className={MAIN_CLASS}>
    <SlideHeading heading={c.heading} />
    <div className={`flex-1 min-h-0 ${CARD} p-8 flex flex-col justify-between`}>
      <div className="flex items-center gap-3 pb-4 border-b border-[#E8E2D9]">
        <span className="w-3.5 h-3.5 rounded-full bg-[#E5391C]" />
        <span className="text-[26px] font-bold text-[#222222]">{c.chartTitle}</span>
      </div>
      <div className="flex-1 flex flex-col justify-around py-4">
        {c.rows.map((r) => (
          <div key={r.label} className="space-y-2">
            <div className="flex justify-between items-baseline gap-6 text-[24px]">
              <span className="font-medium text-[#2D2D2E]">{r.label}</span>
              <span className="font-mono font-bold whitespace-nowrap">
                {r.sub && <span className="text-[#6E6D70] mr-3">[{r.sub}]</span>}
                <span className="text-[#E5391C] text-[26px]">{r.value}</span>
              </span>
            </div>
            <div className="grid grid-cols-[1fr_330px] items-center gap-6">
              <div className="w-full h-6 bg-stone-100 rounded-full overflow-hidden flex border border-stone-200">
                <div className={`h-full ${TONES[r.tone].bar} rounded-full`} style={{ width: `${r.pct}%` }} />
              </div>
              <span className={`text-[22px] font-bold ${TONES[r.tone].text}`}>{r.tag}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="text-[22px] font-mono text-[#6E6D70] pt-3 flex items-center justify-between border-t border-[#E8E2D9]">
        <span>{c.caption}</span>
        <span className="text-emerald-700 font-bold">{c.captionRight}</span>
      </div>
    </div>
  </main>
);

/* --------------------------------------------------------------- formula */
export const FormulaLayout: React.FC<{ c: Of<'formula'> }> = ({ c }) => (
  <main className={MAIN_CLASS}>
    <SlideHeading heading={c.heading} />
    <div className="flex-1 min-h-0 grid grid-cols-12 gap-8">
      <div className={`col-span-7 ${CARD} p-7 flex flex-col justify-between min-h-0`}>
        <div className="space-y-5">
          <div className="bg-[#1F2421] text-[#E8E2D9] rounded-2xl px-8 py-7 font-mono-code text-[40px] leading-tight text-center shadow-inner">
            {c.formula}
          </div>
          <p className="text-[24px] font-mono text-[#6E6D70] text-center">{c.formulaNote}</p>
          <div className="space-y-3 pt-1">
            {c.variables.map((v) => (
              <div key={v.sym} className="flex items-baseline gap-5">
                <span className="w-24 text-[28px] font-mono font-bold text-[#E5391C] shrink-0">{v.sym}</span>
                <span className="text-[28px] leading-[1.35] text-[#2D2D2E]">{rich(v.meaning)}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="text-[22px] font-mono text-[#6E6D70] pt-3 border-t border-[#E8E2D9]">{c.caption}</div>
      </div>
      <div className="col-span-5 bg-[#FDF5F3] border-2 border-[#FAD6CF] rounded-3xl p-7 shadow-xs flex flex-col min-h-0">
        <div className="pb-3 border-b border-[#FAD6CF]">
          <span className="text-[20px] font-mono uppercase tracking-wider text-[#E5391C] font-bold">{c.exampleTitle}</span>
        </div>
        <div className="flex-1 flex flex-col justify-center gap-5 text-[28px] leading-[1.3] text-[#2D2D2E]">
          {c.example.map((r) =>
            r.strong ? (
              <div key={r.k} className="flex justify-between gap-4 pt-5 border-t border-[#FAD6CF]">
                <span className="font-bold">{r.k}</span>
                <span className="font-mono font-bold text-[#E5391C]">{r.v}</span>
              </div>
            ) : (
              <div key={r.k} className="flex justify-between gap-4">
                <span>{r.k}</span>
                <span className="font-mono font-bold">{r.v}</span>
              </div>
            ),
          )}
        </div>
      </div>
    </div>
  </main>
);

/* ----------------------------------------------------------------- rules */
export const RulesLayout: React.FC<{ c: Of<'rules'> }> = ({ c }) => (
  <main className={MAIN_CLASS}>
    <SlideHeading heading={c.heading} />
    <div className="flex-1 min-h-0 grid grid-cols-3 gap-8">
      {c.rules.map((r, i) => (
        <div key={r.title} className={`${CARD} p-8 flex flex-col justify-between min-h-0`}>
          <div className="space-y-4">
            <span className="w-12 h-12 rounded-xl bg-[#222222] text-white flex items-center justify-center font-mono font-bold text-[26px]">
              {i + 1}
            </span>
            <div className="text-[32px] font-bold text-[#222222] leading-tight">{r.title}</div>
            <p className="text-[30px] leading-[1.38] text-[#525254]">{rich(r.text)}</p>
          </div>
          <div className="text-[24px] leading-[1.3] font-mono font-semibold text-[#E5391C] bg-[#FDF5F3] border border-[#FAD6CF] rounded-xl px-4 py-3">
            {r.evidence}
          </div>
        </div>
      ))}
    </div>
    {c.takeaway && <TakeawayBanner>{c.takeaway}</TakeawayBanner>}
  </main>
);

/* -------------------------------------------------------------- activity */
export const ActivityLayout: React.FC<{ c: Of<'activity'> }> = ({ c }) => {
  const timer = useCountdown(c.timerSeconds);
  const fresh = timer.seconds === c.timerSeconds;
  return (
    <main className={MAIN_CLASS}>
      <SlideHeading heading={c.heading} />
      <div className="grid grid-cols-12 gap-8 flex-1 min-h-0 items-stretch">
        <div className={`col-span-7 ${CARD} p-7 flex flex-col min-h-0`}>
          <div className="flex items-center justify-between pb-3 border-b border-[#E8E2D9]">
            <div className="flex items-center gap-3">
              <span className="w-3.5 h-3.5 rounded-full bg-[#E5391C]" />
              <span className="text-[20px] font-mono uppercase tracking-wider text-[#E5391C] font-bold">{c.label}</span>
            </div>
            <span className="px-3.5 py-1 rounded-full text-[15px] font-mono font-bold bg-[#FDF5F3] text-[#E5391C] border border-[#FAD6CF] whitespace-nowrap">
              {c.chip}
            </span>
          </div>
          <h3 className="text-[40px] font-serif-display font-medium text-[#222222] pt-4 leading-tight">{c.title}</h3>
          <div className="flex-1 flex flex-col justify-center gap-5 pt-4">
            {c.steps.map((st, i) => (
              <div key={i} className="flex items-start gap-4">
                <span className="w-12 h-12 rounded-xl bg-[#222222] text-white flex items-center justify-center font-mono font-bold text-[26px] shrink-0">
                  {i + 1}
                </span>
                <p className="text-[32px] leading-[1.35] text-[#2D2D2E]">{rich(st.text)}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-5 bg-[#FAF9F6] border-2 border-[#E8E2D9] rounded-3xl p-7 shadow-xs flex flex-col justify-between gap-5 min-h-0">
          <div className="flex items-center justify-between">
            <span className="text-[20px] font-mono text-[#525254] font-bold flex items-center gap-2">
              <Clock className="w-6 h-6 text-[#E5391C]" />
              <span>{c.timerLabel}</span>
            </span>
            <span
              className={`text-[56px] leading-none font-mono font-bold tracking-tight ${
                timer.seconds <= 15 && !fresh ? 'text-[#E5391C] animate-pulse' : 'text-[#222222]'
              }`}
            >
              {timer.fmt}
            </span>
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl bg-white border border-[#E8E2D9] p-5">
              <div className="text-[20px] font-mono uppercase tracking-wider text-[#6E6D70] font-bold">Goal</div>
              <p className="text-[28px] leading-[1.3] text-[#2D2D2E] pt-1">{rich(c.goal)}</p>
            </div>
            <div className="rounded-2xl bg-[#FDF5F3] border border-[#FAD6CF] p-5">
              <div className="text-[20px] font-mono uppercase tracking-wider text-[#E5391C] font-bold">You finish with</div>
              <p className="text-[28px] leading-[1.3] text-[#2D2D2E] pt-1">{rich(c.output)}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => timer.setRunning(!timer.running)}
              className={`flex-1 py-3.5 px-5 rounded-xl text-[24px] font-bold flex items-center justify-center gap-3 shadow-sm cursor-pointer whitespace-nowrap text-white ${
                timer.running ? 'bg-amber-600 hover:bg-amber-700' : 'bg-[#E5391C] hover:bg-[#C92B10]'
              }`}
            >
              {timer.running ? <Pause className="w-7 h-7" /> : <Play className="w-7 h-7" />}
              <span>{timer.running ? 'Pause' : fresh ? 'Start' : 'Resume'}</span>
            </button>
            <button
              onClick={timer.reset}
              className="py-3.5 px-6 rounded-xl text-[24px] font-bold bg-white hover:bg-stone-100 text-[#525254] border border-[#E8E2D9] flex items-center justify-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-7 h-7" />
              <span>Reset</span>
            </button>
          </div>
        </div>
      </div>
      {c.takeaway && <TakeawayBanner>{c.takeaway}</TakeawayBanner>}
    </main>
  );
};

/* ----------------------------------------------------------------- table */
export const TableLayout: React.FC<{ c: Of<'table'> }> = ({ c }) => (
  <main className={MAIN_CLASS}>
    <SlideHeading heading={c.heading} />
    <div className="flex-1 min-h-0 flex flex-col gap-3">
      <div className="grid grid-cols-[440px_220px_1fr] gap-6 px-8 text-[20px] font-mono uppercase tracking-wider text-[#E5391C] font-bold">
        {c.heads.map((h) => (
          <span key={h}>{h}</span>
        ))}
      </div>
      {c.rows.map((r) => (
        <div key={r.a} className={`${CARD} flex-1 min-h-0 px-8 grid grid-cols-[440px_220px_1fr] gap-6 items-center`}>
          <span className="text-[30px] font-bold text-[#222222] leading-tight">{r.a}</span>
          <span className="text-[28px] font-mono font-bold text-[#E5391C]">{r.b}</span>
          <span className="text-[28px] leading-[1.35] text-[#525254]">{rich(r.c)}</span>
        </div>
      ))}
    </div>
    <TakeawayBanner>{c.footer}</TakeawayBanner>
  </main>
);

/* ---------------------------------------------------------------- tracks */
export const TracksLayout: React.FC<{ c: Of<'tracks'> }> = ({ c }) => (
  <main className={MAIN_CLASS}>
    <SlideHeading heading={c.heading} />
    <div className="flex-1 min-h-0 grid grid-cols-2 grid-rows-2 gap-6">
      {c.tracks.map((t) => (
        <div key={t.letter} className={`${CARD} p-6 flex flex-col justify-between min-h-0`}>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-[#FDF5F3] border border-[#FAD6CF] flex items-center justify-center text-[#E5391C] shrink-0">
              <Icon name={t.icon} className="w-8 h-8" />
            </div>
            <div>
              <div className="text-[16px] font-mono font-bold text-[#E5391C]">TRACK {t.letter}</div>
              <div className="text-[30px] font-bold text-[#222222] leading-tight">{t.name}</div>
            </div>
          </div>
          <p className="text-[26px] leading-[1.35] text-[#525254]">{t.context}</p>
          <div className="text-[22px] leading-[1.3] font-mono text-[#2D2D2E]">
            <span className="text-[#E5391C] font-bold">BASELINE · </span>
            {t.baseline}
          </div>
        </div>
      ))}
    </div>
    <div className="flex-shrink-0 text-[24px] font-mono font-semibold text-[#525254] text-center">{c.note}</div>
  </main>
);

/* -------------------------------------------------------------- takeaway */
export const TakeawayLayout: React.FC<{ c: Of<'takeaway'> }> = ({ c }) => (
  <main className={MAIN_CLASS}>
    <SlideHeading heading={c.heading} />
    <div className="flex-1 min-h-0 bg-[#FDF5F3] border-2 border-[#FAD6CF] rounded-3xl p-10 flex items-center">
      <p className="text-[42px] leading-[1.3] font-serif-display font-medium text-[#2D2D2E]">{rich(c.statement)}</p>
    </div>
    <div className={`grid gap-8 flex-shrink-0 ${c.points.length === 3 ? 'grid-cols-3' : 'grid-cols-2'}`}>
      {c.points.map((p) => (
        <div key={p.lead} className={`${CARD} p-6`}>
          <div className="text-[32px] font-bold text-[#E5391C] leading-tight">{p.lead}</div>
          <p className="text-[28px] leading-[1.35] text-[#525254] pt-2">{rich(p.text)}</p>
        </div>
      ))}
    </div>
    <div className="flex-shrink-0 text-[24px] font-mono font-semibold text-[#6E6D70] flex items-center gap-3">
      <ArrowRight className="w-6 h-6 text-[#E5391C]" />
      <span>Next: {c.next}</span>
    </div>
  </main>
);

/* --------------------------------------------------------------- divider */
const ACT_SHORT = ['Perception', 'Memory', 'Action', 'Mental models', 'Project', 'Homework'];

/** Marks the start of an act so nobody switches topics without noticing. */
export const DividerLayout: React.FC<{ c: Of<'divider'> }> = ({ c }) => (
  <main className="flex-1 flex flex-col justify-center gap-7 py-6 min-h-0">
    <div className="flex items-center gap-5">
      <span className="h-1.5 w-20 rounded-full bg-[#E5391C]" />
      <span className="text-[24px] font-mono uppercase tracking-widest text-[#E5391C] font-bold">
        Act {c.actNumber} of {ACT_SHORT.length}
      </span>
    </div>
    <h1 className="text-[100px] leading-[1.05] font-serif-display font-medium text-[#2D2D2E] tracking-tight">{c.title}</h1>
    <h2 className="text-[42px] leading-[1.25] text-[#525254] font-light">{c.question}</h2>
    <div className="space-y-3 pt-2">
      <div className="text-[22px] font-mono uppercase tracking-wider text-[#6E6D70] font-bold">In this part</div>
      {c.learn.map((l) => (
        <div key={l} className="flex items-start gap-4">
          <span className="w-3.5 h-3.5 rounded-full bg-[#E5391C] shrink-0 mt-3.5" />
          <p className="text-[34px] leading-[1.35] text-[#2D2D2E]">{l}</p>
        </div>
      ))}
    </div>
    <div className="flex items-center gap-3 pt-4">
      {ACT_SHORT.map((name, i) => {
        const n = i + 1;
        const now = n === c.actNumber;
        return (
          <div
            key={name}
            className={`flex items-center gap-3 px-4 py-2.5 rounded-xl border-2 ${
              now ? 'bg-[#E5391C] border-[#E5391C] text-white' : n < c.actNumber ? 'bg-white border-[#E8E2D9] text-[#6E6D70]' : 'bg-white border-[#E8E2D9] text-[#222222]'
            }`}
          >
            <span className={`font-mono font-bold text-[24px] ${now ? 'text-white' : 'text-[#E5391C]'}`}>{n}</span>
            <span className="text-[22px] font-semibold whitespace-nowrap">{name}</span>
          </div>
        );
      })}
    </div>
  </main>
);

/* -------------------------------------------------------------- projects */
export const ProjectsLayout: React.FC<{ c: Of<'projects'> }> = ({ c }) => (
  <main className={MAIN_CLASS}>
    <SlideHeading heading={c.heading} />
    <div className="flex-1 min-h-0 grid grid-cols-5 grid-rows-2 gap-5">
      {PROJECTS.filter((p) => p.listed !== false).map((p) => (
        <div key={p.id} className={`${CARD} p-5 flex flex-col gap-2 min-h-0`}>
          <div className="flex items-center justify-between">
            <span className="w-12 h-12 rounded-xl bg-[#222222] text-white flex items-center justify-center font-mono font-bold text-[26px]">
              {p.id}
            </span>
            <span className="w-12 h-12 rounded-xl bg-[#FDF5F3] border border-[#FAD6CF] flex items-center justify-center text-[#E5391C]">
              <Icon name={p.icon} className="w-7 h-7" />
            </span>
          </div>
          <div className="text-[28px] font-bold text-[#222222] leading-tight pt-1">{p.title}</div>
          <div className="text-[20px] font-mono uppercase tracking-wider text-[#E5391C] font-bold">{p.domain}</div>
          <p className="text-[24px] leading-[1.3] text-[#525254]">{p.cardLine}</p>
        </div>
      ))}
    </div>
    <div className="flex-shrink-0 text-[24px] font-mono font-semibold text-[#525254] text-center">{c.note}</div>
  </main>
);

/* ----------------------------------------------------------------- audit */
const LENS_INFO: Record<Lens, { n: number; name: string; question: string }> = {
  look: { n: 1, name: 'Look', question: 'Where does the eye go first? Is that the right place? Are related things grouped?' },
  remember: { n: 2, name: 'Remember', question: 'What must the user remember or type from memory? Could the screen show it instead?' },
  point: { n: 3, name: 'Point and choose', question: 'Is the main button big and close? How many choices are on one screen?' },
  understand: { n: 4, name: 'Understand', question: 'What will the user expect to happen? Does the screen say what really happens?' },
};

const AUDIT_SCALE = 0.8; // 1280 x 800 interface shown at 1024 x 640

/** The class example: the live interface (frozen) with numbered boxes on the problems of one lens. */
export const AuditLayout: React.FC<{ c: Of<'audit'> }> = ({ c }) => {
  const Interface = PROJECT_COMPONENTS[11];
  const project = PROJECTS.find((p) => p.id === 11)!;
  const findings = c.lens ? PROJECT_11_FINDINGS.filter((f) => f.lens === c.lens) : [];
  const info = c.lens ? LENS_INFO[c.lens] : null;
  return (
    <main className={MAIN_CLASS}>
      <SlideHeading heading={c.heading} />
      <div className="flex-1 min-h-0 flex gap-8">
        <div className="relative flex-shrink-0" style={{ width: 1280 * AUDIT_SCALE, height: 800 * AUDIT_SCALE }}>
          <div className="absolute inset-0 ring-1 ring-[#D5CFC7] bg-white overflow-hidden shadow-md rounded-xl">
            <div
              className="absolute top-0 left-0 pointer-events-none select-none"
              style={{ width: 1280, height: 800, transform: `scale(${AUDIT_SCALE})`, transformOrigin: 'top left' }}
            >
              <Interface />
            </div>
          </div>
          {findings.map((f, i) => (
            <React.Fragment key={i}>
              <div
                className="absolute rounded-md border-[4px] border-[#E5391C] bg-[#E5391C]/10 pointer-events-none"
                style={{ left: f.rect.x * AUDIT_SCALE, top: f.rect.y * AUDIT_SCALE, width: f.rect.w * AUDIT_SCALE, height: f.rect.h * AUDIT_SCALE }}
              />
              <span
                className="absolute w-10 h-10 rounded-full bg-[#E5391C] text-white flex items-center justify-center font-mono font-bold text-[24px] shadow-md"
                style={{ left: f.rect.x * AUDIT_SCALE - 26, top: f.rect.y * AUDIT_SCALE - 26 }}
              >
                {i + 1}
              </span>
            </React.Fragment>
          ))}
        </div>

        <div className="flex-1 min-w-0 flex flex-col gap-4 min-h-0">
          {info ? (
            <>
              <div className="rounded-2xl bg-[#FDF5F3] border border-[#FAD6CF] px-5 py-3 flex-shrink-0">
                <div className="text-[20px] font-mono uppercase tracking-wider text-[#E5391C] font-bold">
                  Question {info.n}: {info.name}
                </div>
                <p className="text-[24px] leading-[1.3] text-[#2D2D2E] pt-1">{info.question}</p>
              </div>
              {findings.map((f, i) => (
                <div key={i} className={`${CARD} px-5 py-4 flex gap-4 flex-1 min-h-0`}>
                  <span className="w-10 h-10 rounded-full bg-[#E5391C] text-white flex items-center justify-center font-mono font-bold text-[24px] shrink-0">
                    {i + 1}
                  </span>
                  <div className="space-y-1.5 text-[24px] leading-[1.3] text-[#2D2D2E]">
                    <p><strong className="text-[#E5391C]">We saw:</strong> {f.saw}</p>
                    <p><strong className="text-[#222222]">Why it hurts:</strong> {f.why}</p>
                    <p><strong className="text-emerald-700">Fix idea:</strong> {f.fix}</p>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <>
              <div className={`${CARD} p-6`}>
                <div className="text-[20px] font-mono uppercase tracking-wider text-[#E5391C] font-bold">The user</div>
                <p className="text-[28px] leading-[1.3] text-[#2D2D2E] pt-1">{project.user}. {project.situation}</p>
              </div>
              <div className="rounded-3xl bg-[#FDF5F3] border-2 border-[#FAD6CF] p-6">
                <div className="text-[20px] font-mono uppercase tracking-wider text-[#E5391C] font-bold">The task</div>
                <p className="text-[30px] leading-[1.3] font-semibold text-[#222222] pt-1">{project.task}</p>
              </div>
              <div className={`${CARD} p-6 flex-1`}>
                <div className="text-[20px] font-mono uppercase tracking-wider text-[#6E6D70] font-bold">What we will do</div>
                <p className="text-[28px] leading-[1.35] text-[#2D2D2E] pt-1">
                  Look at this screen with the <strong>four questions</strong> of the checklist: look, remember, point and choose, understand. Each question finds two problems.
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
};

/* ---------------------------------------------------------------- teaser */
/** Closing teaser of the next session: same layout as the slide that closes Session 1. */
export const TeaserLayout: React.FC<{ c: Of<'teaser'>; index: number; total: number }> = ({ c, index, total }) => (
  <div className="w-full h-full flex flex-col justify-between p-6 sm:p-8 lg:p-10 xl:p-12 bg-[#FAF9F6] overflow-y-auto select-text text-center">
    <div className="pb-3 lg:pb-4 border-b border-[#E8E2D9] flex items-center justify-between flex-shrink-0">
      <div className="flex items-center gap-3">
        <UM6PLogo variant="compact" theme="color" className="h-6 lg:h-7 w-auto" />
        <div className="h-4 w-px bg-[#E8E2D9]" />
        <span className="text-xs sm:text-sm font-mono uppercase text-[#E5391C] tracking-wider font-bold">{c.label}</span>
      </div>
      <span className="text-xs sm:text-sm font-mono text-[#6E6D70]">
        Slide {index} / {total}
      </span>
    </div>

    <div className="flex-1 w-full max-w-[1720px] mx-auto flex flex-col justify-center py-6 lg:py-10 space-y-6 lg:space-y-10 min-h-0">
      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#FDF5F2] border-2 border-[#E5391C] flex items-center justify-center mx-auto text-[#E5391C] shadow-sm">
        <Icon name={c.icon} className="w-10 h-10 sm:w-12 sm:h-12" />
      </div>

      <div className="space-y-3">
        <span className="text-xs sm:text-sm lg:text-base font-mono uppercase tracking-widest text-[#E5391C] font-bold">{c.kicker}</span>
        <h2 className="text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-serif-display font-medium text-[#2D2D2E]">{c.title}</h2>
        <p className="text-xl sm:text-2xl lg:text-3xl text-[#525254] font-light">{c.subtitle}</p>
      </div>

      <p className="text-base sm:text-lg lg:text-xl text-[#6E6D70] max-w-3xl mx-auto leading-relaxed">{c.blurb}</p>
    </div>

    <div className="text-center text-xs sm:text-sm font-mono text-[#6E6D70] flex-shrink-0">{c.thanks}</div>
  </div>
);

/* ---------------------------------------------------------------- custom */
export const CustomLayout: React.FC<{ c: Of<'custom'> }> = ({ c }) => {
  const C = CUSTOM[c.component];
  return (
    <main className={MAIN_CLASS}>
      <SlideHeading heading={c.heading} />
      <div className="flex-1 min-h-0 flex flex-col">
        <C />
      </div>
    </main>
  );
};
