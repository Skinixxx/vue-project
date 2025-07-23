import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import clientApi from '@/api/apiClient';
import { Client, ID_client } from '@/types/Client';
import { Status } from '@/utils/enum';


export const useClientStore = defineStore('clients', () => {
  const clients = ref<Client[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);
  
  const filters = ref({
    statuses: [] as Status[],
    search: ''
  });

  // Загрузка клиентов
  const fetchClients = async () => {
    loading.value = true;
    error.value = null;
    try {
      clients.value = await clientApi.getAll();
    } catch (err) {
      error.value = 'Ошибка загрузки данных';
      console.error(err);
    } finally {
      loading.value = false;
    }
  };

  // Обновление статуса
  const updateStatus = async (id: ID_client, status: Status) => {
    try {
      const updatedClient = await clientApi.updateStatus(id, status);
      const index = clients.value.findIndex(c => c.id === id);
      if (index !== -1) {
        clients.value[index] = updatedClient;
      }
      return updatedClient;
    } catch (err) {
      console.error('Ошибка обновления статуса:', err);
      throw err;
    }
  };

  // Фильтрация клиентов
  const filteredClients = computed(() => {
    return clients.value.filter(client => {
      const matchesStatus = filters.value.statuses.length === 0 || 
                           filters.value.statuses.includes(client.status);
      const matchesSearch = client.name.toLowerCase()
                           .includes(filters.value.search.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  });

  // Установка фильтров
  const setFilters = (newFilters: Partial<typeof filters.value>) => {
    filters.value = { ...filters.value, ...newFilters };
  };

  return {
    clients,
    filteredClients,
    loading,
    error,
    filters,
    fetchClients,
    updateStatus,
    setFilters
  };
});