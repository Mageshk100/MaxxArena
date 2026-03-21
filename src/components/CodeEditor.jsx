import React, { useRef, useCallback } from 'react';
import Editor, { loader } from '@monaco-editor/react';
import * as monaco from 'monaco-editor';

/**
 * Configure @monaco-editor/react to use the locally-installed
 * monaco-editor package instead of loading from the CDN.
 * This avoids network issues (ERR_CONNECTION_RESET) with jsdelivr.
 */
loader.config({ monaco });

/**
 * CodeEditor Component
 * Monaco Editor wrapper configured for the MaxxArena typing challenge.
 *
 * @param {string} language - Programming language for syntax highlighting
 * @param {string} value - Current editor content
 * @param {function} onChange - Callback when editor content changes
 * @param {function} onFirstKeystroke - Callback triggered on the first keystroke
 * @param {boolean} disabled - Whether the editor is read-only
 */
function CodeEditor({ language, value, onChange, onFirstKeystroke, disabled }) {
  const hasStarted = useRef(false);
  const editorRef = useRef(null);

  // Map our language keys to Monaco language identifiers
  const monacoLang = {
    python: 'python',
    java: 'java',
    cpp: 'cpp',
  }[language] || 'python';

  /**
   * Called when editor content changes.
   * Detects the first keystroke to start the timer.
   */
  const handleChange = useCallback(
    (newValue) => {
      // Trigger first-keystroke callback only once
      if (!hasStarted.current && newValue && newValue.length > 0) {
        hasStarted.current = true;
        if (onFirstKeystroke) onFirstKeystroke();
      }
      if (onChange) onChange(newValue || '');
    },
    [onChange, onFirstKeystroke]
  );

  /**
   * Runs when the editor is mounted.
   * Disables paste to prevent cheating.
   */
  const handleEditorMount = useCallback((editor) => {
    editorRef.current = editor;

    // Disable paste (Ctrl+V / Cmd+V)
    editor.addCommand(
      // Monaco KeyMod.CtrlCmd | Monaco KeyCode.KeyV
      2048 | 52, // CtrlCmd + V
      () => {
        // Do nothing — paste is disabled
      }
    );

    // Focus the editor automatically
    editor.focus();
  }, []);

  return (
    <div id="code-editor" className="editor-container">
      <Editor
        height="350px"
        language={monacoLang}
        value={value}
        onChange={handleChange}
        onMount={handleEditorMount}
        theme="vs-dark"
        options={{
          fontSize: 14,
          fontFamily: "'Fira Code', 'Cascadia Code', Consolas, monospace",
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          automaticLayout: true,
          wordWrap: 'on',
          lineNumbers: 'on',
          readOnly: disabled,
          renderLineHighlight: 'all',
          cursorBlinking: 'smooth',
          cursorSmoothCaretAnimation: 'on',
          smoothScrolling: true,
          padding: { top: 16, bottom: 16 },
          contextmenu: false, // Disable right-click context menu
        }}
      />
    </div>
  );
}

export default CodeEditor;
