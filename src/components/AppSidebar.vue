<script setup lang="ts">
import { GalleryVerticalEndIcon } from 'lucide-vue-next';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import NavMain from './NavMain.vue';
import ToggleThemeButton from './ToggleThemeButton.vue';
</script>

<template>
  <Sidebar variant="inset" collapsible="icon">
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuButton size="lg" as-child>
          <div>
            <div
              class="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground"
            >
              <GalleryVerticalEndIcon class="size-4" />
            </div>
            <div class="flex flex-col gap-1 leading-none">
              <span class="font-semibold">CRM</span>
              <span class="">v1.0.0</span>
            </div>
            <ToggleThemeButton class="ml-auto p-0" />
          </div>
        </SidebarMenuButton>
      </SidebarMenu>
    </SidebarHeader>
    <SidebarContent>
      <NavMain />
      <SidebarGroup />
    </SidebarContent>
    <SidebarFooter> Footer </SidebarFooter>
  </Sidebar>
</template>
