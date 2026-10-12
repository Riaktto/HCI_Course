import React, { useLayoutEffect, useRef, useState } from 'react';
import { Activity } from 'lucide-react';

type FixId = 'title' | 'button' | 'link';

const TARGETS: { id: FixId; label: string }[] = [
  { id: 'title', label: 'Look at: title' },
  { id: 'button', label: 'Look at: button' },
  { id: 'link', label: 'Look at: footer link' },
];

const MOCK_H = 575;
const SHARP_R = 66; // fully sharp radius (illustrative, ~2 degrees)
const FADE_R = 120; // sharp -> blurred transition ends here

interface UiRefs {
  title?: HTMLElement | null;
  button?: HTMLElement | null;
  link?: HTMLElement | null;
}

/** The mock clinic-booking page. Rendered twice (blurred + sharp) with identical geometry. */
const MockPage: React.FC<{ refs?: React.MutableRefObject<UiRefs> }> = ({ refs }) => (
  <div className="absolute inset-0 bg-white">
    <div className="absolute left-0 right-0 top-0 h-[56px] bg-[#F3F0EA] border-b border-[#E8E2D9] flex items-center gap-3 px-6">
      <span className="w-4 h-4 rounded-full bg-[#D9D3C8]" />
      <span className="w-4 h-4 rounded-full bg-[#D9D3C8]" />
      <span className="w-4 h-4 rounded-full bg-[#D9D3C8]" />
      <span className="ml-6 text-[22px] font-mono text-[#6E6D70]">clinic.example/book</span>
    </div>
    <h3
      ref={(el) => {
        if (refs) refs.current.title = el;
      }}
      className="absolute left-12 top-[84px] text-[40px] leading-[1.2] font-serif-display font-medium text-[#2D2D2E] whitespace-nowrap"
    >
      Book an appointment
    </h3>
    {['Patient name', 'Preferred date'].map((label, i) => (
      <div key={label} className="absolute top-[170px] w-[460px]" style={{ left: 48 + i * 500 }}>
        <div className="text-[22px] font-semibold text-[#525254] mb-2">{label}</div>
        <div className="h-[56px] rounded-xl border-2 border-[#E8E2D9] bg-[#FAF9F6] px-4 flex items-center text-[24px] text-[#6E6D70]">
          {i === 0 ? 'Amina El Idrissi' : '14 / 03 / 2027'}
        </div>
      </div>
    ))}
    <div
      ref={(el) => {
        if (refs) refs.current.button = el;
      }}
      className="absolute left-12 top-[320px] bg-[#E5391C] text-white rounded-xl px-8 py-4 text-[24px] font-bold whitespace-nowrap"
    >
      Confirm booking
    </div>
    <div className="absolute left-12 right-12 top-[430px] border-t border-[#E8E2D9]" />
    <div
      ref={(el) => {
        if (refs) refs.current.link = el;
      }}
      className="absolute left-12 top-[462px] text-[22px] text-blue-700 underline whitespace-nowrap"
    >
      Privacy policy
    </div>
    <div className="absolute right-12 top-[462px] text-[22px] text-[#6E6D70] whitespace-nowrap">Open 08:00 - 18:00</div>
  </div>
);

const FACTS: { big?: string; icon?: boolean; text: string }[] = [
  { big: '2°', text: 'Only a small spot is sharp: the size of a thumbnail at arm’s length.' },
  { big: '3/s', text: 'The eye makes about 3 jumps a second. You see almost nothing during a jump.' },
  { icon: true, text: 'The edge of your vision sees movement well, but cannot read.' },
];

