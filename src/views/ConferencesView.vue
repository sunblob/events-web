<script setup lang="ts">
import { computed, onMounted } from 'vue';

import { useRouteQuery } from '@vueuse/router';
import { RouterLink } from 'vue-router';

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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useEventStore } from '@/stores/events';

const search = useRouteQuery('search', '');
const eventStore = useEventStore();

onMounted(async () => {
  await eventStore.getEvents();
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

      <Sheet>
        <SheetTrigger as-child>
          <Button>Create conference</Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Create new user</SheetTitle>
            <SheetDescription> Create a new user with the following details. </SheetDescription>
          </SheetHeader>
          <div class="flex flex-col gap-4 px-4">
            <Input placeholder="Name" />
            <Input placeholder="Email" />
            <Input type="password" placeholder="Password" />
            <Select>
              <SelectTrigger class="w-full">
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin"> Admin </SelectItem>
                <SelectItem value="editor"> Editor </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <SheetFooter>
            <Button>Create</Button>
          </SheetFooter>
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
          <Button variant="outline" as-child>
            <RouterLink :to="{ name: 'conference-details', params: { year: event.year } }">
              Edit
            </RouterLink>
          </Button>
          <Button variant="destructive" @click="eventStore.openDeleteEventDialog(event.id)">
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
