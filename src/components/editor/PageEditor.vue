<script setup lang="ts">
import { watchEffect } from 'vue';

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
import { useDebounceFn } from '@vueuse/core';

import Separator from '@/components/ui/separator/Separator.vue';

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

const { content } = defineProps<{
  content: string;
}>();

const emit = defineEmits<{
  (e: 'update:content', content: string): void;
}>();

const debouncedUpdate = useDebounceFn((content: string) => {
  emit('update:content', content);
}, 300);

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
      codeBlock: {
        HTMLAttributes: {
          class: 'editor-code-block',
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
      HTMLAttributes: {
        class: 'editor-table',
      },
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
      HTMLAttributes: {
        class: 'editor-highlight',
      },
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

watchEffect(() => {
  debouncedUpdate(editor.value?.getHTML() ?? '');
});
</script>

<template>
  <div class="flex flex-col border rounded-md overflow-clip flex-1">
    <div
      v-if="editor"
      class="sticky top-0 flex items-center gap-1 p-1 px-4 bg-background border-b overflow-x-auto z-10"
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
</style>
