import React from 'react';
import { Play, Pause, Square, Volume2, VolumeX } from 'lucide-react';
import { useNarrator } from '../hooks/useNarrator';

export function LessonNarrator({ lesson }) {
  const {
    supported, playing, waitingForQuiz,
    currentPart, totalParts,
    play, pause, resume, stop,
  } = useNarrator(lesson);

  if (!supported) return null;

  const progress = totalParts > 0 ? Math.round((currentPart / totalParts) * 100) : 0;
  const isActive = playing || waitingForQuiz || currentPart > 0;

  return (
    <div className={`narrator-bar ${isActive ? 'narrator-active' : ''}`}>
      <div className="narrator-inner">
        {/* Icon + label */}
        <div className="narrator-identity">
          <div className="narrator-avatar">
            {playing ? (
              <span className="narrator-wave">
                <span/><span/><span/><span/>
              </span>
            ) : (
              <Volume2 size={16} />
            )}
          </div>
          <div className="narrator-text">
            <span className="narrator-name">Lesson narrator</span>
            <span className="narrator-status">
              {!isActive && 'Click play to listen'}
              {playing && 'Reading aloud...'}
              {waitingForQuiz && '⏸ Waiting — answer the quiz below'}
              {!playing && !waitingForQuiz && currentPart > 0 && currentPart < totalParts - 1 && 'Paused'}
            </span>
          </div>
        </div>

        {/* Progress bar */}
        {isActive && (
          <div className="narrator-progress-track">
            <div className="narrator-progress-fill" style={{ width: `${progress}%` }} />
          </div>
        )}

        {/* Controls */}
        <div className="narrator-controls">
          {!isActive && (
            <button className="narrator-btn narrator-play" onClick={play} title="Listen to this lesson">
              <Play size={15} fill="currentColor" />
              <span>Listen</span>
            </button>
          )}

          {isActive && (
            <>
              {playing ? (
                <button className="narrator-btn narrator-icon-btn" onClick={pause} title="Pause">
                  <Pause size={16} />
                </button>
              ) : !waitingForQuiz ? (
                <button className="narrator-btn narrator-icon-btn" onClick={resume} title="Resume">
                  <Play size={16} fill="currentColor" />
                </button>
              ) : null}
              <button className="narrator-btn narrator-stop" onClick={stop} title="Stop">
                <Square size={14} fill="currentColor" />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
