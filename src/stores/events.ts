import { ref } from 'vue';

import { defineStore } from 'pinia';
import { toast } from 'vue-sonner';

import { useConfirmDialog } from '@/composables/use-confrim-dialog';
import { Api } from '@/lib/api';
import type { ConferencePage, ConferenceYear } from '@/lib/types';

export const useEventStore = defineStore('events', () => {
  const events = ref<ConferenceYear[]>([]);
  const event = ref<ConferenceYear | null>(null);
  const confirmDialog = useConfirmDialog();

  const getEvents = async () => {
    const { data } = await Api.getEvents();

    events.value = data;
  };

  const getEditorEvents = async () => {
    const { data } = await Api.getEditorEvents();
    events.value = data;
  };

  const getEventByYear = async (year: number) => {
    const { data } = await Api.getEventByYear(year);
    event.value = data;

    return data;
  };

  const createEvent = async (payload: Partial<ConferenceYear>) => {
    const { data } = await Api.createEvent(payload);

    return data;
  };

  const updateEvent = async (id: number, payload: Partial<ConferenceYear>) => {
    const { data } = await Api.updateEvent(id, payload);

    return data;
  };

  const deleteEvent = async (id: number | string) => {
    await Api.deleteEvent(id);
  };

  const deleteEventPage = async (pageId: string | number) => {
    await Api.deleteEventPage(pageId);
  };

  const getPageById = async (pageId: string | number) => {
    const { data } = await Api.getPageById(pageId);
    return data;
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

  const openDeleteEventPageDialog = (pageId: string | number, year: number) => {
    confirmDialog.open({
      title: 'Delete page?',
      description: 'Are you sure you want to delete this page? This action cannot be undone.',
      confirmText: 'Delete',
      cancelText: 'Cancel',
      onConfirm: async () => {
        toast.promise(deleteEventPage(pageId), {
          loading: 'Deleting page...',
          success: async () => {
            await getEventByYear(year);
            return 'Page deleted successfully';
          },
          error: 'Failed to delete page',
        });
      },
    });
  };

  const getPageBySlug = async (slug: string) => {
    const { data } = await Api.getPageBySlug(slug);
    return data;
  };

  const createPage = async (payload: Partial<ConferencePage>) => {
    const { data } = await Api.createPage(payload);
    return data;
  };

  const updatePage = async (pageId: string | number, payload: Partial<ConferencePage>) => {
    const { data } = await Api.updatePage(pageId, payload);
    return data;
  };

  return {
    events,
    event,
    getEvents,
    getEditorEvents,
    getEventByYear,
    createEvent,
    updateEvent,
    deleteEvent,
    openDeleteEventDialog,
    openDeleteEventPageDialog,
    getPageById,
    getPageBySlug,
    createPage,
    updatePage,
  };
});
