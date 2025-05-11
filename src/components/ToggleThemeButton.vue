<script setup lang="ts">
import { useColorMode } from '@vueuse/core';
import { MoonIcon, SunIcon } from 'lucide-vue-next';

import { Button } from '@/components/ui/button';

const mode = useColorMode();

function toggleMode() {
  mode.value = mode.value === 'light' ? 'dark' : 'light';
}
</script>

<template>
  <Button variant="ghost" size="icon" @click="toggleMode">
    <SunIcon v-if="mode === 'dark'" class="size-5" />
    <MoonIcon v-else class="size-5" />
  </Button>
</template>
