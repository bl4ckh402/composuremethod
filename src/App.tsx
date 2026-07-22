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
import { SuccessPage } from './components/SuccessPage';
import { CancelPage } from './components/CancelPage';
import { TermsOfService } from './components/TermsOfService';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { Footer } from './components/Footer';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('home');
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [memberAccessModalOpen, setMemberAccessModalOpen] = useState(false);
  const [isMemberVerified, setIsMemberVerified] = useState(false);
  const [verifiedEmail, setVerifiedEmail] = useState('');

  useEffect(() => {
    const savedAccess = localStorage.getItem('composure_verified_access');
    const savedEmail = localStorage.getItem('composure_user_email');
    if (savedAccess === 'true') {
      setIsMemberVerified(true);
      if (savedEmail) setVerifiedEmail(savedEmail);
    }

    // Handle return from Polar checkout redirect
    const urlParams = new URLSearchParams(window.location.search);
    const checkoutStatus = urlParams.get('checkout');
    if (checkoutStatus === 'success') {
      const emailParam = urlParams.get('email');
      if (emailParam) {
        localStorage.setItem('composure_verified_access', 'true');
        localStorage.setItem('composure_user_email', emailParam);
        setIsMemberVerified(true);
        setVerifiedEmail(emailParam);

        // Verify access on server
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

  const handleOpenCheckout = () => {
    setCheckoutModalOpen(true);
  };

  const handleOpenMemberAccess = () => {
    setMemberAccessModalOpen(true);
  };

  const handleAccessGranted = (email: string) => {
    setIsMemberVerified(true);
    setVerifiedEmail(email);
  };

  return (
    <div className="min-h-screen bg-[#fcf9f8] text-[#1c1b1b] flex flex-col font-body antialiased selection:bg-[#b7f473] selection:text-[#081d00]">
      {/* Top Urgency & Social Proof Announcement Bar */}
      <div className="announcement-bar text-[#b7f473] text-[11px] font-mono-caps py-2.5 px-4 text-center tracking-wider flex items-center justify-center gap-2.5">
        <span className="w-2 h-2 rounded-full bg-[#b7f473] animate-pulse shrink-0" />
        <span>⚡ SPECIAL LIMITED OFFER: Complete Composure System $20 (Full Value $197 — Save $177 Today) • Over 12,400+ Men Trained • 30-Day Risk-Free Guarantee</span>
        <span className="w-2 h-2 rounded-full bg-[#b7f473] animate-pulse shrink-0" />
      </div>

      {/* Sticky Conversion Header */}
      <Header
        currentView={currentView}
        onNavigate={handleNavigate}
        onOpenCheckout={handleOpenCheckout}
        onOpenMemberAccess={handleOpenMemberAccess}
        isMemberVerified={isMemberVerified}
      />


      <main className="flex-grow max-w-7xl w-full mx-auto px-5 md:px-12">
        {currentView === 'home' && (
          <div className="space-y-4 animate-fadeIn">
            {/* 1. Hero Section */}
            <Hero onOpenCheckout={handleOpenCheckout} isMemberVerified={isMemberVerified} />

            {/* 2. Problem & Physiology Section */}
            <ProblemSection />

            {/* 3. The 4-Pillar Method System */}
            <ArchitectureOfClarity onOpenCheckout={handleOpenCheckout} isMemberVerified={isMemberVerified} />

            {/* 4. Included Curriculum & Digital Assets Preview */}
            <FoundationGuide
              onNavigate={handleNavigate}
              onOpenCheckout={handleOpenCheckout}
              isMemberVerified={isMemberVerified}
            />

            {/* 5. Self-Qualification Grid */}
            <SelfQualification />

            {/* 6. Verified Customer Testimonials */}
            <TestimonialsSection />

            {/* 7. Irresistible Offer & Value Stack */}
            <OfferValueStack onOpenCheckout={handleOpenCheckout} isMemberVerified={isMemberVerified} />

            {/* 8. 30-Day Money Back Guarantee Seal */}
            <GuaranteeSection />

            {/* 9. FAQ Accordion */}
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
      </main>

      {/* Floating Bottom CTA Bar */}
      <StickyCtaBar onOpenCheckout={handleOpenCheckout} isMemberVerified={isMemberVerified} />

      {/* Checkout Modal Overlay */}
      {checkoutModalOpen && (
        <CheckoutModal
          isModalOverlay
          onClose={() => setCheckoutModalOpen(false)}
          onNavigate={handleNavigate}
        />
      )}

      {/* Member Access Verification Modal */}
      <MemberAccessModal
        isOpen={memberAccessModalOpen}
        onClose={() => setMemberAccessModalOpen(false)}
        onAccessGranted={handleAccessGranted}
      />

      {/* High-Converting Footer */}
      <Footer onNavigate={handleNavigate} onOpenCheckout={handleOpenCheckout} />
    </div>
  );
}
