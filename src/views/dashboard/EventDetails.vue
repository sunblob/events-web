<script setup lang="ts">
import { computed, onMounted } from 'vue';

import { toTypedSchema } from '@vee-validate/zod';
import { useRouteParams } from '@vueuse/router';
import { PlusIcon } from 'lucide-vue-next';
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
import { Textarea } from '@/components/ui/textarea';
import { useEventStore } from '@/stores/events';

const eventStore = useEventStore();

const yearParam = useRouteParams<number>('year');

onMounted(async () => {
  if (yearParam.value) {
    await eventStore.getEventByYear(yearParam.value);

    year.value = eventStore.event?.year ?? yearParam.value;
    title.value = eventStore.event?.title ?? '';
    description.value = eventStore.event?.description ?? '';
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
  }),
);

const { errors, handleSubmit, defineField, meta } = useForm({
  validationSchema: formSchema,
});

const [year, yearAttrs] = defineField('year');
const [title, titleAttrs] = defineField('title');
const [description, descriptionAttrs] = defineField('description');

const onSubmit = handleSubmit(async (values) => {
  if (eventStore.event?.id) {
    toast.promise(eventStore.updateEvent(eventStore.event?.id, values), {
      loading: 'Updating event...',
      success: () => 'Event updated successfully',
      error: (error: Error) => error.message,
    });
  }
});
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

    <Button @click="onSubmit" :disabled="!meta.valid"> Save </Button>

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
