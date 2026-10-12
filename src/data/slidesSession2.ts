import { SlideData, ActMeta } from '../types';

export const ACTS_METADATA_SESSION_2: ActMeta[] = [
  {
    id: 1,
    title: 'ACT 1 — THE HUMAN EYE: PERCEPTION & GESTALT',
    subtitle: 'Sensory Bandwidth, Foveal Vision & Pre-Attentive Processing',
    slidesRange: 'Slides 1–9',
    color: '#3b82f6',
  },
  {
    id: 2,
    title: 'ACT 2 — THE COGNITIVE ENGINE: MEMORY & ATTENTION',
    subtitle: 'Working Memory, Cognitive Load Theory & Recognition vs Recall',
    slidesRange: 'Slides 10–16',
    color: '#8b5cf6',
  },
  {
    id: 3,
    title: 'ACT 3 — THE PHYSICS OF ACTION: FITTS’S & HICK’S LAWS',
    subtitle: 'Predictive Mathematical Models of Movement & Decision Latency',
    slidesRange: 'Slides 17–24',
    color: '#E5391C',
  },
  {
    id: 4,
    title: 'ACT 4 — MENTAL MODELS & THE SYSTEM IMAGE',
    subtitle: 'The Three-Part Model, The Thermostat Paradox & Metaphors',
    slidesRange: 'Slides 25–30',
    color: '#10b981',
  },
  {
    id: 5,
    title: 'ACT 5 — INFORMATION ARCHITECTURE & WAYFINDING',
    subtitle: 'Taxonomies, Card Sorting, Progressive Disclosure & Navigation',
    slidesRange: 'Slides 31–35',
    color: '#d97736',
  },
  {
    id: 6,
    title: 'ACT 6 — 45-MIN CAPSTONE LAB & HOMEWORK LAUNCH',
    subtitle: 'Capstone Selection, 3-Point Forensic Audit & Milestone 1 Brief',
    slidesRange: 'Slides 36–42',
    color: '#059669',
  },
];

