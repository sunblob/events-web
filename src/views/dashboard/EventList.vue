<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';

import { useRouteQuery } from '@vueuse/router';
import { storeToRefs } from 'pinia';
import { RouterLink } from 'vue-router';

import EventForm from '@/components/EventForm.vue';
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
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useAuthStore } from '@/stores/auth';
import { useEventStore } from '@/stores/events';

const search = useRouteQuery('search', '');
const eventStore = useEventStore();
const authStore = useAuthStore();
const loading = ref(false);
const error = ref<string | null>(null);

const { user } = storeToRefs(authStore);
const canCreateEvent = computed(() => user.value?.role === 'admin');

onMounted(async () => {
  loading.value = true;
  error.value = null;

  try {
    await eventStore.getEvents();
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to load events';
  } finally {
    loading.value = false;
  }
});

const filteredEvents = computed(() => {
  return eventStore.events.filter((event) =>
    event.title?.toLowerCase().includes(search.value.toLowerCase()),
  );
});
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex items-center gap-2">
      <Input v-model="search" placeholder="Search" />

      <Sheet v-if="canCreateEvent">
        <SheetTrigger as-child>
          <Button>Create event</Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Create new event</SheetTitle>
            <SheetDescription> Create a new event with the following details. </SheetDescription>
          </SheetHeader>
          <EventForm />
        </SheetContent>
      </Sheet>
    </div>

    <div v-if="error" class="text-red-500 p-4 border rounded-lg">
      {{ error }}
    </div>

    <div v-else-if="loading" class="text-center p-4">
      <p>Loading events...</p>
    </div>

    <div
      v-else-if="filteredEvents.length > 0"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
    >
      <Card v-for="event in filteredEvents" :key="event.id">
        <CardHeader>
          <CardTitle>{{ event.year }}</CardTitle>
          <CardDescription>{{ event.title }}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>{{ event.description }}</p>
        </CardContent>
        <CardFooter class="justify-between mt-auto">
          <Button as-child>
            <RouterLink :to="{ name: 'dashboard-event-details', params: { year: event.year } }">
              Edit
            </RouterLink>
          </Button>
          <Button v-if="canCreateEvent" variant="destructive" @click="eventStore.openDeleteEventDialog(event.id)">
            Delete
          </Button>
        </CardFooter>
      </Card>
    </div>
    <div v-else>
      <p>No events found</p>
    </div>
  </div>
</template>
