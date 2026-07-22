import React, { useState, useEffect } from 'react';
import { IMAGES } from '../data/initialData';
import { ViewMode } from '../types';
import { trackAddToCart, trackLead, trackPurchase } from '../lib/redditPixel';

interface CheckoutModalProps {
  onNavigate: (view: ViewMode) => void;
  onClose?: () => void;
  isModalOverlay?: boolean;
}

interface PolarProduct {
  id: string;
  name: string;
  description?: string;
  prices?: Array<{
    priceAmount: number;
    priceCurrency: string;
  }>;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ onNavigate, onClose, isModalOverlay = false }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [polarProduct, setPolarProduct] = useState<PolarProduct | null>(null);
  const [fetchingProduct, setFetchingProduct] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    trackAddToCart(20, 'USD');

    // Check if returning from checkout success
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('checkout') === 'success') {
      setSubmitted(true);
      const savedEmail = urlParams.get('email') || localStorage.getItem('composure_user_email') || '';
      if (savedEmail) {
        setEmail(savedEmail);
        trackPurchase({ value: 20, currency: 'USD', orderId: `polar_${Date.now()}`, email: savedEmail });
      }
    }

    // Fetch active product from Polar Backend API
    fetch('/api/polar/products')
      .then((res) => res.json())
      .then((data) => {
        const items = data.result?.items || data.items || [];
        if (items.length > 0) {
          setPolarProduct(items[0]);
        }
      })
      .catch((err) => {
        console.error('[Polar API] Error loading product:', err);
      })
      .finally(() => {
        setFetchingProduct(false);
      });
  }, []);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    if (newEmail.includes('@') && newEmail.length > 5) {
      trackLead(newEmail);
    }
  };

  const handleProceedToPolarCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      alert('Please enter a valid email address so we can deliver your instant digital access.');
      return;
    }

    setLoading(true);
    trackLead(email);

    const productId = polarProduct?.id ? encodeURIComponent(polarProduct.id) : '';
    const checkoutUrl = `/api/checkout?${productId ? `products=${productId}&` : ''}email=${encodeURIComponent(email.trim())}`;
    
    // Redirect to backend Polar checkout endpoint
    window.location.href = checkoutUrl;
  };

  if (submitted) {
    return (
      <div className={`max-w-2xl mx-auto py-10 px-4 text-center animate-fadeIn ${isModalOverlay ? 'bg-white p-8 rounded-3xl shadow-2xl border border-[#173404]/20' : ''}`}>
        <div className="w-16 h-16 bg-[#b7f473] text-[#081d00] rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
          <span className="material-symbols-outlined text-3xl font-bold">check</span>
        </div>

        <h2 className="font-display text-3xl font-bold text-[#081d00] mb-2">
          Order Verified — Welcome to Composure
        </h2>
        <div className="bg-[#fcf9f8] border border-[#173404]/10 rounded-2xl p-6 mb-8 text-left max-w-md mx-auto space-y-3 shadow-xs font-mono text-xs">
          <div className="flex justify-between text-[#74796d]">
            <span>PRODUCT</span>
            <span className="text-[#081d00] font-bold">The Composure Method Bundle</span>
          </div>
          <div className="flex justify-between text-[#74796d]">
            <span>CREDIT STATEMENT</span>
            <span className="text-[#081d00] font-bold">CM DIGITAL</span>
          </div>
          <div className="flex justify-between border-t border-[#173404]/10 pt-2 font-bold text-[#081d00] text-sm">
            <span>TOTAL BILLED</span>
            <span>$20.00 USD</span>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={() => {
              if (onClose) onClose();
              onNavigate('home');
              const el = document.getElementById('curriculum');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="bg-[#173404] text-white font-mono-caps text-xs px-8 py-3.5 rounded-full hover:bg-[#081d00] transition-colors cursor-pointer shadow-sm font-bold"
          >
            Access Digital Curriculum & Guides
          </button>
        </div>
      </div>
    );
  }

  const priceFormatted = polarProduct?.prices?.[0]
    ? `$${(polarProduct.prices[0].priceAmount / 100).toFixed(2)} USD`
    : '$20.00 USD';

  const content = (
    <div className="w-full max-w-[960px] mx-auto py-4 px-2 md:px-0">
      {/* Modal Header */}
      {isModalOverlay && onClose && (
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-[#173404]/10">
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-black rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <span className="material-symbols-outlined text-2xl">close</span>
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Left Column: Order Details */}
        <div className="md:col-span-5 flex flex-col gap-5">
          <div className="bg-white p-6 border border-[#173404]/10 rounded-2xl flex flex-col gap-5 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="bg-[#b7f473]/40 text-[#081d00] font-mono-caps text-[10px] font-bold px-2 py-0.5 rounded-full">
                SAVE $177 TODAY
              </span>
            </div>

            <div className="flex gap-4 items-start pb-4 border-b border-[#173404]/10">
              <img
                src={IMAGES.guideBookCover}
                alt="The Composure Method"
                className="w-20 h-28 object-cover rounded-lg shadow-xs border border-[#173404]/10 shrink-0"
              />
              <div className="flex flex-col gap-1">
                <h3 className="font-display text-base font-bold text-[#081d00]">
                  {polarProduct?.name || 'The Composure Method System'}
                </h3>
                <p className="font-body text-xs text-[#43483e]">5 Core Modules + 4 Free Bonuses</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="line-through text-gray-400 font-mono text-xs">$197.00</span>
                  <span className="font-display text-xl font-bold text-[#081d00]">{priceFormatted}</span>
                </div>
              </div>
            </div>

            <ul className="flex flex-col gap-2.5 font-body text-xs text-[#43483e]">
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#3e6a00] text-base">check_circle</span>
                <span>Instant digital access across all devices</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#3e6a00] text-base">check_circle</span>
                <span>Includes all free bonus playbooks & trackers</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#3e6a00] text-base">check_circle</span>
                <span>30-Day 100% money-back risk-free guarantee</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#3e6a00] text-base">lock</span>
                <span>Discreet billing label: <strong>"CM DIGITAL"</strong></span>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Column: Instant Access Form */}
        <div className="md:col-span-7">
          <div className="bg-white p-6 md:p-8 border border-[#173404]/10 rounded-2xl shadow-xs space-y-6">
            <div>
              <h3 className="font-display text-xl font-bold text-[#081d00] mb-1">
                Complete Your Order
              </h3>
              <p className="font-body text-xs text-[#43483e]">
                Enter your email address below to initiate a secure checkout session
              </p>
            </div>

            <form onSubmit={handleProceedToPolarCheckout} className="space-y-5">
              <div>
                <label className="font-mono-caps text-[11px] text-[#43483e] block mb-1.5 font-bold">
                  YOUR EMAIL FOR INSTANT DIGITAL DELIVERY
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="name@example.com"
                  className="w-full bg-[#fcf9f8] border border-[#173404]/20 rounded-xl px-4 py-3 text-[#1c1b1b] font-body text-sm focus:ring-2 focus:ring-[#173404] focus:border-[#173404] transition-all"
                />
              </div>

              {polarProduct && (
                <div className="bg-[#f4f7f2] border border-[#173404]/10 p-3.5 rounded-xl text-xs font-mono flex items-center justify-between text-[#43483e]">
                  <div>
                    <span className="text-[10px] text-[#74796d] block uppercase">PRODUCT ID</span>
                    <span className="text-[#081d00] font-bold truncate block max-w-[200px] sm:max-w-[300px]">{polarProduct.id}</span>
                  </div>
                  <span className="text-[#173404] font-bold text-sm">{priceFormatted}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={loading || fetchingProduct}
                className="w-full bg-[#173404] text-white font-display text-base font-bold py-4 px-6 rounded-xl hover:bg-[#081d00] transition-all duration-200 flex justify-center items-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
              >
                {loading ? (
                  <span>Redirecting to Checkout...</span>
                ) : (
                  <>
                    <span>Proceed to Checkout — {priceFormatted}</span>
                    <span className="material-symbols-outlined">arrow_forward</span>
                  </>
                )}
              </button>

              <div className="pt-2 border-t border-[#173404]/10 space-y-2 text-center">
                <p className="font-mono-caps text-[10px] text-[#74796d] uppercase">
                  ACCEPTED PAYMENT METHODS
                </p>
                <div className="flex items-center justify-center gap-3 font-mono text-[11px] text-[#43483e]">
                  <span>Apple Pay</span>
                  <span>•</span>
                  <span>Google Pay</span>
                  <span>•</span>
                  <span>Visa</span>
                  <span>•</span>
                  <span>Mastercard</span>
                  <span>•</span>
                  <span>AMEX</span>
                </div>
                <p className="font-mono text-[10px] text-[#74796d] pt-1">
                  Instant Fulfillment • 30-Day Refund Policy
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );

  if (isModalOverlay) {
    return (
      <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
        <div className="bg-[#fcf9f8] rounded-3xl p-4 md:p-8 max-w-4xl w-full my-8 shadow-2xl relative">
          {content}
        </div>
      </div>
    );
  }

  return content;
};

