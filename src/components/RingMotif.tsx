export default function RingMotif({ className = "", tone = "light" }) {
  const stroke = tone === "light" ? "#EAF3DE" : "#3B6D11";
  const line = tone === "light" ? "#97C459" : "#639922";
  return (
    <svg
      viewBox="0 0 400 400"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="200" cy="200" r="180" stroke={stroke} strokeOpacity="0.16" strokeWidth="1.2" fill="none" className="ring-breathe" />
      <circle cx="200" cy="200" r="140" stroke={stroke} strokeOpacity="0.24" strokeWidth="1.2" fill="none" className="ring-breathe-slow" />
      <circle cx="200" cy="200" r="100" stroke={stroke} strokeOpacity="0.34" strokeWidth="1.2" fill="none" className="ring-breathe-slower" />
      <circle cx="200" cy="200" r="60" stroke={stroke} strokeOpacity="0.5" strokeWidth="1.2" fill="none" />
      <path d="M40 200 C 140 180, 260 220, 360 200" stroke={line} strokeWidth="2" fill="none" strokeLinecap="round" />
      <circle cx="200" cy="200" r="3.5" fill={line} />
    </svg>
  );
}
