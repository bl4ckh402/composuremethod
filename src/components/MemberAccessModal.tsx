import React, { useState } from 'react';
import { trackLead } from '../lib/redditPixel';

interface MemberAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAccessGranted: (email: string) => void;
}

export const MemberAccessModal: React.FC<MemberAccessModalProps> = ({
  isOpen,
  onClose,
  onAccessGranted,
}) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  if (!isOpen) return null;

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setLoading(true);
    setMessage(null);
    trackLead(email.trim());

    try {
      const res = await fetch('/api/user/verify-access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await res.json();

      if (data.hasAccess) {
        setMessage({ type: 'success', text: `Verified! Active paid membership found for ${email.trim()}. Full access granted!` });
        localStorage.setItem('composure_user_email', email.trim());
        localStorage.setItem('composure_verified_access', 'true');
        setTimeout(() => { onAccessGranted(email.trim()); onClose(); }, 1200);
      } else {
        setMessage({ type: 'error', text: `No active order found for ${email.trim()}. Please ensure you completed checkout with this email, or place a new order.` });
      }
    } catch {
      setMessage({ type: 'error', text: 'Failed to verify order status. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop animate-fadeIn">
      <div className="bg-[#fcf9f8] max-w-md w-full rounded-3xl border border-[#173404]/12 p-6 md:p-8 shadow-2xl relative space-y-6 animate-scaleIn">


        {/* Header */}
        <div className="space-y-2 pr-8">
          <span className="badge-lime inline-block">MEMBER ACCESS VERIFICATION</span>
          <h3 className="font-display text-2xl font-bold text-[#081d00]">Check Access Status</h3>
          <p className="font-body text-xs text-[#43483e] leading-relaxed">
            Enter the email address you used during checkout to verify your paid order and instantly restore full digital access.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleVerify} className="space-y-4">
          <div>
            <label className="font-mono-caps text-[11px] text-[#43483e] block mb-1.5 font-bold">
              CUSTOMER EMAIL ADDRESS
            </label>
            <input
              id="member-access-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. user@domain.com"
              className="input-field"
            />
          </div>

          {message && (
            <div className={`p-3.5 rounded-xl font-body text-xs leading-relaxed flex items-start gap-2 ${
              message.type === 'success'
                ? 'bg-[#f4fce8] border border-[#3e6a00]/25 text-[#081d00]'
                : 'bg-red-50 border border-red-200 text-red-800'
            }`}>
              <span className="material-symbols-outlined text-sm shrink-0 mt-0.5">
                {message.type === 'success' ? 'check_circle' : 'error_outline'}
              </span>
              {message.text}
            </div>
          )}

          <button
            id="member-verify-btn"
            type="submit"
            disabled={loading}
            className="w-full btn-primary py-3.5 text-sm disabled:opacity-50"
          >
            {loading ? (
              <>
                <span className="animate-spin material-symbols-outlined text-sm">autorenew</span>
                <span>VERIFYING ORDER...</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-sm text-[#b7f473]">verified</span>
                <span>VERIFY PAID ACCESS</span>
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="pt-4 border-t border-[#173404]/8 text-center space-y-1">
          <p className="font-body text-[11px] text-[#74796d]">
            Haven't purchased yet?{' '}
            <button onClick={onClose} className="text-[#173404] font-bold underline cursor-pointer hover:text-[#3e6a00] transition-colors">
              Get access for $20
            </button>
          </p>
          <p className="font-mono text-[10px] text-[#a0a599]">Discreet verification • Instant delivery</p>
        </div>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#74796d] hover:text-[#081d00] hover:bg-[#f0ebe3] transition-all rounded-full cursor-pointer z-55 flex items-center justify-center"
          aria-label="Close"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};
