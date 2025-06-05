<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';

import { toTypedSchema } from '@vee-validate/zod';
import { useRouteParams } from '@vueuse/router';
import { PlusIcon } from 'lucide-vue-next';
import { storeToRefs } from 'pinia';
import { useForm } from 'vee-validate';
import { toast } from 'vue-sonner';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
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
const editors = ref<User[]>([]);

const { user } = storeToRefs(authStore);
const isRedactor = computed(() => user.value?.role === 'redactor');
const canManageEditors = computed(() => user.value?.role === 'admin');

const yearParam = useRouteParams<number>('year');

onMounted(async () => {
  if (yearParam.value) {
    await eventStore.getEventByYear(yearParam.value);

    year.value = eventStore.event?.year ?? yearParam.value;
    title.value = eventStore.event?.title ?? '';
    description.value = eventStore.event?.description ?? '';
    editorId.value = eventStore.event?.editor_id ?? null;
  }

  // Загружаем список редакторов только если пользователь админ
  if (canManageEditors.value) {
    try {
      const response = await Api.getEditors();
      editors.value = response.data;
    } catch (error) {
      console.error('Failed to load editors:', error);
    }
  }
});

const pages = computed(() => eventStore.event?.pages ?? []);

const formSchema = toTypedSchema(
  z.object({
    year: z
      .number({ required_error: 'Year is required' })
      .min(2000, 'Year must be greater than 2000')
      .max(2050, 'Year must be less than 2050')
      .default(yearParam.value),
    title: z
      .string({ required_error: 'Title is required' })
      .min(1, 'Title is required')
      .default(eventStore.event?.title ?? ''),
    description: z
      .string({ required_error: 'Description is required' })
      .default(eventStore.event?.description ?? ''),
    editor_id: z.number().nullable().optional(),
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
  if (eventStore.event?.id) {
    toast.promise(eventStore.updateEvent(eventStore.event?.id, values), {
      loading: 'Updating event...',
      success: () => 'Event updated successfully',
      error: (error: Error) => error.message,
    });
  }
});

const removeEditor = async () => {
  if (!isRedactor.value && eventStore.event?.id) {
    toast.promise(Api.removeEditor(eventStore.event.id), {
      loading: 'Removing editor...',
      success: async () => {
        await eventStore.getEventByYear(yearParam.value);
        return 'Editor removed successfully';
      },
      error: (error: Error) => error.message,
    });
  }
};
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex flex-col gap-2">
      <Label>Year</Label>
      <Input
        v-model="year"
        v-bind="yearAttrs"
        placeholder="Year"
        type="number"
        min="2000"
        max="2050"
      />
      <p v-if="errors.year" class="text-red-500">{{ errors.year }}</p>
    </div>

    <div class="flex flex-col gap-2">
      <Label>Title</Label>
      <Input v-model="title" v-bind="titleAttrs" placeholder="Title" />
      <p v-if="errors.title" class="text-red-500">{{ errors.title }}</p>
    </div>

    <div class="flex flex-col gap-2">
      <Label>Description</Label>
      <Textarea v-model="description" v-bind="descriptionAttrs" placeholder="Description" />
      <p v-if="errors.description" class="text-red-500">{{ errors.description }}</p>
    </div>

    <div v-if="canManageEditors" class="flex flex-col gap-2">
      <Label>Editor</Label>
      <div v-if="eventStore.event?.editor" class="flex items-center justify-between p-4 border rounded-lg">
        <div class="flex items-center gap-2">
          <span>{{ eventStore.event.editor.name }}</span>
          <span class="text-sm text-muted-foreground">({{ eventStore.event.editor.email }})</span>
        </div>
        <Button variant="destructive" size="sm" @click="removeEditor">Remove</Button>
      </div>
      <div v-else>
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
    </div>

    <Button @click="onSubmit" :disabled="!meta.valid">Save</Button>

    <Label>Pages</Label>
    <div v-if="eventStore.event" class="grid grid-cols-3 gap-2">
      <div
        class="min-h-20 flex items-center justify-center border-2 border-gray-200 rounded-md p-2 cursor-pointer"
      >
        <PlusIcon class="w-16 h-16" />
      </div>
      <Card v-for="page in pages" :key="page.id">
        <CardHeader>
          <CardTitle>{{ page.title }}</CardTitle>
          <CardDescription>{{ page.slug }}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>{{ eventStore.event.description }}</p>
        </CardContent>
        <CardFooter class="justify-between mt-auto">
          <Button as-child>
            <RouterLink
              :to="{
                name: 'dashboard-event-page-details',
                params: { pageId: page.id },
              }"
            >
              Edit
            </RouterLink>
          </Button>
          <Button
            variant="destructive"
            @click="eventStore.openDeleteEventPageDialog(page.id, eventStore.event.year)"
          >
            Delete
          </Button>
        </CardFooter>
      </Card>
    </div>
  </div>
</template>