export const SLIDES_DATA_SESSION_2: SlideData[] = [
  // ==========================================
  // ACT 1: THE HUMAN EYE: PERCEPTION & GESTALT (Slides 1–9)
  // ==========================================
  {
    id: 1,
    act: 1,
    actTitle: 'ACT 1 — THE HUMAN EYE: PERCEPTION & GESTALT',
    title: 'Human-Computer Interaction',
    subtitle: 'Session 02: The Human — Cognitive, Perceptual & Motor Mechanics',
    type: 'title',
    speakerNotes: {
      timingMin: 5,
      keyPoints: [
        'Welcome students to Session 2 of Human-Computer Interaction at UM6P.',
        'Establish institutional continuity with Session 1.',
        'Session 2 objective: Open the human biological machine. Understand hardware limits that no software update can ever change.',
      ],
      spokenScriptAdvice:
        'Good morning everyone. Welcome back to Session 2 of Human-Computer Interaction. Today, we step into the biological machine: how the human eye scans in milliseconds, how memory bottlenecks thought, and how physics governs movement across glass.',
      classroomFacilitationTip:
        'Project on full screen. Remind students that today ends with a 45-minute hands-on Capstone studio where they will select their term projects.',
    },
  },
  {
    id: 2,
    act: 1,
    actTitle: 'ACT 1 — THE HUMAN EYE: PERCEPTION & GESTALT',
    title: 'The Human',
    subtitle: 'Perception · Attention · Memory · Mental Models · Cognition',
    type: 'concept_model',
    speakerNotes: {
      timingMin: 6,
      keyPoints: [
        'Direct continuity from Slide 45 of Session 1.',
        'Last week, we closed Session 1 promising to look inside the skull of the human user.',
        'Today, we deliver on that promise: mapping biological constraints before placing another button or writing code.',
      ],
      spokenScriptAdvice:
        'Notice this slide. This is the exact slide we ended Session 1 with last week. We promised that before we build another screen or debate another design choice, we would dissect the creature sitting on the other side of the glass. Today, we keep that promise.',
      classroomFacilitationTip:
        'Pause to let students recognize the continuity from the previous session’s concluding teaser.',
    },
  },
  {
    id: 3,
    act: 1,
    actTitle: 'ACT 1 — THE HUMAN EYE: PERCEPTION & GESTALT',
    title: 'Rapid Recall: Affordances & Signifiers in Action',
    subtitle: 'Two Foundational Concepts from Session 1 Applied to Everyday & Digital Artifacts',
    type: 'concept_model',
    speakerNotes: {
      timingMin: 7,
      keyPoints: [
        'Affordance (Gibson 1977, Norman 1988): What is physically possible between actor and object.',
        'Signifier (Norman 2013): Any perceivable indicator that communicates WHERE and HOW action should occur.',
        'Physical example: Flat push plate (affordance: push, signifier: flat surface says push). Pull handle on a push door = conflicting signifier (Norman door!).',
        'Digital example: Button with drop-shadow/border (signifier: clickable). Flat unstyled text with onClick handler = affordance exists in code, zero signifier in pixels.',
      ],
      spokenScriptAdvice:
        'Before we look at the brain, let us do a rapid recall of the two most important concepts from Session 1: Affordances and Signifiers. Affordance is the actual possibility of action. Signifier is the perceivable clue that tells the human what to do. If a button has no signifier, the human does not click.',
      classroomFacilitationTip:
        'Ask two students to define affordance and signifier in their own words before advancing.',
    },
  },
  {
    id: 4,
    act: 1,
    actTitle: 'ACT 1 — THE HUMAN EYE: PERCEPTION & GESTALT',
    title: 'The Model Human Processor (MHP)',
    subtitle: 'Card, Moran & Newell’s Engineering Specification of the Human',
    type: 'concept_model',
    speakerNotes: {
      timingMin: 7,
      keyPoints: [
        'In 1983, Stuart Card, Thomas Moran, and Allen Newell formulated the Model Human Processor.',
        'Three coupled subsystems: Perceptual Processor (~100ms cycle), Cognitive Processor (~70ms cycle), and Motor Processor (~70ms cycle).',
        'Total reaction time is the sum of these physical biological cycles (~240ms minimum under ideal conditions).',
      ],
      spokenScriptAdvice:
        'In computer science, you spend years learning clock cycles, bus speeds, and cache latency. Look at this diagram. This is the hardware specification of your user. You cannot overclock this processor. You cannot install more L1 cache. If your interface asks for 10 cognitive cycles per second, the human crashes.',
      classroomFacilitationTip:
        'Point to each cycle time on the slide. Emphasize that these numbers have not changed in 100,000 years of evolutionary history.',
    },
  },
  {
    id: 5,
    act: 1,
    actTitle: 'ACT 1 — THE HUMAN EYE: PERCEPTION & GESTALT',
    title: 'The Myth of Broad Vision',
    subtitle: 'The 2° Foveal Tunnel vs Peripheral Motion Detection',
    type: 'concept_model',
    speakerNotes: {
      timingMin: 6,
      keyPoints: [
        'Human vision is not a 4K camera with uniform sharpness.',
        'Fovea centralis covers only 1° to 2° of visual arc (roughly the width of your thumbnail held at arm’s length).',
        'Parafovea (2°–5°) has decaying acuity; Periphery (>5°) is nearly blind to color and fine text, optimized exclusively for detecting sudden motion.',
      ],
      spokenScriptAdvice:
        'Hold your thumb out in front of you. Look at your thumbnail. That tiny area is the only part of your visual field capable of reading text clearly right now. Everything else is a blurry prediction filled in by your brain. So when you place an error alert in the top-right corner while the user types in the center, they literally cannot see it.',
      classroomFacilitationTip:
        'Have all students hold out their thumb and look at it, then notice how words just 3 inches away become unreadable without saccades.',
    },
  },
  {
    id: 6,
    act: 1,
    actTitle: 'ACT 1 — THE HUMAN EYE: PERCEPTION & GESTALT',
    title: 'Pre-Attentive Visual Processing',
    subtitle: 'What the Visual Cortex Computes in Under 50 Milliseconds',
    type: 'visual_story',
    speakerNotes: {
      timingMin: 7,
      keyPoints: [
        'Pre-attentive attributes are processed in parallel by the visual cortex before conscious attention is engaged (under 50ms).',
        'Attributes include: Color hue, size, spatial orientation, and curvature.',
        'Text reading and semantic interpretation are serial processes requiring conscious eye saccades and cognitive cycles.',
      ],
      spokenScriptAdvice:
        'Before you even realize you are looking at a screen, your low-level visual cortex has already extracted color, size, and motion. If you use pre-attentive cues properly, users find what they need instantaneously. If you rely on paragraphs of text, you force slow, serial scanning.',
      classroomFacilitationTip:
        'Run the live visual search challenge on the slide: have students spot the red circle versus finding a specific word in an unstyled list.',
    },
  },
  {
    id: 7,
    act: 1,
    actTitle: 'ACT 1 — THE HUMAN EYE: PERCEPTION & GESTALT',
    title: 'The Gestalt Laws of Perceptual Organization',
    subtitle: 'How the Brain Automatically Assembles Visual Chaos into Structure',
    type: 'concept_model',
    speakerNotes: {
      timingMin: 8,
      keyPoints: [
        'Formulated by Wertheimer, Koffka, and Köhler in the 1920s; essential for UI layout.',
        'Law of Proximity: Objects placed near each other are perceived as a single functional unit.',
        'Law of Similarity: Objects sharing visual attributes (color, shape) are assumed to have the same role.',
        'Law of Common Region: Enclosing elements within a card or border overrides proximity.',
        'Law of Continuity & Closure: The eye follows smooth lines and fills in missing boundaries.',
      ],
      spokenScriptAdvice:
        'Your brain hates ambiguity. It is constantly grouping pixels together according to automatic geometric rules. When a form puts a label closer to the input ABOVE it than the input BELOW it, the Law of Proximity tricks the user’s brain into answering the wrong question.',
      classroomFacilitationTip:
        'Walk through each visual card on the slide. Ask students to spot where forms they use daily violate Proximity.',
    },
  },
  {
    id: 8,
    act: 1,
    actTitle: 'ACT 1 — THE HUMAN EYE: PERCEPTION & GESTALT',
    title: 'Live Experiment: The Gestalt Interactive Workbench',
    subtitle: 'Transforming Data Noise into Visual Hierarchy via Perceptual Rules',
    type: 'experiment',
    experimentId: 'exp1',
    speakerNotes: {
      timingMin: 10,
      keyPoints: [
        'Demonstrate an unorganized, high-density industrial telemetry dashboard.',
        'Toggle Proximity: Watch spacing group related sensors together.',
        'Toggle Similarity: Watch color and typography differentiate critical alerts from normal readings.',
        'Toggle Common Region: Watch container cards instantly establish visual hierarchy without adding text.',
      ],
      spokenScriptAdvice:
        'Notice that we did not change a single piece of text. We did not write a new algorithm. We only applied the biological laws of visual organization. The cognitive effort required to read this dashboard dropped by over 70%.',
      classroomFacilitationTip:
        'Toggle the Gestalt switches one by one on the projected screen and ask the room which transformation made the biggest difference.',
    },
  },
  {
    id: 9,
    act: 1,
    actTitle: 'ACT 1 — THE HUMAN EYE: PERCEPTION & GESTALT',
    title: 'Act 1 Takeaway: Visual Hierarchy is Cognitive Routing',
    subtitle: 'Layout is not decoration; it is guiding human foveal focus',
    type: 'summary_takeaway',
    speakerNotes: {
      timingMin: 4,
      keyPoints: [
        'Every screen has a visual hierarchy—either designed deliberately, or formed accidentally.',
        'If everything is bold, nothing is bold. If all buttons are blue, no button is special.',
        'Rule: Direct the fovea to the primary goal within the first 100 milliseconds.',
      ],
      spokenScriptAdvice:
        'Write this down: Graphic design is what you like to look at. Visual hierarchy in HCI is where the user is forced to look. Now, let us examine where that visual information goes: the human brain.',
      classroomFacilitationTip:
        'Brief transition pause before moving into Act 2 (Memory and Attention).',
    },
  },

  // ==========================================
  // ACT 2: THE COGNITIVE ENGINE: MEMORY & ATTENTION (Slides 10–16)
  // ==========================================
  {
    id: 10,
    act: 2,
    actTitle: 'ACT 2 — THE COGNITIVE ENGINE: MEMORY & ATTENTION',
    title: 'The Working Memory Architecture',
    subtitle: 'Baddeley’s Model: The Severe Chokepoint of Human Consciousness',
    type: 'concept_model',
    speakerNotes: {
      timingMin: 6,
      keyPoints: [
        'Alan Baddeley’s Working Memory Model (1974/2000).',
        'Central Executive allocates scarce attentional focus.',
        'Phonological Loop processes verbal/auditory tokens; decays in 1.5–2 seconds without rehearsal.',
        'Visuospatial Sketchpad handles spatial layouts and imagery.',
        'Dual-coding: Multimodal interfaces (visual + audio) can expand throughput, but conflicting text and audio cause interference.',
      ],
      spokenScriptAdvice:
        'Working memory is not a hard drive. It is volatile RAM with a battery life of roughly 2 seconds. When your interface forces a user to remember a code from Screen 1 while typing on Screen 2, you are asking their phonological loop to repeat the code under stress. That is where catastrophic data entry errors occur.',
      classroomFacilitationTip:
        'Ask students: Have you ever looked up a 6-digit SMS verification code, switched apps, and immediately forgotten the last 3 digits? That is phonological decay.',
    },
  },
  {
    id: 11,
    act: 2,
    actTitle: 'ACT 2 — THE COGNITIVE ENGINE: MEMORY & ATTENTION',
    title: 'Miller’s Law vs Cowan’s Modern Reality',
    subtitle: 'The 7±2 Myth vs The 3–4 Active Chunk Bottleneck Under Cognitive Load',
    type: 'concept_model',
    speakerNotes: {
      timingMin: 7,
      keyPoints: [
        'George Miller (1956) proposed 7±2 chunks of information in working memory.',
        'Nelson Cowan (2001) and modern neuroscience proved that without active verbal rehearsal and under stress, capacity is only 3 to 4 chunks.',
        'Chunking: Grouping individual tokens into meaningful macro-units (e.g., telephone numbers, credit cards).',
      ],
      spokenScriptAdvice:
        'For decades, developers used Miller’s "7±2" as an excuse to put 9 items in a navigation bar. But your user is not sitting in a silent laboratory. They are in a loud café, or driving a tractor, or juggling three browser tabs. Their actual working memory bandwidth is 3 or 4 chunks. Design for 4, never for 7.',
      classroomFacilitationTip:
        'Show an unchunked 12-digit number versus formatted chunks (3 groups of 4) to demonstrate how chunking converts 12 items into 3 items.',
    },
  },
  {
    id: 12,
    act: 2,
    actTitle: 'ACT 2 — THE COGNITIVE ENGINE: MEMORY & ATTENTION',
    title: 'Sweller’s Cognitive Load Theory',
    subtitle: 'Intrinsic, Germane, and Extraneous Cognitive Load',
    type: 'concept_model',
    speakerNotes: {
      timingMin: 7,
      keyPoints: [
        'John Sweller (1988) defined three types of mental load during problem solving.',
        'Intrinsic Load: The unavoidable mental effort required by the core task (e.g., calculating tax or diagnosing an irrigation pump).',
        'Germane Load: Mental effort devoted to constructing schemas and learning.',
        'Extraneous Load: Mental waste caused by poor UI, confusing navigation, deciphering bad terminology.',
        'Total Cognitive Load = Intrinsic + Germane + Extraneous. If Total > Capacity, failure occurs.',
      ],
      spokenScriptAdvice:
        'Your user has a fixed bucket of cognitive energy. As engineers, our duty is to reduce extraneous load to absolute zero so 100% of the user’s brainpower can go toward solving their actual problem.',
      classroomFacilitationTip:
        'Draw the "Cognitive Bucket" analogy on the chalkboard or point to the breakdown graphic on the slide.',
    },
  },
  {
    id: 13,
    act: 2,
    actTitle: 'ACT 2 — THE COGNITIVE ENGINE: MEMORY & ATTENTION',
    title: 'Recognition over Recall (Nielsen Heuristic #6)',
    subtitle: 'Why Remembering Nothing is the Ultimate Usability Metric',
    type: 'comparison_think',
    speakerNotes: {
      timingMin: 6,
      keyPoints: [
        'Recall requires active retrieval from long-term memory with minimal cues (high cognitive effort, error-prone).',
        'Recognition provides sensory stimuli that activate existing mental schemas (instant, effortless).',
        'Examples: Command Line Interface (CLI) requires pure recall. Graphical User Interface (GUI) and autocomplete search provide recognition cues.',
      ],
      spokenScriptAdvice:
        'Think about multiple choice questions versus a blank essay exam. Multiple choice is recognition; a blank sheet is recall. Why do people love modern search boxes? Because when you type three letters, autocomplete gives you 5 recognized candidates. Never make users remember what the computer already knows.',
      classroomFacilitationTip:
        'Ask the room: How many flags for the Linux "tar" command can you remember without Googling? That is the failure of pure recall.',
    },
  },
  {
    id: 14,
    act: 2,
    actTitle: 'ACT 2 — THE COGNITIVE ENGINE: MEMORY & ATTENTION',
    title: 'Live Experiment: The Working Memory & Chunking Test',
    subtitle: 'Empirical Classroom Benchmark: Unchunked vs Chunked Recall',
    type: 'experiment',
    experimentId: 'exp2',
    speakerNotes: {
      timingMin: 10,
      keyPoints: [
        'Run the live memory test on screen.',
        'Condition 1: Flash a 14-digit unchunked identifier for 2.5 seconds. Ask students to recall it.',
        'Condition 2: Flash a 14-digit chunked identifier (4-4-4-2 format) for 2.5 seconds.',
        'Compare student accuracy rates live to demonstrate the quantifiable power of chunking.',
      ],
      spokenScriptAdvice:
        'Let us test this right now. I will flash a code on screen for 2.5 seconds. Try to write it down. Then we will do the exact same length, but formatted with spatial chunks. Watch your own brains perform.',
      classroomFacilitationTip:
        'Execute the interactive flash widget. Have students raise hands to see the difference in accuracy.',
    },
  },
  {
    id: 15,
    act: 2,
    actTitle: 'ACT 2 — THE COGNITIVE ENGINE: MEMORY & ATTENTION',
    title: 'Change Blindness & Inattention',
    subtitle: 'Why Large Screen Changes Go Completely Unnoticed Without Motion Cues',
    type: 'visual_story',
    speakerNotes: {
      timingMin: 6,
      keyPoints: [
        'Simons & Chabris (1999): The Invisible Gorilla experiment and selective attention.',
        'If a visual change occurs during a saccade, page reload, or without a motion transient, the visual cortex fails to detect it.',
        'Software consequence: Silent form errors or background data updates that do not provide subtle motion or focus management are invisible to users.',
      ],
      spokenScriptAdvice:
        'If a user is focused on filling in an IBAN number, you can change the entire sidebar from blue to bright pink, and they will not see it. If your interface updates status silently without a subtle motion transient or aria-live announcement, it did not happen in the user’s universe.',
      classroomFacilitationTip:
        'Click the change-blindness comparison on the slide to show how easily users miss changes without motion cues.',
    },
  },
  {
    id: 16,
    act: 2,
    actTitle: 'ACT 2 — THE COGNITIVE ENGINE: MEMORY & ATTENTION',
    title: 'Act 2 Takeaway: Conserve the User’s Scarce RAM',
    subtitle: 'Every required memory token is an opportunity for catastrophic failure',
    type: 'summary_takeaway',
    speakerNotes: {
      timingMin: 4,
      keyPoints: [
        'Working memory is strictly limited to 3–4 items under real-world cognitive load.',
        'Recognition is orders of magnitude faster and safer than recall.',
        'Never force users to transcribe or carry data across screens.',
      ],
      spokenScriptAdvice:
        'Rule of thumb: Your user has 4 RAM slots. Use 1 for their goal, 1 for their current action, and leave 2 as buffer for their life. Next, we move from the brain to the hands: the physics of motor action.',
      classroomFacilitationTip:
        'Short pause before entering Act 3 (Fitts’s and Hick’s Laws).',
    },
  },

  // ==========================================
  // ACT 3: THE PHYSICS OF ACTION: FITTS’S & HICK’S LAWS (Slides 17–24)
  // ==========================================
  {
    id: 17,
    act: 3,
    actTitle: 'ACT 3 — THE PHYSICS OF ACTION: FITTS’S & HICK’S LAWS',
    title: 'Fitts’s Law: The Physics of Pointing',
    subtitle: 'Paul Fitts (1954): Movement Time as a Function of Distance and Target Size',
    type: 'concept_model',
    speakerNotes: {
      timingMin: 7,
      keyPoints: [
        'Paul Fitts (1954) established the fundamental relationship between human motor control and target acquisition.',
        'Movement Time (MT) depends on the ratio of Distance (D) to Target Width (W).',
        'Applies equally to mouse pointers, fingers on capacitive glass, stylus pens, and physical cockpit controls.',
      ],
      spokenScriptAdvice:
        'Do not design by aesthetic taste. Human motor movement is governed by physics. If a target is far away and tiny, hitting it is physically slow and prone to motor overshoot. Fitts’s Law gives us an exact mathematical equation to prove this.',
      classroomFacilitationTip:
        'Demonstrate with a finger: reaching for a large mug nearby versus threading a tiny needle far away.',
    },
  },
  {
    id: 18,
    act: 3,
    actTitle: 'ACT 3 — THE PHYSICS OF ACTION: FITTS’S & HICK’S LAWS',
    title: 'The Mathematics of Fitts’s Law',
    subtitle: 'MT = a + b · log₂(2D / W) — The Shannon Formulation',
    type: 'concept_model',
    speakerNotes: {
      timingMin: 8,
      keyPoints: [
        'Shannon formulation (MacKenzie, 1992): Index of Difficulty ID = log₂(2D / W) in bits.',
        'Movement Time: MT = a + b · ID.',
        'Empirical constants: a = start/stop baseline latency (~50–200ms); b = motor channel capacity (1/Throughput, ~100–150ms/bit).',
        'Key insight: Doubling target size has a logarithmic effect, but doubling distance has a much smaller penalty than shrinking width.',
      ],
      spokenScriptAdvice:
        'Look closely at the logarithmic term: 2D divided by W. When you cut a button size in half, the Index of Difficulty increases by a full bit. That means ~120 milliseconds of extra physical hesitation and an exponential increase in motor mis-clicks.',
      classroomFacilitationTip:
        'Walk through a numerical calculation on the board: compare a 48px touch target vs a 24px touch target at 300px distance.',
    },
  },
  {
    id: 19,
    act: 3,
    actTitle: 'ACT 3 — THE PHYSICS OF ACTION: FITTS’S & HICK’S LAWS',
    title: 'The Magic of Infinite Edges & Corners',
    subtitle: 'Why the Edges of a Screen Have an Effective Target Width (W) of Infinity',
    type: 'concept_model',
    speakerNotes: {
      timingMin: 7,
      keyPoints: [
        'On desktop screens, the physical mouse cursor cannot travel past the display boundaries.',
        'Therefore, targets docked to the edges or corners (e.g., macOS menu bar, Windows Start button) have W = ∞.',
        'Since log₂(2D / ∞) = log₂(0) → ID drops to near zero! Edges are the fastest targets on a computer screen.',
        'On mobile touchscreens, edges lack physical stops and become thumb-reach penalties instead.',
      ],
      spokenScriptAdvice:
        'Why did Apple put the application menu bar pinned to the top of the screen instead of floating inside each window? Because when you slam the mouse upward, you cannot overshoot the screen. The top edge is infinitely deep. On desktop, corners are the most valuable real estate in the universe.',
      classroomFacilitationTip:
        'Move the mouse rapidly toward the top edge on the projection to show how it stops dead without needing fine motor deceleration.',
    },
  },
  {
    id: 20,
    act: 3,
    actTitle: 'ACT 3 — THE PHYSICS OF ACTION: FITTS’S & HICK’S LAWS',
    title: 'Live Experiment: The Fitts’s Law Targeting Test',
    subtitle: 'Live Interactive Benchmark: Measure Your Own Motor Throughput (bits/sec)',
    type: 'experiment',
    experimentId: 'exp3',
    speakerNotes: {
      timingMin: 10,
      keyPoints: [
        'Run the ISO 9241-9 circular target acquisition benchmark live on screen.',
        'Students click alternating targets varying in distance (D) and width (W).',
        'Live plotting of Movement Time vs Index of Difficulty (ID).',
        'Observe the linear regression line and calculate the Throughput (TP = ID / MT).',
      ],
      spokenScriptAdvice:
        'Let us test this live. Click the targets as quickly and accurately as possible. Watch the graph plot your actual Movement Time against the Index of Difficulty. You will see Paul Fitts’s 1954 line appear in real time before your eyes.',
      classroomFacilitationTip:
        'Invite a volunteer student to the lectern mouse/touchpad to run a 10-trial test, or have students open it on their laptops.',
    },
  },
  {
    id: 21,
    act: 3,
    actTitle: 'ACT 3 — THE PHYSICS OF ACTION: FITTS’S & HICK’S LAWS',
    title: 'Hick’s Law: Decision Time & Entropy',
    subtitle: 'William Hick (1952) & Ray Hyman (1953): Reaction Time as a Function of Choices',
    type: 'concept_model',
    speakerNotes: {
      timingMin: 6,
      keyPoints: [
        'Reaction time increases logarithmically as the number of equally probable alternatives increases.',
        'Rooted in Claude Shannon’s Information Theory: entropy of choice.',
        'Applies to menus, navigation bars, dropdown options, and settings panels.',
      ],
      spokenScriptAdvice:
        'Fitts’s Law told us how long it takes your hand to reach the button. Hick’s Law tells us how long it takes your brain to decide WHICH button to press. If you offer 32 flat options in a dropdown, you guarantee choice paralysis.',
      classroomFacilitationTip:
        'Contrast a restaurant menu with 120 items vs In-N-Out Burger with 3 items.',
    },
  },
  {
    id: 22,
    act: 3,
    actTitle: 'ACT 3 — THE PHYSICS OF ACTION: FITTS’S & HICK’S LAWS',
    title: 'The Mathematics of Hick’s Law',
    subtitle: 'RT = b · log₂(n + 1) — Binary Search in the Human Mind',
    type: 'concept_model',
    speakerNotes: {
      timingMin: 7,
      keyPoints: [
        'Formula: RT = a + b · log₂(n + 1), where n is the number of alternatives.',
        'The "+ 1" accounts for the condition where no option is selected (uncertainty baseline).',
        'Constant b ≈ 150–200ms per bit of decision entropy.',
        'Crucial exception: Hick’s Law breaks down if options are unordered (forces linear search O(n)) or if the user is an expert with muscle memory.',
      ],
      spokenScriptAdvice:
        'Why is the relationship logarithmic? Because the human brain subdivides ordered categories hierarchically—like a binary search tree. But if your list is randomly ordered, binary search fails, and the user is forced into linear O(n) scanning.',
      classroomFacilitationTip:
        'Show an alphabetically sorted list of 50 countries vs a randomized list of 50 countries to prove why sorting maintains log₂(n).',
    },
  },
  {
    id: 23,
    act: 3,
    actTitle: 'ACT 3 — THE PHYSICS OF ACTION: FITTS’S & HICK’S LAWS',
    title: 'Live Experiment: The Hick’s Law Decision Arena',
    subtitle: 'Measuring Decision Latency Across 2, 4, 8, and 16 Choices',
    type: 'experiment',
    experimentId: 'exp4',
    speakerNotes: {
      timingMin: 10,
      keyPoints: [
        'Run the live decision reaction time experiment.',
        'Test conditions: 2 choices, 4 choices, 8 choices, 16 choices.',
        'Display average reaction time curves confirming the logarithmic curve in real classroom data.',
      ],
      spokenScriptAdvice:
        'Watch the reaction time counter. Notice how jumping from 2 to 4 choices adds a noticeable delay, but jumping from 8 to 16 adds a smaller incremental delay. That is the signature of logarithmic information processing.',
      classroomFacilitationTip:
        'Have the room call out the target numbers in real time as the experiment progresses.',
    },
  },
  {
    id: 24,
    act: 3,
    actTitle: 'ACT 3 — THE PHYSICS OF ACTION: FITTS’S & HICK’S LAWS',
    title: 'Act 3 Takeaway: Calculate Physics Before Drawing Pixels',
    subtitle: 'Do not debate button size or menu depth: calculate ID and bits of entropy',
    type: 'summary_takeaway',
    speakerNotes: {
      timingMin: 4,
      keyPoints: [
        'Fitts’s Law governs motor movement: make frequent targets big and close; make dangerous actions distant and tiny.',
        'Hick’s Law governs decision time: use progressive disclosure to keep n small at each decision node.',
        'Combined, these two laws allow you to mathematically predict user task completion times before writing code.',
      ],
      spokenScriptAdvice:
        'Never let a product manager tell you a button "feels too big." Pull out Fitts’s Law, show the index of difficulty in bits, and prove the motor error rate. Now, let us examine the mental models that guide these actions.',
      classroomFacilitationTip:
        'Transition pause before entering Act 4 (Mental Models).',
    },
  },

  // ==========================================
  // ACT 4: MENTAL MODELS & THE SYSTEM IMAGE (Slides 25–30)
  // ==========================================
  {
    id: 25,
    act: 4,
    actTitle: 'ACT 4 — MENTAL MODELS & THE SYSTEM IMAGE',
    title: 'Don Norman’s Three-Part Mental Model Triad',
    subtitle: 'Design Model · System Image · User Mental Model',
    type: 'concept_model',
    speakerNotes: {
      timingMin: 8,
      keyPoints: [
        'The Designer’s Model: The conceptual model the engineer has of the software architecture and database.',
        'The User’s Model: The mental model the human invents to explain how the software operates.',
        'The System Image: The physical artifact (UI, buttons, messages, manuals). This is the ONLY communication channel between designer and user.',
        'Catastrophe occurs when the System Image fails to communicate the Design Model accurately.',
      ],
      spokenScriptAdvice:
        'You cannot talk to your user. You cannot sit beside them explaining your SQL schemas. The user never sees your code. They only see the pixels, signifiers, and errors you display. That is the System Image. If the System Image is flawed, the user invents a wildly incorrect mental model.',
      classroomFacilitationTip:
        'Draw the triad on the whiteboard: Designer on the left, User on the right, and the System Image as the physical bridge in the middle.',
    },
  },
  {
    id: 26,
    act: 4,
    actTitle: 'ACT 4 — MENTAL MODELS & THE SYSTEM IMAGE',
    title: 'The Thermostat Fallacy (Kempton, 1986)',
    subtitle: 'Feedback Theory vs Valve Theory: When Users Misunderstand Everyday Systems',
    type: 'concept_model',
    speakerNotes: {
      timingMin: 7,
      keyPoints: [
        'Willett Kempton’s landmark ethnographic study of residential thermostats.',
        'The Feedback Model (How it works): The thermostat is an on/off switch with a thermometer sensor. Setting it to 30°C heats at the exact same rate as setting it to 22°C.',
        'The Valve Model (What users believe): Users treat the thermostat like an accelerator pedal, cranking it to 35°C believing it heats up "faster".',
        'Result: Overheating, wasted energy, and broken user expectations because the UI (a simple dial) signposts an accelerator valve rather than a threshold sensor.',
      ],
      spokenScriptAdvice:
        'How many of you have cranked an air conditioner down to 16°C because the room was hot, believing it would cool down faster? That is the Valve mental model. The compressor only has one speed! But because the dial looks like a gas pedal, humans naturally project a valve model onto an on/off threshold switch.',
      classroomFacilitationTip:
        'Ask how many in the room believe setting the heat to max makes the room warm up faster, then explain the feedback loop.',
    },
  },
  {
    id: 27,
    act: 4,
    actTitle: 'ACT 4 — MENTAL MODELS & THE SYSTEM IMAGE',
    title: 'Skeuomorphism vs Flat Design vs Neumorphism',
    subtitle: 'The Evolution of Digital Signifiers and Borrowed Physical Mental Models',
    type: 'comparison_think',
    speakerNotes: {
      timingMin: 7,
      keyPoints: [
        'Skeuomorphism (1984–2012): Borrowing real-world physical textures (leather stitching, wooden bookshelves, glossy glass) to scaffold digital signifiers for novice users.',
        'Flat Design (2013–2019): Stripping all physical metaphors. Risk: Removed essential signifiers (buttons looked identical to inert text, causing click confusion).',
        'Modern Intentional Design (2020+): Clean digital typography combined with subtle depth, shadows, and tactile micro-interactions that restore affordance signifiers without visual clutter.',
      ],
      spokenScriptAdvice:
        'In 2007, the iPhone needed skeuomorphism because humans had never touched glass to operate a computer. The notepad had yellow lined paper and torn margins so users instantly understood "this is for notes." Once the mental model was internalized, design swung too far into flat minimalism—and users lost their signifiers.',
      classroomFacilitationTip:
        'Show the iOS 6 Notes app vs iOS 7 Notes app to illustrate the dramatic swing in visual signifiers.',
    },
  },
  {
    id: 28,
    act: 4,
    actTitle: 'ACT 4 — MENTAL MODELS & THE SYSTEM IMAGE',
    title: 'Conceptual Metaphors: Desktop, Shopping Cart & Beyond',
    subtitle: 'How Anchoring to Pre-Existing Real-World Schemas Accelerates Onboarding',
    type: 'concept_model',
    speakerNotes: {
      timingMin: 7,
      keyPoints: [
        'Lakoff & Johnson (1980): "Metaphors We Live By".',
        'Desktop Metaphor (Xerox PARC, 1970s): Files, folders, trash cans, windows.',
        'E-commerce Metaphor: Shopping cart, checkout counter, receipt.',
        'Danger of Metaphor: Metaphors break down when digital superpowers exceed physical bounds (e.g., search vs filing cabinets, infinite undo).',
      ],
      spokenScriptAdvice:
        'When Xerox PARC invented the GUI, they needed people who had never touched a computer to understand files in memory. They named them "folders," put them on a "desktop," and created a "trash can." But remember: a metaphor is a scaffolding, not a prison. Don’t force physical limitations onto software.',
      classroomFacilitationTip:
        'Ask: Why does dragging a floppy disk icon into the Trash can eject the disk? Discuss how the metaphor became dangerous.',
    },
  },
  {
    id: 29,
    act: 4,
    actTitle: 'ACT 4 — MENTAL MODELS & THE SYSTEM IMAGE',
    title: 'Live Experiment: The Mental Model Simulator',
    subtitle: 'Diagnosing the Mismatch Between Mental Model, System Image, and Reality',
    type: 'experiment',
    experimentId: 'exp5',
    speakerNotes: {
      timingMin: 10,
      keyPoints: [
        'Interactive simulation of an automated industrial irrigation valve system at UM6P Benguerir campus.',
        'Condition 1: Broken System Image (exposes raw solenoid relay IDs; user creates false valve mental model; pump overheats).',
        'Condition 2: Aligned System Image (shows feedback loop with real-time pressure sensor and target threshold).',
      ],
      spokenScriptAdvice:
        'Watch what happens when an operator is given a valve control with delayed feedback. They over-correct, pump pressure spikes, and the system trips an emergency shutoff. When we redesign the System Image to show real-time sensor feedback, error rates drop to zero.',
      classroomFacilitationTip:
        'Run the simulation with the "Broken System Image" first, let it fail, then switch to "Aligned System Image".',
    },
  },
  {
    id: 30,
    act: 4,
    actTitle: 'ACT 4 — MENTAL MODELS & THE SYSTEM IMAGE',
    title: 'Act 4 Takeaway: Bridge the Gulf of Execution via System Images',
    subtitle: 'The user will create a mental model whether you help them or not',
    type: 'summary_takeaway',
    speakerNotes: {
      timingMin: 4,
      keyPoints: [
        'A user will ALWAYS invent a story to explain system behavior.',
        'If you provide clear, immediate, unambiguous feedback, their story matches reality.',
        'If your feedback is silent or misleading, their story becomes superstition and error.',
      ],
      spokenScriptAdvice:
        'If you give users no feedback, they will click the submit button five times, reload the page, and file a complaint. The System Image is your voice. Make sure it speaks clearly.',
      classroomFacilitationTip:
        'Transition into Act 5 (Information Architecture).',
    },
  },

  // ==========================================
  // ACT 5: INFORMATION ARCHITECTURE & WAYFINDING (Slides 31–35)
  // ==========================================
  {
    id: 31,
    act: 5,
    actTitle: 'ACT 5 — INFORMATION ARCHITECTURE & WAYFINDING',
    title: 'Information Architecture & Mental Categorization',
    subtitle: 'Richard Saul Wurman (1976): Organizing Information So Humans Can Navigate',
    type: 'concept_model',
    speakerNotes: {
      timingMin: 6,
      keyPoints: [
        'Information Architecture (IA) is the structural design of shared information environments.',
        'The LATCH framework (Wurman): Location, Alphabet, Time, Category, Hierarchy.',
        'Taxonomies vs Folksonomies: Controlled vocabularies vs user-generated tagging.',
      ],
      spokenScriptAdvice:
        'Wurman said: Information is not knowledge, and data is not information. You can have millions of rows in PostgreSQL, but if your categorization doesn’t match how humans think about their problems, the system is functionally useless.',
      classroomFacilitationTip:
        'Ask how they would organize a library: by book color? By publication date? By author? Highlight how organization depends on task.',
    },
  },
  {
    id: 32,
    act: 5,
    actTitle: 'ACT 5 — INFORMATION ARCHITECTURE & WAYFINDING',
    title: 'Card Sorting: Open vs Closed Methodologies',
    subtitle: 'The Gold Standard Empirical Method to Uncover User Mental Taxonomies',
    type: 'concept_model',
    speakerNotes: {
      timingMin: 7,
      keyPoints: [
        'Open Card Sorting: Participants group content cards into piles and label the categories themselves (generative; discovers user mental models).',
        'Closed Card Sorting: Participants sort cards into predetermined categories (evaluative; tests if existing navigation works).',
        'Quantitative analysis: Similarity matrix, dendrogram cluster analysis.',
      ],
      spokenScriptAdvice:
        'Never sit in a conference room with five engineers arguing what to name navigation tabs. Conduct a card sort. Give 30 users 50 index cards with features written on them. Let THEM cluster them. The clusters reveal their true mental models.',
      classroomFacilitationTip:
        'Show an example similarity matrix dendrogram to demonstrate how data science is applied to UI navigation.',
    },
  },
  {
    id: 33,
    act: 5,
    actTitle: 'ACT 5 — INFORMATION ARCHITECTURE & WAYFINDING',
    title: 'Progressive Disclosure: Managing Cognitive Density',
    subtitle: 'Show Only What is Necessary Now; Defer What is Needed Later',
    type: 'comparison_think',
    speakerNotes: {
      timingMin: 7,
      keyPoints: [
        'Progressive Disclosure (Jakob Nielsen): Deferring advanced features to secondary screens to avoid overwhelming novice users.',
        'Level 1: Essential frequent actions (clean, minimal, low cognitive load).',
        'Level 2: Advanced configurations revealed on demand (accordions, "Advanced Settings" modals).',
        'Applies Hick’s Law: Keeps initial decision entropy (n) small.',
      ],
      spokenScriptAdvice:
        'When an engineer designs a screen, their instinct is to put every database column on the front page. Progressive disclosure saves the user: show the 20% of functions that handle 80% of daily use. Let the remaining 80% hide behind clear signifiers.',
      classroomFacilitationTip:
        'Demonstrate with Google Search: a clean input box on the front page, while complex boolean search operators exist under Advanced Settings.',
    },
  },
  {
    id: 34,
    act: 5,
    actTitle: 'ACT 5 — INFORMATION ARCHITECTURE & WAYFINDING',
    title: 'Digital Wayfinding & Scent of Information',
    subtitle: 'Kevin Lynch & Peter Pirolli: How Humans Forage for Information Like Animals',
    type: 'concept_model',
    speakerNotes: {
      timingMin: 7,
      keyPoints: [
        'Information Foraging Theory (Pirolli & Card, 1999): Users follow "information scent" (cues that hint at target value).',
        'Wayfinding essentials (Kevin Lynch): Landmarks, Paths, Nodes, Edges, Districts.',
        'Breadcrumbs, persistent header hierarchies, and active state indicators preserve spatial orientation.',
      ],
      spokenScriptAdvice:
        'When an animal searches for food in a forest, it sniffs for cues. When a human navigates software, they sniff for information scent. If a link label is vague, the scent is lost. Breadcrumbs and strong landmarks tell the user: Where am I? Where can I go? How do I get back?',
      classroomFacilitationTip:
        'Point out breadcrumbs on large e-commerce platforms to show how they prevent lost-in-hyperspace disorientation.',
    },
  },
  {
    id: 35,
    act: 5,
    actTitle: 'ACT 5 — INFORMATION ARCHITECTURE & WAYFINDING',
    title: 'Act 5 Takeaway: Navigation Reflects User Thought',
    subtitle: 'Architecture is not a sitemap; it is the mental map of human intention',
    type: 'summary_takeaway',
    speakerNotes: {
      timingMin: 4,
      keyPoints: [
        'Organize content by user tasks, never by internal corporate department org charts.',
        'Keep Hick’s Law choice branches shallow and meaningful.',
        'Support strong information scent at every branching node.',
      ],
      spokenScriptAdvice:
        'You now have the full picture of the human machine: eyes, memory, motor physics, mental models, and spatial navigation. Now, let us apply this directly to your semester Capstone projects.',
      classroomFacilitationTip:
        'High-energy transition into Act 6: the 45-minute practical lab and Capstone project selection.',
    },
  },

  // ==========================================
  // ACT 6: 45-MIN CAPSTONE LAB & HOMEWORK LAUNCH (Slides 36–42)
  // ==========================================
  {
    id: 36,
    act: 6,
    actTitle: 'ACT 6 — 45-MIN CAPSTONE LAB & HOMEWORK LAUNCH',
    title: 'Capstone Studio: Project Selection & Team Setup',
    subtitle: 'Transitioning from Theory to Practice: 45 Minutes Dedicated In-Class Studio',
    type: 'concept_model',
    speakerNotes: {
      timingMin: 5,
      keyPoints: [
        'Launch the 45-minute hands-on Capstone studio.',
        'Teams of 3 to 4 students must choose their project domain today.',
        'Today’s goal: Claim a real-world complex system and conduct an initial 3-point forensic cognitive audit.',
      ],
      spokenScriptAdvice:
        'We now enter the practical work of Session 2. For the next 45 minutes, you will form your project teams, choose your semester Capstone challenge, and conduct an empirical cognitive and motor audit of an existing baseline tool.',
      classroomFacilitationTip:
        'Set the classroom countdown timer for 45 minutes on the presentation display.',
    },
  },
  {
    id: 37,
    act: 6,
    actTitle: 'ACT 6 — 45-MIN CAPSTONE LAB & HOMEWORK LAUNCH',
    title: 'The 4 Capstone Challenge Domains',
    subtitle: 'Select One Mission-Critical Complex Domain for Your Semester Engineering Project',
    type: 'comparison_think',
    speakerNotes: {
      timingMin: 7,
      keyPoints: [
        'Track A: Precision Agriculture & Drone Telemetry (Moroccan phosphate soil sensors, irrigation pumps, harsh sunlight conditions).',
        'Track B: Healthcare & Emergency ICU Infusion Management (High stress, audible alarms, medical dosage error prevention).',
        'Track C: Moroccan Public Services & Civic Tech (RAMED/CNSS health reimbursement, ONCF multimodal transit, low digital literacy).',
        'Track D: Developer Infrastructure & Cloud Observability (Distributed microservices, CI/CD visualizers, high data density).',
      ],
      spokenScriptAdvice:
        'Look at these four tracks. None of these are toy apps or generic todo lists. These are real, mission-critical systems where bad HCI causes financial loss, crop failure, medical accidents, or citizen frustration. Choose the track that excites your team.',
      classroomFacilitationTip:
        'Give teams 3 minutes to discuss which track aligns best with their engineering passions.',
    },
  },
  {
    id: 38,
    act: 6,
    actTitle: 'ACT 6 — 45-MIN CAPSTONE LAB & HOMEWORK LAUNCH',
    title: 'Interactive Lab Workspace: The 3-Point Audit',
    subtitle: 'Hands-on Team Diagnosis: Fitts’s Law · Gestalt Hierarchy · Cognitive Load',
    type: 'experiment',
    experimentId: 'exp6',
    speakerNotes: {
      timingMin: 12,
      keyPoints: [
        'Point 1: Fitts’s Law Bottleneck — identify the primary action, measure D and W, compute the Index of Difficulty (ID).',
        'Point 2: Gestalt Organization Failure — find where Proximity or Similarity groups unrelated fields.',
        'Point 3: Extraneous Cognitive Load — identify where the interface forces recall over recognition or fails to chunk data.',
      ],
      spokenScriptAdvice:
        'Open the audit tool on your screen. Pick the baseline competitor or existing tool your team wants to revolutionize. Fill in the three diagnostic cards. Be rigorous: cite exact formulas and perceptual laws.',
      classroomFacilitationTip:
        'Walk through the aisles to look at student laptop screens and assist teams with their Fitts’s Law calculations.',
    },
  },
  {
    id: 39,
    act: 6,
    actTitle: 'ACT 6 — 45-MIN CAPSTONE LAB & HOMEWORK LAUNCH',
    title: 'Homework Milestone 1 Specification',
    subtitle: 'Capstone Milestone 1: Cognitive, Motor & Mental Model Architecture Audit',
    type: 'concept_model',
    speakerNotes: {
      timingMin: 6,
      keyPoints: [
        'Deliverable: 4-page PDF or interactive Figma/deck report.',
        'Section 1: The Three-Part Model Mapping (User’s Mental Model vs System Reality vs Broken System Image).',
        'Section 2: Predictive Motor Analysis (Fitts’s Law ID calculation & Hick’s Law progressive disclosure plan).',
        'Section 3: Gestalt Hierarchy & Visual Deconstruction (Annotated screenshots & wireframe fix).',
        'Section 4: Working Memory & Cognitive Load Assessment (Chunking masks & recognition audit).',
        'Due date: In 1 week, prior to Session 3.',
      ],
      spokenScriptAdvice:
        'Your homework assignment for Milestone 1 is directly based on what we covered today. You will take the project you claimed in today’s lab and conduct a rigorous, professional cognitive audit of the existing baseline system.',
      classroomFacilitationTip:
        'Display the assignment checklist clearly. Confirm all students have downloaded or bookmarked the rubric.',
    },
  },
  {
    id: 40,
    act: 6,
    actTitle: 'ACT 6 — 45-MIN CAPSTONE LAB & HOMEWORK LAUNCH',
    title: 'Milestone 1 Grading Rubric (20 Points Total)',
    subtitle: 'Objective Evaluation Criteria for Milestone 1 Submission',
    type: 'concept_model',
    speakerNotes: {
      timingMin: 5,
      keyPoints: [
        '5 Points: Mental Model vs System Model Mapping (Distinguishes user intent from backend architecture).',
        '5 Points: Fitts’s & Hick’s Law Calculations (Real coordinate measurements, ID bits, and choice branching rationale).',
        '5 Points: Gestalt Deconstruction & Wireframe Fix (Names specific laws, wireframe actually resolves perceptual clustering).',
        '5 Points: Cognitive Load & Chunking Inventory (Concrete input masks and recognition-over-recall solutions).',
      ],
      spokenScriptAdvice:
        'Notice how this rubric is structured: it is 100% objective. We are not grading whether we like your colors. We are grading whether your Fitts’s Law math is correct, whether your Gestalt wireframes fix proximity flaws, and whether your mental model analysis exposes architectural mismatches.',
      classroomFacilitationTip:
        'Walk through the 4 grading categories. Reiterate that submissions are due before Session 3 starts.',
    },
  },
  {
    id: 41,
    act: 6,
    actTitle: 'ACT 6 — 45-MIN CAPSTONE LAB & HOMEWORK LAUNCH',
    title: 'The Three Golden Axioms of Session 2',
    subtitle: 'Carry these principles into every UI wireframe and user testing protocol',
    type: 'summary_takeaway',
    speakerNotes: {
      timingMin: 5,
      keyPoints: [
        'Axiom 1: You Cannot Overclock the Biology (τp ≈ 100ms, τc ≈ 70ms, τm ≈ 70ms, 4 chunks max).',
        'Axiom 2: Physics Dictates Pixels (Fitts & Hick mathematically predict motor and cognitive latency).',
        'Axiom 3: The System Image is the Only Truth (Users never see your code; their mental model is built solely on the cues you project).',
      ],
      spokenScriptAdvice:
        'As we conclude Session 2, remember these three axioms. Never blame a user for a biological limit. Compute the physics before drawing pixels. And remember that the System Image is the only window into your engineering architecture.',
      classroomFacilitationTip:
        'Recite each axiom clearly and have students note them down.',
    },
  },
  {
    id: 42,
    act: 6,
    actTitle: 'ACT 6 — 45-MIN CAPSTONE LAB & HOMEWORK LAUNCH',
    title: 'Looking Ahead to Session 3',
    subtitle: 'From Cognitive Theory to the Field: User Research & Contextual Inquiry',
    type: 'preview_next',
    speakerNotes: {
      timingMin: 4,
      keyPoints: [
        'Preview Session 3: User Research, Ethnography, and Contextual Inquiry.',
        'We will learn how to step out of the building, observe real humans in their native environments, and conduct think-aloud protocols.',
        'Teams will use their Milestone 1 cognitive audit as the foundation for their field interviews.',
      ],
      spokenScriptAdvice:
        'Congratulations on completing Session 2. Today, we mapped the biology, memory, motor physics, and mental models of the human user. Next week in Session 3, we leave the lab and enter the real world: how to conduct ethnographic contextual inquiry, master-apprentice interviews, and thematic synthesis. Have a productive week with Milestone 1!',
      classroomFacilitationTip:
        'Stay at the lectern for 10 minutes after class to answer questions about Capstone team formations and project topics.',
    },
  },
];
