import type { CourseProgress, LessonProgress, ModuleProgress } from '../types';

const STORAGE_KEY = 'aprender-c-progress';

function defaultLessonProgress(lessonId: string): LessonProgress {
  return { lessonId, completed: false, exercisesCompleted: [], lastCode: {}, hintsUsed: {} };
}

function defaultModuleProgress(moduleId: string): ModuleProgress {
  return { moduleId, lessonsProgress: {}, completed: false };
}

function defaultProgress(): CourseProgress {
  return { modules: {}, lastVisited: null, totalExercisesCompleted: 0 };
}

export function loadProgress(): CourseProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch { /* empty */ }
  return defaultProgress();
}

export function saveProgress(progress: CourseProgress): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch { /* quota exceeded or blocked */ }
}

export function getLessonProgress(progress: CourseProgress, moduleId: string, lessonId: string): LessonProgress {
  return progress.modules[moduleId]?.lessonsProgress[lessonId] ?? defaultLessonProgress(lessonId);
}

export function markExerciseCompleted(progress: CourseProgress, moduleId: string, lessonId: string, exerciseId: string): CourseProgress {
  const next = structuredClone(progress);
  if (!next.modules[moduleId]) next.modules[moduleId] = defaultModuleProgress(moduleId);
  const mp = next.modules[moduleId];
  if (!mp.lessonsProgress[lessonId]) mp.lessonsProgress[lessonId] = defaultLessonProgress(lessonId);
  const lp = mp.lessonsProgress[lessonId];
  if (!lp.exercisesCompleted.includes(exerciseId)) {
    lp.exercisesCompleted.push(exerciseId);
    next.totalExercisesCompleted++;
  }
  return next;
}

export function markLessonCompleted(progress: CourseProgress, moduleId: string, lessonId: string): CourseProgress {
  const next = structuredClone(progress);
  if (!next.modules[moduleId]) next.modules[moduleId] = defaultModuleProgress(moduleId);
  if (!next.modules[moduleId].lessonsProgress[lessonId])
    next.modules[moduleId].lessonsProgress[lessonId] = defaultLessonProgress(lessonId);
  next.modules[moduleId].lessonsProgress[lessonId].completed = true;
  return next;
}

export function saveLastCode(progress: CourseProgress, moduleId: string, lessonId: string, exerciseId: string, code: string): CourseProgress {
  const next = structuredClone(progress);
  if (!next.modules[moduleId]) next.modules[moduleId] = defaultModuleProgress(moduleId);
  if (!next.modules[moduleId].lessonsProgress[lessonId])
    next.modules[moduleId].lessonsProgress[lessonId] = defaultLessonProgress(lessonId);
  next.modules[moduleId].lessonsProgress[lessonId].lastCode[exerciseId] = code;
  return next;
}

export function incrementHint(progress: CourseProgress, moduleId: string, lessonId: string, exerciseId: string): CourseProgress {
  const next = structuredClone(progress);
  if (!next.modules[moduleId]) next.modules[moduleId] = defaultModuleProgress(moduleId);
  if (!next.modules[moduleId].lessonsProgress[lessonId])
    next.modules[moduleId].lessonsProgress[lessonId] = defaultLessonProgress(lessonId);
  const lp = next.modules[moduleId].lessonsProgress[lessonId];
  lp.hintsUsed[exerciseId] = (lp.hintsUsed[exerciseId] ?? 0) + 1;
  return next;
}

export function setLastVisited(progress: CourseProgress, moduleId: string, lessonId: string): CourseProgress {
  return { ...progress, lastVisited: { moduleId, lessonId } };
}

export function getModuleCompletionPercent(progress: CourseProgress, moduleId: string, totalLessons: number): number {
  const mp = progress.modules[moduleId];
  if (!mp || totalLessons === 0) return 0;
  const completed = Object.values(mp.lessonsProgress).filter(lp => lp.completed).length;
  return Math.round((completed / totalLessons) * 100);
}

export function getTotalCompletionPercent(progress: CourseProgress, totalLessonsInCourse: number): number {
  if (totalLessonsInCourse === 0) return 0;
  let completed = 0;
  for (const mp of Object.values(progress.modules)) {
    completed += Object.values(mp.lessonsProgress).filter(lp => lp.completed).length;
  }
  return Math.round((completed / totalLessonsInCourse) * 100);
}
