<script setup lang="ts">
import { computed } from 'vue';
import { storeToRefs } from 'pinia';

import { CornerDownLeftIcon, LinkIcon, Trash2Icon } from 'lucide-vue-next';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Toggle } from '@/components/ui/toggle';
import { Input } from '@/components/ui/input';
import { useEditorStore } from '@/stores/editor';
import { Button } from '@/components/ui/button';
import Separator from '../ui/separator/Separator.vue';

const store = useEditorStore();

const { editor } = storeToRefs(store);

const isActive = computed(() => editor.value?.isActive('link'));
const isDisabled = computed(() => {
  if (!editor.value) return true;
  if (
    editor.value.isActive('codeBlock') ||
    editor.value.isActive('code') ||
    editor.value.isActive('imageUpload')
  )
    return true;
  return false;
});
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Toggle
        :disabled="isDisabled"
        :data-state="isActive ? 'on' : 'off'"
        :state="isActive ? 'on' : 'off'"
      >
        <LinkIcon class="h-4 w-4" />
      </Toggle>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <div class="flex items-center gap-2">
        <Input type="text" placeholder="Enter link" />
        <Button variant="ghost" size="icon">
          <CornerDownLeftIcon class="h-4 w-4" />
        </Button>
        <Separator orientation="vertical" class="data-[orientation=vertical]:h-4" />
        <Button variant="ghost" size="icon">
          <Trash2Icon class="h-4 w-4" />
        </Button>
      </div>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
