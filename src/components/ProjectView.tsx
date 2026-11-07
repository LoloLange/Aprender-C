import { useState, useCallback, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { projects } from '../data/projects';
import type { CourseProgress, ExerciseResult } from '../types';
import {
  getProjectProgress, markProjectExerciseCompleted, markProjectCompleted,
  saveProjectCode, incrementProjectHint
} from '../store/progress';
import { runTestCases } from '../compiler/ccompiler';
import TheoryPanel from './TheoryPanel';
import EditorPanel from './EditorPanel';
import ConsolePanel from './ConsolePanel';
import HintSystem from './HintSystem';
import CompletionModal from './CompletionModal';
import { ArrowLeft, CheckCircle } from 'lucide-react';

interface Props {
  progress: CourseProgress;
  onProgressChange: (p: CourseProgress) => void;
}

export default function ProjectView({ progress, onProgressChange }: Props) {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();

  const project = projects.find(p => p.id === projectId);
  const exercises = project?.exercises ?? [];

  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [editorCode, setEditorCode] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [result, setResult] = useState<ExerciseResult | null>(null);
  const [running, setRunning] = useState(false);
  const [activeTab, setActiveTab] = useState<'theory' | 'editor' | 'console'>('theory');
  const [showCompletion, setShowCompletion] = useState(false);

  const autoAdvanceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const exercise = exercises[exerciseIndex];
  const projProg = projectId ? getProjectProgress(progress, projectId) : null;

  useEffect(() => {
    setExerciseIndex(0);
    setOutput('');
    setError('');
    setResult(null);
  }, [projectId]);

  useEffect(() => {
    if (!exercise) return;
    const saved = projProg?.lastCode[exercise.id];
    const isCompleted = projProg?.exercisesCompleted.includes(exercise.id);
    const hasIndentation = saved && saved.split('\n').some(l => /^\s{2,}/.test(l));
    setEditorCode((saved && hasIndentation) ? saved : (isCompleted ? exercise.solution : exercise.starterCode));
    setOutput('');
    setError('');
    setResult(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exercise?.id]);

  useEffect(() => {
    return () => {
      if (autoAdvanceTimerRef.current) clearTimeout(autoAdvanceTimerRef.current);
    };
  }, []);

  const handleRun = useCallback(async (currentCode: string) => {
    if (!exercise || !projectId) return;
    setRunning(true);
    setOutput('');
    setError('');
    setResult(null);

    let next = saveProjectCode(progress, projectId, exercise.id, currentCode);

    const res = await runTestCases(currentCode, exercise.testCases);
    setOutput(res.output);
    setError(res.error);
    setResult(res);
    setRunning(false);

    if (res.passed && !projProg?.exercisesCompleted.includes(exercise.id)) {
      next = markProjectExerciseCompleted(next, projectId, exercise.id);
      const allDone = exercises.every(ex =>
        next.projects?.[projectId]?.exercisesCompleted.includes(ex.id)
      );
      if (allDone) {
        next = markProjectCompleted(next, projectId);
      }

      if (allDone) {
        autoAdvanceTimerRef.current = setTimeout(() => setShowCompletion(true), 1200);
      } else {
        const nextIdx = exerciseIndex + 1;
        if (nextIdx < exercises.length) {
          autoAdvanceTimerRef.current = setTimeout(() => setExerciseIndex(nextIdx), 1500);
        }
      }
    }
    onProgressChange(next);
  }, [exercise, projectId, exercises, exerciseIndex, progress, projProg, onProgressChange]);

  const handleHint = useCallback(() => {
    if (projectId && exercise) {
      onProgressChange(incrementProjectHint(progress, projectId, exercise.id));
    }
  }, [projectId, exercise, progress, onProgressChange]);

  if (!project) {
    return (
      <div className="lesson-not-found">
        <p>Proyecto no encontrado</p>
        <button onClick={() => navigate('/')}>Volver al inicio</button>
      </div>
    );
  }

  const isExerciseCompleted = exercise && projProg?.exercisesCompleted.includes(exercise.id);
  const hintsUsed = exercise ? (projProg?.hintsUsed[exercise.id] ?? 0) : 0;

  return (
    <div className="lesson-view">
      <nav className="lesson-nav">
        <button className="nav-back" onClick={() => navigate('/')}>
          <ArrowLeft size={18} /> Dashboard
        </button>
        <div className="lesson-nav-info">
          <span className="lesson-nav-module">Proyecto</span>
          <span className="lesson-nav-separator">/</span>
          <span className="lesson-nav-title">{project.title}</span>
        </div>
        <div className="lesson-nav-pager">
          <span className={`difficulty-badge ${project.difficulty === 'Principiante' ? 'principiante' : project.difficulty === 'Intermedio' ? 'intermedio' : 'avanzado'}`}>
            {project.difficulty}
          </span>
        </div>
      </nav>

      <div className="mobile-tabs">
        <button className={activeTab === 'theory' ? 'active' : ''} onClick={() => setActiveTab('theory')}>Teoría</button>
        <button className={activeTab === 'editor' ? 'active' : ''} onClick={() => setActiveTab('editor')}>Editor</button>
        <button className={activeTab === 'console' ? 'active' : ''} onClick={() => setActiveTab('console')}>Consola</button>
      </div>

      <div className="lesson-panels">
        <div className={`panel-wrapper theory-wrapper ${activeTab === 'theory' ? 'mobile-visible' : ''}`}>
          <TheoryPanel html={project.theory} title={project.title} />

          {exercises.length > 0 && (
            <div className="exercise-selector">
              <h4>Etapas del proyecto</h4>
              <div className="exercise-list">
                {exercises.map((ex, i) => (
                  <button
                    key={ex.id}
                    className={`exercise-item ${i === exerciseIndex ? 'active' : ''} ${projProg?.exercisesCompleted.includes(ex.id) ? 'completed' : ''}`}
                    onClick={() => setExerciseIndex(i)}
                  >
                    {projProg?.exercisesCompleted.includes(ex.id) && <CheckCircle size={14} />}
                    <span>{ex.title}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className={`panel-wrapper editor-wrapper ${activeTab === 'editor' ? 'mobile-visible' : ''}`}>
          {exercise && (
            <>
              <div className="exercise-instruction">
                <strong>{exercise.title}</strong>
                {isExerciseCompleted && <CheckCircle size={16} className="completed-icon" />}
                <p>{exercise.instruction}</p>
              </div>
              <EditorPanel
                code={editorCode}
                onRun={handleRun}
                running={running}
                hintLabel={hintsUsed < exercise.hints.length ? `Pista (${hintsUsed}/${exercise.hints.length})` : undefined}
                onRequestHint={hintsUsed < exercise.hints.length ? handleHint : undefined}
              />
              <HintSystem
                hints={exercise.hints}
                hintsUsed={hintsUsed}
                solution={exercise.solution}
                onRequestHint={handleHint}
              />
            </>
          )}
        </div>

        <div className={`panel-wrapper console-wrapper ${activeTab === 'console' ? 'mobile-visible' : ''}`}>
          <ConsolePanel output={output} error={error} result={result} running={running} />
        </div>
      </div>

      {showCompletion && (
        <CompletionModal
          lessonTitle={project.title}
          onNextLesson={() => { setShowCompletion(false); navigate('/'); }}
          onStay={() => setShowCompletion(false)}
          onDashboard={() => { setShowCompletion(false); navigate('/'); }}
          hasNext={false}
        />
      )}
    </div>
  );
}
