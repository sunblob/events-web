<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';

import { useRouteParams } from '@vueuse/router';
import { useRouter } from 'vue-router';

import HomeHeader from '@/components/HomeHeader.vue';
import { Api } from '@/lib/api';
import { FILE_URL } from '@/lib/constants';
import type { ConferencePage } from '@/lib/types';

const slug = useRouteParams<string>('slug');

const page = ref<ConferencePage | null>(null);

watch(
  slug,
  async () => {
    const response = await Api.getPageBySlug(slug.value);
    page.value = response.data;
  },
  { immediate: true },
);
</script>

<template>
  <main class="container mx-auto py-6 px-4 md:px-0">
    <div v-if="page" class="flex flex-col space-y-6">
      <div>
        <div v-if="page.content" v-html="page.content" class="prose dark:prose-invert"></div>
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
            <div class="flex flex-col gap-2 min-w-0">
              <span class="truncate underline">{{ file.originalName }}</span>
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
