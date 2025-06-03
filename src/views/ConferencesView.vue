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
import { useConferenceStore } from '@/stores/conferences';

const search = useRouteQuery('search', '');
const conferenceStore = useConferenceStore();

onMounted(async () => {
  await conferenceStore.getConferences();
});

const filteredConferences = computed(() => {
  return conferenceStore.conferences.filter((conference) =>
    conference.title?.toLowerCase().includes(search.value.toLowerCase()),
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
      v-if="filteredConferences.length > 0"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
    >
      <Card v-for="conference in filteredConferences" :key="conference.id">
        <CardHeader>
          <CardTitle>{{ conference.year }}</CardTitle>
          <CardDescription>{{ conference.title }}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>{{ conference.description }}</p>
        </CardContent>
        <CardFooter class="justify-between mt-auto">
          <Button variant="outline" as-child>
            <RouterLink :to="{ name: 'conference-details', params: { year: conference.year } }">
              Edit
            </RouterLink>
          </Button>
          <Button
            variant="destructive"
            @click="conferenceStore.openDeleteConferenceDialog(conference.id)"
          >
            Delete
          </Button>
        </CardFooter>
      </Card>
    </div>
    <div v-else>
      <p>No conferences found</p>
    </div>
  </div>
</template>
