import React, { useState, useEffect, useRef, useCallback } from 'react';

/**
 * TypingArena Component
 * Friendly typing surface. Clean black text, rounded editor borders, bright highlights.
 */
function TypingArena({ solution, onFirstKeystroke, onInputChange, disabled, language }) {
  const [userInput, setUserInput] = useState('');
  const hasStarted = useRef(false);
  const containerRef = useRef(null);
  const cursorRef = useRef(null);

  const solutionChars = solution.split('');

  useEffect(() => {
    if (!disabled && containerRef.current) {
      containerRef.current.focus();
    }
  }, [disabled]);

  useEffect(() => {
    if (cursorRef.current) {
      cursorRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [userInput]);

  const handleKeyDown = useCallback(
    (e) => {
      if (disabled) return;

      if ((e.ctrlKey || e.metaKey) && ['c', 'v', 'x', 'a'].includes(e.key.toLowerCase())) {
        e.preventDefault();
        return;
      }

      if (e.key === 'Backspace') {
        e.preventDefault();
        setUserInput((prev) => prev.slice(0, -1));
        return;
      }

      if (e.key === 'Tab') {
        e.preventDefault();
        appendChar('    ');
        return;
      }

      if (e.key === 'Enter') {
        e.preventDefault();
        appendChar('\n');
        return;
      }

      if (e.key.length !== 1) return;

      e.preventDefault();
      appendChar(e.key);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [disabled, solution]
  );

  const pendingFirstKeystroke = useRef(false);

  useEffect(() => {
    if (onInputChange) onInputChange(userInput);
  }, [userInput]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (pendingFirstKeystroke.current) {
      pendingFirstKeystroke.current = false;
      if (onFirstKeystroke) onFirstKeystroke();
    }
  });

  const appendChar = useCallback(
    (chars) => {
      setUserInput((prev) => {
        const remaining = solution.length - prev.length;
        const toAdd = chars.slice(0, remaining);
        if (toAdd.length === 0) return prev;

        if (!hasStarted.current) {
          hasStarted.current = true;
          pendingFirstKeystroke.current = true;
        }

        return prev + toAdd;
      });
    },
    [solution]
  );

  const handlePaste = useCallback((e) => e.preventDefault(), []);
  const handleContextMenu = useCallback((e) => e.preventDefault(), []);

  const renderLines = () => {
    const lines = solution.split('\n');
    const elements = [];
    let charIndex = 0;

    lines.forEach((line, lineIdx) => {
      const isLastLine = lineIdx === lines.length - 1;
      const gutterNum = String(lineIdx + 1).padStart(3, ' ');
      elements.push(
        <span key={`gutter-${lineIdx}`} className="ta-line-number" aria-hidden="true">
          {gutterNum}{'  '}
        </span>
      );

      for (let col = 0; col < line.length; col++) {
        const solChar = line[col];
        const idx = charIndex;
        const isTyped = idx < userInput.length;
        const isCursor = idx === userInput.length;
        const userChar = isTyped ? userInput[idx] : null;

        let cls = 'ta-upcoming';
        if (isTyped) {
          cls = userChar === solChar ? 'ta-correct' : 'ta-incorrect';
        } else if (isCursor) {
          cls = 'ta-cursor';
        }

        elements.push(
          <span key={`c-${idx}`} className={cls} ref={isCursor ? cursorRef : null}>
            {solChar}
          </span>
        );
        charIndex++;
      }

      if (!isLastLine) {
        const idx = charIndex;
        const isTyped = idx < userInput.length;
        const isCursor = idx === userInput.length;
        const userChar = isTyped ? userInput[idx] : null;

        let cls = 'ta-upcoming';
        if (isTyped) {
          cls = userChar === '\n' ? 'ta-correct' : 'ta-incorrect';
        } else if (isCursor) {
          cls = 'ta-cursor';
        }

        elements.push(
          <span key={`nl-${idx}`} className={cls} ref={isCursor ? cursorRef : null}>
            <span className="ta-newline-sym">↵</span>
            {'\n'}
          </span>
        );

        charIndex++;
      }
    });

    if (userInput.length >= solutionChars.length) {
      elements.push(
        <span key="cursor-end" className="ta-cursor" ref={cursorRef}>{' '}</span>
      );
    }

    return elements;
  };

  const typedCount = userInput.length;
  const totalCount = solutionChars.length;
  const correctCount = userInput.split('').filter((ch, i) => ch === solutionChars[i]).length;
  const currentAccuracy = typedCount > 0 ? ((correctCount / typedCount) * 100).toFixed(0) : '—';
  const fileExt = language === 'python' ? 'py' : language === 'java' ? 'java' : 'cpp';

  return (
    <div className="ta-wrapper shadow-[var(--shadow-soft)] w-full h-full">
      <div className="ta-header">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-400 border-2 border-red-500 shadow-sm" />
            <div className="w-3 h-3 rounded-full bg-amber-400 border-2 border-amber-500 shadow-sm" />
            <div className="w-3 h-3 rounded-full bg-green-400 border-2 border-green-500 shadow-sm" />
          </div>
          <span className="text-sm font-bold text-[var(--text-muted)] font-mono tracking-widest pl-2">
            workspace.{fileExt}
          </span>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 bg-[var(--bg-surface)] px-3 py-1.5 rounded-xl border-2 border-[var(--border-subtle)]">
            <span className="text-xs font-bold text-[var(--text-secondary)] uppercase">Accuracy</span>
            <span className={`font-display text-lg font-black ${
              currentAccuracy === '—' ? 'text-[var(--text-muted)]' :
              parseInt(currentAccuracy) >= 90 ? 'text-[#16A34A]' :
              parseInt(currentAccuracy) >= 70 ? 'text-[#D97706]' : 'text-[#DC2626]'
            }`}>
              {currentAccuracy}{currentAccuracy !== '—' && '%'}
            </span>
          </div>
        </div>
      </div>

      <div
        ref={containerRef}
        className="ta-surface"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
        onContextMenu={handleContextMenu}
        onClick={() => containerRef.current?.focus()}
      >
        <pre className="ta-code">{renderLines()}</pre>

        {disabled && (
          <div className="ta-overlay backdrop-blur-md rounded-b-[var(--radius-lg)]">
            <div className="flex flex-col items-center gap-4 bg-[var(--bg-surface)] p-8 rounded-3xl border-4 border-[#16A34A] shadow-[0_8px_0_#16A34A] transform scale-110">
              <span className="text-6xl">🎉</span>
              <span className="font-display font-black text-2xl text-[#16A34A]">Code Complete!</span>
            </div>
          </div>
        )}
      </div>

      <div className="ta-footer text-[var(--text-primary)]">
        <span className="flex items-center gap-2">
          {!hasStarted.current && !disabled
            ? <><span className="text-xl">👇</span> Click the area above to begin typing...</>
            : disabled
            ? <><span className="text-xl">✅</span> All done! Click Submit Answer on the left.</>
            : <><span className="text-xl">⌨️</span> Keep typing!</>}
        </span>
      </div>
    </div>
  );
}

export default TypingArena;
