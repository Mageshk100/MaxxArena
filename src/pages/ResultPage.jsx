import React from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import ResultCard from '../components/ResultCard';

/**
 * ResultPage (Scoreboard)
 * Friendly, colorful completion screen!
 */
function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const result = location.state;

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--bg-elevated)]">
        <div className="text-center bg-[var(--bg-surface)] border-2 border-[var(--border-subtle)] p-12 rounded-[var(--radius-xl)] shadow-[var(--shadow-soft)]">
          <span className="text-6xl block mb-6">🤷‍♂️</span>
          <h2 className="font-display text-2xl font-black text-[var(--text-muted)] mb-8">
            No results found!
          </h2>
          <Link to="/" className="neon-btn font-bold">
            <span>Back to Arena</span>
          </Link>
        </div>
      </div>
    );
  }

  const {
    problemTitle,
    timeTaken,
    accuracy,
    speedScore,
    finalScore,
    errors,
    totalChars,
    correctChars,
  } = result;

  const minutes = Math.floor(timeTaken / 60);
  const seconds = timeTaken % 60;
  const timeFormatted = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const getGrade = (score) => {
    const s = parseFloat(score);
    if (s >= 90) return { label: 'Excellent', color: '#16A34A', emoji: '🌟', message: 'Legendary coding skills!' };
    if (s >= 70) return { label: 'Good', color: '#EAB308', emoji: '👍', message: 'Great job! Keep it up!' };
    return { label: 'Practice', color: '#EF4444', emoji: '😅', message: 'Don\'t give up! Try again.' };
  };

  const grade = getGrade(finalScore);
  const scoreNum = parseFloat(finalScore);

  const radius = 72;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (scoreNum / 100) * circumference;

  return (
    <div className="page-enter w-full min-h-screen px-6 py-12 flex flex-col items-center bg-[var(--bg-elevated)]">
      <div className="w-full max-w-5xl">
        
        {/* ===== Header ===== */}
        <div className="text-center mb-10 flex flex-col items-center">
          <h1 className="font-display text-5xl font-black text-[var(--text-primary)] tracking-tight mb-4">
            Level Complete! {grade.emoji}
          </h1>
          <p className="text-lg text-[var(--text-secondary)] font-bold bg-[var(--bg-surface)] px-6 py-2 rounded-full border-2 border-[var(--border-subtle)] shadow-[0_4px_0_var(--border-subtle)]">
            Results for: <span className="text-[var(--color-primary)]">{problemTitle}</span>
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-stretch mb-12">
          
          {/* ===== Score Ring Box ===== */}
          <div className="w-full lg:w-1/3 bg-[var(--bg-surface)] border-2 border-[var(--border-subtle)] rounded-[var(--radius-xl)] p-8 flex flex-col items-center justify-center shadow-[var(--shadow-soft)] relative overflow-hidden">
            <h3 className="text-sm uppercase tracking-widest font-black text-[var(--text-muted)] mb-6 z-10">Grade</h3>
            
            <div className="score-circle mb-8 z-10">
              <svg width="180" height="180" viewBox="0 0 180 180">
                <circle className="score-circle-bg" cx="90" cy="90" r={radius} fill="none" strokeWidth="12" stroke="#F1F5F9" />
                <circle
                  className="score-circle-fill"
                  cx="90" cy="90" r={radius}
                  fill="none"
                  stroke={grade.color}
                  strokeWidth="12"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={offset}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center pt-2 transform hover:scale-110 transition-transform cursor-default">
                <span className={`font-display font-black ${grade.label === 'Needs Practice' ? 'text-2xl text-center leading-tight' : 'text-5xl'}`} style={{ color: grade.color }}>
                  {grade.label}
                </span>
              </div>
            </div>
            
            <p className="text-[var(--text-primary)] font-bold text-center text-lg z-10 bg-gray-50 px-4 py-2 rounded-xl border-2 border-gray-100">
              {grade.message}
            </p>
          </div>

          <div className="w-full lg:w-2/3 flex flex-col gap-8">
            {/* ===== Stats Grid ===== */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <ResultCard
                label="Time Taken"
                value={timeFormatted}
                iconEmoji="⏱️"
                glowClass="stat-glow-blue"
              />
              <ResultCard
                label="Accuracy"
                value={`${accuracy}%`}
                iconEmoji="🎯"
                glowClass="stat-glow-green"
              />
              <ResultCard
                label="Speed"
                value={`${speedScore}%`}
                iconEmoji="🚀"
                glowClass="stat-glow-purple"
              />
              <ResultCard
                label="Errors"
                value={errors}
                iconEmoji="❌"
                glowClass="stat-glow-red"
              />
            </div>

            {/* ===== Breakdown Bars ===== */}
            <div className="bg-[var(--bg-surface)] border-2 border-[var(--border-subtle)] rounded-[var(--radius-xl)] p-8 shadow-[var(--shadow-soft)]">
              <h3 className="text-sm uppercase tracking-widest font-black text-[var(--text-muted)] mb-8">
                Performance Breakdown
              </h3>
              <div className="space-y-8">
                
                {/* Accuracy */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[0.9rem] font-black text-[var(--text-primary)]">🎯 Accuracy ({correctChars}/{totalChars})</span>
                    <span className="text-[1rem] font-bold text-[#16A34A] bg-[#DCFCE7] px-3 py-1 rounded-lg">{accuracy}%</span>
                  </div>
                  <div className="breakdown-bar">
                    <div
                      className="breakdown-bar-fill shadow-inner"
                      style={{ width: `${accuracy}%`, backgroundColor: '#22C55E' }}
                    />
                  </div>
                </div>

                {/* Final Score */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[0.9rem] font-black text-[var(--text-primary)]">🌟 Final Score (Combined)</span>
                    <span className="text-[1rem] font-bold text-[var(--color-primary)] bg-indigo-100 px-3 py-1 rounded-lg">{finalScore}%</span>
                  </div>
                  <div className="breakdown-bar">
                    <div
                      className="breakdown-bar-fill shadow-inner"
                      style={{ width: `${finalScore}%`, backgroundColor: 'var(--color-primary)' }}
                    />
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* ===== Action Buttons ===== */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-6">
          <button
            id="try-again-btn"
            className="neon-btn font-bold text-lg px-8 py-3 bg-[var(--bg-surface)] text-[var(--text-primary)] border-2 border-[var(--border-subtle)] shadow-[0_5px_0_var(--border-subtle)] hover:bg-gray-50 hover:shadow-[0_7px_0_var(--border-subtle)] hover:border-[var(--border-light)]"
            onClick={() => navigate(-1)}
          >
            <span>🔄 Replay Level</span>
          </button>
          <Link
            to="/"
            id="back-home-btn"
            className="neon-btn font-bold text-lg px-8 py-3 shadow-[0_5px_0_var(--color-primary-dark)]"
          >
            <span>🏠 Main Menu</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ResultPage;
