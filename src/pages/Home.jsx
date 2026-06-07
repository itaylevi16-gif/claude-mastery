import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Terminal, Layout, Sparkles, Rocket, BookOpen, Award, Zap } from 'lucide-react';
import { MODULES } from '../data/curriculum';
import { useProgress } from '../hooks/useProgress';

const ICONS = { terminal: Terminal, layout: Layout, sparkles: Sparkles, rocket: Rocket };

const LEVEL_ORDER = { Beginner: 0, Intermediate: 1, Advanced: 2 };

export default function Home() {
  const navigate = useNavigate();
  const { stats, isComplete } = useProgress();

  return (
    <div className="home-page">
      {/* Hero */}
      <header className="home-hero">
        <div className="hero-content">
          <div className="hero-badge">
            <Zap size={14} />
            <span>Interactive learning platform</span>
          </div>
          <h1 className="hero-title">Claude Mastery</h1>
          <p className="hero-subtitle">
            Master Claude Code, Cowork, and AI prompting — with hands-on lessons, live code sandboxes, and challenges tied to your real projects.
          </p>

          <div className="hero-stats">
            <div className="hero-stat">
              <span className="hero-stat-num">{stats.total}</span>
              <span className="hero-stat-label">lessons</span>
            </div>
            <div className="hero-stat-div" />
            <div className="hero-stat">
              <span className="hero-stat-num">4</span>
              <span className="hero-stat-label">modules</span>
            </div>
            <div className="hero-stat-div" />
            <div className="hero-stat">
              <span className="hero-stat-num">{stats.completed}</span>
              <span className="hero-stat-label">completed</span>
            </div>
          </div>

          {stats.completed > 0 && (
            <div className="progress-bar-wrapper">
              <div className="progress-bar-track">
                <div
                  className="progress-bar-fill"
                  style={{ width: `${stats.percent}%` }}
                />
              </div>
              <span className="progress-bar-label">{stats.percent}% complete</span>
            </div>
          )}
        </div>

        <div className="hero-visual" aria-hidden="true">
          <div className="hero-card-float hero-card-1">
            <code className="hero-card-code">/compact</code>
            <span>Saves 40% tokens</span>
          </div>
          <div className="hero-card-float hero-card-2">
            <code className="hero-card-code">CLAUDE.md</code>
            <span>Project memory</span>
          </div>
          <div className="hero-card-float hero-card-3">
            <code className="hero-card-code">5-part prompt</code>
            <span>Role · Context · Task</span>
          </div>
        </div>
      </header>

      {/* Modules */}
      <section className="modules-section">
        <h2 className="modules-heading">Your curriculum</h2>
        <div className="modules-grid">
          {MODULES.map(mod => {
            const Icon = ICONS[mod.icon];
            const modStats = stats.byModule.find(m => m.id === mod.id);
            const pct = Math.round((modStats.done / modStats.total) * 100);

            return (
              <div key={mod.id} className="module-card">
                <div className="module-card-header">
                  <div className="module-icon" style={{ background: mod.bg, color: mod.color }}>
                    <Icon size={22} />
                  </div>
                  <div className="module-meta">
                    <h3 className="module-title">{mod.title}</h3>
                    <p className="module-subtitle">{mod.subtitle}</p>
                  </div>
                  <div className="module-count" style={{ color: mod.color }}>
                    {modStats.done}/{modStats.total}
                  </div>
                </div>

                <div className="module-progress-track">
                  <div
                    className="module-progress-fill"
                    style={{ width: `${pct}%`, background: mod.color }}
                  />
                </div>

                <div className="module-lessons">
                  {mod.lessons.map(lesson => {
                    const done = isComplete(lesson.id);
                    return (
                      <button
                        key={lesson.id}
                        className={`lesson-row ${done ? 'done' : ''}`}
                        onClick={() => navigate(`/lesson/${lesson.id}`)}
                        style={{ '--mod-color': mod.color }}
                      >
                        <div className="lesson-row-left">
                          <span
                            className="lesson-done-dot"
                            style={{ background: done ? mod.color : 'transparent', borderColor: done ? mod.color : '#D1D5DB' }}
                          />
                          <span className="lesson-row-title">{lesson.title}</span>
                        </div>
                        <div className="lesson-row-meta">
                          <span className={`level-badge level-${lesson.level.toLowerCase()}`}>
                            {lesson.level}
                          </span>
                          <span className="lesson-duration">{lesson.duration}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <button
                  className="start-module-btn"
                  style={{ background: mod.color }}
                  onClick={() => navigate(`/lesson/${mod.lessons[0].id}`)}
                >
                  {modStats.done === 0 ? 'Start module' : modStats.done === modStats.total ? '✓ Completed' : 'Continue →'}
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* Cheatsheet teaser */}
      <section className="cheatsheet-teaser" onClick={() => navigate('/cheatsheet')}>
        <BookOpen size={20} />
        <div>
          <strong>Quick reference cheatsheet</strong>
          <span>All commands, patterns, and concepts in one place</span>
        </div>
        <span className="teaser-arrow">→</span>
      </section>
    </div>
  );
}
