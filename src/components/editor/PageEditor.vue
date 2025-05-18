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

const store = useEditorStore();

const { editor } = storeToRefs(store);

const isList = computed(() => editor.value?.isActive('bulletList'));

const getJSON = () => {
  console.log(store.editor?.getJSON());
};
</script>

<template>
  <div>
    <div v-if="editor" class="flex items-center gap-1">
      <div class="flex items-center gap-1">
        <UndoRedoButton action="undo" />
        <UndoRedoButton action="redo" />
      </div>
      <div class="flex items-center gap-1">
        <MarkButton type="bold" />
        <MarkButton type="italic" />
        <MarkButton type="strike" />
        <MarkButton type="code" />
        <MarkButton type="underline" />
      </div>
      <div class="flex items-center gap-1">
        <Toggle>
          <TextQuoteIcon class="h-4 w-4" />
        </Toggle>
        <Toggle>
          <SquareCodeIcon class="h-4 w-4" />
        </Toggle>
      </div>

      <div>
        <ListDropdownMenu />
      </div>
    </div>
    <EditorContent :editor="editor" role="presentation" />
    <button @click="getJSON">Get JSON</button>
  </div>
</template>

<style>
ul,
ol {
  padding-left: 1rem;
  list-style: initial;
}
</style>
