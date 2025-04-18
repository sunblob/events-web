<script setup lang="ts">
import AppSidebar from '@/components/AppSidebar.vue';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
</script>

<template>
  <SidebarProvider>
    <AppSidebar />
    <SidebarInset>
      <header class="flex items-center gap-2 bg-background p-4">
        <SidebarTrigger class="-ml-1" />
      </header>
      <div className="flex-1 p-4 pt-2 flex flex-col min-h-0">
        <RouterView />
      </div>
    </SidebarInset>
  </SidebarProvider>
</template>
