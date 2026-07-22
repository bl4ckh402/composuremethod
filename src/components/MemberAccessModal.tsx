import React, { useState } from 'react';
import { trackLead, trackSignUp, initRedditPixel } from '../lib/redditPixel';

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
  const [message, setMessage] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);

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
        setMessage({
          type: 'success',
          text: `Verified! Active paid membership found for ${email.trim()}. Full access granted!`,
        });
        localStorage.setItem('composure_user_email', email.trim());
        localStorage.setItem('composure_verified_access', 'true');
        setTimeout(() => {
          onAccessGranted(email.trim());
          onClose();
        }, 1200);
      } else {
        setMessage({
          type: 'error',
          text: `No active order found for ${email.trim()}. Please ensure you completed checkout with this email address, or place a new order below.`,
        });
      }
    } catch (err) {
      console.error('Error verifying access:', err);
      setMessage({
        type: 'error',
        text: 'Failed to verify order status with database. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#fcf9f8] max-w-md w-full rounded-2xl border border-[#173404]/20 p-6 md:p-8 shadow-2xl relative space-y-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#74796d] hover:text-[#081d00] transition-colors rounded-full"
        >
          <span className="material-symbols-outlined text-xl">close</span>
        </button>

        <div className="space-y-2">
          <span className="text-xs font-mono-caps text-[#3e6a00] bg-[#b7f473]/30 px-3 py-1 rounded-full inline-block">
            MEMBER ACCESS VERIFICATION
          </span>
          <h3 className="font-display text-2xl font-bold text-[#081d00]">
            Check Access Status
          </h3>
          <p className="font-body text-xs text-[#43483e] leading-relaxed">
            Enter the email address you used during checkout to verify your paid order status and instantly restore full digital access.
          </p>
        </div>

        <form onSubmit={handleVerify} className="space-y-4">
          <div>
            <label className="font-mono-caps text-[11px] text-[#43483e] block mb-1">
              CUSTOMER EMAIL ADDRESS
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. user@domain.com"
              className="w-full bg-white border border-[#173404]/20 rounded-xl px-4 py-3 text-[#1c1b1b] font-body text-sm focus:ring-1 focus:ring-[#173404] focus:border-[#173404] transition-colors"
            />
          </div>

          {message && (
            <div
              className={`p-3 rounded-xl font-body text-xs leading-snug ${
                message.type === 'success'
                  ? 'bg-[#f4fce8] border border-[#3e6a00]/30 text-[#081d00]'
                  : message.type === 'error'
                  ? 'bg-red-50 border border-red-200 text-red-800'
                  : 'bg-blue-50 border border-blue-200 text-blue-800'
              }`}
            >
              {message.text}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#173404] text-white font-mono-caps text-xs py-3.5 rounded-full hover:bg-[#081d00] transition-all duration-200 shadow-sm cursor-pointer flex items-center justify-center gap-2"
          >
            {loading ? (
              <span>VERIFYING ORDER...</span>
            ) : (
              <>
                <span className="material-symbols-outlined text-sm">verified</span>
                <span>VERIFY PAID ACCESS</span>
              </>
            )}
          </button>
        </form>

        <div className="pt-4 border-t border-[#173404]/10 text-center space-y-1">
          <p className="font-body text-[11px] text-[#74796d]">
            Haven't purchased yet? <button onClick={onClose} className="text-[#173404] font-bold underline cursor-pointer">Get access for $20</button>
          </p>
          <p className="font-mono text-[10px] text-[#a0a599]">
            Discreet verification • Instant delivery
          </p>
        </div>
      </div>
    </div>
  );
};
