<script setup lang="ts">
import { useRouteParams } from '@vueuse/router';

import { useConferenceStore } from '@/stores/conferences';

const conferenceStore = useConferenceStore();

const year = useRouteParams('year');
</script>

<template>
  <div>{{ year }}</div>
</template>
