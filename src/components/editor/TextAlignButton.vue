<script setup lang="ts">
import { computed, type Component } from 'vue';
import { storeToRefs } from 'pinia';
import { AlignLeftIcon, AlignCenterIcon, AlignRightIcon, AlignJustifyIcon } from 'lucide-vue-next';

import { Toggle } from '@/components/ui/toggle';
import { useEditorStore } from '@/stores/editor';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

type TextAlignType = 'left' | 'center' | 'right' | 'justify';

const props = defineProps<{
  alignment: TextAlignType;
}>();

const store = useEditorStore();

const { editor } = storeToRefs(store);

const isActive = computed(() => editor.value?.isActive({ textAlign: props.alignment }));
const isDisabled = computed(() => {
  if (!editor.value) return true;
  if (editor.value.isActive('codeBlock')) return true;
  return false;
});

const textAlignIcons: Record<TextAlignType, Component> = {
  left: AlignLeftIcon,
  center: AlignCenterIcon,
  right: AlignRightIcon,
  justify: AlignJustifyIcon,
};

const setAlign = () => {
  if (!editor.value) return;
  editor.value.chain().focus().setTextAlign(props.alignment).run();
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
          <component :is="textAlignIcons[props.alignment]" class="h-4 w-4" />
        </Toggle>
      </TooltipTrigger>
      <TooltipContent>
        <p class="capitalize">Align {{ props.alignment }}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>
