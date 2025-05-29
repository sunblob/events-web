<script setup lang="ts">
import { computed, type Component } from 'vue';
import { storeToRefs } from 'pinia';
import { Toggle } from '@/components/ui/toggle';
import { Code2Icon, TextQuoteIcon } from 'lucide-vue-next';
import { useEditorStore } from '@/stores/editor';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

type NodeType = 'blockquote' | 'codeBlock';

const props = defineProps<{
  type: NodeType;
}>();

const store = useEditorStore();

const { editor } = storeToRefs(store);

const isActive = computed(() => editor.value?.isActive(props.type));

const nodeIcons: Record<NodeType, Component> = {
  blockquote: TextQuoteIcon,
  codeBlock: Code2Icon,
};

const toggleNode = () => {
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
