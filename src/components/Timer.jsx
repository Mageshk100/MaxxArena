import React from 'react';

/**
 * Timer Component
 * Bouncy, cheerful timer with bold numbers.
 */
function Timer({ timeLeft, isRunning }) {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formatted = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const isWarning = isRunning && timeLeft <= 10;

  return (
    <div id="timer" className="flex items-center gap-2">
      <div className={`p-2 rounded-xl transition-colors duration-300 ${isWarning ? 'bg-[var(--bg-elevated)] text-red-500' : 'bg-[var(--bg-elevated)] text-blue-500'}`}>
        <span className="text-2xl pt-1 block">{isWarning ? '⏰' : '⏳'}</span>
      </div>

      <span
        className={`font-display text-2xl font-black tracking-widest pl-1 bg-[var(--bg-surface)] px-3 py-1.5 rounded-xl border-2 transition-colors duration-300 ${
          isWarning ? 'border-red-500 text-red-500 timer-warning shadow-[0_4px_0_#EF4444]' : 'border-[var(--border-subtle)] text-[var(--text-primary)] shadow-[0_4px_0_var(--border-subtle)]'
        }`}
      >
        {formatted}
      </span>
    </div>
  );
}

export default Timer;
