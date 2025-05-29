import { computed, ref } from 'vue';
import { defineStore } from 'pinia';

import { Api } from '@/lib/api';
import type { User } from '@/lib/types';

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null);
  const isAutheticated = computed(() => !!user.value);
  const loading = ref(false);

  const login = async ({ email, password }: { email: string; password: string }) => {
    loading.value = true;
    const response = await Api.login({ email, password });
    user.value = response.user;

    localStorage.setItem('token', response.access_token);
    loading.value = false;
  };

  const logout = async () => {
    await Api.logout();
    localStorage.removeItem('token');
    user.value = null;
  };

  const getMe = async () => {
    try {
      const response = await Api.getMe();
      user.value = response;

      console.log(user.value);
    } catch (error) {
      console.error(error);
    }
  };

  return { user, isAutheticated, login, logout, loading, getMe };
});
