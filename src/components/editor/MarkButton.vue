<script setup lang="ts">
import { computed, type Component } from 'vue';
import { storeToRefs } from 'pinia';
import { Toggle } from '@/components/ui/toggle';
import { BoldIcon, ItalicIcon, StrikethroughIcon, Code2Icon, UnderlineIcon } from 'lucide-vue-next';
import { useEditorStore } from '@/stores/editor';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

type MarkType = 'bold' | 'italic' | 'strike' | 'code' | 'underline';

const props = defineProps<{
  type: MarkType;
}>();

const store = useEditorStore();

const { editor } = storeToRefs(store);

const isActive = computed(() => editor.value?.isActive(props.type));
const isDisabled = computed(() => {
  if (!editor.value) return true;
  if (editor.value.isActive('codeBlock')) return true;
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
  if (!editor.value) return;
  editor.value.chain().focus().toggleMark(props.type).run();
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
          <component :is="markIcons[props.type]" class="h-4 w-4" />
        </Toggle>
      </TooltipTrigger>
      <TooltipContent>
        <p class="capitalize">{{ props.type }}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>
