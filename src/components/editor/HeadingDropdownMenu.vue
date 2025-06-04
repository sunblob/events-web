<script setup lang="ts">
import { computed, type Component } from 'vue';

import { Editor } from '@tiptap/vue-3';
import {
  HeadingIcon,
  ChevronDownIcon,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  Heading4Icon,
} from 'lucide-vue-next';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Toggle } from '@/components/ui/toggle';

type HeadingOption = {
  icon: Component;
  label: string;
  level: 1 | 2 | 3 | 4;
};

const headingOptions: HeadingOption[] = [
  {
    icon: Heading1Icon,
    label: 'Heading 1',
    level: 1,
  },
  {
    icon: Heading2Icon,
    label: 'Heading 2',
    level: 2,
  },
  {
    icon: Heading3Icon,
    label: 'Heading 3',
    level: 3,
  },
  {
    icon: Heading4Icon,
    label: 'Heading 4',
    level: 4,
  },
];

const { editor } = defineProps<{
  editor: Editor;
}>();

const canToggleHeading = computed(() => {
  if (!editor) return false;

  if (
    editor.isActive('bulletList') ||
    editor.isActive('orderedList') ||
    editor.isActive('taskList')
  ) {
    return false;
  }

  return true;
});

const toggleHeading = (headingLevel: HeadingOption['level']) => {
  if (!editor) return;

  editor.chain().focus().toggleHeading({ level: headingLevel }).run();
};
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Toggle :disabled="!canToggleHeading">
        <div class="flex items-center gap-1">
          <HeadingIcon class="h-4 w-4" />
          <ChevronDownIcon class="size-3" />
        </div>
      </Toggle>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuItem v-for="option in headingOptions" :key="option.level" as-child>
        <Toggle
          :data-state="editor.isActive('heading', { level: option.level }) ? 'on' : 'off'"
          :state="editor.isActive('heading', { level: option.level }) ? 'on' : 'off'"
          @click="toggleHeading(option.level)"
          class="w-full justify-between"
        >
          <div class="flex items-center gap-2">
            <component :is="option.icon" class="h-4 w-4" />
            <span>{{ option.label }}</span>
          </div>
        </Toggle>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
