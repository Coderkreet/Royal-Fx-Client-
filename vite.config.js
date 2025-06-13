import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    port:7008,
    allowedHosts:['http://zcoin.dev','http://www.zcoin.dev','https://zcoin.dev','https://www.zcoin.dev','zcoin.dev','zcoin.dev','www.zcoin.dev','http://zcoin.smartchainstudio.in','http://www.zcoin.smartchainstudio.in','https://zcoin.smartchainstudio.in','https://www.zcoin.smartchainstudio.in','zcoin.smartchainstudio.in','zcoin.smartchainstudio.in','www.zcoin.smartchainstudio.in'],
  },
  preview: {
    port: 7008,
    allowedHosts:['http://zcoin.dev','http://www.zcoin.dev','https://zcoin.dev','https://www.zcoin.dev','zcoin.dev','zcoin.dev','www.zcoin.dev','http://zcoin.smartchainstudio.in','http://www.zcoin.smartchainstudio.in','https://zcoin.smartchainstudio.in','https://www.zcoin.smartchainstudio.in','zcoin.smartchainstudio.in','zcoin.smartchainstudio.in','www.zcoin.smartchainstudio.in'],
  },
})
