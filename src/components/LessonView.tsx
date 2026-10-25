import { useState, useCallback, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { modules } from '../data/modules';
import type { CourseProgress, ExerciseResult } from '../types';
import {
  getLessonProgress, markExerciseCompleted, markLessonCompleted,
  saveLastCode, incrementHint, setLastVisited
} from '../store/progress';
import { runTestCases } from '../compiler/ccompiler';
import TheoryPanel from './TheoryPanel';
import EditorPanel from './EditorPanel';
import ConsolePanel from './ConsolePanel';
import HintSystem from './HintSystem';
import CompletionModal from './CompletionModal';
import { ArrowLeft, ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';

interface Props {
  progress: CourseProgress;
  onProgressChange: (p: CourseProgress) => void;
}

export default function LessonView({ progress, onProgressChange }: Props) {
  const { moduleId, lessonId } = useParams<{ moduleId: string; lessonId: string }>();
  const navigate = useNavigate();

  const mod = modules.find(m => m.id === moduleId);
  const lesson = mod?.lessons.find(l => l.id === lessonId);
  const exercises = lesson?.content.exercises ?? [];

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
  const lessonProg = moduleId && lessonId ? getLessonProgress(progress, moduleId, lessonId) : null;

  useEffect(() => {
    if (moduleId && lessonId) {
      onProgressChange(setLastVisited(progress, moduleId, lessonId));
    }
    setExerciseIndex(0);
    setOutput('');
    setError('');
    setResult(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moduleId, lessonId]);

  useEffect(() => {
    if (!exercise) return;
    const saved = lessonProg?.lastCode[exercise.id];
    setEditorCode(saved ?? exercise.starterCode);
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
    if (!exercise || !moduleId || !lessonId) return;
    setRunning(true);
    setOutput('');
    setError('');
    setResult(null);

    onProgressChange(saveLastCode(progress, moduleId, lessonId, exercise.id, currentCode));

    const res = await runTestCases(currentCode, exercise.testCases);
    setOutput(res.output);
    setError(res.error);
    setResult(res);
    setRunning(false);

    if (res.passed && !lessonProg?.exercisesCompleted.includes(exercise.id)) {
      let next = markExerciseCompleted(progress, moduleId, lessonId, exercise.id);
      const allDone = exercises.every(ex =>
        next.modules[moduleId]?.lessonsProgress[lessonId]?.exercisesCompleted.includes(ex.id)
      );
      if (allDone) {
        next = markLessonCompleted(next, moduleId, lessonId);
      }
      onProgressChange(next);

      if (allDone) {
        autoAdvanceTimerRef.current = setTimeout(() => setShowCompletion(true), 1200);
      } else {
        const nextIdx = exerciseIndex + 1;
        if (nextIdx < exercises.length) {
          autoAdvanceTimerRef.current = setTimeout(() => setExerciseIndex(nextIdx), 1500);
        }
      }
    }
  }, [exercise, moduleId, lessonId, exercises, exerciseIndex, progress, lessonProg, onProgressChange]);

  const handleHint = useCallback(() => {
    if (moduleId && lessonId && exercise) {
      onProgressChange(incrementHint(progress, moduleId, lessonId, exercise.id));
    }
  }, [moduleId, lessonId, exercise, progress, onProgressChange]);


  const lessonIndex = mod ? mod.lessons.findIndex(l => l.id === lessonId) : -1;
  const nextLesson = mod && lessonIndex < mod.lessons.length - 1 ? mod.lessons[lessonIndex + 1] : null;

  const handleNextLesson = useCallback(() => {
    if (mod && nextLesson) {
      navigate(`/lesson/${mod.id}/${nextLesson.id}`);
      setShowCompletion(false);
    }
  }, [mod, nextLesson, navigate]);

  const handleStayHere = useCallback(() => {
    setShowCompletion(false);
  }, []);

  if (!mod || !lesson) {
    return (
      <div className="lesson-not-found">
        <p>Leccion no encontrada</p>
        <button onClick={() => navigate('/')}>Volver al inicio</button>
      </div>
    );
  }

  const prevLesson = lessonIndex > 0 ? mod.lessons[lessonIndex - 1] : null;
  const isExerciseCompleted = exercise && lessonProg?.exercisesCompleted.includes(exercise.id);
  const hintsUsed = exercise ? (lessonProg?.hintsUsed[exercise.id] ?? 0) : 0;

  return (
    <div className="lesson-view">
      <nav className="lesson-nav">
        <button className="nav-back" onClick={() => navigate('/')}>
          <ArrowLeft size={18} /> Dashboard
        </button>
        <div className="lesson-nav-info">
          <span className="lesson-nav-module">{mod.title}</span>
          <span className="lesson-nav-separator">/</span>
          <span className="lesson-nav-title">{lesson.title}</span>
        </div>
        <div className="lesson-nav-pager">
          {prevLesson && (
            <button onClick={() => navigate(`/lesson/${mod.id}/${prevLesson.id}`)}>
              <ChevronLeft size={16} /> Anterior
            </button>
          )}
          {nextLesson && (
            <button onClick={() => navigate(`/lesson/${mod.id}/${nextLesson.id}`)}>
              Siguiente <ChevronRight size={16} />
            </button>
          )}
        </div>
      </nav>

      {/* Mobile tabs */}
      <div className="mobile-tabs">
        <button className={activeTab === 'theory' ? 'active' : ''} onClick={() => setActiveTab('theory')}>Teoria</button>
        <button className={activeTab === 'editor' ? 'active' : ''} onClick={() => setActiveTab('editor')}>Editor</button>
        <button className={activeTab === 'console' ? 'active' : ''} onClick={() => setActiveTab('console')}>Consola</button>
      </div>

      <div className="lesson-panels">
        <div className={`panel-wrapper theory-wrapper ${activeTab === 'theory' ? 'mobile-visible' : ''}`}>
          <TheoryPanel html={lesson.content.theory} title={lesson.title} />

          {exercises.length > 0 && (
            <div className="exercise-selector">
              <h4>Ejercicios</h4>
              <div className="exercise-list">
                {exercises.map((ex, i) => (
                  <button
                    key={ex.id}
                    className={`exercise-item ${i === exerciseIndex ? 'active' : ''} ${lessonProg?.exercisesCompleted.includes(ex.id) ? 'completed' : ''}`}
                    onClick={() => setExerciseIndex(i)}
                  >
                    {lessonProg?.exercisesCompleted.includes(ex.id) && <CheckCircle size={14} />}
                    <span>{ex.title}</span>
                    <span className={`difficulty-badge ${ex.difficulty}`}>{ex.difficulty}</span>
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
                <span className={`difficulty-badge ${exercise.difficulty}`}>{exercise.difficulty}</span>
                {isExerciseCompleted && <CheckCircle size={16} className="completed-icon" />}
                <p>{exercise.instruction}</p>
              </div>
              <EditorPanel code={editorCode} onRun={handleRun} running={running} />
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
          lessonTitle={lesson.title}
          onNextLesson={handleNextLesson}
          onStay={handleStayHere}
          hasNext={!!nextLesson}
        />
      )}
    </div>
  );
}
