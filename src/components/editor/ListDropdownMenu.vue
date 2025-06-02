<script setup lang="ts">
import { computed, type Component } from 'vue';

import { ListIcon, ChevronDownIcon, ListOrderedIcon, ListTodoIcon } from 'lucide-vue-next';
import { storeToRefs } from 'pinia';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Toggle } from '@/components/ui/toggle';
import { useEditorStore } from '@/stores/editor';

type ListOption = {
  icon: Component;
  label: string;
  value: 'bulletList' | 'orderedList' | 'taskList';
};

type ListProps = {
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

const props = defineProps<ListProps>();

const store = useEditorStore();

const { editor } = storeToRefs(store);

const canToggleList = computed(() => {
  if (!editor.value) return false;

  return true;
});

const filteredOptions = computed(() =>
  listOptions.filter((option) => props.types.includes(option.value)),
);

const toggleList = (listType: ListOption['value']) => {
  if (!editor.value) return;

  if (listType === 'taskList') {
    editor.value.chain().focus().toggleTaskList().run();
  } else {
    editor.value.chain().focus().toggleList(listType, 'listItem').run();
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
          :data-state="editor?.isActive(option.value) ? 'on' : 'off'"
          :state="editor?.isActive(option.value) ? 'on' : 'off'"
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
