import { ref } from 'vue';

import { defineStore } from 'pinia';
import { toast } from 'vue-sonner';

import { useConfirmDialog } from '@/composables/use-confrim-dialog';
import { Api } from '@/lib/api';
import type { User } from '@/lib/types';

export const useUserStore = defineStore('user', () => {
  const users = ref<User[]>([]);
  const confirmDialog = useConfirmDialog();

  const getUsers = async () => {
    const { data } = await Api.getUsers();
    users.value = data;
  };

  const deleteUser = async (id: string | number) => {
    const { data } = await Api.deleteUser(id);
    return data;
  };

  const createUser = async (user: Partial<User>) => {
    const { data } = await Api.createUser(user);
    return data;
  };

  const updateUser = async (id: string | number, user: Partial<User>) => {
    const { data } = await Api.updateUser(id, user);
    return data;
  };

  const openDeleteUserDialog = (userId: string | number) => {
    confirmDialog.open({
      title: 'Delete user?',
      description: 'Are you sure you want to delete this user? This action cannot be undone.',
      confirmText: 'Delete',
      cancelText: 'Cancel',
      onConfirm: async () => {
        toast.promise(deleteUser(userId), {
          loading: 'Deleting user...',
          success: 'User deleted successfully',
          error: 'Failed to delete user',
        });
        await getUsers();
      },
    });
  };

  return { users, getUsers, deleteUser, createUser, updateUser, openDeleteUserDialog };
});
