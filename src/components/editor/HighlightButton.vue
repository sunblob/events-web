<script setup lang="ts">
import { computed } from 'vue';

import { Editor } from '@tiptap/vue-3';
import { BanIcon, PaintbrushIcon } from 'lucide-vue-next';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Toggle } from '@/components/ui/toggle';

type HighlightOption = {
  color: string;
  label: string;
};

const highlightOptions: HighlightOption[] = [
  { color: '#fca5a5', label: 'Red' },
  { color: '#86efac', label: 'Green' },
  { color: '#93c5fd', label: 'Blue' },
  { color: '#fde047', label: 'Yellow' },
  { color: '#d8b4fe', label: 'Purple' },
];

const { editor } = defineProps<{
  editor: Editor;
}>();

const isDisabled = computed(() => {
  if (!editor) return true;
  if (editor.isActive('codeBlock') || editor.isActive('code') || editor.isActive('imageUpload'))
    return true;
  return false;
});

const toggleHighlight = (color: string) => {
  editor?.chain().focus().toggleHighlight({ color }).run();
};
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Toggle :disabled="isDisabled">
        <div class="flex items-center gap-1">
          <PaintbrushIcon class="h-4 w-4" />
        </div>
      </Toggle>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <div class="flex gap-2">
        <Toggle
          v-for="option in highlightOptions"
          :key="option.color"
          :data-state="editor.isActive('highlight', { color: option.color }) ? 'on' : 'off'"
          :state="editor.isActive('highlight', { color: option.color }) ? 'on' : 'off'"
          @click="toggleHighlight(option.color)"
        >
          <div :style="{ backgroundColor: option.color }" class="h-4 w-4 rounded-full" />
        </Toggle>
        <Toggle @click="editor.chain().focus().unsetHighlight().run()">
          <BanIcon class="h-4 w-4" />
        </Toggle>
      </div>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
