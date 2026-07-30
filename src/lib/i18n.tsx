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
  };
  hero: {
    headline: string;
    subtext: string;
    ctaPrimary: string;
    ctaSecondary: string;
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
    reviews: TestimonialReview[];
  };
  languageSwitcher: {
    en: string;
    fr: string;
    it: string;
    nl: string;
    de: string;
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

  const t = useCallback((key: string): string => {
    return getNestedValue(translations[locale], key);
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