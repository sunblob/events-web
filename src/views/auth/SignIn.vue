<script setup lang="ts">
import { ArrowLeftIcon } from 'lucide-vue-next';

import LoginForm from '@/components/LoginForm.vue';
</script>

<template>
  <main class="flex flex-col items-center justify-center h-dvh p-5">
    <div class="min-w-[460px]">
      <RouterLink to="/" class="flex items-center gap-2 mb-4">
        <ArrowLeftIcon class="w-4 h-4" />
        <span>Back to home</span>
      </RouterLink>
      <LoginForm />
    </div>
  </main>
</template>
