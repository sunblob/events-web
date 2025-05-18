<script setup lang="ts">
import { computed } from 'vue';
import { storeToRefs } from 'pinia';

import { UndoIcon, RedoIcon } from 'lucide-vue-next';
import { useEditorStore } from '@/stores/editor';
import { Toggle } from '@/components/ui/toggle';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

type HistoryAction = 'undo' | 'redo';

const props = defineProps<{
  action: HistoryAction;
}>();

const historyIcons = {
  undo: UndoIcon,
  redo: RedoIcon,
};

const store = useEditorStore();

const { editor } = storeToRefs(store);

const canExecute = computed(() => {
  if (!editor.value) return false;

  return props.action === 'undo' ? editor.value.can().undo() : editor.value.can().redo();
});

const execute = () => {
  if (!editor.value) return;
  const chain = editor.value.chain().focus();
  return props.action === 'undo' ? chain.undo().run() : chain.redo().run();
};
</script>

<template>
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger as-child>
        <Toggle :disabled="!canExecute" @click="execute">
          <component :is="historyIcons[props.action]" class="h-4 w-4" />
        </Toggle>
      </TooltipTrigger>
      <TooltipContent>
        <p class="capitalize">{{ props.action }}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>
