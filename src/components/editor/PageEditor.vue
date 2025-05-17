<script setup lang="ts">
import { computed, watchEffect } from 'vue';

import { EditorContent, useEditor } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import Typography from '@tiptap/extension-typography';

import { Toggle } from '@/components/ui/toggle';
import { BoldIcon, CodeIcon, ItalicIcon, StrikethroughIcon, ListIcon } from 'lucide-vue-next';

const editor = useEditor({
  extensions: [StarterKit, TextAlign, Typography],
  content: '<p>Hello World</p>',
});

const isBold = computed(() => editor.value?.isActive('bold'));
const isItalic = computed(() => editor.value?.isActive('italic'));
const isStrike = computed(() => editor.value?.isActive('strike'));
const isCode = computed(() => editor.value?.isActive('code'));
const isList = computed(() => editor.value?.isActive('bulletList'));

watchEffect(() => {
  console.log('isBold', isBold.value);
  console.log('isItalic', isItalic.value);
  console.log('isStrike', isStrike.value);
  console.log('isCode', isCode.value);
  console.log('isList', isList.value);
});

const getJSON = () => {
  console.log(editor.value?.getJSON());
};
</script>

<template>
  <div>
    <div v-if="editor" class="flex items-center gap-1">
      <Toggle
        v-model="isBold"
        aria-label="Toggle bold"
        @click="editor.chain().focus().toggleBold().run()"
      >
        <BoldIcon class="h-4 w-4" />
      </Toggle>
      <Toggle
        v-model="isItalic"
        aria-label="Toggle italic"
        @click="editor.chain().focus().toggleItalic().run()"
      >
        <ItalicIcon class="h-4 w-4" />
      </Toggle>
      <Toggle
        v-model="isStrike"
        aria-label="Toggle strike"
        @click="editor.chain().focus().toggleStrike().run()"
      >
        <StrikethroughIcon class="h-4 w-4" />
      </Toggle>
      <Toggle
        v-model="isCode"
        aria-label="Toggle code"
        @click="editor.chain().focus().toggleCode().run()"
      >
        <CodeIcon class="h-4 w-4" />
      </Toggle>
      <Toggle
        :pressed="isList"
        aria-label="Toggle list"
        @click="editor.chain().focus().toggleBulletList().run()"
      >
        <ListIcon class="h-4 w-4" />
      </Toggle>
    </div>
    <EditorContent :editor="editor" />
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
