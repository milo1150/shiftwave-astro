// @ts-check
import { defineConfig } from 'astro/config'

import react from '@astrojs/react'

import tailwindcss from '@tailwindcss/vite'

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  i18n: {
    locales: ['th', 'en'],
    defaultLocale: 'en',
  },
  server: {
    port: 4321,
    host: '0.0.0.0',
  },
  vite: {
    server: {
      port: 4321,
      host: '0.0.0.0',
    },
    plugins: [tailwindcss()],
  },
})
