<template>
    <v-card class="client-card">
      <v-card-title class="d-flex justify-space-between align-center">
        <div class="text-truncate">{{ client.name }}</div>
        <v-chip :color="statusColor" small>
          {{ statusText }}
        </v-chip>
      </v-card-title>
      
      <v-card-text>
        <div class="mb-2">
          <v-icon small class="mr-1">mdi-update</v-icon>
          <span class="text-caption">Обновлено: {{ formattedDate }}</span>
        </div>
      </v-card-text>
      
      <v-card-actions class="d-flex justify-space-between">
        <v-btn 
          color="primary"
          variant="outlined"
          @click="changeStatus"
        >
          Сменить статус
        </v-btn>
        
        <v-btn 
          color="warning"
          variant="tonal"
          @click="quickCheck"
        >
          Проверить
        </v-btn>
      </v-card-actions>
    </v-card>
  </template>
  
  <script setup lang="ts">
  import { computed } from 'vue';
  import { Status } from '@/utils/enum';
  import { translateStatus } from '@/utils/helper';
  import type { Client } from '@/types/Client';
  
  const props = defineProps<{
    client: Client
  }>();
  
  const emit = defineEmits(['change-status', 'quick-check']);
  
  const statusText = computed(() => translateStatus(props.client.status));
  const formattedDate = computed(() => 
    props.client.lastUpdate.toLocaleTimeString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit'
    })
  );
  
  const statusColor = computed(() => {
    switch (props.client.status) {
      case Status.Active: return 'success';
      case Status.Problem: return 'error';
      case Status.Compl: return 'info';
      case Status.Check: return 'warning';
      default: return 'primary';
    }
  });
  
  function changeStatus() {
    emit('change-status', props.client.status);
  }
  
  function quickCheck() {
    emit('quick-check', props.client.id);
  }
  </script>
  
  <style scoped>
  .client-card {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  
  .v-card-title {
    padding-bottom: 8px;
  }
  
  .v-card-text {
    flex-grow: 1;
  }
  
  .v-card-actions {
    padding-top: 0;
  }
  </style>