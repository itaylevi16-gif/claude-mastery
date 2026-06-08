import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle, BookOpen, Clock, Bookmark } from 'lucide-react';
import { getLessonById, getNextLesson, ALL_MODULES } from '../data/index';
import { useProgress } from '../hooks/useProgress';
import { useBookmarks } from '../hooks/useBookmarks';
import { LessonContent } from '../components/LessonContent';
import { Quiz } from '../components/Quiz';
import { LessonNotes } from '../components/LessonNotes';

export default function LessonPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isComplete, markComplete } = useProgress();
  const { isBookmarked, toggle: toggleBookmark } = useBookmarks();
  const [quizPassed, setQuizPassed] = useState(false);

  const result = getLessonById(id);

  useEffect(() => {
    window.scrollTo(0, 0);
    setQuizPassed(false);
  }, [id]);

  if (!result) {
    return (
      <div className="lesson-not-found">
        <p>Lesson not found.</p>
        <button onClick={() => navigate('/')}>← Back to home</button>
      </div>
    );
  }

  const { lesson, module: mod } = result;
  const nextLesson = getNextLesson(id);
  const done = isComplete(id);

  const handleQuizPass = () => {
    setQuizPassed(true);
    markComplete(id);
  };

  const allModuleLessons = mod.lessons;
  const lessonIndex = allModuleLessons.findIndex(l => l.id === id);

  return (
    <div className="lesson-page">
      {/* Mobile top progress bar */}
      <div className="lesson-mobile-nav">
        <button className="lesson-mobile-nav-back" onClick={() => navigate('/')}>
          <ArrowLeft size={16} /> All modules
        </button>
        <div className="lesson-mobile-progress">
          <div className="lesson-mobile-dots">
            {allModuleLessons.map((l, i) => (
              <div
                key={l.id}
                className={`lesson-mobile-dot ${isComplete(l.id) ? 'done' : l.id === id ? 'current' : ''}`}
                onClick={() => navigate(`/lesson/${l.id}`)}
                style={{ cursor: 'pointer' }}
              />
            ))}
          </div>
          <span style={{ fontSize: 11, color: 'var(--text-tertiary)', fontWeight: 500 }}>
            {lessonIndex + 1}/{allModuleLessons.length}
          </span>
        </div>
      </div>
      {/* Sidebar nav */}
      <aside className="lesson-sidebar">
        <button className="back-btn" onClick={() => navigate('/')}>
          <ArrowLeft size={16} />
          All modules
        </button>

        <div className="sidebar-module-title">
          <span style={{ color: mod.color }}>{mod.title}</span>
        </div>

        <nav className="sidebar-nav">
          {allModuleLessons.map((l, i) => {
            const isDone = isComplete(l.id);
            const isCurrent = l.id === id;
            return (
              <button
                key={l.id}
                className={`sidebar-nav-item ${isCurrent ? 'current' : ''} ${isDone ? 'done' : ''}`}
                onClick={() => navigate(`/lesson/${l.id}`)}
                style={{ '--mod-color': mod.color }}
              >
                <span
                  className="nav-dot"
                  style={{
                    background: isDone ? mod.color : isCurrent ? mod.color : 'transparent',
                    borderColor: isCurrent || isDone ? mod.color : '#D1D5DB',
                    opacity: isDone ? 1 : isCurrent ? 0.4 : 1
                  }}
                />
                <span className="nav-item-text">{l.title}</span>
                {isDone && <CheckCircle size={14} style={{ color: mod.color, flexShrink: 0 }} />}
              </button>
            );
          })}
        </nav>

        <div className="sidebar-modules">
          <p className="sidebar-other-label">Other modules</p>
          {ALL_MODULES.filter(m => m.id !== mod.id).map(m => (
            <button
              key={m.id}
              className="sidebar-other-module"
              onClick={() => navigate(`/lesson/${m.lessons[0].id}`)}
            >
              {m.title}
            </button>
          ))}
        </div>
      </aside>

      {/* Main content */}
      <main className="lesson-main">
        {/* Header */}
        <div className="lesson-header">
          <div className="lesson-header-meta">
            <span className="lesson-module-tag" style={{ background: mod.bg, color: mod.color }}>
              {mod.title}
            </span>
            <span className={`level-badge level-${lesson.level.toLowerCase()}`}>
              {lesson.level}
            </span>
            <span className="lesson-duration-tag">
              <Clock size={12} />
              {lesson.duration}
            </span>
            {lessonIndex > 0 && (
              <span className="lesson-number-tag">
                Lesson {lessonIndex + 1} of {allModuleLessons.length}
              </span>
            )}
            <button
              className={`bookmark-btn ${isBookmarked(id) ? 'bookmarked' : ''}`}
              onClick={() => toggleBookmark(id)}
              aria-label={isBookmarked(id) ? 'Remove bookmark' : 'Save lesson'}
              title={isBookmarked(id) ? 'Remove bookmark' : 'Save lesson'}
            >
              <Bookmark size={16} fill={isBookmarked(id) ? 'currentColor' : 'none'} />
              {isBookmarked(id) ? 'Saved' : 'Save'}
            </button>
          </div>

          <h1 className="lesson-title">{lesson.title}</h1>
          <p className="lesson-description">{lesson.description}</p>

          {done && (
            <div className="lesson-done-banner">
              <CheckCircle size={16} />
              <span>You've completed this lesson</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="lesson-body">
          <LessonContent sections={lesson.content.sections} />
        </div>

        {/* Notes */}
        <LessonNotes lessonId={id} />

        {/* Quiz */}
        <div className="lesson-quiz-section">
          <Quiz
            quiz={lesson.content.quiz}
            lessonId={id}
            onPass={handleQuizPass}
          />
        </div>

        {/* Complete + Next */}
        <div className="lesson-footer">
          {!done && (
            <button
              className="complete-btn"
              style={{ background: mod.color }}
              onClick={() => markComplete(id)}
            >
              <CheckCircle size={16} />
              Mark as complete
            </button>
          )}

          {done && nextLesson && (
            <button
              className="next-lesson-btn"
              style={{ background: mod.color }}
              onClick={() => navigate(`/lesson/${nextLesson.id}`)}
            >
              Next lesson: {nextLesson.title}
              <ArrowRight size={16} />
            </button>
          )}

          {done && !nextLesson && (
            <div className="all-done-msg">
              <span>🎉</span>
              <span>You've completed all lessons! Head back to review or explore the cheatsheet.</span>
              <button className="back-home-btn" onClick={() => navigate('/')}>
                <BookOpen size={16} /> Back to home
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
