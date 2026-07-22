export type ViewMode = 
  | 'home' 
  | 'method'
  | 'guide' 
  | 'breathing'
  | 'journal'
  | 'clarity-ai'
  | 'checkout' 
  | 'success'
  | 'cancel'
  | 'terms' 
  | 'privacy';

export interface JournalEntry {
  id: string;
  timestamp: string;
  composureScore: number;
  cortisolIndex: 'Low' | 'Moderate' | 'High';
  focusMinutes: number;
  notes: string;
  selectedPillar: string;
}

export interface GuideLesson {
  id: string;
  title: string;
  content: string;
  keyTakeaways?: string[];
  interactiveType?: 'shame-cycle' | 'arousal-scale' | 'pelvic-timer' | 'breathing' | 'anxiety-loop' | 'roadmap' | 'scripts' | 'practice-log' | 'faq';
}

export interface GuideModule {
  id: string;
  moduleNumber: number;
  title: string;
  subtitle: string;
  description: string;
  lessons: GuideLesson[];
}

export interface PracticeLogEntry {
  id: string;
  date: string;
  pelvicReps: number;
  breathingDone: boolean;
  controlRating: number; // 1-10
  notes: string;
}

export interface BreathworkPattern {
  name: string;
  inhale: number;
  hold1: number;
  exhale: number;
  hold2: number;
  cycles: number;
}

export interface ClarityProtocol {
  protocolTitle: string;
  cortisolTarget: string;
  breathworkPattern: BreathworkPattern;
  pillars: { step: number; title: string; action: string }[];
  quote: string;
}
