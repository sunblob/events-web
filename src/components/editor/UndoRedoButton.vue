<script setup lang="ts">
import { computed } from 'vue';

import { Editor } from '@tiptap/vue-3';
import { Undo2Icon, Redo2Icon } from 'lucide-vue-next';

import { Toggle } from '@/components/ui/toggle';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

type HistoryAction = 'undo' | 'redo';

const { editor, action } = defineProps<{
  editor: Editor;
  action: HistoryAction;
}>();

const historyIcons = {
  undo: Undo2Icon,
  redo: Redo2Icon,
};

const canExecute = computed(() => {
  if (!editor) return false;

  return action === 'undo' ? editor.can().undo() : editor.can().redo();
});

const execute = () => {
  if (!editor) return;
  const chain = editor.chain().focus();
  return action === 'undo' ? chain.undo().run() : chain.redo().run();
};
</script>

<template>
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger as-child>
        <Toggle :disabled="!canExecute" @click="execute">
          <component :is="historyIcons[action]" class="h-4 w-4" />
        </Toggle>
      </TooltipTrigger>
      <TooltipContent>
        <p class="capitalize">{{ action }}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>
