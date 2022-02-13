import { defineConfig } from 'vite'

import vue from '@vitejs/plugin-vue'
import Cesium from '@dvgis/vite-plugin-cesium'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),Cesium({
    useUnminified:true
  })],
})