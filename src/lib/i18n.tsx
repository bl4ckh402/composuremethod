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
  hero: {
    headline: string;
    subtext: string;
    ctaPrimary: string;
    ctaSecondary: string;
    guarantee: string;
    discreetBilling: string;
    instantDelivery: string;
  };
  problem: {
    headline: string;
    subtext: string;
    sprayTitle: string;
    sprayDesc: string;
    pillTitle: string;
    pillDesc: string;
    distractionTitle: string;
    distractionDesc: string;
    methodTitle: string;
    methodDesc: string;
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
  };
  curriculum: {
    headline: string;
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
  };
  guarantee: {
    heading: string;
    body: string;
  };
  faq: {
    heading: string;
    subtitle: string;
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
    },
    hero: {
      headline: 'Master pre-ejaculation control and build lasting stamina.',
      subtext: 'A 4-pillar somatic nervous system framework for men who want natural, reliable control — no pills, no sprays, no awkward tricks.',
      ctaPrimary: 'Get Instant Access — $20',
      ctaSecondary: 'Member Login',
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
      sprayTitle: 'Numbing Sprays & Creams',
      sprayDesc: 'Dulls all physical sensation. Turns intimacy into a numb, mechanical chore and often transfers to your partner, ruining mutual pleasure.',
      pillTitle: 'Unapproved Pills & Supplements',
      pillDesc: 'Creates unpredictable side-effects (headaches, flushing). Treats timing as a chemical problem rather than retraining nervous system control.',
      distractionTitle: 'Distraction & Mental Counting',
      distractionDesc: 'Counting backwards or thinking about sports pulls your mind entirely out of the room. Destroys emotional intimacy and fails under high arousal.',
      methodTitle: 'The Composure Method',
      methodDesc: 'Retrains your pelvic neuromuscular response and parasympathetic nervous system. Builds genuine, natural stamina you retain for life.',
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
    },
    curriculum: {
      headline: 'What You Get Inside The Composure Method',
      unlocked: 'Unlocked',
      membersOnly: 'Members Only',
      viewModuleContent: 'View Module Content',

      subtext: '5 structured digital modules, step-by-step physical protocols, and 4 free instant bonuses designed for rapid, discreet implementation.',
      moduleLocked: 'Members Only',
      keyLessonsLabel: 'Key Lessons:',
      viewModuleContent: 'View Module Content',
      freeBonusesLabel: '4 FREE BONUSES',
      bonusesHeading: 'Instant Action Digital Assets',
      bonusesBody: 'Includes the "Tonight" In-Bed 5-Step Sheet, Partner Communication Playbook, 30/60/90 Progress Roadmap, and AI Assessor.',
      bonus1Label: 'In-Bed 5-Step Quick Sheet ($30 Value)',
      bonus2Label: 'Partner Communication Playbook ($25 Value)',
      bonus3Label: '30/60/90-Day Progress Roadmap ($45 Value)',
      bonus4Label: 'AI Personalization Protocol ($20 Value)',
      bonusesCta: 'Claim All Bonuses for $20',
      yourBonusesHeading: 'Your 4 Free Bonuses — Included Instantly',
    },
    guarantee: {
      heading: '100% RISK-FREE IRONCLAD GUARANTEE',
      body: 'Try The Composure Method For 30 Full Days — Zero Risk: take a full 30 days to go through the modules, practice the 4-2-7 breathwork, and try the pelvic exercises. If you don\'t notice a significant increase in arousal control, stamina, and bedroom confidence, send us a simple one-line email for a prompt, 100% full refund. No questions asked. You keep the guides as our thanks for giving it an honest try.',
    },
    faq: {
      heading: 'Everything You Need To Know',
      subtitle: 'Common questions about discreet billing, instant digital access, and how the program works.',
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
      sprayTitle: 'Sprays et Crèmes Anesthésiants',
      sprayDesc: 'Supprime toute sensation physique. Transforme l\'intimité en une tâche mécanique et insensible, et se transmet parfois au partenaire.',
      pillTitle: 'Pilules et Suppléments Non Approuvés',
      pillDesc: 'Provoque des effets secondaires imprévisibles. Traite le timing comme un problème chimique au lieu de rééduquer le contrôle nerveux.',
      distractionTitle: 'Distraction et Compte Mental',
      distractionDesc: 'Penser à autre chose vous sort complètement de l\'instant. Détruit l\'intimité émotionnelle et échoue sous forte excitation.',
      methodTitle: 'La Méthode Composure',
      methodDesc: 'Rééduque la réponse neuromusculaire pelvienne et le système nerveux parasympathique. Construit une endurance naturelle et durable.',
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
    },
    faq: {
      heading: 'Tout Ce Que Vous Devez Savoir',
      subtitle: 'Questions fréquentes sur la facturation discrète, l\'accès numérique instantané et le fonctionnement du programme.',
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
      todayPrice: "PRIX SPÉCIAL DU JOUR",
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
      todayPrice: "PRIX SPÉCIAL DU JOUR",
      todaySavings: 'Économisez 177 $ Aujourd\'hui',
    },
    languageSwitcher: {
      en: 'English',
      fr: 'Français',
      it: 'Italiano',
      nl: 'Nederlands',
      de: 'Deutsch',
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
    },
    hero: {
      headline: 'Padroneggia il controllo della pre-eiaculazione e sviluppa resistenza duratura.',
      subtext: 'Un framework di 4 pilastri per il sistema nervoso somatico, progettato per gli uomini che vogliono un controllo naturale e affidabile — senza pillole, spray o trucchi imbarazzanti.',
      ctaPrimary: 'Accesso Immediato — $20',
      ctaSecondary: 'Accesso Membro',
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
    },
    hero: {
      headline: 'Meester pre-ejaculatiecontrole en bouw blijvende uithoudingsvermogen.',
      subtext: 'Een 4-pijler framework voor het somatische zenuwstelsel, ontworpen voor mannen die natuurlijke, betrouwbare controle willen — geen pillen, geen sprays, geen ongemakkelijke trucjes.',
      ctaPrimary: 'Directe Toegang — $20',
      ctaSecondary: 'Lid Login',
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
      discreetBilling: 'Diskrete Facturatie',
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
      copyright: '© 2026 SAVITY LLC / COMPOSURE METHOD. ALLE RECHTEN FORBEHOUDEN.',
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
    },
    hero: {
      headline: 'Meistern Sie die Kontrollexekulation und bauen Sie dauerhafte Ausdauer auf.',
      subtext: 'Ein 4-Säulen-Framework für das somatische Nervensystem, entwickelt für Männer, die natürliche, zuverlässige Kontrolle wollen — keine Pillen, keine Sprays, keine peinlichen Tricks.',
      ctaPrimary: 'Sofortiger Zugang — $20',
      ctaSecondary: 'Mitgliederlogin',
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
    const data = await response.json();
    const country = data.country_code as string;
    if (country && COUNTRY_TO_LOCALE[country.toUpperCase()]) {
      return COUNTRY_TO_LOCALE[country.toUpperCase()];
    }
  } catch {
    // fallback to browser locale
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