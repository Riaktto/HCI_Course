import React, { useState } from 'react';

type NodeId = 'designer' | 'image' | 'user';

const BOX_W = 480;
const GAP = 192;
const BOX_Y = 120;
const BOX_H = 140;
const CARD_Y = 284;
const CARD_H = 150;
const ACCENT = '#E5391C';
const INK = '#222222';

const NODES: { id: NodeId; title: string; example: React.ReactNode }[] = [
  {
    id: 'designer',
    title: 'How the designer thinks it works',
    example: 'A thermostat compares room temperature with a set point',
  },
  {
    id: 'image',
    title: 'What the screen shows (the system image)',
    example: 'A dial labelled "Heat", a number, a flame icon',
  },
  {
    id: 'user',
    title: 'What the user thinks it does',
    example: 'Turn it higher = it heats faster (a wrong guess)',
  },
];

const x0 = (i: number) => i * (BOX_W + GAP);
const cx = (i: number) => x0(i) + BOX_W / 2;

export const MentalTriad: React.FC = () => {
  const [selected, setSelected] = useState<NodeId | null>(null);

  return (
    <div className="flex-1 min-h-0 relative">
      {/* Arrows, bracket and their labels (1 unit = 1 px) */}
      <svg width={1824} height={520} viewBox="0 0 1824 520" className="absolute left-0 top-0 pointer-events-none" aria-hidden>
        <defs>
          <marker id="triad-arrow" markerWidth="20" markerHeight="20" refX="9" refY="5" orient="auto" markerUnits="userSpaceOnUse" viewBox="0 0 10 10">
            <path d="M0 0 L10 5 L0 10 Z" fill={INK} />
          </marker>
          <marker id="triad-arrow-grey" markerWidth="20" markerHeight="20" refX="9" refY="5" orient="auto" markerUnits="userSpaceOnUse" viewBox="0 0 10 10">
            <path d="M0 0 L10 5 L0 10 Z" fill="#9A948B" />
          </marker>
        </defs>

        {/* Designer builds the system image */}
        <line x1={BOX_W + 14} y1={BOX_Y + 80} x2={BOX_W + GAP - 16} y2={BOX_Y + 80} stroke={INK} strokeWidth={4} markerEnd="url(#triad-arrow)" />
        <text x={BOX_W + GAP / 2} y={BOX_Y + 60} fontSize={24} fontWeight={600} fill="#525254" textAnchor="middle">builds</text>

        {/* The user forms a model only from the system image */}
        <line x1={x0(1) + BOX_W + 14} y1={BOX_Y + 80} x2={x0(2) - 16} y2={BOX_Y + 80} stroke={INK} strokeWidth={8} markerEnd="url(#triad-arrow)" />
        <text x={x0(1) + BOX_W + GAP / 2} y={BOX_Y + 28} fontSize={24} fontWeight={700} fill={INK} textAnchor="middle">the only way</text>
        <text x={x0(1) + BOX_W + GAP / 2} y={BOX_Y + 56} fontSize={24} fontWeight={700} fill={INK} textAnchor="middle">the user learns</text>

        {/* No direct channel */}
        <path
          d={`M${cx(0)} ${BOX_Y - 8} V66 H${cx(2)} V${BOX_Y - 16}`}
          fill="none"
          stroke="#9A948B"
          strokeWidth={4}
          strokeDasharray="16 12"
          markerEnd="url(#triad-arrow-grey)"
        />
        <circle cx={cx(1)} cy={66} r={22} fill="#FAF9F6" />
        <path d={`M${cx(1) - 13} 53 L${cx(1) + 13} 79 M${cx(1) + 13} 53 L${cx(1) - 13} 79`} stroke="#DC2626" strokeWidth={7} strokeLinecap="round" />
        <text x={cx(1)} y={30} fontSize={24} fontWeight={700} fill="#DC2626" textAnchor="middle">no direct link</text>

        {/* Mismatch bracket under system image + user's model examples */}
        <path
          d={`M${x0(1)} ${CARD_Y + CARD_H + 16} V${CARD_Y + CARD_H + 36} H${x0(2) + BOX_W} V${CARD_Y + CARD_H + 16}`}
          fill="none"
          stroke={ACCENT}
          strokeWidth={5}
          strokeLinejoin="round"
        />
        <line x1={cx(1) + (BOX_W + GAP) / 2} y1={CARD_Y + CARD_H + 36} x2={cx(1) + (BOX_W + GAP) / 2} y2={CARD_Y + CARD_H + 52} stroke={ACCENT} strokeWidth={5} />
      </svg>

      {/* Mismatch label */}
      <div
        className="absolute flex justify-center"
        style={{ left: x0(1), width: x0(2) + BOX_W - x0(1), top: CARD_Y + CARD_H + 56 }}
      >
        <span className="bg-[#E5391C] text-white text-[28px] font-bold rounded-xl px-6 py-2">Mismatch lives here</span>
      </div>

      {/* Boxes + worked examples */}
      {NODES.map((n, i) => {
        const active = selected === n.id;
        return (
          <React.Fragment key={n.id}>
            <button
              type="button"
              aria-pressed={active}
              onClick={() => setSelected(active ? null : n.id)}
              className={`absolute rounded-3xl border-2 px-6 flex flex-col justify-center text-left cursor-pointer transition-colors ${
                active ? 'bg-[#FDF5F3] border-[#E5391C] shadow-md' : 'bg-white border-[#E8E2D9] hover:border-stone-400 shadow-xs'
              }`}
              style={{ left: x0(i), top: BOX_Y, width: BOX_W, height: BOX_H }}
            >
              <span className={`text-[30px] font-bold leading-[1.2] ${active ? 'text-[#E5391C]' : 'text-[#222222]'}`}>{n.title}</span>
            </button>
            <div
              className={`absolute rounded-2xl border px-6 flex items-center text-[28px] leading-[1.35] text-[#2D2D2E] ${
                i > 0 ? 'bg-[#FDF5F3] border-[#FAD6CF]' : 'bg-white border-[#E8E2D9]'
              }`}
              style={{ left: x0(i), top: CARD_Y, width: BOX_W, height: CARD_H }}
            >
              {n.example}
            </div>
          </React.Fragment>
        );
      })}

      <p className="absolute left-0 right-0 bottom-0 text-center text-[34px] font-serif-display font-medium text-[#2D2D2E]">
        The screen is the only teacher the user has.
      </p>
    </div>
  );
};
