<script setup lang="ts">
import { useRouteParams } from '@vueuse/router';

import { useEventStore } from '@/stores/events';

const eventStore = useEventStore();

const year = useRouteParams('year');
</script>

<template>
  <div>{{ year }}</div>
</template>
