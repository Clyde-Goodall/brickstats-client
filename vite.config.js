import { fileURLToPath, URL } from 'url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue';
import { initCustomFormatter } from 'vue';

// https://vitejs.dev/config/
export default defineConfig(({mode}) => {
  require('dotenv').config({ path: `./.env.${mode}` });
  return {
    plugins: [vue()],
    template: {
      compilerOptions: {
        isCustomElement: (tag) => tag.startsWith('BarChart')
      }
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    // server: {
    //   proxy: {
    //     '/api': {
    //       target: 'https://api.cucked.soy:3002',
    //       changeOrigin: true,
    //       secure: false,
    //       ws: true,
    //     }      
    //   },
    // },
  }
})
