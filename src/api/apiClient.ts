import axios from 'axios';
import { Client, ID_client } from '@/types/Client';
import { Status } from '@/utils/enum';

const API_BASE_URL = 'http://localhost:3001/api'; // Замените на ваш бэкенд URL

export default {
  // Получить всех клиентов
  async getAll(): Promise<Client[]> {
    const response = await axios.get(`${API_BASE_URL}/clients`);
    return response.data.map((client: any) => ({
      ...client,
      lastUpdate: new Date(client.lastUpdate)
    }));
  },

  // Обновить статус клиента
  async updateStatus(id: ID_client, status: Status): Promise<Client> {
    const response = await axios.patch(`${API_BASE_URL}/clients/${id}/status`, { status });
    return {
      ...response.data,
      lastUpdate: new Date(response.data.lastUpdate)
    };
  },

  // Перевести случайного клиента в проверку
  async triggerRandomCheck(): Promise<Client> {
    const response = await axios.post(`${API_BASE_URL}/clients/random-check`);
    return {
      ...response.data,
      lastUpdate: new Date(response.data.lastUpdate)
    };
  }
};