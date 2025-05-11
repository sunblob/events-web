<script setup lang="ts">
import {
  SidebarGroup,
  SidebarMenuItem,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarMenuAction,
} from '@/components/ui/sidebar';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
  CalendarIcon,
  ChevronRightIcon,
  UserIcon,
  UserRoundCogIcon,
  UserRoundPenIcon,
} from 'lucide-vue-next';

const menuItems = [
  {
    title: 'Users',
    link: '/users',
    icon: UserIcon,
    defaultOpen: true,
    items: [
      {
        title: 'Admins',
        link: '/users/admins',
        icon: UserRoundCogIcon,
      },
      {
        title: 'Editors',
        link: '/users/editors',
        icon: UserRoundPenIcon,
      },
    ],
  },
  {
    title: 'Conferences',
    link: '/conferences',
    icon: CalendarIcon,
    defaultOpen: false,
  },
];
</script>

<template>
  <SidebarGroup>
    <SidebarMenu>
      <Collapsible
        v-for="item in menuItems"
        :key="item.title"
        :default-open="item.defaultOpen"
        as-child
        class="group/collapsible"
      >
        <SidebarMenuItem>
          <SidebarMenuButton>
            <component :is="item.icon" />
            <span>{{ item.title }}</span>
          </SidebarMenuButton>
          <CollapsibleTrigger v-if="item.items && item.items.length > 0" as-child>
            <SidebarMenuAction class="group-data-[state=open]/collapsible:rotate-90">
              <ChevronRightIcon />
            </SidebarMenuAction>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <SidebarMenuSub>
              <SidebarMenuSubItem v-for="subItem in item.items" :key="subItem.title">
                <SidebarMenuSubButton as-child>
                  <RouterLink :to="subItem.link">
                    <component :is="subItem.icon" />
                    <span>{{ subItem.title }}</span>
                  </RouterLink>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            </SidebarMenuSub>
          </CollapsibleContent>
        </SidebarMenuItem>
      </Collapsible>
    </SidebarMenu>
  </SidebarGroup>
</template>
