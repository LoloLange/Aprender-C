import { useState } from 'react';
import { Lightbulb, Eye, EyeOff } from 'lucide-react';

interface Props {
  hints: string[];
  hintsUsed: number;
  solution: string;
  onRequestHint: () => void;
}

export default function HintSystem({ hints, hintsUsed, solution }: Props) {
  const [showSolution, setShowSolution] = useState(false);
  const allHintsUsed = hintsUsed >= hints.length;

  if (hintsUsed === 0 && !allHintsUsed) return null;

  return (
    <div className="hint-system">
      {hintsUsed > 0 && (
        <div className="hints-list">
          {hints.slice(0, hintsUsed).map((hint, i) => (
            <div key={i} className="hint-item">
              <Lightbulb size={14} />
              <span>{hint}</span>
            </div>
          ))}
        </div>
      )}

      {allHintsUsed && (
        <div className="hint-actions">
          <button className="solution-btn" onClick={() => setShowSolution(!showSolution)}>
            {showSolution ? <EyeOff size={16} /> : <Eye size={16} />}
            {showSolution ? 'Ocultar solución' : 'Ver solución'}
          </button>
        </div>
      )}

      {showSolution && solution && (
        <div className="solution-preview">
          <pre><code>{solution}</code></pre>
        </div>
      )}
    </div>
  );
}
