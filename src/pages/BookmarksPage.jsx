import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bookmark, ArrowRight, BookOpen } from 'lucide-react';
import { ALL_MODULES } from '../data/index';
import { useBookmarks } from '../hooks/useBookmarks';
import { useProgress } from '../hooks/useProgress';

export default function BookmarksPage() {
  const navigate = useNavigate();
  const { bookmarks, toggle } = useBookmarks();
  const { isComplete } = useProgress();

  const bookmarkedLessons = ALL_MODULES.flatMap(mod =>
    mod.lessons
      .filter(l => bookmarks.includes(l.id))
      .map(l => ({ ...l, module: mod }))
  );

  return (
    <div className="bookmarks-page">
      <div className="bookmarks-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
          <Bookmark size={20} style={{ color: '#7C3AED' }} />
          <h1 className="cheatsheet-title" style={{ margin: 0 }}>Saved lessons</h1>
        </div>
        <p className="cheatsheet-sub">
          {bookmarkedLessons.length === 0
            ? 'No saved lessons yet — bookmark any lesson to revisit it here.'
            : `${bookmarkedLessons.length} lesson${bookmarkedLessons.length !== 1 ? 's' : ''} saved`}
        </p>
      </div>

      {bookmarkedLessons.length === 0 ? (
        <div className="bookmarks-empty">
          <div className="bookmarks-empty-icon">
            <Bookmark size={32} style={{ color: 'var(--text-tertiary)' }} />
          </div>
          <p>Bookmark lessons using the <Bookmark size={14} style={{ display: 'inline', verticalAlign: 'middle' }} /> icon on any lesson page.</p>
          <button
            className="start-module-btn"
            style={{ background: '#7C3AED', marginTop: 16, width: 'auto', padding: '10px 20px' }}
            onClick={() => navigate('/')}
          >
            <BookOpen size={15} style={{ marginRight: 6 }} />
            Browse lessons
          </button>
        </div>
      ) : (
        <div className="bookmarks-list">
          {bookmarkedLessons.map(lesson => {
            const done = isComplete(lesson.id);
            return (
              <div key={lesson.id} className="bookmark-row">
                <div className="bookmark-row-left">
                  <div
                    className="bookmark-module-dot"
                    style={{ background: lesson.module.color }}
                  />
                  <div>
                    <div className="bookmark-module-tag" style={{ color: lesson.module.color }}>
                      {lesson.module.title}
                    </div>
                    <div className="bookmark-lesson-title">{lesson.title}</div>
                    <div className="bookmark-lesson-meta">
                      <span className={`level-badge level-${lesson.level.toLowerCase()}`}>{lesson.level}</span>
                      <span className="lesson-duration">{lesson.duration}</span>
                      {done && (
                        <span style={{ fontSize: 11, color: '#059669', fontWeight: 600 }}>✓ Complete</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="bookmark-row-actions">
                  <button
                    className="bookmark-remove-btn"
                    onClick={() => toggle(lesson.id)}
                    aria-label="Remove bookmark"
                    title="Remove bookmark"
                  >
                    <Bookmark size={15} fill="currentColor" />
                  </button>
                  <button
                    className="bookmark-go-btn"
                    onClick={() => navigate(`/lesson/${lesson.id}`)}
                    style={{ background: lesson.module.color }}
                  >
                    Open <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
