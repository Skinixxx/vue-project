<template>
    <div class="notification-system">
      <!-- Toast-уведомления -->
      <v-snackbar
        v-for="notification in toasts"
        :key="notification.id"
        v-model="notification.visible"
        :timeout="3000"
        :color="getColor(notification.type)"
        top
        right
        multi-line
      >
        {{ notification.message }}
  
        <template #actions>
          <v-btn
            icon
            @click="notification.visible = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </template>
      </v-snackbar>
  
      <!-- Лента уведомлений -->
      <v-card class="mt-4" v-if="notifications.length">
        <v-toolbar color="primary" dark dense>
          <v-toolbar-title>Последние события</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="clearNotifications">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-toolbar>
        
        <v-list lines="two" density="compact">
          <v-list-item 
            v-for="notification in notifications" 
            :key="notification.id"
          >
            <template #prepend>
              <v-icon :color="getColor(notification.type)">{{ getIcon(notification.type) }}</v-icon>
            </template>
            <v-list-item-title>{{ notification.message }}</v-list-item-title>
            <v-list-item-subtitle>{{ formatDate(notification.timestap) }}</v-list-item-subtitle>
          </v-list-item>
        </v-list>
      </v-card>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed, onMounted, watch } from 'vue';
  import type { Notification } from '@/types/Notification';
  import { Notifications } from '@/utils/enum';
  
  const props = defineProps<{
    notifications: Notification[]
  }>();
  
  const emit = defineEmits(['clear']);
  
  const toasts = ref<Array<Notification & { visible: boolean }>>([]);
  
  // Отслеживаем новые уведомления для показа тостов
  onMounted(() => {
    watch(() => props.notifications, (newVal, oldVal) => {
      if (newVal.length > oldVal.length) {
        const newNotifications = newVal.slice(oldVal.length);
        
        newNotifications.forEach(notif => {
          toasts.value.push({
            ...notif,
            visible: true
          });
          
          // Автоматическое скрытие через 5 сек
          setTimeout(() => {
            toasts.value = toasts.value.filter(t => t.id !== notif.id);
          }, 5000);
        });
      }
    }, { deep: true });
  });
  
  const getColor = (type: Notifications) => {
    switch (type) {
      case Notifications.Info: return 'info';
      case Notifications.Warning: return 'warning';
      case Notifications.Error: return 'error';
      default: return 'primary';
    }
  };
  
  const getIcon = (type: Notifications) => {
    switch (type) {
      case Notifications.Info: return 'mdi-information';
      case Notifications.Warning: return 'mdi-alert';
      case Notifications.Error: return 'mdi-alert-circle';
      default: return 'mdi-bell';
    }
  };
  
  const formatDate = (date: Date) => {
    return date.toLocaleTimeString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };
  
  const clearNotifications = () => {
    emit('clear');
  };
  </script>
  
  <style scoped>
  .notification-system {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 1000;
    width: 350px;
  }
  
  .v-card {
    max-height: 300px;
    overflow-y: auto;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    border-radius: 8px;
  }
  
  .v-list-item {
    cursor: default;
    transition: background-color 0.2s;
  }
  
  .v-list-item:hover {
    background-color: #f5f5f5;
  }
  </style>