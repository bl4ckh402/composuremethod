import React, { createContext, useContext, useState, useCallback, useMemo, useEffect } from 'react';

export type Locale = 'en' | 'fr' | 'it' | 'nl' | 'de';

export interface TestimonialReview {
  name: string;
  age: string;
  role: string;
  rating: number;
  headline: string;
  text: string;
  stat: string;
  date: string;
}

export interface I18nStrings {
  nav: {
    whyItWorks: string;
    theMethod: string;
    curriculum: string;
    reviews: string;
    faq: string;
    memberLogin: string;
    getAccess: string;
    accessGranted: string;
    back: string;
    memberLoginCheck: string;
  };
  selfQualification: {
    headline: string;
    subtext: string;
    forYouTitle: string;
    forYouLabel: string;
    notForYouTitle: string;
    notForYouLabel: string;
    forYouBullets: string[];
    notForYouBullets: string[];
  };
  offer: {
    headline: string;
    subtext: string;
    retailValueLabel: string;
    includedLabel: string;
    totalRetailValue: string;
    todayLabel: string;
    saveToday: string;
    currency: string;
    nonMemberButton: string;
    memberButton: string;
    guaranteeLine: string;
    discreetBillingLine: string;
    instantLine: string;
    oneTimeLine: string;
    disclaimerLine: string;
    items: Array<{
      label: string;
      value: string;
    }>;
  };
  mobileDashboard: {
    memberAccessActive: string;
    dailyTrainingLog: string;
    loggedInAs: string;
    backToHome: string;
    currentStreak: string;
    totalSessions: string;
    weeklyCompletion: string;
    avgControlRating: string;
    logTodayTraining: string;
    whatDidYouTrain: string;
    duration: string;
    controlRating: string;
    notesOptional: string;
    saveTrainingLog: string;
    quickTools: string;
    breathingPacer: string;
    pelvicTrainer: string;
    arousalScale: string;
    clarityProtocol: string;
    recentSessions: string;
    clearHistory: string;
    noLogsYet: string;
    noLogsYetDesc: string;
    trainingMode: string;
    dailyLogger: string;
    streak1: string;
    streakMulti: string;
    streakIncredible: string;
    streakBuilding: string;
    streakFirst: string;
    sessionMin: string;
    saveLogSuccess: string;
    totalValue: string;
    todayPrice: string;
    todaySavings: string;
  };
  hero: {
    headline: string;
    subtext: string;
    ctaPrimary: string;
    ctaSecondary: string;
    guarantee: string;
    discreetBilling: string;
    instantDelivery: string;
    priceBadge: string;
    productImageAlt: string;
    markVideoAria: string;
    muteVideo: string;
    unmuteVideo: string;
    markLabel: string;
  };
  problem: {
    headline: string;
    subtext: string;
    resultLabel: string;
    sprayTitle: string;
    sprayDesc: string;
    sprayResult: string;
    pillTitle: string;
    pillDesc: string;
    pillResult: string;
    distractionTitle: string;
    distractionDesc: string;
    distractionResult: string;
    methodTitle: string;
    methodDesc: string;
    methodResult: string;
    mechanismLabel: string;
    mechanismTitle: string;
    mechanismBody: string;
    mechanismStat: string;
    mechanismContext: string;
  };
  method: {
    headline: string;
    subtext: string;
    ctaHeadline: string;
    ctaBody: string;
    ctaButton: string;
    pillars: Array<{
      title: string;
      tagline: string;
      desc: string;
    }>;
  };
  curriculum: {
    headline: string;
    unlocked: string;
    membersOnly: string;
    subtext: string;
    moduleLocked: string;
    keyLessonsLabel: string;
    viewModuleContent: string;
    freeBonusesLabel: string;
    bonusesHeading: string;
    bonusesBody: string;
    bonus1Label: string;
    bonus2Label: string;
    bonus3Label: string;
    bonus4Label: string;
    bonusesCta: string;
    yourBonusesHeading: string;
    bonusLabelPrefix: string;
    modules: Array<{
      moduleNumber: number;
      title: string;
      description: string;
      lessons: string[];
    }>;
  };
  guarantee: {
    heading: string;
    subheading: string;
    body: string;
    noQuestionsAsked: string;
    keepAllContent: string;
    fullRefund: string;
  };
  faq: {
    heading: string;
    subtitle: string;
    items: Array<{
      q: string;
      a: string;
    }>;
  };
  stickyCta: {
    productTitle: string;
    memberUnlocked: string;
    nonMemberSubtitle: string;
    cta: string;
  };
  checkout: {
    title: string;
    subtitle: string;
    emailLabel: string;
    emailPlaceholder: string;
    productLabel: string;
    secureCheckout: string;
    loadingCopy: string;
    paymentMethods: string;
    acceptedPayment: string;
    fulfillment: string;
    refundPolicy: string;
    discreetBilling: string;
    orderConfirmed: string;
    orderVerified: string;
    successBody: string;
    accessButton: string;
    supportLabel: string;
    pleaseEnterEmail: string;
    closeCheckout: string;
    digitalGuideFallback: string;
    orderVerifiedHeading: string;
    fulfillmentFooter: string;
    submitButton: string;
    includedItems: {
      instantAccess: string;
      moneyBack: string;
    };
  };
  success: {
    title: string;
    body: string;
    accessButton: string;
    supportLabel: string;
  };
  cancel: {
    title: string;
    body: string;
    retryButton: string;
    whatIsWaiting: string;
    returnToOverview: string;
  };
  footer: {
    tagline: string;
    navigation: string;
    legalPolicies: string;
    whyItWorks: string;
    fourPillarSystem: string;
    curriculumBonuses: string;
    verifiedReviews: string;
    faq: string;
    terms: string;
    privacy: string;
    guarantee: string;
    guaranteeBody: string;
    getAccess: string;
    medicalDisclaimer: string;
    medicalDisclaimerBody: string;
    copyright: string;
    encryptedCheckout: string;
  };
  stats: {
    menTrained: string;
    averageRating: string;
    resultsIn30Days: string;
    moneyBackGuarantee: string;
  };
  testimonials: {
    heading: string;
    subtitle: string;
    reviews: Array<{
      name: string;
      age: string;
      role: string;
      rating: number;
      headline: string;
      text: string;
      stat: string;
      date: string;
    }>;
  };
  testimonial: {
    quote: string;
    cite: string;
  };
  languageSwitcher: {
    en: string;
    fr: string;
    it: string;
    nl: string;
    de: string;
  };
  tools: {
    breathing: {
      title: string;
      subtitle: string;
      pillarLabel: string;
      headerTitle: string;
      headerDesc: string;
      audioOn: string;
      audioOff: string;
      startProtocol: string;
      pauseProtocol: string;
      reset: string;
      logSession: string;
      cyclesDone: string;
      elapsedTime: string;
      cortisolImpact: string;
    };
    pelvic: {
      title: string;
      subtitle: string;
      readyToTrain: string;
      squeezeHold: string;
      slowRelease: string;
      beginSet: string;
      pauseTrainer: string;
      reset: string;
      techniqueNote: string;
      techniqueNoteBody: string;
    };
    arousal: {
      title: string;
      subtitle: string;
      interactiveTool: string;
      lessonLabel: string;
      baseline: string;
      pointOfNoReturn: string;
      climax: string;
      recommendedProtocol: string;
    };
    clarity: {
      title: string;
      subtitle: string;
      aiLabel: string;
      generateProtocol: string;
      synthesizing: string;
      clear: string;
      synthesizedProtocol: string;
      recommendedBreathwork: string;
      launchPacer: string;
      tacticalSteps: string;
      awaitingInputs: string;
      awaitingDesc: string;
    };
    journal: {
      title: string;
      subtitle: string;
      recordBaseline: string;
      logBtn: string;
      cancelBtn: string;
      saveBtn: string;
    };
    roadmap: {
      title: string;
      subtitle: string;
      lessonLabel: string;
      days30: string;
      days60: string;
      days90: string;
    };
    scripts: {
      title: string;
      subtitle: string;
      bonusLabel: string;
      copyScript: string;
      copied: string;
      situation: string;
    };
    shameCycle: {
      title: string;
      subtitle: string;
      interactiveDiagram: string;
      lessonLabel: string;
      simulate: string;
      active: string;
      insight: string;
    };
  };
  practiceLog: {
    bonusLabel: string;
    title: string;
    overview30Day: string;
    totalSessions: string;
    pelvicReps: string;
    logToday: string;
    cancel: string;
    saveSession: string;
    loggedEntries: string;
    noLogs: string;
    date: string;
    pelvicFloorReps: string;
    selfRatedControl: string;
    breathingDone: string;
    notes: string;
  };
  memberAccess: {
    title: string;
    subtitle: string;
    emailLabel: string;
    emailPlaceholder: string;
    verifyButton: string;
    verifyingButton: string;
    notPurchased: string;
    discreetVerification: string;
  };
  dashboard: {
    memberAccessActive: string;
    dailyTrainingLog: string;
    loggedInAs: string;
    backToHome: string;
    currentStreak: string;
    totalSessions: string;
    weeklyCompletion: string;
    avgControlRating: string;
    logTodayTraining: string;
    whatDidYouTrain: string;
    duration: string;
    controlRating: string;
    notesOptional: string;
    saveTrainingLog: string;
    quickTools: string;
    breathingPacer: string;
    pelvicTrainer: string;
    arousalScale: string;
    clarityProtocol: string;
    recentSessions: string;
    clearHistory: string;
    noLogsYet: string;
    noLogsYetDesc: string;
    trainingMode: string;
    dailyLogger: string;
    streak1: string;
    streakMulti: string;
    streakIncredible: string;
    streakBuilding: string;
    streakFirst: string;
    sessionMin: string;
    saveLogSuccess: string;
    totalValue: string;
    todayPrice: string;
    todaySavings: string;
  };
}

