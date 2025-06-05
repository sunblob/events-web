<script setup lang="ts">
import { computed, type Component } from 'vue';

import { Editor } from '@tiptap/vue-3';
import { TableIcon, TableCellsMergeIcon, TableCellsSplitIcon } from 'lucide-vue-next';

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
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import TableButton from './TableButton.vue';

const { editor } = defineProps<{
  editor: Editor;
}>();

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
    action: () => editor?.chain().focus().insertTable().run(),
    ignoreDisabled: true,
  },
  {
    label: 'Delete Table',
    icon: TableMinus,
    action: () => editor?.chain().focus().deleteTable().run(),
  },
  {
    label: 'Add Row After',
    icon: RowAddAfter,
    action: () => editor?.chain().focus().addRowAfter().run(),
  },
  {
    label: 'Add Row Before',
    icon: RowAddBefore,
    action: () => editor?.chain().focus().addRowBefore().run(),
  },
  {
    label: 'Delete Row',
    icon: RowDelete,
    action: () => editor?.chain().focus().deleteRow().run(),
  },
  {
    label: 'Add Column After',
    icon: ColumnAddAfter,
    action: () => editor?.chain().focus().addColumnAfter().run(),
  },
  {
    label: 'Add Column Before',
    icon: ColumnAddBefore,
    action: () => editor?.chain().focus().addColumnBefore().run(),
  },
  {
    label: 'Delete Column',
    icon: ColumnDelete,
    action: () => editor?.chain().focus().deleteColumn().run(),
  },
  {
    label: 'Toggle Header',
    icon: ToggleHeader,
    action: () => editor?.chain().focus().toggleHeaderRow().run(),
  },
  {
    label: 'Merge Cells',
    icon: TableCellsMergeIcon,
    action: () => editor?.chain().focus().mergeCells().run(),
  },
  {
    label: 'Split Cell',
    icon: TableCellsSplitIcon,
    action: () => editor?.chain().focus().splitCell().run(),
  },
];

const isDisabled = computed(() => {
  if (!editor) return true;
  if (
    editor.isActive('codeBlock') ||
    editor.isActive('bulletList') ||
    editor.isActive('orderedList') ||
    editor.isActive('taskList') ||
    editor.isActive('heading')
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
        <TableButton v-for="cell in tableMenu" :key="cell.label" :cell="cell" :editor="editor" />
      </div>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