export const FovealVision: React.FC = () => {
  const [fix, setFix] = useState<FixId>('title');
  const [pos, setPos] = useState({ x: 300, y: 112 });
  const uiRefs = useRef<UiRefs>({});
  const posRef = useRef(pos);
  const firstRun = useRef(true);

  const centerOf = (id: FixId) => {
    const el = uiRefs.current[id];
    if (!el) return null;
    return { x: el.offsetLeft + el.offsetWidth / 2, y: el.offsetTop + el.offsetHeight / 2 };
  };

  useLayoutEffect(() => {
    const target = centerOf(fix);
    if (!target) return;
    if (firstRun.current) {
      firstRun.current = false;
      posRef.current = target;
      setPos(target);
      return;
    }
    const from = { ...posRef.current };
    const start = performance.now();
    const duration = 650;
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const e = 1 - Math.pow(1 - t, 3);
      const next = { x: from.x + (target.x - from.x) * e, y: from.y + (target.y - from.y) * e };
      posRef.current = next;
      setPos(next);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [fix]);


  const mask = `radial-gradient(circle at ${pos.x}px ${pos.y}px, transparent 0, transparent ${SHARP_R}px, #000 ${FADE_R}px)`;

  return (
    <div className="flex-1 min-h-0 flex gap-6">
      {/* Left: spotlight panel */}
      <div className="box-content w-[1100px] shrink-0 bg-white border border-[#E8E2D9] rounded-3xl shadow-xs overflow-hidden flex flex-col">
        <div className="relative shrink-0 overflow-hidden" style={{ height: MOCK_H }}>
          <MockPage refs={uiRefs} />
          {/* Peripheral blur: backdrop blur everywhere except the masked foveal zone */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ backdropFilter: "blur(5px)", WebkitBackdropFilter: "blur(5px)", WebkitMaskImage: mask, maskImage: mask }}
          />
          <svg className="absolute left-0 top-0 pointer-events-none" width={1100} height={MOCK_H} viewBox={`0 0 1100 ${MOCK_H}`}>
            <circle cx={pos.x} cy={pos.y} r={SHARP_R} fill="none" stroke="#E5391C" strokeWidth={3} strokeDasharray="10 8" />
            <path d={`M${pos.x - 12} ${pos.y}H${pos.x + 12}M${pos.x} ${pos.y - 12}V${pos.y + 12}`} stroke="#E5391C" strokeWidth={3} />
          </svg>
        </div>
        <div className="flex-1 border-t border-[#E8E2D9] bg-[#FAF9F6] flex items-center gap-3 px-5">
          {TARGETS.map((f) => (
            <button
              key={f.id}
              onClick={() => setFix(f.id)}
              className={`rounded-xl px-5 py-3.5 text-[24px] font-bold transition-colors ${
                fix === f.id
                  ? 'bg-[#E5391C] text-white'
                  : 'bg-white border border-[#E8E2D9] text-[#525254] hover:bg-stone-100'
              }`}
            >
              {f.label}
            </button>
          ))}
          <span className="ml-auto text-[22px] font-mono text-[#6E6D70]">illustrative scale</span>
        </div>
      </div>

      {/* Right: facts + implication */}
      <div className="flex-1 min-w-0 flex flex-col gap-4">
        <div className="flex-1 min-h-0 bg-white border border-[#E8E2D9] rounded-3xl shadow-xs flex flex-col divide-y divide-[#E8E2D9]">
          {FACTS.map((f, i) => (
            <div key={i} className="flex-1 flex items-center gap-5 px-7">
              <div className="w-[130px] shrink-0 flex items-center justify-center text-[#E5391C]">
                {f.icon ? (
                  <Activity className="w-14 h-14" />
                ) : (
                  <span className="text-[56px] leading-none font-serif-display font-medium">{f.big}</span>
                )}
              </div>
              <p className="text-[30px] leading-[1.3] text-[#2D2D2E]">{f.text}</p>
            </div>
          ))}
        </div>
        <div className="shrink-0 bg-[#FDF5F3] border border-[#FAD6CF] rounded-3xl px-7 py-5">
          <p className="text-[28px] leading-[1.35] font-serif-display font-medium text-[#2D2D2E]">
            Put key information where the eye already is. The edge of vision only notices movement or strong colour.
          </p>
        </div>
      </div>
    </div>
  );
};
