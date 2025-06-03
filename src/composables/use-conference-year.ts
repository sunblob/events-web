import { ref } from 'vue';

import { Api } from '@/lib/api';
import type { ConferenceYear } from '@/lib/types';

export function useConferenceYear() {
  const years = ref<ConferenceYear[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const fetchYears = async () => {
    isLoading.value = true;
    error.value = null;
    try {
      const { data } = await Api.getConferences();
      years.value = data;
    } catch (e) {
      error.value = 'Ошибка загрузки годов конференций';
    } finally {
      isLoading.value = false;
    }
  };

  const createYear = async (payload: Partial<ConferenceYear>) => {
    isLoading.value = true;
    error.value = null;
    try {
      await Api.createConferenceYear(payload);
      await fetchYears();
    } catch (e) {
      error.value = 'Ошибка создания года конференции';
    } finally {
      isLoading.value = false;
    }
  };

  const updateYear = async (id: number, payload: Partial<ConferenceYear>) => {
    isLoading.value = true;
    error.value = null;
    try {
      await Api.updateConferenceYear(id, payload);
      await fetchYears();
    } catch (e) {
      error.value = 'Ошибка обновления года конференции';
    } finally {
      isLoading.value = false;
    }
  };

  const deleteYear = async (id: number) => {
    isLoading.value = true;
    error.value = null;
    try {
      await Api.deleteConferenceYear(id);
      await fetchYears();
    } catch (e) {
      error.value = 'Ошибка удаления года конференции';
    } finally {
      isLoading.value = false;
    }
  };

  return {
    years,
    isLoading,
    error,
    fetchYears,
    createYear,
    updateYear,
    deleteYear,
  };
}
