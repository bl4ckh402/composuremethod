export const STEPS = {
  q1: {
    type: "question",
    qNum: 1,
    eyebrow: "Let's start simple",
    question: "How long has this been something you've noticed?",
    options: [
      { label: "Just recently", tagKey: "timeline", tagValue: "recent", next: "q2a" },
      { label: "On and off for years", tagKey: "timeline", tagValue: "onoff", next: "q2b" },
      { label: "As long as I can remember", tagKey: "timeline", tagValue: "lifelong", next: "q2c" },
    ],
  },
  q2a: {
    type: "question",
    qNum: 2,
    eyebrow: "Recently",
    question: "What changed around the time you started noticing it?",
    options: [
      { label: "A new relationship", tagKey: "trigger", tagValue: "new_relationship", next: "stat1" },
      { label: "Less frequent sex than before", tagKey: "trigger", tagValue: "frequency", next: "stat1" },
      { label: "More stress or pressure lately", tagKey: "trigger", tagValue: "stress", next: "stat1" },
      { label: "Not sure — it just started", tagKey: "trigger", tagValue: "unclear", next: "stat1" },
    ],
  },
  q2b: {
    type: "question",
    qNum: 2,
    eyebrow: "On and off",
    question: "Does it seem tied to anything in particular?",
    options: [
      { label: "Stress or being tired", tagKey: "trigger", tagValue: "stress", next: "stat1" },
      { label: "Alcohol", tagKey: "trigger", tagValue: "alcohol", next: "stat1" },
      { label: "Certain partners or situations, not others", tagKey: "trigger", tagValue: "situational", next: "stat1" },
      { label: "No clear pattern I can see", tagKey: "trigger", tagValue: "unclear", next: "stat1" },
    ],
  },
  q2c: {
    type: "question",
    qNum: 2,
    eyebrow: "As long as you can remember",
    question: "Have you ever felt like you had full control, even briefly?",
    options: [
      { label: "Yes, sometimes", tagKey: "control_history", tagValue: "sometimes", next: "stat1" },
      { label: "No, not that I remember", tagKey: "control_history", tagValue: "never", next: "stat1" },
      { label: "Honestly not sure", tagKey: "control_history", tagValue: "unsure", next: "stat1" },
    ],
  },
  stat1: {
    type: "stat",
    heading: "You're in good company.",
    body: "This is one of the most common — and least talked about — experiences men have. Most guys who deal with it never bring it up to anyone, which is usually what keeps it feeling bigger than it is.",
    next: "q3",
  },
  q3: {
    type: "question",
    qNum: 3,
    eyebrow: "Context",
    question: "Does this happen with a specific partner, or across the board?",
    options: [
      { label: "A specific partner", tagKey: "context", tagValue: "specific_partner", next: "q4" },
      { label: "Pretty much every time", tagKey: "context", tagValue: "general", next: "q4" },
      { label: "I'm not with anyone right now", tagKey: "context", tagValue: "no_partner", next: "q4" },
    ],
  },
  q4: {
    type: "question",
    qNum: 4,
    eyebrow: "Impact",
    question: "How much does this affect your confidence day to day?",
    options: [
      { label: "Barely — it's a minor thing", tagKey: "impact", tagValue: "low", next: "stat2" },
      { label: "Sometimes, especially before it might come up", tagKey: "impact", tagValue: "medium", next: "stat2" },
      { label: "A lot — it's on my mind more than I'd like", tagKey: "impact", tagValue: "high", next: "stat2" },
    ],
  },
  stat2: {
    type: "stat",
    heading: "It's not “just in your head” — but it's not permanent either.",
    body: "Anxiety and arousal share the same nervous-system wiring, which is why this can feel so hard to just “will” your way out of. The good news: that also means it responds to training, not just willpower.",
    next: "q5",
  },
  q5: {
    type: "question",
    qNum: 5,
    eyebrow: "What you've tried",
    question: "Have you tried anything to work on this before?",
    options: [
      { label: "Nothing yet", tagKey: "prior", tagValue: "none", next: "q6a" },
      { label: "I've researched it a bit", tagKey: "prior", tagValue: "researched", next: "q6b" },
      { label: "I've tried something that didn't stick", tagKey: "prior", tagValue: "tried", next: "q6c" },
    ],
  },
  q6a: {
    type: "question",
    qNum: 6,
    eyebrow: "Nothing yet",
    question: "What's held you back from looking into it?",
    options: [
      { label: "Privacy — didn't want it searchable/traceable", tagKey: "hesitation", tagValue: "privacy", next: "stat3" },
      { label: "Wasn't sure where to even start", tagKey: "hesitation", tagValue: "overwhelm", next: "stat3" },
      { label: "Doubted anything would actually help", tagKey: "hesitation", tagValue: "doubt", next: "stat3" },
      { label: "Just hadn't made time for it", tagKey: "hesitation", tagValue: "time", next: "stat3" },
    ],
  },
  q6b: {
    type: "question",
    qNum: 6,
    eyebrow: "Researched a bit",
    question: "What made it hard to actually start?",
    options: [
      { label: "Too much conflicting info out there", tagKey: "hesitation", tagValue: "overwhelm", next: "stat3" },
      { label: "Everything felt gimmicky or scammy", tagKey: "hesitation", tagValue: "doubt", next: "stat3" },
      { label: "Wasn't sure what applied to my situation", tagKey: "hesitation", tagValue: "personalization", next: "stat3" },
    ],
  },
  q6c: {
    type: "question",
    qNum: 6,
    eyebrow: "Tried something",
    question: "What did you try?",
    options: [
      { label: "An app or technique (stop-start, edging, etc.)", tagKey: "tried", tagValue: "technique", next: "stat3" },
      { label: "A product (spray, supplement, etc.)", tagKey: "tried", tagValue: "product", next: "stat3" },
      { label: "Talking to a doctor", tagKey: "tried", tagValue: "doctor", next: "stat3" },
    ],
  },
  stat3: {
    type: "stat",
    heading: "Most approaches fail for the same reason: no structure.",
    body: "A technique without a plan is easy to forget after a week. That's the gap — not that the techniques don't work, but that most guys never get a simple, structured way to actually stick with them.",
    next: "q7",
  },
  q7: {
    type: "question",
    qNum: 7,
    eyebrow: "Priorities",
    question: "What matters most to you right now?",
    dynamic: true,
    next: "q8",
  },
  q8: {
    type: "question",
    qNum: 8,
    eyebrow: "Realistically",
    question: "How much time could you put toward this each week?",
    options: [
      { label: "5 minutes a day, tops", tagKey: "time", tagValue: "minimal", next: "q9" },
      { label: "10–15 minutes a day", tagKey: "time", tagValue: "moderate", next: "q9" },
      { label: "I've got more time than that", tagKey: "time", tagValue: "high", next: "q9" },
    ],
  },
  q9: {
    type: "question",
    qNum: 9,
    eyebrow: "Last one",
    question: "If this wasn't something you thought about anymore, what would change?",
    options: [
      { label: "I'd feel more confident, period", tagKey: "outcome", tagValue: "confidence", next: "stat4" },
      { label: "I'd stop overthinking it in the moment", tagKey: "outcome", tagValue: "presence", next: "stat4" },
      { label: "My relationship would feel easier", tagKey: "outcome", tagValue: "relationship", next: "stat4" },
    ],
  },
  stat4: {
    type: "stat",
    heading: "You've just done the hard part.",
    body: "Most guys never get this far — naming it, even just to a quiz. Based on your answers, we've put together a starting point that matches where you're at.",
    next: "results",
    ctaLabel: "Show me my plan",
  },
  results: { type: "results" },
};

