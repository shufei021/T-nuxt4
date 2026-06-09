import { fileURLToPath } from 'node:url'

export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  devtools: {
    enabled: true
  },
  modules: ['@pinia/nuxt', '@nuxt/eslint'],
  alias: {
    pinia: fileURLToPath(
      new URL('./node_modules/pinia/dist/pinia.mjs', import.meta.url)
    )
  },
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      titleTemplate: `%s | ${process.env.NUXT_PUBLIC_APP_TITLE || 'T Nuxt 4'}`,
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'A standard Nuxt 4 starter template for front-end and back-end separated projects.'
        }
      ]
    }
  },
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'https://api.example.com',
      appTitle: process.env.NUXT_PUBLIC_APP_TITLE || 'T Nuxt 4',
      loginPath: process.env.NUXT_PUBLIC_LOGIN_PATH || '/login',
      homePath: process.env.NUXT_PUBLIC_HOME_PATH || '/dashboard'
    }
  },
  typescript: {
    strict: true,
    typeCheck: false
  },
  future: {
    compatibilityVersion: 4
  },
  routeRules: {
    '/admin/**': {
      ssr: true
    }
  }
})
