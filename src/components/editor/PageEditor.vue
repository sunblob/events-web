<script setup lang="ts">
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
import StarterKit from '@tiptap/starter-kit';
import { EditorContent, useEditor } from '@tiptap/vue-3';

import HeadingDropdownMenu from './HeadingDropdownMenu.vue';
import HighlightButton from './HighlightButton.vue';
import ImageButton from './ImageButton.vue';
import LinkButton from './LinkButton.vue';
import ListDropdownMenu from './ListDropdownMenu.vue';
import MarkButton from './MarkButton.vue';
import NodeButton from './NodeButton.vue';
import TableMenu from './TableMenu.vue';
import TextAlignButton from './TextAlignButton.vue';
import UndoRedoButton from './UndoRedoButton.vue';
import Separator from '../ui/separator/Separator.vue';

const { content } = defineProps<{
  content: string;
}>();

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
  content,
});
</script>

<template>
  <div class="flex flex-col border rounded-md overflow-clip flex-1">
    <div
      v-if="editor"
      class="sticky top-0 flex items-center gap-1 p-1 px-4 bg-background border-b overflow-x-auto"
    >
      <div class="flex items-center gap-1">
        <UndoRedoButton :editor action="undo" />
        <UndoRedoButton :editor action="redo" />
      </div>
      <Separator orientation="vertical" class="data-[orientation=vertical]:h-4" />

      <div class="flex items-center gap-1">
        <ListDropdownMenu :editor="editor" :types="['bulletList', 'orderedList', 'taskList']" />
        <HeadingDropdownMenu :editor="editor" />
        <NodeButton :editor="editor" type="blockquote" />
        <NodeButton :editor="editor" type="codeBlock" />
        <TableMenu :editor="editor" />
      </div>
      <Separator orientation="vertical" class="data-[orientation=vertical]:h-4" />
      <div class="flex items-center gap-1">
        <MarkButton :editor="editor" type="bold" />
        <MarkButton :editor="editor" type="italic" />
        <MarkButton :editor="editor" type="strike" />
        <MarkButton :editor="editor" type="code" />
        <MarkButton :editor="editor" type="underline" />
        <HighlightButton :editor="editor" />
        <LinkButton :editor="editor" />
      </div>
      <Separator orientation="vertical" class="data-[orientation=vertical]:h-4" />
      <div class="flex items-center gap-1">
        <TextAlignButton :editor="editor" alignment="left" />
        <TextAlignButton :editor="editor" alignment="center" />
        <TextAlignButton :editor="editor" alignment="right" />
        <TextAlignButton :editor="editor" alignment="justify" />
      </div>
      <Separator orientation="vertical" class="data-[orientation=vertical]:h-4" />
      <ImageButton :editor="editor" />
    </div>
    <EditorContent :editor="editor" role="presentation" class="flex-1" />
  </div>
</template>

<style>
.tiptap.ProseMirror {
  min-height: 100%;
  padding: 0.5rem 1rem;
}

.tiptap.ProseMirror ul,
.tiptap.ProseMirror ol {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  padding-left: 1rem;
  list-style: initial;
}

.tiptap.ProseMirror ul[data-type='taskList'] {
  padding-left: 0.25rem;
}

.tiptap.ProseMirror ol {
  list-style: decimal;
}

.tiptap.ProseMirror ul[data-type='taskList'] li:not(:has(> p:first-child)) {
  list-style-type: none;
}
.tiptap.ProseMirror ul[data-type='taskList'] li {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
}

.tiptap.ProseMirror ul[data-type='taskList'] li label {
  position: relative;
  padding-top: 4px;
  padding-right: 8px;
}

.tiptap.ProseMirror [contenteditable='false'] {
  white-space: normal;
}

.tiptap.ProseMirror h1,
.tiptap.ProseMirror h2,
.tiptap.ProseMirror h3,
.tiptap.ProseMirror h4 {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  font-weight: 700;
}

.tiptap.ProseMirror h1 {
  font-size: 2rem;
}

.tiptap.ProseMirror h2 {
  font-size: 1.75rem;
}

.tiptap.ProseMirror h3 {
  font-size: 1.5rem;
}

.tiptap.ProseMirror h4 {
  font-size: 1.25rem;
}

.tiptap.ProseMirror blockquote {
  position: relative;
  padding-left: 1em;
  padding-top: 0.375em;
  padding-bottom: 0.375em;
  margin: 1.5rem 0;
}

.tiptap.ProseMirror blockquote:before {
  position: absolute;
  bottom: 0;
  left: 0;
  top: 0;
  height: 100%;
  width: 0.25em;
  background-color: var(--border);
  content: '';
  border-radius: 0;
}

.tiptap.ProseMirror pre {
  background-color: var(--border);
  color: var(--foreground);
  border: 1px solid var(--muted-foreground);
  margin-top: 1.5em;
  margin-bottom: 1.5em;
  padding: 1em;
  font-size: 1rem;
  border-radius: 6px / 0.375rem;
}

.tiptap.ProseMirror pre {
  white-space: pre-wrap;
}

.tiptap.ProseMirror table {
  border-collapse: collapse;
  margin: 0;
  overflow: hidden;
  table-layout: fixed;
  width: 100%;
}

.tiptap.ProseMirror tr {
  border-color: var(--muted-foreground);
}

.tiptap.ProseMirror table th {
  background-color: var(--border);
  font-weight: 700;
  text-align: left;
}

.tiptap.ProseMirror table td,
.tiptap.ProseMirror table th {
  border: 1px solid var(--muted-foreground);
  box-sizing: border-box;
  min-width: 1em;
  padding: 6px 8px;
  position: relative;
  vertical-align: top;
}

.tiptap.ProseMirror table td.selectedCell {
  background-color: var(--muted);
}

.tiptap.ProseMirror table th.selectedCell {
  background-color: var(--muted-foreground);
  border: 1px solid var(--border);
}

.tiptap.ProseMirror .tableWrapper {
  margin: 1.5rem 0;
  overflow-x: auto;
}

.tiptap.ProseMirror.resize-cursor {
  cursor: ew-resize;
}

.tiptap.ProseMirror p.is-editor-empty:first-child:before {
  color: var(--border);
  content: attr(data-placeholder);
  float: left;
  height: 0;
  pointer-events: none;
}

.tiptap.ProseMirror h1.is-editor-empty:first-child:before,
.tiptap.ProseMirror h2.is-editor-empty:first-child:before,
.tiptap.ProseMirror h3.is-editor-empty:first-child:before,
.tiptap.ProseMirror h4.is-editor-empty:first-child:before {
  color: var(--border);
  content: attr(data-placeholder);
  float: left;
  height: 0;
  pointer-events: none;
}

.tiptap.ProseMirror a {
  color: blue;
  text-decoration: underline;
  cursor: pointer;
}
</style>
