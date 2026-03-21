import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import TypingArena from '../components/TypingArena';
import LanguageSelector from '../components/LanguageSelector';
import Timer from '../components/Timer';
import problems from '../data/problems';

/**
 * ProblemPage (Challenge Room)
 * Friendly learning interface style.
 * Backed by dynamic timer and auto-submit.
 */

function ProblemPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const problem = problems.find((p) => p.id === parseInt(id));

  const [language, setLanguage] = useState('python');
  const [userCode, setUserCode] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const timerRef = useRef(null);
  const targetSolution = problem ? problem.solutions[language] : '';

  const difficultyTimes = { Easy: 120, Medium: 300, Hard: 600 };
  const getCalculatedTime = useCallback(() => {
    if (!problem || !targetSolution) return 300;
    const baseTime = difficultyTimes[problem.difficulty] || 300;
    const lengthTime = Math.ceil(targetSolution.length * 0.4);
    return Math.max(baseTime, lengthTime);
  }, [problem, targetSolution]);

  const [maxTime, setMaxTime] = useState(getCalculatedTime());
  const [timeLeft, setTimeLeft] = useState(getCalculatedTime());

  useEffect(() => {
    if (!isRunning) {
      const newMax = getCalculatedTime();
      setMaxTime(newMax);
      setTimeLeft(newMax);
    }
  }, [targetSolution, isRunning, getCalculatedTime]);

  const startTimer = useCallback(() => {
    if (!isRunning && !isSubmitted) {
      setIsRunning(true);
      setIsTyping(true);
    }
  }, [isRunning, isSubmitted]);

  const handleSubmit = useCallback((currentCode) => {
    if (isSubmitted) return;
    setIsSubmitted(true);
    setIsTyping(false);

    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    const codeToEval = typeof currentCode === 'string' ? currentCode : userCode;
    const timeTaken = maxTime - timeLeft;
    const solution = targetSolution;
    const userChars = codeToEval.split('');
    const solutionChars = solution.split('');
    const totalChars = solutionChars.length;

    let correctChars = 0;
    for (let i = 0; i < Math.min(userChars.length, totalChars); i++) {
      if (userChars[i] === solutionChars[i]) correctChars++;
    }

    const errors = totalChars - correctChars;
    const accuracy = totalChars > 0 ? (correctChars / totalChars) * 100 : 0;
    const speedScore = ((maxTime - timeTaken) / maxTime) * 100;
    const finalScore = 0.6 * accuracy + 0.4 * speedScore;

    setTimeout(() => {
      navigate('/result', {
        state: {
          problemTitle: problem.title,
          timeTaken,
          accuracy: accuracy.toFixed(1),
          speedScore: speedScore.toFixed(1),
          finalScore: finalScore.toFixed(1),
          errors,
          totalChars,
          correctChars,
        },
      });
    }, 250);
  }, [isSubmitted, timeLeft, maxTime, userCode, targetSolution, problem, navigate]);

  const handleInputChange = useCallback((newInput) => {
    setUserCode(newInput);
    if (newInput.length > 0) {
      setIsTyping(true);
    } else if (!isRunning) {
      setIsTyping(false);
    }
    
    // Auto-submit condition
    if (!isSubmitted) {
      if (newInput.length >= targetSolution.length) {
        handleSubmit(newInput);
      }
    }
  }, [isSubmitted, targetSolution, handleSubmit, isRunning]);

  const startTimeRef = useRef(null);
  const latestHandleSubmit = useRef(handleSubmit);

  useEffect(() => {
    latestHandleSubmit.current = handleSubmit;
  }, [handleSubmit]);

  useEffect(() => {
    if (isRunning && !isSubmitted) {
      if (!timerRef.current) {
        startTimeRef.current = Date.now();
        
        // We know maxTime doesn't change during the run
        timerRef.current = setInterval(() => {
          const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
          const remaining = Math.max(maxTime - elapsed, 0);
          
          setTimeLeft(remaining);

          if (remaining <= 0) {
            clearInterval(timerRef.current);
            timerRef.current = null;
            latestHandleSubmit.current(); // Call latest without recreating interval
          }
        }, 1000);
      }
    }
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isRunning, isSubmitted, maxTime]);

  const handleLanguageChange = (lang) => {
    if (isRunning) return;
    setLanguage(lang);
    setUserCode('');
    setIsTyping(false);
  };

  if (!problem) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-display text-4xl text-[var(--color-error)] mb-6 font-black">
            Oops! Problem Not Found 😅
          </h2>
          <Link to="/" className="neon-btn">
            <span>Back to Arena</span>
          </Link>
        </div>
      </div>
    );
  }

  const progress = targetSolution.length > 0
    ? Math.min((userCode.length / targetSolution.length) * 100, 100)
    : 0;

  const timeTakenSoFar = maxTime - timeLeft;
  const wpm = timeTakenSoFar > 0 ? Math.floor((userCode.length / 5) / (timeTakenSoFar / 60)) : 0;

  const totalTyped = Math.min(userCode.length, targetSolution.length);
  const correctTyped = userCode.split('').filter((char, i) => char === targetSolution[i]).length;
  const currentAccuracy = totalTyped > 0 ? ((correctTyped / totalTyped) * 100).toFixed(0) : '100';

  const badgeClass = {
    Easy: 'badge-easy',
    Medium: 'badge-medium',
    Hard: 'badge-hard',
  }[problem.difficulty];

  return (
    <div className="page-enter w-full h-screen flex flex-col bg-[var(--bg-primary)] overflow-hidden relative">
      
      {/* ===== Fixed Floating Timer & Stats (Top Center) ===== */}
      <div className="fixed top-3 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4 bg-[var(--bg-surface)] px-6 py-2 rounded-2xl border-2 border-[var(--border-subtle)] shadow-lg shadow-black/5">
        {isRunning && (
          <>
            <div className="flex items-center gap-2 pr-4 border-r-2 border-[var(--border-subtle)]">
              <span className="text-xs font-bold text-[var(--text-muted)] uppercase">WPM</span>
              <span className="font-display text-lg font-black text-[var(--color-primary)]">
                {wpm}
              </span>
            </div>
            <div className="flex items-center gap-2 pr-4 border-r-2 border-[var(--border-subtle)] hidden sm:flex">
              <span className="text-xs font-bold text-[var(--text-muted)] uppercase">Acc</span>
              <span className="font-display text-lg font-black text-[var(--color-accent)]">
                {currentAccuracy}%
              </span>
            </div>
          </>
        )}
        <Timer timeLeft={timeLeft} isRunning={isRunning} />
      </div>

      {/* ===== Top Bar ===== */}
      <div className="challenge-topbar">
        {/* Left: Back + Info */}
        <div className="flex items-center gap-4">
          <Link
            to="/"
            id="back-to-arena"
            className="flex items-center gap-2 p-2 rounded-xl text-[var(--text-secondary)] hover:bg-[var(--border-subtle)] hover:text-[var(--text-primary)] transition-colors font-bold"
          >
            <span className="text-xl">🏠</span>
            <span className="text-sm border-2 rounded p-1">ESC</span>
          </Link>
          <div className="w-0.5 h-6 bg-[var(--border-subtle)] rounded-full" />
          <span className="font-display text-lg text-[var(--text-primary)] tracking-wide hidden sm:block">
            {problem.title}
          </span>
          <span className={`badge ${badgeClass} ml-2 hidden md:inline-flex`}>{problem.difficulty}</span>
        </div>
      </div>

      {/* ===== Main Content Area ===== */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* === Left Panel: Problem Information === */}
        <div 
          className={`challenge-left-panel custom-scrollbar shadow-inner transition-all duration-500 ease-in-out origin-left ${
            isTyping ? 'w-0 min-w-0 max-w-0 opacity-0 p-0 border-none scale-x-0' : 'w-[360px] min-w-[320px] max-w-[440px] opacity-100 scale-x-100'
          }`}
        >
          
          {/* Header & Language */}
          <div className="bg-[var(--bg-surface)] border-2 border-[var(--border-subtle)] p-6 rounded-[var(--radius-xl)] shadow-[var(--shadow-soft)]">
            <h1 className="font-display text-2xl font-black text-[var(--text-primary)] leading-tight mb-4">
              Mission: <span className="text-[var(--color-primary)]">{problem.title}</span> 🚀
            </h1>
            <LanguageSelector selected={language} onSelect={handleLanguageChange} />
            {isRunning && (
              <div className="mt-4 flex items-center gap-2 text-sm font-bold text-[var(--color-secondary)] bg-[var(--bg-elevated)] p-2 rounded-xl border border-[var(--color-secondary)]">
                <span>🔒</span> Challenge in Progress!
              </div>
            )}
          </div>

          {/* Problem Description */}
          <div className="info-section">
            <h3 className="text-sm font-bold text-[var(--text-primary)] mb-3 flex items-center gap-2 uppercase tracking-widest text-[#4F46E5]">
              <span className="bg-[#EEF2FF] p-2 rounded-xl">📝</span> Instructions
            </h3>
            <p className="text-[1rem] font-medium text-[var(--text-secondary)] leading-relaxed">
              {problem.description}
            </p>

            {/* Hint toggle */}
            <div className="mt-6 pt-4 border-t-2 border-[var(--border-subtle)]">
              <button
                id="toggle-explanation"
                className="flex items-center gap-2 text-[0.95rem] font-bold text-[#818CF8] hover:text-[var(--color-primary-dark)] transition-colors w-full justify-between p-3 rounded-xl hover:bg-gray-50 bg-transparent border-none"
                onClick={() => setShowExplanation(!showExplanation)}
              >
                <span>Need a hint? 💡</span>
                <span className={`text-xl transition-transform duration-200 ${showExplanation ? 'rotate-180' : ''}`}>
                  👇
                </span>
              </button>

              {showExplanation && (
                <div className="mt-3 text-[0.9rem] font-semibold text-[var(--text-primary)] leading-relaxed bg-[var(--bg-elevated)] rounded-2xl p-5 border-2 border-[var(--color-secondary)] shadow-[0_4px_0_#FEF08A]">
                  {problem.explanation}
                </div>
              )}
            </div>
          </div>

          {/* Bottom actions */}
          <div className="mt-auto pt-4 flex flex-col gap-5">
            <div className="bg-[var(--bg-surface)] border-2 border-[var(--border-subtle)] p-4 rounded-[var(--radius-lg)] shadow-[var(--shadow-soft)]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold text-[var(--text-secondary)]">
                  Progress ({userCode.length}/{targetSolution.length})
                </span>
                <span className="font-display text-sm font-black text-[var(--color-accent)]">
                  {progress.toFixed(0)}%
                </span>
              </div>
              <div className="progress-bar">
                <div
                  className="progress-bar-fill"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <button
              id="submit-btn"
              className="neon-btn w-full py-4 text-lg justify-center shadow-[0_6px_0_#16A34A] hover:shadow-[0_8px_0_#16A34A] bg-[var(--color-accent)] hover:bg-[#4ade80]"
              onClick={handleSubmit}
              disabled={!isRunning || isSubmitted}
              style={{
                opacity: !isRunning || isSubmitted ? 0.5 : 1,
                cursor: !isRunning || isSubmitted ? 'not-allowed' : 'pointer',
              }}
            >
              <span>✅ Submit Answer</span>
            </button>
          </div>
        </div>

        {/* === Right Panel: Typing Editor === */}
        <div className="challenge-right-panel custom-scrollbar transition-all duration-500 ease-in-out relative">
          {/* Add a fade/overlay if typing to bring focus back to instructions */}
          {isTyping && (
             <button 
               className="absolute top-6 right-6 z-50 neon-btn-secondary !px-4 !py-2 !text-xs opacity-50 hover:opacity-100 transition-opacity flex gap-2 items-center"
               onClick={() => setIsTyping(false)}
             >
               <span>📖</span> Show Instructions
             </button>
          )}

          <TypingArena
            solution={targetSolution}
            onFirstKeystroke={startTimer}
            onInputChange={handleInputChange}
            disabled={isSubmitted}
            language={language}
          />
        </div>

      </div>
    </div>
  );
}

export default ProblemPage;
