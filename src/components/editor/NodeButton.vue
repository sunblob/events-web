<script setup lang="ts">
import { computed, type Component } from 'vue';
import { storeToRefs } from 'pinia';
import { Toggle } from '@/components/ui/toggle';
import { SquareCodeIcon, TextQuoteIcon } from 'lucide-vue-next';
import { useEditorStore } from '@/stores/editor';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

type NodeType = 'blockquote' | 'codeBlock';

const nodeIcons: Record<NodeType, Component> = {
  blockquote: TextQuoteIcon,
  codeBlock: SquareCodeIcon,
};

const props = defineProps<{
  type: NodeType;
}>();

const store = useEditorStore();

const { editor } = storeToRefs(store);

const isActive = computed(() => editor.value?.isActive(props.type));
const canToggleNode = computed(() => {
  if (!editor.value) return false;

  try {
    return props.type === 'codeBlock'
      ? editor.value.can().toggleCodeBlock()
      : editor.value.can().toggleBlockquote();
  } catch {
    return false;
  }
});

const toggleNode = () => {
  if (!editor.value) return;

  if (props.type === 'blockquote') {
    editor.value.chain().focus().toggleBlockquote().run();
  } else {
    editor.value.chain().focus().toggleCodeBlock().run();
  }
};
</script>

<template>
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger as-child>
        <Toggle
          :data-state="isActive ? 'on' : 'off'"
          :state="isActive ? 'on' : 'off'"
          :disabled="!canToggleNode"
          @click="toggleNode"
        >
          <component :is="nodeIcons[props.type]" class="h-4 w-4" />
        </Toggle>
      </TooltipTrigger>
      <TooltipContent>
        <p class="capitalize">{{ props.type }}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>
