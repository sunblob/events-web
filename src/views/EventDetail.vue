<template>
  <HomeHeader />
  <main class="container mx-auto py-6 px-4 md:px-0">
    <button
      @click="router.push('/events')"
      class="mb-6 flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
    >
      <span>← Back to Events</span>
    </button>

    <div v-if="event" class="flex flex-col space-y-6">
      <div>
        <h1 class="text-3xl font-bold mb-2">{{ event.title || `Event ${event.year}` }}</h1>
        <p v-if="event.description" class="text-muted-foreground">{{ event.description }}</p>
      </div>

      <div v-if="event.pages && event.pages.length > 0">
        <h2 class="text-2xl font-semibold mb-4">Pages</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div v-for="page in event.pages" :key="page.id"
               class="border rounded-lg p-4 hover:border-primary transition-colors">
            <h3 class="text-xl font-semibold mb-2">{{ page.title }}</h3>
            <div v-if="page.content?.blocks" class="text-muted-foreground">
              <div v-for="(block, index) in page.content.blocks" :key="index">
                <h4 v-if="block.type === 'heading'" class="text-lg font-medium mt-2">{{ block.content }}</h4>
                <p v-if="block.type === 'paragraph'" class="mt-2">{{ block.content }}</p>
              </div>
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
import { useRoute, useRouter } from 'vue-router'
import HomeHeader from '@/components/HomeHeader.vue'
import { Api } from '@/lib/api'
import type { ConferenceYear } from '@/lib/types'

const route = useRoute()
const router = useRouter()
const event = ref<ConferenceYear | null>(null)

onMounted(async () => {
  try {
    const id = Number(route.params.id)
    const response = await Api.getEvent(id)
    event.value = response.data
  } catch (error) {
    console.error('Error loading event:', error)
  }
})
</script>
