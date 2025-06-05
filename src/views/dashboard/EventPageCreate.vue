<script setup lang="ts">
import { onMounted, ref } from 'vue';

import { toTypedSchema } from '@vee-validate/zod';
import { useRouteParams } from '@vueuse/router';
import { useForm } from 'vee-validate';
import { toast } from 'vue-sonner';
import { z } from 'zod';

import PageEditor from '@/components/editor/PageEditor.vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { ConferenceYear } from '@/lib/types';
import { useEventStore } from '@/stores/events';

const eventStore = useEventStore();
const yearParam = useRouteParams<number>('year');
const event = ref<ConferenceYear | null>(null);

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
  toast.promise(eventStore.createPage({ ...values, event_year_id: event.value?.id }), {
    loading: 'Updating page...',
    success: () => {
      return 'Page updated';
    },
    error: (error: Error) => {
      console.warn('error', error);
      return 'Failed to update page';
    },
  });
});

onMounted(async () => {
  event.value = await eventStore.getEventByYear(yearParam.value);
});
</script>

<template>
  <div class="grid gap-2 mb-4">
    <div class="flex flex-col gap-2">
      <Label>Title</Label>
      <Input v-model="title" v-bind="titleAttrs" placeholder="Page title" />
      <Button @click="onSubmit">Save</Button>
    </div>
  </div>

  <PageEditor :content="''" @update:content="content = $event" />
</template>
