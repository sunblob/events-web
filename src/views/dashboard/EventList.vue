<script setup lang="ts">
import { computed, onMounted } from 'vue';

import { useRouteQuery } from '@vueuse/router';
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

onMounted(async () => {
  await eventStore.getEditorEvents();
});

const filteredEvents = computed(() => {
  return eventStore.dashboardEvents.filter((event) =>
    event.title?.toLowerCase().includes(search.value.toLowerCase()),
  );
});
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex items-center gap-2">
      <Input v-model="search" placeholder="Search" />

      <Sheet v-if="authStore.user?.role === 'admin'">
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
    <div
      v-if="filteredEvents.length > 0"
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
          <Button
            v-if="authStore.user?.role === 'admin'"
            variant="destructive"
            @click="eventStore.openDeleteEventDialog(event.id)"
          >
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
