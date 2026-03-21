import React from 'react';

/**
 * ResultCard Component
 * Big, bold, white cards with cartoon icons for the final stats.
 */
function ResultCard({ label, value, iconEmoji, glowClass }) {
  return (
    <div className={`result-stat-card ${glowClass} flex flex-col items-center justify-center gap-3 bg-[var(--bg-surface)] text-center`}>
      <div className="icon-bg p-4 rounded-[var(--radius-xl)] shadow-inner transform -rotate-3 hover:rotate-3 transition-transform cursor-default">
        <span className="text-4xl">{iconEmoji}</span>
      </div>
      <div>
        <span className="text-[0.7rem] uppercase tracking-widest font-black text-[var(--text-muted)] block mb-1">
          {label}
        </span>
        <p className="font-display text-3xl font-black text-[var(--text-primary)]">
          {value}
        </p>
      </div>
    </div>
  );
}

export default ResultCard;
