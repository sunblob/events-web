<script setup lang="ts">
import { computed, type Component } from 'vue';
import { storeToRefs } from 'pinia';
import { useEditorStore } from '@/stores/editor';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { TableIcon, TableCellsMergeIcon, TableCellsSplitIcon } from 'lucide-vue-next';
import TableButton from './TableButton.vue';
import {
  TablePlus,
  TableMinus,
  RowAddAfter,
  RowAddBefore,
  ColumnAddAfter,
  ColumnAddBefore,
  RowDelete,
  ColumnDelete,
  ToggleHeader,
} from '@/components/icons';

const store = useEditorStore();

const { editor } = storeToRefs(store);

type TableMenu = {
  label: string;
  icon: Component;
  action: () => void;
  ignoreDisabled?: boolean;
};

const tableMenu: TableMenu[] = [
  {
    label: 'Insert Table',
    icon: TablePlus,
    action: () => editor?.value?.chain().focus().insertTable().run(),
    ignoreDisabled: true,
  },
  {
    label: 'Delete Table',
    icon: TableMinus,
    action: () => editor?.value?.chain().focus().deleteTable().run(),
  },
  {
    label: 'Add Row After',
    icon: RowAddAfter,
    action: () => editor?.value?.chain().focus().addRowAfter().run(),
  },
  {
    label: 'Add Row Before',
    icon: RowAddBefore,
    action: () => editor?.value?.chain().focus().addRowBefore().run(),
  },
  {
    label: 'Delete Row',
    icon: RowDelete,
    action: () => editor?.value?.chain().focus().deleteRow().run(),
  },
  {
    label: 'Add Column After',
    icon: ColumnAddAfter,
    action: () => editor?.value?.chain().focus().addColumnAfter().run(),
  },
  {
    label: 'Add Column Before',
    icon: ColumnAddBefore,
    action: () => editor?.value?.chain().focus().addColumnBefore().run(),
  },
  {
    label: 'Delete Column',
    icon: ColumnDelete,
    action: () => editor?.value?.chain().focus().deleteColumn().run(),
  },
  {
    label: 'Toggle Header',
    icon: ToggleHeader,
    action: () => editor?.value?.chain().focus().toggleHeaderRow().run(),
  },
  {
    label: 'Merge Cells',
    icon: TableCellsMergeIcon,
    action: () => editor?.value?.chain().focus().mergeCells().run(),
  },
  {
    label: 'Split Cell',
    icon: TableCellsSplitIcon,
    action: () => editor?.value?.chain().focus().splitCell().run(),
  },
];

const isDisabled = computed(() => {
  if (!editor.value) return true;
  if (
    editor.value.isActive('codeBlock') ||
    editor.value.isActive('bulletList') ||
    editor.value.isActive('orderedList') ||
    editor.value.isActive('taskList') ||
    editor.value.isActive('heading')
  )
    return true;
  return false;
});
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" size="icon" :disabled="isDisabled">
        <TableIcon class="h-4 w-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <div class="grid grid-cols-3 gap-2">
        <TableButton v-for="cell in tableMenu" :key="cell.label" :cell="cell" />
      </div>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
