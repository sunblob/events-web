<template>
  <HomeHeader />
  <main class="container mx-auto py-6 px-4 md:px-0">
    <div v-if="event" class="flex flex-col space-y-6">
      <h1 class="text-3xl font-bold">{{ event.title }}</h1>
      <div class="border rounded-lg p-6">
        <p class="text-muted-foreground mb-4">{{ event.description }}</p>
        <div class="text-sm text-muted-foreground">
          <p>Date: {{ formatDate(event.date) }}</p>
        </div>
        <div class="mt-6">
          <h2 class="text-xl font-semibold mb-4">Event pages</h2>
          <div v-for="page in event.pages" :key="page.id" class="mb-6 border rounded-lg p-4">
            <h3 class="text-lg font-semibold mb-2">{{ page.title }}</h3>
            <div v-for="block in page.content.blocks" :key="block.content" class="mb-2">
              <p v-if="block.type === 'paragraph'" class="text-muted-foreground">{{ block.content }}</p>
              <h4 v-else-if="block.type === 'heading'" class="font-bold mt-2">{{ block.content }}</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="text-center">
      <p class="text-muted-foreground">Loading...</p>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import HomeHeader from '@/components/HomeHeader.vue'
import { Api } from '@/lib/api'
import type { ConferenceYear } from '@/lib/types'

const route = useRoute()
const event = ref<ConferenceYear | null>(null)

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US')
}

onMounted(async () => {
  try {
    const response = await Api.getEvent(Number(route.params.id))
    event.value = response
  } catch (error) {
    console.error('Error loading event:', error)
  }
})
</script>
