<!-- src/App.vue -->
<template>
  <v-app>
    <!-- App Bar -->
    <v-app-bar color="primary" dark elevation="2">
      <v-app-bar-title class="d-flex align-center">
        <v-icon class="mr-2">mdi-account-cog</v-icon>
        Бухгалтерский дашборд
      </v-app-bar-title>
      <v-spacer />
      <v-btn icon>
        <v-icon>mdi-cog</v-icon>
      </v-btn>
    </v-app-bar>

    <!-- Main Content -->
    <v-main>
      <v-container fluid class="py-6 px-4">
        <ClientDashboard />
      </v-container>
    </v-main>

    <!-- Footer -->
    <v-footer color="primary" dark padless>
      <v-col class="text-center white--text py-2">
        Бухгалтерский дашборд &copy; {{ new Date().getFullYear() }}
      </v-col>
    </v-footer>
  </v-app>
</template>

<script setup lang="ts">
import ClientDashboard from '@/components/ClientDashboard.vue';
</script>

<style>
body {
  margin: 0;
  font-family: 'Roboto', sans-serif;
  background-color: #f5f7fa;
}

/* Убираем жёсткие ограничения у v-main */
.v-main {
  padding: 0;
  min-width: 400px;
}

/* Чуть больше пространства под AppBar */
.v-app-bar {
  padding-top: 8px;
  padding-bottom: 8px;
}

/* Сделать footer по ширине экрана без лишнего отступа */
.v-footer {
  width: 100%;
}
</style>
