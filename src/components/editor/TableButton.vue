<script setup lang="ts">
import { type Component, computed } from 'vue';
import { storeToRefs } from 'pinia';

import { useEditorStore } from '@/stores/editor';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';

type TableCell = {
  label: string;
  icon: Component;
  action: () => void;
  ignoreDisabled?: boolean;
};

defineProps<{
  cell: TableCell;
}>();

const store = useEditorStore();

const { editor } = storeToRefs(store);

const isActive = computed(() => editor.value?.isActive('table'));
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
