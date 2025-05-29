<script setup lang="ts">
import { PaintbrushIcon } from 'lucide-vue-next';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Toggle } from '@/components/ui/toggle';

const highlightOptions = [{ color: '' }];
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Toggle>
        <div class="flex items-center gap-1">
          <PaintbrushIcon class="h-4 w-4" />
        </div>
      </Toggle>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuItem v-for="option in listOptions" :key="option.value" as-child>
        <ListButton :list-type="option.value" :editor="editor" />
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
