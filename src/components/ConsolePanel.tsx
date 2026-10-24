import { Terminal, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import type { ExerciseResult } from '../types';

interface Props {
  output: string;
  error: string;
  result: ExerciseResult | null;
  running: boolean;
}

export default function ConsolePanel({ output, error, result, running }: Props) {
  return (
    <div className="console-panel">
      <div className="panel-header console-header">
        <Terminal size={18} />
        <span>Consola</span>
      </div>
      <div className="console-content">
        {running && (
          <div className="console-loading">
            <div className="spinner" />
            <span>Compilando y ejecutando...</span>
          </div>
        )}

        {output && (
          <div className="console-output">
            <div className="console-output-label">Salida del programa:</div>
            <pre>{output}</pre>
          </div>
        )}

        {error && (
          <div className="console-error">
            <AlertCircle size={16} />
            <pre>{error}</pre>
          </div>
        )}

        {result && !running && (
          <div className="test-results">
            <div className={`test-summary ${result.passed ? 'passed' : 'failed'}`}>
              {result.passed ? (
                <>
                  <CheckCircle size={20} />
                  <span>Todos los tests pasaron</span>
                </>
              ) : (
                <>
                  <XCircle size={20} />
                  <span>Algunos tests fallaron</span>
                </>
              )}
            </div>
            {result.testResults.map((tr, i) => (
              <div key={i} className={`test-case ${tr.passed ? 'passed' : 'failed'}`}>
                <div className="test-case-header">
                  {tr.passed ? <CheckCircle size={14} /> : <XCircle size={14} />}
                  <span>{tr.description}</span>
                </div>
                {!tr.passed && (
                  <div className="test-case-detail">
                    <div><strong>Esperado:</strong> <code>{tr.expected}</code></div>
                    <div><strong>Obtenido:</strong> <code>{tr.got}</code></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {!running && !output && !error && !result && (
          <div className="console-placeholder">
            Hacé clic en "Ejecutar" o presioná Ctrl+Enter para compilar y ver la salida acá.
          </div>
        )}
      </div>
    </div>
  );
}
