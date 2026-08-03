import React, { useState } from 'react';
import { ViewMode } from '../types';
import { trackAddToCart, trackLead, trackPurchase } from '../lib/redditPixel';
import { trackTrafficStarsClick, trackTrafficStarsCheckout, trackTrafficStarsLead } from '../lib/trafficStars';
import { track } from '../lib/mixpanel';
import { useI18n } from '../lib/i18n';

interface CheckoutModalProps {
  onNavigate: (view: ViewMode) => void;
  onClose?: () => void;
  isModalOverlay?: boolean;
}

interface PolarProductMedia {
  id: string;
  name: string;
  publicUrl: string;
}

interface PolarProduct {
  id: string;
  name: string;
  description?: string;
  prices?: Array<{ priceAmount: number; priceCurrency: string }>;
  medias?: PolarProductMedia[];
  benefits?: Array<{ id: string; type: string; description: string }>;
}

const CloseButton: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { t } = useI18n();
  return (
    <button
      onClick={onClose}
      className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 bg-white/90 backdrop-blur-sm border border-[#173404]/10 text-[#74796d] hover:text-[#081d00] hover:bg-[#f0ebe3] transition-all rounded-full cursor-pointer z-[60] flex items-center justify-center shadow-sm"
      aria-label={t('checkout.closeCheckout')}
    >
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  );
};

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ onNavigate, onClose, isModalOverlay = false }) => {
  const { t } = useI18n();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [polarProduct, setPolarProduct] = useState<PolarProduct | null>(null);
  const [fetchingProduct, setFetchingProduct] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  const productPrice = polarProduct?.prices?.[0];
  const priceFormatted = productPrice
    ? `${(productPrice.priceAmount / 100).toFixed(2)} ${(productPrice.priceCurrency || 'usd').toUpperCase()}`
    : '';

  const getShortDescription = (product: PolarProduct | null): string => {
    if (!product?.description) return t('checkout.digitalGuideFallback');
    const text = product.description.replace(/\*\*/g, '').replace(/\n/g, ' ');
    if (text.length <= 90) return text;
    return text.slice(0, 87).trim() + '...';
  };

  const productDescription = getShortDescription(polarProduct);
  const productImage = polarProduct?.medias?.[0]?.publicUrl || '';

  React.useEffect(() => {
    if (submitted) {
      const price = (productPrice?.priceAmount || 2000) / 100;
    }
  }, [submitted, productPrice, email]);

  React.useEffect(() => {
    const sourceUrl = typeof window !== 'undefined' ? window.location.href : undefined;

    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('checkout') === 'success') {
      setSubmitted(true);
      if (onClose) onClose();
      const savedEmail = urlParams.get('email') || localStorage.getItem('composure_user_email') || '';
      if (savedEmail) {
        setEmail(savedEmail);
      }
      track('checkout_completed', {
        email: savedEmail || undefined,
        product: polarProduct?.name || 'The Composure Method',
        price: typeof window !== 'undefined' ? localStorage.getItem('composure_checkout_amount') : null,
        currency: typeof window !== 'undefined' ? localStorage.getItem('composure_checkout_currency') : null,
        checkout_id: urlParams.get('checkout_id') || null,
      });
    } else if (urlParams.get('checkout') === 'cancel' || urlParams.get('checkout') === 'fail') {
      track('checkout_canceled', {
        reason: urlParams.get('checkout'),
        email: email || undefined,
      });
    }

    fetch('/api/polar/products')
      .then((res) => res.json())
      .then((data) => {
        const items = data.result?.items || data.items || [];
        if (items.length > 0) {
          const product = items[0];
          setPolarProduct(product);

          const price = product.prices?.[0];
          if (price) {
            const amount = (price.priceAmount / 100).toFixed(2);
            const currency = (price.priceCurrency || 'usd').toUpperCase();
            trackAddToCart(parseFloat(amount), currency, sourceUrl);
            try {
              localStorage.setItem('composure_checkout_amount', amount);
              localStorage.setItem('composure_checkout_currency', currency);
            } catch {}
          }
        }
      })
      .catch((err) => console.error('[Polar API] Error loading product:', err))
      .finally(() => setFetchingProduct(false));
  }, []);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    if (newEmail.includes('@') && newEmail.length > 5) trackLead(newEmail, typeof window !== 'undefined' ? window.location.href : undefined);
  };

    const handleProceedToPolarCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      alert(t('checkout.pleaseEnterEmail'));
      return;
    }
    setLoading(true);
    track('checkout_started', {
      email: email.trim().toLowerCase(),
      product: polarProduct?.name || 'The Composure Method',
      price: (productPrice?.priceAmount || 2000) / 100,
      currency: (productPrice?.priceCurrency || 'usd').toUpperCase(),
    });
    trackLead(email, typeof window !== 'undefined' ? window.location.href : undefined);
    trackTrafficStarsLead(email);
    trackTrafficStarsClick(email);
    trackTrafficStarsCheckout(email);
    const checkoutLink = document.getElementById('polar-checkout-link') as HTMLAnchorElement | null;
    if (checkoutLink) {
      const productId = polarProduct?.id ? encodeURIComponent(polarProduct.id) : '';
      const baseCheckoutUrl = 'https://buy.polar.sh/polar_cl_PDCLMgJIjDKHFNMnIJPq0VdO51YKqYoXa4DGo0JhM7Z';
      const checkoutUrl = productId ? `${baseCheckoutUrl}?products=${productId}` : baseCheckoutUrl;
      const successUrl = encodeURIComponent('https://composuremethod.help/?checkout=success&checkout_id={CHECKOUT_ID}');
      const cancelUrl = encodeURIComponent('https://composuremethod.help/?checkout=cancel');
      const returnUrl = encodeURIComponent('https://composuremethod.help/');
      checkoutLink.href = `${checkoutUrl}${productId ? '&' : '?'}email=${encodeURIComponent(email.trim())}&success_url=${successUrl}&cancel_url=${cancelUrl}&return_url=${returnUrl}`;
      checkoutLink.click();
    }
  };

  // ─── SUCCESS STATE ─────────────────────────────────────
  const successContent = (
    <div className="max-w-2xl mx-auto py-10 px-4 text-center animate-fadeIn">
      <div className="w-20 h-20 bg-[#b7f473] text-[#081d00] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg glow-accent animate-float">
        <span className="material-symbols-outlined text-4xl font-bold">check_circle</span>
      </div>
      <span className="badge-lime inline-flex items-center gap-1.5 mb-4">
        <span className="w-1.5 h-1.5 rounded-full bg-[#3e6a00] animate-pulse" />
        {t('checkout.orderConfirmed')}
      </span>
      <h2 className="font-display text-3xl font-bold text-[#081d00] mb-3">
        {t('checkout.orderVerifiedHeading')}
      </h2>
      <p className="font-body text-sm text-[#43483e] max-w-md mx-auto mb-8">
        {t('checkout.successBody')}
      </p>
      <button
        onClick={() => { if (onClose) onClose(); onNavigate('home'); setTimeout(() => { const el = document.getElementById('curriculum'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }, 100); }}
        className="btn-primary py-4 px-8"
      >
        <span className="material-symbols-outlined text-[#b7f473]">auto_stories</span>
        {t('checkout.accessButton')}
        <span className="material-symbols-outlined">arrow_forward</span>
      </button>
    </div>
  );

  // ─── MAIN CHECKOUT FORM ────────────────────────────────
  const formContent = (
    <div className="w-full max-w-[960px] mx-auto py-2 px-1 sm:py-4 sm:px-2 md:px-0">
      {/* Modal header */}
        {isModalOverlay && (
          <div className="flex justify-between items-center mb-5 pb-3 border-b border-[#173404]/10 pr-10">
            <div>
              <span className="badge-lime">{t('checkout.secureCheckout')}</span>
            </div>
          </div>
        )}

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 items-start">
        {/* ── LEFT: Order summary ───────────────── */}
        <div className="order-2 md:order-1 md:col-span-5 flex flex-col gap-4">
          <div className="premium-card px-4 py-2 sm:p-5 flex flex-col gap-4">
            {/* Product row */}
            <div className="flex gap-3 items-start pb-3 border-b border-[#173404]/8 flex-col">
              {productImage ? (
                <img
                  src={productImage}
                  alt={polarProduct?.name || t('checkout.digitalGuideFallback')}
                  className="w-full sm:w-56 h-36 aspect-video object-cover rounded-lg shadow-md border border-[#173404]/10 shrink-0"
                />
              ) : (
                <div className="w-full sm:w-56 h-36 aspect-video bg-[#f4f7f2] border border-[#173404]/10 rounded-lg flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[#173404] text-2xl">menu_book</span>
                </div>
              )}
              <div className="flex flex-col gap-0.5">
                <h3 className="font-display text-sm sm:text-base font-bold text-[#081d00] leading-snug">
                  {polarProduct?.name || 'The Composure Method'}
                </h3>
                <p className="font-body text-xs text-[#43483e]">{productDescription}</p>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="font-display text-lg sm:text-xl font-bold text-[#173404]">{priceFormatted}</span>
                </div>
              </div>
            </div>

            {/* Included items */}
            <ul className="flex flex-col gap-1.5 font-body text-xs text-[#43483e]">
              {[
                ['check_circle', t('checkout.includedItems.instantAccess')],
                ['shield', t('checkout.includedItems.moneyBack')],].map(([icon, text]) => (
                <li key={text} className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#3e6a00] text-base shrink-0">{icon}</span>
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Payment methods */}
          {/* <div className="text-center space-y-1.5">
            <p className="font-mono-caps text-[10px] text-[#74796d]">ACCEPTED PAYMENT METHODS</p>
            <div className="flex flex-wrap justify-center gap-1.5">
              {['Apple Pay', 'Google Pay', 'Visa', 'Mastercard', 'AMEX'].map(m => (
                <span key={m} className="bg-white border border-[#173404]/10 rounded-lg px-2 py-1 font-mono text-[11px] text-[#43483e] font-bold shadow-xs">
                  {m}
                </span>
              ))}
            </div>
          </div> */}
        </div>

        {/* ── RIGHT: Email form ─────────────────── */}
        <div className="order-1 md:order-2 md:col-span-7">
          <div className="premium-card p-6 md:p-8 space-y-6">
            <div>
              <h3 className="font-display text-xl font-bold text-[#081d00] mb-1">
                {t('checkout.title')}
              </h3>
              <p className="font-body text-xs text-[#43483e]">
                {t('checkout.subtitle')}
              </p>
            </div>

            <form onSubmit={handleProceedToPolarCheckout} className="space-y-5">
              <div>
                <label className="font-mono-caps text-[11px] text-[#43483e] block mb-1.5 font-bold">
                  {t('checkout.emailLabel')}
                </label>
                <input
                  id="checkout-email-input"
                  type="email"
                  required
                  value={email}
                  onChange={handleEmailChange}
                  placeholder={t('checkout.emailPlaceholder')}
                  className="input-field w-full border border-[#173404]/10 focus:border-[#3e6a00] focus:ring-1 focus:ring-[#3e6a00] rounded-lg px-4 py-3 text-sm text-[#081d00] placeholder:text-[#74796d] font-body"
                />
              </div>

              {polarProduct && (
                <div className="bg-[#f4f7f2] border border-[#173404]/10 p-3.5 rounded-xl font-mono text-xs flex items-center justify-between text-[#43483e] flex-col gap-2">
                  <div>
                    <span className="text-[10px] text-[#74796d] block uppercase">{t('checkout.productLabel')}</span>
                    <span className="text-[#081d00] font-bold truncate block max-w-[200px] sm:max-w-[280px]">{polarProduct.name}</span>
                  </div>
                  <span className="text-[#173404] font-bold text-sm">{priceFormatted}</span>
                </div>
              )}

              <button
                id="checkout-submit-btn"
                type="submit"
                disabled={loading || fetchingProduct}
                className="w-full btn-primary py-4 px-6 text-base disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <span className="animate-spin material-symbols-outlined text-sm">autorenew</span>
                    <span>{t('checkout.loadingCopy')}</span>
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[#b7f473]">lock_open</span>
                    <span>{t('checkout.submitButton')}</span>
                    <span className="material-symbols-outlined">arrow_forward</span>
                  </>
                )}
              </button>

              <p className="font-mono text-[10px] text-[#74796d] text-center">
                {t('checkout.fulfillmentFooter')}
              </p>
            </form>

            <a
              id="polar-checkout-link"
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'none' }}
              aria-hidden="true"
            >
              Polar Checkout
            </a>
          </div>
        </div>
      </div>
    </div>
  );

  const activeContent = submitted ? successContent : formContent;

  if (isModalOverlay) {
    return (
      <div className="fixed inset-0 z-50 modal-backdrop flex items-center justify-center p-2 sm:p-4 animate-fadeIn">
        <div className="bg-[#fcf9f8] rounded-2xl sm:rounded-3xl max-w-3xl w-full max-h-[92vh] shadow-2xl relative flex flex-col overflow-hidden">
          {/* Close button lives outside the scrollable area below, so it
              is always visible regardless of content height or scroll position. */}
          {onClose && <CloseButton onClose={onClose} />}
          <div className="overflow-y-auto p-4 sm:p-6 md:p-8">
            {activeContent}
          </div>
        </div>
      </div>
    );
  }

  return activeContent;
};