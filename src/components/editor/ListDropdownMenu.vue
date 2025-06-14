<script setup lang="ts">
import { computed, type Component } from 'vue';

import { Editor } from '@tiptap/vue-3';
import { ListIcon, ChevronDownIcon, ListOrderedIcon, ListTodoIcon } from 'lucide-vue-next';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Toggle } from '@/components/ui/toggle';

type ListOption = {
  icon: Component;
  label: string;
  value: 'bulletList' | 'orderedList' | 'taskList';
};

type ListProps = {
  editor: Editor;
  types: ('bulletList' | 'orderedList' | 'taskList')[];
};

const listOptions: ListOption[] = [
  {
    icon: ListIcon,
    label: 'Bullet List',
    value: 'bulletList',
  },
  {
    icon: ListOrderedIcon,
    label: 'Ordered List',
    value: 'orderedList',
  },
  {
    icon: ListTodoIcon,
    label: 'Task List',
    value: 'taskList',
  },
];

const { editor, types } = defineProps<ListProps>();

const canToggleList = computed(() => {
  if (!editor) return false;

  return true;
});

const filteredOptions = computed(() =>
  listOptions.filter((option) => types.includes(option.value)),
);

const toggleList = (listType: ListOption['value']) => {
  if (!editor) return;

  if (listType === 'taskList') {
    editor.chain().focus().toggleTaskList().run();
  } else {
    editor.chain().focus().toggleList(listType, 'listItem').run();
  }
};
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Toggle :disabled="!canToggleList">
        <div class="flex items-center gap-1">
          <ListIcon class="h-4 w-4" />
          <ChevronDownIcon class="size-3" />
        </div>
      </Toggle>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuItem v-for="option in filteredOptions" :key="option.value" as-child>
        <!-- <ListButton :list-type="option.value" /> -->
        <Toggle
          :data-state="editor.isActive(option.value) ? 'on' : 'off'"
          :state="editor.isActive(option.value) ? 'on' : 'off'"
          @click="toggleList(option.value)"
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
