<script setup lang="ts">
import { useEditorStore } from '@/stores/editor';
import { storeToRefs } from 'pinia';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Toggle } from '@/components/ui/toggle';
import { ListIcon, ChevronDownIcon, ListOrderedIcon, ListTodoIcon } from 'lucide-vue-next';
import { computed, type Component } from 'vue';

type ListType = 'bulletList' | 'orderedList' | 'taskList';

type ListOption = {
  icon: Component;
  label: string;
  value: ListType;
};

type ListProps = {
  listTypes: ListType[];
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
});
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Toggle>
        <div class="flex items-center gap-1">
          <ListIcon class="h-4 w-4" />
          <ChevronDownIcon class="size-3" />
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
