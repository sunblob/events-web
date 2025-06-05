<script setup lang="ts">
import { computed, type Component } from 'vue';

import { Editor } from '@tiptap/vue-3';
import { BoldIcon, ItalicIcon, StrikethroughIcon, Code2Icon, UnderlineIcon } from 'lucide-vue-next';

import { Toggle } from '@/components/ui/toggle';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

type MarkType = 'bold' | 'italic' | 'strike' | 'code' | 'underline';

const { editor, type } = defineProps<{
  editor: Editor;
  type: MarkType;
}>();

const isActive = computed(() => editor.isActive(type));
const isDisabled = computed(() => {
  if (!editor) return true;
  if (editor.isActive('codeBlock')) return true;
  return false;
});

const markIcons: Record<MarkType, Component> = {
  bold: BoldIcon,
  italic: ItalicIcon,
  strike: StrikethroughIcon,
  code: Code2Icon,
  underline: UnderlineIcon,
};

// const markShortcuts: Record<MarkType, string> = {
//   bold: 'Ctrl+b',
//   italic: 'Ctrl+i',
//   strike: 'Ctrl+Shift+s',
//   code: 'Ctrl+e',
//   underline: 'Ctrl+u',
// };

const toggleMark = () => {
  if (!editor) return;
  editor.chain().focus().toggleMark(type).run();
};
</script>

<template>
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger as-child>
        <Toggle
          :data-state="isActive ? 'on' : 'off'"
          :state="isActive ? 'on' : 'off'"
          :disabled="isDisabled"
          @click="toggleMark"
        >
          <component :is="markIcons[type]" class="h-4 w-4" />
        </Toggle>
      </TooltipTrigger>
      <TooltipContent>
        <p class="capitalize">{{ type }}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>
