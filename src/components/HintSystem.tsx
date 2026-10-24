import { useState } from 'react';
import { Lightbulb, Eye, EyeOff } from 'lucide-react';

interface Props {
  hints: string[];
  hintsUsed: number;
  solution: string;
  onRequestHint: () => void;
}

export default function HintSystem({ hints, hintsUsed, solution, onRequestHint }: Props) {
  const [showSolution, setShowSolution] = useState(false);
  const maxHints = hints.length;
  const allHintsUsed = hintsUsed >= maxHints;

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

      <div className="hint-actions">
        {!allHintsUsed ? (
          <button className="hint-btn" onClick={onRequestHint}>
            <Lightbulb size={16} />
            Pista ({hintsUsed}/{maxHints})
          </button>
        ) : (
          <button className="solution-btn" onClick={() => setShowSolution(!showSolution)}>
            {showSolution ? <EyeOff size={16} /> : <Eye size={16} />}
            {showSolution ? 'Ocultar solución' : 'Ver solución'}
          </button>
        )}
      </div>

      {showSolution && solution && (
        <div className="solution-preview">
          <pre><code>{solution}</code></pre>
        </div>
      )}
    </div>
  );
}
