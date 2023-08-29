// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      // baseURL: 'https://api.football-data.org/v4',
      baseURL: '/api',
      apiKey: '350b521f25d54db8a6402c67c0ab79f6',
    },
  },
  nitro: {
    routeRules: {
      '/api/**': { proxy: 'https://api.football-data.org/v4/**' }
    }
  },
  devtools: { enabled: true },
})
