export const IMAGES = {
  heroAbstract: "https://lh3.googleusercontent.com/aida-public/AB6AXuBPNGgHTrJTR-NpwGUp1Wqed1e5DjHMylRsw8W7ongp_F4dmzoduSicVr4ZTEyhkMNxoEhqPL-JB0xfyxOznJhAmYjDm7A96wCgV2EEtN1-pYBGQJnolVv7nu1_UKlONUWUJzY5Q2BeNeG8pXMxyZOeNb1xYjnnVg-zmO3057lTdVCtzMvqNM-r4BYMgvb9rIx08HL5FawqsJf_Dh-loHeZORkfTeIbUxhW_MSUWPqJWZX_t1dbHer57bkwuDav7EouGxqlvXWDfpU",
  bonsaiDesk: "https://lh3.googleusercontent.com/aida-public/AB6AXuBLiYLMZ9UYWAXn4hg9195dg7PkrSZ6OjBPzz0S7ozu12hvPhVyZcfRS_3V0wrK9MAsWtzjjQ8jMzrphsQWz5aes70iwHCTYUj3oxuWqZljopPj-VE2r5evr0M9mUTzB2TKMGMMw_m4b3FY2n_ESPctfJhhBitPsMbz905TvbrXKPqBQPzvfKa5rsfq8WWyWhAVBRcJ0vYLRsjad4RC7V-Txr2vwphbuH_zj-WZkWe4gRW9w8NIKuZPeQ7DiOzczvOELHTq17HizWI",
  executiveAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCAp6ibSb3BD6tH3XXSM4wyd3jOc-EgMIupgaUibh1wCNe3ps_jyA10saKxpkf_G446kxN2wpLcmBY1lOCQQLXx9L6K70rd_eAg3B7Vu2kNQL0gfiwFdxcfEEsdCZ-8hjSgRpkCczuGuaZ1XZisYumlNxJZRLCByWa3k_SNVxyT1jqGbL8NMarc7tXdiNbRxf6wnWcSasdiQVUpbaWRHkKGHXQm4HxeNAtVcqJ7WoeKCGkAYE_KvC1m4TZqDoyhc_Eg8mLfZeZQXbI",
  guideBookCover: "https://polar-public-files.s3.amazonaws.com/product_media/e6ad8ca3-888c-44f9-9520-3f1177d8165e/31a93e07-3521-4085-bcc0-e6a45e049e2c/composure_thumbnail.png"
};

export const DEFAULT_PILLARS = [
  {
    id: 'pillar-01',
    number: 'Pillar 01',
    title: 'Cognitive Reset',
    description: 'Clear mental static through structured breathing and focus protocols designed to immediately lower cortisol and heighten tactical awareness.',
    icon: 'psychology'
  },
  {
    id: 'pillar-02',
    number: 'Pillar 02',
    title: 'Somatic Alignment',
    description: 'Physical practices that enforce presence and stability, translating mental intent into physical reality.',
    icon: 'self_improvement'
  },
  {
    id: 'pillar-03',
    number: 'Pillar 03',
    title: 'Environmental Discipline',
    description: 'Curating your external space to reflect internal order. Minimalism applied to physical surroundings to drastically reduce cognitive load and friction in daily execution.',
    icon: 'grid_view'
  }
];

export const PRESET_BREATHING_PATTERNS = [
  {
    id: 'box-breath',
    name: 'Box Breathing (4-4-4-4)',
    subtitle: 'Navy SEAL Tactical Reset',
    description: 'Equal duration across all phases. Rapidly restores nervous system equilibrium during high stress.',
    inhale: 4,
    hold1: 4,
    exhale: 4,
    hold2: 4,
    cycles: 6
  },
  {
    id: 'cortisol-dump',
    name: 'Cortisol Dump (4-7-8)',
    subtitle: 'Vagus Nerve Stimulation',
    description: 'Extended exhale activates parasympathetic response to immediately drop elevated heart rate.',
    inhale: 4,
    hold1: 7,
    exhale: 8,
    hold2: 0,
    cycles: 5
  },
  {
    id: 'deep-focal',
    name: 'Deep Focal Prime (5-2-6-0)',
    subtitle: 'Pre-Execution Concentration',
    description: 'Slightly elongated rhythm to lock attention into a single horizontal point before deep work.',
    inhale: 5,
    hold1: 2,
    exhale: 6,
    hold2: 0,
    cycles: 8
  }
];

export const INITIAL_JOURNAL_LOGS = [
  {
    id: 'log-1',
    timestamp: '2026-07-21T09:15:00.000Z',
    composureScore: 88,
    cortisolIndex: 'Low' as const,
    focusMinutes: 120,
    notes: 'Completed 6 cycles of Box Breathing before morning board presentation. Mental clarity peak achieved.',
    selectedPillar: 'Pillar 01: Cognitive Reset'
  },
  {
    id: 'log-2',
    timestamp: '2026-07-20T16:30:00.000Z',
    composureScore: 74,
    cortisolIndex: 'Moderate' as const,
    focusMinutes: 90,
    notes: 'Environment audit: cleared 14 unused desktop files and muted non-essential notifications.',
    selectedPillar: 'Pillar 03: Environmental Discipline'
  }
];
