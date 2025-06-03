import { ref } from 'vue';

import { defineStore } from 'pinia';
import { toast } from 'vue-sonner';

import { useConfirmDialog } from '@/composables/use-confrim-dialog';
import { Api } from '@/lib/api';
import type { ConferenceYear } from '@/lib/types';

export const useEventStore = defineStore('events', () => {
  const events = ref<ConferenceYear[]>([]);
  const confirmDialog = useConfirmDialog();
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const getEvents = async () => {
    isLoading.value = true;
    error.value = null;
    try {
      const { data } = await Api.getEvents();
      events.value = data;
    } catch (e) {
      error.value = 'Ошибка загрузки годов конференций';
    } finally {
      isLoading.value = false;
    }
  };

  const createEvent = async (payload: Partial<ConferenceYear>) => {
    isLoading.value = true;
    error.value = null;
    try {
      await Api.createEvent(payload);
      await getEvents();
    } catch (e) {
      error.value = 'Ошибка создания года конференции';
    } finally {
      isLoading.value = false;
    }
  };

  const updateEvent = async (id: number, payload: Partial<ConferenceYear>) => {
    isLoading.value = true;
    error.value = null;
    try {
      await Api.updateEvent(id, payload);
      await getEvents();
    } catch (e) {
      error.value = 'Ошибка обновления года конференции';
    } finally {
      isLoading.value = false;
    }
  };

  const deleteEvent = async (id: number | string) => {
    isLoading.value = true;
    error.value = null;
    try {
      await Api.deleteEvent(id);
      await getEvents();
    } catch (e) {
      error.value = 'Ошибка удаления года конференции';
    } finally {
      isLoading.value = false;
    }
  };

  const openDeleteEventDialog = (yearId: string | number) => {
    confirmDialog.open({
      title: 'Delete event?',
      description: 'Are you sure you want to delete this event? This action cannot be undone.',
      confirmText: 'Delete',
      cancelText: 'Cancel',
      onConfirm: async () => {
        toast.promise(deleteEvent(yearId), {
          loading: 'Deleting event...',
          success: 'Event deleted successfully',
          error: 'Failed to delete event',
        });
      },
    });
  };

  return {
    events,
    isLoading,
    error,
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent,
    openDeleteEventDialog,
  };
});
