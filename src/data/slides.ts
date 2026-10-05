import { SlideData, ActMeta } from '../types';

export const ACTS_METADATA: ActMeta[] = [
  {
    id: 1,
    title: 'ACT 1 — EXPERIENCE',
    subtitle: 'Why do some technologies feel easy while others feel frustrating?',
    slidesRange: 'Slides 1–8',
    color: '#d97736',
  },
  {
    id: 2,
    title: 'ACT 2 — UNDERSTANDING INTERACTION',
    subtitle: 'Human, Computer, Interaction & The Core Loop',
    slidesRange: 'Slides 9–18',
    color: '#3b82f6',
  },
  {
    id: 3,
    title: 'ACT 3 — UNDERSTANDING THE USER',
    subtitle: 'User Diversity, Goals vs Tasks, and Context of Use',
    slidesRange: 'Slides 19–26',
    color: '#10b981',
  },
  {
    id: 4,
    title: 'ACT 4 — EXPERIENCE BAD DESIGN',
    subtitle: 'The Anatomy of Frustration & Cognitive Traps',
    slidesRange: 'Slides 27–31',
    color: '#ef4444',
  },
  {
    id: 5,
    title: 'ACT 5 — MAKE USABILITY MEASURABLE',
    subtitle: 'ISO 9241-11 Usability Metrics & Empirical Science',
    slidesRange: 'Slides 32–37',
    color: '#8b5cf6',
  },
  {
    id: 6,
    title: 'ACT 6 — THE HCI MINDSET',
    subtitle: 'Human-Centered Design, Course Roadmap & The Human',
    slidesRange: 'Slides 38–45',
    color: '#f59e0b',
  },
];

