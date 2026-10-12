import React, { useState } from 'react';

interface Field {
  label: string;
  value: string;
  group: 0 | 1 | 2;
  row: 0 | 1 | 2;
  required: boolean;
}

const GROUPS = ['Identity', 'Contact', 'Medical'];

const FIELDS: Field[] = [
  { label: 'Full name', value: 'Amina El Idrissi', group: 0, row: 0, required: true },
  { label: 'Date of birth', value: '14 / 03 / 1991', group: 0, row: 1, required: true },
  { label: 'National ID', value: 'AB 123456', group: 0, row: 2, required: false },
  { label: 'Phone', value: '+212 6 12 34 56 78', group: 1, row: 0, required: true },
  { label: 'Email', value: 'amina@example.org', group: 1, row: 1, required: true },
  { label: 'Address', value: 'Hay Riad, Rabat', group: 1, row: 2, required: false },
  { label: 'Allergies', value: 'Penicillin', group: 2, row: 0, required: true },
  { label: 'Current medication', value: 'None', group: 2, row: 1, required: false },
  { label: 'Emergency contact', value: 'Yassine B.', group: 2, row: 2, required: false },
];

const STEPS = [
  {
    button: '0 Raw',
    law: 'Raw form',
    text: 'Nine fields, equal gaps, no cues: the eye sees one undifferentiated block.',
    groups: 1,
    caption: 'one undifferentiated block',
  },
  {
    button: '1 Proximity',
    law: 'Proximity',
    text: 'Opening wider gaps between related fields makes three groups appear.',
    groups: 3,
    caption: 'Identity, Contact, Medical',
  },
  {
    button: '2 Common region',
    law: 'Common region',
    text: 'An enclosing card with a title makes each group explicit.',
    groups: 3,
    caption: 'boundaries confirm the groups',
  },
  {
    button: '3 Similarity',
    law: 'Similarity',
    text: 'Required labels share one terracotta style; optional ones stay grey.',
    groups: 3,
    caption: 'plus required vs optional',
  },
  {
    button: '4 Hierarchy',
    law: 'Visual hierarchy',
    text: 'Stronger headings and one primary action tell the eye where to start and end.',
    groups: 3,
    caption: 'plus one clear primary action',
  },
];

// Geometry (px, inside the 1180 x 671 form panel; content origin x=28)
const FW = 320; // field width
const FH = 101; // field height (label + input)
const PAD_X = 28;
const GAP = 24; // vertical gap, and the horizontal gap in the raw state
const PITCH = FH + GAP;

const fieldPos = (f: Field, step: number) => {
  if (step === 0) return { x: 58 + f.group * (FW + GAP), y: 84 + f.row * PITCH };
  if (step === 1) return { x: f.group * (FW + 82), y: 84 + f.row * PITCH };
  return { x: 16 + f.group * 386, y: 146 + f.row * PITCH };
};

