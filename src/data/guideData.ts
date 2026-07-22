import { GuideModule, PracticeLogEntry } from '../types';

export const COMPOSURE_MODULES: GuideModule[] = [
  {
    id: 'module-1',
    moduleNumber: 1,
    title: "Understanding What's Actually Happening",
    subtitle: "Physiological & Psychological Foundations",
    description: "Arousal control is a learned skill tied to familiarity and nervous system sensitivity. Discover why changes occur in your 30s and how to break the shame cycle.",
    lessons: [
      {
        id: 'lesson-1-1',
        title: "Lesson 1.1 — Why this shows up, starting in your 30s",
        content: `A few real, well-documented factors tend to converge starting in your 30s, not just after 40. None of them are about masculinity or worth — they're physiological and psychological patterns that respond well to structured practice.

• Nervous system sensitivity and novelty response:
Arousal control is partly a learned skill tied to familiarity and repetition. New relationships, less frequent intimacy due to busier lives, or long gaps between partners can reset that learned control — it is not a sign anything is wrong physically.

• Performance pressure compounds with age and stakes:
As relationships get more serious — marriage, trying to conceive, established partnerships — the psychological weight of "performing well" tends to increase. Anxiety itself is one of the most common drivers of early ejaculation.

• Lifestyle load:
Career stress, parenting, sleep debt, and alcohol all measurably affect the nervous system's arousal regulation. This is physiological, not character-related.

• Hormonal shifts begin gradually in the 30s:
Not suddenly at 40. Testosterone naturally trends downward starting around age 30, which can subtly affect confidence, sensation, and control over time.`,
        keyTakeaways: [
          "It is a physiological & psychological response, not a character flaw.",
          "Nervous system control is a trainable skill.",
          "Stress, lifestyle load, and hormonal shifts compound in your 30s."
        ]
      },
      {
        id: 'lesson-1-2',
        title: "Lesson 1.2 — Debunking the myths that keep men stuck",
        content: `“It's just in my head.”
Partly true — but that's not dismissive. The mind-body connection here is real and trainable, not a character flaw.

“It means I'm not masculine enough.”
One of the most damaging and inaccurate beliefs in this space. Arousal control is a skill, not a measure of worth.

“It's permanent.”
For most men without an underlying medical condition, this responds well to structured practice over weeks, not years.`,
        keyTakeaways: [
          "Mind-body connections can be trained like physical conditioning.",
          "Masculinity is unrelated to arousal timing.",
          "Noticeable progress occurs in weeks with consistent practice."
        ]
      },
      {
        id: 'lesson-1-3',
        title: "Lesson 1.3 — The shame cycle",
        content: `Naming this loop is what starts to break it:

1. Performance anxiety
2. Heightened arousal sensitivity
3. Early finish
4. Shame & avoidance

The entry point for breaking this cycle is almost always awareness and normalization before any technique. Men who understand why it's happening tend to make faster progress than men who jump straight to tactics.`,
        interactiveType: 'shame-cycle',
        keyTakeaways: [
          "Awareness and normalization break the cycle at step 1.",
          "Understanding the 'why' accelerates tactical progress."
        ]
      },
      {
        id: 'lesson-1-4',
        title: "Lesson 1.4 — Setting realistic expectations",
        content: `Progress here is a trend, not a switch. Most men see meaningful improvement in control within 4–8 weeks of consistent practice, with continued gains over 2–3 months. A single “off night” isn't regression — it's noise, not signal.

This guide is educational and not a substitute for medical advice. If this is a new or sudden change, or accompanied by pain or other symptoms, please talk with a doctor.`,
        keyTakeaways: [
          "Look at the 30-day trend, not individual nights.",
          "Consistency over 4–8 weeks creates lasting neuromuscular control."
        ]
      }
    ]
  },
  {
    id: 'module-2',
    moduleNumber: 2,
    title: "The Physical Toolkit",
    subtitle: "Pelvic Floor, Arousal Tracking & Breathing",
    description: "Learn to locate and train pelvic floor muscles, map your 1–10 arousal scale, utilize stop-start/edging techniques, and harness parasympathetic breathing.",
    lessons: [
      {
        id: 'lesson-2-1',
        title: "Lesson 2.1 — Pelvic floor awareness and training",
        content: `The pelvic floor muscles play a direct role in ejaculatory control, and most men have never consciously engaged them. This is often the single most underrated lever in this whole process.

Finding them: next time you urinate, try stopping the stream partway. The muscles doing that work are the ones to train.

• Contract for 3–5 seconds, release for 3–5 seconds
• Build up to 10–15 reps, 2–3 sets a day
• Consistency matters more than intensity — small daily reps compound over weeks

Once the muscle is familiar, it can also be engaged briefly during intimacy at moments of rising arousal to help create a pause.`,
        interactiveType: 'pelvic-timer',
        keyTakeaways: [
          "Engage 3-5 seconds contract, 3-5 seconds release.",
          "Perform 10-15 reps, 2-3 sets daily.",
          "Engage briefly during rising arousal to signal control."
        ]
      },
      {
        id: 'lesson-2-2',
        title: "Lesson 2.2 — Arousal tracking: the stop-start and edging methods",
        content: `The core skill here is learning to notice arousal on something like a 1–10 scale, and recognizing the point past which finishing is no longer optional — often called the point of no return.

Scale: 1 (Low Arousal) ----> 7 (Point of No Return) ----> 10 (Climax)

Stop-start method: Stimulation (solo or partnered) pauses completely as arousal nears that peak, is allowed to subside, then resumes. Repeating this a few times before allowing completion trains the nervous system to tolerate higher arousal without immediately finishing.

Edging is a variation — instead of stopping completely, intensity is reduced just enough to stay under the threshold.

Practicing solo first removes performance pressure and builds awareness that transfers naturally into partnered intimacy later. Progress looks like arousal building gradually and predictably, rather than feeling like a sudden on/off switch.`,
        interactiveType: 'arousal-scale',
        keyTakeaways: [
          "Map arousal from 1 to 10.",
          "Identify your threshold around level 7.",
          "Use stop-start and edging solo first to remove pressure."
        ]
      },
      {
        id: 'lesson-2-3',
        title: "Lesson 2.3 — Breathing and nervous-system regulation",
        content: `Fast, shallow chest breathing is tied to the sympathetic (“fight or flight”) nervous system — the same system involved in anxiety and rushed arousal. Slow, deep breathing activates the parasympathetic system, which supports control.

A simple pattern:
• Inhale through the nose for 4 counts
• Hold for 2 counts
• Exhale slowly for 6–8 counts

Practicing this daily, outside of intimacy, is what makes it available under pressure — it's a skill you're training in advance, not a trick you invent in the moment. In the moment, a few slow breaths as arousal rises can create real space before the peak.`,
        interactiveType: 'breathing',
        keyTakeaways: [
          "Inhale 4s, Hold 2s, Exhale 6-8s.",
          "Shallow chest breathing accelerates arousal; deep abdominal breathing delays it."
        ]
      },
      {
        id: 'lesson-2-4',
        title: "Lesson 2.4 — Lifestyle levers",
        content: `• Alcohol has a mixed effect: it can dull sensation short-term, but regular heavy use tends to worsen control over time. Moderation matters more than total abstinence for most men.
• Sleep debt raises baseline stress hormones and can heighten both sensitivity and anxiety.
• Regular cardiovascular exercise supports nervous-system regulation broadly, not just in this context.

None of these fix things on their own, but each one lowers the baseline difficulty that the other techniques in this module are working against.`,
        keyTakeaways: [
          "Optimize sleep to regulate baseline cortisol.",
          "Moderate alcohol usage.",
          "Maintain regular cardio exercise."
        ]
      }
    ]
  },
  {
    id: 'module-3',
    moduleNumber: 3,
    title: "The Mental Game",
    subtitle: "Deconstructing Performance Anxiety",
    description: "Shift attention from self-monitoring to present sensation, establish pre-intimacy mindset routines, and treat off nights as data rather than verdicts.",
    lessons: [
      {
        id: 'lesson-3-1',
        title: "Lesson 3.1 — How performance anxiety becomes self-fulfilling",
        content: `Worrying about finishing early raises sympathetic activation — the same system tied to rushed arousal — which makes early finishing more likely. Anxiety becomes fuel for the exact outcome it's afraid of.

Loop:
Worry about finishing early -> Sympathetic activation rises -> Arousal accelerates -> Early finish confirms the fear

Simply recognizing this loop while it's happening is the first real interruption point, well before any technique.`,
        interactiveType: 'anxiety-loop',
        keyTakeaways: [
          "Anxiety triggers sympathetic fight-or-flight arousal.",
          "Recognizing the loop in real time stops the cascade."
        ]
      },
      {
        id: 'lesson-3-2',
        title: "Lesson 3.2 — Reframing the moment",
        content: `Shifting internal focus from “am I performing well” to present-moment sensation — what you feel, what your partner feels — pulls attention out of self-monitoring, which is what feeds the anxiety loop.

This isn't just positive thinking. Genuinely redirecting attention away from a running mental scorecard changes the physiological response, not just the mood.`,
        keyTakeaways: [
          "Replace internal scorecards with sensory focus.",
          "Direct attention outward to touch, breath, and connection."
        ]
      },
      {
        id: 'lesson-3-3',
        title: "Lesson 3.3 — Pre-intimacy mindset routines",
        content: `Athletes use short, consistent pre-performance routines to settle the nervous system before high-stakes moments. The same idea applies here: a brief routine before intimacy — a few slow breaths, a moment of physical awareness, deliberately lowering the stakes mentally — signals safety rather than threat.

Catastrophizing self-talk beforehand (“I hope I don't mess this up”) primes the exact anxiety response you're trying to avoid. Neutral or grounding language works better.`,
        keyTakeaways: [
          "Adopt a 2-minute pre-intimacy grounding routine.",
          "Use neutral, steady self-talk instead of high-stakes pressure."
        ]
      },
      {
        id: 'lesson-3-4',
        title: "Lesson 3.4 — Handling a bad night without spiraling",
        content: `One off night is data, not a verdict. Treating it as catastrophic is what feeds the shame cycle described in Module 1.

A practical response: acknowledge it plainly, avoid repeated over-apologizing (which shifts the focus onto your own anxiety rather than the shared moment), and return to normal practice — the way an athlete treats an off game, not a career crisis.`,
        keyTakeaways: [
          "An off night is noise, not signal.",
          "Acknowledge calmly without over-apologizing."
        ]
      }
    ]
  },
  {
    id: 'module-4',
    moduleNumber: 4,
    title: "The Relationship & Communication Layer",
    subtitle: "Connection, Pacing & Mutual Partnership",
    description: "Learn how to talk to a partner without shame, reframe intimacy as a shared journey, and utilize sensate focus techniques.",
    lessons: [
      {
        id: 'lesson-4-1',
        title: "Lesson 4.1 — Talking to a partner about it",
        content: `Most men avoid this conversation entirely, and that avoidance often creates more distance in a relationship than the issue itself ever would.

A framing that tends to land well: brief and matter-of-fact, without turning it into a long confession or apology tour. Naming it plainly, noting that you're actively working on it, and inviting your partner in — rather than shutting the topic down — tends to build trust instead of eroding it.

Timing matters. A calm, low-stakes moment works better than raising it immediately after a difficult night.`,
        interactiveType: 'scripts',
        keyTakeaways: [
          "Keep conversations matter-of-fact and brief.",
          "Discuss during calm, low-stakes daytime moments."
        ]
      },
      {
        id: 'lesson-4-2',
        title: "Lesson 4.2 — Reframing intimacy as a shared experience",
        content: `When all the focus sits on one person's control, intimacy quietly becomes a solo test he's either passing or failing — which raises exactly the performance pressure described in Module 3.

Shifting the frame toward a mutual experience — pacing, extended non-penetrative intimacy, shared exploration — reduces pressure and often improves satisfaction for both partners, independent of how the timing issue itself is progressing.`,
        keyTakeaways: [
          "De-center intercourse as the sole metric of success.",
          "Embrace pacing and extended touch."
        ]
      },
      {
        id: 'lesson-4-3',
        title: "Lesson 4.3 — Rebuilding confidence together",
        content: `Sensate focus exercises, a well-established technique from sex therapy, involve structured touch with no goal of intercourse — refocusing attention on connection instead of performance.

Deliberately extending foreplay as a shared practice, not a workaround, has a similar effect. Simple, non-clinical check-ins during intimacy (rather than silence) keep both partners engaged in the same experience rather than one person quietly monitoring themselves.`,
        keyTakeaways: [
          "Use sensate focus touch exercises.",
          "Maintain gentle non-clinical communication during intimacy."
        ]
      },
      {
        id: 'lesson-4-4',
        title: "Lesson 4.4 — Building ongoing communication habits",
        content: `Regular, low-stakes check-ins outside the bedroom keep this from becoming a taboo subject that only comes up during frustration or after a bad night.

Progress works better as a shared conversation between partners than as something hidden until it's “solved.”`,
        keyTakeaways: [
          "Normalise brief status updates in daily life.",
          "Treat progress as a collaborative team effort."
        ]
      }
    ]
  },
  {
    id: 'module-5',
    moduleNumber: 5,
    title: "Building a Sustainable Routine",
    subtitle: "The 30/60/90-Day Roadmap",
    description: "Construct a structured daily habit loop across 90 days, monitor trends without obsession, and understand medical consultation triggers.",
    lessons: [
      {
        id: 'lesson-5-1',
        title: "Lesson 5.1 — A 30/60/90-day practice structure",
        content: `• Days 1–30 (Foundation):
Daily pelvic floor training, solo stop-start practice, daily breathing practice, brief awareness notes after practice sessions.

• Days 31–60 (Integration):
Bring stop-start and arousal awareness into partnered intimacy, begin the pre-intimacy mindset routine from Module 3, have the first partner conversation if it hasn't happened yet.

• Days 61–90 (Refinement):
Techniques require less conscious effort as they become more automatic; extend sensate-focus-style exercises with a partner; review the overall trend rather than any single night.`,
        interactiveType: 'roadmap',
        keyTakeaways: [
          "Days 1-30: Build physical baseline solo.",
          "Days 31-60: Integrate into partnered intimacy.",
          "Days 61-90: Automate techniques and sustain confidence."
        ]
      },
      {
        id: 'lesson-5-2',
        title: "Lesson 5.2 — Tracking progress without obsessing",
        content: `A simple log noting rough control and mood after practice sessions, reviewed weekly rather than after every single encounter, keeps attention on the trend.

A weekly or monthly review is what prevents the single-bad-night spiral covered in Module 3 — one data point is noise; a month of data points is signal.`,
        interactiveType: 'practice-log',
        keyTakeaways: [
          "Review logs weekly, not immediately after every encounter.",
          "Focus on 30-day directional trends."
        ]
      },
      {
        id: 'lesson-5-3',
        title: "Lesson 5.3 — When to see a doctor, urologist, or therapist",
        content: `A sudden change — previously no issue, now a consistent one — especially alongside pain, blood, or other new symptoms, is a reason to see a doctor rather than continue with self-practice alone.

Certain medications, thyroid conditions, prostate issues, and other physical factors can contribute to this experience and sit outside the scope of a self-guided course.

Persistent anxiety, relationship strain, or a history of trauma connected to this area is often well supported by a sex therapist or licensed counselor. That's a legitimate and common step, not a last resort or sign of failure.`,
        keyTakeaways: [
          "Consult a medical professional if sudden onset or accompanied by physical symptoms.",
          "Sex therapy or counseling is a valuable asset for deep-seated anxiety."
        ]
      },
      {
        id: 'lesson-5-4',
        title: "Lesson 5.4 — Long-term confidence maintenance",
        content: `Treat this as ongoing practice, similar to fitness, rather than a one-time fix. A short weekly maintenance routine — a set of pelvic floor reps, an occasional check-in with a partner — keeps gains stable.

Confidence tends to compound: as control improves, anxiety drops, which further improves control — the same loop from Module 1's shame cycle, now running in the helpful direction.`,
        keyTakeaways: [
          "Maintain weekly light maintenance routines.",
          "Enjoy the positive feedback loop: Control -> Low Anxiety -> Greater Control."
        ]
      }
    ]
  }
];

