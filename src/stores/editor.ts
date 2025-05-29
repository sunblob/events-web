import { defineStore } from 'pinia';
import { useEditor } from '@tiptap/vue-3';

import TextAlign from '@tiptap/extension-text-align';
import Typography from '@tiptap/extension-typography';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Placeholder from '@tiptap/extension-placeholder';
import Table from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableHeader from '@tiptap/extension-table-header';
import TableCell from '@tiptap/extension-table-cell';

export const useEditorStore = defineStore('editor', () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign,
      Typography,
      Underline,
      Placeholder.configure({ placeholder: 'Write something...' }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
    ],
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
