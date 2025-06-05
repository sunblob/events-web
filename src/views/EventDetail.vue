<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';

import { useRouteParams } from '@vueuse/router';
import { useRouter } from 'vue-router';

import HomeHeader from '@/components/HomeHeader.vue';
import { Button } from '@/components/ui/button';
import { Api } from '@/lib/api';
import { FILE_URL } from '@/lib/constants';
import type { ConferenceYear } from '@/lib/types';

const router = useRouter();
const event = ref<ConferenceYear | null>(null);
const currentPageIndex = ref(0);

const currentPage = computed(() => {
  if (!event.value?.pages) return null;
  return event.value.pages[currentPageIndex.value];
});

const year = useRouteParams<number>('year');
const slug = useRouteParams<string>('slug');

onMounted(async () => {
  try {
    const response = await Api.getEventByYear(year.value);
    event.value = response.data;

    if (event.value && event.value.pages && event.value.pages.length > 0) {
      console.log(slug.value);
      router.push({
        name: 'event-page',
        params: { slug: slug.value || event.value.pages[0].slug },
      });
    }
  } catch (error) {
    console.error('Error loading event:', error);
  }
});

watch(currentPage, () => {
  if (currentPage.value) {
    router.push({
      name: 'event-page',
      params: { slug: currentPage.value.slug },
    });
  }
});
</script>

<template>
  <HomeHeader />
  <main class="container mx-auto py-6 px-4 md:px-0">
    <button
      @click="router.push('/')"
      class="mb-6 flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
    >
      <span>← Back to Events</span>
    </button>

    <div v-if="event" class="flex flex-col space-y-6">
      <div>
        <h1 class="text-3xl font-bold mb-2">{{ event.title || `Event ${event.year}` }}</h1>
        <p v-if="event.description" class="text-muted-foreground">{{ event.description }}</p>
      </div>

      <div v-if="event.pages && event.pages.length > 0">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-semibold mb-2">{{ currentPage?.title }}</h2>
          <div class="flex space-x-2">
            <button
              @click="currentPageIndex = currentPageIndex - 1"
              :disabled="currentPageIndex === 0"
              class="px-4 py-2 border rounded-lg disabled:opacity-50"
            >
              Previous
            </button>
            <span class="px-4 py-2">{{ currentPageIndex + 1 }} / {{ event.pages.length }}</span>
            <button
              @click="currentPageIndex = currentPageIndex + 1"
              :disabled="currentPageIndex === event.pages.length - 1"
              class="px-4 py-2 border rounded-lg disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>

        <RouterView />

        <!-- <div v-if="currentPage" class="p-4 rounded-lg">
          <div v-if="currentPage.content" v-html="currentPage.content"></div>
        </div>

        <div v-if="currentPage" class="border-t">
          <div v-for="file in currentPage.files" :key="file.id">
            <a :href="`${FILE_URL}/storage/${file.filename}`" target="_blank">
              {{ file.originalName || file.filename }}
            </a>
          </div>
        </div> -->
      </div>
    </div>

    <div v-else class="text-center">
      <p class="text-muted-foreground">Loading...</p>
    </div>
  </main>
</template>
