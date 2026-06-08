import { useState, useCallback } from 'react';

const KEY = 'cm_notes_v1';

function load() {
  try { return JSON.parse(localStorage.getItem(KEY) || '{}'); }
  catch { return {}; }
}
function save(data) {
  try { localStorage.setItem(KEY, JSON.stringify(data)); } catch {}
}

export function useNotes() {
  const [notes, setNotes] = useState(() => load());

  const setNote = useCallback((lessonId, text) => {
    setNotes(prev => {
      const next = { ...prev, [lessonId]: text };
      save(next);
      return next;
    });
  }, []);

  const getNote = useCallback((lessonId) => {
    return notes[lessonId] || '';
  }, [notes]);

  const deleteNote = useCallback((lessonId) => {
    setNotes(prev => {
      const next = { ...prev };
      delete next[lessonId];
      save(next);
      return next;
    });
  }, []);

  const allNotes = Object.entries(notes)
    .filter(([, v]) => v.trim())
    .map(([id, text]) => ({ lessonId: id, text }));

  return { notes, setNote, getNote, deleteNote, allNotes };
}
