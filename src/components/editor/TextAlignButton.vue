<script setup lang="ts">
import { computed, type Component } from 'vue';

import { Editor } from '@tiptap/vue-3';
import { AlignLeftIcon, AlignCenterIcon, AlignRightIcon, AlignJustifyIcon } from 'lucide-vue-next';

import { Toggle } from '@/components/ui/toggle';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

type TextAlignType = 'left' | 'center' | 'right' | 'justify';

const { editor, alignment } = defineProps<{
  editor: Editor;
  alignment: TextAlignType;
}>();

const isActive = computed(() => editor.isActive({ textAlign: alignment }));
const isDisabled = computed(() => {
  if (!editor) return true;
  if (editor.isActive('codeBlock')) return true;
  return false;
});

const textAlignIcons: Record<TextAlignType, Component> = {
  left: AlignLeftIcon,
  center: AlignCenterIcon,
  right: AlignRightIcon,
  justify: AlignJustifyIcon,
};

const setAlign = () => {
  if (!editor) return;
  editor.chain().focus().setTextAlign(alignment).run();
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
          @click="setAlign"
        >
          <component :is="textAlignIcons[alignment]" class="h-4 w-4" />
        </Toggle>
      </TooltipTrigger>
      <TooltipContent>
        <p class="capitalize">Align {{ alignment }}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>
