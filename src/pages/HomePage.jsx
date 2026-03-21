import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ProblemCard from '../components/ProblemCard';
import problems from '../data/problems';

/**
 * HomePage (Arena Lobby)
 * Modern, playful, cartoon-style lobby.
 */
function HomePage() {
  const { user, logout } = useAuth();
  const [difficultyFilter, setDifficultyFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const problemsPerPage = 12;

  const [currentPage, setCurrentPage] = useState(() => {
    const saved = localStorage.getItem('arena_current_page');
    const page = parseInt(saved, 10);
    return !isNaN(page) ? page : 1;
  });

  const filteredProblems = useMemo(() => {
    return problems.filter((p) => {
      const dMatch = difficultyFilter === 'All' || p.difficulty === difficultyFilter;
      const cMatch = categoryFilter === 'All' || p.category === categoryFilter;
      return dMatch && cMatch;
    });
  }, [difficultyFilter, categoryFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredProblems.length / problemsPerPage));

  // Reset page when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [categoryFilter, difficultyFilter]);

  // Persist current page
  useEffect(() => {
    localStorage.setItem('arena_current_page', currentPage.toString());
  }, [currentPage]);

  const currentProblems = useMemo(() => {
    const safePage = Math.min(currentPage, totalPages);
    const start = (safePage - 1) * problemsPerPage;
    return filteredProblems.slice(start, start + problemsPerPage);
  }, [filteredProblems, currentPage, totalPages]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const difficulties = ['All', 'Easy', 'Medium', 'Hard'];
  const categories = ['All', ...new Set(problems.map(p => p.category))].filter(Boolean);

  return (
    <div className="page-enter w-full min-h-screen flex flex-col pt-10">
      {/* ===== Hero Section ===== */}
      <div className="w-full pb-8 px-6 relative z-10">
        <div className="w-full flex flex-col items-center">
          
          {/* Logo & Auth Header */}
          <div className="flex flex-col sm:flex-row items-center justify-between w-full max-w-6xl mb-10 gap-6 sm:gap-0">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[var(--color-primary)] flex items-center justify-center shadow-[0_6px_0_var(--color-primary-dark)] transform rotate-3 hover:rotate-6 transition-transform">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h1 className="font-display text-4xl font-black text-[var(--text-primary)] tracking-tight">
                MaxxArena
              </h1>
            </div>

            {/* Auth Component Corner */}
            <div>
              {user ? (
                <div className="flex items-center gap-4 bg-[var(--bg-surface)] px-4 py-2 rounded-2xl border-2 border-[var(--border-subtle)] shadow-[0_4px_0_var(--border-subtle)] hover:-translate-y-1 transition-transform">
                  {user.avatar ? (
                    <img src={user.avatar} alt="Avatar" className="w-10 h-10 rounded-full border-2 border-[var(--border-subtle)]" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center font-display font-black border-2 border-[var(--border-subtle)]">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div className="flex flex-col text-left">
                    <span className="font-bold text-[var(--text-primary)] text-sm">{user.name}</span>
                    <button onClick={logout} className="text-xs text-red-500 font-bold hover:text-red-400 text-left transition-colors">Logout 🚪</button>
                  </div>
                </div>
              ) : (
                <Link to="/login" className="neon-btn-primary px-6 py-3 rounded-2xl font-display font-black tracking-wide text-sm inline-block w-full sm:w-auto text-center group">
                  <span className="group-hover:scale-110 transition-transform inline-block mr-2">🔑</span>
                  LOGIN / REGISTER
                </Link>
              )}
            </div>
          </div>

          {/* Tagline */}
          <p className="text-lg text-[var(--text-secondary)] font-medium tracking-wide mb-10">
            Learn to type.{' '}
            <span className="text-[var(--color-primary)] font-bold">Master</span> the Code!
          </p>

          {/* Stats Row */}
          <div className="flex items-center gap-6 mb-12">
            <div className="bg-[var(--bg-surface)] border-2 border-[var(--border-subtle)] rounded-2xl p-4 flex flex-col items-center min-w-[120px] shadow-[0_4px_0_var(--border-subtle)] transform hover:-translate-y-1 transition-transform cursor-default">
              <span className="font-display text-3xl font-black text-[var(--color-primary)]">
                {problems.length}
              </span>
              <span className="text-[0.7rem] text-[var(--text-muted)] uppercase tracking-bold font-bold mt-1">
                Challenges
              </span>
            </div>
            <div className="bg-[var(--bg-surface)] border-2 border-[var(--border-subtle)] rounded-2xl p-4 flex flex-col items-center min-w-[120px] shadow-[0_4px_0_var(--border-subtle)] transform hover:-translate-y-1 transition-transform cursor-default">
              <span className="font-display text-3xl font-black text-[var(--color-secondary)]">3</span>
              <span className="text-[0.7rem] text-[var(--text-muted)] uppercase tracking-bold font-bold mt-1">
                Languages
              </span>
            </div>
            <div className="bg-[var(--bg-surface)] border-2 border-[var(--border-subtle)] rounded-2xl p-4 flex flex-col items-center min-w-[120px] shadow-[0_4px_0_var(--border-subtle)] transform hover:-translate-y-1 transition-transform cursor-default">
              <span className="font-display text-3xl font-black text-[var(--color-accent)]">10:00</span>
              <span className="text-[0.7rem] text-[var(--text-muted)] uppercase tracking-bold font-bold mt-1">
                Max Time
              </span>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-col gap-4 items-center w-full max-w-4xl">
            <div id="category-filter" className="flex flex-wrap items-center justify-center gap-2">
              <span className="text-sm font-bold text-[var(--text-muted)] uppercase mr-2">Category:</span>
              {categories.map((c) => (
                <button
                  key={c}
                  className={`filter-tab !py-1.5 !px-3 !text-xs ${categoryFilter === c ? 'active' : ''}`}
                  onClick={() => setCategoryFilter(c)}
                >
                  {c}
                </button>
              ))}
            </div>
            <div id="difficulty-filter" className="flex flex-wrap items-center justify-center gap-3">
              {difficulties.map((f) => (
                <button
                  key={f}
                  id={`filter-${f.toLowerCase()}`}
                  className={`filter-tab ${difficultyFilter === f ? 'active' : ''}`}
                  onClick={() => setDifficultyFilter(f)}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ===== Problem Grid ===== */}
      <div className="flex-1 w-full px-6 pb-16 relative z-10">
        <div className="w-full">
          <div
            id="problems-grid"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          >
            {currentProblems.map((problem, index) => (
              <div
                key={problem.id}
                style={{ animationDelay: `${index * 0.04}s` }}
                className="page-enter h-full"
              >
                <ProblemCard problem={problem} />
              </div>
            ))}
          </div>

          {/* Pagination UI */}
          {totalPages > 1 && filteredProblems.length > 0 && (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12 pb-2">
              <button
                className={`neon-btn-secondary px-4 py-2 rounded-xl text-sm font-bold shadow-[0_4px_0_var(--border-subtle)] transition-all ${
                  currentPage === 1 ? 'opacity-50 cursor-not-allowed transform-none shadow-none' : 'hover:-translate-y-1 hover:shadow-[0_6px_0_var(--border-light)]'
                }`}
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                ◀ Previous
              </button>

              <div className="flex items-center gap-2">
                {[...Array(totalPages)].map((_, i) => {
                  const pageNum = i + 1;
                  return (
                    <button
                      key={pageNum}
                      className={`w-10 h-10 flex items-center justify-center rounded-xl font-display font-black text-sm border-2 transition-all ${
                        currentPage === pageNum
                          ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary-dark)] shadow-[0_4px_0_var(--color-primary-dark)] translate-y-[-2px]'
                          : 'bg-[var(--bg-surface)] text-[var(--text-secondary)] border-[var(--border-subtle)] shadow-[0_4px_0_var(--border-subtle)] hover:bg-[var(--bg-elevated)] hover:-translate-y-1 hover:shadow-[0_6px_0_var(--border-light)]'
                      }`}
                      onClick={() => handlePageChange(pageNum)}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>

              <button
                className={`neon-btn-secondary px-4 py-2 rounded-xl text-sm font-bold shadow-[0_4px_0_var(--border-subtle)] transition-all ${
                  currentPage === totalPages ? 'opacity-50 cursor-not-allowed transform-none shadow-none' : 'hover:-translate-y-1 hover:shadow-[0_6px_0_var(--border-light)]'
                }`}
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next ▶
              </button>
            </div>
          )}

          {/* Empty state */}
          {filteredProblems.length === 0 && (
            <div className="text-center py-20">
              <div className="inline-block bg-[var(--bg-surface)] border-2 border-[var(--border-subtle)] rounded-3xl p-8 shadow-[0_4px_0_var(--border-subtle)]">
                <span className="text-5xl mb-4 block">🔍</span>
                <p className="text-[var(--text-primary)] font-bold text-lg">
                  No problems found!
                </p>
                <p className="text-[var(--text-secondary)] font-medium mt-2">
                  Try selecting a different difficulty.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ===== Footer ===== */}
      <footer className="text-center py-8 relative z-10">
        <p className="text-sm font-bold text-[var(--text-muted)]">
          Built with ⚡ by{' '}
          <span className="font-display text-[var(--color-primary)]">MaxxArena</span>
        </p>
      </footer>
    </div>
  );
}

export default HomePage;
