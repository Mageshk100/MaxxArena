import React from 'react';

/**
 * LanguageSelector Component
 * Playful, segmented control for language switching.
 */

const languages = [
  { key: 'python', label: 'Python', icon: '🐍' },
  { key: 'java', label: 'Java', icon: '☕' },
  { key: 'cpp', label: 'C++', icon: '⚡' },
];

function LanguageSelector({ selected, onSelect }) {
  return (
    <div id="language-selector" className="flex gap-2">
      {languages.map((lang) => (
        <button
          key={lang.key}
          id={`lang-${lang.key}`}
          className={`lang-option flex items-center gap-2 shadow-[0_4px_0_var(--border-subtle)] hover:shadow-[0_6px_0_var(--border-subtle)] transform hover:-translate-y-1 active:translate-y-2 active:shadow-[0_0_0_transparent] ${
            selected === lang.key ? 'active shadow-[0_4px_0_var(--color-primary-dark)] hover:shadow-[0_4px_0_var(--color-primary-dark)] hover:translate-y-0 active:translate-y-2 active:shadow-[0_0_0_transparent]' : ''
          }`}
          onClick={() => onSelect(lang.key)}
        >
          <span className="text-xl">{lang.icon}</span>
          <span className="tracking-wide">{lang.label}</span>
        </button>
      ))}
    </div>
  );
}

export default LanguageSelector;
