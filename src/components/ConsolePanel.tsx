import { Terminal, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import type { ExerciseResult } from '../types';

interface Props {
  output: string;
  error: string;
  result: ExerciseResult | null;
  running: boolean;
}

export default function ConsolePanel({ output, error, result, running }: Props) {
  const passedCount = result?.testResults.filter(t => t.passed).length ?? 0;
  const failedCount = result?.testResults.filter(t => !t.passed).length ?? 0;

  return (
    <div className="console-panel">
      <div className="panel-header console-header">
        <Terminal size={16} />
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
            <div className="test-summary">
              <span className="sum-pass">{passedCount} pasaron</span>
              <span className="sum-sep">/</span>
              <span className="sum-fail">{failedCount} fallaron</span>
            </div>
            {result.testResults.map((tr, i) => (
              <div key={i} className={`test-result ${tr.passed ? 'pass' : 'fail'}`}>
                <div className={`test-icon ${tr.passed ? 'pass' : 'fail'}`}>
                  {tr.passed ? <CheckCircle size={14} /> : <XCircle size={14} />}
                </div>
                <div className="test-info">
                  <span className="test-name">{tr.description}</span>
                  {!tr.passed && (
                    <span className="test-detail error">
                      Esperado: {tr.expected} — Obtenido: {tr.got}
                    </span>
                  )}
                  {tr.passed && (
                    <span className="test-detail">Correcto</span>
                  )}
                </div>
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
