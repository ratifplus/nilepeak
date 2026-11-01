export function Wordmark({ className = '' }: { className?: string }) {
  return (
    <span className={`flex items-center gap-3 ${className}`}>
      <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
        <path d="M1 20 L11 3 L21 20" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <path d="M6.5 20 L11 12.5 L15.5 20" fill="none" stroke="#3AD1FF" strokeWidth="1.6" />
      </svg>
      <span className="whitespace-nowrap font-display text-[19px] font-bold uppercase leading-none tracking-[0.2em]">Nile Peak</span>
    </span>
  );
}
