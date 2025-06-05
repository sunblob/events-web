<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import { toast } from 'vue-sonner';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { User } from '@/lib/types';
import { useUserStore } from '@/stores/users';

const props = defineProps<{
  isEdit?: boolean;
  user?: User;
}>();

const userStore = useUserStore();

const formSchema = toTypedSchema(
  z.object({
    name: z
      .string({ required_error: 'Name is required' })
      .min(1, { message: 'Name is required' })
      .default(props.user?.name ?? ''),
    email: z
      .string({ required_error: 'Email is required' })
      .min(1, { message: 'Email is required' })
      .email()
      .default(props.user?.email ?? ''),
    password: z
      .string({ required_error: 'Password is required' })
      .min(6, { message: 'Password must be at least 6 characters long' }),
    role: z
      .enum(['admin', 'editor'], {
        required_error: 'Role is required',
      })
      .default(props.user?.role ?? 'editor'),
  }),
);

const { errors, handleSubmit, defineField, meta } = useForm({
  validationSchema: formSchema,
});

const [name, nameAttrs] = defineField('name');
const [email, emailAttrs] = defineField('email');
const [password, passwordAttrs] = defineField('password');
const [role, roleAttrs] = defineField('role');

const onSubmit = handleSubmit(async (values) => {
  if (props.isEdit && props.user) {
    toast.promise(userStore.updateUser(props.user.id, values), {
      loading: 'Updating user...',
      success: 'User updated successfully',
      error: 'Failed to update user',
      finally: async () => {
        await userStore.getUsers();
      },
    });
  } else {
    toast.promise(userStore.createUser(values), {
      loading: 'Creating user...',
      success: 'User created successfully',
      error: 'Failed to create user',
      finally: async () => {
        await userStore.getUsers();
      },
    });
  }
});
</script>

<template>
  <form @submit="onSubmit" class="flex flex-col gap-4 px-4">
    <div v-auto-animate>
      <div class="flex flex-col gap-2">
        <Label for="name">Name</Label>
        <Input v-model="name" v-bind="nameAttrs" placeholder="Name" />
      </div>

      <p v-if="errors.name" class="text-sm text-red-500">{{ errors.name }}</p>
    </div>
    <div v-auto-animate>
      <div class="flex flex-col gap-2">
        <Label for="email">Email</Label>
        <Input v-model="email" v-bind="emailAttrs" placeholder="Email" />
      </div>

      <p v-if="errors.email" class="text-sm text-red-500">{{ errors.email }}</p>
    </div>
    <div v-auto-animate>
      <div class="flex flex-col gap-2">
        <Label for="password">Password</Label>
        <Input v-model="password" v-bind="passwordAttrs" type="password" placeholder="Password" />
      </div>

      <p v-if="errors.password" class="text-sm text-red-500">{{ errors.password }}</p>
    </div>
    <div v-auto-animate>
      <div class="flex flex-col gap-2">
        <Label for="role">Role</Label>
        <Select v-model="role" v-bind="roleAttrs">
          <SelectTrigger class="w-full">
            <SelectValue placeholder="Select a role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="admin"> Admin </SelectItem>
            <SelectItem value="editor"> Editor </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <p v-if="errors.role" class="text-sm text-red-500">{{ errors.role }}</p>
    </div>
    <Button type="submit" :disabled="!meta.valid">{{ isEdit ? 'Update' : 'Create' }}</Button>
  </form>
</template>
