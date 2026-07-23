import React, { useState, useEffect } from 'react';
import { ViewMode } from './types';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProblemSection } from './components/ProblemSection';
import { ArchitectureOfClarity } from './components/ArchitectureOfClarity';
import { FoundationGuide } from './components/FoundationGuide';
import { SelfQualification } from './components/SelfQualification';
import { TestimonialsSection } from './components/TestimonialsSection';
import { OfferValueStack } from './components/OfferValueStack';
import { GuaranteeSection } from './components/GuaranteeSection';
import { FaqSection } from './components/FaqSection';
import { StickyCtaBar } from './components/StickyCtaBar';
import { CheckoutModal } from './components/CheckoutModal';
import { MemberAccessModal } from './components/MemberAccessModal';
import { MemberDashboard } from './components/MemberDashboard';
import { MobileDashboard } from './components/MobileDashboard';
import { SuccessPage } from './components/SuccessPage';
import { CancelPage } from './components/CancelPage';
import { TermsOfService } from './components/TermsOfService';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { Footer } from './components/Footer';
import { BreathingGuide } from './components/BreathingGuide';
import { ArousalScaleInteractive } from './components/ArousalScaleInteractive';
import { PelvicFloorTimer } from './components/PelvicFloorTimer';
import { ClarityAIAssistant } from './components/ClarityAIAssistant';
import { ComposureJournal } from './components/ComposureJournal';
import { PartnerScriptsAccordion } from './components/PartnerScriptsAccordion';
import { RoadmapTracker } from './components/RoadmapTracker';
import { ShameCycleDiagram } from './components/ShameCycleDiagram';
import { PracticeLogViewer } from './components/PracticeLogViewer';

