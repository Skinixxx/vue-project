<template>
    <v-card class="mb-4">
      <v-card-text>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="searchQuery"
              label="Поиск по названию"
              prepend-icon="mdi-magnify"
              clearable
              @update:modelValue="applyFilters"
            ></v-text-field>
          </v-col>
          
          <v-col cols="12" md="5">
            <v-select
              v-model="selectedStatuses"
              :items="statusOptions"
              label="Статусы"
              multiple
              chips
              prepend-icon="mdi-filter"
              @update:modelValue="applyFilters"
              item-title="text"
              item-value="value"
            ></v-select>
          </v-col>
          
          <v-col cols="12" md="1" class="d-flex align-center">
            <v-btn 
              color="secondary"
              variant="text"
              icon="mdi-refresh"
              @click="resetFilters"
            ></v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import { Status } from '@/utils/enum';
  import { translateStatus } from '@/utils/helper';
  
  const emit = defineEmits(['filter'])
  
  // Фильтруем только числовые значения enum
  const statusOptions = Object.values(Status)
    .filter(value => typeof value === 'number')
    .map(status => ({
      value: status,
      text: translateStatus(status)
    }));
  
  const selectedStatuses = ref<Status[]>([])
  const searchQuery = ref('')
  
  const applyFilters = () => {
    emit('filter', {
      statuses: selectedStatuses.value,
      search: searchQuery.value
    })
  }
  
  const resetFilters = () => {
    selectedStatuses.value = []
    searchQuery.value = ''
    applyFilters()
  }
  </script>
  
  <style scoped>
  .v-card {
    border-left: 4px solid #1976D2;
    border-radius: 8px;
    background-color: #fafafa;
  }
  </style>