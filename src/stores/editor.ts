import Highlight from '@tiptap/extension-highlight';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import Table from '@tiptap/extension-table';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';
import TaskItem from '@tiptap/extension-task-item';
import TaskList from '@tiptap/extension-task-list';
import TextAlign from '@tiptap/extension-text-align';
import Typography from '@tiptap/extension-typography';
import Underline from '@tiptap/extension-underline';
import { EditorState } from '@tiptap/pm/state';
import StarterKit from '@tiptap/starter-kit';
import { useEditor } from '@tiptap/vue-3';
import { defineStore } from 'pinia';

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
      TableRow.configure({
        HTMLAttributes: {
          class: 'editor-table-row',
        },
      }),
      TableHeader.configure({
        HTMLAttributes: {
          class: 'editor-table-header',
        },
      }),
      TableCell.configure({
        HTMLAttributes: {
          class: 'editor-table-cell',
        },
      }),
      Highlight.configure({
        multicolor: true,
      }),
      TaskList.configure({
        HTMLAttributes: {
          class: 'editor-task-list',
        },
      }),
      TaskItem.configure({
        nested: true,
        HTMLAttributes: {
          class: 'editor-task-item',
        },
      }),
      Link.configure({
        HTMLAttributes: {
          class: 'editor-link',
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'editor-image',
        },
      }),
    ],
    content: '',
  });

  function setContent(content: string) {
    try {
      editor.value?.commands.setContent(content);

      // The following code clears the history. Hopefully without side effects.
      const newEditorState = EditorState.create({
        doc: editor.value?.state.doc,
        plugins: editor.value?.state.plugins,
        schema: editor.value?.state.schema,
      });
      editor.value?.view.updateState(newEditorState);
    } catch (error) {
      console.error(error);
    }
  }

  return {
    editor,
    setContent,
  };
});
