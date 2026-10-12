import { ActMeta, ActId, SlideType } from '../types';
import type { Content, Slide2 } from './session2Types';

/**
 * SESSION 2 — The Human (4 hours = 240 minutes).
 *
 * Every idea follows the same path: concept (what it says, in plain words) -> demo (feel it) ->
 * practice (what designers do with it). Language is deliberately plain: a term is only used when it is
 * needed and is explained on the same slide.
 *
 * Slides are pure data. Layouts live in components/session2/layouts.tsx and live demos in
 * components/experiments/session2/. Typography follows the validated design standard.
 * Slide ids are assigned from the order below; act ranges are computed.
 */

const ACTS_BASE: ActMeta[] = [
  {
    id: 1,
    title: 'ACT 1 · PERCEPTION',
    subtitle: 'How people take in what is on a screen',
    slidesRange: '',
    color: '#3b82f6',
  },
  {
    id: 2,
    title: 'ACT 2 · MEMORY & ATTENTION',
    subtitle: 'What people can hold in mind, and what they miss',
    slidesRange: '',
    color: '#8b5cf6',
  },
  {
    id: 3,
    title: 'ACT 3 · POINTING & CHOOSING',
    subtitle: 'How long it takes to hit a target and to choose',
    slidesRange: '',
    color: '#E5391C',
  },
  {
    id: 4,
    title: 'ACT 4 · MENTAL MODELS',
    subtitle: 'What the user thinks the system does',
    slidesRange: '',
    color: '#10b981',
  },
  {
    id: 5,
    title: 'ACT 5 · YOUR COURSE PROJECT',
    subtitle: 'Choose a broken interface and start auditing it',
    slidesRange: '',
    color: '#d97736',
  },
  {
    id: 6,
    title: 'ACT 6 · EXAMPLE, HOMEWORK & CLOSE',
    subtitle: 'A full class audit, what to hand in, what to remember',
    slidesRange: '',
    color: '#059669',
  },
];

const ACT_LABEL: Record<ActId, string> = Object.fromEntries(ACTS_BASE.map((a) => [a.id, a.title])) as Record<
  ActId,
  string
>;

interface Notes {
  /** minutes */
  t: number;
  points: string[];
  script: string;
  tip: string;
}

const slide = (
  act: ActId,
  type: SlideType,
  content: Content,
  n: Notes,
  experimentId?: Slide2['experimentId'],
): Slide2 => {
  const h =
    'heading' in content
      ? content.heading
      : content.kind === 'hero'
        ? { title: content.title, subtitle: content.subtitle }
        : content.kind === 'divider'
          ? { title: content.title, subtitle: content.question }
          : { title: '', subtitle: '' };
  return {
    id: 0, // assigned below from the slide order
    act,
    actTitle: ACT_LABEL[act],
    title: h.title,
    subtitle: h.subtitle,
    type,
    experimentId,
    speakerNotes: {
      timingMin: n.t,
      keyPoints: n.points,
      spokenScriptAdvice: n.script,
      classroomFacilitationTip: n.tip,
    },
    content,
  };
};

