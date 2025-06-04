<script setup lang="ts">
import { computed, type Component } from 'vue';

import { Editor } from '@tiptap/vue-3';
import { SquareCodeIcon, TextQuoteIcon } from 'lucide-vue-next';

import { Toggle } from '@/components/ui/toggle';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

type NodeType = 'blockquote' | 'codeBlock';

const nodeIcons: Record<NodeType, Component> = {
  blockquote: TextQuoteIcon,
  codeBlock: SquareCodeIcon,
};

const { editor, type } = defineProps<{
  type: NodeType;
  editor: Editor;
}>();

const isActive = computed(() => editor.isActive(type));
const canToggleNode = computed(() => {
  if (!editor) return false;

  try {
    return type === 'codeBlock' ? editor.can().toggleCodeBlock() : editor.can().toggleBlockquote();
  } catch {
    return false;
  }
});

const toggleNode = () => {
  if (!editor) return;

  if (type === 'blockquote') {
    editor.chain().focus().toggleBlockquote().run();
  } else {
    editor.chain().focus().toggleCodeBlock().run();
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
          <component :is="nodeIcons[type]" class="h-4 w-4" />
        </Toggle>
      </TooltipTrigger>
      <TooltipContent>
        <p class="capitalize">{{ type }}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>
