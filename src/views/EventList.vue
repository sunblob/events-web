<script setup lang="ts">
import { onMounted } from 'vue';

import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

import HomeHeader from '@/components/HomeHeader.vue';
import type { ConferencePage } from '@/lib/types';
import { useEventStore } from '@/stores/events';

const router = useRouter();
const eventStore = useEventStore();

const { events } = storeToRefs(eventStore);

const navigateToEvent = (year: number, pages: ConferencePage[]) => {
  console.log(year, pages);
  router.push({ name: 'event-detail', params: { year: year.toString() } });
};

onMounted(async () => {
  await eventStore.getEvents();
});
</script>

<template>
  <HomeHeader />
  <main class="container mx-auto py-6 px-4 md:px-0">
    <div class="flex flex-col space-y-4">
      <h1 class="text-2xl font-bold">Events</h1>
      <div class="flex flex-col space-y-4">
        <div
          v-for="event in events"
          :key="event.year"
          class="border rounded-lg p-6 bg-slate-50 dark:bg-zinc-900 cursor-pointer hover:border-primary transition-colors"
          @click="navigateToEvent(event.year, event.pages!)"
        >
          <h2 class="text-xl font-semibold mb-2">{{ event.title || `Event ${event.year}` }}</h2>
          <p class="text-muted-foreground">{{ event.description }}</p>
          <div class="mt-4 text-sm text-muted-foreground">
            <p>Year: {{ event.year }}</p>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
