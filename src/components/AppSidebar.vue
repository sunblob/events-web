<script setup lang="ts">
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenuItem,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarMenuAction,
} from '@/components/ui/sidebar';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import { ChevronRightIcon, UserIcon } from 'lucide-vue-next';

const menuItems = [
  {
    title: 'Users',
    link: '/users',
    items: [
      {
        title: 'Admins',
        link: '/users/admins',
      },
      {
        title: 'Editors',
        link: '/users/editors',
      },
    ],
  },
  {
    title: 'Conferences',
    link: '/conferences',
  },
];
</script>

<template>
  <Sidebar>
    <SidebarHeader> Sidebar </SidebarHeader>
    <SidebarContent>
      <SidebarGroup>
        <SidebarMenu>
          <Collapsible v-for="item in menuItems" :key="item.title" as-child>
            <SidebarMenuItem>
              <SidebarMenuButton as-child>
                <RouterLink :to="item.link">
                  <UserIcon />
                  {{ item.title }}
                </RouterLink>
              </SidebarMenuButton>
              <template v-if="item.items && item.items.length > 0">
                <CollapsibleTrigger as-child>
                  <SidebarMenuAction className="data-[state=open]:rotate-90">
                    <ChevronRightIcon />
                    <span className="sr-only">Toggle</span>
                  </SidebarMenuAction>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    <SidebarMenuSubItem v-for="subItem in item.items" :key="subItem.title">
                      <SidebarMenuSubButton as-child>
                        <RouterLink :to="subItem.link">
                          {{ subItem.title }}
                        </RouterLink>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </CollapsibleContent>
              </template>
            </SidebarMenuItem>
          </Collapsible>
        </SidebarMenu>
      </SidebarGroup>
      <SidebarGroup />
    </SidebarContent>
    <SidebarFooter />
  </Sidebar>
</template>
