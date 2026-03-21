import React from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * ProblemCard Component
 * Playful, bouncy cartoon card for the coding problems.
 */
function ProblemCard({ problem }) {
  const navigate = useNavigate();

  const badgeClass = {
    Easy: 'badge-easy',
    Medium: 'badge-medium',
    Hard: 'badge-hard',
  }[problem.difficulty];

  // Map icons based on titles or tags
  const iconEmoji = problem.difficulty === 'Easy' ? '🟢' : problem.difficulty === 'Medium' ? '🟡' : '🔴';

  return (
    <div
      id={`problem-card-${problem.id}`}
      className="problem-card group w-full h-full min-h-[200px]"
      onClick={() => navigate(`/problem/${problem.id}`)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter') navigate(`/problem/${problem.id}`);
      }}
    >
      {/* Card header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-xl">{iconEmoji}</span>
          <span className="font-display text-[0.8rem] font-black text-[var(--text-muted)] tracking-widest uppercase">
            #{String(problem.id).padStart(2, '0')}
          </span>
        </div>
        <span className={`badge ${badgeClass}`}>{problem.difficulty}</span>
      </div>

      {/* Title */}
      <h3 className="font-display text-xl font-bold text-[var(--text-primary)] mb-3 leading-tight group-hover:text-[var(--color-primary)] transition-colors duration-200">
        {problem.title}
      </h3>

      {/* Description */}
      <p className="text-[0.9rem] font-medium text-[var(--text-secondary)] line-clamp-2 leading-relaxed flex-1">
        {problem.description}
      </p>

      {/* Action hint — bouncy button style */}
      <div className="mt-6 pt-0 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
        <span className="bg-[var(--bg-elevated)] text-[var(--color-primary)] font-bold px-4 py-2 rounded-xl text-sm border-2 border-[var(--border-subtle)]">
          Play level
        </span>
        <div className="w-10 h-10 bg-[var(--color-primary)] text-white rounded-full flex items-center justify-center font-bold text-lg shadow-[0_4px_0_var(--color-primary-dark)] group-hover:scale-110 transition-transform">
          ▶
        </div>
      </div>
    </div>
  );
}

export default ProblemCard;
