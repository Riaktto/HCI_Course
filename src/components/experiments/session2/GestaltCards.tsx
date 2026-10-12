import React from 'react';

const T = '#E5391C';
const INK = '#2D2D2E';
const MUTED = '#6E6D70';
const BORDER = '#E8E2D9';
const BLUE = '#2563EB';

const SVG_W = 480;
const SVG_H = 210;

const range = (n: number) => Array.from({ length: n }, (_, i) => i);

const Label: React.FC<{ y: number; children: string }> = ({ y, children }) => (
  <text x={4} y={y} fontSize={22} fontFamily="'JetBrains Mono', monospace" fill={MUTED}>
    {children}
  </text>
);

const Proximity: React.FC = () => (
  <svg width={SVG_W} height={SVG_H} viewBox={`0 0 ${SVG_W} ${SVG_H}`}>
    <Label y={26}>gaps: 3 groups</Label>
    {range(12).map((i) => {
      const g = Math.floor(i / 4);
      const x = 22 + g * 174 + (i % 4) * 28;
      return <circle key={i} cx={x} cy={62} r={11} fill={T} />;
    })}
    <Label y={134}>even: 1 block</Label>
    {range(12).map((i) => (
      <circle key={i} cx={22 + i * 40} cy={170} r={11} fill={INK} />
    ))}
  </svg>
);

const Similarity: React.FC = () => (
  <svg width={SVG_W} height={SVG_H} viewBox={`0 0 ${SVG_W} ${SVG_H}`}>
    {range(4).map((row) =>
      range(9).map((col) => (
        <circle
          key={`${row}-${col}`}
          cx={40 + col * 50}
          cy={32 + row * 48}
          r={16}
          fill={row % 2 === 0 ? T : INK}
        />
      )),
    )}
  </svg>
);

const CommonRegion: React.FC = () => (
  <svg width={SVG_W} height={SVG_H} viewBox={`0 0 ${SVG_W} ${SVG_H}`}>
    <Label y={26}>no boxes</Label>
    {range(8).map((i) => (
      <circle key={i} cx={32 + i * 60} cy={62} r={13} fill={INK} />
    ))}
    <Label y={134}>boxes: 4 groups</Label>
    {range(4).map((g) => (
      <rect
        key={g}
        x={8 + g * 120}
        y={146}
        width={104}
        height={50}
        rx={14}
        fill="#FDF5F3"
        stroke={T}
        strokeWidth={3}
      />
    ))}
    {range(8).map((i) => (
      <circle key={i} cx={32 + i * 60} cy={171} r={13} fill={INK} />
    ))}
  </svg>
);

const Continuity: React.FC = () => (
  <svg width={SVG_W} height={SVG_H} viewBox={`0 0 ${SVG_W} ${SVG_H}`}>
    {range(23).map((i) => {
      const x = 20 + i * 20;
      return <circle key={`s${i}`} cx={x} cy={105 + 62 * Math.sin((i / 22) * Math.PI * 2)} r={7} fill={T} />;
    })}
    {range(23).map((i) => {
      const x = 20 + i * 20;
      return <circle key={`l${i}`} cx={x} cy={182 - (i / 22) * 154} r={7} fill={INK} />;
    })}
  </svg>
);

const Closure: React.FC = () => (
  <svg width={SVG_W} height={SVG_H} viewBox={`0 0 ${SVG_W} ${SVG_H}`} fill="none" strokeLinecap="round" strokeLinejoin="round">
    <circle cx={80} cy={105} r={62} stroke={T} strokeWidth={7} strokeDasharray="70 26" />
    <polygon points="240,40 304,160 176,160" stroke={INK} strokeWidth={7} strokeDasharray="62 30" />
    <rect x={354} y={50} width={116} height={110} rx={12} stroke={BLUE} strokeWidth={7} strokeDasharray="56 30" />
  </svg>
);

const FigureGround: React.FC = () => (
  <svg width={SVG_W} height={SVG_H} viewBox={`0 0 ${SVG_W} ${SVG_H}`}>
    <rect width={SVG_W} height={SVG_H} rx={12} fill="#F3F0EA" />
    {range(5).map((i) => (
      <rect key={i} x={24} y={22 + i * 38} width={i % 2 ? 300 : 400} height={16} rx={8} fill="#CFC8BC" />
    ))}
    <rect width={SVG_W} height={SVG_H} rx={12} fill="#222222" opacity={0.55} />
    <rect x={130} y={34} width={220} height={142} rx={16} fill="#FFFFFF" stroke={BORDER} strokeWidth={2} />
    <rect x={156} y={58} width={168} height={14} rx={7} fill={INK} />
    <rect x={156} y={86} width={120} height={12} rx={6} fill="#CFC8BC" />
    <rect x={156} y={122} width={92} height={34} rx={10} fill={T} />
  </svg>
);

interface Law {
  name: string;
  def: string;
  ui: string;
  Art: React.FC;
}

const SETS: Record<1 | 2, Law[]> = {
  1: [
    {
      name: 'Proximity',
      def: 'Elements that sit close together are seen as one group.',
      ui: 'Form fields grouped by whitespace.',
      Art: Proximity,
    },
    {
      name: 'Similarity',
      def: 'Elements that look alike are seen as belonging together.',
      ui: 'Links sharing a colour read as one set.',
      Art: Similarity,
    },
    {
      name: 'Common Region',
      def: 'Elements inside the same enclosed area are seen as a group.',
      ui: 'Cards group their contents.',
      Art: CommonRegion,
    },
  ],
  2: [
    {
      name: 'Continuity',
      def: 'The eye follows smooth paths and keeps lines going.',
      ui: 'Progress lines and carousels lead the eye.',
      Art: Continuity,
    },
    {
      name: 'Closure',
      def: 'We mentally complete shapes that have gaps.',
      ui: 'Loading skeletons and dotted outlines read as complete.',
      Art: Closure,
    },
    {
      name: 'Figure-Ground',
      def: 'We split a scene into an object in front and a backdrop behind.',
      ui: 'A modal over a dimmed backdrop.',
      Art: FigureGround,
    },
  ],
};

export const GestaltCards: React.FC<{ set: 1 | 2 }> = ({ set }) => (
  <div className="flex-1 min-h-0 grid grid-cols-3 gap-6">
    {SETS[set].map(({ name, def, ui, Art }) => (
      <div
        key={name}
        className="min-h-0 bg-white border border-[#E8E2D9] rounded-3xl shadow-xs px-7 py-8 flex flex-col justify-between"
      >
        <div className="space-y-3">
          <h3 className="text-[30px] leading-[1.2] font-bold text-[#222222]">{name}</h3>
          <p className="text-[26px] leading-[1.35] text-[#525254]">{def}</p>
        </div>
        <div className="self-center">
          <Art />
        </div>
        <p className="text-[24px] leading-[1.4] text-[#2D2D2E]">
          <span className="font-mono font-bold text-[#E5391C]">UI:</span> {ui}
        </p>
      </div>
    ))}
  </div>
);
