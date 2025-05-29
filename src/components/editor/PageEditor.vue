<script setup lang="ts">
import { computed } from 'vue';

import { EditorContent } from '@tiptap/vue-3';

import { ListIcon, TextQuoteIcon, SquareCodeIcon } from 'lucide-vue-next';

import { Toggle } from '@/components/ui/toggle';
import MarkButton from './MarkButton.vue';
import UndoRedoButton from './UndoRedoButton.vue';
import { useEditorStore } from '@/stores/editor';
import { storeToRefs } from 'pinia';
import ListDropdownMenu from './ListDropdownMenu.vue';
import Separator from '../ui/separator/Separator.vue';
import NodeButton from './NodeButton.vue';

const store = useEditorStore();

const { editor } = storeToRefs(store);

const getJSON = () => {
  console.log(store.editor?.getJSON());
};
</script>

<template>
  <div class="border rounded-md overflow-clip">
    <div v-if="editor" class="sticky top-0 flex items-center gap-1 p-1 bg-background border-b">
      <div class="flex items-center gap-1">
        <UndoRedoButton action="undo" />
        <UndoRedoButton action="redo" />
      </div>
      <Separator orientation="vertical" class="data-[orientation=vertical]:h-4" />
      <div class="flex items-center gap-1">
        <MarkButton type="bold" />
        <MarkButton type="italic" />
        <MarkButton type="strike" />
        <MarkButton type="code" />
        <MarkButton type="underline" />
      </div>
      <Separator orientation="vertical" class="data-[orientation=vertical]:h-4" />
      <div class="flex items-center gap-1">
        <NodeButton type="blockquote" />
        <NodeButton type="codeBlock" />
      </div>

      <div>
        <ListDropdownMenu :types="['bulletList', 'orderedList', 'taskList']" />
      </div>
    </div>
    <EditorContent :editor="editor" role="presentation" class="h-full" />
    <button @click="getJSON">Get JSON</button>
  </div>
</template>

<style>
.tiptap.ProseMirror {
  min-height: 100%;
  padding: 0.5rem 1rem;
}

.tiptap.ProseMirror ul,
.tiptap.ProseMirror ol {
  padding-left: 1rem;
  list-style: initial;
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

.ProseMirror pre {
  white-space: pre-wrap;
}
</style>
