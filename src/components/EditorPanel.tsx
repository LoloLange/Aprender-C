import { useRef, useEffect, useCallback } from 'react';
import { EditorView, basicSetup } from 'codemirror';
import { EditorState, Prec } from '@codemirror/state';
import { keymap } from '@codemirror/view';
import { indentWithTab } from '@codemirror/commands';
import { cpp } from '@codemirror/lang-cpp';
import { oneDark } from '@codemirror/theme-one-dark';
import { Code } from 'lucide-react';

interface Props {
  code: string;
  onRun: (code: string) => void;
  running: boolean;
}

export default function EditorPanel({ code, onRun, running }: Props) {
  const editorRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);
  const onRunRef = useRef(onRun);
  const runningRef = useRef(running);
  onRunRef.current = onRun;
  runningRef.current = running;

  const getCode = useCallback(() => {
    return viewRef.current?.state.doc.toString() ?? code;
  }, [code]);

  useEffect(() => {
    if (!editorRef.current) return;

    const runKeyBinding = Prec.highest(keymap.of([{
      key: 'Ctrl-Enter',
      run: () => {
        if (!runningRef.current) {
          const currentCode = viewRef.current?.state.doc.toString() ?? '';
          onRunRef.current(currentCode);
        }
        return true;
      },
    }]));

    const state = EditorState.create({
      doc: code,
      extensions: [
        runKeyBinding,
        basicSetup,
        keymap.of([indentWithTab]),
        cpp(),
        oneDark,
        EditorView.theme({
          '&': { height: '100%', fontSize: '14px' },
          '.cm-scroller': { overflow: 'auto', fontFamily: "'JetBrains Mono', 'Fira Code', 'Consolas', monospace" },
          '.cm-content': { minHeight: '200px' },
        }),
      ],
    });

    const view = new EditorView({ state, parent: editorRef.current });
    viewRef.current = view;

    return () => {
      view.destroy();
      viewRef.current = null;
    };
  }, [code]);

  return (
    <div className="editor-panel">
      <div className="panel-header editor-header">
        <div className="panel-header-left">
          <Code size={18} />
          <span>Editor</span>
        </div>
        <button className="run-btn" onClick={() => onRun(getCode())} disabled={running}>
          {running ? 'Compilando...' : '▶ Ejecutar (Ctrl+Enter)'}
        </button>
      </div>
      <div ref={editorRef} className="editor-container" />
    </div>
  );
}