export function getQ7Options(tags) {
  if (tags.context === "no_partner") {
    return [
      { label: "Feeling more in control", tagKey: "goal", tagValue: "control", next: "q8" },
      { label: "Building confidence before I'm with someone next", tagKey: "goal", tagValue: "confidence_ahead", next: "q8" },
      { label: "Just understanding what's actually going on", tagKey: "goal", tagValue: "understanding", next: "q8" },
    ];
  }
  return [
    { label: "Feeling more in control", tagKey: "goal", tagValue: "control", next: "q8" },
    { label: "Better communication with my partner", tagKey: "goal", tagValue: "communication", next: "q8" },
    { label: "Just understanding what's actually going on", tagKey: "goal", tagValue: "understanding", next: "q8" },
  ];
}

const TOTAL_QUESTIONS = 9;

export function questionProgress(stepId) {
  const step = STEPS[stepId];
  if (!step || step.type !== "question") return null;
  return { current: step.qNum, total: TOTAL_QUESTIONS };
}

const HEADLINES = {
  recent: "Your path forward, starting now",
  onoff: "Why it comes and goes — and how to make control the default",
  lifelong: "Why this feels lifelong — and how to finally change it",
};

const SUBHEADLINES = {
  high: "You've told us this weighs on you more than you'd like — that's exactly what the first module is built to address.",
  medium: "It's not constant, but it's there — which makes now a good time to build the habit before it's a bigger deal.",
  low: "You're not deep in it, which makes now a great time to build the habit before it becomes a bigger deal.",
};

