import { useEffect, useRef } from 'react';
import { EditorView, basicSetup } from 'codemirror';
import { EditorState } from '@codemirror/state';
import { keymap } from '@codemirror/view';
import { indentWithTab } from '@codemirror/commands';
import { oneDark } from '@codemirror/theme-one-dark';
import { css } from '@codemirror/lang-css';
import { json } from '@codemirror/lang-json';
import { html } from '@codemirror/lang-html';
import { javascript } from '@codemirror/lang-javascript';

interface SharedCodeMirrorProps {
  code?: string;
  everyNewTab?: boolean;
  hideLang?: boolean;
  lang?: string;
  lineNumbers?: boolean;
  readonly?: boolean;
  updateCode?: (newValue: string) => void;
}

const SharedCodeMirror = ({
  code = '',
  everyNewTab,
  hideLang = false,
  lang = 'javascript',
  lineNumbers = false,
  readonly = false,
  updateCode,
}: SharedCodeMirrorProps) => {
  const codeMirrorRef = useRef<HTMLDivElement>(null);
  const langs = useRef({
    json: json,
    javascript: javascript,
    html: html,
    css: css,
  });

  useEffect(() => {
    let editor: EditorView | null = null;
    // const customExtension = Array.isArray(extensions)
    //   ? extensions
    //   : [extensions];
    const state = EditorState.create({
      doc: code,
      extensions: [
        oneDark,
        basicSetup,
        updateListener,
        langs.current[lang]?.(),
        EditorState.tabSize.of(2),
        keymap.of([indentWithTab]),
        EditorState.readOnly.of(readonly),
      ],
    });

    if (codeMirrorRef.current) {
      editor = new EditorView({
        state,
        parent: codeMirrorRef.current,
      });
    }

    return () => {
      editor?.destroy();
    };
  }, []);

  const updateListener = EditorView.updateListener.of((event) => {
    if (event.docChanged) {
      const newValue = event.state.doc.toString();
      console.log('🚀 ~ updateListener ~ newValue:', newValue);
      updateCode?.(newValue);
    }
  });

  return (
    <div
      ref={codeMirrorRef}
      className={`codemirror relative overflow-auto rounded-lg 
        ${lineNumbers ? 'hide-gutters' : ''}
        ${everyNewTab ? 'h-full' : 'h-5/6'}
      `}
    >
      {!hideLang && (
        <div className="absolute bottom-0 left-0 z-10 flex h-6 w-full items-center px-2 text-xs text-gray-300">
          <div className="grow" />
          <span>{lang}</span>
        </div>
      )}
    </div>
  );
};

export default SharedCodeMirror;
