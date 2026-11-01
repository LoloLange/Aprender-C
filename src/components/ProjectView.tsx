import { useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { projects } from '../data/projects';
import type { ExerciseResult } from '../types';
import { runTestCases } from '../compiler/ccompiler';
import TheoryPanel from './TheoryPanel';
import EditorPanel from './EditorPanel';
import ConsolePanel from './ConsolePanel';
import { ArrowLeft, CheckCircle, Lightbulb } from 'lucide-react';

export default function ProjectView() {
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
  const [completedExercises, setCompletedExercises] = useState<string[]>([]);
  const [hintsUsed, setHintsUsed] = useState<Record<string, number>>({});

  const exercise = exercises[exerciseIndex];

  useState(() => {
    if (exercise) setEditorCode(exercise.starterCode);
  });

  const handleRun = useCallback(async (currentCode: string) => {
    if (!exercise) return;
    setRunning(true);
    setOutput('');
    setError('');
    setResult(null);

    const res = await runTestCases(currentCode, exercise.testCases);
    setOutput(res.output);
    setError(res.error);
    setResult(res);
    setRunning(false);

    if (res.passed && !completedExercises.includes(exercise.id)) {
      setCompletedExercises(prev => [...prev, exercise.id]);
      const nextIdx = exerciseIndex + 1;
      if (nextIdx < exercises.length) {
        setTimeout(() => {
          setExerciseIndex(nextIdx);
          setEditorCode(exercises[nextIdx].starterCode);
          setOutput('');
          setError('');
          setResult(null);
        }, 1500);
      }
    }
  }, [exercise, exercises, exerciseIndex, completedExercises]);

  const handleHint = useCallback(() => {
    if (!exercise) return;
    setHintsUsed(prev => ({
      ...prev,
      [exercise.id]: (prev[exercise.id] ?? 0) + 1,
    }));
  }, [exercise]);

  const handleExerciseChange = useCallback((idx: number) => {
    setExerciseIndex(idx);
    if (exercises[idx]) {
      setEditorCode(exercises[idx].starterCode);
      setOutput('');
      setError('');
      setResult(null);
    }
  }, [exercises]);

  if (!project) {
    return (
      <div className="lesson-not-found">
        <p>Proyecto no encontrado</p>
        <button onClick={() => navigate('/')}>Volver al inicio</button>
      </div>
    );
  }

  const currentHints = exercise ? (hintsUsed[exercise.id] ?? 0) : 0;

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
                    className={`exercise-item ${i === exerciseIndex ? 'active' : ''} ${completedExercises.includes(ex.id) ? 'completed' : ''}`}
                    onClick={() => handleExerciseChange(i)}
                  >
                    {completedExercises.includes(ex.id) && <CheckCircle size={14} />}
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
                {completedExercises.includes(exercise.id) && <CheckCircle size={16} className="completed-icon" />}
                <p>{exercise.instruction}</p>
              </div>
              <EditorPanel
                code={editorCode}
                onRun={handleRun}
                running={running}
                hintLabel={currentHints < exercise.hints.length ? `Pista (${currentHints}/${exercise.hints.length})` : undefined}
                onRequestHint={currentHints < exercise.hints.length ? handleHint : undefined}
              />
              {currentHints > 0 && (
                <div className="hint-system">
                  <div className="hints-list">
                    {exercise.hints.slice(0, currentHints).map((hint, i) => (
                      <div key={i} className="hint-item">
                        <Lightbulb size={14} />
                        <span>{hint}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        <div className={`panel-wrapper console-wrapper ${activeTab === 'console' ? 'mobile-visible' : ''}`}>
          <ConsolePanel output={output} error={error} result={result} running={running} />
        </div>
      </div>
    </div>
  );
}
