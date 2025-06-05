<script setup lang="ts">
import { type Component, computed } from 'vue';

import { Editor } from '@tiptap/vue-3';

import { Button } from '@/components/ui/button';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';

type TableCell = {
  label: string;
  icon: Component;
  action: () => void;
  ignoreDisabled?: boolean;
};

const { editor, cell } = defineProps<{
  editor: Editor;
  cell: TableCell;
}>();

const isActive = computed(() => editor.isActive('table'));
</script>

<template>
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger as-child>
        <Button
          variant="ghost"
          size="icon"
          :disabled="!isActive && !cell.ignoreDisabled"
          @click="cell.action"
        >
          <component :is="cell.icon" class="h-4 w-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        {{ cell.label }}
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>
