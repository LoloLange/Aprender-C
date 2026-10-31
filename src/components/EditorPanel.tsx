import { useRef, useEffect, useCallback } from 'react';
import { EditorView, basicSetup } from 'codemirror';
import { EditorState, Prec } from '@codemirror/state';
import { keymap } from '@codemirror/view';
import { indentWithTab } from '@codemirror/commands';
import { cpp } from '@codemirror/lang-cpp';
import { oneDark } from '@codemirror/theme-one-dark';
import { Code, Play, Lightbulb } from 'lucide-react';

interface Props {
  code: string;
  onRun: (code: string) => void;
  running: boolean;
  hintLabel?: string;
  onRequestHint?: () => void;
}

export default function EditorPanel({ code, onRun, running, hintLabel, onRequestHint }: Props) {
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
          '.cm-scroller': { overflow: 'auto', fontFamily: "var(--font-mono)" },
          '.cm-content': { minHeight: '120px' },
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
          <Code size={16} />
          <span>Editor</span>
        </div>
        <span className="editor-filename">main.c</span>
      </div>
      <div ref={editorRef} className="editor-container" />
      <div className="editor-actions">
        <button className="btn-run" onClick={() => onRun(getCode())} disabled={running}>
          <Play size={14} />
          {running ? 'Compilando...' : 'Ejecutar'}
        </button>
        {hintLabel && onRequestHint && (
          <button className="btn-hint" onClick={onRequestHint}>
            <Lightbulb size={14} />
            {hintLabel}
          </button>
        )}
      </div>
    </div>
  );
}