export const SLIDES_DATA: SlideData[] = [
  // ==========================================
  // ACT 1: EXPERIENCE (Slides 1–8)
  // ==========================================
  {
    id: 1,
    act: 1,
    actTitle: 'ACT 1 — EXPERIENCE',
    title: 'Human-Computer Interaction',
    subtitle: 'Understanding the Interaction Between People and Technology',
    type: 'title',
    speakerNotes: {
      timingMin: 5,
      keyPoints: [
        'Welcome students to the UM6P Human-Computer Interaction course.',
        'State clearly: This is not a course about graphic design; it is about human behavior, cognition, and engineering.',
        'Set expectations: We will not start with dry definitions—we will start with experience.',
      ],
      spokenScriptAdvice:
        'Good morning everyone. Welcome to Human-Computer Interaction. Before we write a single formula or open any design software, I want us to confront a paradox that you experience every single day.',
      classroomFacilitationTip:
        'Keep the slide up as students enter. Ensure projector aspect ratio is set to 16:9.',
    },
  },
  {
    id: 2,
    act: 1,
    actTitle: 'ACT 1 — EXPERIENCE',
    title: 'The Everyday Paradox',
    subtitle: 'Why do sophisticated technologies make us feel foolish?',
    type: 'question',
    speakerNotes: {
      timingMin: 5,
      keyPoints: [
        'Technology has never been more mathematically capable.',
        'Servers handle billions of operations per second.',
        'Yet humans regularly scream at printers, struggle with TV remotes, and misplace files.',
      ],
      spokenScriptAdvice:
        'Ask the room: When was the last time you felt frustrated by an app or a machine? Was it the machines fault, or your fault? We are taught to blame ourselves.',
      classroomFacilitationTip:
        'Call on 2 students briefly to share a frustrating tech experience from the last 24 hours.',
    },
  },
  {
    id: 3,
    act: 1,
    actTitle: 'ACT 1 — EXPERIENCE',
    title: 'Provocative Comparison: Two Train Terminals',
    subtitle: 'Same task, same backend database. Predict what will happen.',
    type: 'comparison_think',
    activity: {
      type: 'THINK',
      durationSec: 30,
      question: 'Which interface will be faster and less error-prone?',
      instructions: [
        'Examine Interface A (Dense Terminal) vs Interface B (Direct Intent).',
        'Consider: Both connect to the exact same high-speed rail database.',
        'Raise your hand when you have made your prediction.',
      ],
    },
    speakerNotes: {
      timingMin: 4,
      keyPoints: [
        'Prime students before running the live simulation.',
        'Point out that Interface A was designed by engineers who know SQL.',
        'Point out Interface B was designed around how a traveler thinks.',
      ],
      spokenScriptAdvice:
        'Look at these two screens. Interface A is what happens when backend developers build the UI. Interface B is what happens when we understand human intent.',
      classroomFacilitationTip:
        'Start the 30-second timer. Count raised hands for A vs B.',
    },
  },
  {
    id: 4,
    act: 1,
    actTitle: 'ACT 1 — EXPERIENCE',
    title: 'Live Experiment: Same Functionality, Different Experience',
    subtitle: 'Task: Book an Express Train Seat (Casablanca → Benguerir UM6P)',
    type: 'experiment',
    experimentId: 'exp1',
    speakerNotes: {
      timingMin: 10,
      keyPoints: [
        'Run both interfaces live on the projected screen.',
        'Show how Interface A throws cryptic SQL and format errors when you miss the ISO timestamp.',
        'Show how Interface B guides intent directly and completes in <10 seconds.',
      ],
      spokenScriptAdvice:
        'Watch what happens when I interact with System A. Notice my hesitation. Notice how many clicks it takes. Now watch System B.',
      classroomFacilitationTip:
        'Invite a volunteer student from the front row to click through System A, then System B.',
    },
  },
  {
    id: 5,
    act: 1,
    actTitle: 'ACT 1 — EXPERIENCE',
    title: 'Debrief: Why Did System A Fail?',
    subtitle: 'Both systems satisfied 100% of the functional specification.',
    type: 'debrief',
    speakerNotes: {
      timingMin: 6,
      keyPoints: [
        'System A successfully wrote to the DB when filled properly.',
        'Yet from a human perspective, System A failed.',
        'System A externalized technical complexity onto the human.',
      ],
      spokenScriptAdvice:
        'If you asked the backend engineer, they would say: "System A has zero bugs. It works!" But if the user cannot complete the task without making three errors, does the system actually work?',
      classroomFacilitationTip:
        'Highlight the difference between "The system is computationally correct" vs "The system is humanly usable".',
    },
  },
  {
    id: 6,
    act: 1,
    actTitle: 'ACT 1 — EXPERIENCE',
    title: 'The Core Distinction: Functionality vs Usability',
    subtitle: 'What a system CAN do versus HOW EFFECTIVELY humans can do it.',
    type: 'concept_model',
    speakerNotes: {
      timingMin: 8,
      keyPoints: [
        'Functionality: The actions, algorithms, and data structures available.',
        'Usability: The effectiveness, efficiency, and emotional satisfaction with which human users achieve specific goals.',
        'A system can have 10,000 features and zero usability.',
      ],
      spokenScriptAdvice:
        'Write this down in your mental notebook: Adding features increases functionality, but often reduces usability unless carefully designed.',
      classroomFacilitationTip:
        'Draw an analogy with a Swiss Army knife that has 80 blades: functionally versatile, but painful to hold.',
    },
  },
  {
    id: 7,
    act: 1,
    actTitle: 'ACT 1 — EXPERIENCE',
    title: 'The Myth of "Human Error"',
    subtitle: 'When thousands of people push a door that says PUSH, why do they pull?',
    type: 'case_study',
    speakerNotes: {
      timingMin: 7,
      keyPoints: [
        'Introduce Don Norman and "Norman Doors".',
        'Affordances: The perceived and actual properties of an object that determine how it could possibly be used.',
        'If a door has a flat brass plate, it affords pushing. If it has a pull-handle, humans pull.',
      ],
      spokenScriptAdvice:
        'When you pull a door that should be pushed, you apologize to the door. Stop apologizing! The designer gave you a visual signal to pull while installing a push latch. That is design failure, not human error.',
      classroomFacilitationTip:
        'Point to the classroom door or gesture pulling a handle.',
    },
  },
  {
    id: 8,
    act: 1,
    actTitle: 'ACT 1 — EXPERIENCE',
    title: 'The First Aha Moment',
    subtitle: 'The interaction between human and machine is itself a designable artifact.',
    type: 'summary_takeaway',
    speakerNotes: {
      timingMin: 5,
      keyPoints: [
        'Before: Students think computers are just code + hardware.',
        'After: The interaction itself is a first-class engineering problem.',
        'Transition to Act 2: Let us break down what makes up this interaction.',
      ],
      spokenScriptAdvice:
        'Now we are ready for the core definition. Not because a slide told you, but because you felt it.',
      classroomFacilitationTip:
        'Brief pause. Look around the room. Gauge if the energy has shifted from passive listening to active inquiry.',
    },
  },

  // ==========================================
  // ACT 2: UNDERSTANDING INTERACTION (Slides 9–18)
  // ==========================================
  {
    id: 9,
    act: 2,
    actTitle: 'ACT 2 — UNDERSTANDING INTERACTION',
    title: 'Deconstructing the Acronym: H · C · I',
    subtitle: 'Human · Computer · Interaction',
    type: 'concept_model',
    speakerNotes: {
      timingMin: 5,
      keyPoints: [
        'Three equal pillars.',
        'Computer Science often neglects the H.',
        'Psychology often neglects the C.',
        'HCI sits at the intersection: Computer Science + Cognitive Psychology + Design + Ergonomics.',
      ],
      spokenScriptAdvice:
        'Notice that the word "Interaction" is right in the center. Without interaction, the human is just looking at glass, and the computer is just running idle loops.',
      classroomFacilitationTip:
        'Emphasize the interdisciplinary nature of the field.',
    },
  },
  {
    id: 10,
    act: 2,
    actTitle: 'ACT 2 — UNDERSTANDING INTERACTION',
    title: 'What is the "Computer"?',
    subtitle: 'Beyond desktop monitors: Ambient, embedded, wearable, automotive, industrial.',
    type: 'visual_story',
    speakerNotes: {
      timingMin: 6,
      keyPoints: [
        'In 1980, a computer was a beige box with a CRT terminal.',
        'In 2026, a computer is a pacemaker inside a heart, an autopilot inside an Airbus, an automated fertilizer drone at UM6P farms.',
        'Every time software meets a human sensor, HCI occurs.',
      ],
      spokenScriptAdvice:
        'Look at your wristwatch, your microwave, your elevator panel. Those are computers. And their interfaces matter even more because attention is divided.',
      classroomFacilitationTip:
        'Ask students: What was the first computer you touched this morning? (Most say smartphone or alarm clock).',
    },
  },
  {
    id: 11,
    act: 2,
    actTitle: 'ACT 2 — UNDERSTANDING INTERACTION',
    title: 'What is the "Human"?',
    subtitle: 'Perception, cognitive bandwidth, motor limits, and mental models.',
    type: 'concept_model',
    speakerNotes: {
      timingMin: 7,
      keyPoints: [
        'Humans are not infinite logic processors.',
        'Visual bandwidth: We only have sharp vision in the central fovea (2 degrees!).',
        'Working memory: We can hold roughly 4 chunks of active information.',
        'Reaction time: ~200–250ms for simple visual stimulus.',
      ],
      spokenScriptAdvice:
        'You cannot patch human hardware. You cannot download RAM into a human brain. The software must adapt to human biology, not the other way around.',
      classroomFacilitationTip:
        'Remind students that human biological limits have not changed for 50,000 years.',
    },
  },
  {
    id: 12,
    act: 2,
    actTitle: 'ACT 2 — UNDERSTANDING INTERACTION',
    title: 'What is the "Interaction"?',
    subtitle: 'A continuous dialogue of translation across two fundamentally different mediums.',
    type: 'concept_model',
    speakerNotes: {
      timingMin: 6,
      keyPoints: [
        'The machine operates in binary voltage, registers, and memory addresses.',
        'The human operates in goals, feelings, visual patterns, and physical muscle gestures.',
        'Interaction is the translation bridge between human intention and machine execution.',
      ],
      spokenScriptAdvice:
        'Think of interaction as a language. When the language is natural, thoughts flow directly into actions. When the grammar is broken, you get friction.',
      classroomFacilitationTip:
        'Connect back to the translation between SQL code and travel goals.',
    },
  },
  {
    id: 13,
    act: 2,
    actTitle: 'ACT 2 — UNDERSTANDING INTERACTION',
    title: 'The Fundamental Interaction Loop',
    subtitle: 'User Intent → Action → System State → Response → Feedback → Perception',
    type: 'interactive_loop',
    speakerNotes: {
      timingMin: 8,
      keyPoints: [
        'Walk through Norman’s 7 stages of action.',
        'Show how the loop is closed: A user acts, the system updates its state, but the user only knows if the system provides feedback.',
        'If feedback is missing, the loop breaks.',
      ],
      spokenScriptAdvice:
        'Trace the loop with me. If any step is missing or delayed, the human feels anxiety. Let us see what happens when we break feedback.',
      classroomFacilitationTip:
        'Animate through the 5 steps on screen before switching to Experiment 2.',
    },
  },
  {
    id: 14,
    act: 2,
    actTitle: 'ACT 2 — UNDERSTANDING INTERACTION',
    title: 'Live Experiment: The Interaction Loop & Feedback',
    subtitle: 'Simulating the UM6P Student Bursar Payment Terminal',
    type: 'experiment',
    experimentId: 'exp2',
    speakerNotes: {
      timingMin: 10,
      keyPoints: [
        'Demonstrate Condition 1: Rich feedback (instant click state, spinner, receipt).',
        'Demonstrate Condition 2: Broken feedback (zero visual change). Show what happens when a human clicks twice.',
        'Demonstrate Condition 3: Latency delay without progress indication.',
      ],
      spokenScriptAdvice:
        'Watch what I do when Condition 2 is active. I click once. Nothing happens. What does your brain immediately tell you to do? Click again! And boom: double charge.',
      classroomFacilitationTip:
        'Ask students: How many of you have accidentally ordered twice on an e-commerce site because the button did not react?',
    },
  },
  {
    id: 15,
    act: 2,
    actTitle: 'ACT 2 — UNDERSTANDING INTERACTION',
    title: 'The Twin Gulfs: Execution & Evaluation',
    subtitle: 'Don Norman’s framework for diagnosing interaction breakdowns.',
    type: 'concept_model',
    speakerNotes: {
      timingMin: 7,
      keyPoints: [
        'Gulf of Execution: How hard is it to figure out how to do what you want? (Affordance, signifiers, mapping).',
        'Gulf of Evaluation: How hard is it to figure out what state the system is currently in? (Feedback, visibility).',
      ],
      spokenScriptAdvice:
        'Every UX bug in existence belongs to one of these two gulfs: either the user cannot figure out what to do, or they cannot figure out what just happened.',
      classroomFacilitationTip:
        'Prompt students to categorize Experiment 2: Was missing feedback a Gulf of Execution or Gulf of Evaluation? (Gulf of Evaluation).',
    },
  },
  {
    id: 16,
    act: 2,
    actTitle: 'ACT 2 — UNDERSTANDING INTERACTION',
    title: 'Clarifying the Triad: HCI vs UX vs UI',
    subtitle: 'Disciplines, scopes, and professional boundaries.',
    type: 'venn_triad',
    speakerNotes: {
      timingMin: 8,
      keyPoints: [
        'UI (User Interface): The sensory layer—colors, typography, buttons, layouts, iconography.',
        'UX (User Experience): The holistic end-to-end journey, expectations, brand trust, and emotional outcome.',
        'HCI (Human-Computer Interaction): The scientific, empirical, and academic discipline studying how humans interact with computational systems.',
      ],
      spokenScriptAdvice:
        'UI is the surface. UX is the journey. HCI is the scientific foundation that explains WHY the journey works or fails.',
      classroomFacilitationTip:
        'Draw the concentric diagram or point out the overlapping hierarchy on screen.',
    },
  },
  {
    id: 17,
    act: 2,
    actTitle: 'ACT 2 — UNDERSTANDING INTERACTION',
    title: 'Classroom Activity: Map the Triad',
    subtitle: 'Pair Discussion — 2 Minutes',
    type: 'activity_timer',
    activity: {
      type: 'PAIR DISCUSSION',
      durationSec: 120,
      question: 'Identify the Human, Computer, and Interaction in a device you used today.',
      instructions: [
        'Turn to the student next to you.',
        'Select one device (e.g. coffee machine, turnstile, elevator, university app).',
        'Identify: What was the Gulf of Execution? What was the Gulf of Evaluation?',
        'Be ready to share in 2 minutes.',
      ],
    },
    speakerNotes: {
      timingMin: 4,
      keyPoints: [
        'Give students active practice applying the theoretical terminology.',
        'Listen in to 1–2 nearby pairs during the countdown.',
      ],
      spokenScriptAdvice:
        'Two minutes on the clock. Discuss with your neighbor.',
      classroomFacilitationTip:
        'Start the 2-minute timer on screen. Walk down the aisle to listen to discussions.',
    },
  },
  {
    id: 18,
    act: 2,
    actTitle: 'ACT 2 — UNDERSTANDING INTERACTION',
    title: 'Act 2 Takeaway: Interaction is a Dialogue',
    subtitle: 'Systems do not merely execute; they communicate.',
    type: 'summary_takeaway',
    speakerNotes: {
      timingMin: 4,
      keyPoints: [
        'Summarize Act 2.',
        'Key lesson: You cannot design an interface without understanding the human on the other side.',
        'Transition to Act 3: Who is this human?',
      ],
      spokenScriptAdvice:
        'Now that we understand the interaction loop, we must ask: Who is the person operating the system? Enter Act 3.',
      classroomFacilitationTip:
        'Check time: We should be at approximately minute 45–50 of the lecture.',
    },
  },

  // ==========================================
  // ACT 3: UNDERSTANDING THE USER (Slides 19–25)
  // ==========================================
  {
    id: 19,
    act: 3,
    actTitle: 'ACT 3 — UNDERSTANDING THE USER',
    title: 'The Fallacy of the "Average User"',
    subtitle: 'Why designing for the average guarantees designing for no one.',
    type: 'case_study',
    speakerNotes: {
      timingMin: 8,
      keyPoints: [
        'Gilbert Daniels’ landmark 1950 US Air Force study.',
        'Measured 4,063 pilots across 10 physical dimensions (height, arm reach, chest, etc.).',
        'How many pilots were average on all 10 dimensions? Exactly ZERO. Even on 3 dimensions, less than 3.5%.',
        'Result: Air Force redesigned cockpits with adjustable seats and controls.',
      ],
      spokenScriptAdvice:
        'When software teams say "Let us design for the average user", they are designing for a mathematical phantom that does not exist in nature.',
      classroomFacilitationTip:
        'Ask: Who here is exactly average height, average eyesight, average typing speed, and average technical knowledge? No one.',
    },
  },
  {
    id: 20,
    act: 3,
    actTitle: 'ACT 3 — UNDERSTANDING THE USER',
    title: 'Dimensions of User Diversity',
    subtitle: 'Expertise, physical ability, language, cognitive state, and mental models.',
    type: 'concept_model',
    speakerNotes: {
      timingMin: 7,
      keyPoints: [
        'Novice vs Expert: Novices need recognition; experts need recall, speed, and keyboard shortcuts.',
        'Permanent, temporary, and situational disabilities (e.g. broken arm vs holding a baby vs driving).',
        'Mental models: What the user believes about how the system works.',
      ],
      spokenScriptAdvice:
        'A user does not interact with your actual codebase. They interact with their mental model of your codebase. If their mental model disagrees with your code, their mental model always wins.',
      classroomFacilitationTip:
        'Use the thermostat example: Turning a dial to 30°C does not heat a room faster than setting it to 21°C, yet millions do it because of their mental model.',
    },
  },
  {
    id: 21,
    act: 3,
    actTitle: 'ACT 3 — UNDERSTANDING THE USER',
    title: 'User Diversity Simulation Lab: Bad vs Good Design',
    subtitle: 'Interactive simulations across 5 human dimensions: Experience, Motor, Sensory, Cognitive, and Culture.',
    type: 'concept_model',
    speakerNotes: {
      timingMin: 9,
      keyPoints: [
        'Dimension 1 (Experience): Cryptic syntax vs Adaptive discoverability & shortcuts.',
        'Dimension 2 (Motor): Micro-targets and jitter catastrophe vs Generous targets and safety guards.',
        'Dimension 3 (Sensory): Color-only cues & glare washout vs Redundant shape/text encoding & high contrast.',
        'Dimension 4 (Cognitive): Memory recall traps under stress vs Recognition and persistent context.',
        'Dimension 5 (Culture): Fragile hardcoded LTR layout vs Resilient bi-directional localization.',
      ],
      spokenScriptAdvice:
        'Let students test each dimension. Watch how quickly an interface breaks for a real human when you assume everyone is an engineer with perfect vision, steady hands, and zero distractions.',
      classroomFacilitationTip:
        'Have students switch between the 5 diversity dimensions and trigger the stress tests to feel the human friction.',
    },
  },
  {
    id: 22,
    act: 3,
    actTitle: 'ACT 3 — UNDERSTANDING THE USER',
    title: 'The Action Hierarchy: Goals vs Tasks vs Actions',
    subtitle: 'Why engineers build for actions while humans live in goals.',
    type: 'concept_model',
    speakerNotes: {
      timingMin: 8,
      keyPoints: [
        'Goal: The high-level human state desired (e.g. "Stay connected with my family").',
        'Task: The structured sequence to achieve it (e.g. "Send photos of my graduation at UM6P").',
        'Action: The low-level physical manipulations (e.g. "Click Choose File", "Navigate to /DCIM", "Select file", "Click Upload").',
      ],
      spokenScriptAdvice:
        'Nobody wakes up in the morning thinking: "I cannot wait to click a file picker and browse directories." They want to share a memory. Every action between the user and their goal is friction.',
      classroomFacilitationTip:
        'Give another example: Goal = "Be well-rested"; Task = "Set alarm"; Action = "Scroll 24 numbers on a wheel".',
    },
  },
  {
    id: 23,
    act: 3,
    actTitle: 'ACT 3 — UNDERSTANDING THE USER',
    title: 'Why Engineers Confuse Tasks with Goals',
    subtitle: 'System architecture reflects data storage; user interaction reflects human intent.',
    type: 'visual_story',
    speakerNotes: {
      timingMin: 6,
      keyPoints: [
        'Conways Law: Organizations design systems that mirror their internal communication structure.',
        'Database engineers naturally create UI forms with 20 columns matching their SQL tables.',
        'HCI engineers invert this: Start with the human goal, hide database schema.',
      ],
      spokenScriptAdvice:
        'Look at your university or banking portals. They look like a relational database vomited onto a web browser. That is because the engineer mapped SQL columns 1:1 to input tags.',
      classroomFacilitationTip:
        'Elicit nodding from students who have built full-stack CRUD apps.',
    },
  },
  {
    id: 24,
    act: 3,
    actTitle: 'ACT 3 — UNDERSTANDING THE USER',
    title: 'Context of Use: The Missing Dimension',
    subtitle: 'Physical environment, temporal pressure, social surroundings, and distractions.',
    type: 'context_lab',
    speakerNotes: {
      timingMin: 7,
      keyPoints: [
        'An app used at a quiet desk is not the same app when used while walking through a rainstorm.',
        'Environmental factors: Glare, ambient noise, physical vibration, urgency, divided attention.',
        'This leads directly to Experiment 3: In-vehicle touchscreens.',
      ],
      spokenScriptAdvice:
        'Never evaluate an interface solely in your comfortable air-conditioned lab with a high-end mouse and fiber optic internet.',
      classroomFacilitationTip:
        'Set up the in-car experiment.',
    },
  },
  {
    id: 25,
    act: 3,
    actTitle: 'ACT 3 — UNDERSTANDING THE USER',
    title: 'Live Experiment: Context Changes Interaction',
    subtitle: 'The In-Vehicle Touchscreen Test: Desk vs Highway Night Driving vs Desert Glare',
    type: 'experiment',
    experimentId: 'exp3',
    speakerNotes: {
      timingMin: 10,
      keyPoints: [
        'Run the experiment under Desk Mode first (easy, 0 mis-taps).',
        'Switch to Night Driving Mode (road vibration, lane departure alerts, glance time limits).',
        'Show how small 20px buttons cause motor error and driver distraction.',
      ],
      spokenScriptAdvice:
        'Watch what happens when the car is moving. The vibration makes precise motor control impossible. NHTSA guidelines state eyes-off-road must not exceed 2.0 seconds.',
      classroomFacilitationTip:
        'Demonstrate how modern car touchscreens with deep menus have led to recorded increases in highway fatalities.',
    },
  },
  {
    id: 26,
    act: 3,
    actTitle: 'ACT 3 — UNDERSTANDING THE USER',
    title: 'Act 3 Axiom: You Are Not The User',
    subtitle: 'The fundamental cognitive bias of software engineering.',
    type: 'summary_takeaway',
    speakerNotes: {
      timingMin: 5,
      keyPoints: [
        'The #1 rule in HCI: You are not the user.',
        'You know how the code works; the user does not.',
        'You care about edge cases; the user cares about their goal.',
        'Transition to Act 4: Experiencing bad design firsthand.',
      ],
      spokenScriptAdvice:
        'Repeat this after me: I am not the user. The lab is not the world. If you remember nothing else from this semester, remember this axiom.',
      classroomFacilitationTip:
        'Have the room chant or repeat "I am not the user".',
    },
  },

  // ==========================================
  // ACT 4: EXPERIENCE BAD DESIGN (Slides 26–30)
  // ==========================================
  {
    id: 27,
    act: 4,
    actTitle: 'ACT 4 — EXPERIENCE BAD DESIGN',
    title: 'The Anatomy of Frustration',
    subtitle: 'Why smart people make terrible interfaces.',
    type: 'concept_model',
    speakerNotes: {
      timingMin: 5,
      keyPoints: [
        'Nobody sets out to build an unusable interface.',
        'Bad design emerges from lack of human models, organizational silos, and developer assumptions.',
        'Let us experience the most hostile design patterns in one place.',
      ],
      spokenScriptAdvice:
        'We are now entering the HCI Chamber of Horrors. I have created a live university course enrollment portal designed with realistic interaction traps.',
      classroomFacilitationTip:
        'Build anticipation before launching Experiment 4.',
    },
  },
  {
    id: 28,
    act: 4,
    actTitle: 'ACT 4 — EXPERIENCE BAD DESIGN',
    title: 'Live Challenge: The Frustrating University Portal',
    subtitle: 'Task: Enroll in CS-4010 within 45 seconds before session timeout.',
    type: 'bad_design_challenge',
    experimentId: 'exp4',
    speakerNotes: {
      timingMin: 10,
      keyPoints: [
        'Challenge a student or demonstrate live.',
        'Encounter the traps: strict CRN search, microscopic checkbox, reversed button affordance, double-negative confirmation dialog.',
        'Watch the countdown timer create genuine psychological stress.',
      ],
      spokenScriptAdvice:
        'Who wants to volunteer to enroll in our HCI course? You have 45 seconds. Go!',
      classroomFacilitationTip:
        'Let the volunteer struggle for 30 seconds. Do not help them immediately; let the whole room experience the tension.',
    },
  },
  {
    id: 29,
    act: 4,
    actTitle: 'ACT 4 — EXPERIENCE BAD DESIGN',
    title: 'Forensic Autopsy: The 6 Design Crimes',
    subtitle: 'Deconstructing what went wrong under the hood.',
    type: 'forensic_annotation',
    speakerNotes: {
      timingMin: 8,
      keyPoints: [
        'Walk through the 6 callouts: Ambiguity, Fitts’s Law violation, Reversed Affordance, Double-Negative dialog, Session loss, Machine error codes.',
        'Give each problem its formal scientific name.',
      ],
      spokenScriptAdvice:
        'Now let us do a forensic inspection. Notice how every single trap had a name in cognitive science and interaction design.',
      classroomFacilitationTip:
        'Click through the annotations on screen to reveal the explanations.',
    },
  },
  {
    id: 30,
    act: 4,
    actTitle: 'ACT 4 — EXPERIENCE BAD DESIGN',
    title: 'When Bad Interaction Kills: High-Stakes Disasters',
    subtitle: 'From minor annoyance to catastrophic human cost.',
    type: 'case_study',
    speakerNotes: {
      timingMin: 8,
      keyPoints: [
        'Three Mile Island (1979): Hidden valve indicator obscured by maintenance tag.',
        'Hawaii Ballistic Missile Alert (2018): Dropdown menu where "TEST_DRILL" was right next to "REAL_BALLISTIC_MISSILE".',
        'Boeing 737 MAX MCAS: Single sensor failure without adequate cockpit alert flight crew.',
      ],
      spokenScriptAdvice:
        'In consumer apps, bad design costs money. In healthcare, aviation, and nuclear defense, bad design costs human lives.',
      classroomFacilitationTip:
        'Show the actual screenshot of the Hawaii missile alert dropdown to show how mundane the mistake was.',
    },
  },
  {
    id: 31,
    act: 4,
    actTitle: 'ACT 4 — EXPERIENCE BAD DESIGN',
    title: 'Act 4 Takeaway: Bad Design Induces Cognitive Failure',
    subtitle: 'Human performance is a function of interface design.',
    type: 'summary_takeaway',
    speakerNotes: {
      timingMin: 4,
      keyPoints: [
        'Conclude Act 4.',
        'Never say "The user was careless". Say: "The system induced an error by violating human expectations".',
        'Transition to Act 5: How do we measure this objectively?',
      ],
      spokenScriptAdvice:
        'If we know bad design is dangerous, how do we prove one interface is better than another? We measure it scientifically.',
      classroomFacilitationTip:
        'Prepare the transition to usability metrics.',
    },
  },

  // ==========================================
  // ACT 5: MAKE USABILITY MEASURABLE (Slides 31–36)
  // ==========================================
  {
    id: 32,
    act: 5,
    actTitle: 'ACT 5 — MAKE USABILITY MEASURABLE',
    title: 'Beyond Taste: Usability as Empirical Science',
    subtitle: 'Why "I like it" is not an engineering argument.',
    type: 'concept_model',
    speakerNotes: {
      timingMin: 6,
      keyPoints: [
        'Subjective aesthetics are not sufficient.',
        'HCI evaluates systems with repeatable, verifiable, quantitative metrics.',
        'Introduce the international standard: ISO 9241-11.',
      ],
      spokenScriptAdvice:
        'When an engineer says "My database query runs in 12 milliseconds", you accept that as a measurable fact. When an HCI engineer says "Design B reduces user error by 78%", that is equally measurable.',
      classroomFacilitationTip:
        'Emphasize that students will be collecting empirical user data in their semester projects.',
    },
  },
  {
    id: 33,
    act: 5,
    actTitle: 'ACT 5 — MAKE USABILITY MEASURABLE',
    title: 'The ISO 9241-11 Usability Framework',
    subtitle: 'Effectiveness · Efficiency · Satisfaction',
    type: 'concept_model',
    speakerNotes: {
      timingMin: 8,
      keyPoints: [
        'Effectiveness: Accuracy and completeness with which users achieve specified goals (Completion rate %, Error count).',
        'Efficiency: Resources expended in relation to accuracy (Time on task, keystrokes, cognitive workload).',
        'Satisfaction: Comfort, confidence, and positive attitudes towards the use of the product.',
        'Plus Nielsen’s additions: Learnability and Memorability.',
      ],
      spokenScriptAdvice:
        'Memorize these three pillars: Effectiveness (Can you do it?), Efficiency (How fast and easy was it?), Satisfaction (How did you feel doing it?).',
      classroomFacilitationTip:
        'Show how each pillar maps directly to experimental test benches.',
    },
  },
  {
    id: 34,
    act: 5,
    actTitle: 'ACT 5 — MAKE USABILITY MEASURABLE',
    title: 'Live Experiment: The Empirical Usability Bench',
    subtitle: 'Standardized Patient Intake: Trial Alpha vs Trial Beta with Real-Time Telemetry',
    type: 'metrics_bench',
    experimentId: 'exp5',
    speakerNotes: {
      timingMin: 10,
      keyPoints: [
        'Run Trial Alpha (fragmented form) vs Trial Beta (ergonomic form).',
        'The application logs completion time, total keystrokes, clicks, and validation errors in real time.',
        'Show the comparative charts side-by-side.',
      ],
      spokenScriptAdvice:
        'Look at the data appearing live on the scoreboard. Trial Alpha took 18 seconds, 42 keystrokes, and generated 2 validation errors. Trial Beta took 6 seconds, 18 keystrokes, and 0 errors.',
      classroomFacilitationTip:
        'Demonstrate that usability improvements can be proven with $p < 0.01$ statistical significance.',
    },
  },
  {
    id: 35,
    act: 5,
    actTitle: 'ACT 5 — MAKE USABILITY MEASURABLE',
    title: 'Quantitative Data vs Qualitative Insight',
    subtitle: 'Metrics tell you WHAT happened; user observation tells you WHY it happened.',
    type: 'concept_model',
    speakerNotes: {
      timingMin: 6,
      keyPoints: [
        'Web analytics can tell you 64% of users abandon the cart on Step 3.',
        'Analytics CANNOT tell you that users abandoned because the button looked like an ad banner.',
        'That requires qualitative user testing: Think-aloud protocols, contextual inquiry, video analysis.',
      ],
      spokenScriptAdvice:
        'Numbers give you the diagnosis; observation gives you the cure.',
      classroomFacilitationTip:
        'Preview Session 3 (User Research Methods).',
    },
  },
  {
    id: 36,
    act: 5,
    actTitle: 'ACT 5 — MAKE USABILITY MEASURABLE',
    title: 'Formative vs Summative Evaluation',
    subtitle: 'Testing during creation to shape design vs testing at the end to certify quality.',
    type: 'concept_model',
    speakerNotes: {
      timingMin: 6,
      keyPoints: [
        'Formative Evaluation: Conducted with wireframes and paper prototypes during design to discover problems early.',
        'Summative Evaluation: Conducted with the finished product against benchmark standards to prove efficacy.',
      ],
      spokenScriptAdvice:
        'Cooks taste the soup while making it—that is formative. The restaurant critic tastes the soup when served—that is summative.',
      classroomFacilitationTip:
        'Reinforce the cooking analogy; it sticks in student memory.',
    },
  },
  {
    id: 37,
    act: 5,
    actTitle: 'ACT 5 — MAKE USABILITY MEASURABLE',
    title: 'Act 5 Takeaway: Usability is Optimizable Engineering',
    subtitle: 'From subjective debate to empirical validation.',
    type: 'summary_takeaway',
    speakerNotes: {
      timingMin: 4,
      keyPoints: [
        'Summarize Act 5.',
        'When you present your semester projects, you will not say "I think my design is clean". You will present task completion rates and completion times.',
        'Transition to Act 6: The overall methodology and course path.',
      ],
      spokenScriptAdvice:
        'Now we know what interaction is, who the human is, how bad design fails, and how to measure success. How do we actually build good systems?',
      classroomFacilitationTip:
        'Move to Act 6.',
    },
  },

  // ==========================================
  // ACT 6: THE HCI MINDSET (Slides 37–44)
  // ==========================================
  {
    id: 38,
    act: 6,
    actTitle: 'ACT 6 — THE HCI MINDSET',
    title: 'Human-Centered Design (HCD)',
    subtitle: 'The ISO 9241-210 Lifecycle: Understand → Specify → Design → Evaluate → Iterate',
    type: 'concept_model',
    speakerNotes: {
      timingMin: 7,
      keyPoints: [
        'The core iterative loop of modern technology development.',
        'Step 1: Understand context of use.',
        'Step 2: Specify user requirements.',
        'Step 3: Produce design solutions (prototyping).',
        'Step 4: Evaluate against requirements.',
        'Iterate until usability criteria are met.',
      ],
      spokenScriptAdvice:
        'This is not a linear waterfall. You do not design once and ship. You build low-fidelity prototypes, break them with real humans, learn, and iterate.',
      classroomFacilitationTip:
        'Trace the circular arrows on the diagram.',
    },
  },
  {
    id: 39,
    act: 6,
    actTitle: 'ACT 6 — THE HCI MINDSET',
    title: 'The Economics of Iteration: Boehm’s Curve',
    subtitle: 'Fixing an interaction flaw: $1 in discovery, $10 in design, $100 after release.',
    type: 'visual_story',
    speakerNotes: {
      timingMin: 6,
      keyPoints: [
        'Barry Boehm’s software engineering cost curve.',
        'Erasing a sketch on a whiteboard costs 10 seconds.',
        'Rewriting production code, re-architecting APIs, and retraining 5,000 employees costs millions.',
        'HCI saves money by failing fast in low-fidelity prototypes.',
      ],
      spokenScriptAdvice:
        'Prototyping is not about being artistic. Prototyping is risk mitigation. It allows you to be wrong early when being wrong is practically free.',
      classroomFacilitationTip:
        'Remind students this will save them weeks of wasted coding during their capstone projects.',
    },
  },
  {
    id: 40,
    act: 6,
    actTitle: 'ACT 6 — THE HCI MINDSET',
    title: 'The 12-Session Curriculum Architecture',
    subtitle: 'From Cognitive Biology to High-Fidelity Evaluated Prototypes.',
    type: 'course_roadmap',
    speakerNotes: {
      timingMin: 8,
      keyPoints: [
        'Present the complete 12-session master plan.',
        'Session 1: Introduction & Mental Models.',
        'Session 2: The Human (Perception, Memory, Cognition).',
        'Session 3: User Research & Contextual Inquiry.',
        'Session 4: Requirements & Personas.',
        'Session 5: Information Architecture & Mental Models.',
        'Session 6: Interaction Design & Norman Principles.',
        'Session 7: UI Design Systems & Typography.',
        'Session 8: Rapid Prototyping & Wireframing.',
        'Session 9: Usability Testing & Lab Benchmarks.',
        'Session 10: Accessibility, Inclusivity & Ethics.',
        'Session 11: Advanced Interaction & Emerging Tech.',
        'Session 12: Capstone Demonstrations & Final Exam.',
      ],
      spokenScriptAdvice:
        'Take a look at the journey ahead. Today we opened the door. In Session 2 next week, we dive deep into the human brain.',
      classroomFacilitationTip:
        'Click on nodes in the roadmap to highlight the progression.',
    },
  },
  {
    id: 41,
    act: 6,
    actTitle: 'ACT 6 — THE HCI MINDSET',
    title: 'The Semester Capstone Project',
    subtitle: 'Teams of 3–4: Identify a real problem, research, design, prototype, and test.',
    type: 'project_intro',
    speakerNotes: {
      timingMin: 7,
      keyPoints: [
        'Students will form teams of 3–4.',
        'Pick a real problem at UM6P or in Moroccan society (campus transport, agricultural telemetry, clinic triage, smart energy).',
        'Deliverables: User Research report, Figma interactive prototype, Usability Test report with video logs.',
      ],
      spokenScriptAdvice:
        'You will not just build a project to get a grade. You will solve a real human problem, test it with real users, and present empirical proof that your design works.',
      classroomFacilitationTip:
        'Encourage students to begin chatting with classmates about potential domain interests.',
    },
  },
  {
    id: 42,
    act: 6,
    actTitle: 'ACT 6 — THE HCI MINDSET',
    title: 'Classroom Experiment: Cognitive Load & Memory',
    subtitle: 'Teaser for Session 2: The 3-Second Cognitive Flash Test',
    type: 'memory_experiment',
    experimentId: 'exp6',
    speakerNotes: {
      timingMin: 8,
      keyPoints: [
        'Run the 3-second flash memory experiment.',
        'Stage 1: Flash unstructured clinical stats. Ask students what the Heart Rate was (almost no one remembers).',
        'Stage 2: Flash structured Gestalt layout. Ask again (the whole room answers).',
        'Connect directly to human cognitive bandwidth and Miller’s Law.',
      ],
      spokenScriptAdvice:
        'Look at the screen. In 3 seconds, the data will disappear. Tell me what the heart rate was.',
      classroomFacilitationTip:
        'Execute Condition A, take hands, then execute Condition B. The contrast is dramatic in a lecture hall.',
    },
  },
  {
    id: 43,
    act: 6,
    actTitle: 'ACT 6 — THE HCI MINDSET',
    title: 'Final Diagnostic Challenge: The Hospital Infusion Pump',
    subtitle: 'Pair Discussion — 3 Minutes: You are the HCI Specialist. What caused the overdose?',
    type: 'final_challenge',
    experimentId: 'final_pump',
    activity: {
      type: 'PAIR DISCUSSION',
      durationSec: 180,
      question: 'Identify the design flaws that lead to cognitive errors under high stress.',
      instructions: [
        'Examine the MED-TECH 3000 console on screen.',
        'A patient received a fatal 10x morphine overdose.',
        'Find at least 3 critical interaction design flaws in the hardware and software.',
        'Be ready to propose how you would re-engineer it.',
      ],
    },
    speakerNotes: {
      timingMin: 10,
      keyPoints: [
        'Launch the 3-minute discussion countdown.',
        'Let students analyze mode errors, decimal point suppression, missing confirmation bounds, and button proximity.',
        'Then trigger the forensic reveal.',
      ],
      spokenScriptAdvice:
        'This is not an abstract exercise. This exact failure happened in intensive care units. Identify why the nurse typed 10 instead of 1.0.',
      classroomFacilitationTip:
        'Start the 3-minute timer. Call on 2 pairs before hitting "Reveal HCI Analysis".',
    },
  },
  {
    id: 44,
    act: 6,
    actTitle: 'ACT 6 — THE HCI MINDSET',
    title: 'The Grand Takeaway of Session 1',
    subtitle: 'Three golden rules to carry throughout the semester.',
    type: 'summary_takeaway',
    speakerNotes: {
      timingMin: 5,
      keyPoints: [
        'Rule 1: You are not the user.',
        'Rule 2: Functionality is what the system does; usability is what the human achieves.',
        'Rule 3: Usability is not personal taste; it is observable, measurable, empirical science.',
      ],
      spokenScriptAdvice:
        'Take a photo of this slide or write it in your notes. Every time you design a feature, test yourself against these three rules.',
      classroomFacilitationTip:
        'Allow students 15 seconds to write down or photograph the 3 rules.',
    },
  },
  {
    id: 45,
    act: 6,
    actTitle: 'ACT 6 — THE HCI MINDSET',
    title: 'Looking Ahead: Session 2',
    subtitle: 'The Human: Perception · Attention · Memory · Cognition',
    type: 'preview_next',
    speakerNotes: {
      timingMin: 5,
      keyPoints: [
        'Preview Session 2: Deep dive into the human sensory apparatus.',
        'Readings: Chapter 1 & 2 of Don Norman’s "The Design of Everyday Things".',
        'Next week: Live optical illusions, visual search experiments, and mental model mapping.',
      ],
      spokenScriptAdvice:
        'Thank you everyone for an exceptional Session 1. Next week, we open up the human machine: how your eyes process light, how your brain filters noise, and how memory decays. See you next Monday at 09:00.',
      classroomFacilitationTip:
        'Stay at the lectern for 10 minutes after class for student questions.',
    },
  },
];
