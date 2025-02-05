// @ts-check
import { defineConfig } from 'astro/config'

import react from '@astrojs/react'

import tailwind from '@astrojs/tailwind'

// https://astro.build/config
export default defineConfig({
  integrations: [react(), tailwind()],
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
      allowedHosts: ['shiftwave-dev.mijio.app', 'localhost:4321'],
      port: 4321,
      host: '0.0.0.0',
    },
  },
})
