import { useState, useCallback } from 'react';

const STORAGE_KEY = 'cm_bookmarks_v1';

function load() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch { return []; }
}

function save(data) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch {}
}

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState(() => load());

  const toggle = useCallback((lessonId) => {
    setBookmarks(prev => {
      const next = prev.includes(lessonId)
        ? prev.filter(id => id !== lessonId)
        : [...prev, lessonId];
      save(next);
      return next;
    });
  }, []);

  const isBookmarked = useCallback((lessonId) => {
    return bookmarks.includes(lessonId);
  }, [bookmarks]);

  return { bookmarks, toggle, isBookmarked };
}