const RAW_SLIDES: Slide2[] = [
  // ========================================================================
  // ACT 1 · PERCEPTION (66 min, includes the 12-minute opening)
  // ========================================================================
  slide(
    1,
    'title',
    {
      kind: 'hero',
      sessionLabel: 'SESSION 02',
      pill: 'Master Course · Human-Centered Systems',
      title: 'The Human',
      subtitle: 'Perception · Attention · Memory · Mental Models · Cognition',
      cta: 'Begin Session 2',
    },
    {
      t: 2,
      points: [
        'This is the Session 1 teaser made real: “The Human”.',
        'Session 1 asked why interfaces fail. Session 2 explains it with how people really see, remember, move and think.',
        'Today ends with a studio: pairs pick one of 10 broken interfaces and audit it.',
      ],
      script:
        'Last week you felt bad design. Today we learn why it feels bad: how people see, remember, point and understand. At the end you pick a broken interface and put today’s ideas to work.',
      tip: 'Start on time. Mention that the last part of the session is theirs.',
    },
  ),
  slide(
    1,
    'question',
    {
      kind: 'quiz',
      heading: {
        title: 'Session 1 Recall: Part 1',
        subtitle: 'Affordances, signifiers and the Norman door',
        badge: { icon: 'brain', label: 'Retrieval practice', value: '4 minutes' },
      },
      items: [
        {
          q: 'What is an affordance?',
          a: 'What an object **allows** you to do, given its physical properties. A flat plate affords pushing; a knob affords turning.',
        },
        {
          q: 'What is a signifier? How does it differ?',
          a: 'A **cue that tells you** where and how to act: the word “PUSH”, a shadow under a button. The affordance is possible; the signifier makes it **visible**.',
        },
        {
          q: 'Why does a Norman door fail?',
          a: 'Its signifier **contradicts** its affordance: a pull handle on a push door. People blame themselves, but the **design** caused the error.',
        },
      ],
    },
    {
      t: 4,
      points: [
        'Affordance (Gibson, Norman): what the object allows. Signifier (Norman, 2013): the visible cue that communicates it.',
        'These two words, plus the gulfs and feedback on the next slide, come back in every session: make sure the whole room owns them.',
        'The Norman door is the shortest example of design-caused error: the person is not the problem.',
      ],
      script:
        'Thirty seconds alone, no phones. Then agree with your neighbour. These ideas are the vocabulary of the whole course: if affordance and signifier are fuzzy, everything today will be fuzzy.',
      tip: 'Cold-call pairs. Ask for a real door they have struggled with, then reveal the answer.',
    },
  ),
  slide(
    1,
    'question',
    {
      kind: 'quiz',
      heading: {
        title: 'Session 1 Recall: Part 2',
        subtitle: 'Gulfs, feedback, usability and the user',
        badge: { icon: 'brain', label: 'Retrieval practice', value: '4 minutes' },
      },
      items: [
        {
          q: 'What are the two gulfs, and what closes each?',
          a: '**Execution** (how do I do it?) is closed by signifiers. **Evaluation** (what happened?) is closed by **feedback**.',
        },
        {
          q: 'ISO 9241-11: which three components define usability?',
          a: '**Effectiveness**, **efficiency** and **satisfaction**, for a given user and context.',
        },
        {
          q: 'What does “You are not the user” mean?',
          a: 'You know the system; users bring different goals, abilities and **context**. So **observe and measure** users, never assume.',
        },
      ],
    },
    {
      t: 4,
      points: [
        'Execution: can I figure out how to act? Evaluation: can I tell what happened? Feedback is the signifier of the result.',
        'ISO 9241-11 frames usability as effectiveness, efficiency and satisfaction for specified users, goals and context.',
        'Today gives numbers and rules to these ideas: how fast people see, remember and move.',
      ],
      script:
        'Second round. The gulf of evaluation is the one we under-design: a button that works but shows nothing leaves the user guessing. Today we see how long that guessing takes.',
      tip: 'Link each answer forward: gulf of execution to pointing and choosing, gulf of evaluation to feedback speed.',
    },
  ),
  slide(
    1,
    'course_roadmap',
    {
      kind: 'agenda',
      heading: { title: 'What You Will Be Able to Do', subtitle: 'By the end of today' },
      outcomes: [
        { icon: 'eye', title: 'Explain', text: 'Say why a screen is hard to read, to remember, or to use.' },
        { icon: 'gauge', title: 'Predict', text: 'Judge which of two designs people will find faster and easier.' },
        { icon: 'users', title: 'Apply', text: 'Audit a real broken interface with your partner and start fixing it.' },
      ],
      note: 'Today builds on four Session 1 ideas: affordance, signifier, the gulfs and feedback.',
    },
    {
      t: 2,
      points: [
        'Three verbs: explain, predict, apply.',
        'Everything today ends in a practical rule you can use on your own project.',
        'The last part of the session is yours: pairs choose a broken interface and audit it.',
      ],
      script:
        'Three outcomes. By the end you will explain, predict and apply. Everything we do sits on the four ideas you just recalled.',
      tip: 'Keep this slide short: the outcomes matter more than any agenda.',
    },
  ),
  slide(
    1,
    'concept_model',
    {
      kind: 'divider',
      actNumber: 1,
      title: 'Perception',
      question: 'How do people take in what is on a screen?',
      learn: [
        'How quickly a person reacts: about a quarter of a second',
        'What the eye sees sharply, and what jumps out',
        'How your layout decides where people look first',
      ],
    },
    {
      t: 1,
      points: ['Announce the act: perception comes first because nothing else happens until a person has noticed something.'],
      script: 'First question of the day: how do people take in a screen at all?',
      tip: 'Pause for a breath: dividers mark the switch of topic.',
    },
  ),
  slide(
    1,
    'concept_model',
    {
      kind: 'flow',
      heading: {
        title: 'The Human as a Processor',
        subtitle: 'Everything you do on a screen passes three stages',
        badge: { icon: 'activity', label: 'Total loop', value: '≈ 240 ms' },
      },
      flowTitle: 'Perceive, Decide, Act',
      flowHint: 'Click a stage to see what it means for design',
      nodes: [
        {
          tag: 'STAGE 01',
          chip: '≈ 100 ms',
          name: 'Perceive',
          blurb: 'Eyes and ears capture the signal',
          arrow: 'Signal',
          detailTitle: 'Can the user even notice it?',
          detailRange: 'Studied in Act 1',
          detail: 'A cue that is too small, too faint or outside the sharp centre of vision never reaches the next stage.',
        },
        {
          tag: 'STAGE 02',
          chip: '≈ 70 ms',
          name: 'Decide',
          blurb: 'Memory and attention pick a response',
          arrow: 'Choice',
          detailTitle: 'How hard is the choice?',
          detailRange: 'Acts 2 and 3',
          detail: 'Many options, unfamiliar patterns or a full memory slow this stage down.',
        },
        {
          tag: 'STAGE 03',
          chip: '≈ 70 ms',
          name: 'Act',
          blurb: 'The hand carries out the move',
          detailTitle: 'How far and how big is the target?',
          detailRange: 'Act 3',
          detail: 'Movement time depends on how far the target is and how big it is.',
        },
      ],
      source: 'SOURCE: Card, Moran & Newell (1983) · middle estimates',
      sourceNote: 'A button turns red: perceive, decide, click',
    },
    {
      t: 4,
      points: [
        'Treat the person as a system with three stages: perceive, decide, act.',
        'Middle estimates: about 100 + 70 + 70 = 240 ms for one loop. These are ranges: stress, fatigue and practice move them.',
        'This slide is also the map of the session: Act 1 perceiving, Acts 2 and 3 deciding and acting, Act 4 the picture the decision runs on.',
      ],
      script:
        'Every click you will ever design starts with a person who perceives something, decides what it means, then moves. Each stage has a cost and can fail. That is our map for today. Next, we measure the loop on a real person.',
      tip: 'Click each stage and ask: what would break this stage in a hospital ward or on a sunny farm?',
    },
  ),
  slide(
    1,
    'experiment',
    {
      kind: 'custom',
      heading: {
        title: 'Demo: Your Reaction Time',
        subtitle: 'Measure the loop on a volunteer',
        badge: { icon: 'flask', label: 'Live demo', value: 'Volunteer-run' },
      },
      component: 'ReactionDemo',
    },
    {
      t: 4,
      points: [
        'Simple mode: click the moment the circle turns green. Expect a time near the loop total plus some device lag.',
        'Choice mode: the volunteer must decide which colour it is. Expect a slower time.',
        'Aha: the extra time is the decide stage doing real work. Nothing else changed.',
      ],
      script:
        'Before we start: how long do you think it takes you to react to a green light? Now let us measure. Then we add one thing: a choice. Watch what happens to the number.',
      tip: 'Ask 2 or 3 volunteers per mode; the class predicts first. Compare modes, not absolute values: the browser adds lag.',
    },
    'exp6',
  ),
  slide(
    1,
    'visual_story',
    {
      kind: 'stats',
      heading: {
        title: 'How Long Is Too Long?',
        subtitle: 'Three time limits for any screen',
        badge: { icon: 'clock', label: 'Rule of thumb', value: '0.1 · 1 · 10 s' },
      },
      stats: [
        { value: '0.1', unit: 's', label: 'Feels instant', text: 'The user sees cause and effect as **one event**.', tone: 'good' },
        { value: '1', unit: 's', label: 'Still feels smooth', text: 'The delay is noticed, but the user keeps their **train of thought**.', tone: 'warn' },
        { value: '10', unit: 's', label: 'People give up', text: 'The user **switches away**. Show progress, or let them do something else meanwhile.', tone: 'accent' },
      ],
      note: 'Give feedback within 0.1 second so the screen feels instant.',
    },
    {
      t: 3,
      points: [
        'The three limits go back to Miller (1968) and were popularised by Nielsen.',
        'Aha from the demo: the reaction time you just measured is the floor under every one of these limits.',
        'Ask: where in your daily apps do you hit the 10-second limit?',
      ],
      script:
        'Three numbers to remember: a tenth of a second feels instant, a second keeps your thinking intact, ten seconds is where you give up and open another tab.',
      tip: 'Quick poll by show of hands: who has abandoned a page that took too long?',
    },
  ),
  slide(
    1,
    'visual_story',
    {
      kind: 'custom',
      heading: {
        title: 'The Sharp Centre of Your Vision',
        subtitle: 'Only a thumbnail-sized spot is sharp',
        badge: { icon: 'eye', label: 'Sharp vision', value: 'Thumbnail-sized' },
      },
      component: 'FovealVision',
    },
    {
      t: 4,
      points: [
        'Only about 2° of the visual field is sharp, roughly a thumbnail at arm’s length (the fovea).',
        'The eye jumps about three times a second and sees almost nothing during each jump.',
        'The edges of vision detect motion and colour but cannot read.',
      ],
      script:
        'You feel like you see the whole screen. You do not. Hold your thumb at arm’s length: that is your sharp window. Everything else is a rough sketch your brain fills in.',
      tip: 'Have the whole room do the thumbnail test, then move the buttons so they see what the edges of vision lose.',
    },
  ),
  slide(
    1,
    'concept_model',
    {
      kind: 'compare',
      heading: {
        title: 'What Jumps Out',
        subtitle: 'Some things are seen instantly, others must be searched',
        badge: { icon: 'zap', label: 'Speed', value: '≈ 0.2 s' },
      },
      left: {
        tone: 'neutral',
        title: 'Searching',
        visual: 'serialScan',
        tag: 'One item at a time',
        body: 'You look at items **one by one** until you find the target. More items take more time.',
        example: '**Example:** finding one word in a paragraph.',
        footer: 'Slow and tiring',
      },
      right: {
        tone: 'accent',
        title: 'Jumping out',
        visual: 'popOut',
        tag: 'Seen instantly',
        body: 'Some differences are noticed **across the whole screen at once**: this is called pre-attentive.',
        example: '**What jumps out:** colour, size, direction, motion.',
        footer: 'Fast and automatic',
      },
      takeaway: 'Use one strong difference for what matters most: a red error, an unread badge.',
    },
    {
      t: 3,
      points: [
        'Pre-attentive features are detected across the whole visual field in about 200 ms, before attention is directed (Treisman).',
        'Everything else needs searching: one item after another.',
        'Design consequence: one strong feature can route attention without the user choosing to look. Next, see it for yourselves.',
      ],
      script:
        'There are two ways the eye finds things. One is like reading: item by item. The other is like a red dot on a grey wall: it just appears. Some differences get the second treatment for free. Let us test which is which.',
      tip: 'Ask: which of your phone’s notifications grabs you without you choosing to look, and why?',
    },
  ),
  slide(
    1,
    'concept_model',
    {
      kind: 'custom',
      heading: {
        title: 'Demo: Find the Red Circle',
        subtitle: 'One difference against two differences',
        badge: { icon: 'flask', label: 'Live demo', value: 'Class experiment' },
      },
      component: 'PreAttentiveSearch',
    },
    {
      t: 4,
      points: [
        'Before clicking, ask the class to predict: will 120 items be slower than 20 on the left? On the right?',
        'Raise a hand the moment you see the red circle; compare left and right at 20, then at 120.',
        'Leave the interpretation for the next slide: first let them feel the difference.',
      ],
      script:
        'Find the red circle as fast as you can. Raise your hand as soon as you see it. Left first, then right. Now more circles. Notice which side slows down.',
      tip: 'Use the New round button to repeat with a different position so nobody can anticipate.',
    },
  ),
  slide(
    1,
    'concept_model',
    {
      kind: 'rules',
      heading: { title: 'What the Demo Showed', subtitle: 'Jumping out is free; searching is not' },
      rules: [
        {
          title: 'One difference jumps out',
          text: 'A red circle among grey ones is found at once, **however many** circles there are.',
          evidence: 'Time stays the same',
        },
        {
          title: 'Two differences do not',
          text: 'Red **and** round among red squares and grey circles: you search **one by one**.',
          evidence: 'Time grows with items',
        },
        {
          title: 'Jumping out is limited',
          text: 'If **everything** is highlighted, nothing jumps out. Use it for one thing per screen.',
          evidence: 'One highlight per screen',
        },
      ],
      takeaway: 'Colour, size or motion can steer attention: decide which one element deserves it.',
    },
    {
      t: 2,
      points: [
        'Result: one-difference search is flat across the number of items; two-difference search grows with it.',
        'The practical rule is scarcity: one highlight per screen. Red everywhere means red nowhere.',
        'Ask students for a screen they use where everything is highlighted.',
      ],
      script:
        'Left: no matter how many grey circles, the red one jumped out. Right: you were searching. That difference is a budget. Spend it on one thing.',
      tip: 'Show the demo slide again for 10 seconds if someone disputes the result: it is faster than arguing.',
    },
  ),
  slide(
    1,
    'concept_model',
    {
      kind: 'custom',
      heading: {
        title: 'Gestalt: How We Group Things',
        subtitle: 'Close, alike or boxed together looks like one group',
      },
      component: 'GestaltCards1',
    },
    {
      t: 3,
      points: [
        'Gestalt is German for “shape” or “whole”: the brain groups elements automatically, before conscious thought.',
        'Closeness: near things belong together. Likeness: alike things belong together. Same region: things in a box belong together.',
        'Grouping is cheaper than labels: space and regions cost no reading.',
      ],
      script:
        'Nobody taught you to see three clusters here. Your visual system does it for free. Our job as designers is to use that free grouping on purpose, not by accident.',
      tip: 'Ask where they have seen each in the apps open on their laptops right now.',
    },
  ),
  slide(
    1,
    'concept_model',
    {
      kind: 'custom',
      heading: {
        title: 'Gestalt: How We Complete Things',
        subtitle: 'We follow lines, fill gaps and split object from background',
      },
      component: 'GestaltCards2',
    },
    {
      t: 2,
      points: [
        'Continuity: the eye follows smooth paths. Closure: we complete incomplete shapes. Figure-ground: we split a scene into object and background.',
        'UI uses: progress lines, loading placeholders, modals over dimmed backdrops.',
      ],
      script:
        'Three more habits of the brain, all about filling in what is missing. A dimmed backdrop works because we instantly separate the object from the ground.',
      tip: 'Keep this brisk: the demo that follows is where the ideas become concrete.',
    },
  ),
  slide(
    1,
    'experiment',
    {
      kind: 'custom',
      heading: {
        title: 'Demo: From Noise to Structure',
        subtitle: 'One form, four grouping moves',
        badge: { icon: 'flask', label: 'Live demo', value: 'Presenter-run' },
      },
      component: 'GestaltWorkbenchDemo',
    },
    {
      t: 4,
      points: [
        'Step through the form: raw, closeness, same region, likeness, ranking.',
        'Before each step ask: what will the eye see now? Then click.',
        'Point out the groups the eye sees going from 1 to 3 without adding a single word.',
      ],
      script:
        'Same nine fields. Same words. Watch what happens when we change only spacing, then boxes, then colour. No new information, yet the form becomes readable.',
      tip: 'Pause after each click and ask a student which grouping habit just changed the form.',
    },
    'exp1',
  ),
  slide(
    1,
    'concept_model',
    {
      kind: 'rules',
      heading: { title: 'Gestalt in Practice', subtitle: 'Three habits for every screen' },
      rules: [
        {
          title: 'Group with space first',
          text: 'Put related things close together and leave a clear gap between groups.',
          evidence: 'Closer = same group',
        },
        {
          title: 'Same job, same look',
          text: 'Buttons, links and labels that do the same thing should look the same everywhere.',
          evidence: 'Alike = same job',
        },
        {
          title: 'Box only if needed',
          text: 'Add a border or card only when space alone does not make the groups clear.',
          evidence: 'Boxes are a last resort',
        },
      ],
      takeaway: 'Show the structure with space and style, so people do not have to read to see it.',
    },
    {
      t: 2,
      points: [
        'This is the practical result of the demo: the form was fixed with spacing, regions and consistent styles, not with extra text.',
        'Reusable checklist for the studio: are related things close? Do alike things look alike?',
      ],
      script:
        'Three habits you can apply to any screen starting tonight. Notice that none of them needs a single extra word.',
      tip: 'Ask one student to name a screen where a group looks ungrouped.',
    },
  ),
  slide(
    1,
    'comparison_think',
    {
      kind: 'compare',
      heading: {
        title: 'Layout Steers Attention',
        subtitle: 'Where the eye lands first is a design choice',
        badge: { icon: 'route', label: 'Scan path', value: 'Rank to steer' },
      },
      left: {
        tone: 'warn',
        title: 'No ranking',
        visual: 'wireFlat',
        tag: 'Everything equal',
        body: 'Every element looks equally important. The eye has **no starting point** and wanders.',
        example: '**Result:** first looks land anywhere; the main action can be missed.',
        footer: 'Attention is spread',
      },
      right: {
        tone: 'good',
        title: 'Clear ranking',
        visual: 'wireRanked',
        tag: 'One starting point',
        body: 'Size, contrast and position rank the elements. The eye **starts at the most important** one.',
        example: '**Result:** a clear path; the main action is seen first.',
        footer: 'Attention is steered',
      },
      takeaway: 'The sharp spot, what jumps out and grouping work together: your layout decides what is seen first.',
    },
    {
      t: 4,
      points: [
        'The whole Perception act converges here: the sharp spot is tiny, some things pull it, grouping tells it what belongs together. Layout orchestrates all three.',
        'A ranking gives the eye an entry point and a path.',
        'Ask the class what they would look at first on a page with no ranking. Then test it on them.',
      ],
      script:
        'Put the three ideas together. The sharp window is tiny. Some things pull it. Groups tell it what belongs together. The layout is the director: it decides where that window goes first, second and third. Let us test it on you.',
      tip: 'Do not reveal the outcome. Ask for a hand-raise prediction: which layout will concentrate first looks more?',
    },
  ),
  slide(
    1,
    'experiment',
    {
      kind: 'custom',
      heading: {
        title: 'Demo: Where Do You Look First?',
        subtitle: 'Same content, two layouts, five seconds each',
        badge: { icon: 'flask', label: 'Live demo', value: 'Class experiment' },
      },
      component: 'LayoutRoutingDemo',
    },
    {
      t: 5,
      points: [
        'Show Layout A for 5 seconds. Students silently note the first element they looked at.',
        'Tap the votes per region, then repeat with Layout B.',
        'Compare the most-chosen share: a higher share means a stronger starting point.',
      ],
      script:
        'Five seconds. Do not decide in advance. Just look at the page and remember the first thing your eyes went to. Now vote: who looked at the logo first? The menu? The headline?',
      tip: 'Ask students to commit mentally before voting. If the room splits evenly on A and concentrates on B, point at the layout, not the students.',
    },
  ),
  slide(
    1,
    'concept_model',
    {
      kind: 'table',
      heading: { title: 'Five Ways to Rank What People See', subtitle: 'Visual hierarchy: what is seen first, second, third' },
      heads: ['TOOL', 'EFFECT', 'HOW IT STEERS THE EYE'],
      rows: [
        { a: 'Size', b: 'Big first', c: 'The largest element is seen first: headline before body text.' },
        { a: 'Contrast & colour', b: 'Jumps out', c: 'A distinct colour or strong contrast attracts the eye (one per screen).' },
        { a: 'Position', b: 'Start point', c: 'Scanning starts top-left in left-to-right scripts and top-right in Arabic.' },
        { a: 'Space', b: 'Groups', c: 'Whitespace separates groups and isolates what deserves attention.' },
        { a: 'Weight', b: 'Emphasis', c: 'Bold or heavy type signals importance within a group.' },
      ],
      footer: 'Rank every element on the screen: the top rank gets the first look.',
    },
    {
      t: 3,
      points: [
        'Five tools explain the demo result: the ranked layout used size, contrast, space and weight to concentrate first looks.',
        'Reading direction matters: in Arabic (right-to-left) interfaces the natural start point mirrors.',
        'The studio audit asks: where does the eye go first on your project, and is it the right place?',
      ],
      script:
        'Layout B was not prettier. It ranked its elements with five tools. Whenever you design a screen, rank it: what is first, second, third? Then check your tools say the same thing.',
      tip: 'Ask students to rank the main elements of their favourite app’s home screen in 30 seconds.',
    },
  ),
  slide(
    1,
    'summary_takeaway',
    {
      kind: 'takeaway',
      heading: { title: 'Perception in One Sentence', subtitle: 'What the eye and mind do with your screen' },
      statement:
        'People see a screen in **about a quarter of a second**, sharply only in a **thumbnail-sized spot**, and they follow whatever your layout **shows them first**.',
      points: [
        { lead: 'Rank', text: 'Give **one** element the strongest signal: it gets the first look.' },
        { lead: 'Group', text: 'Use **space and regions** so related things read as one.' },
        { lead: 'Be quick', text: 'Respond within **0.1 s** and keep cues inside the sharp centre.' },
      ],
      next: 'Memory: how much can a person hold in mind?',
    },
    {
      t: 1,
      points: [
        'Perception limits what users can take in; layout decides what they take in first.',
        'Three rules: rank, group, be quick.',
      ],
      script:
        'Layout is not decoration. It steers a thumbnail-sized spotlight across the screen. Next: what that spotlight can hold on to once it has found something.',
      tip: 'Invite one student to restate the takeaway in their own words.',
    },
  ),

  // ========================================================================
  // ACT 2 · MEMORY & ATTENTION (37 min)
  // ========================================================================
  slide(
    2,
    'concept_model',
    {
      kind: 'divider',
      actNumber: 2,
      title: 'Memory and Attention',
      question: 'How much can a person hold in mind at once?',
      learn: [
        'Working memory is small: about 4 things at a time',
        'Grouping (chunking) makes information easier to hold',
        'People miss changes they are not looking at',
      ],
    },
    {
      t: 1,
      points: ['Announce the act: perception got information in; now, how much can the person keep?'],
      script: 'Next question: once something is noticed, how much can a person keep in mind?',
      tip: 'Pause: this is a topic switch.',
    },
  ),
  slide(
    2,
    'concept_model',
    {
      kind: 'custom',
      heading: {
        title: 'Your Working Memory',
        subtitle: 'A small workspace in your head',
        badge: { icon: 'brain', label: 'Holds about', value: '4 chunks' },
      },
      component: 'BaddeleyModel',
    },
    {
      t: 4,
      points: [
        'Working memory is the small workspace where you hold information for a few seconds (Baddeley and Hitch).',
        'It has parts: an attention manager, an inner voice (words and sounds, about 2 seconds unless repeated), an inner eye (pictures and layout) and a memory link to what you already know.',
        'Design consequence: reading text while someone talks overloads the inner voice; icons and layout use the inner eye.',
      ],
      script:
        'Think of a tiny desk with three trays. If you talk over a slide full of text, both land in the same tray. Spread information across channels, not into one.',
      tip: 'Click each box and ask which of their own slides or apps overload that channel.',
    },
  ),
  slide(
    2,
    'comparison_think',
    {
      kind: 'compare',
      heading: { title: 'Chunks: Group to Remember', subtitle: 'A chunk is one meaningful unit' },
      left: {
        tone: 'warn',
        title: '8 loose digits',
        tag: 'No groups',
        body: 'Eight separate digits: **48291357**. Each digit is one thing to hold.',
        example: '**Result:** most people lose some digits.',
        footer: 'Too many things at once',
      },
      right: {
        tone: 'good',
        title: '3 chunks',
        tag: 'Grouped',
        body: 'The same digits in groups: **482 · 913 · 57**. Each group is one unit.',
        example: '**Result:** much easier to hold.',
        footer: 'Same digits, less to hold',
      },
      takeaway: 'Working memory holds about 4 chunks, so group long numbers and codes.',
    },
    {
      t: 4,
      points: [
        'Miller (1956) is remembered for 7±2; Cowan (2001) showed that when rehearsal and grouping are controlled, the figure is about 4.',
        'What counts is the chunk: a unit the person already knows.',
        'Do not reveal that a test is coming: the next slide works best as a surprise.',
      ],
      script:
        'Same digits, different grouping. It is not about cleverness: it is about how many units you hold. Next, you will prove it on yourselves.',
      tip: 'Do not mention the digit test yet.',
    },
  ),
  slide(
    2,
    'experiment',
    {
      kind: 'custom',
      heading: {
        title: 'Demo: The Digit Test',
        subtitle: 'Same 8 digits, two formats',
        badge: { icon: 'flask', label: 'Live demo', value: 'Class experiment' },
      },
      component: 'ChunkingDemo',
    },
    {
      t: 5,
      points: [
        'Round A: 8 digits unbroken, 5 seconds. Students write what they remember.',
        'Round B: 8 new digits in groups of 3-3-2, 5 seconds.',
        'Tap the tally for students who recalled the string perfectly; compare the bars.',
      ],
      script:
        'Pens ready. Five seconds. Do not speak, do not move your lips. Write down what you can. Now again, new digits, different layout.',
      tip: 'Ask students not to repeat the digits aloud. Run Round A first, collect the tally, then Round B.',
    },
    'exp2',
  ),
  slide(
    2,
    'concept_model',
    {
      kind: 'rules',
      heading: { title: 'Chunking in Practice', subtitle: 'Three ways to lighten memory' },
      rules: [
        {
          title: 'Group long numbers',
          text: 'Phone, card and ID numbers: groups of 3 or 4 digits. Hard: **0661234567**. Easy: **0661 · 234 · 567**.',
          evidence: 'Groups of 3 to 4',
        },
        {
          title: 'One step at a time',
          text: 'Split a long form into short steps instead of asking for twenty things on one page.',
          evidence: 'Few items per screen',
        },
        {
          title: 'Pick, scan or paste',
          text: 'Offer lists, a card scanner or autofill so nobody types long codes from memory.',
          evidence: 'Do not make them remember',
        },
      ],
      takeaway: 'Anything people must hold in mind should fit in about four chunks.',
    },
    {
      t: 3,
      points: [
        'Practical result of the digit test: group, split and offer alternatives to typing from memory.',
        'Use in the studio: find the longest code or number your project asks people to type.',
      ],
      script:
        'You just proved it on yourselves. Three things a designer does about it: group, split, and avoid typing from memory.',
      tip: 'Ask for the longest number they type in everyday life.',
    },
  ),
  slide(
    2,
    'concept_model',
    {
      kind: 'rules',
      heading: { title: 'Three Kinds of Mental Effort', subtitle: 'Why some screens feel exhausting' },
      rules: [
        {
          title: 'Built-in difficulty',
          text: 'The task is hard by itself, like reading a medical result. Organise it step by step.',
          evidence: 'Organise it',
        },
        {
          title: 'Wasted effort',
          text: 'Effort caused by bad design: hunting for a button or decoding clutter. Designers can remove it.',
          evidence: 'Remove it first',
        },
        {
          title: 'Learning effort',
          text: 'Effort that helps people understand how the system works. Leave room for it.',
          evidence: 'Protect it',
        },
      ],
      takeaway: 'Remove wasted effort first: it is the part you control.',
    },
    {
      t: 3,
      points: [
        'Cognitive load theory (Sweller): the three efforts share one small budget (the technical terms are intrinsic, extraneous and germane load; the slides avoid them on purpose).',
        'Designers cannot remove built-in difficulty but can organise it; they can remove wasted effort.',
        'Link to the digit test: the unbroken string was wasted effort.',
      ],
      script:
        'The task has its own difficulty. Your design must not add to it. Every unnecessary decision, label or animation is a tax on a very small budget.',
      tip: 'Ask for one example of wasted effort in the app they used this morning.',
    },
  ),
  slide(
    2,
    'comparison_think',
    {
      kind: 'compare',
      heading: { title: 'Recognise, Do Not Recall', subtitle: 'Showing is easier than remembering' },
      left: {
        tone: 'warn',
        title: 'Recall',
        tag: 'Remember it yourself',
        body: 'Type a **three-letter station code** from memory. Nothing on screen helps.',
        example: '**Cost:** a hard search in memory with no clue.',
        footer: 'Lots of wasted effort',
      },
      right: {
        tone: 'good',
        title: 'Recognition',
        tag: 'See it and know it',
        body: 'Pick from a searchable list of station **names**. The right one is clear on sight.',
        example: '**Cost:** a quick glance.',
        footer: 'Almost no effort',
      },
      takeaway: 'Never make people remember what the screen can show.',
    },
    {
      t: 3,
      points: [
        'Recognition is far easier than recall because the item itself is the retrieval cue (Nielsen heuristic number 6).',
        'Examples: autocomplete, recent items, visible menus versus command lines.',
        'Studio audit question: what does your project make people remember or type from memory?',
      ],
      script:
        'You can recognise a face in a crowd without being able to draw it. Interfaces should use that difference.',
      tip: 'Ask which interface they have used that makes them remember things.',
    },
  ),
  slide(
    2,
    'concept_model',
    {
      kind: 'compare',
      heading: {
        title: 'People Miss Changes',
        subtitle: 'You only see what you pay attention to',
        badge: { icon: 'eye', label: 'Also called', value: 'Change blindness' },
      },
      left: {
        tone: 'warn',
        title: 'What we believe',
        tag: 'Feels true',
        body: 'I would **notice** if something on the screen changed.',
        example: '**Most people** feel sure about this.',
        footer: 'Overconfident',
      },
      right: {
        tone: 'accent',
        title: 'What really happens',
        tag: 'Tested again and again',
        body: 'A blink, a scroll or a page reload hides the change. People see **only what they are looking at**.',
        example: '**Even big changes** go unseen.',
        footer: 'Changes are missed',
      },
      takeaway: 'If something changes on screen, tell the user clearly.',
    },
    {
      t: 3,
      points: [
        'Change blindness (Rensink and colleagues, 1997): even large changes go unnoticed when attention is elsewhere or something interrupts the view.',
        'Not a flaw of the user: a limit of attention, as universal as the sharp centre of vision.',
        'The next demo will test the class on a hard change, then repeat it with a signal.',
      ],
      script:
        'Most people say: I would notice. Experiments say: you would not. Let us see how good you are.',
      tip: 'Take a quick poll: who thinks they will find it in under 5 seconds?',
    },
  ),
  slide(
    2,
    'experiment',
    {
      kind: 'custom',
      heading: {
        title: 'Demo: Spot the Change',
        subtitle: 'Can you find it? Then add a signal',
        badge: { icon: 'flask', label: 'Live demo', value: 'Class experiment' },
      },
      component: 'FlickerDemo',
    },
    {
      t: 4,
      points: [
        'Step 1: start the flicker with the signal OFF. Students raise a hand when they find the change; press “Students found it” to freeze the time.',
        'Step 2: switch the signal ON and run the same scene again: it is found almost at once.',
        'Aha: a change nobody can find is a change users will miss. A signal fixes it.',
      ],
      script:
        'One thing changes between these two screens. Find it. Notice how long it takes, even though it is not hidden. Now we add a signal. Watch what happens.',
      tip: 'Let the room struggle for 20 seconds before revealing. Then switch the signal on and compare.',
    },
    'exp6',
  ),
  slide(
    2,
    'concept_model',
    {
      kind: 'rules',
      heading: { title: 'Make Changes Noticeable', subtitle: 'Three ways to help people see what changed' },
      rules: [
        {
          title: 'Highlight what changed',
          text: 'Flash or colour the updated item for a moment so the eye is pulled to it.',
          evidence: 'A signal beats no signal',
        },
        {
          title: 'Show it where they look',
          text: 'Put the confirmation next to the button they just pressed, not in a far corner.',
          evidence: 'Close to the action',
        },
        {
          title: 'Say it in words',
          text: 'Write what happened: “Saved”, “3 items in your cart”, “Message sent”.',
          evidence: 'Words remove doubt',
        },
      ],
      takeaway: 'This is the feedback that closes the gulf of evaluation from Session 1.',
    },
    {
      t: 3,
      points: [
        'The demo result in three habits: highlight, place near, say it.',
        'Studio audit question: when something changes on your project, would a user notice?',
        'Tie back to the gulf of evaluation: feedback must be perceivable.',
      ],
      script:
        'You just saw a change disappear and then jump out with one signal. These three habits are how you make that happen on purpose.',
      tip: 'Ask for an app that confirms actions well and one that does not.',
    },
  ),
  slide(
    2,
    'summary_takeaway',
    {
      kind: 'takeaway',
      heading: { title: 'Protect Attention and Memory', subtitle: 'What this means for your screens' },
      statement:
        'People hold about **4 things** at once and miss changes they are not watching. Design so nobody has to **remember or guess**.',
      points: [
        { lead: 'Group', text: 'Break data into **meaningful units** such as 3-3-2.' },
        { lead: 'Show', text: 'Show the options; do **not** ask people to recall them.' },
        { lead: 'Signal', text: 'Make every change **visible** and say what happened.' },
      ],
      next: 'Action: how long does it take to hit a target and to choose?',
    },
    {
      t: 2,
      points: [
        'Three practical moves: group, show, signal.',
        'Bridge to Act 3: memory tells us how much people can hold; next we look at how fast they can act.',
      ],
      script:
        'Memory is the scarcest resource on the screen. Next we look at the speed of the hand and the speed of a decision.',
      tip: 'Ask someone for a number in their own life that is grouped (phone, IBAN, plate).',
    },
  ),

  // ========================================================================
  // ACT 3 · POINTING & CHOOSING (45 min)
  // ========================================================================
  slide(
    3,
    'concept_model',
    {
      kind: 'divider',
      actNumber: 3,
      title: 'Pointing and Choosing',
      question: 'How long does it take to hit a target, or to choose?',
      learn: [
        'Fitts’s Law: big and close is fast',
        'Hick’s Law: fewer, well-ordered choices are faster',
        'What to do about it in a real design',
      ],
    },
    {
      t: 1,
      points: ['Announce the act: two laws, each taught as idea, demo, then what designers do with it.'],
      script: 'Now the other end of the loop: the hand and the decision.',
      tip: 'Pause: topic switch.',
    },
  ),
  slide(
    3,
    'concept_model',
    {
      kind: 'custom',
      heading: {
        title: 'Fitts’s Law: The Idea',
        subtitle: 'Big and close is fast. Small and far is slow.',
        badge: { icon: 'target', label: 'Named after', value: 'Paul Fitts' },
      },
      component: 'FittsConcept',
    },
    {
      t: 5,
      points: [
        'Goal: see why some targets are slow to hit before any formula.',
        'Three real-size conditions: a large near button, a form field, a tiny far icon. Expected times (illustrative): 275, 619 and 1018 ms.',
        'Replay the cursor to feel the difference. The law: time grows as the target gets farther or smaller.',
      ],
      script:
        'Before any maths: which of these would you rather click? Of course the big, close one. Fitts gave that intuition a number, but the rule is simple: big and close beats small and far.',
      tip: 'Ask the class to predict the ratio between A and C before you reveal it.',
    },
  ),
  slide(
    3,
    'experiment',
    {
      kind: 'custom',
      heading: {
        title: 'Demo: Click the Targets',
        subtitle: 'A volunteer clicks, the class predicts first',
        badge: { icon: 'flask', label: 'Live demo', value: 'Volunteer-run' },
      },
      component: 'FittsTrialsDemo',
    },
    {
      t: 6,
      points: [
        'Before each condition ask the class to predict whether it will be faster or slower than the last.',
        'The volunteer clicks the two bars alternately: 8 timed movements per condition.',
        'Compare measured times with the expected ones; harder targets take longer.',
      ],
      script:
        'A volunteer: click the two bars back and forth as fast and as accurately as you can. Class: before they start, is C going to be faster or slower than A, and by how much?',
      tip: 'Ask for one volunteer per condition so everyone sees the difficulty change; note the misses as well as the time.',
    },
    'exp3',
  ),
  slide(
    3,
    'concept_model',
    {
      kind: 'rules',
      heading: { title: 'Fitts’s Law in Practice', subtitle: 'Three rules for every button' },
      rules: [
        {
          title: 'Make the main button big',
          text: 'The bigger the target, the easier to hit. The main action should be the biggest button.',
          evidence: 'On touch: at least 44 px',
        },
        {
          title: 'Keep it close to the action',
          text: 'Put the button next to what the user is doing: confirm beside the last field, not at the far end of the page.',
          evidence: 'Short distance = fast',
        },
        {
          title: 'Use edges and corners',
          text: 'The screen border stops the mouse, so edge targets are easy to hit. Think of menu bars.',
          evidence: 'You cannot overshoot an edge',
        },
      ],
      takeaway: 'You rarely need to calculate: a bigger, closer button is almost always faster.',
    },
    {
      t: 5,
      points: [
        'Practice, not computation: three rules a designer applies without a calculator.',
        'Edges: Walker and Smelcer (1990) found edge menus faster; on touchscreens the edge has no such stop, so size matters more.',
        'Touch targets of about 44 px (Apple) to 48 dp (Material) are the usual minimum.',
      ],
      script:
        'In real design nobody computes milliseconds for every button. You apply three rules: big, close, edges. The formula is for when you need to settle an argument; the next slide shows it.',
      tip: 'Ask students to find the tiniest button on their own phone.',
    },
  ),
  slide(
    3,
    'concept_model',
    {
      kind: 'formula',
      heading: { title: 'Putting a Number on It', subtitle: 'Optional: compare two designs with a formula' },
      formula: 'MT = a + b · log₂(D/W + 1)',
      formulaNote: 'Difficulty score = log₂(D/W + 1)',
      variables: [
        { sym: 'MT', meaning: 'Time to reach the target' },
        { sym: 'D', meaning: 'Distance to the target' },
        { sym: 'W', meaning: 'Width of the target' },
        { sym: 'a, b', meaning: 'Numbers measured for a device and a user (here 100 ms and 150 ms, as an illustration)' },
      ],
      exampleTitle: 'Same button, two widths',
      example: [
        { k: 'Width 40 px, distance 620 px', v: '≈ 707 ms' },
        { k: 'Width 120 px, distance 620 px', v: '≈ 494 ms' },
        { k: 'Wider button', v: '30% faster', strong: true },
      ],
      caption: 'Use it to settle an argument between two designs, not for everyday decisions.',
    },
    {
      t: 2,
      points: [
        'Shannon form (MacKenzie, 1992): ID = log2(D/W + 1) in bits; Welford’s variant uses log2(2D/W).',
        'Arithmetic: 620/40 + 1 = 16.5, log2 = 4.04, MT = 100 + 150 · 4.04 ≈ 707 ms. 620/120 + 1 = 6.17, log2 = 2.63, MT ≈ 494 ms.',
        'The message is the comparison: you can argue for a bigger button with a number when a stakeholder disagrees.',
      ],
      script:
        'This is the formula behind the rule. You do not need it every day. You use it when someone says “make it smaller, it looks nicer”: you can answer in milliseconds.',
      tip: 'Do not dwell on the maths: the practice slide before this one is what matters.',
    },
  ),
  slide(
    3,
    'comparison_think',
    {
      kind: 'compare',
      heading: { title: 'Hick’s Law: The Idea', subtitle: 'More choices take longer to decide' },
      left: {
        tone: 'good',
        title: 'Few choices',
        tag: '2 to 4 options',
        body: 'With two or four options a person decides **almost at once**.',
        example: '**Example:** a Yes / No dialog.',
        footer: 'Quick decision',
      },
      right: {
        tone: 'warn',
        title: 'Many choices',
        tag: '16 or more',
        body: 'With sixteen options a person must **scan and compare** before choosing.',
        example: '**Example:** a long unsorted menu.',
        footer: 'Slow decision',
      },
      takeaway: 'Doubling the options does not double the time, but a messy list is much slower than an ordered one.',
    },
    {
      t: 5,
      points: [
        'Hick-Hyman law: reaction time grows with the logarithm of the number of equally likely choices; each doubling adds about one step of thinking.',
        'It assumes people can narrow the set like a tree. Unordered lists are scanned one item at a time.',
        'The practical message is about structure, which the next demo shows.',
      ],
      script:
        'More choices, slower decisions. But not in a straight line: and it depends hugely on whether the choices are organised. Let us test that.',
      tip: 'Ask: should alphabetical order matter? Take hands before the demo.',
    },
  ),
  slide(
    3,
    'experiment',
    {
      kind: 'custom',
      heading: {
        title: 'Demo: The Decision Arena',
        subtitle: 'Does order change decision time?',
        badge: { icon: 'flask', label: 'Live demo', value: 'Volunteer-run' },
      },
      component: 'HickArenaDemo',
    },
    {
      t: 6,
      points: [
        'Run 2, 4, 8 and 16 choices first with an ordered layout, then shuffled.',
        'Present only measured data: do not tell students the outcome in advance.',
        'Let the chart make the point: order changes the curve.',
      ],
      script:
        'Find the number as fast as you can. Same buttons, same task. Watch what happens to the time as the screen grows, and what changes when the numbers are in order.',
      tip: 'Use two volunteers (one per layout) if the room needs momentum; keep trials short.',
    },
    'exp4',
  ),
  slide(
    3,
    'concept_model',
    {
      kind: 'rules',
      heading: { title: 'Hick’s Law in Practice', subtitle: 'Three rules for every menu and list' },
      rules: [
        {
          title: 'Show fewer choices',
          text: 'Offer the 4 to 7 most useful options first and put the rest behind “More”.',
          evidence: 'Few at a time',
        },
        {
          title: 'Order and group them',
          text: 'Sort alphabetically, by popularity or by category so people can skip whole groups.',
          evidence: 'Order lets people skip',
        },
        {
          title: 'Offer a good default',
          text: 'Pre-select the most common answer so most people do not have to choose at all.',
          evidence: 'No choice is the fastest',
        },
      ],
      takeaway: 'Cut the number of choices, then put the remaining ones in order.',
    },
    {
      t: 4,
      points: [
        'Practice for Hick’s Law: fewer, ordered, with defaults.',
        'The demo showed that ordered lists can be searched like a tree while shuffled ones must be scanned.',
        'Studio audit question: how many choices does your project show at once, and are they in order?',
      ],
      script:
        'Same logic as Fitts: three rules, no calculator. Fewer choices, in order, with a sensible default. Next, one classic way to show fewer choices.',
      tip: 'Ask for a form that pre-selects the right answer for them.',
    },
  ),
  slide(
    3,
    'comparison_think',
    {
      kind: 'compare',
      heading: { title: 'Progressive Disclosure', subtitle: 'Show what is needed now, keep the rest one step away' },
      left: {
        tone: 'warn',
        title: 'All at once',
        tag: '16 choices',
        body: 'Every option is visible: **16 buttons** compete for attention.',
        example: '**Result:** a wall of options and an intimidating first look.',
        footer: 'Maximum load up front',
      },
      right: {
        tone: 'good',
        title: 'In layers',
        tag: '4 groups first',
        body: 'Four clear groups first, then the options of one group. Only **4 items** compete at a time.',
        example: '**Trade-off:** one extra step, so keep groups meaningful.',
        footer: 'Less clutter per screen',
      },
      takeaway: 'Show frequent options first and keep rare ones one step away.',
    },
    {
      t: 3,
      points: [
        'Progressive disclosure does not reduce the information needed to decide; it reduces what must be seen and held at once.',
        'It works only if groups match how users think; arbitrary groups add a step and a guess.',
        'Counter-example: hiding frequent commands behind menus breaks the Fitts rules just taught.',
      ],
      script:
        'The trick is not to hide things. It is to show the right four things now and make the rest reachable in one predictable step.',
      tip: 'Ask for an example of hiding done badly (a menu icon hiding the main action).',
    },
  ),
  slide(
    3,
    'experiment',
    {
      kind: 'custom',
      heading: {
        title: 'Demo: Wall or Layers?',
        subtitle: 'Find the same commands in two layouts',
        badge: { icon: 'flask', label: 'Live demo', value: 'Volunteer-run' },
      },
      component: 'ProgressiveDisclosureDemo',
    },
    {
      t: 6,
      points: [
        'The same 16 commands, the same six tasks, two layouts: everything visible, or four groups opened on demand.',
        'Tasks are goals (“Add a picture”), not button labels, so the volunteer has to guess where the command lives, like a real user.',
        'Present only measured data: fewer things on screen versus one extra click. Let the class discuss which wins and why.',
      ],
      script:
        'Same editor, same tasks. First everything is on the screen at once. Then the commands are grouped and you open a group. Watch the time and the number of clicks.',
      tip: 'Use two volunteers (one per layout) if the room needs momentum. If layers do not win, ask: were the group names clear? That is the lesson.',
    },
    'exp4',
  ),
  slide(
    3,
    'summary_takeaway',
    {
      kind: 'takeaway',
      heading: { title: 'Make Targets Easy, Choices Few', subtitle: 'What this means for your screens' },
      statement:
        'People hit **big, close** targets quickly and decide quickly among **few, ordered** choices.',
      points: [
        { lead: 'Big and close', text: 'Make the main button large and next to the action.' },
        { lead: 'Few and ordered', text: 'Show a handful of choices in a clear order.' },
        { lead: 'Edges and defaults', text: 'Use screen edges, and pre-select the common answer.' },
      ],
      next: 'Mental models: what does the user think the system does?',
    },
    {
      t: 2,
      points: [
        'Three practical moves: big and close, few and ordered, edges and defaults.',
        'Bridge: people can now notice, remember and click; do they understand what will happen?',
      ],
      script:
        'You can now judge a button and a menu without a formula. One more thing decides if people succeed: what they believe the system does.',
      tip: 'Take a stretch break if the room is tired: this is a natural point.',
    },
  ),

  // ========================================================================
  // ACT 4 · MENTAL MODELS (30 min)
  // ========================================================================
  slide(
    4,
    'concept_model',
    {
      kind: 'divider',
      actNumber: 4,
      title: 'Mental Models',
      question: 'What does the user think the system does?',
      learn: [
        'People build a picture of how things work',
        'The screen is the only teacher they have',
        'How to find and fix a mismatch',
      ],
    },
    {
      t: 1,
      points: ['Announce the act: so far people can see, remember, point and choose; now, do they understand?'],
      script: 'Last act of the lecture: understanding.',
      tip: 'Pause: topic switch.',
    },
  ),
  slide(
    4,
    'concept_model',
    {
      kind: 'custom',
      heading: {
        title: 'Three Pictures of One System',
        subtitle: 'Where misunderstanding starts',
        badge: { icon: 'layers', label: 'Idea from', value: 'Don Norman' },
      },
      component: 'MentalTriad',
    },
    {
      t: 6,
      points: [
        'Designer’s picture: how the system really works. The user’s picture (mental model): what the user believes.',
        'The designer never talks to the user directly: the only channel is the screen (the system image: labels, behaviour, feedback).',
        'Most usability failures are mismatches between what the screen shows and what the user believes.',
      ],
      script:
        'You will never be in the room when someone uses your product. All you have is what the screen shows. That is your entire teaching budget.',
      tip: 'Use the thermostat example already on the slide to set up the next slide.',
    },
  ),
  slide(
    4,
    'comparison_think',
    {
      kind: 'compare',
      heading: { title: 'The Thermostat Paradox', subtitle: 'Two ideas about the same dial (Kempton, 1986)' },
      left: {
        tone: 'warn',
        title: 'Gas-pedal idea',
        tag: 'Wrong, but common',
        body: 'Many people think the dial is **like a gas pedal**: set it higher and the room heats **faster**.',
        example: '**Behaviour:** turn it to maximum, then back down when it is hot.',
        footer: 'Wastes energy, overshoots',
      },
      right: {
        tone: 'good',
        title: 'Target idea',
        tag: 'How it really works',
        body: 'The dial sets a **target temperature**. The heater works at one speed until the target is reached.',
        example: '**Behaviour:** set the temperature you want and leave it.',
        footer: 'Correct picture, less energy',
      },
      takeaway: 'People build their picture from what the dial _says_, not from how it works.',
    },
    {
      t: 5,
      points: [
        'Kempton (1986) interviewed households and found two coexisting ideas of home heat control (valve theory and feedback theory).',
        'The gas-pedal idea is wrong but reasonable: a dial that goes up looks like an accelerator.',
        'Preview the irrigation demo: the same trap on a farm.',
      ],
      script:
        'The gas-pedal idea is not stupid. It is exactly what a dial that goes up would make you believe. The fault is in the screen, not in the user.',
      tip: 'Ask who heats a room by turning the dial to maximum. Expect honest hands.',
    },
  ),
  slide(
    4,
    'comparison_think',
    {
      kind: 'compare',
      heading: { title: 'Familiar Pictures', subtitle: 'Borrow something known, then check where it breaks' },
      left: {
        tone: 'good',
        title: 'A picture that helps',
        tag: 'Cart · Trash can',
        body: 'A **shopping cart** or a **trash can** lets people reuse what they know from real objects.',
        example: '**Gain:** little to learn on day one.',
        footer: 'Familiar, quick to learn',
      },
      right: {
        tone: 'warn',
        title: 'A picture that misleads',
        tag: 'Where it breaks',
        body: 'Dragging a disk to the **trash to eject** it makes people fear they are deleting it.',
        example: '**Cost:** the familiar picture predicts the wrong result.',
        footer: 'People trust the picture',
      },
      takeaway: 'A familiar picture is a loan: check where the real system is different.',
    },
    {
      t: 3,
      points: [
        'Metaphors give users a ready-made model (desktop, folder, cart, trash).',
        'They leak where the real system behaves differently from the object it borrows from.',
        'Studio audit question: which familiar picture does your project use, and where does it mislead?',
      ],
      script:
        'Borrowed pictures speed up learning on day one and cause errors on day thirty. Always ask where the borrowed picture stops being true.',
      tip: 'Ask for a metaphor from a public service website and where it misleads.',
    },
  ),
  slide(
    4,
    'experiment',
    {
      kind: 'custom',
      heading: {
        title: 'Demo: The Accelerator Dial',
        subtitle: 'A mental-model trap in agriculture',
        badge: { icon: 'sprout', label: 'Live demo', value: 'Presenter-run' },
      },
      component: 'IrrigationDemo',
    },
    {
      t: 8,
      points: [
        'Start with the misleading screen: a dial labelled “Irrigation power”. Ask the class where they would set it to water quickly.',
        'Run 24 hours at 100: the system holds a very high target and the soil is flooded.',
        'Switch to the honest screen: “Target soil moisture” with the good band shown, and run again.',
      ],
      script:
        'You are a farmer. Water is short and the crop is thirsty. Where do you put the dial? Most of you chose full power. Let us see what the system does with that.',
      tip: 'Collect a show of hands for 100 before running: it makes the mismatch personal.',
    },
    'exp5',
  ),
  slide(
    4,
    'concept_model',
    {
      kind: 'rules',
      heading: { title: 'Find a Mismatch in Practice', subtitle: 'Three questions for any confusing moment' },
      rules: [
        {
          title: 'What does the user expect?',
          text: 'Ask or watch: what result did they predict **before** they acted?',
          evidence: 'The user’s picture',
        },
        {
          title: 'What does the system do?',
          text: 'Find the real rule behind the screen: what **actually** happens?',
          evidence: 'The real system',
        },
        {
          title: 'What does the screen say?',
          text: 'Read the labels, icons and feedback like a **first-time user**. What do they promise?',
          evidence: 'The screen',
        },
      ],
      takeaway: 'The mismatch lives between what the screen says and what the user expects.',
    },
    {
      t: 5,
      points: [
        'This is the template for the “Understand” question of the studio checklist.',
        'Apply it to the irrigation dial in 60 seconds with the class: expects “accelerator”, does “target”, screen says “power”.',
        'Emphasise: write all three, in plain language, for one confusing moment.',
      ],
      script:
        'Three questions, three short answers. Where the second and third disagree with the first, you have found a finding.',
      tip: 'Do the irrigation dial together on the board.',
    },
  ),
  slide(
    4,
    'summary_takeaway',
    {
      kind: 'takeaway',
      heading: { title: 'The Screen Is the Teacher', subtitle: 'What mental models mean for your screens' },
      statement:
        'People **will** build a picture of how your system works, with or without your help. Make the screen teach the **right** one.',
      points: [
        { lead: 'Say what it does', text: 'Labels must match the **real behaviour**.' },
        { lead: 'Show what happens', text: 'Feedback tells people what the system is **doing now**.' },
        { lead: 'Test the picture', text: 'Ask users to **predict** before they act.' },
      ],
      next: 'Your turn: the course project',
    },
    {
      t: 2,
      points: [
        'Three practical moves: say what it does, show what happens, test the picture.',
        'Transition: the lecture is done; now they apply it to a real interface.',
      ],
      script:
        'You now have four lenses: perception, memory, pointing and choosing, and mental models. For the rest of the session you point them at something real.',
      tip: 'Tell students to get their laptops out and sit with their partner before the next slide.',
    },
  ),

  // ========================================================================
  // ACT 5 · YOUR COURSE PROJECT (50 min)
  // ========================================================================
  slide(
    5,
    'project_intro',
    {
      kind: 'divider',
      actNumber: 5,
      title: 'Your Course Project',
      question: 'Which broken interface will you fix?',
      learn: [
        'How the project works for the whole semester',
        'Choose one of 10 broken interfaces',
        'Audit it with the four lenses of today',
      ],
    },
    {
      t: 1,
      points: ['Announce the act: from here on the students work, teams of two.'],
      script: 'The lecture is over. From now on, you work.',
      tip: 'Make sure every student has a partner before the next slide; pair up singles immediately.',
    },
  ),
  slide(
    5,
    'project_intro',
    {
      kind: 'rules',
      heading: { title: 'How the Project Works', subtitle: 'Fix a broken interface, one session at a time' },
      rules: [
        {
          title: 'You get a broken interface',
          text: 'Each project is a real-looking website or app with real design problems.',
          evidence: '10 projects to choose from',
        },
        {
          title: 'You improve it every session',
          text: 'After each session you fix what that session taught. Today: perception, memory, pointing and understanding.',
          evidence: 'Small steps, every session',
        },
        {
          title: 'You show the perfect version',
          text: 'In the last session you present the before and after and show it is better.',
          evidence: 'Before and after, with evidence',
        },
      ],
      takeaway: 'One interface, improved a little more after every session.',
    },
    {
      t: 2,
      points: [
        'Each team of two owns one project for the whole semester; the interface improves session after session.',
        'Today’s step: choose the project and audit it with the four lenses of the lecture.',
        'The final session is a before/after defence with evidence.',
      ],
      script:
        'This is your project for the whole course. You get a broken interface. After every session you fix what that session taught. At the end you show us the perfect version.',
      tip: 'Do not give a number of teams per project on screen; aim for about two teams per project.',
    },
  ),
  slide(
    5,
    'project_intro',
    {
      kind: 'projects',
      heading: { title: 'Meet the 10 Projects', subtitle: 'Pick one to improve all semester' },
      note: 'See any interface: click Projects (J) at the bottom of this app. You can open it at any time.',
    },
    {
      t: 3,
      points: [
        'Ten interfaces from four areas: agriculture, healthcare, public services and developer tools, plus home energy and finance.',
        'Each opens in the Projects viewer with the user, the situation and the task.',
        'Aim for every project to be chosen; about two teams per project.',
      ],
      script:
        'Here are the ten projects. In a moment you will open at least three and try them. Look for one you would like to fix, and one where you can imagine the real user.',
      tip: 'Click Projects (J) at the bottom of the app to demo the viewer, then return to the slides.',
    },
  ),
  slide(
    5,
    'activity_timer',
    {
      kind: 'activity',
      heading: {
        title: 'Studio Step 1: Choose',
        subtitle: 'Find your partner and pick a project',
        badge: { icon: 'clock', label: 'Studio', value: 'Step 1 · 7 min' },
      },
      label: 'Studio · Step 1 of 3',
      chip: 'PAIRS · 7 MINUTES',
      title: 'Choose your project',
      steps: [
        { text: 'Sit with your **partner**. You are a team of two for the semester.' },
        { text: 'Click **Projects** at the bottom of the app (or press **J**). Open at least **three** projects and try each for about a minute.' },
        { text: 'Choose **one** project and tell the teacher its **number**.' },
      ],
      timerSeconds: 420,
      timerLabel: 'Step 1 Clock',
      goal: 'Choose the interface you will improve for the whole course.',
      output: 'A team of two with one project number.',
    },
    {
      t: 7,
      points: [
        'Goal: every team has a partner and one project within 7 minutes.',
        'Write the choices on the board; aim for at most two teams per project and rebalance if one project is oversubscribed.',
        'Walk the room: help singles pair up and help undecided teams choose by asking what they use in daily life.',
      ],
      script:
        'Seven minutes. Partner, three projects tried, one project chosen. Tell me the number when you have it.',
      tip: 'If a project is chosen by three teams, ask the third to take their second choice.',
    },
  ),
  slide(
    5,
    'concept_model',
    {
      kind: 'table',
      heading: {
        title: 'The Audit Checklist',
        subtitle: 'Four questions, one for each part of today',
        badge: { icon: 'list', label: 'Use it on', value: 'Your project' },
      },
      heads: ['LOOK AT', 'PART OF TODAY', 'ASK YOURSELF'],
      rows: [
        { a: '1. Look', b: 'Perception', c: 'Where does the eye go first? Is that the right place? Are related things grouped?' },
        { a: '2. Remember', b: 'Memory', c: 'What must the user remember or type from memory? Could the screen show it instead?' },
        { a: '3. Point and choose', b: 'Action', c: 'Is the main button big and close? How many choices are on one screen?' },
        { a: '4. Understand', b: 'Mental model', c: 'What will the user expect to happen? Does the screen say what really happens?' },
      ],
      footer: 'Find at least one problem for each question.',
    },
    {
      t: 4,
      points: [
        'The four questions map one-to-one to the four acts of the lecture.',
        'Each question must produce a concrete problem found on the student’s own interface.',
        'Refer students back to the practice slides of each act if they get stuck.',
      ],
      script:
        'This is your tool for the rest of the session. Four questions. For each one, find at least one real problem on your interface.',
      tip: 'Read each question aloud and ask one student what they would look at on their phone.',
    },
  ),
  slide(
    5,
    'concept_model',
    {
      kind: 'table',
      heading: {
        title: 'Example: One Finding per Question',
        subtitle: 'A hospital check-in kiosk (made up)',
        badge: { icon: 'check', label: 'Model', value: 'A good audit' },
      },
      heads: ['WHAT WE SAW', 'QUESTION', 'WHY IT HURTS, AND THE FIX'],
      rows: [
        { a: 'All 12 fields look the same', b: '1. Look', c: 'The eye has no starting point. **Fix:** group the fields in 3 boxes and make one main button stand out.' },
        { a: 'A 12-digit number to type', b: '2. Remember', c: 'Too much to hold in mind. **Fix:** split it 4-4-4, or let the patient scan the card.' },
        { a: 'A tiny Confirm button, far away', b: '3. Point', c: 'Slow to hit, easy to miss. **Fix:** make it wide and put it next to the last field.' },
        { a: '“Reset” wipes the whole form', b: '4. Understand', c: 'People expect it to undo one step. **Fix:** rename it “Clear all” and ask first.' },
      ],
      footer: 'Each finding says what you saw, why it hurts, and how to fix it.',
    },
    {
      t: 5,
      points: [
        'Model audit: one finding per checklist question, each with what was seen, why it hurts and a fix idea.',
        'The same structure is what the students will hand in as their audit sheet.',
        'Point out that none of the findings needed a calculator: it is observation plus the ideas of today.',
      ],
      script:
        'This is what a good audit looks like. Four findings. Each one says what we saw, why it hurts the user, and how we would fix it. Your sheet should look like this, for your own interface.',
      tip: 'Do not spend long: students learn more from doing than from watching.',
    },
  ),
  slide(
    5,
    'activity_timer',
    {
      kind: 'activity',
      heading: {
        title: 'Studio Step 2: Try the Task',
        subtitle: 'Use your interface like a real user',
        badge: { icon: 'clock', label: 'Studio', value: 'Step 2 · 8 min' },
      },
      label: 'Studio · Step 2 of 3',
      chip: 'PAIRS · 8 MINUTES',
      title: 'Try the task, slowly',
      steps: [
        { text: 'Open your project. Read **the user** and **the task** on the left of the viewer.' },
        { text: 'One of you does the **task** on the interface. The other **takes notes**.' },
        { text: 'Write down **every moment** you hesitate, click the wrong thing, or are not sure what happened.' },
      ],
      timerSeconds: 480,
      timerLabel: 'Step 2 Clock',
      goal: 'Feel the problems before you name them.',
      output: 'A list of at least 6 moments where the user struggled.',
    },
    {
      t: 8,
      points: [
        'Students must complete the task end to end; every hesitation is a clue.',
        'Common mistake: skipping the task and looking only at the visuals. Insist on doing the task.',
        'Walk the room and ask: where did you hesitate?',
      ],
      script:
        'One of you is the user and does the task. The other is the observer and writes down everything. Do not fix anything yet: just notice.',
      tip: 'Remind them to swap roles halfway if time allows.',
    },
  ),
  slide(
    5,
    'activity_timer',
    {
      kind: 'activity',
      heading: {
        title: 'Studio Step 3: Audit',
        subtitle: 'Turn your notes into four clear findings',
        badge: { icon: 'clock', label: 'Studio', value: 'Step 3 · 20 min' },
      },
      label: 'Studio · Step 3 of 3',
      chip: 'PAIRS · 20 MINUTES',
      title: 'Audit with the checklist',
      steps: [
        { text: 'Go through the **four questions** of the checklist, one at a time.' },
        { text: 'For each question, find **one problem** on your interface and take a **screenshot**.' },
        { text: 'Write down **what you saw**, **why it hurts** the user, and **your idea to fix it**.' },
      ],
      timerSeconds: 1200,
      timerLabel: 'Step 3 Clock',
      goal: 'Turn your notes into four findings you can explain to anyone.',
      output: 'An audit sheet: 4 findings, each with a screenshot and a fix idea.',
    },
    {
      t: 20,
      points: [
        'The core of the studio: let teams work, intervene with questions rather than answers.',
        'Checkpoints: at about 5 minutes every team has a “Look” finding; at 10, “Remember”; at 15, “Point and choose”; at 20, “Understand”.',
        'Common errors: describing without saying why it hurts, vague fixes (“make it better”), findings that cannot be seen on a screenshot.',
      ],
      script:
        'Twenty minutes. Four findings, one per question. Each finding has three parts: what you saw, why it hurts, how to fix it. Ask me for help with the method, not for the answers.',
      tip: 'Circulate in a fixed pattern. Ask: “Show me your screenshot. Why does it hurt the user?”',
    },
  ),

  // ========================================================================
  // ACT 6 · HOMEWORK & CLOSE (12 min)
  // ========================================================================
  slide(
    6,
    'concept_model',
    {
      kind: 'divider',
      actNumber: 6,
      title: 'Class Example and Close',
      question: 'What does a good audit look like?',
      learn: ['One interface audited step by step with the four questions', 'What to hand in', 'The three ideas to keep'],
    },
    {
      t: 1,
      points: ['Announce the last part: the lecturer audits one interface live, then homework and a wrap-up.'],
      script: 'Last part: now you watch me do what you just did, then I tell you what to hand in.',
      tip: 'Ask for laptops to be closed for this part.',
    },
  ),
  slide(
    6,
    'case_study',
    {
      kind: 'audit',
      heading: {
        title: 'Class Example: Study Room Booking',
        subtitle: 'Watch me audit an interface with the four questions',
        badge: { icon: 'book', label: 'Project 11', value: 'Class example' },
      },
    },
    {
      t: 2,
      points: [
        'This is the lecturer’s own project, not one of the ten: it is audited live so students see the method once more.',
        'Open the interface from the Projects viewer (link #/projects/11) and do the task once, aloud: book a room for 4 people tomorrow 14:00 to 16:00.',
        'Narrate every hesitation: these are the clues the four questions will name.',
      ],
      script:
        'This is my own example. The user is Imane, a student. Her task is to book a study room for four people tomorrow afternoon. Watch what happens when I try it.',
      tip: 'Do the task live first, in the interface itself. Then come back to the slides: the numbered boxes mark the problems.',
    },
  ),
  slide(
    6,
    'case_study',
    {
      kind: 'audit',
      heading: {
        title: 'Audit 1: Look',
        subtitle: 'Where does the eye go first, and are things grouped?',
        badge: { icon: 'eye', label: 'Question 1', value: 'Perception' },
      },
      lens: 'look',
    },
    {
      t: 2,
      points: [
        'Two findings: no grouping or ranking among the fields and the room list; the Reserve action is lost while a promo banner is the loudest element.',
        'Tools from today: ranking, grouping with space, one highlight per screen.',
      ],
      script:
        'First question: where does the eye go? Nowhere in particular, because everything looks the same. And the one thing that shouts is an advert, not the booking button.',
      tip: 'Ask students to predict the finding before revealing the text on the right.',
    },
  ),
  slide(
    6,
    'case_study',
    {
      kind: 'audit',
      heading: {
        title: 'Audit 2: Remember',
        subtitle: 'What must the user remember or type from memory?',
        badge: { icon: 'brain', label: 'Question 2', value: 'Memory' },
      },
      lens: 'remember',
    },
    {
      t: 2,
      points: [
        'Two findings: the room must be typed as a code from memory; date and time need a strict typed format with no hint.',
        'Tools from today: recognise do not recall, pick instead of type, chunking.',
      ],
      script:
        'Second question: what must Imane remember? A room code that is only listed on another page, and a date format she has to guess.',
      tip: 'Ask: how would you let her pick instead of type?',
    },
  ),
  slide(
    6,
    'case_study',
    {
      kind: 'audit',
      heading: {
        title: 'Audit 3: Point and Choose',
        subtitle: 'Is the main button big and close? How many choices?',
        badge: { icon: 'target', label: 'Question 3', value: 'Action' },
      },
      lens: 'point',
    },
    {
      t: 2,
      points: [
        'Two findings: the Reserve button is tiny and far from the last field; the 24-room list is shown at once, unordered, with tiny rows.',
        'Tools from today: big and close, few and ordered choices.',
      ],
      script:
        'Third question: pointing and choosing. The button that matters is tiny and in a corner. And twenty-four rooms are in one long unordered list.',
      tip: 'Reuse the Fitts and Hick practice rules aloud: big, close, few, ordered.',
    },
  ),
  slide(
    6,
    'case_study',
    {
      kind: 'audit',
      heading: {
        title: 'Audit 4: Understand',
        subtitle: 'What will the user expect, and what does the screen say?',
        badge: { icon: 'layers', label: 'Question 4', value: 'Mental model' },
      },
      lens: 'understand',
    },
    {
      t: 2,
      points: [
        'Two findings: Hold looks like the main action but only keeps the room for 10 minutes; after Reserve nothing visible happens and Clear wipes the form without asking.',
        'Tools from today: what the user expects, what the system does, what the screen says; feedback that is noticeable.',
      ],
      script:
        'Last question: what does Imane expect? She clicks Hold and thinks she is done. She is not: the room is released after ten minutes. And nothing on screen tells her.',
      tip: 'Ask the three questions: expects, does, says. Then tell students: this is exactly the work of the studio, on their own project.',
    },
  ),
  slide(
    6,
    'concept_model',
    {
      kind: 'table',
      heading: {
        title: 'Homework: Audit Your Interface',
        subtitle: 'Apply today’s ideas to your own project',
        badge: { icon: 'flag', label: 'Due', value: 'Before Session 3' },
      },
      heads: ['PART', 'PAGE', 'WHAT TO DO'],
      rows: [
        { a: 'Your project and its task', b: 'Page 1', c: 'Name your project and the user. Describe the task in three sentences.' },
        { a: 'What went wrong for the user', b: 'Page 2', c: 'Your list from Step 2: every moment the user hesitated, slipped or was unsure.' },
        { a: 'Your four findings', b: 'Page 3', c: 'One finding per question, each with a screenshot and why it hurts the user.' },
        { a: 'Your fix ideas', b: 'Page 4', c: 'For each finding, say in words how you would fix it and which idea from today supports it.' },
      ],
      footer: 'One 4-page PDF per team of two. Fix ideas in words only: no new screens to draw yet.',
    },
    {
      t: 3,
      points: [
        'Deliverable: a 4-page PDF per team of two, due before Session 3.',
        'Pages 1 to 3 reuse the studio work. Page 4 is new: fix ideas written in words, each linked to an idea from the lecture.',
        'Students have not learned to design interfaces yet: do not ask for redrawn screens. Drawing and prototyping come later in the course.',
        'The project continues: the same interface will be improved again after each session.',
      ],
      script:
        'Your homework is today’s audit, written up properly. Four pages. Pages one to three you mostly have from the studio. Page four: say in words how you would fix each problem and which idea supports it. No drawing yet: we will learn how to design later.',
      tip: 'Confirm that a short template is posted on the course portal before leaving.',
    },
  ),
  slide(
    6,
    'summary_takeaway',
    {
      kind: 'rules',
      heading: { title: 'Three Ideas to Remember', subtitle: 'Carry them into every design' },
      rules: [
        {
          title: 'People have limits',
          text: 'About **a quarter of a second** to react and **4 things** in working memory. Design inside these limits.',
          evidence: 'Never blame the user',
        },
        {
          title: 'Big, close and few',
          text: 'Big, close targets and a few well-ordered choices are faster to use.',
          evidence: 'Fitts and Hick',
        },
        {
          title: 'The screen is the teacher',
          text: 'People learn from what the screen shows, not from your code or your intentions.',
          evidence: 'Show it, say it, signal it',
        },
      ],
    },
    {
      t: 2,
      points: [
        'Idea 1: biology sets limits. Idea 2: simple rules follow from them. Idea 3: the screen is the only teacher.',
        'Ask students to write each idea in their notes.',
      ],
      script:
        'Three sentences to keep. People have limits. Big, close and few is faster. And your screen is the only thing the user ever learns from.',
      tip: 'Recite each idea and have the room repeat the key phrase.',
    },
  ),
  slide(
    6,
    'preview_next',
    {
      kind: 'teaser',
      label: 'Conclusion & Next Class',
      icon: 'users',
      kicker: 'Previewing Session 3 · Next Class',
      title: 'The User',
      subtitle: 'Observe · Interview · Think Aloud · Find Patterns',
      blurb:
        'We leave the classroom to watch real people use real interfaces. You will learn to observe, to interview, and to turn what you hear into clear design insights for your project.',
      thanks: 'Thank you for Session 2 · Questions & Discussion Open at Lectern',
    },
    {
      t: 3,
      points: [
        'Session 3: user research and contextual inquiry (observation, interviews, think-aloud, finding patterns).',
        'Your audit gives you hypotheses to test with real users of your project’s interface.',
        'Reminder: homework is due before Session 3.',
      ],
      script:
        'Today you worked alone with your interface. Next time you meet the people who use it. Your audit tells you what to look for. See you then.',
      tip: 'Stay for questions at the lectern; teams with project doubts should come to you now.',
    },
  ),
];

export const SLIDES_DATA_SESSION_2: Slide2[] = RAW_SLIDES.map((s, i) => ({ ...s, id: i + 1 }));

/** Act metadata with slide ranges computed from the slides themselves. */
export const ACTS_METADATA_SESSION_2: ActMeta[] = ACTS_BASE.map((a) => {
  const ids = SLIDES_DATA_SESSION_2.filter((x) => x.act === a.id).map((x) => x.id);
  return { ...a, slidesRange: `Slides ${ids[0]}–${ids[ids.length - 1]}` };
});