export const TONIGHT_CHEAT_SHEET = [
  {
    step: 1,
    title: "Pre-Intimacy Reset Breathing",
    detail: "Take 3 slow breaths before things start — in for 4, hold for 2, out for 6–8 counts."
  },
  {
    step: 2,
    title: "Pelvic Floor Engagement",
    detail: "As arousal rises, add a brief, controlled pelvic floor squeeze to regulate nerve signal intensity."
  },
  {
    step: 3,
    title: "Live Stop-Start / Intensity Drop",
    detail: "Near peak (Level 7), pause or reduce movement intensity for a few seconds."
  },
  {
    step: 4,
    title: "Outward Sensory Focus",
    detail: "Shift attention outward to your partner and bodily sensation instead of internal self-monitoring."
  },
  {
    step: 5,
    title: "Calm Response Protocol",
    detail: "If it happens early, respond calmly and stay present. Skip the lengthy apology; it centers anxiety instead of the shared moment."
  }
];

export const PARTNER_SCRIPTS = [
  {
    category: "Low-Key & Direct",
    situation: "Starting the conversation during a calm daytime moment",
    script: "“Hey, I wanted to mention something — nothing dramatic. I've noticed I finish quicker than I'd like sometimes, and I've been working on it. Wanted you to know, not to make it a big thing.”"
  },
  {
    category: "Reassuring & Collaborative",
    situation: "Removing performance pressure and partner self-doubt",
    script: "“This isn't about you at all — it's just something a lot of guys deal with, especially after a while together or after a stretch without much sex. I'm doing some things about it and would love if we could just be relaxed about it together.”"
  },
  {
    category: "Post-Intimacy De-escalation",
    situation: "When an early finish happens during intimacy",
    script: "“If it happens again, I don't need us to stop and process it — I'd rather just keep going and not make it the main event.”"
  }
];

