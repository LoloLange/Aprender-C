export interface TestCase {
  input: string;
  expectedOutput: string;
  description: string;
}

export interface Exercise {
  id: string;
  title: string;
  instruction: string;
  type: 'write' | 'complete' | 'fix-syntax' | 'fix-logic' | 'predict' | 'modify' | 'concept';
  starterCode: string;
  solution: string;
  testCases: TestCase[];
  hints: string[];
  difficulty: 'facil' | 'medio' | 'dificil';
}

export interface LessonContent {
  theory: string;  // HTML string for theory panel
  exercises: Exercise[];
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  content: LessonContent;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  icon: string;
  difficulty: 'Principiante' | 'Intermedio' | 'Avanzado';
  lessons: Lesson[];
  prerequisites: string[];
}

export interface ExerciseResult {
  passed: boolean;
  output: string;
  error: string;
  testResults: { passed: boolean; description: string; expected: string; got: string }[];
}

export interface LessonProgress {
  lessonId: string;
  completed: boolean;
  exercisesCompleted: string[];
  lastCode: Record<string, string>;
  hintsUsed: Record<string, number>;
}

export interface ModuleProgress {
  moduleId: string;
  lessonsProgress: Record<string, LessonProgress>;
  completed: boolean;
}

export interface CourseProgress {
  modules: Record<string, ModuleProgress>;
  lastVisited: { moduleId: string; lessonId: string } | null;
  totalExercisesCompleted: number;
}
