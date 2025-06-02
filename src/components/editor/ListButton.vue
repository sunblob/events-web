<script setup lang="ts">
import { storeToRefs } from 'pinia';

import { useEditorStore } from '@/stores/editor';

type ListType = 'bulletList' | 'orderedList' | 'taskList';

const props = defineProps<{
  listType: ListType;
}>();

const { editor } = storeToRefs(useEditorStore());
</script>

<template>
  <div class="flex items-center gap-2">
    {{ listType }}
  </div>
</template>
