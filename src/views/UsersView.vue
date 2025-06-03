<script setup lang="ts">
import { computed, onMounted } from 'vue';

import { useRouteQuery } from '@vueuse/router';
import { storeToRefs } from 'pinia';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import UserForm from '@/components/UserForm.vue';
import { useAuthStore } from '@/stores/auth';
import { useUserStore } from '@/stores/users';

const role = useRouteQuery<'admin' | 'editor' | 'all'>('role', 'all');
const search = useRouteQuery('search', '');

const authStore = useAuthStore();
const userStore = useUserStore();

const { users } = storeToRefs(userStore);

const filteredUsers = computed(() => {
  return users.value.filter(
    (user) =>
      user.id !== authStore.user?.id &&
      (user.role === role.value || role.value === 'all') &&
      (user.name.toLowerCase().includes(search.value.toLowerCase()) ||
        user.email.toLowerCase().includes(search.value.toLowerCase())),
  );
});

onMounted(async () => {
  await userStore.getUsers();
});
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex items-center gap-2">
      <Input v-model="search" placeholder="Search" />

      <Select v-model="role">
        <SelectTrigger class="w-[180px]">
          <SelectValue placeholder="Select a role" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="all"> All </SelectItem>
            <SelectItem value="admin"> Admin </SelectItem>
            <SelectItem value="editor"> Editor </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <Sheet>
        <SheetTrigger as-child>
          <Button>Create user</Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Create new user</SheetTitle>
            <SheetDescription> Create a new user with the following details. </SheetDescription>
          </SheetHeader>
          <UserForm :is-edit="false" />
        </SheetContent>
      </Sheet>
    </div>
    <div
      v-if="filteredUsers.length > 0"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
    >
      <Card v-for="user in filteredUsers" :key="user.id">
        <CardHeader>
          <CardTitle>{{ user.name }}</CardTitle>
          <CardDescription>{{ user.email }}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Role: {{ user.role }}</p>
        </CardContent>
        <CardFooter class="justify-between">
          <Sheet>
            <SheetTrigger as-child>
              <Button>Edit</Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Edit user</SheetTitle>
                <SheetDescription> Edit the user with the following details. </SheetDescription>
              </SheetHeader>
              <UserForm :is-edit="true" :user="user" />
            </SheetContent>
          </Sheet>
          <Button variant="destructive" @click="userStore.openDeleteUserDialog(user.id)"
            >Delete</Button
          >
        </CardFooter>
      </Card>
    </div>
    <div v-else>
      <p>No users found</p>
    </div>
  </div>
</template>
