<script setup lang="ts">
import { onMounted, ref } from 'vue';

import { useRouteParams } from '@vueuse/router';

import PageEditor from '@/components/editor/PageEditor.vue';
import type { ConferencePage } from '@/lib/types';
import { useEventStore } from '@/stores/events';

const eventStore = useEventStore();

const id = useRouteParams<string>('pageId');

const page = ref<ConferencePage | null>(null);

onMounted(async () => {
  console.log('id', id.value);
  page.value = await eventStore.getPageById(id.value);

  // console.log('page', page.value);

  // if (page.value) {
  //   editorStore.setContent(page.value.content);
  // }
});
</script>

<template>
  <div>
    <h1>Event Page Details</h1>
    <p>Page ID: {{ id }}</p>
  </div>

  <PageEditor v-if="page" :content="page.content" />
</template>
