<script setup lang="ts">
import { onMounted } from 'vue';

import AppSidebar from '@/components/AppSidebar.vue';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();

onMounted(async () => {
  await authStore.getMe();
});
</script>

<template>
  <SidebarProvider>
    <AppSidebar />
    <SidebarInset>
      <header class="flex h-16 shrink-0 items-center gap-2">
        <div class="flex items-center gap-2 px-4">
          <SidebarTrigger />
        </div>
      </header>
      <div className="flex-1 p-4 pt-2 flex flex-col min-h-0">
        <RouterView />
      </div>
    </SidebarInset>
  </SidebarProvider>
</template>
