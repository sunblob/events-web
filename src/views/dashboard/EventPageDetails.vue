<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';

import { toTypedSchema } from '@vee-validate/zod';
import { useRouteParams } from '@vueuse/router';
import { FileIcon, TrashIcon } from 'lucide-vue-next';
import { useForm } from 'vee-validate';
import { toast } from 'vue-sonner';
import { z } from 'zod';

import PageEditor from '@/components/editor/PageEditor.vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FILE_URL } from '@/lib/constants';
import type { ConferencePage } from '@/lib/types';
import { useEventStore } from '@/stores/events';

const eventStore = useEventStore();

const id = useRouteParams<string>('pageId');

const page = ref<ConferencePage | null>(null);

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

// TODO: delete file from file model and filesystem
// Refetch the page to get the updated files | or just update the page with the new files manually
const onDeleteFile = (fileId: number | string) => {
  console.log('fileId', fileId);
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
        <div
          v-for="file in page.files"
          :key="file.id"
          class="flex flex-col gap-2 border rounded-md p-2"
        >
          <a :href="`${FILE_URL}/storage/${file.path}`" target="_blank" class="truncate">{{
            file.filename
          }}</a>
          <p class="text-sm text-muted-foreground">{{ file.mimetype }}</p>
          <Button variant="outline" size="icon" @click="onDeleteFile(file.id)">
            <TrashIcon class="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  </div>

  <PageEditor v-if="page" :content="page.content" @update:content="content = $event" />
</template>
