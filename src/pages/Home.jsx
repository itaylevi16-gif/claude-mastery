import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Terminal, Layout, Sparkles, Rocket, BookOpen, Zap, Globe, Code, Package, Plug, TrendingUp, CheckCircle, Info, PuzzleIcon } from 'lucide-react';
import { ALL_MODULES, TOTAL_LESSONS } from '../data/index';
import { useProgress } from '../hooks/useProgress';

const ICONS = {
  terminal: Terminal, layout: Layout, sparkles: Sparkles,
  rocket: Rocket, globe: Globe, code: Code,
  package: Package, plug: Plug, 'trending-up': TrendingUp,
  info: Info, puzzle: PuzzleIcon,
};

function StreakSection({ stats }) {
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const activeDays = Math.min(stats.completed, 7);
  return (
    <div className="streak-section">
      <div className="streak-icon">🔥</div>
      <div>
        <div className="streak-value">{stats.completed} lessons</div>
        <div className="streak-label">completed so far</div>
      </div>
      <div className="streak-milestones">
        {days.map((d, i) => (
          <div key={i} className={`streak-dot ${i < activeDays ? 'lit' : ''}`}
            title={i < activeDays ? 'Completed' : 'Not yet'}>
            {i < activeDays ? '✓' : d}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const { stats, isComplete } = useProgress();

  return (
    <div className="home-page">
      {/* Hero */}
      <header className="home-hero">
        <div className="hero-content">
          <div className="hero-badge">
            <Zap size={11} />
            <span>Interactive learning platform</span>
          </div>
          <h1 className="hero-title">
            Master <em>Claude</em><br />from scratch
          </h1>
          <p className="hero-subtitle">
            Hands-on lessons, live code sandboxes, and real projects — covering Claude Code, Cowork, AI prompting, and earning with AI.
          </p>

          <div className="hero-stats">
            <div className="hero-stat">
              <span className="hero-stat-num">{TOTAL_LESSONS}</span>
              <span className="hero-stat-label">lessons</span>
            </div>
            <div className="hero-stat-div" />
            <div className="hero-stat">
              <span className="hero-stat-num">{ALL_MODULES.length}</span>
              <span className="hero-stat-label">modules</span>
            </div>
            <div className="hero-stat-div" />
            <div className="hero-stat">
              <span className="hero-stat-num">{stats.completed}</span>
              <span className="hero-stat-label">done</span>
            </div>
          </div>

          {stats.completed > 0 && (
            <div className="progress-bar-wrapper">
              <div className="progress-bar-track">
                <div className="progress-bar-fill" style={{ width: `${stats.percent}%` }} />
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
            <span>Persistent project memory</span>
          </div>
          <div className="hero-card-float hero-card-3">
            <code className="hero-card-code">5-part prompt</code>
            <span>Role · Context · Task</span>
          </div>
        </div>
      </header>

      {/* Streak / progress widget */}
      {stats.completed > 0 && <StreakSection stats={stats} />}

      {/* Modules */}
      <section className="modules-section">
        <h2 className="modules-heading">Your curriculum</h2>
        <div className="modules-grid">
          {ALL_MODULES.map(mod => {
            const Icon = ICONS[mod.icon] || BookOpen;
            const modStats = stats.byModule.find(m => m.id === mod.id) || { done: 0, total: mod.lessons.length };
            const pct = Math.round((modStats.done / modStats.total) * 100);

            return (
              <div key={mod.id} className="module-card" onClick={() => navigate(`/lesson/${mod.lessons[0].id}`)}>
                {/* Colored band header */}
                <div
                  className="module-card-band"
                  style={{ background: `linear-gradient(135deg, ${mod.color} 0%, ${mod.accent || mod.color}CC 100%)` }}
                >
                  <div className="module-card-band-icon">
                    <Icon size={22} color="#fff" />
                  </div>
                  <span className="module-card-band-count">{modStats.done}/{modStats.total}</span>
                  <div className="module-band-progress">
                    <div className="module-band-progress-fill" style={{ width: `${pct}%` }} />
                  </div>
                </div>

                <div className="module-card-body">
                  <div className="module-card-title">{mod.title}</div>
                  <div className="module-card-sub">{mod.subtitle}</div>

                  <div className="module-lessons">
                    {mod.lessons.slice(0, 4).map(lesson => {
                      const done = isComplete(lesson.id);
                      return (
                        <button
                          key={lesson.id}
                          className={`lesson-row ${done ? 'done' : ''}`}
                          onClick={e => { e.stopPropagation(); navigate(`/lesson/${lesson.id}`); }}
                        >
                          <div className="lesson-row-left">
                            <span
                              className="lesson-done-dot"
                              style={{
                                background: done ? mod.color : 'transparent',
                                borderColor: done ? mod.color : 'var(--border-strong)'
                              }}
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
                    {mod.lessons.length > 4 && (
                      <div style={{ padding: '6px 8px', fontSize: 12, color: 'var(--text-tertiary)' }}>
                        +{mod.lessons.length - 4} more lessons
                      </div>
                    )}
                  </div>

                  <button
                    className="start-module-btn"
                    style={{ background: mod.color }}
                    onClick={e => { e.stopPropagation(); navigate(`/lesson/${mod.lessons[0].id}`); }}
                  >
                    {modStats.done === 0 ? 'Start module' : modStats.done === modStats.total ? '✓ Review' : `Continue — lesson ${modStats.done + 1}`}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Cheatsheet teaser */}
      <section className="cheatsheet-teaser" onClick={() => navigate('/cheatsheet')} role="button" tabIndex={0}>
        <BookOpen size={22} style={{ color: 'var(--accent)', flexShrink: 0 }} />
        <div>
          <strong>Quick reference cheatsheet</strong>
          <span>All commands, patterns, and concepts in one place</span>
        </div>
        <span className="teaser-arrow">→</span>
      </section>
    </div>
  );
}
