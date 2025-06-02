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
import Highlight from '@tiptap/extension-highlight';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';

export const useEditorStore = defineStore('editor', () => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        blockquote: {
          HTMLAttributes: {
            class: 'editor-blockquote',
          },
        },
        bold: {
          HTMLAttributes: {
            class: 'editor-bold',
          },
        },
        italic: {
          HTMLAttributes: {
            class: 'editor-italic',
          },
        },
        listItem: {
          HTMLAttributes: {
            class: 'editor-list-item',
          },
        },
        orderedList: {
          HTMLAttributes: {
            class: 'editor-ordered-list',
          },
        },
        paragraph: {
          HTMLAttributes: {
            class: 'editor-paragraph',
          },
        },
        strike: {
          HTMLAttributes: {
            class: 'editor-strike',
          },
        },
        heading: {
          HTMLAttributes: {
            class: 'editor-heading',
          },
        },
        bulletList: {
          HTMLAttributes: {
            class: 'editor-bullet-list',
          },
        },
        code: {
          HTMLAttributes: {
            class: 'editor-code',
          },
        },
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Typography,
      Underline,
      Placeholder.configure({
        placeholder: ({ node }) => {
          if (node.type.name === 'heading') {
            return "What's the title?";
          }

          return 'Write something...';
        },
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      Highlight.configure({
        multicolor: true,
      }),
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      Link,
      Image
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
