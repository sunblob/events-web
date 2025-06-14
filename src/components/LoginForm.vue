<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import { LoaderCircleIcon } from 'lucide-vue-next';
import { storeToRefs } from 'pinia';
import { useForm } from 'vee-validate';
import { useRouter } from 'vue-router';
import { toast } from 'vue-sonner';
import { z } from 'zod';

import ToggleThemeButton from '@/components/ToggleThemeButton.vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuthStore } from '@/stores/auth';

const router = useRouter();
const store = useAuthStore();

const { loading } = storeToRefs(store);

const formSchema = toTypedSchema(
  z.object({
    email: z.string({ required_error: 'Email is required' }).email(),
    password: z
      .string({ required_error: 'Password is required' })
      .min(6, { message: 'Password must be at least 6 characters long' }),
  }),
);

const { errors, handleSubmit, defineField } = useForm({
  validationSchema: formSchema,
});

const [email, emailAttrs] = defineField('email');
const [password, passwordAttrs] = defineField('password');

const onSubmit = handleSubmit(async (values) => {
  toast.promise(store.login(values), {
    loading: 'Logging in...',
    success: () => {
      router.push('/dashboard');
      return 'Login successful';
    },
    error: (error: Error) => {
      console.warn('error', error);
      return 'Invalid email or password';
    },
    finally: () => {
      store.loading = false;
    },
  });
});
</script>

<template>
  <div class="relative rounded-lg border py-6 px-4">
    <ToggleThemeButton class="absolute top-6 right-4" />

    <form @submit="onSubmit" class="flex flex-col gap-4">
      <div class="flex flex-col gap-2">
        <h1 class="text-2xl font-semibold">Login</h1>
        <h3 class="text-sm text-muted-foreground">
          Enter your email below to login to your account.
        </h3>
      </div>
      <div v-auto-animate>
        <div class="flex flex-col gap-2">
          <Label for="email">Email</Label>
          <Input
            type="email"
            id="email"
            placeholder="Enter your email"
            v-model="email"
            v-bind="emailAttrs"
            :class="{
              'border-red-700 focus-visible:ring-red-700 focus-visible:border-red-700':
                errors.email,
            }"
          />
        </div>
        <div v-if="errors.email" class="mt-2 text-red-700 text-xs">{{ errors.email }}</div>
      </div>
      <div v-auto-animate>
        <div class="flex flex-col gap-2">
          <Label for="password">Password</Label>
          <Input
            type="password"
            id="password"
            placeholder="Enter your password"
            v-model="password"
            v-bind="passwordAttrs"
            :class="{
              'border-red-700 focus-visible:ring-red-700 focus-visible:border-red-700':
                errors.password,
            }"
          />
        </div>
        <div v-if="errors.password" class="mt-2 text-red-700 text-xs">{{ errors.password }}</div>
      </div>
      <Button type="submit" :disabled="loading">
        <LoaderCircleIcon v-if="loading" class="w-4 h-4 animate-spin" />
        <span v-else>Login</span>
      </Button>
    </form>
  </div>
</template>

<style scoped></style>
