<template>
    <v-container fluid class="dashboard-container pa-0">
      <!-- Заголовок с кнопкой уведомлений -->
      <v-row class="mb-4 px-4" align="center">
        <v-col cols="10">
          <h1 class="text-h4 font-weight-bold mb-2">Панель управления клиентами</h1>
          <v-divider />
        </v-col>
        <v-col cols="2" class="text-right">
          <v-btn 
            @click="toggleNotifications"
            icon
            :color="showNotifications ? 'primary' : 'grey'"
            size="large"
          >
            <v-badge 
              :content="notifications.length" 
              :model-value="notifications.length > 0"
              color="red"
            >
              <v-icon>mdi-bell</v-icon>
            </v-badge>
          </v-btn>
        </v-col>
      </v-row>
  
      <!-- Утилиты -->
      <v-row class="mb-6 px-4" align="center">
        <v-col cols="12" md="6" class="d-flex align-center">
          <v-btn
            @click="toggleAutoCheck"
            :color="isAutoCheckActive ? 'error' : 'success'"
            prepend-icon="mdi-autorenew"
            small
            class="mr-4"
          >
            {{ isAutoCheckActive ? 'Остановить' : 'Запустить' }} проверку
          </v-btn>
          <v-chip v-if="isAutoCheckActive" color="success" small>
            <v-icon left>mdi-timer</v-icon> Автопроверка активна
          </v-chip>
        </v-col>
  
        <v-col cols="12" md="6">
          <ClientFilters @filter-change="handleFilter" />
        </v-col>
      </v-row>
  
      <!-- Сама доска клиентов -->
      <div v-if="filteredClients.length" class="client-board">
        <!-- Горизонтальная прокрутка карточек -->
        <v-container fluid class="cards-container">
            <v-row dense >
                <v-col 
                    v-for="client in filteredClients" 
                    :key="client.id"
                    cols="12" sm="6" md="2" lg="3"
                >
            <ClientCard
              :client="client"
              @change-status="changeStatus"
              @quick-check="quickCheck"
            />
                </v-col>
            </v-row>
        </v-container>
      </div>
  
      <!-- Если нет клиентов -->
      <v-row v-else class="px-4">
        <v-col cols="12">
          <v-alert type="info">Клиенты по выбранным фильтрам не найдены</v-alert>
        </v-col>
      </v-row>
  
      <!-- Уведомления -->
      <NotificationSystem 
        v-if="showNotifications"
        :notifications="recentNotifications" 
        class="notification-system"
      />
    </v-container>
  </template>
  
  <script setup lang="ts">
  import { onMounted, ref, computed } from 'vue';
  import { useDisplay } from 'vuetify';
  import ClientCard from './ClientCard.vue';
  import ClientFilters from './ClientFilters.vue';
  import NotificationSystem from './NotificationSystem.vue';
  import { useClientStore } from '@/store/clientStore';
  import useInterval from '@/composables/useInterval';
  import type { Client } from '@/types/Client';
  import type { Notification } from '@/types/Notification';
  import { Status, Notifications } from '@/utils/enum';
  import { translateStatus } from '@/utils/helper';
  
  const { mdAndUp } = useDisplay();
  const clientStore = useClientStore();
  const notifications = ref<Notification[]>([]);
  const isAutoCheckActive = ref(false);
  const showNotifications = ref(true);
  
  onMounted(() => clientStore.fetchClients());
  const filteredClients = computed<Client[]>(() => clientStore.filteredClients);
  
  // Последние 5 уведомлений
  const recentNotifications = computed(() => {
    return [...notifications.value]
      .sort((a, b) => b.timestap.getTime() - a.timestap.getTime())
      .slice(0, 5);
  });
  
  // Переключение видимости уведомлений
  const toggleNotifications = () => {
    showNotifications.value = !showNotifications.value;
  };
  
  // Авто‑проверка
  const { start, stop } = useInterval(async () => {
    const toCheck = clientStore.clients.filter(c => c.status !== Status.Check);
    if (!toCheck.length) return;
    
    const rnd = toCheck[Math.floor(Math.random() * toCheck.length)];
    const updated = await clientStore.updateStatus(rnd.id, Status.Check);
    
    addNotification(
      `Клиент ${updated.name} → ${translateStatus(Status.Check)}`,
      Notifications.Warning
    );
  }, 120000);
  
  function toggleAutoCheck() {
    if (isAutoCheckActive.value) stop();
    else start();
    
    isAutoCheckActive.value = !isAutoCheckActive.value;
    addNotification(
      `Автопроверка ${isAutoCheckActive.value ? 'запущена' : 'остановлена'}`,
      Notifications.Info
    );
  }
  
  // Уведомление
  function addNotification(msg: string, type: Notifications) {
    notifications.value.push({ 
      id: Date.now(), 
      message: msg, 
      type, 
      timestap: new Date() 
    });
    
    // Ограничиваем историю 50 записями
    if (notifications.value.length > 50) notifications.value.shift();
  }
  
  // Смена статуса и быстрая проверка
  async function changeStatus(id: number, status: Status) {
    const order = [Status.Active, Status.Problem, Status.Compl, Status.New];
    const next = order[(order.indexOf(status) + 1) % order.length];
    
    const updated = await clientStore.updateStatus(id, next);
    addNotification(
      `Статус ${updated.name} → ${translateStatus(next)}`, 
      Notifications.Info
    );
  }
  
  async function quickCheck(id: number) {
    const updated = await clientStore.updateStatus(id, Status.Check);
    addNotification(
      `Клиент ${updated.name} → ${translateStatus(Status.Check)}`, 
      Notifications.Warning
    );
  }
  
  function handleFilter(f: { statuses: Status[]; search: string }) {
    clientStore.setFilters(f);
  }
  </script>
  
  <style scoped>
  .dashboard-container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    position: relative;
  }
  
  .client-board {
    flex: 1;
    overflow-x: auto;
    padding: 0 16px 24px;
  }
  
  .cards-container {
    display: flex;
    gap: 24px;
    padding: 8px 16px;
    min-width: max-content;
  }
  
  .card-wrapper {
    flex: 0 0 auto;
    width: 300px;
  }
  
  .notification-system {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 1000;
    max-width: 400px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.15);
    border-radius: 8px;
    overflow: hidden;
  }
  
  /* Стили для скроллбара */
  .client-board::-webkit-scrollbar {
    height: 8px;
  }
  
  .client-board::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }
  
  .client-board::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 10px;
  }
  
  .client-board::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
  </style>