export const GestaltWorkbenchDemo: React.FC = () => {
  const [step, setStep] = useState(0);
  const s = STEPS[step];
  const ease = 'transition-all duration-500 ease-in-out';

  return (
    <div className="flex-1 min-h-0 flex gap-11">
      {/* Left: the intake form */}
      <div className="box-content w-[1180px] shrink-0 relative bg-white border border-[#E8E2D9] rounded-3xl shadow-xs overflow-hidden">
        <div className="absolute left-7 top-5 text-[30px] font-bold text-[#222222] leading-[44px]">Patient Intake</div>

        <div className="absolute" style={{ left: PAD_X, top: 0, width: 1124, height: 660 }}>
          {/* Group cards (step >= 2) */}
          {GROUPS.map((g, gi) => (
            <div
              key={g}
              className={`absolute rounded-2xl border-2 ${ease} ${
                step >= 2 ? 'opacity-100 border-[#E8E2D9] bg-[#FAF9F6]' : 'opacity-0 border-transparent bg-transparent'
              }`}
              style={{ left: gi * 386, top: 76, width: 352, height: 437 }}
            >
              <div
                className={`absolute left-4 right-4 top-3 text-[30px] leading-[40px] ${ease} ${step >= 2 ? "visible" : "invisible"} ${
                  step >= 4
                    ? 'font-bold text-[#222222] border-b-[3px] border-[#E5391C]'
                    : 'font-semibold text-[#6E6D70] border-b-[3px] border-transparent'
                }`}
              >
                {g}
              </div>
            </div>
          ))}

          {/* Fields */}
          {FIELDS.map((f) => {
            const { x, y } = fieldPos(f, step);
            const emphasised = step >= 3;
            return (
              <div
                key={f.label}
                className={`absolute ${ease}`}
                style={{ left: x, top: y, width: FW, height: FH }}
              >
                <div
                  className={`text-[24px] leading-[30px] whitespace-nowrap ${ease} ${
                    emphasised
                      ? f.required
                        ? 'font-bold text-[#E5391C]'
                        : 'font-medium text-[#8A898C]'
                      : 'font-semibold text-[#525254]'
                  }`}
                >
                  {f.label}
                  {emphasised && f.required ? ' *' : ''}
                </div>
                <div className="mt-2 h-[62px] rounded-xl border-2 border-[#E8E2D9] bg-white px-4 flex items-center text-[24px] text-[#6E6D70] whitespace-nowrap">
                  {f.value}
                </div>
              </div>
            );
          })}

          {/* Legend (step >= 3) */}
          <div
            className={`absolute text-[22px] font-mono ${ease} ${step >= 3 ? 'opacity-100' : 'opacity-0'}`}
            style={{ left: 0, top: 574 }}
          >
            <span className="text-[#E5391C] font-bold">* required</span>
            <span className="text-[#8A898C] ml-5">grey = optional</span>
          </div>

          {/* Actions */}
          <div className="absolute flex items-center gap-4" style={{ right: 0, top: 556, height: 64 }}>
            <button
              tabIndex={-1}
              className={`rounded-xl text-[24px] ${ease} ${
                step >= 4
                  ? 'bg-transparent border-2 border-transparent text-[#6E6D70] font-medium px-6 py-3.5'
                  : 'bg-white border-2 border-[#E8E2D9] text-[#525254] font-semibold px-6 py-3.5'
              }`}
            >
              Cancel
            </button>
            <button
              tabIndex={-1}
              className={`rounded-xl text-[24px] font-bold border-2 ${ease} ${
                step >= 4
                  ? 'bg-[#E5391C] border-[#E5391C] text-white px-10 py-3.5'
                  : 'bg-white border-[#E8E2D9] text-[#525254] px-6 py-3.5'
              }`}
            >
              Submit
            </button>
          </div>
        </div>
      </div>

      {/* Right: stepper + explanation */}
      <div className="flex-1 min-w-0 flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          {STEPS.map((st, i) => (
            <button
              key={st.button}
              onClick={() => setStep(i)}
              className={`text-left rounded-xl px-5 h-[52px] text-[24px] font-bold transition-colors ${
                step === i
                  ? 'bg-[#E5391C] text-white'
                  : i < step
                    ? 'bg-[#FDF5F3] border border-[#FAD6CF] text-[#E5391C]'
                    : 'bg-white border border-[#E8E2D9] text-[#525254] hover:bg-stone-100'
              }`}
            >
              {st.button}
            </button>
          ))}
        </div>
        <div className="flex-1 min-h-0 bg-white border border-[#E8E2D9] rounded-3xl shadow-xs px-7 py-6 flex flex-col justify-between">
          <div className="space-y-2">
            <h3 className="text-[30px] leading-[1.2] font-bold text-[#222222]">{s.law}</h3>
            <p className="text-[26px] leading-[1.35] text-[#525254]">{s.text}</p>
          </div>
          <div className="border-t border-[#E8E2D9] pt-3">
            <div className="text-[24px] font-mono text-[#6E6D70]">Groups the eye sees</div>
            <div className="flex items-baseline gap-5">
              <span className="text-[56px] leading-[1.1] font-mono-code font-medium text-[#E5391C]">{s.groups}</span>
              <span className="text-[24px] text-[#525254]">{s.caption}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
