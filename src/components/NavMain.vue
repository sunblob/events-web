<script setup lang="ts">
import { computed } from 'vue';

import { CalendarIcon, UserIcon } from 'lucide-vue-next';
import { storeToRefs } from 'pinia';

import {
  SidebarGroup,
  SidebarMenuItem,
  SidebarMenu,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { useAuthStore } from '@/stores/auth';

const menuItems = [
  {
    title: 'Users',
    link: '/dashboard/users',
    icon: UserIcon,
    defaultOpen: true,
    role: ['admin'],
  },
  {
    title: 'Events',
    link: '/dashboard/events',
    icon: CalendarIcon,
    defaultOpen: false,
    role: ['admin', 'editor', 'redactor'],
  },
];

const store = useAuthStore();

const { user } = storeToRefs(store);

const filteredMenuItems = computed(() => {
  return menuItems.filter((item) => item.role.includes(user.value?.role ?? 'editor'));
});
</script>

<template>
  <SidebarGroup>
    <SidebarMenu>
      <SidebarMenuItem
        v-for="item in filteredMenuItems"
        :key="item.title"
        :default-open="item.defaultOpen"
        as-child
      >
        <SidebarMenuButton as-child>
          <RouterLink :to="item.link">
            <component :is="item.icon" />
            <span>{{ item.title }}</span>
          </RouterLink>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  </SidebarGroup>
</template>
