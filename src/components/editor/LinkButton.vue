<script setup lang="ts">
import { computed, ref } from 'vue';

import { Editor } from '@tiptap/vue-3';
import { CornerDownLeftIcon, LinkIcon, Trash2Icon } from 'lucide-vue-next';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Toggle } from '@/components/ui/toggle';

import Separator from '../ui/separator/Separator.vue';

const { editor } = defineProps<{
  editor: Editor;
}>();

const isActive = computed(() => editor.isActive('link'));
const isDisabled = computed(() => {
  if (!editor) return true;
  if (editor.isActive('codeBlock') || editor.isActive('code') || editor.isActive('imageUpload'))
    return true;
  return false;
});

const link = ref('');
const isOpen = ref(false);
const toggleMenu = (value: boolean) => {
  if (value) {
    link.value = editor.getAttributes('link')?.href || '';
  }
};

const addLink = () => {
  if (!editor) return;

  if (link.value === '' || !link.value.startsWith('http')) {
    return;
  }

  editor.chain().focus().extendMarkRange('link').setLink({ href: link.value }).run();
};

const removeLink = () => {
  if (!editor) return;
  editor.chain().focus().unsetLink().run();

  link.value = '';
  isOpen.value = false;
};
</script>

<template>
  <DropdownMenu v-model:open="isOpen" @update:open="toggleMenu">
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
        <Input type="url" placeholder="Enter link" v-model="link" @keyup.enter="addLink" />
        <Button variant="ghost" size="icon" @click="addLink">
          <CornerDownLeftIcon class="h-4 w-4" />
        </Button>
        <Separator orientation="vertical" class="data-[orientation=vertical]:h-4" />
        <Button variant="ghost" size="icon" @click="removeLink">
          <Trash2Icon class="h-4 w-4" />
        </Button>
      </div>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
