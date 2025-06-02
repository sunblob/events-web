<script setup lang="ts">
import { storeToRefs } from 'pinia';

import { EditorContent } from '@tiptap/vue-3';
import { useEditorStore } from '@/stores/editor';

import MarkButton from './MarkButton.vue';
import UndoRedoButton from './UndoRedoButton.vue';
import ListDropdownMenu from './ListDropdownMenu.vue';
import Separator from '../ui/separator/Separator.vue';
import NodeButton from './NodeButton.vue';
import HeadingDropdownMenu from './HeadingDropdownMenu.vue';
import LinkButton from './LinkButton.vue';
import TableMenu from './TableMenu.vue';
import TextAlignButton from './TextAlignButton.vue';
import ImageButton from './ImageButton.vue';
import HighlightButton from './HighlightButton.vue';

const store = useEditorStore();

const { editor } = storeToRefs(store);

const getJSON = () => {
  console.log(store.editor?.getJSON());
};
</script>

<template>
  <div class="border rounded-md overflow-clip">
    <div v-if="editor" class="sticky top-0 flex items-center gap-1 p-1 px-4 bg-background border-b">
      <div class="flex items-center gap-1">
        <UndoRedoButton action="undo" />
        <UndoRedoButton action="redo" />
      </div>
      <Separator orientation="vertical" class="data-[orientation=vertical]:h-4" />

      <div class="flex items-center gap-1">
        <ListDropdownMenu :types="['bulletList', 'orderedList', 'taskList']" />
        <HeadingDropdownMenu />
        <NodeButton type="blockquote" />
        <NodeButton type="codeBlock" />
        <TableMenu />
      </div>
      <Separator orientation="vertical" class="data-[orientation=vertical]:h-4" />
      <div class="flex items-center gap-1">
        <MarkButton type="bold" />
        <MarkButton type="italic" />
        <MarkButton type="strike" />
        <MarkButton type="code" />
        <MarkButton type="underline" />
        <HighlightButton />
        <LinkButton />
      </div>
      <Separator orientation="vertical" class="data-[orientation=vertical]:h-4" />
      <div class="flex items-center gap-1">
        <TextAlignButton alignment="left" />
        <TextAlignButton alignment="center" />
        <TextAlignButton alignment="right" />
        <TextAlignButton alignment="justify" />
      </div>
      <Separator orientation="vertical" class="data-[orientation=vertical]:h-4" />
      <ImageButton />
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
