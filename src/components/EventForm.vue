<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import { useRouter } from 'vue-router';
import { toast } from 'vue-sonner';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useEventStore } from '@/stores/events';

const eventStore = useEventStore();
const router = useRouter();

const formSchema = toTypedSchema(
  z.object({
    year: z
      .number({ required_error: 'Year is required' })
      .min(2000, { message: 'Year must be at least 2000' })
      .max(2050, { message: 'Year must be less than 2050' }),
    title: z.string({ required_error: 'Title is required' }),
    description: z.string().optional(),
  }),
);

const { errors, handleSubmit, defineField, meta } = useForm({
  validationSchema: formSchema,
});

const [year, yearAttrs] = defineField('year');
const [title, titleAttrs] = defineField('title');
const [description, descriptionAttrs] = defineField('description');

const onSubmit = handleSubmit(async (values) => {
  toast.promise(eventStore.createEvent(values), {
    loading: 'Creating event...',
    success: () => {
      router.push({ name: 'dashboard-event-details', params: { year: values.year.toString() } });
      return 'Event created successfully';
    },
    error: (err: Error) => {
      return err.message || 'Failed to create event';
    },
  });
});
</script>

<template>
  <form @submit="onSubmit" class="flex flex-col gap-4 px-4">
    <div v-auto-animate>
      <div class="flex flex-col gap-2">
        <Label for="year">Year</Label>
        <Input
          v-model="year"
          v-bind="yearAttrs"
          placeholder="Year"
          type="number"
          min="2000"
          max="2050"
        />
      </div>

      <p v-if="errors.year" class="text-sm text-red-500">{{ errors.year }}</p>
    </div>
    <div v-auto-animate>
      <div class="flex flex-col gap-2">
        <Label for="title">Title</Label>
        <Input v-model="title" v-bind="titleAttrs" placeholder="Title" />
      </div>

      <p v-if="errors.title" class="text-sm text-red-500">{{ errors.title }}</p>
    </div>
    <div v-auto-animate>
      <div class="flex flex-col gap-2">
        <Label for="description">Description</Label>
        <Textarea
          v-model="description"
          v-bind="descriptionAttrs"
          type="textarea"
          placeholder="Description"
        />
      </div>

      <p v-if="errors.description" class="text-sm text-red-500">{{ errors.description }}</p>
    </div>
    <Button type="submit" :disabled="!meta.valid">Create</Button>
  </form>
</template>
