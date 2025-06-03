import { ref } from 'vue';

import { defineStore } from 'pinia';
import { toast } from 'vue-sonner';

import { useConfirmDialog } from '@/composables/use-confrim-dialog';
import { Api } from '@/lib/api';
import type { ConferenceYear } from '@/lib/types';

export const useConferenceStore = defineStore('conference', () => {
  const conferences = ref<ConferenceYear[]>([]);
  const confirmDialog = useConfirmDialog();
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const getConferences = async () => {
    isLoading.value = true;
    error.value = null;
    try {
      const { data } = await Api.getConferences();
      conferences.value = data;
    } catch (e) {
      error.value = 'Ошибка загрузки годов конференций';
    } finally {
      isLoading.value = false;
    }
  };

  const createConference = async (payload: Partial<ConferenceYear>) => {
    isLoading.value = true;
    error.value = null;
    try {
      await Api.createConferenceYear(payload);
      await getConferences();
    } catch (e) {
      error.value = 'Ошибка создания года конференции';
    } finally {
      isLoading.value = false;
    }
  };

  const updateConference = async (id: number, payload: Partial<ConferenceYear>) => {
    isLoading.value = true;
    error.value = null;
    try {
      await Api.updateConferenceYear(id, payload);
      await getConferences();
    } catch (e) {
      error.value = 'Ошибка обновления года конференции';
    } finally {
      isLoading.value = false;
    }
  };

  const deleteConference = async (id: number | string) => {
    isLoading.value = true;
    error.value = null;
    try {
      await Api.deleteConferenceYear(id);
      await getConferences();
    } catch (e) {
      error.value = 'Ошибка удаления года конференции';
    } finally {
      isLoading.value = false;
    }
  };

  const openDeleteConferenceDialog = (yearId: string | number) => {
    confirmDialog.open({
      title: 'Delete conference?',
      description: 'Are you sure you want to delete this conference? This action cannot be undone.',
      confirmText: 'Delete',
      cancelText: 'Cancel',
      onConfirm: async () => {
        toast.promise(deleteConference(yearId), {
          loading: 'Deleting conference...',
          success: 'Conference deleted successfully',
          error: 'Failed to delete conference',
        });
      },
    });
  };

  return {
    conferences,
    isLoading,
    error,
    getConferences,
    createConference,
    updateConference,
    deleteConference,
    openDeleteConferenceDialog,
  };
});