function ToolShell({ title, subtitle, onBack, children }: { title: string; subtitle?: string; onBack: () => void; children: React.ReactNode }) {
  return (
    <div className="max-w-7xl mx-auto px-5 md:px-12 py-8 md:py-12 animate-fadeIn">
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 font-mono-caps text-xs text-[#173404] hover:text-[#081d00] transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-lg">arrow_back</span>
          Back
        </button>
      </div>
      <div className="mb-8">
        <h1 className="font-display text-2xl md:text-3xl font-bold text-[#081d00] tracking-tight mb-1">{title}</h1>
        {subtitle && <p className="font-body text-sm text-[#43483e]">{subtitle}</p>}
      </div>
      {children}
    </div>
  );
}

export default function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('home');
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [memberAccessModalOpen, setMemberAccessModalOpen] = useState(false);
  const [isMemberVerified, setIsMemberVerified] = useState(false);
  const [verifiedEmail, setVerifiedEmail] = useState('');
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const savedAccess = localStorage.getItem('composure_verified_access');
    const savedEmail = localStorage.getItem('composure_user_email');
    if (savedAccess === 'true') {
      setIsMemberVerified(true);
      if (savedEmail) setVerifiedEmail(savedEmail);
      setCurrentView('journal');
    }

    const urlParams = new URLSearchParams(window.location.search);
    const checkoutStatus = urlParams.get('checkout');
    if (checkoutStatus === 'success') {
      const emailParam = urlParams.get('email');
      if (emailParam) {
        localStorage.setItem('composure_verified_access', 'true');
        localStorage.setItem('composure_user_email', emailParam);
        setIsMemberVerified(true);
        setVerifiedEmail(emailParam);
        fetch('/api/user/verify-access', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: emailParam }),
        }).catch(() => {});
      } else {
        localStorage.setItem('composure_verified_access', 'true');
        setIsMemberVerified(true);
      }
      setCurrentView('success');
    } else if (checkoutStatus === 'cancel' || checkoutStatus === 'fail') {
      setCurrentView('cancel');
    }
  }, []);

  const handleNavigate = (view: ViewMode) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenCheckout = () => setCheckoutModalOpen(true);
  const handleOpenMemberAccess = () => setMemberAccessModalOpen(true);
  const handleAccessGranted = (email: string) => {
    setIsMemberVerified(true);
    setVerifiedEmail(email);
  };

  const renderToolView = () => {
    switch (currentView) {
      case 'breathing':
        return (
          <ToolShell title="Breathing Pacer" subtitle="Guided parasympathetic breathwork for arousal regulation." onBack={() => handleNavigate('home')}>
            <BreathingGuide onLogSession={() => {}} onNavigate={() => handleNavigate('home')} />
          </ToolShell>
        );
      case 'pelvic':
        return (
          <ToolShell title="Pelvic Floor Trainer" subtitle="Structured neuromuscular rep tracker with timed contractions." onBack={() => handleNavigate('home')}>
            <PelvicFloorTimer />
          </ToolShell>
        );
      case 'arousal':
        return (
          <ToolShell title="Arousal Scale" subtitle="Interactive 1–10 stop-start awareness trainer." onBack={() => handleNavigate('home')}>
            <ArousalScaleInteractive />
          </ToolShell>
        );
      case 'clarity-ai':
        return (
          <ToolShell title="Clarity Protocol" subtitle="AI-generated 3-step reset protocol based on your current state." onBack={() => handleNavigate('home')}>
            <ClarityAIAssistant onStartBreathwork={() => {}} onNavigate={() => handleNavigate('home')} />
          </ToolShell>
        );
      case 'journal':
        return (
          <ToolShell title="Practice Journal" subtitle="Log sessions, track composure score, and view trends." onBack={() => handleNavigate('home')}>
            <ComposureJournal />
            <div className="mt-8">
              <h3 className="font-display text-lg font-bold text-[#081d00] mb-4">Practice Log</h3>
              <PracticeLogViewer />
            </div>
          </ToolShell>
        );
      case 'roadmap':
        return (
          <ToolShell title="Roadmap Tracker" subtitle="30/60/90-day execution checklist with persistence." onBack={() => handleNavigate('home')}>
            <RoadmapTracker />
          </ToolShell>
        );
      case 'scripts':
        return (
          <ToolShell title="Partner Scripts" subtitle="Low-stakes communication frameworks for honest conversation." onBack={() => handleNavigate('home')}>
            <PartnerScriptsAccordion />
          </ToolShell>
        );
      case 'shame-cycle':
        return (
          <ToolShell title="Shame Cycle Map" subtitle="Interactive diagram showing loop interruption mechanics." onBack={() => handleNavigate('home')}>
            <ShameCycleDiagram />
          </ToolShell>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#fcf9f8] text-[#1c1b1b] flex flex-col font-body antialiased selection:bg-[#b7f473] selection:text-[#081d00]">
      <div className="noise-overlay" aria-hidden="true" />

      <div className="announcement-bar text-[#b7f473] text-[11px] font-mono-caps py-2.5 px-4 text-center tracking-wider flex items-center justify-center gap-2.5">
        <span className="w-2 h-2 rounded-full bg-[#b7f473] animate-pulse shrink-0" />
        <span>⚡ SPECIAL LIMITED OFFER: Complete Composure System $20 (Full Value $197 — Save $177 Today) • Over 12,400+ Men Trained • 30-Day Risk-Free Guarantee</span>
        <span className="w-2 h-2 rounded-full bg-[#b7f473] animate-pulse shrink-0" />
      </div>

      <Header
        currentView={currentView}
        onNavigate={handleNavigate}
        onOpenCheckout={handleOpenCheckout}
        onOpenMemberAccess={handleOpenMemberAccess}
        isMemberVerified={isMemberVerified}
      />

      <main className="flex-grow max-w-7xl w-full mx-auto px-5 md:px-12">
        {isMemberVerified && currentView === 'home' && isMobile ? (
          <MobileDashboard email={verifiedEmail} onNavigate={(view) => handleNavigate(view as ViewMode)} />
        ) : isMemberVerified && currentView === 'home' && !isMobile ? (
          <MemberDashboard email={verifiedEmail} onNavigate={(view) => handleNavigate(view as ViewMode)} />
        ) : currentView !== 'home' && currentView !== 'success' && currentView !== 'cancel' && currentView !== 'terms' && currentView !== 'privacy' ? (
          renderToolView()
        ) : (
          <div className="animate-fadeIn">
            {currentView === 'home' && (
              <div className="space-y-4">
                <Hero onOpenCheckout={handleOpenCheckout} isMemberVerified={isMemberVerified} />
                <ProblemSection />
                <ArchitectureOfClarity onOpenCheckout={handleOpenCheckout} isMemberVerified={isMemberVerified} />
                <FoundationGuide onNavigate={handleNavigate} onOpenCheckout={handleOpenCheckout} isMemberVerified={isMemberVerified} />
                <SelfQualification />
                <TestimonialsSection />
                <OfferValueStack onOpenCheckout={handleOpenCheckout} isMemberVerified={isMemberVerified} />
                <GuaranteeSection />
                <FaqSection />
              </div>
            )}

            {currentView === 'success' && (
              <SuccessPage userEmail={verifiedEmail} onNavigate={handleNavigate} />
            )}

            {currentView === 'cancel' && (
              <CancelPage onNavigate={handleNavigate} onOpenCheckout={handleOpenCheckout} />
            )}

            {currentView === 'terms' && (
              <div className="py-8 animate-fadeIn">
                <TermsOfService onNavigate={handleNavigate} />
              </div>
            )}

            {currentView === 'privacy' && (
              <div className="py-8 animate-fadeIn">
                <PrivacyPolicy onNavigate={handleNavigate} />
              </div>
            )}
          </div>
        )}
      </main>

      {!isMobile && currentView === 'home' && (
        <StickyCtaBar onOpenCheckout={handleOpenCheckout} isMemberVerified={isMemberVerified} />
      )}

      {checkoutModalOpen && (
        <CheckoutModal
          isModalOverlay
          onClose={() => setCheckoutModalOpen(false)}
          onNavigate={handleNavigate}
        />
      )}

      <MemberAccessModal
        isOpen={memberAccessModalOpen}
        onClose={() => setMemberAccessModalOpen(false)}
        onAccessGranted={handleAccessGranted}
      />

      {!isMobile && currentView === 'home' && (
        <Footer onNavigate={handleNavigate} onOpenCheckout={handleOpenCheckout} />
      )}
    </div>
  );
}