const REASSURANCE_BY_HESITATION = {
  privacy: "Delivered as a private download. Nothing recurring, nothing that shows up on a statement with an awkward name.",
  doubt: "No gimmicks — just the same behavioral techniques used in sex therapy, laid out as a simple plan.",
  overwhelm: "One guide, one 90-day structure — not fifty tabs of conflicting advice.",
  personalization: "The plan adapts to your situation instead of assuming everyone's starting point looks the same.",
  time: "Built around 5–15 minutes a day — designed to fit into a full schedule, not compete with it.",
};

const REASSURANCE_BY_TRIED = {
  technique: "You've already found techniques that work — the missing piece is usually structure, not the technique itself.",
  product: "Products can help around the edges, but lasting control comes from training, not something you take.",
  doctor: "Great that you've already looped in a doctor — this guide complements that, going deeper on the behavioral side.",
};

const GOAL_LABELS = {
  control: "feeling more in control",
  communication: "better communication with your partner",
  confidence_ahead: "building confidence before your next relationship",
  understanding: "understanding what's actually going on",
};

export function buildResults(tags) {
  const headline = HEADLINES[tags.timeline] || "Your 90-day plan, built around your answers";
  const subheadline = SUBHEADLINES[tags.impact] || SUBHEADLINES.medium;
  const reassurance =
    REASSURANCE_BY_HESITATION[tags.hesitation] ||
    REASSURANCE_BY_TRIED[tags.tried] ||
    "One guide, one 90-day structure — built to fit into a normal week, not take it over.";
  const goalLine = GOAL_LABELS[tags.goal];

  return { headline, subheadline, reassurance, goalLine };
}

export function buildRecap(tags) {
  const chips = [];
  if (tags.timeline === "recent") chips.push("Recent");
  if (tags.timeline === "onoff") chips.push("On and off");
  if (tags.timeline === "lifelong") chips.push("Long-term");
  if (tags.context === "specific_partner") chips.push("Specific partner");
  if (tags.context === "general") chips.push("Most situations");
  if (tags.context === "no_partner") chips.push("Between partners");
  if (tags.impact === "high") chips.push("Weighs on you a lot");
  if (tags.impact === "medium") chips.push("Sometimes on your mind");
  if (tags.impact === "low") chips.push("Minor, for now");
  if (tags.time === "minimal") chips.push("5 min/day");
  if (tags.time === "moderate") chips.push("10–15 min/day");
  if (tags.time === "high") chips.push("Plenty of time");
  return chips;
}
