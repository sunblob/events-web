<template>
  <HomeHeader />
  <main class="container mx-auto py-6 px-4 md:px-0">
    <div class="flex flex-col space-y-4">
      <h1 class="text-2xl font-bold">Events</h1>
      <div class="flex flex-col space-y-4">
        <div v-for="event in events" :key="event.id"
             class="border rounded-lg p-6 cursor-pointer hover:border-primary transition-colors"
             @click="navigateToEvent(event.id)">
          <h2 class="text-xl font-semibold mb-2">{{ event.title || `Event ${event.year}` }}</h2>
          <p class="text-muted-foreground">{{ event.description }}</p>
          <div class="mt-4 text-sm text-muted-foreground">
            <p>Year: {{ event.year }}</p>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import HomeHeader from '@/components/HomeHeader.vue'
import { Api } from '@/lib/api'
import type { ConferenceYear } from '@/lib/types'

const router = useRouter()
const events = ref<ConferenceYear[]>([])

const navigateToEvent = (id: number) => {
  router.push(`/events/${id}`)
}

onMounted(async () => {
  try {
    const response = await Api.getEvents()
    events.value = response.data
  } catch (error) {
    console.error('Error loading events:', error)
  }
})
</script>