export const INITIAL_PRACTICE_LOGS: PracticeLogEntry[] = [
  {
    id: 'log-101',
    date: '2026-07-21',
    pelvicReps: 15,
    breathingDone: true,
    controlRating: 8,
    notes: 'Completed 3 sets of 5-sec pelvic squeezes. Used 4-2-7 breathing before sleep.'
  },
  {
    id: 'log-102',
    date: '2026-07-20',
    pelvicReps: 12,
    breathingDone: true,
    controlRating: 7,
    notes: 'Solo stop-start session. Reached level 7 threshold three times before completion.'
  },
  {
    id: 'log-103',
    date: '2026-07-18',
    pelvicReps: 10,
    breathingDone: false,
    controlRating: 6,
    notes: 'Busy workday, baseline stress was higher. Noticed rapid heart rate; practiced slow exhales.'
  }
];

export const FAQ_LIST = [
  {
    q: "Does this mean something's wrong with me?",
    a: "No. This is one of the most common physical experiences for men, and for most men without an underlying medical condition, it's a trainable pattern, not a defect."
  },
  {
    q: "Will this happen again even after I improve?",
    a: "Probably, occasionally. Progress here is a trend, not a permanent switch. An off night after weeks of progress is noise, not a sign you're back at the start."
  },
  {
    q: "How long until I actually notice a difference?",
    a: "Most men notice meaningful change in 4–8 weeks of consistent practice, with continued improvement over 2–3 months."
  },
  {
    q: "Should I tell my partner I'm using a guide like this?",
    a: "Entirely up to you. Module 4 covers this in more detail, but many men find that even a brief, low-key mention reduces pressure rather than adding it."
  },
  {
    q: "Is this the same thing as erectile dysfunction?",
    a: "No — this guide is about timing and control, not the ability to get or maintain an erection. They're related areas but distinct issues, and ED has its own evaluation path with a doctor."
  }
];
