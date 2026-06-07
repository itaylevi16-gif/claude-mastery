import { useState, useCallback } from 'react';
import { MODULES, TOTAL_LESSONS } from '../data/curriculum';

const STORAGE_KEY = 'claude_mastery_progress_v1';

function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { completed: [], notes: {} };
    return JSON.parse(raw);
  } catch {
    return { completed: [], notes: {} };
  }
}

function saveProgress(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {}
}

export function useProgress() {
  const [progress, setProgress] = useState(() => loadProgress());

  const markComplete = useCallback((lessonId) => {
    setProgress(prev => {
      const next = {
        ...prev,
        completed: prev.completed.includes(lessonId)
          ? prev.completed
          : [...prev.completed, lessonId]
      };
      saveProgress(next);
      return next;
    });
  }, []);

  const saveNote = useCallback((lessonId, note) => {
    setProgress(prev => {
      const next = { ...prev, notes: { ...prev.notes, [lessonId]: note } };
      saveProgress(next);
      return next;
    });
  }, []);

  const isComplete = useCallback((lessonId) => {
    return progress.completed.includes(lessonId);
  }, [progress.completed]);

  const resetAll = useCallback(() => {
    const next = { completed: [], notes: {} };
    saveProgress(next);
    setProgress(next);
  }, []);

  const stats = {
    completed: progress.completed.length,
    total: TOTAL_LESSONS,
    percent: Math.round((progress.completed.length / TOTAL_LESSONS) * 100),
    byModule: MODULES.map(m => ({
      id: m.id,
      title: m.title,
      done: m.lessons.filter(l => progress.completed.includes(l.id)).length,
      total: m.lessons.length,
    }))
  };

  return { progress, stats, markComplete, saveNote, isComplete, resetAll };
}
