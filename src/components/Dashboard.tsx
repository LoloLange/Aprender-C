import { useNavigate } from 'react-router-dom';
import { modules } from '../data/modules';
import type { CourseProgress } from '../types';
import { getModuleCompletionPercent, getTotalCompletionPercent } from '../store/progress';
import {
  Rocket, Database, GitBranch, Box, LayoutList, Type, Navigation,
  HardDrive, Binary, Boxes, FileText, FolderTree, Pointer, Bug, ChevronRight,
  BookOpen, Trophy,
  type LucideIcon
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  Rocket, Database, GitBranch, Box, LayoutList, Type, Navigation,
  HardDrive, Binary, Boxes, FileText, FolderTree, Pointer, Bug,
};

interface Props {
  progress: CourseProgress;
}

const difficultyColors: Record<string, string> = {
  'Principiante': 'var(--color-green)',
  'Intermedio': 'var(--color-yellow)',
  'Avanzado': 'var(--color-red)',
};

export default function Dashboard({ progress }: Props) {
  const navigate = useNavigate();

  const totalLessons = modules.reduce((sum, m) => sum + m.lessons.length, 0);
  const totalPercent = getTotalCompletionPercent(progress, totalLessons);

  function handleContinue() {
    if (progress.lastVisited) {
      navigate(`/lesson/${progress.lastVisited.moduleId}/${progress.lastVisited.lessonId}`);
    } else {
      const first = modules[0];
      if (first?.lessons[0]) {
        navigate(`/lesson/${first.id}/${first.lessons[0].id}`);
      }
    }
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="dashboard-header-content">
          <div className="dashboard-title-row">
            <BookOpen size={32} />
            <h1>Aprender C</h1>
          </div>
          <p className="dashboard-subtitle">
            Plataforma interactiva de programación en C — Fundamentos de Programación (TB021)
          </p>

          <div className="progress-section">
            <div className="progress-bar-container">
              <div className="progress-bar" style={{ width: `${totalPercent}%` }} />
            </div>
            <div className="progress-info">
              <span>{totalPercent}% completado</span>
              <span>{progress.totalExercisesCompleted} ejercicios resueltos</span>
            </div>
          </div>

          <button className="continue-btn" onClick={handleContinue}>
            {progress.lastVisited ? 'Continuar donde dejaste' : 'Empezar a aprender'}
            <ChevronRight size={20} />
          </button>
        </div>
      </header>

      <main className="modules-grid">
        {modules.map((mod, index) => {
          const Icon = iconMap[mod.icon] || BookOpen;
          const percent = getModuleCompletionPercent(progress, mod.id, mod.lessons.length);
          const isLocked = mod.prerequisites.some(
            prereq => getModuleCompletionPercent(progress, prereq, modules.find(m => m.id === prereq)?.lessons.length ?? 0) < 100
          );

          return (
            <div
              key={mod.id}
              className={`module-card ${isLocked ? 'locked' : ''}`}
              onClick={() => {
                if (!isLocked && mod.lessons[0]) {
                  navigate(`/lesson/${mod.id}/${mod.lessons[0].id}`);
                }
              }}
            >
              <div className="module-card-header">
                <div className="module-icon" style={{ background: `${difficultyColors[mod.difficulty]}22`, color: difficultyColors[mod.difficulty] }}>
                  <Icon size={24} />
                </div>
                <span className="module-number">{index + 1}</span>
              </div>

              <h3 className="module-title">{mod.title}</h3>
              <p className="module-desc">{mod.description}</p>

              <div className="module-meta">
                <span className="module-difficulty" style={{ color: difficultyColors[mod.difficulty] }}>
                  {mod.difficulty}
                </span>
                <span className="module-lessons">{mod.lessons.length} {mod.lessons.length === 1 ? 'lección' : 'lecciones'}</span>
              </div>

              {percent > 0 && (
                <div className="module-progress-bar-container">
                  <div className="module-progress-bar" style={{ width: `${percent}%` }} />
                </div>
              )}

              {percent === 100 && (
                <div className="module-complete-badge">
                  <Trophy size={14} /> Completado
                </div>
              )}

              {isLocked && <div className="module-lock-overlay">Completá los módulos anteriores</div>}
            </div>
          );
        })}
      </main>
    </div>
  );
}
