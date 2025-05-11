import { computed, ref } from 'vue';
import { defineStore } from 'pinia';

import { Api } from '@/lib/api';

type User = {
  id: string;
  email: string;
};

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null);
  const isAutheticated = computed(() => !!user.value);

  const login = async ({ email, password }: { email: string; password: string }) => {
    const response = await Api.login({ email, password });
  };

  const logout = async () => {
    await Api.logout();
  };

  return { user, isAutheticated, login, logout };
});
