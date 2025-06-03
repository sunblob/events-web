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
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-semibold mb-2">{{ currentPage?.title }}</h2>
          <div class="flex space-x-2">
            <button
              @click="currentPageIndex = currentPageIndex - 1"
              :disabled="currentPageIndex === 0"
              class="px-4 py-2 border rounded-lg disabled:opacity-50"
            >
              Previous
            </button>
            <span class="px-4 py-2">{{ currentPageIndex + 1 }} / {{ event.pages.length }}</span>
            <button
              @click="currentPageIndex = currentPageIndex + 1"
              :disabled="currentPageIndex === event.pages.length - 1"
              class="px-4 py-2 border rounded-lg disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>

        <div v-if="currentPage" class="border rounded-lg p-4">

          <div v-if="currentPage.content?.blocks" class="text-muted-foreground">
            <div v-for="(block, index) in currentPage.content.blocks" :key="index">
              <h4 v-if="block.type === 'heading'" class="text-lg font-medium mt-2">{{ block.content }}</h4>
              <p v-if="block.type === 'paragraph'" class="mt-2">{{ block.content }}</p>
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
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import HomeHeader from '@/components/HomeHeader.vue'
import { Api } from '@/lib/api'
import type { ConferenceYear } from '@/lib/types'

const route = useRoute()
const router = useRouter()
const event = ref<ConferenceYear | null>(null)
const currentPageIndex = ref(0)

const currentPage = computed(() => {
  if (!event.value?.pages) return null
  return event.value.pages[currentPageIndex.value]
})

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
