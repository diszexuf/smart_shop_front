import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import * as fs from "node:fs"
import * as path from "node:path";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
  server: {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, 'cert/samrtshop_ssl_key.p8.pem')), // Приватный ключ
      cert: fs.readFileSync(path.resolve(__dirname, 'cert/samrtshop_ssl.cer')), // Сертификат сервера
    },
  },
})
