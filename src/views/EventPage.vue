<script setup lang="ts">
import { onMounted, ref } from 'vue';

import { useRouteParams } from '@vueuse/router';
import { useRouter } from 'vue-router';

import HomeHeader from '@/components/HomeHeader.vue';
import { Api } from '@/lib/api';
import { FILE_URL } from '@/lib/constants';
import type { ConferencePage } from '@/lib/types';

const router = useRouter();
const year = useRouteParams<string>('year');
const slug = useRouteParams<string>('slug');

const page = ref<ConferencePage | null>(null);

onMounted(async () => {
  try {
    const response = await Api.getPageByYearAndSlug(year.value, slug.value);
    page.value = response.data;
  } catch (error) {
    console.error('Error loading page:', error);
  }
});
</script>

<template>
  <HomeHeader />
  <main class="container mx-auto py-6 px-4 md:px-0">
    <button
      @click="router.back()"
      class="mb-6 flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
    >
      <span>← Back</span>
    </button>

    <div v-if="page" class="flex flex-col space-y-6">
      <div>
        <h1 class="text-3xl font-bold mb-2">{{ page.title }}</h1>
        <div
          v-if="page.content"
          v-html="page.content"
          class="prose dark:prose-invert max-w-none"
        ></div>
      </div>

      <div v-if="page.files && page.files.length > 0" class="mt-8">
        <h2 class="text-xl font-semibold mb-4">Files</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <a
            v-for="file in page.files"
            :key="file.id"
            :href="`${FILE_URL}/storage/${file.path}`"
            target="_blank"
            class="flex items-center gap-2 p-4 rounded-lg bg-gray-100 transition-colors"
          >
            <img
              v-if="file.mimetype.startsWith('image/')"
              :src="`${FILE_URL}/storage/${file.path}`"
              alt="preview"
              class="w-full h-40 object-cover rounded"
            />
            <div v-else class="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-muted-foreground shrink-0"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm0 4a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1z"
                  clip-rule="evenodd"
                />
              </svg>
              <span class="truncate">{{ file.filename }}</span>
              <span class="text-sm text-muted-foreground">{{ file.mimetype }}</span>
            </div>
          </a>
        </div>
      </div>
    </div>

    <div v-else class="text-center">
      <p class="text-muted-foreground">Loading...</p>
    </div>
  </main>
</template>
