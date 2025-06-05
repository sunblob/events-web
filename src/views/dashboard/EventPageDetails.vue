<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';

import { toTypedSchema } from '@vee-validate/zod';
import { useRouteParams } from '@vueuse/router';
import { PlusIcon, TrashIcon } from 'lucide-vue-next';
import { useForm } from 'vee-validate';
import { toast } from 'vue-sonner';
import { z } from 'zod';

import PageEditor from '@/components/editor/PageEditor.vue';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Api } from '@/lib/api';
import { FILE_URL } from '@/lib/constants';
import type { ConferencePage } from '@/lib/types';
import { useEventStore } from '@/stores/events';

const eventStore = useEventStore();

const id = useRouteParams<string>('pageId');

const page = ref<ConferencePage | null>(null);

const newFile = ref<File | null>(null);
const isOpen = ref(false);

const handleFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement;

  if (target.files?.[0]) {
    newFile.value = target.files[0];
  }
};

const pageFiles = computed(
  () => page.value?.files?.filter((file) => file.is_editor_only === 0) ?? [],
);

const formSchema = toTypedSchema(
  z.object({
    title: z.string().min(1, { message: 'Title is required' }),
    content: z.string().optional(),
  }),
);

const { errors, handleSubmit, defineField } = useForm({
  validationSchema: formSchema,
});

const [title, titleAttrs] = defineField('title');
const [content, contentAttrs] = defineField('content');

const onSubmit = handleSubmit(async (values) => {
  toast.promise(
    eventStore.updatePage(id.value, { ...values, event_year_id: page.value?.event_year_id }),
    {
      loading: 'Updating page...',
      success: () => {
        return 'Page updated';
      },
      error: (error: Error) => {
        console.warn('error', error);
        return 'Failed to update page';
      },
    },
  );
});

const deleteFile = async (fileId: number | string, fileName: string) => {
  if (page.value?.id) {
    await Promise.all([
      Api.deleteFile(fileName),
      Api.deleteFileFromPage(page.value.id, fileId),
      toast.success(`${fileName} deleted`),
    ]);
  }
};

const onDeleteFile = (fileId: number | string, fileName: string) => {
  toast.promise(deleteFile(fileId, fileName), {
    loading: 'Deleting file...',
    success: async () => {
      page.value = await eventStore.getPageById(id.value);

      return 'File deleted';
    },
    error: (error: Error) => error.message,
  });
};

const handleUpload = async () => {
  if (newFile.value) {
    toast.promise(Api.uploadImage(id.value, newFile.value, false), {
      loading: 'Uploading file...',
      success: async () => {
        isOpen.value = false;
        page.value = await eventStore.getPageById(id.value);

        return 'File uploaded';
      },
    });

    newFile.value = null;
  }
};

onMounted(async () => {
  page.value = await eventStore.getPageById(id.value);

  if (page.value) {
    title.value = page.value.title;
    content.value = page.value.content;
  }
});
</script>

<template>
  <div v-if="page" class="grid grid-cols-2 gap-2 mb-4">
    <div class="flex flex-col gap-2">
      <Label>Title</Label>
      <Input v-model="title" v-bind="titleAttrs" />
      <Button @click="onSubmit">Save</Button>
    </div>
    <div class="flex flex-col gap-2">
      <Label>Files</Label>
      <div class="grid grid-cols-3 gap-2">
        <Dialog v-model:open="isOpen">
          <DialogTrigger as-child>
            <div
              class="flex flex-col gap-2 border rounded-md p-2 min-h-20 items-center justify-center"
            >
              <PlusIcon class="w-8 h-8" />
            </div>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add file</DialogTitle>
            </DialogHeader>
            <Input
              type="file"
              accept="image/*,application/pdf,application/msword,.csv,.xlsx,.xls,.docx,.doc,.txt"
              @change="handleFileChange"
            />
            <DialogFooter>
              <Button type="submit" @click="handleUpload">Add</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <div
          v-for="file in pageFiles"
          :key="file.id"
          class="flex flex-col gap-2 border rounded-md p-2"
        >
          <a :href="`${FILE_URL}/storage/${file.path}`" target="_blank" class="truncate">{{
            file.originalName || file.filename
          }}</a>
          <p class="text-sm text-muted-foreground">{{ file.mimetype }}</p>
          <Button variant="outline" size="icon" @click="onDeleteFile(file.id, file.filename)">
            <TrashIcon class="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  </div>

  <PageEditor v-if="page" :content="page.content" @update:content="content = $event" />
</template>
