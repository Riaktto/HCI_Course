import React, { useState } from 'react';
import { ArrowLeftRight } from 'lucide-react';

type SlaveId = 'loop' | 'sketchpad' | 'buffer';

interface SlaveBox {
  id: SlaveId;
  name: string;
  what: string;
  implication: string;
  example: string;
}

const BOXES: SlaveBox[] = [
  {
    id: 'loop',
    name: 'Inner voice',
    what: 'Words and sounds you hold by repeating them (about 2 seconds)',
    implication: 'A voice-over that reads the slide aloud uses your inner voice, so you cannot also read the text.',
    example: 'Someone tells you a phone number and you repeat it in your head until you dial it. Reading a text at the same time breaks it.',
  },
  {
    id: 'sketchpad',
    name: 'Inner eye',
    what: 'Pictures and where things are',
    implication: 'Icons and layout use the inner eye, which is free.',
    example: 'You know your keys are on the left of the table. You see that picture in your head, without any words.',
  },
  {
    id: 'buffer',
    name: 'Memory link',
    what: 'Connects what you see to what you already know',
    implication: 'Familiar patterns are recognised, not memorised.',
    example: 'A shopping cart icon at the top right: you know it at once, because you have seen it in many shops.',
  },
];

const CAPACITY_SLOTS = 4;
const CAPACITY_FILLED = 3;

export const BaddeleyModel: React.FC = () => {
  const [selected, setSelected] = useState<SlaveId>('loop');
  const current = BOXES.find((b) => b.id === selected) ?? BOXES[0];

  return (
    <div className="flex-1 min-h-0 flex flex-col justify-between">
      {/* Goal */}
      <div className="h-[44px] shrink-0 flex items-center text-[30px] font-bold text-[#E5391C]">
        Goal: see why too much text, talking and detail at once overloads people.
      </div>

      {/* Attention manager */}
      <div className="h-[84px] shrink-0 bg-[#222222] rounded-3xl shadow-xs px-8 flex items-center justify-between">
        <span className="text-[30px] font-bold text-white">Attention manager</span>
        <span className="text-[28px] text-[#E8E2D9]">decides what to focus on</span>
      </div>

      {/* Connectors */}
      <div className="h-[18px] shrink-0 flex gap-12" aria-hidden>
        {BOXES.map((b) => (
          <div key={b.id} className="w-[576px] flex justify-center">
            <div className="w-[3px] h-full bg-[#9A948B]" />
          </div>
        ))}
      </div>

      {/* Three parts */}
      <div className="h-[300px] shrink-0 flex items-stretch gap-0">
        {BOXES.map((b, i) => {
          const active = b.id === selected;
          return (
            <React.Fragment key={b.id}>
              <button
                type="button"
                onClick={() => setSelected(b.id)}
                aria-pressed={active}
                className={`w-[576px] text-left rounded-3xl border-2 px-6 py-4 flex flex-col cursor-pointer transition-colors ${
                  active
                    ? 'bg-[#FDF5F3] border-[#E5391C] shadow-md'
                    : 'bg-white border-[#E8E2D9] hover:border-stone-400 shadow-xs'
                }`}
              >
                <span className={`text-[30px] font-bold leading-tight ${active ? 'text-[#E5391C]' : 'text-[#222222]'}`}>
                  {b.name}
                </span>
                <span className="text-[26px] leading-[1.3] text-[#525254] pt-1">{b.what}</span>
                <span className="mt-auto pt-2 border-t border-[#E8E2D9] text-[26px] leading-[1.3] font-semibold text-[#222222]">
                  {b.implication}
                </span>
              </button>
              {i < BOXES.length - 1 && (
                <div className="w-12 flex items-center justify-center text-[#E5391C]" aria-hidden>
                  <ArrowLeftRight className="w-9 h-9" />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Detail strip + capacity */}
      <div className="h-[150px] shrink-0 flex gap-6">
        <div className="flex-1 min-w-0 bg-[#FDF5F3] border-2 border-[#FAD6CF] rounded-3xl px-8 py-3 flex flex-col justify-center gap-1">
          <span className="text-[22px] font-mono font-bold text-[#E5391C]">Everyday example: {current.name}</span>
          <p className="text-[32px] leading-[1.3] text-[#2D2D2E]">{current.example}</p>
        </div>
        <div className="w-[480px] shrink-0 bg-white border border-[#E8E2D9] rounded-3xl px-6 flex flex-col justify-center gap-2 shadow-xs">
          <div className="flex gap-3" aria-hidden>
            {Array.from({ length: CAPACITY_SLOTS }, (_, i) => (
              <div
                key={i}
                className={`h-6 flex-1 rounded-lg ${
                  i < CAPACITY_FILLED ? 'bg-[#E5391C]' : 'border-2 border-dashed border-[#E5391C]/50'
                }`}
              />
            ))}
          </div>
          <span className="text-[24px] leading-[1.25] text-[#525254]">
            Working memory holds only about 4 chunks (4 meaningful things) at once.
          </span>
        </div>
      </div>
    </div>
  );
};
