import { useNavigate } from 'react-router-dom';
import { modules } from '../data/modules';
import { projects } from '../data/projects';
import type { CourseProgress } from '../types';
import { getModuleCompletionPercent, getTotalCompletionPercent, getProjectProgress } from '../store/progress';
import {
  Rocket, Database, GitBranch, Box, LayoutList, Type, Navigation,
  HardDrive, Binary, Boxes, FileText, FolderTree, Pointer, Bug, ChevronRight,
  BookOpen, Trophy, Lock, FolderKanban,
  Calculator, Thermometer, Grid3x3, Users, Shield, BarChart3, Link, Cpu,
  type LucideIcon
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  Rocket, Database, GitBranch, Box, LayoutList, Type, Navigation,
  HardDrive, Binary, Boxes, FileText, FolderTree, Pointer, Bug,
};

const projectIconMap: Record<string, LucideIcon> = {
  Calculator, Thermometer, Grid: Grid3x3, Users, Shield, BarChart: BarChart3,
  Link, FileText, Cpu,
};

interface Props {
  progress: CourseProgress;
}

const difficultyIconClass: Record<string, string> = {
  'Principiante': 'green',
  'Intermedio': 'yellow',
  'Avanzado': 'red',
};

const difficultyBadgeClass: Record<string, string> = {
  'Principiante': 'principiante',
  'Intermedio': 'intermedio',
  'Avanzado': 'avanzado',
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

  const grouped = {
    'Principiante': modules.filter(m => m.difficulty === 'Principiante'),
    'Intermedio': modules.filter(m => m.difficulty === 'Intermedio'),
    'Avanzado': modules.filter(m => m.difficulty === 'Avanzado'),
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="dashboard-header-content">
          <div className="dashboard-title-row">
            <div className="dashboard-title-group">
              <h1>Aprender <span>C</span></h1>
              <p className="dashboard-subtitle">
                Plataforma interactiva — Fundamentos de Programación (TB021) - Essaya
              </p>
            </div>
            <button className="continue-btn" onClick={handleContinue}>
              {progress.lastVisited ? 'Continuar donde dejaste' : 'Empezar a aprender'}
              <ChevronRight size={18} />
            </button>
          </div>

          <div className="progress-section">
            <span className="progress-label">Progreso general</span>
            <div className="progress-bar-container">
              <div className="progress-bar" style={{ width: `${totalPercent}%` }} />
            </div>
            <span className="progress-pct">{totalPercent}%</span>
          </div>
        </div>
      </header>

      <main className="modules-section">
        {(Object.entries(grouped) as [string, typeof modules][]).map(([difficulty, mods]) => {
          if (mods.length === 0) return null;
          return (
            <div key={difficulty}>
              <h2 className="section-label">{difficulty}</h2>
              <div className="modules-grid">
                {mods.map((mod) => {
                  const Icon = iconMap[mod.icon] || BookOpen;
                  const percent = getModuleCompletionPercent(progress, mod.id, mod.lessons.length);
                  const modIndex = modules.indexOf(mod);
                  const prevMod = modIndex > 0 ? modules[modIndex - 1] : null;
                  const isLocked = prevMod
                    ? getModuleCompletionPercent(progress, prevMod.id, prevMod.lessons.length) < 100
                    : false;

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
                        <div className={`module-icon ${difficultyIconClass[mod.difficulty]}`}>
                          <Icon size={20} />
                        </div>
                        <span className={`difficulty-badge ${difficultyBadgeClass[mod.difficulty]}`}>
                          {mod.difficulty}
                        </span>
                      </div>

                      <div>
                        <h3 className="module-title">{mod.title}</h3>
                        <p className="module-desc">{mod.description}</p>
                      </div>

                      <div className="module-footer">
                        <div className="module-progress-bar-container">
                          <div
                            className={`module-progress-bar ${percent === 100 ? 'complete' : ''}`}
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                        <span className="module-meta">
                          {mod.lessons.length} {mod.lessons.length === 1 ? 'lección' : 'lecciones'}
                        </span>
                      </div>

                      {percent === 100 && (
                        <div className="module-complete-badge">
                          <Trophy size={12} /> Completado
                        </div>
                      )}

                      {isLocked && (
                        <div className="module-lock-overlay">
                          <Lock size={24} />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </main>

      <section className="projects-section">
        <div className="projects-section-header">
          <FolderKanban size={22} />
          <h2>Mini Proyectos</h2>
        </div>
        <p className="projects-section-desc">
          Poné en práctica lo aprendido con proyectos integradores por nivel.
        </p>
        {(['Principiante', 'Intermedio', 'Avanzado'] as const).map(diff => {
          const projs = projects.filter(p => p.difficulty === diff);
          if (projs.length === 0) return null;
          const levelMods = modules.filter(m => m.difficulty === diff);
          const levelCompleted = levelMods.length > 0 && levelMods.every(
            m => getModuleCompletionPercent(progress, m.id, m.lessons.length) === 100
          );
          return (
            <div key={diff}>
              <h3 className="section-label">{diff}</h3>
              <div className="modules-grid">
                {projs.map(proj => {
                  const PIcon = projectIconMap[proj.icon] || BookOpen;
                  const projProg = getProjectProgress(progress, proj.id);
                  const projExCount = proj.exercises.length;
                  const projDoneCount = projProg.exercisesCompleted.length;
                  const projPercent = projExCount > 0 ? Math.round((projDoneCount / projExCount) * 100) : 0;
                  return (
                    <div
                      key={proj.id}
                      className={`module-card ${!levelCompleted ? 'locked' : ''}`}
                      onClick={() => { if (levelCompleted) navigate(`/project/${proj.id}`); }}
                    >
                      <div className="module-card-header">
                        <div className={`module-icon ${difficultyIconClass[diff]}`}>
                          <PIcon size={20} />
                        </div>
                        <span className={`difficulty-badge ${difficultyBadgeClass[diff]}`}>
                          {diff}
                        </span>
                      </div>

                      <div>
                        <h3 className="module-title">{proj.title}</h3>
                        <p className="module-desc">{proj.description}</p>
                      </div>

                      <div className="module-footer">
                        <div className="module-progress-bar-container">
                          <div
                            className={`module-progress-bar ${projPercent === 100 ? 'complete' : ''}`}
                            style={{ width: `${projPercent}%` }}
                          />
                        </div>
                        <span className="module-meta">
                          {projExCount} {projExCount === 1 ? 'etapa' : 'etapas'}
                        </span>
                      </div>

                      {projPercent === 100 && (
                        <div className="module-complete-badge">
                          <Trophy size={12} /> Completado
                        </div>
                      )}

                      {!levelCompleted && (
                        <div className="module-lock-overlay">
                          <Lock size={24} />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}
