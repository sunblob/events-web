<template>
  <HomeHeader />
  <main class="container mx-auto py-6 px-4 md:px-0">
    <button
      @click="router.push('/')"
      class="mb-6 flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
    >
      <span>← Back</span>
    </button>

    <div class="border rounded-lg p-6">
      <h1 class="text-2xl font-bold mb-4">Contact Us</h1>
      <div class="prose max-w-none">
        <h1>Contact Us</h1>
        <p>Email: info@example.com</p>
        <p>Phone: +123 456 7890</p>
        <p>Address: 123 Main St, Anytown, USA</p>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

import HomeHeader from '@/components/HomeHeader.vue'

const router = useRouter()
</script>
