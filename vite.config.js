import { fileURLToPath, URL } from 'url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig(({mode}) => {
  dev: {
    require('dotenv').config({ path: `./.env.${mode}` });
    const isProd = mode === 'production';
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
      //       target: 'https://165.227.220.80:3002',
      //       changeOrigin: true,
      //       secure: false,
      //       ws: true,
      //     }      
      //   },
      // },
    }
  }
})
