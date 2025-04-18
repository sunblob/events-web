<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MoonIcon, SunIcon } from 'lucide-vue-next';

import { useColorMode } from '@vueuse/core';

const mode = useColorMode();

function toggleMode() {
  mode.value = mode.value === 'light' ? 'dark' : 'light';
}
</script>

<template>
  <main class="flex flex-col items-center justify-center h-dvh p-5">
    <form class="relative min-w-[360px] flex flex-col gap-4 rounded-lg border py-6 px-4">
      <div class="absolute top-6 right-4">
        <Button variant="ghost" size="icon" @click="toggleMode">
          <SunIcon v-if="mode === 'dark'" class="size-5" />
          <MoonIcon v-else class="size-5" />
        </Button>
      </div>
      <h1 class="text-2xl font-semibold">Login</h1>
      <div class="flex flex-col gap-2">
        <Label for="email">Email</Label>
        <Input type="email" id="email" placeholder="Enter your email" />
      </div>
      <div class="flex flex-col gap-2">
        <Label for="password">Password</Label>
        <Input type="password" id="password" placeholder="Enter your password" />
      </div>
      <Button type="submit">Login</Button>
    </form>
  </main>
</template>