const translations: Record<Locale, I18nStrings> = {
  en: {
    nav: {
      whyItWorks: 'Why It Works',
      theMethod: 'The Method',
      curriculum: 'Curriculum',
      reviews: 'Reviews',
      faq: 'FAQ',
      memberLogin: 'Member Login',
      getAccess: 'Get Access ($20)',
      accessGranted: 'MEMBER',
      back: 'Back',
      memberLoginCheck: 'Member Login / Check Access',
    },
    hero: {
      headline: 'Master pre-ejaculation control and build lasting stamina.',
      subtext: 'A 4-pillar somatic nervous system framework for men who want natural, reliable control — no pills, no sprays, no awkward tricks.',
      ctaPrimary: 'Get Instant Access — $20',
      ctaSecondary: 'Member Login',
      guarantee: '30-Day Money-Back Guarantee',
      discreetBilling: 'Discreet Billing',
      instantDelivery: 'Instant Digital Delivery',
      priceBadge: '$20 USD',
      productImageAlt: 'The Composure Method Digital Bundle',
      markVideoAria: 'Mark testimonial video',
      muteVideo: 'Mute video',
      unmuteVideo: 'Unmute video',
      markLabel: 'Mark',
    },
    checkout: {
      title: 'Complete Your Order',
      subtitle: 'Enter your email address to initiate a secure checkout session',
      emailLabel: 'YOUR EMAIL FOR INSTANT DIGITAL DELIVERY',
      emailPlaceholder: 'name@example.com',
      productLabel: 'Product',
      secureCheckout: 'SECURE CHECKOUT',
      loadingCopy: 'Opening Checkout...',
      paymentMethods: 'Accepted Payment Methods',
      acceptedPayment: 'Apple Pay, Google Pay, Visa, Mastercard, AMEX',
      fulfillment: 'Instant Fulfillment',
      refundPolicy: '30-Day Refund Policy',
      discreetBilling: 'Discreet Billing',
      orderConfirmed: 'Order Confirmed!',
      orderVerified: 'Payment verified',
      successBody: 'Your digital access details have been sent to your email. If you don\'t see it within a few minutes, please check your spam or junk folder.',
      accessButton: 'Access Your Digital Curriculum & Guides',
      supportLabel: 'Need assistance?',
      pleaseEnterEmail: 'Please enter your email address to continue.',
      includedItems: {
        instantAccess: 'Instant access across all devices, all free bonus playbooks & trackers',
        moneyBack: '30-Day 100% money-back risk-free guarantee',
      },
      closeCheckout: 'Close checkout',
      digitalGuideFallback: 'Digital educational guide',
      orderVerifiedHeading: 'Order Verified — Welcome to Composure',
      fulfillmentFooter: 'Instant Fulfillment • 30-Day Refund Policy • Discreet Billing',
      submitButton: 'Get Instant Access — $20',
    },
    success: {
      title: 'Order verified. Welcome to Composure.',
      body: 'Your digital access details have been sent to your email. If you don\'t see it within a few minutes, please check your spam or junk folder.',
      accessButton: 'Access Your Digital Curriculum & Guides',
      supportLabel: 'Need assistance?',
    },
    cancel: {
      title: 'Checkout Cancelled',
      body: 'Your checkout was not completed. No charge has been made.',
      retryButton: 'Try Again',
      whatIsWaiting: 'What\'s Waiting For You',
      returnToOverview: 'Return to Overview',
    },
    footer: {
      tagline: 'Control & Confidence System',
      navigation: 'NAVIGATION',
      legalPolicies: 'LEGAL & POLICIES',
      whyItWorks: 'Why It Works',
      fourPillarSystem: '4-Pillar System',
      curriculumBonuses: 'Curriculum & Bonuses',
      verifiedReviews: 'Verified Reviews',
      faq: 'FAQ',
      terms: 'Terms of Service',
      privacy: 'Privacy Policy',
      guarantee: '30-DAY GUARANTEE',
      guaranteeBody: '100% risk-free. If you don\'t feel noticeably more in control within 30 days, receive a full refund. No questions asked.',
      getAccess: 'Get Access for $20',
      medicalDisclaimer: 'Medical Disclaimer:',
      medicalDisclaimerBody: 'This guide is educational and does not constitute medical advice or replace consultation with a licensed physician or urologist.',
      copyright: '© 2026 SAVITY LLC / COMPOSURE METHOD. ALL RIGHTS RESERVED.',
      encryptedCheckout: 'ENCRYPTED 256-BIT SSL DIGITAL CHECKOUT',
    },
    stats: {
      menTrained: 'Men Trained',
      averageRating: 'Average Rating',
      resultsIn30Days: 'Report Results in 30 Days',
      moneyBackGuarantee: 'Money-Back Guarantee',
    },
    testimonials: {
      heading: 'What Men Experience With The Composure Method',
      subtitle: 'Read verified feedback from men who applied the 4-pillar neuromuscular and breathwork framework to retrain their autonomic nervous system.',
      reviews: [
        {
          name: 'James H.',
          age: 'Age 35 • Verified Member',
          role: 'High School Teacher, Portland OR',
          rating: 5,
          headline: 'Finally figured out what was actually going on with my body.',
          text: 'I spent two years thinking something was broken with me. The arousal scale in Module 1 helped me understand what was actually happening physiologically instead of what I imagined. The breathing reset technique gave me something concrete to do in the moment instead of spiraling.',
          stat: 'Noticeable Change in 2 Weeks',
          date: 'Purchased March 2026',
        },
        {
          name: 'Daniel N.',
          age: 'Age 42 • Verified Member',
          role: 'Long-Haul Truck Driver, Nashville TN',
          rating: 5,
          headline: 'Kept it in my cab and it actually works.',
          text: 'I am not the type to buy into online programs. But the 5-step reference card had practical stuff I could use immediately. My wife noticed the difference before I did — she said I seemed less tense and more present. The pelvic floor exercises are simple enough to do at rest stops.',
          stat: 'Relationship Improvement',
          date: 'Purchased May 2026',
        },
        {
          name: 'Caleb R.',
          age: 'Age 31 • Verified Member',
          role: 'IT Support Specialist, Minneapolis MN',
          rating: 5,
          headline: 'This is grounded in real physiology, not magic promises.',
          text: 'I nearly cancelled my order three times because every other program selling this is a scam. The science behind the Composure Method is sound — it explains the autonomic nervous system clearly and gives you actual tools, not just theory. The daily checklist kept me consistent.',
          stat: 'Consistent Practice for 30 Days',
          date: 'Purchased April 2026',
        },
        {
          name: 'Omar S.',
          age: 'Age 38 • Verified Member',
          role: 'Restaurant Manager, Houston TX',
          rating: 5,
          headline: 'Gave my partner and me a way to talk about this together.',
          text: 'The hardest part was not the physical issue itself — it was the silence around it. The conversation starters from Bonus #2 opened a door we had both been avoiding. Knowing that this is a common, trainable skill made me feel less alone with it.',
          stat: 'Shared Progress With Partner',
          date: 'Purchased June 2026',
        },
      ],
    },
    languageSwitcher: {
      en: 'English',
      fr: 'Français',
      it: 'Italiano',
      nl: 'Nederlands',
      de: 'Deutsch',
    },
    problem: {
      headline: 'Why Does This Happen in Your 30s — And Why Traditional "Solutions" Fail?',
      subtext: 'Starting in your 30s, lifestyle load, career stress, and subtle hormonal shifts heighten your sympathetic nervous system. When performance pressure enters the equation, arousal accelerates faster than your conscious control can catch it.',
      resultLabel: 'Result',
      sprayTitle: 'Numbing Sprays & Creams',
      sprayDesc: 'Dulls all physical sensation. Turns intimacy into a numb, mechanical chore and often transfers to your partner, ruining mutual pleasure.',
      sprayResult: 'Temporary Fix',
      pillTitle: 'Unapproved Pills & Supplements',
      pillDesc: 'Creates unpredictable side-effects (headaches, flushing). Treats timing as a chemical problem rather than retraining nervous system control.',
      pillResult: 'Side Effects',
      distractionTitle: 'Distraction & Mental Counting',
      distractionDesc: 'Counting backwards or thinking about sports pulls your mind entirely out of the room. Destroys emotional intimacy and fails under high arousal.',
      distractionResult: 'Doesn\'t Address Root Cause',
      methodTitle: 'The Composure Method',
      methodDesc: 'Retrains your pelvic neuromuscular response and parasympathetic nervous system. Builds genuine, natural stamina you retain for life.',
      methodResult: 'Permanent Skill',
      mechanismLabel: 'THE NEURO-PHYSIOLOGICAL MECHANISM',
      mechanismTitle: 'How Retraining Parasympathetic Control Delays Climax Naturally',
      mechanismBody: 'Ejaculation is governed by the autonomic nervous system. When anxiety or fast breathing shifts your body into sympathetic ("fight or flight") mode, nerve impulse velocity speeds up dramatically. By combining 4-2-7 parasympathetic breath exhales with targeted pelvic floor releases, you lower nerve signal pressure and maintain arousal smoothly in the optimal 4–6 range on the 1–10 scale.',
      mechanismStat: '89%',
      mechanismContext: 'of men report noticeable improvement in arousal control within 3 to 4 weeks of daily 10-minute practice.',
    },
    method: {
      headline: 'A Complete, 4-Pillar System For Lasting Control',
      subtext: 'The Composure Method combines physiological education, pelvic conditioning, parasympathetic breathwork, and partner scripts into a simple daily habit loop.',
      ctaHeadline: 'Ready to retrain your nervous system and regain complete bedroom confidence?',
      ctaBody: 'Get immediate access to all Assets + 4 Free Bonuses for $20 (Full Value $197).',
      ctaButton: 'Get Started Now — $20 (Worth $197)',
      pillars: [
        { title: 'Physiological Decoding', tagline: 'Deconstructing the Anxiety & Shame Loop', desc: 'Learn why changes occur in your 30s due to nervous system sensitivity. Normalize the mind-body response to permanently remove performance pressure.' },
        { title: 'Neuromuscular Pelvic Training', tagline: 'The 1–10 Scale & Stop-Start Trainer', desc: 'Map your arousal threshold, identify your Level 7 point of no return, and condition your pelvic muscles to regulate nerve signal intensity.' },
        { title: 'Parasympathetic Breath Control', tagline: '4-2-7 Vagus Nerve Regulation', desc: 'Activate parasympathetic dominance using slow 4-count inhale / 7-count exhale breathwork to calm rapid heart rate and extend timing.' },
        { title: 'Shame-Free Partner Alignment', tagline: 'Word-for-Word Scripts & Pacing', desc: 'Shift intimacy from a solo performance test into a relaxed, shared experience with low-stakes communication frameworks.' },
      ],
    },
    curriculum: {
      headline: 'What You Get Inside The Composure Method',
      unlocked: 'Unlocked',
      membersOnly: 'Members Only',
      viewModuleContent: 'View Module Content',
      subtext: '5 structured digital modules, step-by-step physical protocols, and 4 free instant bonuses designed for rapid, discreet implementation.',
      moduleLocked: 'Members Only',
      keyLessonsLabel: 'Key Lessons:',
      freeBonusesLabel: '4 FREE BONUSES',
      bonusesHeading: 'Instant Action Digital Assets',
      bonusesBody: 'Includes the "Tonight" In-Bed 5-Step Sheet, Partner Communication Playbook, 30/60/90 Progress Roadmap, and AI Assessor.',
      bonus1Label: 'In-Bed 5-Step Quick Sheet ($30 Value)',
      bonus2Label: 'Partner Communication Playbook ($25 Value)',
      bonus3Label: '30/60/90-Day Progress Roadmap ($45 Value)',
      bonus4Label: 'AI Personalization Protocol ($20 Value)',
      bonusesCta: 'Claim All Bonuses for $20',
      yourBonusesHeading: 'Your 4 Free Bonuses — Included Instantly',
      bonusLabelPrefix: 'BONUS #',
      modules: [
        { moduleNumber: 1, title: 'Understanding What\'s Actually Happening', description: 'Arousal control is a learned skill tied to familiarity and nervous system sensitivity. Discover why changes occur in your 30s and how to break the shame cycle.', lessons: ['Lesson 1.1 — Why this shows up, starting in your 30s', 'Lesson 1.2 — Debunking the myths that keep men stuck', 'Lesson 1.3 — The shame cycle', 'Lesson 1.4 — Setting realistic expectations'] },
        { moduleNumber: 2, title: 'The Physical Toolkit', description: 'Learn to locate and train pelvic floor muscles, map your 1–10 arousal scale, utilize stop-start/edging techniques, and harness parasympathetic breathing.', lessons: ['Lesson 2.1 — Pelvic floor awareness and training', 'Lesson 2.2 — Arousal tracking: the stop-start and edging methods', 'Lesson 2.3 — Breathing and nervous-system regulation', 'Lesson 2.4 — Lifestyle levers'] },
        { moduleNumber: 3, title: 'The Mental Game', description: 'Shift attention from self-monitoring to present sensation, establish pre-intimacy mindset routines, and treat off nights as data rather than verdicts.', lessons: ['Lesson 3.1 — How performance anxiety becomes self-fulfilling', 'Lesson 3.2 — Reframing the moment', 'Lesson 3.3 — Pre-intimacy mindset routines', 'Lesson 3.4 — Handling a bad night without spiraling'] },
        { moduleNumber: 4, title: 'The Relationship & Communication Layer', description: 'Learn how to talk to a partner without shame, reframe intimacy as a shared journey, and utilize sensate focus techniques.', lessons: ['Lesson 4.1 — Talking to a partner about it', 'Lesson 4.2 — Reframing intimacy as a shared experience', 'Lesson 4.3 — Rebuilding confidence together', 'Lesson 4.4 — Building ongoing communication habits'] },
        { moduleNumber: 5, title: 'Building a Sustainable Routine', description: 'Construct a structured daily habit loop across 90 days, monitor trends without obsession, and understand medical consultation triggers.', lessons: ['Lesson 5.1 — A 30/60/90-day practice structure', 'Lesson 5.2 — Tracking progress without obsessing', 'Lesson 5.3 — When to see a doctor, urologist, or therapist', 'Lesson 5.4 — Long-term confidence maintenance'] },
      ],
    },
    guarantee: {
      heading: '100% RISK-FREE IRONCLAD GUARANTEE',
      body: 'Try The Composure Method For 30 Full Days — Zero Risk: take a full 30 days to go through the modules, practice the 4-2-7 breathwork, and try the pelvic exercises. If you don\'t notice a significant increase in arousal control, stamina, and bedroom confidence, send us a simple one-line email for a prompt, 100% full refund. No questions asked. You keep the guides as our thanks for giving it an honest try.',
      subheading: '100% RISK-FREE GUARANTEE',
      noQuestionsAsked: 'No Questions Asked',
      keepAllContent: 'Keep All Content',
      fullRefund: 'Full $20 Refund',
    },
    faq: {
      heading: 'Everything You Need To Know',
      subtitle: 'Common questions about discreet billing, instant digital access, and how the program works.',
      items: [
        { q: 'Does this mean something\'s wrong with me?', a: 'No. This is one of the most common physical experiences for men, and for most men without an underlying medical condition, it\'s a trainable pattern, not a defect.' },
        { q: 'Will this happen again even after I improve?', a: 'Probably, occasionally. Progress here is a trend, not a permanent switch. An off night after weeks of progress is noise, not a sign you\'re back at the start.' },
        { q: 'How long until I actually notice a difference?', a: 'Most men notice meaningful change in 4–8 weeks of consistent practice, with continued improvement over 2–3 months.' },
        { q: 'Should I tell my partner I\'m using a guide like this?', a: 'Entirely up to you. Module 4 covers this in more detail, but many men find that even a brief, low-key mention reduces pressure rather than adding it.' },
        { q: 'Is this the same thing as erectile dysfunction?', a: 'No — this guide is about timing and control, not the ability to get or maintain an erection. They\'re related areas but distinct issues, and ED has its own evaluation path with a doctor.' },
      ],
    },
    stickyCta: {
      productTitle: 'The Composure Method Bundle',
      memberUnlocked: 'Lifetime Member Access Active',
      nonMemberSubtitle: '5 Modules + 4 Free Bonuses • Worth $197 (Save $177)',
      cta: 'Get Instant Access ($20)',
    },
    testimonial: {
      quote: 'In an era defined by constant noise, the ComposureMethod provided the architecture I needed to rebuild my focus. It is not just wellness; it is a tactical advantage.',
      cite: 'Sarah Chen — Sr. Operations Lead, Meridian Health',
    },
    tools: {
      breathing: {
        title: 'Cortisol Reduction Breathwork',
        subtitle: 'Synchronize your respiratory rate to stimulate the vagus nerve and immediately reduce serum cortisol levels.',
        pillarLabel: 'PILLAR 01: COGNITIVE RESET',
        headerTitle: 'Cortisol Reduction Breathwork',
        headerDesc: 'Synchronize your respiratory rate to stimulate the vagus nerve and immediately reduce serum cortisol levels.',
        audioOn: 'Audio On',
        audioOff: 'Muted',
        startProtocol: 'Start Protocol',
        pauseProtocol: 'Pause Protocol',
        reset: 'Reset',
        logSession: 'Log Session',
        cyclesDone: 'CYCLES DONE',
        elapsedTime: 'ELAPSED TIME',
        cortisolImpact: 'CORTISOL IMPACT',
      },
      pelvic: {
        title: 'Pelvic Floor Neuromuscular Trainer',
        subtitle: 'Guided trainer with timed contractions and releases.',
        readyToTrain: 'READY TO TRAIN',
        squeezeHold: 'SQUEEZE & HOLD',
        slowRelease: 'SLOW RELEASE',
        beginSet: 'Begin 10-Rep Set',
        pauseTrainer: 'Pause Trainer',
        reset: 'Reset',
        techniqueNote: 'Technique Note:',
        techniqueNoteBody: 'Do not hold your breath during contractions. Maintain smooth, abdominal breathing while gently lifting the pelvic floor upward and inward.',
      },
      arousal: {
        title: 'The 1–10 Arousal Scale & Stop-Start Trainer',
        subtitle: 'Drag the slider to explore how to navigate arousal zones and recognize Level 7 (Point of No Return).',
        interactiveTool: 'INTERACTIVE TOOL · LESSON 2.2',
        lessonLabel: 'INTERACTIVE TOOL · LESSON 2.2',
        baseline: '1 (Baseline)',
        pointOfNoReturn: '⚡ 7 = POINT OF NO RETURN',
        climax: '10 (Climax)',
        recommendedProtocol: 'Recommended Protocol:',
      },
      clarity: {
        title: 'Generate Tactical Protocol',
        subtitle: 'Input your current cognitive & physiological state. The AI Clarity Architect formulates a customized 3-step composure protocol.',
        aiLabel: 'AI CLARITY ARCHITECT',
        generateProtocol: 'Generate Composure Protocol',
        synthesizing: 'Synthesizing Protocol...',
        clear: 'Clear',
        synthesizedProtocol: 'SYNTHESIZED PROTOCOL',
        recommendedBreathwork: 'RECOMMENDED BREATHWORK',
        launchPacer: 'Launch Pacer',
        tacticalSteps: 'TACTICAL STEPS',
        awaitingInputs: 'Awaiting Inputs',
        awaitingDesc: 'Set your stress level and primary stressor on the left, then click Generate to receive your tailored protocol.',
      },
      journal: {
        title: 'Baseline Clarity Journal',
        subtitle: 'Track your daily composure score, physiological stress indicators, and deep focus window metrics.',
        recordBaseline: 'Record Daily Baseline',
        logBtn: 'Log Composure Baseline',
        cancelBtn: 'Cancel',
        saveBtn: 'Save Session to Log',
      },
      roadmap: {
        title: 'The 30 / 60 / 90-Day Execution Roadmap',
        subtitle: 'Track milestones across 3 phases with persistence checks and detailed task breakdowns.',
        lessonLabel: 'ROADMAP TRACKER',
        days30: 'Days 1–30: Foundation Phase',
        days60: 'Days 31–60: Integration Phase',
        days90: 'Days 61–90: Refinement & Mastery',
      },
      scripts: {
        title: 'Partner Communication Scripts',
        subtitle: 'Low-stakes, shame-free frameworks for opening conversations with a partner.',
        bonusLabel: 'BONUS ASSET B · PARTNER SCRIPTS',
        copyScript: 'Copy Script',
        copied: 'Copied to Clipboard',
        situation: 'Situation:',
      },
      shameCycle: {
        title: 'The Shame Cycle & Interruption Mechanics',
        subtitle: 'Interactive diagram showing how the anxiety-shame cycle works and where to interrupt it.',
        interactiveDiagram: 'INTERACTIVE DIAGRAM · LESSON 1.3',
        lessonLabel: 'INTERACTIVE DIAGRAM · LESSON 1.3',
        simulate: 'Simulate Loop Interruption',
        active: 'Awareness Active (Loop Interrupted)',
        insight: 'Key Insight:',
      },
    },
    practiceLog: {
      bonusLabel: 'BONUS ASSET C · PRACTICE LOG',
      title: 'Interactive Practice & Trend Tracker',
      overview30Day: '30-DAY AVG CONTROL',
      totalSessions: 'TOTAL SESSIONS LOGGED',
      pelvicReps: 'PELVIC REPS CUMULATIVE',
      logToday: 'Log Today\'s Practice',
      cancel: 'Cancel',
      saveSession: 'Save Session to Log',
      loggedEntries: 'Logged Entries',
      noLogs: 'No practice logs recorded yet.',
      date: 'Date',
      pelvicFloorReps: 'Pelvic Floor Reps',
      selfRatedControl: 'Self-Rated Control (1–10)',
      breathingDone: 'Completed 4-2-7 Parasympathetic Breathing Reset today',
      notes: 'Notes / Observations',
    },
    memberAccess: {
      title: 'Member Access Verification',
      subtitle: 'Enter the email address you used during checkout to verify your paid order and instantly restore full digital access.',
      emailLabel: 'CUSTOMER EMAIL ADDRESS',
      emailPlaceholder: 'e.g. user@domain.com',
      verifyButton: 'VERIFY PAID ACCESS',
      verifyingButton: 'VERIFYING ORDER...',
      notPurchased: 'Haven\'t purchased yet? Get access for $20.',
      discreetVerification: 'Discreet verification • Instant delivery',
    },
    dashboard: {
      memberAccessActive: 'MEMBER ACCESS ACTIVE',
      dailyTrainingLog: 'Daily Training Log',
      loggedInAs: 'Logged in as',
      backToHome: 'Back to Home',
      currentStreak: 'CURRENT STREAK',
      totalSessions: 'TOTAL SESSIONS',
      weeklyCompletion: 'WEEKLY COMPLETION',
      avgControlRating: 'AVG CONTROL RATING',
      logTodayTraining: 'Log Today\'s Training',
      whatDidYouTrain: 'WHAT DID YOU TRAIN TODAY?',
      duration: 'DURATION',
      controlRating: 'CONTROL RATING',
      notesOptional: 'NOTES (OPTIONAL)',
      saveTrainingLog: 'Save Training Log',
      quickTools: 'Quick Tools',
      breathingPacer: 'Breathing Pacer',
      pelvicTrainer: 'Pelvic Trainer',
      arousalScale: 'Arousal Scale',
      clarityProtocol: 'Clarity Protocol',
      recentSessions: 'Recent Sessions',
      clearHistory: 'Clear History',
      noLogsYet: 'No training logs yet. Log your first session above.',
      noLogsYetDesc: 'No logs yet. Start training above.',
      trainingMode: 'TRAINING MODE',
      dailyLogger: 'Daily Logger',
      streak1: '1 Day Streak',
      streakMulti: ' Day Streak',
      streakIncredible: 'Incredible consistency. Keep it going.',
      streakBuilding: 'Building momentum. Do not break the chain.',
      streakFirst: 'Complete your first session today.',
      sessionMin: ' min',
      saveLogSuccess: '✓ Log saved successfully',
      totalValue: 'TOTAL COMBINED RETAIL VALUE:',
      todayPrice: 'TODAY\'S SPECIAL DISCOUNT PRICE',
      todaySavings: 'Save $177 Today',
    },
    selfQualification: {
      headline: 'Is The Composure Method Right For You?',
      subtext: 'We designed this system specifically for men who prioritize evidence-based physical and mental mastery over false hope.',
      forYouTitle: 'This Is For You If...',
      forYouLabel: 'IDEAL CANDIDATE',
      notForYouTitle: 'This Is NOT For You If...',
      notForYouLabel: 'NOT A FIT',
      forYouBullets: [
        'You\'re a man 30 or older dealing with premature ejaculation or elevated pre-intimacy anxiety.',
        'You want a permanent physical skill — no sprays, creams, or pills.',
        'You can commit 10 minutes a day to discreet pelvic and breathing exercises.',
        'You value discretion: a clean, private digital system accessible on phone or computer.',
      ],
      notForYouBullets: [
        'You\'re looking for an overnight miracle pill: this program retrains muscle memory and requires 4–8 weeks of consistency.',
        'You prefer numbing products: if you like losing all sensation, this program isn\'t for you.',
        'You have serious acute medical symptoms: sudden pain, bleeding, or prostate issues requiring a urologist.',
      ],
    },
    offer: {
      headline: 'Get The Complete Composure System Today',
      subtext: 'Everything you need to master arousal control, pelvic conditioning, and confidence with your partner.',
      retailValueLabel: 'RETAIL VALUE',
      includedLabel: 'DIGITAL ASSETS INCLUDED',
      totalRetailValue: 'TOTAL RETAIL VALUE:',
      todayLabel: 'TODAY\'S SPECIAL PRICE',
      saveToday: 'Save $177 Today',
      currency: 'USD',
      nonMemberButton: 'Claim My Instant Access For $20',
      memberButton: 'Access Your Full Unlocked System',
      guaranteeLine: '100% Risk-Free 30-Day Guarantee',
      discreetBillingLine: 'Discreet Billing ("CM DIGITAL")',
      instantLine: 'Instant Digital Access',
      oneTimeLine: 'One-time payment • No subscription • Instant digital delivery',
      disclaimerLine: '100% risk-free. If you don\'t notice meaningful progress in 30 days, you get a full refund.',
      items: [
        { label: 'The Composure Method 5-Module Master Guide', value: '$97' },
        { label: 'Bonus #1: The "Tonight" In-Bed 5-Step Reference Sheet', value: '$30' },
        { label: 'Bonus #2: Word-for-Word Partner Communication Playbook', value: '$25' },
        { label: 'Bonus #3: 30/60/90-Day Interactive Progress Roadmap & Log', value: '$45' },
      ],
    },
    mobileDashboard: {
      memberAccessActive: 'MEMBER ACCESS ACTIVE',
      dailyTrainingLog: 'Daily Training Log',
      loggedInAs: 'Logged in as',
      backToHome: 'Back to Home',
      currentStreak: 'CURRENT STREAK',
      totalSessions: 'TOTAL SESSIONS',
      weeklyCompletion: 'WEEKLY COMPLETION',
      avgControlRating: 'AVG CONTROL RATING',
      logTodayTraining: 'Log Today\'s Training',
      whatDidYouTrain: 'WHAT DID YOU TRAIN TODAY?',
      duration: 'DURATION',
      controlRating: 'CONTROL RATING',
      notesOptional: 'NOTES (OPTIONAL)',
      saveTrainingLog: 'Save Training Log',
      quickTools: 'Quick Tools',
      breathingPacer: 'Breathing Pacer',
      pelvicTrainer: 'Pelvic Trainer',
      arousalScale: 'Arousal Scale',
      clarityProtocol: 'Clarity Protocol',
      recentSessions: 'Recent Sessions',
      clearHistory: 'Clear History',
      noLogsYet: 'No training logs yet. Log your first session above.',
      noLogsYetDesc: 'No logs yet. Start training above.',
      trainingMode: 'TRAINING MODE',
      dailyLogger: 'Daily Logger',
      streak1: '1 Day Streak',
      streakMulti: ' Day Streak',
      streakIncredible: 'Incredible consistency. Keep it going.',
      streakBuilding: 'Building momentum. Do not break the chain.',
      streakFirst: 'Complete your first session today.',
      sessionMin: ' min',
      saveLogSuccess: '✓ Log saved successfully',
      totalValue: 'TOTAL COMBINED RETAIL VALUE:',
      todayPrice: 'TODAY\'S SPECIAL DISCOUNT PRICE',
      todaySavings: 'Save $177 Today',
    },
  },
  fr: {
    nav: {
      whyItWorks: 'Pourquoi Ça Marche',
      theMethod: 'La Méthode',
      curriculum: 'Programme',
      reviews: 'Avis',
      faq: 'FAQ',
      memberLogin: 'Connexion Membre',
      getAccess: 'Accès Immédiat — 20 $',
      accessGranted: 'MEMBRE',
      back: 'Retour',
      memberLoginCheck: 'Connexion Membre / Vérifier l\'accès',
    },
    hero: {
      headline: 'Maîtrisez le contrôle de la pré-éjaculation et développez une endurance durable.',
      subtext: 'Un cadre de 4 piliers pour le système nerveux somatique, conçu pour les hommes qui veulent un contrôle naturel et fiable — sans pilules, sans sprays, sans astuces gênantes.',
      ctaPrimary: 'Accès Immédiat — 20 $',
      ctaSecondary: 'Connexion Membre',
      guarantee: 'Garantie de Remboursement 30 Jours',
      discreetBilling: 'Facturation Discrète',
      instantDelivery: 'Livraison Numérique Immédiate',
      priceBadge: '20 $ USD',
      productImageAlt: 'Le Pack Méthode Composure Numérique',
      markVideoAria: 'Vidéo témoignage de Mark',
      muteVideo: 'Couper le son',
      unmuteVideo: 'Réactiver le son',
      markLabel: 'Mark',
    },
    checkout: {
      title: 'Finalisez Votre Commande',
      subtitle: 'Entrez votre adresse e-mail pour lancer une session de paiement sécurisée',
      emailLabel: 'VOTRE E-MAIL POUR LA LIVRAISON NUMÉRIQUE IMMÉDIATE',
      emailPlaceholder: 'nom@exemple.com',
      productLabel: 'Produit',
      secureCheckout: 'PAIEMENT SÉCURISÉ',
      loadingCopy: 'Ouverture du paiement...',
      paymentMethods: 'Moyens de Paiement Acceptés',
      acceptedPayment: 'Apple Pay, Google Pay, Visa, Mastercard, AMEX',
      fulfillment: 'Livraison Immédiate',
      refundPolicy: 'Garantie de Remboursement 30 Jours',
      discreetBilling: 'Facturation Discrète',
      orderConfirmed: 'Commande Confirmée !',
      orderVerified: 'Paiement vérifié',
      successBody: 'Vos détails d\'accès numérique ont été envoyés à votre e-mail. Si vous ne les voyez pas dans les quelques minutes qui suivent, vérifiez votre dossier spam ou indésirable.',
      accessButton: 'Accéder à Votre Programme Numérique et Guides',
      supportLabel: 'Besoin d\'aide ?',
      pleaseEnterEmail: 'Veuillez entrer votre adresse e-mail pour continuer.',
      includedItems: {
        instantAccess: 'Accès instantané sur tous les appareils, tous les playbooks et trackers bonus inclus',
        moneyBack: 'Garantie de remboursement de 30 jours, 100% sans risque',
      },
      closeCheckout: 'Fermer le paiement',
      digitalGuideFallback: 'Guide éducatif numérique',
      orderVerifiedHeading: 'Commande Vérifiée — Bienvenue dans Composure',
      fulfillmentFooter: 'Livraison Immédiate • Garantie 30 Jours • Facturation Discrète',
      submitButton: 'Accès Immédiat — 20 $',
    },
    success: {
      title: 'Commande vérifiée. Bienvenue dans Composure.',
      body: 'Vos détails d\'accès numérique ont été envoyés à votre e-mail. Si vous ne les voyez pas dans les quelques minutes qui suivent, vérifiez votre dossier spam ou indésirable.',
      accessButton: 'Accéder à Votre Programme Numérique et Guides',
      supportLabel: 'Besoin d\'aide ?',
    },
    cancel: {
      title: 'Paiement Annulé',
      body: 'Votre paiement n\'a pas été finalisé. Aucun frais n\'a été prélevé.',
      retryButton: 'Réessayer',
      whatIsWaiting: 'Ce Qui Vous Attend',
      returnToOverview: 'Retour à l\'Aperçu',
    },
    footer: {
      tagline: 'Système de Contrôle et Confiance',
      navigation: 'NAVIGATION',
      legalPolicies: 'MENTIONS LÉGALES',
      whyItWorks: 'Pourquoi Ça Marche',
      fourPillarSystem: 'Système 4 Piliers',
      curriculumBonuses: 'Programme et Bonus',
      verifiedReviews: 'Avis Vérifiés',
      faq: 'FAQ',
      terms: 'Conditions Générales',
      privacy: 'Politique de Confidentialité',
      guarantee: 'GARANTIE 30 JOURS',
      guaranteeBody: 'Sans risque à 100 %. Si vous ne ressentez pas une amélioration notable du contrôle en 30 jours, obtenez un remboursement intégral. Sans question.',
      getAccess: 'Accès pour 20 $',
      medicalDisclaimer: 'Avertissement Médical :',
      medicalDisclaimerBody: 'Ce guide est éducatif et ne constitue pas un avis médical ni ne remplace une consultation avec un médecin ou un urologue agréé.',
      copyright: '© 2026 SAVITY LLC / COMPOSURE METHOD. TOUS DROITS RÉSERVÉS.',
      encryptedCheckout: 'PAIEMENT NUMÉRIQUE SSL 256 BITS CHIFFRÉ',
    },
    stats: {
      menTrained: 'Hommes Formés',
      averageRating: 'Note Moyenne',
      resultsIn30Days: 'Résultats en 30 Jours',
      moneyBackGuarantee: 'Garantie Remboursement',
    },
    testimonials: {
      heading: 'Ce Que les Hommes Vivent Avec La Méthode Composure',
      subtitle: 'Lisez les retours vérifiés d\'hommes qui ont appliqué le cadre neuromusculaire et respiratoire à 4 piliers pour rééduquer leur système nerveux autonome.',
      reviews: [
        {
          name: 'James H.',
          age: '35 ans • Membre Vérifié',
          role: 'Enseignant, Portland OR',
          rating: 5,
          headline: 'J\'ai enfin compris ce qui se passait vraiment avec mon corps.',
          text: 'J\'ai passé deux ans à me dire que quelque chose n\'allait pas chez moi. L\'échelle d\'arousal du Module 1 m\'a aidé à comprendre ce qui se passait physiologiquement au lieu de ce que j\'imaginais. La technique de respiration de réinitialisation m\'a donné quelque chose de concret à faire dans l\'instant au lieu de paniquer.',
          stat: 'Changement Visible en 2 Semaines',
          date: 'Acheté en mars 2026',
        },
        {
          name: 'Daniel N.',
          age: '42 ans • Membre Vérifié',
          role: 'Chauffeur Poids Lourd, Nashville TN',
          rating: 5,
          headline: 'Je l\'ai gardé dans mon camion et ça marche vraiment.',
          text: 'Je ne suis pas le genre à acheter des programmes en ligne. Mais la carte de référence en 5 étapes contenait des choses pratiques que je pouvais utiliser immédiatement. Ma femme a remarqué la différence avant moi — elle a dit que j\'avais l\'air moins tendu et plus présent. Les exercices du plancher pelvien sont assez simples pour les faire aux arrêts.',
          stat: 'Amélioration du Couple',
          date: 'Acheté en mai 2026',
        },
        {
          name: 'Caleb R.',
          age: '31 ans • Membre Vérifié',
          role: 'Support Informatique, Minneapolis MN',
          rating: 5,
          headline: 'C\'est ancré dans la physiologie réelle, pas dans des promesses magiques.',
          text: 'J\'ai failli annuler ma commande trois fois parce que tous les autres programmes qui vendent ça sont des arnaques. La science derrière la Méthode Composure est solide — elle explique le système nerveux autonome clairement et vous donne de vrais outils, pas juste de la théorie. La liste de contrôle quotidienne m\'a aidé à rester régulier.',
          stat: 'Pratique Régulière depuis 30 Jours',
          date: 'Acheté en avril 2026',
        },
        {
          name: 'Omar S.',
          age: '38 ans • Membre Vérifié',
          role: 'Chef de Restaurant, Houston TX',
          rating: 5,
          headline: 'A donné à ma partenaire et moi un moyen d\'en parler ensemble.',
          text: 'Le plus difficile n\'était pas le problème physique lui-même — c\'était le silence autour de ça. Les amorces de conversation du Bonus #2 ont ouvert une porte que nous évitions tous les deux. Savoir que c\'est une compétence commune et travaillable m\'a fait me sentir moins seul avec ça.',
          stat: 'Progrès Partagé Avec le Partenaire',
          date: 'Acheté en juin 2026',
        },
      ],
    },
    problem: {
      headline: 'Pourquoi Ça Arrive Dans Votre Trentaine — Et Pourquoi Les "Solutions" Traditionnelles Échouent ?',
      subtext: 'À partir de la trentaine, le stress professionnel, la charge de vie et de subtils changements hormonaux activent votre système nerveux sympathique. Quand la pression de performance s\'en mêle, l\'excitation s\'emballe plus vite que votre contrôle conscient ne peut le suivre.',
      resultLabel: 'Résultat',
      sprayTitle: 'Sprays et Crèmes Anesthésiants',
      sprayDesc: 'Supprime toute sensation physique. Transforme l\'intimité en une tâche mécanique et insensible, et se transmet parfois au partenaire.',
      sprayResult: 'Solution Temporaire',
      pillTitle: 'Pilules et Suppléments Non Approuvés',
      pillDesc: 'Provoque des effets secondaires imprévisibles. Traite le timing comme un problème chimique au lieu de rééduquer le contrôle nerveux.',
      pillResult: 'Effets Secondaires',
      distractionTitle: 'Distraction et Compte Mental',
      distractionDesc: 'Penser à autre chose vous sort complètement de l\'instant. Détruit l\'intimité émotionnelle et échoue sous forte excitation.',
      distractionResult: 'Ne Traite Pas La Cause Racine',
      methodTitle: 'La Méthode Composure',
      methodDesc: 'Rééduque la réponse neuromusculaire pelvienne et le système nerveux parasympathique. Construit une endurance naturelle et durable.',
      methodResult: 'Compétence Permanente',
      mechanismLabel: 'LE MÉCANISME NEUROPHYSIOLOGIQUE',
      mechanismTitle: 'Comment La Rééducation Du Contrôle Parasympathique Retarde L\'éjaculation Naturellement',
      mechanismBody: 'L\'éjaculation est gouvernée par le système nerveux autonome. Quand l\'anxiété ou une respiration rapide bascule votre corps en mode sympathique, la vélocité des impulsions nerveuses augmente dramatiquement. En combinant des expirations parasympathiques 4-2-7 avec des relâchements pelviens ciblés, vous réduisez la pression du signal nerveux et maintenez l\'excitation dans la zone optimale 4–6.',
      mechanismStat: '89 %',
      mechanismContext: 'des hommes constatent une amélioration notable du contrôle en 3 à 4 semaines de pratique quotidienne de 10 minutes.',
    },
    method: {
      headline: 'Un Système Complet À 4 Piliers Pour Un Contrôle Durable',
      subtext: 'La Méthode Composure associe éducation physiologique, conditionnement pelvien, travail respiratoire parasympathique et scripts de couple en une simple routine quotidienne.',
      ctaHeadline: 'Prêt à rééduquer votre système nerveux et retrouver une confiance totale ?',
      ctaBody: 'Accédez immédiatement à tous les contenus + 4 bonus pour 20 $ (valeur 197 $).',
      ctaButton: 'Commencer Maintenant — 20 $ (valeur 197 $)',
      pillars: [
        { title: 'Décodage Physiologique', tagline: 'Déconstruire Le Cycle Anxiété-Honte', desc: 'Comprenez pourquoi des changements surviennent dans votre trentaine à cause de la sensibilité du système nerveux. Normalisez la réponse corps-esprit pour éliminer définitivement la pression de performance.' },
        { title: 'Entraînement Neuromusculaire Pelvien', tagline: 'L\'échelle 1-10 & L\'entraînement Stop-Start', desc: 'Cartographiez votre seuil d\'excitation, identifiez votre point de non-retour au niveau 7, et conditionnez vos muscles pelviens pour réguler l\'intensité du signal nerveux.' },
        { title: 'Contrôle Respiratoire Parasympathique', tagline: 'Régulation Du Nerf Vague 4-2-7', desc: 'Activez la dominance parasympathique en utilisant une breathwork lente avec inspiration 4 temps / expiration 7 temps pour calmer le rythme cardiaque rapide et prolonger le timing.' },
        { title: 'Alignement Partenaire Sans Honte', tagline: 'Scripts Mot Pour Mot & Rythme', desc: 'Transformez l\'intimité d\'un test de performance solo en une expérience partagée et détendue grâce à des cadres de communication à faible enjeu.' },
      ],
    },
    curriculum: {
      headline: 'Ce Que Vous Obtenez Avec La Méthode Composure',
      subtext: '5 modules numériques structurés, protocoles physiques pas-à-pas et 4 bonus instantanés conçus pour une mise en œuvre rapide et discrète.',
      moduleLocked: 'Membres Uniquement',
      keyLessonsLabel: 'Leçons Clés :',
      viewModuleContent: 'Voir Le Contenu Du Module',
      freeBonusesLabel: '4 BONUS GRATUITS',
      bonusesHeading: 'Actifs Numériques Actionnables',
      bonusesBody: 'Inclut la fiche "Tonight", le playbook de communication de couple, la feuille de route 30/60/90 et l\'assesseur IA.',
      bonus1Label: 'Fiche Rapide "Tonight" (valeur 30 $)',
      bonus2Label: 'Playbook De Communication De Couple (valeur 25 $)',
      bonus3Label: 'Feuille De Route 30/60/90 (valeur 45 $)',
      bonus4Label: 'Protocole IA Personnalisé (valeur 20 $)',
      bonusesCta: 'Réclamer Tous Les Bonus Pour 20 $',
      yourBonusesHeading: 'Vos 4 Bonus Gratuits — Inclus Instantanément',
      bonusLabelPrefix: 'BONUS #',
      unlocked: 'Débloqué',
      membersOnly: 'Réservé Aux Membres',
      modules: [
        { moduleNumber: 1, title: 'Comprendre Ce Qui Se Passe Réellement', description: 'Le contrôle de l\'excitation est une compétence apprise liée à la familiarité et à la sensibilité du système nerveux. Découvrez pourquoi des changements surviennent dans votre trentaine et comment briser le cycle de la honte.', lessons: ['Leçon 1.1 — Pourquoi ça apparaît, dès la trentaine', 'Leçon 1.2 — Démystifier les mythes qui gardent les hommes bloqués', 'Leçon 1.3 — Le cycle de la honte', 'Leçon 1.4 — Fixer des attentes réalistes'] },
        { moduleNumber: 2, title: 'La Boîte À Outils Physique', description: 'Apprenez à localiser et entraîner les muscles du plancher pelvien, cartographier votre échelle d\'excitation 1-10, utiliser les techniques stop-start/edging, et exploiter la respiration parasympathique.', lessons: ['Leçon 2.1 — Conscience et entraînement du plancher pelvien', 'Leçon 2.2 — Suivi de l\'excitation : les méthodes stop-start et edging', 'Leçon 2.3 — Respiration et régulation du système nerveux', 'Leçon 2.4 — Leviers de mode de vie'] },
        { moduleNumber: 3, title: 'Le Mental', description: 'Déplacez l\'attention de l\'auto-surveillance vers les sensations présentes, établissez des routines de préparation mentale avant l\'intimité, et traitez les soirées ratées comme des données plutôt que des verdicts.', lessons: ['Leçon 3.1 — Comment l\'anxiété de performance devient une prophétie auto-réalisatrice', 'Leçon 3.2 — Redéfinir le moment', 'Leçon 3.3 — Routines mentales pré-intimité', 'Leçon 3.4 — Gérer une mauvaise soirée sans sombrer'] },
        { moduleNumber: 4, title: 'La Couple & Communication', description: 'Apprenez à parler à un partenaire sans honte, redéfinissez l\'intimité comme un voyage partagé, et utilisez les techniques de focus sensoriel.', lessons: ['Leçon 4.1 — Parler à un partenaire de ça', 'Leçon 4.2 — Redéfinir l\'intimité comme une expérience partagée', 'Leçon 4.3 — Reconstruire la confiance ensemble', 'Leçon 4.4 — Développer des habitudes de communication continues'] },
        { moduleNumber: 5, title: 'Construire Une Routine Durable', description: 'Construisez une boucle d\'habitude quotidienne structurée sur 90 jours, surveillez les tendances sans obsession, et comprenez les déclencheurs de consultation médicale.', lessons: ['Leçon 5.1 — Une structure de pratique 30/60/90 jours', 'Leçon 5.2 — Suivre les progrès sans obsession', 'Leçon 5.3 — Quand consulter un médecin, un urologue ou un thérapeute', 'Leçon 5.4 — Maintenance de la confiance à long terme'] },
      ],
    },
    guarantee: {
      heading: 'ESSAYEZ LA MÉTHODE COMPOSURE PENDANT 30 JOURS COMPLETS — ZERO RISQUE',
      subheading: 'GARANTIE 100 % SANS RISQUE',
      body: 'Prenez 30 jours complets pour parcourir les modules, pratiquer le breathwork 4-2-7 et essayer les exercices pelviens. Si vous ne constatez pas d\'amélioration notable du contrôle, de l\'endurance et de votre confiance, envoyez-nous un simple e-mail pour un remboursement intégral et immédiat. Sans question. Vous gardez les guides.',
      noQuestionsAsked: 'Sans Question',
      keepAllContent: 'Gardez Tout Le Contenu',
      fullRefund: 'Remboursement Intégral 20 $',
    },
    selfQualification: {
      headline: 'La Méthode Composure Est-Elle Fait Pour Vous ?',
      subtext: 'Nous avons conçu ce système spécialement pour les hommes qui privilégient la maîtrise physique et mentale fondée sur des preuves aux faux espoirs.',
      forYouTitle: 'Ceci Est Fait Pour Vous Si...',
      forYouLabel: 'CANDIDAT IDÉAL',
      notForYouTitle: 'Ceci N\'Est PAS Fait Pour Vous Si...',
      notForYouLabel: 'CAS NON CONFORMES',
      forYouBullets: [
        'Vous êtes un homme de 30 ans ou plus, confronté à une éjaculation trop rapide ou à une anxiété pré-intime élevée.',
        'Vous voulez une compétence physique permanente, sans sprays, crèmes ou pilules.',
        'Vous pouvez consacrer 10 minutes par jour à des exercices pelviens et respiratoires discrets.',
        'Vous valorisez la discrétion : un système numérique propre et privé, accessible sur téléphone ou ordinateur.',
      ],
      notForYouBullets: [
        'Vous cherchez une pilule miracle nocturne : ce programme rééduque la mémoire musculaire et demande 4 à 8 semaines de régularité.',
        'Vous préférez les produits anesthésiants : si vous aimez perdre toute sensation, ce programme n\'est pas fait pour vous.',
        'Vous présentez des symptômes médicaux aigus graves : douleur soudaine, saignement ou problèmes de prostate nécessitant un urologue.',
      ],
    },
    offer: {
      headline: 'Obtenez Le Système Composure Complet Aujourd\'hui',
      subtext: 'Tout ce dont vous avez besoin pour maîtriser le contrôle de l\'excitation, le conditionnement pelvien et la confiance en couple.',
      retailValueLabel: 'VALEUR COMMERCIALE',
      includedLabel: 'ACTIFS NUMÉRIQUES INCLUS',
      totalRetailValue: 'VALEUR RÉTABLIE TOTALE :',
      todayLabel: 'PRIX SPÉCIAL DU JOUR',
      saveToday: 'Économisez 177 $ Aujourd\'hui',
      currency: 'USD',
      nonMemberButton: 'Réclamer Mon Accès Instantané Pour 20 $',
      memberButton: 'Accéder Au Système Débloqué Complet',
      guaranteeLine: 'Garantie Sans Risque 100 % 30 Jours',
      discreetBillingLine: 'Facturation Discrète ("CM DIGITAL")',
      instantLine: 'Accès Numérique Instantané',
      oneTimeLine: 'Paiement unique • Pas d\'abonnement • Livraison numérique instantanée',
      disclaimerLine: '100 % sans risque. Si vous ne constatez pas de progrès notable en 30 jours, vous êtes intégralement remboursé.',
      items: [
        { label: 'Le Guide Maître 5 Modules De La Méthode Composure', value: '97 $' },
        { label: 'Bonus #1 : La Fiche De Référence "Tonight" En 5 Étapes', value: '30 $' },
        { label: 'Bonus #2 : Le Playbook De Communication De Couple Mot Pour Mot', value: '25 $' },
        { label: 'Bonus #3 : La Feuille De Route Interactive 30/60/90 Jours', value: '45 $' },
      ],
    },
    faq: {
      heading: 'Tout Ce Que Vous Devez Savoir',
      subtitle: 'Questions fréquentes sur la facturation discrète, l\'accès numérique instantané et le fonctionnement du programme.',
      items: [
        { q: 'Est-ce que ça veut dire qu\'il y a quelque chose qui ne va pas chez moi ?', a: 'Non. C\'est l\'une des expériences physiques les plus courantes chez les hommes, et pour la plupart des hommes sans condition médicale sous-jacente, c\'est un pattern entraînable, pas un défaut.' },
        { q: 'Est-ce que ça va revenir même après avoir progressé ?', a: 'Probablement, occasionnellement. Le progrès est une tendance, pas un interrupteur permanent. Une soirée ratée après des semaines de progrès est du bruit, pas un signe que vous êtes revenu au point de départ.' },
        { q: 'Combien de temps avant de remarquer une différence ?', a: 'La plupart des hommes remarquent un changement significatif en 4 à 8 semaines de pratique régulière, avec une amélioration continue sur 2 à 3 mois.' },
        { q: 'Dois-je dire à mon partenaire que j\'utilise un guide comme celui-ci ?', a: 'Entièrement à vous de décider. Le Module 4 couvre cela plus en détail, mais beaucoup d\'hommes trouvent que même une mention brève et discrète réduit la pression plutôt que de l\'ajouter.' },
        { q: 'Est-ce la même chose que la dysfonction érectile ?', a: 'Non — ce guide porte sur le timing et le contrôle, pas sur la capacité à obtenir ou maintenir une érection. Ce sont des domaines liés mais distincts, et la DE a son propre parcours d\'évaluation chez un médecin.' },
      ],
    },
    stickyCta: {
      productTitle: 'Le Pack Méthode Composure',
      memberUnlocked: 'Accès Membre À Vie Actif',
      nonMemberSubtitle: '5 Modules + 4 Bonus • Valeur 197 $',
      cta: 'Accès Instantané (20 $)',
    },
    tools: {
      breathing: {
        title: 'Breathwork De Réduction Du Cortisol',
        subtitle: 'Synchronisez votre respiration pour stimuler le nerf vague et réduire immédiatement le cortisol sérique.',
        pillarLabel: 'PILIER 01 : RESET COGNITIF',
        headerTitle: 'Breathwork De Réduction Du Cortisol',
        headerDesc: 'Synchronisez votre respiration pour stimuler le nerf vague et réduire immédiatement le cortisol sérique.',
        audioOn: 'Audio Activé',
        audioOff: 'Muet',
        startProtocol: 'Démarrer Le Protocole',
        pauseProtocol: 'Mettre En Pause',
        reset: 'Réinitialiser',
        logSession: 'Enregistrer La Session',
        cyclesDone: 'CYCLES EFFECTUÉS',
        elapsedTime: 'TEMPS ÉCOULÉ',
        cortisolImpact: 'IMPACT CORTISOL',
      },
      pelvic: {
        title: 'Entraîneur Neuromusculaire Du Plancher Pelvien',
        subtitle: 'Entraîneur guidé avec contractions et relâchements chronométrés.',
        readyToTrain: 'PRÊT À S\'ENTRAÎNER',
        squeezeHold: 'SERRER ET TENIR',
        slowRelease: 'RELÂCHER LENTEMENT',
        beginSet: 'Commencer La Série De 10',
        pauseTrainer: 'Mettre En Pause',
        reset: 'Réinitialiser',
        techniqueNote: 'Remarque Technique :',
        techniqueNoteBody: 'Ne retenez pas votre respiration pendant les contractions. Maintenez une respiration abdominale douce tout en soulevant doucement le plancher pelvien vers le haut et l\'intérieur.',
      },
      arousal: {
        title: 'L\'échelle D\'excitation 1-10 Et Entraînement Stop-Start',
        subtitle: 'Faites glisser le curseur pour découvrir comment naviguer dans les zones d\'excitation et reconnaître le niveau 7.',
        interactiveTool: 'OUTIL INTERACTIF • LEÇON 2.2',
        lessonLabel: 'OUTIL INTERACTIF • LEÇON 2.2',
        baseline: '1 (Ligne De Base)',
        pointOfNoReturn: '⚡ 7 = POINT DE NON-RETOUR',
        climax: '10 (Paroxysme)',
        recommendedProtocol: 'Protocole Recommandé :',
      },
      clarity: {
        title: 'Générer Un Protocole Tactique',
        subtitle: 'Entrez votre état cognitif et physiologique actuel. L\'Architecte De Clarity IA formule un protocole personnalisé en 3 étapes.',
        aiLabel: 'ARCHITECTE DE CLARTÉ IA',
        generateProtocol: 'Générer Le Protocole Composure',
        synthesizing: 'Synthèse Du Protocole...',
        clear: 'Effacer',
        synthesizedProtocol: 'PROTOCOLE SYNTHÉTISÉ',
        recommendedBreathwork: 'BREATHWORK RECOMMANDÉ',
        launchPacer: 'Lancer Le Pacemaker',
        tacticalSteps: 'ÉTAPES TACTIQUES',
        awaitingInputs: 'En Attente D\'entrées',
        awaitingDesc: 'Indiquez votre niveau de stress et votre facteur de stress principal, puis cliquez sur Générer.',
      },
      journal: {
        title: 'Journal De Clarté De Référence',
        subtitle: 'Suivez votre score quotidien de calme, vos indicateurs de stress physiologique et vos plages de concentration.',
        recordBaseline: 'Enregistrer La Baseline Quotidienne',
        logBtn: 'Journaliser La Baseline',
        cancelBtn: 'Annuler',
        saveBtn: 'Enregistrer La Session',
      },
      roadmap: {
        title: 'La Feuille De Route D\'exécution 30 / 60 / 90 Jours',
        subtitle: 'Suivez les jalons sur 3 phases avec contrôles de persévérance.',
        lessonLabel: 'SUIVI FEUILLE DE ROUTE',
        days30: 'Jours 1–30 : Phase Fondamentale',
        days60: 'Jours 31–60 : Phase D\'intégration',
        days90: 'Jours 61–90 : Affinement & Maîtrise',
      },
      scripts: {
        title: 'Scripts De Communication Avec Le Partenaire',
        subtitle: 'Cadres simples et sans honte pour ouvrir la conversation.',
        bonusLabel: 'ATOUT BONUS B • SCRIPTS PARTENAIRE',
        copyScript: 'Copier Le Script',
        copied: 'Copié Dans Le Presse-papiers',
        situation: 'Situation :',
      },
      shameCycle: {
        title: 'Le Cycle De La Honte Et Mécanismes D\'interruption',
        subtitle: 'Schéma interactif montrant le cycle anxiété-honte et où l\'interrompre.',
        interactiveDiagram: 'SCHÉMA INTERACTIF • LEÇON 1.3',
        lessonLabel: 'SCHÉMA INTERACTIF • LEÇON 1.3',
        simulate: 'Simuler L\'interruption Du Cycle',
        active: 'Conscience Active (Cycle Interrompu)',
        insight: 'Point Clé :',
      },
    },
    practiceLog: {
      bonusLabel: 'ATOUT BONUS C • JOURNAL D\'ENTRAÎNEMENT',
      title: 'Suivi D\'entraînement Et De Tendances',
      overview30Day: 'CONTRÔLE MOYEN 30 JOURS',
      totalSessions: 'SESSIONS ENREGISTRÉES',
      pelvicReps: 'RÉPÉTITIONS PELVIENNES',
      logToday: 'Journaliser La Session Du Jour',
      cancel: 'Annuler',
      saveSession: 'Enregistrer La Session',
      loggedEntries: 'Entrées Journalisées',
      noLogs: 'Aucune session d\'entraînement enregistrée pour le moment.',
      date: 'Date',
      pelvicFloorReps: 'Répétitions Du Plancher Pelvien',
      selfRatedControl: 'Contrôle Auto-évalué (1–10)',
      breathingDone: 'Reset respiratoire parasympathique 4-2-7 effectué aujourd\'hui',
      notes: 'Notes / Observations',
    },
    memberAccess: {
      title: 'Vérification D\'accès Membre',
      subtitle: 'Entrez l\'adresse e-mail utilisée lors de la commande pour vérifier votre accès payant et restaurer instantanément l\'accès complet.',
      emailLabel: 'E-MAIL CLIENT',
      emailPlaceholder: 'p. ex. utilisateur@domaine.com',
      verifyButton: 'VÉRIFIER L\'ACCÈS PAYANT',
      verifyingButton: 'VÉRIFICATION EN COURS...',
      notPurchased: 'Pas encore acheté ? Accédez pour 20 $.',
      discreetVerification: 'Vérification discrète • Accès instantané',
    },
    dashboard: {
      memberAccessActive: 'ACCÈS MEMBRE ACTIF',
      dailyTrainingLog: 'Journal D\'entraînement Quotidien',
      loggedInAs: 'Connecté en tant que',
      backToHome: 'Retour À L\'accueil',
      currentStreak: 'SÉRIE ACTUELLE',
      totalSessions: 'SESSIONS TOTALES',
      weeklyCompletion: 'COMPLETION HEBDOMADAIRE',
      avgControlRating: 'NOTE MOYENNE DE CONTRÔLE',
      logTodayTraining: 'Journaliser L\'entraînement Du Jour',
      whatDidYouTrain: 'QU\'AVEZ-VOUS ENTRAÎNÉ AUJOURD\'HUI ?',
      duration: 'DURÉE',
      controlRating: 'NOTE DE CONTRÔLE',
      notesOptional: 'NOTES (OPTIONNEL)',
      saveTrainingLog: 'Enregistrer Le Journal',
      quickTools: 'Outils Rapides',
      breathingPacer: 'Pacemaker Respiratoire',
      pelvicTrainer: 'Entraîneur Pelvien',
      arousalScale: 'Échelle D\'excitation',
      clarityProtocol: 'Protocole Clarity',
      recentSessions: 'Sessions Récentes',
      clearHistory: 'Effacer L\'historique',
      noLogsYet: 'Aucune session d\'entraînement pour le moment. Journalisez votre première session ci-dessus.',
      noLogsYetDesc: 'Pas encore de journal. Commencez à vous entraîner ci-dessus.',
      trainingMode: 'MODE ENTRAÎNEMENT',
      dailyLogger: 'Journal Quotidien',
      streak1: 'Série De 1 Jour',
      streakMulti: ' Jours De Série',
      streakIncredible: 'Constance incroyable. Continuez comme ça.',
      streakBuilding: 'Vous prenez de l\'élan. Ne rompez pas la chaîne.',
      streakFirst: 'Complétez votre première session aujourd\'hui.',
      sessionMin: ' min',
      saveLogSuccess: '✓ Journal enregistré avec succès',
      totalValue: 'VALEUR RÉTABLIE TOTALE :',
      todayPrice: 'PRIX SPÉCIAL DU JOUR',
      todaySavings: 'Économisez 177 $ Aujourd\'hui',
    },
    mobileDashboard: {
      memberAccessActive: 'ACCÈS MEMBRE ACTIF',
      dailyTrainingLog: 'Journal D\'entraînement Quotidien',
      loggedInAs: 'Connecté en tant que',
      backToHome: 'Retour À L\'accueil',
      currentStreak: 'SÉRIE ACTUELLE',
      totalSessions: 'SESSIONS TOTALES',
      weeklyCompletion: 'COMPLETION HEBDOMADAIRE',
      avgControlRating: 'NOTE MOYENNE DE CONTRÔLE',
      logTodayTraining: 'Journaliser L\'entraînement Du Jour',
      whatDidYouTrain: 'QU\'AVEZ-VOUS ENTRAÎNÉ AUJOURD\'HUI ?',
      duration: 'DURÉE',
      controlRating: 'NOTE DE CONTRÔLE',
      notesOptional: 'NOTES (OPTIONNEL)',
      saveTrainingLog: 'Enregistrer Le Journal',
      quickTools: 'Outils Rapides',
      breathingPacer: 'Pacemaker Respiratoire',
      pelvicTrainer: 'Entraîneur Pelvien',
      arousalScale: 'Échelle D\'excitation',
      clarityProtocol: 'Protocole Clarity',
      recentSessions: 'Sessions Récentes',
      clearHistory: 'Effacer L\'historique',
      noLogsYet: 'Aucune session d\'entraînement pour le moment. Journalisez votre première session ci-dessus.',
      noLogsYetDesc: 'Pas encore de journal. Commencez à vous entraîner ci-dessus.',
      trainingMode: 'MODE ENTRAÎNEMENT',
      dailyLogger: 'Journal Quotidien',
      streak1: 'Série De 1 Jour',
      streakMulti: ' Jours De Série',
      streakIncredible: 'Constance incroyable. Continuez comme ça.',
      streakBuilding: 'Vous prenez de l\'élan. Ne rompez pas la chaîne.',
      streakFirst: 'Complétez votre première session aujourd\'hui.',
      sessionMin: ' min',
      saveLogSuccess: '✓ Journal enregistré avec succès',
      totalValue: 'VALEUR RÉTABLIE TOTALE :',
      todayPrice: 'PRIX SPÉCIAL DU JOUR',
      todaySavings: 'Économisez 177 $ Aujourd\'hui',
    },
    languageSwitcher: {
      en: 'English',
      fr: 'Français',
      it: 'Italiano',
      nl: 'Nederlands',
      de: 'Deutsch',
    },
    testimonial: {
      quote: 'Dans une époque marquée par un bruit constant, la Méthode Composure m\'a offert l\'architecture dont j\'avais besoin pour reconstruire ma concentration. Ce n\'est pas seulement du bien-être ; c\'est un avantage tactique.',
      cite: 'Sarah Chen — Sr. Operations Lead, Meridian Health',
    },
  },
  it: {
    nav: {
      whyItWorks: 'Perché Funziona',
      theMethod: 'Il Metodo',
      curriculum: 'Programma',
      reviews: 'Recensioni',
      faq: 'FAQ',
      memberLogin: 'Accesso Membro',
      getAccess: 'Accesso Immediato — $20',
      accessGranted: 'MEMBRO',
      back: 'Indietro',
      memberLoginCheck: 'Accesso Membro / Verifica Accesso',
    },
    hero: {
      headline: 'Padroneggia il controllo della pre-eiaculazione e sviluppa resistenza duratura.',
      subtext: 'Un framework di 4 pilastri per il sistema nervoso somatico, progettato per gli uomini che vogliono un controllo naturale e affidabile — senza pillole, spray o trucchi imbarazzanti.',
      ctaPrimary: 'Accesso Immediato — $20',
      ctaSecondary: 'Accesso Membro',
      guarantee: 'Garanzia Rimborso 30 Giorni',
      discreetBilling: 'Fatturazione Discreta',
      instantDelivery: 'Consegna Digitale Immediata',
      priceBadge: '$20 USD',
      productImageAlt: 'Il Pacchetto Digitale Metodo Composure',
      markVideoAria: 'Video testimonianza di Mark',
      muteVideo: 'Disattiva audio',
      unmuteVideo: 'Attiva audio',
      markLabel: 'Mark',
    },
    checkout: {
      title: 'Completa il Tuo Ordine',
      subtitle: 'Inserisci la tua e-mail per avviare una sessione di pagamento sicura',
      emailLabel: 'LA TUA E-MAIL PER LA CONSEGNA DIGITALE IMMEDIATA',
      emailPlaceholder: 'nome@esempio.com',
      productLabel: 'Prodotto',
      secureCheckout: 'PAGAMENTO SICURO',
      loadingCopy: 'Apertura del pagamento...',
      paymentMethods: 'Metodi di Pagamento Accettati',
      acceptedPayment: 'Apple Pay, Google Pay, Visa, Mastercard, AMEX',
      fulfillment: 'Consegna Immediata',
      refundPolicy: 'Garanzia Rimborso 30 Giorni',
      discreetBilling: 'Fatturazione Discreta',
      orderConfirmed: 'Ordine Confermato!',
      orderVerified: 'Pagamento verificato',
      successBody: 'I dettagli del tuo accesso digitale sono stati inviati alla tua e-mail. Se non li vedi entro pochi minuti, controlla la cartella spam o indesiderata.',
      accessButton: 'Accedi al Tuo Programma Digitale e Guide',
      supportLabel: 'Hai bisogno di assistenza?',
      pleaseEnterEmail: 'Inserisci il tuo indirizzo e-mail per continuare.',
      includedItems: {
        instantAccess: 'Accesso istantaneo su tutti i dispositivi, tutti i playbook e tracker bonus inclusi',
        moneyBack: 'Garanzia di rimborso di 30 giorni, 100% senza rischi',
      },
      closeCheckout: 'Chiudi il pagamento',
      digitalGuideFallback: 'Guida educativa digitale',
      orderVerifiedHeading: 'Ordine Verificato — Benvenuto in Composure',
      fulfillmentFooter: 'Consegna Immediata • Garanzia 30 Giorni • Fatturazione Discreta',
      submitButton: 'Accesso Immediato — $20',
    },
    success: {
      title: 'Ordine verificato. Benvenuto in Composure.',
      body: 'I dettagli del tuo accesso digitale sono stati inviati alla tua e-mail. Se non li vedi entro pochi minuti, controlla la cartella spam o indesiderata.',
      accessButton: 'Accedi al Tuo Programma Digitale e Guide',
      supportLabel: 'Hai bisogno di assistenza?',
    },
    cancel: {
      title: 'Pagamento Annullato',
      body: 'Il tuo pagamento non è stato completato. Nessun addebito è stato effettuato.',
      retryButton: 'Riprova',
      whatIsWaiting: 'Cosa Ti Aspetta',
      returnToOverview: 'Torna alla Panoramica',
    },
    footer: {
      tagline: 'Sistema di Controllo e Fiducia',
      navigation: 'NAVIGAZIONE',
      legalPolicies: 'MENZIONI LEGALI',
      whyItWorks: 'Perché Funziona',
      fourPillarSystem: 'Sistema a 4 Pilastri',
      curriculumBonuses: 'Programma e Bonus',
      verifiedReviews: 'Recensioni Verificate',
      faq: 'FAQ',
      terms: 'Termini di Servizio',
      privacy: 'Informativa sulla Privacy',
      guarantee: 'GARANZIA 30 GIORNI',
      guaranteeBody: 'Senza rischi al 100%. Se non noti un miglioramento significativo del controllo entro 30 giorni, ricevi un rimborso completo. Senza domande.',
      getAccess: 'Accesso per $20',
      medicalDisclaimer: 'Disclaimer Medico:',
      medicalDisclaimerBody: 'Questa guida è educativa e non costituisce consulenza medica né sostituisce la consultazione con un medico o urologo autorizzato.',
      copyright: '© 2026 SAVITY LLC / COMPOSURE METHOD. TUTTI I DIRITTI RISERVATI.',
      encryptedCheckout: 'PAGAMENTO DIGITALE SSL 256 BIT CRIPTATO',
    },
    stats: {
      menTrained: 'Uomini Addestrati',
      averageRating: 'Valutazione Media',
      resultsIn30Days: 'Risultati in 30 Giorni',
      moneyBackGuarantee: 'Garanzia Rimborso',
    },
    testimonials: {
      heading: 'Ciò Che gli Uomini Vivono Con Il Metodo Composure',
      subtitle: 'Leggi recensioni verificate da uomini che hanno applicato il framework neuromuscolare e di respirazione a 4 pilastri per riallenare il loro sistema nervoso autonomo.',
      reviews: [
        {
          name: 'James H.',
          age: '35 anni • Membro Verificato',
          role: 'Insegnante, Portland OR',
          rating: 5,
          headline: 'Ho finalmente capito cosa stava davvero succedendo al mio corpo.',
          text: 'Ho passato due anni a pensare che qualcosa non andasse. La scala di arousal del Modulo 1 mi ha aiutato a capire cosa stava realmente accadendo dal punto di vista fisiologico, invece di quello che immaginavo. La tecnica di respirazione di reset mi ha dato qualcosa di concreto da fare nel momento, invece di spiralare nel panico.',
          stat: 'Cambiamento Visibile in 2 Settimane',
          date: 'Acquistato a marzo 2026',
        },
        {
          name: 'Daniel N.',
          age: '42 anni • Membro Verificato',
          role: 'Autotrasportatore, Nashville TN',
          rating: 5,
          headline: 'L\'ho tenuto nel mio camion e funziona davvero.',
          text: 'Non sono il tipo che compra programmi online. Ma la tessera di riferimento in 5 passaggi aveva cose pratiche che potevo usare immediatamente. Mia moglie ha notato la differenza prima di me — ha detto che sembravo meno teso e più presente. Gli esercizi del pavimento pelvico sono abbastanza semplici da fare durante le soste.',
          stat: 'Miglioramento della Relazione',
          date: 'Acquistato a maggio 2026',
        },
        {
          name: 'Caleb R.',
          age: '31 anni • Membro Verificato',
          role: 'Supporto IT, Minneapolis MN',
          rating: 5,
          headline: 'Questo si basa sulla fisiologia reale, non su promesse magiche.',
          text: 'Ho quasi annullato il mio ordine tre volte perché ogni altro programma che vende questo è una truffa. La scienza dietro il Metodo Composure è solida — spiega il sistema nervoso autonomo chiaramente e ti dà strumenti concreti, non solo teoria. La lista di controllo quotidiana mi ha aiutato a essere costante.',
          stat: 'Pratica Costante per 30 Giorni',
          date: 'Acquistato ad aprile 2026',
        },
        {
          name: 'Omar S.',
          age: '38 anni • Membro Verificato',
          role: 'Gestore di Ristorante, Houston TX',
          rating: 5,
          headline: 'Ha dato a me e alla mia partner un modo di parlarne insieme.',
          text: 'La parte più difficile non era il problema fisico in sé — era il silenzio intorno a questo. Le domande di conversazione del Bonus #2 hanno aperto una porta che entrambi stavamo evitando. Sapere che è una competenza comune e allenabile mi ha fatto sentire meno solo.',
          stat: 'Progresso Condiviso con il Partner',
          date: 'Acquistato a giugno 2026',
        },
      ],
    },
    languageSwitcher: {
      en: 'English',
      fr: 'Français',
      it: 'Italiano',
      nl: 'Nederlands',
      de: 'Deutsch',
    },
    problem: {
      headline: 'Perché Succede Nei Tuoi 30 Anni — E Perché Le "Soluzioni" Tradizionali Falliscono?',
      subtext: 'A partire dai 30 anni, il carico dello stile di vita, lo stress lavorativo e sottili cambiamenti ormonali intensificano il sistema nervoso simpatico. Quando la pressione della performance entra in gioco, l\'eccitazione accelera più velocemente di quanto il tuo controllo cosciente riesca a gestire.',
      resultLabel: 'Risultato',
      sprayTitle: 'Spray E Creme Anestetizzanti',
      sprayDesc: 'Attutisce ogni sensazione fisica. Trasforma l\'intimità in un compito meccanico e insensibile, e spesso si trasferisce al partner, rovinando il piacere reciproco.',
      sprayResult: 'Soluzione Temporanea',
      pillTitle: 'Pillole E Integratori Non Approvati',
      pillDesc: 'Crea effetti collaterali imprevedibili (mal di testa, arrossamento). Tratta il tempismo come un problema chimico invece di rieducare il controllo del sistema nervoso.',
      pillResult: 'Effetti Collaterali',
      distractionTitle: 'Distrazione E Conteggio Mentale',
      distractionDesc: 'Contare alla rovescia o pensare allo sport ti allontana completamente dal momento. Distrugge l\'intimità emotiva e fallisce con eccitazione elevata.',
      distractionResult: 'Non Tratta La Causa Radice',
      methodTitle: 'Il Metodo Composure',
      methodDesc: 'Rieduca la risposta neuromuscolare pelvica e il sistema nervoso parasimpatico. Costruisce una resistenza genuina e naturale che dura per tutta la vita.',
      methodResult: 'Competenza Permanente',
      mechanismLabel: 'IL MECCANISMO NEUROFISIOLOGICO',
      mechanismTitle: 'Come La Rieducazione Del Controllo Parasimpatico Ritarda Naturalmente Il Climax',
      mechanismBody: 'L\'eiaculazione è governata dal sistema nervoso autonomo. Quando l\'ansia o una respirazione rapida spostano il corpo in modalità simpatica ("lotta o fuga"), la velocità degli impulsi nervosi aumenta drasticamente. Combinando espirazioni parasimpatiche 4-2-7 con rilasci pelvici mirati, riduci la pressione del segnale nervoso e mantieni l\'eccitazione in modo fluido nella fascia ottimale 4–6 sulla scala 1–10.',
      mechanismStat: '89%',
      mechanismContext: 'degli uomini riporta un miglioramento notevole nel controllo dell\'eccitazione entro 3-4 settimane di pratica quotidiana di 10 minuti.',
    },
    method: {
      headline: 'Un Sistema Completo A 4 Pilastri Per Un Controllo Duraturo',
      subtext: 'Il Metodo Composure combina educazione fisiologica, condizionamento pelvico, respirazione parasimpatica e script per la coppia in una semplice routine quotidiana.',
      ctaHeadline: 'Pronto a rieducare il tuo sistema nervoso e riconquistare piena sicurezza in camera da letto?',
      ctaBody: 'Ottieni accesso immediato a tutti i contenuti + 4 bonus gratuiti per $20 (valore totale $197).',
      ctaButton: 'Inizia Ora — $20 (Valore $197)',
      pillars: [
        { title: 'Decodifica Fisiologica', tagline: 'Decostruire Il Ciclo Ansia-Vergogna', desc: 'Scopri perché i cambiamenti avvengono nella tua trentina a causa della sensibilità del sistema nervoso. Normalizza la risposta corpo-mente per rimuovere permanentemente la pressione della performance.' },
        { title: 'Allenamento Neuromuscolare Pelvico', tagline: 'La Scala 1-10 & L\'allenamento Stop-Start', desc: 'Mappa la tua soglia di eccitazione, identifica il tuo punto di non ritorno al livello 7, e condiziona i tuoi muscoli pelvici per regolare l\'intensità del segnale nervoso.' },
        { title: 'Controllo Respiratorio Parasimpatico', tagline: 'Regolazione Del Nervo Vago 4-2-7', desc: 'Attiva la dominanza parasimpatica usando una respirazione lenta con inspirazione di 4 conti / espirazione di 7 conti per calmare il battito cardiaco rapido e prolungare il timing.' },
        { title: 'Allineamento Con Il Partner Senza Vergogna', tagline: 'Script Parola Per Parola & Ritmo', desc: 'Trasforma l\'intimità da un test di performance individuale in un\'esperienza condivisa e rilassata grazie a framework di comunicazione a basso rischio.' },
      ],
    },
    curriculum: {
      headline: 'Cosa Ottieni Con Il Metodo Composure',
      unlocked: 'Sbloccato',
      membersOnly: 'Solo Membri',
      viewModuleContent: 'Visualizza Contenuto Del Modulo',
      subtext: '5 moduli digitali strutturati, protocolli fisici passo dopo passo e 4 bonus istantanei gratuiti pensati per un\'implementazione rapida e discreta.',
      moduleLocked: 'Solo Membri',
      keyLessonsLabel: 'Lezioni Chiave:',
      freeBonusesLabel: '4 BONUS GRATUITI',
      bonusesHeading: 'Risorse Digitali Ad Azione Immediata',
      bonusesBody: 'Include la Scheda Rapida a 5 Passi "Stanotte", il Playbook Di Comunicazione Con Il Partner, la Roadmap Di Progresso 30/60/90 e il Valutatore IA.',
      bonus1Label: 'Scheda Rapida A 5 Passi (Valore $30)',
      bonus2Label: 'Playbook Di Comunicazione Con Il Partner (Valore $25)',
      bonus3Label: 'Roadmap Di Progresso 30/60/90 Giorni (Valore $45)',
      bonus4Label: 'Protocollo Di Personalizzazione IA (Valore $20)',
      bonusesCta: 'Richiedi Tutti I Bonus Per $20',
      yourBonusesHeading: 'I Tuoi 4 Bonus Gratuiti — Inclusi Istantaneamente',
      bonusLabelPrefix: 'BONUS #',
      modules: [
        { moduleNumber: 1, title: 'Comprendere Cosa Sta Succedendo Davvero', description: 'Il controllo dell\'eccitazione è una competenza appresa legata alla familiarità e alla sensibilità del sistema nervoso. Scopri perché i cambiamenti avvengono nella tua trentina e come rompere il ciclo della vergogna.', lessons: ['Lezione 1.1 — Perché questo appare, a partire dalla trentina', 'Lezione 1.2 — Smontare i miti che tengono gli uomini bloccati', 'Lezione 1.3 — Il ciclo della vergogna', 'Lezione 1.4 — Impostare aspettative realistiche'] },
        { moduleNumber: 2, title: 'Il Kit Di Strumenti Fisici', description: 'Impara a localizzare e allenare i muscoli del pavimento pelvico, mappare la tua scala di eccitazione 1-10, utilizzare le tecniche stop-start/edging, e sfruttare la respirazione parasimpatica.', lessons: ['Lezione 2.1 — Consapevolezza e allenamento del pavimento pelvico', 'Lezione 2.2 — Monitoraggio dell\'eccitazione: i metodi stop-start e edging', 'Lezione 2.3 — Respirazione e regolazione del sistema nervoso', 'Lezione 2.4 — Leve di stile di vita'] },
        { moduleNumber: 3, title: 'Il Gioco Mentale', description: 'Sposta l\'attenzione dall\'auto-monitoraggio alle sensazioni presenti, stabilisci routine mentali pre-intimità, e tratta le serate negative come dati piuttosto che verdetti.', lessons: ['Lezione 3.1 — Come l\'ansia da performance diventa una profezia auto-avverante', 'Lezione 3.2 — Ristrutturare il momento', 'Lezione 3.3 — Routine mentali pre-intimità', 'Lezione 3.4 — Gestire una brutta serata senza spirare'] },
        { moduleNumber: 4, title: 'La Relazione & Comunicazione', description: 'Impara a parlare con un partner senza vergogna, ridefinisci l\'intimità come un viaggio condiviso, e utilizza le tecniche di focus sensoriale.', lessons: ['Lezione 4.1 — Parlare con un partner di questo', 'Lezione 4.2 — Ridefinire l\'intimità come un\'esperienza condivisa', 'Lezione 4.3 — Ricostruire la fiducia insieme', 'Lezione 4.4 — Costruire abitudini di comunicazione continue'] },
        { moduleNumber: 5, title: 'Costruire Una Routine Sostenibile', description: 'Costruisci una struttura di abitudine quotidiana su 90 giorni, monitora le tendenze senza ossessione, e comprendi i trigger di consultazione medica.', lessons: ['Lezione 5.1 — Una struttura di pratica 30/60/90 giorni', 'Lezione 5.2 — Tracciare i progressi senza ossessionarsi', 'Lezione 5.3 — Quando vedere un medico, un urologo o un terapeuta', 'Lezione 5.4 — Manutenzione della fiducia a lungo termine'] },
      ],
    },
    guarantee: {
      heading: 'GARANZIA BLINDATA AL 100% SENZA RISCHI',
      subheading: 'GARANZIA 100% SENZA RISCHI',
      body: 'Prova Il Metodo Composure Per 30 Giorni Completi — Zero Rischi: prenditi 30 giorni interi per seguire i moduli, praticare la respirazione 4-2-7 e provare gli esercizi pelvici. Se non noti un aumento significativo nel controllo dell\'eccitazione, nella resistenza e nella sicurezza in camera da letto, inviaci una semplice email per un rimborso completo e immediato al 100%. Senza fare domande. Tieni le guide come nostro ringraziamento per averci dato una possibilità onesta.',
      noQuestionsAsked: 'Senza Fare Domande',
      keepAllContent: 'Tieni Tutti I Contenuti',
      fullRefund: 'Rimborso Completo Di $20',
    },
    faq: {
      heading: 'Tutto Quello Che Devi Sapere',
      subtitle: 'Domande comuni sulla fatturazione discreta, l\'accesso digitale istantaneo e il funzionamento del programma.',
      items: [
        { q: 'Questo significa che c\'è qualcosa che non va in me?', a: 'No. È una delle esperienze fisiche più comuni per gli uomini, e per la maggior parte degli uomini senza una condizione medica sottostante, è un pattern allenabile, non un difetto.' },
        { q: 'Ricapiterà anche dopo aver migliorato?', a: 'Probabilmente, occasionalmente. Il progresso è una tendenza, non un interruttore permanente. Una serata negativa dopo settimane di progresso è rumore, non un segno che sei tornato al punto di partenza.' },
        { q: 'Quanto tempo prima di notare una differenza?', a: 'La maggior parte degli uomini nota un cambiamento significativo in 4-8 settimane di pratica costante, con un miglioramento continuo oltre i 2-3 mesi.' },
        { q: 'Devo dire al mio partner che sto usando una guida come questa?', a: 'Solo a te la scelta. Il Modulo 4 tratta questo argomento più nel dettaglio, ma molti uomini trovano che anche una breve menzione discreta riduca la pressione piuttosto che aggiungerla.' },
        { q: 'È la stessa cosa della disfunzione erettile?', a: 'No — questa guida riguarda il timing e il controllo, non la capacità di ottenere o mantenere un\'erezione. Sono aree correlate ma distinte, e la DE ha il suo percorso di valutazione con un medico.' },
      ],
    },
    stickyCta: {
      productTitle: 'Il Pacchetto Metodo Composure',
      memberUnlocked: 'Accesso Membro A Vita Attivo',
      nonMemberSubtitle: '5 Moduli + 4 Bonus Gratuiti • Valore $197 (Risparmia $177)',
      cta: 'Ottieni Accesso Immediato ($20)',
    },
    testimonial: {
      quote: 'In un\'epoca definita da un rumore costante, il Metodo Composure mi ha fornito l\'architettura di cui avevo bisogno per ricostruire la mia concentrazione. Non è solo benessere; è un vantaggio tattico.',
      cite: 'Sarah Chen — Sr. Operations Lead, Meridian Health',
    },
    tools: {
      breathing: {
        title: 'Respirazione Per La Riduzione Del Cortisolo',
        subtitle: 'Sincronizza la tua frequenza respiratoria per stimolare il nervo vago e ridurre immediatamente i livelli di cortisolo sierico.',
        pillarLabel: 'PILASTRO 01: RESET COGNITIVO',
        headerTitle: 'Respirazione Per La Riduzione Del Cortisolo',
        headerDesc: 'Sincronizza la tua frequenza respiratoria per stimolare il nervo vago e ridurre immediatamente i livelli di cortisolo sierico.',
        audioOn: 'Audio Attivo',
        audioOff: 'Silenziato',
        startProtocol: 'Avvia Protocollo',
        pauseProtocol: 'Pausa Protocollo',
        reset: 'Reimposta',
        logSession: 'Registra Sessione',
        cyclesDone: 'CICLI COMPLETATI',
        elapsedTime: 'TEMPO TRASCORSO',
        cortisolImpact: 'IMPATTO CORTISOLO',
      },
      pelvic: {
        title: 'Allenatore Neuromuscolare Del Pavimento Pelvico',
        subtitle: 'Allenatore guidato con contrazioni e rilasci cronometrati.',
        readyToTrain: 'PRONTO AD ALLENARTI',
        squeezeHold: 'STRINGI E TIENI',
        slowRelease: 'RILASCIO LENTO',
        beginSet: 'Inizia Serie Da 10 Ripetizioni',
        pauseTrainer: 'Pausa Allenatore',
        reset: 'Reimposta',
        techniqueNote: 'Nota Tecnica:',
        techniqueNoteBody: 'Non trattenere il respiro durante le contrazioni. Mantieni una respirazione addominale fluida sollevando delicatamente il pavimento pelvico verso l\'alto e verso l\'interno.',
      },
      arousal: {
        title: 'La Scala Di Eccitazione 1–10 E L\'allenamento Stop-Start',
        subtitle: 'Trascina il cursore per esplorare come navigare le zone di eccitazione e riconoscere il Livello 7 (Punto Di Non Ritorno).',
        interactiveTool: 'STRUMENTO INTERATTIVO · LEZIONE 2.2',
        lessonLabel: 'STRUMENTO INTERATTIVO · LEZIONE 2.2',
        baseline: '1 (Livello Base)',
        pointOfNoReturn: '⚡ 7 = PUNTO DI NON RITORNO',
        climax: '10 (Climax)',
        recommendedProtocol: 'Protocollo Consigliato:',
      },
      clarity: {
        title: 'Genera Protocollo Tattico',
        subtitle: 'Inserisci il tuo stato cognitivo e fisiologico attuale. L\'Architetto Di Chiarezza IA formula un protocollo di calma personalizzato in 3 passaggi.',
        aiLabel: 'ARCHITETTO DI CHIAREZZA IA',
        generateProtocol: 'Genera Protocollo Composure',
        synthesizing: 'Sintesi Del Protocollo In Corso...',
        clear: 'Cancella',
        synthesizedProtocol: 'PROTOCOLLO SINTETIZZATO',
        recommendedBreathwork: 'RESPIRAZIONE CONSIGLIATA',
        launchPacer: 'Avvia Pacer',
        tacticalSteps: 'PASSI TATTICI',
        awaitingInputs: 'In Attesa Di Input',
        awaitingDesc: 'Imposta il tuo livello di stress e il fattore di stress principale a sinistra, poi clicca su Genera per ricevere il tuo protocollo personalizzato.',
      },
      journal: {
        title: 'Diario Di Chiarezza Di Base',
        subtitle: 'Monitora il tuo punteggio giornaliero di calma, gli indicatori di stress fisiologico e le finestre di concentrazione profonda.',
        recordBaseline: 'Registra Livello Base Giornaliero',
        logBtn: 'Registra Livello Base Di Calma',
        cancelBtn: 'Annulla',
        saveBtn: 'Salva Sessione Nel Diario',
      },
      roadmap: {
        title: 'La Roadmap Di Esecuzione 30 / 60 / 90 Giorni',
        subtitle: 'Monitora i traguardi lungo 3 fasi con controlli di costanza e suddivisione dettagliata dei compiti.',
        lessonLabel: 'TRACKER ROADMAP',
        days30: 'Giorni 1–30: Fase Di Fondazione',
        days60: 'Giorni 31–60: Fase Di Integrazione',
        days90: 'Giorni 61–90: Rifinitura E Padronanza',
      },
      scripts: {
        title: 'Script Di Comunicazione Con Il Partner',
        subtitle: 'Schemi semplici e senza vergogna per aprire conversazioni con un partner.',
        bonusLabel: 'RISORSA BONUS B · SCRIPT PER IL PARTNER',
        copyScript: 'Copia Script',
        copied: 'Copiato Negli Appunti',
        situation: 'Situazione:',
      },
      shameCycle: {
        title: 'Il Ciclo Della Vergogna E I Meccanismi Di Interruzione',
        subtitle: 'Diagramma interattivo che mostra come funziona il ciclo ansia-vergogna e dove interromperlo.',
        interactiveDiagram: 'DIAGRAMMA INTERATTIVO · LEZIONE 1.3',
        lessonLabel: 'DIAGRAMMA INTERATTIVO · LEZIONE 1.3',
        simulate: 'Simula Interruzione Del Ciclo',
        active: 'Consapevolezza Attiva (Ciclo Interrotto)',
        insight: 'Intuizione Chiave:',
      },
    },
    practiceLog: {
      bonusLabel: 'RISORSA BONUS C · DIARIO DI PRATICA',
      title: 'Tracker Interattivo Di Pratica E Tendenze',
      overview30Day: 'CONTROLLO MEDIO 30 GIORNI',
      totalSessions: 'SESSIONI TOTALI REGISTRATE',
      pelvicReps: 'RIPETIZIONI PELVICHE CUMULATIVE',
      logToday: 'Registra La Pratica Di Oggi',
      cancel: 'Annulla',
      saveSession: 'Salva Sessione Nel Diario',
      loggedEntries: 'Voci Registrate',
      noLogs: 'Nessun diario di pratica registrato finora.',
      date: 'Data',
      pelvicFloorReps: 'Ripetizioni Del Pavimento Pelvico',
      selfRatedControl: 'Controllo Auto-valutato (1–10)',
      breathingDone: 'Reset Respiratorio Parasimpatico 4-2-7 Completato Oggi',
      notes: 'Note / Osservazioni',
    },
    memberAccess: {
      title: 'Verifica Accesso Membro',
      subtitle: 'Inserisci l\'indirizzo email utilizzato durante l\'acquisto per verificare il tuo ordine pagato e ripristinare istantaneamente l\'accesso digitale completo.',
      emailLabel: 'INDIRIZZO EMAIL CLIENTE',
      emailPlaceholder: 'es. utente@dominio.com',
      verifyButton: 'VERIFICA ACCESSO PAGATO',
      verifyingButton: 'VERIFICA ORDINE IN CORSO...',
      notPurchased: 'Non hai ancora acquistato? Ottieni l\'accesso per $20.',
      discreetVerification: 'Verifica discreta • Consegna istantanea',
    },
    dashboard: {
      memberAccessActive: 'ACCESSO MEMBRO ATTIVO',
      dailyTrainingLog: 'Diario Di Allenamento Giornaliero',
      loggedInAs: 'Connesso come',
      backToHome: 'Torna Alla Home',
      currentStreak: 'SERIE ATTUALE',
      totalSessions: 'SESSIONI TOTALI',
      weeklyCompletion: 'COMPLETAMENTO SETTIMANALE',
      avgControlRating: 'VALUTAZIONE MEDIA DI CONTROLLO',
      logTodayTraining: 'Registra L\'allenamento Di Oggi',
      whatDidYouTrain: 'COSA HAI ALLENATO OGGI?',
      duration: 'DURATA',
      controlRating: 'VALUTAZIONE DI CONTROLLO',
      notesOptional: 'NOTE (OPZIONALE)',
      saveTrainingLog: 'Salva Diario Di Allenamento',
      quickTools: 'Strumenti Rapidi',
      breathingPacer: 'Pacer Di Respirazione',
      pelvicTrainer: 'Allenatore Pelvico',
      arousalScale: 'Scala Di Eccitazione',
      clarityProtocol: 'Protocollo Di Chiarezza',
      recentSessions: 'Sessioni Recenti',
      clearHistory: 'Cancella Cronologia',
      noLogsYet: 'Ancora nessun diario di allenamento. Registra la tua prima sessione sopra.',
      noLogsYetDesc: 'Ancora nessun diario. Inizia ad allenarti sopra.',
      trainingMode: 'MODALITÀ ALLENAMENTO',
      dailyLogger: 'Diario Giornaliero',
      streak1: 'Serie Di 1 Giorno',
      streakMulti: ' Giorni Di Serie',
      streakIncredible: 'Costanza incredibile. Continua così.',
      streakBuilding: 'Stai costruendo slancio. Non interrompere la catena.',
      streakFirst: 'Completa la tua prima sessione oggi.',
      sessionMin: ' min',
      saveLogSuccess: '✓ Diario salvato con successo',
      totalValue: 'VALORE COMMERCIALE TOTALE COMBINATO:',
      todayPrice: 'PREZZO SCONTATO SPECIALE DI OGGI',
      todaySavings: 'Risparmia $177 Oggi',
    },
    selfQualification: {
      headline: 'Il Metodo Composure È Fatto Per Te?',
      subtext: 'Abbiamo progettato questo sistema specificamente per uomini che privilegiano la padronanza fisica e mentale basata su prove concrete rispetto a false speranze.',
      forYouTitle: 'Questo Fa Per Te Se...',
      forYouLabel: 'CANDIDATO IDEALE',
      notForYouTitle: 'Questo NON Fa Per Te Se...',
      notForYouLabel: 'NON ADATTO',
      forYouBullets: [
        'Sei un uomo di 30 anni o più che affronta un\'eiaculazione troppo rapida o un\'ansia elevata prima dell\'intimità.',
        'Vuoi una competenza fisica permanente, senza spray, creme o pillole.',
        'Puoi dedicare 10 minuti al giorno a esercizi pelvici e respiratori discreti.',
        'Apprezzi la discrezione: un sistema digitale pulito e privato, accessibile da telefono o computer.',
      ],
      notForYouBullets: [
        'Cerchi una pillola miracolosa immediata: questo programma rieduca la memoria muscolare e richiede 4-8 settimane di costanza.',
        'Preferisci prodotti anestetizzanti: se ti piace perdere ogni sensazione, questo programma non fa per te.',
        'Presenti sintomi medici acuti gravi: dolore improvviso, sanguinamento o problemi alla prostata che richiedono un urologo.',
      ],
    },
    offer: {
      headline: 'Ottieni Oggi Il Sistema Composure Completo',
      subtext: 'Tutto ciò di cui hai bisogno per padroneggiare il controllo dell\'eccitazione, il condizionamento pelvico e la fiducia con il partner.',
      retailValueLabel: 'VALORE COMMERCIALE',
      includedLabel: 'RISORSE DIGITALI INCLUSE',
      totalRetailValue: 'VALORE COMMERCIALE TOTALE:',
      todayLabel: 'PREZZO SPECIALE DI OGGI',
      saveToday: 'Risparmia $177 Oggi',
      currency: 'USD',
      nonMemberButton: 'Richiedi Il Mio Accesso Immediato Per $20',
      memberButton: 'Accedi Al Tuo Sistema Completo Sbloccato',
      guaranteeLine: 'Garanzia Al 100% Senza Rischi Per 30 Giorni',
      discreetBillingLine: 'Fatturazione Discreta ("CM DIGITAL")',
      instantLine: 'Accesso Digitale Immediato',
      oneTimeLine: 'Pagamento unico • Nessun abbonamento • Consegna digitale istantanea',
      disclaimerLine: '100% senza rischi. Se non noti progressi significativi entro 30 giorni, ricevi un rimborso completo.',
      items: [
        { label: 'La Guida Maestra Da 5 Moduli Del Metodo Composure', value: '$97' },
        { label: 'Bonus #1: Il Foglio Di Riferimento "Stanotte" In 5 Passi', value: '$30' },
        { label: 'Bonus #2: Il Playbook Di Comunicazione Con Il Partner Parola Per Parola', value: '$25' },
        { label: 'Bonus #3: La Roadmap Interattiva Di Progresso 30/60/90 Giorni', value: '$45' },
      ],
    },
    mobileDashboard: {
      memberAccessActive: 'ACCESSO MEMBRO ATTIVO',
      dailyTrainingLog: 'Diario Di Allenamento Giornaliero',
      loggedInAs: 'Connesso come',
      backToHome: 'Torna Alla Home',
      currentStreak: 'SERIE ATTUALE',
      totalSessions: 'SESSIONI TOTALI',
      weeklyCompletion: 'COMPLETAMENTO SETTIMANALE',
      avgControlRating: 'VALUTAZIONE MEDIA DI CONTROLLO',
      logTodayTraining: 'Registra L\'allenamento Di Oggi',
      whatDidYouTrain: 'COSA HAI ALLENATO OGGI?',
      duration: 'DURATA',
      controlRating: 'VALUTAZIONE DI CONTROLLO',
      notesOptional: 'NOTE (OPZIONALE)',
      saveTrainingLog: 'Salva Diario Di Allenamento',
      quickTools: 'Strumenti Rapidi',
      breathingPacer: 'Pacer Di Respirazione',
      pelvicTrainer: 'Allenatore Pelvico',
      arousalScale: 'Scala Di Eccitazione',
      clarityProtocol: 'Protocollo Di Chiarezza',
      recentSessions: 'Sessioni Recenti',
      clearHistory: 'Cancella Cronologia',
      noLogsYet: 'Ancora nessun diario di allenamento. Registra la tua prima sessione sopra.',
      noLogsYetDesc: 'Ancora nessun diario. Inizia ad allenarti sopra.',
      trainingMode: 'MODALITÀ ALLENAMENTO',
      dailyLogger: 'Diario Giornaliero',
      streak1: 'Serie Di 1 Giorno',
      streakMulti: ' Giorni Di Serie',
      streakIncredible: 'Costanza incredibile. Continua così.',
      streakBuilding: 'Stai costruendo slancio. Non interrompere la catena.',
      streakFirst: 'Completa la tua prima sessione oggi.',
      sessionMin: ' min',
      saveLogSuccess: '✓ Diario salvato con successo',
      totalValue: 'VALORE COMMERCIALE TOTALE COMBINATO:',
      todayPrice: 'PREZZO SCONTATO SPECIALE DI OGGI',
      todaySavings: 'Risparmia $177 Oggi',
    },
  },
  nl: {
    nav: {
      whyItWorks: 'Waarom Het Werkt',
      theMethod: 'De Methode',
      curriculum: 'Curriculum',
      reviews: 'Beoordelingen',
      faq: 'FAQ',
      memberLogin: 'Lid Login',
      getAccess: 'Directe Toegang — $20',
      accessGranted: 'LID',
      back: 'Terug',
      memberLoginCheck: 'Ledenlogin / Toegang Controleren',
    },
    hero: {
      headline: 'Meester pre-ejaculatiecontrole en bouw blijvende uithoudingsvermogen.',
      subtext: 'Een 4-pijler framework voor het somatische zenuwstelsel, ontworpen voor mannen die natuurlijke, betrouwbare controle willen — geen pillen, geen sprays, geen ongemakkelijke trucjes.',
      ctaPrimary: 'Directe Toegang — $20',
      ctaSecondary: 'Lid Login',
      guarantee: '30-Dagen Geld Terug-Garantie',
      discreetBilling: 'Discrete Facturatie',
      instantDelivery: 'Directe Digitale Levering',
      priceBadge: '$20 USD',
      productImageAlt: 'Het Composure Methode Digitaal Pakket',
      markVideoAria: 'Mark getuigenisvideo',
      muteVideo: 'Geluid uitzetten',
      unmuteVideo: 'Geluid aanzetten',
      markLabel: 'Mark',
    },
    checkout: {
      title: 'Voltooi Je Bestelling',
      subtitle: 'Voer je e-mailadres in om een veilige betaalsessie te starten',
      emailLabel: 'JE E-MAIL VOOR DIRECTE DIGITALE LEVERING',
      emailPlaceholder: 'naam@voorbeeld.com',
      productLabel: 'Product',
      secureCheckout: 'BEVEILIGDE BETALING',
      loadingCopy: 'Betaling openen...',
      paymentMethods: 'Geaccepteerde Betaalmethoden',
      acceptedPayment: 'Apple Pay, Google Pay, Visa, Mastercard, AMEX',
      fulfillment: 'Directe Levering',
      refundPolicy: '30-Dagen Geld Terug-Garantie',
      discreetBilling: 'Discrete Facturatie',
      orderConfirmed: 'Bestelling Bevestigd!',
      orderVerified: 'Betaling geverifieerd',
      successBody: 'Je digitale toegangsgegevens zijn naar je e-mail gestuurd. Als je ze niet binnen enkele minuten ziet, controleer dan je spam- of ongewenste-e-mailmap.',
      accessButton: 'Toegang Tot Je Digitale Curriculum en Gidsen',
      supportLabel: 'Hulp nodig?',
      pleaseEnterEmail: 'Voer je e-mailadres in om door te gaan.',
      includedItems: {
        instantAccess: 'Directe toegang op alle apparaten, alle gratis bonus playbooks & trackers',
        moneyBack: '30-dagen 100% geld-terug-garantie',
      },
      closeCheckout: 'Sluit betaling',
      digitalGuideFallback: 'Digitale educatieve gids',
      orderVerifiedHeading: 'Bestelling Geverifieerd — Welkom bij Composure',
      fulfillmentFooter: 'Directe Levering • 30-Dagen Garantie • Discrete Facturatie',
      submitButton: 'Directe Toegang — $20',
    },
    success: {
      title: 'Bestelling geverifieerd. Welkom bij Composure.',
      body: 'Je digitale toegangsgegevens zijn naar je e-mail gestuurd. Als je ze niet binnen enkele minuten ziet, controleer dan je spam- of ongewenste-e-mailmap.',
      accessButton: 'Toegang Tot Je Digitale Curriculum en Gidsen',
      supportLabel: 'Hulp nodig?',
    },
    cancel: {
      title: 'Betaling Geannuleerd',
      body: 'Je betaling is niet voltooid. Er is geen bedrag in rekening gebracht.',
      retryButton: 'Opnieuw Proberen',
      whatIsWaiting: 'Dit Wacht Op Je',
      returnToOverview: 'Terug naar Overzicht',
    },
    footer: {
      tagline: 'Controle- en Vertrouwenssysteem',
      navigation: 'NAVIGATIE',
      legalPolicies: 'WETTELIJKE BEPALINGEN',
      whyItWorks: 'Waarom Het Werkt',
      fourPillarSystem: '4-Pijler Systeem',
      curriculumBonuses: 'Curriculum en Bonusen',
      verifiedReviews: 'Geverifieerde Beoordelingen',
      faq: 'FAQ',
      terms: 'Algemene Voorwaarden',
      privacy: 'Privacybeleid',
      guarantee: '30-DAGEN GARANTIE',
      guaranteeBody: '100% risicovrij. Als je binnen 30 dagen geen merkbaar betere controle ervaart, ontvang je een volledige terugbetaling. Geen vragen.',
      getAccess: 'Toegang voor $20',
      medicalDisclaimer: 'Medische Disclaimer:',
      medicalDisclaimerBody: 'Deze gids is educatief en vormt geen medisch advies of vervanging voor een consult met een erkend arts of uroloog.',
      copyright: '© 2026 SAVITY LLC / COMPOSURE METHOD. ALLE RECHTEN VOORBEHOUDEN.',
      encryptedCheckout: 'VERSLEUTELDE DIGITALE BETALING SSL 256-BIT',
    },
    stats: {
      menTrained: 'Mannen Getraind',
      averageRating: 'Gemiddelde Beoordeling',
      resultsIn30Days: 'Resultaten in 30 Dagen',
      moneyBackGuarantee: 'Geld Terug-Garantie',
    },
    testimonials: {
      heading: 'Wat Mannen Ervaren Met De Composure Methode',
      subtitle: 'Lees geverifieerde feedback van mannen die het 4-pijler somatische zenuwstelsel framework hebben toegepast om hun autonome zenuwstelsel te trainen.',
      reviews: [
        {
          name: 'James H.',
          age: '35 jaar • Geverifieerd Lid',
          role: 'Docent, Portland OR',
          rating: 5,
          headline: 'Eindelijk begrepen wat er echt met mijn lichaam gebeurde.',
          text: 'Ik had twee jaar lang gedacht dat er iets mis was met mij. De opwiekingschaal in Module 1 heeft me geholpen te begrijpen wat er fysiologisch gebeurde in plaats van wat ik voor mezelf bedacht. De ademhalingstechniek gaf me iets concreets om te doen in het moment in plaats van te spiralen.',
          stat: 'Zichtbare Verandering in 2 Weken',
          date: 'Gekocht maart 2026',
        },
        {
          name: 'Daniel N.',
          age: '42 jaar • Geverifieerd Lid',
          role: 'Longhaul Truckchauffeur, Nashville TN',
          rating: 5,
          headline: 'Het in mijn cabine bewaard en het werkt echt.',
          text: 'Ik ben niet het type om online programma\'s te kopen. Maar de referentiekaart in 5 stappen had praktische dingen die ik direct kon gebruiken. Mijn vrouw merkte het verschil al voordat ik het zag — ze zei dat ik minder gespannen en aanweziger overkwam. De bekkenbodem-oefeningen zijn simpel genoeg om te doen bij rustpauzes.',
          stat: 'Relatieverbetering',
          date: 'Gekocht mei 2026',
        },
        {
          name: 'Caleb R.',
          age: '31 jaar • Geverifieerd Lid',
          role: 'IT Support Specialist, Minneapolis MN',
          rating: 5,
          headline: 'Dit is gebaseerd op echte fysiologie, geen magische beloften.',
          text: 'Ik was bijna drie keer van plan mijn bestelling te annuleren omdat elk ander programma dat dit verkoopt een scam is. De wetenschap achter de Composure Methode is degelijk — het legt het autonome zenuwstelsel duidelijk uit en geeft je echte gereedschappen, niet alleen theorie. De dagelijkse checklist hield me consistent.',
          stat: 'Consistente Praktijk voor 30 Dagen',
          date: 'Gekocht april 2026',
        },
        {
          name: 'Omar S.',
          age: '38 jaar • Geverifieerd Lid',
          role: 'Restaurantmanager, Houston TX',
          rating: 5,
          headline: 'Gaf mijn partner en mij een manier om er samen over te praten.',
          text: 'Het moeilijkste was niet het fysieke probleem zelf — het was de stilte eromheen. De gespreksstarters van Bonus #2 openden een deur die we allebei probeerden te vermijden. Weten dat dit een veelvoorkomende, te trainen vaardigheid is, maakte dat ik me er niet alleen mee voelde.',
          stat: 'Gedeelde Vooruitgang met Partner',
          date: 'Gekocht juni 2026',
        },
      ],
    },
    languageSwitcher: {
      en: 'English',
      fr: 'Français',
      it: 'Italiano',
      nl: 'Nederlands',
      de: 'Deutsch',
    },
    problem: {
      headline: 'Waarom Gebeurt Dit In Je Dertiger Jaren — En Waarom Traditionele \'Oplossingen\' Falen?',
      subtext: 'Vanaf je dertigste verhogen levensstijlbelasting, carrièrestress en subtiele hormonale verschuivingen je sympathische zenuwstelsel. Wanneer prestatiedruk erbij komt, versnelt opwinding sneller dan je bewuste controle kan bijhouden.',
      resultLabel: 'Resultaat',
      sprayTitle: 'Verdovende Sprays & Crèmes',
      sprayDesc: 'Verdooft alle fysieke gevoel. Maakt intimiteit tot een gevoelloze, mechanische verplichting en draagt vaak over op je partner, wat wederzijds plezier verpest.',
      sprayResult: 'Tijdelijke Oplossing',
      pillTitle: 'Niet-goedgekeurde Pillen & Supplementen',
      pillDesc: 'Veroorzaakt onvoorspelbare bijwerkingen (hoofdpijn, blozen). Behandelt timing als een chemisch probleem in plaats van het zenuwstelsel opnieuw te trainen.',
      pillResult: 'Bijwerkingen',
      distractionTitle: 'Afleiding & Mentaal Tellen',
      distractionDesc: 'Terugtellen of aan sport denken haalt je volledig uit het moment. Vernietigt emotionele intimiteit en faalt bij hoge opwinding.',
      distractionResult: 'Lost De Oorzaak Niet Op',
      methodTitle: 'De Composure Methode',
      methodDesc: 'Traint je bekkenneuromusculaire respons en parasympathisch zenuwstelsel opnieuw. Bouwt echt, natuurlijk uithoudingsvermogen op dat je levenslang behoudt.',
      methodResult: 'Permanente Vaardigheid',
      mechanismLabel: 'HET NEUROFYSIOLOGISCHE MECHANISME',
      mechanismTitle: 'Hoe Het Hertrainen Van Parasympathische Controle Op Natuurlijke Wijze Het Climax Uitstelt',
      mechanismBody: 'Ejaculatie wordt bestuurd door het autonome zenuwstelsel. Wanneer angst of snelle ademhaling je lichaam in de sympathische (\'vecht-of-vlucht\') modus brengt, neemt de snelheid van zenuwimpulsen dramatisch toe. Door 4-2-7 parasympathische uitademingen te combineren met gerichte bekkenbodemontspanningen, verlaag je de zenuwsignaaldruk en houd je de opwinding soepel in het optimale bereik van 4–6 op de schaal van 1–10.',
      mechanismStat: '89%',
      mechanismContext: 'van de mannen meldt een merkbare verbetering in opwindingscontrole binnen 3 tot 4 weken dagelijkse oefening van 10 minuten.',
    },
    method: {
      headline: 'Een Compleet 4-Pijler Systeem Voor Blijvende Controle',
      subtext: 'De Composure Methode combineert fysiologische educatie, bekkenconditionering, parasympathische ademhalingsoefeningen en partnerscripts in een simpele dagelijkse gewoonte.',
      ctaHeadline: 'Klaar om je zenuwstelsel opnieuw te trainen en volledig zelfvertrouwen in de slaapkamer terug te krijgen?',
      ctaBody: 'Krijg direct toegang tot alle assets + 4 gratis bonussen voor $20 (totale waarde $197).',
      ctaButton: 'Begin Nu — $20 (Waarde $197)',
      pillars: [
        { title: 'Fysiologische Decodering', tagline: 'Deconstructie Van De Angst- & Schaamtecyclus', desc: 'Leer waarom veranderingen optreden in je 30e vanwege zenuwstelselsensitiviteit. Normaliseer de geest-lichaamrespons om performancedruk permanent te verwijderen.' },
        { title: 'Neuromusculaire Bekkentraining', tagline: 'De 1-10 Schaal & Stop-Start Trainer', desc: 'Kaart je opwindingdrempel, identificeer je niveau 7 punt van geen retour, en conditioneer je bekken spieren om zenuwsignaalintensiteit te reguleren.' },
        { title: 'Parasympatische Ademhalingscontrole', tagline: '4-2-7 Vaguszenuwregulatie', desc: 'Activeer parasympathische dominantie met langzame 4-telling inademing / 7-telling uitademing breathwork om een snelle hartslag te kalmeren en timing te verlengen.' },
        { title: 'Schaamtevrije Partneruitlijning', tagline: 'Woord-voor-woords Scripts & Tijdsindeling', desc: 'Verander intimiteit van een solo prestatietest naar een ontspannen, gedeelde ervaring met communicatieframeworks met lage inzet.' },
      ],
    },
    curriculum: {
      headline: 'Wat Je Krijgt Met De Composure Methode',
      unlocked: 'Ontgrendeld',
      membersOnly: 'Alleen Voor Leden',
      viewModuleContent: 'Bekijk Module-inhoud',
      subtext: '5 gestructureerde digitale modules, stap-voor-stap fysieke protocollen en 4 gratis instant bonussen, ontworpen voor snelle, discrete implementatie.',
      moduleLocked: 'Alleen Voor Leden',
      keyLessonsLabel: 'Belangrijkste Lessen:',
      freeBonusesLabel: '4 GRATIS BONUSSEN',
      bonusesHeading: 'Direct Toepasbare Digitale Middelen',
      bonusesBody: 'Inclusief de \'Vanavond\' 5-Stappen In-Bed Kaart, Partner Communicatie Playbook, 30/60/90 Voortgangsroadmap en AI-beoordelaar.',
      bonus1Label: '5-Stappen In-Bed Snelkaart (Waarde $30)',
      bonus2Label: 'Partner Communicatie Playbook (Waarde $25)',
      bonus3Label: '30/60/90-Dagen Voortgangsroadmap (Waarde $45)',
      bonus4Label: 'AI Personalisatieprotocol (Waarde $20)',
      bonusesCta: 'Claim Alle Bonussen Voor $20',
      yourBonusesHeading: 'Jouw 4 Gratis Bonussen — Direct Inbegrepen',
      bonusLabelPrefix: 'BONUS #',
      modules: [
        { moduleNumber: 1, title: 'Begrijpen Wat Er Werkelijk Gebeurt', description: 'Opwindingcontrole is een aangeleerde vaardigheid die gekoppeld is aan familiariteit en zenuwstelselsensitiviteit. Ontdek waarom veranderingen optreden in je 30e en hoe je de schaamtecyclus kunt doorbreken.', lessons: ['Les 1.1 — Waarom dit voorkomt, vanaf je 30e', 'Les 1.2 — De mythen ontkrachten die mannen vastlaten', 'Les 1.3 — De schaamtecyclus', 'Les 1.4 — Realistische verwachtingen stellen'] },
        { moduleNumber: 2, title: 'De Fysieke Toolkit', description: 'Leer de bekkenbodemspieren te lokaliseren en trainen, je 1-10 opwindingsschaal te in kaart te brengen, stop-start/edging technieken te gebruiken, en parasympathische ademhaling te benutten.', lessons: ['Les 2.1 — Bekkenbodem bewustzijn en training', 'Les 2.2 — Opwinding volgen: de stop-start en edging methoden', 'Les 2.3 — Ademhaling en zenuwstelselregulatie', 'Les 2.4 — Levensstijl grepen'] },
        { moduleNumber: 3, title: 'Het Mentale Spel', description: 'Verplaats de aandacht van zelf-monitoring naar huidige sensatie, vestig pre-intimiteit mindset routines, en behandel slechte avonden als data in plaats van vonnis.', lessons: ['Les 3.1 — Hoe prestatieangst een self-fulfilling prophecy wordt', 'Les 3.2 — Het moment herframen', 'Les 3.3 — Pre-intimiteit mindset routines', 'Les 3.4 — Een slechte avond hanteren zonder te spiralen'] },
        { moduleNumber: 4, title: 'De Relatie & Communicatielaag', description: 'Leer hoe je met een partner kunt praten zonder schaamte, herdefinieer intimiteit als een gedeelde reis, en gebruik sensate focus technieken.', lessons: ['Les 4.1 — Met een partner hierover praten', 'Les 4.2 — Intimiteit herdefinieren als een gedeelde ervaring', 'Les 4.3 — Vertrouwen samen opbouwen', 'Les 4.4 — Doorlopende communicatiegewoonten opbouwen'] },
        { moduleNumber: 5, title: 'Een Duurzame Routine Opbouwen', description: 'Bouw een gestructureerde dagelijkse gewoonte loop over 90 dagen, monitor trends zonder obsessie, en begrijp medische consult triggers.', lessons: ['Les 5.1 — Een 30/60/90-dagen praktijkstructuur', 'Les 5.2 — Vooruitgang volgen zonder te obsederen', 'Les 5.3 — Wanneer een arts, uroloog of therapeut raadplegen', 'Les 5.4 — Lange-termijn vertrouwen onderhouden'] },
      ],
    },
    guarantee: {
      heading: '100% RISICOVRIJE IJZERSTERKE GARANTIE',
      subheading: '100% RISICOVRIJE GARANTIE',
      body: 'Probeer De Composure Methode 30 Volle Dagen — Zonder Risico: neem 30 volle dagen om de modules door te nemen, de 4-2-7 ademhalingsoefeningen te beoefenen en de bekkenoefeningen te proberen. Als je geen merkbare toename in opwindingscontrole, uithoudingsvermogen en zelfvertrouwen in de slaapkamer ervaart, stuur ons dan een simpel e-mailtje voor een snelle, volledige terugbetaling van 100%. Geen vragen gesteld. Je houdt de gidsen als onze dank voor je eerlijke poging.',
      noQuestionsAsked: 'Geen Vragen Gesteld',
      keepAllContent: 'Behoud Alle Inhoud',
      fullRefund: 'Volledige Terugbetaling Van $20',
    },
    faq: {
      heading: 'Alles Wat Je Moet Weten',
      subtitle: 'Veelgestelde vragen over discrete facturering, directe digitale toegang en hoe het programma werkt.',
      items: [
        { q: 'Betekent dit dat er iets mis is met me?', a: 'Nee. Dit is een van de meest voorkomende fysieke ervaringen voor mannen, en voor de meeste mannen zonder een onderliggende medische aandoening is het een treinbaar patroon, geen defect.' },
        { q: 'Zal dit weer gebeuren ook nadat ik heb verbeterd?', a: 'Waarschijnlijk, af en toe. Vooruitgang is een trend, geen permanente schakelaar. Een slechte avond na weken van vooruitgang is ruis, geen teken dat je weer bij de start staat.' },
        { q: 'Hoe lang duurt het voordat ik echt een verschil merk?', a: 'De meeste mannen merken een betekenisvolle verandering in 4-8 weken van consistente oefening, met voortdurende verbetering over 2-3 maanden.' },
        { q: 'Moet ik mijn partner vertellen dat ik een gids als deze gebruik?', a: 'Volledig aan jou. Module 4 behandelt dit meer in detail, maar veel mannen vinden dat zelfs een korte, low-key vermelding de druk verlaagt in plaats van toevoegt.' },
        { q: 'Is dit hetzelfde als erectiestoornissen?', a: 'Nee — deze gids gaat over timing en controle, niet over het vermogen om een erectie te krijgen of te behouden. Het zijn gerelateerde maar verschillende gebieden, en ED heeft zijn eigen evaluatiepad bij een arts.' },
      ],
    },
    stickyCta: {
      productTitle: 'Het Composure Methode Pakket',
      memberUnlocked: 'Levenslange Ledentoegang Actief',
      nonMemberSubtitle: '5 Modules + 4 Gratis Bonussen • Waarde $197 (Bespaar $177)',
      cta: 'Krijg Direct Toegang ($20)',
    },
    testimonial: {
      quote: 'In een tijdperk gekenmerkt door constante ruis, gaf de Composure Methode me de structuur die ik nodig had om mijn focus te herbouwen. Het is niet alleen welzijn; het is een tactisch voordeel.',
      cite: 'Sarah Chen — Sr. Operations Lead, Meridian Health',
    },
    tools: {
      breathing: {
        title: 'Cortisolverlagende Ademhalingsoefening',
        subtitle: 'Synchroniseer je ademhalingsfrequentie om de nervus vagus te stimuleren en direct de cortisolspiegel in het bloed te verlagen.',
        pillarLabel: 'PIJLER 01: COGNITIEVE RESET',
        headerTitle: 'Cortisolverlagende Ademhalingsoefening',
        headerDesc: 'Synchroniseer je ademhalingsfrequentie om de nervus vagus te stimuleren en direct de cortisolspiegel in het bloed te verlagen.',
        audioOn: 'Audio Aan',
        audioOff: 'Gedempt',
        startProtocol: 'Start Protocol',
        pauseProtocol: 'Pauzeer Protocol',
        reset: 'Reset',
        logSession: 'Sessie Loggen',
        cyclesDone: 'VOLTOOIDE CYCLI',
        elapsedTime: 'VERSTREKEN TIJD',
        cortisolImpact: 'CORTISOL-IMPACT',
      },
      pelvic: {
        title: 'Neuromusculaire Bekkenbodemtrainer',
        subtitle: 'Begeleide trainer met getimede samentrekkingen en ontspanningen.',
        readyToTrain: 'KLAAR OM TE TRAINEN',
        squeezeHold: 'KNIJP & HOUD VAST',
        slowRelease: 'LANGZAAM LOSLATEN',
        beginSet: 'Begin Set Van 10 Herhalingen',
        pauseTrainer: 'Pauzeer Trainer',
        reset: 'Reset',
        techniqueNote: 'Techniekopmerking:',
        techniqueNoteBody: 'Houd je adem niet in tijdens de samentrekkingen. Behoud een soepele buikademhaling terwijl je de bekkenbodem voorzichtig omhoog en naar binnen optilt.',
      },
      arousal: {
        title: 'De 1–10 Opwindingsschaal & Stop-Start Trainer',
        subtitle: 'Sleep de schuifregelaar om te verkennen hoe je opwindingszones navigeert en Niveau 7 (Punt Van Geen Terugkeer) herkent.',
        interactiveTool: 'INTERACTIEVE TOOL · LES 2.2',
        lessonLabel: 'INTERACTIEVE TOOL · LES 2.2',
        baseline: '1 (Basislijn)',
        pointOfNoReturn: '⚡ 7 = PUNT VAN GEEN TERUGKEER',
        climax: '10 (Climax)',
        recommendedProtocol: 'Aanbevolen Protocol:',
      },
      clarity: {
        title: 'Genereer Tactisch Protocol',
        subtitle: 'Voer je huidige cognitieve en fysiologische toestand in. De AI Clarity Architect stelt een aangepast 3-stappenprotocol voor kalmte op.',
        aiLabel: 'AI CLARITY ARCHITECT',
        generateProtocol: 'Genereer Composure-protocol',
        synthesizing: 'Protocol Wordt Samengesteld...',
        clear: 'Wissen',
        synthesizedProtocol: 'SAMENGESTELD PROTOCOL',
        recommendedBreathwork: 'AANBEVOLEN ADEMHALINGSOEFENING',
        launchPacer: 'Start Pacer',
        tacticalSteps: 'TACTISCHE STAPPEN',
        awaitingInputs: 'Wachten Op Invoer',
        awaitingDesc: 'Stel links je stressniveau en primaire stressfactor in, klik dan op Genereren om je aangepaste protocol te ontvangen.',
      },
      journal: {
        title: 'Basislijn Helderheidsdagboek',
        subtitle: 'Volg je dagelijkse kalmtescore, fysiologische stressindicatoren en diepe focusvenster-metingen.',
        recordBaseline: 'Dagelijkse Basislijn Vastleggen',
        logBtn: 'Log Kalmte-basislijn',
        cancelBtn: 'Annuleren',
        saveBtn: 'Sessie Opslaan In Logboek',
      },
      roadmap: {
        title: 'De 30 / 60 / 90-Dagen Uitvoeringsroadmap',
        subtitle: 'Volg mijlpalen over 3 fasen met volharding-checks en gedetailleerde taakuitsplitsingen.',
        lessonLabel: 'ROADMAP TRACKER',
        days30: 'Dagen 1–30: Fundamentfase',
        days60: 'Dagen 31–60: Integratiefase',
        days90: 'Dagen 61–90: Verfijning & Meesterschap',
      },
      scripts: {
        title: 'Partner Communicatiescripts',
        subtitle: 'Laagdrempelige, schaamtevrije raamwerken om gesprekken met een partner te openen.',
        bonusLabel: 'BONUSMIDDEL B · PARTNERSCRIPTS',
        copyScript: 'Kopieer Script',
        copied: 'Gekopieerd Naar Klembord',
        situation: 'Situatie:',
      },
      shameCycle: {
        title: 'De Schaamtecyclus & Onderbrekingsmechanismen',
        subtitle: 'Interactief diagram dat laat zien hoe de angst-schaamtecyclus werkt en waar je deze kunt onderbreken.',
        interactiveDiagram: 'INTERACTIEF DIAGRAM · LES 1.3',
        lessonLabel: 'INTERACTIEF DIAGRAM · LES 1.3',
        simulate: 'Simuleer Cyclusonderbreking',
        active: 'Bewustzijn Actief (Cyclus Onderbroken)',
        insight: 'Belangrijk Inzicht:',
      },
    },
    practiceLog: {
      bonusLabel: 'BONUSMIDDEL C · OEFENLOGBOEK',
      title: 'Interactieve Oefen- En Trendtracker',
      overview30Day: '30-DAAGS GEMIDDELDE CONTROLE',
      totalSessions: 'TOTAAL GELOGDE SESSIES',
      pelvicReps: 'CUMULATIEVE BEKKENHERHALINGEN',
      logToday: 'Log De Oefening Van Vandaag',
      cancel: 'Annuleren',
      saveSession: 'Sessie Opslaan In Logboek',
      loggedEntries: 'Gelogde Vermeldingen',
      noLogs: 'Nog geen oefenlogboeken geregistreerd.',
      date: 'Datum',
      pelvicFloorReps: 'Bekkenbodemherhalingen',
      selfRatedControl: 'Zelfbeoordeelde Controle (1–10)',
      breathingDone: '4-2-7 Parasympathische Ademhalingsreset Vandaag Voltooid',
      notes: 'Notities / Observaties',
    },
    memberAccess: {
      title: 'Ledentoegang Verificatie',
      subtitle: 'Voer het e-mailadres in dat je tijdens het afrekenen hebt gebruikt om je betaalde bestelling te verifiëren en direct volledige digitale toegang te herstellen.',
      emailLabel: 'E-MAILADRES KLANT',
      emailPlaceholder: 'bijv. gebruiker@domein.com',
      verifyButton: 'VERIFIEER BETAALDE TOEGANG',
      verifyingButton: 'BESTELLING WORDT GEVERIFIEERD...',
      notPurchased: 'Nog niet gekocht? Krijg toegang voor $20.',
      discreetVerification: 'Discrete verificatie • Directe levering',
    },
    dashboard: {
      memberAccessActive: 'LEDENTOEGANG ACTIEF',
      dailyTrainingLog: 'Dagelijks Trainingslogboek',
      loggedInAs: 'Ingelogd als',
      backToHome: 'Terug Naar Home',
      currentStreak: 'HUIDIGE REEKS',
      totalSessions: 'TOTAAL SESSIES',
      weeklyCompletion: 'WEKELIJKSE VOLTOOIING',
      avgControlRating: 'GEMIDDELDE CONTROLEBEOORDELING',
      logTodayTraining: 'Log De Training Van Vandaag',
      whatDidYouTrain: 'WAT HEB JE VANDAAG GETRAIND?',
      duration: 'DUUR',
      controlRating: 'CONTROLEBEOORDELING',
      notesOptional: 'NOTITIES (OPTIONEEL)',
      saveTrainingLog: 'Trainingslogboek Opslaan',
      quickTools: 'Snelle Tools',
      breathingPacer: 'Ademhalingspacer',
      pelvicTrainer: 'Bekkentrainer',
      arousalScale: 'Opwindingsschaal',
      clarityProtocol: 'Helderheidsprotocol',
      recentSessions: 'Recente Sessies',
      clearHistory: 'Geschiedenis Wissen',
      noLogsYet: 'Nog geen trainingslogboeken. Log hierboven je eerste sessie.',
      noLogsYetDesc: 'Nog geen logboeken. Begin hierboven met trainen.',
      trainingMode: 'TRAININGSMODUS',
      dailyLogger: 'Dagelijkse Logger',
      streak1: 'Reeks Van 1 Dag',
      streakMulti: ' Dagen Reeks',
      streakIncredible: 'Ongelooflijke consistentie. Ga zo door.',
      streakBuilding: 'Je bouwt momentum op. Verbreek de keten niet.',
      streakFirst: 'Voltooi vandaag je eerste sessie.',
      sessionMin: ' min',
      saveLogSuccess: '✓ Logboek succesvol opgeslagen',
      totalValue: 'TOTALE GECOMBINEERDE WINKELWAARDE:',
      todayPrice: 'SPECIALE KORTINGSPRIJS VAN VANDAAG',
      todaySavings: 'Bespaar Vandaag $177',
    },
    selfQualification: {
      headline: 'Is De Composure Methode Iets Voor Jou?',
      subtext: 'We hebben dit systeem specifiek ontworpen voor mannen die bewezen fysieke en mentale beheersing verkiezen boven valse hoop.',
      forYouTitle: 'Dit Is Voor Jou Als...',
      forYouLabel: 'IDEALE KANDIDAAT',
      notForYouTitle: 'Dit Is NIET Voor Jou Als...',
      notForYouLabel: 'GEEN GOEDE MATCH',
      forYouBullets: [
        'Je bent een man van 30 jaar of ouder die te maken heeft met te snelle zaadlozing of verhoogde angst voorafgaand aan intimiteit.',
        'Je wilt een blijvende fysieke vaardigheid — geen sprays, crèmes of pillen.',
        'Je kunt 10 minuten per dag besteden aan discrete bekken- en ademhalingsoefeningen.',
        'Je hecht waarde aan discretie: een schoon, privé digitaal systeem, toegankelijk via telefoon of computer.',
      ],
      notForYouBullets: [
        'Je zoekt een pil die van de ene op de andere dag wonderen doet: dit programma traint spiergeheugen opnieuw en vereist 4-8 weken consistentie.',
        'Je geeft de voorkeur aan verdovende producten: als je graag alle gevoel verliest, is dit programma niets voor jou.',
        'Je hebt ernstige acute medische symptomen: plotselinge pijn, bloeding of prostaatproblemen die een uroloog vereisen.',
      ],
    },
    offer: {
      headline: 'Krijg Vandaag Het Complete Composure Systeem',
      subtext: 'Alles wat je nodig hebt om opwindingscontrole, bekkenconditionering en zelfvertrouwen met je partner onder de knie te krijgen.',
      retailValueLabel: 'WINKELWAARDE',
      includedLabel: 'INBEGREPEN DIGITALE MIDDELEN',
      totalRetailValue: 'TOTALE WINKELWAARDE:',
      todayLabel: 'SPECIALE PRIJS VAN VANDAAG',
      saveToday: 'Bespaar Vandaag $177',
      currency: 'USD',
      nonMemberButton: 'Claim Mijn Directe Toegang Voor $20',
      memberButton: 'Toegang Tot Je Volledig Ontgrendelde Systeem',
      guaranteeLine: '100% Risicovrije 30-Dagen Garantie',
      discreetBillingLine: 'Discrete Facturering ("CM DIGITAL")',
      instantLine: 'Directe Digitale Toegang',
      oneTimeLine: 'Eenmalige betaling • Geen abonnement • Directe digitale levering',
      disclaimerLine: '100% risicovrij. Als je binnen 30 dagen geen betekenisvolle vooruitgang merkt, krijg je een volledige terugbetaling.',
      items: [
        { label: 'De Composure Methode 5-Module Hoofdgids', value: '$97' },
        { label: 'Bonus #1: De "Vanavond" 5-Stappen In-Bed Naslagkaart', value: '$30' },
        { label: 'Bonus #2: Woord-voor-woords Partner Communicatie Playbook', value: '$25' },
        { label: 'Bonus #3: 30/60/90-Dagen Interactieve Voortgangsroadmap & Log', value: '$45' },
      ],
    },
    mobileDashboard: {
      memberAccessActive: 'LEDENTOEGANG ACTIEF',
      dailyTrainingLog: 'Dagelijks Trainingslogboek',
      loggedInAs: 'Ingelogd als',
      backToHome: 'Terug Naar Home',
      currentStreak: 'HUIDIGE REEKS',
      totalSessions: 'TOTAAL SESSIES',
      weeklyCompletion: 'WEKELIJKSE VOLTOOIING',
      avgControlRating: 'GEMIDDELDE CONTROLEBEOORDELING',
      logTodayTraining: 'Log De Training Van Vandaag',
      whatDidYouTrain: 'WAT HEB JE VANDAAG GETRAIND?',
      duration: 'DUUR',
      controlRating: 'CONTROLEBEOORDELING',
      notesOptional: 'NOTITIES (OPTIONEEL)',
      saveTrainingLog: 'Trainingslogboek Opslaan',
      quickTools: 'Snelle Tools',
      breathingPacer: 'Ademhalingspacer',
      pelvicTrainer: 'Bekkentrainer',
      arousalScale: 'Opwindingsschaal',
      clarityProtocol: 'Helderheidsprotocol',
      recentSessions: 'Recente Sessies',
      clearHistory: 'Geschiedenis Wissen',
      noLogsYet: 'Nog geen trainingslogboeken. Log hierboven je eerste sessie.',
      noLogsYetDesc: 'Nog geen logboeken. Begin hierboven met trainen.',
      trainingMode: 'TRAININGSMODUS',
      dailyLogger: 'Dagelijkse Logger',
      streak1: 'Reeks Van 1 Dag',
      streakMulti: ' Dagen Reeks',
      streakIncredible: 'Ongelooflijke consistentie. Ga zo door.',
      streakBuilding: 'Je bouwt momentum op. Verbreek de keten niet.',
      streakFirst: 'Voltooi vandaag je eerste sessie.',
      sessionMin: ' min',
      saveLogSuccess: '✓ Logboek succesvol opgeslagen',
      totalValue: 'TOTALE GECOMBINEERDE WINKELWAARDE:',
      todayPrice: 'SPECIALE KORTINGSPRIJS VAN VANDAAG',
      todaySavings: 'Bespaar Vandaag $177',
    },
  },
  de: {
    nav: {
      whyItWorks: 'Warum Es Funktioniert',
      theMethod: 'Die Methode',
      curriculum: 'Curriculum',
      reviews: 'Bewertungen',
      faq: 'FAQ',
      memberLogin: 'Mitgliederlogin',
      getAccess: 'Sofortiger Zugang — $20',
      accessGranted: 'MITGLIED',
      back: 'Zurück',
      memberLoginCheck: 'Mitgliederlogin / Zugang Prüfen',
    },
    hero: {
      headline: 'Meistern Sie die Kontrollexekulation und bauen Sie dauerhafte Ausdauer auf.',
      subtext: 'Ein 4-Säulen-Framework für das somatische Nervensystem, entwickelt für Männer, die natürliche, zuverlässige Kontrolle wollen — keine Pillen, keine Sprays, keine peinlichen Tricks.',
      ctaPrimary: 'Sofortiger Zugang — $20',
      ctaSecondary: 'Mitgliederlogin',
      guarantee: '30-Tage-Geld-zurück-Garantie',
      discreetBilling: 'Diskrete Abrechnung',
      instantDelivery: 'Sofortige Digitale Zustellung',
      priceBadge: '$20 USD',
      productImageAlt: 'Das Composure-Methode Digital-Paket',
      markVideoAria: 'Mark-Zeugenaussage-Video',
      muteVideo: 'Stummschalten',
      unmuteVideo: 'Stummschaltung aufheben',
      markLabel: 'Mark',
    },
    checkout: {
      title: 'Bestellung Abschließen',
      subtitle: 'Geben Sie Ihre E-Mail-Adresse ein, um eine sichere Bezahlungssitzung zu starten',
      emailLabel: 'Ihre E-MAIL FÜR SOFORTIGE DIGITALE ZUSTELLUNG',
      emailPlaceholder: 'name@beispiel.com',
      productLabel: 'Produkt',
      secureCheckout: 'SICHERE BEZAHLUNG',
      loadingCopy: 'Bezahlung wird geöffnet...',
      paymentMethods: 'Akzeptierte Zahlungsmethoden',
      acceptedPayment: 'Apple Pay, Google Pay, Visa, Mastercard, AMEX',
      fulfillment: 'Sofortige Zustellung',
      refundPolicy: '30-Tage-Geld-zurück-Garantie',
      discreetBilling: 'Diskrete Abrechnung',
      orderConfirmed: 'Bestellung Bestätigt!',
      orderVerified: 'Zahlung verifiziert',
      successBody: 'Ihre digitalen Zugangsdaten wurden an Ihre E-Mail gesendet. Wenn Sie diese nicht innerhalb weniger Minuten sehen, überprüfen Sie Ihren Spam- oder Junk-Ordner.',
      accessButton: 'Zugang zu Ihrem Digitalen Curriculum und Leitfäden',
      supportLabel: 'Brauchen Sie Hilfe?',
      pleaseEnterEmail: 'Bitte geben Sie Ihre E-Mail-Adresse ein, um fortzufahren.',
      includedItems: {
        instantAccess: 'Sofortiger Zugriff auf alle Geräte, alle kostenlosen Bonus-Handbücher & Tracker',
        moneyBack: '30-Tage 100% Geld-zurück-Garantie',
      },
      closeCheckout: 'Bezahlung schließen',
      digitalGuideFallback: 'Digitaler Bildungsleitfaden',
      orderVerifiedHeading: 'Bestellung Verifiziert — Willkommen bei Composure',
      fulfillmentFooter: 'Sofortige Zustellung • 30-Tage-Garantie • Diskrete Abrechnung',
      submitButton: 'Sofortiger Zugang — $20',
    },
    success: {
      title: 'Bestellung verifiziert. Willkommen bei Composure.',
      body: 'Ihre digitalen Zugangsdaten wurden an Ihre E-Mail gesendet. Wenn Sie diese nicht innerhalb weniger Minuten sehen, überprüfen Sie Ihren Spam- oder Junk-Ordner.',
      accessButton: 'Zugang zu Ihrem Digitalen Curriculum und Leitfäden',
      supportLabel: 'Brauchen Sie Hilfe?',
    },
    cancel: {
      title: 'Bezahlung Abgebrochen',
      body: 'Ihre Bezahlung wurde nicht abgeschlossen. Es wurde kein Betrag berechnet.',
      retryButton: 'Erneut Versuchen',
      whatIsWaiting: 'Das Erwartet Sie',
      returnToOverview: 'Zurück zur Übersicht',
    },
    footer: {
      tagline: 'Kontroll- und Vertrauenssystem',
      navigation: 'NAVIGATION',
      legalPolicies: 'RECHTLICHE HINWEISE',
      whyItWorks: 'Warum Es Funktioniert',
      fourPillarSystem: '4-Säulen-System',
      curriculumBonuses: 'Curriculum und Boni',
      verifiedReviews: 'Verifizierte Bewertungen',
      faq: 'FAQ',
      terms: 'Allgemeine Geschäftsbedingungen',
      privacy: 'Datenschutzerklärung',
      guarantee: '30-TAGE-GARANTIE',
      guaranteeBody: '100 % risikofrei. Wenn Sie innerhalb von 30 Tagen keine spürbare Verbesserung der Kontrolle feststellen, erhalten Sie eine vollständige Rückerstattung. Ohne Fragen.',
      getAccess: 'Zugang für $20',
      medicalDisclaimer: 'Medizinischer Hinweis:',
      medicalDisclaimerBody: 'Dieser Leitfaden ist Bildungsmaterial und stellt keine medizinische Beratung dar und ersetzt keine Konsultation mit einem zugelassenen Arzt oder Urologen.',
      copyright: '© 2026 SAVITY LLC / COMPOSURE METHOD. ALLE RECHTE VORBEHALTEN.',
      encryptedCheckout: 'VERSCHLÜSSELTE DIGITALE BEZAHLUNG SSL 256-BIT',
    },
    stats: {
      menTrained: 'Männer Trainiert',
      averageRating: 'Durchschnittliche Bewertung',
      resultsIn30Days: 'Ergebnisse in 30 Tagen',
      moneyBackGuarantee: 'Geld-zurück-Garantie',
    },
    testimonials: {
      heading: 'Was Männer Mit Der Composure Methode Erleben',
      subtitle: 'Lesen Sie verifiziertes Feedback von Männern, die das 4-Säulen-Neuromuskel- und Atemrahmenwerk angewandt haben, um ihr autonomes Nervensystem neu zu trainieren.',
      reviews: [
        {
          name: 'James H.',
          age: '35 Jahre • Verifiziertes Mitglied',
          role: 'Lehrer, Portland OR',
          rating: 5,
          headline: 'Endlich verstanden, was wirklich mit meinem Körper los war.',
          text: 'Ich habe zwei Jahre lang gedacht, irgendetwas wäre mit mir kaputt. Die Arousal-Skala in Modul 1 hat mir geholfen zu verstehen, was physiologisch wirklich passierte, anstatt das, was ich mir vorgestellt hatte. Die Atemreset-Technik gab mir etwas Konkretes zu tun im Moment, anstatt in Panik zu geraten.',
          stat: 'Sichtbare Veränderung in 2 Wochen',
          date: 'Gekauft März 2026',
        },
        {
          name: 'Daniel N.',
          age: '42 Jahre • Verifiziertes Mitglied',
          role: 'Langstreckenfahrer, Nashville TN',
          rating: 5,
          headline: 'In meiner Fahrerkabine bewahrt und es funktioniert wirklich.',
          text: 'Ich bin nicht der Typ, der Online-Programme kauft. Aber die 5-Schritte-Referenzkarte hatte Praktisches, das ich sofort anwenden konnte. Meine Frau bemerkte den Unterschied vor mir — sie sagte, ich wirkte weniger angespannt und präsenter. Die Beckenbodenübungen sind einfach genug, um an Raststätten zu machen.',
          stat: 'Verbesserung der Beziehung',
          date: 'Gekauft Mai 2026',
        },
        {
          name: 'Caleb R.',
          age: '31 Jahre • Verifiziertes Mitglied',
          role: 'IT-Support, Minneapolis MN',
          rating: 5,
          headline: 'Das ist auf echter Physiologie basiert, keine magischen Versprechen.',
          text: 'Ich habe beinahe meine Bestellung dreimal storniert, weil jedes andere Programm, das das verkauft, ein Betrug ist. Die Wissenschaft hinter der Composure Methode ist fundiert — sie erklärt das autonome Nervensystem klar und gibt Ihnen echte Werkzeuge, nicht nur Theorie. Die tägliche Checkliste half mir, dranzubleiben.',
          stat: 'Konsistente Praxis für 30 Tage',
          date: 'Gekauft April 2026',
        },
        {
          name: 'Omar S.',
          age: '38 Jahre • Verifiziertes Mitglied',
          role: 'Restaurantleiter, Houston TX',
          rating: 5,
          headline: 'Hat meiner Partnerin und mir einen Weg gegeben, darüber gemeinsam zu sprechen.',
          text: 'Das Schwerste war nicht das körperliche Problem selbst — es war die Stille darum herum. Die Gesprächseinstiege aus Bonus #2 haben eine Tür geöffnet, vor der wir beide zurückgeschreckt waren. Zu wissen, dass dies eine häufige, trainierbare Fähigkeit ist, ließ mich nicht mehr allein damit dastehen.',
          stat: 'Gemeinsamer Fortschritt mit Partner',
          date: 'Gekauft Juni 2026',
        },
      ],
    },
    languageSwitcher: {
      en: 'English',
      fr: 'Français',
      it: 'Italiano',
      nl: 'Nederlands',
      de: 'Deutsch',
    },
    problem: {
      headline: 'Warum Passiert Das In Den 30ern — Und Warum Traditionelle \'Lösungen\' Scheitern?',
      subtext: 'Ab den 30ern verstärken Lebensstilbelastung, Karrierestress und subtile hormonelle Veränderungen Ihr sympathisches Nervensystem. Wenn Leistungsdruck ins Spiel kommt, beschleunigt sich die Erregung schneller, als Ihre bewusste Kontrolle mithalten kann.',
      resultLabel: 'Ergebnis',
      sprayTitle: 'Betäubende Sprays & Cremes',
      sprayDesc: 'Betäubt jedes körperliche Gefühl. Verwandelt Intimität in eine gefühllose, mechanische Pflicht und überträgt sich oft auf Ihre Partnerin, was das gemeinsame Vergnügen ruiniert.',
      sprayResult: 'Temporäre Lösung',
      pillTitle: 'Nicht Zugelassene Pillen & Nahrungsergänzungsmittel',
      pillDesc: 'Verursacht unvorhersehbare Nebenwirkungen (Kopfschmerzen, Erröten). Behandelt Timing als chemisches Problem statt die Kontrolle des Nervensystems neu zu trainieren.',
      pillResult: 'Nebenwirkungen',
      distractionTitle: 'Ablenkung & Gedankliches Zählen',
      distractionDesc: 'Rückwärtszählen oder an Sport denken reißt Sie vollständig aus dem Moment. Zerstört emotionale Intimität und versagt bei starker Erregung.',
      distractionResult: 'Behebt Nicht Die Ursache',
      methodTitle: 'Die Composure Methode',
      methodDesc: 'Trainiert Ihre neuromuskuläre Beckenreaktion und Ihr parasympathisches Nervensystem neu. Baut echte, natürliche Ausdauer auf, die Sie ein Leben lang behalten.',
      methodResult: 'Dauerhafte Fähigkeit',
      mechanismLabel: 'DER NEUROPHYSIOLOGISCHE MECHANISMUS',
      mechanismTitle: 'Wie Das Neutraining Der Parasympathischen Kontrolle Den Höhepunkt Auf Natürliche Weise Verzögert',
      mechanismBody: 'Die Ejakulation wird vom autonomen Nervensystem gesteuert. Wenn Angst oder schnelle Atmung Ihren Körper in den sympathischen (\'Kampf-oder-Flucht\'-)Modus versetzen, steigt die Geschwindigkeit der Nervenimpulse dramatisch an. Durch die Kombination von 4-2-7-parasympathischen Ausatmungen mit gezielten Beckenboden-Entspannungen senken Sie den Nervensignaldruck und halten die Erregung gleichmäßig im optimalen Bereich von 4–6 auf der Skala von 1–10.',
      mechanismStat: '89%',
      mechanismContext: 'der Männer berichten von einer spürbaren Verbesserung der Erregungskontrolle innerhalb von 3 bis 4 Wochen täglicher 10-minütiger Übung.',
    },
    method: {
      headline: 'Ein Vollständiges 4-Säulen-System Für Dauerhafte Kontrolle',
      subtext: 'Die Composure Methode kombiniert physiologische Aufklärung, Beckenkonditionierung, parasympathische Atemarbeit und Partner-Skripte zu einer einfachen täglichen Gewohnheit.',
      ctaHeadline: 'Bereit, Ihr Nervensystem neu zu trainieren und volles Selbstvertrauen im Schlafzimmer zurückzugewinnen?',
      ctaBody: 'Erhalten Sie sofortigen Zugriff auf alle Assets + 4 kostenlose Boni für $20 (Gesamtwert $197).',
      ctaButton: 'Jetzt Loslegen — $20 (Wert $197)',
      pillars: [
        { title: 'Physiologische Dekodierung', tagline: 'Dekonstruktion Der Angst- & Scham-Schleife', desc: 'Lernen Sie, warum Veränderungen in Ihren 30er Jahren aufgrund von Nervensystemempfindlichkeit auftreten. Normalisieren Sie die Geist-Körper-Reaktion, um Leistungsdruck dauerhaft zu beseitigen.' },
        { title: 'Neuromuskuläres Beckenbodentraining', tagline: 'Die 1–10 Skala & Stop-Start-Trainer', desc: 'Kartieren Sie Ihre Erregungsschwelle, identifizieren Sie Ihren Punkt ohne Rückkehr auf Stufe 7, und konditionieren Sie Ihre Beckenbodenmuskeln, um die Nervensignalintensität zu regulieren.' },
        { title: 'Parasympathische Atemkontrolle', tagline: '4-2-7 Vagusnerven-Regulation', desc: 'Aktivieren Sie parasympathische Dominanz mit langsamer 4er-Einatmung / 7er-Ausatmung Atemarbeit, um schnellen Herzschlag zu beruhigen und den Zeitpunkt zu verlängern.' },
        { title: 'Schamfreie Partnerausrichtung', tagline: 'Wörtliche Skripte & Tempo', desc: 'Verwandeln Sie Intimität von einem Solo-Leistungstest in eine entspannte, gemeinsame Erfahrung mit risikoarmen Kommunikationsframeworks.' },
      ],
    },
    curriculum: {
      headline: 'Was Sie Mit Der Composure Methode Erhalten',
      unlocked: 'Freigeschaltet',
      membersOnly: 'Nur Für Mitglieder',
      viewModuleContent: 'Modulinhalt Ansehen',
      subtext: '5 strukturierte digitale Module, Schritt-für-Schritt-Protokolle und 4 kostenlose Sofort-Boni, konzipiert für eine schnelle, diskrete Umsetzung.',
      moduleLocked: 'Nur Für Mitglieder',
      keyLessonsLabel: 'Wichtigste Lektionen:',
      freeBonusesLabel: '4 KOSTENLOSE BONI',
      bonusesHeading: 'Sofort Umsetzbare Digitale Inhalte',
      bonusesBody: 'Enthält das \'Heute Abend\' 5-Schritte-Bett-Blatt, das Partner-Kommunikations-Playbook, die 30/60/90-Fortschritts-Roadmap und den KI-Bewerter.',
      bonus1Label: '5-Schritte-Bett-Schnellübersicht (Wert $30)',
      bonus2Label: 'Partner-Kommunikations-Playbook (Wert $25)',
      bonus3Label: '30/60/90-Tage-Fortschritts-Roadmap (Wert $45)',
      bonus4Label: 'KI-Personalisierungsprotokoll (Wert $20)',
      bonusesCta: 'Alle Boni Für $20 Sichern',
      yourBonusesHeading: 'Ihre 4 Kostenlosen Boni — Sofort Inbegriffen',
      bonusLabelPrefix: 'BONUS #',
      modules: [
        { moduleNumber: 1, title: 'Verstehen, Was Wirklich Passiert', description: 'Erregungskontrolle ist eine erlernte Fähigkeit, die an Vertrautheit und Nervensystemempfindlichkeit gebunden ist. Entdecken Sie, warum Veränderungen in Ihren 30er Jahren auftreten und wie Sie die Scham-Schleife durchbrechen.', lessons: ['Lektion 1.1 — Warum das auftritt, ab den 30er Jahren', 'Lektion 1.2 — Die Mythen entlarven, die Männer festhalten', 'Lektion 1.3 — Die Scham-Schleife', 'Lektion 1.4 — Realistische Erwartungen setzen'] },
        { moduleNumber: 2, title: 'Der Physische Werkzeugkasten', description: 'Lernen Sie, die Beckenbodenmuskeln zu lokalisieren und zu trainieren, Ihre 1–10 Erregungsskala zu kartieren, Stop-Start/Edging-Techniken einzusetzen und parasympathische Atemarbeit zu nutzen.', lessons: ['Lektion 2.1 — Beckenboden-Bewusstsein und -Training', 'Lektion 2.2 — Erregungsverfolgung: die Stop-Start- und Edging-Methoden', 'Lektion 2.3 — Atmung und Nervensystem-Regulation', 'Lektion 2.4 — Lifestyle-Hebel'] },
        { moduleNumber: 3, title: 'Das Mentale Spiel', description: 'Verlagern Sie die Aufmerksamkeit von der Selbstüberwachung auf gegenwärtige Empfindungen, etablieren Sie Pre-Intimität-Mindset-Routinen und behandeln Sie schlechte Nächte als Daten statt als Urteile.', lessons: ['Lektion 3.1 — Wie Leistungsangst selbst erfüllend wird', 'Lektion 3.2 — Den Moment neu framen', 'Lektion 3.3 — Pre-Intimität-Mindset-Routinen', 'Lektion 3.4 — Eine schlechte Nacht handhaben, ohne zu spirale'] },
        { moduleNumber: 4, title: 'Die Beziehungs- & Kommunikationsebene', description: 'Lernen Sie, wie Sie ohne Scham mit einem Partner sprechen, Intimität als gemeinsame Reise neu definieren und Sensate-Focus-Techniken einsetzen.', lessons: ['Lektion 4.1 — Mit einem Partner darüber sprechen', 'Lektion 4.2 — Intimität als gemeinsame Erfahrung neu definieren', 'Lektion 4.3 — Gemeinsam Vertrauen wiederaufbauen', 'Lektion 4.4 — Laufende Kommunikationsgewohnheiten aufbauen'] },
        { moduleNumber: 5, title: 'Eine Nachhaltige Routine Aufbauen', description: 'Konstruieren Sie eine strukturierte tägliche Gewohnheitsschleife über 90 Tage, überwachen Sie Trends ohne Obsession und verstehen Sie medizinische Konsultationsauslöser.', lessons: ['Lektion 5.1 — Eine 30/60/90-Tage-Praxisstruktur', 'Lektion 5.2 — Fortschritt verfolgen, ohne zu obsessieren', 'Lektion 5.3 — Wann einen Arzt, Urologen oder Therapeuten aufsuchen', 'Lektion 5.4 — Langfristige Vertrauenswartung'] },
      ],
    },
    guarantee: {
      heading: '100 % RISIKOFREIE EISERNE GARANTIE',
      subheading: '100 % RISIKOFREIE GARANTIE',
      body: 'Testen Sie Die Composure Methode 30 Volle Tage — Ohne Risiko: Nehmen Sie sich 30 volle Tage Zeit, um die Module durchzugehen, die 4-2-7-Atemarbeit zu üben und die Beckenübungen auszuprobieren. Wenn Sie keine spürbare Verbesserung der Erregungskontrolle, Ausdauer und des Selbstvertrauens im Schlafzimmer feststellen, senden Sie uns eine einfache E-Mail für eine umgehende, vollständige Rückerstattung von 100 %. Ohne Fragen. Sie behalten die Leitfäden als unseren Dank für einen ehrlichen Versuch.',
      noQuestionsAsked: 'Ohne Fragen',
      keepAllContent: 'Behalten Sie Alle Inhalte',
      fullRefund: 'Vollständige Rückerstattung Von $20',
    },
    faq: {
      heading: 'Alles, Was Sie Wissen Müssen',
      subtitle: 'Häufige Fragen zu diskreter Abrechnung, sofortigem digitalen Zugang und der Funktionsweise des Programms.',
      items: [
        { q: 'Bedeutet das, dass etwas mit mir nicht stimmt?', a: 'Nein. Dies ist eine der häufigsten körperlichen Erfahrungen für Männer, und für die meisten Männer ohne eine zugrunde liegende Erkrankung ist es ein trainierbares Muster, kein Defekt.' },
        { q: 'Wird das auch nach meiner Verbesserung wieder auftreten?', a: 'Wahrscheinlich, gelegentlich. Fortschritt ist ein Trend, kein permanenter Schalter. Eine schlechte Nacht nach Wochen des Fortschritts ist Rauschen, kein Zeichen, dass Sie wieder am Anfang stehen.' },
        { q: 'Wie lange dauert es, bis ich tatsächlich einen Unterschied bemerke?', a: 'Die meisten Männer bemerken eine bedeutsame Veränderung in 4–8 Wochen konsequenter Übung, mit weiterer Verbesserung über 2–3 Monate.' },
        { q: 'Sollte ich meiner Partnerin sagen, dass ich einen solchen Leitfaden verwende?', a: 'Völlig Ihre Entscheidung. Modul 4 behandelt dies ausführlicher, aber viele Männer finden, dass selbst eine kurze, unaufdringliche Erwähnung den Druck eher verringert als erhöht.' },
        { q: 'Ist das dasselbe wie Erektionsstörungen?', a: 'Nein — dieser Leitfaden handelt von Timing und Kontrolle, nicht von der Fähigkeit, eine Erektion zu bekommen oder zu halten. Es sind verwandte, aber unterschiedliche Bereiche, und ED hat seinen eigenen Evaluationsweg bei einem Arzt.' },
      ],
    },
    stickyCta: {
      productTitle: 'Das Composure Methode Paket',
      memberUnlocked: 'Lebenslanger Mitgliederzugang Aktiv',
      nonMemberSubtitle: '5 Module + 4 Kostenlose Boni • Wert $197 (Sparen Sie $177)',
      cta: 'Sofortigen Zugang Erhalten ($20)',
    },
    testimonial: {
      quote: 'In einer Zeit, die von ständigem Lärm geprägt ist, gab mir die Composure Methode die Struktur, die ich brauchte, um meinen Fokus wiederaufzubauen. Es ist nicht nur Wellness; es ist ein taktischer Vorteil.',
      cite: 'Sarah Chen — Sr. Operations Lead, Meridian Health',
    },
    tools: {
      breathing: {
        title: 'Atemarbeit Zur Cortisolreduktion',
        subtitle: 'Synchronisieren Sie Ihre Atemfrequenz, um den Vagusnerv zu stimulieren und den Serumcortisolspiegel sofort zu senken.',
        pillarLabel: 'SÄULE 01: KOGNITIVER RESET',
        headerTitle: 'Atemarbeit Zur Cortisolreduktion',
        headerDesc: 'Synchronisieren Sie Ihre Atemfrequenz, um den Vagusnerv zu stimulieren und den Serumcortisolspiegel sofort zu senken.',
        audioOn: 'Audio An',
        audioOff: 'Stummgeschaltet',
        startProtocol: 'Protokoll Starten',
        pauseProtocol: 'Protokoll Pausieren',
        reset: 'Zurücksetzen',
        logSession: 'Sitzung Protokollieren',
        cyclesDone: 'ABGESCHLOSSENE ZYKLEN',
        elapsedTime: 'VERSTRICHENE ZEIT',
        cortisolImpact: 'CORTISOL-EINFLUSS',
      },
      pelvic: {
        title: 'Neuromuskulärer Beckenboden-Trainer',
        subtitle: 'Geführter Trainer mit zeitgesteuerten Kontraktionen und Entspannungen.',
        readyToTrain: 'BEREIT ZUM TRAINIEREN',
        squeezeHold: 'ANSPANNEN & HALTEN',
        slowRelease: 'LANGSAM LÖSEN',
        beginSet: '10er-Serie Beginnen',
        pauseTrainer: 'Trainer Pausieren',
        reset: 'Zurücksetzen',
        techniqueNote: 'Technik-Hinweis:',
        techniqueNoteBody: 'Halten Sie während der Kontraktionen nicht den Atem an. Behalten Sie eine sanfte Bauchatmung bei, während Sie den Beckenboden sanft nach oben und innen anheben.',
      },
      arousal: {
        title: 'Die 1–10-Erregungsskala & Der Stop-Start-Trainer',
        subtitle: 'Ziehen Sie den Regler, um zu erkunden, wie Sie Erregungszonen navigieren und Stufe 7 (Punkt Ohne Wiederkehr) erkennen.',
        interactiveTool: 'INTERAKTIVES WERKZEUG · LEKTION 2.2',
        lessonLabel: 'INTERAKTIVES WERKZEUG · LEKTION 2.2',
        baseline: '1 (Ausgangswert)',
        pointOfNoReturn: '⚡ 7 = PUNKT OHNE WIEDERKEHR',
        climax: '10 (Höhepunkt)',
        recommendedProtocol: 'Empfohlenes Protokoll:',
      },
      clarity: {
        title: 'Taktisches Protokoll Erstellen',
        subtitle: 'Geben Sie Ihren aktuellen kognitiven und physiologischen Zustand ein. Der KI-Klarheitsarchitekt erstellt ein individuelles 3-Schritte-Protokoll für innere Ruhe.',
        aiLabel: 'KI-KLARHEITSARCHITEKT',
        generateProtocol: 'Composure-Protokoll Erstellen',
        synthesizing: 'Protokoll Wird Erstellt...',
        clear: 'Löschen',
        synthesizedProtocol: 'ERSTELLTES PROTOKOLL',
        recommendedBreathwork: 'EMPFOHLENE ATEMARBEIT',
        launchPacer: 'Pacer Starten',
        tacticalSteps: 'TAKTISCHE SCHRITTE',
        awaitingInputs: 'Warten Auf Eingaben',
        awaitingDesc: 'Stellen Sie links Ihr Stresslevel und den primären Stressfaktor ein und klicken Sie dann auf Erstellen, um Ihr individuelles Protokoll zu erhalten.',
      },
      journal: {
        title: 'Ausgangswert-Klarheitstagebuch',
        subtitle: 'Verfolgen Sie Ihren täglichen Gelassenheits-Score, physiologische Stressindikatoren und Metriken zum tiefen Fokusfenster.',
        recordBaseline: 'Täglichen Ausgangswert Erfassen',
        logBtn: 'Gelassenheits-Ausgangswert Protokollieren',
        cancelBtn: 'Abbrechen',
        saveBtn: 'Sitzung Im Protokoll Speichern',
      },
      roadmap: {
        title: 'Die 30-/60-/90-Tage-Umsetzungs-Roadmap',
        subtitle: 'Verfolgen Sie Meilensteine über 3 Phasen mit Beständigkeitsprüfungen und detaillierten Aufgabenaufschlüsselungen.',
        lessonLabel: 'ROADMAP-TRACKER',
        days30: 'Tage 1–30: Grundlagenphase',
        days60: 'Tage 31–60: Integrationsphase',
        days90: 'Tage 61–90: Verfeinerung & Meisterschaft',
      },
      scripts: {
        title: 'Partner-Kommunikationsskripte',
        subtitle: 'Risikoarme, schamfreie Rahmenwerke, um Gespräche mit einer Partnerin zu eröffnen.',
        bonusLabel: 'BONUS-INHALT B · PARTNER-SKRIPTE',
        copyScript: 'Skript Kopieren',
        copied: 'In Zwischenablage Kopiert',
        situation: 'Situation:',
      },
      shameCycle: {
        title: 'Der Schamkreislauf & Unterbrechungsmechanismen',
        subtitle: 'Interaktives Diagramm, das zeigt, wie der Angst-Scham-Kreislauf funktioniert und wo man ihn unterbrechen kann.',
        interactiveDiagram: 'INTERAKTIVES DIAGRAMM · LEKTION 1.3',
        lessonLabel: 'INTERAKTIVES DIAGRAMM · LEKTION 1.3',
        simulate: 'Kreislaufunterbrechung Simulieren',
        active: 'Bewusstsein Aktiv (Kreislauf Unterbrochen)',
        insight: 'Wichtigste Erkenntnis:',
      },
    },
    practiceLog: {
      bonusLabel: 'BONUS-INHALT C · ÜBUNGSPROTOKOLL',
      title: 'Interaktiver Übungs- Und Trend-Tracker',
      overview30Day: '30-TAGE-DURCHSCHNITTSKONTROLLE',
      totalSessions: 'PROTOKOLLIERTE SITZUNGEN GESAMT',
      pelvicReps: 'KUMULIERTE BECKENWIEDERHOLUNGEN',
      logToday: 'Heutige Übung Protokollieren',
      cancel: 'Abbrechen',
      saveSession: 'Sitzung Im Protokoll Speichern',
      loggedEntries: 'Protokollierte Einträge',
      noLogs: 'Bisher keine Übungsprotokolle erfasst.',
      date: 'Datum',
      pelvicFloorReps: 'Beckenboden-Wiederholungen',
      selfRatedControl: 'Selbsteingeschätzte Kontrolle (1–10)',
      breathingDone: '4-2-7-Parasympathischen Atem-Reset Heute Abgeschlossen',
      notes: 'Notizen / Beobachtungen',
    },
    memberAccess: {
      title: 'Mitgliederzugang-Überprüfung',
      subtitle: 'Geben Sie die beim Bezahlvorgang verwendete E-Mail-Adresse ein, um Ihre bezahlte Bestellung zu überprüfen und den vollständigen digitalen Zugang sofort wiederherzustellen.',
      emailLabel: 'E-MAIL-ADRESSE DES KUNDEN',
      emailPlaceholder: 'z. B. nutzer@domain.com',
      verifyButton: 'BEZAHLTEN ZUGANG ÜBERPRÜFEN',
      verifyingButton: 'BESTELLUNG WIRD ÜBERPRÜFT...',
      notPurchased: 'Noch nicht gekauft? Erhalten Sie Zugang für $20.',
      discreetVerification: 'Diskrete Überprüfung • Sofortige Lieferung',
    },
    dashboard: {
      memberAccessActive: 'MITGLIEDERZUGANG AKTIV',
      dailyTrainingLog: 'Tägliches Trainingsprotokoll',
      loggedInAs: 'Angemeldet als',
      backToHome: 'Zurück Zur Startseite',
      currentStreak: 'AKTUELLE SERIE',
      totalSessions: 'SITZUNGEN GESAMT',
      weeklyCompletion: 'WÖCHENTLICHE ABSCHLUSSRATE',
      avgControlRating: 'DURCHSCHNITTLICHE KONTROLLBEWERTUNG',
      logTodayTraining: 'Heutiges Training Protokollieren',
      whatDidYouTrain: 'WAS HABEN SIE HEUTE TRAINIERT?',
      duration: 'DAUER',
      controlRating: 'KONTROLLBEWERTUNG',
      notesOptional: 'NOTIZEN (OPTIONAL)',
      saveTrainingLog: 'Trainingsprotokoll Speichern',
      quickTools: 'Schnellwerkzeuge',
      breathingPacer: 'Atem-Pacer',
      pelvicTrainer: 'Beckentrainer',
      arousalScale: 'Erregungsskala',
      clarityProtocol: 'Klarheitsprotokoll',
      recentSessions: 'Letzte Sitzungen',
      clearHistory: 'Verlauf Löschen',
      noLogsYet: 'Noch keine Trainingsprotokolle. Protokollieren Sie oben Ihre erste Sitzung.',
      noLogsYetDesc: 'Noch keine Protokolle. Beginnen Sie oben mit dem Training.',
      trainingMode: 'TRAININGSMODUS',
      dailyLogger: 'Tägliches Protokoll',
      streak1: '1-Tage-Serie',
      streakMulti: '-Tage-Serie',
      streakIncredible: 'Unglaubliche Beständigkeit. Machen Sie weiter so.',
      streakBuilding: 'Sie bauen Schwung auf. Unterbrechen Sie die Kette nicht.',
      streakFirst: 'Schließen Sie heute Ihre erste Sitzung ab.',
      sessionMin: ' Min.',
      saveLogSuccess: '✓ Protokoll erfolgreich gespeichert',
      totalValue: 'GESAMTER KOMBINIERTER EINZELHANDELSWERT:',
      todayPrice: 'HEUTIGER SONDER-RABATTPREIS',
      todaySavings: 'Sparen Sie Heute $177',
    },
    selfQualification: {
      headline: 'Ist Die Composure Methode Das Richtige Für Sie?',
      subtext: 'Wir haben dieses System speziell für Männer entwickelt, die evidenzbasierte körperliche und mentale Beherrschung falschen Hoffnungen vorziehen.',
      forYouTitle: 'Das Ist Für Sie, Wenn...',
      forYouLabel: 'IDEALER KANDIDAT',
      notForYouTitle: 'Das Ist NICHT Für Sie, Wenn...',
      notForYouLabel: 'KEINE PASSUNG',
      forYouBullets: [
        'Sie sind ein Mann ab 30 Jahren, der mit vorzeitigem Samenerguss oder erhöhter Angst vor Intimität zu kämpfen hat.',
        'Sie wollen eine dauerhafte körperliche Fähigkeit — keine Sprays, Cremes oder Pillen.',
        'Sie können sich 10 Minuten pro Tag für diskrete Becken- und Atemübungen Zeit nehmen.',
        'Sie legen Wert auf Diskretion: ein sauberes, privates digitales System, zugänglich über Telefon oder Computer.',
      ],
      notForYouBullets: [
        'Sie suchen eine über Nacht wirkende Wunderpille: Dieses Programm trainiert das Muskelgedächtnis neu und erfordert 4–8 Wochen Beständigkeit.',
        'Sie bevorzugen betäubende Produkte: Wenn Sie gerne jedes Gefühl verlieren, ist dieses Programm nichts für Sie.',
        'Sie haben schwerwiegende akute medizinische Symptome: plötzliche Schmerzen, Blutungen oder Prostataprobleme, die einen Urologen erfordern.',
      ],
    },
    offer: {
      headline: 'Sichern Sie Sich Heute Das Komplette Composure System',
      subtext: 'Alles, was Sie brauchen, um Erregungskontrolle, Beckenkonditionierung und Selbstvertrauen mit Ihrer Partnerin zu meistern.',
      retailValueLabel: 'EINZELHANDELSWERT',
      includedLabel: 'ENTHALTENE DIGITALE INHALTE',
      totalRetailValue: 'GESAMTER EINZELHANDELSWERT:',
      todayLabel: 'HEUTIGER SONDERPREIS',
      saveToday: 'Sparen Sie Heute $177',
      currency: 'USD',
      nonMemberButton: 'Meinen Sofortigen Zugang Für $20 Sichern',
      memberButton: 'Auf Ihr Vollständig Freigeschaltetes System Zugreifen',
      guaranteeLine: '100 % Risikofreie 30-Tage-Garantie',
      discreetBillingLine: 'Diskrete Abrechnung ("CM DIGITAL")',
      instantLine: 'Sofortiger Digitaler Zugang',
      oneTimeLine: 'Einmalzahlung • Kein Abonnement • Sofortige digitale Lieferung',
      disclaimerLine: '100 % risikofrei. Wenn Sie innerhalb von 30 Tagen keinen spürbaren Fortschritt bemerken, erhalten Sie eine vollständige Rückerstattung.',
      items: [
        { label: 'Die Composure Methode 5-Module Master-Anleitung', value: '$97' },
        { label: 'Bonus #1: Das "Heute Abend" 5-Schritte-Bett-Referenzblatt', value: '$30' },
        { label: 'Bonus #2: Wortwörtliches Partner-Kommunikations-Playbook', value: '$25' },
        { label: 'Bonus #3: 30/60/90-Tage Interaktive Fortschritts-Roadmap & Protokoll', value: '$45' },
      ],
    },
    mobileDashboard: {
      memberAccessActive: 'MITGLIEDERZUGANG AKTIV',
      dailyTrainingLog: 'Tägliches Trainingsprotokoll',
      loggedInAs: 'Angemeldet als',
      backToHome: 'Zurück Zur Startseite',
      currentStreak: 'AKTUELLE SERIE',
      totalSessions: 'SITZUNGEN GESAMT',
      weeklyCompletion: 'WÖCHENTLICHE ABSCHLUSSRATE',
      avgControlRating: 'DURCHSCHNITTLICHE KONTROLLBEWERTUNG',
      logTodayTraining: 'Heutiges Training Protokollieren',
      whatDidYouTrain: 'WAS HABEN SIE HEUTE TRAINIERT?',
      duration: 'DAUER',
      controlRating: 'KONTROLLBEWERTUNG',
      notesOptional: 'NOTIZEN (OPTIONAL)',
      saveTrainingLog: 'Trainingsprotokoll Speichern',
      quickTools: 'Schnellwerkzeuge',
      breathingPacer: 'Atem-Pacer',
      pelvicTrainer: 'Beckentrainer',
      arousalScale: 'Erregungsskala',
      clarityProtocol: 'Klarheitsprotokoll',
      recentSessions: 'Letzte Sitzungen',
      clearHistory: 'Verlauf Löschen',
      noLogsYet: 'Noch keine Trainingsprotokolle. Protokollieren Sie oben Ihre erste Sitzung.',
      noLogsYetDesc: 'Noch keine Protokolle. Beginnen Sie oben mit dem Training.',
      trainingMode: 'TRAININGSMODUS',
      dailyLogger: 'Tägliches Protokoll',
      streak1: '1-Tage-Serie',
      streakMulti: '-Tage-Serie',
      streakIncredible: 'Unglaubliche Beständigkeit. Machen Sie weiter so.',
      streakBuilding: 'Sie bauen Schwung auf. Unterbrechen Sie die Kette nicht.',
      streakFirst: 'Schließen Sie heute Ihre erste Sitzung ab.',
      sessionMin: ' Min.',
      saveLogSuccess: '✓ Protokoll erfolgreich gespeichert',
      totalValue: 'GESAMTER KOMBINIERTER EINZELHANDELSWERT:',
      todayPrice: 'HEUTIGER SONDER-RABATTPREIS',
      todaySavings: 'Sparen Sie Heute $177',
    },
  },
};

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
  strings: I18nStrings;
}

