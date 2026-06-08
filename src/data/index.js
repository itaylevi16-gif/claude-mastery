import { MODULES } from './curriculum.js';
import { MODULES2 } from './curriculum2.js';

export { MODULES, MODULES2 };

export const ALL_MODULES = [...MODULES, ...MODULES2];

export const TOTAL_LESSONS = ALL_MODULES.reduce(
  (acc, m) => acc + m.lessons.length, 0
);

export function getLessonById(id) {
  for (const mod of ALL_MODULES) {
    const lesson = mod.lessons.find(l => l.id === id);
    if (lesson) return { lesson, module: mod };
  }
  return null;
}

export function getNextLesson(currentId) {
  const all = ALL_MODULES.flatMap(m => m.lessons.map(l => ({ ...l, moduleId: m.id })));
  const idx = all.findIndex(l => l.id === currentId);
  return idx < all.length - 1 ? all[idx + 1] : null;
}
