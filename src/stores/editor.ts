import { defineStore } from 'pinia';
import { useEditor } from '@tiptap/vue-3';

import TextAlign from '@tiptap/extension-text-align';
import Typography from '@tiptap/extension-typography';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';

export const useEditorStore = defineStore('editor', () => {
  const editor = useEditor({
    extensions: [StarterKit, TextAlign, Typography, Underline],
    content: '',
  });

  function setContent(content: string) {
    editor.value?.commands.setContent(content);
  }

  return {
    editor,
    setContent,
  };
});
