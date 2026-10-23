import { useState, useEffect, useCallback } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import LessonView from './components/LessonView';
import type { CourseProgress } from './types';
import { loadProgress, saveProgress } from './store/progress';
import './App.css';

function App() {
  const [progress, setProgress] = useState<CourseProgress>(loadProgress);

  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  const handleProgressChange = useCallback((p: CourseProgress) => {
    setProgress(p);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard progress={progress} />} />
        <Route
          path="/lesson/:moduleId/:lessonId"
          element={<LessonView progress={progress} onProgressChange={handleProgressChange} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
