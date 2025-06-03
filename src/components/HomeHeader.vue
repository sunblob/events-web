<script setup lang="ts">
import { CircleUserIcon } from 'lucide-vue-next';

import { Button } from '@/components/ui/button';

import ToggleThemeButton from './ToggleThemeButton.vue';
</script>

<template>
  <header class="border-b">
    <div class="flex items-center justify-between container mx-auto py-4 px-4 md:px-0">
      <div class="flex items-center gap-4">
        <RouterLink to="/" class="font-medium"> Home </RouterLink>
        <RouterLink to="/events" class="font-medium"> Events </RouterLink>
      </div>
      <div class="flex items-center gap-2">
        <ToggleThemeButton />
        <Button variant="ghost" size="icon" as-child>
          <RouterLink to="/auth/sign-in"> <CircleUserIcon class="size-5" /> </RouterLink>
        </Button>
      </div>
    </div>
  </header>
</template>
