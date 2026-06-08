import { useMemo } from 'react';
import { ALL_MODULES } from '../data/index';
import { PROJECTS } from '../data/projects';

// Flatten all searchable content at module load time
function buildIndex() {
  const entries = [];

  // Lessons
  ALL_MODULES.forEach(mod => {
    mod.lessons.forEach(lesson => {
      const text = [
        lesson.title,
        lesson.description || '',
        mod.title,
        lesson.level,
        // Extract text from content sections
        ...(lesson.content?.sections || []).map(s => {
          if (s.type === 'text') return s.content || '';
          if (s.type === 'callout') return s.content || '';
          if (s.type === 'code') return `${s.label || ''} ${s.code || ''}`;
          return '';
        }),
        lesson.content?.quiz?.question || '',
      ].join(' ').toLowerCase();

      entries.push({
        id: lesson.id,
        type: 'lesson',
        title: lesson.title,
        subtitle: `${mod.title} · ${lesson.level} · ${lesson.duration}`,
        description: lesson.description || '',
        module: mod,
        route: `/lesson/${lesson.id}`,
        color: mod.color,
        text,
      });
    });
  });

  // Projects
  PROJECTS.forEach(proj => {
    const text = [
      proj.title,
      proj.description,
      proj.subtitle,
      proj.what_you_build,
      proj.level,
      ...proj.steps.map(s => `${s.title} ${s.content || ''}`),
    ].join(' ').toLowerCase();

    entries.push({
      id: proj.id,
      type: 'project',
      title: proj.title,
      subtitle: `Project · ${proj.level} · ${proj.duration}`,
      description: proj.description,
      route: `/project/${proj.id}`,
      color: proj.color,
      text,
    });
  });

  return entries;
}

const SEARCH_INDEX = buildIndex();

export function useSearch(query) {
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q || q.length < 2) return [];

    const words = q.split(/\s+/).filter(Boolean);

    const scored = SEARCH_INDEX.map(entry => {
      let score = 0;

      words.forEach(word => {
        // Title match = high weight
        if (entry.title.toLowerCase().includes(word)) score += 10;
        // Subtitle match = medium
        if (entry.subtitle.toLowerCase().includes(word)) score += 5;
        // Description match = medium
        if (entry.description.toLowerCase().includes(word)) score += 4;
        // Full text match = low
        if (entry.text.includes(word)) score += 1;
      });

      return { ...entry, score };
    });

    return scored
      .filter(e => e.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 12);
  }, [query]);

  return results;
}
