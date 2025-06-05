<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';

import { toTypedSchema } from '@vee-validate/zod';
import { storeToRefs } from 'pinia';
import { useForm } from 'vee-validate';
import { useRouter } from 'vue-router';
import { toast } from 'vue-sonner';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Api } from '@/lib/api';
import type { User } from '@/lib/types';
import { useAuthStore } from '@/stores/auth';
import { useEventStore } from '@/stores/events';

const eventStore = useEventStore();
const authStore = useAuthStore();
const router = useRouter();
const editors = ref<User[]>([]);

const { user } = storeToRefs(authStore);
const canManageEditors = computed(() => user.value?.role === 'admin');

onMounted(async () => {
  if (canManageEditors.value) {
    try {
      const response = await Api.getEditors();
      editors.value = response.data;
    } catch (error) {
      console.error('Failed to load editors:', error);
    }
  }
});

const formSchema = toTypedSchema(
  z.object({
    year: z
      .number({ required_error: 'Year is required' })
      .min(2000, { message: 'Year must be at least 2000' })
      .max(2050, { message: 'Year must be less than 2050' }),
    title: z.string({ required_error: 'Title is required' }),
    description: z.string().optional(),
    editor_id: z.number().optional(),
  }),
);

const { errors, handleSubmit, defineField, meta } = useForm({
  validationSchema: formSchema,
});

const [year, yearAttrs] = defineField('year');
const [title, titleAttrs] = defineField('title');
const [description, descriptionAttrs] = defineField('description');
const [editorId, editorAttrs] = defineField('editor_id');

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
    <div v-if="canManageEditors" v-auto-animate>
      <div class="flex flex-col gap-2">
        <Label for="editor">Editor</Label>
        <Select v-model="editorId" v-bind="editorAttrs">
          <SelectTrigger class="w-full">
            <SelectValue placeholder="Select an editor" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem v-for="editor in editors" :key="editor.id" :value="editor.id">
              {{ editor.name }}
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <p v-if="errors.editor_id" class="text-sm text-red-500">{{ errors.editor_id }}</p>
    </div>
    <Button type="submit" :disabled="!meta.valid">Create</Button>
  </form>
</template>
