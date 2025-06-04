<script setup lang="ts">
import { onMounted } from 'vue';

import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

import HomeHeader from '@/components/HomeHeader.vue';
import { useEventStore } from '@/stores/events';

const router = useRouter();
const eventStore = useEventStore();

const { events } = storeToRefs(eventStore);

const navigateToEvent = (id: number) => {
  router.push(`/events/${id}`);
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
          :key="event.id"
          class="border rounded-lg p-6 cursor-pointer hover:border-primary transition-colors"
          @click="navigateToEvent(event.id)"
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