const I18nContext = createContext<I18nContextType | null>(null);

function getNestedValue(obj: Record<string, unknown>, path: string): string {
  const keys = path.split('.');
  let current: unknown = obj;
  for (const key of keys) {
    if (current && typeof current === 'object' && key in current) {
      current = (current as Record<string, unknown>)[key];
    } else {
      return path;
    }
  }
  return typeof current === 'string' ? current : path;
}

function normalizeLangCode(lang: string): Locale | null {
  const tag = lang.toLowerCase().split(/[-_]/)[0];
  const supportedLocales: Locale[] = ['en', 'fr', 'it', 'nl', 'de'];
  return supportedLocales.includes(tag as Locale) ? (tag as Locale) : null;
}

function detectBrowserLocale(): Locale {
  if (typeof navigator !== 'undefined') {
    const langs: string[] = (navigator as unknown as Record<string, string[]>).languages || [navigator.language];
    for (const lang of langs) {
      const detected = normalizeLangCode(lang);
      if (detected) return detected;
    }
  }
  return 'en';
}

const COUNTRY_TO_LOCALE: Record<string, Locale> = {
  FR: 'fr',
  IT: 'it',
  NL: 'nl',
  DE: 'de',
};

async function detectGeoLocale(): Promise<Locale> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 1500);
    const response = await fetch('https://ipapi.co/json/', {
      signal: controller.signal as any,
    });
    clearTimeout(timeout);
    if (!response.ok) return detectBrowserLocale();
    try {
      const data = await response.json();
      const country = data.country_code as string;
      if (country && COUNTRY_TO_LOCALE[country.toUpperCase()]) {
        return COUNTRY_TO_LOCALE[country.toUpperCase()];
      }
    } catch {
      // opaque or invalid response
    }
  } catch {
    // network, CORS, abort, etc.
  }
  return detectBrowserLocale();
}

export const I18nProvider: React.FC<{ children: React.ReactNode; defaultLocale?: Locale }> = ({
  children,
  defaultLocale = 'en',
}) => {
  const [locale, setLocale] = useState<Locale>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('composure_locale');
      if (stored) return stored as Locale;
      return detectBrowserLocale();
    }
    return defaultLocale;
  });

  useEffect(() => {
    localStorage.setItem('composure_locale', locale);
  }, [locale]);

  useEffect(() => {
    detectGeoLocale().then(setLocale);
  }, []);

  const t = useCallback((key: string, params?: Record<string, string>): string => {
    let str = getNestedValue(translations[locale], key);
    if (params && str !== key) {
      for (const [k, v] of Object.entries(params)) {
        str = str.replace(new RegExp(`\\{${k}\\}`, 'g'), v);
      }
    }
    return str;
  }, [locale]);

  const strings = useMemo(() => translations[locale], [locale]);

  return (
    <I18nContext.Provider value={{ locale, setLocale, t, strings }}>
      {children}
    </I18nContext.Provider>
  );
};

export function useI18n(): I18nContextType {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return ctx;
}

export function useLocale(): Locale {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error('useLocale must be used within an I18nProvider');
  }
  return ctx.locale;
}