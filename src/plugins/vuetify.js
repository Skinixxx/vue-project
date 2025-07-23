import { createVuetify } from 'vuetify'
import '@mdi/font/css/materialdesignicons.css'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

export default createVuetify({
  components,
  directives,
    theme: {
      defaultTheme: 'light', // Опционально: настройка темы
      themes: {
        light: {
          colors: {
            primary: '#1867C0',
            secondary: '#5CBBF6',
            success: '#4CAF50',
            warning: '#FFC107',
            error: '#F44336',
            info: '#2196F3'
          }
        }
      }
    }
  })
